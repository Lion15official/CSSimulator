const Logic = {
    odds: { gold: 0.26, red: 0.64, pink: 3.2, purple: 15.98, blue: 79.92 },

    rollRarity: function () {
        const r = Math.random() * 100;
        let cumulative = 0;
        if (r < (cumulative += this.odds.gold)) return 'gold';
        if (r < (cumulative += this.odds.red)) return 'red';
        if (r < (cumulative += this.odds.pink)) return 'pink';
        if (r < (cumulative += this.odds.purple)) return 'purple';
        return 'blue';
    },

    getItem: function (caseKey) {
        const initialRarity = this.rollRarity();
        const rarityOrder = ['red', 'pink', 'purple', 'blue'];

        // Znajdź indeks wylosowanej rzadkości
        let startIndex = rarityOrder.indexOf(initialRarity);
        if (startIndex === -1) startIndex = 3; // Fallback to blue

        // Szukaj przedmiotu, schodząc w dół rzadkości (np. Red -> Pink -> Purple -> Blue)
        for (let i = startIndex; i < rarityOrder.length; i++) {
            const currentRarity = rarityOrder[i];
            const possibleItems = caseData[caseKey].items.filter(item => item.rarity === currentRarity);

            if (possibleItems.length > 0) {
                return possibleItems[Math.floor(Math.random() * possibleItems.length)];
            }
        }

        // Ostateczny fallback (gdyby skrzynka była pusta lub miała same goldy - co nie powinno się zdarzyć)
        return { name: "Błąd Skrzynki", rarity: "blue", price: 0.00 };
    }
};