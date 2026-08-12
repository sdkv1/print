const APP_VERSION = '2.5.3';

// ===== POPUP FUNCTIONS =====
function showPopup(id) {
    document.getElementById(id).classList.add('active');
}
function hidePopup(id) {
    document.getElementById(id).classList.remove('active');
}

let device = null, server = null, characteristic = null;
const PRINTER_SERVICE_UUID = '000018f0-0000-1000-8000-00805f9b34fb';
const PRINTER_CHARACTERISTIC_UUID = '00002af1-0000-1000-8000-00805f9b34fb';

function updateClock(){
    document.getElementById('clock').textContent = new Date().toLocaleTimeString('id-ID',{hour12:false});
}
setInterval(updateClock,1000); updateClock();

function toggleFullscreen(){
    if(!document.fullscreenElement) document.documentElement.requestFullscreen().catch(()=>{});
    else document.exitFullscreen().catch(()=>{});
}

if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});

function textEncoder(t){return new TextEncoder().encode(t);}
function escInit(){return new Uint8Array([0x1B,0x40]);}
function escAlign(a){return new Uint8Array([0x1B,0x61,a]);}
function escBold(o){return new Uint8Array([0x1B,0x45,o?1:0]);}
function escFontSize(dw,dh){const s=(dh?0x10:0x00)|(dw?0x20:0x00);return new Uint8Array([0x1D,0x21,s]);}
function escFeed(l){return new Uint8Array([0x1B,0x64,l]);}
function escCut(){return new Uint8Array([0x1D,0x56,0x00]);}

async function sendData(data){
    if(!characteristic)return;
    try{if(characteristic.writeValueWithoutResponse)await characteristic.writeValueWithoutResponse(data);
    else await characteristic.writeValue(data);}catch(e){}
}

async function printAntrian(layanan){
    if(!characteristic){
        showPopup('popup-connect');
        return;
    }
    showPopup('popup-printing');
    const no = Math.floor(Math.random()*900)+100;
    const now=new Date();
    const tgl=now.toLocaleDateString('id-ID');
    const jam=now.toLocaleTimeString('id-ID',{hour12:false});
    const chunks=[];
    chunks.push(escInit());
    chunks.push(escAlign(1));
    chunks.push(escBold(1));
    chunks.push(escFontSize(1,1));
    chunks.push(textEncoder("NOMOR ANTRIAN\n"));
    chunks.push(escFontSize(0,0));
    chunks.push(escBold(0));
    chunks.push(textEncoder("==================\n"));
    chunks.push(escFontSize(1,1));
    chunks.push(textEncoder(no+"\n"));
    chunks.push(escFontSize(0,0));
    chunks.push(textEncoder("==================\n"));
    chunks.push(escAlign(0));
    chunks.push(textEncoder("Layanan: "+layanan+"\n"));
    chunks.push(textEncoder("Tgl: "+tgl+"\n"));
    chunks.push(textEncoder("Jam: "+jam+"\n"));
    chunks.push(textEncoder("\n"));
    chunks.push(escAlign(1));
    chunks.push(textEncoder("Terima kasih!\n"));
    chunks.push(textEncoder("Silahkan menunggu\n"));
    chunks.push(textEncoder("\n\n\n"));
    chunks.push(escFeed(3));
    chunks.push(escCut());
    for(const c of chunks){await sendData(c); await new Promise(r=>setTimeout(r,30));}
    hidePopup('popup-printing');
}

async function connectPrinter(){
    if(!navigator.bluetooth){alert('Browser tidak support Bluetooth');return;}
    try{
        device=await navigator.bluetooth.requestDevice({
            filters:[{namePrefix:'RPP20'},{namePrefix:'RPP20N'},{namePrefix:'Printer'},{services:[PRINTER_SERVICE_UUID]}],
            optionalServices:[PRINTER_SERVICE_UUID]
        });
        server=await device.gatt.connect();
        const service=await server.getPrimaryService(PRINTER_SERVICE_UUID);
        characteristic=await service.getCharacteristic(PRINTER_CHARACTERISTIC_UUID);
        document.getElementById('popup-connected-msg').textContent = 'Printer "'+device.name+'" siap digunakan.';
        showPopup('popup-connected');
        hidePopup('popup-connect');
    }catch(e){alert('❌ Gagal: '+e.message);}
}

console.log('Nomor Antrian v'+APP_VERSION);