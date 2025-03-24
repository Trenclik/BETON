<script lang="ts">
  import { integer } from "drizzle-orm/sqlite-core";
  import StylingPage from "$lib/Components/Styling-page.svelte";

  let code = ["", "", "", ""]; // Pole pro ukládání hodnot inputů

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
</script>

<StylingPage />

<main>
  <div class="VerifyContainer">
    <h1>Ověřovací kód</h1>
    <p>Prosím zadejte ověřovací kód,<br /> 
        který jsme vám poslali na email</p>

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
    <a href="#"><strong>Poslat kód znovu</strong></a>
    <button>Ověrit</button>
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
    height: 500px;
  }

  h1 {
    font-size: 24px;
    margin: 0;
  }

  p{
    font-size: 20px;
  }

  a{
    color: #1E8A25;
  }

  button{
    background: #1E8A25;
    color: white;
    width: 200px;
    height: 30px;
  }

  .code-inputs {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .code-inputs input {
    width: 40px;
    height: 40px;
    font-size: 24px;
    text-align: center;
    border: none;
    border-radius: 5px;
    outline: none;
  }
</style>
