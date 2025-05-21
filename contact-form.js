document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const statusDiv = document.createElement('div');
    statusDiv.id = 'form-status';
    contactForm.appendChild(statusDiv);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            statusDiv.textContent = 'Sending...';
            statusDiv.className = 'status-sending';

            const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer YOUR_SENDGRID_API_KEY',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personalizations: [
                        {
                            to: [{ email: 'jmcloudpro@gmail.com' }],
                            subject: `New Contact Form Submission from ${data.name}`
                        }
                    ],
                    from: { email: 'noreply@jmcloudpro.com' },
                    content: [
                        {
                            type: 'text/plain',
                            value: `New contact form submission:

Name: ${data.name}
Email: ${data.email}
Message: ${data.message}

Sent from: ${window.location.href}`
                        }
                    ]
                })
            });

            if (response.ok) {
                statusDiv.textContent = 'Message sent successfully!';
                statusDiv.className = 'status-success';
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            statusDiv.textContent = 'Failed to send message. Please try again.';
            statusDiv.className = 'status-error';
        }
    });
});
