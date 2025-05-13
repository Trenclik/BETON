<script lang="ts">
  import StylingPage from "$lib/Components/Styling-page.svelte";

  let name = $state("");
  let surname = $state("");
  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");
  let errorMessage = $state("");
  let successMessage = $state("");
  let passwordVisible = $state(false);
  let confirmPasswordVisible = $state(false);
  let agreedToTerms = $state(false);

  function validateForm() {
    if (!name || !surname || !email || !password || !confirmPassword) {
      errorMessage = "Všechna pole musí být vyplněna.";
      return false;
    }
    if (password.length < 8) {
      errorMessage = "Heslo musí mít alespoň 8 znaků.";
      return false;
    }
    if (password !== confirmPassword) {
      errorMessage = "Hesla se neshodují.";
      return false;
    }
    if (!agreedToTerms) {
      errorMessage = "Musíte souhlasit s podmínkami.";
      return false;
    }
    errorMessage = "";
    return true;
  }

  async function register(event: Event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registrace selhala");

      localStorage.setItem("isRegistered", "true");
      localStorage.setItem("firstName", name);
      localStorage.setItem("lastName", surname);
      localStorage.setItem("email", email);

      location.href = "/";
    } catch (error) {
      errorMessage = (error as Error).message;
    }
  }
</script>

<StylingPage />

