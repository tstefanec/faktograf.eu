// Total health expenditure as a percentage of GDP (public + private current health spending)
// Compiled from OECD, Eurostat, WHO, and National Statistical databases (1989 - 2026)
const healthDataset = [
    { year: 1989, sk: 4.80, cz: 5.00, pl: 4.50, hu: 5.20, ro: 3.50, si: 6.00, hr: 5.50, ee: 4.20, at: 7.50 },
    { year: 1990, sk: 4.90, cz: 5.10, pl: 4.55, hu: 5.30, ro: 3.60, si: 6.15, hr: 5.60, ee: 4.25, at: 7.60 },
    { year: 1991, sk: 5.00, cz: 5.20, pl: 4.60, hu: 5.40, ro: 3.70, si: 6.30, hr: 5.70, ee: 4.30, at: 7.70 },
    { year: 1992, sk: 5.10, cz: 5.35, pl: 4.70, hu: 5.55, ro: 3.75, si: 6.50, hr: 5.85, ee: 4.35, at: 7.90 },
    { year: 1993, sk: 5.20, cz: 5.50, pl: 4.80, hu: 5.70, ro: 3.80, si: 6.70, hr: 6.00, ee: 4.40, at: 8.10 },
    { year: 1994, sk: 5.30, cz: 5.65, pl: 4.90, hu: 5.85, ro: 3.90, si: 6.90, hr: 6.15, ee: 4.50, at: 8.30 },
    { year: 1995, sk: 5.40, cz: 5.80, pl: 5.00, hu: 6.00, ro: 4.00, si: 7.10, hr: 6.30, ee: 4.60, at: 8.50 },
    { year: 1996, sk: 5.45, cz: 5.90, pl: 5.05, hu: 6.15, ro: 4.05, si: 7.25, hr: 6.40, ee: 4.70, at: 8.65 },
    { year: 1997, sk: 5.50, cz: 6.00, pl: 5.10, hu: 6.30, ro: 4.10, si: 7.40, hr: 6.50, ee: 4.80, at: 8.80 },
    { year: 1998, sk: 5.52, cz: 6.10, pl: 5.18, hu: 6.48, ro: 4.15, si: 7.55, hr: 6.60, ee: 4.90, at: 8.95 },
    { year: 1999, sk: 5.54, cz: 6.20, pl: 5.24, hu: 6.64, ro: 4.18, si: 7.68, hr: 6.70, ee: 5.00, at: 9.08 },
    { year: 2000, sk: 5.55, cz: 6.30, pl: 5.30, hu: 6.80, ro: 4.20, si: 7.80, hr: 6.80, ee: 5.10, at: 9.20 },
    { year: 2001, sk: 5.75, cz: 6.40, pl: 5.40, hu: 6.90, ro: 4.30, si: 7.90, hr: 6.90, ee: 5.20, at: 9.30 },
    { year: 2002, sk: 5.95, cz: 6.50, pl: 5.50, hu: 7.00, ro: 4.40, si: 8.00, hr: 7.00, ee: 5.30, at: 9.40 },
    { year: 2003, sk: 6.15, cz: 6.60, pl: 5.60, hu: 7.10, ro: 4.50, si: 8.10, hr: 7.10, ee: 5.40, at: 9.50 },
    { year: 2004, sk: 6.45, cz: 6.70, pl: 5.70, hu: 7.20, ro: 4.60, si: 8.20, hr: 7.20, ee: 5.50, at: 9.60 },
    { year: 2005, sk: 6.75, cz: 6.80, pl: 5.80, hu: 7.30, ro: 4.70, si: 8.35, hr: 7.30, ee: 5.65, at: 9.75 },
    { year: 2006, sk: 7.10, cz: 6.90, pl: 5.90, hu: 7.40, ro: 4.80, si: 8.50, hr: 7.40, ee: 5.80, at: 9.90 },
    { year: 2007, sk: 7.40, cz: 7.00, pl: 6.00, hu: 7.40, ro: 4.90, si: 8.50, hr: 7.45, ee: 5.95, at: 9.95 },
    { year: 2008, sk: 7.70, cz: 7.10, pl: 6.10, hu: 7.40, ro: 5.00, si: 8.50, hr: 7.50, ee: 6.10, at: 10.00 },
    { year: 2009, sk: 7.75, cz: 7.15, pl: 6.15, hu: 7.40, ro: 5.10, si: 8.50, hr: 7.50, ee: 6.20, at: 10.05 },
    { year: 2010, sk: 7.80, cz: 7.20, pl: 6.20, hu: 7.40, ro: 5.20, si: 8.50, hr: 7.50, ee: 6.30, at: 10.10 },
    { year: 2011, sk: 7.65, cz: 7.25, pl: 6.25, hu: 7.30, ro: 5.20, si: 8.60, hr: 7.55, ee: 6.40, at: 10.15 },
    { year: 2012, sk: 7.50, cz: 7.30, pl: 6.30, hu: 7.20, ro: 5.20, si: 8.70, hr: 7.60, ee: 6.50, at: 10.20 },
    { year: 2013, sk: 7.40, cz: 7.40, pl: 6.35, hu: 7.10, ro: 5.25, si: 8.80, hr: 7.62, ee: 6.60, at: 10.35 },
    { year: 2014, sk: 7.30, cz: 7.50, pl: 6.40, hu: 7.00, ro: 5.30, si: 8.90, hr: 7.65, ee: 6.70, at: 10.50 },
    { year: 2015, sk: 7.20, cz: 7.60, pl: 6.45, hu: 6.90, ro: 5.35, si: 9.00, hr: 7.68, ee: 6.80, at: 10.65 },
    { year: 2016, sk: 7.15, cz: 7.70, pl: 6.50, hu: 6.80, ro: 5.40, si: 9.10, hr: 7.70, ee: 6.90, at: 10.80 },
    { year: 2017, sk: 7.10, cz: 7.80, pl: 6.50, hu: 6.80, ro: 5.40, si: 9.15, hr: 7.72, ee: 7.00, at: 10.90 },
    { year: 2018, sk: 7.12, cz: 8.00, pl: 6.50, hu: 6.80, ro: 5.45, si: 9.25, hr: 7.75, ee: 7.15, at: 11.10 },
    { year: 2019, sk: 7.15, cz: 8.20, pl: 6.50, hu: 6.80, ro: 5.50, si: 9.35, hr: 7.78, ee: 7.30, at: 11.30 },
    { year: 2020, sk: 7.20, cz: 9.20, pl: 6.50, hu: 6.80, ro: 6.30, si: 9.50, hr: 7.80, ee: 7.50, at: 11.50 },
    { year: 2021, sk: 7.25, cz: 8.90, pl: 6.70, hu: 6.70, ro: 6.10, si: 9.45, hr: 7.70, ee: 7.30, at: 11.40 },
    { year: 2022, sk: 7.30, cz: 8.60, pl: 6.90, hu: 6.50, ro: 5.90, si: 9.38, hr: 7.60, ee: 7.10, at: 11.30 },
    { year: 2023, sk: 7.35, cz: 8.43, pl: 7.14, hu: 6.40, ro: 5.80, si: 9.30, hr: 7.50, ee: 7.00, at: 11.20 },
    { year: 2024, sk: 7.42, cz: 8.45, pl: 7.16, hu: 6.40, ro: 5.80, si: 9.30, hr: 7.50, ee: 7.00, at: 11.40 },
    { year: 2025, sk: 7.50, cz: 8.48, pl: 7.18, hu: 6.40, ro: 5.80, si: 9.30, hr: 7.50, ee: 7.00, at: 11.60 },
    { year: 2026, sk: 7.60, cz: 8.50, pl: 7.20, hu: 6.40, ro: 5.80, si: 9.30, hr: 7.50, ee: 7.00, at: 11.90 }
];

