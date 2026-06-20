// Slovak Regions Quality of Life Comparison Data and Logic

// 12 Indicators metadata configuration
const indicatorsData = {
    priemer_mzda: {
        title: "Priemerná mzda",
        icon: "fa-euro-sign",
        unit: "€",
        decimals: 0,
        higherIsBetter: true,
        desc: "Priemerná nominálna mesačná mzda zamestnanca v hospodárstve kraja."
    },
    byvanie_cena: {
        title: "Dostupnosť bývania",
        icon: "fa-house-chimney",
        unit: "€/m²",
        decimals: 0,
        higherIsBetter: false,
        desc: "Priemerná cena bývania (bytov a domov) za meter štvorcový (nižšia cena = lepšia dostupnosť)."
    },
    nezamestnanost: {
        title: "Nezamestnanosť",
        icon: "fa-users-slash",
        unit: "%",
        decimals: 1,
        higherIsBetter: false,
        desc: "Miera evidovanej nezamestnanosti vykazovaná úradmi práce (nižšia = lepšia)."
    },
    kriminalita: {
        title: "Bezpečnosť (Kriminalita)",
        icon: "fa-shield-halved",
        unit: "činov / 100k obyv.",
        decimals: 0,
        higherIsBetter: false,
        desc: "Počet registrovaných trestných činov na 100 000 obyvateľov (menej trestných činov = vyššia bezpečnosť)."
    },
    dozitie: {
        title: "Očakávaná dĺžka života",
        icon: "fa-heart-pulse",
        unit: "rokov",
        decimals: 1,
        higherIsBetter: true,
        desc: "Priemerný očakávaný vek dožitia pri narodení v danom kraji."
    },
    lekari_dostupnost: {
        title: "Dostupnosť lekárov",
        icon: "fa-user-doctor",
        unit: "lekárov / 10k obyv.",
        decimals: 1,
        higherIsBetter: true,
        desc: "Počet lekárov poskytujúcich zdravotnú starostlivosť na 10 000 obyvateľov."
    },
    ovzdusie: {
        title: "Čistota ovzdušia",
        icon: "fa-wind",
        unit: "index",
        decimals: 0,
        higherIsBetter: true,
        desc: "Ekologický index kvality a čistoty ovzdušia (0 - 100, vyššie číslo = čistejší vzduch)."
    },
    infrastruktura: {
        title: "Infraštruktúra a diaľnice",
        icon: "fa-road",
        unit: "index",
        decimals: 0,
        higherIsBetter: true,
        desc: "Index vybavenosti rýchlostnými cestami, diaľnicami a kvalitou infraštruktúry (0 - 100)."
    },
    skoly: {
        title: "Úspešnosť škôl",
        icon: "fa-graduation-cap",
        unit: "%",
        decimals: 1,
        higherIsBetter: true,
        desc: "Priemerná úspešnosť stredoškolákov v externých maturitných skúškach."
    },
    zelen: {
        title: "Podiel zelene a lesov",
        icon: "fa-tree",
        unit: "%",
        decimals: 1,
        higherIsBetter: true,
        desc: "Percentuálny podiel lesného a zeleného pokrytia územia kraja."
    },
    demografia: {
        title: "Demografický prírastok",
        icon: "fa-people-group",
        unit: "salda / 1000 obyv.",
        decimals: 1,
        higherIsBetter: true,
        desc: "Čisté migračné saldo kraja (rozdiel medzi prisťahovanými a odsťahovanými na 1000 obyvateľov)."
    },
    kultura: {
        title: "Kultúra a voľný čas",
        icon: "fa-masks-theater",
        unit: "index",
        decimals: 0,
        higherIsBetter: true,
        desc: "Dostupnosť divadiel, kín, kultúrnych podujatí a voľnočasových aktivít (0 - 100)."
    }
};

