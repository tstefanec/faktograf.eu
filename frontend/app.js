// Faktograf app.js - Homepage Widgets & Memes
// Cleaned up: government comparisons moved to comparison.js

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

function initGovernanceCostCounter() {
    const counterEl = document.getElementById('live-governance-cost');
    if (!counterEl) return;
    
    // Base date is October 25, 2023 at 09:00:00 (Inaugural session / government appointed)
    const baseDate = new Date('2023-10-25T09:00:00');
    // Total monthly salaries budget is ~1 060 000 €, which translates to ~0.4032 € per second
    const costPerSecond = 0.4032;
    
    function updateCounter() {
        const now = new Date();
        const elapsedSeconds = (now.getTime() - baseDate.getTime()) / 1000;
        if (elapsedSeconds < 0) {
            counterEl.textContent = "0,00 €";
            return;
        }
        const totalCost = elapsedSeconds * costPerSecond;
        
        counterEl.textContent = new Intl.NumberFormat('sk-SK', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(totalCost);
    }
    
    updateCounter();
    setInterval(updateCounter, 100);
}

// Fetch and render political memes in the sidebar
// Memes Pagination State
let allMemesList = [];
let currentMemePage = 1;
const memesPerPage = 6;

// Fetch all memes and render the first page
async function fetchMemes() {
    const grid = document.getElementById('memes-homepage-grid');
    const paginationContainer = document.getElementById('memes-pagination');
    if (!grid) return;

    try {
        const response = await fetch('/api/memes?all=true');
        if (!response.ok) {
            throw new Error(`Chyba API: ${response.statusText}`);
        }
        allMemesList = await response.json();
        
        renderMemesPage(1);
    } catch (error) {
        console.error("Chyba pri načítaní memečiek:", error);
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; font-size: 13px; color: var(--color-red); text-align: center; padding: 20px;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 20px; margin-bottom: 6px; display: block;"></i>
                Chyba pri načítaní archívu memečiek.
            </div>
        `;
        if (paginationContainer) paginationContainer.innerHTML = '';
    }
}

// Render a specific page of memes
function renderMemesPage(page) {
    const grid = document.getElementById('memes-homepage-grid');
    const paginationContainer = document.getElementById('memes-pagination');
    if (!grid) return;
    
    currentMemePage = page;
    
    if (allMemesList.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; font-size: 12px; color: var(--color-text-secondary); text-align: center; padding: 30px; border: 1px dashed rgba(255,255,255,0.08); border-radius: 6px; background: rgba(9,10,12,0.2);">
                <i class="fa-solid fa-images" style="margin-bottom: 8px; display: block; font-size: 24px; opacity: 0.6; color: var(--color-beige);"></i>
                Sem môžete pridať obrázky politických memečiek s dátumom v názve.
            </div>
        `;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    const totalPages = Math.ceil(allMemesList.length / memesPerPage);
    if (currentMemePage > totalPages) currentMemePage = totalPages;
    if (currentMemePage < 1) currentMemePage = 1;
    
    // Slice memes for the current page
    const startIdx = (currentMemePage - 1) * memesPerPage;
    const endIdx = startIdx + memesPerPage;
    const pageMemes = allMemesList.slice(startIdx, endIdx);
    
    let html = '';
    pageMemes.forEach(url => {
        html += `
            <div class="meme-item-wrapper" onclick="openMemeLightbox('${url}')" style="cursor: zoom-in; overflow: hidden; border-radius: 8px; border: 1.5px solid rgba(229, 211, 179, 0.25); background: rgba(9,10,12,0.5); transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); position: relative;">
                <img src="${url}" alt="Meme" style="width: 100%; height: auto; display: block; transition: transform 0.4s ease, opacity 0.4s ease; opacity: 0.9;">
                <div class="meme-zoom-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(9,10,12,0.45); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
                    <i class="fa-solid fa-magnifying-glass-plus" style="color: var(--color-beige); font-size: 24px;"></i>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
    
    // Render pagination buttons
    if (paginationContainer) {
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let pagHtml = '';
        
        // Prev button
        pagHtml += `<button class="btn-pagination" ${currentMemePage === 1 ? 'disabled' : ''} onclick="renderMemesPage(${currentMemePage - 1})"><i class="fa-solid fa-chevron-left"></i> Predchádzajúca</button>`;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            pagHtml += `<button class="btn-pagination ${currentMemePage === i ? 'active' : ''}" onclick="renderMemesPage(${i})">${i}</button>`;
        }
        
        // Next button
        pagHtml += `<button class="btn-pagination" ${currentMemePage === totalPages ? 'disabled' : ''} onclick="renderMemesPage(${currentMemePage + 1})">Nasledujúca <i class="fa-solid fa-chevron-right"></i></button>`;
        
        paginationContainer.innerHTML = pagHtml;
    }
}

// Fullscreen lightbox overlay for meme images
function openMemeLightbox(url) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(9, 10, 12, 0.93)';
    overlay.style.backdropFilter = 'blur(8px)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.cursor = 'zoom-out';
    overlay.onclick = () => overlay.remove();

    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '12px';
    img.style.border = '2px solid var(--color-beige)';
    img.style.boxShadow = '0 0 35px rgba(229, 211, 179, 0.45)';
    img.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';

    overlay.appendChild(img);
    document.body.appendChild(overlay);
}


window.addEventListener('DOMContentLoaded', () => {
    initLeftSidebarWidgets();
    initQuotesWidget();
    initBillsRotation();
    initGovernanceCostCounter();
    fetchMemes();
});
