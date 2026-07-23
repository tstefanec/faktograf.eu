// Population stock dataset in millions of inhabitants (Eurostat & World Bank aligned statistics)
// Historical data series compiled for Central Europe, Baltics, Balkans & Austria (1989 - 2026)
const popDataset = [
    { year: 1989, sk: 5.29, cz: 10.30, pl: 38.00, hu: 10.40, ro: 23.10, si: 1.99, hr: 4.78, ee: 1.57, at: 7.60 },
    { year: 1990, sk: 5.31, cz: 10.31, pl: 38.12, hu: 10.37, ro: 23.21, si: 2.00, hr: 4.77, ee: 1.57, at: 7.68 },
    { year: 1991, sk: 5.32, cz: 10.31, pl: 38.24, hu: 10.35, ro: 23.19, si: 2.00, hr: 4.73, ee: 1.56, at: 7.76 },
    { year: 1992, sk: 5.34, cz: 10.32, pl: 38.36, hu: 10.32, ro: 22.79, si: 1.99, hr: 4.65, ee: 1.53, at: 7.84 },
    { year: 1993, sk: 5.36, cz: 10.33, pl: 38.46, hu: 10.29, ro: 22.76, si: 1.99, hr: 4.62, ee: 1.50, at: 7.91 },
    { year: 1994, sk: 5.37, cz: 10.33, pl: 38.54, hu: 10.26, ro: 22.73, si: 1.99, hr: 4.59, ee: 1.46, at: 7.94 },
    { year: 1995, sk: 5.38, cz: 10.33, pl: 38.59, hu: 10.23, ro: 22.68, si: 1.99, hr: 4.54, ee: 1.44, at: 7.95 },
    { year: 1996, sk: 5.38, cz: 10.32, pl: 38.62, hu: 10.20, ro: 22.61, si: 1.99, hr: 4.50, ee: 1.42, at: 7.96 },
    { year: 1997, sk: 5.39, cz: 10.30, pl: 38.65, hu: 10.15, ro: 22.55, si: 1.98, hr: 4.47, ee: 1.40, at: 7.97 },
    { year: 1998, sk: 5.39, cz: 10.29, pl: 38.67, hu: 10.11, ro: 22.50, si: 1.98, hr: 4.45, ee: 1.39, at: 7.98 },
    { year: 1999, sk: 5.40, cz: 10.28, pl: 38.65, hu: 10.07, ro: 22.46, si: 1.98, hr: 4.44, ee: 1.38, at: 7.99 },
    { year: 2000, sk: 5.40, cz: 10.27, pl: 38.65, hu: 10.04, ro: 22.44, si: 1.99, hr: 4.43, ee: 1.40, at: 8.01 },
    { year: 2001, sk: 5.38, cz: 10.22, pl: 38.25, hu: 10.02, ro: 22.41, si: 1.99, hr: 4.44, ee: 1.38, at: 8.04 },
    { year: 2002, sk: 5.38, cz: 10.20, pl: 38.23, hu: 9.99,  ro: 21.73, si: 1.99, hr: 4.44, ee: 1.37, at: 8.08 },
    { year: 2003, sk: 5.38, cz: 10.20, pl: 38.19, hu: 9.96,  ro: 21.63, si: 1.99, hr: 4.44, ee: 1.36, at: 8.12 },
    { year: 2004, sk: 5.38, cz: 10.21, pl: 38.17, hu: 9.93,  ro: 21.52, si: 2.00, hr: 4.44, ee: 1.35, at: 8.17 },
    { year: 2005, sk: 5.39, cz: 10.22, pl: 38.16, hu: 9.91,  ro: 21.38, si: 2.00, hr: 4.44, ee: 1.35, at: 8.23 },
    { year: 2006, sk: 5.39, cz: 10.25, pl: 38.13, hu: 9.88,  ro: 21.26, si: 2.00, hr: 4.44, ee: 1.34, at: 8.27 },
    { year: 2007, sk: 5.39, cz: 10.32, pl: 38.12, hu: 9.84,  ro: 21.13, si: 2.02, hr: 4.44, ee: 1.34, at: 8.30 },
    { year: 2008, sk: 5.40, cz: 10.38, pl: 38.12, hu: 9.81,  ro: 20.64, si: 2.03, hr: 4.43, ee: 1.34, at: 8.33 },
    { year: 2009, sk: 5.41, cz: 10.42, pl: 38.14, hu: 9.77,  ro: 20.44, si: 2.04, hr: 4.43, ee: 1.34, at: 8.35 },
    { year: 2010, sk: 5.42, cz: 10.46, pl: 38.17, hu: 9.73,  ro: 20.29, si: 2.05, hr: 4.42, ee: 1.33, at: 8.38 },
    { year: 2011, sk: 5.40, cz: 10.48, pl: 38.06, hu: 9.70,  ro: 20.12, si: 2.05, hr: 4.28, ee: 1.33, at: 8.41 },
    { year: 2012, sk: 5.40, cz: 10.51, pl: 38.06, hu: 9.68,  ro: 20.06, si: 2.06, hr: 4.27, ee: 1.32, at: 8.45 },
    { year: 2013, sk: 5.41, cz: 10.51, pl: 38.02, hu: 9.65,  ro: 19.98, si: 2.06, hr: 4.26, ee: 1.32, at: 8.51 },
    { year: 2014, sk: 5.42, cz: 10.52, pl: 38.01, hu: 9.62,  ro: 19.91, si: 2.06, hr: 4.24, ee: 1.32, at: 8.58 },
    { year: 2015, sk: 5.42, cz: 10.54, pl: 37.99, hu: 9.60,  ro: 19.82, si: 2.06, hr: 4.21, ee: 1.31, at: 8.70 },
    { year: 2016, sk: 5.43, cz: 10.56, pl: 37.97, hu: 9.58,  ro: 19.71, si: 2.06, hr: 4.17, ee: 1.32, at: 8.77 },
    { year: 2017, sk: 5.44, cz: 10.58, pl: 37.97, hu: 9.55,  ro: 19.59, si: 2.07, hr: 4.12, ee: 1.32, at: 8.82 },
    { year: 2018, sk: 5.45, cz: 10.61, pl: 37.98, hu: 9.53,  ro: 19.47, si: 2.07, hr: 4.09, ee: 1.32, at: 8.86 },
    { year: 2019, sk: 5.45, cz: 10.65, pl: 37.97, hu: 9.51,  ro: 19.37, si: 2.08, hr: 4.08, ee: 1.33, at: 8.88 },
    { year: 2020, sk: 5.46, cz: 10.69, pl: 37.96, hu: 9.50,  ro: 19.26, si: 2.10, hr: 4.05, ee: 1.33, at: 8.90 },
    { year: 2021, sk: 5.45, cz: 10.70, pl: 37.84, hu: 9.47,  ro: 19.18, si: 2.11, hr: 4.04, ee: 1.33, at: 8.93 },
    { year: 2022, sk: 5.43, cz: 10.83, pl: 37.65, hu: 9.46,  ro: 19.04, si: 2.11, hr: 3.86, ee: 1.33, at: 8.98 },
    { year: 2023, sk: 5.42, cz: 10.88, pl: 36.75, hu: 9.60,  ro: 19.05, si: 2.12, hr: 3.85, ee: 1.37, at: 9.10 },
    { year: 2024, sk: 5.41, cz: 10.90, pl: 36.60, hu: 9.58,  ro: 19.01, si: 2.12, hr: 3.85, ee: 1.37, at: 9.13 },
    { year: 2025, sk: 5.41, cz: 10.91, pl: 36.50, hu: 9.55,  ro: 18.95, si: 2.12, hr: 3.85, ee: 1.36, at: 9.15 },
    { year: 2026, sk: 5.40, cz: 10.92, pl: 36.40, hu: 9.52,  ro: 18.90, si: 2.12, hr: 3.84, ee: 1.36, at: 9.18 }
];

