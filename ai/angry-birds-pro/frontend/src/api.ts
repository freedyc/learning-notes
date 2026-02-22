export const API_BASE = 'http://localhost:8080/api';
const STORAGE_KEY = 'angry_birds_progress';

// Check if backend is available (optional feature)
export const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/progress`, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// LocalStorage-based progress management (works without backend)
const saveProgressLocal = (level: number, score: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ level, score, updatedAt: Date.now() }));
    return true;
  } catch (error) {
    console.warn('LocalStorage unavailable:', error);
    return false;
  }
};

const loadProgressLocal = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Validate data structure
      if (typeof data.level === 'number' && typeof data.score === 'number') {
        return { level: data.level, score: data.score };
      }
    }
  } catch (error) {
    console.warn('Failed to parse local progress:', error);
  }
  return null;
};

// Hybrid save: tries backend first, falls back to localStorage
export const saveProgress = async (level: number, score: number, useBackend = true) => {
  // Always save to localStorage first (guarantees data persistence)
  saveProgressLocal(level, score);
  
  if (!useBackend) return { level, score, source: 'local' };
  
  // Try to sync with backend (non-blocking)
  try {
    const response = await fetch(`${API_BASE}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, score }),
    });
    if (!response.ok) throw new Error('Server error');
    return await response.json();
  } catch (error) {
    // Backend unavailable, but data is safely stored locally
    console.debug('Backend sync skipped, using localStorage');
    return { level, score, source: 'local' };
  }
};

// Hybrid load: tries backend first, falls back to localStorage
export const loadProgress = async (useBackend = true) => {
  if (useBackend) {
    try {
      const response = await fetch(`${API_BASE}/progress`);
      if (response.ok) {
        const data = await response.json();
        // Sync to localStorage as backup
        saveProgressLocal(data.level || 1, data.score || 0);
        return data;
      }
    } catch (error) {
      console.debug('Backend unavailable, loading from localStorage');
    }
  }
  
  // Fallback to localStorage
  const localData = loadProgressLocal();
  return localData || { level: 1, score: 0 };
};
