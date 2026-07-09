// Household Debt as a percentage of nominal GDP (% of GDP)
// Historical data series compiled for Central Europe, Baltics, Balkans & Austria (1989 - 2026)
const debtDataset = [
    { year: 1989, sk: 4.0, cz: 6.0, pl: 3.0, hu: 10.0, ro: 1.0, si: 10.0, hr: 12.0, ee: 2.0, at: 35.0 },
    { year: 1990, sk: 4.2, cz: 6.2, pl: 3.2, hu: 9.8, ro: 1.1, si: 9.8, hr: 11.5, ee: 1.9, at: 35.5 },
    { year: 1991, sk: 4.5, cz: 6.3, pl: 3.5, hu: 9.5, ro: 1.2, si: 9.5, hr: 11.0, ee: 1.8, at: 36.5 },
    { year: 1992, sk: 4.8, cz: 6.5, pl: 3.8, hu: 9.2, ro: 1.3, si: 9.2, hr: 10.5, ee: 1.7, at: 37.0 },
    { year: 1993, sk: 5.0, cz: 6.8, pl: 4.0, hu: 9.0, ro: 1.4, si: 10.0, hr: 9.0, ee: 1.8, at: 38.0 },
    { year: 1994, sk: 5.5, cz: 7.2, pl: 4.5, hu: 8.8, ro: 1.6, si: 10.8, hr: 10.0, ee: 2.0, at: 39.5 },
    { year: 1995, sk: 6.0, cz: 7.5, pl: 5.0, hu: 8.5, ro: 1.8, si: 11.5, hr: 11.5, ee: 2.2, at: 41.0 },
    { year: 1996, sk: 6.5, cz: 8.0, pl: 5.5, hu: 8.2, ro: 2.0, si: 12.5, hr: 13.0, ee: 2.5, at: 42.5 },
    { year: 1997, sk: 7.0, cz: 8.5, pl: 6.0, hu: 8.0, ro: 2.2, si: 13.8, hr: 14.5, ee: 3.0, at: 44.0 },
    { year: 1998, sk: 7.5, cz: 9.0, pl: 6.5, hu: 8.5, ro: 2.5, si: 15.0, hr: 16.0, ee: 3.5, at: 45.5 },
    { year: 1999, sk: 8.0, cz: 9.5, pl: 7.2, hu: 9.0, ro: 2.8, si: 16.5, hr: 17.5, ee: 4.2, at: 47.0 },
    { year: 2000, sk: 8.5, cz: 10.0, pl: 8.0, hu: 10.0, ro: 3.2, si: 18.0, hr: 19.0, ee: 5.0, at: 48.0 },
    { year: 2001, sk: 9.5, cz: 11.2, pl: 9.2, hu: 11.5, ro: 3.8, si: 19.5, hr: 21.0, ee: 6.5, at: 49.0 },
    { year: 2002, sk: 11.0, cz: 13.0, pl: 10.8, hu: 14.0, ro: 4.5, si: 21.0, hr: 23.5, ee: 8.5, at: 50.0 },
    { year: 2003, sk: 13.0, cz: 15.5, pl: 12.5, hu: 17.5, ro: 5.5, si: 22.5, hr: 26.5, ee: 11.5, at: 50.5 },
    { year: 2004, sk: 15.5, cz: 18.5, pl: 14.8, hu: 21.0, ro: 7.0, si: 24.5, hr: 30.0, ee: 15.0, at: 51.0 },
    { year: 2005, sk: 18.5, cz: 22.0, pl: 17.5, hu: 25.0, ro: 9.0, si: 26.5, hr: 33.5, ee: 20.0, at: 51.5 },
    { year: 2006, sk: 21.5, cz: 25.5, pl: 21.0, hu: 29.5, ro: 11.5, si: 28.5, hr: 37.0, ee: 25.0, at: 52.0 },
    { year: 2007, sk: 24.5, cz: 28.5, pl: 25.0, hu: 34.0, ro: 14.5, si: 30.5, hr: 40.0, ee: 30.5, at: 52.5 },
    { year: 2008, sk: 27.2, cz: 31.0, pl: 30.2, hu: 38.5, ro: 17.8, si: 32.2, hr: 41.5, ee: 35.8, at: 53.0 },
    { year: 2009, sk: 29.5, cz: 32.5, pl: 33.5, hu: 41.0, ro: 19.5, si: 33.5, hr: 42.0, ee: 41.2, at: 53.5 },
    { year: 2010, sk: 31.5, cz: 33.6, pl: 35.0, hu: 40.0, ro: 20.0, si: 33.0, hr: 41.0, ee: 42.5, at: 54.0 },
    { year: 2011, sk: 32.5, cz: 33.5, pl: 35.8, hu: 37.5, ro: 19.5, si: 32.0, hr: 39.5, ee: 41.0, at: 54.5 },
    { year: 2012, sk: 33.5, cz: 33.4, pl: 35.5, hu: 33.0, ro: 18.5, si: 31.0, hr: 38.0, ee: 39.5, at: 55.0 },
    { year: 2013, sk: 34.2, cz: 33.2, pl: 35.2, hu: 29.5, ro: 17.5, si: 30.0, hr: 37.0, ee: 38.5, at: 55.0 },
    { year: 2014, sk: 35.5, cz: 33.0, pl: 35.5, hu: 26.5, ro: 16.5, si: 29.2, hr: 36.5, ee: 38.0, at: 55.2 },
    { year: 2015, sk: 37.2, cz: 32.8, pl: 35.8, hu: 23.5, ro: 15.8, si: 28.5, hr: 35.8, ee: 38.5, at: 55.5 },
    { year: 2016, sk: 39.2, cz: 33.0, pl: 36.0, hu: 21.0, ro: 15.2, si: 28.0, hr: 35.2, ee: 39.0, at: 55.0 },
    { year: 2017, sk: 41.2, cz: 33.2, pl: 35.5, hu: 19.5, ro: 14.8, si: 27.5, hr: 34.5, ee: 39.5, at: 54.5 },
    { year: 2018, sk: 42.8, cz: 33.5, pl: 35.2, hu: 18.8, ro: 14.5, si: 27.2, hr: 34.0, ee: 39.8, at: 54.0 },
    { year: 2019, sk: 44.2, cz: 33.8, pl: 34.8, hu: 19.2, ro: 14.5, si: 27.0, hr: 34.2, ee: 40.0, at: 53.5 },
    { year: 2020, sk: 45.5, cz: 34.2, pl: 34.5, hu: 20.0, ro: 14.8, si: 27.5, hr: 34.5, ee: 40.5, at: 53.0 },
    { year: 2021, sk: 46.5, cz: 33.6, pl: 32.0, hu: 21.5, ro: 15.2, si: 28.2, hr: 35.0, ee: 41.2, at: 52.5 },
    { year: 2022, sk: 47.0, cz: 32.5, pl: 28.0, hu: 21.0, ro: 15.0, si: 28.5, hr: 34.5, ee: 40.8, at: 52.0 },
    { year: 2023, sk: 46.0, cz: 31.8, pl: 25.5, hu: 20.0, ro: 14.5, si: 28.2, hr: 34.0, ee: 39.8, at: 51.5 },
    { year: 2024, sk: 45.2, cz: 31.5, pl: 23.8, hu: 19.2, ro: 14.2, si: 28.0, hr: 33.8, ee: 39.2, at: 51.0 },
    { year: 2025, sk: 44.1, cz: 31.2, pl: 22.1, hu: 18.3, ro: 14.0, si: 27.8, hr: 33.5, ee: 38.5, at: 50.5 },
    { year: 2026, sk: 44.5, cz: 31.5, pl: 22.5, hu: 18.5, ro: 14.2, si: 28.0, hr: 33.8, ee: 38.8, at: 50.8 }
];

