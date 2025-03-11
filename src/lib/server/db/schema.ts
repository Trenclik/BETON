import { sqliteTable, text, integer} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const usersTable = sqliteTable('user', {
	id: integer('id').primaryKey(),
	admin: integer('is_admin').notNull(),
	passwordHash: text('password_hash').notNull(),
	isMSLoggedIn: integer('is_ms_logged_in').default(0).notNull(), //kontrola loginu přes microsoft
	isEmailVerified: integer('is_email_verified').default(0).notNull(),
	isOnline: integer('is_online').default(0).notNull(),
	profileImage: text('profile_image').default("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"),
	email: text('email').notNull(),
	name: text('name').notNull(),
	sname: text('surname').notNull(),
});
export const ticketTable = sqliteTable('ticket',{
	id: integer('ID').primaryKey(),
	category: text('category').notNull(),
	uid: integer('user_id').notNull(),
	status: text('status').default('waiting').notNull(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
	title: text('title').notNull(),
	msg: text('message'),
})