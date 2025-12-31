const QuestDatabase = [
    { type: 'casesOpened', title: "Szybki Drop", desc: "Otwórz {n} skrzynek", base: 5, mult: 2 },
    { type: 'casesOpened', title: "Kolekcjoner", desc: "Otwórz {n} skrzynek", base: 12, mult: 1.8 },
    { type: 'casesOpened', title: "Maniak Skrzynek", desc: "Otwórz {n} skrzynek", base: 25, mult: 1.5 },
    { type: 'casesOpened', title: "Nocna Zmiana", desc: "Otwórz {n} skrzynek", base: 10, mult: 2.5 },
    { type: 'casesOpened', title: "Fanatyk Kluczy", desc: "Otwórz {n} skrzynek", base: 8, mult: 2.2 },
    { type: 'casesOpened', title: "Wielkie Rozpakowanie", desc: "Otwórz {n} skrzynek", base: 40, mult: 1.3 },
    { type: 'casesOpened', title: "Skrzynkowy Speedrun", desc: "Otwórz {n} skrzynek", base: 15, mult: 1.9 },
    { type: 'casesOpened', title: "Dostawa Towaru", desc: "Otwórz {n} skrzynek", base: 20, mult: 1.7 },
    { type: 'casesOpened', title: "Głód Skinów", desc: "Otwórz {n} skrzynek", base: 6, mult: 2.4 },
    { type: 'casesOpened', title: "Fabryka Szczęścia", desc: "Otwórz {n} skrzynek", base: 30, mult: 1.4 },
    { type: 'casesOpened', title: "Magazynier", desc: "Otwórz {n} skrzynek", base: 18, mult: 1.8 },
    { type: 'casesOpened', title: "Otwieracz Amator", desc: "Otwórz {n} skrzynek", base: 4, mult: 2.1 },
    { type: 'casesOpened', title: "Weteran Skrzynek", desc: "Otwórz {n} skrzynek", base: 50, mult: 1.2 },
    { type: 'casesOpened', title: "Złoty Klucz", desc: "Otwórz {n} skrzynek", base: 7, mult: 2.6 },
    { type: 'casesOpened', title: "Hurtownik", desc: "Otwórz {n} skrzynek", base: 35, mult: 1.5 },

    // --- KATEGORIA: HANDEL (itemsSold) ---
    { type: 'itemsSold', title: "Lokalny Handlarz", desc: "Sprzedaj {n} przedmiotów", base: 10, mult: 1.2 },
    { type: 'itemsSold', title: "Wyprzedaż Garażowa", desc: "Sprzedaj {n} przedmiotów", base: 20, mult: 1.1 },
    { type: 'itemsSold', title: "Rekin Rynku", desc: "Sprzedaj {n} przedmiotów", base: 50, mult: 1.0 },
    { type: 'itemsSold', title: "Szybka Gotówka", desc: "Sprzedaj {n} przedmiotów", base: 5, mult: 1.5 },
    { type: 'itemsSold', title: "Czyszczenie EQ", desc: "Sprzedaj {n} przedmiotów", base: 15, mult: 1.3 },
    { type: 'itemsSold', title: "Inwestor", desc: "Sprzedaj {n} przedmiotów", base: 30, mult: 1.2 },
    { type: 'itemsSold', title: "Biznesmen", desc: "Sprzedaj {n} przedmiotów", base: 25, mult: 1.25 },
    { type: 'itemsSold', title: "Handel Wymienny", desc: "Sprzedaj {n} przedmiotów", base: 12, mult: 1.4 },
    { type: 'itemsSold', title: "Pozbywanie się Śmieci", desc: "Sprzedaj {n} przedmiotów", base: 45, mult: 1.1 },
    { type: 'itemsSold', title: "Mistrz Sprzedaży", desc: "Sprzedaj {n} przedmiotów", base: 60, mult: 0.9 },
    { type: 'itemsSold', title: "Ekonomista", desc: "Sprzedaj {n} przedmiotów", base: 8, mult: 1.6 },
    { type: 'itemsSold', title: "Płynność Finansowa", desc: "Sprzedaj {n} przedmiotów", base: 22, mult: 1.2 },
    { type: 'itemsSold', title: "Wielki Dumping", desc: "Sprzedaj {n} przedmiotów", base: 100, mult: 0.8 },
    { type: 'itemsSold', title: "Mały Zysk", desc: "Sprzedaj {n} przedmiotów", base: 3, mult: 2.0 },
    { type: 'itemsSold', title: "Broker Skinów", desc: "Sprzedaj {n} przedmiotów", base: 18, mult: 1.4 },

    // --- KATEGORIA: HAZARD (upgradesDone) ---
    { type: 'upgradesDone', title: "Małe Ryzyko", desc: "Użyj Upgradera {n} razy", base: 3, mult: 5 },
    { type: 'upgradesDone', title: "Hazardzista", desc: "Użyj Upgradera {n} razy", base: 7, mult: 4.5 },
    { type: 'upgradesDone', title: "Władca Szansy", desc: "Użyj Upgradera {n} razy", base: 15, mult: 4 },
    { type: 'upgradesDone', title: "All-in", desc: "Użyj Upgradera {n} razy", base: 2, mult: 6 },
    { type: 'upgradesDone', title: "Szczęściarz", desc: "Użyj Upgradera {n} razy", base: 5, mult: 5.5 },
    { type: 'upgradesDone', title: "Ryzykant", desc: "Użyj Upgradera {n} razy", base: 10, mult: 4.8 },
    { type: 'upgradesDone', title: "Kowalski", desc: "Użyj Upgradera {n} razy", base: 4, mult: 5.2 },
    { type: 'upgradesDone', title: "Ulepszacz Broni", desc: "Użyj Upgradera {n} razy", base: 8, mult: 4.6 },
    { type: 'upgradesDone', title: "Magik Przegranych", desc: "Użyj Upgradera {n} razy", base: 12, mult: 4.2 },
    { type: 'upgradesDone', title: "Wielka Próba", desc: "Użyj Upgradera {n} razy", base: 20, mult: 3.5 },
    { type: 'upgradesDone', title: "Szybkie Ulepszenie", desc: "Użyj Upgradera {n} razy", base: 6, mult: 5.0 },
    { type: 'upgradesDone', title: "Test Szczęścia", desc: "Użyj Upgradera {n} razy", base: 9, mult: 4.7 },
    { type: 'upgradesDone', title: "Inżynier Skinów", desc: "Użyj Upgradera {n} razy", base: 14, mult: 4.3 },
    { type: 'upgradesDone', title: "Ryzykowny Interes", desc: "Użyj Upgradera {n} razy", base: 11, mult: 4.5 },
    { type: 'upgradesDone', title: "Mistrz Kowalstwa", desc: "Użyj Upgradera {n} razy", base: 25, mult: 3.2 },
    { type: 'upgradesDone', title: "Ostatnia Szansa", desc: "Użyj Upgradera {n} razy", base: 1, mult: 10 },
    { type: 'upgradesDone', title: "Stabilne Ulepszanie", desc: "Użyj Upgradera {n} razy", base: 13, mult: 4.4 },
    { type: 'upgradesDone', title: "Poszukiwacz Zysku", desc: "Użyj Upgradera {n} razy", base: 16, mult: 4.1 },
    { type: 'upgradesDone', title: "Goniąc Marzenia", desc: "Użyj Upgradera {n} razy", base: 18, mult: 4.0 },
    { type: 'upgradesDone', title: "Gorączka Złota", desc: "Użyj Upgradera {n} razy", base: 22, mult: 3.8 }
];

