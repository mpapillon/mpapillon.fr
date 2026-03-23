document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Open to work
(function () {
  const $heroOtw = document.getElementById("js-hero-openToWork");
  const $contactOtw = document.getElementById("js-contact-openToWork");

  if (window.openToWork) {
    $heroOtw.innerText = "Disponible pour une nouvelle mission";
    $contactOtw.innerText =
      "Disponible dès maintenant pour une nouvelle mission.";
  } else {
    $heroOtw.innerText =
      "En mission · Ouvert aux échanges pour des projets à venir";
    $contactOtw.innerText =
      "Actuellement en mission. Ouvert aux échanges pour des projets à venir.";
  }
})();

// Carousel
(function () {
  const $track = document.getElementById("js-carousel-track");
  const $dots = document.querySelectorAll(".js-carousel-dot");
  const $prevBtn = document.getElementById("js-carousel-prev");
  const $nextBtn = document.getElementById("js-carousel-next");
  const $captionEl = document.getElementById("js-carousel-caption");
  const $slides = document.querySelectorAll(".js-carousel-slide");

  let current = 0;
  const total = $dots.length;

  const captions = Array.from($slides, (e) => e.dataset.caption);

  $captionEl.textContent = captions[current];

  function syncUI(current) {
    $dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });
    $captionEl.textContent = captions[current];
  }

  function goTo(index) {
    current = (index + total) % total;
    $track.scrollTo({
      left: current * $track.offsetWidth,
      behavior: "smooth",
    });
    syncUI(current);
  }

  $prevBtn.addEventListener("click", function () {
    goTo(current - 1);
  });
  $nextBtn.addEventListener("click", function () {
    goTo(current + 1);
  });
  $dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      goTo(i);
    });
  });

  $track.addEventListener("scrollend", function () {
    const index = Math.round($track.scrollLeft / $track.offsetWidth);
    syncUI(index);
  });
})();
