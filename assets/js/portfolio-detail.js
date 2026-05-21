const urlParams = new URLSearchParams(window.location.search);
const portfolioProjectId = urlParams.get("id");
const detailRoot = document.getElementById("project-detail");

fetch("data/portfolio-projects.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    })
    .then(projects => {
        const project = projects.find(item => item.id === portfolioProjectId);
        if (!project) {
            detailRoot.innerHTML = "<p>Coming soon...</p>";
            return;
        }

        document.title = project.title || "Portfolio Detail";
        detailRoot.innerHTML = (project.images || [])
            .map((src, index) => `<img src="${src}" alt="${project.title || "Portfolio project"} page ${index + 1}">`)
            .join("");
    })
    .catch(error => {
        console.error("Failed to load portfolio project data:", error);
        detailRoot.innerHTML = "<p>Unable to load portfolio project data.</p>";
    });
