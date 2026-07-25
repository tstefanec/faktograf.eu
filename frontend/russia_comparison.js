// Slovakia vs Russia comparison statistics (1991 - 2026)
// Wage and pension values represented in EUR. Homicide rates represented per 100,000 inhabitants.
const russiaCompDataset = [
    { year: 1991, sk_wage: 125, ru_wage: 12, sk_pension: 60, ru_pension: 6, sk_homicide: 1.9, ru_homicide: 15.0 },
    { year: 1992, sk_wage: 150, ru_wage: 15, sk_pension: 70, ru_pension: 8, sk_homicide: 2.1, ru_homicide: 23.0 },
    { year: 1993, sk_wage: 177, ru_wage: 35, sk_pension: 81, ru_pension: 15, sk_homicide: 2.3, ru_homicide: 29.0 },
    { year: 1994, sk_wage: 209, ru_wage: 45, sk_pension: 92, ru_pension: 20, sk_homicide: 2.4, ru_homicide: 32.5 },
    { year: 1995, sk_wage: 239, ru_wage: 60, sk_pension: 105, ru_pension: 25, sk_homicide: 2.2, ru_homicide: 30.5 },
    { year: 1996, sk_wage: 270, ru_wage: 80, sk_pension: 118, ru_pension: 35, sk_homicide: 2.1, ru_homicide: 28.5 },
    { year: 1997, sk_wage: 306, ru_wage: 95, sk_pension: 132, ru_pension: 42, sk_homicide: 2.0, ru_homicide: 27.0 },
    { year: 1998, sk_wage: 333, ru_wage: 70, sk_pension: 145, ru_pension: 30, sk_homicide: 2.1, ru_homicide: 27.5 },
    { year: 1999, sk_wage: 356, ru_wage: 50, sk_pension: 152, ru_pension: 20, sk_homicide: 2.0, ru_homicide: 28.0 },
    { year: 2000, sk_wage: 375, ru_wage: 80, sk_pension: 160, ru_pension: 30, sk_homicide: 2.0, ru_homicide: 28.0 },
    { year: 2001, sk_wage: 410, ru_wage: 110, sk_pension: 175, ru_pension: 40, sk_homicide: 1.9, ru_homicide: 29.5 },
    { year: 2002, sk_wage: 448, ru_wage: 145, sk_pension: 190, ru_pension: 52, sk_homicide: 1.8, ru_homicide: 30.0 },
    { year: 2003, sk_wage: 477, ru_wage: 175, sk_pension: 202, ru_pension: 61, sk_homicide: 1.7, ru_homicide: 27.5 },
    { year: 2004, sk_wage: 525, ru_wage: 200, sk_pension: 218, ru_pension: 70, sk_homicide: 1.6, ru_homicide: 25.5 },
    { year: 2005, sk_wage: 573, ru_wage: 260, sk_pension: 236, ru_pension: 85, sk_homicide: 1.5, ru_homicide: 22.0 },
    { year: 2006, sk_wage: 622, ru_wage: 340, sk_pension: 254, ru_pension: 100, sk_homicide: 1.4, ru_homicide: 18.0 },
    { year: 2007, sk_wage: 669, ru_wage: 420, sk_pension: 275, ru_pension: 120, sk_homicide: 1.3, ru_homicide: 16.5 },
    { year: 2008, sk_wage: 723, ru_wage: 510, sk_pension: 298, ru_pension: 145, sk_homicide: 1.2, ru_homicide: 15.0 },
    { year: 2009, sk_wage: 744, ru_wage: 460, sk_pension: 336, ru_pension: 170, sk_homicide: 1.3, ru_homicide: 13.5 },
    { year: 2010, sk_wage: 769, ru_wage: 480, sk_pension: 353, ru_pension: 180, sk_homicide: 1.5, ru_homicide: 13.0 },
    { year: 2011, sk_wage: 786, ru_wage: 530, sk_pension: 362, ru_pension: 195, sk_homicide: 1.4, ru_homicide: 11.5 },
    { year: 2012, sk_wage: 805, ru_wage: 600, sk_pension: 375, ru_pension: 210, sk_homicide: 1.3, ru_homicide: 10.5 },
    { year: 2013, sk_wage: 824, ru_wage: 650, sk_pension: 388, ru_pension: 225, sk_homicide: 1.2, ru_homicide: 9.8 },
    { year: 2014, sk_wage: 858, ru_wage: 550, sk_pension: 399, ru_pension: 200, sk_homicide: 1.1, ru_homicide: 9.0 },
    { year: 2015, sk_wage: 883, ru_wage: 480, sk_pension: 410, ru_pension: 185, sk_homicide: 1.0, ru_homicide: 8.5 },
    { year: 2016, sk_wage: 912, ru_wage: 450, sk_pension: 417, ru_pension: 170, sk_homicide: 1.0, ru_homicide: 8.0 },
    { year: 2017, sk_wage: 954, ru_wage: 520, sk_pension: 428, ru_pension: 180, sk_homicide: 1.0, ru_homicide: 7.5 },
    { year: 2018, sk_wage: 1013, ru_wage: 560, sk_pension: 444, ru_pension: 190, sk_homicide: 1.1, ru_homicide: 7.0 },
    { year: 2019, sk_wage: 1092, ru_wage: 610, sk_pension: 460, ru_pension: 195, sk_homicide: 1.1, ru_homicide: 6.8 },
    { year: 2020, sk_wage: 1133, ru_wage: 630, sk_pension: 487, ru_pension: 200, sk_homicide: 1.0, ru_homicide: 6.8 },
    { year: 2021, sk_wage: 1211, ru_wage: 680, sk_pension: 505, ru_pension: 205, sk_homicide: 0.9, ru_homicide: 6.7 },
    { year: 2022, sk_wage: 1304, ru_wage: 720, sk_pension: 518, ru_pension: 210, sk_homicide: 0.9, ru_homicide: 6.5 },
    { year: 2023, sk_wage: 1430, ru_wage: 780, sk_pension: 612, ru_pension: 218, sk_homicide: 0.8, ru_homicide: 6.2 },
    { year: 2024, sk_wage: 1470, ru_wage: 800, sk_pension: 640, ru_pension: 222, sk_homicide: 0.8, ru_homicide: 6.1 },
    { year: 2025, sk_wage: 1495, ru_wage: 815, sk_pension: 655, ru_pension: 226, sk_homicide: 0.8, ru_homicide: 6.0 },
    { year: 2026, sk_wage: 1520, ru_wage: 830, sk_pension: 670, ru_pension: 230, sk_homicide: 0.8, ru_homicide: 6.0 }
];

