// 获取 URL 参数
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// 从 JSON 加载项目数据
fetch("projects.json")
  .then(response => response.json())
  .then(projects => {
    // 在数组里查找对应 id 的项目
    const project = projects.find(p => p.id === projectId);

    // 动态渲染页面
    if (project) {
      document.title = project.title;
      document.getElementById('project-detail').innerHTML = `
        <img src="${project.image}" alt="${project.title}" width="600">
        <div>
          <h1>${project.title}</h1>
          <p>${project.description}</p>
          <p>${project.group}</p>
          <p>${project.date}</p>
        </div>
      ` + project.detail;
    } else {
      document.getElementById('project-detail').innerHTML = "<p>项目未找到。</p>";
    }
  })
  .catch(error => {
    console.error("加载项目数据失败:", error);
    document.getElementById('project-detail').innerHTML = "<p>无法加载项目数据。</p>";
  });
