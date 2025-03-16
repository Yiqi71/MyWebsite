// main.js

document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project');
    if (projects.length > 0) {
        const firstTitle = projects[0].querySelector('.title');
        const paragraphs = firstTitle.querySelectorAll('p');
        firstTitle.style.height = '45px';
        paragraphs.forEach(p => p.style.opacity = '1');
    }
});

document.addEventListener('scroll', () => {
    const projects = document.querySelectorAll('.project');
    const centerY = window.innerHeight / 2;
    const topThreshold = 100; // Distance from top threshold
    const bottomThreshold = window.innerHeight - 100; // Distance from bottom threshold

    projects.forEach((project, index) => {
        const rect = project.getBoundingClientRect();
        const title = project.querySelector('.title');
        const paragraphs = title.querySelectorAll('p');

        if (isCentered(rect, centerY) || isNearEdge(rect, topThreshold, bottomThreshold, index, projects.length)) {
            title.style.height = '45px';
            paragraphs.forEach(p => p.style.opacity = '1');
        } else {
            title.style.height = '15px';
            paragraphs.forEach(p => p.style.opacity = '0');
        }
    });
});


function isCentered(rect, centerY) {
    return rect.top <= centerY && rect.bottom >= centerY;
}

function isNearEdge(rect, topThreshold, bottomThreshold, index, totalProjects) {
    if (index === 0 && rect.top <= topThreshold) {
        return true;
    }
    if (index === totalProjects - 1 && rect.bottom >= bottomThreshold) {
        return true;
    }
    return false;
}