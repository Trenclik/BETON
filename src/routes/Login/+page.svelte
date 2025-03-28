<script lang="ts">
	import { text } from 'drizzle-orm/sqlite-core';
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

      successMessage = "Přihlášení úspěšné!";
      errorMessage = "";
    } catch (error) {
      errorMessage = (error as Error).message;
    }
  }
</script>

<StylingPage />
<main>
  <div class="LoginSection">
    <form onsubmit={login}>
      <input
        type="text"
        placeholder="Uživatelské jméno"
        bind:value={usernameOrEmail}
      />
      <div class="password-container">
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Heslo"
          bind:value={password}
        />
        <ShowHideButton bind:visible={passwordVisible} class="show-hide-icon" />
      </div>
      {#if errorMessage}
        <p class="error">{errorMessage}</p>
      {/if}
      {#if successMessage}
        <p class="success">{successMessage}</p>
      {/if}
      <a class="ForgetPass" href="./ForgetPassword">Zapomenuté heslo?</a>
      <button type="submit">Přihlásit se</button>
      <div>
        <p>Ještě nemáte účet? <a href="./Register">Zaregistrovat se</a></p>
      </div>
    </form>
  </div>
</main>

<style>
  /* Zarovnání formuláře doprostřed */
  /* Vycentrování celé sekce uvnitř okna */
  .LoginSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  /* Styl formuláře */
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
    max-width: 320px;
    padding: 20px;
  }

  /* Vstupní pole */
  input {
    width: 90%;
    padding: 15px;
    border-radius: 10px;
    border: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-size: 1.1rem;
  }

  input::placeholder {
    text-align: center;
  }

  .password-container input::placeholder{
    text-align: center;
    margin-left: -50px;
  }

  .password-container input {
    width: 75%;
    padding-right: 62px;
    white-space: nowrap; /* Zabraňuje zalamování textu */
    overflow: hidden; /* Skryje přetékající text */
  }

  /* Tlačítko přihlášení */
  button {
    width: 100%;
    padding: 15px;
    border-radius: 20px;
    background-color: #28a745;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .error {
    margin: 0;
    color: red;
  }

  button:hover {
    background-color: #218838;
  }

  /* Odkaz "Zapomenuté heslo" */
  a {
    font-size: 0.9rem;
    text-decoration: none;
    color: #28a745;
    font-weight: bold;
  }

  .ForgetPass{
    margin-left: 180px;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Ikona pro zobrazení hesla */
  .password-container :global(.show-hide-icon) {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  /* Kontejner pro pole hesla */
  .password-container {
    position: relative;
    width: 100%;
  }

  /* Text pod formulářem */
  .LoginSection div p {
    font-size: 0.9rem;
    color: white;
    text-align: center;
  }

  .LoginSection div p a {
    color: #28a745;
    font-weight: bold;
    text-decoration: none;
  }

  .LoginSection div p a:hover {
    text-decoration: underline;
  }
</style>
