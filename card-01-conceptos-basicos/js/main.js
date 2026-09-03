(function () {
  "use strict";

  var progressEl = document.getElementById("progress");
  var railLinks = Array.prototype.slice.call(document.querySelectorAll(".rail-link"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel[id]"));

  function updateProgress() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
    var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressEl) {
      progressEl.style.width = pct + "%";
    }
  }

  function setActiveLink(id) {
    railLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", isActive);
    });
  }

  var observer = null;
  if ("IntersectionObserver" in window && panels.length) {
    observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
        if (visible.length) {
          setActiveLink(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    panels.forEach(function (panel) { observer.observe(panel); });
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();

  if (panels.length) {
    setActiveLink(panels[0].id);
  }
})();
