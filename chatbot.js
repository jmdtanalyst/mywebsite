class Chatbot {
    constructor() {
        this.webhookUrl = 'https://oci.jmcloudpro.com/webhook/jmcloudpro';
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.toggleButton = document.getElementById('chatbot-toggle');
        this.closeButton = document.querySelector('.chatbot-close');
        this.container = document.querySelector('.chatbot-container');

        this.initializeEventListeners();
        this.addInitialMessage();
    }

    initializeEventListeners() {
        this.toggleButton.addEventListener('click', () => this.toggleChatbot());
        this.closeButton.addEventListener('click', () => this.toggleChatbot());
        this.input.addEventListener('keypress', (e) => this.handleKeyPress(e));
        document.getElementById('send-message').addEventListener('click', () => this.sendMessage());
    }

    toggleChatbot() {
        this.container.classList.toggle('active');
        this.input.focus();
    }

    addMessage(message, isBot = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isBot ? 'bot-message' : 'user-message'}`;
        messageDiv.textContent = message;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addInitialMessage() {
        this.addMessage('Hi there! I\'m here to assist you with any questions about AI, data analysis, or machine learning. How can I help you today?', true);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && this.input.value.trim()) {
            this.sendMessage();
        }
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        this.addMessage(message);
        this.input.value = '';

        try {
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    webhookData: {
                        body: {
                            message: message,
                            user_id: 'website_user',
                            channel: 'website',
                            timestamp: new Date().toISOString()
                        }
                    }
                })
            });

            const data = await response.json();
            
            // Handle different response formats
            let botResponse = '';
            if (data.webhookData && data.webhookData.body && data.webhookData.body.message) {
                botResponse = data.webhookData.body.message;
            } else if (data.message) {
                botResponse = data.message;
            } else if (data.response) {
                botResponse = data.response;
            } else {
                botResponse = 'Sorry, I encountered an error. Please try again.';
            }

            this.addMessage(botResponse, true);
        } catch (error) {
            console.error('Error:', error);
            this.addMessage('Sorry, I encountered an error. Please try again.', true);
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
