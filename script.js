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
        console.log("".concat(this.jmeno, " m\u00E1 nyn\u00ED ").concat(this.hp, "/").concat(this.maxHp, " HP."));
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
        console.log("".concat(this.jmeno, " m\u00E1 nyn\u00ED ").concat(this.mana, "/100 Many."));
    };
    // Getter pro získání many (čtení je povolené, zápis ne)
    Mag.prototype.getMana = function () {
        return this.mana;
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
        console.log("".concat(this.jmeno, " m\u00E1 nyn\u00ED redukci po\u0161kozen\u00ED ").concat(this.redukcePoskozeni, "%."));
    };
    // Getter pro získání redukce (čtení je povolené, zápis ne)
    Bojovnik.prototype.getRedukcePoskozeni = function () {
        return this.redukcePoskozeni;
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
        console.log("".concat(this.jmeno, " m\u00E1 nyn\u00ED ").concat(this.focus, "/100 Focus."));
    };
    // Getter pro získání focusu (čtení je povolené, zápis ne)
    Zlodej.prototype.getFocus = function () {
        return this.focus;
    };
    return Zlodej;
}(Postava));
// ==========================================
// VĚTEV PŘEDMĚTŮ (Polymorfismus)
// ==========================================
// Abstraktní třída s abstraktní metodou
var Lektvar = /** @class */ (function () {
    function Lektvar(nazev) {
        if (nazev.trim() === "")
            throw new Error("Lektvar musí mít název.");
        this.nazev = nazev;
    }
    return Lektvar;
}());
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
