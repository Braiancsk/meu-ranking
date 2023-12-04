const mobileMenu = document.querySelector(".nav-mobile-wrapper");
const videoModal = document.querySelector(".video-wrapper");
const videoContainer = document.getElementById("videoContainer");
const sportsModal = document.querySelector(".sports-modal");
const feedbacksTabsButtons = document.querySelectorAll(".tab-feedback-button");
const feedbacksWrapper = document.querySelector(".feedbacks-buttons-wrapper");
const feedbacksSlides = document.querySelectorAll(".feedback-slide");
const appTabsButton = document.querySelectorAll(".app-button");
const appWrapper = document.querySelector(".app-info-wrapper");
const selectedSportsMessage = document.getElementById("selectedSportsMessage");

const animation = { duration: 20000, easing: (time) => time };

document.addEventListener("DOMContentLoaded", function () {
  const organizerButton = document.querySelector(
    "[data-app-filter='organizer']"
  );
  organizerButton.click();
});

const slider = new KeenSlider("#my-keen-slider", {
  loop: true,
  breakpoints: {
    "(min-width: 850px)": {
      slides: { perView: 4, spacing: 34 },
    },
  },
  slides: {
    spacing: 34,
    perView: 1.2,
  },
  renderMode: "performance",
  drag: false,
  created(slide) {
    slide.moveToIdx(5, true, animation);
  },
  updated(slide) {
    slide.moveToIdx(slide.track.details.abs + 5, true, animation);
  },
  animationEnded(slide) {
    slide.moveToIdx(slide.track.details.abs + 5, true, animation);
  },
});

function navigation(slider) {
  let wrapper, dots;

  function markup(remove) {
    wrapperMarkup(remove);
    dotMarkup(remove);
  }

  function removeElement(element) {
    element.parentNode.removeChild(element);
  }
  function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode;
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper);
      removeElement(wrapper);
      return;
    }
    wrapper = createDiv("navigation-wrapper");
    slider.container.parentNode.appendChild(wrapper);
    wrapper.appendChild(slider.container);
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots);
      return;
    }
    dots = createDiv("dots");

    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot");
      dot.addEventListener("click", () => slider.moveToIdx(idx));
      dots.appendChild(dot);
    });
    wrapper.appendChild(dots);
  }

  function updateClasses() {
    var slide = slider.track.details.rel;
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active");
    });
  }

  slider.on("created", () => {
    markup();
    updateClasses();
  });
  slider.on("optionsChanged", () => {
    markup(true);
    markup();
    updateClasses();
  });
  slider.on("slideChanged", () => {
    updateClasses();
  });
  slider.on("destroyed", () => {
    markup(true);
  });
}
function navigationMobile(slider) {
  let wrapper, dots;

  function markup(remove) {
    wrapperMarkup(remove);
    dotMarkup(remove);
  }

  function removeElement(element) {
    element.parentNode.removeChild(element);
  }
  function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode;
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper);
      removeElement(wrapper);
      return;
    }
    wrapper = createDiv("navigation-wrapper");
    slider.container.parentNode.appendChild(wrapper);
    wrapper.appendChild(slider.container);
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots);
      return;
    }
    dots = createDiv("dots-mobile");

    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot");
      dot.addEventListener("click", () => slider.moveToIdx(idx));
      dots.appendChild(dot);
    });
    wrapper.appendChild(dots);
  }

  function updateClasses() {
    var slide = slider.track.details.rel;
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active");
    });
  }

  slider.on("created", () => {
    markup();
    updateClasses();
  });
  slider.on("optionsChanged", () => {
    markup(true);
    markup();
    updateClasses();
  });
  slider.on("slideChanged", () => {
    updateClasses();
  });
  slider.on("destroyed", () => {
    markup(true);
  });
}

const feedbackSlider = new KeenSlider(
  "#feedbacks-slider",
  {
    renderMode: "performance",
  },
  [navigation]
);

const feedbackSliderMobile = new KeenSlider(
  "#feedbacks-slider-mobile",
  {
    renderMode: "performance",
  },
  [navigationMobile]
);

const handleToggleMobileMenu = () => {
  const isOpen = mobileMenu.style.transform === "translateY(0%)";

  if (isOpen) {
    mobileMenu.style.transform = "translateY(-100%)";
    document.documentElement.style.overflow = "auto";
  } else {
    mobileMenu.style.transform = "translateY(0%)";
    document.documentElement.style.overflow = "hidden";
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      mobileMenu.style.transform = "translateY(-100%)";
      document.documentElement.style.overflow = "auto";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const sports = [
    "Tênis",
    "Beach Tennis",
    "Pádel",
    "Futevôlei",
    "Squash",
    "Vôlei de Praia",
    "Tênis de Mesa",
    "Pickleball",
    "Raquetinha",
  ];
  const sportSpan = document.querySelector("span[data-random-sport]");
  let currentIndex = 0;

  function setNextSport() {
    sportSpan.textContent = sports[currentIndex];
    currentIndex = (currentIndex + 1) % sports.length;
  }

  setNextSport();

  setInterval(setNextSport, 3000);
});

const videoIframe = document.createElement("iframe");
videoIframe.width = "1230";
videoIframe.height = "692";
videoIframe.src = "https://www.youtube.com/embed/eHxduT21fpM";
videoIframe.title =
  "Música clássica mais famosa | Chopin | Beethoven | Mozart | Bach";
