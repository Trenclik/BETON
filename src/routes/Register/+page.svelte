<script lang="ts">
	import ShowHideButton from "$lib/Components/ShowHideButton.svelte";
	import StylingPage from "$lib/Components/Styling-page.svelte";

	let name = "";
	let surname = "";
	let email = "";
	let password = "";
	let confirmPassword = "";
	let errorMessage = "";
	let passwordVisible = false;
	let confirmPasswordVisible = false;
	let agreedToTerms = false;

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
			alert("Registrace úspěšná!");
		} catch (error) {
			errorMessage = (error as Error).message;
		}
	}
</script>

<StylingPage />

<main>
	<form class="Register-Container" on:submit={register}>
		<input type="text" placeholder="Jméno" bind:value={name} />
		<input type="text" placeholder="Příjmení" bind:value={surname} />
		<input type="email" placeholder="Email" bind:value={email} />

		<div class="Password-Container">
			<input
				type={passwordVisible ? "text" : "password"}
				placeholder="Heslo"
				bind:value={password}
			/>
			<ShowHideButton bind:visible={passwordVisible} class="show-hide-icon" />
		</div>

		<div class="Password-Container">
			<input
				type={confirmPasswordVisible ? "text" : "password"}
				placeholder="Potvrzení hesla"
				bind:value={confirmPassword}
			/>
			<ShowHideButton bind:visible={confirmPasswordVisible} class="show-hide-icon" />
		</div>

		<div class="checkbox-container">
			<input type="checkbox" bind:checked={agreedToTerms} class="checkbox" />
			<p>Souhlasím s <strong><a href="/">podmínkami</a></strong></p>
		</div>

		<button type="submit"><strong>Registrovat se</strong></button>

		{#if errorMessage}
			<p class="error">{errorMessage}</p>
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
    margin-bottom: 10px; /* Přidána mezera mezi inputy */
  }

  .Password-Container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .Password-Container input {
    width: 280px;
  }

  .checkbox-container {
    display: flex;
    justify-content: center;
    text-align: center;
    gap: 2px; /* Mezery mezi checkboxem a textem */
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
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

  a {
    color: rgba(30, 138, 37, 1);
  }

  .error {
    color: red;
    margin-top: 10px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    .Register-Container {
      height: 642px;
    }
  }

  @media (max-width: 768px) {
    .Register-Container {
      height: 642px;
    }
  }

  @media (max-width: 1024px) {
    .Register-Container {
      height: 642px;
    }
  }
</style>
