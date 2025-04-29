<script lang="ts">
  import { integer } from "drizzle-orm/sqlite-core";
  import StylingPage from "$lib/Components/Styling-page.svelte";

  let code = $state(["", "", "", ""]);
  let error = $state("");

  function handleInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ""); // Odstraní vše kromě číslic

    code[index] = value;

    // Automatický přesun na další input, pokud je zadán znak
    if (value && index < code.length - 1) {
      (
        document.getElementById(`input-${index + 1}`) as HTMLInputElement
      )?.focus();
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent) {
    if (event.key === "Backspace" && index > 0 && !code[index]) {
      (
        document.getElementById(`input-${index - 1}`) as HTMLInputElement
      )?.focus();
    }
  }

  function handleVerify() {
    const isEmpty = code.some((digit) => digit === "");
    const joined = code.join("");

    if (isEmpty) {
      error = "Vyplňte prosím políčka";
    } else if (!/^\d{4}$/.test(joined)) {
      error = "Nesprávné kód";
    } else {
      error = "";
      // Tady můžeš přidat logiku pro správný kód
      console.log("Kód je správný:", joined);
    }
  }
</script>

<StylingPage />

<main>
  <div class="VerifyContainer">
    <div class="Text">
      <h1>Ověřovací kód</h1>
      <p>
        Prosím zadejte ověřovací kód,<br />
        který jsme vám poslali na email
      </p>
    </div>
    <div class="code-inputs">
      {#each code as digit, i}
        <input
          id="input-{i}"
          type="text"
          bind:value={code[i]}
          maxlength="1"
          pattern="[0-9]"
          inputmode="numeric"
          oninput={(e) => handleInput(i, e)}
          onkeydown={(e) => handleKeyDown(i, e)}
        />
      {/each}
    </div>
    <a href="/"><strong>Poslat kód znovu</strong></a>
    <button onclick={handleVerify}>Ověřit</button>
    {#if error}
      <p style="color: red; margin-top: 10px;">{error}</p>
    {/if}
  </div>
</main>

<style>
  .VerifyContainer {
    text-align: center;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 650px;
  }

  .Text {
    margin-bottom: 20px; /* Větší mezera mezi textem a inputy */
  }

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .code-inputs {
    display: flex;
    justify-content: center;
    gap: 15px; /* Větší mezery mezi inputy */
    margin-bottom: 20px; /* Větší mezera mezi inputy a odkazem */
  }

  .code-inputs input {
    width: 50px;
    height: 50px;
    font-size: 24px;
    text-align: center;
    border: none;
    border-radius: 5px;
    outline: none;
  }

  a {
    color: #1e8a25;
    margin-bottom: 20px; /* Přidána mezera mezi odkazem a tlačítkem */
    display: inline-block;
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

  button:hover {
    background: #16661c;
  }
</style>
