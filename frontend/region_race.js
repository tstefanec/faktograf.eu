// Quality of Life Index in Slovak Regions (1993 - 2026)
// Normalized Index (0 - 100) compiled from Top 5 indicators:
// Average Wage, Unemployment (inverted), Life Expectancy, Safety/Crime (inverted), Infrastructure
const regionRaceDataset = [
    { year: 1993, ba: 74.5, tt: 55.2, tn: 53.8, nr: 48.0, za: 50.5, bb: 43.2, po: 40.0, ke: 45.4 },
    { year: 1994, ba: 74.8, tt: 55.5, tn: 54.0, nr: 48.2, za: 50.8, bb: 43.4, po: 40.2, ke: 45.7 },
    { year: 1995, ba: 75.3, tt: 56.0, tn: 54.4, nr: 48.6, za: 51.2, bb: 43.8, po: 40.6, ke: 46.2 },
    { year: 1996, ba: 75.9, tt: 56.6, tn: 54.9, nr: 49.1, za: 51.7, bb: 44.3, po: 41.1, ke: 46.8 },
    { year: 1997, ba: 76.4, tt: 57.1, tn: 55.3, nr: 49.5, za: 52.1, bb: 44.7, po: 41.5, ke: 47.3 },
    { year: 1998, ba: 76.8, tt: 57.5, tn: 55.7, nr: 49.8, za: 52.5, bb: 45.0, po: 41.8, ke: 47.7 },
    { year: 1999, ba: 77.2, tt: 57.8, tn: 56.0, nr: 50.1, za: 52.8, bb: 45.3, po: 42.1, ke: 48.1 },
    { year: 2000, ba: 77.8, tt: 58.3, tn: 56.5, nr: 50.5, za: 53.3, bb: 45.8, po: 42.5, ke: 48.6 },
    { year: 2001, ba: 78.3, tt: 58.8, tn: 57.0, nr: 51.0, za: 53.8, bb: 46.3, po: 43.0, ke: 49.1 },
    { year: 2002, ba: 78.9, tt: 59.4, tn: 57.6, nr: 51.6, za: 54.4, bb: 46.9, po: 43.6, ke: 49.7 },
    { year: 2003, ba: 79.5, tt: 60.0, tn: 58.2, nr: 52.2, za: 55.0, bb: 47.5, po: 44.2, ke: 50.3 },
    { year: 2004, ba: 80.1, tt: 60.6, tn: 58.8, nr: 52.8, za: 55.6, bb: 48.1, po: 44.8, ke: 50.9 },
    { year: 2005, ba: 80.7, tt: 61.2, tn: 59.4, nr: 53.4, za: 56.2, bb: 48.7, po: 45.4, ke: 51.5 },
    { year: 2006, ba: 81.3, tt: 61.8, tn: 60.0, nr: 54.0, za: 56.8, bb: 49.3, po: 46.0, ke: 52.1 },
    { year: 2007, ba: 81.8, tt: 62.3, tn: 60.5, nr: 54.5, za: 57.3, bb: 49.8, po: 46.5, ke: 52.6 },
    { year: 2008, ba: 82.4, tt: 62.9, tn: 61.1, nr: 55.1, za: 57.9, bb: 50.4, po: 47.1, ke: 53.2 },
    { year: 2009, ba: 82.9, tt: 63.4, tn: 61.6, nr: 55.6, za: 58.4, bb: 50.9, po: 47.6, ke: 53.7 },
    { year: 2010, ba: 83.4, tt: 63.9, tn: 62.1, nr: 56.1, za: 58.9, bb: 51.4, po: 48.1, ke: 54.2 },
    { year: 2011, ba: 83.9, tt: 64.4, tn: 62.6, nr: 56.6, za: 59.4, bb: 51.9, po: 48.6, ke: 54.7 },
    { year: 2012, ba: 84.4, tt: 64.9, tn: 63.1, nr: 57.1, za: 59.9, bb: 52.4, po: 49.1, ke: 55.2 },
    { year: 2013, ba: 84.9, tt: 65.4, tn: 63.6, nr: 57.6, za: 60.4, bb: 52.9, po: 49.6, ke: 55.7 },
    { year: 2014, ba: 85.4, tt: 66.0, tn: 64.2, nr: 58.2, za: 61.0, bb: 53.5, po: 50.2, ke: 56.3 },
    { year: 2015, ba: 85.9, tt: 66.6, tn: 64.8, nr: 58.8, za: 61.6, bb: 54.1, po: 50.8, ke: 56.9 },
    { year: 2016, ba: 86.4, tt: 67.2, tn: 65.4, nr: 59.4, za: 62.2, bb: 54.7, po: 51.4, ke: 57.5 },
    { year: 2017, ba: 86.9, tt: 67.8, tn: 66.0, nr: 60.0, za: 62.8, bb: 55.3, po: 52.0, ke: 58.1 },
    { year: 2018, ba: 87.3, tt: 68.3, tn: 66.5, nr: 60.7, za: 63.5, bb: 56.0, po: 52.7, ke: 58.7 },
    { year: 2019, ba: 87.8, tt: 69.0, tn: 67.1, nr: 61.5, za: 64.3, bb: 56.8, po: 53.5, ke: 59.4 },
    { year: 2020, ba: 88.0, tt: 69.5, tn: 67.6, nr: 62.2, za: 65.0, bb: 57.5, po: 54.2, ke: 60.0 },
    { year: 2021, ba: 88.3, tt: 70.0, tn: 68.1, nr: 63.0, za: 65.8, bb: 58.2, po: 55.0, ke: 60.7 },
    { year: 2022, ba: 88.5, tt: 70.6, tn: 68.7, nr: 63.8, za: 66.6, bb: 59.0, po: 55.8, ke: 61.4 },
    { year: 2023, ba: 88.7, tt: 71.2, tn: 69.2, nr: 64.8, za: 67.4, bb: 59.6, po: 56.6, ke: 61.8 },
    { year: 2024, ba: 88.9, tt: 71.8, tn: 69.7, nr: 65.8, za: 68.2, bb: 60.1, po: 57.3, ke: 62.0 },
    { year: 2025, ba: 89.0, tt: 72.3, tn: 70.1, nr: 66.5, za: 68.8, bb: 60.5, po: 57.9, ke: 62.2 },
    { year: 2026, ba: 89.2, tt: 72.8, tn: 70.5, nr: 67.2, za: 69.4, bb: 60.8, po: 58.5, ke: 62.4 }
];

