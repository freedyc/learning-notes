#!/bin/bash
echo "Starting Angry Birds Pro..."

# Check for Go
if ! command -v go &> /dev/null
then
    echo "Error: Go is not installed. Please install Go to run the backend."
    exit 1
fi

# Check for Node
if ! command -v npm &> /dev/null
then
    echo "Error: NPM is not installed. Please install Node.js to run the frontend."
    exit 1
fi

# Start Backend
echo "Starting backend..."
cd backend
go mod tidy
go run main.go &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo "App running!"
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:5173"

wait $BACKEND_PID $FRONTEND_PID
