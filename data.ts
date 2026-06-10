// Databáze dostupných lektvarů ve hře
const suroveLektvary = [
    { typ: "zdravi", nazev: "Malá léčivá lahvička", hodnota: 25 },
    { typ: "zdravi", nazev: "Velký elixír života",  hodnota: 50 },
    { typ: "mana",   nazev: "Zářivý modrý lektvar", hodnota: 30 },
    { typ: "mana",   nazev: "Esence čisté magie",   hodnota: 100 }
];

// Databáze dostupného jídla ve hře (jidlo)
const suroveJidlo = [
    { nazev: "Jablko", popis: "Červené a šťavnaté jablko, skvělá svačina.", leceni: 5 },
    { nazev: "Pečené kuře", popis: "Křupavé pečené kuře, které voní na dálku.", leceni: 15 }
];

// Databáze dostupného vybavení ve hře (vybaveni)
const suroveVybaveni = [
    // --- MEČE (Hlavní stat: Síla) ---
    { typ: "zbran", nazev: "Železný meč", modSila: 5, modObratnost: 0, modInteligence: 0, modObrana: 0, modRychlostUtoku: 1.0 },
    { typ: "zbran", nazev: "Ocelový meč", modSila: 10, modObratnost: 0, modInteligence: 0, modObrana: 0, modRychlostUtoku: 1.0 },
    { typ: "zbran", nazev: "Mýtický ohnivý meč", modSila: 15, modObratnost: 5, modInteligence: 5, modObrana: 0, modRychlostUtoku: 1.0 },

    // --- DÝKY (Hlavní stat: Obratnost) ---
    { typ: "zbran", nazev: "Rezavá dýka", modSila: 0, modObratnost: 5, modInteligence: 0, modObrana: 0, modRychlostUtoku: 1.2 },
    { typ: "zbran", nazev: "Ostrá dýka", modSila: 0, modObratnost: 10, modInteligence: 0, modObrana: 0, modRychlostUtoku: 1.2 },
    { typ: "zbran", nazev: "Stínová dýka smrti", modSila: 5, modObratnost: 15, modInteligence: 5, modObrana: 0, modRychlostUtoku: 1.2 },

    // --- HOLE (Hlavní stat: Inteligence) ---
    { typ: "zbran", nazev: "Dřevěná hůl", modSila: 0, modObratnost: 0, modInteligence: 5, modObrana: 0, modRychlostUtoku: 0.8 },
    { typ: "zbran", nazev: "Křišťálová hůl", modSila: 0, modObratnost: 0, modInteligence: 10, modObrana: 0, modRychlostUtoku: 0.8 },
    { typ: "zbran", nazev: "Hůl prastarých mágů", modSila: 5, modObratnost: 5, modInteligence: 15, modObrana: 0, modRychlostUtoku: 0.8 },

    // --- ŠTÍTY (Hlavní stat: Obrana -> Max HP) ---
    { typ: "stit", nazev: "Dřevěný štít", modSila: 0, modObratnost: 0, modInteligence: 0, modObrana: 10, modRychlostUtoku: 1.0 },
    { typ: "stit", nazev: "Železný štít", modSila: 0, modObratnost: 0, modInteligence: 0, modObrana: 20, modRychlostUtoku: 1.0 },
    { typ: "stit", nazev: "Aégis - Štít bohů", modSila: 5, modObratnost: 5, modInteligence: 5, modObrana: 30, modRychlostUtoku: 1.0 }
];

// Databáze herních ras (modifikátory k základu: HP 50, staty 5)
const suroveRasy = [
    { nazev: "Člověk",   modHp:   0, modSila:  1, modObratnost:  1, modInteligence:  1 },
    { nazev: "Elf",      modHp: -10, modSila: -1, modObratnost:  1, modInteligence:  3 },
    { nazev: "Trpaslík", modHp:  20, modSila:  2, modObratnost: -2, modInteligence: -1 }
];