// Historical Governors (Župani) Party mapping (2001 - 2026)
const governorParties = {
    ba: { 2001: "SDKÚ", 2002: "SDKÚ", 2003: "SDKÚ", 2004: "SDKÚ", 2005: "SDKÚ", 2006: "SMER", 2007: "SMER", 2008: "SMER", 2009: "SMER", 2010: "SDKÚ", 2011: "SDKÚ", 2012: "SDKÚ", 2013: "SDKÚ", 2014: "SDKÚ", 2015: "SDKÚ", 2016: "SDKÚ", 2017: "SDKÚ", 2018: "SaS", 2019: "SaS", 2020: "SaS", 2021: "SaS", 2022: "SaS", 2023: "SaS", 2024: "SaS", 2025: "SaS", 2026: "SaS" },
    tt: { 2001: "HZDS", 2002: "HZDS", 2003: "HZDS", 2004: "HZDS", 2005: "HZDS", 2006: "SMER/HZDS", 2007: "SMER/HZDS", 2008: "SMER/HZDS", 2009: "SMER/HZDS", 2010: "SMER/HZDS", 2011: "SMER/HZDS", 2012: "SMER/HZDS", 2013: "SMER/HZDS", 2014: "SMER/HZDS", 2015: "SMER/HZDS", 2016: "SMER/HZDS", 2017: "SMER/HZDS", 2018: "OĽANO", 2019: "OĽANO", 2020: "OĽANO", 2021: "OĽANO", 2022: "OĽANO", 2023: "OĽANO", 2024: "OĽANO", 2025: "OĽANO", 2026: "OĽANO" },
    tn: { 2001: "HZDS", 2002: "HZDS", 2003: "HZDS", 2004: "HZDS", 2005: "HZDS", 2006: "SMER/HZDS", 2007: "SMER/HZDS", 2008: "SMER/HZDS", 2009: "SMER/HZDS", 2010: "SMER/HZDS", 2011: "SMER/HZDS", 2012: "SMER/HZDS", 2013: "SMER/HZDS", 2014: "SMER", 2015: "SMER", 2016: "SMER", 2017: "SMER", 2018: "SMER", 2019: "SMER", 2020: "SMER", 2021: "SMER", 2022: "SMER", 2023: "SMER", 2024: "SMER", 2025: "SMER", 2026: "SMER" },
    nr: { 2001: "HZDS", 2002: "HZDS", 2003: "HZDS", 2004: "HZDS", 2005: "HZDS", 2006: "HZDS", 2007: "HZDS", 2008: "HZDS", 2009: "SMER", 2010: "SMER", 2011: "SMER", 2012: "SMER", 2013: "SMER", 2014: "SMER", 2015: "SMER", 2016: "SMER", 2017: "SMER", 2018: "SMER", 2019: "SMER", 2020: "SMER", 2021: "SMER", 2022: "SMER", 2023: "HLAS", 2024: "HLAS", 2025: "HLAS", 2026: "HLAS" },
    za: { 2001: "HZDS", 2002: "HZDS", 2003: "HZDS", 2004: "HZDS", 2005: "HZDS", 2006: "SMER", 2007: "SMER", 2008: "SMER", 2009: "SMER", 2010: "SMER", 2011: "SMER", 2012: "SMER", 2013: "SMER", 2014: "SMER", 2015: "SMER", 2016: "SMER", 2017: "SMER", 2018: "OĽANO", 2019: "OĽANO", 2020: "OĽANO", 2021: "OĽANO", 2022: "OĽANO", 2023: "OĽANO", 2024: "OĽANO", 2025: "OĽANO", 2026: "OĽANO" },
    bb: { 2001: "HZDS", 2002: "HZDS", 2003: "HZDS", 2004: "HZDS", 2005: "HZDS", 2006: "SMER", 2007: "SMER", 2008: "SMER", 2009: "SMER", 2010: "SMER", 2011: "SMER", 2012: "SMER", 2013: "SMER", 2014: "ĽSNS", 2015: "ĽSNS", 2016: "ĽSNS", 2017: "ĽSNS", 2018: "NEKA", 2019: "NEKA", 2020: "NEKA", 2021: "NEKA", 2022: "NEKA", 2023: "NEKA", 2024: "NEKA", 2025: "NEKA", 2026: "NEKA" },
    po: { 2001: "HZDS", 2002: "HZDS", 2003: "HZDS", 2004: "HZDS", 2005: "HZDS", 2006: "SMER", 2007: "SMER", 2008: "SMER", 2009: "SMER", 2010: "SMER", 2011: "SMER", 2012: "SMER", 2013: "SMER", 2014: "SMER", 2015: "SMER", 2016: "SMER", 2017: "SMER", 2018: "KDH", 2019: "KDH", 2020: "KDH", 2021: "KDH", 2022: "KDH", 2023: "KDH", 2024: "KDH", 2025: "KDH", 2026: "KDH" },
    ke: { 2001: "KDH", 2002: "KDH", 2003: "KDH", 2004: "KDH", 2005: "KDH", 2006: "SMER", 2007: "SMER", 2008: "SMER", 2009: "SMER", 2010: "SMER", 2011: "SMER", 2012: "SMER", 2013: "SMER", 2014: "SMER", 2015: "SMER", 2016: "SMER", 2017: "SMER", 2018: "NEKA", 2019: "NEKA", 2020: "NEKA", 2021: "NEKA", 2022: "NEKA", 2023: "NEKA", 2024: "NEKA", 2025: "NEKA", 2026: "NEKA" }
};

