// State Management
let activeMode = 'present'; // 'present' or 'historic'
let statsData = []; // Present Slovakia data
let historicalData = []; // Historical decadal data
let activeIndicator = "avg_wage"; // Default indicator plotted on the chart
let activeHistoricalIndicator = "gdp_capita"; // Default historical indicator

// Selected items in Historical Mode
let selectedHistIdA = null;
let selectedHistIdB = null;

let startYearA = 1993;
let endYearA = 1994;
let startYearB = 2024;
let endYearB = 2025;
let cabinets = [];
let headerChart = null; // Single header chart instance
let measuresVisibleA = false;
let measuresVisibleB = false;
let rankingsExpanded = false; // Global toggle state for collapsible rankings
let standardExpanded = false; // Global toggle state for collapsible standard metrics

// Indicators Metadata Configuration (Present Mode)
const indicatorsMeta = {
    gdp_growth: {
        title: "Reálny rast HDP",
        icon: "fa-chart-line",
        unit: "%",
        decimals: 1,
        higherIsBetter: true,
        desc: "Medziročný reálny prírastok hrubého domáceho produktu."
    },
    unemployment: {
        title: "Nezamestnanosť",
        icon: "fa-users-slash",
        unit: "%",
        decimals: 1,
        higherIsBetter: false,
        desc: "Miera evidovanej nezamestnanosti vykazovaná úradmi práce."
    },
    inflation: {
        title: "Miera inflácie (CPI)",
        icon: "fa-money-bill-trend-up",
        unit: "%",
        decimals: 1,
        higherIsBetter: false,
        desc: "Priemerná ročná miera inflácie meraná indexom spotrebiteľských cien."
    },
    public_debt: {
        title: "Verejný dlh",
        icon: "fa-hand-holding-dollar",
        unit: "% HDP",
        decimals: 1,
        higherIsBetter: false,
        desc: "Hrubý dlh verejnej správy vyjadrený ako percento HDP."
    },
    avg_wage: {
        title: "Priemerná mzda",
        icon: "fa-euro-sign",
        unit: "€",
        decimals: 0,
        higherIsBetter: true,
        desc: "Priemerná nominálna mesačná mzda v hospodárstve SR."
    },
    budget_balance: {
        title: "Rozpočtové saldo",
        icon: "fa-scale-balanced",
        unit: "% HDP",
        decimals: 1,
        higherIsBetter: true,
        desc: "Prebytok (+) alebo deficit (-) hospodárenia verejnej správy v % HDP."
    },
    trade_balance: {
        title: "Obchodná bilancia",
        icon: "fa-truck-ramp-box",
        unit: "mil. €",
        decimals: 0,
        higherIsBetter: true,
        desc: "Rozdiel medzi celkovým vývozom a dovozom tovarov a služieb."
    },
    gdp_ppp: {
        title: "HDP na hlavu v PKS",
        icon: "fa-globe",
        unit: "$",
        decimals: 0,
        higherIsBetter: true,
        desc: "Hrubý domáci produkt na obyvateľa v parite kúpnej sily v int. dolároch."
    },
    fdi: {
        title: "Zahraničné investície",
        icon: "fa-building-columns",
        unit: "mil. €",
        decimals: 0,
        higherIsBetter: true,
        desc: "Ročný prílev priamych zahraničných investícií (PZI) do SR."
    },
    pop_change: {
        title: "Populačný prírastok",
        icon: "fa-people-group",
        unit: "tis. obyv.",
        decimals: 1,
        higherIsBetter: true,
        desc: "Celkový ročný prírastok alebo úbytok počtu obyvateľov v tisíckach."
    },
    real_wage_growth: {
        title: "Rast reálnych miezd",
        icon: "fa-arrow-up-right-dots",
        unit: "%",
        decimals: 1,
        higherIsBetter: true,
        desc: "Medziročný rast reálnych miezd očistený o infláciu."
    },
    min_wage: {
        title: "Minimálna mzda",
        icon: "fa-coins",
        unit: "€",
        decimals: 0,
        higherIsBetter: true,
        desc: "Minimálna mesačná mzda stanovená zákonom SR."
    },
    beer_purchasing_power: {
        title: "Kúpyschopnosť (Pivo 12°)",
        icon: "fa-beer-mug-empty",
        unit: "pív",
        decimals: 0,
        higherIsBetter: true,
        desc: "Koľko pollitrových pív 12° (čapovaných v pohostinstve) si bolo možné kúpiť za priemernú mesačnú mzdu."
    },
    corruption_index: {
        title: "Index vnímania korupcie",
        icon: "fa-eye",
        unit: "bodov",
        decimals: 0,
        higherIsBetter: true,
        desc: "Index CPI od Transparency International (vyššie skóre = menej vnímanej korupcie)."
    },
    rank_gdp_ppp: {
        title: "Rebríček: HDP na hlavu",
        icon: "fa-earth-americas",
        unit: ". miesto",
        decimals: 0,
        higherIsBetter: false,
        desc: "Umiestnenie SR v globálnom rebríčku HDP na obyvateľa v parite kúpnej sily (PKS) (nižšia hodnota = lepší výsledok)."
    },
    rank_hdi: {
        title: "Rebríček: Index rozvoja (HDI)",
        icon: "fa-graduation-cap",
        unit: ". miesto",
        decimals: 0,
        higherIsBetter: false,
        desc: "Umiestnenie SR v globálnom indexe ľudského rozvoja HDI (vzdelanie, priemerná dĺžka života, HDP)."
    },
    rank_press_freedom: {
        title: "Rebríček: Sloboda tlače",
        icon: "fa-newspaper",
        unit: ". miesto",
        decimals: 0,
        higherIsBetter: false,
        desc: "Umiestnenie SR v rebríčku slobody tlače (World Press Freedom Index) od Reportérov bez hraníc."
    },
    rank_competitiveness: {
        title: "Rebríček: Konkurencieschopnosť",
        icon: "fa-ranking-star",
        unit: ". miesto",
        decimals: 0,
        higherIsBetter: false,
        desc: "Umiestnenie SR v rebríčku globálnej konkurencieschopnosti Svetového ekonomického fóra (WEF)."
    }
};

// Indicators Metadata Configuration (Historical Mode)
const indicatorsMetaHistorical = {
    gdp_capita: {
        title: "HDP na hlavu v PKS",
        icon: "fa-globe",
        unit: "$",
        decimals: 0,
        higherIsBetter: true,
        desc: "Hrubý domáci produkt na obyvateľa v parite kúpnej sily v int. dolároch."
    },
    life_expectancy: {
        title: "Očakávaná dĺžka života",
        icon: "fa-heart-pulse",
        unit: "rokov",
        decimals: 1,
        higherIsBetter: true,
        desc: "Priemerný očakávaný vek dožitia pri narodení."
    },
    infant_mortality: {
        title: "Dojčenská úmrtnosť",
        icon: "fa-baby",
        unit: "na 1000 detí",
        decimals: 1,
        higherIsBetter: false,
        desc: "Počet úmrtí detí do jedného roku na 1000 živonarodených detí (nižšia = lepšia)."
    },
    urbanization: {
        title: "Miera urbanizácie",
        icon: "fa-city",
        unit: "%",
        decimals: 1,
        higherIsBetter: true,
        desc: "Podiel obyvateľstva žijúceho v mestách."
    },
    industrial_index: {
        title: "Priemyselná produkcia",
        icon: "fa-industry",
        unit: "index (1950=100)",
        decimals: 1,
        higherIsBetter: true,
        desc: "Index priemyselnej produkcie vztiahnutý k roku 1950 (1950 = 100)."
    },
    avg_wage_usd: {
        title: "Priemerná mzda (USD)",
        icon: "fa-dollar-sign",
        unit: "$",
        decimals: 0,
        higherIsBetter: true,
        desc: "Priemerná mesačná mzda vyjadrená v amerických dolároch (USD)."
    }
};

// On Page Load
window.addEventListener('DOMContentLoaded', () => {
    fetchStats();
});

// Extract unique governments/cabinets from historical data (Present Mode)
function initGovDropdowns() {
    cabinets = cabinetGroupings;
    
    const selectA = document.getElementById('select-gov-a');
    const selectB = document.getElementById('select-gov-b');
    
    if (selectA && selectB) {
        selectA.innerHTML = '';
        selectB.innerHTML = '';
        
        cabinets.forEach(cab => {
            const optA = document.createElement('option');
            optA.value = cab.startYear;
            optA.textContent = cab.label;
            selectA.appendChild(optA);
            
            const optB = document.createElement('option');
            optB.value = cab.startYear;
            optB.textContent = cab.label;
            selectB.appendChild(optB);
        });
    }
}

// Populate dropdowns in Historical Mode
function initHistoricalDropdowns() {
    const selectA = document.getElementById('select-gov-a');
    const selectB = document.getElementById('select-gov-b');
    
    if (selectA && selectB) {
        selectA.innerHTML = '';
        selectB.innerHTML = '';
        
        historicalData.forEach(row => {
            const labelText = `${row.country} (${row.year})`;
            
            if (row.country === 'Československo' || row.country === 'Slovensko') {
                const optA = document.createElement('option');
                optA.value = row.id;
                optA.textContent = labelText;
                selectA.appendChild(optA);
            } else {
                const optB = document.createElement('option');
                optB.value = row.id;
                optB.textContent = labelText;
                selectB.appendChild(optB);
            }
        });
    }
}

// Fetch historical statistics from FastAPI
async function fetchStats() {
    const container = document.getElementById('metrics-container');
    try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
            throw new Error(`Chyba API: ${response.statusText}`);
        }
        statsData = await response.json();
        
        // Calculate beer purchasing power dynamically
        const beerPrices = {
            1993: 0.27, 1994: 0.30, 1995: 0.33, 1996: 0.33, 1997: 0.37, 1998: 0.40, 1999: 0.46,
            2000: 0.53, 2001: 0.60, 2002: 0.66, 2003: 0.73, 2004: 0.80, 2005: 0.86, 2006: 0.93,
            2007: 1.00, 2008: 1.06, 2009: 1.10, 2010: 1.15, 2011: 1.20, 2012: 1.25, 2013: 1.30,
            2014: 1.30, 2015: 1.35, 2016: 1.40, 2017: 1.45, 2018: 1.50, 2019: 1.60, 2020: 1.70,
            2021: 1.80, 2022: 2.00, 2023: 2.20, 2024: 2.40, 2025: 2.50
        };
        statsData.forEach(d => {
            if (d.avg_wage) {
                d.beer_purchasing_power = d.avg_wage / (beerPrices[d.year] || 2.50);
            } else {
                d.beer_purchasing_power = null;
            }
        });
        
        // Initialize government dropdowns
        initGovDropdowns();
        
        // Set default period boundaries based on dropdown choices
        if (cabinets.length > 0) {
            const cabA = cabinets[0]; // Vladimír Mečiar (1993)
            startYearA = cabA.startYear;
            endYearA = cabA.endYear;
            
            const cabB = cabinets[cabinets.length - 1]; // Robert Fico IV (2024 - 2025)
            startYearB = cabB.startYear;
            endYearB = cabB.endYear;
        }
        
        // Initialize dashboard
        updateDashboard();
    } catch (error) {
        console.error("Chyba pri načítaní ročenky:", error);
        container.innerHTML = `
            <div class="grid-loading" style="color: var(--color-red);">
                <i class="fa-solid fa-triangle-exclamation"></i> Nepodarilo sa načítať historické dáta. Uistite sa, že backend beží.
            </div>
        `;
    }
}

