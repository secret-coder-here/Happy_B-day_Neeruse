// Access Authorization Security Token
const HEART_PASSCODE = "1226"; 

let currentCode = "";

// Object Navigation Completion State Engine
let completedChapters = {
    chapter1: false,
    chapter2: false,
    chapter3: false
};

// Global Soundtrack Lifecycle Audio Toggles
function togglePlay() {
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("audioToggle");
    if (audio.paused) {
        audio.play().catch(() => {});
        btn.innerText = "Pause ⏸️";
    } else {
        audio.pause();
        btn.innerText = "Play 🎧";
    }
}

// Master UI Router Coordinator
function nextScreen(screenNumber) {
    if (screenNumber === 3 && completedChapters.chapter1) { screenNumber = 5; }
    if (screenNumber === 6 && completedChapters.chapter2) { screenNumber = 7; }
    if (screenNumber === 8 && completedChapters.chapter3) { screenNumber = 9; }

    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    if (screenNumber === 9) {
        document.getElementById("heartsBackground").style.display = "block";
        startFloatingHeartsGenerator();
    } else if (screenNumber === 2) {
        document.getElementById("heartsBackground").style.display = "none";
        clearInterval(heartsTimerInterval);
    }

    const targetScreen = document.getElementById(`screen${screenNumber}`);
    if (targetScreen) targetScreen.classList.add('active');
}

// Front Gate Numeric Core System Controls
function pressKey(num) {
    if (currentCode.length >= 4) return;
    currentCode += num;
    updateDots();
}

function clearCode() {
    currentCode = "";
    updateDots();
    document.getElementById("passcodeError").innerText = "";
}

function updateDots() {
    for (let i = 1; i <= 4; i++) {
        const dot = document.getElementById(`dot${i}`);
        dot.innerText = i <= currentCode.length ? "♥" : "";
    }
}

function verifyHeartPasscode() {
    if (currentCode.length < 4) {
        document.getElementById("passcodeError").innerText = "Please fill out all 4 slots! ✨";
        return;
    }
    if (currentCode === HEART_PASSCODE) {
        document.getElementById("passcodeError").innerText = "";
        nextScreen(2); 
        const audio = document.getElementById("bgMusic");
        audio.play().catch(() => {});
        document.getElementById("audioToggle").innerText = "Pause ⏸️";
    } else {
        document.getElementById("passcodeError").innerText = "Incorrect code, try again! 💔";
        clearCode();
    }
}

// Synchronize Status Markers Inside Dashboard Hub Menu
function returnToDashboard(chapterFinished) {
    const cards = document.querySelectorAll(".dashboard-polaroid-card");

    if (chapterFinished === 1) {
        completedChapters.chapter1 = true;
        const tag = document.getElementById("hub-task1-status");
        tag.innerText = "Unlocked 🔓";
        tag.className = "status-tag status-unlocked";
        cards[0].classList.add("completed-chapter");
        document.getElementById("ejectTray").style.display = "none";
        document.getElementById("snapShutterBtn").style.display = "block";
    } else if (chapterFinished === 2) {
        completedChapters.chapter2 = true;
        const tag = document.getElementById("hub-task2-status");
        tag.innerText = "Unlocked 🔓";
        tag.className = "status-tag status-unlocked";
        cards[1].classList.add("completed-chapter");
        document.getElementById("chestModal").style.display = "none";
        document.getElementById("chestEmoji").innerText = "🔒🎁";
        document.getElementById("openChestBtn").style.display = "block";
    } else if (chapterFinished === 3) {
        completedChapters.chapter3 = true;
        const tag = document.getElementById("hub-task3-status");
        tag.innerText = "Unlocked 🔓";
        tag.className = "status-tag status-unlocked";
        cards[2].classList.add("completed-chapter");
    }

    nextScreen(2);
}

