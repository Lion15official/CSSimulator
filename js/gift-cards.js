const GiftCardDatabase = {
    "START-2025": 50.00,
    "GEMINI-GIFT": 100.00,
    "FREE-CASE": 10.00,
    "PROMO-25": 25.00
};

const GiftCardSystem = {
    redeem: function(code) {
        const amount = GiftCardDatabase[code.toUpperCase()];
        if (amount) {
            // Usuwamy kod po użyciu (opcjonalnie, wymagałoby to zapisu w localStorage)
            // Na razie pozwalamy na użycie, ale w prawdziwej grze kod by znikał
            return amount;
        }
        return null;
    }
};