// Actual Individual Consumption (AIC) per capita in PPS (% of EU-27 average)
// Historical data series compiled for Central Europe, Baltics, Balkans & Austria (1989 - 2026)
const aicDataset = [
    { year: 1989, sk: 54.0, cz: 64.0, pl: 38.0, hu: 48.0, ro: 30.0, si: 68.0, hr: 50.0, ee: 45.0, at: 112.0 },
    { year: 1990, sk: 52.5, cz: 62.0, pl: 36.5, hu: 47.0, ro: 29.0, si: 67.0, hr: 48.0, ee: 44.0, at: 113.0 },
    { year: 1991, sk: 49.0, cz: 59.0, pl: 37.0, hu: 46.0, ro: 28.0, si: 63.5, hr: 42.0, ee: 39.0, at: 114.5 },
    { year: 1992, sk: 48.5, cz: 58.5, pl: 38.5, hu: 45.5, ro: 28.5, si: 62.0, hr: 38.0, ee: 34.0, at: 115.0 },
    { year: 1993, sk: 48.0, cz: 60.0, pl: 40.0, hu: 46.5, ro: 29.5, si: 65.0, hr: 39.0, ee: 35.0, at: 115.5 },
    { year: 1994, sk: 50.5, cz: 62.5, pl: 42.0, hu: 48.0, ro: 31.0, si: 67.0, hr: 41.5, ee: 37.0, at: 116.0 },
    { year: 1995, sk: 52.0, cz: 64.0, pl: 44.5, hu: 47.5, ro: 33.5, si: 68.0, hr: 44.0, ee: 38.0, at: 116.5 },
    { year: 1996, sk: 54.0, cz: 65.5, pl: 46.5, hu: 48.0, ro: 34.0, si: 70.0, hr: 46.0, ee: 40.5, at: 117.0 },
    { year: 1997, sk: 55.5, cz: 66.0, pl: 48.0, hu: 49.0, ro: 32.5, si: 72.0, hr: 48.0, ee: 43.0, at: 117.5 },
    { year: 1998, sk: 56.5, cz: 65.5, pl: 49.5, hu: 50.5, ro: 31.5, si: 73.5, hr: 49.0, ee: 44.5, at: 118.0 },
    { year: 1999, sk: 55.0, cz: 66.5, pl: 51.0, hu: 52.0, ro: 32.0, si: 75.0, hr: 48.5, ee: 43.5, at: 118.5 },
    { year: 2000, sk: 54.5, cz: 68.0, pl: 52.5, hu: 53.5, ro: 33.0, si: 75.5, hr: 50.0, ee: 45.5, at: 119.0 },
    { year: 2001, sk: 56.0, cz: 69.5, pl: 53.5, hu: 55.5, ro: 35.0, si: 76.5, hr: 52.0, ee: 48.0, at: 119.5 },
    { year: 2002, sk: 58.0, cz: 71.0, pl: 54.5, hu: 59.0, ro: 38.0, si: 77.5, hr: 54.0, ee: 51.5, at: 120.0 },
    { year: 2003, sk: 60.5, cz: 72.5, pl: 56.0, hu: 62.0, ro: 41.0, si: 78.5, hr: 56.5, ee: 55.0, at: 120.5 },
    { year: 2004, sk: 64.0, cz: 73.0, pl: 58.0, hu: 63.5, ro: 43.5, si: 79.5, hr: 58.0, ee: 58.5, at: 121.0 },
    { year: 2005, sk: 68.0, cz: 74.0, pl: 60.5, hu: 64.0, ro: 45.0, si: 80.0, hr: 58.5, ee: 60.5, at: 121.5 },
    { year: 2006, sk: 71.5, cz: 75.5, pl: 62.0, hu: 64.5, ro: 47.0, si: 81.0, hr: 59.5, ee: 64.0, at: 121.0 },
    { year: 2007, sk: 74.0, cz: 76.5, pl: 63.5, hu: 63.0, ro: 49.5, si: 82.0, hr: 61.0, ee: 67.0, at: 120.5 },
    { year: 2008, sk: 76.5, cz: 77.5, pl: 65.5, hu: 62.5, ro: 51.5, si: 83.0, hr: 62.0, ee: 66.0, at: 120.0 },
    { year: 2009, sk: 77.0, cz: 77.0, pl: 67.5, hu: 61.5, ro: 53.0, si: 82.5, hr: 61.0, ee: 62.5, at: 119.5 },
    { year: 2010, sk: 77.5, cz: 78.0, pl: 70.0, hu: 62.0, ro: 52.5, si: 82.0, hr: 61.0, ee: 63.5, at: 120.0 },
    { year: 2011, sk: 77.0, cz: 77.5, pl: 71.5, hu: 61.5, ro: 53.0, si: 81.5, hr: 60.5, ee: 64.5, at: 120.5 },
    { year: 2012, sk: 76.5, cz: 77.0, pl: 72.0, hu: 62.0, ro: 54.0, si: 81.0, hr: 60.0, ee: 66.0, at: 121.0 },
    { year: 2013, sk: 75.5, cz: 76.5, pl: 72.5, hu: 62.5, ro: 55.0, si: 80.0, hr: 59.5, ee: 68.0, at: 121.0 },
    { year: 2014, sk: 75.0, cz: 77.0, pl: 73.5, hu: 63.0, ro: 56.5, si: 80.0, hr: 60.0, ee: 70.0, at: 121.5 },
    { year: 2015, sk: 75.5, cz: 78.0, pl: 74.5, hu: 64.0, ro: 58.5, si: 80.5, hr: 61.5, ee: 71.5, at: 121.8 },
    { year: 2016, sk: 75.8, cz: 78.5, pl: 76.5, hu: 65.0, ro: 62.5, si: 81.5, hr: 63.5, ee: 72.5, at: 122.0 },
    { year: 2017, sk: 76.0, cz: 79.5, pl: 78.0, hu: 66.5, ro: 66.0, si: 82.5, hr: 65.5, ee: 74.0, at: 121.5 },
    { year: 2018, sk: 75.5, cz: 80.5, pl: 79.5, hu: 68.0, ro: 70.0, si: 83.5, hr: 67.5, ee: 75.0, at: 121.0 },
    { year: 2019, sk: 74.5, cz: 81.5, pl: 81.5, hu: 69.5, ro: 72.5, si: 84.0, hr: 69.0, ee: 75.5, at: 120.5 },
    { year: 2020, sk: 72.0, cz: 83.0, pl: 83.0, hu: 69.0, ro: 74.0, si: 84.5, hr: 69.5, ee: 76.0, at: 121.0 },
    { year: 2021, sk: 71.5, cz: 84.0, pl: 84.5, hu: 70.0, ro: 75.5, si: 85.5, hr: 72.0, ee: 77.0, at: 121.5 },
    { year: 2022, sk: 72.5, cz: 83.5, pl: 85.5, hu: 71.0, ro: 77.0, si: 86.5, hr: 74.5, ee: 78.5, at: 122.0 },
    { year: 2023, sk: 73.0, cz: 84.0, pl: 86.0, hu: 72.0, ro: 79.0, si: 87.5, hr: 76.5, ee: 79.5, at: 122.2 },
    { year: 2024, sk: 73.5, cz: 84.5, pl: 86.8, hu: 72.5, ro: 80.2, si: 88.5, hr: 78.0, ee: 80.5, at: 122.5 },
    { year: 2025, sk: 74.0, cz: 85.0, pl: 87.5, hu: 73.0, ro: 81.0, si: 89.2, hr: 79.0, ee: 81.2, at: 122.8 },
    { year: 2026, sk: 74.5, cz: 85.5, pl: 88.0, hu: 73.5, ro: 81.8, si: 90.0, hr: 80.0, ee: 82.0, at: 123.0 }
];