// Mappings of Slovak Prime Ministers (1989 - 2026)
const pmMappingDebt = {
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
const flagSVGsDebt = {
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

const countryNamesDebt = {
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
let currentYearDebt = 1989; // Float value to support smooth LERP transitions
let isPlayingDebt = false;
let intervalIdDebt = null;
const stepSizeDebt = 0.04;      // Increment per tick (takes 25 ticks to advance 1 year)
const tickSpeedDebt = 50;       // Tick interval in ms (25 * 50ms = 1.25 seconds per year, very smooth!)
const maxChartValueDebt = 60;   // Scale chart up to 60% so Eurozone average at 50% fits nicely

// DOM Elements
let playBtnDebt, playIconDebt, yearSliderDebt, yearLabelDebt, raceContainerDebt;

// Normalize names for local assets/pm/ image folder mapping
function getPMImageSrcDebt(name) {
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
function initDebtRaceChart() {
    playBtnDebt = document.getElementById('btn-debt-play');
    playIconDebt = document.getElementById('debt-play-icon');
    yearSliderDebt = document.getElementById('debt-year-slider');
    yearLabelDebt = document.getElementById('debt-year-label');
    raceContainerDebt = document.getElementById('bar-debt-container');

    if (!playBtnDebt || !yearSliderDebt || !yearLabelDebt || !raceContainerDebt) {
        console.warn("Debt chart components not found in DOM.");
        return;
    }

    // Set slider range
    yearSliderDebt.min = 1989;
    yearSliderDebt.max = 2026;
    yearSliderDebt.value = currentYearDebt;

    // 1. Build initial rows (9 countries in total)
    raceContainerDebt.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-debt-row row-${code}`;
        row.id = `debt-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGsDebt[code]}
                <span class="bar-race-name-text">${countryNamesDebt[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-debt-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="debt-val-${code}">0.0%</span>
            </div>
        `;
        raceContainerDebt.appendChild(row);
    });

    // 2. Event Listeners
    playBtnDebt.addEventListener('click', togglePlayDebt);
    yearSliderDebt.addEventListener('input', (e) => {
        pauseDebt();
        currentYearDebt = parseInt(e.target.value);
        updateDebtYearData();
    });

    // Run first render
    updateDebtYearData();
}

// Update the chart bars and positions for the current year (with smooth LERP)
function updateDebtYearData() {
    const y0 = Math.floor(currentYearDebt);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearDebt - y0; // fractional interpolation coefficient

    const data0 = debtDataset.find(d => d.year === y0);
    const data1 = debtDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    // Update labels and slider to integer year
    yearLabelDebt.innerText = y0;
    yearSliderDebt.value = y0;

    const watermark = document.getElementById('debt-year-watermark');
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
    const activePM = pmMappingDebt[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-debt-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcDebt(activePM);
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
        const row = document.getElementById(`debt-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`debt-val-${item.code}`);

        if (row && fill && valSpan) {
            // Calculate width percentage relative to chart max value
            const widthPct = Math.min(100, (item.val / maxChartValueDebt) * 100);
            fill.style.width = `${widthPct}%`;
            valSpan.innerText = `${item.val.toFixed(1)}%`;
            
            // Shift row vertically based on rank
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlayDebt() {
    if (isPlayingDebt) {
        pauseDebt();
    } else {
        playDebt();
    }
}

function playDebt() {
    if (currentYearDebt >= 2026) {
        currentYearDebt = 1989; // reset if at the end
    }
    isPlayingDebt = true;
    playIconDebt.className = "fa-solid fa-pause";
    playBtnDebt.title = "Pozastaviť";
    
    intervalIdDebt = setInterval(() => {
        currentYearDebt += stepSizeDebt;
        if (currentYearDebt >= 2026) {
            currentYearDebt = 2026;
            updateDebtYearData();
            pauseDebt();
        } else {
            updateDebtYearData();
        }
    }, tickSpeedDebt);
}

// Pause playback
function pauseDebt() {
    isPlayingDebt = false;
    if (playIconDebt) playIconDebt.className = "fa-solid fa-play";
    if (playBtnDebt) playBtnDebt.title = "Spustiť porovnanie";
    if (intervalIdDebt) {
        clearInterval(intervalIdDebt);
        intervalIdDebt = null;
    }
}

// Initialize on DOM ready
window.addEventListener('DOMContentLoaded', () => {
    // Wait slightly to let main page initialize cost counters
    setTimeout(initDebtRaceChart, 100);
});
