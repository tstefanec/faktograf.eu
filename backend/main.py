import os
import sqlite3
import logging
import time
import urllib.request
import xml.etree.ElementTree as ET
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

# In-memory news ticker cache
news_cache = {
    "items": [],
    "last_updated": 0
}

def fetch_rss_news():
    items = []
    
    # 1. Fetch latest macroeconomic indicator values from DB
    try:
        if os.path.exists(DB_PATH):
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute("SELECT year, avg_wage, unemployment, inflation, gdp_growth FROM slovakia_stats ORDER BY year DESC LIMIT 1")
            row = cursor.fetchone()
            if row:
                year, avg_wage, unemployment, inflation, gdp_growth = row
                items.append(f"📊 Hospodárske výsledky SR ({year}): Priemerná mzda {avg_wage} € | Nezamestnanosť {unemployment}% | Inflácia {inflation}% | Rast HDP {gdp_growth}%")
            conn.close()
    except Exception as e:
        logger.error(f"Error fetching stats for news ticker: {e}")

    # 2. Fetch current weather in Bratislava (Slovakia)
    try:
        weather_url = "https://api.open-meteo.com/v1/forecast?latitude=48.1486&longitude=17.1077&current_weather=true"
        req = urllib.request.Request(weather_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=3) as response:
            import json
            weather_data = json.loads(response.read().decode('utf-8'))
            curr = weather_data.get("current_weather", {})
            temp = curr.get("temperature")
            wcode = curr.get("weathercode", 0)
            
            # Map weather codes to Slovak weather descriptions
            weather_desc = "Premenlivá oblačnosť ⛅"
            if wcode == 0:
                weather_desc = "Jasno ☀️"
            elif wcode in [1, 2, 3]:
                weather_desc = "Polojasno ⛅"
            elif wcode in [45, 48]:
                weather_desc = "Hmlisto 🌫️"
            elif wcode in [51, 53, 55, 61, 63, 65, 80, 81, 82]:
                weather_desc = "Dážď/Prehánky 🌧️"
            elif wcode in [71, 73, 75]:
                weather_desc = "Sneženie ❄️"
            elif wcode in [95, 96, 99]:
                weather_desc = "Búrka ⛈️"
                
            items.append(f"🌡️ Aktuálne počasie v SR (Bratislava): {weather_desc}, {temp} °C")
    except Exception as e:
        logger.warning(f"Failed to fetch weather: {e}")

    # 3. Fetch Slovak news headlines via RSS feeds (General + Sport)
    feeds = [
        ("Aktuality.sk", "https://www.aktuality.sk/rss/"),
        ("SITA.sk", "https://sita.sk/feed/"),
        ("Šport.sk", "https://sport.aktuality.sk/rss/")
    ]
    
    rss_fetched = False
    for name, url in feeds:
        try:
            req = urllib.request.Request(
                url, 
                headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                }
            )
            with urllib.request.urlopen(req, timeout=3) as response:
                xml_data = response.read()
                root = ET.fromstring(xml_data)
                channel = root.find('channel')
                if channel is not None:
                    count = 0
                    for item in channel.findall('item'):
                        title = item.find('title')
                        if title is not None and title.text:
                            clean_title = title.text.strip()
                            if clean_title and len(clean_title) < 150:
                                prefix = "⚽" if "Šport" in name else "📰"
                                items.append(f"{prefix} {name}: {clean_title}")
                                count += 1
                                if count >= 4:  # Get up to 4 items from each feed
                                    break
                    rss_fetched = True
        except Exception as e:
            logger.warning(f"Failed to fetch news RSS from {name}: {e}")
            
    # 4. Fallback mock headlines if offline
    if not rss_fetched:
        items.extend([
            "📰 Hospodársky prehľad: Rast reálnych miezd v SR pokračuje vďaka stabilizácii inflácie.",
            "📰 NBS: Slovenská ekonomika vykazuje stabilný rast ťahaný domácim dopytom.",
            "📰 Štatistický úrad SR: Priemyselná produkcia v SR zaznamenala mierny medziročný prírastok.",
            "📰 Eurostat: Zamestnanosť na Slovensku patrí k stabilným pilierom ekonomiky."
        ])
        
    return items

@app.get("/api/news")
async def get_news():
    """Returns a list of Slovak news and economic results, cached for 2 hours."""
    current_time = time.time()
    # Cache duration: 2 hours (7200 seconds)
    if not news_cache["items"] or (current_time - news_cache["last_updated"] > 7200):
        try:
            items = fetch_rss_news()
            news_cache["items"] = items
            news_cache["last_updated"] = current_time
            logger.info("Successfully refreshed news ticker items.")
        except Exception as e:
            logger.error(f"Error refreshing news ticker: {e}")
            if not news_cache["items"]:
                return [
                    "📊 Hospodárske výsledky SR: Sledovanie vývoja prosperity od roku 1993.",
                    "📰 Ticker spravodajstva je dočasne nedostupný."
                ]
    return news_cache["items"]

@app.get("/api/memes")
async def get_memes():
    """Returns the relative URLs of the 3 newest meme images from assets/memes, sorted by date in filename."""
    import re
    from datetime import datetime
    
    memes_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "assets", "memes")
    if not os.path.exists(memes_dir):
        return []
        
    valid_extensions = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
    meme_files = []
    
    try:
        for fname in os.listdir(memes_dir):
            ext = os.path.splitext(fname)[1].lower()
            if ext in valid_extensions:
                # Try to extract date from filename (YYYY-MM-DD or YYYYMMDD)
                date_match = re.search(r"(\d{4}-\d{2}-\d{2})|(\d{8})", fname)
                file_date = None
                if date_match:
                    date_str = date_match.group(0)
                    try:
                        if "-" in date_str:
                            file_date = datetime.strptime(date_str, "%Y-%m-%d")
                        else:
                            file_date = datetime.strptime(date_str, "%Y%m%d")
                    except Exception:
                        pass
                
                # Fallback to file modification time if no valid date found in filename
                if file_date is None:
                    try:
                        mtime = os.path.getmtime(os.path.join(memes_dir, fname))
                        file_date = datetime.fromtimestamp(mtime)
                    except Exception:
                        file_date = datetime.min
                
                meme_files.append({
                    "date": file_date,
                    "filename": fname,
                    "url": f"assets/memes/{fname}"
                })
                
        # Sort descending by date, then alphabetically
        meme_files.sort(key=lambda x: (x["date"], x["filename"]), reverse=True)
        
        # Return top 3
        return [m["url"] for m in meme_files[:3]]
    except Exception as e:
        logger.error(f"Error listing memes: {e}")
        return []

# Mount Frontend static files
frontend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
    logger.info(f"Mounted static frontend from: {frontend_path}")
else:
    logger.warning(f"Frontend static files not found at: {frontend_path}")
