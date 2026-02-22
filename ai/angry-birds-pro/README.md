# Angry Birds Pro

A full-stack Angry Birds clone using React + Matter.js for the frontend and Go for the backend.

## Prerequisites

1.  **Go**: [Install Go](https://go.dev/doc/install) (v1.21+)
2.  **Node.js**: [Install Node.js](https://nodejs.org/) (v18+)

## How to Run

1.  **Clone/Copy** this repository.
2.  **Run the start script**:
    ```bash
    chmod +x start.sh
    ./start.sh
    ```

    Alternatively, run manually:

    **Backend:**
    ```bash
    cd backend
    go mod tidy
    go run main.go
    ```
    Runs on `http://localhost:8080`

    **Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    Runs on `http://localhost:5173`

## Features

-   **Frontend**: React + TypeScript + Vite. Uses Matter.js physics engine for bird launching and collision detection.
-   **Backend**: Go HTTP server. Stores level/score progress (currently in memory).
-   **Integration**: Frontend talks to `http://localhost:8080/api` to save/load progress.
