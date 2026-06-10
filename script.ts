// ==========================================
// VĚTEV POSTAV (Dědičnost a Zapouzdření)
// ==========================================

// Abstraktní bázová třída pro všechny entity ve hře
abstract class Postava {
    // Používáme protected, aby data byla chráněna zvenčí (zapouzdření), 
    // ale přístupná pro potomky (Mag, Bojovnik, Zlodej).
    protected jmeno: string;
    protected rasa: string;
    protected maxHp: number;
    protected hp: number;
    protected sila: number;
    protected obratnost: number;
    protected inteligence: number;
    protected bonusMaxHp: number = 0; // Nový atribut pro bonusové maximální životy z vybavení

    constructor(jmeno: string, rasa: string, maxHp: number, sila: number, obratnost: number, inteligence: number) {
        // Validace dat (nesmí projít nesmyslné hodnoty)
        if (jmeno.trim() === "") throw new Error("Jméno nesmí být prázdné.");
        if (maxHp <= 0) throw new Error("Maximální HP musí být kladné.");
        if (sila < 0 || sila > 10 || obratnost < 0 || obratnost > 10 || inteligence < 0 || inteligence > 10) {
            throw new Error("Základní atributy musí být v rozmezí 0 až 10.");
        }

        this.jmeno = jmeno;
        this.rasa = rasa;
        this.maxHp = maxHp;
        this.hp = maxHp; // Postava začíná s plným zdravím
        this.sila = sila;
        this.obratnost = obratnost;
        this.inteligence = inteligence;
    }

    // Veřejná metoda pro manipulaci se zdravím
    public zmenHp(hodnota: number): void {
        this.hp += hodnota;
        const aktualniMax = this.getMaxHp();
        if (this.hp > aktualniMax) this.hp = aktualniMax;
        if (this.hp < 0) this.hp = 0;
    }

    // Metoda pro nastavení bonusových maximálních HP (volá se při oblékání/svlékání)
    public setBonusMaxHp(bonus: number): void {
        this.bonusMaxHp = bonus;
    }

    // Getter pro získání jména (čtení je povolené, zápis ne)
    public getJmeno(): string {
        return this.jmeno;
    }

    // Getter pro získání životů (čtení je povolené, zápis ne)
    public getHp(): number {
        return this.hp;
    }

    // Getter pro získání maximálních životů včetně bonusů z vybavení
    public getMaxHp(): number {
        return this.maxHp + this.bonusMaxHp;
    }

    // Gettery pro základní atributy (čtení je povolené, zápis ne)
    public getSila(): number { return this.sila; }
    public getObratnost(): number { return this.obratnost; }
    public getInteligence(): number { return this.inteligence; }

    // Testovací metoda pro zranění
    public zranit(dmg: number): void {
        this.zmenHp(-dmg);
    }
}

// Konkrétní potomek: Mág
class Mag extends Postava {
    protected mana: number;

    constructor(jmeno: string, rasa: string, maxHp: number, sila: number, obratnost: number, inteligence: number) {
        super(jmeno, rasa, maxHp, sila, obratnost, inteligence); // Volání konstruktoru rodiče
        this.mana = 100; // Specifický atribut pro mága
    }

    public zmenManu(hodnota: number): void {
        this.mana += hodnota;
        if (this.mana > 100) this.mana = 100;
        if (this.mana < 0) this.mana = 0;
    }

    // Getter pro získání many (čtení je povolené, zápis ne)
    public getMana(): number {
        return this.mana;
    }
}

// Konkrétní potomek: Bojovník
class Bojovnik extends Postava {
    protected redukcePoskozeni: number;

    constructor(jmeno: string, rasa: string, maxHp: number, sila: number, obratnost: number, inteligence: number) {
        super(jmeno, rasa, maxHp, sila, obratnost, inteligence); // Volání konstruktoru rodiče
        this.redukcePoskozeni = 0; // Začíná bez Adrenalinu
    }

