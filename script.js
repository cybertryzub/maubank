// Firebase configuration (Replace these values with your Firebase configuration details)
const firebaseConfig = {
    apiKey: "AIzaSyCRJ5zmvwDGN3ppkFVd3kR9b5awnqxUNR0",
    authDomain: "maubank-bfbad.firebaseapp.com",
    projectId: "maubank-bfbad",
    storageBucket: "maubank-bfbad.firebasestorage.app   ",
    messagingSenderId: "251288732224",
    appId: "1:251288732224:web:1adca2f3cb7c6f833295a5",
    measurementId: "G-PPH2L7GZ77"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    if (email) {
        // Store email in Firestore
        db.collection("emails").add({
            email: email,
            timestamp: new Date()
        })
        .then(() => {
            // Hide form and show success message
            document.getElementById('form-container').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert("There was an error submitting your email. Please try again.");
        });
    }
});
