<script lang="ts">
  import ShowHideButton from "$lib/Components/ShowHideButton.svelte";
  import StylingPage from "$lib/Components/Styling-page.svelte";

  let Username = $state("");
  let errorMessage = $state("");

  function validate() {
    if (Username === "") {
      errorMessage = "Toto pole musí být vyplněno";
    } else {
      errorMessage = "";
    }
  }
</script>

<StylingPage />

<main>
  <div class="login-section">
    <div class="inputs">
      <input class="username" type="text" placeholder="Username" bind:value={Username} onblur={validate}/>
      {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}
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
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .login-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 400px;
  }
  /* === Vstupní pole === */
  .inputs {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 0;
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-top: -10px;
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
    display: flex;
    justify-content: end;
    font-size: 16px;
    color: #00a000; /* Zelená barva */
    text-decoration: none;
    margin-bottom: 20px;
    font-weight: bold;
    margin-right: 30px;

  }

  .Forgot-Password {
    width: 80%; /* Stejná šířka jako .inputs a .login-button */
    display: flex;
    justify-content: end;
    align-self: flex-end; /* Posunutí doprava */
    margin-top: 10px;
  }

  .forgot-pass:hover {
    text-decoration: underline;
  }

  /* === Přihlašovací tlačítko === */
  .login-button {
    width: 80%;
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
</style>
