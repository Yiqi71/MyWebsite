const projects = {
    "QC-webpage": {
        title: "The Quantum Atlas",
        description: "Science Visualization Website",
        date: "2025 Spring",
        image: "ProjectPics/QC-webpage_1.jpg",
        detail: `
    <p>A website designed to visualize complex quantum concepts, making them accessible and interactive for a broader audience.</p>
    <a href="https://github.com/Yiqi71/The-Quantum-Atlas" target="_blank">
        GitHub - The Quantum Atlas
    </a>

    <a href="https://quantumatlas.vercel.app/" target="_blank">
        The Quantum Atlas Live Demo
    </a>
`

    },
    "data-collector": {
        title: "A Kind Data Collector",
        description: "Chrome Extension",
        date: "2024 Fall",
        image: "ProjectPics/data-collector_1.png",
        detail: `
        <p>This is a chrome extension collecting users’ browsing activity, visualizing the data collected, and reminding users of the potential risk of data collection and privacy leak.</p>
        <section id="inspiration">
        <h2>Inspiration</h2>
        <ul>
            <li>Many companies and apps are collecting data from users.</li>
            <li>I cannot stop them, but I want to know what kinds of my data are collected.</li>
            <li>I want to remind people of the potential risk behind data collection, because data collection is difficult to see.</li>
            <li>Why extension? - Chrome and many other browsers are definitely big companies collecting data from users. Extension can appear on any pages inside the browser and work as a reminder, so I think extension is a good medium for this project.</li>
        </ul>
    </section>

    <section id="process">
        <h2>Process</h2>
        <ul>
            <li>Fetching Chrome history API</li>
            <li>Arranging the collected data into meaningful arrays</li>
            <li>Data visualization</li>
            <li>Add more interaction (the appearing blocks when users are on any tabs)</li>
        </ul>
    </section>

    <section id="final-result">
        <h2>Final Result</h2>
        <p><a href="https://youtu.be/KSIITh_aVlo" target="_blank">Watch the video</a></p>
        <p>I am still working on publishing my extension. It was rejected once because of the permissions I was asking for. The second submission is still pending review.</p>
    </section>
        `
    },
    "whispers": {
        title: "Whispers of the Past",
        description: "VR Game",
        date: "2024 Spring",
        image: "ProjectPics/whispers_1.png",
        detail: "An immersive VR experience where players explore ancient ruins and uncover stories through whispers from the past."
    },
    "ballance": {
        title: "Ballance",
        description: "Arduino Interactive Toy",
        date: "2024 Fall",
        image: "ProjectPics/ballance_1.png",
        detail: "An Arduino-powered interactive toy that challenges players to balance elements, encouraging both play and learning about physical balance."
    },
    "light-of-connection": {
        title: "Light of Connection",
        description: "Arduino Interactive Wearable",
        date: "2024 Fall",
        image: "ProjectPics/light-of-connection_1.png",
        detail: "A wearable device using Arduino, designed to light up in response to nearby devices, symbolizing human connections in digital spaces."
    },
    "moons-on-sale": {
        title: "Moons on Sale",
        description: "3D Printing Installation",
        date: "2024 Fall",
        image: "ProjectPics/moons-on-sale_1.jpg",
        detail: "An art installation featuring 3D-printed moons, exploring themes of commercialization and our relationship with celestial bodies."
    }
};
