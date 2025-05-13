import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { ticketTable, usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { title, category, description } = await request.json();

		// Základní validace
		if (!title || !category || !description) {
			return json({ message: 'Všechna pole musí být vyplněna.' }, { status: 400 });
		}
        let userId = Number(cookies.get('userId'))
		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, userId))
			.get();

		if (!user) {
			return json({ message: 'Uživatel nenalezen.' }, { status: 404 });
		}

		// Vložení ticketu
		await db.insert(ticketTable).values({
			uid: userId,
			title: title,
			category: category,
			msg: description,
			status: 'Čekající'
		});

		return json({ message: 'Ticket úspěšně odeslán.' }, { status: 200 });
	} catch (error) {
		console.error('Chyba při odesílání ticketu:', error );
		return json({ message: 'Chyba serveru při vytváření ticketu.' }, { status: 500 });
	}
};
