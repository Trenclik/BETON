<script lang="ts">
	let isLoggedIn = $state(false);
	let fullName = $state("Uživatel");

	$effect(() => {
		if (typeof localStorage !== "undefined") {
			isLoggedIn = localStorage.getItem("isRegistered") === "true";

			const first = localStorage.getItem("firstName");
			const last = localStorage.getItem("lastName");
			fullName = `${first || ""} ${last || ""}`.trim() || "Uživatel";
		}
	});

	function logout() {
		localStorage.removeItem("isRegistered");
		localStorage.removeItem("isAdmin");
		localStorage.removeItem("firstName");
		localStorage.removeItem("lastName");
		localStorage.removeItem("nickname");
		localStorage.removeItem("email");

		isLoggedIn = false;
		location.href = "/Login";
	}
</script>

<header>
	<div class="Header-Section">
		<div class="Logo">
			<a href="/">
				<h1><span class="concretum-light">Co<span class="concretum-bold">n</span>cret<span class="concretum-bold">u</span>m</span></h1>
			</a>
		</div>

		<div class="Navigation">
			<nav>
				{#if isLoggedIn}
					<span style="color: white;">
						Ahoj, <a href="/Profile" style="color: white; text-decoration: underline;">{fullName}</a>!
					</span>
				{:else}
					<a href="/Login"><strong>Přihlásit</strong></a>
					<a href="/Register"><strong>Registrovat</strong></a>
				{/if}
			</nav>
		</div>
	</div>
</header>


<style>
	.Header-Section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		background-color: rgb(63, 63, 63);
		height: 50px;
	}

	h1 {
		font-size: 30px;
		font-weight: bold;
		text-align: center;
		margin-left: 5px;
	}

	.Logo {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.Logo, h1, a {
		text-decoration: none;
	}

	.concretum-light {
		color: rgba(255, 255, 255, 0.7);
	}

	.concretum-bold {
		color: #b75e29;
	}

	a {
		color: white;
	}

	.Navigation {
		margin-right: 20px;
	}

	.Navigation nav {
		display: flex;
		gap: 20px;
	}

	.Navigation nav a {
		text-decoration: none;
	}
</style>
