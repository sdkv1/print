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


## 🚀 PWA Support (v2)

Aplikasi ini sekarang adalah **Progressive Web App** yang bisa di-install ke homescreen:

| Fitur PWA | Status |
|-----------|--------|
| 📲 Install ke Homescreen | ✅ |
| 🔄 Offline Support | ✅ (cache-first) |
| 🔄 Auto Reconnect Printer | ✅ |
| 📐 Landscape & Portrait | ✅ (`orientation: any`) |
| 🍎 iOS Web App | ✅ (apple-mobile-web-app) |
| 🎨 Theme Color | ✅ Blue `#2563eb` |

### Cara Install

**Android (Chrome):**
1. Buka URL deploy di Chrome
2. Klik menu ⋮ → "Tambahkan ke Layar Utama" / "Add to Home Screen"
3. Aplikasi akan muncul di homescreen dengan icon printer

**iOS (Safari):**
1. Buka URL di Safari
2. Klik tombol Share (⬆️)
3. Pilih "Add to Home Screen"
4. Aplikasi akan muncul di homescreen

**Desktop (Chrome/Edge):**
1. Buka URL di Chrome/Edge
2. Klik icon ➕ di address bar ("Install Print RPP20N")
3. Aplikasi akan terbuka sebagai window standalone

### Orientasi Layar

Aplikasi mendukung **landscape (lancap)** dan **portrait (potret)** secara otomatis:
- Saat di-install, aplikasi akan menyesuaikan orientasi layar perangkat
- Tidak ada batasan orientasi — user bebas memutar device