// Switch Mode Callback
async function switchMode(mode) {
    if (activeMode === mode) return;
    activeMode = mode;
    
    // Toggle active button class
    document.getElementById('btn-mode-present').classList.toggle('active', mode === 'present');
    document.getElementById('btn-mode-historic').classList.toggle('active', mode === 'historic');
    
    // Update labels/headings based on mode
    const isHist = mode === 'historic';
    
    document.getElementById('lbl-select-gov-a').innerText = isHist ? "Krajina / Rok A:" : "Vláda A (Obdobie):";
    document.getElementById('lbl-select-gov-b').innerText = isHist ? "Krajina / Rok B:" : "Vláda B (Obdobie):";
    
    document.getElementById('lbl-who-ruled-a').innerText = isHist ? "Líder v roku" : "Kto vládol v rokoch";
    document.getElementById('lbl-who-ruled-b').innerText = isHist ? "Líder v roku" : "Kto vládol v rokoch";
    
    document.getElementById('lbl-coalition-a').innerText = isHist ? "Zriadenie:" : "Koalícia:";
    document.getElementById('lbl-coalition-b').innerText = isHist ? "Zriadenie:" : "Koalícia:";
    
    // Reset measures panel visibility
    measuresVisibleA = false;
    measuresVisibleB = false;
    const panelA = document.getElementById('measures-panel-a');
    if (panelA) panelA.classList.remove('open');
    const panelB = document.getElementById('measures-panel-b');
    if (panelB) panelB.classList.remove('open');

    document.getElementById('btn-measures-a').innerHTML = isHist ? 
        `Kľúčové udalosti (Kladné / Záporné) <i class="fa-solid fa-chevron-up"></i>` :
        `Opatrenia vlády (Kladné / Záporné) <i class="fa-solid fa-chevron-up"></i>`;
        
    document.getElementById('btn-measures-b').innerHTML = isHist ? 
        `Kľúčové udalosti (Kladné / Záporné) <i class="fa-solid fa-chevron-up"></i>` :
        `Opatrenia vlády (Kladné / Záporné) <i class="fa-solid fa-chevron-up"></i>`;

    // Force rebuild of dropdown select elements in the sidebar
    const container = document.getElementById('metrics-container');
    if (container) {
        container.innerHTML = '';
    }
    
    if (isHist) {
        // Load historical data if not already loaded
        if (historicalData.length === 0) {
            try {
                const response = await fetch('/api/stats/historical');
                if (!response.ok) {
                    throw new Error(`API error: ${response.statusText}`);
                }
                historicalData = await response.json();
            } catch (err) {
                console.error("Chyba pri načítaní historických dát:", err);
                return;
            }
        }
        
        // Default historical active indicator
        activeIndicator = activeHistoricalIndicator;
        
        // Setup comparison dropdown options
        initHistoricalDropdowns();
        
        // Set default selection (Československo 1950 vs Rakúsko 1950)
        const defaultA = historicalData.find(d => d.country === 'Československo' && d.year === 1950);
        const defaultB = historicalData.find(d => d.country === 'Rakúsko' && d.year === 1950);
        selectedHistIdA = defaultA ? defaultA.id : historicalData[0].id;
        selectedHistIdB = defaultB ? defaultB.id : historicalData[0].id;
        
    } else {
        // Present mode
        activeIndicator = "avg_wage"; // Default present indicator
        initGovDropdowns();
        
        if (cabinets.length > 0) {
            const cabA = cabinets[0];
            startYearA = cabA.startYear;
            endYearA = cabA.endYear;
            
            const cabB = cabinets[cabinets.length - 1];
            startYearB = cabB.startYear;
            endYearB = cabB.endYear;
        }
    }
    
    updateDashboard();
}

// Government A Dropdown callback
function onGovASelect(val) {
    if (activeMode === 'historic') {
        selectedHistIdA = parseInt(val);
        updateDashboard();
    } else {
        const startVal = parseInt(val);
        const cab = cabinets.find(c => c.startYear === startVal);
        if (cab) {
            startYearA = cab.startYear;
            endYearA = cab.endYear;
            updateDashboard();
        }
    }
}

// Government B Dropdown callback
function onGovBSelect(val) {
    if (activeMode === 'historic') {
        selectedHistIdB = parseInt(val);
        updateDashboard();
    } else {
        const startVal = parseInt(val);
        const cab = cabinets.find(c => c.startYear === startVal);
        if (cab) {
            startYearB = cab.startYear;
            endYearB = cab.endYear;
            updateDashboard();
        }
    }
}

// Toggle Cabinet measures or decadal events on click
function toggleCabinetMeasures(slot) {
    const isHist = activeMode === 'historic';
    if (slot === 'A') {
        measuresVisibleA = !measuresVisibleA;
        const panelA = document.getElementById('measures-panel-a');
        if (panelA) {
            panelA.classList.toggle('open', measuresVisibleA);
        }
        const btnA = document.getElementById('btn-measures-a');
        if (btnA) {
            if (isHist) {
                btnA.innerHTML = measuresVisibleA ? 
                    `Skryť udalosti <i class="fa-solid fa-chevron-down"></i>` : 
                    `Kľúčové udalosti (Kladné / Záporné) <i class="fa-solid fa-chevron-up"></i>`;
            } else {
                btnA.innerHTML = measuresVisibleA ? 
                    `Skryť opatrenia <i class="fa-solid fa-chevron-down"></i>` : 
                    `Opatrenia vlády (Kladné / Záporné) <i class="fa-solid fa-chevron-up"></i>`;
            }
        }
    } else if (slot === 'B') {
        measuresVisibleB = !measuresVisibleB;
        const panelB = document.getElementById('measures-panel-b');
        if (panelB) {
            panelB.classList.toggle('open', measuresVisibleB);
        }
        const btnB = document.getElementById('btn-measures-b');
        if (btnB) {
            if (isHist) {
                btnB.innerHTML = measuresVisibleB ? 
                    `Skryť udalosti <i class="fa-solid fa-chevron-down"></i>` : 
                    `Kľúčové udalosti (Kladné / Záporné) <i class="fa-solid fa-chevron-up"></i>`;
            } else {
                btnB.innerHTML = measuresVisibleB ? 
                    `Skryť opatrenia <i class="fa-solid fa-chevron-down"></i>` : 
                    `Opatrenia vlády (Kladné / Záporné) <i class="fa-solid fa-chevron-up"></i>`;
            }
        }
    }
}

// Helper to render metric block HTML inside cabinet cards (Present Mode)
function getCabinetMetricHTML(startYear, endYear, dataStart, dataEnd, meta) {
    const valStart = dataStart[activeIndicator];
    const valEnd = dataEnd[activeIndicator];
    
    // Calculate Average (excluding the inherited start year if term > 1 year)
    const avgYearsList = startYear === endYear 
        ? statsData.filter(d => d.year === startYear)
        : statsData.filter(d => d.year > startYear && d.year <= endYear);
    const sumVal = avgYearsList.reduce((acc, curr) => acc + (curr[activeIndicator] || 0), 0);
    const avgVal = avgYearsList.length > 0 ? sumVal / avgYearsList.length : 0;
    
    const formattedStart = formatVal(valStart, meta);
    const formattedEnd = formatVal(valEnd, meta);
    const formattedAvg = formatVal(avgVal, meta);
    
    const startLbl = startYear === endYear ? `Hodnota:` : `Na začiatku (${startYear} - prevzaté):`;
    
    const isWage = activeIndicator === 'avg_wage' || activeIndicator === 'min_wage';
    if (isWage && startYear !== endYear) {
        const pctChange = valStart ? ((valEnd - valStart) / valStart) * 100.0 : 0;
        const formattedPct = (pctChange >= 0 ? '+' : '') + pctChange.toFixed(1) + '%';
        const changeLabel = pctChange >= 0 ? 'Nárast mzdy:' : 'Pokles miezd:';
        const avgLabel = activeIndicator === 'min_wage' ? 'Priemerná min. mzda:' : 'Priemerná mzda:';
        
        return `
            <div class="cabinet-metric-value">
                <span class="val-label" style="font-weight: 700; color: var(--color-text-primary);">${changeLabel}</span>
                <span class="val-num text-highlight">${formattedPct}</span>
            </div>
            <div class="cabinet-metric-value" style="opacity: 0.75; border-top: none; padding-top: 0;">
                <span class="val-label">${avgLabel}</span>
                <span class="val-num-secondary text-neutral" style="font-size: 13px; font-weight: 600;">${formattedAvg}</span>
            </div>
            <div class="cabinet-metric-value" style="opacity: 0.65; border-top: none; padding-top: 0; display: flex; flex-direction: row; gap: 10px; width: 100%; justify-content: space-between;">
                <div>
                    <span class="val-label">${startLbl}</span>
                    <span class="val-num-secondary text-neutral" style="font-size: 11px; font-weight: 500;">${formattedStart}</span>
                </div>
                <div style="text-align: right;">
                    <span class="val-label">Na konci (${endYear}):</span>
                    <span class="val-num-secondary text-neutral" style="font-size: 11px; font-weight: 500;">${formattedEnd}</span>
                </div>
            </div>
        `;
    }
    
    const startNumClass = startYear === endYear ? 'val-num text-highlight' : 'val-num-inherited text-neutral';
    
    const endRowHTML = startYear === endYear ? '' : `
        <div class="cabinet-metric-value">
            <span class="val-label">Na konci (${endYear}):</span>
            <span class="val-num text-highlight">${formattedEnd}</span>
        </div>
    `;
    const avgRowHTML = startYear === endYear ? '' : `
        <div class="cabinet-metric-value">
            <span class="val-label">Priemerná hodnota:</span>
            <span class="val-num text-highlight">${formattedAvg}</span>
        </div>
    `;
    
    return `
        <div class="cabinet-metric-value">
            <span class="val-label">${startLbl}</span>
            <span class="${startNumClass}">${formattedStart}</span>
        </div>
        ${endRowHTML}
        ${avgRowHTML}
    `;
}

