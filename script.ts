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
        if (this.hp > this.maxHp) this.hp = this.maxHp;
        if (this.hp < 0) this.hp = 0;
    }

    // Getter pro získání jména (čtení je povolené, zápis ne)
    public getJmeno(): string {
        return this.jmeno;
    }

    // Getter pro získání životů (čtení je povolené, zápis ne)
    public getHp(): number {
        return this.hp;
    }

    // Getter pro získání maximálních životů (čtení je povolené, zápis ne)
    public getMaxHp(): number {
        return this.maxHp;
    }

    // Gettery pro základní atributy (čtení je povolené, zápis ne)
    public getSila(): number { return this.sila; }
    public getObratnost(): number { return this.obratnost; }
    public getInteligence(): number { return this.inteligence; }

    public abstract vypisStatus(): void;

    // Testovací metoda pro zranění
    public zranit(dmg: number): void{
        this.hp -= dmg;
        if (this.hp < 0) this.hp = 0;
        console.log(`${this.jmeno} utrpěl ${dmg} poškození. (HP: ${this.hp}/${this.maxHp})`);
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

    public vypisStatus(): void { 
    console.log(`Mág ${this.jmeno} | HP: ${this.hp}/${this.maxHp} | Mana: ${this.mana}/100`); 
    }

    // Testovací metoda pro manu
    public ztratitManu(hodnota: number): void {
        this.zmenManu(-hodnota);
        console.log(`${this.jmeno} ztratil ${hodnota} many. (Mana: ${this.mana}/100)`);
    }
}

// Konkrétní potomek: Bojovník
class Bojovnik extends Postava {
    protected redukcePoskozeni: number;

    constructor(jmeno: string, rasa: string, maxHp: number, sila: number, obratnost: number, inteligence: number) {
        super(jmeno, rasa, maxHp, sila, obratnost, inteligence); // Volání konstruktoru rodiče
        this.redukcePoskozeni = 0; //specifický atribut pro bojovníka
    }

    public nastavRedukci(hodnota: number): void {
        if (hodnota < 0 || hodnota > 100) throw new Error("Redukce poškození musí být mezi 0 a 100.");
        this.redukcePoskozeni = hodnota;
    }

    // Getter pro získání redukce (čtení je povolené, zápis ne)
    public getRedukcePoskozeni(): number {
        return this.redukcePoskozeni;
    }

    public vypisStatus(): void { 
    console.log(`Bojovník ${this.jmeno} | HP: ${this.hp}/${this.maxHp} | Redukce poškození: ${this.redukcePoskozeni}%`); 
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

    public vypisStatus(): void { 
    console.log(`Zloděj ${this.jmeno} | HP: ${this.hp}/${this.maxHp} | Focus: ${this.focus}/100`); 
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
        console.log(`${cil.getJmeno()} vypil ${this.nazev}. (HP: ${cil.getHp()}/${cil.getMaxHp()})`);
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
            console.log(`${cil.getJmeno()} vypil ${this.nazev}. (Mana: ${cil.getMana()}/100)`);
        } else {
            // Zpráva pro ne-mágy (vypije, ale nic se nestane)
            console.log(`${cil.getJmeno()} vypil ${this.nazev}, ale jelikož není mág, nic se nestalo.`);
        }
    }
}

// ==========================================
// KATEGORIE: JÍDLO (Jednoduchý předmět)
// ==========================================
// Jídlo dědí z Předmětu. Aktuálně nemá žádný herní efekt,
// ale slouží jako ukázka rozšiřitelnosti inventáře.
class Jidlo extends Predmet {
    protected popis: string;

    constructor(nazev: string, popis: string) {
        super(nazev);
        this.popis = popis;
    }

    public getPopis(): string {
        return this.popis;
    }
}

// ==========================================
// KATEGORIE: VYBAVENÍ (Zbraně, štíty atd.)
// ==========================================
// Vybavení dědí z Předmětu a přidává bonusové statistiky,
// které mohou ovlivnit bojeschopnost postavy.
class Vybaveni extends Predmet {
    protected silaBonus: number;
    protected rychlostUtoku: number;
    protected inteligenceBonus: number;
    protected obranaBonus: number;

    constructor(nazev: string, silaBonus: number, rychlostUtoku: number, inteligenceBonus: number, obranaBonus: number) {
        super(nazev);
        this.silaBonus = silaBonus;
        this.rychlostUtoku = rychlostUtoku;
        this.inteligenceBonus = inteligenceBonus;
        this.obranaBonus = obranaBonus;
    }

