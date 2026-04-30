function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(true); }
        reset(random) {
            this.x = Math.random() * canvas.width;
            this.y = random ? Math.random() * canvas.height : (Math.random() < 0.5 ? -2 : canvas.height + 2);
            this.r = Math.random() * 1.4 + 0.2;
            this.vx = (Math.random() - 0.5) * 0.18;
            this.vy = (Math.random() - 0.5) * 0.18;
            this.a = Math.random() * 0.45 + 0.08;
            this.gold = Math.random() > 0.65;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < -4 || this.x > canvas.width + 4 || this.y < -4 || this.y > canvas.height + 4) {
                this.reset(false);
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.gold
                ? `rgba(201,168,76,${this.a})`
                : `rgba(232,227,216,${this.a * 0.4})`;
            ctx.fill();
        }
    }

    resize();
    window.addEventListener('resize', resize);
    particles = Array.from({ length: 130 }, () => new Particle());

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        raf = requestAnimationFrame(loop);
    }

    loop();
    canvas.classList.add('on');
}

(function () {
    const affirmations = [
        "나는 지금 너무 행복하고 감사하다. 다양한 경로를 통해 지속적으로 점점 더 많은 돈이 나에게 들어온다.",
        "나는 돈을 끌어당기는 자석이다. 번영이 나에게 이끌려온다.",
        "부의 흐름이 내 삶에 끊임없이 흐른다.",
        "나의 수입은 항상 지출보다 크다.",
        "나는 삶이 제공하는 모든 부에 대해 마음이 열려 있으며 이를 받아들일 준비가 되어 있다.",
        "내가 생각하는 것이 나의 현실이 된다.",
        "나의 잠재의식은 부의 아이디어를 현실로 바꾼다.",
        "내 마음속의 이미지는 곧 나의 손안에 쥐어질 것이다.",
        "풍요는 나의 자연스러운 상태이며, 나는 그것을 기꺼이 받아들인다.",
        "나는 우주의 무한한 풍요와 연결되어 있다.",
        "I am so happy and grateful now that money comes to me in increasing quantities through multiple sources on a continuous basis."
    ];

    let lastIdx = -1;

    function nextAffirmation() {
        let idx;
        do { idx = Math.floor(Math.random() * affirmations.length); }
        while (idx === lastIdx);
        lastIdx = idx;
        return affirmations[idx];
    }

    function updateAffirmation() {
        const el = document.getElementById('affirmation-display');
        if (!el) return;
        el.style.opacity = '0';
        setTimeout(() => {
            el.textContent = `"${nextAffirmation()}"`;
            el.style.opacity = '1';
        }, 500);
    }

    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    function initHeader() {
        const header = document.getElementById('site-header');
        if (!header) return;
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    function initHamburger() {
        const btn = document.getElementById('hamburger');
        const links = document.getElementById('nav-links');
        if (!btn || !links) return;
        btn.addEventListener('click', () => {
            btn.classList.toggle('open');
            links.classList.toggle('open');
        });
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                btn.classList.remove('open');
                links.classList.remove('open');
            });
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(a.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    function enterExperience() {
        const landing = document.getElementById('landing-page');
        const main = document.getElementById('main-content');
        if (!landing || !main) return;

        landing.style.opacity = '0';
        landing.style.pointerEvents = 'none';

        setTimeout(() => {
            landing.style.display = 'none';
            main.style.display = 'block';
            window.scrollTo(0, 0);
            initScrollReveal();
            initHeader();
            initHamburger();
            initSmoothScroll();
            document.getElementById('new-affirmation-btn')
                ?.addEventListener('click', updateAffirmation);
        }, 1400);
    }

    function init() {
        initParticles();
        document.getElementById('enter-btn')?.addEventListener('click', enterExperience);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
