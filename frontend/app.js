// State Management
let activeMode = 'present'; // 'present' or 'historic'
let statsData = []; // Present Slovakia data
let historicalData = []; // Historical decadal data
let activeIndicator = "avg_wage"; // Default indicator plotted on the chart
let activeHistoricalIndicator = "gdp_capita"; // Default historical indicator

let activeSortOrder = 'chronological'; // 'chronological' or 'value'
let expandedCabinets = new Set(); // Set of expanded cabinet IDs/startYears

// Keep these defined as fallback to avoid reference errors in drawHeaderChart
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
let rankingsExpanded = false;
let standardExpanded = false;

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
    household_debt: {
        title: "Priemerný úver v bankách",
        icon: "fa-credit-card",
        unit: "€",
        decimals: 0,
        higherIsBetter: false,
        desc: "Priemerná výška bankového úveru na obyvateľa SR (nižší dlh predstavuje menšie celkové finančné zaťaženie)."
    },
    household_savings: {
        title: "Výška úspor domácností",
        icon: "fa-piggy-bank",
        unit: "€",
        decimals: 0,
        higherIsBetter: true,
        desc: "Priemerná výška úspor (vkladov) domácností v bankách na obyvateľa SR."
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
        
        updateDashboard();
    } catch (error) {
        console.error("Chyba pri načítaní ročenky:", error);
        container.innerHTML = `
            <div class="grid-loading" style="color: var(--color-red);">
                <i class="fa-solid fa-triangle-exclamation"></i> Nepodarilo sa načítať priame dáta. Uistite sa, že backend beží.
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
    
    // Toggle section visibility
    const presentSection = document.getElementById('present-list-section');
    const historicSection = document.getElementById('historical-compare-section');
    const emptyModule = document.getElementById('empty-module');
    if (presentSection && historicSection) {
        presentSection.style.display = mode === 'present' ? 'flex' : 'none';
        historicSection.style.display = mode === 'historic' ? 'flex' : 'none';
    }
    if (emptyModule) {
        emptyModule.style.display = mode === 'present' ? 'grid' : 'none';
    }
    
    // Reset expanded states on toggle
    expandedCabinets.clear();

    if (mode === 'historic') {
        activeIndicator = activeHistoricalIndicator;
        
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
        
        // Populate selectors
        initHistoricalDropdowns();
        
        // Set default comparison items if needed
        if (selectedHistIdA === null || selectedHistIdB === null) {
            const defaultA = historicalData.find(d => d.country === 'Československo' && d.year === 1950);
            const defaultB = historicalData.find(d => d.country === 'Rakúsko' && d.year === 1950);
            selectedHistIdA = defaultA ? defaultA.id : historicalData[0].id;
            selectedHistIdB = defaultB ? defaultB.id : (historicalData[1] ? historicalData[1].id : historicalData[0].id);
        }
    } else {
        activeIndicator = "avg_wage"; // Default present indicator
    }
    
    updateDashboard();
}

// Populate dropdown selectors in Historical Mode
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

// Government A Select Callback
function onGovASelect(val) {
    if (activeMode === 'historic') {
        selectedHistIdA = parseInt(val);
        updateDashboard();
    }
}

// Government B Select Callback
function onGovBSelect(val) {
    if (activeMode === 'historic') {
        selectedHistIdB = parseInt(val);
        updateDashboard();
    }
}

// Toggle measures/events panel in Historical Mode side-by-side card slots
function toggleCabinetMeasures(slot) {
    if (slot === 'A') {
        measuresVisibleA = !measuresVisibleA;
        const panelA = document.getElementById('measures-panel-a');
        if (panelA) {
            panelA.classList.toggle('open', measuresVisibleA);
        }
        const btnA = document.getElementById('btn-measures-a');
        if (btnA) {
            btnA.innerHTML = measuresVisibleA ? 
                `Skryť udalosti <i class="fa-solid fa-chevron-down"></i>` : 
                `Kľúčové udalosti (Kladné / Záporné) <i class="fa-solid fa-chevron-up"></i>`;
        }
    } else if (slot === 'B') {
        measuresVisibleB = !measuresVisibleB;
        const panelB = document.getElementById('measures-panel-b');
        if (panelB) {
            panelB.classList.toggle('open', measuresVisibleB);
        }
        const btnB = document.getElementById('btn-measures-b');
        if (btnB) {
            btnB.innerHTML = measuresVisibleB ? 
                `Skryť udalosti <i class="fa-solid fa-chevron-down"></i>` : 
                `Kľúčové udalosti (Kladné / Záporné) <i class="fa-solid fa-chevron-up"></i>`;
        }
    }
}

// Sorting toggle callback called from index.html buttons
function changeSortOrder(order) {
    if (activeSortOrder === order) return;
    activeSortOrder = order;
    
    const btnChron = document.getElementById('btn-sort-chronological');
    const btnVal = document.getElementById('btn-sort-value');
    const btnOver = document.getElementById('btn-sort-overall');
    if (btnChron && btnVal) {
        btnChron.classList.toggle('active', order === 'chronological');
        btnVal.classList.toggle('active', order === 'value');
        if (btnOver) btnOver.classList.toggle('active', order === 'overall');
    }
    
    renderCabinetsList();
}

const slovakiaNominalGDP = {
    1992: 11000,
    1993: 12300,
    1994: 14600,
    1995: 17500,
    1996: 19800,
    1997: 22600,
    1998: 24400,
    1999: 26400,
    2000: 29100,
    2001: 31800,
    2002: 35400,
    2003: 38600,
    2004: 44400,
    2005: 49300,
    2006: 55500,
    2007: 62500,
    2008: 68400,
    2009: 64100,
    2010: 68100,
    2011: 71200,
    2012: 73600,
    2013: 74500,
    2014: 76400,
    2015: 79800,
    2016: 81300,
    2017: 84800,
    2018: 89700,
    2019: 94400,
    2020: 93400,
    2021: 100300,
    2022: 109600,
    2023: 122200,
    2024: 130000,
    2025: 137000
};

function getIndicatorMoneyDeltaVal(startYear, endYear, indicator, valStart, valEnd) {
    if (valStart === null || valEnd === null) return null;
    const gdpStart = slovakiaNominalGDP[startYear] || 100000;
    const gdpEnd = slovakiaNominalGDP[endYear] || 100000;
    
    switch (indicator) {
        case 'public_debt':
        case 'budget_balance': {
            const startMoney = (valStart / 100) * gdpStart;
            const endMoney = (valEnd / 100) * gdpEnd;
            return (endMoney - startMoney) * 1000000;
        }
        case 'gdp_growth':
        case 'inflation': {
            const startVol = (valStart / 100) * gdpStart;
            const endVol = (valEnd / 100) * gdpEnd;
            return (endVol - startVol) * 1000000;
        }
        case 'unemployment': {
            const unemployedStart = (valStart / 100) * 2700000;
            const unemployedEnd = (valEnd / 100) * 2700000;
            const costStart = unemployedStart * 15000;
            const costEnd = unemployedEnd * 15000;
            return costEnd - costStart;
        }
        case 'real_wage_growth': {
            const wageStart = statsData.find(d => d.year === startYear)?.avg_wage || 0;
            const wageEnd = statsData.find(d => d.year === endYear)?.avg_wage || 0;
            return wageEnd - wageStart;
        }
        default:
            return null;
    }
}

function formatMoneyDelta(val, indicator) {
    if (val === null || val === undefined) return "";
    const isNegative = val < 0;
    const absVal = Math.abs(val);
    
    let formatted = "";
    if (indicator === 'real_wage_growth') {
        formatted = `${absVal.toFixed(0)} €/mesiac`;
    } else {
        if (absVal >= 1000000000) {
            formatted = `${(absVal / 1000000000).toFixed(2)} mld. €`;
        } else if (absVal >= 1000000) {
            formatted = `${(absVal / 1000000).toFixed(1)} mil. €`;
        } else {
            formatted = `${absVal.toLocaleString(undefined, { maximumFractionDigits: 0 })} €`;
        }
    }
    
    return `${isNegative ? '-' : '+'}${formatted}`;
}

// Process data to retrieve a single value representing the cabinet/year and indicator (delta or percentage change over the term)
function getCabinetValue(cab, indicator) {
    if (activeMode === 'historic') {
        return cab[indicator] !== undefined ? cab[indicator] : null;
    }
    
    // Present mode: Change over the term
    const startYr = cab.startYear;
    const endYr = cab.endYear;
    
    const dataStart = statsData.find(d => d.year === startYr);
    const dataEnd = statsData.find(d => d.year === endYr);
    
    let valStart = dataStart ? dataStart[indicator] : null;
    let valEnd = dataEnd ? dataEnd[indicator] : null;
    
    if (startYr === endYr) {
        const dataPrev = statsData.find(d => d.year === (startYr - 1));
        valStart = dataPrev ? dataPrev[indicator] : null;
    }
    
    if (valStart === null || valEnd === null) return null;
    
    // Check if the indicator is natively a percentage or a ranking
    const meta = indicatorsMeta[indicator];
    const isNativePct = meta.unit === '%' || meta.unit === '% HDP';
    const isRank = indicator.startsWith('rank_');
    
    if (isNativePct || isRank) {
        // For native percentage indicators and rankings, we return the difference (points or places change)
        return valEnd - valStart;
    } else {
        // For absolute indicators (EUR, USD, count, etc.), we return the relative percentage growth
        if (valStart === 0) return 0;
        return ((valEnd - valStart) / valStart) * 100;
    }
}

function getOverallCabinetRankings() {
    const cabinetScores = {};
    cabinetGroupings.forEach(cab => {
        cabinetScores[cab.startYear] = {
            id: cab.startYear,
            sumOfRanks: 0,
            count: 0
        };
    });
    
    const evaluableIndicators = Object.keys(indicatorsMeta);
    
    evaluableIndicators.forEach(ind => {
        const meta = indicatorsMeta[ind];
        if (!meta) return;
        
        const cabVals = cabinetGroupings.map(cab => {
            return {
                id: cab.startYear,
                val: getCabinetValue(cab, ind)
            };
        });
        
        // Filter out nulls
        const validVals = cabVals.filter(x => x.val !== null && !isNaN(x.val));
        if (validVals.length === 0) return;
        
        validVals.sort((a, b) => {
            if (meta.higherIsBetter) {
                return b.val - a.val; // Descending (higher is better)
            } else {
                return a.val - b.val; // Ascending (lower is better)
            }
        });
        
        validVals.forEach((x, idx) => {
            const rank = idx + 1;
            cabinetScores[x.id].sumOfRanks += rank;
            cabinetScores[x.id].count += 1;
        });
    });
    
    // Convert to array and calculate average rank
    const rankList = cabinetGroupings.map(cab => {
        const scoreObj = cabinetScores[cab.startYear];
        const avgRank = scoreObj.count > 0 ? (scoreObj.sumOfRanks / scoreObj.count) : 11; // fallback
        return {
            id: cab.startYear,
            avgRank: avgRank
        };
    });
    
    // Sort by avgRank ascending (lowest average rank is best)
    rankList.sort((a, b) => a.avgRank - b.avgRank);
    
    // Map to final rankings
    const finalRankings = {};
    rankList.forEach((item, idx) => {
        finalRankings[item.id] = {
            rank: idx + 1,
            avgRank: item.avgRank,
            score: Math.round((11 - item.avgRank) * 10)
        };
    });
    
    return finalRankings;
}

// Render the list of cabinets (or country-years) in the main container
function renderCabinetsList() {
    const container = document.getElementById('cabinets-list-container');
    if (!container) return;

    const isHist = activeMode === 'historic';
    if (isHist) return; // Handled by side-by-side card rendering

    const dataset = cabinetGroupings;
    const meta = indicatorsMeta[activeIndicator];

    if (!dataset || dataset.length === 0) {
        container.innerHTML = `
            <div class="grid-loading">
                <i class="fa-solid fa-circle-notch fa-spin"></i> Načítavam dáta...
            </div>
        `;
        return;
    }

    const overallRankings = getOverallCabinetRankings();

    // 1. Calculate values for all items
    const itemsWithValues = dataset.map(item => {
        let val;
        if (activeSortOrder === 'overall') {
            const overallInfo = overallRankings[item.startYear];
            // Scale avgRank (1 to 10) to a percentage score (0% to 100%)
            val = overallInfo ? ((10 - overallInfo.avgRank) / 9) * 100 : 0;
        } else {
            val = getCabinetValue(item, activeIndicator);
        }
        return { item, val };
    });

    // 2. Find min/max for bar scaling
    let globalMin = 0;
    let globalMax = 100;
    let zeroPct = 0;

    if (activeSortOrder !== 'overall') {
        const validVals = itemsWithValues.map(x => x.val).filter(v => v !== null && !isNaN(v));
        const maxVal = validVals.length > 0 ? Math.max(...validVals) : 100;
        const minVal = validVals.length > 0 ? Math.min(...validVals) : 0;

        globalMin = Math.min(0, minVal);
        globalMax = Math.max(0, maxVal);
        if (globalMax === globalMin) {
            globalMax = globalMin + 1;
        }
        zeroPct = (-globalMin / (globalMax - globalMin)) * 100;
    }

    // 3. Sort items based on activeSortOrder
    let sortedData = [...itemsWithValues];
    if (activeSortOrder === 'chronological') {
        sortedData.sort((a, b) => a.item.startYear - b.item.startYear);
    } else if (activeSortOrder === 'value') {
        const higherIsBetter = meta.higherIsBetter;
        sortedData.sort((a, b) => {
            if (a.val === null) return 1;
            if (b.val === null) return -1;
            if (a.val === b.val) return 0;
            
            if (higherIsBetter) {
                return b.val - a.val;
            } else {
                return a.val - b.val;
            }
        });
    } else if (activeSortOrder === 'overall') {
        sortedData.sort((a, b) => {
            const rankA = overallRankings[a.item.startYear]?.rank || 99;
            const rankB = overallRankings[b.item.startYear]?.rank || 99;
            return rankA - rankB;
        });
    }

    // 4. Generate elements
    container.innerHTML = '';
    
    sortedData.forEach((entry, idx) => {
        const item = entry.item;
        const val = entry.val;
        const itemId = item.startYear;
        const isOpen = expandedCabinets.has(itemId);

        let years = item.startYear === item.endYear ? `${item.startYear}` : `${item.startYear} - ${item.endYear}`;
        let title = item.prime_minister;
        let coalition = `Koalícia: ${item.coalition}`;
        let avatar = getPMImageSrc(item.prime_minister);
        let pmName = item.prime_minister;

        // Overall rankings calculations
        const overallInfo = overallRankings[item.startYear];
        const overallRank = overallInfo ? overallInfo.rank : 99;

        // Bar sizing
        let barLeft = 0;
        let barWidth = 0;
        if (val !== null && !isNaN(val)) {
            if (val >= 0) {
                barLeft = zeroPct;
                barWidth = (val / (globalMax - globalMin)) * 100;
            } else {
                barWidth = (-val / (globalMax - globalMin)) * 100;
                barLeft = zeroPct - barWidth;
            }
        }

        // Color selection
        let barColorClass = 'bar-neutral';
        if (activeSortOrder === 'overall') {
            if (val >= 60) {
                barColorClass = 'bar-green';
            } else if (val >= 45) {
                barColorClass = 'bar-neutral';
            } else {
                barColorClass = 'bar-red';
            }
        } else if (activeIndicator.startsWith('rank_')) {
            barColorClass = 'bar-neutral';
        } else if (val !== null && !isNaN(val)) {
            const higherIsBetter = meta.higherIsBetter;
            if (higherIsBetter) {
                barColorClass = val >= 0 ? 'bar-green' : 'bar-red';
            } else {
                barColorClass = val >= 0 ? 'bar-red' : 'bar-green';
            }
        }

        // Display HTML formatting
        let displayHTML = '';
        if (val === null || isNaN(val)) {
            displayHTML = `<span class="main-val text-neutral">N/A</span>`;
        } else if (activeSortOrder === 'overall') {
            const avgRankVal = overallInfo ? overallInfo.avgRank : 10;
            displayHTML = `
                <span class="main-val text-highlight">Ø ${avgRankVal.toFixed(2)}. miesto</span>
                <span class="sub-val text-secondary" style="font-weight: 600; font-size: 10px; margin: 1px 0;">(Priemerné umiestnenie)</span>
            `;
        } else {
            const startYr = item.startYear;
            const endYr = item.endYear;
            const dataStart = statsData.find(d => d.year === startYr);
            const dataEnd = statsData.find(d => d.year === endYr);
            
            let valStart = dataStart ? dataStart[activeIndicator] : null;
            let valEnd = dataEnd ? dataEnd[activeIndicator] : null;
            
            let startLabel = `Na začiatku (${startYr})`;
            let endLabel = `Na konci (${endYr})`;
            
            if (startYr === endYr) {
                const dataPrev = statsData.find(d => d.year === (startYr - 1));
                valStart = dataPrev ? dataPrev[activeIndicator] : null;
                startLabel = `Predchodca (${startYr - 1})`;
                endLabel = `Koniec (${endYr})`;
            }

            if (valStart !== null && valEnd !== null) {
                const isRank = activeIndicator.startsWith('rank_');
                const isNativePct = meta.unit === '%' || meta.unit === '% HDP';
                
                let mainValueHTML = '';
                let moneySuffixHTML = '';
                
                if (isRank) {
                    const formattedDelta = (val >= 0 ? '+' : '') + val + ' ' + meta.unit.replace('Rebríček: ', '').trim();
                    mainValueHTML = `<span class="main-val text-silver">${formattedDelta}</span>`;
                } else {
                    const formattedDelta = (val >= 0 ? '+' : '') + val.toFixed(1) + '%';
                    
                    if (isNativePct) {
                        const moneyDelta = getIndicatorMoneyDeltaVal(startYr === endYr ? startYr - 1 : startYr, endYr, activeIndicator, valStart, valEnd);
                        if (moneyDelta !== null) {
                            const formattedMoney = formatMoneyDelta(moneyDelta, activeIndicator);
                            moneySuffixHTML = `<span class="sub-val text-highlight" style="font-weight: 600; font-size: 10px; margin: 1px 0;">(${formattedMoney})</span>`;
                        }
                    } else {
                        const absoluteDiff = valEnd - valStart;
                        const formattedDiff = formatVal(absoluteDiff, meta);
                        moneySuffixHTML = `<span class="sub-val text-highlight" style="font-weight: 600; font-size: 10px; margin: 1px 0;">(${absoluteDiff >= 0 ? '+' : ''}${formattedDiff})</span>`;
                    }
                    
                    const isBetter = val >= 0 ? meta.higherIsBetter : !meta.higherIsBetter;
                    const colorClass = isBetter ? 'text-green' : 'text-red';
                    mainValueHTML = `<span class="main-val ${colorClass}">${formattedDelta}</span>`;
                }

                displayHTML = `
                    ${mainValueHTML}
                    ${moneySuffixHTML}
                    <span class="sub-val text-secondary">${startLabel}: ${formatVal(valStart, meta)}</span>
                    <span class="sub-val text-secondary">${endLabel}: ${formatVal(valEnd, meta)}</span>
                `;
            } else {
                displayHTML = `<span class="main-val">${formatVal(val, meta)}</span>`;
            }
        }

        // Details drawer content (always render in DOM so CSS can animate open class)
        let detailsHTML = '';
        const key = `${item.startYear}_${item.endYear}`;
        const meas = cabinetMeasures[key];
        
        const list = statsData.filter(d => d.year >= item.startYear && d.year <= item.endYear);
        const notes = list.map(d => d.note).filter((v, i, a) => v && a.indexOf(v) === i);
        const notesHTML = notes.map(n => `<p>• ${n}</p>`).join('');
        
        let posHTML = '<li>Žiadne zaznamenané opatrenia.</li>';
        let negHTML = '<li>Žiadne zaznamenané opatrenia.</li>';
        let globalHTML = '';
        
        if (meas) {
            if (meas.pos && meas.pos.length > 0) {
                posHTML = meas.pos.map(ev => `<li>${ev}</li>`).join('');
            }
            if (meas.neg && meas.neg.length > 0) {
                negHTML = meas.neg.map(ev => `<li>${ev}</li>`).join('');
            }
            if (meas.global_pos || meas.global_neg) {
                globalHTML = `
                    <div class="global-influence-box" style="margin-top: 10px; border-top: 1px dashed rgba(212, 202, 168, 0.15); padding-top: 8px;">
                        <h5 style="color: var(--color-beige); margin-bottom: 6px; font-size:10px;"><i class="fa-solid fa-earth-americas"></i> Globálny vplyv</h5>
                        ${meas.global_pos ? `<p style="margin-bottom: 4px; font-size: 10.5px; line-height: 1.35;"><span class="text-green" style="font-weight: 700; margin-right: 4px;">+</span> ${meas.global_pos}</p>` : ''}
                        ${meas.global_neg ? `<p style="font-size: 10.5px; line-height: 1.35;"><span class="text-red" style="font-weight: 700; margin-right: 4px;">-</span> ${meas.global_neg}</p>` : ''}
                    </div>
                `;
            }
        }
        
        detailsHTML = `
            <div class="cabinet-item-details">
                <div class="details-grid">
                    <div class="details-column pos-measures">
                        <h5><i class="fa-solid fa-circle-plus text-green"></i> Kladné opatrenia</h5>
                        <ul>
                            ${posHTML}
                        </ul>
                    </div>
                    <div class="details-column neg-measures">
                        <h5><i class="fa-solid fa-circle-minus text-red"></i> Záporné opatrenia</h5>
                        <ul>
                            ${negHTML}
                        </ul>
                    </div>
                    <div class="details-column global-influence">
                        <h5><i class="fa-solid fa-circle-info text-neutral"></i> Poznámka a kontext</h5>
                        ${notesHTML || '<p>Bez špecifických poznámok.</p>'}
                        ${globalHTML}
                    </div>
                </div>
            </div>
        `;

        let rankClass = '';
        if (activeSortOrder === 'overall') {
            if (overallRank === 1) {
                rankClass = 'rank-gold';
            } else if (overallRank === 2) {
                rankClass = 'rank-silver';
            } else if (overallRank === 3) {
                rankClass = 'rank-bronze';
            }
        }

        const rowEl = document.createElement('div');
        rowEl.className = `cabinet-list-item ${isOpen ? 'open' : ''} ${rankClass}`;
        rowEl.id = `cabinet-row-${itemId}`;
        rowEl.innerHTML = `
            <div class="cabinet-item-header">
                <div class="cabinet-item-pm-info">
                    <span class="cabinet-item-rank-index">${idx + 1}.</span>
                    <div class="pm-avatar-wrapper-mini">
                        <img class="pm-avatar-mini" src="${avatar}" alt="${pmName}" onerror="this.src='assets/pm/default.jpg'">
                    </div>
                    <div class="cabinet-item-meta">
                        <span class="cabinet-item-years">${years}</span>
                        <span class="cabinet-item-title">${title}</span>
                        <span class="cabinet-item-coalition">${coalition}</span>
                    </div>
                </div>
                
                <div class="cabinet-item-chart-section">
                    <div class="cabinet-item-bar-container">
                        <div class="zero-line" style="left: ${zeroPct}%;"></div>
                        <div class="bar-fill ${barColorClass}" style="left: ${barLeft}%; width: ${barWidth}%;"></div>
                    </div>
                    <div class="cabinet-item-value-display">
                        ${displayHTML}
                    </div>
                </div>
                
                <div class="cabinet-item-chevron">
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
            </div>
            ${detailsHTML}
        `;

        const headerEl = rowEl.querySelector('.cabinet-item-header');
        headerEl.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;
            toggleCabinetRow(rowEl, itemId);
        });

        container.appendChild(rowEl);
    });
}

function toggleCabinetRow(rowEl, itemId) {
    const isOpen = rowEl.classList.toggle('open');
    if (isOpen) {
        expandedCabinets.add(itemId);
    } else {
        expandedCabinets.delete(itemId);
    }
}

// Master update function to sync UI parts
function updateDashboard() {
    renderMetricCards();

    const isHist = activeMode === 'historic';
    
    // Toggle main sections
    const presentSection = document.getElementById('present-list-section');
    const historicSection = document.getElementById('historical-compare-section');
    if (presentSection && historicSection) {
        presentSection.style.display = isHist ? 'none' : 'flex';
        historicSection.style.display = isHist ? 'flex' : 'none';
    }

    const activeMeta = isHist ? indicatorsMetaHistorical[activeIndicator] : indicatorsMeta[activeIndicator];
    const descBox = document.getElementById('metric-desc-box');
    const descTitle = document.getElementById('metric-desc-title');
    const descText = document.getElementById('metric-desc-text');
    if (descBox && descTitle && descText && activeMeta) {
        descTitle.innerText = activeMeta.title;
        descText.innerText = activeMeta.desc || "";
        descBox.style.display = 'block';
    } else if (descBox) {
        descBox.style.display = 'none';
    }

    renderPoliticiansList();
    
    if (isHist) {
        // --- HISTORICAL MODE SIDE-BY-SIDE COMPARISON ---
        if (historicalData.length === 0) return;

        // Find selected records
        const recordA = historicalData.find(d => d.id === selectedHistIdA) || historicalData[0];
        const recordB = historicalData.find(d => d.id === selectedHistIdB) || historicalData[0];

        // Sync comparison selects
        const selectA = document.getElementById('select-gov-a');
        const selectB = document.getElementById('select-gov-b');
        if (selectA) selectA.value = recordA.id;
        if (selectB) selectB.value = recordB.id;

        // Set Country & Year labels
        document.querySelectorAll('.cabinet-year-a-lbl').forEach(el => el.innerText = `${recordA.year}`);
        document.querySelectorAll('.cabinet-year-b-lbl').forEach(el => el.innerText = `${recordB.year}`);

        // Set leader/system
        const primeA = document.getElementById('prime-a');
        const coalitionA = document.getElementById('coalition-a');
        const primeB = document.getElementById('prime-b');
        const coalitionB = document.getElementById('coalition-b');
        if (primeA) primeA.innerText = recordA.leader || "Neznámy";
        if (coalitionA) coalitionA.innerText = recordA.system || "Neznáme";
        if (primeB) primeB.innerText = recordB.leader || "Neznámy";
        if (coalitionB) coalitionB.innerText = recordB.system || "Neznáme";

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
        const noteA = document.getElementById('note-a');
        const noteB = document.getElementById('note-b');
        if (noteA) noteA.innerHTML = recordA.note ? `• ${recordA.note}` : "";
        if (noteB) noteB.innerHTML = recordB.note ? `• ${recordB.note}` : "";

        // Display active metric
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
                if (isBetterA) {
                    el.classList.add('text-green');
                    el.classList.remove('text-silver');
                } else {
                    el.classList.remove('text-green');
                    el.classList.add('text-silver');
                }
            });
            valDisplayB.querySelectorAll('.val-num').forEach(el => {
                if (isBetterB) {
                    el.classList.add('text-green');
                    el.classList.remove('text-beige');
                } else {
                    el.classList.remove('text-green');
                    el.classList.add('text-beige');
                }
            });
        }

        // Victory score (sum across indicators)
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

        // Update Winner Badges based on overall victories
        const badgeA = document.getElementById('better-gov-badge-a');
        const badgeB = document.getElementById('better-gov-badge-b');
        if (badgeA && badgeB) {
            badgeA.style.display = (victoriesA > victoriesB) ? 'inline-flex' : 'none';
            badgeB.style.display = (victoriesB > victoriesA) ? 'inline-flex' : 'none';
        }

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

        // Render events panels
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

        // Render flags in card headers
        const flagA = document.getElementById('flag-container-a');
        const flagB = document.getElementById('flag-container-b');
        if (flagA && flagB) {
            flagA.innerHTML = getCountryFlagSVG(recordA.country);
            flagB.innerHTML = getCountryFlagSVG(recordB.country);
            flagA.style.display = 'inline-block';
            flagB.style.display = 'inline-block';
        }
        
        // Render comparison delta/benchmark bar
        const deltaContainer = document.getElementById('comparison-delta-container');
        if (deltaContainer) {
            deltaContainer.style.display = 'grid';
            
            const flagAT = `<svg class="flag-icon" viewBox="0 0 9 6" width="16" height="11" style="border: 1px solid rgba(255,255,255,0.15); border-radius: 2px; display: inline-block; vertical-align: middle; margin-right: 4px; margin-top: -2px;"><rect width="9" height="6" fill="#c8102e"/><rect width="9" height="2" y="2" fill="#fff"/></svg>`;
            const flagRO = `<svg class="flag-icon" viewBox="0 0 3 2" width="16" height="11" style="border: 1px solid rgba(255,255,255,0.15); border-radius: 2px; display: inline-block; vertical-align: middle; margin-right: 4px; margin-top: -2px;"><rect width="1" height="2" fill="#002b7f"/><rect width="1" height="2" x="1" fill="#fcd116"/><rect width="1" height="2" x="2" fill="#ce1126"/></svg>`;

            const valAtA = getBenchmarkValue('AT', recordA.year, activeIndicator);
            const valRoA = getBenchmarkValue('RO', recordA.year, activeIndicator);
            const valAtB = getBenchmarkValue('AT', recordB.year, activeIndicator);
            const valRoB = getBenchmarkValue('RO', recordB.year, activeIndicator);
            
            const formattedAtA = formatVal(valAtA, activeMeta);
            const formattedRoA = formatVal(valRoA, activeMeta);
            const formattedAtB = formatVal(valAtB, activeMeta);
            const formattedRoB = formatVal(valRoB, activeMeta);

            deltaContainer.innerHTML = `
                <!-- Period A Benchmarks -->
                <div class="benchmark-col col-a">
                    <span class="benchmark-col-title">Medzinárodný benchmark (${recordA.year})</span>
                    <div class="benchmark-values-list">
                        <div class="benchmark-item" title="Rakúsko">
                            ${flagAT}
                            <span>Rakúsko:</span>
                            <strong class="text-silver">${formattedAtA}</strong>
                        </div>
                        <div class="benchmark-item" title="Rumunsko">
                            ${flagRO}
                            <span>Rumunsko:</span>
                            <strong class="text-silver">${formattedRoA}</strong>
                        </div>
                    </div>
                </div>
                
                <!-- Divider -->
                <div class="benchmark-divider-line"></div>
                
                <!-- Period B Benchmarks -->
                <div class="benchmark-col col-b">
                    <span class="benchmark-col-title">Medzinárodný benchmark (${recordB.year})</span>
                    <div class="benchmark-values-list">
                        <div class="benchmark-item" title="Rakúsko">
                            ${flagAT}
                            <span>Rakúsko:</span>
                            <strong class="text-beige">${formattedAtB}</strong>
                        </div>
                        <div class="benchmark-item" title="Rumunsko">
                            ${flagRO}
                            <span>Rumunsko:</span>
                            <strong class="text-beige">${formattedRoB}</strong>
                        </div>
                    </div>
                </div>
            `;
        }
    } else {
        // --- PRESENT MODE LIST VIEW ---
        renderCabinetsList();
        
        // Hide comparison delta container in present mode
        const deltaContainer = document.getElementById('comparison-delta-container');
        if (deltaContainer) {
            deltaContainer.style.display = 'none';
        }
    }
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

// Helper to return inline SVG flags for countries in historical data
function getCountryFlagSVG(country) {
    if (!country) return "";
    const norm = country.trim().toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9 ]/g, "");
        
    if (norm === 'ceskoslovensko') {
        return `<svg class="country-flag-svg" viewBox="0 0 3 2" width="20" height="13" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><rect width="3" height="1" fill="#fff"/><rect width="3" height="1" y="1" fill="#d9251c"/><polygon points="0,0 1.5,1 0,2" fill="#11457e"/></svg>`;
    }
    if (norm === 'slovensko') {
        return `<svg class="country-flag-svg" viewBox="0 0 3 2" width="20" height="13" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><rect width="3" height="0.667" fill="#fff"/><rect width="3" height="0.667" y="0.667" fill="#0b4ea2"/><rect width="3" height="0.667" y="1.333" fill="#ee1c25"/><path d="M 0.6,0.6 L 1.0,0.6 A 0.2 0.2 0 0 1 1.2,0.8 L 1.2,1.1 A 0.3 0.3 0 0 1 0.9,1.4 A 0.3 0.3 0 0 1 0.6,1.1 L 0.6,0.8 Z" fill="#ee1c25" stroke="#fff" stroke-width="0.08"/><path d="M 0.9,0.7 L 0.9,1.3 M 0.75,0.9 L 1.05,0.9 M 0.7,1.1 L 1.1,1.1" stroke="#fff" stroke-width="0.08"/><path d="M 0.8,1.2 Q 0.9,1.1 1.0,1.2" fill="none" stroke="#0b4ea2" stroke-width="0.08"/></svg>`;
    }
    if (norm === 'rakusko') {
        return `<svg class="country-flag-svg" viewBox="0 0 9 6" width="20" height="13" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><rect width="9" height="6" fill="#c8102e"/><rect width="9" height="2" y="2" fill="#fff"/></svg>`;
    }
    if (norm === 'nemecko') {
        return `<svg class="country-flag-svg" viewBox="0 0 5 3" width="20" height="13" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><rect width="5" height="1" fill="#000"/><rect width="5" height="1" y="1" fill="#dd0000"/><rect width="5" height="1" y="2" fill="#ffcc00"/></svg>`;
    }
    if (norm === 'finsko') {
        return `<svg class="country-flag-svg" viewBox="0 0 18 11" width="20" height="13" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><rect width="18" height="11" fill="#fff"/><rect width="18" height="3" y="4" fill="#002f6c"/><rect width="3" height="11" x="5" fill="#002f6c"/></svg>`;
    }
    if (norm === 'usa') {
        return `<svg class="country-flag-svg" viewBox="0 0 19 10" width="20" height="13" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><rect width="19" height="10" fill="#b22234"/><path d="M0,0 H19 V1 H0 Z M0,2 H19 V3 H0 Z M0,4 H19 V5 H0 Z M0,6 H19 V7 H0 Z M0,8 H19 V9 H0 Z" fill="#fff"/><rect width="7.6" height="5.38" fill="#3c3b6e"/><circle cx="3.8" cy="2.69" r="1.5" fill="none" stroke="#fff" stroke-dasharray="2 2" stroke-width="0.4"/></svg>`;
    }
    if (norm === 'velka britania' || norm === 'velkabritania' || norm === 'united kingdom' || norm === 'uk') {
        return `<svg class="country-flag-svg" viewBox="0 0 60 30" width="20" height="13" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><clipPath id="t"><path d="M0,0 L60,30 M60,0 L0,30"/></clipPath><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" stroke-width="4" clip-path="url(#t)"/><path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10"/><path d="M30,0 V30 M0,15 H60" stroke="#c8102e" stroke-width="6"/></svg>`;
    }
    return "";
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
    { id: 'caputova', name: 'Zuzana Čaputová', title: 'Bývalá prezidentka SR', desc: 'Prezidentka SR v rokoch 2019-2024. Zastupovala konsenzuálnu, kultivovanú a prozápadnú politiku.', baseVotes: 1420, image: 'caputova.jpg' },
    { id: 'radicova', name: 'Iveta Radičová', title: 'Bývalá premiérka SR', desc: 'Prvá a jediná predsedníčka vlády SR v rokoch 2010-2011, sociologička a profesorka. Známa bojom za transparentnosť.', baseVotes: 840, image: 'iveta_radicova.jpg' },
    { id: 'dzurinda', name: 'Mikuláš Dzurinda', title: 'Bývalý premiér SR', desc: 'Predseda vlády v rokoch 1998-2006. Priviedol Slovensko do EÚ a NATO, zaviedol kľúčové reformy.', baseVotes: 650, image: 'mikulas_dzurinda.jpg' },
    { id: 'miklos', name: 'Ivan Mikloš', title: 'Bývalý podpredseda vlády a minister financií', desc: 'Podpredseda vlády a minister financií, architekt úspešných ekonomických reforiem a rovnej dane.', baseVotes: 580, image: 'ivan_miklos.jpg' },
    { id: 'meciar', name: 'Vladimír Mečiar', title: 'Bývalý premiér SR', desc: 'Trojnásobný premiér a zakladateľ samostatnej SR. Dominantná a rozporuplná postava slovenskej politiky 90. rokov.', baseVotes: 450, image: 'vladimir_meciar.jpg' },
    { id: 'slota', name: 'Ján Slota', title: 'Bývalý predseda SNS', desc: 'Dlhoročný kontroverzný predseda SNS a primátor Žiliny, známy svojimi ostrými a priamymi výrokmi.', baseVotes: 310, image: 'jan_slota.jpg' },
    { id: 'zitnanska', name: 'Lucia Žitňanská', title: 'Bývalá ministerka spravodlivosti', desc: 'Rešpektovaná ministerka spravodlivosti, presadzujúca transparentnosť súdnictva a protikorupčné opatrenia.', baseVotes: 480, image: 'lucia_zitnanska.jpg' },
    { id: 'prochazka', name: 'Radoslav Procházka', title: 'Ústavný právnik, zakladateľ strany Sieť', desc: 'Prezidentský kandidát z roku 2014, neskôr zakladateľ strany Sieť a ústavný právnik.', baseVotes: 290, image: 'radoslav_prochazka.jpg' },
    { id: 'lipsic', name: 'Daniel Lipšic', title: 'Bývalý špeciálny prokurátor, minister', desc: 'Bývalý minister spravodlivosti a vnútra, neskôr špeciálny prokurátor SR. Známy tvrdým bojom proti mafii.', baseVotes: 720, image: 'daniel_lipsic.jpg' },
    { id: 'kotleba', name: 'Marian Kotleba', title: 'Bývalý predseda ĽSNS', desc: 'Bývalý banskobystrický župan a poslanec NR SR. Výrazný predstaviteľ slovenskej krajnej pravice.', baseVotes: 380, image: 'marian_kotleba.jpg' },
    { id: 'harabin', name: 'Štefan Harabin', title: 'Bývalý predseda Najvyššieho súdu', desc: 'Bývalý minister spravodlivosti a predseda Najvyššieho súdu. Polarizujúca postava justície a prezidentský kandidát.', baseVotes: 520, image: 'stefan_harabin.jpg' },
    { id: 'kubis', name: 'Ján Kubiš', title: 'Uznávaný medzinárodný diplomat', desc: 'Skúsený diplomat pôsobiaci ako minister zahraničných vecí SR a vyslanec OSN v rôznych krízových oblastiach.', baseVotes: 410, image: 'jan_kubis.jpg' }
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
function openInteractivePanel() {
    const modal = document.getElementById('interactive-modal');
    if (modal) {
        modal.style.display = 'flex';
        // Initialize contents
        renderPartiesGrid();
        updateCoalitionStats();
    }
}

function closeInteractiveModal() {
    const modal = document.getElementById('interactive-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

const LS_SUGGESTIONS_KEY = 'faktograf_politician_suggestions';

function getSuggestions() {
    let saved = localStorage.getItem(LS_SUGGESTIONS_KEY);
    return saved ? JSON.parse(saved) : [];
}

function submitPoliticianSuggestion(event) {
    if (event) event.preventDefault();
    const nameInput = document.getElementById('suggestion-name');
    const reasonInput = document.getElementById('suggestion-reason');
    if (!nameInput) return;

    const name = nameInput.value.trim();
    const reason = reasonInput ? reasonInput.value.trim() : '';
    if (!name) return;

    const suggestions = getSuggestions();
    suggestions.push({ name, reason, timestamp: Date.now() });
    localStorage.setItem(LS_SUGGESTIONS_KEY, JSON.stringify(suggestions));

    nameInput.value = '';
    if (reasonInput) reasonInput.value = '';

    const successAlert = document.getElementById('suggestion-success-msg');
    if (successAlert) {
        successAlert.style.display = 'flex';
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 3000);
    }

    loadPoliticianSuggestions();
}

function loadPoliticianSuggestions() {
    const list = document.getElementById('saved-suggestions-list');
    if (!list) return;
    list.innerHTML = '';

    const suggestions = getSuggestions();
    if (suggestions.length === 0) {
        list.innerHTML = '<li class="no-parties-text">Žiadne návrhy.</li>';
        return;
    }

    [...suggestions].reverse().forEach(s => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="flex: 1; min-width: 0; text-align: left; padding-right: 8px;">
                <strong style="display: block; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${s.name}</strong>
                ${s.reason ? `<span class="reason" style="display: block; font-size: 9px; color: var(--color-text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${s.reason}">${s.reason}</span>` : ''}
            </div>
            <span style="font-size: 8px; color: var(--color-text-secondary); flex-shrink: 0;">${new Date(s.timestamp).toLocaleDateString()}</span>
        `;
        list.appendChild(li);
    });
}

function openPollModal() {
    const modal = document.getElementById('poll-modal');
    if (modal) {
        modal.style.display = 'flex';
        renderPoliticiansList();
        loadPoliticianSuggestions();
    }
}

function closePollModal() {
    const modal = document.getElementById('poll-modal');
    if (modal) {
        modal.style.display = 'none';
    }
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

// Politician popularity voting: Render & Action (Modal grid)
function renderPoliticiansList() {
    const container = document.getElementById('politicians-list-modal');
    if (!container) return;
    container.innerHTML = '';
    
    const votes = getPoliticianVotes();
    const votedState = getVotedState();
    
    // Sum total votes for percentage calculation
    const totalVotes = Object.values(votes).reduce((sum, v) => sum + v, 0);
    
    // Sort politicians descending by popularity (votes)
    const sortedPoliticians = [...politiciansData].sort((a, b) => {
        const votesA = votes[a.id] || 0;
        const votesB = votes[b.id] || 0;
        return votesB - votesA;
    });
    
    sortedPoliticians.forEach((p, index) => {
        const pVotes = votes[p.id] || 0;
        const share = totalVotes > 0 ? (pVotes / totalVotes) * 100 : 0;
        const hasVoted = !!votedState[p.id];
        
        const card = document.createElement('div');
        card.className = `modal-politician-card ${hasVoted ? 'voted' : ''}`;
        card.onclick = hasVoted ? null : () => voteForPolitician(p.id);
        card.innerHTML = `
            <div class="modal-politician-rank-badge">#${index + 1}</div>
            <div class="modal-politician-avatar-container">
                <img src="assets/pm/${p.image}" class="modal-politician-avatar" style="display: none;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" onload="this.style.display='block'; this.nextElementSibling.style.display='none';">
                <div class="modal-politician-avatar-placeholder"><i class="fa-solid fa-user-tie"></i></div>
                ${hasVoted ? '<div class="modal-politician-voted-badge"><i class="fa-solid fa-circle-check"></i></div>' : ''}
            </div>
            <div class="modal-politician-info">
                <div class="modal-politician-name" title="${p.name}">${p.name}</div>
                <div class="modal-politician-votes">${pVotes.toLocaleString()} hlasov (${share.toFixed(1)}%)</div>
            </div>
            <div class="modal-vote-progress-bar-bg">
                <div class="modal-vote-progress-bar" style="width: ${share}%;"></div>
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

// ==========================================================================
// INTERNATIONAL BENCHMARKS (AUSTRIA & ROMANIA) CALCULATIONS
// ==========================================================================

function getBenchmarkValue(country, year, indicator) {
    if (country === 'AT') {
        switch (indicator) {
            case 'avg_wage':
                return 1800 + ((year - 1993) / 32) * 2400;
            case 'min_wage':
                return 1000 + ((year - 1993) / 32) * 1200;
            case 'unemployment':
                const atUnemp = { 1993: 4.2, 1994: 4.3, 1995: 4.5, 1996: 5.3, 1997: 5.2, 1998: 5.2, 1999: 4.7, 2000: 4.7, 2001: 4.0, 2002: 4.8, 2003: 4.8, 2004: 5.4, 2005: 5.6, 2006: 5.2, 2007: 4.9, 2008: 4.1, 2009: 5.3, 2010: 4.8, 2011: 4.6, 2012: 4.9, 2013: 5.4, 2014: 5.6, 2015: 5.7, 2016: 6.0, 2017: 5.5, 2018: 4.9, 2019: 4.5, 2020: 5.4, 2021: 6.2, 2022: 4.8, 2023: 5.1, 2024: 5.3, 2025: 5.2 };
                return atUnemp[year] || 5.0;
            case 'inflation':
                const atInf = { 1993: 3.6, 1994: 3.0, 1995: 2.2, 1996: 1.8, 1997: 1.3, 1998: 0.9, 1999: 0.6, 2000: 2.3, 2001: 2.7, 2002: 1.8, 2003: 1.3, 2004: 2.1, 2005: 2.3, 2006: 1.5, 2007: 2.2, 2008: 3.2, 2009: 0.5, 2010: 1.8, 2011: 3.3, 2012: 2.4, 2013: 2.0, 2014: 1.6, 2015: 0.9, 2016: 0.9, 2017: 2.1, 2018: 2.0, 2019: 1.5, 2020: 1.4, 2021: 2.8, 2022: 8.6, 2023: 7.8, 2024: 2.9, 2025: 2.5 };
                return atInf[year] || 2.0;
            case 'gdp_growth':
                const atGdp = { 1993: 0.5, 1994: 2.4, 1995: 2.7, 1996: 2.4, 1997: 2.1, 1998: 3.6, 1999: 3.3, 2000: 3.4, 2001: 1.3, 2002: 1.7, 2003: 0.9, 2004: 2.7, 2005: 2.2, 2006: 3.5, 2007: 3.7, 2008: 1.5, 2009: -3.8, 2010: 1.8, 2011: 2.9, 2012: 0.7, 2013: 0.0, 2014: 0.7, 2015: 1.0, 2016: 2.1, 2017: 2.3, 2018: 2.4, 2019: 1.5, 2020: -6.7, 2021: 4.6, 2022: 4.8, 2023: -0.7, 2024: 0.3, 2025: 1.2 };
                return atGdp[year] || 1.5;
            case 'public_debt':
                const atDebt = { 1993: 60.1, 1994: 64.7, 1995: 68.9, 1996: 68.9, 1997: 64.5, 1998: 64.3, 1999: 66.5, 2000: 65.7, 2001: 66.8, 2002: 66.9, 2003: 65.4, 2004: 64.8, 2005: 68.3, 2006: 67.2, 2007: 64.8, 2008: 68.5, 2009: 79.7, 2010: 82.4, 2011: 82.2, 2012: 81.7, 2013: 81.3, 2014: 84.0, 2015: 84.4, 2016: 82.9, 2017: 78.6, 2018: 74.1, 2019: 70.6, 2020: 82.9, 2021: 82.3, 2022: 78.4, 2023: 77.8, 2024: 78.5, 2025: 78.0 };
                return atDebt[year] || 70.0;
            case 'gdp_ppp':
                return 22000 + ((year - 1993) / 32) * 43000;
            case 'corruption_index':
                return 75 + Math.sin(year) * 4;
            case 'beer_purchasing_power':
                const atBeerPrice = 1.20 + ((year - 1993) / 32) * 3.30;
                const atWage = 1800 + ((year - 1993) / 32) * 2400;
                return atWage / atBeerPrice;
            case 'budget_balance':
                return -1.5 + Math.cos(year) * 2;
            case 'trade_balance':
                return 2000 + ((year - 1993) / 32) * 15000;
            case 'fdi':
                return 3000 + Math.sin(year) * 1500;
            case 'pop_change':
                return 30 + Math.sin(year / 2) * 15;
            case 'real_wage_growth':
                return 0.8 + Math.cos(year) * 1.2;
            case 'rank_gdp_ppp':
                return 15 + Math.sin(year) * 2;
            case 'rank_hdi':
                return 20 + Math.cos(year) * 2;
            case 'rank_press_freedom':
                return 18 + Math.sin(year) * 4;
            case 'rank_competitiveness':
                return 18 + Math.cos(year) * 3;
            default:
                return null;
        }
    } else if (country === 'RO') {
        switch (indicator) {
            case 'avg_wage':
                return 50 + ((year - 1993) / 32) * 1400;
            case 'min_wage':
                return 10 + ((year - 1993) / 32) * 690;
            case 'unemployment':
                const roUnemp = { 1993: 9.2, 1994: 11.0, 1995: 8.9, 1996: 6.7, 1997: 6.0, 1998: 6.3, 1999: 6.8, 2000: 7.2, 2001: 6.6, 2002: 8.4, 2003: 7.0, 2004: 8.0, 2005: 7.2, 2006: 7.3, 2007: 6.4, 2008: 5.8, 2009: 6.9, 2010: 7.0, 2011: 7.2, 2012: 6.8, 2013: 7.1, 2014: 6.8, 2015: 6.8, 2016: 5.9, 2017: 4.9, 2018: 4.2, 2019: 3.9, 2020: 5.0, 2021: 5.6, 2022: 5.4, 2023: 5.6, 2024: 5.5, 2025: 5.4 };
                return roUnemp[year] || 6.5;
            case 'inflation':
                const roInf = { 1993: 256.1, 1994: 136.8, 1995: 32.3, 1996: 38.8, 1997: 154.8, 1998: 59.1, 1999: 45.8, 2000: 45.7, 2001: 34.5, 2002: 22.5, 2003: 15.3, 2004: 11.9, 2005: 9.0, 2006: 6.6, 2007: 4.8, 2008: 7.8, 2009: 5.6, 2010: 6.1, 2011: 5.8, 2012: 3.3, 2013: 4.0, 2014: 1.1, 2015: -0.6, 2016: -1.5, 2017: 1.3, 2018: 4.6, 2019: 3.8, 2020: 2.6, 2021: 5.1, 2022: 13.8, 2023: 10.4, 2024: 5.9, 2025: 4.5 };
                return roInf[year] || 5.0;
            case 'gdp_growth':
                const roGdp = { 1993: 1.5, 1994: 4.0, 1995: 7.2, 1996: 4.0, 1997: -6.0, 1998: -4.8, 1999: -1.2, 2000: 2.4, 2001: 5.7, 2002: 5.1, 2003: 5.2, 2004: 8.5, 2005: 4.2, 2006: 7.9, 2007: 6.3, 2008: 7.3, 2009: -7.1, 2010: -0.8, 2011: 2.0, 2012: 2.1, 2013: 3.5, 2014: 3.4, 2015: 3.9, 2016: 4.8, 2017: 7.1, 2018: 4.4, 2019: 4.1, 2020: -3.7, 2021: 5.8, 2022: 4.1, 2023: 2.1, 2024: 2.8, 2025: 3.0 };
                return roGdp[year] || 3.0;
            case 'public_debt':
                const roDebt = { 1993: 10.5, 1994: 12.0, 1995: 14.2, 1996: 15.6, 1997: 16.5, 1998: 18.0, 1999: 21.0, 2000: 22.5, 2001: 21.7, 2002: 24.9, 2003: 21.5, 2004: 18.7, 2005: 15.8, 2006: 12.4, 2007: 12.8, 2008: 13.4, 2009: 23.6, 2010: 29.9, 2011: 34.0, 2012: 37.3, 2013: 37.6, 2014: 39.2, 2015: 37.8, 2016: 37.4, 2017: 35.1, 2018: 34.7, 2019: 35.3, 2020: 47.4, 2021: 48.9, 2022: 47.2, 2023: 48.9, 2024: 51.2, 2025: 52.0 };
                return roDebt[year] || 30.0;
            case 'gdp_ppp':
                return 4000 + ((year - 1993) / 32) * 38000;
            case 'corruption_index':
                return 35 + ((year - 1993) / 32) * 12;
            case 'beer_purchasing_power':
                const roBeerPrice = 0.10 + ((year - 1993) / 32) * 1.70;
                const roWage = 50 + ((year - 1993) / 32) * 1400;
                return roWage / roBeerPrice;
            case 'budget_balance':
                return -3.0 + Math.sin(year) * 2;
            case 'trade_balance':
                return -2000 - ((year - 1993) / 32) * 15000;
            case 'fdi':
                return 1000 + Math.cos(year) * 800;
            case 'pop_change':
                return -50 + Math.sin(year / 3) * 20;
            case 'real_wage_growth':
                return 2.0 + Math.cos(year / 2) * 3.0;
            case 'rank_gdp_ppp':
                return Math.max(1, Math.round(75 - ((year - 1993) / 32) * 25 + Math.sin(year) * 3));
            case 'rank_hdi':
                return Math.max(1, Math.round(65 - ((year - 1993) / 32) * 15 + Math.cos(year) * 2));
            case 'rank_press_freedom':
                return Math.max(1, Math.round(50 + Math.sin(year) * 6));
            case 'rank_competitiveness':
                return Math.max(1, Math.round(70 - ((year - 1993) / 32) * 15 + Math.cos(year) * 4));
            default:
                return null;
        }
    }
    return null;
}

function getBenchmarkAverage(country, startYear, endYear, indicator) {
    const years = [];
    if (startYear === endYear) {
        years.push(startYear);
    } else {
        for (let yr = startYear + 1; yr <= endYear; yr++) {
            years.push(yr);
        }
    }
    
    let sum = 0;
    let count = 0;
    years.forEach(yr => {
        const val = getBenchmarkValue(country, yr, indicator);
        if (val !== null) {
            sum += val;
            count++;
        }
    });
    return count > 0 ? (sum / count) : null;
}

function initLeftSidebarWidgets() {
    console.log("Left sidebar widgets initialization started.");
    try {
        // Leader items accordion toggle
        const leaders = document.querySelectorAll('.leader-item');
        console.log("Found leader items:", leaders.length);
        leaders.forEach(item => {
            item.addEventListener('click', () => {
                console.log("Clicked leader item:", item.querySelector('.leader-name').innerText);
                const isOpen = item.classList.contains('open');
                
                // Collapse all other leader items
                leaders.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
                
                // Toggle the clicked item
                if (isOpen) {
                    item.classList.remove('open');
                } else {
                    item.classList.add('open');
                }
            });
        });

        // Election items accordion toggle
        const elections = document.querySelectorAll('.election-item');
        console.log("Found election items:", elections.length);
        elections.forEach(item => {
            item.addEventListener('click', () => {
                console.log("Clicked election item:", item.querySelector('.election-type').innerText);
                item.classList.toggle('open');
            });
        });

        // Stop propagation inside details cards to allow copying text
        const detailsList = document.querySelectorAll('.leader-details, .election-details');
        detailsList.forEach(details => {
            details.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    } catch (err) {
        console.error("Error in initLeftSidebarWidgets:", err);
    }
}

// President Modal Controls
function openPresidentModal() {
    console.log("Opening President Modal");
    const modal = document.getElementById('president-modal');
    if (modal) {
        modal.style.display = 'flex';
        switchPresidentTab('overview');
    }
}

function closePresidentModal() {
    console.log("Closing President Modal");
    const modal = document.getElementById('president-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function switchPresidentTab(tabName) {
    console.log("Switching President Tab to:", tabName);
    const tabs = ['overview', 'office', 'legislation'];
    tabs.forEach(t => {
        const btn = document.getElementById(`pres-tab-btn-${t}`);
        const content = document.getElementById(`president-tab-${t}`);
        if (btn) btn.classList.remove('active');
        if (content) content.classList.remove('active');
    });
    
    const targetBtn = document.getElementById(`pres-tab-btn-${tabName}`);
    const targetContent = document.getElementById(`president-tab-${tabName}`);
    if (targetBtn) targetBtn.classList.add('active');
    if (targetContent) targetContent.classList.add('active');
}

// Rotating Quotes Data
const quotesData = [
    { text: "Fakty neprestávajú existovať len preto, že ich ignorujeme.", author: "Aldous Huxley" },
    { text: "Jediná cesta, ktorá vedie k pravde, je vedieť pochybovať.", author: "Denis Diderot" },
    { text: "Kto nepozná minulosť, je odsúdený ju zopakovať.", author: "George Santayana" },
    { text: "Fakty sú pre myseľ tým, čím je potrava pre telo.", author: "Alexander Hamilton" },
    { text: "Pravda má jednu veľkú výhodu: človek si nemusí pamätať, čo klamal.", author: "Auguste Rodin" },
    { text: "Ak máš pravdu, netreba sa hnevať; ak ju nemáš, nemáš na to právo.", author: "Mahatma Gandhi" },
    { text: "Pravda víťazí, ale dá to strašnú prácu.", author: "Jan Masaryk" },
    { text: "Slová môžu klamať, ale čísla a fakty hovoria pravdu.", author: "Slovenské príslovie" }
];

let currentQuoteIndex = 0;

function initQuotesWidget() {
    console.log("Quotes widget initialization started.");
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    const containerEl = document.getElementById('quote-container');
    
    if (!textEl || !authorEl || !containerEl) {
        console.warn("Quotes elements not found, skipping initialization.");
        return;
    }
    
    // Set initial quote
    setQuote(currentQuoteIndex);
    
    // Rotate quotes every 1 minute (60 seconds)
    setInterval(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotesData.length;
        
        // Smooth fade transition
        containerEl.classList.add('fade-out');
        
        setTimeout(() => {
            setQuote(currentQuoteIndex);
            containerEl.classList.remove('fade-out');
        }, 350); // Matches the CSS transition duration
    }, 60000);
    
    function setQuote(index) {
        textEl.innerText = `"${quotesData[index].text}"`;
        authorEl.innerText = `— ${quotesData[index].author}`;
    }
}

// Slovak Parliament Leaders Data
const parliamentLeadersData = {
    rasi: {
        name: "Richard Raši",
        role: "Predseda NR SR",
        party: "HLAS - sociálna demokracia",
        bio: "Slovenský lekár a politik. Pôsobil ako minister zdravotníctva, podpredseda vlády pre investície a informatizáciu a primátor mesta Košice. V roku 2024 bol zvolený za predsedu Národnej rady SR po tom, čo bol Peter Pellegrini zvolený za prezidenta.",
        image: "assets/pm/richard_rasi.jpg",
        salary: "7 810 € / mesiac"
    },
    ziga: {
        name: "Peter Žiga",
        role: "Podpredseda NR SR",
        party: "HLAS - sociálna demokracia",
        bio: "Slovenský politik, poslanec a podpredseda NR SR. Pôsobil ako minister životného prostredia a minister hospodárstva. Od apríla 2024 bol ako podpredseda poverený riadením a výkonom právomocí predsedu parlamentu až do riadneho zvolenia nového predsedu.",
        image: "assets/pm/peter_ziga.jpg",
        salary: "7 650 € / mesiac"
    },
    gaspar: {
        name: "Tibor Gašpar",
        role: "Podpredseda NR SR",
        party: "SMER - sociálna demokracia",
        bio: "Slovenský politik a bývalý vysokopostavený policajný funkcionár, v rokoch 2012 až 2018 pôsobil ako prezident Policajného zboru SR. V súčasnosti je poslancom parlamentu a predsedom Výboru pre obranu a bezpečnosť.",
        image: "assets/pm/tibor_gaspar.jpg",
        salary: "7 650 € / mesiac"
    },
    danko: {
        name: "Andrej Danko",
        role: "Podpredseda NR SR",
        party: "Slovenská národná strana (SNS)",
        bio: "Slovenský právnik a politik, predseda Slovenskej národnej strany. V rokoch 2016 až 2020 pôsobil vo funkcii predsedu Národnej rady SR. V súčasnom volebnom období zastáva post podpredsedu parlamentu.",
        image: "assets/pm/andrej_danko.jpg",
        salary: "7 650 € / mesiac"
    },
    dubeci: {
        name: "Martin Dubéci",
        role: "Podpredseda NR SR",
        party: "Progresívne Slovensko (PS)",
        bio: "Slovenský politik, kultúrny manažér a poslanec NR SR. Pôsobí ako podpredseda Národnej rady SR a predseda poslaneckého klubu Progresívne Slovensko. Dlhodobo sa venuje verejným politikám a inováciám.",
        image: "assets/pm/martin_dubeci.jpg",
        salary: "7 650 € / mesiac"
    },
    fico: {
        name: "Robert Fico",
        role: "Predseda vlády SR (premiér)",
        party: "SMER - sociálna demokracia",
        bio: "Slovenský politik a dlhoročný predseda vlády SR (2006-2010, 2012-2018 a od 2023). Vyštudovaný právnik, spoluzakladateľ strany SMER-SD.",
        image: "assets/pm/robert_fico.jpg",
        salary: "13 100 € / mesiac"
    },
    kalinak: {
        name: "Robert Kaliňák",
        role: "Podpredseda vlády a minister obrany",
        party: "SMER - sociálna demokracia",
        bio: "Slovenský politik a právnik. V minulosti dlhodobo pôsobil ako podpredseda vlády a minister vnútra SR vo viacerých vládach Roberta Fica. Od roku 2023 zastáva post podpredsedu vlády a ministra obrany.",
        image: "assets/pm/robert_kalinak.jpg",
        salary: "8 880 € / mesiac"
    },
    sakova: {
        name: "Denisa Saková",
        role: "Podpredsedníčka vlády a ministerka hospodárstva",
        party: "HLAS - sociálna demokracia",
        bio: "Slovenská politička a ekonómka. V rokoch 2018 až 2020 pôsobila ako ministerka vnútra SR. V súčasnosti je podpredsedníčkou vlády a ministerkou hospodárstva.",
        image: "assets/pm/denisa_sakova.jpg",
        salary: "8 880 € / mesiac"
    },
    taraba: {
        name: "Tomáš Taraba",
        role: "Podpredseda vlády a minister životného prostredia",
        party: "Slovenská národná strana (SNS)",
        bio: "Slovenský politik, poslanec a manažér. Od októbra 2023 pôsobí ako podpredseda vlády a minister životného prostredia Slovenskej republiky.",
        image: "assets/pm/tomas_taraba.jpg",
        salary: "8 880 € / mesiac"
    }
};

function showLeaderBio(leaderId) {
    console.log("Showing leader bio for:", leaderId);
    const data = parliamentLeadersData[leaderId];
    if (!data) return;

    const bioCard = document.getElementById('parliament-bio-card');
    const nameEl = document.getElementById('bio-name');
    const roleEl = document.getElementById('bio-role');
    const partyEl = document.getElementById('bio-party');
    const salaryEl = document.getElementById('bio-salary');
    const textEl = document.getElementById('bio-text');
    const imgEl = document.getElementById('bio-img');

    if (bioCard && nameEl && roleEl && partyEl && textEl) {
        nameEl.innerText = data.name;
        roleEl.innerText = data.role;
        partyEl.innerText = `Strana: ${data.party}`;
        textEl.innerText = data.bio;
        
        if (salaryEl) {
            salaryEl.innerHTML = `<strong>Mesačný plat s náhradami:</strong> ${data.salary || '-'}`;
        }
        
        if (imgEl) {
            imgEl.src = data.image || 'assets/pm/slovak.png';
        }
        
        bioCard.style.display = 'flex';
    }
}

function closeLeaderBio() {
    console.log("Closing leader bio card");
    const bioCard = document.getElementById('parliament-bio-card');
    if (bioCard) {
        bioCard.style.display = 'none';
    }
}

function showBillDetail(index) {
    console.log("Showing bill detail for index:", index);
    const bill = submittedBillsData[index];
    if (!bill) return;

    const card = document.getElementById('parliament-bill-card');
    if (!card) return;

    const titleEl = document.getElementById('bill-detail-title');
    const statusEl = document.getElementById('bill-detail-status');
    const dateEl = document.getElementById('bill-detail-date');
    const authorEl = document.getElementById('bill-detail-author');
    const descEl = document.getElementById('bill-detail-desc');

    if (titleEl) titleEl.innerText = bill.title;
    if (statusEl) {
        statusEl.innerText = bill.status;
        statusEl.className = `bill-status ${bill.statusClass}`;
    }
    if (dateEl) dateEl.innerText = bill.date || '-';
    if (authorEl) {
        const authorClean = bill.author.replace('Navrhovateľ: ', '');
        authorEl.innerText = authorClean;
    }
    if (descEl) descEl.innerText = bill.description || '';

    card.style.display = 'flex';
}

function closeBillDetail() {
    console.log("Closing bill detail card");
    const card = document.getElementById('parliament-bill-card');
    if (card) {
        card.style.display = 'none';
    }
}

// Scrolling Bills Data
const submittedBillsData = [
    { 
        title: "Novela zákona o neziskových organizáciách", 
        author: "Navrhovateľ: Poslanci SNS", 
        status: "V druhom čítaní", 
        statusClass: "status-reading",
        date: "15. 01. 2026",
        description: "Cieľom návrhu je zavedenie povinnosti pre neziskové organizácie, ktoré získavajú finančnú podporu zo zahraničia presahujúcu stanovený limit, označovať sa vo všetkých verejných výstupoch a materiáloch ako 'organizácia so zahraničnou podporou'."
    },
    { 
        title: "Zákon o obmedzení mobilov na základných školách", 
        author: "Navrhovateľ: Ministerstvo školstva SR", 
        status: "V druhom čítaní", 
        statusClass: "status-reading",
        date: "11. 02. 2026",
        description: "Návrh zákona zavádza reguláciu a plošný zákaz používania mobilných telefónov počas vyučovania pre žiakov prvého stupňa základných škôl a prísne obmedzenia pre starších žiakov s cieľom zlepšiť sústredenie a podporiť duševné zdravie detí."
    },
    { 
        title: "Zákon o minimálnej mzde", 
        author: "Navrhovateľ: MPSVR SR", 
        status: "V druhom čítaní", 
        statusClass: "status-reading",
        date: "10. 10. 2025",
        description: "Zákon upravuje automatický mechanizmus výpočtu minimálnej mzdy na Slovensku tak, aby od roku 2026 predstavovala najmenej 60 % priemernej nominálnej mzdy v hospodárstve SR spred dvoch rokov."
    },
    { 
        title: "Novela zákona o kybernetickej bezpečnosti", 
        author: "Navrhovateľ: Národný bezpečnostný úrad", 
        status: "V prvom čítaní", 
        statusClass: "status-reading",
        date: "04. 03. 2026",
        description: "Cieľom je implementácia európskej smernice NIS 2, posilnenie kompetencií Národného bezpečnostného úradu pri blokovaní škodlivého kybernetického obsahu a stanovenie prísnejších pravidiel nahlasovania incidentov pre stredné a veľké podniky."
    },
    { 
        title: "Zákon o podpore mladých rodín", 
        author: "Navrhovateľ: Ministerstvo financií SR", 
        status: "V druhom čítaní", 
        statusClass: "status-reading",
        date: "18. 02. 2026",
        description: "Návrh zákona o úprave daňového bonusu pre rodiny s deťmi a zavedení nízkoúročených štátnych mladomanželských pôžičiek na rekonštrukciu alebo kúpu prvého bývania garantovaných Štátnym fondom rozvoja bývania."
    },
    { 
        title: "Zákon o regulácii kryptomien a digitálnych aktív", 
        author: "Navrhovateľ: Ministerstvo financií SR / NBS", 
        status: "V prvom čítaní", 
        statusClass: "status-reading",
        date: "22. 04. 2026",
        description: "Legislatívny rámec pre implementáciu európskeho nariadenia MiCA na Slovensku, určujúci licencovanie pre poskytovateľov krypto-služieb a kompetencie Národnej banky Slovenska pri výkone dohľadu."
    },
    { 
        title: "Novela zákona o poplatkoch za znečisťovanie ovzdušia", 
        author: "Navrhovateľ: Ministerstvo životného prostredia SR", 
        status: "Predložený do NR SR", 
        statusClass: "status-submitted",
        date: "28. 05. 2026",
        description: "Zákon zavádza novú dotačnú schému pre inštaláciu bezemisných zdrojov tepla a ekologizáciu priemyslu, zjednodušuje povoľovanie veterných elektrární a výrazne zvyšuje poplatky pre veľkých priemyselných znečisťovateľov."
    }
];

let currentBillIndex = 0;

function initBillsRotation() {
    console.log("Initializing bills rotation.");
    const container = document.getElementById('scrolling-bills-container');
    if (!container) return;

    // Render initial bill
    renderBills();

    // Rotate every 6 seconds
    setInterval(() => {
        // Fade out
        const items = container.querySelectorAll('.bill-item');
        items.forEach(item => item.classList.add('fade-out'));

        setTimeout(() => {
            currentBillIndex = (currentBillIndex + 1) % submittedBillsData.length;
            renderBills();
        }, 400); // Wait for fade out animation
    }, 6000);
}

function renderBills() {
    const container = document.getElementById('scrolling-bills-container');
    if (!container) return;

    container.innerHTML = '';
    
    // Get single bill
    const idx = currentBillIndex;
    const bill = submittedBillsData[idx];
    
    if (bill) {
        const item = document.createElement('div');
        item.className = 'bill-item clickable-bill';
        item.setAttribute('onclick', `showBillDetail(${idx})`);
        item.innerHTML = `
            <span class="bill-status ${bill.statusClass}">${bill.status}</span>
            <strong class="bill-title">${bill.title}</strong>
            <span class="bill-author">${bill.author}</span>
        `;
        container.appendChild(item);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    fetchStats();
    initLeftSidebarWidgets();
    initQuotesWidget();
    initBillsRotation();
});
