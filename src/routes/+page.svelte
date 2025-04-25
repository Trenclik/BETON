<script>
  let selectedCategory = $state("");
  let title = $state("");
  let description = $state("");
  let isFormComplete = $state(false);
  let isRegistered = $state(false);
  let isAdmin = $state(false);

  $effect(() => {
    isFormComplete =
      title.trim() !== "" &&
      selectedCategory !== "" &&
      description.trim() !== "";
  });

  $effect(() => {
    const regFlag = localStorage.getItem("isRegistered");
    isRegistered = regFlag === "true";

    const adminFlag = localStorage.getItem("isAdmin");
    isAdmin = adminFlag === "true";

    if (!isRegistered) {
      location.href = "/Login";
    }
  });

  async function submitTicket() {
    if (!isFormComplete) return;

    const ticketData = {
      title,
      category: selectedCategory,
      description
    };

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Chyba při odesílání ticketu");
      }

      const result = await response.json();
      console.log("Ticket byl úspěšně odeslán:", result);
      
      // Reset form after successful submission
      title = "";
      selectedCategory = "";
      description = "";
      
      // Show success message (you might want to add a proper notification system)
    } catch (error) {
      console.error("Chyba:", error);
    }
  }
</script>

<main>
  {#if isAdmin}
    <h1>Admin Panel</h1>
    <p>Zde budou například seznamy ticketů nebo správa uživatelů</p>
  {:else}
    <h1>Ticket</h1>
    <div class="TicketConatainer">
      <div class="TitleOfTicket">
        <input
          type="text"
          placeholder="Název Ticketu"
          class="TitleInput"
          bind:value={title}
        />
        <select
          name="TicketPriority"
          id="TicketPriority"
          required
          bind:value={selectedCategory}
        >
          <option value="" disabled selected hidden>Vyber Kategorii</option>
          <option value="Kritická">Kritická</option>
          <option value="Vysoká">Vysoká</option>
          <option value="Střední">Střední</option>
          <option value="Nízká">Nízká</option>
          <option value="Triviální">Triviální</option>
        </select>
      </div>

      {#if selectedCategory}
        <div class="TicketDescription">
          <textarea
            name="TicketDescription"
            id="TicketDescription"
            cols="30"
            rows="10"
            placeholder="Zanechte popis ticketu nebo zprávu pro nás..."
            bind:value={description}
          ></textarea>
        </div>
      {/if}

      <div class="TicketButton">
        <button
          type="submit"
          class="SubmitTicket"
          class:CompleteReady={isFormComplete}
          onclick={submitTicket}
        >
          Odeslat Ticket
        </button>
      </div>
    </div>
  {/if}
</main>

<style>
  /* Your existing styles remain the same */
  main {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #484745;
    color: #767475;
    min-height: 599px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  h1 {
    color: white;
    margin-bottom: 20px;
    font-size: 24px;
  }

  .TicketConatainer {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 540px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .TitleOfTicket {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }

  select {
    background-color: transparent;
    border: 1px solid #767475;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 16px;
    width: 500px;
    box-sizing: border-box;
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='%23767475' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-size: 24px;
    color: #767475;
  }

  select:invalid {
    color: #767475;
  }

  .TitleInput {
    background-color: transparent;
    border: 1px solid #767475;
    padding: 12px 16px;
    border-radius: 6px;
    color: #ffffff;
    font-size: 16px;
    width: 500px;
    box-sizing: border-box;
  }

  .TitleInput::placeholder {
    color: #767475;
    opacity: 1;
  }

  .TicketDescription {
    margin-bottom: 20px;
  }

  textarea {
    width: 369px;
    padding: 16px;
    border-radius: 10px;
    border: none;
    background-color: #151515;
    color: #767475;
    resize: vertical;
    font-size: 16px;
    min-height: 150px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  }

  textarea {
    color: #ffffff;
  }

  textarea::placeholder {
    color: #767475;
    opacity: 1;
  }

  .TicketButton {
    text-align: center;
  }

  .SubmitTicket {
    background-color: #151515;
    color: #767475;
    border: none;
    padding: 12px 32px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    font-size: 16px;
  }

  .SubmitTicket.CompleteReady {
    background-color: #28a745;
    color: white;
    border: 2px solid #28a745;
    transition: all 0.3s ease;
  }
</style>