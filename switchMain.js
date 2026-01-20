const main = document.querySelector("main");

const projectsBut = document.getElementById("projects");
const otherWorksBut = document.getElementById("other-works");
const aboutBut = document.getElementById("about");

function renderByHash() {
    const section = window.location.hash.replace("#", "");
    if (!section) {
        window.location.hash = "projects";
        return;
    }
    setActiveSection(section);
}

function setActiveSection(section) {
    removeAllActive();
    if (section === "projects") {
        renderProjects();
        projectsBut.classList = "selected";
        main.classList = "";
        return;
    }
    if (section === "about") {
        renderAbout();
        aboutBut.classList = "selected";
        main.classList = "";
        return;
    }
    renderOtherWorks();
    otherWorksBut.classList = "selected";
    main.classList = "four-columns";
}

window.addEventListener("hashchange", renderByHash);
renderByHash();

function removeAllActive(){
    projectsBut.classList='';
    otherWorksBut.classList='';
    aboutBut.classList='';
}

function renderProjects() {
    main.innerHTML = `
        <div class="projects-gallery">
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
            <img alt="portfolio 4-1" src="PortfolioPics/4-1.png">
            <img alt="portfolio 5-1" src="PortfolioPics/5-1.png">
            <img alt="portfolio 5-2" src="PortfolioPics/5-2.png">
        </div>
    `;
}

function renderOtherWorks() {
    main.innerHTML = `
        <div class="column digital-column">
            <h2 class="column-title">Digital</h2>
            <div class="column-content">
                <a href="project-detail.html?id=dunes-dictionary">
                    <div id="dunes-dictionary" class="project">
                        <img alt="dunes-dictionary img" src="ProjectPics/dunes-dictionary_1.png" width=400>
                        <div class="title">
                            <h1>Dunes Dictionary - upcoming</h1>
                            <p>Web Design & Front-end Development</p>
                            <p>2025 Summer</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=bk-trees">
                    <div id="bk-trees" class="project">
                        <img alt="bk-trees img" src="ProjectPics/bk-trees_1.png" width=400>
                        <div class="title">
                            <h1>Brooklyn Trees</h1>
                            <p>Front-end Development</p>
                            <p>2025 Spring</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=QC-webpage">
                    <div id="QC-webpage" class="project">
                        <img alt="QC-webpage img" src="ProjectPics/QC-webpage_1.jpg" width=400>
                        <div class="title">
                            <h1>The Quantum Atlas</h1>
                            <p>Front-end Development</p>
                            <p>2025 Spring</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=data-collector">
                    <div id="data-collector" class="project">
                        <img alt="data-collector img" src="./ProjectPics/data-collector_1.png" width=400>
                        <div class="title">
                            <h1>A Kind Data Collector</h1>
                            <p>Chrome Extension</p>
                            <p>2024 Fall</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=whispers">
                    <div id="whispers" class="project">
                        <img alt="whispers img" src="ProjectPics/whispers_1.png" width=400>
                        <div class="title">
                            <h1>Whispers of the Past</h1>
                            <p>VR Game</p>
                            <p>2024 Spring</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=hi">
                    <div id="hi" class="project">
                        <img alt="hi" src="ProjectPics/hi_1.png" width=400>
                        <div class="title">
                            <h1>hi~</h1>
                            <p>Front-end Development</p>
                            <p>2025 Spring</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=Kiwi">
                    <div id="kiwi" class="project">
                        <img alt="kiwi img" src="ProjectPics/kiwi_1.png" width=400>
                        <div class="title">
                            <h1>Kiwi's Picture Advice</h1>
                            <p>Front-end Development</p>
                            <p>2025 Spring</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=popcorn-rain">
                    <div id="popcorn-rain" class="project">
                        <img alt="popcorn-rain img" src="ProjectPics/popcorn-rain_1.png" width=400>
                        <div class="title">
                            <h1>Popcorn Rain</h1>
                            <p>p5.js Creative Computing</p>
                            <p>2024 Spring</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        
        <div class="column ux-column">
            <h2 class="column-title">UX</h2>
            <div class="column-content">
                <a href="project-detail.html?id=GBG-car">
                    <div id="GBG-car" class="project">
                        <img alt="GBG img" src="ProjectPics/GBG_1.jpg" width=400>
                        <div class="title">
                            <h1>GoBabyGo Car Frame Redesign</h1>
                            <p>UX Design and Assistive Technology</p>
                            <p>2025 Spring</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        
        <div class="column physical-column">
            <h2 class="column-title">Physical</h2>
            <div class="column-content">
                <a href="project-detail.html?id=ballance">
                    <div id="ballance" class="project">
                        <img alt="ballance img" src="ProjectPics/ballance_1.png" width=400>
                        <div class="title">
                            <h1>Ballance</h1>
                            <p>Arduino Interactive Toy</p>
                            <p>2024 Fall</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=light-of-connection">
                    <div id="light-of-connection" class="project">
                        <img alt="light-of-connection img" src="ProjectPics/light-of-connection_1.png" width=400>
                        <div class="title">
                            <h1>Light of Connection</h1>
                            <p>Arduino Interactive Wearable</p>
                            <p>2024 Fall</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=oops">
                    <div id="oops" class="project">
                        <img alt="oops img" src="ProjectPics/oops_1.png" width=400>
                        <div class="title">
                            <h1>Oops, You Died.</h1>
                            <p>Arduino Interactive Installation</p>
                            <p>2024 Fall</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        
        <div class="column other-column">
            <h2 class="column-title">Other</h2>
            <div class="column-content">
                
                <a href="project-detail.html?id=life-of-a-drink">
                    <div id="life-of-a-drink" class="project">
                        <img alt="life-of-a-drink img" src="ProjectPics/life_1.png" width=400>
                        <div class="title">
                            <h1>Life of a Drink</h1>
                            <p>360 Video</p>
                            <p>2024 Spring</p>
                        </div>
                    </div>
                </a>
                
                
                <a href="project-detail.html?id=moons-on-sale">
                    <div id="moons-on-sale" class="project">
                        <img alt="moons-on-sale img" src="ProjectPics/moons-on-sale_1.jpg" width=400>
                        <div class="title">
                            <h1>Moons on Sale</h1>
                            <p>3D Printing Installation</p>
                            <p>2024 Fall</p>
                        </div>
                    </div>
                </a>
                
                <a href="project-detail.html?id=a-plate">
                    <div id="a-plate" class="project">
                        <img alt="a-plate img" src="ProjectPics/aplate_1.jpg" width=400>
                        <div class="title">
                            <h1>A Plate</h1>
                            <p>Plastic Material Exploration</p>
                            <p>2024 Spring</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=pAInter">
                    <div id="pAInter" class="project">
                        <img alt="pAInter img" src="ProjectPics/pAInter_1.png" width=400>
                        <div class="title">
                            <h1>pAInter</h1>
                            <p>UX Design</p>
                            <p>2022 Fall</p>
                        </div>
                    </div>
                </a>
                <a href="project-detail.html?id=echoes">
                    <div id="echoes" class="project">
                        <img alt="echoes img" src="ProjectPics/echoes_1.jpg" width=400>
                        <div class="title">
                            <h1>Echoes</h1>
                            <p>Board Game</p>
                            <p>2025 Spring</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
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
