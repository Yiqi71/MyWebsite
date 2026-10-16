const main = document.querySelector("main");
const pageBody = document.body;

const portfolioBut = document.getElementById("portfolio");
const otherWorksBut = document.getElementById("other-works");
const aboutBut = document.getElementById("about");
let scrollHintListenerBound = false;
let projectsPromise = null;
let tinyThingsPromise = null;
let otherWorksLayout = "rows";
let otherWorksCleanup = null;
let tinyWidget = null;

function loadProjects() {
    if (!projectsPromise) {
        projectsPromise = fetch("data/projects.json")
            .then(response => response.json())
            .catch(error => {
                console.error("Failed to load projects.json:", error);
                return [];
            });
    }
    return projectsPromise;
}

function loadTinyThings() {
    if (!tinyThingsPromise) {
        tinyThingsPromise = fetch("data/tinies.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error("Failed to load tinies.json:", error);
                return [];
            });
    }
    return tinyThingsPromise;
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
        setTinyWidgetVisibility(false);
        portfolioBut.classList = "selected";
        main.className = "";
        pageBody.classList.remove("other-works-rows");
        scrollToTop();
        return;
    }
    if (section === "about") {
        cleanupOtherWorksLayout();
        renderAbout();
        setTinyWidgetVisibility(false);
        aboutBut.classList = "selected";
        main.className = "";
        pageBody.classList.remove("other-works-rows");
        scrollToTop();
        return;
    }
    renderOtherWorks();
    setTinyWidgetVisibility(true);
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
            <!-- <img alt="portfolio 6" src="PortfolioPics/7.png"> -->
            <header class="portfolio-intro header-special">Hello,<br>I'm Yiqi.</header>
            <div class="portfolio-feature-grid ux-feature-grid">
                <article class="ux-card">
                    <a class="ux-card-hit" href="waybox.html" aria-label="Open the Waybox case study"></a>
                    <div class="ux-media"><img alt="Waybox website and connected app interfaces" src="PortfolioPics/waybox-cover.png" loading="eager"></div>
                    <div class="ux-card-copy"><div class="ux-card-head"><span class="ux-card-index"><span class="ux-number">01</span><span class="ux-year"><time datetime="2026">2026</time> · ongoing</span></span><span class="ux-status-list"><span class="ux-status">Website live</span><span class="ux-status">App in design</span></span></div><h3>Waybox</h3><p>Leading UX across the live website and a connected-device app in design. My work covers the website UX and part of its UI, plus the app’s flows and interfaces.</p></div>
                </article>
                <article class="ux-card">
                    <a class="ux-card-hit" href="dunes-dictionary.html" aria-label="Open the Dunes Dictionary case study"></a>
                    <div class="ux-media"><img alt="Dunes Dictionary interactive concept map and open entry" src="DunesDictionary/cover.png" loading="lazy"></div>
                    <div class="ux-card-copy"><div class="ux-card-head"><span class="ux-card-index"><span class="ux-number">02</span><span class="ux-year"><time datetime="2025-08">Aug</time>–<time datetime="2025-10">Oct 2025</time></span></span><span class="ux-status-list"><span class="ux-status">Launched website</span><span class="ux-status">Full-stack development</span></span></div><h3>Dunes Dictionary</h3><p>An interactive dictionary and connected concept map. I contributed to the UI/UX and independently built the public website and admin tools for analytics and Excel-based content updates as part of a six-person team.</p><div class="ux-card-links"><a class="ux-resource-link" href="https://dunes-dictionary.com/" target="_blank" rel="noopener noreferrer">Live site ↗</a><a class="ux-resource-link" href="https://github.com/Yiqi71/dunes_dictionary_public" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></div>
                </article>
                <article class="ux-card">
                    <a class="ux-card-hit" href="ai-interviewer-vr.html" aria-label="Open the AI interviewer in VR study"></a>
                    <div class="ux-media"><div class="ux-placeholder"><span>VR</span><small>Mixed-methods study</small></div></div>
                    <div class="ux-card-copy"><div class="ux-card-head"><span class="ux-card-index"><span class="ux-number">03</span><span class="ux-year">Ongoing</span></span><span class="ux-status">Research in progress</span></div><h3>AI interviewer in VR</h3><p>A mixed-methods study with 58 participants examining how people respond to an AI interviewer in VR during emotionally sensitive life-story interviews.</p></div>
                </article>
                <article class="ux-card">
                    <a class="ux-card-hit" href="portfolio-detail.html?id=portfolio-4" aria-label="Open the Behind the Ad Slot project"></a>
                    <div class="ux-media"><img alt="Two people viewing the Behind the Ad Slot website on a monitor" src="PortfolioPics/behind-ad-slot-cover.png" loading="lazy"></div>
                    <div class="ux-card-copy"><div class="ux-card-head"><span class="ux-card-index"><span class="ux-number">04</span><span class="ux-year"><time datetime="2025-11">Nov</time>–<time datetime="2025-12">Dec 2025</time></span></span><span class="ux-status">AI-powered website</span></div><h3>Behind the Ad Slot</h3><p>A website that uses an AI API to identify the styles of an outfit and its surroundings, then recommends real products. An informal evaluation explored how recommendation metrics might affect purchase interest.</p></div>
                </article>
                <article class="ux-card">
                    <a class="ux-card-hit" href="portfolio-detail.html?id=portfolio-3" aria-label="Open the Legends at NYU project"></a>
                    <div class="ux-media"><img alt="People playing the Legends at NYU collaborative board game" src="PortfolioPics/3-1.png" loading="lazy"></div>
                    <div class="ux-card-copy"><div class="ux-card-head"><span class="ux-card-index"><span class="ux-number">05</span><span class="ux-year"><time datetime="2024-10">Oct 2024</time>–<time datetime="2025-01">Jan 2025</time></span></span><span class="ux-status">Board game</span></div><h3>Legends at NYU</h3><p>A collaborative board game designed to make early participation safer and more predictable for international students.</p></div>
                </article>
                <article class="ux-card">
                    <a class="ux-card-hit" href="portfolio-detail.html?id=portfolio-2" aria-label="Open the UnderCurrent project"></a>
                    <div class="ux-media"><img alt="UnderCurrent reflection app shown on two mobile phones" src="PortfolioPics/2-1.png" loading="lazy"></div>
                    <div class="ux-card-copy"><div class="ux-card-head"><span class="ux-card-index"><span class="ux-number">06</span><span class="ux-year"><time datetime="2025-09">Sep</time>–<time datetime="2025-12">Dec 2025</time></span></span><span class="ux-status">UI/UX design</span></div><h3>UnderCurrent</h3><p>A reflection app that helps fans examine the systems shaping emotional risk without placing blame on individuals.</p></div>
                </article>
                <article class="ux-card">
                    <a class="ux-card-hit" href="portfolio-detail.html?id=portfolio-1" aria-label="Open the Chirp project"></a>
                    <div class="ux-media"><img alt="Chirp low-friction safety device for older adults" src="PortfolioPics/1-1.png" loading="lazy"></div>
                    <div class="ux-card-copy"><div class="ux-card-head"><span class="ux-card-index"><span class="ux-number">07</span><span class="ux-year"><time datetime="2025-02">Feb</time>–<time datetime="2025-10">Oct 2025</time></span></span><span class="ux-status">Service design</span></div><h3>Chirp</h3><p>A low-burden communication system connecting older adults, community services, and county responders through actionable safety signals.</p></div>
                </article>
            </div>
        </div>
        <div class="scroll-hint" aria-hidden="true"></div>
    `;
    bindScrollHintListener();
    updateScrollHint();
}

function renderOtherWorks() {
    cleanupOtherWorksLayout();
    if (otherWorksLayout === "columns" && typeof window.applyOtherWorksColumns === "function") {
        otherWorksCleanup = window.applyOtherWorksColumns({
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
                <h1>Hi, I'm Yiqi Chen, a first-year MPS student in Information Science at Cornell University and a graduate of NYU IMA.</h1>
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

function ensureTinyWidget() {
    if (tinyWidget) {
        return tinyWidget;
    }
    const root = document.createElement("div");
    root.className = "tiny-widget";
    root.innerHTML = `
        <button class="tiny-widget-trigger" type="button" aria-label="Open today's tiny thing">?</button>
        <div class="tiny-widget-overlay" aria-hidden="true"></div>
        <section class="tiny-widget-modal" role="dialog" aria-modal="true" aria-labelledby="tiny-widget-title">
            <button class="tiny-widget-close-icon" type="button" aria-label="Close tiny thing modal">&times;</button>
            <p class="tiny-widget-eyebrow">Today's tiny thing</p>
            <h2 id="tiny-widget-title" class="tiny-widget-title">Loading...</h2>
            <p class="tiny-widget-desc">Picking today's interaction.</p>
            <div class="tiny-widget-actions">
                <a class="tiny-widget-play" href="tiny/">Play now</a>
            </div>
        </section>
    `;
    document.body.appendChild(root);

    const trigger = root.querySelector(".tiny-widget-trigger");
    const overlay = root.querySelector(".tiny-widget-overlay");
    const closeButton = root.querySelector(".tiny-widget-close-icon");
    const playLink = root.querySelector(".tiny-widget-play");
    const titleEl = root.querySelector(".tiny-widget-title");
    const descEl = root.querySelector(".tiny-widget-desc");
    const modal = root.querySelector(".tiny-widget-modal");

    if (!trigger || !overlay || !closeButton || !playLink || !titleEl || !descEl || !modal) {
        return null;
    }

    const openModal = () => {
        if (!root.classList.contains("is-visible")) {
            return;
        }
        root.classList.add("is-open");
    };

    const closeModal = () => {
        root.classList.remove("is-open");
    };

    trigger.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    tinyWidget = {
        root,
        titleEl,
        descEl,
        playLink,
        closeModal
    };

    return tinyWidget;
}

function getLocalDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function hashString(input) {
    let hash = 5381;
    for (let i = 0; i < input.length; i += 1) {
        hash = ((hash << 5) + hash) + input.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function pickDailyTiny(tinyList, date = new Date()) {
    if (!Array.isArray(tinyList) || tinyList.length === 0) {
        return null;
    }
    const dateKey = getLocalDateKey(date);
    const index = hashString(dateKey) % tinyList.length;
    return tinyList[index];
}

function setTinyWidgetVisibility(shouldShow) {
    const widget = ensureTinyWidget();
    if (!widget) {
        return;
    }
    widget.root.classList.toggle("is-visible", shouldShow);
    if (!shouldShow) {
        widget.closeModal();
        return;
    }
    renderDailyTinyThing();
}

function renderDailyTinyThing() {
    const widget = ensureTinyWidget();
    if (!widget) {
        return;
    }

    loadTinyThings().then(tinyList => {
        const todayTiny = pickDailyTiny(tinyList);
        if (!todayTiny) {
            widget.titleEl.textContent = "Today's game is: coming soon";
            widget.descEl.textContent = "No mini interactions are listed yet.";
            widget.playLink.textContent = "See tiny archive";
            widget.playLink.setAttribute("href", "tiny/");
            return;
        }
        const title = todayTiny.title || "Untitled tiny thing";
        widget.titleEl.textContent = `Today's game is: ${title}`;
        widget.descEl.textContent = todayTiny.desc || "A small daily interaction.";
        widget.playLink.textContent = "Play now";
        widget.playLink.setAttribute("href", `tiny/${todayTiny.slug}/`);
    });
}
