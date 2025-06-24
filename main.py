
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="Bolt Clone Backend", version="1.0.0")

# Environment-based CORS configuration
if os.getenv("ENVIRONMENT") == "production":
    origins = [
        "https://your-vercel-app.vercel.app",  # Replace with your actual Vercel URL
        "https://bolt-clone.vercel.app",       # Example URL
    ]
else:
    origins = [
        "http://localhost:8080",
        "http://localhost:3000",
        "http://localhost:5173",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Bolt Clone Backend API", "status": "running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "environment": os.getenv("ENVIRONMENT", "development")}

@app.get("/api/files")
async def get_files():
    return {"files": ["App.tsx", "main.py"], "message": "File list endpoint"}

@app.post("/api/files")
async def create_file():
    return {"message": "File created successfully"}
