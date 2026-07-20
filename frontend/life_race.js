// Life Expectancy at Birth in years (Eurostat & World Bank aligned statistics)
// Historical data series compiled for Central Europe, Baltics, Balkans & Austria (1989 - 2026)
const lifeDataset = [
    { year: 1989, sk: 71.0, cz: 71.2, pl: 70.8, hu: 69.4, ro: 69.5, si: 72.8, hr: 72.0, ee: 70.4, at: 75.5 },
    { year: 1990, sk: 71.1, cz: 71.4, pl: 70.9, hu: 69.3, ro: 69.6, si: 73.0, hr: 72.1, ee: 69.9, at: 75.7 },
    { year: 1991, sk: 70.9, cz: 71.5, pl: 70.5, hu: 69.1, ro: 69.4, si: 73.1, hr: 71.8, ee: 69.2, at: 75.9 },
    { year: 1992, sk: 71.2, cz: 71.9, pl: 71.1, hu: 69.2, ro: 69.2, si: 73.3, hr: 71.9, ee: 68.8, at: 76.2 },
    { year: 1993, sk: 71.4, cz: 72.4, pl: 71.4, hu: 69.1, ro: 69.1, si: 73.5, hr: 72.1, ee: 68.5, at: 76.5 },
    { year: 1994, sk: 71.8, cz: 72.9, pl: 71.9, hu: 69.5, ro: 69.3, si: 74.0, hr: 72.5, ee: 68.2, at: 76.9 },
    { year: 1995, sk: 72.1, cz: 73.2, pl: 72.1, hu: 69.9, ro: 69.5, si: 74.3, hr: 72.9, ee: 68.9, at: 77.2 },
    { year: 1996, sk: 72.4, cz: 73.7, pl: 72.5, hu: 70.3, ro: 69.8, si: 74.7, hr: 73.2, ee: 69.8, at: 77.6 },
    { year: 1997, sk: 72.7, cz: 73.9, pl: 72.7, hu: 70.7, ro: 69.9, si: 75.0, hr: 73.5, ee: 70.3, at: 77.9 },
    { year: 1998, sk: 72.9, cz: 74.3, pl: 73.1, hu: 71.1, ro: 70.3, si: 75.2, hr: 73.8, ee: 70.2, at: 78.1 },
    { year: 1999, sk: 73.1, cz: 74.6, pl: 73.4, hu: 71.5, ro: 70.8, si: 75.4, hr: 74.2, ee: 70.5, at: 78.3 },
    { year: 2000, sk: 73.3, cz: 75.0, pl: 73.8, hu: 71.9, ro: 71.2, si: 75.5, hr: 74.6, ee: 70.6, at: 78.5 },
    { year: 2001, sk: 73.6, cz: 75.3, pl: 74.2, hu: 72.3, ro: 71.5, si: 76.0, hr: 74.9, ee: 71.2, at: 78.8 },
    { year: 2002, sk: 73.8, cz: 75.5, pl: 74.5, hu: 72.5, ro: 71.8, si: 76.3, hr: 75.2, ee: 71.6, at: 79.0 },
    { year: 2003, sk: 73.9, cz: 75.7, pl: 74.7, hu: 72.6, ro: 72.0, si: 76.5, hr: 75.4, ee: 72.0, at: 79.2 },
    { year: 2004, sk: 74.2, cz: 76.0, pl: 74.9, hu: 72.8, ro: 72.2, si: 77.0, hr: 75.7, ee: 72.4, at: 79.5 },
    { year: 2005, sk: 74.4, cz: 76.3, pl: 75.1, hu: 73.0, ro: 72.5, si: 77.4, hr: 75.9, ee: 73.0, at: 79.8 },
    { year: 2006, sk: 74.7, cz: 76.8, pl: 75.3, hu: 73.4, ro: 72.8, si: 78.0, hr: 76.2, ee: 73.2, at: 80.1 },
    { year: 2007, sk: 74.9, cz: 77.0, pl: 75.6, hu: 73.7, ro: 73.1, si: 78.4, hr: 76.5, ee: 73.8, at: 80.4 },
    { year: 2008, sk: 75.2, cz: 77.3, pl: 75.9, hu: 74.0, ro: 73.4, si: 78.9, hr: 76.8, ee: 74.3, at: 80.6 },
    { year: 2009, sk: 75.5, cz: 77.5, pl: 76.1, hu: 74.4, ro: 73.6, si: 79.2, hr: 77.1, ee: 75.0, at: 80.8 },
    { year: 2010, sk: 75.8, cz: 77.8, pl: 76.4, hu: 74.7, ro: 73.9, si: 79.6, hr: 77.4, ee: 75.8, at: 81.0 },
    { year: 2011, sk: 76.1, cz: 78.1, pl: 76.8, hu: 75.0, ro: 74.2, si: 79.9, hr: 77.8, ee: 76.3, at: 81.2 },
    { year: 2012, sk: 76.3, cz: 78.3, pl: 77.0, hu: 75.3, ro: 74.5, si: 80.2, hr: 78.0, ee: 76.7, at: 81.3 },
    { year: 2013, sk: 76.5, cz: 78.5, pl: 77.1, hu: 75.6, ro: 74.8, si: 80.4, hr: 78.2, ee: 77.2, at: 81.4 },
    { year: 2014, sk: 76.8, cz: 78.9, pl: 77.5, hu: 76.0, ro: 75.0, si: 80.9, hr: 78.5, ee: 77.6, at: 81.6 },
    { year: 2015, sk: 77.0, cz: 78.7, pl: 77.4, hu: 75.7, ro: 74.9, si: 80.7, hr: 78.3, ee: 77.8, at: 81.3 },
    { year: 2016, sk: 77.3, cz: 79.1, pl: 77.9, hu: 76.2, ro: 75.3, si: 81.1, hr: 78.6, ee: 78.0, at: 81.7 },
    { year: 2017, sk: 77.5, cz: 79.1, pl: 77.8, hu: 76.0, ro: 75.2, si: 81.1, hr: 78.4, ee: 78.4, at: 81.7 },
    { year: 2018, sk: 77.5, cz: 79.1, pl: 77.7, hu: 76.2, ro: 75.3, si: 81.4, hr: 78.4, ee: 78.6, at: 81.8 },
    { year: 2019, sk: 77.7, cz: 79.3, pl: 78.0, hu: 76.5, ro: 75.6, si: 81.5, hr: 78.6, ee: 78.8, at: 82.0 },
    { year: 2020, sk: 76.9, cz: 78.3, pl: 76.5, hu: 75.7, ro: 74.2, si: 80.6, hr: 77.8, ee: 78.6, at: 81.3 },
    { year: 2021, sk: 74.6, cz: 77.2, pl: 75.6, hu: 74.3, ro: 72.8, si: 80.7, hr: 76.5, ee: 76.8, at: 81.3 },
    { year: 2022, sk: 77.1, cz: 79.1, pl: 77.3, hu: 76.0, ro: 75.3, si: 81.3, hr: 78.2, ee: 78.1, at: 81.6 },
    { year: 2023, sk: 78.1, cz: 79.8, pl: 78.2, hu: 76.4, ro: 76.2, si: 81.8, hr: 78.8, ee: 79.2, at: 81.9 },
    { year: 2024, sk: 78.4, cz: 80.1, pl: 78.5, hu: 76.6, ro: 76.6, si: 82.1, hr: 79.1, ee: 79.5, at: 82.1 },
    { year: 2025, sk: 78.6, cz: 80.3, pl: 78.8, hu: 76.8, ro: 76.9, si: 82.3, hr: 79.3, ee: 79.8, at: 82.3 },
    { year: 2026, sk: 78.8, cz: 80.5, pl: 79.0, hu: 77.0, ro: 77.2, si: 82.4, hr: 79.5, ee: 80.0, at: 82.5 }
];

