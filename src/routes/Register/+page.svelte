<script lang="ts">
  import ShowHideButton from "$lib/Components/ShowHideButton.svelte";
  import StylingPage from "$lib/Components/Styling-page.svelte";

  let password = $state("");
  let confirmPassword = $state("");
  let username = $state("");
  let email = $state("");
  let showErrors = $state(false);
  let submitted = $state(false); // Stav pro odeslání formuláře

  let usernameError = $derived.by(() =>
    showErrors && !username.trim() ? "Toto pole musí být vyplněno" : ""
  );

  let emailError = $derived.by(() => {
    if (!showErrors) return "";
    if (!email.trim()) return "Email je povinný!";
    if (!email.match(/.+@.+\..+/)) {
      return "Neplatný email!";
    }
    return "";
  });

  function handleLogin() {
    showErrors = true; // Teď se zobrazí chybové zprávy
    submitted = true; // Nastavíme, že formulář byl odeslán
    if (!username.trim() || !email.trim()) return;
  }
</script>

<StylingPage />
<main>
  <div class="register-section">
    <div class="inputs">
      <input type="text" placeholder="Uživatelské jméno" bind:value={username} />
      {#if usernameError}
        <p class="error-message">{usernameError}</p>
      {/if}

      <input type="email" placeholder="Email" bind:value={email} />
      {#if emailError}
        <p class="error-message">{emailError}</p>
      {/if}

      <ShowHideButton bind:value={password} bind:submitted={submitted} name="password" />
      <ShowHideButton bind:value={confirmPassword} bind:submitted={submitted} name="confirm" />

      {#if password && confirmPassword && password !== confirmPassword}
        <p class="error-message">Hesla se neshodují!</p>
      {/if}

      <div class="checkingForAgreement">
        <input type="checkbox" id="souhlas" name="souhlas" />
        <label for="souhlas">Souhlas s <strong>podmínkami</strong></label>
      </div>
    </div>
    <button class="register-button" onclick={handleLogin}>Registrovat se</button
    >
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .register-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 400px;
  }

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
    margin-bottom: -8px;
  }

  input {
    height: 30px;
    padding: 8px;
    border-radius: 8px;
    border: none;
    font-size: 18px;
    background: #ffffff;
    color: #000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  input::placeholder {
    text-align: center;
    font-size: 18px;
  }

  .checkingForAgreement {
    margin-left: 25px;
    font-size: 14px;
    font-weight: bold;
    color: white; /* Barva běžného textu */
  }

  .checkingForAgreement input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: green; /* Barva checkboxu */
  }

  .checkingForAgreement label {
    color: white;
  }

  .checkingForAgreement label strong {
    color: green; /* Zelená barva pro důležitou část textu */
  }

  .checkingForAgreement {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }

  /* === Registrovací tlačítko === */
  .register-button {
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
  }

  .register-button:hover {
    background: #006600;
  }

  /* === Responzivní design === */
  @media (max-width: 500px) {
    .register-section {
      width: 90%;
    }

    .checkingForAgreement {
      margin-left: 55px;
    }
    input {
      font-size: 16px;
    }
    .register-button {
      font-size: 16px;
    }
  }
</style>
