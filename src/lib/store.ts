import { writable } from 'svelte/store'; // import the writable from svelte
export const books = writable<Book[]>([
	// the books array , which is array of book objects
	// the book interface is in the global.d.ts file
	{
		id: crypto.randomUUID(), // i have used the crypto.randomuuid to generate the unique id
		title: `Next JS`,
		notes: [{ id: crypto.randomUUID(), title: `Example note`, content: `# Hello world` }]
	},
	{
		id: crypto.randomUUID(),
		title: `Sveltekit`,
		notes: [{ id: crypto.randomUUID(), title: `Example note`, content: `# Hello world` }]
	}
]);
// both the id's are default to null at first. it also has the type sting becuase of crypt.randomuuid
export const currentBookId = writable<string | null>(null);
export const currentNoteId = writable<string | null>(null);
export function focusInput(node: HTMLInputElement | HTMLTextAreaElement) {
	node.focus(); // Focuses the textarea if it is present on DOM using the svetle action
	return {
		destroy() {
			// when it is removed out of dom then focus is blurred
			node.blur();
		}
	};
}
