/**
 * AQUA Healing: Main JavaScript
 * Implements interactive healing affirmation generator and UI components.
 */

// 1. Site Header Component
class SiteHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                background: var(--bg-soft, oklch(98% 0.01 200));
                border-bottom: 1px solid oklch(90% 0.01 200);
                position: sticky;
                top: 0;
                z-index: 1000;
                backdrop-filter: blur(10px);
            }
            header {
                max-width: 1200px;
                margin: 0 auto;
                padding: 1rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .logo {
                font-family: 'Playfair Display', serif;
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary, oklch(35% 0.03 260));
                text-decoration: none;
            }
            nav ul {
                display: flex;
                gap: 2rem;
                list-style: none;
                margin: 0;
                padding: 0;
            }
            nav a {
                text-decoration: none;
                color: oklch(40% 0.02 250);
                font-size: 0.9rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: color 0.3s ease;
            }
            nav a:hover {
                color: var(--accent, oklch(75% 0.1 140));
            }
            @media (max-width: 768px) {
                nav { display: none; }
            }
        </style>
        <header>
            <a href="/" class="logo">AQUA Healing</a>
            <nav>
                <ul>
                    <li><a href="#affirmation">오늘의 확언</a></li>
                    <li><a href="#healing">마음 치유</a></li>
                    <li><a href="#guide">돌봄 가이드</a></li>
                    <li><a href="#about">소개</a></li>
                </ul>
            </nav>
        </header>
        `;
    }
}
customElements.define('site-header', SiteHeader);

// 2. Content Article Component
class ContentArticle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const category = this.getAttribute('category') || '일반';
        const title = this.getAttribute('title') || '제목 없음';
        const summary = this.getAttribute('summary') || '';
        const readTime = this.getAttribute('read-time') || '5분';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                margin-bottom: 3rem;
            }
            article {
                background: white;
                padding: 2.5rem;
                border-radius: 1rem;
                box-shadow: 0 10px 30px oklch(0% 0 0 / 0.05);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            article:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px oklch(0% 0 0 / 0.08);
            }
            .meta {
                display: flex;
                gap: 1rem;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: var(--accent, oklch(75% 0.1 140));
                margin-bottom: 1rem;
                font-weight: 600;
            }
            .read-time {
                color: oklch(60% 0.01 250);
            }
            h2 {
                font-family: 'Playfair Display', serif;
                font-size: 2rem;
                margin: 0 0 1rem 0;
                color: var(--primary, oklch(35% 0.03 260));
                line-height: 1.2;
            }
            .summary {
                font-size: 1.1rem;
                color: oklch(40% 0.02 250);
                line-height: 1.6;
                margin-bottom: 1.5rem;
                font-style: italic;
            }
            .content {
                line-height: 1.8;
                color: oklch(30% 0.02 250);
            }
            .read-more {
                display: inline-block;
                margin-top: 2rem;
                color: var(--primary, oklch(35% 0.03 260));
                font-weight: 700;
                text-decoration: none;
                border-bottom: 2px solid var(--accent, oklch(75% 0.1 140));
                padding-bottom: 2px;
            }
        </style>
        <article>
            <div class="meta">
                <span>${category}</span>
                <span class="read-time">• ${readTime} 읽기</span>
            </div>
            <h2>${title}</h2>
            <div class="summary">${summary}</div>
            <div class="content">
                <slot></slot>
            </div>
            <a href="#" class="read-more">더 읽어보기</a>
        </article>
        `;
    }
}
customElements.define('content-article', ContentArticle);