const MissionSystem = {
    // Funkcja losująca 3 zadania z bazy
    generateDailyMissions: function () {
        const shuffled = [...QuestDatabase].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        return selected.map((m, index) => {
            const multiplier = Math.floor(Math.random() * 3) + 1; // Losowa trudność x1, x2 lub x3
            const finalGoal = m.base * multiplier;

            return {
                id: 'q_' + Date.now() + index,
                type: m.type,
                title: m.title,
                desc: m.desc.replace('{n}', finalGoal),
                goal: finalGoal,
                rewardMoney: Math.floor(finalGoal * m.rewardMult),
                rewardXP: finalGoal * 20
            };
        });
    },

    // Sprawdzanie, czy trzeba zresetować misje (co 24h)
    checkAndResetMissions: function () {
        const lastReset = localStorage.getItem('cs_last_mission_reset');
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        const currentStored = JSON.parse(localStorage.getItem('cs_current_missions') || '[]');

        if (!lastReset || (now - lastReset > twentyFourHours) || currentStored.length === 0) {
            const newMissions = this.generateDailyMissions();
            localStorage.setItem('cs_current_missions', JSON.stringify(newMissions));
            localStorage.setItem('cs_last_mission_reset', now);

            // Resetujemy postępy tylko dla misji
            const progress = { casesOpened: 0, itemsSold: 0, upgradesDone: 0, claimed: [] };
            localStorage.setItem('cs_mission_progress', JSON.stringify(progress));

            return { missions: newMissions, progress: progress };
        }

        return null; // Nie trzeba resetować
    }
};