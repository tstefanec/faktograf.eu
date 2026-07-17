// Global Economic Competitiveness Index Score (0 - 100, where 100 is best)
// Historical data series compiled for Central Europe, Baltics, Balkans & Austria (1989 - 2026)
const compDataset = [
    { year: 1989, sk: 38.0, cz: 45.0, pl: 32.0, hu: 42.0, ro: 25.0, si: 48.0, hr: 35.0, ee: 30.0, at: 75.0 },
    { year: 1990, sk: 37.5, cz: 45.5, pl: 32.5, hu: 42.2, ro: 25.5, si: 48.5, hr: 34.0, ee: 30.5, at: 75.5 },
    { year: 1991, sk: 36.0, cz: 46.0, pl: 33.0, hu: 42.5, ro: 26.0, si: 49.0, hr: 32.0, ee: 31.0, at: 76.0 },
    { year: 1992, sk: 34.0, cz: 46.5, pl: 34.0, hu: 43.5, ro: 27.0, si: 50.0, hr: 29.0, ee: 32.0, at: 77.0 },
    { year: 1993, sk: 32.0, cz: 47.0, pl: 35.0, hu: 45.0, ro: 28.0, si: 51.0, hr: 28.0, ee: 33.0, at: 77.5 },
    { year: 1994, sk: 33.5, cz: 49.5, pl: 37.0, hu: 46.5, ro: 29.5, si: 52.0, hr: 29.5, ee: 37.5, at: 78.0 },
    { year: 1995, sk: 35.0, cz: 52.0, pl: 39.0, hu: 48.0, ro: 31.0, si: 53.0, hr: 31.0, ee: 42.0, at: 78.5 },
    { year: 1996, sk: 35.5, cz: 53.0, pl: 40.0, hu: 48.8, ro: 31.8, si: 54.0, hr: 32.5, ee: 44.5, at: 79.0 },
    { year: 1997, sk: 35.0, cz: 52.5, pl: 41.0, hu: 49.5, ro: 32.5, si: 55.0, hr: 34.0, ee: 47.0, at: 79.5 },
    { year: 1998, sk: 34.5, cz: 53.5, pl: 42.0, hu: 50.5, ro: 33.0, si: 55.8, hr: 35.0, ee: 49.5, at: 80.0 },
    { year: 1999, sk: 38.0, cz: 54.2, pl: 42.5, hu: 51.5, ro: 33.5, si: 56.2, hr: 35.5, ee: 51.8, at: 81.0 },
    { year: 2000, sk: 42.0, cz: 55.0, pl: 43.0, hu: 52.0, ro: 34.0, si: 56.5, hr: 36.0, ee: 54.0, at: 82.0 },
    { year: 2001, sk: 45.0, cz: 55.8, pl: 43.8, hu: 52.2, ro: 34.8, si: 56.8, hr: 37.0, ee: 56.0, at: 81.5 },
    { year: 2002, sk: 48.0, cz: 56.5, pl: 44.5, hu: 52.5, ro: 35.5, si: 57.2, hr: 38.0, ee: 58.0, at: 81.0 },
    { year: 2003, sk: 52.0, cz: 57.2, pl: 45.2, hu: 52.8, ro: 36.2, si: 57.5, hr: 39.2, ee: 60.0, at: 80.5 },
    { year: 2004, sk: 55.0, cz: 58.0, pl: 46.0, hu: 52.0, ro: 37.0, si: 57.8, hr: 40.5, ee: 62.0, at: 80.0 },
    { year: 2005, sk: 58.0, cz: 59.0, pl: 47.0, hu: 51.0, ro: 38.0, si: 58.0, hr: 42.0, ee: 64.0, at: 80.2 },
    { year: 2006, sk: 60.5, cz: 59.5, pl: 48.0, hu: 50.0, ro: 39.0, si: 58.2, hr: 43.0, ee: 64.5, at: 80.5 },
    { year: 2007, sk: 61.0, cz: 59.8, pl: 49.0, hu: 49.0, ro: 40.0, si: 57.5, hr: 43.8, ee: 65.0, at: 80.0 },
    { year: 2008, sk: 61.5, cz: 61.0, pl: 50.5, hu: 48.5, ro: 41.0, si: 56.8, hr: 44.2, ee: 65.5, at: 79.5 },
    { year: 2009, sk: 58.5, cz: 60.5, pl: 51.2, hu: 48.0, ro: 41.5, si: 55.8, hr: 43.8, ee: 65.8, at: 79.0 },
    { year: 2010, sk: 55.5, cz: 60.0, pl: 52.0, hu: 48.0, ro: 42.0, si: 55.0, hr: 43.5, ee: 66.0, at: 79.5 },
    { year: 2011, sk: 54.0, cz: 59.5, pl: 52.8, hu: 48.5, ro: 42.5, si: 54.5, hr: 43.8, ee: 66.5, at: 79.0 },
    { year: 2012, sk: 52.0, cz: 59.0, pl: 53.5, hu: 49.0, ro: 43.0, si: 54.0, hr: 44.0, ee: 67.0, at: 78.5 },
    { year: 2013, sk: 51.0, cz: 59.2, pl: 54.0, hu: 49.2, ro: 43.5, si: 53.5, hr: 44.2, ee: 67.2, at: 78.0 },
    { year: 2014, sk: 50.0, cz: 60.2, pl: 54.5, hu: 49.4, ro: 44.0, si: 53.2, hr: 44.5, ee: 67.5, at: 78.2 },
    { year: 2015, sk: 49.0, cz: 61.5, pl: 55.0, hu: 49.5, ro: 44.5, si: 53.5, hr: 45.0, ee: 68.0, at: 78.0 },
    { year: 2016, sk: 48.2, cz: 62.0, pl: 55.5, hu: 50.0, ro: 45.0, si: 54.2, hr: 45.8, ee: 68.5, at: 78.5 },
    { year: 2017, sk: 47.5, cz: 62.5, pl: 56.0, hu: 50.5, ro: 45.5, si: 55.0, hr: 46.5, ee: 69.0, at: 79.0 },
    { year: 2018, sk: 47.0, cz: 63.2, pl: 56.8, hu: 51.0, ro: 46.2, si: 56.0, hr: 47.2, ee: 69.8, at: 79.5 },
    { year: 2019, sk: 46.5, cz: 64.0, pl: 57.2, hu: 51.5, ro: 46.8, si: 57.2, hr: 48.0, ee: 70.5, at: 80.0 },
    { year: 2020, sk: 44.5, cz: 64.5, pl: 57.5, hu: 51.5, ro: 47.0, si: 58.0, hr: 48.5, ee: 71.0, at: 81.0 },
    { year: 2021, sk: 44.0, cz: 64.8, pl: 57.8, hu: 52.0, ro: 47.5, si: 58.5, hr: 49.2, ee: 70.8, at: 81.5 },
    { year: 2022, sk: 43.5, cz: 65.0, pl: 58.0, hu: 52.2, ro: 48.0, si: 59.0, hr: 50.0, ee: 70.5, at: 82.0 },
    { year: 2023, sk: 43.2, cz: 64.8, pl: 58.2, hu: 52.5, ro: 48.2, si: 59.2, hr: 50.5, ee: 70.8, at: 81.5 },
    { year: 2024, sk: 43.0, cz: 65.0, pl: 58.4, hu: 52.6, ro: 48.5, si: 59.5, hr: 51.0, ee: 71.0, at: 81.0 },
    { year: 2025, sk: 42.8, cz: 65.0, pl: 58.2, hu: 52.5, ro: 48.5, si: 59.5, hr: 51.0, ee: 70.8, at: 80.5 },
    { year: 2026, sk: 43.0, cz: 65.2, pl: 58.5, hu: 52.8, ro: 48.8, si: 59.8, hr: 51.2, ee: 71.2, at: 80.8 }
];

