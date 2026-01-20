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
      const detailHtml = renderDetailBlocks(project.detail);
      document.title = project.title;
      document.getElementById('project-detail').innerHTML = `
        <img src="${project.image}" alt="${project.title}" width="600">
        <div>
          <h1>${project.title}</h1>
          <p>${project.description}</p>
          <p>${project.group}</p>
          <p>${project.date}</p>
        </div>
      ` + detailHtml;
    } else {
      document.getElementById('project-detail').innerHTML = "<p>Coming soon...</p>";
    }
  })
  .catch(error => {
    console.error("加载项目数据失败:", error);
    document.getElementById('project-detail').innerHTML = "<p>无法加载项目数据。</p>";
  });

function renderDetailBlocks(detail) {
  if (!detail) {
    return "";
  }
  if (typeof detail === "string") {
    return detail;
  }
  if (!detail.blocks || !Array.isArray(detail.blocks)) {
    return "";
  }
  const blocksHtml = detail.blocks
    .map(block => {
      if (block.type === "link" && block.url) {
        return `<a href="${block.url}" target="_blank" class="underline"><p>${block.text || ""}</p></a>`;
      }
      return `<p>${block.html || ""}</p>`;
    })
    .join("");
  return `<div class="project-detail-blocks">${blocksHtml}</div>`;
}
