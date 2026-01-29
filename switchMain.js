const main = document.querySelector("main");
const pageBody = document.body;

const portfolioBut = document.getElementById("portfolio");
const otherWorksBut = document.getElementById("other-works");
const aboutBut = document.getElementById("about");
let scrollHintListenerBound = false;
let projectsPromise = null;

function loadProjects() {
    if (!projectsPromise) {
        projectsPromise = fetch("projects.json")
            .then(response => response.json())
            .catch(error => {
                console.error("Failed to load projects.json:", error);
                return [];
            });
    }
    return projectsPromise;
}

function updateScrollHint() {
    const hint = document.querySelector(".scroll-hint");
    if (!hint) {
        return;
    }
    const section = window.location.hash.replace("#", "");
    const isPortfolio = section === "portfolio" || section === "";
    const atTop = window.scrollY <= 10;
    hint.classList.toggle("is-visible", isPortfolio && atTop);
}

function bindScrollHintListener() {
    if (scrollHintListenerBound) {
        return;
    }
    window.addEventListener("scroll", updateScrollHint, { passive: true });
    scrollHintListenerBound = true;
}

function renderByHash() {
    const section = window.location.hash.replace("#", "");
    if (!section) {
        window.location.hash = "portfolio";
        return;
    }
    setActiveSection(section);
}

function setActiveSection(section) {
    removeAllActive();
    if (section === "portfolio") {
        renderPortfolio();
        portfolioBut.classList = "selected";
        main.classList = "";
        pageBody.classList.remove("other-works");
        scrollToTop();
        return;
    }
    if (section === "about") {
        renderAbout();
        aboutBut.classList = "selected";
        main.classList = "";
        pageBody.classList.remove("other-works");
        scrollToTop();
        return;
    }
    renderOtherWorks();
    otherWorksBut.classList = "selected";
    main.classList = "four-columns";
    pageBody.classList.add("other-works");
    scrollToTop();
}

window.addEventListener("hashchange", renderByHash);
renderByHash();

function removeAllActive(){
    portfolioBut.classList='';
    otherWorksBut.classList='';
    aboutBut.classList='';
}

function renderPortfolio() {
    main.innerHTML = `
        <div class="portfolio-gallery">
            <img alt="portfolio 6" src="PortfolioPics/7.png">
            <img alt="portfolio 1-1" src="PortfolioPics/1-1.png">
            <img alt="portfolio 1-2" src="PortfolioPics/1-2.png">
            <img alt="portfolio 1-3" src="PortfolioPics/1-3.png">
            <img alt="portfolio 1-4" src="PortfolioPics/1-4.png">
            <img alt="portfolio 1-5" src="PortfolioPics/1-5.png">
            <img alt="portfolio 1-6" src="PortfolioPics/1-6.png">
            <img alt="portfolio 2-1" src="PortfolioPics/2-1.png">
            <img alt="portfolio 2-2" src="PortfolioPics/2-2.png">
            <img alt="portfolio 2-3" src="PortfolioPics/2-3.png">
            <img alt="portfolio 2-4" src="PortfolioPics/2-4.png">
            <img alt="portfolio 2-5" src="PortfolioPics/2-5.png">
            <img alt="portfolio 2-6" src="PortfolioPics/2-6.png">
            <img alt="portfolio 3-1" src="PortfolioPics/3-1.png">
            <img alt="portfolio 3-2" src="PortfolioPics/3-2.png">
            <img alt="portfolio 3-3" src="PortfolioPics/3-3.png">
            <img alt="portfolio 3-4" src="PortfolioPics/3-4.png">
            <img alt="portfolio 3-5" src="PortfolioPics/3-5.png">
            <div class="portfolio-video-card">
                <img alt="portfolio 4-1" src="PortfolioPics/4-1.png">
                <a
                    class="portfolio-hotspot"
                    href="https://youtu.be/ZFRtT8e7bBY"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Click to see the full process and demo day recap"
                >
                    <span class="portfolio-tooltip"><span class="line">Click to see the full process</span><span class="line">and demo day recap</span></span>
                </a>
            </div>
            <img alt="portfolio 5-1" src="PortfolioPics/5-1.png">
            <img alt="portfolio 5-2" src="PortfolioPics/5-2.png">
            <a class="underline portfolio-link" href="https://github.com/Yiqi71" target="_blank" rel="noopener noreferrer">My Github</a>
        </div>
        <div class="scroll-hint" aria-hidden="true"></div>
    `;
    bindScrollHintListener();
    updateScrollHint();
    bindPortfolioTooltipFollow();
}

