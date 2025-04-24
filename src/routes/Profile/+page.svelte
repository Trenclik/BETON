<script>
	let isRegistered = $state(false);
	let isAdmin = $state(false);
	let activeTab = $state("tickets");

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
		<button class:active={activeTab === 'tickets'} onclick={() => (activeTab = 'tickets')}>
			Tickety
		</button>
		<button class:active={activeTab === 'profile'} onclick={() => (activeTab = 'profile')}>
			Upravit profil
		</button>
		<button class="logout" onclick={logout}>
			Odhlásit se
		</button>
	</nav>

	{#if isAdmin}
		<section class="admin-profile">
			<h1>Admin Profil</h1>
			<p>Vítej zpět, administrátore.</p>
		</section>
	{/if}

	{#if activeTab === 'tickets'}
		<section>
			<h2>Tvoje tickety</h2>
			<p>Zatím tu žádné nemáš, nebo je tu třeba načíst z backendu.</p>
		</section>
	{:else if activeTab === 'profile'}
		<section>
			<h2>Úprava profilu</h2>
			<p>Tady můžeš editovat svoje osobní údaje.</p>
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
		background-color: #f3f3f3;
		color: #333;
	}

	nav.menu {
		display: flex;
		gap: 10px;
		margin-bottom: 30px;
	}

	nav.menu button {
		padding: 10px 20px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		background-color: #ddd;
	}

	nav.menu button.active {
		background-color: #3498db;
		color: white;
	}

	nav.menu button.logout {
		background-color: #e74c3c;
		color: white;
	}

	h1, h2 {
		font-size: 2rem;
		color: #2c3e50;
	}

	p {
		margin-top: 10px;
		font-size: 1.1rem;
	}

	.admin-profile {
		border: 2px solid #e74c3c;
		padding: 30px;
		border-radius: 12px;
		background-color: #fff5f5;
		width: 100%;
		max-width: 600px;
		text-align: center;
	}

	main.is-admin {
		background-color: #fff6f6;
	}
</style>
