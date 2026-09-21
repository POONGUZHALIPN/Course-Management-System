/* LearnSphere — shared front-end utilities (fetch wrapper, toasts, helpers) */

const API_BASE = '/api';

async function apiRequest(path, options = {}) {
    const res = await fetch(API_BASE + path, {
        method: options.method || 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: options.body ? JSON.stringify(options.body) : undefined
    });

    let data = null;
    try { data = await res.json(); } catch (e) { /* no body */ }

    if (!res.ok) {
        const message = (data && data.error) || `Request failed (${res.status})`;
        const err = new Error(message);
        err.status = res.status;
        throw err;
    }
    return data;
}

// ---------------------------------------------------------------------------
// Toast notifications
// ---------------------------------------------------------------------------
function ensureToastStack() {
    let stack = document.querySelector('.toast-stack');
    if (!stack) {
        stack = document.createElement('div');
        stack.className = 'toast-stack';
        document.body.appendChild(stack);
    }
    return stack;
}

function showToast(message, type = 'success') {
    const stack = ensureToastStack();
    const item = document.createElement('div');
    item.className = `toast-item ${type}`;
    const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill';
    item.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
    stack.appendChild(item);
    setTimeout(() => {
        item.style.transition = 'opacity .3s, transform .3s';
        item.style.opacity = '0';
        item.style.transform = 'translateX(30px)';
        setTimeout(() => item.remove(), 300);
    }, 3200);
}

// ---------------------------------------------------------------------------
// Inline alert banner (used inside auth cards for form-level errors)
// ---------------------------------------------------------------------------
function showInlineAlert(el, message, type = 'error') {
    if (!el) return;
    el.textContent = message;
    el.className = `alert-inline ${type} show`;
}
function hideInlineAlert(el) {
    if (!el) return;
    el.className = 'alert-inline';
}

// ---------------------------------------------------------------------------
// Button loading state
// ---------------------------------------------------------------------------
function setButtonLoading(btn, loading, loadingText = 'Please wait...') {
    if (!btn) return;
    if (loading) {
        btn.dataset.originalHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${loadingText}`;
    } else {
        btn.disabled = false;
        if (btn.dataset.originalHtml) btn.innerHTML = btn.dataset.originalHtml;
    }
}

// ---------------------------------------------------------------------------
// Logout — wire up any element with [data-logout]
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-logout]').forEach(el => {
        el.addEventListener('click', async (e) => {
            e.preventDefault();
            try { await apiRequest('/logout', { method: 'POST' }); } catch (err) { /* ignore */ }
            window.location.href = el.dataset.logoutRedirect || '../index.html';
        });
    });
});
