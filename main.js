// main.js
const screenWidth = window.innerWidth;

if (screenWidth <= 1024) {
    document.addEventListener('DOMContentLoaded', () => {
        const projects = document.querySelectorAll('.project');
        if (projects.length > 0) {
            const firstTitle = projects[0].querySelector('.title');
            const paragraphs = firstTitle.querySelectorAll('p');
            firstTitle.style.height = '50px';
            paragraphs.forEach(p => p.style.opacity = '1');
        }
    });

    document.addEventListener('scroll', () => {
        const projects = document.querySelectorAll('.project');
        const centerY = window.innerHeight / 2;
        const topThreshold = 60; // Distance from top threshold
        const bottomThreshold = window.innerHeight - 10; // Distance from bottom threshold

        projects.forEach((project, index) => {
            const rect = project.getBoundingClientRect();
            const title = project.querySelector('.title');
            const paragraphs = title.querySelectorAll('p');

            if (screenWidth <= 650) {
                changeHeight(title, paragraphs, rect, centerY, topThreshold, bottomThreshold, index, projects.length, '58px', '15px');
            } else {
                changeHeight(title, paragraphs, rect, centerY, topThreshold, bottomThreshold, index, projects.length, '68px', '25px');
            }

            // Check if project is in the center or near top/bottom edges with updated condition
            // if (isCentered(rect, centerY) || isNearEdge(rect, topThreshold, bottomThreshold, index, projects.length)) {
            //     title.style.height = '50px';
            //     paragraphs.forEach(p => p.style.opacity = '1');
            // } else {
            //     title.style.height = '15px';
            //     paragraphs.forEach(p => p.style.opacity = '0');
            // }
        });
    });

}

function isCentered(rect, centerY) {
    return rect.top <= centerY && rect.bottom >= centerY;
}

function isNearEdge(rect, topThreshold, bottomThreshold, index, totalProjects) {
    // First project should only show when it's at the top of the viewport
    if (index === 0 && rect.top >= topThreshold) {
        return true;
    }
    // Last project should only show when it's at the bottom of the viewport
    if (index === totalProjects - 1 && rect.bottom <= bottomThreshold) {
        return true;
    }
    return false;
}

function changeHeight(title, paragraphs, rect, centerY, topThreshold, bottomThreshold, index, totalProjects, highHeight, lowHeight) {
    if (isCentered(rect, centerY) || isNearEdge(rect, topThreshold, bottomThreshold, index, totalProjects)) {
        title.style.height = highHeight;
        paragraphs.forEach(p => p.style.opacity = '1');
    } else {
        title.style.height = lowHeight;
        paragraphs.forEach(p => p.style.opacity = '0');
    }
}