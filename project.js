// 获取 URL 参数
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// 获取对应项目数据
const project = projects[projectId];

// 动态渲染页面
if (project) {
    document.title = project.title;
    document.getElementById('project-detail').innerHTML = `
        
        <img src="${project.image}" alt="${project.title}" width="600">
        <div>
        <h1>${project.title}</h1>
        <p>${project.description}</p>
        <p>${project.date}</p>
        </div> `+
        project.detail  
   ;
} else {
    document.getElementById('project-detail').innerHTML = "<p>项目未找到。</p>";
}