    public zmenAdrenalin(hodnota: number): void {
        this.redukcePoskozeni += hodnota;
        if (this.redukcePoskozeni > 80) this.redukcePoskozeni = 80; // Limit na max 80% redukce
        if (this.redukcePoskozeni < 0) this.redukcePoskozeni = 0;
    }

    // Bojovník má speciální reakci na zranění
    public zranit(dmg: number): void {
        // Sníží poškození podle aktuálního adrenalinu (0-80%)
        const redukce = this.redukcePoskozeni / 100;
        const skutecnePoskozeni = Math.round(dmg * (1 - redukce));
        
        super.zranit(skutecnePoskozeni);

        // Získá trochu Adrenalinu z každé rány, takže další rány bolí méně
        this.zmenAdrenalin(10); 
    }

    // Getter pro získání redukce (čtení je povolené, zápis ne)
    public getRedukcePoskozeni(): number {
        return this.redukcePoskozeni;
    }
}

// Konkrétní potomek: Zloděj
class Zlodej extends Postava {
    protected focus: number;

    constructor(jmeno: string, rasa: string, maxHp: number, sila: number, obratnost: number, inteligence: number) {
        super(jmeno, rasa, maxHp, sila, obratnost, inteligence); // Volání konstruktoru rodiče
        this.focus = 100; // Specifický atribut pro zloděje
    }
    
    public zmenFocus(hodnota: number): void {
        this.focus += hodnota;
        if (this.focus > 100) this.focus = 100;
        if (this.focus < 0) this.focus = 0;
    }

    // Getter pro získání focusu (čtení je povolené, zápis ne)
    public getFocus(): number {
        return this.focus;
    }
}

// ==========================================
// VĚTEV PŘEDMĚTŮ (Polymorfismus)
// ==========================================

// Nejvyšší třída pro všechny věci v inventáři
abstract class Predmet {
    protected nazev: string;

    constructor(nazev: string) {
        if (nazev.trim() === "") throw new Error("Předmět musí mít název.");
        this.nazev = nazev;
    }

    public getNazev(): string {
        return this.nazev;
    }
}

// Lektvar dědí z Předmětu
abstract class Lektvar extends Predmet {
    constructor(nazev: string) {
        super(nazev);
    }

    // Abstraktní metoda platí jen pro lektvary
    public abstract pouzit(cil: Postava): void;
}


// Konkrétní implementace lektvaru
class LektvarZdravi extends Lektvar {
    protected silaLeceni: number;

    constructor(nazev: string, silaLeceni: number) {
        super(nazev);
        if (silaLeceni <= 0) throw new Error("Síla léčení musí být kladná.");
        this.silaLeceni = silaLeceni;
    }

    public pouzit(cil: Postava): void {
        cil.zmenHp(this.silaLeceni);
    }
}

class LektvarMany extends Lektvar {
    protected doplneni: number;

    constructor(nazev: string, doplneni: number) {
        super(nazev);
        if (doplneni <= 0) throw new Error("Doplnění many musí být kladné.");
        this.doplneni = doplneni;
    }

    public pouzit(cil: Postava): void {
        if (cil instanceof Mag) {
            cil.zmenManu(this.doplneni);
        }
    }
}

// ==========================================
// KATEGORIE: JÍDLO (Jednoduchý předmět)
// ==========================================
// Jídlo dědí z Předmětu a umožňuje vyléčit malou část životů (HP)
class Jidlo extends Predmet {
    protected popis: string;
    protected silaLeceni: number; // Hodnota, o kterou jídlo vyléčí HP

    constructor(nazev: string, popis: string, silaLeceni: number) {
        super(nazev);
        if (silaLeceni < 0) throw new Error("Síla léčení z jídla nesmí být záporná.");
        this.popis = popis;
        this.silaLeceni = silaLeceni;
    }

    public getPopis(): string {
        return this.popis;
    }

    public getSilaLeceni(): number {
        return this.silaLeceni;
    }

    // Metoda pro konzumaci jídla (vyléčí postavu)
    public snist(cil: Postava): void {
        cil.zmenHp(this.silaLeceni);
    }
}

