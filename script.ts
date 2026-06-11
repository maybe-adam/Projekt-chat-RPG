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

// ==========================================
// KATEGORIE: OSTATNÍ PŘEDMĚTY (Příběhové, klíče atd.)
// ==========================================
// Tyto předměty nemají žádné speciální staty, jde o věci generované AI (klíče, prsteny, knihy)
class OstatniPredmet extends Predmet {
    constructor(nazev: string) {
        super(nazev);
    }
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

// Získáme prvky pro Chat a komunikaci s AI
const inputChat = document.getElementById("input-chat") as HTMLInputElement;
const btnOdeslat = document.getElementById("btn-odeslat");
const chatLog = document.getElementById("chat-log");

// Groq API klíče a historie konverzace
interface Window {
    ENV?: {
        GROQ_API_KEYS: string[];
    }
}
const GROQ_API_KEYS = window.ENV?.GROQ_API_KEYS || [];
let currentGroqKeyIndex = 0;

// Pomocná funkce pro volání API s automatickým přepínáním klíčů při dosažení limitu (429)
async function groqFetch(bodyData: any) {
    let response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEYS[currentGroqKeyIndex]}`
        },
        body: JSON.stringify(bodyData)
    });

    if (response.status === 429) {
        console.warn("Dosažen Rate Limit, přepínám na záložní API klíč...");
        currentGroqKeyIndex = (currentGroqKeyIndex + 1) % GROQ_API_KEYS.length;
        response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEYS[currentGroqKeyIndex]}`
            },
            body: JSON.stringify(bodyData)
        });
    }

    return response;
}
const historieZprav: { role: string; content: string }[] = [
    {
        role: "system",
        content: `Jsi profesionální Pán jeskyně (Dungeon Master) v temném fantasy RPG. 
Tvým jediným úkolem je vyprávět strhující, atmosférický a dramatický příběh na základě akcí hráče. 
NIKDY nevypadávej z role a vždy piš v češtině. 
NIKDY hráči nesděluj, kolik ztratil nebo získal many či soustředění (focusu), tyto mechaniky probíhají čistě na pozadí.
Buď úderný a stručný, tvé odpovědi by měly mít maximálně 2-4 věty. Nechávej hráči prostor reagovat.
POKUD hráč napíše slovo "start", okamžitě vymysli epický a nečekaný začátek nového dobrodružství a vrhni hráče rovnou do akce!`
    }
];

// Získáme prvky pro přepínání záložek (tlačítek) a jejich panelů
const tabPostava = document.getElementById("tab-postava");
const tabInventar = document.getElementById("tab-inventar");
const panelPostava = document.getElementById("panel-postava");
const panelInventar = document.getElementById("panel-inventar");

// Získáme prvek pro seznam předmětů v inventáři
const uiSeznamInventar = document.getElementById("ui-seznam-inventar");

// Získáme prvky pro tlačítka volby jazyka
const btnLangCz = document.getElementById("btn-lang-cz");
const btnLangEn = document.getElementById("btn-lang-en");

// Proměnná pro hrdinu je připravená nahoře, naplníme ji až po kliknutí
let hrdina: Postava;

// Globální pole pro předměty v inventáři
let inventar: Predmet[] = [];

// Globální proměnné pro aktuálně vybavenou zbraň a štít
let vybavenaZbran: Vybaveni | null = null;
let vybavenyStit: Vybaveni | null = null;

// Globální proměnné pro aktuálně zvolenou rasu a povolání
let zvolenaRasaNazev: string = "";
let zvolenePovolani: string = "";

// Globální proměnná pro "dlouhodobou paměť" (shrnutí děje od AI na pozadí)
let shrnutyPribeh: string = "";

// Počítadlo tahů bez zranění pro Bojovníka (pokud dosáhne 3, adrenalin spadne na 0)
let tahyBezZraneni: number = 0;

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

