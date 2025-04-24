import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const formData = await request.formData();
	const email = formData.get('email')?.toString() || '';
	const password = formData.get('password')?.toString() || '';

	if (!email || !password) {
		return json({ message: 'Chybí přihlašovací údaje.' }, { status: 400 });
	}

	try {
		const [user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email));

		if (!user) {
			return json({ message: 'Uživatel nebyl nalezen.' }, { status: 401 });
		}

		const passwordMatch = await bcrypt.compare(password, user.passwordHash);
		if (!passwordMatch) {
			return json({ message: 'Neplatné heslo.' }, { status: 401 });
		}

		// Nastavení cookie
		cookies.set('userId', user.id.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 7 dní
		});
        
		return json({ message: 'Přihlášení úspěšné' }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ message: 'Chyba serveru při přihlašování.' }, { status: 500 });
	}
};
