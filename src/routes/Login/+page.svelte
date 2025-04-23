<script lang="ts">
  import { text } from "drizzle-orm/sqlite-core";
  import ShowHideButton from "$lib/Components/ShowHideButton.svelte";
  import StylingPage from "$lib/Components/Styling-page.svelte";

  let usernameOrEmail = $state("");
  let password = $state("");
  let errorMessage = $state("");
  let successMessage = $state("");
  let passwordVisible = $state(false);
  

  function validateForm() {
    if (!usernameOrEmail || !password) {
      errorMessage = "Všechna pole musí být vyplněna";
      return false;
    }
    return true;
  }

  async function login(event: Event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/login?/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ usernameOrEmail, password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Přihlášení selhalo");

      // ✅ Označ uživatele jako registrovaného
      localStorage.setItem("isRegistered", "true");

      successMessage = "Přihlášení úspěšné!";
      errorMessage = "";

      // ✅ Přesměruj uživatele na hlavní stránku
      location.href = "/";
    } catch (error) {
      errorMessage = (error as Error).message;
    }
  }
</script>

<StylingPage />
<main>
  <div class="Login-Section">
    <input
      class="UserName"
      type="text"
      placeholder="Uživatelské jméno"
      bind:value={usernameOrEmail}
    />
    <div class="PasswordContainer">
      <input
        class="Password"
        type={passwordVisible ? "text" : "password"}
        placeholder="Heslo"
        bind:value={password}
      />
      <ShowHideButton bind:visible={passwordVisible} class="show-hide-icon" />
    </div>
    <div class="ForgetPassword">
      <a href="./ForgetPassword"><strong>Zapomenuté heslo</strong></a>
    </div>

    <button type="submit" onclick={login}>
      <strong>Přihlásit se</strong>
    </button>

    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}

    {#if successMessage}
      <p class="success">{successMessage}</p>
    {/if}
  </div>

  <div class="Register-Container">
    <p>Nematé učet? <a href="./Register">Registrovat se</a></p>
  </div>
</main>

<style>
  .Login-Section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 664px;
  }

  .PasswordContainer {
    margin: 0;
    margin-top: 20px;
  }

  .Login-Section input {
    margin: 0;
    height: 40px;
    border-radius: 7px;
    box-shadow: none;
    border: none;
    font-size: 15px;
  }

  input::placeholder {
    text-align: center;
    font-size: 15px;
  }

  .UserName {
    width: 280px;
  }

  .Password {
    width: 233px;
    padding-right: 50px;
  }

  .Password::placeholder {
    padding-left: 50px;
  }

  .error {
    color: red;
    margin-top: 10px;
    font-size: 14px;
  }

  .success {
    color: #1e8a25;
    margin-top: 10px;
    font-size: 14px;
  }

  a {
    color: rgba(30, 138, 37, 1);
  }

  .ForgetPassword {
    margin: 0;
    margin-left: 155px;
    margin-top: 8px;
    margin-bottom: 45px;
  }

  button {
    margin: 0;
    width: 222px;
    height: 43px;
    background: rgba(30, 138, 37, 1);
    color: white;
    border-radius: 8px;
    box-shadow: none;
    border: none;
    font-size: 15px;
    cursor: pointer;
  }

  p {
    color: white;
  }

  .Register-Container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
  }

  @media (max-width: 1024px) {
    .Login-Section {
      height: 640px;
    }
    .Register-Container {
      margin-top: -90px;
    }
  }

  @media (max-width: 768px) {
    .Register-Container {
      margin-top: -85px;
    }
  }

  @media (max-width: 480px) {
    .Register-Container {
      margin-top: -125px;
    }
  }
</style>
