// Data for parties (Actual 2023 parliament composition, ordered left-to-right)
const partiesData = [
    { id: 'sas', name: 'SaS', fullname: 'Sloboda a Solidarita', support: 6.32, seats: 11, color: '#9fc02b', leader: 'Branislav Gröhling', coalition: false, attendance: '87.2%' },
    { id: 'ps', name: 'PS', fullname: 'Progresívne Slovensko', support: 17.96, seats: 32, color: '#0096db', leader: 'Michal Šimečka', coalition: false, attendance: '88.6%' },
    { id: 'kdh', name: 'KDH', fullname: 'Kresťanskodemokratické hnutie', support: 6.82, seats: 12, color: '#005aa3', leader: 'Milan Majerský', coalition: false, attendance: '90.4%' },
    { id: 'slovensko', name: 'Slovensko', fullname: 'Hnutie SLOVENSKO (bývalé OĽaNO)', support: 8.89, seats: 16, color: '#a80082', leader: 'Igor Matovič', coalition: false, attendance: '85.1%' },
    { id: 'hlas', name: 'Hlas-SD', fullname: 'HLAS - sociálna demokracia', support: 14.70, seats: 27, color: '#1f3a60', leader: 'Matúš Šutaj Eštok', coalition: true, attendance: '93.1%' },
    { id: 'smer', name: 'Smer-SD', fullname: 'SMER - sociálna demokracia', support: 22.94, seats: 42, color: '#d9251c', leader: 'Robert Fico', coalition: true, attendance: '94.2%' },
    { id: 'sns', name: 'SNS', fullname: 'Slovenská národná strana', support: 5.62, seats: 10, color: '#c9a054', leader: 'Andrej Danko', coalition: true, attendance: '91.8%' }
];

