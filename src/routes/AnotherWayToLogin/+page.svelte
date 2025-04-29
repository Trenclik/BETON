<script lang="ts">
  import StylingPage from "$lib/Components/Styling-page.svelte";

  let handleMicrosoftLogin = () => {
    window.location.href = "/auth/microsoft";
  };
</script>

<StylingPage />

<main>
  <div class="AnotherWayToAnything">
    <h1>Další způsoby jak se přihlásit</h1>
    <div class="Link-For-Another-LoginorRegister">
      <button onclick={handleMicrosoftLogin}>
        <img src="/Microsoft_Logo_512px.png" alt="Microsoft logo" />
        <span>Přihlásit se přes Microsoft</span>
      </button>
    </div>
    <div class="Normal-Login">
      <a href="./Login"><strong>Přihlásit se</strong></a>
      <a href="./Register"><strong>Registruj se</strong></a>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 700px;
    padding: 20px;
  }

  .AnotherWayToAnything {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 100px;
  }

  h1 {
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 80px;
    color: rgb(202, 200, 201);
    text-align: center;
  }

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #0078d4;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    transition:
      background-color 0.3s,
      transform 0.2s;
  }

  button:hover {
    background-color: #005a9e;
    transform: translateY(-2px);
  }

  button img {
    width: 24px;
    height: 24px;
  }

  .Normal-Login {
    display: flex;
    gap: 20px;
    margin-top: 60px;
  }

  .Normal-Login a {
    text-decoration: none;
    color: rgb(30, 138, 37);
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s;
    margin-top: 150px;
  }

  .Link-For-Another-LoginorRegister {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 110px;
  }

  @media (max-width: 767px) {
    main {
        height: 600px;
    }
    h1 {
      text-align: center;
      font-size: 22px;
      margin-bottom: 40px;
    }

    .Normal-Login {
      justify-content: center;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      margin-top: 40px;
    }

    .Normal-Login a {
      text-align: center;
      font-size: 14px;
    }

    .Link-For-Another-LoginorRegister {
      margin-top: 60px;
      flex-direction: column;
    }

    button {
      padding: 10px 20px;
      font-size: 14px;
    }

    button img {
      width: 20px;
      height: 20px;
    }
  }
</style>
