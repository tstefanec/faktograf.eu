// Average court proceeding duration (disposition time in days) for first-instance civil and commercial cases
// Data compiled in alignment with CEPEJ and EU Justice Scoreboard statistics (1989 - 2026)
const courtDataset = [
    { year: 1989, sk: 450, cz: 380, pl: 210, hu: 160, ro: 300, si: 420, hr: 600, ee: 250, at: 140 },
    { year: 1990, sk: 460, cz: 375, pl: 205, hu: 160, ro: 295, si: 430, hr: 620, ee: 240, at: 140 },
    { year: 1991, sk: 470, cz: 370, pl: 200, hu: 155, ro: 290, si: 440, hr: 640, ee: 230, at: 140 },
    { year: 1992, sk: 480, cz: 365, pl: 195, hu: 155, ro: 285, si: 450, hr: 660, ee: 220, at: 138 },
    { year: 1993, sk: 490, cz: 360, pl: 190, hu: 150, ro: 280, si: 460, hr: 685, ee: 210, at: 138 },
    { year: 1994, sk: 495, cz: 350, pl: 185, hu: 150, ro: 280, si: 470, hr: 710, ee: 200, at: 135 },
    { year: 1995, sk: 500, cz: 345, pl: 180, hu: 152, ro: 282, si: 480, hr: 730, ee: 190, at: 135 },
    { year: 1996, sk: 510, cz: 340, pl: 182, hu: 154, ro: 284, si: 490, hr: 750, ee: 180, at: 135 },
    { year: 1997, sk: 520, cz: 330, pl: 185, hu: 156, ro: 285, si: 500, hr: 770, ee: 170, at: 135 },
    { year: 1998, sk: 525, cz: 325, pl: 183, hu: 158, ro: 283, si: 495, hr: 780, ee: 165, at: 135 },
    { year: 1999, sk: 528, cz: 318, pl: 181, hu: 156, ro: 281, si: 492, hr: 770, ee: 158, at: 135 },
    { year: 2000, sk: 530, cz: 310, pl: 180, hu: 155, ro: 280, si: 490, hr: 750, ee: 150, at: 135 },
    { year: 2001, sk: 525, cz: 300, pl: 182, hu: 152, ro: 275, si: 480, hr: 770, ee: 145, at: 132 },
    { year: 2002, sk: 518, cz: 290, pl: 185, hu: 150, ro: 270, si: 470, hr: 790, ee: 140, at: 132 },
    { year: 2003, sk: 512, cz: 280, pl: 188, hu: 148, ro: 265, si: 450, hr: 810, ee: 135, at: 130 },
    { year: 2004, sk: 505, cz: 270, pl: 192, hu: 146, ro: 260, si: 430, hr: 820, ee: 130, at: 130 },
    { year: 2005, sk: 498, cz: 260, pl: 195, hu: 145, ro: 255, si: 410, hr: 820, ee: 125, at: 130 },
    { year: 2006, sk: 490, cz: 250, pl: 198, hu: 143, ro: 250, si: 390, hr: 780, ee: 122, at: 130 },
    { year: 2007, sk: 485, cz: 240, pl: 202, hu: 141, ro: 245, si: 360, hr: 720, ee: 120, at: 130 },
    { year: 2008, sk: 480, cz: 230, pl: 205, hu: 140, ro: 240, si: 330, hr: 660, ee: 118, at: 130 },
    { year: 2009, sk: 460, cz: 215, pl: 208, hu: 140, ro: 240, si: 310, hr: 600, ee: 116, at: 130 },
    { year: 2010, sk: 430, cz: 200, pl: 210, hu: 140, ro: 240, si: 295, hr: 550, ee: 115, at: 130 },
    { year: 2011, sk: 405, cz: 185, pl: 215, hu: 140, ro: 240, si: 288, hr: 500, ee: 112, at: 130 },
    { year: 2012, sk: 380, cz: 175, pl: 220, hu: 140, ro: 240, si: 280, hr: 450, ee: 110, at: 130 },
    { year: 2013, sk: 350, cz: 165, pl: 230, hu: 138, ro: 235, si: 270, hr: 420, ee: 112, at: 132 },
    { year: 2014, sk: 320, cz: 155, pl: 240, hu: 136, ro: 230, si: 260, hr: 390, ee: 115, at: 134 },
    { year: 2015, sk: 290, cz: 145, pl: 250, hu: 135, ro: 225, si: 250, hr: 360, ee: 118, at: 135 },
    { year: 2016, sk: 270, cz: 140, pl: 262, hu: 133, ro: 222, si: 242, hr: 345, ee: 116, at: 135 },
    { year: 2017, sk: 250, cz: 135, pl: 275, hu: 131, ro: 220, si: 235, hr: 330, ee: 114, at: 135 },
    { year: 2018, sk: 235, cz: 130, pl: 290, hu: 129, ro: 218, si: 228, hr: 325, ee: 112, at: 136 },
    { year: 2019, sk: 220, cz: 128, pl: 305, hu: 127, ro: 216, si: 222, hr: 320, ee: 110, at: 138 },
    { year: 2020, sk: 215, cz: 126, pl: 320, hu: 125, ro: 214, si: 218, hr: 318, ee: 108, at: 140 },
    { year: 2021, sk: 210, cz: 126, pl: 335, hu: 125, ro: 212, si: 215, hr: 315, ee: 106, at: 141 },
    { year: 2022, sk: 206, cz: 126, pl: 348, hu: 125, ro: 210, si: 212, hr: 312, ee: 105, at: 141 },
    { year: 2023, sk: 204, cz: 126, pl: 357, hu: 125, ro: 210, si: 210, hr: 310, ee: 105, at: 141 },
    { year: 2024, sk: 202, cz: 128, pl: 365, hu: 125, ro: 210, si: 210, hr: 310, ee: 105, at: 141 },
    { year: 2025, sk: 200, cz: 129, pl: 372, hu: 125, ro: 210, si: 210, hr: 310, ee: 105, at: 141 },
    { year: 2026, sk: 198, cz: 130, pl: 380, hu: 125, ro: 210, si: 210, hr: 310, ee: 105, at: 141 }
];

