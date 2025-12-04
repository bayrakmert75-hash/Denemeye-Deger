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

    // --- HAYIR BUTONU MANTIĞI (EVET BÜYÜTME) ---
    btnNo.addEventListener('click', () => {
        noClickCount++;

        // 1. EVET butonunu büyüt
        yesScale += 0.45;
        btnYes.style.transform = `scale(${yesScale})`;
        btnYes.style.animation = 'none'; // Yanıp sönme animasyonu varsa devre dışı bırakılır

        // 2. Gizli Kararlılık Sayacını Güncelle (isteğe bağlı)
        loveScore.classList.remove('hidden');
        loveScore.textContent = `[Kararlılığım: %${Math.min(99, Math.round(yesScale * 10))}]`;

        // 3. İkna Mesajı ve Metin Değişimi
        if (noClickCount >= 3) {
            persuasionMessage.classList.remove('hidden');
        }
        if (noClickCount >= 7) {
            btnNo.innerText = "Lütfen Kararınızı Gözden Geçirin.";
        } else {
            // HAYIR butonunun metni değişir
            const phrases = [
                "Kararınızdan Emin misiniz?", 
                "Lütfen Alternatifi Değerlendirin.", 
                "Bu Kararımızdan Vazgeçmeliyiz.", 
                "Bu Durum Sürdürülemez.", 
                "Bir Çözüme Ulaşmalıyız.",
                "Kararlılığımı Göz Önünde Bulundurun.",
                "Mantıklı Bir Değerlendirme Yapın."
            ];
            const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
            btnNo.innerText = randomPhrase;
        }
    });

    // --- EVET BUTONU MANTIĞI (İkinci Sayfaya Geçiş) ---
    btnYes.addEventListener('click', () => {
        // 1. Görsel Geçişler (Çiçekli Arka Plan)
        body.classList.add('bloom-mode');
        const video = document.getElementById('bg-video');
        if (video) video.pause(); 
        
        // 2. Ekran Değişimi
        questionScreen.style.display = 'none';
        successScreen.classList.remove('hidden');
        
        mainWrapper.animate([
            { transform: 'scale(1.1)', boxShadow: '0 0 80px rgba(255, 215, 0, 1)' } 
        ], { duration: 1000, fill: 'forwards' });

        // 3. Konfetileri Başlat
        startConfetti();
    });

    // --- KONFETİ MOTORU (Aynı kalır) ---
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeCanvas); resizeCanvas();
    
    function createParticles() {
        const colors = ['#FFD700', '#FFFFFF', '#1a1a1a', '#f0e68c', '#a0a0a0']; 
        for (let i = 0; i < 350; i++) {
            particles.push({
                x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height, 
                size: Math.random() * 8 + 4, speedY: Math.random() * 3 + 3, speedX: Math.random() * 2 - 1,
                color: colors[Math.floor(Math.random() * colors.length)], rotation: Math.random() * 360
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.y += p.speedY; p.x += p.speedX; p.rotation += 4;
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
            if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
        });
        animationId = requestAnimationFrame(animate);
    }

    function startConfetti() {
        createParticles();
        animate();
    }
});
