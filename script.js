// Başlangıçta EVET butonunun boyut çarpanı
let evetBoyutCarpan = 1; 

const EVET_BUTONU = document.getElementById('evet-butonu');
const HAYIR_BUTONU = document.getElementById('hayir-butonu');
const SORU_SAYFASI = document.getElementById('soru-sayfasi');
const CEVAP_SAYFASI = document.getElementById('cevap-sayfasi');

// EVET cevabı verildiğinde
function evetCevabi() {
    // Sayfaları değiştir
    SORU_SAYFASI.classList.remove('aktif-sayfa');
    CEVAP_SAYFASI.classList.add('aktif-sayfa');
    
    // Opsiyonel: Barışma müziği başlatabilirsiniz :)
}

// HAYIR cevabı verildiğinde
function hayirCevabi() {
    // HAYIR butonuna basıldıkça EVET butonunu büyüt
    evetBoyutCarpan += 0.5; // Her basışta 0.5 kat büyüt
    
    // EVET butonunun boyutunu ayarla
    EVET_BUTONU.style.transform = `scale(${evetBoyutCarpan})`;
    
    // HAYIR butonuna basıldığında bir mesaj verebiliriz
    // Örnek:
    const hayirMetinleri = [
        "Emin misin? Bir daha düşün...",
        "Olmaz. Lütfen tekrar dene!",
        "Ama ben seni çok özledim :(",
        "O butonda bir sorun var galiba...",
        "Yanlış butona basıyorsun!"
    ];
    
    // Rastgele bir mesaj seçip HAYIR butonunun metnini değiştiriyoruz
    const rastgeleMetin = hayirMetinleri[Math.floor(Math.random() * hayirMetinleri.length)];
    HAYIR_BUTONU.textContent = rastgeleMetin;
    
    // HAYIR butonunu biraz hareket ettirerek basmayı zorlaştırabiliriz (Opsiyonel)
    HAYIR_BUTONU.style.position = 'absolute';
    HAYIR_BUTONU.style.top = `${Math.random() * 80 + 10}vh`; // %10 ile %90 arasında dikey konum
    HAYIR_BUTONU.style.left = `${Math.random() * 80 + 10}vw`; // %10 ile %90 arasında yatay konum
}
