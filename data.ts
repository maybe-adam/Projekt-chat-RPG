// Databáze dostupných lektvarů ve hře
const suroveLektvary = [
    { typ: "zdravi", nazev: "Malá léčivá lahvička", hodnota: 25 },
    { typ: "zdravi", nazev: "Velký elixír života",  hodnota: 50 },
    { typ: "mana",   nazev: "Zářivý modrý lektvar", hodnota: 30 },
    { typ: "mana",   nazev: "Esence čisté magie",   hodnota: 100 }
];

// Databáze herních ras (modifikátory k základu: HP 50, staty 5)
const suroveRasy = [
    { nazev: "Člověk",   modHp:   0, modSila:  1, modObratnost:  1, modInteligence:  1 },
    { nazev: "Elf",      modHp: -10, modSila: -1, modObratnost:  1, modInteligence:  3 },
    { nazev: "Trpaslík", modHp:  20, modSila:  2, modObratnost: -2, modInteligence: -1 }
];