// ==========================================
// KATEGORIE: VYBAVENÍ (Zbraně, štíty atd.)
// ==========================================
// Vybavení dědí z Předmětu a přidává bonusové statistiky,
// které mohou ovlivnit bojeschopnost postavy.
class Vybaveni extends Predmet {
    protected typ: string; // "zbran" nebo "stit"
    protected silaBonus: number;
    protected rychlostUtoku: number;
    protected inteligenceBonus: number;
    protected obranaBonus: number;
    protected obratnostBonus: number;

    constructor(nazev: string, typ: string, silaBonus: number, rychlostUtoku: number, inteligenceBonus: number, obranaBonus: number, obratnostBonus: number) {
        super(nazev);
        this.typ = typ;
        this.silaBonus = silaBonus;
        this.rychlostUtoku = rychlostUtoku;
        this.inteligenceBonus = inteligenceBonus;
        this.obranaBonus = obranaBonus;
        this.obratnostBonus = obratnostBonus;
    }

    // Gettery pro zjištění statistik a typu vybavení
    public getTyp(): string { return this.typ; }
    public getSilaBonus(): number { return this.silaBonus; }
    public getRychlostUtoku(): number { return this.rychlostUtoku; }
    public getInteligenceBonus(): number { return this.inteligenceBonus; }
    public getObranaBonus(): number { return this.obranaBonus; }
    public getObratnostBonus(): number { return this.obratnostBonus; }
}

const tlacitkoZacit = document.getElementById("btn-zacit");
const obrazovkaTvorba = document.getElementById("screen-tvorba");
const obrazovkaHra = document.getElementById("screen-hra");

// Získáme prvky formuláře, abychom z nich mohli číst, co hráč vybral
const inputJmeno = document.getElementById("input-jmeno") as HTMLInputElement;
const selectRasa = document.getElementById("select-rasa") as HTMLSelectElement;
const selectPovolani = document.getElementById("select-povolani") as HTMLSelectElement;

// Získáme prvky UI pro zdroj (Mana/Focus/Obrana)
const uiZdrojLabel = document.getElementById("ui-zdroj-label");
const uiZdrojText = document.getElementById("ui-zdroj-text");
const uiZdrojBar = document.getElementById("ui-zdroj-bar");

// Získáme prvky UI pro životy (HP)
const uiHpText = document.getElementById("ui-hp-text");
const uiHpBar = document.getElementById("ui-hp-bar");

// Získáme prvky UI pro základní info a atributy
const uiJmeno = document.getElementById("ui-jmeno");
const uiRasaPovolani = document.getElementById("ui-rasa-povolani");
const uiSila = document.getElementById("ui-sila");
const uiObratnost = document.getElementById("ui-obratnost");
const uiInteligence = document.getElementById("ui-inteligence");

// Získáme prvky pro přepínání záložek (tlačítek) a jejich panelů
const tabPostava = document.getElementById("tab-postava");
const tabInventar = document.getElementById("tab-inventar");
const panelPostava = document.getElementById("panel-postava");
const panelInventar = document.getElementById("panel-inventar");

// Získáme prvek pro seznam předmětů v inventáři
const uiSeznamInventar = document.getElementById("ui-seznam-inventar");

// Získáme prvky pro testovací tlačítka
const btnTestDamage = document.getElementById("btn-test-damage");
const btnTestDrain = document.getElementById("btn-test-drain");

// Proměnná pro hrdinu je připravená nahoře, naplníme ji až po kliknutí
let hrdina: Postava;

// Globální pole pro předměty v inventáři
let inventar: Predmet[] = [];

// Globální proměnné pro aktuálně vybavenou zbraň a štít
let vybavenaZbran: Vybaveni | null = null;
let vybavenyStit: Vybaveni | null = null;

