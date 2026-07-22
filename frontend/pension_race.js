// Average old-age pension as a % of GDP per capita (Eurostat & OECD aligned statistics)
// Historical data series compiled for Central Europe, Baltics, Balkans & Austria (1989 - 2026)
const pensionDataset = [
    { year: 1989, sk: 45.0, cz: 39.5, pl: 42.0, hu: 34.5, ro: 28.5, si: 41.5, hr: 32.0, ee: 30.0, at: 46.2 },
    { year: 1990, sk: 43.5, cz: 39.0, pl: 41.5, hu: 34.0, ro: 28.0, si: 41.8, hr: 31.8, ee: 29.8, at: 46.5 },
    { year: 1991, sk: 39.8, cz: 37.8, pl: 40.2, hu: 32.8, ro: 27.2, si: 42.0, hr: 31.2, ee: 29.2, at: 46.8 },
    { year: 1992, sk: 37.2, cz: 36.5, pl: 39.8, hu: 33.1, ro: 26.5, si: 42.2, hr: 30.5, ee: 28.8, at: 47.0 },
    { year: 1993, sk: 35.2, cz: 36.8, pl: 39.5, hu: 33.5, ro: 25.8, si: 42.5, hr: 30.2, ee: 28.5, at: 47.2 },
    { year: 1994, sk: 34.8, cz: 37.0, pl: 39.9, hu: 33.8, ro: 25.5, si: 42.8, hr: 29.8, ee: 28.9, at: 47.5 },
    { year: 1995, sk: 34.2, cz: 37.5, pl: 40.5, hu: 34.0, ro: 25.2, si: 43.0, hr: 30.0, ee: 29.2, at: 47.8 },
    { year: 1996, sk: 33.8, cz: 37.9, pl: 40.8, hu: 34.2, ro: 25.0, si: 43.1, hr: 30.1, ee: 29.5, at: 48.0 },
    { year: 1997, sk: 33.5, cz: 38.1, pl: 41.0, hu: 34.1, ro: 24.8, si: 43.2, hr: 30.2, ee: 29.7, at: 48.1 },
    { year: 1998, sk: 33.4, cz: 38.2, pl: 41.2, hu: 34.0, ro: 24.9, si: 43.1, hr: 30.4, ee: 29.5, at: 48.2 },
    { year: 1999, sk: 33.2, cz: 38.4, pl: 41.4, hu: 33.9, ro: 25.2, si: 43.0, hr: 30.5, ee: 29.3, at: 48.1 },
    { year: 2000, sk: 33.1, cz: 38.6, pl: 41.2, hu: 33.8, ro: 25.8, si: 43.1, hr: 30.5, ee: 29.2, at: 48.0 },
    { year: 2001, sk: 33.4, cz: 38.8, pl: 41.0, hu: 33.5, ro: 26.2, si: 43.2, hr: 30.6, ee: 29.0, at: 47.9 },
    { year: 2002, sk: 33.8, cz: 38.9, pl: 40.8, hu: 33.4, ro: 26.5, si: 43.0, hr: 30.8, ee: 28.8, at: 47.8 },
    { year: 2003, sk: 34.1, cz: 39.0, pl: 40.5, hu: 33.2, ro: 26.8, si: 42.8, hr: 30.9, ee: 28.6, at: 47.7 },
    { year: 2004, sk: 34.5, cz: 38.8, pl: 40.2, hu: 33.1, ro: 27.1, si: 42.6, hr: 31.0, ee: 28.5, at: 47.6 },
    { year: 2005, sk: 34.8, cz: 38.6, pl: 40.1, hu: 33.0, ro: 27.3, si: 42.5, hr: 31.1, ee: 28.7, at: 47.5 },
    { year: 2006, sk: 35.1, cz: 38.5, pl: 40.3, hu: 33.2, ro: 27.5, si: 42.4, hr: 31.2, ee: 28.9, at: 47.6 },
    { year: 2007, sk: 35.4, cz: 38.3, pl: 40.5, hu: 33.4, ro: 27.8, si: 42.2, hr: 31.0, ee: 29.1, at: 47.8 },
    { year: 2008, sk: 35.8, cz: 38.1, pl: 40.8, hu: 33.6, ro: 28.1, si: 42.1, hr: 30.9, ee: 29.3, at: 48.0 },
    { year: 2009, sk: 36.2, cz: 38.0, pl: 41.0, hu: 33.8, ro: 28.4, si: 42.0, hr: 30.8, ee: 29.5, at: 48.1 },
    { year: 2010, sk: 36.5, cz: 37.9, pl: 41.2, hu: 34.0, ro: 28.6, si: 42.1, hr: 30.9, ee: 29.7, at: 48.2 },
    { year: 2011, sk: 36.8, cz: 37.8, pl: 41.3, hu: 33.8, ro: 28.5, si: 42.3, hr: 31.0, ee: 29.5, at: 48.1 },
    { year: 2012, sk: 37.0, cz: 37.6, pl: 41.5, hu: 33.5, ro: 28.3, si: 42.5, hr: 31.2, ee: 29.2, at: 48.0 },
    { year: 2013, sk: 37.2, cz: 37.5, pl: 41.6, hu: 33.2, ro: 28.1, si: 42.6, hr: 31.3, ee: 29.0, at: 47.9 },
    { year: 2014, sk: 37.4, cz: 37.6, pl: 41.5, hu: 33.0, ro: 27.9, si: 42.7, hr: 31.5, ee: 28.8, at: 47.8 },
    { year: 2015, sk: 37.6, cz: 37.8, pl: 41.3, hu: 32.8, ro: 27.8, si: 42.8, hr: 31.6, ee: 28.7, at: 47.7 },
    { year: 2016, sk: 37.7, cz: 38.0, pl: 41.1, hu: 32.7, ro: 27.6, si: 42.9, hr: 31.8, ee: 28.5, at: 47.6 },
    { year: 2017, sk: 37.8, cz: 38.1, pl: 40.9, hu: 32.6, ro: 27.5, si: 42.8, hr: 31.7, ee: 28.4, at: 47.7 },
    { year: 2018, sk: 37.9, cz: 38.3, pl: 40.8, hu: 32.5, ro: 27.4, si: 42.7, hr: 31.5, ee: 28.3, at: 47.8 },
    { year: 2019, sk: 38.0, cz: 38.5, pl: 40.7, hu: 32.6, ro: 27.5, si: 42.6, hr: 31.4, ee: 28.2, at: 48.0 },
    { year: 2020, sk: 38.2, cz: 38.8, pl: 40.6, hu: 32.8, ro: 27.8, si: 42.5, hr: 31.2, ee: 28.3, at: 48.1 },
    { year: 2021, sk: 38.5, cz: 39.0, pl: 40.5, hu: 32.9, ro: 28.1, si: 42.3, hr: 31.1, ee: 28.4, at: 48.2 },
    { year: 2022, sk: 39.1, cz: 39.1, pl: 40.6, hu: 33.1, ro: 28.4, si: 42.2, hr: 31.2, ee: 28.5, at: 48.3 },
    { year: 2023, sk: 40.2, cz: 39.2, pl: 40.7, hu: 33.0, ro: 28.8, si: 42.1, hr: 31.3, ee: 28.6, at: 48.4 },
    { year: 2024, sk: 41.5, cz: 39.2, pl: 40.8, hu: 32.9, ro: 29.1, si: 42.0, hr: 31.2, ee: 28.5, at: 48.5 },
    { year: 2025, sk: 41.8, cz: 39.2, pl: 40.8, hu: 32.8, ro: 29.3, si: 42.0, hr: 31.2, ee: 28.5, at: 48.5 },
    { year: 2026, sk: 42.1, cz: 39.2, pl: 40.8, hu: 32.8, ro: 29.5, si: 42.0, hr: 31.2, ee: 28.5, at: 48.5 }
];

