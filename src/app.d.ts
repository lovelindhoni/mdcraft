// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	// i am declaring a global for the Note and the Folder so that it can be used thorughout the codebase
	interface Note {
		// this Note interface is the interface of the Note objects
		id: string; // unique id for each note in a Folder, crytpo.randomuuid will be used for id's
		title: string; // the title of the note
		content: string; // the note's content in markdown syntax
	}
	interface Folder {
		// the interface for the Folder objects
		id: string; // unique id for each Folder in the Folders array
		title: string; // title of the Folder
		notes: Note[]; // each Folder contains the notes array which is a array of notes
	}

	type ID = string | null;
}

export {};
