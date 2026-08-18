// Slovak Demographic & Pension Projections (1993 - 2050)
// Compiled from Infostat, ŠÚ SR, RRZ, and EC Ageing Report projections
const pensionProjDataset = [
    { year: 1993, working: 41.5, pensioners: 14.8, gdpPct: 7.10, sumMld: 0.84 },
    { year: 1994, working: 41.2, pensioners: 14.9, gdpPct: 7.12, sumMld: 0.92 },
    { year: 1995, working: 41.0, pensioners: 15.0, gdpPct: 7.15, sumMld: 1.05 },
    { year: 1996, working: 40.8, pensioners: 15.1, gdpPct: 7.18, sumMld: 1.18 },
    { year: 1997, working: 40.5, pensioners: 15.2, gdpPct: 7.20, sumMld: 1.30 },
    { year: 1998, working: 40.0, pensioners: 15.4, gdpPct: 7.25, sumMld: 1.45 },
    { year: 1999, working: 39.7, pensioners: 15.5, gdpPct: 7.28, sumMld: 1.55 },
    { year: 2000, working: 39.5, pensioners: 15.6, gdpPct: 7.30, sumMld: 1.62 },
    { year: 2001, working: 39.8, pensioners: 15.8, gdpPct: 7.35, sumMld: 1.82 },
    { year: 2002, working: 40.1, pensioners: 16.0, gdpPct: 7.40, sumMld: 2.10 },
    { year: 2003, working: 40.5, pensioners: 16.2, gdpPct: 7.45, sumMld: 2.45 },
    { year: 2004, working: 41.0, pensioners: 16.4, gdpPct: 7.50, sumMld: 2.85 },
    { year: 2005, working: 41.5, pensioners: 16.6, gdpPct: 7.55, sumMld: 3.32 },
    { year: 2006, working: 42.0, pensioners: 16.8, gdpPct: 7.60, sumMld: 3.85 },
    { year: 2007, working: 42.2, pensioners: 17.0, gdpPct: 7.68, sumMld: 4.35 },
    { year: 2008, working: 42.5, pensioners: 17.2, gdpPct: 7.75, sumMld: 4.88 },
    { year: 2009, working: 42.0, pensioners: 17.4, gdpPct: 7.82, sumMld: 5.12 },
    { year: 2010, working: 42.5, pensioners: 17.5, gdpPct: 7.90, sumMld: 5.45 },
    { year: 2011, working: 42.8, pensioners: 17.8, gdpPct: 7.95, sumMld: 5.80 },
    { year: 2012, working: 43.1, pensioners: 18.0, gdpPct: 8.00, sumMld: 6.15 },
    { year: 2013, working: 43.5, pensioners: 18.3, gdpPct: 8.05, sumMld: 6.42 },
    { year: 2014, working: 44.0, pensioners: 18.5, gdpPct: 8.10, sumMld: 6.75 },
    { year: 2015, working: 44.5, pensioners: 18.8, gdpPct: 8.15, sumMld: 7.10 },
    { year: 2016, working: 45.0, pensioners: 19.0, gdpPct: 8.20, sumMld: 7.42 },
    { year: 2017, working: 45.5, pensioners: 19.3, gdpPct: 8.22, sumMld: 7.75 },
    { year: 2018, working: 46.0, pensioners: 19.6, gdpPct: 8.25, sumMld: 8.10 },
    { year: 2019, working: 46.8, pensioners: 19.9, gdpPct: 8.28, sumMld: 8.35 },
    { year: 2020, working: 46.5, pensioners: 20.2, gdpPct: 8.30, sumMld: 7.90 },
    { year: 2021, working: 46.2, pensioners: 20.5, gdpPct: 8.35, sumMld: 8.25 },
    { year: 2022, working: 46.5, pensioners: 20.8, gdpPct: 8.40, sumMld: 9.35 },
    { year: 2023, working: 46.7, pensioners: 21.0, gdpPct: 8.50, sumMld: 10.50 },
    { year: 2024, working: 46.8, pensioners: 21.1, gdpPct: 8.55, sumMld: 10.80 },
    { year: 2025, working: 46.8, pensioners: 21.1, gdpPct: 8.58, sumMld: 11.00 },
    { year: 2026, working: 46.8, pensioners: 21.1, gdpPct: 8.60, sumMld: 11.20 },
    { year: 2027, working: 46.3, pensioners: 21.4, gdpPct: 8.75, sumMld: 11.90 },
    { year: 2028, working: 45.8, pensioners: 21.7, gdpPct: 8.90, sumMld: 12.70 },
    { year: 2029, working: 45.2, pensioners: 22.1, gdpPct: 9.05, sumMld: 13.60 },
    { year: 2030, working: 44.5, pensioners: 22.6, gdpPct: 9.20, sumMld: 14.80 },
    { year: 2031, working: 44.0, pensioners: 23.0, gdpPct: 9.40, sumMld: 15.80 },
    { year: 2032, working: 43.5, pensioners: 23.4, gdpPct: 9.60, sumMld: 16.90 },
    { year: 2033, working: 43.0, pensioners: 23.8, gdpPct: 9.80, sumMld: 18.00 },
    { year: 2034, working: 42.5, pensioners: 24.2, gdpPct: 10.00, sumMld: 19.20 },
    { year: 2035, working: 42.0, pensioners: 24.6, gdpPct: 10.15, sumMld: 20.40 },
    { year: 2036, working: 41.5, pensioners: 25.1, gdpPct: 10.35, sumMld: 21.60 },
    { year: 2037, working: 41.0, pensioners: 25.5, gdpPct: 10.55, sumMld: 22.80 },
    { year: 2038, working: 40.6, pensioners: 26.0, gdpPct: 10.75, sumMld: 24.00 },
    { year: 2039, working: 40.2, pensioners: 26.4, gdpPct: 10.95, sumMld: 25.20 },
    { year: 2040, working: 39.8, pensioners: 26.8, gdpPct: 11.10, sumMld: 26.50 },
    { year: 2041, working: 39.4, pensioners: 27.2, gdpPct: 11.30, sumMld: 27.80 },
    { year: 2042, working: 39.0, pensioners: 27.7, gdpPct: 11.50, sumMld: 29.20 },
    { year: 2043, working: 38.6, pensioners: 28.1, gdpPct: 11.75, sumMld: 30.70 },
    { year: 2044, working: 38.1, pensioners: 28.6, gdpPct: 12.00, sumMld: 32.20 },
    { year: 2045, working: 37.7, pensioners: 29.1, gdpPct: 12.25, sumMld: 33.80 },
    { year: 2046, working: 37.3, pensioners: 29.5, gdpPct: 12.50, sumMld: 35.50 },
    { year: 2047, working: 36.8, pensioners: 30.0, gdpPct: 12.75, sumMld: 37.30 },
    { year: 2048, working: 36.4, pensioners: 30.5, gdpPct: 13.00, sumMld: 39.20 },
    { year: 2049, working: 36.0, pensioners: 30.9, gdpPct: 13.25, sumMld: 41.20 },
    { year: 2050, working: 35.5, pensioners: 31.4, gdpPct: 13.50, sumMld: 43.20 }
];