videoIframe.style.border = "0";
videoIframe.allow =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
videoIframe.allowFullscreen = true;

const handleOpenVideo = () => {
  videoContainer.appendChild(videoIframe);
  videoModal.showModal();
  document.documentElement.style.overflow = "hidden";
};

const handleCloseVideo = () => {
  videoContainer.innerHTML = "";
  videoModal.close();
  document.documentElement.style.overflow = "auto";
};

const handleOpenSportsModal = () => {
  sportsModal.classList.toggle("show");

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sportsModal.classList.contains("show")) {
      sportsModal.classList.remove("show");
    }
  });

  window.addEventListener("click", (e) => {
    const validateToClose =
      e.target !== selectedSportsMessage &&
      !e.target.classList.contains("sports-modal") &&
      !e.target.classList.contains("sport-label");

    if (sportsModal.classList.contains("show") && validateToClose) {
      sportsModal.classList.remove("show");
    }
  });
};

feedbacksTabsButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const filter = e.target.getAttribute("data-feedback");

    handleUpdateActiveButton(e.target, feedbacksWrapper);
    filterFeedbacks(filter);
  });
});

const handleUpdateActiveButton = (newButton, wrapper) => {
  wrapper.querySelector(".active").classList.remove("active");
  newButton.classList.add("active");
};

const filterFeedbacks = (feedbackFilter) => {
  feedbacksSlides.forEach((slide) => {
    const slideCategory = slide.getAttribute("data-feedback-category");

    if (feedbackFilter === slideCategory) {
      slide.removeAttribute("hidden");
    } else {
      slide.setAttribute("hidden", "");
    }
  });
};

appTabsButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleUpdateActiveButton(e.target, appWrapper);
    handleUpdateContent(e.target);
  });
});

function handleUpdateContent(clickedButton) {
  const filterValue = clickedButton.getAttribute("data-app-filter");

  const screen = document.querySelector("[data-app-screen]");
  screen.src = screens[filterValue];

  // Atualiza o texto da descrição
  const description = document.querySelector("[data-app-description]");
  description.innerHTML = descriptions[filterValue];

  // Atualiza as imagens da tela do aplicativo
  const appPreviews = document.querySelectorAll("[data-app-preview]");
  appPreviews.forEach((preview) => {
    const previewType = preview.getAttribute("data-app-preview");
    preview.src = previewImages[filterValue][previewType];
  });

  // Atualiza os links das lojas com base no filtro
  const storeLinkImages = document.querySelectorAll("[data-app-link]");
  storeLinkImages.forEach((link) => {
    const linkType = link.getAttribute("data-app-link");
    link.href = storeLinks[filterValue][linkType];
    link.addEventListener("click", () => {
      window.open(link.href, "_blank");
    });
  });
}

// Mapeamento de descrições com base no filtro
const descriptions = {
  organizer:
    "O organizador faz tudo pelo app: ativa jogadores, gera os confrontos e acompanha a classificação do ranking e os jogos das rodadas! <span>Simples, rápido e prático!</span>",
  player:
    "Os jogadores acompanham seus jogos e a classificação do ranking, marcam horário e inserem resultados tudo pelo app de jogador! <span>Simples, rápido e prático!</span>",
};

// Mapeamento de imagens com base no filtro
const previewImages = {
  organizer: {
    "first-screen": "./images/app-preview/organizer-app-preview-1.webp",
    "second-screen": "./images/app-preview/organizer-app-preview-2.webp",
    "third-screen": "./images/app-preview/organizer-app-preview-3.webp",
  },
  player: {
    "first-screen": "./images/app-preview/player-app-preview-1.webp",
    "second-screen": "./images/app-preview/player-app-preview-2.webp",
    "third-screen": "./images/app-preview/player-app-preview-3.webp",
  },
};

const screens = {
  organizer: "./images/phone-screens/phone-screen-1.webp",
  player: "./images/phone-screens/phone-screen-2.webp",
};

//Links para as stores
const storeLinks = {
  organizer: {
    playstore:
      "https://play.google.com/store/apps/details?id=com.rankingtennis.manager",
    appstore: "https://apps.apple.com/app/meu-ranking-organizador/id1661980654",
  },
  player: {
    playstore:
      "https://play.google.com/store/apps/details?id=com.rankingtennis&hl=pt_BR",
    appstore: "https://apps.apple.com/br/app/meu-ranking/id1483076354",
  },
};

function applyPhoneMask(input) {
  let value = input.value.replace(/\D/g, "");

  // Verifica se o valor não está vazio
  if (value.length > 0) {
    // Aplica a máscara
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    value = value.replace(/(-\d{4})(\d+?)$/, "$1");
  }

  // Atualiza o valor do input com a máscara
  input.value = value;
}

const checkboxes = document.querySelectorAll(
  '.sports-modal input[type="checkbox"]'
);
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateSelectedSportsMessage);
});

function updateSelectedSportsMessage() {
  const selectedSports = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.name);

  if (selectedSports.length === 0) {
    selectedSportsMessage.textContent = "Selecione um ou mais esportes";
  } else {
    selectedSportsMessage.style.display = "block";
    selectedSportsMessage.textContent = `Esportes selecionados: ${selectedSports.join(
      ", "
    )}`;
  }
}