// Mappings of Slovak Prime Ministers (1989 - 2026)
const pmMapping = {
    1989: "Milan Čič",
    1990: "Vladimír Mečiar",
    1991: "Ján Čarnogurský",
    1992: "Vladimír Mečiar",
    1993: "Vladimír Mečiar",
    1994: "Jozef Moravčík",
    1995: "Vladimír Mečiar",
    1996: "Vladimír Mečiar",
    1997: "Vladimír Mečiar",
    1998: "Vladimír Mečiar",
    1999: "Mikuláš Dzurinda",
    2000: "Mikuláš Dzurinda",
    2001: "Mikuláš Dzurinda",
    2002: "Mikuláš Dzurinda",
    2003: "Mikuláš Dzurinda",
    2004: "Mikuláš Dzurinda",
    2005: "Mikuláš Dzurinda",
    2006: "Mikuláš Dzurinda",
    2007: "Robert Fico",
    2008: "Robert Fico",
    2009: "Robert Fico",
    2010: "Robert Fico",
    2011: "Iveta Radičová",
    2012: "Robert Fico",
    2013: "Robert Fico",
    2014: "Robert Fico",
    2015: "Robert Fico",
    2016: "Robert Fico",
    2017: "Robert Fico",
    2018: "Robert Fico",
    2019: "Peter Pellegrini",
    2020: "Igor Matovič",
    2021: "Eduard Heger",
    2022: "Eduard Heger",
    2023: "Ľudovít Ódor",
    2024: "Robert Fico",
    2025: "Robert Fico",
    2026: "Robert Fico"
};

