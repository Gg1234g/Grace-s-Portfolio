document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const toggleButton = document.querySelector('.toggle-btn');
    const menu = document.querySelector('.menu');
    
    if (toggleButton && menu) {
        toggleButton.addEventListener('click', () => {
            menu.classList.toggle('open');
            toggleButton.innerHTML = menu.classList.contains('open') ? '✕' : '☰';
        });
    }

    // Dark/Light Mode Toggle
    const modeToggle = document.querySelector('.mode-toggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            
            // Animate the toggle
            modeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                modeToggle.style.transform = 'rotate(360deg)';
            }, 300);
        });

        // Check for saved theme preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Save Recipe Functionality
    const saveButtons = document.querySelectorAll('.save-recipe');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const recipeId = this.id;
            let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
            
            // Animation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            if (this.classList.contains('saved')) {
                savedRecipes = savedRecipes.filter(id => id !== recipeId);
                this.classList.remove('saved');
                this.innerHTML = '<i class="far fa-bookmark"></i> Save Recipe';
            } else {
                savedRecipes.push(recipeId);
                this.classList.add('saved');
                this.innerHTML = '<i class="fas fa-bookmark"></i> Recipe Saved';
            }

            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        });
    });

    // Check if recipes are already saved
    window.addEventListener('load', () => {
        const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
        saveButtons.forEach(button => {
            const recipeId = button.id;
            if (savedRecipes.includes(recipeId)) {
                button.classList.add('saved');
                button.innerHTML = '<i class="fas fa-bookmark"></i> Recipe Saved';
            }
        });
    });

    // Checkbox functionality for ingredients
    const ingredientLists = document.querySelectorAll('.ingredients-list');
    ingredientLists.forEach(list => {
        const checkboxes = list.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const li = this.parentElement;
                if (this.checked) {
                    li.style.textDecoration = 'line-through';
                    li.style.opacity = '0.7';
                } else {
                    li.style.textDecoration = 'none';
                    li.style.opacity = '1';
                }
            });
        });
    });

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const texts = [
            "Strategic Thinker",
            "Community Leader",
            "Problem Solver",
            "Innovative Mind"
        ];
        let currentTextIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentText = texts[currentTextIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
    }

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .menu-card, .instruction-step, .tip-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .menu-card, .instruction-step, .tip-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Hover effect for project cards
    const projectCards = document.querySelectorAll('.menu-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;
            
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

// Initialize particles.js if the element exists
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: ["#ff2d75", "#ff6b9e", "#ff9ec6"] },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ff2d75", opacity: 0.2, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
});