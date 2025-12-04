document.addEventListener('DOMContentLoaded', () => {
    const mainWrapper = document.getElementById('main-wrapper');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const questionScreen = document.getElementById('question-screen');
    const successScreen = document.getElementById('success-screen');
    const persuasionMessage = document.getElementById('persuasion-message');
    const loveScore = document.getElementById('love-score');
    const body = document.body;

    let yesScale = 1;
    let noClickCount = 0;

    // --- PARALLAX ETKİSİ ---
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
        mainWrapper.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // --- HAYIR BUTONU MANTIĞI ---
    btnNo.addEventListener('click', () => {
        noClickCount++;

        // 1. EVET butonunu büyüt
        yesScale += 0.45;
        btnYes.style.transform = `scale(${yesScale})`;
        
        // Animasyon çakışmasını önle
        btnYes.style.animation = 'none';

        // 2. Gizli Sevgi Sayacını Güncelle ve Göster
        loveScore.classList.remove('hidden');
        loveScore.textContent = `[Kararlılığım: %${Math.min(99, Math.round(yesScale * 10))}]`;

        // 3. İkna Mesajı Mekanizması
        if (noClickCount >= 3) {
            persuasionMessage.classList.remove('hidden');
        }
        if (noClickCount >= 7) {
            // Buton metni son sitem
            btnNo.innerText = "Yeter Artık! 😩";
        } else {
            const phrases = [
                "Emin misin?", "Bir daha düşün!", "Gerçekten mi?", 
                "Yapma...", "Kalbim kırılıyor 💔", "Lütfen?", "Bu beni üzüyor"
            ];
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            btnNo.innerText = randomPhrase;
        }
    });

    // --- EVET BUTONU MANTIĞI ---
    btnYes.addEventListener('click', () => {
        // 1. Arka planı değiştir
        body.classList.add('bloom-mode');
        document.getElementById('bg-video').pause(); // Video oynatmayı durdur

        // 2. Ekranları değiştir
        questionScreen.style.display = 'none';
        successScreen.classList.remove('hidden');
        
        // Kartı sallama animasyonunu ekle
        mainWrapper.animate([
            { transform: 'scale(1.1)', boxShadow: '0 0 80px rgba(255, 159, 67, 1)' }
        ], { duration: 1000, fill: 'forwards' });

        // 3. Konfetileri Başlat
        startConfetti();
    });

    // --- KONFETİ MOTORU (Önceki projeden daha gelişmiş) ---
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Partikülleri oluşturma mantığı
    function createParticles() {
        const colors = ['#ff7979', '#f9ca24', '#5352ed', '#1dd1a1', '#ff9ff3'];
        for (let i = 0; i < 350; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height, 
                size: Math.random() * 8 + 4,
                speedY: Math.random() * 3 + 3, // Daha hızlı düşüş
                speedX: Math.random() * 2 - 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += 4; // Daha hızlı dönme

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            if (p.y > canvas.height) {
                // Konfetiyi ekranın yukarısına rastgele bir yere ışınla
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });

        animationId = requestAnimationFrame(animate);
    }

    function startConfetti() {
        createParticles();
        animate();
    }
});