const pmMappingPensionProj = {
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

// State Variables
let currentYearPensionProj = 1993; 
let isPlayingPensionProj = false;
let intervalIdPensionProj = null;
const stepSizePensionProj = 0.08;      
const tickSpeedPensionProj = 50;       

// DOM Elements
let playBtnPensionProj, playIconPensionProj, yearSliderPensionProj, yearLabelPensionProj;

function getPMImageSrcPensionProj(name) {
    if (!name) return "assets/pm/default.jpg";
    if (name === "Projekcia vývoja") return "assets/pm/projection.png";
    const firstName = name.split('/')[0].trim();
    const normalized = firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "_");
    return `assets/pm/${normalized}.jpg`;
}

function initPensionProjChart() {
    playBtnPensionProj = document.getElementById('btn-pension-proj-play');
    playIconPensionProj = document.getElementById('pension-proj-play-icon');
    yearSliderPensionProj = document.getElementById('pension-proj-year-slider');
    yearLabelPensionProj = document.getElementById('pension-proj-year-label');

    if (!playBtnPensionProj || !yearSliderPensionProj || !yearLabelPensionProj) {
        console.warn("Pension projection chart components not found in DOM.");
        return;
    }

    yearSliderPensionProj.min = 1993;
    yearSliderPensionProj.max = 2050;
    yearSliderPensionProj.value = currentYearPensionProj;

    playBtnPensionProj.addEventListener('click', togglePlayPensionProj);
    yearSliderPensionProj.addEventListener('input', (e) => {
        pausePensionProj();
        currentYearPensionProj = parseInt(e.target.value);
        updatePensionProjYearData();
    });

    updatePensionProjYearData();
}

