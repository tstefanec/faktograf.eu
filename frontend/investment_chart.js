// Interactive State Investment Budget Simulator (15 Billion Euros across 5 Areas)
const investmentImpacts = {
    healthcare: [
        { min: 0.0, max: 0.9, title: "Základná údržba", desc: "• Oprava havarijných polikliník a nákup starších sanitiek.<br>• Minimálne prístrojové vylepšenia v krajských nemocniciach.<br>• Dlhé čakacie lehoty pre pacientov pretrvávajú." },
        { min: 1.0, max: 1.9, title: "Čiastočná obnova", desc: "• Výstavba 1 veľkej univerzitnej nemocnice (napr. Martin).<br>• Rekonštrukcia a modernizácia 15 regionálnych nemocníc.<br>• Zníženie odchodu lekárov do zahraničia o 10 %." },
        { min: 2.0, max: 2.9, title: "Významný pokrok", desc: "• Výstavba 3 nových špičkových nemocníc (Martin, Rázsochy, Košice).<br>• Dotácie pre 30 regionálnych nemocníc a nákup nových CT/MRI prístrojov.<br>• Zriadenie podporného fondu pre ambulantný sektor." },
        { min: 3.0, max: 3.9, title: "Generálna modernizácia (Odporúčaná)", desc: "• <b>Výstavba 7 moderných univerzitných nemocníc</b> (Martin, Rázsochy, Košice, BB atď.).<br>• <b>Kompletná obnova 50 regionálnych nemocníc</b>.<br>• Masívna stabilizácia ambulantného sektora, prilákanie stoviek lekárov domov." },
        { min: 4.0, max: 15.0, title: "Špičkové európske zdravotníctvo", desc: "• Výstavba a moderná renovácia nemocníc vo všetkých krajoch bez výnimky.<br>• Plne bezplatné a rýchle objednávanie k špecialistom do 5 dní.<br>• Slovensko ako stredoeurópsky líder v liečbe onkologických ochorení." }
    ],
    education: [
        { min: 0.0, max: 0.9, title: "Prežívanie systému", desc: "• Výmena okien na najviac poškodených základných školách.<br>• Drobné zvýšenie rozpočtu na školské jedálne.<br>• Nákup základných učebníc." },
        { min: 1.0, max: 1.9, title: "Materiálny rozvoj", desc: "• Zateplenie a obnova 50 % stredných a základných škôl.<br>• Zvýšenie platov všetkých učiteľov o 10 % nad úroveň inflácie.<br>• Prvotná digitalizácia 30 % tried (interaktívne tabule)." },
        { min: 2.0, max: 2.9, title: "Moderné vzdelávanie (Odporúčané)", desc: "• <b>Obnova a zateplenie všetkých škôl na Slovensku</b> (úspora energií o 40 %).<br>• <b>Garantované zvýšenie platov učiteľov o 30 %</b> po dobu 5 rokov.<br>• Vybudovanie 3 špičkových univerzitných vedeckých centier." },
        { min: 3.0, max: 15.0, title: "Severský štandard školstva", desc: "• Plná prestavba učebných osnov na moderné severské metódy (fokus na prax).<br>• Kompletné prebudovanie univerzitných kampusov a internátov.<br>• Učiteľské platy konkurencieschopné s IT a finančným sektorom." }
    ],
    transport: [
        { min: 0.0, max: 0.9, title: "Látanie dier", desc: "• Oprava najhorších výtlkov na cestách I. a II. triedy.<br>• Nevyhnutné núdzové spevnenie mostov v havarijnom stave." },
        { min: 1.0, max: 2.4, title: "Regionálna obnova", desc: "• Rekonštrukcia 150 kritických mostov.<br>• Čiastočné zrýchlenie vybraných železničných uzlov na západe SR.<br>• Výstavba obchvatov 5 tranzitných miest." },
        { min: 2.5, max: 3.9, title: "Strategické spojenia", desc: "• Dostavba obchvatov a dôležitých úsekov R2 a D3.<br>• Rekonštrukcia 300 najviac poškodených mostov na hlavných ťahoch.<br>• Modernizácia hlavnej trate Bratislava - Žilina na 160 km/h." },
        { min: 4.0, max: 4.9, title: "Dostavaná diaľnica (Odporúčaná)", desc: "• <b>Kompletná dostavba D1 až po hranicu s Ukrajinou</b> vrátane 2. profilu tunela Branisko.<br>• <b>Modernizácia trate Bratislava - Košice</b> na rýchlosť 160-200 km/h.<br>• <b>Generálna oprava 500 kritických mostov</b>." },
        { min: 5.0, max: 15.0, title: "Supermoderná infraštruktúra", desc: "• Dokončenie všetkých naplánovaných rýchlostných ciest (R4 po PL, R2 po KE, D3 po PL).<br>• Prepojenie západu s východom vysokorýchlostnou traťou (200+ km/h).<br>• 100 % oprava všetkých havarijných mostov v správe štátu." }
    ],
    green: [
        { min: 0.0, max: 0.9, title: "Minimálne dotácie", desc: "• Drobné ekologické príspevky na výmenu kotlov pre 2 000 domácností.<br>• Lokálne výsadby stromov v niekoľkých mestách." },
        { min: 1.0, max: 1.9, title: "Zelené domy", desc: "• Príspevky na zateplenie a solárne panely pre 40 000 rodinných domov.<br>• Budovanie cyklotrás medzi mestami a obcami." },
        { min: 2.0, max: 2.9, title: "Ekologická krajina (Odporúčaná)", desc: "• <b>Zateplenie 150 000 rodinných a bytových domov</b>.<br>• <b>Dotácie na fotovoltiku a tepelné čerpadlá</b> pre 100 000 domácností.<br>• Štátna podpora dekarbonizácie ťažkého priemyslu (čistejší vzduch)." },
        { min: 3.0, max: 15.0, title: "Uhlíková neutralita", desc: "• Plná energetická sebestačnosť všetkých škôl, nemocníc a úradov z OZE.<br>• Masívna výstavba solárnych, veterných a prečerpávacích elektrární.<br>• Obnova prirodzených lesných ekosystémov a plná ochrana riek." }
    ],
    innovation: [
        { min: 0.0, max: 0.9, title: "Základné IT systémy", desc: "• Menšie úpravy štátnych webov a elektronických registrov.<br>• Drobné príspevky na nákup hasičskej techniky." },
        { min: 1.0, max: 1.9, title: "Digitalizácia štátu", desc: "• Redukcia byrokracie (väčšina potvrdení online z domu).<br>• Nákup modernej techniky a vybavenia pre hasičské a záchranné zložky.<br>• Založenie inovačného klastra." },
        { min: 2.0, max: 2.9, title: "Smart Slovensko (Odporúčané)", desc: "• <b>Kompletné odbúranie papierových úradov</b> (e-Government, ktorý funguje rýchlo).<br>• <b>Komplexná obnova a modernizácia policajných staníc a hasičských staníc</b>.<br>• Vytvorenie Národného inovačného centra pre podporu talentov a startupov." },
        { min: 3.0, max: 15.0, title: "Technologická špička", desc: "• Plne autonómna štátna správa riadená umelou inteligenciou.<br>• Najbezpečnejšia kybernetická ochrana štátu v Európe (Cyber-Shield).<br>• Obrovské granty pre vedcov svetovej úrovne na príchod a prácu na Slovensku." }
    ]
};

