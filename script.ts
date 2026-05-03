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
        console.log(`${this.jmeno} má nyní ${this.hp}/${this.maxHp} HP.`);
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
        console.log(`${this.jmeno} má nyní ${this.mana}/100 Many.`);
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
        this.redukcePoskozeni = 0; //specifický atribut pro bojovníka
    }

    public nastavRedukci(hodnota: number): void {
        if (hodnota < 0 || hodnota > 100) throw new Error("Redukce poškození musí být mezi 0 a 100.");
        this.redukcePoskozeni = hodnota;
        console.log(`${this.jmeno} má nyní redukci poškození ${this.redukcePoskozeni}%.`);
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
        console.log(`${this.jmeno} má nyní ${this.focus}/100 Focus.`);
    }

    // Getter pro získání focusu (čtení je povolené, zápis ne)
    public getFocus(): number {
        return this.focus;
    }
}

// ==========================================
// VĚTEV PŘEDMĚTŮ (Polymorfismus)
// ==========================================

// Abstraktní třída s abstraktní metodou
abstract class Lektvar {
    protected nazev: string;

    constructor(nazev: string) {
        if (nazev.trim() === "") throw new Error("Lektvar musí mít název.");
        this.nazev = nazev;
    }

    // Každý potomek musí tuto metodu implementovat po svém
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