// 8 Slovak regions dataset with values for all 12 indicators
const regionsData = [
    {
        id: "BA",
        name: "Bratislavský kraj",
        values: {
            priemer_mzda: 2045,
            byvanie_cena: 3850,
            nezamestnanost: 2.4,
            kriminalita: 1450,
            dozitie: 79.5,
            lekari_dostupnost: 65.4,
            ovzdusie: 62,
            infrastruktura: 98,
            skoly: 64.8,
            zelen: 28.5,
            demografia: 8.5,
            kultura: 96
        }
    },
    {
        id: "TT",
        name: "Trnavský kraj",
        values: {
            priemer_mzda: 1485,
            byvanie_cena: 2150,
            nezamestnanost: 3.8,
            kriminalita: 1120,
            dozitie: 77.8,
            lekari_dostupnost: 38.2,
            ovzdusie: 74,
            infrastruktura: 85,
            skoly: 57.2,
            zelen: 18.2,
            demografia: 3.2,
            kultura: 65
        }
    },
    {
        id: "TN",
        name: "Trenčiansky kraj",
        values: {
            priemer_mzda: 1420,
            byvanie_cena: 1950,
            nezamestnanost: 3.5,
            kriminalita: 820,
            dozitie: 77.5,
            lekari_dostupnost: 36.5,
            ovzdusie: 72,
            infrastruktura: 78,
            skoly: 58.5,
            zelen: 48.5,
            demografia: 0.1,
            kultura: 58
        }
    },
    {
        id: "NR",
        name: "Nitriansky kraj",
        values: {
            priemer_mzda: 1390,
            byvanie_cena: 1850,
            nezamestnanost: 4.1,
            kriminalita: 950,
            dozitie: 76.9,
            lekari_dostupnost: 35.8,
            ovzdusie: 78,
            infrastruktura: 75,
            skoly: 55.4,
            zelen: 15.6,
            demografia: 0.8,
            kultura: 62
        }
    },
    {
        id: "ZA",
        name: "Žilinský kraj",
        values: {
            priemer_mzda: 1435,
            byvanie_cena: 2200,
            nezamestnanost: 4.3,
            kriminalita: 890,
            dozitie: 77.2,
            lekari_dostupnost: 42.1,
            ovzdusie: 85,
            infrastruktura: 68,
            skoly: 59.1,
            zelen: 56.4,
            demografia: -0.5,
            kultura: 68
        }
    },
    {
        id: "BB",
        name: "Banskobystrický kraj",
        values: {
            priemer_mzda: 1360,
            byvanie_cena: 1750,
            nezamestnanost: 7.9,
            kriminalita: 1280,
            dozitie: 75.8,
            lekari_dostupnost: 44.2,
            ovzdusie: 88,
            infrastruktura: 62,
            skoly: 54.2,
            zelen: 58.2,
            demografia: -1.2,
            kultura: 60
        }
    },
    {
        id: "PO",
        name: "Prešovský kraj",
        values: {
            priemer_mzda: 1220,
            byvanie_cena: 1650,
            nezamestnanost: 9.8,
            kriminalita: 910,
            dozitie: 76.2,
            lekari_dostupnost: 34.1,
            ovzdusie: 86,
            infrastruktura: 52,
            skoly: 56.5,
            zelen: 49.1,
            demografia: -2.8,
            kultura: 55
        }
    },
    {
        id: "KE",
        name: "Košický kraj",
        values: {
            priemer_mzda: 1495,
            byvanie_cena: 2350,
            nezamestnanost: 8.2,
            kriminalita: 1340,
            dozitie: 75.9,
            lekari_dostupnost: 48.9,
            ovzdusie: 65,
            infrastruktura: 58,
            skoly: 57.8,
            zelen: 39.8,
            demografia: -1.5,
            kultura: 78
        }
    }
];

let activeIndicator = "priemer_mzda";

document.addEventListener("DOMContentLoaded", () => {
    initIndicatorsList();
    updateRankings();
    calculateOverallWinner();
});