// Update UI Layout
function updateDashboard() {
    const isHist = activeMode === 'historic';

    if (isHist) {
        if (historicalData.length === 0) return;

        // Find selected records
        const recordA = historicalData.find(d => d.id === selectedHistIdA) || historicalData[0];
        const recordB = historicalData.find(d => d.id === selectedHistIdB) || historicalData[0];

        // Sync comparison selects
        document.getElementById('select-gov-a').value = recordA.id;
        document.getElementById('select-gov-b').value = recordB.id;

        // Set Country & Year labels
        document.querySelectorAll('.cabinet-year-a-lbl').forEach(el => el.innerText = `${recordA.country} (${recordA.year})`);
        document.querySelectorAll('.cabinet-year-b-lbl').forEach(el => el.innerText = `${recordB.country} (${recordB.year})`);

        // Set leader/system
        document.getElementById('prime-a').innerText = recordA.leader || "Neznámy";
        document.getElementById('coalition-a').innerText = recordA.system || "Neznáme";
        document.getElementById('prime-b').innerText = recordB.leader || "Neznámy";
        document.getElementById('coalition-b').innerText = recordB.system || "Neznáme";

        // Set Images
        const imgA = document.getElementById('pm-img-a');
        if (imgA) {
            imgA.src = getPMImageSrc(recordA.leader);
            imgA.alt = recordA.leader || "";
        }
        const imgB = document.getElementById('pm-img-b');
        if (imgB) {
            imgB.src = getPMImageSrc(recordB.leader);
            imgB.alt = recordB.leader || "";
        }

        // Display note
        document.getElementById('note-a').innerHTML = recordA.note ? `• ${recordA.note}` : "";
        document.getElementById('note-b').innerHTML = recordB.note ? `• ${recordB.note}` : "";

        // Display active metric
        const activeMeta = indicatorsMetaHistorical[activeIndicator];
        const valDisplayA = document.getElementById('val-display-a');
        const valDisplayB = document.getElementById('val-display-b');

        const valA = recordA[activeIndicator];
        const valB = recordB[activeIndicator];
        const formattedA = formatVal(valA, activeMeta);
        const formattedB = formatVal(valB, activeMeta);

        if (valDisplayA && valDisplayB) {
            valDisplayA.innerHTML = `
                <div class="cabinet-metric-value">
                    <span class="val-label">Hodnota:</span>
                    <span class="val-num text-highlight">${formattedA}</span>
                </div>
            `;
            valDisplayB.innerHTML = `
                <div class="cabinet-metric-value">
                    <span class="val-label">Hodnota:</span>
                    <span class="val-num text-highlight">${formattedB}</span>
                </div>
            `;

            // Compare and color
            let isBetterA = false;
            let isBetterB = false;
            if (valA !== null && valB !== null && valA !== valB) {
                const higherIsBetter = activeMeta.higherIsBetter;
                if (higherIsBetter) {
                    isBetterA = valA > valB;
                    isBetterB = valB > valA;
                } else {
                    isBetterA = valA < valB;
                    isBetterB = valB < valA;
                }
            }

            valDisplayA.querySelectorAll('.val-num').forEach(el => {
                if (isBetterA) el.classList.add('text-green');
                else el.classList.add('text-silver');
            });
            valDisplayB.querySelectorAll('.val-num').forEach(el => {
                if (isBetterB) el.classList.add('text-green');
                else el.classList.add('text-beige');
            });

            // Winner Badges
            const badgeA = document.getElementById('better-gov-badge-a');
            const badgeB = document.getElementById('better-gov-badge-b');
            if (badgeA && badgeB) {
                badgeA.style.display = isBetterA ? 'inline-flex' : 'none';
                badgeB.style.display = isBetterB ? 'inline-flex' : 'none';
            }
        }

        // Victory score (sum across 5 indicators)
        let victoriesA = 0;
        let victoriesB = 0;
        Object.keys(indicatorsMetaHistorical).forEach(key => {
            const meta = indicatorsMetaHistorical[key];
            const vA = recordA[key];
            const vB = recordB[key];
            if (vA !== null && vB !== null && vA !== vB) {
                const isBetter = meta.higherIsBetter ? (vA > vB) : (vA < vB);
                if (isBetter) victoriesA++;
                else victoriesB++;
            }
        });

        const scoreEl = document.getElementById('vs-score-display');
        if (scoreEl) {
            const classA = victoriesA > victoriesB ? "text-green" : "text-silver";
            const classB = victoriesB > victoriesA ? "text-green" : "text-beige";
            scoreEl.innerHTML = `
                <span class="${classA}" style="font-weight: 800; ${victoriesA > victoriesB ? 'filter: drop-shadow(0 0 4px currentColor);' : ''}">${victoriesA}</span> 
                <span style="color: var(--color-text-secondary); margin: 0 2px;">:</span> 
                <span class="${classB}" style="font-weight: 800; ${victoriesB > victoriesA ? 'filter: drop-shadow(0 0 4px currentColor);' : ''}">${victoriesB}</span>
            `;
            scoreEl.title = `Krajina A dosiahla lepšie výsledky v ${victoriesA} ukazovateľoch, Krajina B v ${victoriesB} ukazovateľoch (z celkovo ${Object.keys(indicatorsMetaHistorical).length}).`;
        }

        // Unified comparison delta
        const deltaContainer = document.getElementById('comparison-delta-container');
        if (deltaContainer) {
            let deltaText = "";
            let badgeClass = "badge-neutral";
            let sign = "";
            const isPercentageUnit = activeMeta.unit.includes("%");

            if (valA !== null && valB !== null) {
                if (isPercentageUnit) {
                    const diff = valB - valA;
                    sign = diff > 0 ? "+" : "";
                    deltaText = `${sign}${diff.toFixed(2)} p.b.`;
                    const isImprovement = activeMeta.higherIsBetter ? (diff > 0) : (diff < 0);
                    if (diff === 0) badgeClass = "badge-neutral";
                    else badgeClass = isImprovement ? "badge-positive" : "badge-negative";
                } else {
                    if (valA !== 0) {
                        const diffPct = ((valB - valA) / Math.abs(valA)) * 100.0;
                        sign = diffPct > 0 ? "+" : "";
                        deltaText = `${sign}${diffPct.toFixed(0)}%`;
                        const isImprovement = activeMeta.higherIsBetter ? (diffPct > 0) : (diffPct < 0);
                        badgeClass = isImprovement ? "badge-positive" : "badge-negative";
                    } else {
                        deltaText = "N/A";
                        badgeClass = "badge-neutral";
                    }
                }
            } else {
                deltaText = "N/A";
                badgeClass = "badge-neutral";
            }
            const directionText = activeMeta.higherIsBetter ? "Rast je pozitívny" : "Pokles je pozitívny";

            deltaContainer.innerHTML = `
                <span class="delta-label-desc">Porovnanie hodnôt (B vs A):</span>
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                    <span class="delta-badge-large ${badgeClass}">${deltaText}</span>
                    <span class="delta-label-desc">(${directionText})</span>
                </div>
            `;
        }

        // Render events panel
        const parseEvents = (str) => {
            if (!str) return [];
            return str.split('|').map(s => s.trim()).filter(s => s);
        };
        const eventsA_pos = parseEvents(recordA.events_pos);
        const eventsA_neg = parseEvents(recordA.events_neg);
        const eventsB_pos = parseEvents(recordB.events_pos);
        const eventsB_neg = parseEvents(recordB.events_neg);

        const panelA = document.getElementById('measures-panel-a');
        if (panelA) {
            panelA.innerHTML = `
                <div class="measures-box">
                    <div class="measures-pos">
                        <h5><i class="fa-solid fa-circle-plus text-green"></i> Kladné udalosti</h5>
                        <ul>
                            ${eventsA_pos.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="measures-neg">
                        <h5><i class="fa-solid fa-circle-minus text-red"></i> Záporné udalosti</h5>
                        <ul>
                            ${eventsA_neg.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }
        const panelB = document.getElementById('measures-panel-b');
        if (panelB) {
            panelB.innerHTML = `
                <div class="measures-box">
                    <div class="measures-pos">
                        <h5><i class="fa-solid fa-circle-plus text-green"></i> Kladné udalosti</h5>
                        <ul>
                            ${eventsB_pos.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="measures-neg">
                        <h5><i class="fa-solid fa-circle-minus text-red"></i> Záporné udalosti</h5>
                        <ul>
                            ${eventsB_neg.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }

    } else {
        // Present mode
        if (statsData.length === 0) return;

        // Find Year A and Year B statistics objects
        const dataStartA = statsData.find(d => d.year === startYearA) || statsData[0];
        const dataEndA = statsData.find(d => d.year === endYearA) || statsData[0];
        
        const dataStartB = statsData.find(d => d.year === startYearB) || statsData[statsData.length - 1];
        const dataEndB = statsData.find(d => d.year === endYearB) || statsData[statsData.length - 1];

        // Victory score calculations across all 13 indicators (excluding the inherited start year if term > 1 year)
        let victoriesA = 0;
        let victoriesB = 0;
        Object.keys(indicatorsMeta).forEach(key => {
            const meta = indicatorsMeta[key];
            const listA = startYearA === endYearA
                ? statsData.filter(d => d.year === startYearA)
                : statsData.filter(d => d.year > startYearA && d.year <= endYearA);
            const avgA = listA.length > 0 ? (listA.reduce((sum, curr) => sum + (curr[key] || 0), 0) / listA.length) : 0;
            
            const listB = startYearB === endYearB
                ? statsData.filter(d => d.year === startYearB)
                : statsData.filter(d => d.year > startYearB && d.year <= endYearB);
            const avgB = listB.length > 0 ? (listB.reduce((sum, curr) => sum + (curr[key] || 0), 0) / listB.length) : 0;
            
            // For wage indicators, compare the percentage change during their term
            let compValA = avgA;
            let compValB = avgB;
            const isWageKey = key === 'avg_wage' || key === 'min_wage';
            if (isWageKey) {
                if (startYearA !== endYearA) {
                    const valStartA = statsData.find(d => d.year === startYearA)?.[key];
                    const valEndA = statsData.find(d => d.year === endYearA)?.[key];
                    compValA = valStartA ? ((valEndA - valStartA) / valStartA) * 100.0 : 0;
                } else {
                    compValA = 0;
                }
                if (startYearB !== endYearB) {
                    const valStartB = statsData.find(d => d.year === startYearB)?.[key];
                    const valEndB = statsData.find(d => d.year === endYearB)?.[key];
                    compValB = valStartB ? ((valEndB - valStartB) / valStartB) * 100.0 : 0;
                } else {
                    compValB = 0;
                }
            }
            
            if (compValA !== compValB) {
                const isBetter = meta.higherIsBetter ? (compValA > compValB) : (compValA < compValB);
                if (isBetter) victoriesA++;
                else victoriesB++;
            }
        });

        const scoreEl = document.getElementById('vs-score-display');
        if (scoreEl) {
            const classA = victoriesA > victoriesB ? "text-green" : "text-silver";
            const classB = victoriesB > victoriesA ? "text-green" : "text-beige";
            
            scoreEl.innerHTML = `
                <span class="${classA}" style="font-weight: 800; ${victoriesA > victoriesB ? 'filter: drop-shadow(0 0 4px currentColor);' : ''}">${victoriesA}</span> 
                <span style="color: var(--color-text-secondary); margin: 0 2px;">:</span> 
                <span class="${classB}" style="font-weight: 800; ${victoriesB > victoriesA ? 'filter: drop-shadow(0 0 4px currentColor);' : ''}">${victoriesB}</span>
            `;
            scoreEl.title = `Vláda A dosiahla lepšie priemerné výsledky v ${victoriesA} ukazovateľoch, Vláda B v ${victoriesB} ukazovateľoch (z celkovo 13).`;
        }

        // Sync select-gov dropdowns if cabinets exist (sync based on startYear of each slot)
        if (cabinets.length > 0) {
            const cabA = cabinets.find(cab => startYearA >= cab.startYear && startYearA <= cab.endYear);
            if (cabA) {
                document.getElementById('select-gov-a').value = cabA.startYear;
            }
            
            const cabB = cabinets.find(cab => startYearB >= cab.startYear && startYearB <= cab.endYear);
            if (cabB) {
                document.getElementById('select-gov-b').value = cabB.startYear;
            }
        }

        // Update Political Leadership labels (show range or single year)
        const rangeStrA = startYearA === endYearA ? `${startYearA}` : `${startYearA} - ${endYearA}`;
        const rangeStrB = startYearB === endYearB ? `${startYearB}` : `${startYearB} - ${endYearB}`;
        
        document.querySelectorAll('.cabinet-year-a-lbl').forEach(el => el.innerText = rangeStrA);
        document.querySelectorAll('.cabinet-year-b-lbl').forEach(el => el.innerText = rangeStrB);

        const cabA = cabinets.find(cab => startYearA >= cab.startYear && startYearA <= cab.endYear);
        const cabB = cabinets.find(cab => startYearB >= cab.startYear && startYearB <= cab.endYear);
        
        if (cabA) {
            document.getElementById('prime-a').innerText = cabA.prime_minister;
            document.getElementById('coalition-a').innerText = cabA.coalition;
        }
        if (cabB) {
            document.getElementById('prime-b').innerText = cabB.prime_minister;
            document.getElementById('coalition-b').innerText = cabB.coalition;
        }

        // Set PM Images
        const imgA = document.getElementById('pm-img-a');
        if (imgA) {
            imgA.src = getPMImageSrc(dataStartA.prime_minister);
            imgA.alt = dataStartA.prime_minister || "";
        }
        const imgB = document.getElementById('pm-img-b');
        if (imgB) {
            imgB.src = getPMImageSrc(dataStartB.prime_minister);
            imgB.alt = dataStartB.prime_minister || "";
        }

        // Inject active indicator statistics into cabinet cards
        const activeMeta = indicatorsMeta[activeIndicator];
        const valDisplayA = document.getElementById('val-display-a');
        const valDisplayB = document.getElementById('val-display-b');
        
        // Calculate averages for comparison and styling (excluding the inherited start year if term > 1 year)
        const listA = statsData.filter(d => d.year >= startYearA && d.year <= endYearA);
        const avgYearsListA = startYearA === endYearA
            ? listA
            : listA.filter(d => d.year > startYearA);
        const avgA = avgYearsListA.length > 0 ? (avgYearsListA.reduce((sum, curr) => sum + (curr[activeIndicator] || 0), 0) / avgYearsListA.length) : 0;
        
        const listB = statsData.filter(d => d.year >= startYearB && d.year <= endYearB);
        const avgYearsListB = startYearB === endYearB
            ? listB
            : listB.filter(d => d.year > startYearB);
        const avgB = avgYearsListB.length > 0 ? (avgYearsListB.reduce((sum, curr) => sum + (curr[activeIndicator] || 0), 0) / avgYearsListB.length) : 0;

        // Combined notes for all years in the range
        const notesA = listA.map(d => d.note).filter((v, i, a) => v && a.indexOf(v) === i);
        document.getElementById('note-a').innerHTML = notesA.map(n => `• ${n}`).join('<br>');

        const notesB = listB.map(d => d.note).filter((v, i, a) => v && a.indexOf(v) === i);
        document.getElementById('note-b').innerHTML = notesB.map(n => `• ${n}`).join('<br>');

        // For wage indicators, compare the percentage change during their term
        const isWage = activeIndicator === 'avg_wage' || activeIndicator === 'min_wage';
        let compValA, compValB;
        if (isWage) {
            if (startYearA !== endYearA) {
                const valStartA = dataStartA[activeIndicator];
                const valEndA = dataEndA[activeIndicator];
                compValA = valStartA ? ((valEndA - valStartA) / valStartA) * 100.0 : 0;
            } else {
                compValA = 0;
            }
            if (startYearB !== endYearB) {
                const valStartB = dataStartB[activeIndicator];
                const valEndB = dataEndB[activeIndicator];
                compValB = valStartB ? ((valEndB - valStartB) / valStartB) * 100.0 : 0;
            } else {
                compValB = 0;
            }
        } else {
            compValA = avgA;
            compValB = avgB;
        }

        let isBetterA = false;
        let isBetterB = false;
        
        if (compValA !== compValB) {
            const higherIsBetter = activeMeta.higherIsBetter;
            if (higherIsBetter) {
                isBetterA = compValA > compValB;
                isBetterB = compValB > compValA;
            } else {
                isBetterA = compValA < compValB;
                isBetterB = compValB < compValA;
            }
        }
        
        if (valDisplayA && valDisplayB) {
            valDisplayA.innerHTML = getCabinetMetricHTML(startYearA, endYearA, dataStartA, dataEndA, activeMeta);
            valDisplayB.innerHTML = getCabinetMetricHTML(startYearB, endYearB, dataStartB, dataEndB, activeMeta);
            
            // Add green if winner, otherwise default silver/beige
            valDisplayA.querySelectorAll('.val-num').forEach(el => {
                if (isBetterA) el.classList.add('text-green');
                else el.classList.add('text-silver');
            });
            valDisplayB.querySelectorAll('.val-num').forEach(el => {
                if (isBetterB) el.classList.add('text-green');
                else el.classList.add('text-beige');
            });
        }

        // Update Winner Badges
        const badgeA = document.getElementById('better-gov-badge-a');
        const badgeB = document.getElementById('better-gov-badge-b');
        if (badgeA && badgeB) {
            badgeA.style.display = isBetterA ? 'inline-flex' : 'none';
            badgeB.style.display = isBetterB ? 'inline-flex' : 'none';
        }

        // Update Unified Comparison Delta Bar (Comparing Averages)
        const deltaContainer = document.getElementById('comparison-delta-container');
        if (deltaContainer) {
            let deltaText = "";
            let badgeClass = "badge-neutral";
            let sign = "";
            let labelDesc = "Porovnanie priemerných hodnôt (Obdobie B vs Obdobie A):";
            let directionText = activeMeta.higherIsBetter ? "Rast je pozitívny" : "Pokles je pozitívny";

            if (isWage && startYearA !== endYearA && startYearB !== endYearB) {
                const diff = compValB - compValA;
                sign = diff > 0 ? "+" : "";
                deltaText = `${sign}${diff.toFixed(1)} p.b.`;
                const isImprovement = activeMeta.higherIsBetter ? (diff > 0) : (diff < 0);
                if (diff === 0) badgeClass = "badge-neutral";
                else badgeClass = isImprovement ? "badge-positive" : "badge-negative";
                labelDesc = "Porovnanie percentuálneho nárastu miezd (Obdobie B vs Obdobie A):";
                directionText = "Vyšší nárast je lepší";
            } else {
                const isPercentageUnit = activeMeta.unit.includes("%");
                if (isPercentageUnit) {
                    const diff = avgB - avgA;
                    sign = diff > 0 ? "+" : "";
                    deltaText = `${sign}${diff.toFixed(2)} p.b.`;
                    const isImprovement = activeMeta.higherIsBetter ? (diff > 0) : (diff < 0);
                    if (diff === 0) badgeClass = "badge-neutral";
                    else badgeClass = isImprovement ? "badge-positive" : "badge-negative";
                } else {
                    if (avgA !== 0) {
                        const diffPct = ((avgB - avgA) / Math.abs(avgA)) * 100.0;
                        sign = diffPct > 0 ? "+" : "";
                        deltaText = `${sign}${diffPct.toFixed(0)}%`;
                        const isImprovement = activeMeta.higherIsBetter ? (diffPct > 0) : (diffPct < 0);
                        badgeClass = isImprovement ? "badge-positive" : "badge-negative";
                    } else {
                        deltaText = "N/A";
                        badgeClass = "badge-neutral";
                    }
                }
            }

            deltaContainer.innerHTML = `
                <span class="delta-label-desc">${labelDesc}</span>
                <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                    <span class="delta-badge-large ${badgeClass}">${deltaText}</span>
                    <span class="delta-label-desc">(${directionText})</span>
                </div>
            `;
        }

        // Render measures panels
        if (cabA) {
            const keyA = `${cabA.startYear}_${cabA.endYear}`;
            const measA = cabinetMeasures[keyA];
            const panelA = document.getElementById('measures-panel-a');
            if (panelA && measA) {
                panelA.innerHTML = `
                    <div class="measures-box">
                        <div class="measures-pos">
                            <h5><i class="fa-solid fa-circle-plus text-green"></i> Kladné opatrenia</h5>
                            <ul>
                                ${measA.pos.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="measures-neg">
                            <h5><i class="fa-solid fa-circle-minus text-red"></i> Záporné opatrenia</h5>
                            <ul>
                                ${measA.neg.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="global-influence-box" style="margin-top: 6px; border-top: 1px dashed rgba(212, 202, 168, 0.15); padding-top: 8px;">
                            <h5 style="font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; color: var(--color-beige); display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-earth-americas"></i> Globálny vplyv (svet)</h5>
                            <p style="font-size: 10.5px; line-height: 1.35; color: rgba(246, 247, 249, 0.85); margin-bottom: 4px;">
                                <span class="text-green" style="font-weight: 700; margin-right: 4px;">+</span> ${measA.global_pos}
                            </p>
                            <p style="font-size: 10.5px; line-height: 1.35; color: rgba(246, 247, 249, 0.85); margin: 0;">
                                <span class="text-red" style="font-weight: 700; margin-right: 4px;">-</span> ${measA.global_neg}
                            </p>
                        </div>
                    </div>
                `;
            }
        }
        
        if (cabB) {
            const keyB = `${cabB.startYear}_${cabB.endYear}`;
            const measB = cabinetMeasures[keyB];
            const panelB = document.getElementById('measures-panel-b');
            if (panelB && measB) {
                panelB.innerHTML = `
                    <div class="measures-box">
                        <div class="measures-pos">
                            <h5><i class="fa-solid fa-circle-plus text-green"></i> Kladné opatrenia</h5>
                            <ul>
                                ${measB.pos.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="measures-neg">
                            <h5><i class="fa-solid fa-circle-minus text-red"></i> Záporné opatrenia</h5>
                            <ul>
                                ${measB.neg.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="global-influence-box" style="margin-top: 6px; border-top: 1px dashed rgba(212, 202, 168, 0.15); padding-top: 8px;">
                            <h5 style="font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; color: var(--color-beige); display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-earth-americas"></i> Globálny vplyv (svet)</h5>
                            <p style="font-size: 10.5px; line-height: 1.35; color: rgba(246, 247, 249, 0.85); margin-bottom: 4px;">
                                <span class="text-green" style="font-weight: 700; margin-right: 4px;">+</span> ${measB.global_pos}
                            </p>
                            <p style="font-size: 10.5px; line-height: 1.35; color: rgba(246, 247, 249, 0.85); margin: 0;">
                                <span class="text-red" style="font-weight: 700; margin-right: 4px;">-</span> ${measB.global_neg}
                            </p>
                        </div>
                    </div>
                `;
            }
        }
    }

    // Render metrics items in the sidebar
    renderMetricCards();

    // Draw/Redraw the single Header Timeline Chart
    drawHeaderChart();
}

// Render the indicators in the sidebar menu as dropdown lists (select elements)
function renderMetricCards() {
    const container = document.getElementById('metrics-container');
    if (!container) return;
    
    const isHist = activeMode === 'historic';

    if (isHist) {
        let histSelect = document.getElementById('select-historical-metrics');
        if (!histSelect) {
            container.innerHTML = '';
            
            const group = document.createElement('div');
            group.className = 'metrics-dropdown-group';
            group.innerHTML = `
                <label class="metrics-dropdown-label" for="select-historical-metrics">
                    <i class="fa-solid fa-hourglass-half text-beige"></i> Historické výsledky
                </label>
                <select id="select-historical-metrics" class="metrics-select select-a">
                    <option value="" disabled selected>-- Vyberte ukazovateľ --</option>
                </select>
            `;
            container.appendChild(group);
            
            histSelect = document.getElementById('select-historical-metrics');
            
            Object.keys(indicatorsMetaHistorical).forEach(key => {
                const meta = indicatorsMetaHistorical[key];
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = meta.title;
                histSelect.appendChild(opt);
            });
            
            histSelect.onchange = (e) => {
                const val = e.target.value;
                if (val) {
                    activeIndicator = val;
                    activeHistoricalIndicator = val;
                    updateDashboard();
                }
            };
        }
        histSelect.value = activeIndicator;
    } else {
        let slovakSelect = document.getElementById('select-slovak-metrics');
        let intlSelect = document.getElementById('select-intl-rankings');
        
        const standardKeys = [];
        const rankingKeys = [];

        Object.keys(indicatorsMeta).forEach(key => {
            if (key.startsWith('rank_')) {
                rankingKeys.push(key);
            } else {
                standardKeys.push(key);
            }
        });

        if (!slovakSelect || !intlSelect) {
            container.innerHTML = '';
            
            // Slovak metrics dropdown group
            const groupA = document.createElement('div');
            groupA.className = 'metrics-dropdown-group';
            groupA.innerHTML = `
                <label class="metrics-dropdown-label" for="select-slovak-metrics">
                    <i class="fa-solid fa-chart-simple text-silver"></i> Slovenské výsledky
                </label>
                <select id="select-slovak-metrics" class="metrics-select select-a">
                    <option value="" disabled selected>-- Vyberte ukazovateľ --</option>
                </select>
            `;
            container.appendChild(groupA);
            
            // International rankings dropdown group
            const groupB = document.createElement('div');
            groupB.className = 'metrics-dropdown-group';
            groupB.style.marginTop = '20px';
            groupB.innerHTML = `
                <label class="metrics-dropdown-label" for="select-intl-rankings">
                    <i class="fa-solid fa-list-ol text-beige"></i> Medzinárodné rebríčky
                </label>
                <select id="select-intl-rankings" class="metrics-select select-b">
                    <option value="" disabled selected>-- Vyberte rebríček --</option>
                </select>
            `;
            container.appendChild(groupB);
            
            slovakSelect = document.getElementById('select-slovak-metrics');
            intlSelect = document.getElementById('select-intl-rankings');
            
            // Populate Slovak metrics
            standardKeys.forEach(key => {
                const meta = indicatorsMeta[key];
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = meta.title;
                slovakSelect.appendChild(opt);
            });
            
            // Populate International rankings
            rankingKeys.forEach(key => {
                const meta = indicatorsMeta[key];
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = meta.title.replace('Rebríček: ', '');
                intlSelect.appendChild(opt);
            });
            
            // Add event listeners
            slovakSelect.onchange = (e) => {
                const val = e.target.value;
                if (val) {
                    activeIndicator = val;
                    intlSelect.value = "";
                    updateDashboard();
                }
            };
            
            intlSelect.onchange = (e) => {
                const val = e.target.value;
                if (val) {
                    activeIndicator = val;
                    slovakSelect.value = "";
                    updateDashboard();
                }
            };
        }
        
        // Sync the selected values with activeIndicator
        if (activeIndicator.startsWith('rank_')) {
            intlSelect.value = activeIndicator;
            slovakSelect.value = "";
        } else {
            slovakSelect.value = activeIndicator;
            intlSelect.value = "";
        }
    }
}

// Utility to format values nicely
function formatVal(val, meta) {
    if (val === null || val === undefined) return "N/A";
    
    // Add units
    if (meta.unit === "€") {
        return `${val.toLocaleString(undefined, { maximumFractionDigits: 0 })} €`;
    } else if (meta.unit === "$") {
        return `$ ${val.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    } else if (meta.unit === "mil. €") {
        return `${val.toLocaleString(undefined, { maximumFractionDigits: 0 })} mil. €`;
    } else {
        return `${val.toFixed(meta.decimals)} ${meta.unit}`;
    }
}

// Draw/Redraw Chart.js line graph in the header
function drawHeaderChart() {
    const canvasEl = document.getElementById('header-timeline-chart');
    if (!canvasEl) return;

    if (headerChart) {
        headerChart.destroy();
        headerChart = null;
    }

    const isHist = activeMode === 'historic';
    const labels = isHist ? [1920, 1930, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020] : statsData.map(d => d.year);
    const meta = isHist ? indicatorsMetaHistorical[activeIndicator] : indicatorsMeta[activeIndicator];

    const recordA = isHist ? (historicalData.find(d => d.id === selectedHistIdA) || historicalData[0]) : null;
    const recordB = isHist ? (historicalData.find(d => d.id === selectedHistIdB) || historicalData[0]) : null;

    // Shared helper for resolving X coordinate of any year in the timeline chart
    const getXForYear = (chart, year) => {
        const idx = labels.indexOf(year);
        if (idx === -1) return null;
        
        const metaDataset = chart.getDatasetMeta(0);
        if (metaDataset && metaDataset.data && metaDataset.data[idx]) {
            const px = metaDataset.data[idx].x;
            if (px !== undefined && !isNaN(px)) return px;
        }
        
        const xScale = chart.scales.x;
        if (xScale) {
            if (typeof xScale.getPixelForTick === 'function') {
                const px = xScale.getPixelForTick(idx);
                if (px !== undefined && !isNaN(px)) return px;
            }
            const px = xScale.getPixelForValue(String(year));
            if (px !== undefined && !isNaN(px)) return px;
        }
        return null;
    };

    const headerChartCustomDrawPlugin = {
        id: 'headerChartCustomDraw',
        beforeDatasetsDraw(chart) {
            const { ctx, chartArea: { top, bottom, left, right } } = chart;
            ctx.save();

            const x0 = getXForYear(chart, labels[0]);
            const x1 = labels.length > 1 ? getXForYear(chart, labels[1]) : null;
            const step = (x0 !== null && x1 !== null) ? (x1 - x0) : 0;
            const halfStep = step / 2;

            const activeStartYearA = isHist ? recordA.year : startYearA;
            const activeEndYearA = isHist ? recordA.year : endYearA;
            const activeStartYearB = isHist ? recordB.year : startYearB;
            const activeEndYearB = isHist ? recordB.year : endYearB;

            // Draw Vláda A period shading (Silver)
            const xStartRawA = getXForYear(chart, activeStartYearA);
            const xEndRawA = getXForYear(chart, activeEndYearA);
            if (xStartRawA !== null && xEndRawA !== null) {
                const xStartA = Math.max(left, xStartRawA - halfStep);
                const xEndA = Math.min(right, xEndRawA + halfStep);
                if (xEndA > xStartA) {
                    ctx.fillStyle = 'rgba(226, 232, 240, 0.12)';
                    ctx.fillRect(xStartA, top, xEndA - xStartA, bottom - top);
                }
            }

            // Draw Vláda B period shading (Beige)
            const xStartRawB = getXForYear(chart, activeStartYearB);
            const xEndRawB = getXForYear(chart, activeEndYearB);
            if (xStartRawB !== null && xEndRawB !== null) {
                const xStartB = Math.max(left, xStartRawB - halfStep);
                const xEndB = Math.min(right, xEndRawB + halfStep);
                if (xEndB > xStartB) {
                    ctx.fillStyle = 'rgba(229, 211, 179, 0.15)';
                    ctx.fillRect(xStartB, top, xEndB - xStartB, bottom - top);
                }
            }

            if (!isHist) {
                // Draw vertical dashed lines for milestones
                const milestones = [
                    { year: 2004, color: "rgba(229, 211, 179, 0.45)" },
                    { year: 2009, color: "rgba(229, 211, 179, 0.45)" },
                    { year: 2020, color: "rgba(229, 211, 179, 0.45)" }
                ];

                milestones.forEach(m => {
                    const xVal = getXForYear(chart, m.year);
                    if (xVal !== null && xVal >= left && xVal <= right) {
                        ctx.strokeStyle = m.color;
                        ctx.lineWidth = 1.5;
                        ctx.setLineDash([4, 4]);
                        ctx.beginPath();
                        ctx.moveTo(xVal, top);
                        ctx.lineTo(xVal, bottom);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                });
            }

            ctx.restore();
        },
        afterDatasetsDraw(chart) {
            const { ctx, chartArea: { top, bottom, left, right } } = chart;
            ctx.save();

            const allValues = isHist ? 
                [...dataValuesA.filter(v => v !== null), ...dataValuesB.filter(v => v !== null)] : 
                dataValues;
            
            const minVal = allValues.length > 0 ? Math.min(...allValues) : 0;
            const maxVal = allValues.length > 0 ? Math.max(...allValues) : 100;
            const formattedMin = formatVal(minVal, meta);
            const formattedMax = formatVal(maxVal, meta);

            const drawValueCard = (text, x, y, align, isTop) => {
                ctx.font = "bold 9px 'Outfit', sans-serif";
                const textWidth = ctx.measureText(text).width;
                const paddingX = 4;
                const paddingY = 1;
                const w = textWidth + paddingX * 2;
                const h = 10 + paddingY * 2;
                
                const rectX = align === "left" ? x : x - w;
                const rectY = isTop ? y : y - h;
                
                ctx.fillStyle = "rgba(9, 10, 12, 0.75)";
                ctx.beginPath();
                ctx.roundRect(rectX, rectY, w, h, 3);
                ctx.fill();
                
                ctx.strokeStyle = "rgba(212, 202, 168, 0.2)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
                
                ctx.fillStyle = "#c5ba9a";
                ctx.textAlign = align;
                ctx.textBaseline = isTop ? "top" : "bottom";
                const textX = align === "left" ? x + paddingX : x - paddingX;
                const textY = isTop ? y + paddingY : y - paddingY;
                ctx.fillText(text, textX, textY);
            };

            // Draw on left (at x = left)
            drawValueCard(formattedMax, left + 4, top + 2, "left", true);
            drawValueCard(formattedMin, left + 4, bottom - 2, "left", false);

            // Draw on right (at x = right)
            drawValueCard(formattedMax, right - 4, top + 2, "right", true);
            drawValueCard(formattedMin, right - 4, bottom - 2, "right", false);

            if (!isHist) {
                // Draw milestones
                const milestones = [
                    { year: 2004, label: "Vstup SR do EÚ" },
                    { year: 2009, label: "Hospodárska kríza" },
                    { year: 2020, label: "Štart pandémie" }
                ];

                milestones.forEach(m => {
                    const xVal = getXForYear(chart, m.year);
                    if (xVal !== null && xVal >= left && xVal <= right) {
                        ctx.font = "bold 9px 'Outfit', sans-serif";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "top";

                        const textWidth = ctx.measureText(m.label).width;
                        const paddingX = 4;
                        const paddingY = 1;
                        const w = textWidth + paddingX * 2;
                        const h = 10 + paddingY * 2;
                        const rectX = xVal - w / 2;
                        const rectY = top + 2;

                        ctx.fillStyle = "rgba(9, 10, 12, 0.85)";
                        ctx.beginPath();
                        ctx.roundRect(rectX, rectY, w, h, 3);
                        ctx.fill();

                        ctx.strokeStyle = "rgba(212, 202, 168, 0.35)";
                        ctx.lineWidth = 0.5;
                        ctx.stroke();

                        ctx.fillStyle = "#c5ba9a";
                        ctx.fillText(m.label, xVal, rectY + paddingY);
                    }
                });
            }

            ctx.restore();
        }
    };

    const ctx = canvasEl.getContext('2d');
    
    // Line drawings setup
    let datasets = [];
    let dataValuesA = [];
    let dataValuesB = [];
    let dataValues = [];

    if (isHist) {
        const countryA = recordA.country;
        const countryB = recordB.country;
        
        dataValuesA = labels.map(yr => {
            const row = historicalData.find(d => (d.country === 'Československo' || d.country === 'Slovensko') && d.year === yr);
            return row ? row[activeIndicator] : null;
        });
        dataValuesB = labels.map(yr => {
            const row = historicalData.find(d => d.country === countryB && d.year === yr);
            return row ? row[activeIndicator] : null;
        });

        datasets = [
            {
                label: countryA,
                data: dataValuesA,
                borderColor: '#e2e8f0', // Silver for A
                borderWidth: 2,
                fill: false,
                tension: 0.35,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointBackgroundColor: '#e2e8f0',
                pointBorderColor: '#090a0c',
                pointBorderWidth: 1
            },
            {
                label: countryB,
                data: dataValuesB,
                borderColor: '#e5d3b3', // Beige for B
                borderWidth: 2,
                fill: false,
                tension: 0.35,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointBackgroundColor: '#e5d3b3',
                pointBorderColor: '#090a0c',
                pointBorderWidth: 1
            }
        ];
    } else {
        dataValues = statsData.map(d => d[activeIndicator]);
        
        // Create soft gradient fill (vertical)
        const fillGradient = ctx.createLinearGradient(0, 0, 0, 100);
        fillGradient.addColorStop(0, 'rgba(212, 202, 168, 0.18)');
        fillGradient.addColorStop(1, 'rgba(9, 10, 12, 0)');
        
        // Create beautiful horizontal gradient line
        const lineGradient = ctx.createLinearGradient(0, 0, 800, 0);
        lineGradient.addColorStop(0, '#e2e8f0'); // Silver
        lineGradient.addColorStop(1, '#e5d3b3'); // Beige

        datasets = [{
            label: "Slovensko",
            data: dataValues,
            borderColor: lineGradient,
            borderWidth: 2,
            fill: true,
            backgroundColor: fillGradient,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBackgroundColor: '#e2e8f0',
            pointBorderColor: '#090a0c',
            pointBorderWidth: 1
        }];
    }
    
    headerChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        plugins: [headerChartCustomDrawPlugin],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#16171b',
                    titleColor: '#f6f7f9',
                    bodyColor: '#c5ba9a',
                    borderColor: 'rgba(212, 202, 168, 0.15)',
                    borderWidth: 1,
                    padding: 6,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return `Rok ${context[0].label}`;
                        },
                        label: function(context) {
                            const val = context.parsed.y;
                            let datasetLabel = context.dataset.label || "";
                            if (isHist && context.datasetIndex === 0) {
                                const yr = labels[context.dataIndex];
                                datasetLabel = (yr >= 2000) ? "Slovensko" : "Československo";
                            }
                            return `${datasetLabel} - ${meta.title}: ${formatVal(val, meta)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#c5ba9a',
                        font: {
                            family: 'Inter',
                            size: 8
                        },
                        autoSkip: true,
                        maxTicksLimit: 10,
                        maxRotation: 0
                    }
                },
                y: {
                    display: false,
                    grace: '10%'
                }
            }
        }
    });
}