const defaultAllocations = {
    healthcare: 3.5,
    education: 2.5,
    transport: 4.5,
    green: 2.5,
    innovation: 2.0
};

let currentAllocations = { ...defaultAllocations };
let activeSector = "healthcare";

function initInvestmentCalculator() {
    const sectors = ["healthcare", "education", "transport", "green", "innovation"];

    sectors.forEach(sec => {
        const slider = document.getElementById(`slider-inv-${sec}`);
        const label = document.getElementById(`val-inv-${sec}`);
        const itemRow = document.getElementById(`item-inv-${sec}`);

        if (slider && label) {
            slider.min = "0.0";
            slider.max = "15.0";
            slider.step = "0.1";
            slider.value = currentAllocations[sec].toFixed(1);
            label.innerText = currentAllocations[sec].toFixed(1).replace(".", ",") + " mld. €";

            slider.addEventListener("input", (e) => {
                const val = parseFloat(e.target.value);
                currentAllocations[sec] = val;
                label.innerText = val.toFixed(1).replace(".", ",") + " mld. €";
                updateInvestmentSummary();
            });
        }

        if (itemRow) {
            itemRow.addEventListener("click", () => {
                sectors.forEach(s => {
                    const row = document.getElementById(`item-inv-${s}`);
                    if (row) row.classList.remove("active");
                });
                itemRow.classList.add("active");
                activeSector = sec;
                updateDetailedView();
            });
        }
    });

    const resetBtn = document.getElementById("btn-inv-reset");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            currentAllocations = { ...defaultAllocations };
            sectors.forEach(sec => {
                const slider = document.getElementById(`slider-inv-${sec}`);
                const label = document.getElementById(`val-inv-${sec}`);
                if (slider && label) {
                    slider.value = currentAllocations[sec].toFixed(1);
                    label.innerText = currentAllocations[sec].toFixed(1).replace(".", ",") + " mld. €";
                }
            });
            updateInvestmentSummary();
        });
    }

    // Set first item as active in UI
    const defaultRow = document.getElementById(`item-inv-${activeSector}`);
    if (defaultRow) defaultRow.classList.add("active");

    updateInvestmentSummary();
}

