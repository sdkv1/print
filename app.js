// ===== APP.JS — Sistem Cetak Antrian & UI =====

// ===== POPUP FUNCTIONS =====
function showPopup(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
}
function hidePopup(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
}

// ===== CLOCK =====
function updateClock() {
    const el = document.getElementById('clock');
    if (el) el.textContent = new Date().toLocaleTimeString('id-ID', { hour12: false });
}
// Tunggu DOM siap baru jalankan clock
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateClock();
        setInterval(updateClock, 1000);
    });
} else {
    updateClock();
    setInterval(updateClock, 1000);
}

// ===== FULLSCREEN =====
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen().catch(() => {});
    }
}

// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// ===== PRINT ANTRIAN =====
async function printAntrian(layanan) {
    if (!characteristic) {
        showPopup('popup-connect');
        return;
    }
    showPopup('popup-printing');

    const no = Math.floor(Math.random() * 900) + 100;
    const now = new Date();
    const tgl = now.toLocaleDateString('id-ID');
    const jam = now.toLocaleTimeString('id-ID', { hour12: false });

    const chunks = [];
    chunks.push(escInit());
    chunks.push(escAlign(1));
    chunks.push(escBold(1));
    chunks.push(escFontSize(1, 1));
    chunks.push(textEncoder("NOMOR ANTRIAN\n"));
    chunks.push(escFontSize(0, 0));
    chunks.push(escBold(0));
    chunks.push(textEncoder("==================\n"));
    chunks.push(escFontSize(1, 1));
    chunks.push(textEncoder(no + "\n"));
    chunks.push(escFontSize(0, 0));
    chunks.push(textEncoder("==================\n"));
    chunks.push(escAlign(0));
    chunks.push(textEncoder("Layanan: " + layanan + "\n"));
    chunks.push(textEncoder("Tgl: " + tgl + "\n"));
    chunks.push(textEncoder("Jam: " + jam + "\n"));
    chunks.push(textEncoder("\n"));
    chunks.push(escAlign(1));
    chunks.push(textEncoder("Terima kasih!\n"));
    chunks.push(textEncoder("Silahkan menunggu\n"));
    chunks.push(textEncoder("\n\n\n"));
    chunks.push(escFeed(3));
    chunks.push(escCut());

    for (const c of chunks) {
        await sendData(c);
        await new Promise(r => setTimeout(r, 30));
    }

    hidePopup('popup-printing');
}

console.log('[App] Module loaded v' + (typeof APP_VERSION !== 'undefined' ? APP_VERSION : 'unknown'));