// Seeded random number generator for determinism
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Deterministic generator for 150 MPs matching real party seats
function generateMPs() {
    const firstNamesMale = ['Ján', 'Jozef', 'Peter', 'Michal', 'Milan', 'Martin', 'Tomáš', 'Pavol', 'Andrej', 'Richard', 'Róbert', 'Tibor', 'Igor', 'Branislav', 'Erik', 'Karol', 'Roman', 'Dušan', 'Miroslav', 'Ladislav', 'Juraj', 'Ivan', 'Jaroslav', 'Daniel', 'Stanislav', 'František', 'Rudolf', 'Marek', 'Patrik', 'Lukáš', 'Matej', 'Jakub', 'Filip', 'Samuel', 'Matúš'];
    const firstNamesFemale = ['Zuzana', 'Denisa', 'Lucia', 'Zora', 'Tina', 'Beáta', 'Simona', 'Tamara', 'Ingrid', 'Darina', 'Veronika', 'Martina', 'Mária', 'Vladimíra', 'Jana', 'Katarína', 'Lenka', 'Silvia', 'Anna', 'Eva', 'Monika'];
    const surnamesMale = ['Novák', 'Kováč', 'Varga', 'Tóth', 'Nagy', 'Baláž', 'Szabó', 'Molnár', 'Horváth', 'Bernát', 'Oravec', 'Urban', 'Galo', 'Polák', 'Hudec', 'Šoltés', 'Lipták', 'Sýkora', 'Rusnák', 'Hruška', 'Kysel', 'Valach', 'Halás', 'Gábor', 'Kollár', 'Kubica', 'Bednár', 'Madar', 'Beňo', 'Hlinka', 'Hrnko', 'Fedor', 'Palko', 'Dzurinda', 'Mikloš'];
    const surnamesFemale = ['Nováková', 'Kováčová', 'Vargová', 'Tóthová', 'Nagyová', 'Balážová', 'Szabóová', 'Molnárová', 'Horváthová', 'Bernátová', 'Oravcová', 'Urbanová', 'Galová', 'Poláková', 'Hudcová', 'Šoltésová', 'Liptáková', 'Sýkorová', 'Rusnáková', 'Hrušková', 'Kyselová', 'Valachová', 'Halásová', 'Gáborová', 'Kollárová', 'Kubicová', 'Bednárová', 'Beňová', 'Hlinková', 'Hrnková', 'Fedorová', 'Palková'];

        const knownMPs = {
        'smer': [
            'Tibor Gašpar', 'Richard Glück', 'Igor Melicher', 'Ján Mažgút', 'Dušan Jarjabek', 'Ján Podmanický',
            'Marián Kéry', 'Vladimír Faič', 'Peter Šuca', 'Martin Nemky', 'Ľubomír Vážny', 'Andrej Sitkár',
            'Ivan Hazucha', 'Michal Lukša', 'Igor Válek', 'Boleslav Lešo', 'Zuzana Plevíková', 'Vladimír Macášek'
        ],
        'ps': [
            'Michal Šimečka', 'Martin Dubéci', 'Zora Jaurová', 'Lucia Plaváková', 'Ivan Štefunko',
            'Jaroslav Spišiak', 'Tina Gažovičová', 'Beáta Jurík', 'Oskar Dvořák', 'Štefan Kišš',
            'Tomáš Valášek', 'Simona Petrík', 'Michal Sabo', 'Tamara Stohlová', 'Veronika Veslárová', 'Darina Luščíková'
        ],
        'hlas': [
            'Peter Žiga', 'Karol Janas', 'Peter Náhlik', 'Ján Ferenčák', 'Branislav Becík',
            'Michal Bartek', 'Ján Blcháč', 'Róbert Puci', 'Ľubica Laššáková', 'Štefan Gašparovič',
            'Miroslav Čellár', 'Jozef Cech', 'Samuel Migaľ', 'Ján Hrubý', 'Alena Nováková', 'Peter Slyško', 'Roman Malatinec'
        ],
        'slovensko': [
            'Igor Matovič', 'Michal Šipoš', 'Jozef Pročko', 'Veronika Remišová', 'Gábor Grendel',
            'Július Jakab', 'Roman Mikulec', 'Peter Pollák', 'Erika Jurinová', 'Marek Krajčí'
        ],
        'kdh': [
            'Milan Majerský', 'Martina Holečková', 'František Mikloško', 'Jozef Hajko', 'Marián Čaučík', 'Peter Stachura', 'Andrea Turčanová', 'Ján Horecký'
        ],
        'sas': [
            'Branislav Gröhling', 'Vladimíra Marcinková', 'Jana Bittó Cigániková', 'Mária Kolíková', 'Ondrej Dostál', 'Juraj Droba', 'Alojz Hlina', 'Marián Viskupič'
        ],
        'sns': [
            'Andrej Danko', 'Rudolf Huliak', 'Roman Michelko', 'Ivan Ševčík', 'Peter Kotlár', 'Dagmar Kramplová', 'Milan Garaj', 'Adam Lučanský', 'Karol Farkašovský', 'Pavel Manko'
        ]
    };

    const mps = [];
    let seed = 12345; // Fixed seed for stable output

    partiesData.forEach(party => {
        const seats = party.seats;
        const avgAttendance = parseFloat(party.attendance);
        const known = knownMPs[party.id] || [];

        for (let i = 0; i < seats; i++) {
            let name = '';
            if (i < known.length) {
                name = known[i];
            } else {
                const isFemale = seededRandom(seed++) < 0.22; // ~22% female representation
                if (isFemale) {
                    const fnIdx = Math.floor(seededRandom(seed++) * firstNamesFemale.length);
                    const snIdx = Math.floor(seededRandom(seed++) * surnamesFemale.length);
                    name = firstNamesFemale[fnIdx] + ' ' + surnamesFemale[snIdx];
                } else {
                    const fnIdx = Math.floor(seededRandom(seed++) * firstNamesMale.length);
                    const snIdx = Math.floor(seededRandom(seed++) * surnamesMale.length);
                    name = firstNamesMale[fnIdx] + ' ' + surnamesMale[snIdx];
                }
            }

            // Seeded random attendance variation around the party average: avg +/- 4.5%
            const variation = (seededRandom(seed++) - 0.5) * 9.0;
            const attendance = Math.min(100, Math.max(50, avgAttendance + variation)).toFixed(1) + '%';

            mps.push({
                name: name,
                party: party.name,
                partyId: party.id,
                color: party.color,
                attendance: attendance
            });
        }
    });

    return mps;
}

const mpsData = generateMPs();

