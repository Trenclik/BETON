<script lang="ts">
  import { error, json } from "@sveltejs/kit";

  interface Ticket {
    id: string;
    title: string;
    createdAt: string;
    status: string;
    category: string;
    msg: string;
    sender?: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }
  let isRegistered = $state(false);
  let isAdmin = $state(false);
  let activeTab = $state("tickets");
  let ticketFilter = $state("Vše");
  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let errorMessage = $state("");
  let successMesage = $state("");
  let tickets = $state("");
  let expandedTickets = $state<string[]>([]);

  const priorityOrder: Record<string, number> = {
    kritická: 1,
    vysoká: 2,
    střední: 3,
    nízká: 4,
  };

  function toggleTicket(ticketId: string) {
    if (expandedTickets.includes(ticketId)) {
      expandedTickets = expandedTickets.filter((id) => id !== ticketId);
    } else {
      expandedTickets = [...expandedTickets, ticketId];
    }
  }

  function isExpanded(ticketId: string) {
    return expandedTickets.includes(ticketId);
  }

  $effect(() => {
    if (typeof localStorage !== "undefined") {
      firstName = localStorage.getItem("firstName") || "";
      lastName = localStorage.getItem("lastName") || "";
      email = localStorage.getItem("email") || "";

      isRegistered = localStorage.getItem("isRegistered") === "true";
      isAdmin = localStorage.getItem("isAdmin") === "true";

      if (!isRegistered) {
        location.href = "/Login";
      }
      list(new Event("init"));
    }
  });

  async function list(event: Event) {
    event.preventDefault();

    try {
      const response = await fetch("/Profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin }),
      });

      const result = await response.json();
      tickets = result.body;
      if (tickets === "[]") {
        errorMessage = "Nebyly nalezeny žádné tickety";
        return;
      }
      successMesage = "Načtení ticketů úspěšné!";
      errorMessage = "";
    } catch (error) {
      errorMessage = (error as Error).message;
    }
  }

  async function updateTicketStatus(ticketId: string, newStatus: string) {
    try {
      const response = await fetch(`/Profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, ticketId }),
      });

      if (response.ok) {
        const updatedTickets = JSON.parse(tickets).map((ticket: Ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        );
        tickets = JSON.stringify(updatedTickets);
        successMesage = "Status ticketu změněn.";
        errorMessage = "";
      } else {
        throw new Error("Aktualizace statusu selhala.");
      }
    } catch (error) {
      errorMessage = (error as Error).message;
    }
  }

  function saveProfile() {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    location.href = "/Profile";
  }

  function logout() {
    localStorage.removeItem("isRegistered");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
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

  {#if activeTab === "tickets"}
    {#if errorMessage}
      <p>{errorMessage}</p>
    {/if}
    {#if successMesage}
      <section class:is-admin={isAdmin}>
        <h2>Tickety</h2>
        {#if isAdmin}
          <label class="Filtr-state" for="filter">Filtrovat podle stavu:</label>
          <select id="filter" bind:value={ticketFilter}>
            <option value="Vše">Vše</option>
            <option value="Hotovo">Hotovo</option>
            <option value="Rozpracováno">Rozpracováno</option>
            <option value="Čekající">Čekající</option>
          </select>
        {/if}
        {#each (JSON.parse(tickets) as Ticket[]).sort((a, b) => {
          const priorityA = priorityOrder[a.category.toLowerCase()] ?? 999;
          const priorityB = priorityOrder[b.category.toLowerCase()] ?? 999;

          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }

          const dateA = new Date(a.createdAt).getTime() || 0;
          const dateB = new Date(b.createdAt).getTime() || 0;

          return dateB - dateA;
        }) as ticket (ticket.id)}
          {#if ticketFilter === "Vše"}
            <div
              class={ticket.status === `Hotovo`
                ? `ticket triviální`
                : `ticket ${ticket.category.toLowerCase()} ${isExpanded(ticket.id) ? "expanded" : ""}`}>
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div
                class="ticket-header"
                onclick={() => toggleTicket(ticket.id)}
              >
                <p><strong>{ticket.title}</strong></p>
                <span>{isExpanded(ticket.id) ? "−" : "+"}</span>
              </div>
              <div class="ticket-details">
                <p><strong>Vytvořeno:</strong> {ticket.createdAt}</p>
                <p><strong>Status:</strong> {ticket.status}</p>
                <p><strong>Kategorie:</strong> {ticket.category}</p>
                <p><strong>Zpráva:</strong> {ticket.msg}</p>

                {#if ticket.sender}
                  <p>
                    <strong>Odesílatel:</strong>
                    {ticket.sender.firstName}
                    {ticket.sender.lastName} ({ticket.sender.email})
                  </p>
                {/if}
                {#if isAdmin}
                  <div class="ticket-actions">
                    <label>
                      Změnit status:
                      <select
                        onchange={(event) =>
                          updateTicketStatus(
                            ticket.id,
                            (event.target as HTMLSelectElement).value
                          )}
                        value={ticket.status}
                      >
                        <option value="Čekající">Čekající</option>
                        <option value="Rozpracováno">Rozpracováno</option>
                        <option value="Hotovo">Hotovo</option>
                      </select>
                    </label>
                  </div>
                {/if}
              </div>
            </div>
          {:else if ticketFilter == ticket.status}
            <div
              class={ticket.status === `Hotovo`
                ? `ticket triviální ${isExpanded(ticket.id) ? "expanded" : ""}`
                : `ticket ${ticket.category.toLowerCase()} ${isExpanded(ticket.id) ? "expanded" : ""}`}
            >
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <div
                class="ticket-header"
                onclick={() => toggleTicket(ticket.id)}
              >
                <p><strong>{ticket.title}</strong></p>
                <span>{isExpanded(ticket.id) ? "−" : "+"}</span>
              </div>
              <div class="ticket-details">
                <p><strong>Vytvořeno:</strong> {ticket.createdAt}</p>
                <p><strong>Status:</strong> {ticket.status}</p>
                <p><strong>Kategorie:</strong> {ticket.category}</p>
                <p><strong>Zpráva:</strong> {ticket.msg}</p>

                {#if ticket.sender}
                  <p>
                    <strong>Odesílatel:</strong>
                    {ticket.sender.firstName}
                    {ticket.sender.lastName} ({ticket.sender.email})
                  </p>
                {/if}
                {#if isAdmin}
                  <div class="ticket-actions">
                    <label>
                      Změnit status:
                      <select
                        onchange={(event) =>
                          updateTicketStatus(
                            ticket.id,
                            (event.target as HTMLSelectElement).value
                          )}
                        value={ticket.status}
                      >
                        <option value="Čekající">Čekající</option>
                        <option value="Rozpracováno">Rozpracováno</option>
                        <option value="Hotovo">Hotovo</option>
                      </select>
                    </label>
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        {/each}
      </section>
    {/if}
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
          <input bind:value={firstName} type="text" required />
        </label>
        <label>
          Příjmení:
          <input bind:value={lastName} type="text" required />
        </label>
        <button type="submit">Uložit</button>
      </form>
    </section>
  {/if}
</main>

<style>
  main {
    padding: 40px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1e1e1e;
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
    padding: 12px 26px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: linear-gradient(145deg, #2d2d2d, #1a1a1a);
    color: white;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  nav.menu button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -75%;
    width: 150%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.2), transparent);
    transform: skewX(-20deg);
    transition: all 0.5s;
  }

  nav.menu button:hover::before {
    left: 100%;
  }

  nav.menu button:hover {
    background: linear-gradient(145deg, #3a3a3a, #1e1e1e);
    transform: translateY(-1px);
  }

  nav.menu button:active {
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  nav.menu button.active {
    background: linear-gradient(145deg, #2d6a4f, #1b4332);
    color: #fff;
  }

  nav.menu button.active:hover {
    background: linear-gradient(145deg, #2d6a4f, #1e523f);
  }

  nav.menu button.logout {
    background: linear-gradient(145deg, #6c757d, #495057);
    color: white;
  }

  nav.menu button.logout:hover {
    background: linear-gradient(145deg, #c82333, #a71d2a);
  }

  .ticket {
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.95rem;
    font-weight: 500;
    color: #fff;
    overflow: hidden;
    transition:
      max-height 0.3s ease,
      padding 0.3s ease;
  }

  .ticket.triviální {
    background-color: #6c757d33;
    border-left: 6px solid #6c757d;
  }
  .ticket.nízká {
    background-color: #00ff2a3a;
    border-left: 6px solid #15ff00;
  }
  .ticket.střední {
    background-color: #ffe10033;
    border-left: 6px solid #ffea00;
  }
  .ticket.vysoká {
    background-color: #fd7e1433;
    border-left: 6px solid #fd7e14;
  }
  .ticket.kritická {
    background-color: #721c2433;
    border-left: 6px solid #721c24;
  }

  .Filtr-state, #filter{
    margin-bottom: 10px;
  } 

  .ticket .ticket-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding-bottom: 10px;
    border-bottom: 1px solid #555;
  }

  .ticket .ticket-header span {
    font-weight: bold;
    color: #ccc;
    user-select: none;
    display: none;
  }

  .ticket .ticket-details {
    margin-top: 12px;
    transition: opacity 0.3s ease;
    opacity: 1;
  }

  .ticket.expanded {
    max-height: none;
    overflow: visible;
  }
  h2 {
    font-size: 2rem;
    color: #fff;
    margin-bottom: 10px;
  }

  p {
    margin-top: 10px;
    font-size: 1.1rem;
    color: #aaa;
  }

  strong {
    color: white;
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

  section.is-admin {
    border: 2px dashed #28a745;
  }

  form label {
    display: block;
    margin-bottom: 15px;
    color: #ddd;
    text-align: left;
  }

  form input {
    width: 100%;
    padding: 12px;
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
      padding: 16px;
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
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }

    form input,
    form button[type="submit"] {
      padding: 10px;
    }

    .ticket {
      max-height: 60px;
      padding: 12px 16px;
    }

    .ticket.expanded {
      max-height: none;
      padding: 16px;
    }

    .ticket .ticket-details {
      display: none;
      opacity: 0;
    }

    .ticket.expanded .ticket-details {
      display: block;
      opacity: 1;
    }

    .ticket .ticket-header span {
      display: inline-block;
    }
  }
</style>
