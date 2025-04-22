<script>
	let selectedCategory = $state('');
</script>

<main>
	<h1>Ticket</h1>
	<div class="TicketConatainer">
		<div class="TitleOfTicket">
			<input type="text" placeholder="Název Ticketu" class="TitleInput" />
			<form>
				<label for="TicketCategory"></label>
				<select
					name="TicketPriority"
					id="TicketPriority"
					onchange={(e) => selectedCategory = e.target.value}
				>
					<option value="" disabled selected>Vyber Kategorii</option>
					<option value="Critical">Kritická</option>
					<option value="High">Vysoká</option>
					<option value="Medium">Střední</option>
					<option value="Low">Nízká</option>
					<option value="Trivial">Triviální</option>
				</select>
			</form>
		</div>

		{#if selectedCategory}
			<div class="TicketDescription">
				<textarea
					name="TicketDescription"
					id="TicketDescription"
					cols="30"
					rows="10"
					placeholder="Zanechte popis ticketu nebo zprávu pro nás..."
				></textarea>
			</div>
		{/if}

		<div class="TicketButton">
			<button type="submit" class="SubmitTicket">Odeslat Ticket</button>
		</div>
	</div>
</main>

<style>

</style>