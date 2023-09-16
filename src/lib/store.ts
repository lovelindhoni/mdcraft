import { writable } from 'svelte/store';

type ID = string | null;

const defaultValues: Record<string, Folder[] | ID> = {
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
					content: `# Markdown Cheat Sheet

Thanks for visiting Sparkdown!!

This cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, refer to the reference guides for [basic syntax](https://www.markdownguide.org/basic-syntax) and [extended syntax](https://www.markdownguide.org/extended-syntax).
 
### Heading

# H1
## H2
### H3

### Bold

**bold text**

### Italic

*italicized text*

### Blockquote

> Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- First item
- Second item
- Third item

### Code

\`code\`

### Horizontal Rule

---

### Link

[Markdown Guide](https://www.markdownguide.org)

### Image

![alt text](https://www.markdownguide.org/assets/images/tux.png)


### Table

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title |
| Paragraph   | Text |

### Fenced Code Block

\`\`\` ts
function greetUser(name : string): string {
    return 'hello' + name
}
console.log(greetUser('Homelander'));
\`\`\`


### Strikethrough

~~The world is flat.~~

### Task List

- [x] Write the press release
- [x] Update the website
- [ ] Contact the media

### Emoji

That is so funny! :joy:

### Highlight

I need to highlight these ==very important words==.

`
				}
			]
		},
		{
			id: crypto.randomUUID(),
			title: `Python`,
			notes: [{ id: crypto.randomUUID(), title: `Example note`, content: `# Hello world` }]
		}
	],
	// both the id's are default to null at first. it also has the type string becuase of crypt.randomuuid
	currentFolderId: null,
	currentNoteId: null
};
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
export function focusInput(node: HTMLInputElement | HTMLTextAreaElement) {
	node.focus(); // Focuses the textarea if it is present on DOM using the svetle action
	return {
		destroy() {
			// when it is removed out of dom then focus is blurred
			node.blur();
		}
	};
}
