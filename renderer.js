const excuses = [
    "It works on my machine.",
    "The bug is a feature.",
    "Must be a caching issue.",
    "Works in production, just not locally.",
    "It's not a bug, it's an undocumented feature.",
    "The previous developer left this mess.",
    "I think it's a Node version issue.",
    "Have you tried turning it off and on again?",
    "It's a timing issue. Just add a setTimeout.",
    "Race condition. It's always a race condition.",
    "The API must have changed.",
    "Works in Chrome, so it's fine.",
    "Legacy code. Nobody touches that.",
    "I'll fix it in the next sprint.",
    "It compiles, so it ships."
];

const excuseText = document.getElementById('excuseText');
const rollBtn = document.getElementById('rollBtn');
const copyConfirmation = document.getElementById('copyConfirmation');
const { clipboard } = require('electron');

function generateExcuse() {
    const randomIndex = Math.floor(Math.random() * excuses.length);
    const excuse = excuses[randomIndex];
    excuseText.textContent = `"${excuse}"`;
    copyConfirmation.textContent = '';
}

function copyExcuse() {
    const text = excuseText.textContent;
    if (text && text !== "Click the button to generate an excuse...") {
        clipboard.writeText(text);
        copyConfirmation.textContent = '✅ Copied to clipboard!';
        setTimeout(() => {
            copyConfirmation.textContent = '';
        }, 2000);
    }
}

rollBtn.addEventListener('click', generateExcuse);
excuseText.addEventListener('click', copyExcuse);

generateExcuse();