// Data for bills
const billsData = [
    { 
        title: "Novela zákona o neziskových organizáciách", 
        author: "Poslanci SNS", 
        status: "V druhom čítaní", 
        statusClass: "status-reading",
        date: "15. 01. 2026",
        description: "Cieľom návrhu je zavedenie povinnosti pre neziskové organizácie, ktoré získavajú finančnú podporu zo zahraničia presahujúcu stanovený limit, označovať sa vo všetkých verejných výstupoch a materiáloch ako 'organizácia so zahraničnou podporou'."
    },
    { 
        title: "Zákon o obmedzení mobilov na základných školách", 
        author: "Ministerstvo školstva SR", 
        status: "V druhom čítaní", 
        statusClass: "status-reading",
        date: "11. 02. 2026",
        description: "Návrh zákona zavádza reguláciu a plošný zákaz používania mobilných telefónov počas vyučovania pre žiakov prvého stupňa základných škôl a prísne obmedzenia pre starších žiakov s cieľom zlepšiť sústredenie a podporiť duševné zdravie detí."
    },
    { 
        title: "Zákon o minimálnej mzde", 
        author: "MPSVR SR", 
        status: "V druhom čítaní", 
        statusClass: "status-reading",
        date: "10. 10. 2025",
        description: "Zákon upravuje automatický mechanizmus výpočtu minimálnej mzdy na Slovensku tak, aby od roku 2026 predstavovala najmenej 60 % priemernej nominálnej mzdy v hospodárstve SR spred dvoch rokov."
    },
    { 
        title: "Novela zákona o kybernetickej bezpečnosti", 
        author: "Národný bezpečnostný úrad", 
        status: "V prvom čítaní", 
        statusClass: "status-reading",
        date: "04. 03. 2026",
        description: "Cieľom je implementácia európskej smernice NIS 2, posilnenie kompetencií Národného bezpečnostného úradu pri blokovaní škodlivého kybernetického obsahu a stanovenie prísnejších pravidiel nahlasovania incidentov pre stredné a veľké podniky."
    },
    { 
        title: "Zákon o podpore mladých rodín", 
        author: "Ministerstvo financií SR", 
        status: "V druhom čítaní", 
        statusClass: "status-reading",
        date: "18. 02. 2026",
        description: "Návrh zákona o úprave daňového bonusu pre rodiny s deťmi a zavedení nízkoúročených štátnych mladomanželských pôžičiek na rekonštrukciu alebo kúpu prvého bývania garantovaných Štátnym fondom rozvoja bývania."
    },
    { 
        title: "Zákon o regulácii kryptomien a digitálnych aktív", 
        author: "Ministerstvo financií SR / NBS", 
        status: "V prvom čítaní", 
        statusClass: "status-reading",
        date: "22. 04. 2026",
        description: "Legislatívny rámec pre implementáciu európskeho nariadenia MiCA na Slovensku, určujúci licencovanie pre poskytovateľov krypto-služieb a kompetencie Národnej banky Slovenska pri výkone dohľadu."
    },
    { 
        title: "Novela zákona o poplatkoch za znečisťovanie ovzdušia", 
        author: "Ministerstvo životného prostredia SR", 
        status: "Predložený do NR SR", 
        statusClass: "status-submitted",
        date: "28. 05. 2026",
        description: "Zákon zavádza novú dotačnú schému pre inštaláciu bezemisných zdrojov tepla a ekologizáciu priemyslu, zjednodušuje povoľovanie veterných elektrární a výrazne zvyšuje poplatky pre veľkých priemyselných znečisťovateľov."
    },
    {
        title: "Nový stavebný zákon a digitalizácia povoľovania",
        author: "Ministerstvo dopravy SR",
        status: "V druhom čítaní",
        statusClass: "status-reading",
        date: "12. 06. 2026",
        description: "Zavedenie jednotného stavebného konania, zrušenie zbytočných úradných úkonov a plná digitalizácia stavebných povolení prostredníctvom portálu výstavby od roku 2027."
    },
    {
        title: "Reforma financovania sociálnych služieb",
        author: "MPSVR SR",
        status: "Predložené do NR SR",
        statusClass: "status-submitted",
        date: "24. 06. 2026",
        description: "Zavedenie príspevku na starostlivosť viazaného priamo na odkázanú osobu a zjednotenie financovania verejných a neverejných poskytovateľov sociálnych služieb."
    }
];

