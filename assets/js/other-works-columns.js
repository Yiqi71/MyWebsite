function applyOtherWorksColumns(options = {}) {
    const {
        main,
        pageBody,
        loadProjects,
        renderProjectCard,
        columnOrder = {
            interaction: {
                title: "Interaction Logic",
                description: "systems that interpret input and decide how to respond",
                ids: ["bk-trees", "Kiwi", "popcorn-rain", "hi", "zeroth"]
            },
            data: {
                title: "Data Mediation",
                description: "structuring, visualizing, and shaping information for use",
                ids: ["QC-webpage", "data-collector"]
            },
            physical: {
                title: "Physical Interaction",
                description: "embodied sensing, feedback, and physical constraints",
                ids: ["ballance", "light-of-connection", "oops"]
            },
            material: {
                title: "Material Experiments",
                description: "material, form, and fabrication as design constraints",
                ids: ["moons-on-sale", "a-plate", "GBG-car", "life-of-a-drink", "whispers"]
            }
        }
    } = options;

    if (!main || !pageBody || !loadProjects || !renderProjectCard) {
        console.warn("applyOtherWorksColumns missing required options.");
        return () => {};
    }

    main.className = "other-works-columns";
    pageBody.classList.add("other-works-columns");
    main.innerHTML = `
        <div class="column interaction-column">
            <h2 class="column-title">${columnOrder.interaction.title}</h2>
            <p class="column-desc">${columnOrder.interaction.description}</p>
            <div class="column-content" data-column="interaction"></div>
        </div>
        <div class="column data-column">
            <h2 class="column-title">${columnOrder.data.title}</h2>
            <p class="column-desc">${columnOrder.data.description}</p>
            <div class="column-content" data-column="data"></div>
        </div>
        <div class="column physical-column">
            <h2 class="column-title">${columnOrder.physical.title}</h2>
            <p class="column-desc">${columnOrder.physical.description}</p>
            <div class="column-content" data-column="physical"></div>
        </div>
        <div class="column material-column">
            <h2 class="column-title">${columnOrder.material.title}</h2>
            <p class="column-desc">${columnOrder.material.description}</p>
            <div class="column-content" data-column="material"></div>
        </div>
    `;

    loadProjects().then(projects => {
        const projectMap = new Map(projects.map(project => [project.id, project]));
        Object.keys(columnOrder).forEach(columnKey => {
            const container = main.querySelector(`[data-column="${columnKey}"]`);
            if (!container) {
                return;
            }
            const cardsHtml = columnOrder[columnKey].ids
                .map(id => projectMap.get(id))
                .filter(Boolean)
                .map(project => renderProjectCard(project))
                .join("");
            container.innerHTML = cardsHtml;
        });
    });

    return () => {
        main.classList.remove("other-works-columns");
        pageBody.classList.remove("other-works-columns");
    };
}

window.applyOtherWorksColumns = applyOtherWorksColumns;
