import { derived, writable } from 'svelte/store'; // import the writable and derived store from svelte
type ID = string | null;
export const books = writable<Book[]>([
	// the books array , which is array of book objects
	// the book interface is in the global.d.ts file
	{
		id: crypto.randomUUID(), // i have used the crypto.randomuuid to generate the unique id
		title: `Typescript`,
		notes: [{ id: crypto.randomUUID(), title: `Example note`, content: `# Hello world` }]
	},
	{
		id: crypto.randomUUID(),
		title: `Python`,
		notes: [{ id: crypto.randomUUID(), title: `Example note`, content: `# Hello world` }]
	}
]);

export const currentBookId = writable<ID>(null);

export const currentBookIndex = derived([books, currentBookId], ([$books, $currentBookId]) => {
	return $books.findIndex((book) => book.id === $currentBookId);
});
export const currentNoteId = writable<ID>(null);

export const currentNoteIndex = derived(
	[books, currentNoteId, currentBookIndex],
	([$books, $currentNoteId, $currentBookIndex]) => {
		return $books[$currentBookIndex].notes.findIndex((note) => note.id === $currentNoteId);
	}
);
