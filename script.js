document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const questionArea = document.querySelector('.question-area');
    const successMessage = document.getElementById('success-message');
    const yesCountSpan = document.getElementById('yes-count');
    const finalModal = document.getElementById('final-modal');
    const finalYesButton = document.getElementById('final-yes-button');
    
    let yesCount = 0;
    let initialYesSize = 1.2; // Başlangıç font boyutu (em)
    const MAX_COUNT = 15; // Modal'ın açılacağı EVET sayısı

    // 1. HAYIR Butonunun Akıllı Kaçışı (Daha karmaşık)
    noButton.addEventListener('mouseover', () => {
        // questionArea (Düğmeleri içeren div) sınırlarını alıyoruz.
        const areaRect = questionArea.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        // Rastgele X ve Y hesaplamaları
        // Butonun alanı içinde kalmasını sağlamak için (padding)
        const maxRangeX = areaRect.width - buttonRect.width;
        const maxRangeY = areaRect.height - buttonRect.height;
        
        // Yeni pozisyon, questionArea'nın sol üstünden (0,0) itibaren hesaplanır.
        const newX = Math.random() * maxRangeX;
        const newY = Math.random() * maxRangeY;

        // Butonu "questionArea" içine konumlandırmak için 'transform' kullanıyoruz.
        // Bu, 'absolute' pozisyonlamaya göre daha performanslıdır.
        noButton.style.transform = `translate(${newX}px, ${newY}px)`;
    });

    // 2. HAYIR'a tıklanırsa, EVET'e yönlendirme
    noButton.addEventListener('click', () => {
        yesButton.click(); // 'Hayır' çalışmıyor, her zaman 'Evet' çalışıyor.
    });

    // 3. EVET Butonuna Basıldığında
    yesButton.addEventListener('click', () => {
        if (yesCount >= MAX_COUNT) {
            // Eğer maksimum sayıya ulaşıldıysa modalı aç
            finalModal.classList.remove('hidden');
            return; 
        }

        yesCount++;
        
        // **Profesyonel Büyütme Efekti:**
        // Büyüme: Boyut + Padding
        const newSize = initialYesSize + yesCount * 0.15;
        yesButton.style.fontSize = `${newSize}em`;
        yesButton.style.padding = `${15 + yesCount * 2}px ${35 + yesCount * 4}px`;
        
        // Sayacı ve Mesajı Güncelle
        yesCountSpan.textContent = yesCount;
        successMessage.classList.remove('hidden');
        
        // **Aşamalı Duygusal Mesajlar (Çok Özel Dokunuş):**
        if (yesCount === 1) {
            showNotification("İlk adımı attın! Teşekkür ederim, melek kalplim! ❤️", '#4CAF50');
        } else if (yesCount === 5) {
            showNotification("Beş! Kalbim şu an yerinden çıkmak üzere! 🥰", '#ff9800');
        } else if (yesCount === 10) {
            showNotification("ON! Artık resmileşti. Seni çok seviyorum! 💖", '#e91e63');
            // Butona coşku katmak için rengini değiştir
            yesButton.style.backgroundColor = '#ff6f00'; 
        }

        // Butonun yaylanma animasyonunu yeniden tetiklemek için bir sınıf ekle/kaldır
        yesButton.classList.remove('pulsate');
        void yesButton.offsetWidth; // DOM'u zorla yeniden boya
        yesButton.classList.add('pulsate');
    });

    // 4. Modal'daki Son EVET Butonu
    finalYesButton.addEventListener('click', () => {
        finalModal.classList.add('hidden');
        showNotification("Sonsuz mutluluğa 'EVET' dediğin için teşekkürler! Hemen beni ara! 📞", '#00bcd4', true);
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
    });


    // Yaratıcı Bildirim Fonksiyonu (Pop-up yerine zarif bir bildirim)
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
        
        // Animasyonu başlat
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 50);

        // Bildirimi otomatik olarak kapat
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            // Animasyon bitince DOM'dan kaldır
            notification.addEventListener('transitionend', () => notification.remove());
        }, isFinal ? 8000 : 4000);
    }

    // Başlangıçta Hayır butonunu rastgele bir yere konumlandır
    noButton.dispatchEvent(new Event('mouseover')); 
});
