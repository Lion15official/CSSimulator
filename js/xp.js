const RANKS = [
    "SILVER I", "SILVER II", "SILVER III", "SILVER IV", "SILVER ELITE", "SILVER ELITE MASTER",
    "GOLD NOVA I", "GOLD NOVA II", "GOLD NOVA III", "GOLD NOVA MASTER",
    "MASTER GUARDIAN I", "MASTER GUARDIAN II", "MASTER GUARDIAN ELITE", "DMG",
    "LEGENDARY EAGLE", "LEM", "SUPREME", "GLOBAL ELITE"
];

const XP_PER_LEVEL = 100;

const XPManager = {
    xp: parseInt(localStorage.getItem('cs_xp')) || 0,
    totalOpened: parseInt(localStorage.getItem('cs_opened')) || 0,

    addXP(amount) {
        this.xp += amount;
        this.save();
        this.updateUI();
    },

    addOpened() {
        this.totalOpened++;
        this.save();
        this.updateUI();
    },

    save() {
        localStorage.setItem('cs_xp', this.xp);
        localStorage.setItem('cs_opened', this.totalOpened);
    },

    updateUI() {
        const level = Math.floor(this.xp / XP_PER_LEVEL) + 1;
        const currentXP = this.xp % XP_PER_LEVEL;
        const rankIndex = Math.min(Math.floor(level / 2), RANKS.length - 1);

        document.getElementById('userLevel').innerText = level;
        document.getElementById('xpBar').style.width = currentXP + "%";
        document.getElementById('xpText').innerText = `${currentXP} / ${XP_PER_LEVEL} XP`;
        document.getElementById('rankName').innerText = RANKS[rankIndex];
        document.getElementById('statsTotalOpened').innerText = this.totalOpened;

        // Oblicz wartość EQ
        const inv = JSON.parse(localStorage.getItem('cs_inventory')) || [];
        const totalValue = inv.reduce((sum, item) => sum + item.price, 0);
        const valEl = document.getElementById('statsInventoryValue');
        if(valEl) valEl.innerText = totalValue.toFixed(2);
    }
};

// Inicjalizacja przy starcie
window.addEventListener('DOMContentLoaded', () => XPManager.updateUI());