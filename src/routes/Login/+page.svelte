<script lang="ts">
    import ShowHideButton from "$lib/Components/ShowHideButton.svelte";
  </script>
  
  <main>
    <div class="login-page">
      <h1><span class="concretum-light">Co<span class="concretum-bold">n</span>cret<span class="concretum-bold">u</span>m</span></h1>
  
      <div class="login-section">
        <div class="inputs">
          <input class="username" type="text" placeholder="Username" />
          <ShowHideButton />
        </div>
        <a class="forgot-pass" href="./ForgetPassword">Forgot Password</a>
        <button class="login-button">Login</button>
        <div class="register-section">
          <p>Don't have an account?</p>
          <a class="register" href="./Register">Sign Up</a>
        </div>
      </div>
    </div>
  </main>
  
  <style>
    /* === Celá stránka === */
    main {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: #2e2e2e; /* Tmavě šedé pozadí */
      padding: 15px;
    }
  
    /* === Kontejner login stránky === */
    .login-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  
    /* === Sekce pro přihlašování === */
    .login-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #3f3f3f; /* Správná tmavší barva */
      padding: 30px;
      border-radius: 15px;
      width: 90%;
      max-width: 360px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    }
  
    /* === Název aplikace === */
    h1 {
      font-size: 28px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }
  
    .concretum-light {
      color: rgba(255, 255, 255, 0.7); /* Světle šedá */
    }
  
    .concretum-bold {
      color: #b75e29; /* Oranžová část názvu */
    }
  
    /* === Vstupní pole === */
    .inputs {
      width: 100%;
    }
  
    input {
      width: 100%;
      height: 45px;
      padding: 10px;
      border-radius: 8px;
      border: none;
      font-size: 16px;
      text-align: center;
      background: #ffffff; /* Bílé vstupní pole */
      color: #000; /* Černý text */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      margin-bottom: 15px;
    }
  
    input::placeholder {
      font-size: 16px;
      color: #888;
    }
  
    /* === Zapomenuté heslo === */
    .forgot-pass {
      font-size: 14px;
      color: #00a000; /* Zelená barva */
      text-decoration: none;
      margin-bottom: 20px;
      font-weight: bold;
    }
  
    .forgot-pass:hover {
      text-decoration: underline;
    }
  
    /* === Přihlašovací tlačítko === */
    .login-button {
      width: 100%;
      height: 50px;
      background: #008000; /* Tmavě zelená */
      color: white;
      font-size: 18px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s ease-in-out;
    }
  
    .login-button:hover {
      background: #006600;
    }
  
    /* === Sekce registrace === */
    .register-section {
      margin-top: 20px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      display: flex;
      gap: 5px;
    }
  
    .register {
      color: #00a000; /* Zelená */
      font-weight: bold;
      text-decoration: none;
    }
  
    .register:hover {
      text-decoration: underline;
    }
  
    /* === Responzivita pro menší obrazovky === */
    @media (max-width: 420px) {
      .login-section {
        width: 95%;
        padding: 20px;
      }
  
      input {
        height: 40px;
        font-size: 14px;
      }
  
      .login-button {
        height: 45px;
        font-size: 16px;
      }
    }
  </style>
  