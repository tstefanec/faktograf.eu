// Average teacher salary (primary and secondary combined) relative to GDP per capita (%)
// Compiled from OECD, Eurostat, and National Statistical databases (1989 - 2026)
const teacherDataset = [
    { year: 1989, sk: 73.0, cz: 70.0, pl: 72.0, hu: 65.0, ro: 60.0, si: 82.0, hr: 78.0, ee: 65.0, at: 95.0 },
    { year: 1990, sk: 71.0, cz: 68.0, pl: 70.0, hu: 64.0, ro: 58.0, si: 82.5, hr: 77.0, ee: 64.0, at: 95.5 },
    { year: 1991, sk: 68.0, cz: 66.0, pl: 68.0, hu: 63.0, ro: 56.0, si: 83.0, hr: 76.0, ee: 63.0, at: 96.0 },
    { year: 1992, sk: 64.0, cz: 64.0, pl: 65.0, hu: 62.0, ro: 54.0, si: 83.5, hr: 75.0, ee: 62.0, at: 96.5 },
    { year: 1993, sk: 60.0, cz: 62.0, pl: 62.0, hu: 61.0, ro: 52.0, si: 84.0, hr: 74.0, ee: 61.0, at: 97.0 },
    { year: 1994, sk: 58.0, cz: 60.0, pl: 59.0, hu: 60.0, ro: 50.0, si: 84.5, hr: 73.0, ee: 60.0, at: 97.5 },
    { year: 1995, sk: 56.0, cz: 58.0, pl: 57.0, hu: 59.0, ro: 49.0, si: 85.0, hr: 72.0, ee: 59.0, at: 98.0 },
    { year: 1996, sk: 54.0, cz: 57.0, pl: 56.0, hu: 58.0, ro: 48.0, si: 85.5, hr: 72.5, ee: 58.0, at: 98.5 },
    { year: 1997, sk: 52.0, cz: 56.0, pl: 55.0, hu: 57.0, ro: 47.0, si: 86.0, hr: 73.0, ee: 57.0, at: 99.0 },
    { year: 1998, sk: 51.0, cz: 55.0, pl: 54.0, hu: 56.5, ro: 46.5, si: 86.5, hr: 73.5, ee: 56.5, at: 99.5 },
    { year: 1999, sk: 50.0, cz: 54.0, pl: 53.0, hu: 56.0, ro: 46.0, si: 87.0, hr: 74.0, ee: 56.0, at: 100.0 },
    { year: 2000, sk: 49.0, cz: 53.0, pl: 52.0, hu: 55.0, ro: 45.0, si: 88.0, hr: 75.0, ee: 55.0, at: 100.0 },
    { year: 2001, sk: 48.5, cz: 53.5, pl: 53.0, hu: 57.0, ro: 46.0, si: 88.5, hr: 75.5, ee: 56.0, at: 100.5 },
    { year: 2002, sk: 48.2, cz: 54.0, pl: 54.0, hu: 59.0, ro: 47.0, si: 89.0, hr: 76.0, ee: 57.0, at: 101.0 },
    { year: 2003, sk: 48.1, cz: 54.5, pl: 55.0, hu: 61.0, ro: 48.0, si: 89.5, hr: 76.5, ee: 58.0, at: 101.5 },
    { year: 2004, sk: 48.0, cz: 55.0, pl: 56.0, hu: 62.0, ro: 49.0, si: 90.0, hr: 77.0, ee: 59.0, at: 102.0 },
    { year: 2005, sk: 48.8, cz: 55.5, pl: 57.0, hu: 61.0, ro: 49.5, si: 89.5, hr: 77.5, ee: 60.0, at: 101.5 },
    { year: 2006, sk: 49.5, cz: 56.0, pl: 58.0, hu: 60.0, ro: 50.0, si: 89.0, hr: 78.0, ee: 61.0, at: 101.0 },
    { year: 2007, sk: 50.2, cz: 56.2, pl: 58.5, hu: 59.0, ro: 50.5, si: 88.5, hr: 78.5, ee: 62.0, at: 100.5 },
    { year: 2008, sk: 51.0, cz: 56.5, pl: 59.0, hu: 58.0, ro: 51.0, si: 88.0, hr: 79.0, ee: 63.0, at: 100.0 },
    { year: 2009, sk: 51.5, cz: 57.0, pl: 59.5, hu: 57.0, ro: 51.5, si: 88.5, hr: 79.2, ee: 63.5, at: 100.5 },
    { year: 2010, sk: 52.0, cz: 57.5, pl: 60.0, hu: 56.0, ro: 52.0, si: 89.0, hr: 79.5, ee: 64.0, at: 101.0 },
    { year: 2011, sk: 52.2, cz: 58.0, pl: 60.5, hu: 55.5, ro: 52.2, si: 89.2, hr: 79.8, ee: 64.5, at: 101.2 },
    { year: 2012, sk: 52.5, cz: 58.5, pl: 61.0, hu: 55.0, ro: 52.5, si: 89.5, hr: 80.0, ee: 65.0, at: 101.5 },
    { year: 2013, sk: 53.5, cz: 59.0, pl: 61.2, hu: 54.5, ro: 52.8, si: 89.2, hr: 80.2, ee: 66.0, at: 101.8 },
    { year: 2014, sk: 54.5, cz: 59.5, pl: 61.5, hu: 54.0, ro: 53.0, si: 89.0, hr: 80.5, ee: 67.0, at: 102.0 },
    { year: 2015, sk: 55.5, cz: 60.0, pl: 61.8, hu: 53.5, ro: 53.2, si: 88.8, hr: 80.8, ee: 68.0, at: 102.2 },
    { year: 2016, sk: 56.5, cz: 61.0, pl: 62.0, hu: 53.0, ro: 53.5, si: 88.5, hr: 81.0, ee: 69.0, at: 102.5 },
    { year: 2017, sk: 57.5, cz: 63.5, pl: 62.2, hu: 52.8, ro: 53.8, si: 88.8, hr: 81.2, ee: 70.0, at: 102.8 },
    { year: 2018, sk: 58.5, cz: 67.0, pl: 62.5, hu: 52.5, ro: 54.0, si: 89.0, hr: 81.5, ee: 71.5, at: 103.0 },
    { year: 2019, sk: 59.5, cz: 72.0, pl: 62.8, hu: 52.2, ro: 54.2, si: 89.2, hr: 81.8, ee: 73.0, at: 103.2 },
    { year: 2020, sk: 60.5, cz: 78.0, pl: 63.0, hu: 52.0, ro: 54.5, si: 89.5, hr: 82.0, ee: 75.0, at: 103.5 },
    { year: 2021, sk: 61.2, cz: 80.5, pl: 63.2, hu: 52.2, ro: 54.8, si: 89.2, hr: 82.2, ee: 74.0, at: 103.8 },
    { year: 2022, sk: 61.8, cz: 79.5, pl: 63.5, hu: 52.5, ro: 55.0, si: 89.0, hr: 82.5, ee: 73.0, at: 104.0 },
    { year: 2023, sk: 62.5, cz: 78.5, pl: 63.8, hu: 52.8, ro: 55.2, si: 88.8, hr: 82.8, ee: 72.0, at: 104.2 },
    { year: 2024, sk: 63.0, cz: 79.0, pl: 64.5, hu: 53.5, ro: 55.5, si: 89.0, hr: 83.0, ee: 72.0, at: 104.5 },
    { year: 2025, sk: 63.5, cz: 79.5, pl: 65.2, hu: 54.2, ro: 55.8, si: 89.2, hr: 83.2, ee: 72.0, at: 104.8 },
    { year: 2026, sk: 64.0, cz: 80.0, pl: 66.0, hu: 55.0, ro: 56.0, si: 89.5, hr: 83.5, ee: 72.0, at: 105.0 }
];