// Helper to normalize prime minister names for image paths
function getPMImageSrc(name) {
    if (!name) return "";
    const firstName = name.split('/')[0].trim();
    const normalized = firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "_");
    return `assets/pm/${normalized}.jpg`;
}

// Static dataset of Slovakia election terms/cabinets
const cabinetGroupings = [
    {
        startYear: 1993,
        endYear: 1994,
        prime_minister: "Vladimír Mečiar / Jozef Moravčík",
        coalition: "HZDS, SNS / DÚ, KDH, SDĽ, NDS",
        label: "1993 - 1994: V. Mečiar / J. Moravčík"
    },
    {
        startYear: 1995,
        endYear: 1997,
        prime_minister: "Vladimír Mečiar",
        coalition: "HZDS, SNS, ZRS",
        label: "1995 - 1997: Vladimír Mečiar III."
    },
    {
        startYear: 1998,
        endYear: 2001,
        prime_minister: "Mikuláš Dzurinda",
        coalition: "SDK, SDĽ, SOP, SMK",
        label: "1998 - 2001: Mikuláš Dzurinda I."
    },
    {
        startYear: 2002,
        endYear: 2005,
        prime_minister: "Mikuláš Dzurinda",
        coalition: "SDKÚ, KDH, ANO, SMK",
        label: "2002 - 2005: Mikuláš Dzurinda II."
    },
    {
        startYear: 2006,
        endYear: 2009,
        prime_minister: "Robert Fico",
        coalition: "Smer-SD, SNS, ĽS-HZDS",
        label: "2006 - 2009: Robert Fico I."
    },
    {
        startYear: 2010,
        endYear: 2011,
        prime_minister: "Iveta Radičová",
        coalition: "SDKÚ-DS, SaS, KDH, Most-Híd",
        label: "2010 - 2011: Iveta Radičová"
    },
    {
        startYear: 2012,
        endYear: 2015,
        prime_minister: "Robert Fico",
        coalition: "Smer-SD",
        label: "2012 - 2015: Robert Fico II."
    },
    {
        startYear: 2016,
        endYear: 2019,
        prime_minister: "Robert Fico / Peter Pellegrini",
        coalition: "Smer-SD, SNS, Most-Híd",
        label: "2016 - 2019: R. Fico III. / P. Pellegrini"
    },
    {
        startYear: 2020,
        endYear: 2023,
        prime_minister: "Igor Matovič / Eduard Heger / Ľudovít Ódor",
        coalition: "OĽaNO, Sme rodina, SaS, Za ľudí / Úradnícka vláda",
        label: "2020 - 2023: I. Matovič / E. Heger / Ľ. Ódor"
    },
    {
        startYear: 2024,
        endYear: 2025,
        prime_minister: "Robert Fico",
        coalition: "Smer-SD, Hlas-SD, SNS",
        label: "2024 - 2025: Robert Fico IV."
    }
];