// Pomocná funkce pro aktualizaci životů (HP), speciálního zdroje (Mana/Focus/Adrenalin) a statistik v UI
function aktualizujStavUI(): void {
    if (!hrdina) return;

    // Výpočet celkových bonusů z aktuálně vybavených předmětů
    let bonusSila = 0;
    let bonusInteligence = 0;
    let bonusObratnost = 0;

    // Bonusy ze zbraně
    if (vybavenaZbran) {
        bonusSila += vybavenaZbran.getSilaBonus();
        bonusInteligence += vybavenaZbran.getInteligenceBonus();
        bonusObratnost += vybavenaZbran.getObratnostBonus();
    }

    // Bonusy ze štítu (životy už jsou nastavené v postavě přes setBonusMaxHp)
    if (vybavenyStit) {
        bonusSila += vybavenyStit.getSilaBonus();
        bonusInteligence += vybavenyStit.getInteligenceBonus();
        bonusObratnost += vybavenyStit.getObratnostBonus();
    }

    // Celkové maximální HP (už obsahuje bonus ze štítu díky getMaxHp)
    const celkoveMaxHp = hrdina.getMaxHp();

    // Aktualizace červeného baru pro životy (HP)
    if (uiHpText && uiHpBar) {
        uiHpText.innerText = `${hrdina.getHp()}/${celkoveMaxHp}`;
        const procentoHp = (hrdina.getHp() / celkoveMaxHp) * 100;
        uiHpBar.style.width = `${procentoHp}%`;
    }

    // Aktualizace statistik na obrazovce
    const celkovaSila = hrdina.getSila() + bonusSila;
    const celkovaInteligence = hrdina.getInteligence() + bonusInteligence;
    const celkovaObratnost = hrdina.getObratnost() + bonusObratnost;

    if (uiSila) uiSila.innerText = celkovaSila.toString();
    if (uiInteligence) uiInteligence.innerText = celkovaInteligence.toString();
    if (uiObratnost) uiObratnost.innerText = celkovaObratnost.toString();

    // Aktualizace baru pro speciální zdroj podle povolání hrdiny
    if (uiZdrojLabel && uiZdrojText && uiZdrojBar) {
        if (hrdina instanceof Mag) {
            uiZdrojLabel.innerText = "Mana";
            uiZdrojText.innerText = `${hrdina.getMana()}/100`;
            uiZdrojBar.style.backgroundColor = "var(--mana-color)";
            uiZdrojBar.style.width = `${hrdina.getMana()}%`;
        } else if (hrdina instanceof Zlodej) {
            uiZdrojLabel.innerText = "Focus";
            uiZdrojText.innerText = `${hrdina.getFocus()}/100`;
            uiZdrojBar.style.backgroundColor = "var(--focus-color)";
            uiZdrojBar.style.width = `${hrdina.getFocus()}%`;
        } else if (hrdina instanceof Bojovnik) {
            // Adrenalin: situační redukce poškození bojovníka
            uiZdrojLabel.innerText = "Adrenalin";
            uiZdrojText.innerText = `${hrdina.getRedukcePoskozeni()}%`;
            uiZdrojBar.style.backgroundColor = "var(--adrenalin-color)";
            uiZdrojBar.style.width = `${hrdina.getRedukcePoskozeni()}%`;
        }
    }
}

// Pomocná funkce pro vykreslení inventáře do HTML rozhraní (používá innerHTML a jednodušší syntaxi)
function vykresliInventar(): void {
    if (!uiSeznamInventar) return;

    // Nejprve vyčistíme starý obsah
    uiSeznamInventar.innerHTML = "";

    // Procházíme předměty a vytváříme jejich HTML reprezentaci jako řetězce
    for (const predmet of inventar) {
        if (predmet instanceof Lektvar || predmet instanceof Jidlo) {
            // Lektvary a jídlo označíme třídou 'klikaci-predmet', aby hráč věděl, že na ně může kliknout
            uiSeznamInventar.innerHTML += `<li class="klikaci-predmet" title="Kliknutím spotřebuješ tento předmět">${predmet.getNazev()}</li>`;
        } else if (predmet instanceof Vybaveni) {
            // Vybavení je také klikatelné pro oblékání/svlékání
            const jeVybaveno = (predmet === vybavenaZbran || predmet === vybavenyStit);
            const tridaVybaveno = jeVybaveno ? "vybaveny-predmet" : "";
            const textVybaveno = jeVybaveno ? " [Vybaveno]" : "";
            
            uiSeznamInventar.innerHTML += `<li class="klikaci-predmet ${tridaVybaveno}" title="Kliknutím oblíkneš/svlékneš toto vybavení">${predmet.getNazev()}${textVybaveno}</li>`;
        } else {
            // Ostatní předměty nejsou klikatelné
            uiSeznamInventar.innerHTML += `<li>${predmet.getNazev()}</li>`;
        }
    }
}