    // Gettery pro zjištění statistik vybavení
    public getSilaBonus(): number { return this.silaBonus; }
    public getRychlostUtoku(): number { return this.rychlostUtoku; }
    public getInteligenceBonus(): number { return this.inteligenceBonus; }
    public getObranaBonus(): number { return this.obranaBonus; }
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

// Proměnná pro hrdinu je připravená nahoře, naplníme ji až po kliknutí
let hrdina: Postava;

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
        // HLAVNÍ LOGIKA A TESTOVÁNÍ (Oživení objektů)
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

        console.log(`--- HRDINA ZROZEN ---`);
        console.log(`Jméno: ${hrdina.getJmeno()}, Rasa: ${zvolenaRasaNazev}, Povolání: ${zvolenePovolani}, HP: ${hrdina.getHp()}/${hrdina.getMaxHp()}`);
        hrdina.vypisStatus();

        // 6. Úprava uživatelského rozhraní (UI) podle toho, jaké povolání hráč hraje
        // Ujistíme se, že všechny prvky na stránce existují, než s nimi začneme pracovat
        if (uiZdrojLabel && uiZdrojText && uiZdrojBar) {
            // Použijeme "instanceof" abychom zjistili typ hrdiny a upravili text
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
                uiZdrojLabel.innerText = "Obrana";
                // Obrana funguje jinak, je to procento (např. 0%), ne body do 100
                uiZdrojText.innerText = `${hrdina.getRedukcePoskozeni()}%`;
                uiZdrojBar.style.backgroundColor = "var(--obrana-color)";
                uiZdrojBar.style.width = `${hrdina.getRedukcePoskozeni()}%`;
            }
        }

        // Aktualizace červeného baru pro životy (HP)
        if (uiHpText && uiHpBar) {
            uiHpText.innerText = `${hrdina.getHp()}/${hrdina.getMaxHp()}`;
            // Výpočet procenta: (aktuální HP / maximální HP) * 100
            const procentoHp = (hrdina.getHp() / hrdina.getMaxHp()) * 100;
            uiHpBar.style.width = `${procentoHp}%`;
        }

        // Aktualizace jména, rasy, povolání a atributů (Síla, Obratnost, Inteligence)
        if (uiJmeno && uiRasaPovolani && uiSila && uiObratnost && uiInteligence) {
            uiJmeno.innerText = hrdina.getJmeno();
            uiRasaPovolani.innerText = `${zvolenaRasaNazev} | ${zvolenePovolani}`;
            
            // Atributy převedeme na text (string) pro vypsání do HTML
            uiSila.innerText = hrdina.getSila().toString();
            uiObratnost.innerText = hrdina.getObratnost().toString();
            uiInteligence.innerText = hrdina.getInteligence().toString();
        }

        // 7. Oživení lektvarů z číselníku do inventáře pro testování
        const inventar: Predmet[] = [];

        // Načtení lektvarů z databáze
        for (const data of suroveLektvary) {
            if (data.typ === "zdravi") {
                inventar.push(new LektvarZdravi(data.nazev, data.hodnota));
            } else if (data.typ === "mana") {
                inventar.push(new LektvarMany(data.nazev, data.hodnota));
            }
        }

        // Načtení jídla z databáze
        for (const data of suroveJidlo) {
            inventar.push(new Jidlo(data.nazev, data.popis));
        }

        // Načtení vybavení z databáze
        for (const data of suroveVybaveni) {
            inventar.push(new Vybaveni(
                data.nazev,
                data.modSila,
                data.modRychlostUtoku,
                data.modInteligence,
                data.modObrana
            ));
        }

        // 8. Vykreslení inventáře do HTML rozhraní
        if (uiSeznamInventar) {
            uiSeznamInventar.innerHTML = ""; // Nejprve vyčistíme starý seznam

            for (const predmet of inventar) {
                // Vytvoříme novou položku seznamu (li)
                const li = document.createElement("li");
                
                // Vložíme do ní název předmětu
                li.innerText = predmet.getNazev();

                // Přidáme položku do HTML seznamu
                uiSeznamInventar.appendChild(li);
            }
        }

        console.log(`--- TESTOVÁNÍ POLYMORFISMU ---`);

        // 7. Testovací smyčka zranění a léčení z inventáře
        hrdina.zranit(20);
        if (hrdina instanceof Mag) hrdina.ztratitManu(60);

        for (const predmet of inventar) {
            // Zkontrolujeme, zda předmět z inventáře jde použít jako lektvar
            if (predmet instanceof Lektvar) { 
                predmet.pouzit(hrdina);
            } else {
                console.log(`${predmet.getNazev()} nelze použít.`);
            }
        }
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