// Static database of positive and negative cabinet measures
const cabinetMeasures = {
    "1993_1994": {
        pos: [
            "Založenie základných inštitúcií samostatného štátu (NBS, ministerstvá).",
            "Hladké rozdelenie meny a stabilizácia slovenskej koruny.",
            "Vstup Slovenskej republiky do OSN a Rady Európy."
        ],
        neg: [
            "Vysoká počiatočná inflácia (vyše 23 %) po rozpade federácie.",
            "Čerpanie devízových rezerv na obranu meny pred špekuláciami.",
            "Politická nestabilita a pád druhej Mečiarovej vlády v roku 1994."
        ],
        global_pos: "Záujem Západu o investovanie v strednej Európe po páde železnej opony.",
        global_neg: "Rozpad tradičných trhov RVHP a hospodárska recesia v západnej Európe."
    },
    "1995_1997": {
        pos: [
            "Rýchly hospodársky rast (okolo 6 % HDP) ťahaný priemyslom.",
            "Pokles nezamestnanosti z 13.7 % na 11.3 % (1996).",
            "Rozvoj domáceho podnikateľského prostredia."
        ],
        neg: [
            "Medzinárodná izolácia SR a vylúčenie z prvej vlny rozširovania NATO.",
            "Netransparentná privatizácia národného majetku (mečiarizmus).",
            "Rýchly rast zadlženia štátu a nestabilita bankového sektora."
        ],
        global_pos: "Prudký rozmach globalizácie a internetových technológií na Západe.",
        global_neg: "Ázijská finančná kríza (1997) obmedzujúca prílev rizikového kapitálu."
    },
    "1998_2001": {
        pos: [
            "Začlenenie Slovenskej republiky do OECD (2000).",
            "Ozdravenie a privatizácia štátnych bánk (SLSP, VÚB, IRB).",
            "Decentralizácia správy a vznik samosprávnych krajov (VÚC)."
        ],
        neg: [
            "Vysoká nezamestnanosť dosahujúca rekordných 19.2 % (2001).",
            "Drastické úsporné balíčky a prechodný prepad reálnych miezd.",
            "Predaj strategických sieťových odvetví zahraničným investorom."
        ],
        global_pos: "Boom zahraničného kapitálu v Európe pred zavedením hotovostného Eura.",
        global_neg: "Splasknutie technologickej Dot-com bubliny a teroristické útoky 11. septembra 2001."
    },
    "2002_2005": {
        pos: [
            "Vstup Slovenskej republiky do Európskej únie a NATO (2004).",
            "Daňová reforma so zavedením rovnej dane vo výške 19 %.",
            "Príchod veľkých automobiliek (Kia, PSA Peugeot Citroën)."
        ],
        neg: [
            "Zavedenie poplatkov v zdravotníctve (tzv. dvadsaťkorunáčky).",
            "Prehlbovanie sociálno-ekonomických rozdielov medzi krajmi.",
            "Prepuknutie korupčnej kauzy Gorila na konci obdobia."
        ],
        global_pos: "Vlna rozširovania EÚ spojená s masívnym prílevom priamych zahraničných investícií.",
        global_neg: "Vojenský konflikt v Iraku (2003) sprevádzaný nárastom cien ropy."
    },
    "2006_2009": {
        pos: [
            "Úspešný vstup SR do Schengenu (2007) a prijatie meny Euro (2009).",
            "Ekonomický vrchol Tatranského tigra s rastom HDP 10.8 % (2007).",
            "Sociálne opatrenia: vianočné príspevky, zrušenie poplatkov u lekára."
        ],
        neg: [
            "Prvé dopady celosvetovej finančnej krízy v roku 2009 (HDP -5.5 %).",
            "Netransparentné tendre (nástenkový tender, mýtny tender).",
            "Rýchly nárast štátneho dlhu z 27.8 % na 35.6 % HDP."
        ],
        global_pos: "Vrchol globálnej hospodárskej konjunktúry a lacné úvery v celej Eurózone.",
        global_neg: "Prepuknutie globálnej finančnej krízy v USA a zamrznutie bankových trhov (2008)."
    },
    "2010_2011": {
        pos: [
            "Povinné zverejňovanie zmlúv v Centrálnom registri zmlúv (CRZ).",
            "Zavedenie transparentnosti do súdnictva a prokuratúry.",
            "Úspešná fiškálna konsolidácia po krízových rokoch."
        ],
        neg: [
            "Predčasný pád vlády pre spor o euroval (pomoc Grécku).",
            "Zvýšenie sadzby DPH z 19 % na 20 % ako úsporné opatrenie.",
            "Opätovný nárast nezamestnanosti k hranici 14.4 %."
        ],
        global_pos: "Rýchle oživenie nemeckého priemyslu, ktoré zvýšilo dopyt po slovenskom exporte.",
        global_neg: "Prepuknutie dlhovej krízy v eurozóne (Grécko) a nestabilita spoločnej meny."
    },
    "2012_2015": {
        pos: [
            "Zavedenie bezplatného cestovania vlakom pre študentov a dôchodcov.",
            "Pokles nezamestnanosti zo 14 % na 11.5 %.",
            "Získanie investície automobilky Jaguar Land Rover v Nitre."
        ],
        neg: [
            "Zrušenie rovnej dane a zavedenie progresívneho zdanenia.",
            "Nárast verejného dlhu k rekordnej hranici 54.7 % HDP.",
            "Štrajky učielených lekárov, učiteľov a sestier."
        ],
        global_pos: "Kvantitatívne uvoľňovanie ECB, ktoré stlačilo úroky na štátne dlhopisy k minimám.",
        global_neg: "Ruská anexia Krymu (2014) a následné vzájomné obchodné sankcie medzi EÚ a Ruskom."
    },
    "2016_2019": {
        pos: [
            "Dosiahnutie historicky najnižšej nezamestnanosti 5.8 % (2019).",
            "Zavedenie obedov zadarmo pre deti v školách a škôlkach.",
            "Prvé úspešné predsedníctvo SR v Rade Európskej únie (2016)."
        ],
        neg: [
            "Vražda Jána Kuciaka a M. Kušnírovej (2018) a následná politická kríza.",
            "Odhalenia prepojení politických špičiek na organizovaný zločin.",
            "Schválenie ústavného stropu na dôchodkový vek (zhoršenie udržateľnosti)."
        ],
        global_pos: "Dlhodobo nízke úrokové sadzby a stabilný hospodársky rast v kľúčových krajinách EÚ.",
        global_neg: "Globálne obchodné vojny (USA vs Čína) a neistota spojená s Brexitom."
    },
    "2020_2023": {
        pos: [
            "Schválenie rodinného balíčka s vysokým daňovým bonusom na deti.",
            "Uvoľnenie rúk orgánom činným v trestnom konaní (boj s korupciou).",
            "Schválenie Plánu obnovy a odolnosti v Bruseli."
        ],
        neg: [
            "Chaotické riadenie pandémie COVID-19 a pád vlád Matoviča aj Hegera.",
            "Vysoká inflácia (12.8 % v 2022) a dôsledky energetickej krízy.",
            "Rýchly nárast štátneho dlhu na hranicu 61.0 % HDP."
        ],
        global_pos: "Schválenie masívneho európskeho fondu obnovy a spoločný nákup vakcín v EÚ.",
        global_neg: "Pandémia COVID-19, vojna na Ukrajine (2022) a bezprecedentná energetická kríza."
    },
    "2024_2025": {
        pos: [
            "Vyplatenie plnohodnotného 13. dôchodku pre seniorov.",
            "Spustenie štátnej pomoci s drahšími hypotékami.",
            "Pokles inflácie k úrovni 2.5 % a stabilizácia miezd."
        ],
        neg: [
            "Drastická konsolidácia, zvýšenie základnej DPH na 23 %.",
            "Zavedenie dane z finančných transakcií pre firmy a živnostníkov.",
            "Zrušenie Úradu špeciálnej prokuratúry a politická polarizácia."
        ],
        global_pos: "Začiatok cyklu znižovania úrokových sadzieb ECB a stabilizácia trhov s energiami.",
        global_neg: "Pretrvávajúca geopolitická nestabilita na hraniciach EÚ a hrozba nových ciel zo strany USA."
    }
};

