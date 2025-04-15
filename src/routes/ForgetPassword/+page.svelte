<script lang="ts">
  import StylingPage from "$lib/Components/Styling-page.svelte";

  let email = $state("");
  let errorMessage = $state("");
  let successMessage = $state("");

  function validateEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleReset() {
    if (!email) {
      errorMessage = "Email musí být vyplněn.";
      successMessage = "";
      return;
    }

    if (!validateEmail(email)) {
      errorMessage = "Neplatný formát emailu.";
      successMessage = "";
      return;
    }

    try {
      const response = await fetch(
        "https://tvuj-backend.com/api/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Odeslání selhalo");

      successMessage = "Email pro reset hesla byl odeslán.";
      errorMessage = "";
    } catch (error) {
      errorMessage = (error as Error).message;
      successMessage = "";
    }
  }
</script>

<StylingPage />

<StylingPage />

<main>
  <div class="NewPasswordContainer">
    <div class="Text">
      <h1>Resetování hesla</h1>
      <p>Zadejte svou emailovou adresu</p>
    </div>

    <input type="email" placeholder="Email" bind:value={email} />
    <button onclick={handleReset}>Pokračovat</button>

    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}

    {#if successMessage}
      <p class="success">{successMessage}</p>
    {/if}
  </div>
</main>

<style>
  .NewPasswordContainer {
    text-align: center;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 700px;
  }

  .Text {
    margin-bottom: 6px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 20px;
    margin-bottom: 20px;
  }

  input {
    width: 278px;
    height: 40px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    margin-bottom: 125px;
  }

  input::placeholder {
    text-align: center;
  }

  .error {
    color: red;
    margin-top: 15px;
    font-size: 14px;
  }

  .success {
    color: #1e8a25;
    margin-top: 15px;
    font-size: 14px;
  }

  button {
    background: #1e8a25;
    color: white;
    width: 200px;
    height: 40px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background: #16661c; /* tmavší zelená */
  }
</style>