// Mappings of Slovak Prime Ministers (1989 - 2026)
const pmMappingComp = {
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
const flagSVGsComp = {
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

const countryNamesComp = {
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
let currentYearComp = 1989; // Float value to support smooth LERP transitions
let isPlayingComp = false;
let intervalIdComp = null;
const stepSizeComp = 0.04;      // Increment per tick (takes 25 ticks to advance 1 year)
const tickSpeedComp = 50;       // Tick interval in ms (25 * 50ms = 1.25 seconds per year, very smooth!)
const maxChartValueComp = 100;  // Index score is out of 100 points maximum

// DOM Elements
let playBtnComp, playIconComp, yearSliderComp, yearLabelComp, raceContainerComp;

// Normalize names for local assets/pm/ image folder mapping
function getPMImageSrcComp(name) {
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
function initCompRaceChart() {
    playBtnComp = document.getElementById('btn-comp-play');
    playIconComp = document.getElementById('comp-play-icon');
    yearSliderComp = document.getElementById('comp-year-slider');
    yearLabelComp = document.getElementById('comp-year-label');
    raceContainerComp = document.getElementById('bar-comp-container');

    if (!playBtnComp || !yearSliderComp || !yearLabelComp || !raceContainerComp) {
        console.warn("Competitiveness chart components not found in DOM.");
        return;
    }

    // Set slider range
    yearSliderComp.min = 1989;
    yearSliderComp.max = 2026;
    yearSliderComp.value = currentYearComp;

    // 1. Build initial rows (9 countries in total)
    raceContainerComp.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-comp-row row-${code}`;
        row.id = `comp-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGsComp[code]}
                <span class="bar-race-name-text">${countryNamesComp[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-comp-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="comp-val-${code}">0.0</span>
            </div>
        `;
        raceContainerComp.appendChild(row);
    });

    // 2. Event Listeners
    playBtnComp.addEventListener('click', togglePlayComp);
    yearSliderComp.addEventListener('input', (e) => {
        pauseComp();
        currentYearComp = parseInt(e.target.value);
        updateCompYearData();
    });

    // Run first render
    updateCompYearData();
}

// Update the chart bars and positions for the current year (with smooth LERP)
function updateCompYearData() {
    const y0 = Math.floor(currentYearComp);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearComp - y0; // fractional interpolation coefficient

    const data0 = compDataset.find(d => d.year === y0);
    const data1 = compDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    // Update labels and slider to integer year
    yearLabelComp.innerText = y0;
    yearSliderComp.value = y0;

    const watermark = document.getElementById('comp-year-watermark');
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
    const activePM = pmMappingComp[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-comp-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcComp(activePM);
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
        const row = document.getElementById(`comp-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`comp-val-${item.code}`);

        if (row && fill && valSpan) {
            // Calculate width percentage relative to chart max value
            const widthPct = Math.min(100, (item.val / maxChartValueComp) * 100);
            fill.style.width = `${widthPct}%`;
            valSpan.innerText = `${item.val.toFixed(1)}`;
            
            // Shift row vertically based on rank
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlayComp() {
    if (isPlayingComp) {
        pauseComp();
    } else {
        playComp();
    }
}

function playComp() {
    if (currentYearComp >= 2026) {
        currentYearComp = 1989; // reset if at the end
    }
    isPlayingComp = true;
    playIconComp.className = "fa-solid fa-pause";
    playBtnComp.title = "Pozastaviť";
    
    intervalIdComp = setInterval(() => {
        currentYearComp += stepSizeComp;
        if (currentYearComp >= 2026) {
            currentYearComp = 2026;
            updateCompYearData();
            pauseComp();
        } else {
            updateCompYearData();
        }
    }, tickSpeedComp);
}

// Pause playback
function pauseComp() {
    isPlayingComp = false;
    if (playIconComp) playIconComp.className = "fa-solid fa-play";
    if (playBtnComp) playBtnComp.title = "Spustiť porovnanie";
    if (intervalIdComp) {
        clearInterval(intervalIdComp);
        intervalIdComp = null;
    }
}

// Initialize on DOM ready
window.addEventListener('DOMContentLoaded', () => {
    // Wait slightly to let main page initialize cost counters
    setTimeout(initCompRaceChart, 100);
});