// Mappings of Slovak Prime Ministers (1989 - 2026)
const pmMappingPop = {
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
const flagSVGsPop = {
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

const countryNamesPop = {
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
let currentYearPop = 1989; // Float value to support smooth LERP transitions
let isPlayingPop = false;
let intervalIdPop = null;
const stepSizePop = 0.04;      // Increment per tick
const tickSpeedPop = 50;       // Tick interval in ms
const maxChartValuePop = 40;   // Max scale in millions of inhabitants

// DOM Elements
let playBtnPop, playIconPop, yearSliderPop, yearLabelPop, raceContainerPop;

// Normalize names for local assets/pm/ image folder mapping
function getPMImageSrcPop(name) {
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
function initPopRaceChart() {
    playBtnPop = document.getElementById('btn-pop-play');
    playIconPop = document.getElementById('pop-play-icon');
    yearSliderPop = document.getElementById('pop-year-slider');
    yearLabelPop = document.getElementById('pop-year-label');
    raceContainerPop = document.getElementById('bar-pop-container');

    if (!playBtnPop || !yearSliderPop || !yearLabelPop || !raceContainerPop) {
        console.warn("Population chart components not found in DOM.");
        return;
    }

    // Set slider range
    yearSliderPop.min = 1989;
    yearSliderPop.max = 2026;
    yearSliderPop.value = currentYearPop;

    // Build initial rows (9 countries)
    raceContainerPop.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-pop-row row-${code}`;
        row.id = `pop-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGsPop[code]}
                <span class="bar-race-name-text">${countryNamesPop[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-pop-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="pop-val-${code}">0.00 mil.</span>
            </div>
        `;
        raceContainerPop.appendChild(row);
    });

    // Event Listeners
    playBtnPop.addEventListener('click', togglePlayPop);
    yearSliderPop.addEventListener('input', (e) => {
        pausePop();
        currentYearPop = parseInt(e.target.value);
        updatePopYearData();
    });

    // Run first render
    updatePopYearData();
}

// Update the chart bars and positions for the current year
function updatePopYearData() {
    const y0 = Math.floor(currentYearPop);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearPop - y0; // fractional interpolation coefficient

    const data0 = popDataset.find(d => d.year === y0);
    const data1 = popDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    // Update labels and slider to integer year
    yearLabelPop.innerText = y0;
    yearSliderPop.value = y0;

    const watermark = document.getElementById('pop-year-watermark');
    if (watermark) watermark.innerText = y0;

    // Interpolated values for all 9 countries
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

    // Update Slovak PM Avatar
    const activePM = pmMappingPop[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-pop-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcPop(activePM);
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
        const row = document.getElementById(`pop-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`pop-val-${item.code}`);

        if (row && fill && valSpan) {
            const widthPct = Math.min(100, (item.val / maxChartValuePop) * 100);
            fill.style.width = `${widthPct}%`;
            valSpan.innerText = `${item.val.toFixed(2)} mil.`;
            
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlayPop() {
    if (isPlayingPop) {
        pausePop();
    } else {
        playPop();
    }
}

function playPop() {
    if (currentYearPop >= 2026) {
        currentYearPop = 1989;
    }
    isPlayingPop = true;
    playIconPop.className = "fa-solid fa-pause";
    playBtnPop.title = "Pozastaviť";
    
    intervalIdPop = setInterval(() => {
        currentYearPop += stepSizePop;
        if (currentYearPop >= 2026) {
            currentYearPop = 2026;
            updatePopYearData();
            pausePop();
        } else {
            updatePopYearData();
        }
    }, tickSpeedPop);
}

function pausePop() {
    isPlayingPop = false;
    if (playIconPop) playIconPop.className = "fa-solid fa-play";
    if (playBtnPop) playBtnPop.title = "Spustiť porovnanie";
    if (intervalIdPop) {
        clearInterval(intervalIdPop);
        intervalIdPop = null;
    }
}

// Initialize on DOM ready
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initPopRaceChart, 100);
});
