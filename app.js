/**
 * Debby Sinkalu Portfolio Interactive Script
 */

const projectData = {
    wakanow: {
        title: "Wakanow Enterprise Travel Platform",
        tag: "Enterprise Collaboration",
        status: "Live Commercial",
        excerpt: "High-scale travel booking engine handling thousands of daily flight searches and hotel transactions across West Africa.",
        description: "As Senior Software Developer at Wakanow Group, I architected high-volume web application components handling thousands of daily flight search queries and booking transactions. I designed reusable UI component libraries in React and Angular, optimized frontend rendering speed, and integrated high-throughput REST APIs.",
        tech: ["React", "Angular", "TypeScript", "JavaScript (ES6+)", "REST APIs", "Azure Cloud", "Git"],
        features: [
            "Architected enterprise React & Angular components for flight, hotel, and holiday booking engines.",
            "Optimized client-side DOM rendering speed and API data hydration for high-traffic marketing campaigns.",
            "Integrated secure payment authorization flows and multi-currency transaction checkout components.",
            "Mentored junior developers through pair programming, sprint code reviews, and API contract design."
        ],
        liveUrl: "https://www.wakanow.com"
    },
    travelden: {
        title: "Travelden OTA Flight Booking Platform",
        tag: "Enterprise Collaboration",
        status: "Live Commercial",
        excerpt: "Enterprise Online Travel Agency platform featuring multi-GDS airline API integrations and interactive seat selection.",
        description: "As Software Consultant for Finchglow Holdings, I led frontend product engineering for the Travelden Online Travel Agency (OTA) platform. The application connects directly to global distribution systems (Amadeus, Sabre, Verteil) to deliver real-time flight availability, pricing, seat selection, and ancillary booking options.",
        tech: ["React", "Next.js", "TypeScript", "GDS APIs (Amadeus, Sabre, Verteil)", "REST APIs", "AWS"],
        features: [
            "Led frontend engineering delivery for the Travelden Online Travel Agency platform.",
            "Integrated Amadeus, Sabre, and Verteil GDS APIs for real-time flight inventory and fare rules.",
            "Engineered responsive, highly accessible flight seat selection maps and baggage checkout modules.",
            "Worked closely with QA and Product leads in Agile sprint cycles to ship production releases."
        ],
        liveUrl: "https://www.travelden.com"
    },
    jamborow: {
        title: "Jamborow FinTech Financial Inclusion Platform",
        tag: "Enterprise Collaboration",
        status: "Active Production",
        excerpt: "Digital microfinance and financial inclusion platform serving unbanked communities across Africa & UK.",
        description: "As Software Engineer at Jamborow Limited, I designed and built production-ready FinTech software products using Flask backends and React frontends. Jamborow provides digital financial services, micro-loans, savings groups (susu/chama), and credit scoring analytics for underserved communities.",
        tech: ["React", "Python", "Flask", "SQLAlchemy", "MySQL", "MongoDB", "Docker", "AWS"],
        features: [
            "Designed and developed production-ready FinTech web applications using React, Python, and Flask.",
            "Built robust RESTful APIs and database models using Flask, SQLAlchemy, MySQL, and MongoDB.",
            "Containerized microservices using Docker for consistent local, staging, and AWS production setups.",
            "Collaborated in distributed international Agile teams using Git, code reviews, and sprint planning."
        ],
        liveUrl: "https://www.jamborow.com"
    },
    shortlet: {
        title: "Verified Shortlet Booking Platform",
        tag: "Full Stack Solution",
        status: "Production Ready",
        excerpt: "Multi-role property rental application supporting hosts, renters, payment gateways, and admin dashboards.",
        description: "This verified shortlet booking platform was built to bridge the gap between hosts and renters by incorporating automated verification checkpoints, secure transactions, and a streamlined administrative pipeline. It supports user profiles, detailed listings, property reviews, messaging systems, booking cycles, wishlists, and Paystack payment integrations.",
        tech: ["Python", "Flask", "SQLAlchemy", "MySQL", "Docker", "AWS (RDS, EC2, S3)", "Paystack API"],
        features: [
            "Designed a multi-role property rental platform for customers, property hosts, and administrators.",
            "Implemented secure authentication, host identity verification, review scoring, notification pipelines, and admin oversight.",
            "Integrated Paystack payment gateway for local and international payment processing.",
            "Dockerized all application services for consistent staging and production deployment.",
            "Deployed and configured resilient AWS infrastructure (RDS MySQL, EC2, S3 bucket storage)."
        ],
        liveUrl: "http://ec2-54-205-57-68.compute-1.amazonaws.com/"
    },
    wedding: {
        title: "Wedding & Event Management Platform",
        tag: "Full Stack Solution",
        status: "In Development (75% Complete)",
        excerpt: "A modern full-stack event planning web system streamlining vendor dashboards and client bookings.",
        description: "A comprehensive event coordination and planning software designed to simplify the wedding planning lifecycle. The platform connects clients directly with verified local vendors, offers real-time budget forecasting and timeline scheduling, and features intuitive admin panels to oversee vendor registration and compliance.",
        tech: ["React", "Python", "Flask", "MySQL", "REST APIs", "Docker", "AWS", "CSS Grid / Flexbox"],
        features: [
            "Comprehensive Vendor Management system with rating systems and interactive portfolio displays.",
            "Interactive client-facing Event Planning Dashboard for checklist task completion.",
            "Robust customer registration, authorization, and secure session management.",
            "Real-time Budget Tracking and expense categorization tools.",
            "Responsive dashboard UI optimized for mobile, tablet, and desktop devices."
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initPageLoader();
    initTheme();
    initMobileMenu();
    initProjectFilters();
    initScrollNavbar();
    initIntersectionObservers();
    initActiveNavOnScroll();
});

/* Page Preloader */
function initPageLoader() {
    const pageLoader = document.getElementById("page-loader");
    if (pageLoader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                pageLoader.classList.add("fade-out");
            }, 300);
        });
        // Fallback hide
        setTimeout(() => {
            if (!pageLoader.classList.contains("fade-out")) {
                pageLoader.classList.add("fade-out");
            }
        }, 2000);
    }
}

