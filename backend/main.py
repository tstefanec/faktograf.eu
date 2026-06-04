import os
import sqlite3
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.db import init_db, DB_PATH

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FaktografServer")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure SQLite is initialized and pre-populated
    logger.info("Initializing database on startup...")
    init_db()
    yield
    # Shutdown: No cleanup needed
    pass

app = FastAPI(
    title="Faktograf - Historická makroekonomická ročenka SR",
    description="Porovnávač stavu a prosperity Slovenskej republiky od roku 1993 po rok 2025.",
    lifespan=lifespan
)

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/stats")
async def get_stats():
    """Returns the full historical time-series of macroeconomic and political stats for Slovakia."""
    if not os.path.exists(DB_PATH):
        init_db()
        
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row # Returns dict-like rows
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM slovakia_stats ORDER BY year ASC")
        rows = cursor.fetchall()
        conn.close()
        
        # Convert sqlite3.Row rows into standard python dictionaries
        results = [dict(r) for r in rows]
        return results
    except Exception as e:
        logger.error(f"Error fetching stats from database: {e}")
        raise HTTPException(status_code=500, detail=f"Chyba databázy: {str(e)}")

@app.get("/api/stats/historical")
async def get_historical_stats():
    """Returns the full historical time-series for Czechoslovakia and benchmark countries."""
    if not os.path.exists(DB_PATH):
        init_db()
        
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM czechoslovakia_stats ORDER BY year ASC, country ASC")
        rows = cursor.fetchall()
        conn.close()
        
        results = [dict(r) for r in rows]
        return results
    except Exception as e:
        logger.error(f"Error fetching historical stats from database: {e}")
        raise HTTPException(status_code=500, detail=f"Chyba databázy: {str(e)}")

# Mount Frontend static files
frontend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
    logger.info(f"Mounted static frontend from: {frontend_path}")
else:
    logger.warning(f"Frontend static files not found at: {frontend_path}")
