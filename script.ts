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

const tlacitkoZacit = document.getElementById("btn-zacit");
const obrazovkaTvorba = document.getElementById("screen-tvorba");
const obrazovkaHra = document.getElementById("screen-hra");

// Správná kontrola: Zjistíme, zda všechny tři HTML prvky existují
if (tlacitkoZacit && obrazovkaTvorba && obrazovkaHra) {
    tlacitkoZacit.addEventListener("click", () => {
        // Skryje obrazovku tvorby
        obrazovkaTvorba.style.display = "none";
        
        // Zobrazí herní obrazovku
        obrazovkaHra.style.display = "block";
    });
}

// ==========================================
// HLAVNÍ LOGIKA A TESTOVÁNÍ (Oživení objektů)
// ==========================================

// 1. Simulace vstupu od hráče (výběr v UI)
const zvoleneJmeno = "Aerin";
const zvolenaRasaNazev = "Elf";
const zvolenePovolani = "Mag";

// 2. Nalezení rasy v datovém číselníku
const vybranaRasa = suroveRasy.find(rasa => rasa.nazev === zvolenaRasaNazev);

// Bezpečnostní pojistka, kdybychom udělali překlep v názvu
if (!vybranaRasa) {
    throw new Error("Vybraná rasa neexistuje v databázi!");
}

// 3. Výpočet finálních statů (pevný základ + modifikátor rasy)
// Základní HP je 50, zbytek statů 5, přičteme úpravy z vybrané rasy
const startHp = 50 + vybranaRasa.modHp;
const startSila = 5 + vybranaRasa.modSila;
const startObratnost = 5 + vybranaRasa.modObratnost;
const startInteligence = 5 + vybranaRasa.modInteligence;

// 4. Vytvoření proměnné pro hrdinu (typ Postava)
let hrdina: Postava;

// Podle vybraného povolání vytvoříme správnou instanci pomocí if / else if
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

// 5. Oživení lektvarů z číselníku do inventáře
// Vytvoříme prázdné pole, které přijímá jakékoliv lektvary
const inventar: Predmet[] = [];

// Projdeme surová data a vytvoříme z nich objekty
for (const data of suroveLektvary) {
    if (data.typ === "zdravi") {
        inventar.push(new LektvarZdravi(data.nazev, data.hodnota));
    } else if (data.typ === "mana") {
        inventar.push(new LektvarMany(data.nazev, data.hodnota));
    }
}

console.log(`--- TESTOVÁNÍ POLYMORFISMU ---`);

// 6. Testovací smyčka
hrdina.zranit(20);
if (hrdina instanceof Mag) hrdina.ztratitManu(60);

for (const predmet of inventar) {
    if (predmet instanceof Lektvar) { // Ověříme, že to je použitelné (Lektvar)
        predmet.pouzit(hrdina);
    } else {
        console.log(`${predmet.getNazev()} nelze použít.`);
    }
}