// Dominant Party summaries (2001 - 2026) for reveal card
const dominantGovernorParties = {
    ba: { party: "SDKÚ / SaS (Pravica)", pct: 84 },
    tt: { party: "HZDS / Nezávislí", pct: 64 },
    tn: { party: "Smer-SD / HZDS", pct: 84 },
    nr: { party: "Smer-SD / HZDS", pct: 100 },
    za: { party: "Smer-SD", pct: 48 },
    bb: { party: "Nezávislí / Smer", pct: 68 },
    po: { party: "Smer-SD / HZDS", pct: 64 },
    ke: { party: "Smer-SD", pct: 48 }
};

const regionNames = {
    ba: "Bratislavský kraj",
    tt: "Trnavský kraj",
    tn: "Trenčiansky kraj",
    nr: "Nitriansky kraj",
    za: "Žilinský kraj",
    bb: "Banskobystrický kraj",
    po: "Prešovský kraj",
    ke: "Košický kraj"
};

const partyColors = {
    "SDKÚ": "#2563eb",
    "SaS": "#22d3ee",
    "HZDS": "#95a5a6",
    "SMER": "#ef4444",
    "SMER/HZDS": "#d35400",
    "OĽANO": "#10b981",
    "HLAS": "#e74c3c",
    "ĽSNS": "#27ae60",
    "KDH": "#f1c40f",
    "NEKA": "#7f8c8d"
};

