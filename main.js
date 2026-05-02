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
        title: "Bob Proctor: 패러다임 전환의 마스터",
        body: `
            <div class="master-summary">
                <p><strong>밥 프록터(Bob Proctor)</strong>는 현대 성공 철학에서 '패러다임'이라는 개념을 가장 명확하게 정립한 인물입니다.</p>
                <h3>1. 패러다임 (Paradigm)</h3>
                <p>우리의 행동과 결과의 95% 이상을 지배하는 잠재의식 속의 프로그램입니다. 밥 프록터는 아무리 의식적으로 노력해도 인생이 제자리인 이유는 이 패러다임이 당신을 통제하고 있기 때문이라고 설명합니다.</p>
                <h3>2. 진동의 법칙 (Law of Vibration)</h3>
                <p>우주와 우리 몸은 에너지이며, 고정된 주파수(Vibration)를 가집니다. 당신의 생각이 어떤 주파수에 머무느냐에 따라 그에 맞는 현실이 끌려옵니다.</p>
                <h3>3. 실천 가이드: 반복 (Repetition)</h3>
                <p>낡은 패러다임을 깨는 유일한 방법은 새로운 아이디어를 반복해서 잠재의식에 심는 것입니다. 원하는 미래를 현재형으로 기록하고 매일 읽으십시오.</p>
            </div>
        `
    },
    'neville-goddard': {
        title: "Neville Goddard: 상상력과 가정의 법칙",
        body: `
            <div class="master-summary">
                <p><strong>네빌 고다드(Neville Goddard)</strong>는 '상상이 현실을 창조한다'는 원리를 전파한 거장입니다.</p>
                <h3>1. 가정의 법칙 (Law of Assumption)</h3>
                <p>소망이 이미 이루어졌다고 '가정'하고 그 느낌 속에서 사는 법입니다. 네빌은 소망이 성취되었을 때의 '안도감'과 '기쁨'에 머무는 것이 창조의 핵심이라고 강조했습니다.</p>
                <h3>2. 시각화 (Visualization)</h3>
                <p>단순한 이미지가 아니라, 오감을 동원하여 그 장면을 실제로 느끼는 단계입니다. 소망이 이루어진 직후에 일어날 짧은 행동을 반복적으로 상상하십시오.</p>
                <h3>3. 실천 가이드: SATS</h3>
                <p>잠들기 직전, 몸이 이완된 상태에서 소망이 성취된 장면을 반복하며 그 전율 속에서 잠드십시오. 잠재의식은 잠든 동안 당신의 가정을 현실로 조각합니다.</p>
            </div>
        `
    },
    'joseph-murphy': {
        title: "Joseph Murphy: 잠재의식 속에 숨겨진 부의 기적",
        body: `
            <div class="master-summary">
                <p><strong>조셉 머피(Joseph Murphy)</strong> 박사는 잠재의식을 일종의 '비옥한 토양'으로 묘사했습니다.</p>
                <h3>1. 잠재의식의 작동 원리</h3>
                <p>잠재의식은 비판이나 판단 없이 당신의 지시를 따르는 무한한 지능의 보고입니다. 당신이 심은 생각의 씨앗이 무엇이든 그대로 자라게 합니다.</p>
                <h3>2. 과학적 기도법 (Affirmation)</h3>
                <p>이미 가지고 있다는 감사의 마음으로 잠재의식에 말을 거는 법입니다. 명확한 선언을 통해 잠재의식에 성공의 주파수를 각인시킬 수 있습니다.</p>
                <h3>3. 실천 가이드: 수면 전 암시</h3>
                <p>잠재의식과 가장 가깝게 만나는 시간은 잠들기 직전입니다. 이때 갈등 없는 평온한 상태에서 "성공", "부", "건강"과 같은 단어를 반복적으로 속삭이십시오.</p>
            </div>
        `
    },
    'earl-nightingale': {
        title: "Earl Nightingale: 인류 역사상 가장 이상한 비밀",
        body: `
            <div class="master-summary">
                <p><strong>얼 나이팅게일(Earl Nightingale)</strong>은 현대 자기계발의 아버지라 불립니다.</p>
                <h3>1. 가장 이상한 비밀 (The Strangest Secret)</h3>
                <p>"우리는 우리가 생각하는 대로 된다(We become what we think about)." 이것이 인류 역사상 가장 강력하고 단순한 성공의 법칙입니다.</p>
                <h3>2. 목표의 중요성</h3>
                <p>명확한 목적지 없이 바다를 떠도는 배는 결코 항구에 도착할 수 없습니다. 성공은 스스로 정한 가치 있는 목표를 향해 나아가는 과정 그 자체입니다.</p>
                <h3>3. 실천 가이드: 30일 테스트</h3>
                <p>오늘부터 30일 동안 당신의 목표를 카드에 적어 매일 바라보십시오. 당신의 마음을 오직 목표에만 집중시키고 최선을 다하십시오.</p>
            </div>
        `
    }
};

