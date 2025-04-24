<script lang="ts">
  import ShowHideButton from "$lib/Components/ShowHideButton.svelte";
  import StylingPage from "$lib/Components/Styling-page.svelte";

  let email = "";
  let password = "";
  let errorMessage = "";
  let successMessage = "";
  let passwordVisible = false;

  function validateForm() {
    if (!email || !password) {
      errorMessage = "Všechna pole musí být vyplněna";
      return false;
    }
    return true;
  }

  async function Login(event: Event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch("/Login", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Login response result:", result);
      if (!response.ok) throw new Error(result.message || "Přihlášení selhalo");

      // Uložíme vše do localStorage
      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("isAdmin", result.isAdmin ? "true" : "false");

      // Doplnit jméno a příjmení — musíš je dostat od backendu!
      localStorage.setItem("firstName", result.firstName || "");
      localStorage.setItem("lastName", result.lastName || "");

      successMessage = "Přihlášení úspěšné!";
      errorMessage = "";

      // Přesměrování
      location.href = "/Profile";
    } catch (error) {
      errorMessage = (error as Error).message;
    }
  }
</script>

<StylingPage />
<main>
  <div class="Login-Section">
    <input
      class="UserName"
      type="text"
      placeholder="E-mail"
      bind:value={email}
    />
    <div class="PasswordContainer">
      <input
        class="Password"
        type={passwordVisible ? "text" : "password"}
        placeholder="Heslo"
        bind:value={password}
      />
      <ShowHideButton bind:visible={passwordVisible} class="show-hide-icon" />
    </div>
    <div class="ForgetPassword">
      <a href="./ForgetPassword"><strong>Zapomenuté heslo</strong></a>
    </div>

    <button type="submit" onclick={Login}>
      <strong>Přihlásit se</strong>
    </button>

    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}

    {#if successMessage}
      <p class="success">{successMessage}</p>
    {/if}
  </div>

  <div class="Register-Container">
    <p>Nemáte učet? <a href="./Register">Registrovat se</a></p>
  </div>
</main>

<style>
  .Login-Section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 664px;
  }

  .PasswordContainer {
    margin: 0;
    margin-top: 20px;
  }

  .Login-Section input {
    margin: 0;
    height: 40px;
    border-radius: 7px;
    box-shadow: none;
    border: none;
    font-size: 15px;
  }

  input::placeholder {
    text-align: center;
    font-size: 15px;
  }

  .UserName {
    width: 280px;
  }

  .Password {
    width: 233px;
    padding-right: 50px;
  }

  .Password::placeholder {
    padding-left: 50px;
  }

  .error {
    color: red;
    margin-top: 10px;
    font-size: 14px;
  }

  .success {
    color: #1e8a25;
    margin-top: 10px;
    font-size: 14px;
  }

  a {
    color: rgba(30, 138, 37, 1);
  }

  .ForgetPassword {
    margin: 0;
    margin-left: 155px;
    margin-top: 8px;
    margin-bottom: 45px;
  }

  button {
    margin: 0;
    width: 222px;
    height: 43px;
    background: rgba(30, 138, 37, 1);
    color: white;
    border-radius: 8px;
    box-shadow: none;
    border: none;
    font-size: 15px;
    cursor: pointer;
  }

  p {
    color: white;
  }

  .Register-Container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -30px;
  }

  @media (max-width: 1024px) {
    .Login-Section {
      height: 640px;
    }
    .Register-Container {
      margin-top: -90px;
    }
  }

  @media (max-width: 768px) {
    .Register-Container {
      margin-top: -85px;
    }
  }

  @media (max-width: 480px) {
    .Register-Container {
      margin-top: -125px;
    }
  }
</style>
