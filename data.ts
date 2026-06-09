// Databáze dostupných lektvarů ve hře
const suroveLektvary = [
    { typ: "zdravi", nazev: "Malá léčivá lahvička", hodnota: 25 },
    { typ: "zdravi", nazev: "Velký elixír života",  hodnota: 50 },
    { typ: "mana",   nazev: "Zářivý modrý lektvar", hodnota: 30 },
    { typ: "mana",   nazev: "Esence čisté magie",   hodnota: 100 }
];

// Databáze dostupného jídla ve hře (jidlo)
const suroveJidlo = [
    { nazev: "Jablko", popis: "Červené a šťavnaté jablko, skvělá svačina." },
    { nazev: "Pečené kuře", popis: "Křupavé pečené kuře, které voní na dálku." }
];

// Databáze dostupného vybavení ve hře (vybaveni)
const suroveVybaveni = [
    // Zbraně a štíty s jejich bonusovými statistikami (Síla, Rychlost útoku, Inteligence, Obrana)
    { nazev: "Železný meč", modSila: 5, modRychlostUtoku: 1.2, modInteligence: 0, modObrana: 0 },
    { nazev: "Dřevěný štít", modSila: 0, modRychlostUtoku: 0.8, modInteligence: 0, modObrana: 10 },
    { nazev: "Dřevěná magická hůl", modSila: 1, modRychlostUtoku: 1.0, modInteligence: 3, modObrana: 0 },
    { nazev: "Křišťálová hůl", modSila: 2, modRychlostUtoku: 1.1, modInteligence: 8, modObrana: 0 }
];

// Databáze herních ras (modifikátory k základu: HP 50, staty 5)
const suroveRasy = [
    { nazev: "Člověk",   modHp:   0, modSila:  1, modObratnost:  1, modInteligence:  1 },
    { nazev: "Elf",      modHp: -10, modSila: -1, modObratnost:  1, modInteligence:  3 },
    { nazev: "Trpaslík", modHp:  20, modSila:  2, modObratnost: -2, modInteligence: -1 }
];