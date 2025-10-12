document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const container = document.querySelector('.container');
    const counterText = document.getElementById('counter-text');
    const yesCountSpan = document.getElementById('yes-count');

    let yesCount = 0;
    const initialYesSize = 1.2; // Başlangıç font büyüklüğü

    // HAYIR butonunun çalışmaması ve rastgele hareket etmesi
    noButton.addEventListener('mouseover', () => {
        // Butonu rastgele bir konuma taşı
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        // Konum hesaplamaları
        const newX = Math.random() * (containerRect.width - buttonRect.width - 40) + 20; // 20px iç boşluk
        const newY = Math.random() * (containerRect.height - buttonRect.height - 40) + 20;

        // Butonun bulunduğu container'ın içinde kalmasını sağlamak için
        noButton.style.position = 'absolute';
        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    });

    // HAYIR'a basıldığında da EVET'e yönlendirme
    noButton.addEventListener('click', () => {
        // Hayır'a basılsa bile Evet'e basılmış gibi davranır
        yesButton.click();
    });

    // EVET butonuna basıldığında
    yesButton.addEventListener('click', () => {
        yesCount++;
        
        // 1. EVET butonunu büyütme
        yesButton.style.fontSize = `${initialYesSize + yesCount * 0.2}em`; // Her basışta 0.2em büyür
        yesButton.style.padding = `${15 + yesCount * 3}px ${30 + yesCount * 5}px`; // İç boşluğu da artırarak daha büyük görünür

        // 2. Metni ve sayacı güncelleme
        yesCountSpan.textContent = yesCount;
        counterText.classList.remove('hidden'); // Sayacı görünür yap

        // 3. Özel Mesajlar (Çok Özel Dokunuş)
        if (yesCount === 1) {
            alert('❤️❤️ İşte bu! Dünyalar benim oldu! ❤️❤️');
        } else if (yesCount === 5) {
            alert('5. kez ' + yesCountSpan.textContent + '! Kararını verdin sanırım! 😄');
        } else if (yesCount === 10) {
            alert('10!! Bu kadar EVET\'ten sonra kaçışın yok! Seni çok seviyorum! 😘');
            // Butonun rengini değiştirerek coşku katabiliriz
            yesButton.style.backgroundColor = '#ff6f00'; // Turuncu
        }
        
        // Ses efekti eklemek isterseniz (örneğin bir zil sesi veya kalp atışı sesi)
        // const audio = new Audio('ses.mp3');
        // audio.play();
    });
    
    // Sayfa yüklendiğinde HAYIR butonunun başlangıçta rastgele bir yerde olmasını sağlar
    noButton.dispatchEvent(new Event('mouseover')); 
});
