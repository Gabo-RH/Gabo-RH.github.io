let gameStarted = false;
const dungeonSize = 10;
let dungeon = [];
const player = { x: 0, y: 0, health: 10, weapon: { damage: 2 }, inventory: [] };
const enemies = GameData.enemies;

function startGame() {
    const startOverlay = document.getElementById("startOverlay");
    if (startOverlay) startOverlay.style.display = "none";
    gameStarted = true;
    startNewLevel();
}

function startNewLevel() {
    dungeon = createDungeon(dungeonSize);
    player.x = 0;
    player.y = 0;
    dungeon[player.y][player.x] = "P";
    renderDungeon(dungeon, player);
}

function createDungeon(size) {
    const map = [];
    for (let y = 0; y < size; y++) {
        map[y] = [];
        for (let x = 0; x < size; x++) {
            const r = Math.random();
            if (r < 0.05) map[y][x] = "WB"; // wolfbeta
            else if (r < 0.1) map[y][x] = "G"; // goblin1
            else if (r < 0.15) map[y][x] = "GC"; // goblin2 (club)
            else if (r < 0.2) map[y][x] = "L";
            else map[y][x] = ".";
        }
    }
    return map;
}

function renderDungeon(dungeon, player) {
    const container = document.getElementById("dungeon");
    container.innerHTML = "";
    for (let y = 0; y < dungeon.length; y++) {
        const row = document.createElement("div");
        row.classList.add("dungeon-row");
        for (let x = 0; x < dungeon[y].length; x++) {
            const cell = document.createElement("span");
            cell.classList.add("tile");
            cell.textContent = (x === player.x && y === player.y) ? "P" : dungeon[y][x];

            // Colorize enemies based on their type
            const tile = dungeon[y][x];
            if (tile === "G") {
                cell.style.color = "seagreen";  // Goblin (Green)
            } else if (tile === "GC") {
                cell.style.color = "green";  // Goblin with Club (Green + Brown)
            } else if (tile === "WB") {
                cell.style.color = "white";  // Beta Wolf (Grey/White)
            }
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function handleMovement(event) {
    if (!gameStarted) return;

    let newX = player.x;
    let newY = player.y;

    switch (event.key.toLowerCase()) {
        case "arrowup":
        case "w":
            newX--;
            break;
        case "arrowdown":
        case "s":
            newX++;
            break;
        case "arrowleft":
        case "a":
            newY--;
            break;
        case "arrowright":
        case "d":
            newY++;
            break;
    }

    if (newX >= 0 && newX < dungeonSize && newY >= 0 && newY < dungeonSize) {
        const nextTile = dungeon[newY][newX];

        if (["G", "GC", "WB"].includes(nextTile)) {
            startBattle(nextTile, newX, newY);
            return;
        }

        if (nextTile === "L") {
            startNewLevel();
            return;
        }

        dungeon[player.y][player.x] = ".";
        player.x = newX;
        player.y = newY;
        dungeon[player.y][player.x] = "P";
        renderDungeon(dungeon, player);
    }
}

function startBattle(symbol, x, y) {
    let enemy;

    if (symbol === "G") enemy = { ...enemies.goblin1 };
    else if (symbol === "GC") enemy = { ...enemies.goblin2 };
    else if (symbol === "WB") enemy = { ...enemies.wolfbeta };
    enemy.health = enemy.health || 10;

    // Show Battle Menu with enemy details
    const log = document.getElementById("log");
    const menu = document.getElementById("battleMenu");
    const enemyName = document.getElementById("enemyName");
    const playerHealthBar = document.getElementById("playerHealthBar");
    const enemyHealthBar = document.getElementById("enemyHealthBar");

    menu.style.display = "block";
    enemyName.innerText = `Enemy: ${enemy.name}`;
    updateHealthBars(player, enemy);

    log.innerText = `⚔️ A wild ${enemy.name} appears! What will you do?`;

    // Action buttons
    document.querySelectorAll("#battleMenu button").forEach(btn => {
        btn.onclick = () => chooseBattleAction(btn.innerText.toLowerCase(), enemy, x, y);
    });
}

function chooseBattleAction(action, enemy, x, y) {
    const log = document.getElementById("log");
    const menu = document.getElementById("battleMenu");

    switch (action) {
        case "fight":
            enemy.health -= player.weapon.damage;
            log.innerText = `🗡️ You hit ${enemy.name} for ${player.weapon.damage} damage!`;

            updateHealthBars(player, enemy);

            if (enemy.health <= 0) {
                log.innerText += `\n🎉 You defeated the ${enemy.name}!`;
                dungeon[y][x] = "."; // Remove enemy from dungeon
                menu.style.display = "none"; // Hide battle menu
                renderDungeon(dungeon, player); // Update dungeon
                return;
            }

            player.health -= 2;
            log.innerText += `\n💥 ${enemy.name} hits you for 2!`;

            updateHealthBars(player, enemy);

            if (player.health <= 0) {
                log.innerText += `\n☠️ You died!`;
                menu.style.display = "none"; // Hide battle menu
                showGameOverScreen(); // Show "You died" screen
            }
            break;

        case "run":
            log.innerText = `🏃 You escaped from ${enemy.name}!`;
            menu.style.display = "none"; // Hide battle menu
            break;

        case "inspect":
            log.innerText = `📜 ${enemy.name} wields ${enemy.weapon} and knows ${enemy.skill}.`;
            break;

        default:
            log.innerText = `❓ Unknown action.`;
            break;
    }
}

function updateHealthBars(player, enemy) {
    const playerHealthBar = document.getElementById("playerHealthBar");
    const enemyHealthBar = document.getElementById("enemyHealthBar");

    // Update player health bar
    playerHealthBar.style.width = `${(player.health / 10) * 100}%`;

    // Update enemy health bar
    enemyHealthBar.style.width = `${(enemy.health / 10) * 100}%`;


}

function showGameOverScreen() {
    const body = document.body;
    const gameOverOverlay = document.createElement("div");
    gameOverOverlay.id = "gameOverOverlay";
    gameOverOverlay.style.position = "fixed";
    gameOverOverlay.style.top = "0";
    gameOverOverlay.style.left = "0";
    gameOverOverlay.style.width = "100%";
    gameOverOverlay.style.height = "100%";
    gameOverOverlay.style.background = "rgba(0, 0, 0, 0.95)";
    gameOverOverlay.style.color = "#f4e1c1";
    gameOverOverlay.style.display = "flex";
    gameOverOverlay.style.flexDirection = "column";
    gameOverOverlay.style.justifyContent = "center";
    gameOverOverlay.style.alignItems = "center";
    gameOverOverlay.style.zIndex = "3000";

    gameOverOverlay.innerHTML = `
        <h1 style="font-size: 3em; text-shadow: 0 0 10px red;">You Died</h1>
        <p style="font-size: 1.2em; margin: 20px;">Wanna try again?</p>
        <button id="retryButton" style="padding: 10px 30px; font-size: 1.2em; background: #4caf50;
            color: #111; border: none; border-radius: 8px; cursor: pointer;">Retry</button>
    `;

    body.appendChild(gameOverOverlay);

    const retryButton = document.getElementById("retryButton");
    retryButton.addEventListener("click", () => {
        body.removeChild(gameOverOverlay);
        startGame(); // Restart the game
    });
}

document.getElementById("startButton").addEventListener("click", startGame);
window.addEventListener("keydown", handleMovement);
