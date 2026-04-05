function showCustomAlert() {
            const alertOverlay = document.getElementById('customAlert');
            alertOverlay.classList.add('show');
        }

        function closeCustomAlert() {
            const alertOverlay = document.getElementById('customAlert');
            alertOverlay.classList.remove('show');
        }

        // Show alert immediately on page load
        window.addEventListener('load', () => {
            setTimeout(showCustomAlert, 2000); // Show after 2 seconds of page load
        });

        // Show alert every 30 seconds
        setInterval(showCustomAlert, 30000);

        // Close alert when clicking outside the box
        document.getElementById('customAlert').addEventListener('click', function(e) {
            if (e.target === this) {
                closeCustomAlert();
            }
        });

        // ========== SMOOTH SCROLL & ANIMATIONS ==========
        document.documentElement.style.scrollBehavior = 'smooth';

        function smoothScrollTo(target, duration = 1000) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition - 70;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }

        // Navbar scroll effect
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            if (currentScroll > lastScroll && currentScroll > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                if (targetId === '#' || targetId === '#home') {
                    smoothScrollTo(document.body, 1200);
                } else {
                    const target = document.querySelector(targetId);
                    if (target) {
                        smoothScrollTo(target, 1200);
                    }
                }
                
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
                
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            });
        });

        // Active navigation link on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveLink() {
            let current = '';
            const scrollPosition = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = sectionId;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);

        // Skill progress bars
        const skillBars = document.querySelectorAll('.skill-progress');
        let skillsAnimated = false;

        function animateSkills() {
            if (skillsAnimated) return;
            
            const skillsSection = document.querySelector('.skills-section');
            if (!skillsSection) return;
            
            const skillsSectionTop = skillsSection.offsetTop;
            const scrollPosition = window.scrollY + window.innerHeight;

            if (scrollPosition > skillsSectionTop + 200) {
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress + '%';
                    }, index * 100);
                });
                skillsAnimated = true;
            }
        }

        window.addEventListener('scroll', animateSkills);

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            smoothScrollTo(document.body, 1500);
        });

        // Fade-in animations
        const faders = document.querySelectorAll('.skill-card, .project-card, .about-content, .stat-item');

        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-section', 'is-visible');
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            fader.classList.add('fade-in-section');
            appearOnScroll.observe(fader);
        });

        // Form submission
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            });
        }

        // Notification system
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }

        // Counter animation
        const stats = document.querySelectorAll('.stat-item h4');
        let statsAnimated = false;

        function animateStats() {
            if (statsAnimated) return;
            
            const aboutSection = document.querySelector('.about-section');
            if (!aboutSection) return;
            
            const aboutSectionTop = aboutSection.offsetTop;
            const scrollPosition = window.scrollY + window.innerHeight;

            if (scrollPosition > aboutSectionTop + 200) {
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        const finalValue = stat.textContent;
                        const hasPlus = finalValue.includes('+');
                        const hasPercent = finalValue.includes('%');
                        const numericValue = parseInt(finalValue);
                        
                        if (!isNaN(numericValue)) {
                            let current = 0;
                            const increment = numericValue / 60;
                            const timer = setInterval(() => {
                                current += increment;
                                if (current >= numericValue) {
                                    stat.textContent = numericValue + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                                    clearInterval(timer);
                                } else {
                                    stat.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
                                }
                            }, 20);
                        }
                    }, index * 200);
                });
                statsAnimated = true;
            }
        }

        window.addEventListener('scroll', animateStats);

        // TYPING EFFECT
        const roles = ["Web Developer", "Frontend Developer", "UI Designer", "Debugger"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const typingText = document.getElementById('typingText');
            if (!typingText) return;

            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let timeout = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                timeout = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

            setTimeout(typeEffect, timeout);
        }

        // Scroll progress
        function updateScrollProgress() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            let progressBar = document.getElementById('scrollProgress');
            if (progressBar) {
                progressBar.style.width = scrolled + '%';
            }
        }

        window.addEventListener('scroll', updateScrollProgress);

        // Page load
        window.addEventListener('load', () => {
            setTimeout(typeEffect, 1000);
            updateActiveLink();
            animateSkills();
            animateStats();
            updateScrollProgress();
            console.log('🚀 Portfolio loaded successfully!');
        });

        // Debounce function
        function debounce(func, wait = 10) {
            let timeout;
            return function() {
                const context = this, args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }

        window.addEventListener('scroll', debounce(updateActiveLink, 10));
        window.addEventListener('scroll', debounce(updateScrollProgress, 10));