
    document.addEventListener('DOMContentLoaded', () => {
      // Slider
      const slides = document.querySelector('.slides');
      const tabs = document.querySelectorAll('.nav-tab');
      const prev = document.querySelector('.prev');
      const next = document.querySelector('.next');
      let currentSlide = 0;
      const totalSlides = 4;
      let autoSlideInterval;

      function showSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;
        slides.style.transform = `translateX(-${index * 25}%)`;
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[index].classList.add('active');
        currentSlide = index;
      }

      function nextSlide() { showSlide(currentSlide + 1); }
      function prevSlide() { showSlide(currentSlide - 1); }

      function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 5000); }
      function stopAutoSlide() { clearInterval(autoSlideInterval); }

      next.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
      prev.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          stopAutoSlide();
          showSlide(parseInt(tab.dataset.slide));
          startAutoSlide();
        });
      });

      showSlide(0);
      startAutoSlide();
      
      // Header Scroll
      const header = document.querySelector('header');
      window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll === 0) {
          header.classList.remove('hidden');
        } else {
          header.classList.add('hidden');
        }
      });
      
      // Mobile Navbar
      const hamburger = document.getElementById("hamburger");
      const mobileMenu = document.getElementById("mobileMenu");
      const menuItems = document.querySelectorAll(".menu-item");
      const menuLinks = document.querySelectorAll(".mobile-menu a");

      hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileMenu.style.right = mobileMenu.style.right === "0px" ? "-280px" : "0px";
      });

      menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          const submenu = item.nextElementSibling;
          submenu.classList.toggle('active');
        });
      });

      menuLinks.forEach(link => {
        link.addEventListener("click", () => { mobileMenu.style.right = "-280px"; });
      });

      document.addEventListener("click", (e) => {
        if (mobileMenu.style.right === "0px" && !mobileMenu.contains(e.target) && e.target !== hamburger) {
          mobileMenu.style.right = "-280px";
        }
      });

      // Language Selector
      // const langSelector = document.getElementById("languageSelector");
      // const currentLang = document.getElementById("currentLang");
      // const langLinks = langSelector.querySelectorAll(".language-menu a");

      // langSelector.addEventListener("click", (e) => {
      //   if (!e.target.closest(".language-menu")) {
      //     langSelector.classList.toggle("open");
      //   }
      // });

      // langLinks.forEach(link => {
      //   link.addEventListener("click", (e) => {
      //     e.preventDefault();
      //     currentLang.textContent = link.getAttribute("data-lang");
      //     langSelector.classList.remove("open");
      //   });
      // });

      // document.addEventListener("click", (e) => {
      //   if (!langSelector.contains(e.target)) langSelector.classList.remove("open");
      // });

      // Vision / Mission Toggle
      const data = [
        { title: "Our Vision", text: "Our vision is to be best in logistics and international freight forwarding industries.", icon: "fas fa-globe" },
        { title: "Our Mission", text: "Enable trade, create value, deliver excellence, and achieve results with speed, cost, and quality.", icon: "fas fa-rocket" }];

      let index = 0;
      const title = document.getElementById('title');
      const text = document.getElementById('text');
      const visionBox = document.getElementById('visionBox');
      const icon = visionBox.querySelector('i');

      setInterval(() => {
        visionBox.style.opacity = 0;
        setTimeout(() => {
          index = (index + 1) % data.length;
          title.textContent = data[index].title;
          text.textContent = data[index].text;
          icon.className = data[index].icon;
          visionBox.style.opacity = 1;
        }, 600);
      }, 4000);

      // Scroll Animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('show');
        });
      }, { threshold: 0.2 });

      document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => observer.observe(el));

      // Dark Mode Toggle
      // const darkModeToggle = document.getElementById('darkModeToggle');
      // darkModeToggle.addEventListener('click', () => {
      //   document.body.classList.toggle('dark-mode');
      //   localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      // });

      // if (localStorage.getItem('darkMode') === 'true') {
      //   document.body.classList.add('dark-mode');
      // }

      // Back to Top
      const backToTop = document.getElementById('backToTop');
      window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
      });

      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Quote Form
      const quoteForm = document.querySelector('.quote-form');
      if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
          e.preventDefault();
          alert('Quote submitted! We will contact you soon.');
        });
      }
    });
    // Counter Animation
  document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // speed of counting

    const animateCounters = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCount, 20);
            } else {
              counter.innerText = target.toLocaleString();
            }
          };
          updateCount();
          observer.unobserve(counter);
        }
      });
    };

    const observer = new IntersectionObserver(animateCounters, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
  });

  // Hover Effect for Industries
  document.querySelectorAll('.industry-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.05)';
      card.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
    });
  });


(function () {
  'use strict';

  class ShippingForm {
    constructor() {
      this.tabs = document.querySelectorAll('.tab');
      this.contents = document.querySelectorAll('.tab-content');
      this.forms = document.querySelectorAll('form');
      this.init();
    }

    init() {
      this.bindTabEvents();
      this.bindFormEvents();
    }

    // === Tabs Switching ===
    bindTabEvents() {
      this.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetId = tab.dataset.tab;

          // Remove active from all
          this.tabs.forEach(t => t.classList.remove('active'));
          this.contents.forEach(c => c.classList.remove('active'));

          // Activate selected
          tab.classList.add('active');
          document.getElementById(targetId).classList.add('active');
        });

        tab.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            tab.click();
          }
        });
      });
    }

    // === Form Validation & Submit Handling ===
    bindFormEvents() {
      this.forms.forEach(form => {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!this.validateForm(form)) return;

          // Simulate submission
          submitBtn.classList.add('loading');
          submitBtn.disabled = true;
          setTimeout(() => {
            alert('Form submitted successfully!');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            form.reset();
          }, 1000);
        });

        // Live validation
        form.querySelectorAll('input, select, textarea').forEach(input => {
          input.addEventListener('input', () => this.validateInput(input));
        });
      });
    }

    validateInput(input) {
      if (!input.validity.valid && input.required) {
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    }

    validateForm(form) {
      let isValid = true;
      form.querySelectorAll('input, select, textarea').forEach(input => {
        this.validateInput(input);
        if (!input.validity.valid && input.required) isValid = false;
      });
      return isValid;
    }
  }

  new ShippingForm();
})();

