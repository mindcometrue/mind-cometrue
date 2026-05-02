/**
 * AQUA Showcase: Main JavaScript
 * Implements modern Web Components for a high-quality content site.
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
                color: var(--primary, oklch(25% 0.05 250));
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
                color: var(--accent, oklch(70% 0.15 170));
            }
            @media (max-width: 768px) {
                nav { display: none; }
            }
        </style>
        <header>
            <a href="/" class="logo">AQUA Showcase</a>
            <nav>
                <ul>
                    <li><a href="#tech">Sustainable Tech</a></li>
                    <li><a href="#minimalism">Minimalism</a></li>
                    <li><a href="#community">Community</a></li>
                    <li><a href="#about">About</a></li>
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
        const category = this.getAttribute('category') || 'General';
        const title = this.getAttribute('title') || 'Untitled Article';
        const summary = this.getAttribute('summary') || '';
        const readTime = this.getAttribute('read-time') || '5 min';

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
                color: var(--accent, oklch(70% 0.15 170));
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
                color: var(--primary, oklch(25% 0.05 250));
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
                color: var(--primary, oklch(25% 0.05 250));
                font-weight: 700;
                text-decoration: none;
                border-bottom: 2px solid var(--accent, oklch(70% 0.15 170));
                padding-bottom: 2px;
            }
        </style>
        <article>
            <div class="meta">
                <span>${category}</span>
                <span class="read-time">• ${readTime} read</span>
            </div>
            <h2>${title}</h2>
            <div class="summary">${summary}</div>
            <div class="content">
                <slot></slot>
            </div>
            <a href="#" class="read-more">Continue Reading</a>
        </article>
        `;
    }
}
customElements.define('content-article', ContentArticle);

// 3. Ad Placeholder Component (For demonstrating balanced ad placement)
class AdPlaceholder extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const type = this.getAttribute('type') || 'rectangle';
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
            .ad-label {
                background: oklch(85% 0.01 250);
                padding: 0.2rem 0.5rem;
                border-radius: 0.2rem;
                margin-bottom: 0.5rem;
            }
        </style>
        <div class="ad-box">
            <span class="ad-label">Strategic Ad Placement</span>
            <span>Type: ${type.toUpperCase()}</span>
            <span>Dimensions: ${dimensions}</span>
        </div>
        `;
    }
}
customElements.define('ad-placeholder', AdPlaceholder);

// 4. Content Catalyst Tool (Interactive Feature)
class ContentCatalyst extends HTMLElement {
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
                margin: 4rem 0;
            }
            .catalyst-card {
                background: var(--primary, oklch(25% 0.05 250));
                color: white;
                padding: 3rem;
                border-radius: 1.5rem;
                text-align: center;
                box-shadow: 0 20px 50px oklch(25% 0.05 250 / 0.2);
            }
            h3 { font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 1rem; }
            p { opacity: 0.8; margin-bottom: 2rem; }
            .input-group {
                display: flex;
                gap: 1rem;
                max-width: 500px;
                margin: 0 auto;
            }
            input {
                flex: 1;
                padding: 0.8rem 1.2rem;
                border-radius: 0.5rem;
                border: none;
                font-family: inherit;
            }
            button {
                padding: 0.8rem 1.5rem;
                border-radius: 0.5rem;
                border: none;
                background: var(--accent, oklch(70% 0.15 170));
                color: white;
                font-weight: 700;
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            button:active { transform: scale(0.95); }
            #result {
                margin-top: 2rem;
                font-weight: 600;
                min-height: 1.5rem;
            }
        </style>
        <div class="catalyst-card">
            <h3>Content Catalyst</h3>
            <p>Enter your passion, and we'll suggest a high-quality article angle based on AdSense guidelines.</p>
            <div class="input-group">
                <input type="text" id="passion" placeholder="e.g., Urban Gardening, Retro Gaming">
                <button id="generate">Generate</button>
            </div>
            <div id="result"></div>
        </div>
        `;

        this.shadowRoot.getElementById('generate').addEventListener('click', () => {
            const passion = this.shadowRoot.getElementById('passion').value;
            const resultDiv = this.shadowRoot.getElementById('result');
            
            if (!passion) {
                resultDiv.textContent = "Please enter a passion first!";
                return;
            }

            const prompts = [
                `${passion}의 윤리: 현대적 관점에서 바라보기`,
                `2026년 ${passion}을 위한 지속 가능한 실천 가이드`,
                `${passion}이 미니멀 라이프를 어떻게 재정의하는가`,
                `${passion}의 디지털 미래: 우리가 알아야 할 모든 것`,
                `${passion} 입문자 가이드: 양보다 질을 선택하는 법`
            ];

            const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
            resultDiv.style.opacity = 0;
            setTimeout(() => {
                resultDiv.innerHTML = `추천 주제: <strong>"${randomPrompt}"</strong>`;
                resultDiv.style.opacity = 1;
                resultDiv.style.transition = "opacity 0.5s ease";
            }, 200);
        });
    }
}
customElements.define('content-catalyst', ContentCatalyst);

// 5. Global Smooth Scroll & SEO Utilities
document.addEventListener('DOMContentLoaded', () => {
    // Add Catalyst to the bottom of articles
    const articlesSection = document.querySelector('.articles');
    if (articlesSection) {
        const catalyst = document.createElement('content-catalyst');
        articlesSection.insertBefore(catalyst, document.querySelector('.faq-section'));
    }

    // Smooth scroll for nav
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
