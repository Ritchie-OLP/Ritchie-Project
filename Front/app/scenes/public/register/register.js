import { navigateTo } from '../../../Router';
import { formValidator } from '../../../helpers';
import style from './register.css';
import riwiLogo from '../../../assets/images/riwi-logo.png';

export async function RegisterPage() {
    const root = document.getElementById('root');

    root.innerHTML = `
    <form id="loginForm" class="${style.form}">
      <figure class="${style.login_logo}">
        <img src="${riwiLogo}" alt="Riwi Logo">
      </figure>
      <div class="${style.form_container}">
        <h2><span>S</span>ign <span>U</span>p</h2>
        <div class="${style.form_fields}">
          <label for="username" class="${style.label}">Username:</label>
          <input type="text" id="username" name="username" autocomplete="username" class="${style['input-username']}">
        </div>
        <div class="${style.form_fields}">
          <label for="email" class="${style.label}">Email:</label>
          <input type="text" id="email" name="email" autocomplete="email" class="${style['input-email']}">
        </div>
        <div class="${style.form_fields}">
          <label for="password" class="${style.label}">Password:</label>
          <input type="password" id="password" name="password" autocomplete="current-password" class="${style['input-password']}">
        </div>
        <button type="submit" class="${style['button-send']}">Signup</button>
      </div>
      <p class="${style.signup_link}">Already have an account? <a href="/login">Sign in</a></p>
    </form>
    `;

    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // previene el comportamiento por default que es, recargar la pagina
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;

        if (!formValidator(email, password, username)) {
            alert('Please fill in all fields');
            return;
        }
        const response = await register(username, email, password);
        if (response) {
            navigateTo('/login');
        } else {
            alert('A problem occurred during account creation');
        }
    });
}

async function register(username, email, password) {
    try {
        const response = await fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}