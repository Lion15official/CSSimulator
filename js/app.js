// --- HELPERY ---
function safeJSONParse(key, fallback) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch (e) {
        console.error(`Błąd parsowania ${key}:`, e);
        return fallback;
    }
}

// --- ZMIENNE GLOBALNE ---
let balance = parseFloat(localStorage.getItem('cs_balance')) || 10.00;
let inventory = safeJSONParse('cs_inventory', []);
let contractItems = [];
let activeCase = null;
let selectedUpgradeItem = null;
let upgradeIndex = -1;

// --- LOGIKA MISJI ---
let currentMissions = safeJSONParse('cs_current_missions', []);
let missionProgress = safeJSONParse('cs_mission_progress', {
    casesOpened: 0,
    itemsSold: 0,
    upgradesDone: 0,
    claimed: []
});

// --- INICJALIZACJA ---
// --- INICJALIZACJA ---
function initMissions() {
    if (typeof MissionSystem !== 'undefined') {
        // Sprawdź czy dane nie są uszkodzone (np. stare wersje)
        if (!Array.isArray(currentMissions) || currentMissions.some(m => !m.id || !m.title)) {
            console.warn("Wykryto uszkodzone dane misji, resetowanie...");
            localStorage.removeItem('cs_current_missions');
            localStorage.removeItem('cs_last_mission_reset');
            currentMissions = [];
        }

        const resetData = MissionSystem.checkAndResetMissions();
        if (resetData) {
            currentMissions = resetData.missions;
            missionProgress = resetData.progress;
            // Wymuś odświeżenie widoku od razu po resecie
            if (document.getElementById('missionSection') && !document.getElementById('missionSection').classList.contains('hidden')) {
                renderMissions();
            }
        }
    }
}

function updateUI() {
    const balEl = document.getElementById('balance');
    if (balEl) balEl.innerText = balance.toFixed(2);

    localStorage.setItem('cs_balance', balance);
    localStorage.setItem('cs_inventory', JSON.stringify(inventory));

    if (window.XPManager) window.XPManager.updateUI();
    renderInventory();
}

// --- SYSTEM BLOKOWANIA (LOCK) ---
function toggleLock(index) {
    inventory[index].locked = !inventory[index].locked;
    updateUI();
}

// --- MODAL PŁATNOŚCI ---
function toggleModal(show) {
    const modal = document.getElementById('depositModal');
    if (modal) {
        if (show) modal.classList.remove('hidden');
        else modal.classList.add('hidden');
    }
}

function openPayment(method) {
    document.getElementById('paymentMenu').classList.add('hidden');
    document.querySelectorAll('.payment-form').forEach(f => f.classList.add('hidden'));

    document.getElementById('form-' + method).classList.remove('hidden');
    document.getElementById('modalTitle').innerText = "Płatność: " + method;
}

function resetAndCloseModal() {
    const menu = document.getElementById('paymentMenu');
    if (menu.classList.contains('hidden')) {
        document.querySelectorAll('.payment-form').forEach(f => f.classList.add('hidden'));
        menu.classList.remove('hidden');
        document.getElementById('modalTitle').innerText = "Wybierz metodę płatności";
    } else {
        toggleModal(false);
    }
}

function confirmPayment(method) {
    let amount = 0;
    let isValid = false;

    if (method === 'BLIK') {
        const code = document.getElementById('blikCode').value;
        amount = parseFloat(document.getElementById('blikAmount').value);
        if (code.length === 6 && amount > 0) isValid = true;
    } else if (method === 'PayPal') {
        const email = document.getElementById('ppEmail').value;
        amount = parseFloat(document.getElementById('ppAmount').value);
        if (email.includes('@') && amount > 0) isValid = true;
    } else if (method === 'Karta') {
        const num = document.getElementById('cardNum').value;
        amount = parseFloat(document.getElementById('cardAmount').value);
        if (num.length >= 13 && amount > 0) isValid = true;
    } else if (method === 'GiftCard') {
        const code = document.getElementById('giftCode').value;
        const reward = (typeof GiftCardSystem !== 'undefined') ? GiftCardSystem.redeem(code) : null;
        if (reward) { amount = reward; isValid = true; }
    }

    if (isValid) {
        balance += amount;
        updateUI();
        alert(`Sukces! Doładowano ${amount.toFixed(2)}$`);
        toggleModal(false);
        document.querySelectorAll('.payment-form input').forEach(i => i.value = "");
    } else {
        alert("Błąd danych lub kwoty!");
    }
}

