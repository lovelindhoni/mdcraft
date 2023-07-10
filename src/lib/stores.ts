import { writable } from 'svelte/store'; // import the writable store from svelte
export interface Note {
	// this Note interface is the interface of the Note objects
	id: string; // unique id for each note in a book, crytpo.randomuuid will be used for id's
	title: string; // the title of the note
	content: string; // the note's content in markdown syntax
}
export interface Book {
	// the interface for the Book objects
	id: string; // unique id for each book in the books array
	title: string; // title of the book
	notes: Note[]; // each book contains the chapters array which is a array of notes
}
export const books = writable<Book[]>([
	// the books array , which is array of book objects
	{
		id: crypto.randomUUID(), // i have used the crytp.randomuuid to generate the unique id
		title: `Typescript`,
		notes: [{ id: crypto.randomUUID(), title: `example note`, content: `hello world` }]
	},
	{
		id: crypto.randomUUID(),
		title: `Python`,
		notes: [{ id: crypto.randomUUID(), title: `example note`, content: `hello world` }]
	}
]);
export const currentBookId = writable<string | null>(null);
export const currentTitleId = writable<string | null>(null);
