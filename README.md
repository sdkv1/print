# RPP20N Bluetooth Test Print

Halaman web untuk test print thermal printer RPP20N via Bluetooth BLE (Web Bluetooth API).

## Fitur
- Scan & connect printer RPP20N via Bluetooth
- Test print struk sample
- Feed paper & cut paper command
- Real-time console log
- Responsive design (mobile & desktop)

## Deploy ke Vercel

### Opsi 1: Deploy Otomatis (butuh Vercel Token)
Berikan Vercel token ke asisten untuk deploy via API.

### Opsi 2: Deploy Manual via Dashboard
1. Buka [vercel.com/new](https://vercel.com/new)
2. Pilih **Import Git Repository**
3. Pilih repo `sdkv1/print`
4. Framework Preset: **Other** (static)
5. Klik **Deploy**

### Opsi 3: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

## Penggunaan
1. Buka URL hasil deploy di **Chrome Android** atau **Chrome/Edge Desktop**
2. Klik **Scan & Connect**
3. Pilih printer RPP20N dari daftar Bluetooth
4. Klik **Print Test Struk**

> ⚠️ **Catatan**: Web Bluetooth hanya support di Chrome/Edge. Safari iOS tidak support.

## Teknologi
- HTML5 + Tailwind CSS
- Web Bluetooth API
- ESC/POS Commands
