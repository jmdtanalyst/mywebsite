document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add portfolio items dynamically
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioItems = [
        {
            title: 'Time Series Sentiment Analysis',
            description: 'Advanced sentiment analysis using time series data.',
            tech: 'Python, NLP, Machine Learning'
        },
        {
            title: 'Bike-Sharing Trip Prediction',
            description: 'Predicting bike usage patterns using RNNs.',
            tech: 'TensorFlow, Keras, RNN'
        },
        {
            title: 'Food Delivery Time Prediction',
            description: 'Predicting delivery times for food delivery services.',
            tech: 'Python, Scikit-learn, Data Analysis'
        },
        {
            title: 'Book Recommendation System',
            description: 'Personalized book recommendations using collaborative filtering.',
            tech: 'Python, Machine Learning, Recommendation Systems'
        }
    ];

    portfolioItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'portfolio-item';
        itemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="tech-stack">${item.tech}</div>
        `;
        portfolioGrid.appendChild(itemElement);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
});
