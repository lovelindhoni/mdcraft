// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface Note {
		// this Note interface is the interface of the Note objects
		id: string; // unique id for each note in a book, crytpo.randomuuid will be used for id's
		title: string; // the title of the note
		content: string; // the note's content in markdown syntax
	}
	interface Book {
		// the interface for the Book objects
		id: string; // unique id for each book in the books array
		title: string; // title of the book
		notes: Note[]; // each book contains the chapters array which is a array of notes
	}
}

export {};