// Správná kontrola: Zjistíme, zda všechny důležité HTML prvky existují
if (tlacitkoZacit && obrazovkaTvorba && obrazovkaHra && inputJmeno && selectRasa && selectPovolani) {
    tlacitkoZacit.addEventListener("click", () => {
        // 1. Přečteme aktuální hodnoty z formuláře
        const zvoleneJmeno = inputJmeno.value;
        const zvolenaRasaNazev = selectRasa.value;
        const zvolenePovolani = selectPovolani.value;

        // Kontrola: Zda uživatel zadal jméno, jinak ho nepustíme dál
        if (zvoleneJmeno.trim() === "") {
            alert("Prosím zadej jméno hrdiny!");
            return; // Ukončí provádění této funkce, takže kód dál nepokračuje
        }

        // 2. Skryje obrazovku tvorby a zobrazí herní obrazovku
        obrazovkaTvorba.style.display = "none";
        obrazovkaHra.style.display = "block";

        // Aktivujeme výchozí panel (Postava) pro mobilní zobrazení
        if (panelPostava) {
            panelPostava.classList.add("mobil-aktivni");
        }

        // ==========================================
        // HLAVNÍ LOGIKA (Oživení objektů)
        // ==========================================

        // 3. Nalezení rasy v datovém číselníku podle výběru hráče
        const vybranaRasa = suroveRasy.find(rasa => rasa.nazev === zvolenaRasaNazev);

        if (!vybranaRasa) {
            throw new Error("Vybraná rasa neexistuje v databázi!");
        }

        // 4. Výpočet finálních statů (pevný základ 50 HP a 5 staty + úpravy z rasy)
        const startHp = 50 + vybranaRasa.modHp;
        const startSila = 5 + vybranaRasa.modSila;
        const startObratnost = 5 + vybranaRasa.modObratnost;
        const startInteligence = 5 + vybranaRasa.modInteligence;

        // 5. Vytvoření proměnné pro hrdinu podle vybraného povolání
        if (zvolenePovolani === "Mag") {
            hrdina = new Mag(zvoleneJmeno, zvolenaRasaNazev, startHp, startSila, startObratnost, startInteligence);
        } else if (zvolenePovolani === "Bojovnik") {
            hrdina = new Bojovnik(zvoleneJmeno, zvolenaRasaNazev, startHp, startSila, startObratnost, startInteligence);
        } else if (zvolenePovolani === "Zlodej") {
            hrdina = new Zlodej(zvoleneJmeno, zvolenaRasaNazev, startHp, startSila, startObratnost, startInteligence);
        } else {
            throw new Error("Neznámé povolání!");
        }

        // Resetujeme vybavené předměty na začátku nového dobrodružství
        vybavenaZbran = null;
        vybavenyStit = null;

        // 6. Aktualizace stavu a statistik v UI
        aktualizujStavUI();

        // Aktualizace jména, rasy a povolání
        if (uiJmeno && uiRasaPovolani) {
            uiJmeno.innerText = hrdina.getJmeno();
            uiRasaPovolani.innerText = `${zvolenaRasaNazev} | ${zvolenePovolani}`;
        }

        // 7. Vytvoření startovního inventáře podle povolání
        inventar = [];

        // Pomocná funkce pro vyhledání předmětu v databázích a jeho přidání do inventáře
        const pridejPredmet = (hledanyNazev: string) => {
            // Zkusíme najít lektvar
            const lektvar = suroveLektvary.find(l => l.nazev === hledanyNazev);
            if (lektvar) {
                if (lektvar.typ === "zdravi") inventar.push(new LektvarZdravi(lektvar.nazev, lektvar.hodnota));
                if (lektvar.typ === "mana") inventar.push(new LektvarMany(lektvar.nazev, lektvar.hodnota));
                return; // Pokud jsme našli a přidali, rovnou funkci ukončíme
            }

            // Zkusíme najít jídlo
            const jidlo = suroveJidlo.find(j => j.nazev === hledanyNazev);
            if (jidlo) {
                inventar.push(new Jidlo(jidlo.nazev, jidlo.popis, jidlo.leceni));
                return;
            }

            // Zkusíme najít vybavení
            const vybaveni = suroveVybaveni.find(v => v.nazev === hledanyNazev);
            if (vybaveni) {
                inventar.push(new Vybaveni(
                    vybaveni.nazev,
                    vybaveni.typ, // Předáme typ (zbran / stit)
                    vybaveni.modSila || 0,
                    vybaveni.modRychlostUtoku || 0,
                    vybaveni.modInteligence || 0,
                    vybaveni.modObrana || 0,
                    vybaveni.modObratnost || 0
                ));
            }
        };

        // Podle zvoleného povolání přidáme konkrétní startovní předměty
        if (zvolenePovolani === "Bojovnik") {
            pridejPredmet("Železný meč"); // Bojovník dostane jen meč
        } else if (zvolenePovolani === "Mag") {
            pridejPredmet("Dřevěná hůl");
            pridejPredmet("Zářivý modrý lektvar"); // Malý mana lektvar v naší databázi
        } else if (zvolenePovolani === "Zlodej") {
            pridejPredmet("Rezavá dýka");
            pridejPredmet("Malá léčivá lahvička");
        }

        // 8. Vykreslení inventáře do HTML rozhraní
        vykresliInventar();
    });
}

