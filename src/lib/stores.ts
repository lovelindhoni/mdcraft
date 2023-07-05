import { writable } from 'svelte/store'; // import the writable store from svelte
interface Note {
	// this Note interface is the interface of the Note objects
	id: number; // unique id for each note in a book
	title: string; // the title of the note
	content: string; // the note's content in markdown syntax
}
export interface Book {
	// the interface for the Book objects
	id: number; // unique id for each book in the books array
	title: string; // title of the book
	chapter: Note[]; // each book contains the chapters array which is a array of notes
}
export const books = writable<Book[]>([
	// the books array , which is array of book objects
	{ id: 0, title: 'Typescript', chapter: [] },
	{ id: 1, title: 'Python', chapter: [] }
]);
export const currentBook = writable<number | null>(null);
export const currentTitleId = writable<number | null>(null);