<main>
  <form class="Register-Container" onsubmit={register}>
    <input type="text" placeholder="Jméno" bind:value={name} />
    <input type="text" placeholder="Příjmení" bind:value={surname} />
    <input type="email" placeholder="Email" bind:value={email} />

    <!-- Password -->
    <div class="Password-Container">
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Heslo"
        bind:value={password}
      />
      <button
        type="button"
        class="toggle"
        onclick={() => (passwordVisible = !passwordVisible)}
      >
        {#if passwordVisible}
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="512.000000pt"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#1E8A25"
              stroke="none"
            >
              <path
                d="M2370 4184 c-589 -70 -1135 -342 -1715 -855 -203 -179 -537 -540
							-623 -674 -36 -56 -36 -134 0 -190 46 -72 240 -297 378 -438 493 -508 1042
							-864 1560 -1012 225 -64 339 -79 590 -79 251 0 365 15 590 79 607 174 1274
							647 1806 1283 146 174 158 195 158 262 0 67 -12 88 -158 262 -529 631 -1194
							1105 -1796 1280 -202 59 -336 78 -555 82 -110 3 -216 2 -235 0z m435 -349
							c471 -71 984 -348 1477 -799 151 -137 448 -454 448 -477 0 -3 -34 -46 -77 -94
							-582 -666 -1244 -1089 -1848 -1180 -128 -19 -362 -19 -490 0 -435 66 -899 303
							-1360 694 -167 141 -565 551 -565 581 0 4 34 47 77 95 578 661 1240 1086 1839
							1179 122 19 375 19 499 1z"
              />
              <path
                d="M2420 3564 c-433 -79 -741 -361 -846 -774 -27 -106 -27 -354 0 -460
							97 -380 376 -659 756 -756 106 -27 354 -27 460 0 380 97 659 376 756 756 15
							58 19 110 19 230 0 120 -4 172 -19 230 -95 375 -366 650 -741 752 -68 19 -323
							33 -385 22z m300 -350 c187 -42 358 -179 445 -359 52 -107 68 -189 63 -325 -5
							-129 -30 -216 -90 -318 -42 -72 -158 -188 -230 -230 -211 -124 -485 -124 -696
							0 -72 42 -188 158 -230 230 -124 211 -124 485 0 696 42 72 158 188 230 230
							151 89 328 116 508 76z"
              />
            </g>
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="hide"
            fill="#1E8A25"
          >
            <g fill="#1E8A25">
              <path
                d="M22 12c0-.9-.4-1.7-1.1-2.1l-1.8-1.2c-.5-.3-1.1-.2-1.4.3-.3.5-.2 1.1.3 1.4l1.8 1.2c.2.1.2.3.2.4s0 .3-.2.5l-2 1.4c-1.8 1.2-4 1.8-6.2 1.7-.5 0-1 .4-1 .9 0 .6.4 1 .9 1h.6c2.4 0 4.7-.7 6.8-2.1l2-1.3c.7-.4 1.1-1.2 1.1-2.1zM3.1 14.1l2 1.4c.5.2.9.5 1.3.7l-1.1 1.1c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l2.1-2.1 1.4-1.4 4.8-4.8L16.4 9l2.1-2.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0L15.6 7c-3.5-1.1-7.4-.5-10.4 1.5l-2 1.3C2.4 10.3 2 11.1 2 12s.4 1.7 1.1 2.1zM12 9.6c.3 0 .6.1.9.2l-3.1 3.1c-.1-.3-.2-.6-.2-.9 0-1.3 1.1-2.4 2.4-2.4zm-7.8 1.9 2-1.4c.9-.4 1.7-.8 2.6-1.1-.8.8-1.2 1.8-1.2 3 0 .8.2 1.6.7 2.3l-.4.4c-.6-.2-1.1-.5-1.6-.9l-2-1.4c-.3-.1-.3-.3-.3-.4s0-.3.2-.5z"
              ></path>
            </g>
          </svg>
        {/if}
      </button>
    </div>

    <!-- Confirm Password -->
    <div class="Password-Container">
      <input
        type={confirmPasswordVisible ? "text" : "password"}
        placeholder="Potvrzení hesla"
        bind:value={confirmPassword}
      />
      <button
        type="button"
        class="toggle"
        onclick={() => (confirmPasswordVisible = !confirmPasswordVisible)}
      >
        {#if confirmPasswordVisible}
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="512.000000pt"
            height="512.000000pt"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#1E8A25"
              stroke="none"
            >
              <path
                d="M2370 4184 c-589 -70 -1135 -342 -1715 -855 -203 -179 -537 -540
							-623 -674 -36 -56 -36 -134 0 -190 46 -72 240 -297 378 -438 493 -508 1042
							-864 1560 -1012 225 -64 339 -79 590 -79 251 0 365 15 590 79 607 174 1274
							647 1806 1283 146 174 158 195 158 262 0 67 -12 88 -158 262 -529 631 -1194
							1105 -1796 1280 -202 59 -336 78 -555 82 -110 3 -216 2 -235 0z m435 -349
							c471 -71 984 -348 1477 -799 151 -137 448 -454 448 -477 0 -3 -34 -46 -77 -94
							-582 -666 -1244 -1089 -1848 -1180 -128 -19 -362 -19 -490 0 -435 66 -899 303
							-1360 694 -167 141 -565 551 -565 581 0 4 34 47 77 95 578 661 1240 1086 1839
							1179 122 19 375 19 499 1z"
              />
              <path
                d="M2420 3564 c-433 -79 -741 -361 -846 -774 -27 -106 -27 -354 0 -460
							97 -380 376 -659 756 -756 106 -27 354 -27 460 0 380 97 659 376 756 756 15
							58 19 110 19 230 0 120 -4 172 -19 230 -95 375 -366 650 -741 752 -68 19 -323
							33 -385 22z m300 -350 c187 -42 358 -179 445 -359 52 -107 68 -189 63 -325 -5
							-129 -30 -216 -90 -318 -42 -72 -158 -188 -230 -230 -211 -124 -485 -124 -696
							0 -72 42 -188 158 -230 230 -124 211 -124 485 0 696 42 72 158 188 230 230
							151 89 328 116 508 76z"
              />
            </g>
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="hide"
            fill="#1E8A25"
          >
            <g fill="#1E8A25">
              <path
                d="M22 12c0-.9-.4-1.7-1.1-2.1l-1.8-1.2c-.5-.3-1.1-.2-1.4.3-.3.5-.2 1.1.3 1.4l1.8 1.2c.2.1.2.3.2.4s0 .3-.2.5l-2 1.4c-1.8 1.2-4 1.8-6.2 1.7-.5 0-1 .4-1 .9 0 .6.4 1 .9 1h.6c2.4 0 4.7-.7 6.8-2.1l2-1.3c.7-.4 1.1-1.2 1.1-2.1zM3.1 14.1l2 1.4c.5.2.9.5 1.3.7l-1.1 1.1c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l2.1-2.1 1.4-1.4 4.8-4.8L16.4 9l2.1-2.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0L15.6 7c-3.5-1.1-7.4-.5-10.4 1.5l-2 1.3C2.4 10.3 2 11.1 2 12s.4 1.7 1.1 2.1zM12 9.6c.3 0 .6.1.9.2l-3.1 3.1c-.1-.3-.2-.6-.2-.9 0-1.3 1.1-2.4 2.4-2.4zm-7.8 1.9 2-1.4c.9-.4 1.7-.8 2.6-1.1-.8.8-1.2 1.8-1.2 3 0 .8.2 1.6.7 2.3l-.4.4c-.6-.2-1.1-.5-1.6-.9l-2-1.4c-.3-.1-.3-.3-.3-.4s0-.3.2-.5z"
              ></path>
            </g>
          </svg>
        {/if}
      </button>
    </div>

    <!-- <div class="checkbox-container">
      <input type="checkbox" bind:checked={agreedToTerms} class="checkbox" />
      <p>Souhlasím s <strong><a href="/">podmínkami</a></strong></p>
    </div> -->

    <button type="submit"><strong>Registrovat se</strong></button>

    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}

    {#if successMessage}
      <p class="success">{successMessage}</p>
    {/if}
  </form>
</main>

<style>
  .Register-Container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 740px;
  }

  .Register-Container input {
    height: 40px;
    width: 280px;
    border-radius: 7px;
    border: none;
    font-size: 15px;
    text-align: center;
    margin-bottom: 10px;
  }

  .Password-Container {
    display: flex;
    align-items: center;
    position: relative;
  }

  .Password-Container input {
    width: 232px;
    padding-right: 50px;
  }

  .toggle {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 42%;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
  }

  input:focus {
    outline: none;
    border: 2px solid rgba(30, 138, 37, 1);
    box-shadow: 0 0 5px rgba(30, 138, 37, 0.5);
  }

  .Password-Container input::placeholder{
    padding-left: 50px;
  }

  input:not(:placeholder-shown) {
    text-align: left; /* Když začnu psát, zarovná se vlevo */
  }

  .toggle:hover svg {
    transform: scale(1.1);
    transition: transform 0.2s ease;
  }

  .toggle svg {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 480px) {
    .toggle svg {
      width: 20px;
      height: 20px;
    }
  }
  button {
    width: 222px;
    height: 43px;
    background: rgba(30, 138, 37, 1);
    color: white;
    border-radius: 8px;
    border: none;
    font-size: 15px;
    cursor: pointer;
    margin-top: 10px;
  }

  p {
    color: white;
    font-size: 14px;
    margin: 0;
    margin-top: 3px;
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

  @media (max-width: 768px), (max-width: 1024px) {
    .Register-Container {
      height: 690px;
    }
  }
</style>