function updateInvestmentSummary() {
    const sum = Object.values(currentAllocations).reduce((a, b) => a + b, 0);
    const limit = 15.0;
    const diff = limit - sum;

    const remainingText = document.getElementById("remaining-budget");
    const warningPanel = document.getElementById("inv-warning-panel");

    if (remainingText) {
        if (diff >= 0) {
            remainingText.innerText = "Zostáva na rozdelenie: " + diff.toFixed(1).replace(".", ",") + " mld. €";
            remainingText.style.color = "var(--color-beige)";
            if (warningPanel) warningPanel.style.display = "none";
        } else {
            remainingText.innerText = "Prekročený limit o " + Math.abs(diff).toFixed(1).replace(".", ",") + " mld. €!";
            remainingText.style.color = "#f87171";
            if (warningPanel) {
                warningPanel.style.display = "flex";
                warningPanel.innerText = `Prekročili ste celkový rozpočet 15 mld. € o ${Math.abs(diff).toFixed(1).replace(".", ",")} mld. €! Znížte posuvníky.`;
            }
        }
    }

    // Update stacked progress colors
    const progressColors = {
        healthcare: "#10b981",
        education: "#a78bfa",
        transport: "#2563eb",
        green: "#22d3ee",
        innovation: "#fbbf24"
    };

    const stackedProgress = document.getElementById("investment-stacked-progress");
    if (stackedProgress) {
        stackedProgress.innerHTML = "";
        const activeSum = Math.max(sum, 15.0); // Keep track filled correctly
        Object.entries(currentAllocations).forEach(([sec, val]) => {
            if (val > 0) {
                const bar = document.createElement("div");
                bar.style.height = "100%";
                bar.style.width = `${(val / activeSum) * 100}%`;
                bar.style.backgroundColor = progressColors[sec];
                bar.style.transition = "width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)";
                stackedProgress.appendChild(bar);
            }
        });
    }

    updateDetailedView();
}

function updateDetailedView() {
    const sec = activeSector;
    const val = currentAllocations[sec];
    const impactList = investmentImpacts[sec];

    const matchedImpact = impactList.find(imp => val >= imp.min && val <= imp.max) || impactList[impactList.length - 1];

    const detailTitle = document.getElementById("inv-detail-title");
    const detailHeader = document.getElementById("inv-detail-header");
    const detailDesc = document.getElementById("inv-detail-desc");

    const sectorNames = {
        healthcare: "Zdravotníctvo",
        education: "Školstvo a Veda",
        transport: "Doprava a Infraštruktúra",
        green: "Zelená transformácia",
        innovation: "Inovácie a Bezpečnosť"
    };

    if (detailTitle) detailTitle.innerText = sectorNames[sec];
    if (detailHeader) {
        detailHeader.innerHTML = `Stupeň rozvoja: <span style="color: var(--color-beige); font-weight: 700;">${matchedImpact.title}</span>`;
    }
    if (detailDesc) {
        detailDesc.innerHTML = matchedImpact.desc;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(initInvestmentCalculator, 100);
});
