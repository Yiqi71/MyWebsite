const main = document.querySelector("main");
const pageBody = document.body;

const portfolioBut = document.getElementById("portfolio");
const otherWorksBut = document.getElementById("other-works");
const aboutBut = document.getElementById("about");
let scrollHintListenerBound = false;
let projectsPromise = null;
let otherWorksLayout = "rows";
let otherWorksCleanup = null;

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
        cleanupOtherWorksLayout();
        renderPortfolio();
        portfolioBut.classList = "selected";
        main.className = "";
        pageBody.classList.remove("other-works-rows");
        scrollToTop();
        return;
    }
    if (section === "about") {
        cleanupOtherWorksLayout();
        renderAbout();
        aboutBut.classList = "selected";
        main.className = "";
        pageBody.classList.remove("other-works-rows");
        scrollToTop();
        return;
    }
    renderOtherWorks();
    otherWorksBut.classList = "selected";
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
    cleanupOtherWorksLayout();
    if (otherWorksLayout === "columns" && typeof window.applyOtherWorksFourColumns === "function") {
        otherWorksCleanup = window.applyOtherWorksFourColumns({
            main,
            pageBody,
            loadProjects,
            renderProjectCard
        });
        return;
    }
    otherWorksCleanup = applyOtherWorksRows();
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
                <div class="project-media" style="--project-image: url('${image}')">
                    <img alt="${imageAlt}" src="${image}">
                </div>
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

function cleanupOtherWorksLayout() {
    if (typeof otherWorksCleanup === "function") {
        otherWorksCleanup();
    }
    otherWorksCleanup = null;
}

function getCurrentSection() {
    return window.location.hash.replace("#", "") || "portfolio";
}

function setOtherWorksLayout(layout) {
    const normalized = layout === "four-columns" ? "columns" : layout;
    if (normalized !== "rows" && normalized !== "columns") {
        console.warn(`Unknown other works layout: ${layout}`);
        return;
    }
    otherWorksLayout = normalized;
    if (getCurrentSection() === "other-works") {
        renderOtherWorks();
    }
}

window.setOtherWorksLayout = setOtherWorksLayout;

function applyOtherWorksRows() {
    const rowOrder = [
        {
            key: "interaction",
            title: "Interaction Logic",
            description: "systems that interpret input and decide how to respond",
            ids: ["bk-trees", "Kiwi", "popcorn-rain", "hi", "zeroth"]
        },
        {
            key: "data",
            title: "Data Mediation",
            description: "structuring, visualizing, and shaping information for use",
            ids: ["QC-webpage", "data-collector"]
        },
        {
            key: "physical",
            title: "Physical Interaction",
            description: "embodied sensing, feedback, and physical constraints",
            ids: ["ballance", "light-of-connection", "oops"]
        },
        {
            key: "material",
            title: "Material Experiments",
            description: "material, form, and fabrication as design constraints",
            ids: ["moons-on-sale", "a-plate", "GBG-car", "life-of-a-drink", "whispers"]
        }
    ];

    main.className = "other-works-rows";
    pageBody.classList.add("other-works-rows");
    main.innerHTML = rowOrder
        .map(row => `
            <section class="other-works-section">
                <h2 class="other-works-section-title">${row.title}</h2>
                <p class="other-works-section-desc">${row.description}</p>
                <div class="other-works-row" data-row="${row.key}"></div>
            </section>
        `)
        .join("");

    const rowElements = Array.from(main.querySelectorAll(".other-works-row"));
    const rowCleanup = bindRowScrollHandlers(rowElements);

    loadProjects().then(projects => {
        const projectMap = new Map(projects.map(project => [project.id, project]));
        rowOrder.forEach(row => {
            const container = main.querySelector(`[data-row="${row.key}"]`);
            if (!container) {
                return;
            }
            const cardsHtml = row.ids
                .map(id => projectMap.get(id))
                .filter(Boolean)
                .map(project => renderProjectCard(project))
                .join("");
            container.innerHTML = cardsHtml;
        });
    });

    return () => {
        main.classList.remove("other-works-rows");
        pageBody.classList.remove("other-works-rows");
        rowCleanup();
    };
}

function adjustRowCardWidths(container) {
    const cards = container.querySelectorAll(".project");
    cards.forEach(card => {
        const title = card.querySelector(".title");
        if (!title) {
            return;
        }
        const textNodes = title.querySelectorAll("h1, p");
        let maxTextWidth = 0;
        textNodes.forEach(node => {
            maxTextWidth = Math.max(maxTextWidth, measureTextWidth(node));
        });
        const styles = window.getComputedStyle(title);
        const paddingLeft = parseFloat(styles.paddingLeft) || 0;
        const paddingRight = parseFloat(styles.paddingRight) || 0;
        const minWidth = Math.ceil(maxTextWidth + paddingLeft + paddingRight);
        if (minWidth > 0) {
            card.style.minWidth = `${minWidth}px`;
            card.style.width = `${minWidth}px`;
        }
    });
}

function bindRowScrollHandlers(rows) {
    const handlers = rows.map(row => {
        const onWheel = (event) => {
            if (row.scrollWidth <= row.clientWidth + 1) {
                return;
            }
            const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
            if (delta === 0) {
                return;
            }
            row.scrollLeft += delta;
            event.preventDefault();
        };
        row.addEventListener("wheel", onWheel, { passive: false });
        return () => row.removeEventListener("wheel", onWheel);
    });

    return () => {
        handlers.forEach(cleanup => cleanup());
    };
}

let measureSpan = null;

function ensureMeasureSpan() {
    if (measureSpan) {
        return measureSpan;
    }
    measureSpan = document.createElement("span");
    measureSpan.style.position = "absolute";
    measureSpan.style.left = "-10000px";
    measureSpan.style.top = "-10000px";
    measureSpan.style.whiteSpace = "nowrap";
    measureSpan.style.visibility = "hidden";
    document.body.appendChild(measureSpan);
    return measureSpan;
}

function measureTextWidth(node) {
    const span = ensureMeasureSpan();
    const computed = window.getComputedStyle(node);
    span.style.font = computed.font;
    span.style.letterSpacing = computed.letterSpacing;
    span.style.textTransform = computed.textTransform;
    span.textContent = node.textContent || "";
    return span.getBoundingClientRect().width;
}