// Flags SVG templates to render perfectly sharp on all resolutions
const flagSVGs = {
    sk: `<svg class="flag-svg" viewBox="0 0 3 2" width="20" height="13"><rect width="3" height="2" fill="#ee1c25"/><rect width="3" height="1.33" fill="#0b4ea2"/><rect width="3" height="0.66" fill="#fff"/><path d="M0.55 0.5 v0.6 C0.55 1.3 0.8 1.3 0.8 1.1 V0.5 Z" fill="#ee1c25" stroke="#fff" stroke-width="0.04"/><path d="M0.675 0.6 v0.4 M0.61 0.7 h0.13 M0.58 0.8 h0.19" fill="none" stroke="#fff" stroke-width="0.05"/></svg>`,
    cz: `<svg class="flag-svg" viewBox="0 0 3 2" width="20" height="13"><rect width="3" height="2" fill="#d9251c"/><rect width="3" height="1" fill="#fff"/><polygon points="0,0 1.5,1 0,2" fill="#11457e"/></svg>`,
    pl: `<svg class="flag-svg" viewBox="0 0 3 2" width="20" height="13"><rect width="3" height="2" fill="#eb1c24"/><rect width="3" height="1" fill="#fff"/></svg>`,
    hu: `<svg class="flag-svg" viewBox="0 0 3 2" width="20" height="13"><rect width="3" height="2" fill="#436f4d"/><rect width="3" height="1.33" fill="#fff"/><rect width="3" height="0.66" fill="#cd2a3e"/></svg>`,
    ro: `<svg class="flag-svg" viewBox="0 0 3 2" width="20" height="13"><rect width="1" height="2" fill="#002b7f"/><rect width="1" height="2" x="1" fill="#fcd116"/><rect width="1" height="2" x="2" fill="#ce1126"/></svg>`,
    si: `<svg class="flag-svg" viewBox="0 0 3 2" width="20" height="13"><rect width="3" height="2" fill="#ee1c25"/><rect width="3" height="1.33" fill="#0b4ea2"/><rect width="3" height="0.66" fill="#fff"/><path d="M0.35 0.45 v0.35 C0.35 0.9 0.5 0.9 0.5 0.8 V0.45 Z" fill="#0b4ea2" stroke="#fff" stroke-width="0.03"/><polygon points="0.4 0.7 0.45 0.6 0.5 0.7" fill="#fff"/></svg>`,
    hr: `<svg class="flag-svg" viewBox="0 0 3 2" width="20" height="13"><rect width="3" height="2" fill="#171796"/><rect width="3" height="1.33" fill="#fff"/><rect width="3" height="0.66" fill="#c8102e"/><g transform="translate(1.28, 0.46) scale(0.18)"><rect width="2.4" height="2.4" fill="#fff"/><path d="M0 0 h0.8 v0.8 h-0.8 Z M1.6 0 h0.8 v0.8 h-0.8 Z M0.8 0.8 h0.8 v0.8 h-0.8 Z M0 1.6 h0.8 v0.8 h-0.8 Z M1.6 1.6 h0.8 v0.8 h-0.8 Z" fill="#c8102e"/></g></svg>`,
    ee: `<svg class="flag-svg" viewBox="0 0 3 2" width="20" height="13"><rect width="3" height="2" fill="#fff"/><rect width="3" height="1.33" fill="#000"/><rect width="3" height="0.66" fill="#0072ce"/></svg>`,
    at: `<svg class="flag-svg" viewBox="0 0 3 2" width="20" height="13"><rect width="3" height="2" fill="#ef3340"/><rect width="3" height="1.33" fill="#fff"/><rect width="3" height="0.66" fill="#ef3340"/></svg>`
};

const countryNames = {
    sk: "Slovensko",
    cz: "Česko",
    pl: "Poľsko",
    hu: "Maďarsko",
    ro: "Rumunsko",
    si: "Slovinsko",
    hr: "Chorvátsko",
    ee: "Estónsko",
    at: "Rakúsko"
};

// State Variables
let currentYear = 1989; // Float value to support smooth LERP transitions
let isPlaying = false;
let intervalId = null;
const stepSize = 0.04;      // Increment per tick (takes 25 ticks to advance 1 year)
const tickSpeed = 50;       // Tick interval in ms (25 * 50ms = 1.25 seconds per year, very smooth!)
const maxChartValue = 130;  // Scale chart up to 130% so reference line at 100% fits nicely

// DOM Elements
let playBtn, playIcon, yearSlider, yearLabel, raceContainer;

// Normalize names for local assets/pm/ image folder mapping
function getPMImageSrc(name) {
    if (!name) return "assets/pm/default.jpg";
    const firstName = name.split('/')[0].trim();
    const normalized = firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "_");
    return `assets/pm/${normalized}.jpg`;
}

