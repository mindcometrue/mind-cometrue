/**
 * 마인드 마스터즈: 성공 철학 거장들의 아카이브
 * Implements interactive card logic and detailed content for philosophers.
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
                background: rgba(255, 255, 255, 0.9);
                border-bottom: 1px solid rgba(0,0,0,0.05);
                position: sticky;
                top: 0;
                z-index: 1000;
                backdrop-filter: blur(15px);
            }
            header {
                max-width: 1100px;
                margin: 0 auto;
                padding: 1.2rem 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .logo {
                font-family: 'Playfair Display', serif;
                font-size: 1.4rem;
                font-weight: 700;
                color: var(--primary, #1a1a1a);
                text-decoration: none;
                letter-spacing: -0.02em;
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
                color: #4a4a4a;
                font-size: 0.85rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                transition: color 0.3s ease;
            }
            nav a:hover {
                color: var(--accent, #d4af37);
            }
            @media (max-width: 768px) {
                nav { display: none; }
            }
        </style>
        <header>
            <a href="/" class="logo">MIND MASTERS</a>
            <nav>
                <ul>
                    <li><a href="#bob-proctor">Bob Proctor</a></li>
                    <li><a href="#neville-goddard">Neville Goddard</a></li>
                    <li><a href="#joseph-murphy">Joseph Murphy</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </nav>
        </header>
        `;
    }
}
customElements.define('site-header', SiteHeader);

// 2. Topic Card Component (Refined for Philosophers)
class TopicCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const category = this.getAttribute('category') || '';
        const title = this.getAttribute('title') || '';
        const summary = this.getAttribute('summary') || '';
        const topicId = this.getAttribute('data-topic') || '';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
            }
            .card {
                background: white;
                padding: 2.5rem;
                border-radius: 1.5rem;
                box-shadow: 0 10px 40px rgba(0,0,0,0.03);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
                height: 100%;
                display: flex;
                flex-direction: column;
                border: 1px solid rgba(0,0,0,0.03);
                position: relative;
                overflow: hidden;
            }
            .card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 4px;
                height: 100%;
                background: var(--accent, #d4af37);
                transform: translateY(100%);
                transition: transform 0.4s ease;
            }
            .card:hover::before {
                transform: translateY(0);
            }
            .card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 60px rgba(0,0,0,0.08);
            }
            .category {
                font-size: 0.75rem;
                font-weight: 700;
                color: var(--accent, #d4af37);
                text-transform: uppercase;
                letter-spacing: 0.15em;
                margin-bottom: 1rem;
            }
            h2 {
                font-family: 'Playfair Display', serif;
                font-size: 1.8rem;
                margin: 0 0 1.2rem 0;
                color: var(--primary, #1a1a1a);
                line-height: 1.3;
            }
            p {
                font-size: 1rem;
                color: #4a4a4a;
                line-height: 1.6;
                margin-bottom: 2rem;
                flex-grow: 1;
            }
            .btn {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--primary, #1a1a1a);
                font-weight: 700;
                font-size: 0.9rem;
                text-decoration: none;
                transition: gap 0.3s ease;
            }
            .card:hover .btn {
                gap: 0.8rem;
                color: var(--accent, #d4af37);
            }
            .btn::after {
                content: '→';
            }
        </style>
        <div class="card" onclick="window.openDetail('${topicId}')">
            <div class="category">${category}</div>
            <h2>${title}</h2>
            <p>${summary}</p>
            <div class="btn">Learn More</div>
        </div>
        `;
    }
}
customElements.define('topic-card', TopicCard);

// 3. Content Article Component
class ContentArticle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const category = this.getAttribute('category') || '';
        const title = this.getAttribute('title') || '';
        const summary = this.getAttribute('summary') || '';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                margin-top: 4rem;
            }
            article {
                background: white;
                padding: 3.5rem;
                border-radius: 2rem;
                box-shadow: 0 5px 20px rgba(0,0,0,0.02);
            }
            .category {
                color: var(--accent, #d4af37);
                font-weight: 700;
                font-size: 0.85rem;
                margin-bottom: 1rem;
            }
            h2 {
                font-family: 'Playfair Display', serif;
                font-size: 2.2rem;
                margin-bottom: 1.5rem;
                color: var(--primary, #1a1a1a);
            }
            .summary {
                font-size: 1.2rem;
                font-weight: 600;
                color: #4a4a4a;
                margin-bottom: 2rem;
                line-height: 1.6;
            }
            .content {
                font-size: 1.1rem;
                line-height: 1.8;
                color: #333;
            }
        </style>
        <article>
            <div class="category">${category}</div>
            <h2>${title}</h2>
            <div class="summary">${summary}</div>
            <div class="content">
                <slot></slot>
            </div>
        </article>
        `;
    }
}
customElements.define('content-article', ContentArticle);

// 4. Modal & Detailed Content (The Masters)
const modal = document.getElementById('detail-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-modal');

const masterContents = {
    'bob-proctor': {
        title: "Bob Proctor: 패러다임 전환의 선구자",
        body: `
            <p><strong>밥 프록터(Bob Proctor)</strong>는 현대 성공 철학에서 '패러다임'이라는 개념을 가장 명확하게 정립한 인물입니다. 그는 우리가 아무리 의식적으로 노력해도 인생이 바뀌지 않는 이유는 잠재의식 속에 깊이 박힌 '패러다임'이 우리를 조종하기 때문이라고 말합니다.</p>
            <p>밥 프록터의 핵심 가르침은 <strong>'진동의 법칙(Law of Vibration)'</strong>에 기반합니다. 모든 생각은 에너지이며, 우리가 어떤 주파수의 생각을 유지하느냐에 따라 그에 맞는 현실이 끌려온다는 것이죠. 패러다임을 바꾸기 위해서는 새로운 아이디어를 반복해서 입력하고, 그것이 감정적으로 수용될 때까지 끊임없이 자신을 재프로그래밍해야 합니다.</p>
            <blockquote>"당신의 생각을 바꾸면, 당신의 인생이 바뀝니다."</blockquote>
        `
    },
    'neville-goddard': {
        title: "Neville Goddard: 가정의 법칙과 시각화",
        body: `
            <p><strong>네빌 고다드(Neville Goddard)</strong>는 '상상이 현실을 창조한다'는 원리를 극단적으로 밀어붙인 거장입니다. 그의 핵심 철학은 <strong>'가정의 법칙(Law of Assumption)'</strong>입니다. 즉, 어떤 상태가 이미 이루어졌다고 가정하고 그 느낌 속에서 살아간다면, 현실은 반드시 그 가정을 따라온다는 법칙입니다.</p>
            <p>네빌은 단순히 상상하는 것보다 '느낌(Feeling)'이 가장 중요하다고 강조했습니다. "느낌이 비밀이다(Feeling is the Secret)"라는 그의 말처럼, 소망이 성취되었을 때 느낄 수 있는 그 안도감과 기쁨에 머무는 것이 창조의 핵심입니다. 잠들기 직전, 소망이 이루어진 상태에서 느낄 수 있는 짧은 장면을 반복하며 그 전율 속에서 잠드는 'SATS' 기법은 오늘날에도 수많은 사람들에게 기적을 선사하고 있습니다.</p>
        `
    },
    'joseph-murphy': {
        title: "Joseph Murphy: 잠재의식의 기적적인 힘",
        body: `
            <p><strong>조셉 머피(Joseph Murphy)</strong> 박사는 잠재의식을 일종의 '비옥한 토양'으로 묘사했습니다. 우리가 그 토양에 어떤 씨앗(생각)을 심든, 잠재의식은 그것을 자라나게 합니다. 그의 저서 [잠재의식의 힘]은 전 세계 수백만 명의 인생을 바꾼 고전입니다.</p>
            <p>조셉 머피는 잠재의식에 긍정적인 메시지를 새기는 <strong>'기도와 확언'</strong>의 힘을 강조했습니다. 특히 잠들기 전과 깨어난 직후의 비몽사몽한 상태가 잠재의식과 소통하기 가장 좋은 시간임을 밝혀냈죠. "나의 잠재의식은 무한한 부를 알고 있으며, 지금 나에게 그 부를 가져다주고 있다"와 같은 명확한 선언이 어떻게 물질적, 정신적 풍요를 창조하는지 과학적으로 설명합니다.</p>
        `
    },
    'earl-nightingale': {
        title: "Earl Nightingale: 가장 이상한 비밀",
        body: `
            <p><strong>얼 나이팅게일(Earl Nightingale)</strong>은 현대 자기계발의 아버지라 불립니다. 그의 오디오 강연 '가장 이상한 비밀(The Strangest Secret)'은 역사상 최초로 골드 레코드를 기록한 강연이기도 합니다. 그가 발견한 비밀은 너무나 단순해서 오히려 이상할 정도입니다.</p>
            <p><strong>"우리는 우리가 생각하는 대로 된다(We become what we think about)."</strong> 이것이 그가 말하는 비밀의 전부입니다. 인간은 목표를 가진 선박과 같아서, 명확한 목적지(목표)가 있고 그곳을 향해 올바른 생각을 유지한다면 반드시 도착할 수밖에 없다는 원리입니다. 얼 나이팅게일은 '태도'의 중요성을 특히 강조하며, 성공은 특별한 사람의 전유물이 아니라 올바른 법칙을 따르는 모든 이의 권리임을 설파했습니다.</p>
        `
    }
};

window.openDetail = (topicId) => {
    const content = masterContents[topicId];
    if (content) {
        modalBody.innerHTML = `
            <h2>${content.title}</h2>
            <div class="modal-text">${content.body}</div>
        `;
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
};

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
});

window.onclick = (event) => {
    if (event.target == modal) closeBtn.click();
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
