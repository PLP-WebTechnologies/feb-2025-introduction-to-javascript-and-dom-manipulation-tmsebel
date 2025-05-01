document.getElementById('contact-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission
    const dynamicText = document.getElementById('dynamic-text');
    dynamicText.textContent = 'Submitting your message...';
    const form = event.target;
    const formMessage = document.getElementById('form-message');
    const cellInput = document.getElementById('cell').value;

    // Basic validation for cell number (numeric and reasonable length)
    const cellRegex = /^\d{10,15}$/;
    if (!cellRegex.test(cellInput)) {
        formMessage.textContent = 'Please enter a valid cell number (10-15 digits).';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        return;
    }
    // Modify CSS styles dynamically
    dynamicText.style.color = 'blue';
    dynamicText.style.fontSize = '18px';
    dynamicText.style.fontWeight = 'bold';
    dynamicText.style.marginTop = '10px';
    // Prepare form data
    const formData = new FormData(form);
    // Add or remove an element when a button is clicked
    const toggleButton = document.getElementById('toggle-element-button');
    toggleButton.addEventListener('click', function () {
        const dynamicElement = document.getElementById('dynamic-element');
        if (dynamicElement) {
            dynamicElement.remove(); // Remove the element if it exists
        } else {
            const newElement = document.createElement('div');
            newElement.id = 'dynamic-element';
            newElement.textContent = 'This is a dynamically added element.';
            newElement.style.marginTop = '10px';
            newElement.style.color = 'green';
            form.appendChild(newElement); // Add the new element to the form
        }
    });
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            form.reset(); // Clear the form
        } else {
            throw new Error('Failed to send message.');
        }
    } catch (error) {
        formMessage.textContent = 'Error sending message. Please try again later.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
    }
});