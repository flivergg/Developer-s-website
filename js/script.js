function initRotatingText() {
    const rotateWords = document.querySelectorAll('.rotate-word');
    if (rotateWords.length < 2) return;
    
    let currentIndex = 0;
    
    function rotateNext() {
        rotateWords[currentIndex].classList.remove('active');
        
        currentIndex = (currentIndex + 1) % rotateWords.length;
        
        rotateWords[currentIndex].classList.add('active');
    }
    
    setInterval(rotateNext, 3000);
}


document.addEventListener('DOMContentLoaded', function() {
    initRotatingText();
    

    
});
    

    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.setAttribute('aria-expanded', navLinks.classList.contains('active'));
            });
            

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        navLinks.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        }
    }
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                if (href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        if (counters.length === 0) return;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    const suffix = counter.textContent.includes('+') ? '+' : '';
                    
                    let current = 0;
                    const increment = target / 30;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current) + suffix;
                            setTimeout(updateCounter, 30);
                        } else {
                            counter.textContent = target + suffix;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    function setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    initRotatingText();
    initMobileMenu();
    initSmoothScroll();
    initCounterAnimation();
    setCurrentYear();
    
    const style = document.createElement('style');
    style.textContent = `
        .rotate-item {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                transition: all 0.3s ease;
            }
        }
    `;
    document.head.appendChild(style);

    