function updatePensionProjYearData() {
    const y0 = Math.floor(currentYearPensionProj);
    const y1 = Math.min(2050, y0 + 1);
    const t = currentYearPensionProj - y0; 

    const data0 = pensionProjDataset.find(d => d.year === y0);
    const data1 = pensionProjDataset.find(d => d.year === y1) || data0;

    if (!data0) return;

    yearLabelPensionProj.innerText = y0;
    yearSliderPensionProj.value = y0;

    const watermark = document.getElementById('pension-proj-year-watermark');
    if (watermark) watermark.innerText = y0;

    // Interpolated values
    const workingVal = data0.working * (1 - t) + data1.working * t;
    const pensionersVal = data0.pensioners * (1 - t) + data1.pensioners * t;
    const gdpPctVal = data0.gdpPct * (1 - t) + data1.gdpPct * t;
    const sumMldVal = data0.sumMld * (1 - t) + data1.sumMld * t;

    // Update bars
    const barWorking = document.getElementById("bar-pension-proj-working");
    const barPensioners = document.getElementById("bar-pension-proj-pensioners");
    const valWorking = document.getElementById("pension-proj-val-working");
    const valPensioners = document.getElementById("pension-proj-val-pensioners");

    if (barWorking && valWorking) {
        // Max value is 100% of track width
        barWorking.style.width = `${workingVal}%`;
        valWorking.innerText = workingVal.toFixed(1).replace('.', ',') + '%';
    }

    if (barPensioners && valPensioners) {
        barPensioners.style.width = `${pensionersVal}%`;
        valPensioners.innerText = pensionersVal.toFixed(1).replace('.', ',') + '%';
    }

    // Update PM Avatar (on the working bar)
    const activePM = y0 > 2026 ? "Projekcia vývoja" : (pmMappingPensionProj[y0] || "Neznámy");
    const pmAvatar = document.getElementById('bar-pension-proj-pm-avatar');
    if (pmAvatar) {
        const newSrc = getPMImageSrcPensionProj(activePM);
        if (pmAvatar.src !== window.location.origin + '/' + newSrc && !pmAvatar.src.endsWith(newSrc)) {
            pmAvatar.style.opacity = '0.2';
            setTimeout(() => {
                pmAvatar.src = newSrc;
                pmAvatar.title = y0 > 2026 ? "Budúci vývoj" : `Premiér: ${activePM}`;
                pmAvatar.alt = activePM;
                pmAvatar.style.opacity = '1';
            }, 80);
        }
    }

    // Update KPIs below
    const gdpLabel = document.getElementById("pension-proj-gdp-label");
    const sumLabel = document.getElementById("pension-proj-sum-label");

    if (gdpLabel) {
        gdpLabel.innerText = gdpPctVal.toFixed(2).replace('.', ',') + '% HDP';
    }
    if (sumLabel) {
        sumLabel.innerText = sumMldVal.toFixed(2).replace('.', ',') + ' mld. €';
    }
}

function togglePlayPensionProj() {
    if (isPlayingPensionProj) {
        pausePensionProj();
    } else {
        playPensionProj();
    }
}

function playPensionProj() {
    if (currentYearPensionProj >= 2050) {
        currentYearPensionProj = 1993; 
    }
    isPlayingPensionProj = true;
    playIconPensionProj.className = "fa-solid fa-pause";
    playBtnPensionProj.title = "Pozastaviť";
    
    intervalIdPensionProj = setInterval(() => {
        currentYearPensionProj += stepSizePensionProj;
        if (currentYearPensionProj >= 2050) {
            currentYearPensionProj = 2050;
            updatePensionProjYearData();
            pausePensionProj();
        } else {
            updatePensionProjYearData();
        }
    }, tickSpeedPensionProj);
}

function pausePensionProj() {
    isPlayingPensionProj = false;
    if (playIconPensionProj) playIconPensionProj.className = "fa-solid fa-play";
    if (playBtnPensionProj) playBtnPensionProj.title = "Spustiť prezentáciu";
    if (intervalIdPensionProj) {
        clearInterval(intervalIdPensionProj);
        intervalIdPensionProj = null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initPensionProjChart, 100);
});
