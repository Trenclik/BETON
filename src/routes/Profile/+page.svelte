<script>
  let isRegistered = $state(false);
  let isAdmin = $state(false);
  let activeTab = $state("tickets");
  let ticketFilter = $state("vse"); // přidaný stav pro filtr

  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let nickname = $state("");

  $effect(() => {
    if (typeof localStorage !== "undefined") {
      firstName = localStorage.getItem("firstName") || "";
      lastName = localStorage.getItem("lastName") || "";
      email = localStorage.getItem("email") || "";
      nickname = localStorage.getItem("nickname") || "";

      isRegistered = localStorage.getItem("isRegistered") === "true";
      isAdmin = localStorage.getItem("isAdmin") === "true";

      if (!isRegistered) {
        location.href = "/Login";
      }
    }
  });

  function saveProfile() {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("nickname", nickname);
    alert("Profil uložen");
  }

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
      {#if isAdmin}
        <label for="filter">Filtrovat podle stavu:</label>
        <select id="filter" bind:value={ticketFilter}>
          <option value="vse">Vše</option>
          <option value="hotovo">Hotovo</option>
          <option value="rozpracovano">Rozpracováno</option>
          <option value="nedokonceny">Nedokončený</option>
        </select>
      {/if}
      <p>Zatím tu žádné nemáš, nebo je tu třeba načíst z backendu.</p>
    </section>
  {:else if activeTab === "profile"}
    <section>
      <h2>Úprava profilu</h2>
      <form
        onsubmit={(event) => {
          event.preventDefault();
          saveProfile();
        }}
      >
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
    background-color: #1e1e1e; /* tmavé pozadí */
    color: #f0f0f0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  main.is-admin {
    background-color: #232323;
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
    background-color: #333;
    color: white;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  nav.menu button:hover {
    background-color: #444;
  }

  nav.menu button.active {
    background-color: #28a745;
    color: white;
  }

  nav.menu button.active:hover {
    background-color: #218838;
  }

  nav.menu button.logout {
    background-color: #6c757d;
  }

  nav.menu button.logout:hover {
    background-color: red;
  }

  h1,
  h2 {
    font-size: 2rem;
    color: #ffffff;
    margin-bottom: 10px;
  }

  p {
    margin-top: 10px;
    font-size: 1.1rem;
    color: #aaa;
  }

  section {
    background: #2a2a2a;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin-bottom: 30px;

  }

  form label {
    display: block;
    margin-bottom: 15px;
    color: #ddd;
    text-align: left;
  }

  form input {
    width: 100%;
    padding: 12px 0px 12px 12px; /* nahoře, vpravo, dole, vlevo */
    border-radius: 6px;
    border: 1px solid #555;
    background-color: #1a1a1a;
    color: #f0f0f0;
    font-size: 16px;
    box-sizing: border-box;
  }

  form input::placeholder {
    color: #777;
  }

  form button[type="submit"] {
    padding: 14px 24px;
    min-height: 48px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    background-color: #28a745;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
    box-sizing: border-box;
  }

  form button[type="submit"]:hover {
    background-color: #218838;
  }

  form button[type="submit"]:hover {
    background-color: #218838;
  }

  .admin-profile {
    border: 2px dashed #28a745;
  }

  @media (max-width: 768px) {
    main {
      padding: 20px;
    }

    nav.menu {
      flex-direction: column;
      width: 100%;
      gap: 8px;
      align-items: stretch;
    }

    nav.menu button {
      width: 100%;
      text-align: center;
    }

    section {
      padding: 12px;
      border-radius: 10px;
      max-width: 100%;
    }

    form label {
      font-size: 0.95rem;
    }

    form input,
    form button[type="submit"] {
      font-size: 15px;
    }
  }

  @media (max-width: 480px) {
    h1,
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }

    form input,
    form button[type="submit"] {
      padding: 10px 0px 10px 10px;
    }
  }
</style>
