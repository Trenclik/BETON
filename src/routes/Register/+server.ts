import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from "drizzle-orm";


export const POST: RequestHandler = async ({ request, cookies }) => { 
    try { 
        const body = await request.json();
        const { name, surname, email, password } = body;
        // Basic validation
        if (!name || !surname || !email || !password) {
            return json({ message: 'Všechna pole musí být vyplněna.' }, { status: 400 });
        }

        if (password.length < 8) {
            return json({ message: 'Heslo musí mít alespoň 8 znaků.' }, { status: 400 });
        }

        // Check if email already exists
        const existingUser = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .get();

        if (existingUser) {
            return json({ message: 'Uživatel s tímto emailem již existuje.' }, { status: 400 });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);
        // Insert new user
        await db.insert(usersTable).values({
            name,
            sname: surname,
            email,
            passwordHash,
            admin: 0,
            isMSLoggedIn: 0,
            isEmailVerified: 1,
            isOnline: 0
        });
        const [user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email));
        // Nastavení cookie
		cookies.set('userId', user.id.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 7 dní
		});
        return json({ message: 'Registrace úspěšná!' }, { status: 200 });
    } catch (error) {
	    console.error('Chyba při registraci:', error);
	    return json({ message: 'Chyba serveru při registraci.' }, { status: 500 });
    }
}