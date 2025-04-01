import { db } from '$lib/server/db'; // Database client using Drizzle ORM
import * as schema from '$lib/server/db/schema'; // Importing all table schemas
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

// Define request parameter types
interface RequestParams {
	params: { table: string };
}

// Define request body types
interface RequestBody<T = any> {
	request: { json: () => Promise<T> };
}

// Function to handle GET requests (fetching all records from a table)
export async function GET({ params }: RequestParams) {
	const { table } = params; // Extract table name from parameters
	const tableSchema = schema[table as keyof typeof schema]; // Get table schema dynamically

	if (!tableSchema) {
		return json({ error: 'Table not found' }, { status: 404 });
	}

	try {
		// Fetch all records from the specified table
		const records = await db.select().from(tableSchema);
		return json(records, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ error: 'Database error' }, { status: 500 });
	}
}

// Function to handle POST requests (inserting a new record)
export async function POST({ request, params }: RequestParams & RequestBody<{ data: any }>) {
	const { table } = params;
	const { data } = await request.json(); // Parse request body to get data
	const tableSchema = schema[table as keyof typeof schema];

	if (!tableSchema) {
		return json({ error: 'Table not found' }, { status: 404 });
	}

	try {
		// Insert new record into the specified table
		const createdRecord = await db.insert(tableSchema).values(data);
		return json(createdRecord, { status: 201 });
	} catch (error) {
		console.error(error);
		return json({ error: 'Database error' }, { status: 500 });
	}
}

// Function to handle PUT requests (updating a record by ID)
export async function PUT({ request, params }: RequestParams & RequestBody<{ id: number; data: any }>) {
	const { table } = params;
	const { id, data } = await request.json(); // Parse request body to get ID and data for update
	const tableSchema = schema[table as keyof typeof schema];

	if (!tableSchema) {
		return json({ error: 'Table not found' }, { status: 404 });
	}

	try {
		// Update record in the specified table by ID
		const updatedRecord = await db.update(tableSchema)
			.set(data)
			.where(eq((tableSchema as any).id, id)); // Using 'eq' for ID comparison
		return json(updatedRecord, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ error: 'Database error' }, { status: 500 });
	}
}

// Function to handle DELETE requests (deleting a record by ID)
export async function DELETE({ request, params }: RequestParams & RequestBody<{ id: number }>) {
	const { table } = params;
	const { id } = await request.json(); // Parse request body to get ID for deletion
	const tableSchema = schema[table as keyof typeof schema];

	if (!tableSchema) {
		return json({ error: 'Table not found' }, { status: 404 });
	}

	try {
		// Delete record from the specified table by ID
		await db.delete(tableSchema).where(eq((tableSchema as any).id, id));
		return json({ message: 'Record deleted' }, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ error: 'Database error' }, { status: 500 });
	}
}