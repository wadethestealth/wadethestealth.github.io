function toggleBlock(elementId) {
  const vis = document.getElementById(elementId).style.display;
  document.getElementById(elementId).style.display = vis != "none" ? "none" : "";
  this.innerHTML = vis != "none" ? "Show" : "Hide";
}
