import { writable } from 'svelte/store'; // import the writable and derived store from svelte
import { browser } from '$app/environment';
type ID = string | null;
const defaultValues: Record<string, Folder[] | ID> = {
	folders: [
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
	],
	currentFolderId: null,
	currentNoteId: null
};

function getValue<T>(key: string): T {
	if (browser && localStorage.hasOwnProperty(key)) {
		return JSON.parse(localStorage.getItem(key) as string) as T;
	} else {
		return defaultValues[key] as T;
	}
}

export const folders = writable<Folder[]>(getValue<Folder[]>('folders'));
folders.subscribe((value) => {
	if (browser) {
		localStorage.setItem('folders', JSON.stringify(value));
	}
});
export const currentFolderId = writable<ID>(getValue<ID>('currentFolderId'));
currentFolderId.subscribe((value) => {
	if (browser) {
		localStorage.setItem('currentFolderId', JSON.stringify(value));
	}
});
export const currentNoteId = writable<ID>(getValue<ID>('currentNoteId'));
currentNoteId.subscribe((value) => {
	if (browser) {
		localStorage.setItem('currentNoteId', JSON.stringify(value));
	}
});
export function focusInput(node: HTMLInputElement | HTMLTextAreaElement) {
	node.focus(); // Focuses the textarea if it is present on DOM using the svetle action
	return {
		destroy() {
			// when it is removed out of dom then focus is blurred
			node.blur();
		}
	};
}