// Render the left side indicator dropdown selector
function initIndicatorsList() {
    const selectEl = document.getElementById("select-region-indicators");
    if (!selectEl) return;
    
    selectEl.innerHTML = "";
    Object.keys(indicatorsData).forEach(key => {
        const ind = indicatorsData[key];
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = ind.title;
        if (key === activeIndicator) {
            opt.selected = true;
        }
        selectEl.appendChild(opt);
    });
    
    selectEl.addEventListener("change", (e) => {
        activeIndicator = e.target.value;
        updateRankings();
    });
}

// Update the right side details panel and region list
function updateRankings() {
    const panel = document.getElementById("rankings-detail-panel");
    if (!panel) return;
    
    const meta = indicatorsData[activeIndicator];
    if (!meta) return;
    
    // Sort regions by activeIndicator values
    const sortedRegions = [...regionsData];
    const higherIsBetter = meta.higherIsBetter;
    
    sortedRegions.sort((a, b) => {
        const valA = a.values[activeIndicator];
        const valB = b.values[activeIndicator];
        if (higherIsBetter) {
            return valB - valA;
        } else {
            return valA - valB;
        }
    });

    // Find min and max values to calculate progress percentage
    const allValues = regionsData.map(r => r.values[activeIndicator]);
    const maxVal = Math.max(...allValues);
    const minVal = Math.min(...allValues);

    let listHTML = "";
    sortedRegions.forEach((reg, index) => {
        const value = reg.values[activeIndicator];
        const rank = index + 1;
        
        // Format value
        let formattedVal = value.toFixed(meta.decimals) + " " + meta.unit;
        if (meta.unit === "€") {
            formattedVal = value.toLocaleString("sk-SK") + " €";
        }
        
        // Calculate relative progress bar width
        let percentage = 0;
        if (higherIsBetter) {
            percentage = maxVal > 0 ? (value / maxVal) * 100 : 0;
        } else {
            // For lower is better (e.g. price, unemployment, crime), the lowest value gets 100% progress
            percentage = value > 0 ? (minVal / value) * 100 : 0;
        }
        
        // Progress bar color based on rank (1st = green/gold, 8th = red/neutral)
        let barColor = "var(--color-beige)"; // gold/beige
        if (rank === 1) {
            barColor = "rgba(46, 204, 113, 0.85)"; // green
        } else if (rank === 8) {
            barColor = "rgba(231, 76, 60, 0.85)"; // red
        } else {
            barColor = "rgba(255, 255, 255, 0.45)"; // soft white
        }

        listHTML += `
            <div style="margin-bottom: 12px; padding: 10px; background: rgba(255,255,255,0.02); border-radius: 6px; border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between; gap: 15px;">
                <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;">
                    <div style="width: 26px; height: 26px; border-radius: 50%; background: ${rank === 1 ? 'var(--color-beige)' : 'rgba(255,255,255,0.08)'}; color: ${rank === 1 ? '#090a0c' : 'var(--color-silver)'}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: 'Outfit'; font-size: 13px;">
                        ${rank}.
                    </div>
                    <div style="flex: 1; min-width: 0;">
                        <span style="font-weight: 600; font-size: 13px; color: ${rank === 1 ? 'var(--color-beige)' : 'var(--color-silver)'}; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            ${reg.name}
                        </span>
                        <!-- Progress bar representation -->
                        <div style="height: 5px; width: 100%; background: rgba(255,255,255,0.08); border-radius: 3px; margin-top: 4px; overflow: hidden;">
                            <div style="height: 100%; width: ${percentage}%; background: ${barColor}; border-radius: 3px; transition: width 0.35s ease;"></div>
                        </div>
                    </div>
                </div>
                <div style="text-align: right; min-width: 90px;">
                    <strong style="font-size: 14px; font-family: 'Outfit'; color: ${rank === 1 ? '#2ecc71' : (rank === 8 ? '#e74c3c' : '#f6f7f9')};">
                        ${formattedVal}
                    </strong>
                </div>
            </div>
        `;
    });

    panel.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
            <h3 style="margin: 0; font-family: 'Outfit'; font-size: 17px; color: var(--color-beige); display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid ${meta.icon}"></i> ${meta.title}
            </h3>
            <span style="font-size: 10px; text-transform: uppercase; color: var(--color-silver); font-weight: 600; letter-spacing: 0.5px; border: 1px solid rgba(255,255,255,0.15); padding: 2px 8px; border-radius: 12px; background: rgba(255,255,255,0.05);">
                Jednotka: ${meta.unit}
            </span>
        </div>
        <p style="margin: 0 0 18px 0; font-size: 12px; color: var(--color-silver); line-height: 1.45; border-left: 2px solid var(--color-beige); padding-left: 10px;">
            ${meta.desc}
        </p>
        <div style="max-height: 380px; overflow-y: auto; padding-right: 4px;">
            ${listHTML}
        </div>
    `;
}

// Calculate the average ranking of each region across all 12 indicators to find overall best
function calculateOverallWinner() {
    const regionScores = {};
    regionsData.forEach(reg => {
        regionScores[reg.id] = {
            name: reg.name,
            totalRank: 0
        };
    });

    const indKeys = Object.keys(indicatorsData);
    indKeys.forEach(indKey => {
        const meta = indicatorsData[indKey];
        const sorted = [...regionsData];
        const higherIsBetter = meta.higherIsBetter;

        // Sort to establish rank (1. to 8.)
        sorted.sort((a, b) => {
            const valA = a.values[indKey];
            const valB = b.values[indKey];
            if (higherIsBetter) {
                return valB - valA;
            } else {
                return valA - valB;
            }
        });

        sorted.forEach((reg, index) => {
            const rank = index + 1;
            regionScores[reg.id].totalRank += rank;
        });
    });

    // Convert to array and average rank
    const overallList = Object.keys(regionScores).map(id => {
        const score = regionScores[id];
        return {
            id: id,
            name: score.name,
            avgRank: score.totalRank / indKeys.length
        };
    });

    // Sort by lowest average rank (lower rank average is better, i.e., overall leader)
    overallList.sort((a, b) => a.avgRank - b.avgRank);

    const winnerContainer = document.getElementById("overall-winner-container");
    if (!winnerContainer) return;

    let winnerHTML = "";
    overallList.forEach((item, index) => {
        const place = index + 1;
        const isWinner = place === 1;
        
        winnerHTML += `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; margin-bottom: 6px; background: ${isWinner ? 'rgba(229, 211, 179, 0.08)' : 'rgba(255,255,255,0.01)'}; border: 1px solid ${isWinner ? 'rgba(229, 211, 179, 0.2)' : 'rgba(255,255,255,0.04)'}; border-radius: 6px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="font-weight: 800; font-family: 'Outfit'; font-size: 12px; color: ${isWinner ? 'var(--color-beige)' : 'var(--color-silver)'}; min-width: 15px;">
                        ${place}.
                    </div>
                    <span style="font-weight: ${isWinner ? '700' : '500'}; font-size: 12px; color: ${isWinner ? '#f6f7f9' : 'var(--color-silver)'};">
                        ${item.name}
                    </span>
                    ${isWinner ? '<span class="bill-status status-approved" style="font-size: 8px; padding: 1px 4px; vertical-align: middle;"><i class="fa-solid fa-star"></i> Najlepší pre život</span>' : ''}
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 11px; color: ${isWinner ? 'var(--color-beige)' : 'var(--color-silver)'}; font-weight: 600; font-family: 'Outfit';">
                        Ø ${item.avgRank.toFixed(2)}. miesto
                    </span>
                </div>
            </div>
        `;
    });

    winnerContainer.innerHTML = winnerHTML;
}
