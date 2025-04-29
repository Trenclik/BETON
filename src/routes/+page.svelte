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
      description,
      sender: {
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        email: localStorage.getItem("email"),
      },
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

      // Reset form
      title = "";
      selectedCategory = "";
      description = "";
    } catch (error) {
      console.error("Chyba:", error);
    }
  }
</script>

<main>
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
      </select>
    </div>
    <div class="TicketDescription">
      {#if title.trim() !== "" && selectedCategory !== ""}
        <textarea
          name="TicketDescription"
          id="TicketDescription"
          cols="30"
          rows="10"
          placeholder="Zanechte popis ticketu nebo zprávu pro nás..."
          bind:value={description}
        ></textarea>
      {/if}
    </div>
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
</main>

<style>
  * {
    box-sizing: border-box;
  }

  main {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background-color: #484745;
    color: #767475;
    min-height: 679px;
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
    width: 100%;
    max-width: 600px;
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
    width: 100%;
  }

  .TitleInput,
  select {
    width: 100%;
    padding: 16px 20px;
    font-size: 18px;
    border-radius: 8px;
    border: 1px solid #767475;
    background-color: transparent;
    color: #ffffff;
    box-sizing: border-box;
  }

  select {
    background-color: #41403e;
  }

  option {
    color: white;
  }
  .TitleInput::placeholder,
  textarea::placeholder {
    color: #767475;
    opacity: 1;
    text-align: left;
  }

  select {
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='%23767475' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 20px center;
    background-size: 24px;
  }

  select:invalid {
    color: #767475;
  }

  .TicketDescription {
    margin-bottom: 20px;
    width: 100%;
  }

  textarea {
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    border: none;
    background-color: #151515;
    color: #ffffff;
    resize: vertical;
    font-size: 17px;
    min-height: 150px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  }

  .TicketButton {
    text-align: center;
    width: 100%;
  }

  .SubmitTicket {
    background-color: #151515;
    color: #767475;
    border: none;
    padding: 14px 32px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    font-size: 17px;
    width: 100%;
  }

  .SubmitTicket.CompleteReady {
    background-color: #28a745;
    color: white;
    border: 2px solid #28a745;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    main {
      padding: 20px;
    }

    .TicketConatainer {
      padding: 20px;
    }

    h1 {
      font-size: 22px;
    }

    .SubmitTicket {
      padding: 14px;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 20px;
    }

    .TicketConatainer {
      padding: 16px;
    }

    .TitleOfTicket {
      gap: 16px;
    }

    textarea {
      font-size: 15px;
      padding: 14px;
      min-height: 120px;
    }

    .SubmitTicket {
      font-size: 15px;
    }
  }
</style>
