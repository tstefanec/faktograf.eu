Faktograf - Návod na pridanie fotiek premiérov
=============================================

Pre zobrazenie fotky premiéra v hlavičke porovnávacej karty stačí nahrať jeho fotku 
v formáte JPEG (.jpg) do tohto priečinka (frontend/assets/pm/).

Aplikácia automaticky normalizuje meno premiéra (odstráni diakritiku, zmení písmená na malé a nahradí medzery podčiarkovníkmi).

Meno súboru pre každého premiéra musí byť presne:
- Vladimír Mečiar  => vladimir_meciar.jpg
- Jozef Moravčík   => jozef_moravcik.jpg
- Mikuláš Dzurinda => mikulas_dzurinda.jpg
- Robert Fico      => robert_fico.jpg
- Iveta Radičová   => iveta_radicova.jpg
- Peter Pellegrini => peter_pellegrini.jpg
- Igor Matovič     => igor_matovic.jpg
- Eduard Heger     => eduard_heger.jpg
- Ľudovít Ódor     => ludovit_odor.jpg

Ak fotka chýba alebo sa nepodarí načítať, rozhranie automaticky a plynule zobrazí predvolenú elegantnú ikonu postavy (avatar) ako náhradu.
