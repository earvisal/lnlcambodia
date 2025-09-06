
    

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

     