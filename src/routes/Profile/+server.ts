import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { ticketTable, usersTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { isAdmin } = await request.json();
		const userId = Number(cookies.get("userId"));

		let tickets;

		if (isAdmin) {
			tickets = await db
				.select({
					id: ticketTable.id,
					title: ticketTable.title,
					createdAt: ticketTable.createdAt,
					status: ticketTable.status,
					category: ticketTable.category,
					msg: ticketTable.msg,
					sender: {
						firstName: usersTable.name,
						lastName: usersTable.sname,
						email: usersTable.email
					}
				})
				.from(ticketTable)
				.leftJoin(usersTable, eq(ticketTable.uid, usersTable.id))
				.all();
		} else {
			tickets = await db
				.select({
					id: ticketTable.id,
					title: ticketTable.title,
					createdAt: ticketTable.createdAt,
					status: ticketTable.status,
					category: ticketTable.category,
					msg: ticketTable.msg,
					sender: {
						firstName: usersTable.name,
						lastName: usersTable.sname,
						email: usersTable.email
					}
				})
				.from(ticketTable)
				.leftJoin(usersTable, eq(ticketTable.uid, usersTable.id))
				.where(eq(ticketTable.uid, userId))
				.all();
		}

		return json({
			message: "Načtení ticketů úspěšné!",
			body: JSON.stringify(tickets)
		}, { status: 200 });
	} catch (err) {
		console.error('Chyba při získávání ticketů:', err);
		return json({ message: 'Chyba serveru při získávání ticketů.' }, { status: 500 });
	}
}

export const PUT: RequestHandler = async ({ request }) => {
	try {
		const { ticketId, status } = await request.json();
		await db.update(ticketTable)
			.set({ status })
			.where(eq(ticketTable.id, ticketId));
		return json({ message: 'Status ticketu změněn' }, { status: 200 });
	} catch (err) {
		console.error('Chyba při úpravě ticketů:', err);
		return json({ message: 'Chyba serveru při úpravě ticketů.' }, { status: 500 });
	}
}
