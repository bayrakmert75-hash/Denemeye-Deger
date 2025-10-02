const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const finalBtn = document.getElementById('finalBtn'); 
const errorMessage = document.getElementById('errorMessage');

// EVET Butonu Dinamiği (Sayfa 1'den Sayfa 2'ye geçiş)
yesBtn.addEventListener('click', () => {
    page1.classList.remove('active');
    page2.classList.add('active');
});

// HAYIR Butonu Dinamiği (Sadece Hata Mesajı Gösterir)
noBtn.addEventListener('click', () => {
    // Hata mesajı göster ve sonra kaybet
    errorMessage.style.animation = 'fade-in-out 0.8s ease-out forwards';
    void errorMessage.offsetWidth; // Animasyonu tekrar başlatmak için hile
    errorMessage.style.animation = 'fade-in-out 0.8s ease-out forwards';
});

// FINAL BUTON: INSTAGRAM Yönlendirmesi
finalBtn.addEventListener('click', () => {
    const instagramURL = 'https://www.instagram.com/_m7rteren_'; 
    
    const userConfirmation = confirm(
        "Şimdi tanışmak için Instagram sayfama yönlendirileceksiniz.\n\n" +
        "Kullanıcı adım: @_m7rteren_\n\n" +
        "Sayfaya gitmek ister misiniz?"
    );

    if (userConfirmation) {
        window.open(instagramURL, '_blank'); 
    }
});
