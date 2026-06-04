import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "faktograf.db")

def init_db():
    # Remove old database file to force schema refresh
    if os.path.exists(DB_PATH):
        try:
            os.remove(DB_PATH)
            print("[+] Old database removed successfully for schema update.")
        except Exception as e:
            print(f"[-] Could not remove database file: {e}")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 1. Create table for Slovakia Stats (1993 - 2025)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS slovakia_stats (
            year INTEGER PRIMARY KEY,
            gdp_growth REAL,
            unemployment REAL,
            inflation REAL,
            public_debt REAL,
            avg_wage REAL,
            budget_balance REAL,
            trade_balance REAL,
            gdp_ppp REAL,
            fdi REAL,
            pop_change REAL,
            real_wage_growth REAL,
            min_wage REAL,
            corruption_index REAL,
            rank_gdp_ppp REAL,
            rank_hdi REAL,
            rank_press_freedom REAL,
            rank_competitiveness REAL,
            prime_minister TEXT,
            coalition TEXT,
            note TEXT
        )
    """)
    
    # 2. Create table for States comparison (1920 - 2020)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS czechoslovakia_stats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            year INTEGER,
            country TEXT,
            gdp_capita REAL,
            life_expectancy REAL,
            infant_mortality REAL,
            urbanization REAL,
            industrial_index REAL,
            avg_wage_usd REAL,
            leader TEXT,
            system TEXT,
            note TEXT,
            events_pos TEXT,
            events_neg TEXT,
            UNIQUE(year, country)
        )
    """)
    
    # Accurate historical dataset for Slovakia (1993 - 2025)
    slovakia_data = [
        (1993, -3.7, 12.2, 23.2, 22.5, 178.5, -7.2, -824, 8430, 150, 18.2, -5.2, 73, 30, 55.0, 42.0, 65.0, 58.0, "Vladimír Mečiar", "HZDS, SNS", "Vznik samostatnej Slovenskej republiky, rozdelenie meny a zavedenie slovenskej koruny."),
        (1994, 6.2, 13.7, 13.4, 25.1, 208.7, -6.4, 85, 9140, 220, 14.1, 3.5, 81, 32, 54.0, 42.0, 60.0, 56.0, "Jozef Moravčík", "DÚ, KDH, SDĽ, NDS", "Pád druhej vlády V. Mečiara, dočasná vláda a predčasné voľby v jeseni."),
        (1995, 5.8, 13.1, 9.9, 22.0, 238.8, -2.3, -230, 9810, 210, 9.3, 4.0, 90, 33, 53.0, 41.0, 62.0, 55.0, "Vladimír Mečiar", "HZDS, SNS, ZRS", "Tretia vláda V. Mečiara, začiatok rozsiahlej privatizácie štátnych podnikov."),
        (1996, 6.1, 11.3, 5.8, 25.3, 270.6, -4.1, -2012, 10560, 310, 7.1, 7.0, 90, 34, 51.0, 41.0, 66.0, 57.0, "Vladimír Mečiar", "HZDS, SNS, ZRS", "Obdobie mečiarizmu, rastúca medzinárodná izolácia SR a vylúčenie z rozširovania NATO."),
        (1997, 4.8, 11.8, 6.1, 28.6, 306.2, -5.5, -2210, 11210, 200, 6.8, 6.6, 96, 35, 50.0, 40.0, 68.0, 60.0, "Vladimír Mečiar", "HZDS, SNS, ZRS", "Zmarené celoštátne referendum o vstupe do NATO a priamej voľbe prezidenta."),
        (1998, 4.4, 12.5, 6.7, 31.2, 332.1, -4.8, -2514, 11840, 512, 4.4, 2.5, 100, 36, 49.0, 40.0, 55.0, 58.0, "Mikuláš Dzurinda", "SDK, SDĽ, SOP, SMK", "Zlomové parlamentné voľby, porážka HZDS a vznik širokej prointegračnej koalície."),
        (1999, 0.0, 16.2, 10.6, 43.8, 355.9, -7.1, -1103, 12110, 350, 3.8, -3.1, 120, 37, 48.0, 39.0, 45.0, 54.0, "Mikuláš Dzurinda", "SDK, SDĽ, SOP, SMK", "Balíčky úsporných opatrení na stabilizáciu ekonomiky, prvá priama voľba prezidenta."),
        (2000, 1.2, 18.6, 12.0, 50.3, 379.7, -12.3, -890, 12640, 2100, 2.1, -4.9, 133, 35, 47.0, 39.0, 38.0, 50.0, "Mikuláš Dzurinda", "SDK, SDĽ, SOP, SMK", "Masívna reštrukturalizácia a ozdravenie štátnych bánk pred predajom, vstup SR do OECD."),
        (2001, 3.3, 19.2, 7.3, 48.9, 410.5, -6.5, -2130, 13410, 1800, -1.2, 0.8, 146, 37, 46.0, 38.0, 32.0, 48.0, "Mikuláš Dzurinda", "SDK, SDĽ, SOP, SMK", "Decentralizácia verejnej správy a vznik samosprávnych krajov (VÚC)."),
        (2002, 4.5, 17.8, 3.3, 43.4, 448.6, -8.1, -2125, 14380, 4100, -0.5, 5.8, 163, 37, 45.0, 37.0, 17.0, 44.0, "Mikuláš Dzurinda", "SDKÚ, KDH, ANO, SMK", "Druhá vláda M. Dzurindu, kľúčová privatizácia plynárenstva a energetiky (SPP)."),
        (2003, 5.4, 15.6, 8.5, 42.4, 476.8, -2.8, -614, 15510, 1400, 0.8, -2.0, 185, 37, 43.0, 36.0, 12.0, 40.0, "Mikuláš Dzurinda", "SDKÚ, KDH, ANO, SMK", "Úspešné referendum o vstupe Slovenska do EÚ s účasťou 52,1 %."),
        (2004, 5.3, 14.3, 7.5, 41.5, 525.3, -2.4, -1154, 16840, 1100, 1.2, 2.5, 202, 40, 41.0, 35.0, 8.0, 37.0, "Mikuláš Dzurinda", "SDKÚ, KDH, ANO, SMK", "1. máj: Vstup SR do EÚ a NATO. Spustenie reformy s rovnou daňou 19 %."),
        (2005, 6.4, 11.6, 2.7, 34.2, 573.1, -2.8, -2014, 18630, 1900, 1.5, 6.3, 216, 43, 39.0, 35.0, 10.0, 36.0, "Mikuláš Dzurinda", "SDKÚ, KDH, ANO, SMK", "Summit prezidentov Busha a Putina v Bratislave, automobilový rozvoj."),
        (2006, 8.5, 10.4, 4.5, 30.5, 622.7, -3.2, -2410, 20970, 3800, 2.1, 3.9, 236, 47, 38.0, 34.0, 12.0, 37.0, "Robert Fico", "Smer-SD, SNS, ĽS-HZDS", "Prvá vláda R. Fica, zrušenie poplatkov u lekára, príchod automobiliek."),
        (2007, 10.8, 8.4, 2.8, 29.6, 668.7, -1.9, -810, 23640, 2400, 3.4, 4.3, 252, 49, 36.0, 34.0, 15.0, 38.0, "Robert Fico", "Smer-SD, SNS, ĽS-HZDS", "Ekonomický vrchol (Tatranský tiger) s rastom HDP 10,8 %, vstup do Schengenu."),
        (2008, 5.6, 7.7, 4.6, 27.8, 723.0, -2.1, -720, 25450, 1800, 5.6, 3.3, 269, 50, 35.0, 34.0, 17.0, 40.0, "Robert Fico", "Smer-SD, SNS, ĽS-HZDS", "Zafixovanie kurzu slovenskej koruny voči euru na úrovni 30,126 SKK/EUR."),
        (2009, -5.5, 12.1, 1.6, 35.6, 744.5, -7.8, 946, 24210, -50, 6.2, 1.4, 296, 45, 37.0, 35.0, 22.0, 43.0, "Robert Fico", "Smer-SD, SNS, ĽS-HZDS", "1. január: Prijatie meny Euro. Prepuknutie celosvetovej finančnej krízy."),
        (2010, 5.1, 14.4, 1.0, 41.0, 769.0, -7.5, 120, 25740, 1200, 4.8, 2.2, 308, 43, 38.0, 35.0, 28.0, 47.0, "Iveta Radičová", "SDKÚ-DS, SaS, KDH, Most-Híd", "Vznik prvej slovenskej vlády na čele s ženou, začiatok konsolidácie financií."),
        (2011, 2.8, 13.6, 3.9, 43.5, 786.0, -4.3, 1012, 26860, 1500, 3.2, -1.7, 317, 40, 38.0, 35.0, 30.0, 49.0, "Iveta Radičová", "SDKÚ-DS, SaS, KDH, Most-Híd", "Pád vlády kvôli nesúhlasu koaličnej SaS s hlasovaním o navýšení eurovalu."),
        (2012, 1.9, 14.0, 3.6, 52.2, 805.0, -4.3, 3570, 27740, 1100, 4.1, -1.2, 327, 46, 39.0, 36.0, 33.0, 52.0, "Robert Fico", "Smer-SD", "Druhá vláda R. Fica (jednofarebná vláda po víťazstve vo voľbách)."),
        (2013, 1.0, 14.1, 1.4, 54.7, 824.0, -2.7, 4280, 28430, 650, 3.8, 1.0, 338, 47, 39.0, 36.0, 35.0, 54.0, "Robert Fico", "Smer-SD", "Rekordné prebytky exportnej bilancie poháňané masívnou výrobou áut."),
        (2014, 2.7, 12.8, -0.1, 53.6, 858.0, -2.7, 3120, 29840, 512, 4.2, 4.2, 352, 50, 40.0, 37.0, 36.0, 54.0, "Robert Fico", "Smer-SD", "Zavedenie bezplatného cestovania vlakom pre študentov a dôchodcov."),
        (2015, 4.8, 11.5, -0.3, 52.3, 883.0, -2.6, 3540, 31450, 750, 4.8, 3.2, 380, 51, 40.0, 38.0, 38.0, 55.0, "Robert Fico", "Smer-SD", "Deflácia a príchod investície britskej automobilky Jaguar Land Rover do Nitry."),
        (2016, 2.1, 9.7, -0.5, 51.8, 912.0, -2.2, 3610, 32610, -120, 5.2, 3.8, 405, 51, 41.0, 39.0, 42.0, 56.0, "Robert Fico", "Smer-SD, SNS, Most-Híd, Sieť", "Tretia koaličná vláda R. Fica, prvé predsedníctvo SR v Rade Európskej únie."),
        (2017, 3.0, 8.1, 1.3, 50.9, 954.0, -1.0, 2840, 34120, 1840, 6.1, 3.3, 435, 50, 41.0, 40.0, 45.0, 55.0, "Robert Fico", "Smer-SD, SNS, Most-Híd", "Nezamestnanosť klesá pod 8 %, krajina profituje z globálnej konjunktúry."),
        (2018, 4.0, 6.5, 2.5, 49.4, 1013.0, -1.0, 2120, 36100, 1210, 5.3, 3.6, 480, 50, 42.0, 41.0, 52.0, 56.0, "Peter Pellegrini", "Smer-SD, SNS, Most-Híd", "Demisia R. Fica po protestoch po vražde J. Kuciaka, vznik kabinetu P. Pellegriniho."),
        (2019, 2.5, 5.8, 2.7, 48.0, 1092.0, -1.3, 1012, 37540, 940, 4.8, 5.0, 520, 50, 42.0, 41.0, 50.0, 55.0, "Peter Pellegrini", "Smer-SD, SNS, Most-Híd", "Dosiahnutie historicky najnižšej miery nezamestnanosti (5,8 %)."),
        (2020, -3.4, 6.7, 1.9, 59.7, 1133.0, -5.4, 2540, 36810, 120, -1.2, 1.9, 580, 49, 43.0, 42.0, 49.0, 57.0, "Igor Matovič", "OĽaNO, Sme rodina, SaS, Za ľudí", "Víťazstvo OĽaNO vo voľbách a nástup globálnej pandémie vírusu COVID-19."),
        (2021, 4.8, 6.8, 3.2, 61.0, 1211.0, -5.4, 1410, 39150, 850, -5.4, 3.5, 623, 52, 43.0, 42.0, 45.0, 57.0, "Eduard Heger", "OĽaNO, Sme rodina, SaS, Za ľudí", "Rekonštrukcia vlády po kríze s dovozom vakcíny Sputnik V, premiérom sa stáva E. Heger."),
        (2022, 1.8, 6.1, 12.8, 57.8, 1304.0, -2.0, -1890, 41250, 1240, -1.5, -4.5, 646, 53, 44.0, 43.0, 27.0, 58.0, "Eduard Heger", "OĽaNO, Sme rodina, Za ľudí", "Vojna na Ukrajine, energetická kríza, vysoká dvojciferná inflácia a odchod SaS do opozície."),
        (2023, 1.6, 5.8, 10.5, 56.0, 1430.0, -4.9, 1540, 42800, 1050, 0.5, -1.0, 700, 53, 44.0, 43.0, 17.0, 60.0, "Ľudovít Ódor", "Úradnícka vláda", "Prvá úradnícka vláda v histórii SR. Jesenné predčasné voľby a vznik 4. vlády R. Fica."),
        (2024, 2.1, 5.4, 2.5, 58.5, 1524.0, -5.8, 1820, 44100, 1150, 1.2, 4.0, 750, 53, 45.0, 44.0, 28.0, 62.0, "Robert Fico", "Smer-SD, Hlas-SD, SNS", "Atentát na R. Fica v Handlovej, schválenie konsolidácie a zvolenie P. Pellegriniho za prezidenta."),
        (2025, 2.2, 5.2, 2.7, 59.8, 1620.0, -4.7, 2100, 45600, 1250, 1.5, 3.5, 816, 54, 45.0, 44.0, 35.0, 63.0, "Robert Fico", "Smer-SD, Hlas-SD, SNS", "Začiatok platnosti veľkého konsolidačného balíčka a stabilizácia reálnych miezd.")
    ]
    
    # 3. Populate Slovakia Stats table
    cursor.executemany("""
        INSERT OR REPLACE INTO slovakia_stats (
            year, gdp_growth, unemployment, inflation, public_debt, avg_wage, 
            budget_balance, trade_balance, gdp_ppp, fdi, pop_change,
            real_wage_growth, min_wage, corruption_index,
            rank_gdp_ppp, rank_hdi, rank_press_freedom, rank_competitiveness,
            prime_minister, coalition, note
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, slovakia_data)

    # Historical Decadal Dataset (1920 - 2020) for Czechoslovakia/Slovakia and benchmarks
    historical_data = [
        # 1920
        (1920, "Československo", 3100, 47.0, 150.0, 35.0, 40.0, 15.0, "Tomáš G. Masaryk", "Demokratická republika", "Vznik samostatnej ČSR po rozpade Rakúsko-Uhorska, prijatie demokratickej ústavy a zavedenie československej koruny.", 
         "Vznik spoločného štátu Slovákov a Čechov | Prijatie ústavy garantujúcej občianske slobody | Zavedenie stabilnej československej koruny",
         "Hospodársky rozvrat po 1. svetovej vojne | Pohraničné konflikty s Maďarskom a Poľskom | Vysoká úmrtnosť na infekčné choroby"),
        (1920, "Rakúsko", 3200, 49.0, 130.0, 48.0, 35.0, 18.0, "Michael Hainisch", "Spolková republika", "Vznik prvej rakúskej republiky po rozpade monarchie, boj s ťažkou hyperinfláciou.", "Vznik demokratického spolkového zriadenia | Stabilizácia nových hraníc", "Katastrofálna hyperinflácia a znehodnotenie meny | Strata priemyselného zázemia v Čechách"),
        (1920, "Nemecko", 3500, 50.0, 125.0, 50.0, 30.0, 12.0, "Friedrich Ebert", "Weimarská republika", "Vznik republiky po porážke v vojne, revolučné nepokoje a reparácie.", "Vyhlásenie demokratickej ústavy vo Weimare | Koniec cisárskeho absolutizmu", "Poníženie z Versailleskej zmluvy a strata území | Ťažké reparácie zaťažujúce ekonomiku"),
        (1920, "Fínsko", 2400, 45.0, 120.0, 16.0, 25.0, 10.0, "Kaarlo Juho Ståhlberg", "Demokratická republika", "Fínsko získalo nezávislosť od Ruska, no prešlo si následnou občianskou vojnou.", "Upevnenie nezávislosti a medzinárodné uznanie | Prijatie novej republikánskeis ústavy", "Následky krvavej občianskej vojny z roku 1918 | Veľká chudoba na vidieku a nedostatok tovarov"),
        (1920, "USA", 5500, 54.0, 86.0, 51.0, 45.0, 100.0, "Woodrow Wilson", "Prezidentská republika", "USA po vojne zažívajú masívny hospodársky rozmach a rýchlu technologickú modernizáciu.", "Ekonomická expanzia a rýchla elektrifikácia miest | Rýchly rozvoj automobilového priemyslu Ford", "Zavedenie prohibície vyvolávajúce rozvoj mafie | Rasové napokoje a vlna robotníckych štrajkov"),
        (1920, "Veľká Británia", 4900, 56.0, 80.0, 75.0, 60.0, 45.0, "David Lloyd George", "Konštitučná monarchia", "Víťazstvo v prvej svetovej vojne, no sprevádzané obrovským štátnym dlhom a rozpadom impéria.", "Rozšírenie britského impéria o mandátne územia | Zavedenie sociálnych reforiem pre veteránov", "Obrovský vojnový dlh zaťažujúci štátny rozpočet | Írska vojna za nezávislosť"),

        # 1930
        (1930, "Československo", 3900, 54.0, 115.0, 40.0, 65.0, 20.0, "Tomáš G. Masaryk", "Demokratická republika", "Obdobie hospodárskeho vrcholu a následný začiatok Veľkej hospodárskej krízy.",
         "Vysoká úroveň priemyselného exportu (zbrane, sklo, obuv Baťa) | ČSR ako stabilný ostrov demokracie v strednej Európe | Rozkvet kultúry a moderného školstva",
         "Nástup Veľkej hospodárskej krízy s prudkým prepadom exportu | Rastúca nezamestnanosť v nemeckom pohraničí | Hľadanie politického konsenzu širokej koalície"),
        (1930, "Rakúsko", 3800, 55.0, 95.0, 50.0, 55.0, 24.0, "Wilhelm Miklas", "Spolková republika", "Hlboká hospodárska kríza vedúca k radikalizácii a postupnému koncu demokracie.", "Kultúrny rozkvet Viedne | Stabilizácia meny (schilling)", "Ťažký dopad krízy a krach kľúčovej banky Creditanstalt | Pouličné zrážky medzi pravicou a ľavicou"),
        (1930, "Nemecko", 4300, 57.0, 85.0, 53.0, 60.0, 28.0, "Paul von Hindenburg", "Weimarská republika", "Politická nestabilita spojená s masovou nezamestnanosťou a nárastom vplyvu NSDAP.", "Rýchla modernizácia dopravy a rozhlasového vysielania | Rozkvet kultúry v Berlíne", "Rekordná nezamestnanosť (vyše 30 %) po krachu na Wall Street | Vzostup extrémizmu (Hitler)"),
        (1930, "Fínsko", 3100, 53.0, 88.0, 22.0, 40.0, 18.0, "Lauri Kristian Relander", "Demokratická republika", "Vzostup antikomunistického hnutia Lapua pri stabilnom hospodárskom raste.", "Rozvoj lesného a papierenského priemyslu | Úspešná agrárna reforma", "Pokus o pravicový prevrat (hnutie Lapua) | Zákaz komunistickej strany"),
        (1930, "USA", 6200, 60.0, 65.0, 56.0, 55.0, 120.0, "Herbert Hoover", "Prezidentská republika", "Začiatok Veľkej depresie (krach na Wall Street) s extrémnou nezamestnanosťou.", "Elektrifikácia vidieka | Dokončenie stavby mrakodrapu Empire State Building", "Prepuknutie Veľkej hospodárskej krízy | Masové zatváranie bánk a strata úspor miliónov ľudí"),
        (1930, "Veľká Británia", 5400, 61.0, 60.0, 77.0, 70.0, 52.0, "Ramsay MacDonald", "Konštitučná monarchia", "Vznik národnej vlády na riešenie hospodárskej krízy a devalvácia libry.", "Vytvorenie systému Commonwealthu | Devalvácia libry pomáhajúca exportu", "Vysoká nezamestnanosť v priemyselných oblastiach | Škrty v sociálnych výdavkoch a nepokoje"),

        # 1950
        (1950, "Československo", 3500, 62.0, 75.0, 45.0, 100.0, 35.0, "Klement Gottwald", "Komunistický režim (KSČ)", "Začiatok komunistickej diktatúry, znárodňovanie, kolektivizácia a politické procesy.",
         "Rýchla obnova vojnou zničeného hospodárstva | Bezplatné základné zdravotníctvo a školstvo pre všetkých | Industrializácia Slovenska (ťažký priemysel)",
         "Politický teror, popravy a zatváranie oponentov (Milada Horáková) | Násilná kolektivizácia poľnohospodárstva a likvidácia živnostníkov | Podriadenie ekonomiky diktátu ZSSR"),
        (1950, "Rakúsko", 3700, 64.0, 62.0, 52.0, 100.0, 45.0, "Karl Renner", "Spolková republika", "Povojnové rozdelenie na 4 zóny, prijímanie pomoci z Marshallovho plánu.", "Úspešná stabilizácia meny a potlačenie komunistického štrajku | Pomoc z Marshallovho plánu", "Krajina je okupovaná spojencami | Obrovské škody po bombardovaní a vojne"),
        (1950, "Nemecko", 4200, 65.0, 55.0, 58.0, 100.0, 60.0, "Theodor Heuss / K. Adenauer", "Západné Nemecko (SRN)", "Rozdelenie Nemecka, začiatok západonemeckého hospodárskeho zázraku.", "Menová reforma (nemecká marka) | Začiatok hospodárskeho zázraku (Wirtschaftswunder)", "Definitívne rozdelenie Nemecka a strata východných území | Milióny utečencov z východu"),
        (1950, "Fínsko", 4200, 63.0, 44.0, 32.0, 100.0, 55.0, "Juho Kusti Paasikivi", "Demokratická republika", "Splácanie vojnových reparácií ZSSR, politika neutrality (Paasikiviho línia).", "Splatenie drvivej väčšiny reparácií ZSSR včas | Vybudovanie silného kovospracujúceho priemyslu", "Neustály politický tlak zo strany ZSSR | Strata územia Karelie a presídlenie 400 000 ľudí"),
        (1950, "USA", 9500, 68.0, 29.0, 64.0, 100.0, 250.0, "Harry S. Truman", "Prezidentská republika", "USA zažívajú povojnový baby boom, ekonomickú dominanciu a začiatok studenej vojny.", "Hospodárska dominancia (polovica svetovej produkcie) | Podpis Marshallovho plánu", "Začiatok McCarthyizmu (hon na komunistov) | Vypuknutie vojny v Kórei"),
        (1950, "Veľká Británia", 6900, 69.0, 27.0, 79.0, 100.0, 95.0, "Clement Attlee", "Konštitučná monarchia", "Znárodňovanie kľúčových odvetví a zavedenie bezplatného zdravotníctva (NHS).", "Vznik Národnej zdravotnej služby (NHS) zadarmo | Znárodnenie uhoľných baní a železníc", "Pretrvávajúci prídelový systém na potraviny až do 1954 | Úpadok pozície svetovej veľmoci"),

        # 1960
        (1960, "Československo", 5100, 70.4, 22.0, 52.0, 210.0, 60.0, "Antonín Novotný", "Komunistický režim (KSČ)", "Vyhlásenie socialistickej ústavy (ČSSR). Vynikajúce zdravotnícke štatistiky.",
         "ČSSR dosahuje jednu z najnižších detských úmrtností na svete | Úspešné zavedenie masovej panelovej výstavby bytov pre mladé rodiny | Zahraničný úspech čs. dizajnu a kultúry (Expo 58)",
         "Vyčerpanie extenzívneho ekonomického rastu a kolaps päťročnice | Prísna cenzúra a obmedzenie cestovania na Západ | Uväznenie reformných komunistov a spisovateľov"),
        (1960, "Rakúsko", 6500, 68.5, 37.0, 56.0, 180.0, 90.0, "Adolf Schärf", "Spolková republika", "Rakúsko ako neutrálny štát zažíva stabilitu a rast cestovného ruchu.", "Rýchly rast životnej úrovne a sociálneho štátu | Rozvoj cestovného ruchu v Alpách", "Nedostatok pracovnej sily riešený náborom gastarbeiterov | Vysoká úmrtnosť na cestách"),
        (1960, "Nemecko", 7800, 69.7, 34.0, 68.0, 210.0, 130.0, "Heinrich Lübke / K. Adenauer", "Západné Nemecko (SRN)", "Vrchol hospodárskeho zázraku, nárast automobilizmu a výstavba diaľnic.", "Plná zamestnanosť a masívny export automobilov (VW Chrobák) | Rýchly rast miezd a spotreby", "Postavenie Berlínskeho múru (1961) | Politické napätie v rozdelenom Berlíne"),
        (1960, "Fínsko", 6000, 68.8, 21.0, 38.0, 170.0, 110.0, "Urho Kekkonen", "Demokratická republika", "Neutralita a ekonomické prepojenie so Západom aj Východom (Kekkonenova éra).", "Hospodárska zmluva s EFTA posilňujúca obchod so Západom | Rýchly rozvoj dizajnu a exportu", "Silný vplyv ZSSR na fínsku politiku (finlandizácia) | Emigrácia Fínov za prácou do Švédska"),
        (1960, "USA", 11300, 69.7, 26.0, 70.0, 140.0, 380.0, "Dwight D. Eisenhower", "Prezidentská republika", "Zlaté obdobie americkej predmestskej kultúry a začiatok vesmírnych pretekov.", "Rozvoj medzištátnej diaľničnej siete (Interstate) | Počiatky vesmírneho programu NASA", "Rasová segregácia a napätie na juhu USA | Hrozba jadrovej vojny po kubánskej revolúcii"),
        (1960, "Veľká Británia", 8600, 71.1, 22.0, 80.0, 130.0, 180.0, "Harold Macmillan", "Konštitučná monarchia", "Kultúrny rozkvet (Swinging London, Beatles) a rast životnej úrovne.", "Vysoká životná úroveň (Macmillan: 'Nikdy ste sa nemali tak dobre') | Boom britskej populárnej kultúry", "Postupná dekolonizácia a strata afrických kolónií | Zaostávanie v raste za Nemeckom"),

        # 1970
        (1970, "Československo", 6800, 69.6, 20.0, 60.0, 340.0, 100.0, "Ludvík Svoboda / G. Husák", "Komunistický režim (KSČ)", "Obdobie po potlačení Pražskej jari, začiatok tvrdej normalizácie a čistiek v spoločnosti.",
         "Masívna bytová výstavba (sídliská) a stabilné ceny energií | Bezpečnosť práce a sociálne istoty | Dokončenie prvých úsekov diaľnice D1 a pražského metra",
         "Okupácia vojskami Varšavskej zmluvy a strata suverenity ČSSR | Čistky v strane, prepúšťanie vedcov a zákaz kultúrnych diel | Technologické zaostávanie priemyslu za západným svetom"),
        (1970, "Rakúsko", 9600, 70.1, 26.0, 62.0, 280.0, 180.0, "Franz Jonas / Bruno Kreisky", "Spolková republika", "Obdobie kancelára Bruna Kreiského, reformy školstva a modernizácia.", "Bezplatné učebnice a doprava pre študentov | Reformy rodinného práva a modernizácia krajiny", "Dopady prvého ropného šoku (1973) | Rastúci štátny dlh kvôli sociálnym programom"),
        (1970, "Nemecko", 10800, 70.6, 23.0, 72.0, 320.0, 290.0, "Gustav Heinemann / Willy Brandt", "Západné Nemecko (SRN)", "Nová východná politika (Ostpolitik) Willyho Brandta, zmierňovanie napätia.", "Uznanie povojnových hraníc a zmierenie s Východom | Silná sociálna sieť a mzdy", "Dopady ropnej krízy a nárast inflácie | Terorizmus extrémistickej skupiny RAF"),
        (1970, "Fínsko", 9000, 70.0, 13.0, 51.0, 290.0, 230.0, "Urho Kekkonen", "Demokratická republika", "Podpis zmluvy o voľnom obchode s EHS, vybudovanie severského sociálneho štátu.", "Podpis zmluvy o voľnom obchode s EHS | Hostiteľ historickej konferencie KBSE v Helsinkách (1975)", "Pretrvávajúca závislosť od obchodu so ZSSR | Vysoké daňové zaťaženie obyvateľstva"),
        (1970, "USA", 15000, 70.8, 20.0, 74.0, 200.0, 620.0, "Richard Nixon", "Prezidentská republika", "Obdobie hospodárskej stagflácie, ropného šoku a ukončenia vojny vo Vietname.", "Úspešné pristátie na Mesiaci (program Apollo) | Otvorenie vzťahov s Čínou", "Ropný šok a vysoká inflácia spojená s nezamestnanosťou | Škandál Watergate a rezignácia Nixona"),
        (1970, "Veľká Británia", 10800, 72.0, 18.0, 81.0, 170.0, 310.0, "Edward Heath / Harold Wilson", "Konštitučná monarchia", "Vstup do EHS, ťažké štrajky baníkov a zavedenie trojdňového pracovného týždňa.", "Vstup Veľkej Británie do Európskeho spoločenstva | Začiatok ťažby ropy v Severnom mori", "Uhoľná kríza a obmedzenie dodávok elektriny pre podniky | Eskalácia konfliktu v Severnom Írsku"),

        # 1980
        (1980, "Československo", 8200, 70.3, 18.0, 68.0, 480.0, 150.0, "Gustáv Husák", "Komunistický režim (KSČ)", "Rozvinutá fáza normalizácie, ekonomická stagnácia, rastúce ekologické škody a dlhy.",
         "Vysoká miera potravinovej sebestačnosti ČSSR | Nízky zahraničný dlh v porovnaní s inými štátmi bloku | Rozsiahla plynofikácia a jadrový program",
         "Absolútna absencia modernej spotrebnej elektroniky a dlhé rady v obchodoch | Vážna ekologická devastácia (kyslé dažde, znečistené ovzdušie) | Brutálne zásahy proti nezávislým zhromaždeniam a Sviečkovej manifestácii"),
        (1980, "Rakúsko", 13100, 72.6, 14.0, 65.0, 370.0, 650.0, "Rudolf Kirchschläger", "Spolková republika", "Kríza štátneho priemyslu vyriešená privatizáciou a reštrukturalizáciou.", "Vstup do éry ekologickej politiky (zákaz jadra) | Stabilný rast reálnych príjmov", "Škandály v štátnom holdingu Voest-Alpine | Nárast deficitu štátneho rozpočtu"),
        (1980, "Nemecko", 14100, 73.0, 12.0, 74.0, 400.0, 920.0, "Karl Carstens / Helmut Kohl", "Západné Nemecko (SRN)", "Nástup kancelára Helmuta Kohla, hospodárske oživenie a posilnenie marky.", "Ukončenie stagflácie a stabilizácia cien | Rozvoj IT a telekomunikačného sektora", "Vznik masového ekologického hnutia (Zelení) proti jadru | Vysoká nezamestnanosť (vyše 8 %)"),
        (1980, "Fínsko", 12900, 74.3, 8.0, 60.0, 410.0, 800.0, "Urho Kekkonen / M. Koivisto", "Demokratická republika", "Obdobie technologického skoku (Nokia) a stability.", "Počiatok premeny krajiny na high-tech ekonomiku (Nokia) | Vynikajúca úroveň vzdelávacieho systému", "Koniec dlhej éry prezidenta Kekkonena | Obavy z blízkeho kolapsu trhu ZSSR"),
        (1980, "USA", 18500, 73.7, 13.0, 74.0, 250.0, 1250.0, "Ronald Reagan", "Prezidentská republika", "Obdobie Reaganomiky, znižovania daní, deregulácie a zintenzívnenia studenej vojny.", "Ekonomické oživenie a výrazný pokles inflácie | Rýchly rozvoj osobných počítačov PC", "Obrovský deficit štátneho rozpočtu kvôli výdavkom na zbrojenie | Epidémia AIDS a bezdomovectvo"),
        (1980, "Veľká Británia", 12900, 73.7, 12.0, 82.0, 180.0, 850.0, "Margaret Thatcher", "Konštitučná monarchia", "Éra Thatcherizmu, tvrdá privatizácia podnikov a boj s odbormi.", "Úspešné potlačenie inflácie a privatizácia podnikov | Víťazstvo vo vojne o Falklandy (1982)", "Násilné strety s baníkmi počas celoročného štrajku | Masová nezamestnanosť presahujúca 11 %"),

        # 1990
        (1990, "Československo", 8800, 71.5, 11.0, 73.0, 490.0, 180.0, "Václav Havel", "Demokratická federácia", "Pád komunistického režimu po Nežnej revolúcii, prechod k demokracii.",
         "Návrat slobody prejavu, cestovania a zhromažďovania | Spustenie prvej privatizácie | Zvolenie Václava Havla za prezidenta",
         "Rozkvet organizovaného zločinu a divokej privatizácie | Začiatok sporov o usporiadanie federácie (pomlčková vojna) | Strata tradičných trhov na Východe a zatváranie fabrík"),
        (1990, "Rakúsko", 16800, 75.6, 7.0, 66.0, 460.0, 1350.0, "Kurt Waldheim", "Spolková republika", "Rakúsko podáva prihlášku do EÚ, otvorenie hraníc na Východ prináša príležitosti.", "Otvorenie trhov v strednej a východnej Európe | Prijatie európskej legislatívy", "Aféra prezidenta Waldheima ohľadom vojnovej minulosti | Obavy z prílevu utečencov z Východu"),
        (1990, "Nemecko", 17500, 75.2, 7.0, 75.0, 480.0, 1650.0, "R. von Weizsäcker / Helmut Kohl", "Nemecko (Zjednotené)", "Zjednotenie Nemecka, pád Berlínskeho múru, obrovské náklady na obnovu Východu.", "Historické zjednotenie Nemecka 3. októbra 1990 | Pád Berlínskeho múru a koniec studenej vojny", "Obrovské hospodárske náklady na integráciu bývalej NDR | Likvidácia neefektívneho východného priemyslu"),
        (1990, "Fínsko", 16800, 75.8, 5.0, 62.0, 520.0, 1600.0, "Mauno Koivisto", "Demokratická republika", "Ťažká recesia spôsobená kolapsom obchodu so ZSSR (tzv. kríza Lama).", "Príprava na vstup do EÚ | Mobilné telefóny Nokia sa stávajú svetovým lídrom", "Ťažká hospodárska kríza po rozpade ZSSR s prepadom HDP a nezamestnanosťou nad 15 %"),
        (1990, "USA", 23200, 75.4, 9.0, 75.0, 310.0, 2100.0, "George H. W. Bush", "Prezidentská republika", "Koniec studenej vojny a rozpad východného bloku potvrdil USA ako jedinú superveľmoc.", "Víťazstvo v studenej vojne | Úspešná vojenská koalícia v Perzskom zálive", "Začiatok hospodárskej recesie a nárast štátneho dlhu | Zvýšenie daní napriek predvolebným sľubom"),
        (1990, "Veľká Británia", 16400, 75.7, 8.0, 83.0, 210.0, 1750.0, "John Major", "Konštitučná monarchia", "Rezignácia Margaret Thatcherovej, John Major sa stáva premiérom.", "Podpis Maastrichtskej zmluvy zakladajúcej EÚ | Koniec dlhých bojov o daň z hlavy", "Prepuknutie vážnej hospodárskej recesie | Vnútorné rozdelenie Konzervatívnej strany kvôli Európe"),

        # 2000
        (2000, "Slovensko", 12640, 73.1, 8.6, 56.0, 280.0, 250.0, "Rudolf Schuster / M. Dzurinda", "Demokratická republika", "Zotavenie hospodárstva po prointegračných reformách a vstup Slovenska do OECD.", 
         "Úspešné ozdravenie a privatizácia bánk | Vstup do OECD a decentralizácia verejnej správy",
         "Vysoká miera nezamestnanosti (18.6%) | Zavedenie prísnych úsporných opatrení"),
        (2000, "Rakúsko", 29000, 78.2, 4.8, 66.0, 580.0, 1850.0, "Thomas Klestil", "Spolková republika", "Hospodársky rozkvet spojený s integráciou v EÚ a otváraním východných trhov.", 
         "Vysoká konkurencieschopnosť a stabilita | Rozvoj cestovného ruchu a exportu",
         "Politická polarizácia a koaličná kríza s účasťou FPÖ"),
        (2000, "Nemecko", 27000, 78.0, 4.4, 75.0, 550.0, 2200.0, "Johannes Rau / Gerhard Schröder", "Spolková republika", "Nemecko prechádza hlbokými štrukturálnymi reformami trhu práce (Agenda 2010).", 
         "Uvedenie Eura v bezhotovostnom styku | Reformy na zvýšenie flexibility ekonomiky",
         "Pretrvávajúca vysoká nezamestnanosť po zjednotení krajiny"),
        (2000, "Fínsko", 26000, 77.8, 3.8, 62.0, 690.0, 2150.0, "Tarja Halonen", "Demokratická republika", "Fínsko zažíva technologický boom na čele s globálnou dominanciou firmy Nokia.", 
         "Nokia ovláda 40 % svetového trhu mobilov | Prvotriedne výsledky v školstve (PISA)",
         "Hospodárska závislosť na jedinej telekomunikačnej korporácii"),
        (2000, "USA", 36000, 76.8, 6.9, 79.0, 360.0, 2900.0, "Bill Clinton", "Prezidentská republika", "Vrchol internetového rozkvetu (Dot-com boom) a dosiahnutie rozpočtových prebytkov.", 
         "Rekordná hospodárska expanzia a prebytok rozpočtu | Rýchly rozvoj internetových služieb",
         "Splasknutie technologickej bubliny na konci roka | Kontroverzný priebeh volieb"),
        (2000, "Veľká Británia", 28000, 77.9, 5.6, 87.0, 230.0, 2500.0, "Alžbeta II. / Tony Blair", "Konštitučná monarchia", "Výrazný rozkvet finančných a biznis služieb v Londýne pod taktovkou New Labour.", 
         "Londýn ako popredné svetové finančné centrum | Zvýšenie investícií do zdravotníctva NHS",
         "Prehrievanie trhu s bývaním a nárast zadlženia domácností"),

        # 2010
        (2010, "Slovensko", 25740, 75.6, 5.7, 54.0, 410.0, 1020.0, "Ivan Gašparovič / Robert Fico", "Demokratická republika", "Konsolidácia po prijatí meny Euro (2009) a masívny automobilový export.", 
         "Stabilizácia meny a integrácia do eurozóny | Veľký rozvoj automobilového priemyslu",
         "Dozvuky globálnej recesie a nárast deficitu verejných financií"),
        (2010, "Rakúsko", 38000, 80.7, 3.6, 66.0, 710.0, 2900.0, "Heinz Fischer", "Spolková republika", "Rakúsko potvrdzuje odolnosť svojej exportnej ekonomiky a nízku nezamestnanosť.", 
         "Rýchle zotavenie exportu po finančnej kríze | Excelentná úroveň sociálneho partnerstva",
         "Zvýšené náklady štátu na záchranu bankového sektora"),
        (2010, "Nemecko", 37500, 80.5, 3.4, 76.0, 680.0, 3400.0, "Christian Wulff / Angela Merkel", "Spolková republika", "Rekordné exportné výkony nemeckého priemyslu a upevnenie pozície lídra EÚ.", 
         "Obrovský exportný dopyt z Číny a rozvoj high-tech zón | Plná zamestnanosť",
         "Finančné záťaže v dôsledku dlhovej krízy eurozóny"),
        (2010, "Fínsko", 35000, 80.2, 2.3, 62.0, 780.0, 3350.0, "Tarja Halonen", "Demokratická republika", "Postupná strata trhovej pozície Nokie a hládanie novej hospodárskej štruktúry.", 
         "Silný rozvoj startupového prostredia a herného priemyslu | Vysoká inovačná aktivita",
         "Kríza a úpadok papierenského priemyslu a fínskej hardvérovej divízie"),
        (2010, "USA", 48500, 78.7, 6.1, 81.0, 380.0, 3900.0, "Barack Obama", "Prezidentská republika", "Pomalé zotavovanie po Veľkej recesii spojené s kvantitatívnym uvoľňovaním (QE).", 
         "Zavedenie reformy zdravotníctva Obamacare | Rozmach ťažby z bridlíc v USA",
         "Vysoký rozpočtový schodok a pomalý pokles miery nezamestnanosti"),
        (2010, "Veľká Británia", 36000, 80.4, 4.2, 90.0, 230.0, 3500.0, "Alžbeta II. / David Cameron", "Konštitučná monarchia", "Nástup koaličnej vlády konzervatívcov, ktorá spustila prísne rozpočtové škrty.", 
         "Sanácia finančného systému a prípravy na letné olympijské hry v Londýne",
         "Drastické zníženie verejných výdavkov a protesty proti škrty a školnému"),

        # 2020
        (2020, "Slovensko", 36810, 77.0, 5.1, 53.0, 490.0, 1290.0, "Zuzana Čaputová / Igor Matovič", "Demokratická republika", "Boj s pandémiou COVID-19, prepad ekonomiky a nástup protikorupčnej koalície.", 
         "Vysoká občianska mobilizácia | Schválenie Plánu obnovy a odolnosti v EÚ",
         "Chaotické riadenie pandémie | Pokles HDP o 3.4 % a zatváranie obchodov"),
        (2020, "Rakúsko", 48000, 81.3, 3.2, 66.0, 790.0, 3800.0, "Alexander Van der Bellen", "Spolková republika", "Krajina čelí prísnym pandemickým lockdownom a masívnej štátnej kompenzácii firiem.", 
         "Prijatie ekologického programu | Podpora digitalizácie v školách",
         "Výrazný útlm zimného a letného cestovného ruchu v Alpách"),
        (2020, "Nemecko", 47000, 81.1, 3.1, 77.0, 710.0, 4400.0, "Frank-Walter Steinmeier / Angela Merkel", "Spolková republika", "Nemecko prechádza pandemickou krízou a pripravuje sa na éru po A. Merkelovej.", 
         "Vysoká štátna podpora pre udržanie zamestnanosti (Kurzarbeit)",
         "Prerušenie priemyselných reťazcov a pokles automobilovej výroby"),
        (2020, "Fínsko", 44000, 82.0, 1.8, 63.0, 880.0, 4250.0, "Sauli Niinistö / Sanna Marin", "Demokratická republika", "Úspešné zvládnutie pandémie a udržanie svetového prvenstva v indexe šťastia.", 
         "Najšťastnejšia krajina sveta podľa OSN | Rýchly rozvoj obnoviteľných zdrojov",
         "Zahraničné obmedzenia obchodu a starnutie populácie"),
        (2020, "USA", 63000, 77.0, 5.4, 83.0, 410.0, 5300.0, "Donald Trump / Joe Biden", "Prezidentská republika", "Boj s pandémiou, vývoj vakcín a vysoká polarizácia pred prezidentskými voľbami.", 
         "Rýchly vývoj vakcín (Operation Warp Speed) | Obrovský rozmach technologických firiem",
         "Masová strata pracovných miest na jar | Rekordný nárast štátneho dlhu"),
        (2020, "Veľká Británia", 44000, 81.3, 3.6, 92.0, 240.0, 4300.0, "Alžbeta II. / Boris Johnson", "Konštitučná monarchia", "Vykonanie Brexitu (odchod z EÚ) a boj s nepriaznivým priebehom pandémie.", 
         "Definitívny odchod z Európskej únie k 31.1.2020 | Rýchly priebeh očkovania",
         "Najväčší prepad HDP v rámci G7 | Vysoká úmrtnosť na vírus")
    ]
    
    # 3. Populate Slovakia Stats table
    cursor.executemany("""
        INSERT OR REPLACE INTO slovakia_stats (
            year, gdp_growth, unemployment, inflation, public_debt, avg_wage, 
            budget_balance, trade_balance, gdp_ppp, fdi, pop_change,
            real_wage_growth, min_wage, corruption_index,
            rank_gdp_ppp, rank_hdi, rank_press_freedom, rank_competitiveness,
            prime_minister, coalition, note
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, slovakia_data)

    # 4. Populate Historical table
    cursor.executemany("""
        INSERT OR REPLACE INTO czechoslovakia_stats (
            year, country, gdp_capita, life_expectancy, infant_mortality, 
            urbanization, industrial_index, avg_wage_usd, leader, system, note, 
            events_pos, events_neg
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, historical_data)
    
    conn.commit()
    conn.close()
    print("[+] Faktograf database populated successfully with Slovakia and Czechoslovakia tables.")

if __name__ == "__main__":
    init_db()
