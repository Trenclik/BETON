import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { ticketTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
    try{
        const { isAdmin } = await request.json();
        let userId = Number(cookies.get("userId"))
        let tickets
        if (isAdmin) {
            tickets = await db
                .select()
                .from(ticketTable)
                .all()
        } else {
            tickets = await db
                .select()
                .from(ticketTable)
                .where(eq(ticketTable.uid, userId))
                .all()
        }
        
        return json({
            message: "Načtení ticketů úspěšné!",
            body: JSON.stringify(tickets)
        })
    } catch (err) {
        console.error('Chyba při získávání ticketů:', err);
        return json({ message: 'Chyba serveru při získávání ticketů.' }, { status: 500 })
    }
}