// Pomocná funkce pro vyhledání předmětu v databázích a jeho přidání do inventáře
function pridejPredmet(hledanyNazev: string) {
    // Pokud AI poslalo předmět s rourou (tvorba dynamického předmětu s vlastnostmi)
    if (hledanyNazev.includes("|")) {
        const parts = hledanyNazev.split("|");
        const itemName = parts[0].trim();
        const type = parts[1] ? parts[1].trim().toLowerCase() : "";
        
        if (type === "potion" && parts.length >= 4) {
            const pType = parts[2].trim().toLowerCase();
            const pVal = parseInt(parts[3]) || 0;
            if (pType === "zdravi") inventar.push(new LektvarZdravi(itemName, pVal));
            else inventar.push(new LektvarMany(itemName, pVal));
            return;
        } else if (type === "food" && parts.length >= 4) {
            const fDesc = parts[2].trim();
            const fVal = parseInt(parts[3]) || 0;
            inventar.push(new Jidlo(itemName, fDesc, fVal));
            return;
        } else if (type === "equip" && parts.length >= 8) {
            const eType = parts[2].trim() as "zbran" | "stit";
            const modStr = parseInt(parts[3]) || 0;
            const modSpd = parseInt(parts[4]) || 0;
            const modInt = parseInt(parts[5]) || 0;
            const modDef = parseInt(parts[6]) || 0;
            const modAgi = parseInt(parts[7]) || 0;
            inventar.push(new Vybaveni(itemName, eType, modStr, modSpd, modInt, modDef, modAgi));
            return;
        }
        // Pokud formát neseděl, použijeme pouze název a zkusíme to přidat normálně
        hledanyNazev = itemName;
    }

    // Zkusíme najít lektvar v databázi
    const lektvar = suroveLektvary.find((l: any) => l.nazev === hledanyNazev);
    if (lektvar) {
        if (lektvar.typ === "zdravi") inventar.push(new LektvarZdravi(lektvar.nazev, lektvar.hodnota));
        if (lektvar.typ === "mana") inventar.push(new LektvarMany(lektvar.nazev, lektvar.hodnota));
        return; 
    }

    // Zkusíme najít jídlo v databázi
    const jidlo = suroveJidlo.find((j: any) => j.nazev === hledanyNazev);
    if (jidlo) {
        inventar.push(new Jidlo(jidlo.nazev, jidlo.popis, jidlo.leceni));
        return;
    }

    // Zkusíme najít vybavení v databázi
    const vybaveni = suroveVybaveni.find((v: any) => v.nazev === hledanyNazev);
    if (vybaveni) {
        inventar.push(new Vybaveni(
            vybaveni.nazev,
            vybaveni.typ, 
            vybaveni.modSila || 0,
            vybaveni.modRychlostUtoku || 0,
            vybaveni.modInteligence || 0,
            vybaveni.modObrana || 0,
            vybaveni.modObratnost || 0
        ));
        return;
    }

    // Pokud předmět není v žádné databázi (např. AI si vymyslela Zlatý prsten nebo Klíč)
    inventar.push(new OstatniPredmet(hledanyNazev));
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
        zvolenaRasaNazev = selectRasa.value;
        zvolenePovolani = selectPovolani.value;

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
        // Inventář začíná prázdný
        inventar = [];

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
// PŘEPÍNÁNÍ JAZYKA (CZ / EN)
// ==========================================
// Tlačítka změní barvu (pro indikaci výběru) a okamžitě přepíší hlavní pravidlo AI v historii
if (btnLangCz && btnLangEn) {
    btnLangCz.addEventListener("click", () => {
        // UI indikace
        btnLangCz.style.background = "#6610f2";
        btnLangEn.style.background = "#444";
        
        // Přepíšeme první zprávu v paměti (kde sídlí hlavní pravidla) zpět do češtiny
        historieZprav[0].content = `Jsi profesionální Pán jeskyně (Dungeon Master) v temném fantasy RPG. 
Tvým jediným úkolem je vyprávět strhující, atmosférický a dramatický příběh na základě akcí hráče. 
NIKDY nevypadávej z role a vždy piš v češtině. 
Buď úderný a stručný, tvé odpovědi by měly mít maximálně 2-4 věty. Nechávej hráči prostor reagovat.
POKUD hráč napíše slovo "start", okamžitě vymysli epický a nečekaný začátek nového dobrodružství a vrhni hráče rovnou do akce!`;
        
        // Přidáme upozornění do chatu pro hráče
        if (chatLog) {
            chatLog.innerHTML += `<p style="color: #6610f2; font-size: 0.9em; text-align: center;"><em>Pán jeskyně nyní mluví Česky.</em></p>`;
            chatLog.scrollTop = chatLog.scrollHeight;
        }
    });

    btnLangEn.addEventListener("click", () => {
        // UI indikace
        btnLangEn.style.background = "#6610f2";
        btnLangCz.style.background = "#444";
        
        // Přepíšeme první zprávu v paměti (kde sídlí hlavní pravidla) do angličtiny
        historieZprav[0].content = `You are a professional Dungeon Master in a dark fantasy RPG. 
Your only task is to tell a gripping, atmospheric, and dramatic story based on the player's actions. 
NEVER break character and always write in English. 
Be punchy and brief, your responses should be a maximum of 2-4 sentences. Leave room for the player to react.
IF the player types the word "start", immediately invent an epic and unexpected beginning to a new adventure and throw the player straight into the action!`;
        
        // Přidáme upozornění do chatu pro hráče
        if (chatLog) {
            chatLog.innerHTML += `<p style="color: #6610f2; font-size: 0.9em; text-align: center;"><em>The Dungeon Master now speaks English.</em></p>`;
            chatLog.scrollTop = chatLog.scrollHeight;
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

// ==========================================
// CHAT A KOMUNIKACE S AI (Groq API)
// ==========================================
// Nastavíme posluchače na odeslání zprávy z chatu
if (btnOdeslat && inputChat && chatLog) {
    btnOdeslat.addEventListener("click", async () => {
        const zpravaHraci = inputChat.value.trim();
        if (zpravaHraci === "") return;

        // 1. Vykreslení zprávy hráče do chatu
        chatLog.innerHTML += `<p><strong>Ty:</strong> ${zpravaHraci}</p>`;
        inputChat.value = ""; // Vymazání políčka po odeslání
        chatLog.scrollTop = chatLog.scrollHeight; // Posuneme chat dolů

        // Skrytí výběru jazyka, jakmile hra začne
        if (zpravaHraci.toLowerCase() === "start") {
            const panelJazyk = document.getElementById("panel-jazyk");
            if (panelJazyk) {
                panelJazyk.style.display = "none";
            }
        }

        // 2. Přidání zprávy do paměti (historie), aby AI věděla, o čem se bavíme
        historieZprav.push({ role: "user", content: zpravaHraci });

        // 3. Vytvoříme dočasný text "přemýšlí", než dorazí odpověď od Groq
        const aiZpravaID = `ai-zprava-${Date.now()}`;
        chatLog.innerHTML += `<p id="${aiZpravaID}" style="color: #888;"><strong>Pán jeskyně:</strong> <em>(Přemýšlí...)</em></p>`;
        chatLog.scrollTop = chatLog.scrollHeight;

        // 4. Sestavení aktuálního stavu hrdiny pro AI
        let stavHrdinyText = "Stav hrdiny není k dispozici.";
        if (hrdina) {
            // Zjištění celkových statů vč. bonusů z vybavení
            let bonusSila = 0, bonusInt = 0, bonusObr = 0;
            if (vybavenaZbran) {
                bonusSila += vybavenaZbran.getSilaBonus();
                bonusInt += vybavenaZbran.getInteligenceBonus();
                bonusObr += vybavenaZbran.getObratnostBonus();
            }
            if (vybavenyStit) {
                bonusSila += vybavenyStit.getSilaBonus();
                bonusInt += vybavenyStit.getInteligenceBonus();
                bonusObr += vybavenyStit.getObratnostBonus();
            }

            // Speciální zdroj podle povolání
            let zdrojText = "";
            if (hrdina instanceof Mag) zdrojText = `Mana: ${hrdina.getMana()}/100`;
            else if (hrdina instanceof Zlodej) zdrojText = `Focus: ${hrdina.getFocus()}/100`;
            else if (hrdina instanceof Bojovnik) zdrojText = `Adrenalin (redukce zranění): ${hrdina.getRedukcePoskozeni()}%`;

            let pravidloZdroj = "";
            if (hrdina instanceof Mag) pravidloZdroj = "PRAVIDLO PRO MANU: Jsi Mág. Tvá Mana se spotřebovává POUZE při sesílání magických kouzel. Fyzické akce manu nestojí!";
            else if (hrdina instanceof Zlodej) pravidloZdroj = "PRAVIDLO PRO FOCUS: Jsi Zloděj. Tvůj Focus se spotřebovává POUZE při náročných, přesných nebo rychlých akcích (kradení, uhýbání, akrobacie).";
            else if (hrdina instanceof Bojovnik) pravidloZdroj = "PRAVIDLO PRO ADRENALIN: Jsi Bojovník. Tvůj Adrenalin stoupá POUZE v boji, když dostaneš zásah od nepřítele.";

            stavHrdinyText = `--- AKTÁLNÍ STAV HRDINY ---
Jméno: ${hrdina.getJmeno()}
Povolání a Rasa: ${zvolenePovolani} (${zvolenaRasaNazev})
Životy (HP): ${hrdina.getHp()} / ${hrdina.getMaxHp()}
${zdrojText}
Síla: ${hrdina.getSila() + bonusSila} | Obratnost: ${hrdina.getObratnost() + bonusObr} | Inteligence: ${hrdina.getInteligence() + bonusInt}
Vybavená zbraň: ${vybavenaZbran ? vybavenaZbran.getNazev() : "Nic"}
Vybavený štít: ${vybavenyStit ? vybavenyStit.getNazev() : "Nic"}
Inventář (v batohu): ${inventar.map(p => p.getNazev()).join(", ") || "Prázdný"}
${pravidloZdroj}
---------------------------`;
        }

        // 4.5. Zkontrolujeme délku historie a případně vytvoříme shrnutí (Dlouhodobou paměť) na pozadí
        // První zpráva je system, takže limit 15 zpráv znamená 1 system + 14 chat zpráv
        if (historieZprav.length >= 15) {
            try {
                const zpravaProShrnuti = [
                    {
                        role: "system",
                        content: `You are a background AI archivist for a text RPG. Your task is to compress the chat history into a highly dense, factual summary. 
Read the conversation and output ONLY a single comprehensive paragraph that summarizes:
1. What happened in the story so far.
2. The current physical location of the hero.
3. Every character, NPC, or enemy currently present, including their current status (e.g. alive, wounded, dead).
4. The immediate goal of the hero.

Output the summary in English. DO NOT write any pleasantries, conversational text, or formatting. ONLY the factual summary.`
                    },
                    ...historieZprav.slice(1) // Předáme dosavadní chat bez hlavního system promptu
                ];

                const summaryResponse = await groqFetch({
                    model: "llama-3.1-8b-instant", // Rychlý malý model pro shrnutí (Dlouhodobá paměť)
                    messages: zpravaProShrnuti,
                    temperature: 0.3
                });

                if (summaryResponse.ok) {
                    const summaryData = await summaryResponse.json();
                    shrnutyPribeh = summaryData.choices[0].message.content;
                    
                    // Promažeme starou historii:
                    // Smažeme vše kromě indexu 0 (system prompt) a posledních 4 zpráv
                    historieZprav.splice(1, historieZprav.length - 5);
                }
            } catch (error) {
                console.error("Chyba při generování shrnutí:", error);
                // Pokud shrnutí selže, pokračujeme normálně dál, hra nespadne
            }
        }

        // Přidáme aktuální stav jako skrytou systémovou zprávu nakonec pole před odesláním
        let systemZpravaKodeslani = `(SYSTÉMOVÁ ZPRÁVA, NEODPOVÍDEJ NA NI PŘÍMO): Toto je aktuální stav hrdiny v tento moment. Vezmi to v potaz při vyhodnocování jeho akce a určování následků:\n${stavHrdinyText}`;
        
        // Pokud už máme nějaké shrnutí děje (dlouhodobou paměť), přidáme ji na začátek stavu
        if (shrnutyPribeh !== "") {
            systemZpravaKodeslani = `PŘEDCHOZÍ DĚJ (The story so far - read carefully to keep context):\n${shrnutyPribeh}\n\n` + systemZpravaKodeslani;
        }

        // Abychom zabránili AI přejít zpět do češtiny, pokud hráč zvolil EN (protože stav hrdiny je v češtině)
        const aiMluviAnglicky = historieZprav[0].content.includes("English");
        const jazykoveUpozorneni = aiMluviAnglicky ? 
            "CRITICAL INSTRUCTION: YOU MUST RESPOND EXCLUSIVELY IN ENGLISH, NO MATTER WHAT THE TEXT ABOVE SAYS!" : 
            "KRITICKÁ INSTRUKCE: MUSÍŠ ODPOVĚDĚT VÝHRADNĚ V ČEŠTINĚ, BEZ OHLEDU NA TO, ZDA JE PŘEDCHOZÍ DĚJ V ANGLIČTINĚ!";
        
        const pravidlaAnglicky = `\n\nABSOLUTE CRITICAL RULES YOU MUST FOLLOW:\n1. NEVER tell or mention to the player how much mana, focus, or health they lost or gained. These mechanics run strictly in the background.\n2. NEVER just allow the player to do whatever they want. If they attempt something impossible, unrealistic, or rule-breaking, you MUST refuse and describe how they fail. You are a strict Dungeon Master, make them suffer the consequences.`;
        const pravidlaCesky = `\n\nABSOLUTNĚ KRITICKÁ PRAVIDLA, KTERÁ MUSÍŠ DODRŽET:\n1. NIKDY hráči neříkej ani nenaznačuj, kolik many, soustředění (focusu) nebo zdraví ztratil či získal. Tyto čísla a mechaniky běží čistě na pozadí, ty jen popisuj příběh.\n2. NIKDY hráči nedovol všechno, co si vymyslí. Pokud se pokusí o něco naprosto nemožného, nereálného nebo nesmyslného, MUSÍŠ to nekompromisně odmítnout a popsat jeho selhání. Jsi přísný Pán jeskyně, ne plnič přání. Nenech se hráčem ovládat.`;
        const prisnaPravidla = aiMluviAnglicky ? pravidlaAnglicky : pravidlaCesky;

        systemZpravaKodeslani += `\n\n${jazykoveUpozorneni}${prisnaPravidla}`;

        const zpravyKodeslani = [
            ...historieZprav, 
            { 
                role: "system", 
                content: systemZpravaKodeslani
            }
        ];

        try {
            // 5. Pošleme požadavek přímo na servery Groq s vloženým stavem hrdiny
            const response = await groqFetch({
                model: "llama-3.3-70b-versatile", // Velký a chytrý hlavní model pro vyprávění příběhu
                messages: zpravyKodeslani,
                temperature: 0.7
            });

            if (!response.ok) {
                throw new Error(`API vrátilo chybu: ${response.status}`);
            }

            const data = await response.json();
            let aiOdpoved = data.choices[0].message.content;

            // Preventivně vymažeme jakékoliv [CMD:] tagy, kdyby je hlavní model přesto vygeneroval ze setrvačnosti
            aiOdpoved = aiOdpoved.replace(/\[CMD:\s*(.*?)\]/gi, "").trim();

            // 5. Uložíme čistou odpověď do historie, aby se konverzace řetězila
            historieZprav.push({ role: "assistant", content: aiOdpoved });

            // 6. Nahradíme text "přemýšlí" skutečnou odpovědí v chatu (okamžité zobrazení!)
            const pElement = document.getElementById(aiZpravaID);
            if (pElement) {
                pElement.innerHTML = `<strong>Pán jeskyně:</strong> ${aiOdpoved}`;
                pElement.style.color = ""; // Vrátíme normální barvu
            }
            chatLog.scrollTop = chatLog.scrollHeight;

            // ==========================================
            // SEKUNDÁRNÍ MECHANICKÝ MODEL (Logika na pozadí)
            // ==========================================
            // Nyní se asynchronně zeptáme malého rychlého modelu, jestli došlo ke změně stavu.
            // Model vůbec nemluví s hráčem, jen chrlí [CMD] tagy.
            const mechPrompt = `You are a background game engine in a dark fantasy RPG. Your ONLY task is to read the player's action and the Dungeon Master's response, scan them for mechanical events, and output a strict command block to update the game state.

Player action: "${zpravaHraci}"
Dungeon Master response: "${aiOdpoved}"

${stavHrdinyText}

RULES FOR COMMANDS:
1. Did the player take damage or heal? Use "hp" (e.g. hp=-15 or hp=20).
2. Did the player use a special resource (mana for spells, focus for stealth, adrenalin)? Use "resource" (e.g. resource=-25). 
3. Did the player find, buy, or receive a BRAND NEW item in THIS turn? Use "item". 
   CRITICAL: DO NOT give the player items they already have in their inventory or equipped! Only output new items.
   You MUST define its stats using pipes (|):
   - Potion: item=Name|potion|zdravi or mana|value (e.g. item=Health Potion|potion|zdravi|50)
   - Food: item=Name|food|description|value (e.g. item=Apple|food|tasty|5)
   - Equipment: item=Name|equip|zbran or stit|strength|agility|intelligence|defense (e.g. item=Iron Sword|equip|zbran|3|0|0|0)
   - Story item: item=Name (e.g. item=Rusty Key)
4. Combine multiple commands using semicolons: [CMD: hp=-10; resource=-20; item=Health Potion|potion|zdravi|50]
5. If NOTHING mechanical happened, you MUST output exactly: [CMD: none]

CRITICAL INSTRUCTION: Output ONLY the [CMD: ...] block and absolutely NO OTHER TEXT. Never explain yourself.`;

            try {
                const mechResponse = await groqFetch({
                    model: "llama-3.1-8b-instant", // Rychlý malý model pro mechaniky na pozadí
                    messages: [{ role: "system", content: mechPrompt }],
                    temperature: 0.1
                });

                if (mechResponse.ok) {
                    const mechData = await mechResponse.json();
                    const mechCmd = mechData.choices[0].message.content;
                    
                    const cmdRegex = /\[CMD:\s*(.*?)\]/i;
                    const match = mechCmd.match(cmdRegex);
                    
                    let dostalZasah = false;

                    if (match && hrdina) {
                        const commandString = match[1]; 
                        if (commandString.toLowerCase() !== "none") {
                            const commands = commandString.split(";");
                            for (let cmd of commands) {
                                cmd = cmd.trim();
                                if (cmd.toLowerCase().startsWith("hp=")) {
                                    const hpValText = cmd.substring(3).trim();
                                    const hpVal = parseInt(hpValText);
                                    if (!isNaN(hpVal)) {
                                        if (hpVal < 0) {
                                            hrdina.zranit(Math.abs(hpVal));
                                            dostalZasah = true;
                                        } else {
                                            hrdina.zmenHp(hpVal);
                                        }
                                    }
                                } else if (cmd.toLowerCase().startsWith("item=")) {
                                    const itemVal = cmd.substring(5).trim();
                                    if (itemVal) {
                                        const rozdelenePredmety = itemVal.split(/,| a | and /i);
                                        for (let p of rozdelenePredmety) {
                                            p = p.trim();
                                            if (p) {
                                                pridejPredmet(p);
                                            }
                                        }
                                    }
                                } else if (cmd.toLowerCase().startsWith("resource=")) {
                                    const resValText = cmd.substring(9).trim();
                                    const resVal = parseInt(resValText);
                                    if (!isNaN(resVal)) {
                                        if (hrdina instanceof Mag) hrdina.zmenManu(resVal);
                                        else if (hrdina instanceof Zlodej) hrdina.zmenFocus(resVal);
                                        else if (hrdina instanceof Bojovnik) hrdina.zmenAdrenalin(resVal);
                                    }
                                }
                            }
                            aktualizujStavUI();
                            vykresliInventar();
                        }
                    }

                    // --- AUTOMATICKÝ ÚBYTEK ADRENALINU ---
                    if (hrdina && hrdina instanceof Bojovnik) {
                        if (dostalZasah) {
                            tahyBezZraneni = 0;
                        } else {
                            tahyBezZraneni++;
                            if (tahyBezZraneni >= 3) {
                                hrdina.zmenAdrenalin(-100); 
                                tahyBezZraneni = 0;
                                aktualizujStavUI();
                            }
                        }
                    }

                    // --- DETEKCE SMRTI ---
                    if (hrdina && hrdina.getHp() <= 0) {
                        inputChat.disabled = true;
                        btnOdeslat.setAttribute("disabled", "true");
                        inputChat.placeholder = "Tvůj hrdina padl. Dobrodružství skončilo.";
                        chatLog.innerHTML += `<p style="color: #ff4444; text-align: center; font-size: 1.2em; margin-top: 15px;"><strong>☠️ KONEC HRY – Tvůj hrdina zemřel. ☠️</strong></p>`;
                        chatLog.scrollTop = chatLog.scrollHeight;
                    }
                }
            } catch (e) {
                console.error("Chyba sekundárního mechanického modelu:", e);
            }

        } catch (error: any) {
            console.error("Chyba při komunikaci s AI:", error);
            const pElement = document.getElementById(aiZpravaID);
            if (pElement) {
                pElement.innerHTML = `<strong style="color: red;">Systém:</strong> <em>Něco se pokazilo (${error.message || error}). Zkus to za chvíli.</em>`;
            }
        }
        
        chatLog.scrollTop = chatLog.scrollHeight;
    });

    // Abychom mohli odesílat zprávy i stisknutím klávesy Enter
    inputChat.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            btnOdeslat.click();
        }
    });
}