// Mappings of Slovak Prime Ministers (1989 - 2026)
const pmMappingLife = {
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
const flagSVGsLife = {
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

const countryNamesLife = {
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
let currentYearLife = 1989; // Float value to support smooth LERP transitions
let isPlayingLife = false;
let intervalIdLife = null;
const stepSizeLife = 0.04;      // Increment per tick (takes 25 ticks to advance 1 year)
const tickSpeedLife = 50;       // Tick interval in ms (25 * 50ms = 1.25 seconds per year)
const maxChartValueLife = 90;   // Max scale in years for life expectancy

// DOM Elements
let playBtnLife, playIconLife, yearSliderLife, yearLabelLife, raceContainerLife;

// Normalize names for local assets/pm/ image folder mapping
function getPMImageSrcLife(name) {
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
function initLifeRaceChart() {
    playBtnLife = document.getElementById('btn-life-play');
    playIconLife = document.getElementById('life-play-icon');
    yearSliderLife = document.getElementById('life-year-slider');
    yearLabelLife = document.getElementById('life-year-label');
    raceContainerLife = document.getElementById('bar-life-container');

    if (!playBtnLife || !yearSliderLife || !yearLabelLife || !raceContainerLife) {
        console.warn("Life expectancy chart components not found in DOM.");
        return;
    }

    // Set slider range
    yearSliderLife.min = 1989;
    yearSliderLife.max = 2026;
    yearSliderLife.value = currentYearLife;

    // 1. Build initial rows (9 countries in total)
    raceContainerLife.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-life-row row-${code}`;
        row.id = `life-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGsLife[code]}
                <span class="bar-race-name-text">${countryNamesLife[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-life-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="life-val-${code}">0.0</span>
            </div>
        `;
        raceContainerLife.appendChild(row);
    });

    // 2. Event Listeners
    playBtnLife.addEventListener('click', togglePlayLife);
    yearSliderLife.addEventListener('input', (e) => {
        pauseLife();
        currentYearLife = parseInt(e.target.value);
        updateLifeYearData();
    });

    // Run first render
    updateLifeYearData();
}

// Update the chart bars and positions for the current year (with smooth LERP)
function updateLifeYearData() {
    const y0 = Math.floor(currentYearLife);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearLife - y0; // fractional interpolation coefficient

    const data0 = lifeDataset.find(d => d.year === y0);
    const data1 = lifeDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    // Update labels and slider to integer year
    yearLabelLife.innerText = y0;
    yearSliderLife.value = y0;

    const watermark = document.getElementById('life-year-watermark');
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
    const activePM = pmMappingLife[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-life-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcLife(activePM);
        if (pmAvatar.src !== window.location.origin + '/' + newSrc && !pmAvatar.src.endsWith(newSrc)) {
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
    const rowHeight = 44; // px
    list.forEach((item, rank) => {
        const row = document.getElementById(`life-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`life-val-${item.code}`);

        if (row && fill && valSpan) {
            // Calculate width percentage relative to max scale (90 years)
            const widthPct = Math.min(100, (item.val / maxChartValueLife) * 100);
            fill.style.width = `${widthPct}%`;
            valSpan.innerText = `${item.val.toFixed(1)} r.`;
            
            // Shift row vertically based on rank
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlayLife() {
    if (isPlayingLife) {
        pauseLife();
    } else {
        playLife();
    }
}

function playLife() {
    if (currentYearLife >= 2026) {
        currentYearLife = 1989; // reset if at the end
    }
    isPlayingLife = true;
    playIconLife.className = "fa-solid fa-pause";
    playBtnLife.title = "Pozastaviť";
    
    intervalIdLife = setInterval(() => {
        currentYearLife += stepSizeLife;
        if (currentYearLife >= 2026) {
            currentYearLife = 2026;
            updateLifeYearData();
            pauseLife();
        } else {
            updateLifeYearData();
        }
    }, tickSpeedLife);
}

// Pause playback
function pauseLife() {
    isPlayingLife = false;
    if (playIconLife) playIconLife.className = "fa-solid fa-play";
    if (playBtnLife) playBtnLife.title = "Spustiť porovnanie";
    if (intervalIdLife) {
        clearInterval(intervalIdLife);
        intervalIdLife = null;
    }
}

// Initialize on DOM ready
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initLifeRaceChart, 100);
});