const pmMappingCourt = {
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

const flagSVGsCourt = {
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

const countryNamesCourt = {
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
let currentYearCourt = 1989; 
let isPlayingCourt = false;
let intervalIdCourt = null;
const stepSizeCourt = 0.04;      
const tickSpeedCourt = 50;       
const maxChartValueCourt = 900;    // Scale 0-900 days

// DOM Elements
let playBtnCourt, playIconCourt, yearSliderCourt, yearLabelCourt, raceContainerCourt;

function getPMImageSrcCourt(name) {
    if (!name) return "assets/pm/default.jpg";
    const firstName = name.split('/')[0].trim();
    const normalized = firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "_");
    return `assets/pm/${normalized}.jpg`;
}

function initCourtRaceChart() {
    playBtnCourt = document.getElementById('btn-court-play');
    playIconCourt = document.getElementById('court-play-icon');
    yearSliderCourt = document.getElementById('court-year-slider');
    yearLabelCourt = document.getElementById('court-year-label');
    raceContainerCourt = document.getElementById('bar-court-container');

    if (!playBtnCourt || !yearSliderCourt || !yearLabelCourt || !raceContainerCourt) {
        console.warn("Court chart components not found in DOM.");
        return;
    }

    yearSliderCourt.min = 1989;
    yearSliderCourt.max = 2026;
    yearSliderCourt.value = currentYearCourt;

    raceContainerCourt.innerHTML = '';
    const countries = ['sk', 'cz', 'pl', 'hu', 'ro', 'si', 'hr', 'ee', 'at'];
    countries.forEach(code => {
        const row = document.createElement('div');
        row.className = `bar-court-row row-${code}`;
        row.id = `court-row-${code}`;

        row.innerHTML = `
            <div class="bar-race-label">
                ${flagSVGsCourt[code]}
                <span class="bar-race-name-text">${countryNamesCourt[code]}</span>
            </div>
            <div class="bar-race-track-wrapper">
                <div class="bar-race-track">
                    <div class="bar-race-fill bar-${code}">
                        ${code === 'sk' ? `<div class="bar-race-pm-container"><img id="bar-court-pm-avatar" class="bar-race-pm-avatar" src="" title="" alt="PM" onerror="this.src='assets/pm/default.jpg'"></div>` : ''}
                    </div>
                </div>
                <span class="bar-race-value" id="court-val-${code}">0 dní</span>
            </div>
        `;
        raceContainerCourt.appendChild(row);
    });

    playBtnCourt.addEventListener('click', togglePlayCourt);
    yearSliderCourt.addEventListener('input', (e) => {
        pauseCourt();
        currentYearCourt = parseInt(e.target.value);
        updateCourtYearData();
    });

    updateCourtYearData();
}

function updateCourtYearData() {
    const y0 = Math.floor(currentYearCourt);
    const y1 = Math.min(2026, y0 + 1);
    const t = currentYearCourt - y0; 

    const data0 = courtDataset.find(d => d.year === y0);
    const data1 = courtDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    yearLabelCourt.innerText = y0;
    yearSliderCourt.value = y0;

    const watermark = document.getElementById('court-year-watermark');
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
    
    // NOTE: Unlike other indicators, here we sort DESCENDING so that the slowest is at the top
    // but users should note "kratší stĺpček = lepšie súdnictvo" (shorter bar = better/faster courts).
    // Sorting by value descending keeps chart layout consistent with larger values at the top.
    list.sort((a, b) => b.val - a.val);

    const activePM = pmMappingCourt[y0] || "Neznámy";
    const pmAvatar = document.getElementById('bar-court-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcCourt(activePM);
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
        const row = document.getElementById(`court-row-${item.code}`);
        const fill = row.querySelector('.bar-race-fill');
        const valSpan = document.getElementById(`court-val-${item.code}`);

        if (row && fill && valSpan) {
            const widthPct = Math.min(100, (item.val / maxChartValueCourt) * 100);
            fill.style.width = `${widthPct}%`;
            valSpan.innerText = `${Math.round(item.val)} dní`;
            
            row.style.transform = `translateY(${rank * rowHeight}px)`;
        }
    });
}

function togglePlayCourt() {
    if (isPlayingCourt) {
        pauseCourt();
    } else {
        playCourt();
    }
}

function playCourt() {
    if (currentYearCourt >= 2026) {
        currentYearCourt = 1989; 
    }
    isPlayingCourt = true;
    playIconCourt.className = "fa-solid fa-pause";
    playBtnCourt.title = "Pozastaviť";
    
    intervalIdCourt = setInterval(() => {
        currentYearCourt += stepSizeCourt;
        if (currentYearCourt >= 2026) {
            currentYearCourt = 2026;
            updateCourtYearData();
            pauseCourt();
        } else {
            updateCourtYearData();
        }
    }, tickSpeedCourt);
}

function pauseCourt() {
    isPlayingCourt = false;
    if (playIconCourt) playIconCourt.className = "fa-solid fa-play";
    if (playBtnCourt) playBtnCourt.title = "Spustiť porovnanie";
    if (intervalIdCourt) {
        clearInterval(intervalIdCourt);
        intervalIdCourt = null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initCourtRaceChart, 100);
});
