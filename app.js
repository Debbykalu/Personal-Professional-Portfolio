/* ==========================================================================
   Debby Sinkalu Portfolio Javascript Logic
   ========================================================================== */

// Project Data Store
const projectData = {
    shortlet: {
        title: "Verified Shortlet Booking Platform",
        tag: "Full Stack",
        status: "Production Ready",
        excerpt: "A secure, multi-role property rental application facilitating users, rental hosts, and admin workflows.",
        description: "This verified shortlet booking platform was built to bridge the gap between hosts and renters by incorporating automated verification checkpoints, secure transactions, and a streamlined administrative pipeline. It supports user profiles, detailed listings, property reviews, messaging systems, booking cycles, and payment integrations.",
        tech: ["Python", "Flask", "SQLAlchemy", "MySQL", "Docker", "AWS", "Bootstrap", "JavaScript", "Paystack API"],
        features: [
            "Designed a multi-role property rental platform for customers, hosts, and administrators.",
            "Implemented authentication, booking management, host verification, reviews, notifications, and an admin dashboard.",
            "Integrated Paystack payment gateway for secure local and international card processing.",
            "Dockerized the application components for clean, reproducible development and staging setups.",
            "Deployed and configured AWS resources (RDS, EC2, S3) using secure architectural principles."
        ]
    },
    wedding: {
        title: "Wedding & Event Management Platform",
        tag: "Full Stack",
        status: "In Development (75% Complete)",
        excerpt: "A modern full-stack event planning web system streamlining vendor dashboards and client bookings.",
        description: "A comprehensive event coordination and planning software designed to simplify the wedding planning lifecycle. The platform connects clients directly with verified local vendors, offers real-time budget forecasting and timeline scheduling, and features intuitive admin panels to oversee registration and compliance.",
        tech: ["React", "Python", "Flask", "MySQL", "REST APIs", "Docker", "AWS", "CSS Grid/Flexbox"],
        features: [
            "Comprehensive Vendor Management system with rating and portfolio display options.",
            "Interactive client-facing Event Planning Dashboard for task checklist management.",
            "Robust customer registration, authorization, and secure session management.",
            "Real-time Budget Tracking and expense categorization features.",
            "Responsive dashboard UI optimized for tablet and mobile devices.",
            "Ready-made REST API architecture designed for external calendar integrations."
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileMenu();
    initProjectFilters();
    initScrollNavbar();
    initIntersectionObservers();
});

/* ==========================================================================
   Theme Handler (Dark/Light Mode)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlTag = document.documentElement;
    
    // Check local storage or match system preference
    const savedTheme = localStorage.getItem("portfolio-theme");
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
        htmlTag.setAttribute("data-theme", savedTheme);
    } else {
        const defaultTheme = userPrefersDark ? "dark" : "light";
        htmlTag.setAttribute("data-theme", defaultTheme);
        localStorage.setItem("portfolio-theme", defaultTheme);
    }
    
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = htmlTag.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        htmlTag.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
    });
}

/* ==========================================================================
   Mobile Dropdown Navigation Menu
   ========================================================================== */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenuDropdown = document.getElementById("mobile-menu-dropdown");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    
    const toggleMenu = () => {
        mobileMenuToggle.classList.toggle("open");
        mobileMenuDropdown.classList.toggle("open");
        // Disable body scroll when mobile menu is open
        document.body.style.overflow = mobileMenuDropdown.classList.contains("open") ? "hidden" : "auto";
    };
    
    mobileMenuToggle.addEventListener("click", toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenuDropdown.classList.contains("open")) {
                toggleMenu();
            }
        });
    });
}

/* ==========================================================================
   Scroll Navbar Styling and Navigation Link Highlighting
   ========================================================================== */
function initScrollNavbar() {
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

/* ==========================================================================
   Scroll Reveal and Interactive Observers
   ========================================================================== */
function initIntersectionObservers() {
    // 1. Scroll-to-Reveal Sections
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // Unobserve once shown
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // 2. Skill progress bar animation on viewport enter
    const skillsSection = document.getElementById("skills");
    const skillProgressBars = document.querySelectorAll(".skill-progress");
    
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillProgressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        skillsObserver.observe(skillsSection);
    }
    
    // 3. Navigation link active state highlighter on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    
    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute("id");
                
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    const linkHref = link.getAttribute("href");
                    if (linkHref === `#${activeId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: "-20% 0px -60% 0px" // Focus more on middle viewport
    });
    
    sections.forEach(sec => activeSectionObserver.observe(sec));
}

/* ==========================================================================
   Project Category Filter System
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active style from other buttons
            filterButtons.forEach(b => b.classList.remove("active"));
            // Add active to current button
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-filter");
            
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "block";
                    // Brief delay to trigger entrance animation
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(10px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 200);
                }
            });
        });
    });
}

/* ==========================================================================
   Project Details Modal Controls
   ========================================================================== */
function openProjectModal(projectId) {
    const modal = document.getElementById("project-modal");
    const modalContent = document.getElementById("modal-project-content");
    const project = projectData[projectId];
    
    if (!project) return;
    
    // Build and inject HTML
    let techHtml = "";
    project.tech.forEach(t => {
        techHtml += `<span>${t}</span>`;
    });
    
    let featuresHtml = "";
    project.features.forEach(f => {
        featuresHtml += `<li>${f}</li>`;
    });
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <span class="modal-tag">${project.tag} • ${project.status}</span>
            <h3 class="modal-title">${project.title}</h3>
            <div class="underline"></div>
        </div>
        <div class="modal-body">
            <h4>Description</h4>
            <p>${project.description}</p>
            
            <h4>Technology Stack</h4>
            <div class="modal-tech-list">
                ${techHtml}
            </div>
            
            <h4>Key Features & Achievements</h4>
            <ul class="modal-features-list">
                ${featuresHtml}
            </ul>
        </div>
    `;
    
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeProjectModal() {
    const modal = document.getElementById("project-modal");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
}

// Close modal on Escape key press
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeProjectModal();
    }
});

/* ==========================================================================
   Contact Form Submission & Response Feedback
   ========================================================================== */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById("btn-submit-form");
    const responseMsg = document.getElementById("form-response");
    const name = document.getElementById("form-name").value;
    const email = document.getElementById("form-email").value;
    const subject = document.getElementById("form-subject").value;
    const message = document.getElementById("form-message").value;
    
    // Visual processing state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <span class="spinner"></span>`;
    
    // Simulate API pipeline delay (1.5 seconds)
    setTimeout(() => {
        // Success emulation
        responseMsg.className = "form-response-msg success";
        responseMsg.innerHTML = `Thank you, ${name}! Your inquiry regarding "${subject}" has been submitted successfully.`;
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Message <svg class="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
        
        // Reset form inputs
        document.getElementById("contact-form").reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            responseMsg.style.display = "none";
        }, 5000);
        
    }, 1500);
}
