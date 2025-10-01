// HTML elemanlarını doğru ID'leriyle tanımlıyoruz
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const errorMessage = document.getElementById('errorMessage');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const finalBtn = document.getElementById('finalBtn'); 

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
    yesBtn.style.color = 'var(--bg-dark)';
    yesBtn.style.backgroundColor = 'var(--neon-magenta)';
    yesBtn.style.boxShadow = `0 0 ${noClickCount * 10}px var(--neon-magenta)`;
    
    if (noClickCount >= maxNoClicks) {
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
        yesBtn.innerHTML = 'HİÇBİR KAÇIŞIN YOK! BAŞLA';
    }
});

// EVET Butonu Dinamiği (Sayfa Geçişi)
yesBtn.addEventListener('click', () => {
    page1.classList.remove('active');
    page2.classList.add('active');
});

// FINAL BUTON: INSTAGRAM Yönlendirmesi
finalBtn.addEventListener('click', () => {
    const instagramURL = 'https://www.instagram.com/_m7rteren_'; // Senin Instagram hesabın
    
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
