// Ministries and Slovak Government Data
// Ministries and Slovak Government Data
const ministriesData = [
    {
        id: "po",
        abbr: "Úrad vicepremiéra",
        name: "Úrad podpredsedu vlády pre Plán obnovy a znalostnú ekonomiku",
        minister: "Tomáš Drucker",
        party: "HLAS - sociálna demokracia",
        icon: "fa-chart-line",
        category: "ekonomika",
        ministerImage: "assets/pm/tomas_drucker.jpg",
        url: "https://www.planobnovy.sk/",
        desc: "Zabezpečuje strategickú implementáciu Plánu obnovy a odolnosti SR. Po demisii Petra Kmeca v novembri 2025 bol riadením tohto úradu poverený minister školstva Tomáš Drucker.",
        competencies: [
            "Koordinácia čerpania a plnenia míľnikov Plánu obnovy SR",
            "Podpora výskumu, vývoja a inovácií (VAIA)",
            "Transformácia slovenskej ekonomiky smerom k znalostným odvetviam",
            "Lákanie a udržanie špičkových domácich aj zahraničných talentov"
        ]
    },
    {
        id: "mf",
        abbr: "MF SR",
        name: "Ministerstvo financií Slovenskej republiky",
        minister: "Ladislav Kamenický",
        party: "SMER - sociálna demokracia",
        icon: "fa-wallet",
        category: "ekonomika",
        ministerImage: "assets/pm/ladislav_kamenicky.jpg",
        url: "https://www.mfinance.gov.sk/",
        desc: "Zodpovedá za riadenie verejných financií, štátny rozpočet, daňovú a colnú politiku, správu štátneho dlhu a makroekonomické analýzy.",
        competencies: [
            "Návrh, schvaľovanie a kontrola štátneho rozpočtu",
            "Tvorba daňových zákonov a správa daní a ciel",
            "Regulácia finančného trhu, poisťovníctva a bankovníctva",
            "Makroekonomický dohľad a prognózy vývoja"
        ]
    },
    {
        id: "mh",
        abbr: "MH SR",
        name: "Ministerstvo hospodárstva Slovenskej republiky",
        minister: "Denisa Saková",
        party: "HLAS - sociálna demokracia",
        icon: "fa-industry",
        category: "ekonomika",
        ministerImage: "assets/pm/denisa_sakova.jpg",
        url: "https://www.mhsr.sk/",
        desc: "Ústredný orgán štátnej správy pre priemysel, energetiku, podporu podnikania, investície, inovácie a ochranu spotrebiteľa.",
        competencies: [
            "Podpora priemyselnej výroby a modernizácie",
            "Energetická politika a energetická bezpečnosť štátu",
            "Prílev zahraničných investícií (SARIO)",
            "Ochrana spotrebiteľa a regulácia vnútorného obchodu"
        ]
    },
    {
        id: "mo",
        abbr: "MO SR",
        name: "Ministerstvo obrany Slovenskej republiky",
        minister: "Robert Kaliňák",
        party: "SMER - sociálna demokracia",
        icon: "fa-shield-halved",
        category: "bezpecnost",
        ministerImage: "assets/pm/robert_kalinak.jpg",
        url: "https://www.mosr.sk/",
        desc: "Zodpovedá za obranu štátu, ochranu suverenity a plnenie medzinárodných vojenských záväzkov v rámci NATO a Európskej únie.",
        competencies: [
            "Riadenie a rozvoj Ozbrojených síl SR",
            "Tvorba a riadenie obrannej stratégie štátu",
            "Vojenské spravodajstvo a kybernetická bezpečnosť",
            "Plnenie spojeneckých záväzkov a misie v zahraničí"
        ]
    },
    {
        id: "mv",
        abbr: "MV SR",
        name: "Ministerstvo vnútra Slovenskej republiky",
        minister: "Matúš Šutaj Eštok",
        party: "HLAS - sociálna demokracia",
        icon: "fa-building-shield",
        category: "bezpecnost",
        ministerImage: "assets/pm/matus_sutaj_estok.jpg",
        url: "https://www.minv.sk/",
        desc: "Zabezpečuje vnútornú bezpečnosť, verejný poriadok, ochranu štátnych hraníc, integrovaný záchranný systém, civilnú ochranu a verejnú správu.",
        competencies: [
            "Riadenie a logistika Policajného zboru",
            "Civilná ochrana, boj proti požiarom a Hasičský zbor",
            "Vydávanie osobných dokladov, pasov a registrácia vozidiel",
            "Organizácia volieb, referend a agenda verejnej správy"
        ]
    },
    {
        id: "ms",
        abbr: "MS SR",
        name: "Ministerstvo spravodlivosti Slovenskej republiky",
        minister: "Boris Susko",
        party: "SMER - sociálna demokracia",
        icon: "fa-scale-balanced",
        category: "bezpecnost",
        ministerImage: "assets/pm/boris_susko.jpg",
        url: "https://www.justice.gov.sk/",
        desc: "Riadi a koordinuje všeobecné súdnictvo, väzenstvo, legislatívnu činnosť vlády a presadzovanie noriem právneho štátu.",
        competencies: [
            "Zabezpečenie chodu a logistiky súdnej sústavy",
            "Správa väzníc (Zbor väzenskej a justičnej stráže)",
            "Právna činnosť, tvorba kódexov a medzinárodné právo",
            "Boj proti korupcii a ochrana ľudských práv"
        ]
    },
    {
        id: "md",
        abbr: "MD SR",
        name: "Ministerstvo dopravy Slovenskej republiky",
        minister: "Jozef Ráž ml.",
        party: "SMER - sociálna demokracia",
        icon: "fa-road",
        category: "rozvoj",
        ministerImage: "assets/pm/jozef_raz.jpg",
        url: "https://www.mindop.sk/",
        desc: "Spravuje cestnú, železničnú, leteckú a vodnú dopravu, poštové služby, elektronické komunikácie, cestovný ruch a bytovú výstavbu.",
        competencies: [
            "Výstavba diaľnic a rýchlostných ciest (NDS)",
            "Prevádzka a modernizácia železničnej siete (ŽSR)",
            "Poštové a elektronické telekomunikačné služby",
            "Rozvoj bytovej politiky a dotačné schémy bývania"
        ]
    },
    {
        id: "mzp",
        abbr: "MŽP SR",
        name: "Ministerstvo životného prostredia Slovenskej republiky",
        minister: "Tomáš Taraba",
        party: "Slovenská národná strana (SNS)",
        icon: "fa-leaf",
        category: "rozvoj",
        ministerImage: "assets/pm/tomas_taraba.jpg",
        url: "https://www.minzp.sk/",
        desc: "Zabezpečuje ochranu prírody, krajiny, ovzdušia, vôd, geologický výskum a koordinuje environmentálne politiky v EÚ.",
        competencies: [
            "Riadenie národných parkov a chránených území",
            "Posudzovanie vplyvov projektov na prírodu (EIA)",
            "Odpadové hospodárstvo, znižovanie emisií a zelená energia",
            "Ochrana vodných zdrojov a protipovodňová ochrana"
        ]
    },
    {
        id: "mprv",
        abbr: "MPRV SR",
        name: "Ministerstvo pôdohospodárstva a rozvoja vidieka Slovenskej republiky",
        minister: "Richard Takáč",
        party: "SMER - sociálna demokracia",
        icon: "fa-tractor",
        category: "rozvoj",
        ministerImage: "assets/pm/richard_takac.jpg",
        url: "https://www.mpsr.sk/",
        desc: "Rozvíja poľnohospodárstvo, potravinárstvo, lesníctvo, poľovníctvo a koordinuje udržateľný rozvoj vidieckych oblastí.",
        competencies: [
            "Spravovanie poľnohospodárskych dotácií (PPA)",
            "Kontrola bezpečnosti a kvality potravín (ŠVPS)",
            "Udržateľné obhospodarovanie lesov a lesné hospodárstvo",
            "Ekologické hospodárenie a podpora lokálnych farmárov"
        ]
    },
    {
        id: "mirri",
        abbr: "MIRRI SR",
        name: "Ministerstvo investícií, regionálneho rozvoja a informatizácie Slovenskej republiky",
        minister: "Samuel Migaľ",
        party: "Nezávislý",
        icon: "fa-laptop-code",
        category: "rozvoj",
        ministerImage: "assets/pm/samuel_migal.jpg",
        url: "https://www.mirri.gov.sk/",
        desc: "Riadi európske štrukturálne a investičné fondy, podporuje najmenej rozvinuté okresy a vedie informatizáciu a digitálnu transformáciu štátu. Po odchode Richarda Rašiho bol v marci 2025 vymenovaný za nového ministra Samuel Migaľ.",
        competencies: [
            "Riadenie a zjednodušenie čerpania štrukturálnych fondov EÚ",
            "Podpora rozvoja menej rozvinutých okresov a obcí",
            "Informatizácia verejnej správy a modernizácia slovensko.sk",
            "Kybernetická bezpečnosť a štátne IT systémy"
        ]
    },
    {
        id: "mcrs",
        abbr: "MCRŠ SR",
        name: "Ministerstvo cestovného ruchu a športu Slovenskej republiky",
        minister: "Rudolf Huliak",
        party: "Slovenská národná strana (SNS)",
        icon: "fa-umbrella-beach",
        category: "rozvoj",
        ministerImage: "assets/pm/rudolf_huliak.jpg",
        url: "https://www.mindop.sk/cestovnyruchport",
        desc: "Zabezpečuje rozvoj a propagáciu cestovného ruchu na Slovensku, riadi štátnu politiku športu a financovanie športových zväzov. V marci 2025 vystriedal vo funkcii Dušana Keketiho minister Rudolf Huliak.",
        competencies: [
            "Propagácia Slovenska v zahraničí ako atraktívnej turistickej destinácie",
            "Rozvoj cykloturistiky, kúpeľníctva a regionálneho turizmu",
            "Financovanie športovej reprezentácie a veľkých športových podujatí",
            "Rozvoj športovej infraštruktúry a talentovanej mládeže"
        ]
    },
    {
        id: "mpsvr",
        abbr: "MPSVR SR",
        name: "Ministerstvo práce, sociálnych vecí a rodiny Slovenskej republiky",
        minister: "Erik Tomáš",
        party: "HLAS - sociálna demokracia",
        icon: "fa-hands-holding-child",
        category: "social",
        ministerImage: "assets/pm/erik_tomas.jpg",
        url: "https://www.employment.gov.sk/",
        desc: "Zodpovedá za sociálnu politiku, dôchodkové poistenie, podporu rodín s deťmi, politiku zamestnanosti a ochranu práv zamestnancov.",
        competencies: [
            "Dôchodkový systém a výplata dávok (Sociálna poisťovňa)",
            "Podpora rodiny (rodičovský príspevok, rodinné dávky)",
            "Služby zamestnanosti a podpora trhu práce (ÚPSVaR)",
            "Ochrana práv zamestnancov a inšpekcia práce"
        ]
    },
    {
        id: "mz",
        abbr: "MZ SR",
        name: "Ministerstvo zdravotníctva Slovenskej republiky",
        minister: "Kamil Šaško",
        party: "HLAS - sociálna demokracia",
        icon: "fa-heart-pulse",
        category: "social",
        ministerImage: "assets/pm/kamil_sasko.jpg",
        url: "https://www.health.gov.sk/",
        desc: "Zodpovedá za fungovanie zdravotného systému, sieť štátnych nemocníc, zdravotné poistenie a reguláciu liekovej politiky.",
        competencies: [
            "Financovanie a rozvoj verejnej siete nemocníc",
            "Regulácia a dohľad nad verejným zdravotným poistením",
            "Kategorizácia a kontrola cien liekov a zdravotníckych pomôcok",
            "Verejné zdravotníctvo a prevencia chorôb (ÚVZ SR)"
        ]
    },
    {
        id: "mzvez",
        abbr: "MZVEZ SR",
        name: "Ministerstvo zahraničných vecí a európskych záležitostí Slovenskej republiky",
        minister: "Juraj Blanár",
        party: "SMER - sociálna demokracia",
        icon: "fa-globe",
        category: "spolocnost",
        ministerImage: "assets/pm/juraj_blanar.jpg",
        url: "https://www.mzv.sk/",
        desc: "Zabezpečuje zahraničnú politiku SR, ochranu národných záujmov v medzinárodných organizáciách a konzulárnu ochranu pre občanov v cudzine.",
        competencies: [
            "Riadenie sieci ambasád a zastupiteľských úradov",
            "Reprezentácia SR v EÚ, NATO, OSN a ďalších zoskupeniach",
            "Ekonomická diplomacia a medzinárodný obchod",
            "Rozvojová pomoc a podpora slovenských menšín v zahraničí"
        ]
    },
    {
        id: "msvvm",
        abbr: "MŠVVM SR",
        name: "Ministerstvo školstva, výskumu, vývoja a mládeže Slovenskej republiky",
        minister: "Tomáš Drucker",
        party: "HLAS - sociálna demokracia",
        icon: "fa-graduation-cap",
        category: "spolocnost",
        ministerImage: "assets/pm/tomas_drucker.jpg",
        url: "https://www.minedu.sk/",
        desc: "Riadi a spolufinancuje predškolské, základné, stredné a vysoké školy, výskum, vývoj, mládežnícke organizácie a vedu.",
        competencies: [
            "Metodiky, školské osnovy a rozvoj vzdelávacieho systému",
            "Podpora výskumných a vývojových aktivít v SR",
            "Financovanie verejných univerzít a stredného odborného školstva",
            "Programy pre talentovanú mládež a rozvojové projekty"
        ]
    },
    {
        id: "mk",
        abbr: "MK SR",
        name: "Ministerstvo kultúry Slovenskej republiky",
        minister: "Martina Šimkovičová",
        party: "Slovenská národná strana (SNS) / Nominant",
        icon: "fa-masks-theater",
        category: "spolocnost",
        ministerImage: "assets/pm/martina_simkovicova.jpg",
        url: "https://www.culture.gov.sk/",
        desc: "Riadi štátnu starostlivosť o kultúrne dedičstvo, štátny jazyk, cirkvi, umeleckú tvorbu, múzeá, galérie a slobodu médií.",
        competencies: [
            "Ochrana pamiatok a obnova kultúrneho dedičstva (hrady, skanzeny)",
            "Správa dotácií pre živé umenie a audiovizuálny fond",
            "Správa štátnych divadiel (SND), múzeí (SNM) a galérií (SNG)",
            "Ochrana štátneho jazyka a menšinových kultúr"
        ]
    }
];

