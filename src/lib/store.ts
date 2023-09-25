import { writable } from 'svelte/store';
import defaultData from '$lib/defaultData.json';
type ID = string | null;

const defaultValues: { folders: Folder[]; currentNoteId: ID; currentFolderId: ID } = {
	folders: [
		// the folders array , which is array of folder objects
		// the Folder interface is in the global.d.ts file
		{
			id: crypto.randomUUID(),
			title: `Markdown`,
			notes: [
				{
					// This note is a reference to markdown syntax elements.
					id: crypto.randomUUID(),
					title: `Markdown Cheatsheet`,
					content: defaultData.markdown.mdcheatsheet
				},
				{
					// Project's readme
					id: crypto.randomUUID(),
					title: `README.md`,
					content: defaultData.markdown.readmemd
				}
			]
		},
		{
			id: crypto.randomUUID(),
			title: `Python`,
			notes: [
				{
					id: crypto.randomUUID(),
					title: `Python Basics`,
					content: defaultData.python.pythonbasics
				},
				{
					id: crypto.randomUUID(),
					title: `Python OOPS`,
					content: defaultData.python.pythonoops
				},
				{
					id: crypto.randomUUID(),
					title: `Error Handling and File I/O`,
					content: defaultData.python.pythonfilehandiling
				}
			]
		},
		{
			id: crypto.randomUUID(),
			title: `Typescript`,
			notes: [
				{
					id: crypto.randomUUID(),
					title: `Typescript Basics`,
					content: defaultData.typescript.typescriptbasics
				},
				{
					id: crypto.randomUUID(),
					title: `Advanced Typescript Concepts`,
					content: defaultData.typescript.advancedtypescript
				},
				{
					id: crypto.randomUUID(),
					title: `Typescript in Practice`,
					content: defaultData.typescript.typescriptinpractice
				}
			]
		},
		{
			id: crypto.randomUUID(),
			title: `SQL`,
			notes: [
				{
					id: crypto.randomUUID(),
					title: `Data Query and Retrieval`,
					content: defaultData.sql.dataquery
				},
				{
					id: crypto.randomUUID(),
					title: `Data Modification and Management`,
					content: defaultData.sql.datamodifications
				},
				{
					id: crypto.randomUUID(),
					title: `Database Schema and Indexing`,
					content: defaultData.sql.dataindexing
				}
			]
		}
	],
	// both the id's are default to null at first. it also has the type string becuase of crypt.randomuuid
	currentFolderId: null,
	currentNoteId: null
};
if (matchMedia('(min-width:1024px)').matches) {
	defaultValues.currentFolderId = defaultValues.folders[0].id;
	defaultValues.currentNoteId = defaultValues.folders[0].notes[1].id;
}
let db: IDBDatabase | null = null; // Initialize a variable to hold the database reference

function openDB() {
	// Return a promise that resolves with the database instance
	return new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open('myDatabase', 1); // Open the 'myDatabase' with version 1

		request.onerror = (event) => {
			reject(request.error); // Reject the promise if there is an error during database open
		};

		request.onsuccess = (event) => {
			resolve(request.result); // Resolve the promise with the database instance when it's successfully opened
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result; // Get the database instance during an upgrade
			db.createObjectStore('data', { keyPath: 'key' }); // Create an object store called 'data' with a key path of 'key'
		};
	});
}

async function getValue<T>(key: string): Promise<T> {
	if (!db) {
		db = await openDB(); // Open the database if it hasn't been opened yet
	}

	return new Promise<T>((resolve, reject) => {
		const transaction = db!.transaction('data', 'readonly'); // Start a readonly transaction on the 'data' object store
		const objectStore = transaction.objectStore('data');
		const request = objectStore.get(key); // Get a value by key

		request.onsuccess = (event) => {
			/*@ts-ignore */ // I am so sorry, i had to :(
			resolve(request.result ? request.result.value : defaultValues[key]); // Resolve with the value or a default value if not found
		};

		request.onerror = (event) => {
			reject(request.error); // Reject if there is an error during the operation
		};
	});
}

async function setValue<T>(key: string, value: T) {
	if (!db) {
		db = await openDB(); // Open the database if it hasn't been opened yet
	}

	return new Promise<void>((resolve, reject) => {
		const transaction = db!.transaction('data', 'readwrite'); // Start a readwrite transaction on the 'data' object store
		const objectStore = transaction.objectStore('data');
		const request = objectStore.put({ key, value }); // Put a key-value pair into the object store

		request.onsuccess = (event) => {
			resolve(); // Resolve when the operation is successful
		};

		request.onerror = (event) => {
			reject(request.error); // Reject if there is an error during the operation
		};
	});
}

export const folders = writable<Folder[]>(await getValue<Folder[]>('folders'));

folders.subscribe((value) => {
	setValue('folders', value);
});

export const currentFolderId = writable<ID>(await getValue<ID>('currentFolderId'));
currentFolderId.subscribe((value) => {
	setValue('currentFolderId', value);
});

export const currentNoteId = writable<ID>(await getValue<ID>('currentNoteId'));
currentNoteId.subscribe((value) => {
	setValue('currentNoteId', value);
});

// sorry, i can't resist putting this function here.
export function focusInput(node: HTMLInputElement) {
	node.focus(); // Focuses the textarea if it is present on DOM using the svetle action
	return {
		destroy() {
			// when it is removed out of dom then focus is blurred
			node.blur();
		}
	};
}