// State Variables
let currentYearRussia = 1991;
let isPlayingRussia = false;
let intervalIdRussia = null;
const stepSizeRussia = 0.4;
const tickSpeedRussia = 150;

// DOM Elements
let playBtnRussia, playIconRussia, yearSliderRussia, yearLabelRussia;

function initRussiaComparison() {
    playBtnRussia = document.getElementById('btn-russia-play');
    playIconRussia = document.getElementById('russia-play-icon');
    yearSliderRussia = document.getElementById('russia-year-slider');
    yearLabelRussia = document.getElementById('russia-year-label');

    if (!yearSliderRussia || !yearLabelRussia) {
        console.warn("Russia comparison component targets not found in DOM.");
        return;
    }

    yearSliderRussia.min = 1991;
    yearSliderRussia.max = 2026;
    yearSliderRussia.value = currentYearRussia;

    if (playBtnRussia) {
        playBtnRussia.addEventListener('click', togglePlayRussia);
    }
    
    yearSliderRussia.addEventListener('input', (e) => {
        pauseRussia();
        currentYearRussia = parseInt(e.target.value);
        updateRussiaComparisonData();
    });

    updateRussiaComparisonData();
}

function updateRussiaComparisonData() {
    const y = Math.round(currentYearRussia);
    const data = russiaCompDataset.find(d => d.year === y);

    if (!data) return;

    yearLabelRussia.innerText = y;
    yearSliderRussia.value = y;

    // 1. Wage updates
    const skWageVal = document.getElementById('ru-comp-sk-wage-val');
    const ruWageVal = document.getElementById('ru-comp-ru-wage-val');
    const skWageBar = document.getElementById('ru-comp-sk-wage-bar');
    const ruWageBar = document.getElementById('ru-comp-ru-wage-bar');

    if (skWageVal && ruWageVal && skWageBar && ruWageBar) {
        skWageVal.innerText = `${data.sk_wage} €`;
        ruWageVal.innerText = `${data.ru_wage} €`;
        // Normalize against max wage in dataset (1520)
        skWageBar.style.width = `${(data.sk_wage / 1600) * 100}%`;
        ruWageBar.style.width = `${(data.ru_wage / 1600) * 100}%`;
    }

    // 2. Pension updates
    const skPensionVal = document.getElementById('ru-comp-sk-pension-val');
    const ruPensionVal = document.getElementById('ru-comp-ru-pension-val');
    const skPensionBar = document.getElementById('ru-comp-sk-pension-bar');
    const ruPensionBar = document.getElementById('ru-comp-ru-pension-bar');

    if (skPensionVal && ruPensionVal && skPensionBar && ruPensionBar) {
        skPensionVal.innerText = `${data.sk_pension} €`;
        ruPensionVal.innerText = `${data.ru_pension} €`;
        // Normalize against max pension in dataset (670)
        skPensionBar.style.width = `${(data.sk_pension / 700) * 100}%`;
        ruPensionBar.style.width = `${(data.ru_pension / 700) * 100}%`;
    }

    // 3. Homicide updates
    const skHomicideVal = document.getElementById('ru-comp-sk-homicide-val');
    const ruHomicideVal = document.getElementById('ru-comp-ru-homicide-val');
    const skHomicideBar = document.getElementById('ru-comp-sk-homicide-bar');
    const ruHomicideBar = document.getElementById('ru-comp-ru-homicide-bar');

    if (skHomicideVal && ruHomicideVal && skHomicideBar && ruHomicideBar) {
        // Express both as per 100k rate and percentage of population
        const skPct = (data.sk_homicide / 1000).toFixed(4);
        const ruPct = (data.ru_homicide / 1000).toFixed(4);
        
        skHomicideVal.innerHTML = `${data.sk_homicide} <span style="font-size:10px; color:var(--color-silver);">(${skPct}%)</span>`;
        ruHomicideVal.innerHTML = `${data.ru_homicide} <span style="font-size:10px; color:var(--color-silver);">(${ruPct}%)</span>`;
        
        // Normalize against max homicide in dataset (32.5)
        skHomicideBar.style.width = `${(data.sk_homicide / 35.0) * 100}%`;
        ruHomicideBar.style.width = `${(data.ru_homicide / 35.0) * 100}%`;
    }
}

function togglePlayRussia() {
    if (isPlayingRussia) {
        pauseRussia();
    } else {
        playRussia();
    }
}

function playRussia() {
    if (currentYearRussia >= 2026) {
        currentYearRussia = 1991;
    }
    isPlayingRussia = true;
    if (playIconRussia) playIconRussia.className = "fa-solid fa-pause";
    if (playBtnRussia) playBtnRussia.title = "Pozastaviť";

    intervalIdRussia = setInterval(() => {
        currentYearRussia += 1;
        if (currentYearRussia >= 2026) {
            currentYearRussia = 2026;
            updateRussiaComparisonData();
            pauseRussia();
        } else {
            updateRussiaComparisonData();
        }
    }, tickSpeedRussia);
}

function pauseRussia() {
    isPlayingRussia = false;
    if (playIconRussia) playIconRussia.className = "fa-solid fa-play";
    if (playBtnRussia) playBtnRussia.title = "Spustiť prezentáciu";
    if (intervalIdRussia) {
        clearInterval(intervalIdRussia);
        intervalIdRussia = null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initRussiaComparison, 150);
});
