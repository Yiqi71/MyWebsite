const main = document.querySelector("main");

const projectsBut = document.getElementById("projects");
const otherWorksBut = document.getElementById("other-works");
const aboutBut = document.getElementById("about");

// Event listeners for the three main sections
projectsBut.addEventListener("click", (e) => {
    renderProjects();
    removeAllActive();
    projectsBut.classList="selected";
    main.classList = "";
})

otherWorksBut.addEventListener("click", (e) => {
    renderOtherWorks();
    removeAllActive();
    otherWorksBut.classList="selected";
    main.classList = "four-columns";
})

aboutBut.addEventListener("click", (e) => {
    renderAbout();
    removeAllActive();
    aboutBut.classList="selected";
    main.classList = "";
})

const aboutLink = document.getElementById("about-link");
aboutLink.addEventListener("click", (e) => {
    renderAbout();
    removeAllActive();
    aboutBut.classList="selected";
    main.classList = "";
})

// Initialize with Other Works page
otherWorksBut.classList="selected";
main.classList = "four-columns";
renderOtherWorks();

function removeAllActive(){
    projectsBut.classList='';
    otherWorksBut.classList='';
    aboutBut.classList='';
}

function renderProjects() {
    // Empty projects page for now
    main.innerHTML = `
        <div class="empty-projects">
            <h1>Projects</h1>
            <p>Coming soon...</p>
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
                <p>I'm passionate about blending creativity with technology, 
                    and I've had the opportunity to explore various fields such as UI/UX design, 
                    front-end development, creative coding, and physical computing.
                    My experiences have allowed me to work on diverse projects where I design, 
                    develop, and bring interactive ideas to life. 
                    I thrive on solving problems in innovative ways and am always excited to
                    learn new technologies and techniques.
                </p>
                <p> Feel free to explore my work and get in touch!</p>
            </div>
        </div>
    `
}