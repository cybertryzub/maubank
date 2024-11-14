document.getElementById('email-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    if (email) {
        try {
            const response = await fetch('/.netlify/functions/submitEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            const result = await response.json();
            if (response.ok) {
                document.getElementById('form-container').style.display = 'none';
                document.getElementById('success-message').style.display = 'block';
            } else {
                alert(result.message || 'Failed to submit email.');
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            alert('There was an error submitting your email. Please try again.');
        }
    }
});
