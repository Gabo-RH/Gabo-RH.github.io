window.GameData = {
    items: {
        Weapons: {
            Sword: {
                Wood:    { damage: 2, cost: 5, material: "Wood", Dex: 1, Str: 1, Speed: 5, Ability: "Stun" },
                Broken:  { damage: 2.5, cost: 10, Dex: 1, Str: 1, Speed: 4 },
                Bronze:  { damage: 3, cost: 20, material: "Copper", Dex: 2, Str: 2, Speed: 3, Ability: "Combo", Ability2: "Laceration" },
                Iron:    { damage: 4, cost: 30, material: "Iron", Dex: 4, Str: 3, Speed: 2, Ability: "Combo", Ability2: "Laceration" }
            },
            BattleAxe: {
                Stone:   { damage: 2.5, cost: 7, material: "Stone", Str: 1, speed: 2, Ability: "Rage" },
                Broken:  { damage: 3, cost: 14, Str: 2, speed: 1.5, Ability: "Rage" },
                Bronze:  { damage: 4, cost: 28, material: "Copper", Str: 3, speed: 1, Ability: "Rage" },
                Iron:    { damage: 5, cost: 42, material: "Iron", Str: 4, speed: 0.5, Ability: "Rage" }
            }
            // You can continue adding more weapon categories here
        },
        Armour: {
            Leather: {
                Helmet:    { price: 10, defense: 0.5, material: "Leather" },
                Chest:     { price: 20, defense: 1.5, material: "Leather" },
                Gauntlets: { price: 10, defense: 1, material: "Leather" },
                Boots:     { price: 10, defense: 1, material: "Leather" }
            }
        },
        Healing: {
            // Add healing items here
        },
        Treasures: {
            // Add treasures here
        }
    },

    enemies: {
        goblin1: {
            name: "Goblin",
            health: 10,
            weapon: "Barehand",
                skill: "Rock-Throw",
                drops: {
                common: {
                    Goblin_ear: { Probability: 50, Max: 2, min: 1 }
                },
                rare: {
                    Medical_Herb: { Probability: 10, Max: 3, min: 1 },
                    Stone:        { Probability: 10, Max: 2, min: 1 }
                }
            }
        },
        goblin2: {
            name: "Goblin with a club",
            health: 10,
            weapon: "Club",
            skill: "Stun",
            drops: {
                common: {
                    Goblin_ear: { Probability: 50, Max: 2, min: 1 }
                },
                rare: {
                    Medical_Herb: { Probability: 10, Max: 3, min: 1 },
                    Goblin_Club:  { Probability: 10, Max: 1, min: 1 }
                }
            }
        },
        wolfbeta: {
            name: "Beta Wolf",
            health: 5,
            weapon: "Fangs",
            skill: "Bleed"
        }
    }
};
