let currentAccount = null;

// Connect to Eve Vault wallet
document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.eveVault) {
        try {
            const accounts = await window.eveVault.request({ method: 'eth_requestAccounts' });
            currentAccount = accounts[0];
            document.getElementById('status').textContent = 'Wallet connected: ' + currentAccount;
            loadInventory();
        } catch (err) {
            document.getElementById('status').textContent = 'Failed to connect wallet';
            console.error(err);
        }
    } else {
        alert('Eve Vault not detected!');
    }
});

// Fetch Smart Storage inventory (replace with actual API)
async function getInventory() {
    // Placeholder: replace with SmartStorage API call
    if (!currentAccount) return [];

    // Example response from Smart Storage object
    return [
        { id: 'laser_ammo', name: 'Laser Ammo', qty: 10 },
        { id: 'shield_booster', name: 'Shield Booster', qty: 2 },
        { id: 'nanites', name: 'Nanite Repair', qty: 5 }
    ];
}

// Render inventory
function renderInventory(items) {
    const container = document.getElementById('inventory');
    container.innerHTML = '';

    items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.textContent = `${item.name} x${item.qty}`;

        // Click to retrieve one item
        div.addEventListener('click', async () => {
            await retrieveItem(item.id, 1);
            loadInventory();
        });

        container.appendChild(div);
    });
}

// Store an item (replace with actual SmartStorage API)
async function storeItem(itemID, qty) {
    console.log(`Storing ${qty} of ${itemID}`);
    // SmartStorage.storeItem(itemID, qty); // uncomment when API is available
    loadInventory();
}

// Retrieve an item (replace with actual SmartStorage API)
async function retrieveItem(itemID, qty) {
    console.log(`Retrieving ${qty} of ${itemID}`);
    // SmartStorage.retrieveItem(itemID, qty); // uncomment when API is available
    loadInventory();
}

// Load and render inventory
async function loadInventory() {
    if (!currentAccount) return;
    const items = await getInventory();
    renderInventory(items);
}
