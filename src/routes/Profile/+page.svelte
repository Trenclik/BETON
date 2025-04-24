<script>
	let isRegistered = $state(false);
	let isAdmin = $state(false);

	$effect(() => {
		const regFlag = localStorage.getItem("isRegistered");
		isRegistered = regFlag === "true";

		const adminFlag = localStorage.getItem("isAdmin");
		isAdmin = adminFlag === "true";

		if (!isRegistered) {
			location.href = "/Login"; // nebo kam chceš poslat neregistrované
		}
	});
</script>

<main class:is-admin={isAdmin}>
	{#if isAdmin}
		<section class="admin-profile">
			<h1>Admin Profil</h1>
			<p>Vítej zpět, administrátore. Zde máš přístup k nastavení, správě uživatelů a reportům.</p>
			<!-- Můžeš přidat další komponenty nebo sekce -->
		</section>
	{:else}
		<section class="user-profile">
			<h1>Profil Uživatele</h1>
			<p>Ahoj! Tady si můžeš upravit svůj účet nebo si zobrazit své tickety.</p>
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

	h1 {
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

	.user-profile {
		border: 2px solid #3498db;
		padding: 30px;
		border-radius: 12px;
		background-color: #f0f8ff;
		width: 100%;
		max-width: 600px;
		text-align: center;
	}

	main.is-admin {
		background-color: #fff6f6;
	}
</style>
