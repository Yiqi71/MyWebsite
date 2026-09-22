const allWorksGrid = document.getElementById("all-works-grid");
const knownIds = new Set(["hi", "QC-webpage"]);

fetch("data/projects.json")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(projects => {
    const fragment = document.createDocumentFragment();
    projects.forEach(project => {
      if (!project.id || !project.title || knownIds.has(project.id)) return;
      const link = document.createElement("a");
      link.href = `project-detail.html?id=${encodeURIComponent(project.id)}`;
      const title = document.createElement("span");
      title.textContent = project.title;
      const category = document.createElement("small");
      category.textContent = `${(project.category && project.category[0]) || project.description || "Other work"} ↗`;
      link.append(title, category);
      fragment.append(link);
    });
    allWorksGrid.append(fragment);
  })
  .catch(error => {
    console.error("Unable to load all works:", error);
    document.getElementById("all-works-note").hidden = false;
  });
