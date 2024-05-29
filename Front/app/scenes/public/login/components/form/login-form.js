import { navigateTo } from '../../../../../Router.js';
import { formValidator } from '../../../../../helpers';
import style from './login-form.css';
import riwiLogo from '../../../../../assets/images/riwi-logo.png';

export async function LoginFormComponent() {
  const root = document.getElementById('root');

  root.innerHTML = `
  <div class="${style.login_container}">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <form id="loginForm" class="${style.form}">
      <figure class="${style.login_logo}">
        <img src="${riwiLogo}" alt="Riwi Logo">
      </figure>
      <div class="${style.form_container}">
        <h2><span>S</span>ign <span>I</span>n</h2>
        <div class="${style.form_fields}">
          <label for="email" class="${style.label}">Email:</label>
          <input type="text" id="email" name="email" autocomplete="email" class="${style['input-email']}">
        </div>
        <div class="${style.form_fields}">
          <label for="password" class="${style.label}">Password:</label>
          <input type="password" id="password" name="password" autocomplete="current-password" class="${style['input-password']}">
        </div>
        <button type="submit" class="${style['button-send']}">Login</button>
      </div>
      <p class="${style.signup_link}">Don't have an account? <a href="/register">Sign up</a></p>
    </form>
</div>
    `;
  
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // previene el comportamiento por default que es, recargar la pagina
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(!formValidator(email, password)){
      alert('Please fill in all fields');
      return;
    }
    const logdata = await login(email, password);
    if (logdata) {
      const token = logdata.token;
      const user = logdata.user;
      console.log(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigateTo('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  });
}

async function login(email, password) {
  try {
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
}
