import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema.ts';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import { eq } from 'drizzle-orm';

export async function GET({ request }: { request: Request }): Promise<Response> {
    const sessionCookie = request.headers.get('cookie')?.split(';').find(cookie => cookie.trim().startsWith('session='));
  
    if (!sessionCookie) {
        return new Response(JSON.stringify({ success: false, message: 'Not authenticated' }), { status: 401 });
    }
  
    const userId = sessionCookie.split('=')[1];
    
    try {
        const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).get();
  
        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
        }
  
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
}
  
export async function POST({ request }: { request: Request }): Promise<Response> {
    try {
        const formData = await request.formData();
        const email = formData.get('') as string | null;
        const password = formData.get('password') as string | null;
  
        if (!email || !password) {
            return new Response(
                JSON.stringify({ success: false, message: 'Invalid input' }),
                { status: 400 }
            );
        }
  
        const user = await db.select().from(usersTable).where(eq(usersTable.id, email)).get();
        
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return new Response(
                JSON.stringify({ success: false, message: 'Invalid credentials' }),
                { status: 401 }
            );
        }
  
        await db.update(usersTable).set({ isOnline: 1 }).where(eq(usersTable.id, user.id)).run();
  
        const sessionCookie = serialize('session', user.id.toString(), {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
        });
  
        return new Response(
            JSON.stringify({ success: true, message: 'Login successful' }),
            {
                status: 200,
                headers: { 'Set-Cookie': sessionCookie },
            }
        );
    } catch (error) {
        console.error('Login error:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
