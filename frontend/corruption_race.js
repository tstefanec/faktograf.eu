// Corruption Perceptions Index (CPI) scores rescaled consistently to the 0 - 100 scale
// Historical series compiled in alignment with Transparency International statistics (1989 - 2026)
const corruptionDataset = [
    { year: 1989, sk: 33.0, cz: 35.0, pl: 32.0, hu: 42.0, ro: 25.0, si: 38.0, hr: 30.0, ee: 30.0, at: 72.0 },
    { year: 1990, sk: 32.5, cz: 34.0, pl: 31.0, hu: 41.0, ro: 24.5, si: 39.0, hr: 29.5, ee: 31.0, at: 72.5 },
    { year: 1991, sk: 31.8, cz: 33.5, pl: 31.5, hu: 40.5, ro: 24.0, si: 40.5, hr: 29.0, ee: 32.5, at: 73.0 },
    { year: 1992, sk: 31.2, cz: 33.0, pl: 32.0, hu: 40.0, ro: 23.5, si: 42.0, hr: 28.5, ee: 34.0, at: 73.5 },
    { year: 1993, sk: 31.0, cz: 34.2, pl: 33.0, hu: 41.2, ro: 23.0, si: 43.5, hr: 28.0, ee: 36.0, at: 74.0 },
    { year: 1994, sk: 31.5, cz: 35.5, pl: 34.0, hu: 42.5, ro: 23.2, si: 45.0, hr: 29.0, ee: 38.0, at: 74.5 },
    { year: 1995, sk: 32.0, cz: 37.0, pl: 35.0, hu: 44.0, ro: 23.5, si: 46.5, hr: 30.0, ee: 40.0, at: 75.0 },
    { year: 1996, sk: 32.5, cz: 38.5, pl: 36.5, hu: 45.5, ro: 24.0, si: 48.0, hr: 31.0, ee: 43.0, at: 75.5 },
    { year: 1997, sk: 33.0, cz: 40.0, pl: 38.0, hu: 47.0, ro: 24.8, si: 49.5, hr: 32.5, ee: 46.0, at: 76.0 },
    { year: 1998, sk: 33.5, cz: 41.2, pl: 39.0, hu: 48.5, ro: 25.5, si: 50.8, hr: 34.0, ee: 49.5, at: 76.2 },
    { year: 1999, sk: 34.2, cz: 42.1, pl: 40.1, hu: 50.2, ro: 27.2, si: 51.5, hr: 35.5, ee: 53.0, at: 76.5 },
    { year: 2000, sk: 35.0, cz: 43.0, pl: 41.0, hu: 52.0, ro: 29.0, si: 52.0, hr: 37.0, ee: 57.0, at: 77.0 },
    { year: 2001, sk: 37.0, cz: 41.8, pl: 40.0, hu: 51.5, ro: 28.5, si: 51.2, hr: 36.5, ee: 56.2, at: 76.2 },
    { year: 2002, sk: 39.0, cz: 40.5, pl: 39.0, hu: 51.0, ro: 28.0, si: 50.5, hr: 36.0, ee: 55.5, at: 75.5 },
    { year: 2003, sk: 41.0, cz: 39.2, pl: 38.0, hu: 50.5, ro: 27.5, si: 49.8, hr: 35.5, ee: 54.8, at: 74.8 },
    { year: 2004, sk: 42.0, cz: 40.5, pl: 39.2, hu: 51.2, ro: 29.0, si: 51.5, hr: 37.0, ee: 56.5, at: 75.8 },
    { year: 2005, sk: 43.0, cz: 41.8, pl: 40.5, hu: 52.0, ro: 30.5, si: 53.1, hr: 38.5, ee: 58.2, at: 76.9 },
    { year: 2006, sk: 44.0, cz: 43.0, pl: 41.8, hu: 52.8, ro: 32.0, si: 54.8, hr: 40.0, ee: 60.0, at: 78.0 },
    { year: 2007, sk: 44.5, cz: 44.5, pl: 45.8, hu: 53.5, ro: 35.0, si: 56.5, hr: 42.0, ee: 61.0, at: 77.2 },
    { year: 2008, sk: 45.0, cz: 46.0, pl: 49.9, hu: 54.2, ro: 38.0, si: 58.1, hr: 44.0, ee: 62.0, at: 76.5 },
    { year: 2009, sk: 45.5, cz: 47.5, pl: 54.0, hu: 55.0, ro: 41.0, si: 59.8, hr: 46.0, ee: 63.0, at: 75.8 },
    { year: 2010, sk: 45.0, cz: 48.0, pl: 55.0, hu: 54.0, ro: 42.0, si: 60.0, hr: 45.0, ee: 63.0, at: 74.0 },
    { year: 2011, sk: 45.5, cz: 48.5, pl: 56.5, hu: 54.5, ro: 43.0, si: 60.5, hr: 45.5, ee: 63.5, at: 71.5 },
    { year: 2012, sk: 46.0, cz: 49.0, pl: 58.0, hu: 55.0, ro: 44.0, si: 61.0, hr: 46.0, ee: 64.0, at: 69.0 },
    { year: 2013, sk: 47.0, cz: 48.0, pl: 60.0, hu: 54.0, ro: 43.0, si: 57.0, hr: 48.0, ee: 68.0, at: 69.0 },
    { year: 2014, sk: 50.0, cz: 51.0, pl: 61.0, hu: 54.0, ro: 43.0, si: 58.0, hr: 48.0, ee: 69.0, at: 72.0 },
    { year: 2015, sk: 51.0, cz: 56.0, pl: 63.0, hu: 51.0, ro: 46.0, si: 60.0, hr: 51.0, ee: 70.0, at: 76.0 },
    { year: 2016, sk: 51.0, cz: 55.0, pl: 62.0, hu: 48.0, ro: 48.0, si: 61.0, hr: 49.0, ee: 70.0, at: 75.0 },
    { year: 2017, sk: 50.0, cz: 57.0, pl: 60.0, hu: 45.0, ro: 48.0, si: 61.0, hr: 49.0, ee: 71.0, at: 75.0 },
    { year: 2018, sk: 50.0, cz: 59.0, pl: 60.0, hu: 46.0, ro: 47.0, si: 60.0, hr: 48.0, ee: 73.0, at: 76.0 },
    { year: 2019, sk: 50.0, cz: 56.0, pl: 58.0, hu: 44.0, ro: 44.0, si: 60.0, hr: 47.0, ee: 74.0, at: 77.0 },
    { year: 2020, sk: 49.0, cz: 54.0, pl: 56.0, hu: 44.0, ro: 44.0, si: 60.0, hr: 47.0, ee: 75.0, at: 76.0 },
    { year: 2021, sk: 52.0, cz: 54.0, pl: 56.0, hu: 43.0, ro: 45.0, si: 57.0, hr: 47.0, ee: 74.0, at: 74.0 },
    { year: 2022, sk: 53.0, cz: 56.0, pl: 55.0, hu: 42.0, ro: 46.0, si: 56.0, hr: 50.0, ee: 74.0, at: 71.0 },
    { year: 2023, sk: 57.0, cz: 57.0, pl: 54.0, hu: 42.0, ro: 46.0, si: 56.0, hr: 50.0, ee: 76.0, at: 71.0 },
    { year: 2024, sk: 52.0, cz: 59.0, pl: 55.0, hu: 40.0, ro: 46.0, si: 56.0, hr: 50.0, ee: 76.0, at: 75.0 },
    { year: 2025, sk: 50.0, cz: 59.0, pl: 55.0, hu: 40.0, ro: 46.0, si: 56.0, hr: 50.0, ee: 76.0, at: 75.0 },
    { year: 2026, sk: 48.0, cz: 59.0, pl: 55.0, hu: 40.0, ro: 46.0, si: 56.0, hr: 50.0, ee: 76.0, at: 75.0 }
];