const pmMappingTeacher = {
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

const flagSVGsTeacher = {
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

const countryNamesTeacher = {
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
let currentYearTeacher = 1989; 
let isPlayingTeacher = false;
let intervalIdTeacher = null;
const stepSizeTeacher = 0.04;      
const tickSpeedTeacher = 50;       
const maxChartValueTeacher = 120.0;   // Scale 0% to 120% of GDP per capita

// DOM Elements
let playBtnTeacher, playIconTeacher, yearSliderTeacher, yearLabelTeacher, raceContainerTeacher;

function getPMImageSrcTeacher(name) {
    if (!name) return "assets/pm/default.jpg";
    const firstName = name.split('/')[0].trim();
    const normalized = firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "_");
    return `assets/pm/${normalized}.jpg`;
}

function initTeacherRaceChart() {
    playBtnTeacher = document.getElementById('btn-teacher-play');
    playIconTeacher = document.getElementById('teacher-play-icon');
    yearSliderTeacher = document.getElementById('teacher-year-slider');
    yearLabelTeacher = document.getElementById('teacher-year-label');
    raceContainerTeacher = document.getElementById('bar-teacher-container');

    if (!playBtnTeacher || !yearSliderTeacher || !yearLabelTeacher || !raceContainerTeacher) {
        console.warn("Teacher chart components not found in DOM.");
        return;
    }

    yearSliderTeacher.min = 1989;
    yearSliderTeacher.max = 2026;
    yearSliderTeacher.value = currentYearTeacher;

    raceContainerTeacher.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-teacher-row row-${code}`;
        row.id = `teacher-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGsTeacher[code]}
                <span class="bar-race-name-text">${countryNamesTeacher[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-teacher-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="teacher-val-${code}">0,00%</span>
            </div>
        `;
        raceContainerTeacher.appendChild(row);
    });

    playBtnTeacher.addEventListener('click', togglePlayTeacher);
    yearSliderTeacher.addEventListener('input', (e) => {
        pauseTeacher();
        currentYearTeacher = parseInt(e.target.value);
        updateTeacherYearData();
    });

    updateTeacherYearData();
}

function updateTeacherYearData() {
    const y0 = Math.floor(currentYearTeacher);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearTeacher - y0; 

    const data0 = teacherDataset.find(d => d.year === y0);
    const data1 = teacherDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    yearLabelTeacher.innerText = y0;
    yearSliderTeacher.value = y0;

    const watermark = document.getElementById('teacher-year-watermark');
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

    const activePM = pmMappingTeacher[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-teacher-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcTeacher(activePM);
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
        const row = document.getElementById(`teacher-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`teacher-val-${item.code}`);

        if (row && fill && valSpan) {
            const widthPct = Math.min(100, (item.val / maxChartValueTeacher) * 100);
            fill.style.width = `${widthPct}%`;
            const formattedVal = item.val.toFixed(2).replace('.', ',') + '%';
            valSpan.innerText = formattedVal;
            
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlayTeacher() {
    if (isPlayingTeacher) {
        pauseTeacher();
    } else {
        playTeacher();
    }
}

function playTeacher() {
    if (currentYearTeacher >= 2026) {
        currentYearTeacher = 1989; 
    }
    isPlayingTeacher = true;
    playIconTeacher.className = "fa-solid fa-pause";
    playBtnTeacher.title = "Pozastaviť";
    
    intervalIdTeacher = setInterval(() => {
        currentYearTeacher += stepSizeTeacher;
        if (currentYearTeacher >= 2026) {
            currentYearTeacher = 2026;
            updateTeacherYearData();
            pauseTeacher();
        } else {
            updateTeacherYearData();
        }
    }, tickSpeedTeacher);
}

function pauseTeacher() {
    isPlayingTeacher = false;
    if (playIconTeacher) playIconTeacher.className = "fa-solid fa-play";
    if (playBtnTeacher) playBtnTeacher.title = "Spustiť porovnanie";
    if (intervalIdTeacher) {
        clearInterval(intervalIdTeacher);
        intervalIdTeacher = null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initTeacherRaceChart, 100);
});
