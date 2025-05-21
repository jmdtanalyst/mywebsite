import translations from './translations.js';

class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('jmcloudpro-lang') || 'en';
        this.updateLanguage(this.currentLang);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const flags = document.querySelectorAll('.flag');
        flags.forEach(flag => {
            flag.addEventListener('click', () => {
                const lang = flag.dataset.lang;
                if (lang !== this.currentLang) {
                    this.updateLanguage(lang);
                    localStorage.setItem('jmcloudpro-lang', lang);
                }
            });
        });
    }

    updateLanguage(lang) {
        this.currentLang = lang;
        
        // Update flag styling
        document.querySelectorAll('.flag').forEach(flag => {
            flag.classList.toggle('active', flag.dataset.lang === lang);
        });

        // Update page content
        this.updateTranslations();
    }

    updateTranslations() {
        // Update navbar
        document.querySelectorAll('.nav-links a').forEach(link => {
            const sectionId = link.getAttribute('href').substring(1);
            if (translations[this.currentLang][sectionId]) {
                link.textContent = translations[this.currentLang][sectionId].title;
            }
        });

        // Update hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.querySelector('h1').textContent = translations[this.currentLang].home.title;
            hero.querySelector('p').textContent = translations[this.currentLang].home.subtitle;
            hero.querySelector('.cta-button').textContent = translations[this.currentLang].home.cta;
        }

        // Update services
        const services = document.querySelector('.services');
        if (services) {
            services.querySelector('h2').textContent = translations[this.currentLang].services.title;
            const cards = services.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                const service = translations[this.currentLang].services.cards[index];
                card.querySelector('i').classList.add(`fa-${service.icon}`);
                card.querySelector('h3').textContent = service.title;
                card.querySelector('p').textContent = service.description;
            });
        }

        // Update portfolio
        const portfolio = document.querySelector('.portfolio');
        if (portfolio) {
            portfolio.querySelector('h2').textContent = translations[this.currentLang].portfolio.title;
            const projects = portfolio.querySelector('.portfolio-grid');
            projects.innerHTML = '';
            translations[this.currentLang].portfolio.projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.className = 'portfolio-item';
                projectElement.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">${project.tech}</div>
                `;
                projects.appendChild(projectElement);
            });
        }

        // Update about section
        const about = document.querySelector('.about');
        if (about) {
            about.querySelector('h2').textContent = translations[this.currentLang].about.title;
            about.querySelector('h3').textContent = translations[this.currentLang].about.name;
            about.querySelector('p').textContent = translations[this.currentLang].about.description;
            const credentials = about.querySelector('.credentials');
            credentials.innerHTML = translations[this.currentLang].about.credentials.map(cred => 
                `<p>${cred}</p>`
            ).join('');
        }

        // Update contact form
        const contact = document.querySelector('.contact');
        if (contact) {
            contact.querySelector('h2').textContent = translations[this.currentLang].contact.title;
            contact.querySelectorAll('input, textarea').forEach(input => {
                const type = input.getAttribute('type') || input.tagName.toLowerCase();
                input.placeholder = translations[this.currentLang].contact[type];
            });
        }

        // Update chatbot
        const chatbot = document.querySelector('.chatbot-container');
        if (chatbot) {
            chatbot.querySelector('.chatbot-header h3').textContent = translations[this.currentLang].chatbot.welcome;
            document.getElementById('chatbot-input').placeholder = translations[this.currentLang].chatbot.placeholder;
            document.getElementById('send-message').textContent = translations[this.currentLang].chatbot.send;
        }
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});