// Draw hemicycle
function initHemicycle() {
    const container = document.getElementById('hemicycle-container');
    if (!container) return;
    container.innerHTML = '';
    
    // Flat array of 150 seat models
    let seatsList = [];
    partiesData.forEach(p => {
        for (let i = 0; i < p.seats; i++) {
            seatsList.push({
                partyId: p.id,
                partyName: p.name,
                color: p.color,
                seatNum: i + 1
            });
        }
    });

    // Outer and Inner rows layout
    // Row count config: 5 rows
    const rows = [
        { r: 75, count: 18 },
        { r: 105, count: 23 },
        { r: 135, count: 28 },
        { r: 165, count: 35 },
        { r: 195, count: 46 }
    ];
    
    let seatIdx = 0;
    const centerX = 230;
    const centerY = 210;

    // Create tooltip element if not exists
    let tooltip = document.getElementById('parliament-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'parliament-tooltip';
        tooltip.className = 'parliament-tooltip';
        container.appendChild(tooltip); // Append inside container for relative boundary coordinates
    }

    rows.forEach(row => {
        const r = row.r;
        const count = row.count;
        
        for (let i = 0; i < count; i++) {
            if (seatIdx >= 150) break;
            
            // angle from 180 (left) to 0 (right)
            const angle = Math.PI - (i / (count - 1)) * Math.PI;
            
            const x = centerX + r * Math.cos(angle);
            const y = centerY - r * Math.sin(angle);
            
            const seat = seatsList[seatIdx];
            const dot = document.createElement('div');
            dot.className = 'hemicycle-seat';
            dot.style.left = `${x - 5.5}px`;
            dot.style.top = `${y - 5.5}px`;
            dot.style.backgroundColor = seat.color;
            dot.style.color = seat.color; // for currentColor shadow
            
            dot.setAttribute('data-party-id', seat.partyId);
            dot.setAttribute('data-seat-num', seat.seatNum);

            // Interaction
            dot.addEventListener('mouseover', (e) => {
                tooltip.style.display = 'block';
                tooltip.innerHTML = `<strong>${seat.partyName}</strong><br>Sedadlo poslaneckého klubu č. ${seat.seatNum}`;
                positionTooltip(e, container);
            });

            dot.addEventListener('mousemove', (e) => {
                positionTooltip(e, container);
            });

            dot.addEventListener('mouseout', () => {
                tooltip.style.display = 'none';
            });

            dot.addEventListener('click', () => {
                selectPartyFromSeat(seat.partyId);
            });

            container.appendChild(dot);
            seatIdx++;
        }
    });
}

function positionTooltip(e, container) {
    const tooltip = document.getElementById('parliament-tooltip');
    if (!tooltip) return;
    
    // Position relative to the container element
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

// Select a party to view info when clicking a seat dot
function selectPartyFromSeat(partyId) {
    const party = partiesData.find(p => p.id === partyId);
    if (!party) return;

    // Highlight the legend item
    const legendItems = document.querySelectorAll('.legend-item');
    legendItems.forEach(item => {
        if (item.getAttribute('data-party-id') === partyId) {
            item.style.background = 'rgba(229, 211, 179, 0.15)';
            item.style.borderColor = 'rgba(229, 211, 179, 0.35)';
        } else {
            item.style.background = '';
            item.style.borderColor = '';
        }
    });

    // Highlight only dots of this party
    const seats = document.querySelectorAll('.hemicycle-seat');
    seats.forEach(seat => {
        if (seat.getAttribute('data-party-id') === partyId) {
            seat.style.transform = 'scale(1.3)';
            seat.style.boxShadow = '0 0 10px currentColor';
        } else {
            seat.style.transform = '';
            seat.style.boxShadow = '';
        }
    });
}

// Reset highlights
function resetHemicycleHighlight() {
    const legendItems = document.querySelectorAll('.legend-item');
    legendItems.forEach(item => {
        item.style.background = '';
    });
    const seats = document.querySelectorAll('.hemicycle-seat');
    seats.forEach(seat => {
        seat.style.transform = '';
        seat.style.boxShadow = '';
    });
}

// Generate Legend
function initLegend() {
    const legend = document.getElementById('party-legend');
    if (!legend) return;
    legend.innerHTML = '';
    
    partiesData.forEach(p => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.setAttribute('data-party-id', p.id);
        item.innerHTML = `
            <span class="legend-color" style="background-color: ${p.color}"></span>
            <span class="legend-name">${p.fullname}</span>
            <span class="legend-seats">${p.seats}</span>
        `;
        
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            selectPartyFromSeat(p.id);
        });
        
        legend.appendChild(item);
    });
}