function bindPortfolioTooltipFollow() {
    const hotspot = document.querySelector(".portfolio-hotspot");
    if (!hotspot) {
        return;
    }
    const tooltip = hotspot.querySelector(".portfolio-tooltip");
    if (!tooltip) {
        return;
    }

    const moveTooltip = (event) => {
        const rect = hotspot.getBoundingClientRect();
        const x = event.clientX - rect.left + 12;
        const y = event.clientY - rect.top + 12;
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
    };

    hotspot.addEventListener("mousemove", moveTooltip);
    hotspot.addEventListener("mouseenter", moveTooltip);
}

function renderOtherWorks() {
    main.innerHTML = `
        <div class="column digital-column">
            <h2 class="column-title">Digital</h2>
            <div class="column-content" data-column="digital"></div>
        </div>
        <div class="column ux-column">
            <h2 class="column-title">UX</h2>
            <div class="column-content" data-column="ux"></div>
        </div>
        <div class="column physical-column">
            <h2 class="column-title">Physical</h2>
            <div class="column-content" data-column="physical"></div>
        </div>
        <div class="column other-column">
            <h2 class="column-title">Other</h2>
            <div class="column-content" data-column="other"></div>
        </div>
    `;

    const columnOrder = {
        digital: ["bk-trees", "QC-webpage", "data-collector", "whispers", "hi", "Kiwi", "popcorn-rain"],
        ux: ["GBG-car"],
        physical: ["ballance", "light-of-connection", "oops"],
        other: ["life-of-a-drink", "moons-on-sale", "a-plate", "pAInter", "echoes"]
    };

    loadProjects().then(projects => {
        const projectMap = new Map(projects.map(project => [project.id, project]));
        Object.keys(columnOrder).forEach(columnKey => {
            const container = main.querySelector(`[data-column="${columnKey}"]`);
            if (!container) {
                return;
            }
            const cardsHtml = columnOrder[columnKey]
                .map(id => projectMap.get(id))
                .filter(Boolean)
                .map(project => renderProjectCard(project))
                .join("");
            container.innerHTML = cardsHtml;
        });
    });
}

function renderProjectCard(project) {
    const title = project.title || "";
    const description = project.description || "";
    const date = project.date || "";
    const image = project.image || "";
    const imageAlt = title ? `${title} img` : "project image";
    return `
        <a href="project-detail.html?id=${project.id}">
            <div id="${project.id}" class="project">
                <img alt="${imageAlt}" src="${image}" width=400>
                <div class="title">
                    <h1>${title}</h1>
                    <p>${description}</p>
                    <p>${date}</p>
                </div>
            </div>
        </a>
    `;
}

function renderAbout(){
    main.innerHTML = `
    <div class="intro-container">
            <img alt="" src="" width="400">
            <div class="intro-text">
                <h1>Hi, I'm Yiqi Chen, a Senior in Interactive Media Arts (IMA) at NYU.</h1>
                <p>I am a designer working on systems where participation is risky, uneven, or incomplete.
My work examines how responsibility is assigned when people hesitate, stay silent, or express themselves imperfectly. 
Instead of asking individuals to perform better, 
I design structures that help institutions interpret signals and act responsibly.
                </p>
                <p> Feel free to explore my work and get in touch!</p>
            </div>
        </div>
    `
}

function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