let activeCategory = "all";
let activeIndex = 0;
let filteredList = [...ministriesData];

function initMinistriesList() {
    const list = document.getElementById('subpage-ministries-list');
    if (!list) return;
    list.innerHTML = '';
    
    // Filter data
    if (activeCategory === "all") {
        filteredList = [...ministriesData];
    } else {
        filteredList = ministriesData.filter(m => m.category === activeCategory);
    }
    
    if (filteredList.length === 0) {
        list.innerHTML = `<div style="color: var(--color-text-secondary); text-align: center; padding: 20px;">Žiadne ministerstvá v tejto kategórii.</div>`;
        const panel = document.getElementById('ministry-detail-panel');
        if (panel) {
            panel.innerHTML = `
                <div class="bill-detail-placeholder">
                    <i class="fa-solid fa-circle-info"></i>
                    <p>Žiadne položky na zobrazenie.</p>
                </div>
            `;
        }
        return;
    }
    
    filteredList.forEach((m, idx) => {
        const item = document.createElement('div');
        item.className = 'subpage-bill-item';
        item.setAttribute('data-ministry-idx', idx);
        item.innerHTML = `
            <div class="subpage-bill-header">
                <span class="bill-status status-submitted"><i class="fa-solid ${m.icon}"></i> ${m.abbr}</span>
                <span class="subpage-bill-date" style="font-size: 9px;"><i class="fa-solid fa-tag"></i> ${m.category.toUpperCase()}</span>
            </div>
            <strong class="subpage-bill-title" style="font-size: 12.5px; line-height: 1.4; display: block; margin: 4px 0;">${m.name}</strong>
            <span class="subpage-bill-author"><i class="fa-solid fa-user-tie"></i> Minister: <strong>${m.minister}</strong></span>
        `;
        
        item.addEventListener('click', () => {
            selectMinistry(idx);
        });
        
        list.appendChild(item);
    });

    // Auto-select first ministry in the filtered list
    selectMinistry(0);
}

