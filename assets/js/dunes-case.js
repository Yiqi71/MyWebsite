const caseVideos = document.querySelectorAll(".dunes-page video");
caseVideos.forEach(video => {
  video.addEventListener("play", () => {
    caseVideos.forEach(other => {
      if (other !== video && !other.paused) other.pause();
    });
  });
});