// ==========================================================================
// INTERACTIVE MODAL, COALITION BUILDER & POLITICIAN VOTING
// ==========================================================================

const partiesData = [
    { id: 'ps', name: 'PS', fullname: 'Progresívne Slovensko', support: 18.3, seats: 33, color: '#0096db', rgb: '0, 150, 219' },
    { id: 'smer', name: 'Smer-SD', fullname: 'SMER - sociálna demokracia', support: 18.1, seats: 32, color: '#d9251c', rgb: '217, 37, 28' },
    { id: 'republika', name: 'Republika', fullname: 'Hnutie Republika', support: 9.7, seats: 17, color: '#cc9900', rgb: '204, 153, 0' },
    { id: 'slovensko', name: 'Slovensko', fullname: 'Hnutie SLOVENSKO (bývalé OĽaNO)', support: 9.6, seats: 17, color: '#a80082', rgb: '168, 0, 130' },
    { id: 'hlas', name: 'Hlas-SD', fullname: 'HLAS - sociálna demokracia', support: 8.4, seats: 15, color: '#1f3a60', rgb: '31, 58, 96' },
    { id: 'kdh', name: 'KDH', fullname: 'Kresťanskodemokratické hnutie', support: 7.5, seats: 13, color: '#005aa3', rgb: '0, 90, 163' },
    { id: 'sas', name: 'SaS', fullname: 'Sloboda a Solidarita', support: 7.2, seats: 13, color: '#9fc02b', rgb: '159, 192, 43' },
    { id: 'demokrati', name: 'Demokrati', fullname: 'Demokrati', support: 5.2, seats: 10, color: '#009a93', rgb: '0, 154, 147' }
];