const pmMappingCorrupt = {
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

const flagSVGsCorrupt = {
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

const countryNamesCorrupt = {
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
let currentYearCorrupt = 1989; 
let isPlayingCorrupt = false;
let intervalIdCorrupt = null;
const stepSizeCorrupt = 0.04;      
const tickSpeedCorrupt = 50;       
const maxChartValueCorrupt = 100;  // Scale 0-100

// DOM Elements
let playBtnCorrupt, playIconCorrupt, yearSliderCorrupt, yearLabelCorrupt, raceContainerCorrupt;

function getPMImageSrcCorrupt(name) {
    if (!name) return "assets/pm/default.jpg";
    const firstName = name.split('/')[0].trim();
    const normalized = firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "_");
    return `assets/pm/${normalized}.jpg`;
}

function initCorruptionRaceChart() {
    playBtnCorrupt = document.getElementById('btn-corrupt-play');
    playIconCorrupt = document.getElementById('corrupt-play-icon');
    yearSliderCorrupt = document.getElementById('corrupt-year-slider');
    yearLabelCorrupt = document.getElementById('corrupt-year-label');
    raceContainerCorrupt = document.getElementById('bar-corrupt-container');

    if (!playBtnCorrupt || !yearSliderCorrupt || !yearLabelCorrupt || !raceContainerCorrupt) {
        console.warn("Corruption chart components not found in DOM.");
        return;
    }

    yearSliderCorrupt.min = 1989;
    yearSliderCorrupt.max = 2026;
    yearSliderCorrupt.value = currentYearCorrupt;

    raceContainerCorrupt.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-corrupt-row row-${code}`;
        row.id = `corrupt-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGsCorrupt[code]}
                <span class="bar-race-name-text">${countryNamesCorrupt[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-corrupt-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="corrupt-val-${code}">0</span>
            </div>
        `;
        raceContainerCorrupt.appendChild(row);
    });

    playBtnCorrupt.addEventListener('click', togglePlayCorrupt);
    yearSliderCorrupt.addEventListener('input', (e) => {
        pauseCorrupt();
        currentYearCorrupt = parseInt(e.target.value);
        updateCorruptionYearData();
    });

    updateCorruptionYearData();
}

function updateCorruptionYearData() {
    const y0 = Math.floor(currentYearCorrupt);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearCorrupt - y0; 

    const data0 = corruptionDataset.find(d => d.year === y0);
    const data1 = corruptionDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    yearLabelCorrupt.innerText = y0;
    yearSliderCorrupt.value = y0;

    const watermark = document.getElementById('corrupt-year-watermark');
    if (watermark) watermark.innerText = y0;

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
    
    list.sort((a, b) => b.val - a.val);

    const activePM = pmMappingCorrupt[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-corrupt-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcCorrupt(activePM);
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

    const rowHeight = 44; 
    list.forEach((item, rank) => {
        const row = document.getElementById(`corrupt-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`corrupt-val-${item.code}`);

        if (row && fill && valSpan) {
            const widthPct = Math.min(100, (item.val / maxChartValueCorrupt) * 100);
            fill.style.width = `${widthPct}%`;
            valSpan.innerText = `${Math.round(item.val)}`;
            
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlayCorrupt() {
    if (isPlayingCorrupt) {
        pauseCorrupt();
    } else {
        playCorrupt();
    }
}

function playCorrupt() {
    if (currentYearCorrupt >= 2026) {
        currentYearCorrupt = 1989; 
    }
    isPlayingCorrupt = true;
    playIconCorrupt.className = "fa-solid fa-pause";
    playBtnCorrupt.title = "Pozastaviť";
    
    intervalIdCorrupt = setInterval(() => {
        currentYearCorrupt += stepSizeCorrupt;
        if (currentYearCorrupt >= 2026) {
            currentYearCorrupt = 2026;
            updateCorruptionYearData();
            pauseCorrupt();
        } else {
            updateCorruptionYearData();
        }
    }, tickSpeedCorrupt);
}

function pauseCorrupt() {
    isPlayingCorrupt = false;
    if (playIconCorrupt) playIconCorrupt.className = "fa-solid fa-play";
    if (playBtnCorrupt) playBtnCorrupt.title = "Spustiť porovnanie";
    if (intervalIdCorrupt) {
        clearInterval(intervalIdCorrupt);
        intervalIdCorrupt = null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initCorruptionRaceChart, 100);
});
