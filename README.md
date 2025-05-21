# JMCloudPro - Personal AI & Data Consulting Website

This is the official website for Jose Mario Costa, AI & Data Science Specialist. The website features:

- Modern, responsive design
- Multi-language support (English and Portuguese)
- AI-powered chatbot integration
- Portfolio showcase
- Contact form
- Docker container support

## Features

- Clean, modern UI with animations
- Language switching between English and Portuguese
- Integrated chatbot for real-time support
- Responsive design for all devices
- Docker container deployment
- SEO-friendly structure

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Docker
- Nginx

## Setup

### Docker Deployment

```bash
# Build and run the container
docker-compose build

docker-compose up -d

# View logs
docker-compose logs -f
```

### Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. Use `docker-compose.yml` for container deployment

## Structure

```
JMCloudPro/
├── index.html           # Main HTML file
├── styles.css           # CSS styles
├── script.js            # Main JavaScript
├── chatbot.js          # Chatbot functionality
├── language.js         # Language switching
├── translations.js     # Language translations
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker compose file
├── nginx.conf          # Nginx configuration
└── images/            # Website images
```

## License

MIT License