const politiciansData = [
    { id: 'caputova', name: 'Zuzana Čaputová', title: 'Bývalá prezidentka SR', desc: 'Prezidentka SR v rokoch 2019-2024. Zastupovala konsenzuálnu, kultivovanú a prozápadnú politiku.', baseVotes: 1420 },
    { id: 'radicova', name: 'Iveta Radičová', title: 'Bývalá premiérka SR', desc: 'Prvá a jediná predsedníčka vlády SR v rokoch 2010-2011, sociologička a profesorka. Známa bojom za transparentnosť.', baseVotes: 840 },
    { id: 'dzurinda', name: 'Mikuláš Dzurinda', title: 'Bývalý premiér SR', desc: 'Predseda vlády v rokoch 1998-2006. Priviedol Slovensko do EÚ a NATO, zaviedol kľúčové reformy.', baseVotes: 650 },
    { id: 'miklos', name: 'Ivan Mikloš', title: 'Bývalý podpredseda vlády a minister financií', desc: 'Podpredseda vlády a minister financií, architekt úspešných ekonomických reforiem a rovnej dane.', baseVotes: 580 },
    { id: 'meciar', name: 'Vladimír Mečiar', title: 'Bývalý premiér SR', desc: 'Trojnásobný premiér a zakladateľ samostatnej SR. Dominantná a rozporuplná postava slovenskej politiky 90. rokov.', baseVotes: 450 },
    { id: 'slota', name: 'Ján Slota', title: 'Bývalý predseda SNS', desc: 'Dlhoročný kontroverzný predseda SNS a primátor Žiliny, známy svojimi ostrými a priamymi výrokmi.', baseVotes: 310 },
    { id: 'zitnanska', name: 'Lucia Žitňanská', title: 'Bývalá ministerka spravodlivosti', desc: 'Rešpektovaná ministerka spravodlivosti, presadzujúca transparentnosť súdnictva a protikorupčné opatrenia.', baseVotes: 480 },
    { id: 'prochazka', name: 'Radoslav Procházka', title: 'Ústavný právnik, zakladateľ strany Sieť', desc: 'Prezidentský kandidát z roku 2014, neskôr zakladateľ strany Sieť a ústavný právnik.', baseVotes: 290 },
    { id: 'lipsic', name: 'Daniel Lipšic', title: 'Bývalý špeciálny prokurátor, minister', desc: 'Bývalý minister spravodlivosti a vnútra, neskôr špeciálny prokurátor SR. Známy tvrdým bojom proti mafii.', baseVotes: 720 },
    { id: 'kotleba', name: 'Marian Kotleba', title: 'Bývalý predseda ĽSNS', desc: 'Bývalý banskobystrický župan a poslanec NR SR. Výrazný predstaviteľ slovenskej krajnej pravice.', baseVotes: 380 },
    { id: 'harabin', name: 'Štefan Harabin', title: 'Bývalý predseda Najvyššieho súdu', desc: 'Bývalý minister spravodlivosti a predseda Najvyššieho súdu. Polarizujúca postava justície a prezidentský kandidát.', baseVotes: 520 },
    { id: 'kubis', name: 'Ján Kubiš', title: 'Uznávaný medzinárodný diplomat', desc: 'Skúsený diplomat pôsobiaci ako minister zahraničných vecí SR a vyslanec OSN v rôznych krízových oblastiach.', baseVotes: 410 }
];