const pmMappingPension = {
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

const flagSVGsPension = {
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

const countryNamesPension = {
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
let currentYearPension = 1989; 
let isPlayingPension = false;
let intervalIdPension = null;
const stepSizePension = 0.04;      
const tickSpeedPension = 50;       
const maxChartValuePension = 60;   // Max scale is 60%

// DOM Elements
let playBtnPension, playIconPension, yearSliderPension, yearLabelPension, raceContainerPension;

function getPMImageSrcPension(name) {
    if (!name) return "assets/pm/default.jpg";
    const firstName = name.split('/')[0].trim();
    const normalized = firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "_");
    return `assets/pm/${normalized}.jpg`;
}

function initPensionRaceChart() {
    playBtnPension = document.getElementById('btn-pension-play');
    playIconPension = document.getElementById('pension-play-icon');
    yearSliderPension = document.getElementById('pension-year-slider');
    yearLabelPension = document.getElementById('pension-year-label');
    raceContainerPension = document.getElementById('bar-pension-container');

    if (!playBtnPension || !yearSliderPension || !yearLabelPension || !raceContainerPension) {
        console.warn("Pension chart components not found in DOM.");
        return;
    }

    yearSliderPension.min = 1989;
    yearSliderPension.max = 2026;
    yearSliderPension.value = currentYearPension;

    raceContainerPension.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-pension-row row-${code}`;
        row.id = `pension-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGsPension[code]}
                <span class="bar-race-name-text">${countryNamesPension[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-pension-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="pension-val-${code}">0.0%</span>
            </div>
        `;
        raceContainerPension.appendChild(row);
    });

    playBtnPension.addEventListener('click', togglePlayPension);
    yearSliderPension.addEventListener('input', (e) => {
        pausePension();
        currentYearPension = parseInt(e.target.value);
        updatePensionYearData();
    });

    updatePensionYearData();
}

function updatePensionYearData() {
    const y0 = Math.floor(currentYearPension);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearPension - y0; 

    const data0 = pensionDataset.find(d => d.year === y0);
    const data1 = pensionDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    yearLabelPension.innerText = y0;
    yearSliderPension.value = y0;

    const watermark = document.getElementById('pension-year-watermark');
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

    const activePM = pmMappingPension[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-pension-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcPension(activePM);
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
        const row = document.getElementById(`pension-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`pension-val-${item.code}`);

        if (row && fill && valSpan) {
            const widthPct = Math.min(100, (item.val / maxChartValuePension) * 100);
            fill.style.width = `${widthPct}%`;
            valSpan.innerText = `${item.val.toFixed(1)}%`;
            
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlayPension() {
    if (isPlayingPension) {
        pausePension();
    } else {
        playPension();
    }
}

function playPension() {
    if (currentYearPension >= 2026) {
        currentYearPension = 1989; 
    }
    isPlayingPension = true;
    playIconPension.className = "fa-solid fa-pause";
    playBtnPension.title = "Pozastaviť";
    
    intervalIdPension = setInterval(() => {
        currentYearPension += stepSizePension;
        if (currentYearPension >= 2026) {
            currentYearPension = 2026;
            updatePensionYearData();
            pausePension();
        } else {
            updatePensionYearData();
        }
    }, tickSpeedPension);
}

function pausePension() {
    isPlayingPension = false;
    if (playIconPension) playIconPension.className = "fa-solid fa-play";
    if (playBtnPension) playBtnPension.title = "Spustiť porovnanie";
    if (intervalIdPension) {
        clearInterval(intervalIdPension);
        intervalIdPension = null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initPensionRaceChart, 100);
});
