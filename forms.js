document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const recaptchaResponse = grecaptcha.getResponse();

    if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
    }
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        alert('Please enter a valid email address.');
        return;
    }
    if (!recaptchaResponse) {
        alert('Please complete the reCAPTCHA.');
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('g-recaptcha-response', recaptchaResponse);

    fetch('https://formspree.io/f/mwplrldr', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block';
            document.getElementById('contact-form').reset();
            grecaptcha.reset();
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        } else {
            return response.text().then(text => { throw new Error(`Failed to send: ${response.status} - ${text}`); });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message: ' + error.message);
    });
});