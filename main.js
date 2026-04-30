// Web Component for Factor Card
class FactorCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #ffffff;
                    padding: 3rem;
                    border: 1px solid #f0f0f0;
                    transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
                    text-align: left;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.02);
                }
                :host(:hover) {
                    transform: translateY(-15px);
                    border-color: #d4af37;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08), 0 0 15px rgba(212, 175, 55, 0.1);
                }
                h3 {
                    font-family: 'Bodoni Moda', serif;
                    font-size: 1.8rem;
                    margin-bottom: 1.2rem;
                    color: #1a1a1a;
                    font-weight: 400;
                }
                p {
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    color: #666666;
                    line-height: 1.8;
                    font-weight: 300;
                }
                .accent {
                    width: 40px;
                    height: 1px;
                    background-color: #d4af37;
                    margin-bottom: 2rem;
                }
            </style>
            <div class="accent"></div>
            <h3>${title}</h3>
            <p>${description}</p>
        `;
    }
}
customElements.define('factor-card', FactorCard);

// Main Logic
(function() {
    console.log('Main logic executing');
    const debugDot = document.getElementById('debug-dot');
    if (debugDot) debugDot.style.display = 'block';

    const enterBtn = document.getElementById('enter-btn');
    const landingPage = document.getElementById('landing-page');
    const mainContent = document.getElementById('main-content');
    const affirmationDisplay = document.getElementById('affirmation-display');
    const newAffirmationBtn = document.getElementById('new-affirmation-btn');

    if (enterBtn) {
        enterBtn.onclick = () => {
            console.log('Enter button clicked');
            if (debugDot) debugDot.style.background = 'green';
            landingPage.style.opacity = '0';
            setTimeout(() => {
                landingPage.style.display = 'none';
                mainContent.style.display = 'block';
                window.scrollTo(0, 0);
                initScrollReveal();
            }, 1000);
        };
    }

    const affirmations = [
        "나는 지금 너무 행복하고 감사하다. 다양한 경로를 통해 지속적으로 점점 더 많은 돈이 나에게 들어온다.",
        "나는 돈을 끌어당기는 자석이다. 번영이 나에게 이끌려온다.",
        "부의 흐름이 내 삶에 끊임없이 흐른다.",
        "나의 수입은 항상 지출보다 크다.",
        "나는 삶이 제공하는 모든 부에 대해 마음이 열려 있으며 이를 받아일 준비가 되어 있다.",
        "내가 생각하는 것이 나의 현실이 된다.",
        "나의 잠재의식은 부의 아이디어를 현실로 바꾼다.",
        "내 마음속의 이미지는 곧 나의 손안에 쥐어질 것이다.",
        "풍요는 나의 자연스러운 상태이며, 나는 그것을 기꺼이 받아들인다.",
        "나는 우주의 무한한 풍요와 연결되어 있다.",
        "I am so happy and grateful now that money comes to me in increasing quantities through multiple sources on a continuous basis."
    ];

    function updateAffirmation() {
        if (!affirmationDisplay) return;
        affirmationDisplay.style.opacity = '0';
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * affirmations.length);
            affirmationDisplay.textContent = `"${affirmations[randomIndex]}"`;
            affirmationDisplay.style.opacity = '1';
        }, 600);
    }

    if (newAffirmationBtn) {
        newAffirmationBtn.onclick = updateAffirmation;
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.onclick = function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        };
    });

    function initScrollReveal() {
        const reveals = document.querySelectorAll('section, .factors-grid > *, .step-card, .affirmation-box');
        reveals.forEach(el => el.classList.add('reveal'));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        reveals.forEach(reveal => observer.observe(reveal));
    }
})();
