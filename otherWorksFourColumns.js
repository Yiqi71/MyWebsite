const OTHER_WORKS_FOUR_COLUMNS_STYLE_ID = "other-works-four-columns-style";

function ensureOtherWorksFourColumnsStyle() {
    if (document.getElementById(OTHER_WORKS_FOUR_COLUMNS_STYLE_ID)) {
        return;
    }
    const style = document.createElement("style");
    style.id = OTHER_WORKS_FOUR_COLUMNS_STYLE_ID;
    style.textContent = `
body.other-works-columns {
    overflow: hidden;
}

body.other-works-columns footer {
    display: none;
}

main.other-works-columns{
    display: flex;
    gap: 30px;
    width: calc(100% - 100px);
    margin: auto;
    height: calc(100vh - 140px);
    overflow-x: auto;
    overflow-y: hidden;
}

main.other-works-columns .column {
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-right: 10px;
}

main.other-works-columns .column-title {
    font-size: 24px;
    margin: 0 0 20px 0;
    padding: 10px 0;
    color: #ccc;
    position: sticky;
    top: 0;
    background-color: #1A1A1A;
    z-index: 1;
    text-align: center;
}

main.other-works-columns .column-desc {
    margin: -8px 0 18px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #333;
    font-size: 14px;
    line-height: 1.4;
    color: #8f8f8f;
    text-align: center;
}

main.other-works-columns .column-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow-y: auto;
    flex: 1;
    padding-bottom: 20px;
}

@media(max-width: 1200px) {
    main.other-works-columns {
        gap: 20px;
        width: calc(100% - 60px);
    }

    main.other-works-columns .column {
        min-width: 250px;
    }

    main.other-works-columns .column-title {
        font-size: 20px;
    }

    main.other-works-columns .column-desc {
        font-size: 13px;
    }

    main.other-works-columns .column-content {
        gap: 25px;
    }
}

@media(max-width: 900px) {
    main.other-works-columns {
        gap: 15px;
        width: calc(100% - 40px);
    }

    main.other-works-columns .column {
        min-width: 200px;
    }

    main.other-works-columns .column-title {
        font-size: 18px;
    }

    main.other-works-columns .column-desc {
        font-size: 12px;
    }

    main.other-works-columns .column-content {
        gap: 20px;
    }
}

@media(max-width: 650px) {
    body.other-works-columns {
        overflow: auto;
    }

    body.other-works-columns footer {
        display: block;
    }

    main.other-works-columns {
        flex-direction: column;
        height: auto;
        gap: 40px;
    }

    main.other-works-columns .column {
        min-width: auto;
        height: auto;
    }

    main.other-works-columns .column-title {
        font-size: 22px;
        text-align: center;
        position: static;
        background-color: transparent;
    }

    main.other-works-columns .column-desc {
        margin-top: -6px;
        font-size: 14px;
    }

    main.other-works-columns .column-content {
        gap: 30px;
        overflow-y: visible;
        flex: none;
    }
}
    `;
    document.head.appendChild(style);
}

function applyOtherWorksFourColumns(options = {}) {
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
        console.warn("applyOtherWorksFourColumns missing required options.");
        return () => {};
    }

    ensureOtherWorksFourColumnsStyle();
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

window.applyOtherWorksFourColumns = applyOtherWorksFourColumns;