function selectMinistry(index) {
    activeIndex = index;
    const items = document.querySelectorAll('.subpage-bill-item');
    items.forEach(item => {
        if (parseInt(item.getAttribute('data-ministry-idx')) === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const m = filteredList[index];
    const panel = document.getElementById('ministry-detail-panel');
    if (!panel || !m) return;

    let competenciesHTML = m.competencies.map(c => `<li><i class="fa-solid fa-circle-check text-beige" style="margin-right: 8px; font-size: 10px;"></i>${c}</li>`).join('');

    panel.innerHTML = `
        <div class="bill-detail-content" style="animation: bioFadeIn 0.25s cubic-bezier(0.25, 0.8, 0.25, 1); display: flex; flex-direction: column; gap: 16px;">
            <!-- Header layout with icon and abbreviation -->
            <div style="display: flex; gap: 14px; align-items: center;">
                <div style="width: 46px; height: 46px; border-radius: 8px; background: rgba(229, 211, 179, 0.08); border: 1.5px solid var(--color-beige); display: flex; align-items: center; justify-content: center; font-size: 20px; color: var(--color-beige); flex-shrink: 0;">
                    <i class="fa-solid ${m.icon}"></i>
                </div>
                <div>
                    <h3 style="margin: 0; color: #ffffff; font-family: 'Outfit'; font-size: 16px; line-height: 1.3;">${m.name}</h3>
                    <span style="font-size: 10px; text-transform: uppercase; color: var(--color-text-secondary); letter-spacing: 0.5px; font-weight: 600;">${m.abbr}</span>
                </div>
            </div>

            <!-- Minister Info Card -->
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 10px; padding: 12px; display: flex; align-items: center; gap: 14px;">
                <div style="width: 50px; height: 50px; border-radius: 50%; border: 1.5px solid var(--color-beige); overflow: hidden; flex-shrink: 0; background: rgba(255,255,255,0.05);">
                    <img src="${m.ministerImage}" alt="${m.minister}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/pm/slovak.png'">
                </div>
                <div>
                    <h4 style="margin: 0 0 2px 0; color: var(--color-beige); font-family: 'Outfit'; font-size: 14px;">${m.minister}</h4>
                    <p style="margin: 0 0 2px 0; font-size: 10.5px; color: var(--color-text-secondary); font-weight: 500;">Minister / Vedúci úradu</p>
                    <span style="font-size: 9px; padding: 2px 6px; background: rgba(255,255,255,0.05); border-radius: 3px; color: #ffffff;"><i class="fa-solid fa-users text-silver" style="margin-right: 4px;"></i>${m.party}</span>
                </div>
            </div>

            <!-- Description -->
            <div>
                <h4 style="margin: 0 0 6px 0; color: #ffffff; font-family: 'Outfit'; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Hlavné zameranie a popis</h4>
                <p style="margin: 0; font-size: 12px; line-height: 1.5; color: rgba(255, 255, 255, 0.85);">${m.desc}</p>
            </div>

            <!-- Competencies / Key Areas -->
            <div>
                <h4 style="margin: 0 0 8px 0; color: #ffffff; font-family: 'Outfit'; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Kľúčové kompetencie</h4>
                <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 11.5px; color: rgba(255,255,255,0.75);">
                    ${competenciesHTML}
                </ul>
            </div>

            <!-- Link -->
            <a href="${m.url}" target="_blank" class="btn-parliament-composition" style="align-self: flex-start; width: auto; font-size: 11.5px; padding: 8px 14px; margin-top: auto;">
                <i class="fa-solid fa-circle-arrow-up-right"></i> Prejsť na oficiálny web ministerstva
            </a>
        </div>
    `;
}

function filterCategory(category) {
    activeCategory = category;
    
    // Update active button state
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => {
        if (btn.id === `btn-filter-${category}`) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    initMinistriesList();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initMinistriesList();
});
