document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const questionArea = document.querySelector('.question-area');
    
    let yesCount = 0;
    const initialYesSize = 1.2; 
    const MAX_COUNT = 8; // Bu sayıya ulaştıktan sonra EVET butonuna tıklama aktifleşecek.

    // 1. HAYIR Butonunun Kaçışı
    // Butonun kendisi tıklanmayacak (CSS'teki pointer-events: none sayesinde).
    // Ancak mouse üzerine gelince hareket etmeye devam etsin.
    noButton.addEventListener('mouseover', () => {
        const areaRect = questionArea.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        const maxRangeX = areaRect.width - buttonRect.width;
        const maxRangeY = areaRect.height - buttonRect.height;
        
        const newX = Math.random() * maxRangeX;
        const newY = Math.random() * maxRangeY;

        noButton.style.transform = `translate(${newX}px, ${newY}px)`;
    });

    // 2. HAYIR'a tıklama denemesi (ÇALIŞMAYACAK, ama yine de EVET'i büyütelim)
    questionArea.addEventListener('click', (event) => {
        // Eğer tıklanan element noButton ise, Evet'i büyütme mantığını tetikle.
        if (event.target.id === 'no-button' || event.target.closest('#no-button')) {
             handleYesGrowth();
             showNotification("Biliyorum, kararını değiştireceksin. ❤️", '#f44336');
        }
    });

    // EVET Büyüme ve Mesaj Mantığı
    function handleYesGrowth() {
        if (yesCount >= MAX_COUNT) return; // Maksimuma ulaştıysa büyümeyi durdur.
        
        yesCount++;
        
        // Büyüme: Boyut + Padding
        const newSize = initialYesSize + yesCount * 0.2; // Biraz daha hızlı büyütelim
        yesButton.style.fontSize = `${newSize}em`;
        yesButton.style.padding = `${15 + yesCount * 4}px ${35 + yesCount * 6}px`;

        // Animasyon
        yesButton.classList.remove('pulsate');
        void yesButton.offsetWidth; 
        yesButton.classList.add('pulsate');

        // Aşamalı Duygusal Mesajlar
        if (yesCount === 1) {
            showNotification("İlk adımı attın! Teşekkür ederim! 🙏", '#4CAF50');
        } else if (yesCount === 5) {
            showNotification("Çok yaklaştık! Büyüyen sevgimiz gibi... 💖", '#ff9800');
        } else if (yesCount === MAX_COUNT) {
            showNotification("ŞİMDİ! Karar anı geldi! EVET'e tıkla ve sayfaya geç! 🥳", '#3f51b5', true);
            // Sonunda EVET butonunu tıklanabilir hale getir.
            yesButton.style.cursor = 'pointer';
        }
    }

    // 3. EVET butonuna basıldığında (Final)
    yesButton.addEventListener('click', () => {
        // Eğer sayaç maksimuma ulaşmadıysa, tıklanmayı engelle ve büyütme mantığını tekrar çalıştır.
        if (yesCount < MAX_COUNT) {
            handleYesGrowth(); 
            // noButton'ın rastgele kaçışını taklit et
            noButton.dispatchEvent(new Event('mouseover')); 
        } else {
            // Eğer sayaç maksimuma ulaştıysa, başarı sayfasına yönlendir.
            window.location.href = 'success.html'; 
        }
    });
    

    // Bildirim Fonksiyonu (Önceki bölümde olduğu gibi profesyonel pop-up)
    function showNotification(message, color, isFinal = false) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${color};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 200;
            font-size: ${isFinal ? '1.5em' : '1.1em'};
            opacity: 0;
            transition: opacity 0.5s, transform 0.5s;
            transform: translateX(100%);
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 50);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            notification.addEventListener('transitionend', () => notification.remove());
        }, isFinal ? 6000 : 3000);
    }
    
    // Başlangıçta Hayır butonunu rastgele bir yere konumlandır
    noButton.dispatchEvent(new Event('mouseover')); 
});
