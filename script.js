// ==========================================
// VĚTEV POSTAV (Dědičnost a Zapouzdření)
// ==========================================
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Abstraktní bázová třída pro všechny entity ve hře
var Postava = /** @class */ (function () {
    function Postava(jmeno, rasa, maxHp, sila, obratnost, inteligence) {
        // Validace dat (nesmí projít nesmyslné hodnoty)
        if (jmeno.trim() === "")
            throw new Error("Jméno nesmí být prázdné.");
        if (maxHp <= 0)
            throw new Error("Maximální HP musí být kladné.");
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
    Postava.prototype.zmenHp = function (hodnota) {
        this.hp += hodnota;
        if (this.hp > this.maxHp)
            this.hp = this.maxHp;
        if (this.hp < 0)
            this.hp = 0;
    };
    // Getter pro získání jména (čtení je povolené, zápis ne)
    Postava.prototype.getJmeno = function () {
        return this.jmeno;
    };
    // Getter pro získání životů (čtení je povolené, zápis ne)
    Postava.prototype.getHp = function () {
        return this.hp;
    };
    // Getter pro získání maximálních životů (čtení je povolené, zápis ne)
    Postava.prototype.getMaxHp = function () {
        return this.maxHp;
    };
    // Testovací metoda pro zranění
    Postava.prototype.zranit = function (dmg) {
        this.hp -= dmg;
        if (this.hp < 0)
            this.hp = 0;
        console.log("".concat(this.jmeno, " utrp\u011Bl ").concat(dmg, " po\u0161kozen\u00ED. (HP: ").concat(this.hp, "/").concat(this.maxHp, ")"));
    };
    return Postava;
}());
// Konkrétní potomek: Mág
var Mag = /** @class */ (function (_super) {
    __extends(Mag, _super);
    function Mag(jmeno, rasa, maxHp, sila, obratnost, inteligence) {
        var _this = _super.call(this, jmeno, rasa, maxHp, sila, obratnost, inteligence) || this; // Volání konstruktoru rodiče
        _this.mana = 100; // Specifický atribut pro mága
        return _this;
    }
    Mag.prototype.zmenManu = function (hodnota) {
        this.mana += hodnota;
        if (this.mana > 100)
            this.mana = 100;
        if (this.mana < 0)
            this.mana = 0;
    };
    // Getter pro získání many (čtení je povolené, zápis ne)
    Mag.prototype.getMana = function () {
        return this.mana;
    };
    Mag.prototype.vypisStatus = function () {
        console.log("M\u00E1g ".concat(this.jmeno, " | HP: ").concat(this.hp, "/").concat(this.maxHp, " | Mana: ").concat(this.mana, "/100"));
    };
    // Testovací metoda pro manu
    Mag.prototype.ztratitManu = function (hodnota) {
        this.zmenManu(-hodnota);
        console.log("".concat(this.jmeno, " ztratil ").concat(hodnota, " many. (Mana: ").concat(this.mana, "/100)"));
    };
    return Mag;
}(Postava));
// Konkrétní potomek: Bojovník
var Bojovnik = /** @class */ (function (_super) {
    __extends(Bojovnik, _super);
    function Bojovnik(jmeno, rasa, maxHp, sila, obratnost, inteligence) {
        var _this = _super.call(this, jmeno, rasa, maxHp, sila, obratnost, inteligence) || this; // Volání konstruktoru rodiče
        _this.redukcePoskozeni = 0; //specifický atribut pro bojovníka
        return _this;
    }
    Bojovnik.prototype.nastavRedukci = function (hodnota) {
        if (hodnota < 0 || hodnota > 100)
            throw new Error("Redukce poškození musí být mezi 0 a 100.");
        this.redukcePoskozeni = hodnota;
    };
    // Getter pro získání redukce (čtení je povolené, zápis ne)
    Bojovnik.prototype.getRedukcePoskozeni = function () {
        return this.redukcePoskozeni;
    };
    Bojovnik.prototype.vypisStatus = function () {
        console.log("Bojovn\u00EDk ".concat(this.jmeno, " | HP: ").concat(this.hp, "/").concat(this.maxHp, " | Redukce po\u0161kozen\u00ED: ").concat(this.redukcePoskozeni, "%"));
    };
    return Bojovnik;
}(Postava));
// Konkrétní potomek: Zloděj
var Zlodej = /** @class */ (function (_super) {
    __extends(Zlodej, _super);
    function Zlodej(jmeno, rasa, maxHp, sila, obratnost, inteligence) {
        var _this = _super.call(this, jmeno, rasa, maxHp, sila, obratnost, inteligence) || this; // Volání konstruktoru rodiče
        _this.focus = 100; // Specifický atribut pro zloděje
        return _this;
    }
    Zlodej.prototype.zmenFocus = function (hodnota) {
        this.focus += hodnota;
        if (this.focus > 100)
            this.focus = 100;
        if (this.focus < 0)
            this.focus = 0;
    };
    // Getter pro získání focusu (čtení je povolené, zápis ne)
    Zlodej.prototype.getFocus = function () {
        return this.focus;
    };
    Zlodej.prototype.vypisStatus = function () {
        console.log("Zlod\u011Bj ".concat(this.jmeno, " | HP: ").concat(this.hp, "/").concat(this.maxHp, " | Focus: ").concat(this.focus, "/100"));
    };
    return Zlodej;
}(Postava));
// ==========================================
// VĚTEV PŘEDMĚTŮ (Polymorfismus)
// ==========================================
// Nejvyšší třída pro všechny věci v inventáři
var Predmet = /** @class */ (function () {
    function Predmet(nazev) {
        if (nazev.trim() === "")
            throw new Error("Předmět musí mít název.");
        this.nazev = nazev;
    }
    Predmet.prototype.getNazev = function () {
        return this.nazev;
    };
    return Predmet;
}());
// Lektvar dědí z Předmětu
var Lektvar = /** @class */ (function (_super) {
    __extends(Lektvar, _super);
    function Lektvar(nazev) {
        return _super.call(this, nazev) || this;
    }
    return Lektvar;
}(Predmet));
// Konkrétní implementace lektvaru
var LektvarZdravi = /** @class */ (function (_super) {
    __extends(LektvarZdravi, _super);
    function LektvarZdravi(nazev, silaLeceni) {
        var _this = _super.call(this, nazev) || this;
        if (silaLeceni <= 0)
            throw new Error("Síla léčení musí být kladná.");
        _this.silaLeceni = silaLeceni;
        return _this;
    }
    LektvarZdravi.prototype.pouzit = function (cil) {
        cil.zmenHp(this.silaLeceni);
        console.log("".concat(cil.getJmeno(), " vypil ").concat(this.nazev, ". (HP: ").concat(cil.getHp(), "/").concat(cil.getMaxHp(), ")"));
    };
    return LektvarZdravi;
}(Lektvar));
var LektvarMany = /** @class */ (function (_super) {
    __extends(LektvarMany, _super);
    function LektvarMany(nazev, doplneni) {
        var _this = _super.call(this, nazev) || this;
        if (doplneni <= 0)
            throw new Error("Doplnění many musí být kladné.");
        _this.doplneni = doplneni;
        return _this;
    }
    LektvarMany.prototype.pouzit = function (cil) {
        if (cil instanceof Mag) {
            cil.zmenManu(this.doplneni);
            console.log("".concat(cil.getJmeno(), " vypil ").concat(this.nazev, ". (Mana: ").concat(cil.getMana(), "/100)"));
        }
        else {
            // Zpráva pro ne-mágy (vypije, ale nic se nestane)
            console.log("".concat(cil.getJmeno(), " vypil ").concat(this.nazev, ", ale jeliko\u017E nen\u00ED m\u00E1g, nic se nestalo."));
        }
    };
    return LektvarMany;
}(Lektvar));
var tlacitkoZacit = document.getElementById("btn-zacit");
var obrazovkaTvorba = document.getElementById("screen-tvorba");
var obrazovkaHra = document.getElementById("screen-hra");
// Správná kontrola: Zjistíme, zda všechny tři HTML prvky existují
if (tlacitkoZacit && obrazovkaTvorba && obrazovkaHra) {
    tlacitkoZacit.addEventListener("click", function () {
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
var zvoleneJmeno = "Aerin";
var zvolenaRasaNazev = "Elf";
var zvolenePovolani = "Mag";
// 2. Nalezení rasy v datovém číselníku
var vybranaRasa = suroveRasy.find(function (rasa) { return rasa.nazev === zvolenaRasaNazev; });
// Bezpečnostní pojistka, kdybychom udělali překlep v názvu
if (!vybranaRasa) {
    throw new Error("Vybraná rasa neexistuje v databázi!");
}
// 3. Výpočet finálních statů (pevný základ + modifikátor rasy)
// Základní HP je 50, zbytek statů 5, přičteme úpravy z vybrané rasy
var startHp = 50 + vybranaRasa.modHp;
var startSila = 5 + vybranaRasa.modSila;
var startObratnost = 5 + vybranaRasa.modObratnost;
var startInteligence = 5 + vybranaRasa.modInteligence;
// 4. Vytvoření proměnné pro hrdinu (typ Postava)
var hrdina;
// Podle vybraného povolání vytvoříme správnou instanci pomocí if / else if
if (zvolenePovolani === "Mag") {
    hrdina = new Mag(zvoleneJmeno, zvolenaRasaNazev, startHp, startSila, startObratnost, startInteligence);
}
else if (zvolenePovolani === "Bojovnik") {
    hrdina = new Bojovnik(zvoleneJmeno, zvolenaRasaNazev, startHp, startSila, startObratnost, startInteligence);
}
else if (zvolenePovolani === "Zlodej") {
    hrdina = new Zlodej(zvoleneJmeno, zvolenaRasaNazev, startHp, startSila, startObratnost, startInteligence);
}
else {
    throw new Error("Neznámé povolání!");
}
console.log("--- HRDINA ZROZEN ---");
console.log("Jm\u00E9no: ".concat(hrdina.getJmeno(), ", Rasa: ").concat(zvolenaRasaNazev, ", Povol\u00E1n\u00ED: ").concat(zvolenePovolani, ", HP: ").concat(hrdina.getHp(), "/").concat(hrdina.getMaxHp()));
hrdina.vypisStatus();
// 5. Oživení lektvarů z číselníku do inventáře
// Vytvoříme prázdné pole, které přijímá jakékoliv lektvary
var inventar = [];
// Projdeme surová data a vytvoříme z nich objekty
for (var _i = 0, suroveLektvary_1 = suroveLektvary; _i < suroveLektvary_1.length; _i++) {
    var data = suroveLektvary_1[_i];
    if (data.typ === "zdravi") {
        inventar.push(new LektvarZdravi(data.nazev, data.hodnota));
    }
    else if (data.typ === "mana") {
        inventar.push(new LektvarMany(data.nazev, data.hodnota));
    }
}
console.log("--- TESTOV\u00C1N\u00CD POLYMORFISMU ---");
// 6. Testovací smyčka
hrdina.zranit(20);
if (hrdina instanceof Mag)
    hrdina.ztratitManu(60);
for (var _a = 0, inventar_1 = inventar; _a < inventar_1.length; _a++) {
    var predmet = inventar_1[_a];
    if (predmet instanceof Lektvar) { // Ověříme, že to je použitelné (Lektvar)
        predmet.pouzit(hrdina);
    }
    else {
        console.log("".concat(predmet.getNazev(), " nelze pou\u017E\u00EDt."));
    }
}
