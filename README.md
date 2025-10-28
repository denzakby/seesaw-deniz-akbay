Tahterevalli Simülasyonu

Bu küçük çalışmada, tahtaya tıkladıkça 1–10 kg arası rastgele ağırlıklar ekleniyor. Ağırlıkların konumu ve toplamları dikkate alınarak tork farkına göre (kg × uzaklık) tahterevalli ±30° sınırında yumuşak bir şekilde eğiliyor. Son durum tarayıcıda saklanır; sayfa yenilense bile kaldığı yerden devam eder.

## Github Pages
https://denzakby.github.io/seesaw-deniz-akbay/

## Nasıl Çalıştırılır
- Depoyu bilgisayara alın ya da zip indirip açın.
- `index.html` dosyasını tarayıcıda açın.

## Kullanım
- Tahtanın sol/sağ tarafına tıklayın: o konuma **rastgele ağırlık** eklenir.
- Alt barda **Sol/sağ toplam ağırlık** görünür.
- Eğilme, **tork farkına** göre otomatik hesaplanır.
- **Sıfırla**: tüm nesneleri ve kaydı temizler.
- **Durdur/Devam**: fizik ve tıklamaları geçici olarak durdurur/devam ettirir.

## Kısa Teknik Notlar
- Açı hesabı: `angle = clamp((rightTorque - leftTorque) / 10, -30, 30)`
- Animasyon: zaman tabanlı yay–sönüm yaklaşımı (yumuşak geçiş)
- Kalıcılık: `localStorage` ile `{ x, kg }` listesi saklanır

## Dosya Yapısı
- `index.html` — temel iskelet
- `css/style.css` — görsel düzen
- `js/app.js` — tıklama, fizik ve saklama mantığı

## Not
Bu çalışma **HTML + CSS + pure JavaScript** ile yazıldı.