// --- NAWIGACJA ---
function switchTab(tabId, btn) {
    const sections = ['caseSelection', 'openerSection', 'upgraderSection', 'contractSection', 'missionSection'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    const target = (tabId === 'cases') ? 'caseSelection' : tabId + 'Section';
    document.getElementById(target).classList.remove('hidden');
    if (tabId === 'mission') renderMissions();

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

// --- SKRZYNKI ---
function selectCase(k) {
    activeCase = k;
    document.getElementById('caseSelection').classList.add('hidden');
    document.getElementById('openerSection').classList.remove('hidden');
    document.getElementById('activeCaseName').innerText = caseData[k].name;
    document.getElementById('casePriceText').innerText = caseData[k].price.toFixed(2);
}

function closeCase() {
    switchTab('cases', document.querySelector('[data-tab="cases"]'));
}

document.getElementById('openBtn').onclick = function () {
    const c = caseData[activeCase];
    if (balance < c.price) return alert("Brak środków!");

    balance -= c.price;
    updateMissionProgress('casesOpened');
    updateUI();

    const roller = document.getElementById('roller');
    roller.innerHTML = '';
    roller.style.transition = 'none';
    roller.style.transform = 'translateX(0)';

    const items = [];
    for (let i = 0; i < 60; i++) items.push(Logic.getItem(activeCase));

    items.forEach(it => {
        const d = document.createElement('div');
        d.className = `roller-item ${it.rarity}`;
        d.innerHTML = `<strong>${it.name}</strong>`;
        roller.appendChild(d);
    });

    setTimeout(() => {
        roller.style.transition = 'transform 5s cubic-bezier(0.1, 0.5, 0.2, 1)';
        const move = (55 * 130) - (document.querySelector('.roller-wrapper').offsetWidth / 2) + 65;
        roller.style.transform = `translateX(-${move}px)`;

        setTimeout(() => {
            const win = items[55];
            inventory.unshift(win);
            if (window.XPManager) window.XPManager.addXP(20);
            updateUI();
        }, 5100);
    }, 50);
};

// --- EKWIPUNEK I SPRZEDAŻ (Z NOWYMI KOLORAMI BLOKADY) ---
function renderInventory() {
    const invGrid = document.getElementById('inventory');
    if (!invGrid) return;
    invGrid.innerHTML = inventory.length === 0 ? "<p>Ekwipunek jest pusty.</p>" : "";

    inventory.forEach((item, index) => {
        const isLocked = item.locked || false;
        const div = document.createElement('div');
        div.className = `inv-item ${item.rarity} ${isLocked ? 'locked' : ''}`;

        div.innerHTML = `
            ${isLocked ? '<div class="lock-indicator">🔒</div>' : ''}
            <div class="item-info">
                <strong>${item.name}</strong><br>
                <span>${item.price.toFixed(2)}$</span>
            </div>
            <div class="inv-buttons">
                <button style="background:${isLocked ? '#222' : '#ff4b4b'}; color: white;" onclick="sellItem(${index})" ${isLocked ? 'disabled' : ''}>
                    ${isLocked ? 'ZABLOKOWANE' : 'SPRZEDAJ'}
                </button>
                <button style="background:${isLocked ? '#f39c12' : '#444'}; border: 1px solid ${isLocked ? '#e67e22' : '#555'}; color: white;" onclick="toggleLock(${index})">
                    ${isLocked ? 'ODBLOKUJ' : 'ZABLOKUJ'}
                </button>
                <button style="background:#4b69ff; color: white;" onclick="selectForUpgrade(${index})" ${isLocked ? 'disabled' : ''}>UPGRADER</button>
                <button style="background:#8847ff; color: white;" onclick="addToContract(${index})" ${isLocked ? 'disabled' : ''}>KONTRAKT</button>
            </div>
        `;
        invGrid.appendChild(div);
    });
}

function sellItem(i) {
    if (inventory[i].locked) return;
    balance += inventory[i].price;
    inventory.splice(i, 1);
    updateMissionProgress('itemsSold');
    updateUI();
}

// --- UPGRADER ---
function selectForUpgrade(i) {
    if (inventory[i].locked) return;
    selectedUpgradeItem = inventory[i];
    upgradeIndex = i;
    document.getElementById('inputItemDisplay').innerHTML = `<strong class="${selectedUpgradeItem.rarity}">${selectedUpgradeItem.name}</strong>`;
    calculateChance();
    switchTab('upgrader', document.querySelector('[data-tab="upgrader"]'));
}

function calculateChance() {
    const targetVal = parseFloat(document.getElementById('targetValue').value);
    const chanceEl = document.getElementById('upgradeChance');
    const btn = document.getElementById('btnUpgrade');
    if (!selectedUpgradeItem || isNaN(targetVal) || targetVal <= selectedUpgradeItem.price) {
        chanceEl.innerText = "0"; btn.disabled = true; return;
    }
    let chance = Math.min((selectedUpgradeItem.price / targetVal) * 95, 95);
    chanceEl.innerText = chance.toFixed(2);
    btn.disabled = false;
}

function processUpgrade() {
    const targetVal = parseFloat(document.getElementById('targetValue').value);
    const chance = parseFloat(document.getElementById('upgradeChance').innerText);
    const btn = document.getElementById('btnUpgrade');
    const resultDisplay = document.getElementById('resultItemDisplay');

    // Disable button during animation
    btn.disabled = true;
    btn.innerText = 'LOSOWANIE...';

    // Add spinning animation
    resultDisplay.style.transform = 'rotateY(0deg)';
    resultDisplay.style.transition = 'transform 2s ease-out';
    resultDisplay.innerHTML = '🎲';

    setTimeout(() => {
        resultDisplay.style.transform = 'rotateY(720deg)';
    }, 50);

    // Show result after animation
    setTimeout(() => {
        const won = Math.random() * 100 <= chance;

        if (won) {
            resultDisplay.innerHTML = `<strong style="color: #10b981; font-size: 1.5rem;">✓ WYGRANA!</strong><br><span style="color: #ffd700;">${targetVal.toFixed(2)}$</span>`;
            inventory[upgradeIndex] = { name: "Upgraded Skin", price: targetVal, rarity: "red", locked: false };
        } else {
            resultDisplay.innerHTML = `<strong style="color: #ef4444; font-size: 1.5rem;">✗ PRZEGRANA</strong><br><span style="color: #6b7a99;">Przedmiot stracony</span>`;
            inventory.splice(upgradeIndex, 1);
        }

        updateMissionProgress('upgradesDone');
        selectedUpgradeItem = null;
        btn.disabled = false;
        btn.innerText = 'ULEPSZ';
        updateUI();

        // Reset result display after 3 seconds
        setTimeout(() => {
            resultDisplay.innerHTML = '???';
            resultDisplay.style.transform = 'rotateY(0deg)';
            resultDisplay.style.transition = 'none';
        }, 3000);
    }, 2100);
}

// --- KONTRAKTY ---
function addToContract(i) {
    if (inventory[i].locked) return;
    if (contractItems.length >= 10) return;
    contractItems.push(inventory.splice(i, 1)[0]);
    updateUI();
    renderContractSlots();
}

function renderContractSlots() {
    const slots = document.getElementById('contractSlots');
    document.getElementById('contractCount').innerText = contractItems.length;
    slots.innerHTML = "";
    contractItems.forEach((it, i) => {
        const d = document.createElement('div');
        d.className = `contract-slot ${it.rarity}`;
        d.innerText = it.name;
        d.onclick = () => { inventory.unshift(contractItems.splice(i, 1)[0]); updateUI(); renderContractSlots(); };
        slots.appendChild(d);
    });
    document.getElementById('btnContract').disabled = contractItems.length < 10;
}

function processContract() {
    const win = { name: "Contract Skin", price: 50.00, rarity: "pink", locked: false };
    contractItems = [];
    inventory.unshift(win);
    updateUI();
    renderContractSlots();
    alert("Kontrakt zakończony!");
}

// --- MISJE ---
function updateMissionProgress(type) {
    if (missionProgress.hasOwnProperty(type)) {
        missionProgress[type]++;
        localStorage.setItem('cs_mission_progress', JSON.stringify(missionProgress));
    }
}

function renderMissions() {
    const list = document.getElementById('missionList');
    if (!list) return;
    list.innerHTML = "";

    if (!currentMissions || currentMissions.length === 0) {
        list.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 20px; color: #888;">
                <p>Brak aktywnych misji.</p>
                <button onclick="MissionSystem.checkAndResetMissions(); location.reload();" style="margin-top:10px; padding:5px 10px; cursor:pointer;">Wygeneruj nowe</button>
            </div>
        `;
        return;
    }

    try {
        currentMissions.forEach(m => {
            const current = missionProgress[m.type] || 0;
            const isDone = current >= m.goal;
            const isClaimed = missionProgress.claimed.includes(m.id);
            const card = document.createElement('div');
            card.className = "mission-card";

            // Format like case cards: title on top, reward on bottom
            card.innerHTML = `
                <h4>${m.title}</h4>
                <p>${m.desc}</p>
                <div class="mission-reward">${m.rewardMoney}$ + ${m.rewardXP} XP</div>
                <button class="btn-claim" ${!isDone || isClaimed ? 'disabled' : ''} onclick="claimMission('${m.id}')">
                    ${isClaimed ? 'ODEBRANO' : 'ODBIERZ'}
                </button>`;
            list.appendChild(card);
        });
    } catch (err) {
        console.error("Błąd renderowania misji:", err);
        list.innerHTML += `<p style="color:red">Wystąpił błąd wyświetlania misji: ${err.message}</p>`;
    }
}

function claimMission(id) {
    const mission = currentMissions.find(m => m.id === id);
    if (!mission) return;
    balance += mission.rewardMoney;
    if (window.XPManager) window.XPManager.addXP(mission.rewardXP);
    missionProgress.claimed.push(id);
    localStorage.setItem('cs_mission_progress', JSON.stringify(missionProgress));
    updateUI(); renderMissions();
}

// --- START ---
window.onload = () => {
    initMissions();
    const grid = document.getElementById('caseGrid');
    if (grid) {
        for (let k in caseData) {
            const d = document.createElement('div');
            d.className = 'case-card';
            d.onclick = () => selectCase(k);
            d.innerHTML = `<strong>${caseData[k].name}</strong><p>${caseData[k].price.toFixed(2)}$</p>`;
            grid.appendChild(d);
        }
    }
    updateUI();
};