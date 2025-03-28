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
        class="UserName"
        type="text"
        placeholder="Uživatelské jméno"
        bind:value={usernameOrEmail}
      />
      <div class="password-container">
        <input
          class="Password"
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
      <div class="Register">
        <p>Ještě nemáte účet? <a href="./Register">Zaregistrovat se</a></p>
      </div>
    </form>
  </div>
</main>

<style>
  /* Zarovnání formuláře doprostřed */
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
    gap: 10px;
    width: 100%;
    max-width: 320px;
    padding: 20px;
    border-radius: 25px;
  }

  /* Vstupní pole */
  input {
    width: 73%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    font-size: 1rem;
    padding-right: 50px;
  }

  .password-container {
		display: flex;
		align-items: center;
		position: relative;
		width: 307px;
	}

  input::placeholder {
    text-align: center;
    margin-left: -50px;
    margin-right: 0;
  }

  /* Ikona pro zobrazení hesla */
  :global(.show-hide-icon) {
    position: absolute;
    right: -2px;
    top: 11px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  /* Odkaz Zapomenuté heslo */
  .ForgetPass {
    align-self: flex-end;
    margin-right: 5%;
    font-size: 0.8rem;
    color: #28a745;
    font-weight: bold;
    text-decoration: none;
  }

  .ForgetPass:hover {
    text-decoration: underline;
  }

  /* Tlačítko Přihlásit se */
  button {
    width: 85%;
    padding: 12px;
    border-radius: 20px;
    background-color: #28a745;
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  button:hover {
    background-color: #218838;
  }

  /* Text pod formulářem */
  .LoginSection div p {
    font-size: 0.9rem;
    color: white;
    text-align: center;
  }

  /* Odkaz na registraci */
  .LoginSection div p a {
    color: #28a745;
    font-weight: bold;
    text-decoration: none;
  }

  .LoginSection div p a:hover {
    text-decoration: underline;
  }

  /* Chybová zpráva */
  .error {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }

  /* Úspěšná zpráva */
  .success {
    color: #28a745;
    font-size: 0.9rem;
    text-align: center;
  }


</style>
