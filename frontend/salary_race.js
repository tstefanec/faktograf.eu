// Member of Parliament (MP) basic salary expressed as a multiple of the national average wage
// Comparative statistics compiled for Central Europe, Baltics, Balkans & Austria (1989 - 2026)
const salaryDataset = [
    { year: 1989, sk: 2.0, cz: 2.2, pl: 2.1, hu: 2.5, ro: 2.2, si: 1.8, hr: 1.9, ee: 2.0, at: 2.3 },
    { year: 1990, sk: 2.0, cz: 2.2, pl: 2.1, hu: 2.5, ro: 2.2, si: 1.8, hr: 1.9, ee: 2.0, at: 2.3 },
    { year: 1991, sk: 2.2, cz: 2.3, pl: 2.2, hu: 2.6, ro: 2.3, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 1992, sk: 2.5, cz: 2.3, pl: 2.2, hu: 2.7, ro: 2.3, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 1993, sk: 3.0, cz: 2.4, pl: 2.3, hu: 2.8, ro: 2.4, si: 1.9, hr: 2.1, ee: 2.1, at: 2.4 },
    { year: 1994, sk: 3.0, cz: 2.4, pl: 2.3, hu: 2.9, ro: 2.4, si: 1.9, hr: 2.1, ee: 2.2, at: 2.4 },
    { year: 1995, sk: 3.0, cz: 2.5, pl: 2.4, hu: 3.0, ro: 2.5, si: 2.0, hr: 2.1, ee: 2.2, at: 2.4 },
    { year: 1996, sk: 3.0, cz: 2.5, pl: 2.4, hu: 3.1, ro: 2.5, si: 2.0, hr: 2.2, ee: 2.2, at: 2.4 },
    { year: 1997, sk: 3.0, cz: 2.6, pl: 2.5, hu: 3.2, ro: 2.6, si: 2.0, hr: 2.2, ee: 2.3, at: 2.4 },
    { year: 1998, sk: 3.0, cz: 2.6, pl: 2.5, hu: 3.3, ro: 2.6, si: 2.0, hr: 2.2, ee: 2.3, at: 2.4 },
    { year: 1999, sk: 3.0, cz: 2.6, pl: 2.5, hu: 3.4, ro: 2.5, si: 2.0, hr: 2.1, ee: 2.2, at: 2.4 },
    { year: 2000, sk: 3.0, cz: 2.6, pl: 2.4, hu: 3.5, ro: 2.4, si: 2.0, hr: 2.1, ee: 2.2, at: 2.4 },
    { year: 2001, sk: 3.0, cz: 2.6, pl: 2.4, hu: 3.5, ro: 2.5, si: 2.0, hr: 2.1, ee: 2.2, at: 2.3 },
    { year: 2002, sk: 3.0, cz: 2.5, pl: 2.3, hu: 3.5, ro: 2.6, si: 1.9, hr: 2.1, ee: 2.1, at: 2.3 },
    { year: 2003, sk: 3.0, cz: 2.5, pl: 2.3, hu: 3.4, ro: 2.6, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2004, sk: 3.0, cz: 2.4, pl: 2.2, hu: 3.3, ro: 2.7, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2005, sk: 3.0, cz: 2.4, pl: 2.2, hu: 3.2, ro: 2.7, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2006, sk: 3.0, cz: 2.4, pl: 2.2, hu: 3.1, ro: 2.8, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2007, sk: 3.0, cz: 2.3, pl: 2.3, hu: 3.2, ro: 2.9, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2008, sk: 3.0, cz: 2.3, pl: 2.3, hu: 3.3, ro: 3.0, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2009, sk: 3.0, cz: 2.3, pl: 2.3, hu: 3.4, ro: 3.1, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2010, sk: 2.7, cz: 2.2, pl: 2.3, hu: 3.4, ro: 3.0, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2011, sk: 2.5, cz: 2.2, pl: 2.3, hu: 3.3, ro: 3.0, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2012, sk: 2.4, cz: 2.2, pl: 2.3, hu: 3.4, ro: 2.9, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2013, sk: 2.3, cz: 2.2, pl: 2.3, hu: 3.5, ro: 2.9, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2014, sk: 2.2, cz: 2.2, pl: 2.3, hu: 3.6, ro: 2.8, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2015, sk: 2.1, cz: 2.3, pl: 2.3, hu: 3.7, ro: 2.8, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2016, sk: 2.0, cz: 2.3, pl: 2.3, hu: 3.8, ro: 2.9, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2017, sk: 1.9, cz: 2.3, pl: 2.3, hu: 3.9, ro: 3.0, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2018, sk: 2.4, cz: 2.4, pl: 2.2, hu: 4.0, ro: 3.3, si: 1.9, hr: 2.0, ee: 2.1, at: 2.3 },
    { year: 2019, sk: 3.0, cz: 2.5, pl: 2.2, hu: 4.1, ro: 3.2, si: 1.9, hr: 2.0, ee: 2.2, at: 2.3 },
    { year: 2020, sk: 3.0, cz: 2.6, pl: 2.2, hu: 4.1, ro: 3.1, si: 1.9, hr: 2.0, ee: 2.2, at: 2.3 },
    { year: 2021, sk: 3.0, cz: 2.6, pl: 2.2, hu: 4.1, ro: 3.0, si: 1.9, hr: 2.0, ee: 2.2, at: 2.3 },
    { year: 2022, sk: 3.0, cz: 2.6, pl: 2.3, hu: 4.1, ro: 2.9, si: 1.9, hr: 2.1, ee: 2.2, at: 2.3 },
    { year: 2023, sk: 3.0, cz: 2.6, pl: 2.3, hu: 3.7, ro: 2.9, si: 1.9, hr: 2.1, ee: 2.2, at: 2.3 },
    { year: 2024, sk: 3.0, cz: 2.6, pl: 2.3, hu: 3.3, ro: 2.8, si: 1.9, hr: 2.1, ee: 2.2, at: 2.3 },
    { year: 2025, sk: 3.0, cz: 2.6, pl: 2.3, hu: 3.0, ro: 2.8, si: 1.9, hr: 2.1, ee: 2.2, at: 2.3 },
    { year: 2026, sk: 3.0, cz: 2.6, pl: 2.3, hu: 2.7, ro: 2.8, si: 1.9, hr: 2.1, ee: 2.2, at: 2.3 }
];

