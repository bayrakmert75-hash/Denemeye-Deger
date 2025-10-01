const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const finalBtn = document.getElementById('finalBtn'); 
const container = document.querySelector('.buttons-container');

let noClickCount = 0;

// HAYIR Butonunun Kaçış Dinamiği (VE EVET'i Büyütme)
noBtn.addEventListener('click', () => {
    noClickCount++;

    // 1. HAYIR Butonunu Rastgele Konuma Taşı (Kaçış Dinamiği)
    const containerRect = container.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    // Rastgele yeni X koordinatı hesapla
    // Butonun container içinde kalmasını sağlıyoruz
    let newX = Math.random() * (containerRect.width - noBtnRect.width);
    // Rastgele yeni Y koordinatı hesapla
    let newY = Math.random() * (containerRect.height - noBtnRect.height);

    // Butonu direkt pozisyonla
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.transform = 'none'; // CSS'deki merkezlemeyi kaldırır

    // 2. EVET Butonunu Büyüt (Daha Çekici Yapma Dinamiği)
    const yesScaleFactor = 1 + (noClickCount * 0.2);
    // Butonu tekrar merkezleyip büyüt
    yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScaleFactor})`;
    
    // Basıldıkça rengini daha koyu/çekici yap
    if (noClickCount > 3) {
        yesBtn.style.backgroundColor = '#4682B4'; 
        yesBtn.style.color = 'white';
    }
});

// EVET Butonu Dinamiği (Sayfa 1'den Sayfa 2'ye geçiş)
yesBtn.addEventListener('click', () => {
    page1.classList.remove('active');
    page2.classList.add('active');
});

// FINAL BUTON: INSTAGRAM Yönlendirmesi
finalBtn.addEventListener('click', () => {
    const instagramURL = 'https://www.instagram.com/_m7rteren_'; // Kendi Instagram hesabınız
    
    const userConfirmation = confirm(
        "Şimdi tanışmak için Instagram sayfama yönlendirileceksiniz.\n\n" +
        "Kullanıcı adım: @_m7rteren_\n\n" +
        "Sayfaya gitmek ister misiniz?"
    );

    if (userConfirmation) {
        window.open(instagramURL, '_blank'); // Yeni sekmede aç
    }
});
