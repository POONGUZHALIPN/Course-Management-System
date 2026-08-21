document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const alertBox = document.getElementById('loginAlert');
    const submitBtn = document.getElementById('loginSubmit');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideInlineAlert(alertBox);

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        setButtonLoading(submitBtn, true, 'Logging in...');
        try {
            await apiRequest('/login', { method: 'POST', body: { email, password } });
            showToast('Login successful! Redirecting…', 'success');
            setTimeout(() => { window.location.href = 'student-dashboard.html'; }, 500);
        } catch (err) {
            showInlineAlert(alertBox, err.message, 'error');
            setButtonLoading(submitBtn, false);
        }
    });
});