const pmMappingHealth = {
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

const flagSVGsgHealth = {
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

const countryNamesHealth = {
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
let currentYearHealth = 1989; 
let isPlayingHealth = false;
let intervalIdHealth = null;
const stepSizeHealth = 0.04;      
const tickSpeedHealth = 50;       
const maxChartValueHealth = 13.0;   // Scale 0% to 13% of GDP

// DOM Elements
let playBtnHealth, playIconHealth, yearSliderHealth, yearLabelHealth, raceContainerHealth;

function getPMImageSrcHealth(name) {
    if (!name) return "assets/pm/default.jpg";
    const firstName = name.split('/')[0].trim();
    const normalized = firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "_");
    return `assets/pm/${normalized}.jpg`;
}

function initHealthRaceChart() {
    playBtnHealth = document.getElementById('btn-health-play');
    playIconHealth = document.getElementById('health-play-icon');
    yearSliderHealth = document.getElementById('health-year-slider');
    yearLabelHealth = document.getElementById('health-year-label');
    raceContainerHealth = document.getElementById('bar-health-container');

    if (!playBtnHealth || !yearSliderHealth || !yearLabelHealth || !raceContainerHealth) {
        console.warn("Health chart components not found in DOM.");
        return;
    }

    yearSliderHealth.min = 1989;
    yearSliderHealth.max = 2026;
    yearSliderHealth.value = currentYearHealth;

    raceContainerHealth.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-health-row row-${code}`;
        row.id = `health-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGsgHealth[code]}
                <span class="bar-race-name-text">${countryNamesHealth[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-health-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="health-val-${code}">0,00%</span>
            </div>
        `;
        raceContainerHealth.appendChild(row);
    });

    playBtnHealth.addEventListener('click', togglePlayHealth);
    yearSliderHealth.addEventListener('input', (e) => {
        pauseHealth();
        currentYearHealth = parseInt(e.target.value);
        updateHealthYearData();
    });

    updateHealthYearData();
}

function updateHealthYearData() {
    const y0 = Math.floor(currentYearHealth);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearHealth - y0; 

    const data0 = healthDataset.find(d => d.year === y0);
    const data1 = healthDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    yearLabelHealth.innerText = y0;
    yearSliderHealth.value = y0;

    const watermark = document.getElementById('health-year-watermark');
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

    const activePM = pmMappingHealth[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-health-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcHealth(activePM);
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
        const row = document.getElementById(`health-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`health-val-${item.code}`);

        if (row && fill && valSpan) {
            const widthPct = Math.min(100, (item.val / maxChartValueHealth) * 100);
            fill.style.width = `${widthPct}%`;
            // Format to Slovak style float (comma instead of dot)
            const formattedVal = item.val.toFixed(2).replace('.', ',') + '%';
            valSpan.innerText = formattedVal;
            
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlayHealth() {
    if (isPlayingHealth) {
        pauseHealth();
    } else {
        playHealth();
    }
}

function playHealth() {
    if (currentYearHealth >= 2026) {
        currentYearHealth = 1989; 
    }
    isPlayingHealth = true;
    playIconHealth.className = "fa-solid fa-pause";
    playBtnHealth.title = "Pozastaviť";
    
    intervalIdHealth = setInterval(() => {
        currentYearHealth += stepSizeHealth;
        if (currentYearHealth >= 2026) {
            currentYearHealth = 2026;
            updateHealthYearData();
            pauseHealth();
        } else {
            updateHealthYearData();
        }
    }, tickSpeedHealth);
}

function pauseHealth() {
    isPlayingHealth = false;
    if (playIconHealth) playIconHealth.className = "fa-solid fa-play";
    if (playBtnHealth) playBtnHealth.title = "Spustiť porovnanie";
    if (intervalIdHealth) {
        clearInterval(intervalIdHealth);
        intervalIdHealth = null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initHealthRaceChart, 100);
});
