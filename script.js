const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const finalBtn = document.getElementById('finalBtn'); 

// "HAYIR" butonunu devre dışı bıraktığımız için sadece EVET'e odaklanıyoruz.

// EVET Butonu Dinamiği (Sayfa 1'den Sayfa 2'ye geçiş)
yesBtn.addEventListener('click', () => {
    // Sayfalar arasında vertikal geçiş (opacity ile)
    page1.classList.remove('active');
    page2.classList.add('active');
});

// FINAL BUTON: INSTAGRAM Yönlendirmesi
finalBtn.addEventListener('click', () => {
    const instagramURL = 'https://www.instagram.com/_m7rteren_'; // Kendi Instagram hesabınız
    
    const userConfirmation = confirm(
        "Tebrikler! Şimdi tanışmak için Instagram sayfama yönlendirileceksiniz.\n\n" +
        "Kullanıcı adınız: @_m7rteren_\n\n" +
        "Sayfaya gitmek ister misiniz?"
    );

    if (userConfirmation) {
        window.open(instagramURL, '_blank'); // Yeni sekmede aç
    }
});

// ÖNEMLİ: HAYIR butonu artık CSS'teki 'pointer-events: none;' ile devre dışıdır. 
// JavaScript'te tıklama dinleyicisine gerek yoktur.
