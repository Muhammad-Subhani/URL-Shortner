const loginForm = document.getElementById('login-form');
if(loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // 1. Gather data from inputs
        // 2. Fetch to your /login backend endpoint
        // 3. Store the returned Token (JWT) in localStorage
        // 4. Redirect: window.location.href = 'index.html';
        alert("Logged in successfully! (Replace with your API call)");
    });
}