/* Dark / Light Theme Controller */
function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlTag = document.documentElement;
    
    const savedTheme = localStorage.getItem("portfolio-theme");
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
        htmlTag.setAttribute("data-theme", savedTheme);
    } else {
        const defaultTheme = userPrefersDark ? "dark" : "light";
        htmlTag.setAttribute("data-theme", defaultTheme);
        localStorage.setItem("portfolio-theme", defaultTheme);
    }
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlTag.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            htmlTag.setAttribute("data-theme", newTheme);
            localStorage.setItem("portfolio-theme", newTheme);
        });
    }
}

/* Mobile Menu Drawer */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenuDropdown = document.getElementById("mobile-menu-dropdown");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    
    if (mobileMenuToggle && mobileMenuDropdown) {
        const toggleMenu = () => {
            mobileMenuToggle.classList.toggle("open");
            mobileMenuDropdown.classList.toggle("open");
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
}

/* Scroll Header Effects */
function initScrollNavbar() {
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }
}

/* Project Tag Filter */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-filter");
            
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category.includes(filterValue)) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });
}

/* Scroll Reveal Observer */
function initIntersectionObservers() {
    const reveals = document.querySelectorAll(".scroll-reveal");
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    reveals.forEach(el => observer.observe(el));
}

/* Active Nav Highlighting */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}

/* Case Study Modal Logic */
function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;
    
    const modal = document.getElementById("project-modal");
    const modalContent = document.getElementById("modal-project-content");
    
    if (!modal || !modalContent) return;
    
    const featureList = data.features.map(f => `<li>${f}</li>`).join("");
    const liveBtn = data.liveUrl ? `<a href="${data.liveUrl}" target="_blank" rel="noopener" class="btn btn-gold" style="margin-top: 1.5rem; display: inline-flex;">Visit Live Site / Platform &rarr;</a>` : "";
    
    modalContent.innerHTML = `
        <span class="modal-tag">${data.tag} • ${data.status}</span>
        <h3>${data.title}</h3>
        <p style="font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 1.5rem;">${data.description}</p>
        
        <div class="modal-section-title">Key Engineering Contributions</div>
        <ul class="modal-feature-list">
            ${featureList}
        </ul>
        
        <div class="modal-section-title">Technologies Used</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${data.tech.map(t => `<span style="background: var(--mint-subtle); color: var(--emerald-deep); padding: 0.3rem 0.8rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem;">${t}</span>`).join("")}
        </div>
        
        ${liveBtn}
    `;
    
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeProjectModal() {
    const modal = document.getElementById("project-modal");
    if (modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
    }
}

/* Contact Form Simulation */
function handleFormSubmit(event) {
    event.preventDefault();
    const responseMsg = document.getElementById("form-response");
    const nameInput = document.getElementById("form-name").value;
    
    if (responseMsg) {
        responseMsg.className = "form-response-msg success";
        responseMsg.innerHTML = `Thank you, <strong>${nameInput}</strong>! Your message has been received. I will get back to you shortly.`;
        document.getElementById("contact-form").reset();
        
        setTimeout(() => {
            responseMsg.style.display = "none";
        }, 6000);
    }
}