// State Variables
let currentYearRegionRace = 1993;
let isPlayingRegionRace = false;
let intervalIdRegionRace = null;
const stepSizeRegionRace = 0.08;
const tickSpeedRegionRace = 50;

let playBtnRegionRace, playIconRegionRace, yearSliderRegionRace, yearLabelRegionRace;

function initRegionRaceChart() {
    playBtnRegionRace = document.getElementById('btn-region-race-play');
    playIconRegionRace = document.getElementById('region-race-play-icon');
    yearSliderRegionRace = document.getElementById('region-race-year-slider');
    yearLabelRegionRace = document.getElementById('region-race-year-label');

    if (!playBtnRegionRace || !yearSliderRegionRace || !yearLabelRegionRace) {
        console.warn("Region race chart components not found in DOM.");
        return;
    }

    yearSliderRegionRace.min = 1993;
    yearSliderRegionRace.max = 2026;
    yearSliderRegionRace.value = currentYearRegionRace;

    playBtnRegionRace.addEventListener('click', togglePlayRegionRace);
    yearSliderRegionRace.addEventListener('input', (e) => {
        pauseRegionRace();
        currentYearRegionRace = parseInt(e.target.value);
        updateRegionRaceYearData();
    });

    updateRegionRaceYearData();
}

function updateRegionRaceYearData() {
    const y0 = Math.floor(currentYearRegionRace);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearRegionRace - y0;

    const data0 = regionRaceDataset.find(d => d.year === y0);
    const data1 = regionRaceDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    yearLabelRegionRace.innerText = y0;
    yearSliderRegionRace.value = y0;

    const watermark = document.getElementById('region-race-year-watermark');
    if (watermark) watermark.innerText = y0;

    // Interpolate and construct array of scores
    const keys = ["ba", "tt", "tn", "nr", "za", "bb", "po", "ke"];
    const scores = keys.map(k => {
        const val = data0[k] * (1 - t) + data1[k] * t;
        const party = y0 < 2001 ? "-" : (governorParties[k][y0] || "-");
        return { key: k, name: regionNames[k], score: val, party: party };
    });

    // Sort descending
    scores.sort((a, b) => b.score - a.score);

    // Update Bars in DOM
    const container = document.getElementById("region-race-bars-container");
    if (container) {
        container.innerHTML = "";
        scores.forEach((item, index) => {
            const row = document.createElement("div");
            row.className = "bar-race-row";
            row.style.top = `${index * 36}px`;

            // Badge color
            const badgeBg = partyColors[item.party] || "rgba(255, 255, 255, 0.1)";
            const badgeText = item.party === "-" ? "-" : item.party;

            row.innerHTML = `
                <div class="bar-race-label" style="font-size: 11.5px; width: 140px;">${item.name}</div>
                <div class="bar-race-track" style="flex: 1; height: 24px; position: relative; background: #111215; border-radius: 4px; overflow: hidden;">
                    <div class="bar-race-fill" style="width: ${item.score}%; background: linear-gradient(90deg, var(--color-beige-dark), var(--color-beige)); height: 100%; transition: width 0.1s linear; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; box-sizing: border-box; border-radius: 4px;">
                        ${item.party !== "-" ? `<span class="party-badge" style="background: ${badgeBg}; color: #ffffff; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-right: 4px;">${badgeText}</span>` : ""}
                        <span class="bar-race-value" style="font-size: 11px; font-weight: 700; color: #000000;">${item.score.toFixed(1).replace('.', ',')}</span>
                    </div>
                </div>
            `;
            container.appendChild(row);
        });
    }

    // Toggle Summary Panel at 2026
    const summaryPanel = document.getElementById("region-race-summary-panel");
    if (summaryPanel) {
        if (y0 === 2026) {
            summaryPanel.style.display = "block";
            // Populate summary stats
            const list = document.getElementById("region-race-summary-list");
            if (list) {
                list.innerHTML = "";
                keys.forEach(k => {
                    const row = document.createElement("div");
                    row.style.display = "flex";
                    row.style.justify = "space-between";
                    row.style.borderBottom = "1px solid rgba(255, 255, 255, 0.05)";
                    row.style.padding = "6px 0";
                    row.style.fontSize = "11.5px";
                    row.innerHTML = `
                        <span style="color: var(--color-silver);">${regionNames[k]}</span>
                        <strong style="color: var(--color-beige);">${dominantGovernorParties[k].party} (${dominantGovernorParties[k].pct}%)</strong>
                    `;
                    list.appendChild(row);
                });
            }
        } else {
            summaryPanel.style.display = "none";
        }
    }
}

function togglePlayRegionRace() {
    if (isPlayingRegionRace) {
        pauseRegionRace();
    } else {
        playRegionRace();
    }
}

function playRegionRace() {
    if (currentYearRegionRace >= 2026) {
        currentYearRegionRace = 1993;
    }
    isPlayingRegionRace = true;
    if (playIconRegionRace) playIconRegionRace.className = "fa-solid fa-pause";
    if (playBtnRegionRace) playBtnRegionRace.title = "Pozastaviť";

    intervalIdRegionRace = setInterval(() => {
        currentYearRegionRace += stepSizeRegionRace;
        if (currentYearRegionRace >= 2026) {
            currentYearRegionRace = 2026;
            updateRegionRaceYearData();
            pauseRegionRace();
        } else {
            updateRegionRaceYearData();
        }
    }, tickSpeedRegionRace);
}

function pauseRegionRace() {
    isPlayingRegionRace = false;
    if (playIconRegionRace) playIconRegionRace.className = "fa-solid fa-play";
    if (playBtnRegionRace) playBtnRegionRace.title = "Spustiť prezentáciu";
    if (intervalIdRegionRace) {
        clearInterval(intervalIdRegionRace);
        intervalIdRegionRace = null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initRegionRaceChart, 100);
});
