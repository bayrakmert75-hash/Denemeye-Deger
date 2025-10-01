// Lütfen tüm içeriği bununla değiştirin.
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const errorMessage = document.getElementById('errorMessage');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3'); 
const finalBtn = document.getElementById('finalBtn'); 
const container = document.querySelector('.container'); 

let noClickCount = 0;
const maxNoClicks = 3; 

// HAYIR Butonu Dinamiği
noBtn.addEventListener('click', () => {
    noClickCount++;
    errorMessage.style.animation = 'none';
    void errorMessage.offsetWidth;
    errorMessage.style.animation = 'glitch-fade 0.8s ease-out forwards';

    const scaleFactor = 1 - (noClickCount * 0.25);
    noBtn.style.transform = `translateX(-50%) scale(${scaleFactor}) translateY(${noClickCount * 30}px)`;
    noBtn.style.opacity = `${1 - (noClickCount * 0.33)}`;
    noBtn.style.filter = `blur(${noClickCount * 2}px)`;
    
    const yesScaleFactor = 1 + (noClickCount * 0.6);
    yesBtn.style.transform = `translateX(-50%) scale(${yesScaleFactor})`;
    yesBtn.style.backgroundColor = 'var(--tiktok-red)'; 
    yesBtn.style.color = 'white';
    yesBtn.style.boxShadow = `0 0 ${noClickCount * 10}px rgba(254, 44, 85, 0.7)`; 
    
    if (noClickCount >= maxNoClicks) {
        // 3. kez HAYIR denince direkt 3. sayfaya kaydır
        container.style.transform = 'translateX(-200vw)'; 
    }
});

// EVET Butonu Dinamiği (Sayfa 1'den Sayfa 2'ye Kaydırma)
yesBtn.addEventListener('click', () => {
    container.style.transform = 'translateX(-100vw)'; 
});

// FINAL BUTON: INSTAGRAM Yönlendirmesi
finalBtn.addEventListener('click', () => {
    const instagramURL = 'https://www.instagram.com/_m7rteren_'; // Kendi Instagram hesabınız
    
    const userConfirmation = confirm(
        "Tebrikler, doğru seçimi yaptın! 🎉\n\n" +
        "Şimdi tanışmak için Instagram sayfama yönlendirileceksin.\n" +
        "Kullanıcı adım: @_m7rteren_\n\n" +
        "Sayfaya gitmek ister misin?"
    );

    if (userConfirmation) {
        window.open(instagramURL, '_blank'); // Yeni sekmede aç
    }
});
