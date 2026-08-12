// ===== PRINTER.JS — Koneksi Bluetooth & ESC/POS Commands =====
const APP_VERSION = '2.5.5';

let device = null;
let server = null;
let characteristic = null;

const PRINTER_SERVICE_UUID = '000018f0-0000-1000-8000-00805f9b34fb';
const PRINTER_CHARACTERISTIC_UUID = '00002af1-0000-1000-8000-00805f9b34fb';

// ESC/POS Helpers
function textEncoder(t) { return new TextEncoder().encode(t); }
function escInit() { return new Uint8Array([0x1B, 0x40]); }
function escAlign(a) { return new Uint8Array([0x1B, 0x61, a]); }
function escBold(o) { return new Uint8Array([0x1B, 0x45, o ? 1 : 0]); }
function escFontSize(dw, dh) {
    const s = (dh ? 0x10 : 0x00) | (dw ? 0x20 : 0x00);
    return new Uint8Array([0x1D, 0x21, s]);
}
function escFeed(l) { return new Uint8Array([0x1B, 0x64, l]); }
function escCut() { return new Uint8Array([0x1D, 0x56, 0x00]); }

async function sendData(data) {
    if (!characteristic) return;
    try {
        if (characteristic.writeValueWithoutResponse) {
            await characteristic.writeValueWithoutResponse(data);
        } else {
            await characteristic.writeValue(data);
        }
    } catch (e) {
        console.log('[Printer] Send error:', e.message);
    }
}

async function connectPrinter() {
    if (!navigator.bluetooth) {
        alert('Browser tidak support Bluetooth');
        return;
    }
    try {
        device = await navigator.bluetooth.requestDevice({
            filters: [
                { namePrefix: 'RPP20' },
                { namePrefix: 'RPP20N' },
                { namePrefix: 'Printer' },
                { services: [PRINTER_SERVICE_UUID] }
            ],
            optionalServices: [PRINTER_SERVICE_UUID]
        });
        server = await device.gatt.connect();
        const service = await server.getPrimaryService(PRINTER_SERVICE_UUID);
        characteristic = await service.getCharacteristic(PRINTER_CHARACTERISTIC_UUID);

        // Tampilkan popup terhubung
        const msgEl = document.getElementById('popup-connected-msg');
        if (msgEl) msgEl.textContent = 'Printer "' + (device.name || 'RPP20N') + '" siap digunakan.';
        if (typeof showPopup === 'function') showPopup('popup-connected');
        if (typeof hidePopup === 'function') hidePopup('popup-connect');
    } catch (e) {
        alert('❌ Gagal: ' + e.message);
    }
}

console.log('[Printer] Module loaded v' + APP_VERSION);