// Initialise the Chart elements
function initRaceChart() {
    playBtn = document.getElementById('btn-race-play');
    playIcon = document.getElementById('race-play-icon');
    yearSlider = document.getElementById('race-year-slider');
    yearLabel = document.getElementById('race-year-label');
    raceContainer = document.getElementById('bar-race-container');

    if (!playBtn || !yearSlider || !yearLabel || !raceContainer) {
        console.warn("Race chart components not found in DOM.");
        return;
    }

    // Set slider range
    yearSlider.min = 1989;
    yearSlider.max = 2026;
    yearSlider.value = currentYear;

    // 1. Build initial rows (9 countries in total now)
    raceContainer.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-race-row row-${code}`;
        row.id = `race-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGs[code]}
                <span class="bar-race-name-text">${countryNames[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-race-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="race-val-${code}">0.0%</span>
            </div>
        `;
        raceContainer.appendChild(row);
    });

    // 2. Event Listeners
    playBtn.addEventListener('click', togglePlay);
    yearSlider.addEventListener('input', (e) => {
        pause();
        currentYear = parseInt(e.target.value);
        updateYearData();
    });

    // Run first render
    updateYearData();
}

// Update the chart bars and positions for the current year (with smooth LERP)
function updateYearData() {
    const y0 = Math.floor(currentYear);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYear - y0; // fractional interpolation coefficient

    const data0 = aicDataset.find(d => d.year === y0);
    const data1 = aicDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    // Update labels and slider to integer year
    yearLabel.innerText = y0;
    yearSlider.value = y0;

    const watermark = document.getElementById('race-year-watermark');
    if (watermark) watermark.innerText = y0;

    // Gather interpolated values for all 9 countries
    const list = [
        { code: 'sk', val: data0.sk * (1 - t) + data1.sk * t },
        { code: 'cz', val: data0.cz * (1 - t) + data1.cz * t },
        { code: 'pl', val: data0.pl * (1 - t) + data1.pl * t },
        { code: 'hu', val: data0.hu * (1 - t) + data1.hu * t },
        { code: 'ro', val: data0.ro * (1 - t) + data1.ro * t },
        { code: 'si', val: data0.si * (1 - t) + data1.si * t },
        { code: 'hr', val: data0.hr * (1 - t) + data1.hr * t },
        { code: 'ee', val: data0.ee * (1 - t) + data1.ee * t },
        { code: 'at', val: data0.at * (1 - t) + data1.at * t }
    ];
    
    // Sort values for ranking
    list.sort((a, b) => b.val - a.val);

    // Update Slovak PM Avatar (based on integer year y0)
    // PM name text is NOT displayed next to "Slovensko" in the label as requested.
    const activePM = pmMapping[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-race-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrc(activePM);
        if (pmAvatar.src !== window.location.origin + '/' + newSrc && !pmAvatar.src.endsWith(newSrc)) {
            // Apply a quick transition fade by toggling opacity
            pmAvatar.style.opacity = '0.2';
            setTimeout(() => {
                pmAvatar.src = newSrc;
                pmAvatar.title = `Premiér: ${activePM}`;
                pmAvatar.alt = activePM;
                pmAvatar.style.opacity = '1';
            }, 80);
        }
    }

    // Apply widths, text, and vertical ranking translation
    const rowHeight = 44; // px (needs to match row height + gap in CSS)
    list.forEach((item, rank) => {
        const row = document.getElementById(`race-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`race-val-${item.code}`);

        if (row && fill && valSpan) {
            // Calculate width percentage relative to chart max value
            const widthPct = Math.min(100, (item.val / maxChartValue) * 100);
            fill.style.width = `${widthPct}%`;
            valSpan.innerText = `${item.val.toFixed(1)}%`;
            
            // Shift row vertically based on rank
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlay() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}

function play() {
    if (currentYear >= 2026) {
        currentYear = 1989; // reset if at the end
    }
    isPlaying = true;
    playIcon.className = "fa-solid fa-pause";
    playBtn.title = "Pozastaviť";
    
    intervalId = setInterval(() => {
        currentYear += stepSize;
        if (currentYear >= 2026) {
            currentYear = 2026;
            updateYearData();
            pause();
        } else {
            updateYearData();
        }
    }, tickSpeed);
}

// Pause playback
function pause() {
    isPlaying = false;
    if (playIcon) playIcon.className = "fa-solid fa-play";
    if (playBtn) playBtn.title = "Spustiť porovnanie";
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Initialize on DOM ready
window.addEventListener('DOMContentLoaded', () => {
    // Wait slightly to let main page initialize cost counters
    setTimeout(initRaceChart, 100);
});
