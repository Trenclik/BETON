<script lang="ts">
  import StylingPage from "$lib/Components/Styling-page.svelte";
</script>

<StylingPage />

<main>
  <div class="NewPasswordContainer">
    <div class="Text">
      <h1>Resetování hesla</h1>
      <p>Zadejte svou emailovou adresu</p>
    </div>

    <input type="Email" placeholder="Email" />
    <button>Pokračovat</button>
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
        margin-bottom: 170px;
    }

    input::placeholder {
        text-align: center;
    }
    
    button {
        background: #1e8a25;
        color: white;
        width: 200px;
        height: 40px;
        font-size: 18px;
        border: none;
        border-radius: 5px;
    }
</style>