// 5. Masters Affirmations Database
const affirmations = [
    { text: "나는 내 인생의 유일한 창조주이며, 내 상상이 곧 나의 현실이 된다.", master: "Neville Goddard" },
    { text: "나의 잠재의식은 지금 이 순간에도 나를 위해 일하며 부의 길을 열어주고 있다.", master: "Joseph Murphy" },
    { text: "나는 내 패러다임을 완전히 장악했으며, 나는 내가 생각하는 대로 된다.", master: "Earl Nightingale" },
    { text: "나는 매일 모든 면에서 점점 더 좋아지고 있다.", master: "Emile Coué" },
    { text: "나는 부를 끌어당기는 자석이며, 풍요는 자연스럽게 나에게 흘러들어온다.", master: "Bob Proctor" },
    { text: "이미 이루어진 것처럼 느껴라. 그 느낌이 모든 것을 창조한다.", master: "Neville Goddard" },
    { text: "내 안의 무한한 지능은 내가 필요로 하는 모든 답을 알고 있다.", master: "Joseph Murphy" },
    { text: "성공은 내면의 준비가 외부의 기회와 만날 때 일어난다.", master: "Bob Proctor" },
    { text: "당신이 진정으로 원하고 믿는다면, 온 우주가 당신을 돕기 위해 움직인다.", master: "Earl Nightingale" },
    { text: "나는 돈을 사랑하고, 돈은 나를 사랑한다. 부는 나의 권리이다.", master: "Joseph Murphy" },
    { text: "과거는 더 이상 힘이 없다. 오직 지금 이 순간의 내 생각만이 힘을 가진다.", master: "Bob Proctor" },
    { text: "나는 이미 내가 되고 싶은 그 사람이다.", master: "Neville Goddard" },
    { text: "나의 수입은 내가 제공하는 서비스의 질과 양에 비례하여 무한히 늘어난다.", master: "Earl Nightingale" },
    { text: "나는 어떤 상황에서도 평온함을 유지하며, 내면의 힘을 신뢰한다.", master: "Joseph Murphy" },
    { text: "한계를 설정하는 것은 오직 나의 생각뿐이다. 나는 그 한계를 파괴한다.", master: "Bob Proctor" },
    { text: "감사는 풍요로 가는 가장 빠른 지름길이다. 나는 이미 모든 것에 감사한다.", master: "Bob Proctor" },
    { text: "나의 상상은 현실의 그림자가 아니라, 현실 그 자체의 근원이다.", master: "Neville Goddard" },
    { text: "부유함은 상태일 뿐이다. 나는 풍요의 상태를 선택한다.", master: "Joseph Murphy" },
    { text: "나는 매일 기적을 기대하며, 실제로 그 기적 속에서 살아간다.", master: "Neville Goddard" },
    { text: "나의 생각은 씨앗이며, 내 인생은 그 씨앗이 자라난 결과물이다.", master: "Earl Nightingale" },
    { text: "나는 내 마음의 정원을 가꾸는 정원사이다. 나는 긍정의 씨앗만을 심는다.", master: "Joseph Murphy" },
    { text: "어떤 목표든 내가 그것에 주파수를 맞춘다면 반드시 실현된다.", master: "Bob Proctor" },
    { text: "가장 높은 버전의 나를 상상하고, 오늘 그 사람처럼 행동하라.", master: "Bob Proctor" },
    { text: "안도감은 소망이 이루어졌다는 가장 강력한 신호이다.", master: "Neville Goddard" },
    { text: "나는 무한한 지혜와 연결되어 있으며, 내 길은 항상 밝게 비춰진다.", master: "Joseph Murphy" },
    { text: "나는 내가 가진 모든 재능을 발휘하여 세상을 이롭게 한다.", master: "Earl Nightingale" },
    { text: "부를 담는 그릇은 나의 자기 이미지에 의해 결정된다. 나는 내 그릇을 키운다.", master: "Bob Proctor" },
    { text: "세상은 나의 내면을 비추는 거울일 뿐이다.", master: "Neville Goddard" },
    { text: "나는 건강하고, 부유하며, 행복한 존재이다.", master: "Joseph Murphy" },
    { text: "오늘 하루는 내 인생 최고의 작품이 될 것이다.", master: "Earl Nightingale" }
];

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

window.openAffirmation = () => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    modalBody.innerHTML = `
        <div class="affirmation-view">
            <span class="affirmation-master">Daily Wisdom from ${random.master}</span>
            <h2 class="affirmation-text">"${random.text}"</h2>
            <p class="affirmation-sub">이 문장을 3번 소리 내어 읽고, 온몸으로 그 느낌을 받아들이세요.</p>
            <button class="btn-refresh" onclick="window.openAffirmation()">다른 확언 받기</button>
        </div>
    `;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

document.getElementById('master-affirmation-btn').addEventListener('click', window.openAffirmation);

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
