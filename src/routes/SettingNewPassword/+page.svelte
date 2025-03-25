<script lang="ts">
    import StylingPage from "$lib/Components/Styling-page.svelte";
    import ShowHideButton from "$lib/Components/ShowHideButton.svelte";
  
    let password = $state("");
    let confirmPassword = $state("");
    let showErrors = $state(false);
    let submitted = $state(false);
  
    // Jednodušší kontrola přímo v handleReset
    function passwordsMatch() {
      return password.trim() && confirmPassword.trim() && password === confirmPassword;
    }
  
    function handleReset() {
      showErrors = true;
      submitted = true;
      if (!passwordsMatch()) return;
      // Tady přidat logiku pro odeslání nového hesla na server
      console.log("Heslo úspěšně změněno!");
    }
  </script>
  
  <StylingPage />
  
  <main>
    <div class="NewPasswordSection">
      <h1>Obnova hesla</h1>
      <form onsubmit={e => { e.preventDefault(); handleReset(); }}>
        <div class="Password">
            <label for="password">Nové heslo</label>
            <ShowHideButton bind:value={password} bind:submitted={submitted} name="password" />
        </div>
        <div class="ConfirmPassword">
            <label for="confirmPassword">Potvrzení hesla</label>
            <ShowHideButton bind:value={confirmPassword} bind:submitted={submitted} name="confirm" />
        </div>
        {#if showErrors && !passwordsMatch()}
          <p class="error-message">Hesla se neshodují!</p>
        {/if}
  
        <button type="submit" disabled={!passwordsMatch()}>Obnovit heslo</button>
      </form>
    </div>
  </main>
  
  <style>
.NewPasswordSection {
    text-align: center;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 675px;
}

h1 {
    font-size: 24px;
    margin-bottom: 40px;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
}

label {
    font-size: 20px;
    font-weight: bold;
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
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.error-message {
    color: red;
    font-size: 18px;
    margin-top: -30px;

}

  </style>
  