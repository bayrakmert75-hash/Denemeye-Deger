const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const finalBtn = document.getElementById('finalBtn'); 

let noClickCount = 0;

// HAYIR Butonu Dinamiği (Sadece EVET'i Büyüt)
noBtn.addEventListener('click', () => {
    noClickCount++;

    // EVET Butonunu Büyüt
    const yesScaleFactor = 1 + (noClickCount * 0.2);
    // Butonu tekrar merkezleyip büyüt
    yesBtn.style.transform = `translateX(-50%) scale(${yesScaleFactor})`;
    
    // Basıldıkça rengini daha koyu/çekici yap
    if (noClickCount > 3) {
        yesBtn.style.backgroundColor = '#295b7a'; // Daha koyu bir mavi tonu
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
        "Sayfaya gitmek ister misin?"
    );

    if (userConfirmation) {
        window.open(instagramURL, '_blank'); // Yeni sekmede aç
    }
});
