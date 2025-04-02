document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
    }

    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    document.getElementById('name').value = sanitizeInput(name);
    document.getElementById('email').value = sanitizeInput(email);
    document.getElementById('message').value = sanitizeInput(message);

    console.log('Form submitting...'); 
    this.submit();
});