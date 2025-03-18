<script lang="ts">
  import ShowHideButton from "$lib/Components/ShowHideButton.svelte";

</script>

<main>
  <div class="login-page">
    <h1>
      <span class="concretum-light">Co<span class="concretum-bold">n</span>cret<span class="concretum-bold">u</span>m</span>
    </h1>

    <div class="login-section">
      <div class="inputs">
        <input class="username" type="text" placeholder="Username" />
        <ShowHideButton />
      </div>
      <div class="Forgot-Password">
        <a class="forgot-pass" href="./ForgetPassword">Forgot Password</a>
      </div>
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
  }

  /* === Kontejner login stránky === */
  .login-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(118, 101, 101, 0.45);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    width: 25%;
    height: 90%;
  }

  /* === Název aplikace === */
  h1 {
    font-size: 28px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
    margin-top: 0;
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
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 0;
  }

  input {
    height: 30px;
    padding: 8px;
    border-radius: 8px;
    border: none;
    font-size: 18px;
    background: #ffffff; /* Bílé vstupní pole */
    color: #000; /* Černý text */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  input::placeholder {
    text-align: center;
    align-items: center;
    font-size: 18px;
  }

  /* === Zapomenuté heslo === */
  .forgot-pass {
    font-size: 16px;
    color: #00a000; /* Zelená barva */
    text-decoration: none;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .Forgot-Password {
    margin-top: 10px;
    margin-bottom: 0;
    display: flex;
    justify-content: end;
  }

  .forgot-pass:hover {
    text-decoration: underline;
  }

  /* === Přihlašovací tlačítko === */
  .login-button {
    width: 100%;
    height: 50px;
    background: #008000;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    margin-top: 20px;
    margin-bottom: 0;
  }

  .login-button:hover {
    background: #006600;
  }

  /* === Sekce registrace === */
  .register-section {
    margin-top: 125px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
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
/* === Responzivita === */
@media (max-width: 768px) {
  .login-page {
    width: 50%;
    height: 100%;
    padding: 30px;
    border-radius: 0;
  }

  h1 {
    font-size: 24px;
  }

  .login-section {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .login-page {
    width: 100%;
    padding: 25px;
  }

  h1 {
    font-size: 22px;
  }

  .inputs {
    width: 100%;
  }

  input {
    font-size: 14px;
    padding: 10px;
  }

  .login-button {
    font-size: 16px;
    height: 45px;
  }

  .forgot-pass {
    font-size: 14px;
  }
}

</style>