let selectedParties = [];

// LocalStorage key names
const LS_VOTES_KEY = 'faktograf_politician_votes';
const LS_VOTED_KEY = 'faktograf_politician_voted';

// Initial load of votes
function getPoliticianVotes() {
    let savedVotes = localStorage.getItem(LS_VOTES_KEY);
    if (!savedVotes) {
        // Initialize with base votes
        const initial = {};
        politiciansData.forEach(p => {
            initial[p.id] = p.baseVotes;
        });
        localStorage.setItem(LS_VOTES_KEY, JSON.stringify(initial));
        return initial;
    }
    return JSON.parse(savedVotes);
}

function getVotedState() {
    let savedVoted = localStorage.getItem(LS_VOTED_KEY);
    return savedVoted ? JSON.parse(savedVoted) : {};
}

// Modal open/close actions
function openInteractivePanel(tabName) {
    const modal = document.getElementById('interactive-modal');
    if (modal) {
        modal.style.display = 'flex';
        // Initialize contents
        renderPartiesGrid();
        renderPoliticiansList();
        updateCoalitionStats();
        switchModalTab(tabName);
    }
}

function closeInteractiveModal() {
    const modal = document.getElementById('interactive-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function switchModalTab(tabName) {
    // Toggle tab buttons
    document.getElementById('tab-coalition').classList.toggle('active', tabName === 'coalition');
    document.getElementById('tab-politician').classList.toggle('active', tabName === 'politician');
    
    // Toggle content panes
    document.getElementById('content-coalition').classList.toggle('active', tabName === 'coalition');
    document.getElementById('content-politician').classList.toggle('active', tabName === 'politician');
}

// Coalition Builder: Render Parties
function renderPartiesGrid() {
    const grid = document.getElementById('parties-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    partiesData.forEach(party => {
        const isSelected = selectedParties.includes(party.id);
        const card = document.createElement('div');
        card.className = `party-card ${isSelected ? 'selected' : ''}`;
        card.style.setProperty('--party-color', party.color);
        card.style.setProperty('--party-color-rgb', party.rgb);
        card.onclick = () => toggleCoalitionParty(party.id);
        
        card.innerHTML = `
            <div class="party-logo-placeholder">${party.name}</div>
            <div class="party-name">${party.fullname}</div>
            <div class="party-details">
                <span>Podpora: <strong>${party.support}%</strong></span>
                <span>Mandáty: <strong>${party.seats}</strong></span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function toggleCoalitionParty(partyId) {
    const idx = selectedParties.indexOf(partyId);
    if (idx === -1) {
        selectedParties.push(partyId);
    } else {
        selectedParties.splice(idx, 1);
    }
    renderPartiesGrid();
    updateCoalitionStats();
}

function resetCoalition() {
    selectedParties = [];
    renderPartiesGrid();
    updateCoalitionStats();
}

function updateCoalitionStats() {
    let totalSeats = 0;
    let totalSupport = 0;
    
    selectedParties.forEach(id => {
        const party = partiesData.find(p => p.id === id);
        if (party) {
            totalSeats += party.seats;
            totalSupport += party.support;
        }
    });
    
    // Update seats label and bar
    const seatsCountEl = document.getElementById('coalition-seats-count');
    const seatsBarEl = document.getElementById('coalition-seats-bar');
    if (seatsCountEl) seatsCountEl.innerText = `${totalSeats} / 150`;
    if (seatsBarEl) {
        const pctWidth = (totalSeats / 150) * 100;
        seatsBarEl.style.width = `${pctWidth}%`;
    }
    
    // Update support percentage
    const supportEl = document.getElementById('coalition-percentage-count');
    if (supportEl) supportEl.innerText = `${totalSupport.toFixed(1)}%`;
    
    // Update majority status
    const statusEl = document.getElementById('coalition-majority-status');
    if (statusEl) {
        statusEl.className = 'majority-status';
        if (totalSeats >= 90) {
            statusEl.innerText = 'Ústavná väčšina (Dostatočná na zmenu ústavy!)';
            statusEl.classList.add('status-gold');
        } else if (totalSeats >= 76) {
            statusEl.innerText = 'Vládna väčšina (Dostatočná na schválenie zákonov)';
            statusEl.classList.add('status-green');
        } else {
            statusEl.innerText = 'Bez väčšiny (Potrebné aspoň 76 mandátov)';
            statusEl.classList.add('status-red');
        }
    }
    
    // Render selected pills
    const listEl = document.getElementById('selected-parties-list');
    if (listEl) {
        listEl.innerHTML = '';
        if (selectedParties.length === 0) {
            listEl.innerHTML = '<span class="no-parties-text">Žiadne vybrané strany. Kliknutím navolíte strany do koalície.</span>';
        } else {
            selectedParties.forEach(id => {
                const party = partiesData.find(p => p.id === id);
                if (party) {
                    const pill = document.createElement('span');
                    pill.className = 'selected-party-pill';
                    pill.style.setProperty('--party-color', party.color);
                    pill.style.setProperty('--party-color-rgb', party.rgb);
                    pill.innerHTML = `${party.name} <i class="fa-solid fa-circle-xmark"></i>`;
                    pill.onclick = (e) => {
                        e.stopPropagation();
                        toggleCoalitionParty(party.id);
                    };
                    listEl.appendChild(pill);
                }
            });
        }
    }
}

function loadCoalitionScenario(scenarioName) {
    if (scenarioName === 'present') {
        selectedParties = ['smer', 'hlas'];
    } else if (scenarioName === 'democratic') {
        selectedParties = ['ps', 'hlas', 'kdh', 'sas', 'demokrati'];
    } else if (scenarioName === 'national') {
        selectedParties = ['smer', 'hlas', 'republika'];
    }
    renderPartiesGrid();
    updateCoalitionStats();
}

// Politician popularity voting: Render & Action
function renderPoliticiansList() {
    const container = document.getElementById('politicians-list');
    if (!container) return;
    container.innerHTML = '';
    
    const votes = getPoliticianVotes();
    const votedState = getVotedState();
    
    // Sum total votes for percentage calculation
    const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);
    
    politiciansData.forEach(p => {
        const pVotes = votes[p.id] || 0;
        const share = totalVotes > 0 ? (pVotes / totalVotes) * 100 : 0;
        const hasVoted = !!votedState[p.id];
        
        const card = document.createElement('div');
        card.className = 'politician-card';
        card.innerHTML = `
            <div class="politician-avatar-placeholder">
                <i class="fa-solid fa-user-tie"></i>
            </div>
            <div class="politician-info">
                <div class="politician-name">${p.name}</div>
                <div class="politician-desc" style="color: var(--color-beige); font-weight: 600; font-size: 11px; margin-bottom: 4px;">${p.title}</div>
                <div class="politician-desc">${p.desc}</div>
            </div>
            <div class="politician-vote-section">
                <button class="btn-vote ${hasVoted ? 'voted' : ''}" onclick="voteForPolitician('${p.id}')">
                    ${hasVoted ? '<i class="fa-solid fa-circle-check"></i> Hlasované' : '<i class="fa-solid fa-thumbs-up"></i> Hlasovať za návrat'}
                </button>
                <div class="vote-stats">
                    <span>${pVotes.toLocaleString()} hlasov</span>
                    <span>${share.toFixed(1)}%</span>
                </div>
                <div class="vote-progress-bar-bg">
                    <div class="vote-progress-bar" style="width: ${share}%;"></div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function voteForPolitician(id) {
    const votes = getPoliticianVotes();
    const votedState = getVotedState();
    
    if (votedState[id]) return; // prevent double voting
    
    votes[id] = (votes[id] || 0) + 1;
    votedState[id] = true;
    
    localStorage.setItem(LS_VOTES_KEY, JSON.stringify(votes));
    localStorage.setItem(LS_VOTED_KEY, JSON.stringify(votedState));
    
    renderPoliticiansList();
}
