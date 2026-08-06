document.addEventListener("DOMContentLoaded", () => { 

  

  // ========================= 

  // CHEMIN DE BASE 

  // ========================= 

  const isHome = 

    window.location.pathname.endsWith("index.html") || 

    window.location.pathname === "/" || 

    window.location.pathname.endsWith("/"); 

  const base = isHome ? "" : "../"; 

  const currentPage = window.location.pathname; 

  

  // ========================= 

  // HEADER 

  // ========================= 

  const header = ` 

  <header class="main-header ${isHome ? 'home-header' : ''}"> 

    <div class="header-actions"> 

      <!-- RECHERCHE --> 

      <div class="search-box"> 

        <i class="fa-solid fa-magnifying-glass" id="searchToggle"></i> 

        <input type="text" id="searchInput" placeholder="Rechercher..."> 

      </div> 

      <!-- MENU MOBILE --> 

      <div class="menu-toggle"> 

        <i class="fa-solid fa-bars"></i> 

      </div> 

    </div> 

    <!-- NAVIGATION --> 

    <nav class="mobile-nav"> 

      <ul> 

        <li> 

          <a class="${currentPage.includes('index.html') ? 'active' : ''}" href="${base}index.html"> 

            <i class="fa-solid fa-house"></i><span>Accueil</span> 

          </a> 

        </li> 

        <li> 

          <a class="${currentPage.includes('quiz.html') ? 'active' : ''}" href="${base}pages/quiz.html"> 

            <i class="fa-solid fa-brain"></i><span>Quiz</span> 

          </a> 

        </li> 

        <li> 

          <a class="${currentPage.includes('concours.html') ? 'active' : ''}" href="${base}pages/concours.html"> 

            <i class="fa-solid fa-trophy"></i><span>Concours</span> 

          </a> 

        </li> 

        <li> 

          <a class="${currentPage.includes('culture.html') ? 'active' : ''}" href="${base}pages/culture.html"> 

            <i class="fa-solid fa-earth-africa"></i><span>Culture</span> 

          </a> 

        </li> 

        <li> 

          <a class="${currentPage.includes('illustration.html') ? 'active' : ''}" href="${base}pages/illustration.html"> 

            <i class="fa-solid fa-palette"></i><span>Illustration</span> 

          </a> 

        </li> 

        <li> 

          <a class="${currentPage.includes('bibliotheque.html') ? 'active' : ''}" href="${base}pages/bibliotheque.html"> 

            <i class="fa-solid fa-book-open"></i><span>Bibliothèque</span> 

          </a> 

        </li> 

        <li> 

          <a class="${currentPage.includes('musique.html') ? 'active' : ''}" href="${base}pages/musique.html"> 

            <i class="fa-solid fa-headphones"></i><span>Musique</span> 

          </a> 

        </li> 

        <li> 

          <a class="${currentPage.includes('news.html') ? 'active' : ''}" href="${base}pages/news.html"> 

            <i class="fa-solid fa-newspaper"></i><span>News</span> 

          </a> 

        </li> 

        <li> 

          <a class="${currentPage.includes('evenements.html') ? 'active' : ''}" href="${base}pages/evenements.html"> 

            <i class="fa-solid fa-calendar-days"></i><span>Événements</span> 

          </a> 

        </li> 

        <li> 

          <a class="${currentPage.includes('chat.html') ? 'active' : ''}" href="${base}pages/chat.html"> 

            <i class="fa-solid fa-comment-dots"></i><span>Chat</span> 

          </a> 

        </li> 

        <li> 

          <a class="${currentPage.includes('forum.html') ? 'active' : ''}" href="${base}pages/forum.html"> 

            <i class="fa-solid fa-comments"></i><span>Forum</span> 

          </a> 

        </li> 

      </ul> 

    </nav> 

    <!-- PROFIL --> 

    <div class="profile-button"> 

      <a class="${currentPage.includes('profil.html') ? 'active' : ''}" href="${base}pages/profil.html"> 

        <i class="fa-solid fa-user"></i> 

      </a> 

    </div> 

  </header> 

  `; 

  

  const headerContainer = document.getElementById("header"); 

  if (headerContainer) { 

    headerContainer.innerHTML = header; 

  } 

  

  // ========================= 

  // RECHERCHE 

  // ========================= 

  const searchBox = document.querySelector(".search-box"); 

  const searchToggle = document.getElementById("searchToggle"); 

  const searchInput = document.getElementById("searchInput"); 

  

  if (searchToggle && searchBox) { 

    searchToggle.addEventListener("click", (e) => { 

      e.stopPropagation(); 

      searchBox.classList.toggle("active"); 

      if (searchBox.classList.contains("active")) { 

        searchInput.focus(); 

      } 

    }); 

  

    document.addEventListener("click", (e) => { 

      if (!searchBox.contains(e.target)) { 

        searchBox.classList.remove("active"); 

      } 

    }); 

  } 

  

  // ========================= 

  // MENU MOBILE 

  // ========================= 

  const menuToggle = document.querySelector(".menu-toggle"); 

  const mobileNav = document.querySelector(".mobile-nav"); 

  if (menuToggle && mobileNav) { 

    menuToggle.addEventListener("click", () => { 

      mobileNav.classList.toggle("active"); 

    }); 

  } 

  

  // ========================= 

  // SAUVEGARDE SCROLL NAV 

  // ========================= 

  const nav = document.querySelector("nav"); 

  if (nav) { 

    const savedScroll = sessionStorage.getItem("navScroll"); 

    if (savedScroll) { 

      nav.scrollLeft = savedScroll; 

    } 

    nav.querySelectorAll("a").forEach(link => { 

      link.addEventListener("click", () => { 

        sessionStorage.setItem("navScroll", nav.scrollLeft); 

      }); 

    }); 

  } 

  

  // ========================= 

  // FOOTER 

  // ========================= 

  const footer = ` 

    <footer class="main-footer"> 

      <div class="footer-content"> 

        <h2>QuizTable</h2> 

        <div class="footer-links"> 

          <a href="#">À propos</a> 

          <a href="#">Conditions d'utilisation</a> 

          <a href="#">Politique de confidentialité</a> 

          <a href="#">Nous contacter</a> 

        </div> 

        <p class="copyright">© 2026 QuizTable - Tous droits réservés.</p> 

      </div> 

    </footer> 

  `; 

  

  const footerContainer = document.getElementById("footer"); 

  if (footerContainer) { 

    footerContainer.innerHTML = footer; 

  } 

  

  // ================================ 

  // HERO SLIDER 

  // ================================ 

  const slides = document.querySelectorAll(".hero-slide"); 

  const heroTitle = document.getElementById("heroTitle"); 

  const heroButton = document.getElementById("heroButton"); 

  

  const heroContent = [ 

    { title: "Bienvenue sur QuizTable", button: "Commencer l'aventure", link: "pages/quiz.html" }, 

    { title: "Teste tes connaissances", button: "Jouer au Quiz", link: "pages/quiz.html" }, 

    { title: "Relève les défis QuizTable", button: "Participer au concours", link: "pages/concours.html" }, 

    { title: "Culture afro-nippone", button: "Explorer la culture", link: "pages/culture.html" }, 

    { title: "Admire les créations", button: "Voir les illustrations", link: "pages/illustration.html" }, 

    { title: "Découvre la bibliothèque", button: "Explorer", link: "pages/bibliotheque.html" }, 

    { title: "Vis l'univers musical", button: "Découvrir la musique", link: "pages/musique.html" }, 

    { title: "Les dernières news", button: "Voir les news", link: "pages/news.html" }, 

    { title: "Découvre nos événements", button: "Voir les événements", link: "pages/evenements.html" }, 

    { title: "Échange avec la communauté", button: "Rejoindre le forum", link: "pages/forum.html" }, 

    { title: "Discute avec les membres", button: "Ouvrir le chat", link: "pages/chat.html" } 

  ]; 

  

  if (slides.length && heroTitle && heroButton) { 

    let currentSlide = 0; 

    let timer; 

    const prevButton = document.querySelector(".hero-prev"); 

    const nextButton = document.querySelector(".hero-next"); 

    const indicators = document.querySelector(".hero-indicators"); 

  

    // création des points 

    heroContent.forEach((item, index) => { 

      const dot = document.createElement("span"); 

      dot.classList.add("hero-dot"); 

      if (index === 0) { 

        dot.classList.add("active"); 

      } 

      dot.addEventListener("click", () => { 

        goToSlide(index); 

        restartTimer(); 

      }); 

      if (indicators) { 

        indicators.appendChild(dot); 

      } 

    }); 

  

    function updateIndicators() { 

      const dots = document.querySelectorAll(".hero-dot"); 

      dots.forEach(dot => dot.classList.remove("active")); 

      if (dots[currentSlide]) { 

        dots[currentSlide].classList.add("active"); 

      } 

    } 

  

    function goToSlide(index) { 

      slides[currentSlide].classList.remove("active"); 

      currentSlide = index; 

      slides[currentSlide].classList.add("active"); 

  

      heroTitle.classList.remove("hero-change"); 

      heroButton.classList.remove("hero-change"); 

      void heroTitle.offsetWidth; 

  

      heroTitle.textContent = heroContent[currentSlide].title; 

      heroButton.textContent = heroContent[currentSlide].button; 

      heroButton.href = heroContent[currentSlide].link; 

  

      heroTitle.classList.add("hero-change"); 

      setTimeout(() => { 

        heroButton.classList.add("hero-change"); 

      }, 300); 

  

      updateIndicators(); 

    } 

  

    function nextSlide() { 

      let next = currentSlide + 1; 

      if (next >= slides.length) next = 0; 

      goToSlide(next); 

    } 

  

    function previousSlide() { 

      let previous = currentSlide - 1; 

      if (previous < 0) previous = slides.length - 1; 

      goToSlide(previous); 

    } 

  

    if (nextButton) { 

      nextButton.addEventListener("click", () => { 

        nextSlide(); 

        restartTimer(); 

      }); 

    } 

  

    if (prevButton) { 

      prevButton.addEventListener("click", () => { 

        previousSlide(); 

        restartTimer(); 

      }); 

    } 

  

    function startTimer() { 

      timer = setInterval(() => { 

        nextSlide(); 

      }, 4000); 

    } 

  

    function restartTimer() { 

      clearInterval(timer); 

      startTimer(); 

    } 

  

    // animation initiale 

    heroTitle.classList.add("hero-change"); 

    setTimeout(() => { 

      heroButton.classList.add("hero-change"); 

    }, 300); 

    startTimer(); 

  } 

  

  // ================================ 

  // HALL OF FAME ANIMATION 

  // ================================ 

  const hall = document.querySelector(".hall-of-fame"); 

  if (hall) { 

    const observer = new IntersectionObserver( 

      (entries) => { 

        entries.forEach(entry => { 

          if (entry.isIntersecting) { 

            setTimeout(() => { 

              hall.classList.add("animate"); 

            }, 300); 

            observer.unobserve(hall); 

          } 

        }); 

      }, 

      { threshold: 0.3 } 

    ); 

    observer.observe(hall); 

  } 

  

  // ================================ 

  // boutton like 

  // ================================ 

  

  document.querySelectorAll(".like-btn").forEach(btn => { 

  

    btn.addEventListener("click", () => { 

  

        btn.classList.toggle("active"); 

  

        const number = btn.querySelector("span"); 

  

        let likes = parseInt(number.textContent); 

  

        if(btn.classList.contains("active")){ 

            likes++; 

        }else{ 

            likes--; 

        } 

  

        number.textContent = likes; 

  

        const icon = btn.querySelector("i"); 

  

        icon.classList.toggle("fa-regular"); 

        icon.classList.toggle("fa-solid"); 

  

    }); 

  

}); 

  

  // ================================ 

  // EVENT WHEEL CAROUSEL 

  // ================================ 

  const eventCards = document.querySelectorAll(".event-card"); 

  const eventSlider = document.querySelector(".events-slider"); 

  let activeEvent = 0; 

  let movingEvent = false; 

  let eventAutoTimer; 

  let eventPaused = false; 

  

  function updateEvents() { 

    eventCards.forEach((card, index) => { 

      card.classList.remove("active", "next", "previous", "hidden"); 

      const position = (index - activeEvent + eventCards.length) % eventCards.length; 

  

      if (position === 0) { 

        card.classList.add("active"); 

      } else if (position === 1) { 

        card.classList.add("next"); 

      } else if (position === eventCards.length - 1) { 

        card.classList.add("previous"); 

      } else { 

        card.classList.add("hidden"); 

      } 

    }); 

  } 

  

  function rotateEventDown() { 

    if (movingEvent) return; 

    movingEvent = true; 

    activeEvent++; 

    if (activeEvent >= eventCards.length) activeEvent = 0; 

    updateEvents(); 

    setTimeout(() => { movingEvent = false; }, 700); 

  } 

  

  function rotateEventUp() { 

    if (movingEvent) return; 

    movingEvent = true; 

    activeEvent--; 

    if (activeEvent < 0) activeEvent = eventCards.length - 1; 

    updateEvents(); 

    setTimeout(() => { movingEvent = false; }, 700); 

  } 

  

  function startEventAuto() { 

    clearInterval(eventAutoTimer); 

    eventAutoTimer = setInterval(() => { 

      if (!eventPaused) { 

        rotateEventDown(); 

      } 

    }, 5000); // changement toutes les 5 secondes 

  } 

  

  function pauseEventAuto() { 

    eventPaused = true; 

  } 

  

  function resumeEventAuto() { 

    eventPaused = false; 

  } 

  

  if (eventCards.length) { 

    updateEvents(); 

    startEventAuto(); 

  } 

  

  if (eventSlider) { 

    // Souris (molette) 

    eventSlider.addEventListener( 

      "wheel", 

      (e) => { 

        e.preventDefault(); 

        if (e.deltaY > 0) { 

          rotateEventDown(); 

        } else { 

          rotateEventUp(); 

        } 

      }, 

      { passive: false } 

    ); 

  

    // Pause quand la souris est sur les événements 

    eventSlider.addEventListener("mouseenter", () => { 

      pauseEventAuto(); 

    }); 

    eventSlider.addEventListener("mouseleave", () => { 

      resumeEventAuto(); 

    }); 

  

    // Swipe mobile 

    let touchStartY = 0; 

  

    eventSlider.addEventListener("touchstart", (e) => { 

      touchStartY = e.touches[0].clientY; 

      pauseEventAuto(); 

    }); 

  

    eventSlider.addEventListener("touchend", (e) => { 

      const touchEndY = e.changedTouches[0].clientY; 

      const distance = touchStartY - touchEndY; 

  

      if (distance > 50) { 

        rotateEventDown(); 

      } else if (distance < -50) { 

        rotateEventUp(); 

      } 

  

      // reprise automatique après interaction 

      setTimeout(() => { 

        resumeEventAuto(); 

      }, 5000); 

    }); 

  

    // clic sur cartes 

    eventCards.forEach(card => { 

      card.addEventListener("click", () => { 

        pauseEventAuto(); 

        setTimeout(() => { 

          resumeEventAuto(); 

        }, 8000); 

  

        if (card.classList.contains("next")) { 

          rotateEventDown(); 

        } else if (card.classList.contains("previous")) { 

          rotateEventUp(); 

        } 

      }); 

    }); 

  } 

  

  // ================================ 

  // NEWS PRINCIPALE 

  // ================================ 

  const featuredImage = document.querySelector(".featured-image img"); 

  const featuredBadge = document.querySelector(".featured-content .news-badge"); 

  const featuredTitle = document.querySelector(".featured-content h3"); 

  const featuredText = document.querySelector(".featured-content p"); 

  const featuredDate = document.querySelector(".featured-content .news-date"); 

  const smallNews = document.querySelectorAll(".small-news"); 

  

  if (featuredImage && featuredBadge && featuredTitle && featuredText && featuredDate) { 

    smallNews.forEach(news => { 

      news.addEventListener("click", () => { 

        const oldImage = featuredImage.src; 

        const oldBadge = featuredBadge.textContent; 

        const oldTitle = featuredTitle.textContent; 

        const oldText = featuredText.textContent; 

        const oldDate = featuredDate.textContent; 

  

        const imgElement = news.querySelector("img"); 

  

        const newImage = news.querySelector("img").src; 

        const newBadge = news.querySelector(".news-badge").textContent; 

        const newTitle = news.querySelector("h4").textContent; 

        const newText = news.querySelector("p")?.textContent || ""; 

        const newDate = news.querySelector(".news-date")?.textContent || ""; 

  

        const featured = document.querySelector(".featured-news"); 

        featured.classList.add("changing"); 

  

        setTimeout(() => { 

          featuredImage.src = newImage; 

          featuredBadge.textContent = newBadge; 

          featuredTitle.textContent = newTitle; 

          featuredText.textContent = newText; 

          featuredDate.textContent = newDate; 

          featured.classList.remove("changing"); 

        }, 400); 

  

        // ancienne news devient petite news 

        news.querySelector("img").src = oldImage; 

        news.querySelector(".news-badge").textContent = oldBadge; 

        news.querySelector("h4").textContent = oldTitle; 

  

        const p = news.querySelector("p"); 

        if (p) p.textContent = oldText; 

  

        const date = news.querySelector(".news-date"); 

        if (date) date.textContent = oldDate; 

      }); 

    }); 

  } 

  

  // ================================ 

  // FAQ 

  // ================================ 

  const faqItems = document.querySelectorAll(".faq-item"); 

  faqItems.forEach(item => { 

    const question = item.querySelector(".faq-question"); 

    if (!question) return; 

    question.addEventListener("click", () => { 

      const opened = item.classList.contains("active"); 

      faqItems.forEach(faq => faq.classList.remove("active")); 

      if (!opened) { 

        item.classList.add("active"); 

      } 

    }); 

  }); 

  

}); 