const pmMappingSalary = {
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

const flagSVGsSalary = {
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

const countryNamesSalary = {
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
let currentYearSalary = 1989; 
let isPlayingSalary = false;
let intervalIdSalary = null;
const stepSizeSalary = 0.04;      
const tickSpeedSalary = 50;       
const maxChartValueSalary = 5.0;   // Scale 0-5.0x

// DOM Elements
let playBtnSalary, playIconSalary, yearSliderSalary, yearLabelSalary, raceContainerSalary;

function getPMImageSrcSalary(name) {
    if (!name) return "assets/pm/default.jpg";
    const firstName = name.split('/')[0].trim();
    const normalized = firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "_");
    return `assets/pm/${normalized}.jpg`;
}

function initSalaryRaceChart() {
    playBtnSalary = document.getElementById('btn-salary-play');
    playIconSalary = document.getElementById('salary-play-icon');
    yearSliderSalary = document.getElementById('salary-year-slider');
    yearLabelSalary = document.getElementById('salary-year-label');
    raceContainerSalary = document.getElementById('bar-salary-container');

    if (!playBtnSalary || !yearSliderSalary || !yearLabelSalary || !raceContainerSalary) {
        console.warn("Salary chart components not found in DOM.");
        return;
    }

    yearSliderSalary.min = 1989;
    yearSliderSalary.max = 2026;
    yearSliderSalary.value = currentYearSalary;

    raceContainerSalary.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-salary-row row-${code}`;
        row.id = `salary-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGsSalary[code]}
                <span class="bar-race-name-text">${countryNamesSalary[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-salary-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="salary-val-${code}">0.0x</span>
            </div>
        `;
        raceContainerSalary.appendChild(row);
    });

    playBtnSalary.addEventListener('click', togglePlaySalary);
    yearSliderSalary.addEventListener('input', (e) => {
        pauseSalary();
        currentYearSalary = parseFloat(e.target.value);
        updateSalaryYearData();
    });

    updateSalaryYearData();
}

function updateSalaryYearData() {
    const y0 = Math.floor(currentYearSalary);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearSalary - y0; 

    const data0 = salaryDataset.find(d => d.year === y0);
    const data1 = salaryDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    yearLabelSalary.innerText = y0;
    yearSliderSalary.value = y0;

    const watermark = document.getElementById('salary-year-watermark');
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

    const activePM = pmMappingSalary[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-salary-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcSalary(activePM);
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
        const row = document.getElementById(`salary-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`salary-val-${item.code}`);

        if (row && fill && valSpan) {
            const widthPct = Math.min(100, (item.val / maxChartValueSalary) * 100);
            fill.style.width = `${widthPct}%`;
            valSpan.innerText = `${item.val.toFixed(1)}x`;
            
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlaySalary() {
    if (isPlayingSalary) {
        pauseSalary();
    } else {
        playSalary();
    }
}

function playSalary() {
    if (currentYearSalary >= 2026) {
        currentYearSalary = 1989; 
    }
    isPlayingSalary = true;
    playIconSalary.className = "fa-solid fa-pause";
    playBtnSalary.title = "Pozastaviť";
    
    intervalIdSalary = setInterval(() => {
        currentYearSalary += stepSizeSalary;
        if (currentYearSalary >= 2026) {
            currentYearSalary = 2026;
            updateSalaryYearData();
            pauseSalary();
        } else {
            updateSalaryYearData();
        }
    }, tickSpeedSalary);
}

function pauseSalary() {
    isPlayingSalary = false;
    if (playIconSalary) playIconSalary.className = "fa-solid fa-play";
    if (playBtnSalary) playBtnSalary.title = "Spustiť porovnanie";
    if (intervalIdSalary) {
        clearInterval(intervalIdSalary);
        intervalIdSalary = null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initSalaryRaceChart, 100);
});