// Camera Click Shutter Actions with Full Screen Flash Execution
function executeCameraSnap() {
    const flashZone = document.getElementById("cameraFlashZone");
    flashZone.classList.add("run-flash-animation");
    
    setTimeout(() => {
        flashZone.classList.remove("run-flash-animation");
        document.getElementById("snapShutterBtn").style.display = "none";
        document.getElementById("ejectTray").style.display = "block";
    }, 400);
}

// Memory Match Core Board Generator
let memoryValues = ["🌸", "🌸", "👑", "👑", "🍦", "🍦", "🦋", "🦋"];
let shuffledMemory = memoryValues.sort(() => 0.5 - Math.random());
let openCards = [];
let totalMatches = 0;

function setupMemoryBoard() {
    const board = document.getElementById("gameBoard");
    if(!board) return;
    board.innerHTML = "";
    openCards = [];
    totalMatches = 0;
    shuffledMemory = memoryValues.sort(() => 0.5 - Math.random());

    shuffledMemory.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.val = value;
        card.innerText = "❓";
        card.addEventListener("click", () => {
            if (card.classList.contains("flipped") || openCards.length >= 2) return;
            card.innerText = value;
            card.classList.add("flipped");
            openCards.push(card);

            if (openCards.length === 2) {
                if (openCards[0].dataset.val === openCards[1].dataset.val) {
                    totalMatches += 2;
                    openCards = [];
                    if (totalMatches === memoryValues.length) {
                        document.getElementById("gameMessage").innerText = "Nice work! Initializing Lens Viewfinder... 📸";
                        setTimeout(() => { nextScreen(4); }, 1400);
                    }
                } else {
                    setTimeout(() => {
                        openCards[0].innerText = "❓"; openCards[1].innerText = "❓";
                        openCards[0].classList.remove("flipped"); openCards[1].classList.remove("flipped");
                        openCards = [];
                    }, 800);
                }
            }
        });
        board.appendChild(card);
    });
}
document.addEventListener("DOMContentLoaded", setupMemoryBoard);

// MAP MODAL TRIGGERS CONTROLS
function triggerChestPopup() {
    document.getElementById("chestModal").style.display = "flex";
}
function unlockChestSequence() {
    document.getElementById("chestEmoji").innerText = "🔓💥💝";
    setTimeout(() => { nextScreen(7); }, 1200);
}

// Long Press Pressure Counter Ticks
let holdTimer = null;
let holdCount = 0;
const holdTargetValue = 30; 

function startHeartHold() {
    document.getElementById("holdInstructions").innerText = "Sealing our connection... Keep holding! 💕";
    holdTimer = setInterval(() => {
        holdCount++;
        let progressPct = (holdCount / holdTargetValue) * 100;
        document.getElementById("heartProgress").style.width = `${progressPct}%`;
        
        if (holdCount >= holdTargetValue) {
            clearInterval(holdTimer);
            document.getElementById("holdInstructions").innerText = "Connection Sealed Perfectly! 💝";
            setTimeout(() => { nextScreen(9); }, 800);
        }
    }, 100);
}

function endHeartHold() {
    clearInterval(holdTimer);
    if (holdCount < holdTargetValue) {
        holdCount = 0;
        document.getElementById("heartProgress").style.width = `0%`;
        document.getElementById("holdInstructions").innerText = "Hold broken! Press and hold down completely. ⏳";
    }
}

// Floating Hearts Background Generator
let heartsTimerInterval = null;
function startFloatingHeartsGenerator() {
    const bg = document.getElementById("heartsBackground");
    heartsTimerInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart-element");
        heart.innerText = ["❤️", "💖", "💝", "🌸", "💕"][Math.floor(Math.random() * 5)];
        heart.style.left = `${Math.random() * 100}vw`;
        let duration = 4 + Math.random() * 4;
        heart.style.animationDuration = `${duration}s`;
        bg.appendChild(heart);
        setTimeout(() => { heart.remove(); }, duration * 1000);
    }, 450);
}