// 3. Ad Placeholder Component
class AdPlaceholder extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const type = this.getAttribute('type') || 'rectangle';
        const label = this.getAttribute('aria-label') || '광고 영역';
        const dimensions = {
            'leaderboard': '728 x 90',
            'in-feed': '100% x 250',
            'rectangle': '300 x 250'
        }[type] || '300 x 250';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                margin: 2rem auto;
                max-width: 100%;
                text-align: center;
                position: relative;
            }
            .ad-box {
                background: oklch(95% 0.01 250);
                border: 2px dashed oklch(80% 0.01 250);
                border-radius: 0.5rem;
                padding: 1rem;
                color: oklch(60% 0.01 250);
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: ${type === 'leaderboard' ? '90px' : '250px'};
            }
            .ad-tag {
                font-size: 0.6rem;
                position: absolute;
                top: -1.2rem;
                left: 0;
                color: oklch(60% 0.01 250);
            }
        </style>
        <div class="ad-tag">${label}</div>
        <div class="ad-box">
            <span>AD : ${type.toUpperCase()}</span>
            <span>(${dimensions})</span>
        </div>
        `;
    }
}
customElements.define('ad-placeholder', AdPlaceholder);

// 4. Healing Affirmation Generator (Enhanced)
class ContentCatalyst extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.affirmations = [
            "당신은 오늘 최선을 다했습니다. 그것으로 충분합니다.",
            "지나온 시간보다 앞으로 빛날 당신의 미래가 더 소중합니다.",
            "오늘의 실수는 내일의 더 큰 지혜가 될 것입니다.",
            "당신의 속도는 당신에게 가장 완벽한 속도입니다.",
            "조금 쉬어가도 괜찮습니다. 휴식은 멈춤이 아니라 도약입니다.",
            "당신은 사랑받을 자격이 충분한 존재입니다.",
            "내면의 목소리에 귀를 기울여보세요. 답은 이미 당신 안에 있습니다.",
            "어둠이 깊을수록 새벽은 가까이 와 있습니다.",
            "당신의 미소는 누군가에게 가장 큰 위로가 됩니다.",
            "오늘 하루도 살아내느라 정말 고생 많으셨습니다."
        ];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                margin-bottom: 4rem;
            }
            .catalyst-card {
                background: var(--primary, oklch(35% 0.03 260));
                color: white;
                padding: 3rem;
                border-radius: 1.5rem;
                text-align: center;
                box-shadow: 0 20px 50px oklch(35% 0.03 260 / 0.2);
                position: relative;
                overflow: hidden;
            }
            .catalyst-card::before {
                content: '"';
                position: absolute;
                top: -20px;
                left: 20px;
                font-family: 'Playfair Display', serif;
                font-size: 10rem;
                opacity: 0.1;
                line-height: 1;
            }
            h3 { font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 1rem; position: relative; }
            p { opacity: 0.8; margin-bottom: 2rem; position: relative; }
            button {
                padding: 1rem 2rem;
                border-radius: 2rem;
                border: none;
                background: var(--accent, oklch(75% 0.1 140));
                color: var(--primary, oklch(35% 0.03 260));
                font-weight: 700;
                font-size: 1.1rem;
                cursor: pointer;
                transition: transform 0.2s ease, background 0.3s ease;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
            button:hover { background: oklch(80% 0.1 140); }
            button:active { transform: scale(0.95); }
            #result {
                margin-top: 2.5rem;
                font-size: 1.4rem;
                font-family: 'Playfair Display', serif;
                font-weight: 700;
                line-height: 1.6;
                min-height: 3.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
        </style>
        <div class="catalyst-card" id="affirmation">
            <h3>나를 위한 한 문장</h3>
            <p>눈을 감고 깊게 호흡한 뒤, 아래 버튼을 눌러 당신만을 위한 확언을 확인하세요.</p>
            <button id="generate">확언 생성하기</button>
            <div id="result">당신을 기다리는 위로가 여기 있습니다.</div>
        </div>
        `;

        this.shadowRoot.getElementById('generate').addEventListener('click', () => {
            const resultDiv = this.shadowRoot.getElementById('result');
            const randomIndex = Math.floor(Math.random() * this.affirmations.length);
            const randomAffirmation = this.affirmations[randomIndex];

            resultDiv.style.opacity = 0;
            resultDiv.style.transform = "translateY(10px)";
            resultDiv.style.transition = "all 0.5s ease";

            setTimeout(() => {
                resultDiv.innerHTML = `"${randomAffirmation}"`;
                resultDiv.style.opacity = 1;
                resultDiv.style.transform = "translateY(0)";
            }, 200);
        });
    }
}
customElements.define('content-catalyst', ContentCatalyst);

// 5. Global Smooth Scroll & SEO Utilities
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId === '#' ? 'body' : targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