// Initialize Voting Attendance Bars for MPs
function initAttendanceStats(filteredMps) {
    const list = document.getElementById('attendance-list');
    if (!list) return;
    list.innerHTML = '';
    
    // Sort MPs by attendance descending
    const sorted = [...(filteredMps || mpsData)].sort((a,b) => parseFloat(b.attendance) - parseFloat(a.attendance));
    
    if (sorted.length === 0) {
        const item = document.createElement('div');
        item.style.padding = '20px';
        item.style.textAlign = 'center';
        item.style.color = 'var(--color-silver)';
        item.style.fontStyle = 'italic';
        item.innerText = 'Nenašli sa žiadni poslanci';
        list.appendChild(item);
        return;
    }

    sorted.forEach(p => {
        const item = document.createElement('div');
        item.className = 'attendance-item';
        item.innerHTML = `
            <div class="attendance-label-row">
                <span>${p.name} (${p.party})</span>
                <strong>${p.attendance}</strong>
            </div>
            <div class="attendance-bar-bg">
                <div class="attendance-bar-fill" style="width: ${p.attendance}; background-color: ${p.color}"></div>
            </div>
        `;
        list.appendChild(item);
    });
}

// Render Bills List
function initBillsList() {
    const list = document.getElementById('subpage-bills-list');
    if (!list) return;
    list.innerHTML = '';
    
    billsData.forEach((bill, idx) => {
        const item = document.createElement('div');
        item.className = 'subpage-bill-item';
        item.setAttribute('data-bill-idx', idx);
        item.innerHTML = `
            <div class="subpage-bill-header">
                <span class="bill-status ${bill.statusClass}">${bill.status}</span>
                <span class="subpage-bill-date"><i class="fa-regular fa-calendar"></i> ${bill.date}</span>
            </div>
            <strong class="subpage-bill-title">${bill.title}</strong>
            <span class="subpage-bill-author"><i class="fa-regular fa-user"></i> ${bill.author}</span>
        `;
        
        item.addEventListener('click', () => {
            selectBill(idx);
        });
        
        list.appendChild(item);
    });

    // Auto-select first bill by default
    if (billsData.length > 0) {
        selectBill(0);
    }
}

// Select Bill in Split-view
function selectBill(index) {
    const items = document.querySelectorAll('.subpage-bill-item');
    items.forEach(item => {
        if (parseInt(item.getAttribute('data-bill-idx')) === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const bill = billsData[index];
    const panel = document.getElementById('bill-detail-panel');
    if (!panel || !bill) return;

    panel.innerHTML = `
        <div class="bill-detail-content">
            <h4 style="margin: 0; color: var(--color-beige); font-family: 'Outfit'; font-size: 15px;">${bill.title}</h4>
            <div style="align-self: flex-start;">
                <span class="bill-status ${bill.statusClass}">${bill.status}</span>
            </div>
            <div class="bill-meta-info">
                <p><strong>Predkladateľ:</strong> <span>${bill.author}</span></p>
                <p><strong>Dátum predloženia:</strong> <span>${bill.date}</span></p>
            </div>
            <p class="bill-description-text">${bill.description}</p>
        </div>
    `;
}

// Document Load
window.addEventListener('DOMContentLoaded', () => {
    initHemicycle();
    initLegend();
    initAttendanceStats();
    initBillsList();

    // Setup MP search listener
    const searchInput = document.getElementById('search-mps');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query === '') {
                initAttendanceStats();
            } else {
                const filtered = mpsData.filter(mp => 
                    mp.name.toLowerCase().includes(query) || 
                    mp.party.toLowerCase().includes(query)
                );
                initAttendanceStats(filtered);
            }
        });
    }

    // Click outside to clear hemicycle selection
    const wrapper = document.getElementById('hemicycle-wrapper');
    if (wrapper) {
        wrapper.addEventListener('click', (e) => {
            if (e.target === wrapper || e.target.id === 'hemicycle-container') {
                resetHemicycleHighlight();
            }
        });
    }
});