// ==========================================
// PŘEPÍNÁNÍ ZÁLOŽEK (Postava / Inventář)
// ==========================================
// Tento kód umožní klikat na tlačítka záložek a přepínat mezi zobrazením
// statistik postavy a jejím inventářem (a to jak na desktopu, tak na mobilu).
if (tabPostava && tabInventar && panelPostava && panelInventar) {
    
    // Kliknutí na záložku "Postava"
    tabPostava.addEventListener("click", () => {
        // Skryjeme inventář a ukážeme postavu
        panelPostava.style.display = "block";
        panelInventar.style.display = "none";

        // Nastavíme aktivní vzhled tlačítka
        tabPostava.classList.add("active");
        tabInventar.classList.remove("active");

        // Pro mobilní telefony: přidáme třídu, která panel vysune na celou obrazovku
        panelPostava.classList.add("mobil-aktivni");
        panelInventar.classList.remove("mobil-aktivni");
    });

    // Kliknutí na záložku "Inventář"
    tabInventar.addEventListener("click", () => {
        // Skryjeme postavu a ukážeme inventář
        panelPostava.style.display = "none";
        panelInventar.style.display = "block";

        // Nastavíme aktivní vzhled tlačítka
        tabInventar.classList.add("active");
        tabPostava.classList.remove("active");

        // Pro mobilní telefony: přidáme třídu, která panel vysune na celou obrazovku
        panelInventar.classList.add("mobil-aktivni");
        panelPostava.classList.remove("mobil-aktivni");
    });
}

// ==========================================
// TLAČÍTKA PRO TESTOVÁNÍ (Zranění a Vybití)
// ==========================================
// Přidáme posluchače událostí pro testovací tlačítka v levém panelu
if (btnTestDamage) {
    btnTestDamage.addEventListener("click", () => {
        if (hrdina) {
            // Zraníme hrdinu o 10 HP
            hrdina.zranit(10);
            // Aktualizujeme stav v UI
            aktualizujStavUI();
        }
    });
}

