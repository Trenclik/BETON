<script lang="ts">
    import StylingPage from "$lib/Components/Styling-page.svelte";

</script>

<StylingPage />

<main>
  <div class="SuccessfulSection">
    <div class="Text">
      <h1>Uspěsný !</h1>
      <p>Váš účet byl vytvořen</p>
    </div>
    <img class="Succesful" src="./Succesful.svg" alt="" />
    <button>Pokračovat</button>
  </div>
</main>


<style>
    .SuccessfulSection {
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

    .Succesful{
        width: 125px;
        height: 200px;
        margin-bottom: 20px;
    }
    
    h1 {
        font-size: 24px;
        margin-bottom: 10px;
    }
    
    p {
        font-size: 20px;
        margin-bottom: 20px;
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
</style>