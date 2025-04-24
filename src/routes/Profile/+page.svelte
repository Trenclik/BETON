<script>
  let isRegistered = $state(false);
  let isAdmin = $state(false);
  let activeTab = $state("tickets");
  let firstName = $state(localStorage.getItem("firstName") || "");
  let lastName = $state(localStorage.getItem("lastName") || "");
  let email = $state(localStorage.getItem("email") || "");
  let nickname = $state(localStorage.getItem("nickname") || "");

  function saveProfile() {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("nickname", nickname);
    alert("Profil uložen");
  }

  $effect(() => {
    isRegistered = localStorage.getItem("isRegistered") === "true";
    isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!isRegistered) {
      location.href = "/Login";
    }
  });

  function logout() {
    localStorage.removeItem("isRegistered");
    localStorage.removeItem("isAdmin");
    location.href = "/Login";
  }
</script>

<main class:is-admin={isAdmin}>
  <nav class="menu">
    <button
      class:active={activeTab === "tickets"}
      onclick={() => (activeTab = "tickets")}
    >
      Tickety
    </button>
    <button
      class:active={activeTab === "profile"}
      onclick={() => (activeTab = "profile")}
    >
      Upravit profil
    </button>
    <button class="logout" onclick={logout}> Odhlásit se </button>
  </nav>

  {#if isAdmin}
    <section class="admin-profile">
      <h1>Admin Profil</h1>
      <p>Vítej zpět, administrátore.</p>
    </section>
  {/if}

  {#if activeTab === "tickets"}
    <section>
      <h2>Tvoje tickety</h2>
      <p>Zatím tu žádné nemáš, nebo je tu třeba načíst z backendu.</p>
    </section>
  {:else if activeTab === "profile"}
    <section>
      <h2>Úprava profilu</h2>
      <form onsubmit={event => { event.preventDefault(); saveProfile(); }}>
        <label>
          Jméno:
          <input bind:value={firstName} type="text" />
        </label>
        <label>
          Příjmení:
          <input bind:value={lastName} type="text" />
        </label>
        <label>
          Email:
          <input bind:value={email} type="email" />
        </label>
        <label>
          Přezdívka (nepovinné):
          <input bind:value={nickname} type="text" />
        </label>
        <button type="submit">Uložit</button>
      </form>
    </section>
  {/if}
</main>

<style>
  main {
    padding: 40px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eeeeee; /* světle šedé pozadí */
    color: #333;
    font-family: system-ui, sans-serif;
  }

  nav.menu {
    display: flex;
    gap: 12px;
    margin-bottom: 30px;
  }

  nav.menu button {
    padding: 10px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background-color: #cccccc; /* neutrální šedá */
    transition: background-color 0.2s;
    font-weight: 500;
  }

  nav.menu button.active {
    background-color: #2ecc71; /* zelená */
    color: white;
  }

  nav.menu button.logout {
    background-color: #95a5a6; /* šedozelená pro méně důležité akce */
    color: white;
  }

  nav.menu button:hover {
    background-color: #bfbfbf;
  }

  nav.menu button.active:hover {
    background-color: #27ae60; /* tmavší zelená */
  }

  nav.menu button.logout:hover {
    background-color: #7f8c8d;
  }

  h1,
  h2 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  p {
    margin-top: 10px;
    font-size: 1.1rem;
  }

  section {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 600px;
    text-align: center;
  }

  .admin-profile {
    border: 2px dashed #2ecc71;
  }

  main.is-admin {
    background-color: #f9f9f9;
  }
</style>