if (btnTestDrain) {
    btnTestDrain.addEventListener("click", () => {
        if (hrdina) {
            // Odebereme 10 many nebo focusu podle povolání hrdiny
            if (hrdina instanceof Mag) {
                hrdina.zmenManu(-10);
            } else if (hrdina instanceof Zlodej) {
                hrdina.zmenFocus(-10);
            } else if (hrdina instanceof Bojovnik) {
                hrdina.zmenAdrenalin(-10); // Bojovník se "uklidní"
            }
            // Aktualizujeme stav v UI
            aktualizujStavUI();
        }
    });
}

// ==========================================
// POUŽÍVÁNÍ A VYBAVOVÁNÍ PŘEDMĚTŮ
// ==========================================
// Nastavení klikatelnosti pro předměty v inventáři (využívá delegování událostí na celém seznamu)
if (uiSeznamInventar) {
    uiSeznamInventar.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        
        // Zkontrolujeme, zda kliknutí směřovalo na spotřební nebo vybavitelný předmět
        if (target && target.classList.contains("klikaci-predmet")) {
            let nazevPredmetu = target.innerText;
            
            // Pokud je předmět vybavený, odstraníme z názvu text " [Vybaveno]", abychom ho našli v databázi
            if (nazevPredmetu.endsWith(" [Vybaveno]")) {
                nazevPredmetu = nazevPredmetu.replace(" [Vybaveno]", "");
            }
            
            // Najdeme předmět v našem inventáři podle názvu
            const predmet = inventar.find(p => p.getNazev() === nazevPredmetu);
            
            if (hrdina && predmet) {
                if (predmet instanceof Lektvar) {
                    // Použijeme lektvar (polymorfní volání) a smažeme ho z inventáře
                    predmet.pouzit(hrdina);
                    const index = inventar.indexOf(predmet);
                    if (index !== -1) inventar.splice(index, 1);
                    
                } else if (predmet instanceof Jidlo) {
                    // Sníme jídlo a smažeme ho z inventáře
                    predmet.snist(hrdina);
                    const index = inventar.indexOf(predmet);
                    if (index !== -1) inventar.splice(index, 1);
                    
                } else if (predmet instanceof Vybaveni) {
                    // Vybavíme nebo svlékneme předmět
                    if (predmet.getTyp() === "zbran") {
                        if (vybavenaZbran === predmet) {
                            // Kliknutím na již vybavenou zbraň ji svlékneme
                            vybavenaZbran = null;
                        } else {
                            // Oblékneme novou zbraň (případná stará se nahradí)
                            vybavenaZbran = predmet;
                        }
                    } else if (predmet.getTyp() === "stit") {
                        // Zkontrolujeme, zda byl hrdina plně zdravý (před změnou štítu)
                        const bylNaPlno = (hrdina.getHp() === hrdina.getMaxHp());

                        if (vybavenyStit === predmet) {
                            // Kliknutím na již vybavený štít ho svlékneme
                            vybavenyStit = null;
                        } else {
                            // Oblékneme nový štít (případný starý se nahradí)
                            vybavenyStit = predmet;
                        }

                        // Okamžitě aktualizujeme bonusové HP v samotné postavě
                        const novyBonusHp = vybavenyStit ? vybavenyStit.getObranaBonus() : 0;
                        hrdina.setBonusMaxHp(novyBonusHp);

                        // Nové efektivní maximum HP po změně
                        const noveMaxHp = hrdina.getMaxHp();

                        if (bylNaPlno) {
                            // Pokud byl hrdina předtím na plném zdraví, vyléčíme ho na nové maximum
                            hrdina.zmenHp(noveMaxHp); 
                        } else {
                            // Pokud nebyl plný, jen zavoláme zmenHp s 0. To nijak nezmění HP, 
                            // ale donutí postavu oříznout si životy, pokud po sundání štítu překračují nové maximum.
                            hrdina.zmenHp(0);
                        }
                    }
                }
                
                // Překreslíme statistiky hrdiny a aktualizujeme zobrazení batohu
                aktualizujStavUI();
                vykresliInventar();
            }
        }
    });
}