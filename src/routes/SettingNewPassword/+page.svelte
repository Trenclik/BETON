<script lang="ts">
  import StylingPage from "$lib/Components/Styling-page.svelte";
  import ShowHideButton from "$lib/Components/ShowHideButton.svelte";

  let password = $state("");
  let confirmPassword = $state("");
  let errorMessage = $state("");
  let successMessage = $state("");
  let passwordVisible = $state(false);
  let confirmPasswordVisible = $state(false);

  function validateForm() {
    if (!password || !confirmPassword) {
      errorMessage = "Všechna pole musí být vyplněna.";
      return false;
    }
    if (password.length < 8) {
      errorMessage = "Heslo musí mít alespoň 8 znaků.";
      return false;
    }
    if (password !== confirmPassword) {
      errorMessage = "Hesla se neshodují.";
      return false;
    }
    errorMessage = "";
    return true;
  }

  async function resetPassword(event: Event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Obnova hesla selhala");

      successMessage = "Heslo bylo úspěšně změněno!";
    } catch (error) {
      errorMessage = (error as Error).message;
    }
  }
</script>

<StylingPage />

<main>
  <div class="PasswordReset-Section">
    <h1>Obnova hesla</h1>
    <form onsubmit={resetPassword}>
      <div class="PasswordContainer">
        <label for="password">Nové heslo</label>
        <input
          type={passwordVisible ? "text" : "password"}
          bind:value={password}
          placeholder="Nové heslo"
        />
        <ShowHideButton bind:visible={passwordVisible} class="show-hide-icon" />
      </div>

      <div class="PasswordContainer">
        <label for="confirmPassword">Potvrzení hesla</label>
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          bind:value={confirmPassword}
          placeholder="Potvrzení hesla"
        />
        <ShowHideButton
          bind:visible={confirmPasswordVisible}
          class="show-hide-icon"
        />
      </div>
      {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}
      {#if successMessage}
        <p class="success-message">{successMessage}</p>
      {/if}

      <button type="submit"><strong>Obnovit heslo</strong></button>
    </form>
  </div>
</main>

<style>
  .PasswordReset-Section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 675px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: white;
  }

  label {
    font-size: 18px;
    margin-bottom: 5px;
    color: white;
  }

  .PasswordContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  }

  .PasswordContainer input {
    height: 40px;
    width: 280px;
    border-radius: 7px;
    border: none;
    font-size: 15px;
    text-align: center;
  }

  button {
    width: 222px;
    height: 43px;
    background: rgba(30, 138, 37, 1);
    color: white;
    border-radius: 8px;
    border: none;
    font-size: 15px;
    cursor: pointer;
  }

  button:hover {
    background: rgba(20, 120, 30, 1);
  }

  .error-message {
    color: red;
    font-size: 16px;
  }

  .success-message {
    color: green;
    font-size: 16px;
  }
</style>
