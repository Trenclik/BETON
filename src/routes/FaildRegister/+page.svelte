<script lang="ts">
  import StylingPage from "$lib/Components/Styling-page.svelte";

  function goBackTohome() {
    window.location.href = "/";
}
</script>

<StylingPage />

<main>
  <div class="FaildSection">
    <div class="Text">
      <h1>Něco se pokazilo!</h1>
      <p>
        Něco se nepovedlo při registraci,<br />
        zkuste to prosím znovu později <br /> nebo napište na podporu
      </p>
    </div>
    <img src="./Faild.png" alt="" />
    <button onclick="{goBackTohome}">Zpět</button>
  </div>
</main>

<style>
  .FaildSection {
    text-align: center;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 715px;
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

  img {
    width: 140px;
    height: 140px;
    margin-bottom: 0;
  }

  button {
    background: #1e8a25;
    color: white;
    width: 200px;
    height: 40px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    margin-top: 55px;
    cursor: pointer;
  }
</style>
