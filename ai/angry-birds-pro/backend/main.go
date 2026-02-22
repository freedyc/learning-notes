package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
)

// Data structure
type Progress struct {
	Level int `json:"level"`
	Score int `json:"score"`
}

const dataFile = "progress.json"

var (
	state Progress
	mu    sync.Mutex
)

// Load data from file
func loadProgress() {
	file, err := os.ReadFile(dataFile)
	if err != nil {
		if os.IsNotExist(err) {
			state = Progress{Level: 1, Score: 0}
			saveProgress() // Create initial file
			return
		}
		log.Printf("Error reading progress: %v", err)
		return
	}
	json.Unmarshal(file, &state)
}

// Save data to file
func saveProgress() {
	data, _ := json.MarshalIndent(state, "", "  ")
	os.WriteFile(dataFile, data, 0644)
}

func main() {
	loadProgress()

	// API Handlers
	http.HandleFunc("/api/progress", handleProgress)
	
	// Serve static frontend build if it exists
	fs := http.FileServer(http.Dir("../frontend/dist"))
	http.Handle("/", fs)

	port := ":8080"
	fmt.Printf("Angry Birds Pro Backend running at http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}

func handleProgress(w http.ResponseWriter, r *http.Request) {
	// CORS Headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	switch r.Method {
	case http.MethodGet:
		json.NewEncoder(w).Encode(state)

	case http.MethodPost:
		var p Progress
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, "Invalid request", http.StatusBadRequest)
			return
		}
		state = p
		saveProgress() // Save to disk
		json.NewEncoder(w).Encode(state)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
