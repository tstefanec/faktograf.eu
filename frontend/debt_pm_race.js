// Static Comparison Dashboard: Slovakia National Debt & Prime Ministers Budget Approvals (k 2026)
// Dual representation: Percentage shares of total 2026 debt (56.0 mld. €) and absolute billions.
const pmDebtData = [
    { name: "Robert Fico", actualPct: 33.9, projectedPct: 3.6, years: 12, avgAnnualPct: 2.8 },
    { name: "Matovič / Heger", actualPct: 26.3, projectedPct: 0.0, years: 3, avgAnnualPct: 8.8 },
    { name: "Mikuláš Dzurinda", actualPct: 8.6, projectedPct: 0.0, years: 8, avgAnnualPct: 1.1 },
    { name: "Iveta Radičová", actualPct: 8.4, projectedPct: 0.0, years: 2, avgAnnualPct: 4.2 },
    { name: "Peter Pellegrini", actualPct: 7.7, projectedPct: 0.0, years: 2, avgAnnualPct: 3.9 },
    { name: "Vladimír Mečiar", actualPct: 5.4, projectedPct: 0.0, years: 6, avgAnnualPct: 0.9 },
    { name: "Starý dlh (pred 1993)", actualPct: 2.7, projectedPct: 0.0, years: 0, avgAnnualPct: 0.0 }
];

const pmColorsDebtDashboard = {
    "Vladimír Mečiar": "#2c3e50",
    "Mikuláš Dzurinda": "#2980b9",
    "Robert Fico": "#c0392b",
    "Iveta Radičová": "#8e44ad",
    "Peter Pellegrini": "#d35400",
    "Matovič / Heger": "#27ae60",
    "Starý dlh (pred 1993)": "#7f8c8d"
};

function getPMImageSrcDebtDashboard(name) {
    if (name === "Starý dlh (pred 1993)") return "assets/pm/default.jpg";
    const firstName = name.split('/')[0].trim();
    const normalized = firstName.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "_");
    return `assets/pm/${normalized}.jpg`;
}

function initDebtDashboard() {
    const container = document.getElementById("debt-pm-bars-container");
    if (!container) {
        console.warn("Debt PM dashboard container not found in DOM.");
        return;
    }

    container.innerHTML = "";
    
    // Max value is Fico's total percentage (33.9% + 3.6% = 37.5%)
    const maxVal = 37.5;
    const totalDebtValue = 56.0;

    pmDebtData.forEach((item) => {
        const row = document.createElement("div");
        row.className = "bar-dashboard-row";
        row.style.marginBottom = "14px";
        row.style.display = "flex";
        row.style.flexDirection = "column";
        row.style.gap = "4px";

        // Label details
        let ruledLabel = "";
        if (item.years > 0) {
            ruledLabel = `(${item.years} ${item.years === 1 ? 'rok' : item.years < 5 ? 'roky' : 'rokov'} vládnutia)`;
        }

        const percentageActual = (item.actualPct / maxVal) * 100;
        const percentageProjected = (item.projectedPct / maxVal) * 100;
        
        // Calculate nominal value in billions
        const nominalActual = (item.actualPct * totalDebtValue) / 100;
        const nominalProjected = (item.projectedPct * totalDebtValue) / 100;
        const nominalAvgAnnual = (item.avgAnnualPct * totalDebtValue) / 100;

        const displayActualVal = `${item.actualPct.toFixed(1).replace('.', ',')}% (+${nominalActual.toFixed(2).replace('.', ',')} mld. €)`;
        
        const avgAnnualText = item.years > 0 
            ? `Ročne: ${item.avgAnnualPct.toFixed(1).replace('.', ',')}% (+${nominalAvgAnnual.toFixed(2).replace('.', ',')} mld. €)` 
            : "";

        // Build HTML bar with projection overlay for Robert Fico
        let fillHTML = `
            <div class="bar-race-fill" style="width: ${percentageActual}%; background: ${pmColorsDebtDashboard[item.name] || '#7f8c8d'}; height: 100%; display: flex; align-items: center; padding-left: 6px; box-sizing: border-box; border-radius: 4px; position: relative;">
                <img class="bar-race-pm-avatar" src="${getPMImageSrcDebtDashboard(item.name)}" style="width: 18px; height: 18px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.4); margin-right: 6px;" onerror="this.src='assets/pm/default.jpg'">
                <span style="font-size: 10px; font-weight: 700; color: #ffffff; white-space: nowrap;">${displayActualVal}</span>
            </div>
        `;

        if (item.projectedPct > 0) {
            fillHTML += `
                <div class="bar-race-projected-fill" style="width: ${percentageProjected}%; background: repeating-linear-gradient(45deg, rgba(192, 57, 43, 0.4), rgba(192, 57, 43, 0.4) 5px, rgba(192, 57, 43, 0.2) 5px, rgba(192, 57, 43, 0.2) 10px); border: 1px dashed #c0392b; height: 100%; display: flex; align-items: center; padding-left: 6px; box-sizing: border-box; border-radius: 4px; margin-left: 2px;" title="Predpoklad na rok 2026">
                    <span style="font-size: 9px; font-weight: 700; color: #ff8a80; white-space: nowrap;">+${item.projectedPct.toFixed(1).replace('.', ',')}% (+${nominalProjected.toFixed(2).replace('.', ',')} mld. €) odhad</span>
                </div>
            `;
        }

        row.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span style="font-size: 12px; font-weight: 600; color: #ffffff;">${item.name} <span style="color: var(--color-silver); font-weight: 400; font-size: 11px;">${ruledLabel}</span></span>
                <span style="font-size: 10.5px; color: var(--color-beige); font-weight: 600;">${avgAnnualText}</span>
            </div>
            <div class="bar-race-track" style="width: 100%; height: 26px; background: #111215; border-radius: 4px; overflow: hidden; display: flex; align-items: center; box-sizing: border-box;">
                ${fillHTML}
            </div>
        `;
        container.appendChild(row);
    });

    // Update static KPIs
    const totalDlhLabel = document.getElementById("debt-pm-total-label");
    const gdpPctLabel = document.getElementById("debt-pm-gdp-label");

    if (totalDlhLabel) {
        totalDlhLabel.innerText = "100% (56,00 mld. €)";
    }
    if (gdpPctLabel) {
        gdpPctLabel.innerText = "60,5% HDP";
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initDebtDashboard, 100);
});
