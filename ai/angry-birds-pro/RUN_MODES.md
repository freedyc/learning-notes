# Angry Birds Pro - 运行模式说明

本项目支持两种运行模式：**纯前端模式** 和 **后端模式**。

## 🎮 纯前端模式 (Local Mode) 💾

**无需任何后端服务，游戏完全在浏览器中运行。**

### 特性
- ✅ 游戏进度保存在浏览器 localStorage
- ✅ 支持所有关卡和游戏玩法
- ✅ 刷新页面后进度不丢失
- ✅ 可直接通过 `file://` 协议或本地服务器打开

### 启动方式

```bash
cd frontend
npm install
npm run dev
```

然后在浏览器访问 `http://localhost:5173` (或 Vite 显示的地址)

### 数据持久化
- 进度自动保存在浏览器的 localStorage 中
- 数据键：`angry_birds_progress`
- 包含：level, score, updatedAt

---

## 🌐 后端模式 (Backend Mode)

**使用后端 API 同步游戏进度。**

### 特性
- ✅ 游戏进度保存在后端服务器
- ✅ 支持多设备同步（需要后端实现）
- ✅ localStorage 作为备份

### 启动方式

1. 启动后端服务（需要实现 `/api/progress` 端点）
```bash
cd backend
# 根据你的后端实现启动服务
```

2. 启动前端
```bash
cd frontend
npm run dev
```

### API 要求
后端需要提供以下端点：

- `GET /api/progress` - 获取进度
- `POST /api/progress` - 保存进度
- `HEAD /api/progress` - 检查后端可用性

---

## 🔄 模式切换

游戏界面左上角有模式切换按钮：
- **💾 Local Mode** - 纯前端模式（默认）
- **🌐 Backend Mode** - 后端模式

系统会自动检测后端是否可用：
- 如果后端可用，自动启用后端模式
- 如果后端不可用，自动切换到纯前端模式
- 可手动切换模式

---

## 🛠️ 技术架构

### 前端
- React 18 + TypeScript
- Vite 构建工具
- Matter.js 物理引擎
- localStorage 本地存储

### 混合存储策略
```
保存进度:
1. 首先保存到 localStorage (保证数据不丢失)
2. 如果启用后端模式，尝试同步到后端
3. 后端失败不影响游戏运行

加载进度:
1. 首先尝试从后端加载
2. 后端不可用时，从 localStorage 加载
3. 都没有时，使用默认值 (level: 1, score: 0)
```

---

## 📦 构建生产版本

```bash
cd frontend
npm run build
```

构建后的文件在 `frontend/dist` 目录，可直接部署到任何静态托管服务：
- Vercel
- Netlify
- GitHub Pages
- 或任何支持静态文件的 Web 服务器

---

## 🎯 推荐用法

| 场景 | 推荐模式 |
|------|----------|
| 本地开发 | 纯前端模式 |
| 个人使用 | 纯前端模式 |
| 多设备同步 | 后端模式 |
| 生产部署 | 纯前端模式（最简单） |
