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

> blockquote

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
let db: IDBDatabase | null = null; // type of the database

function openDB() {
	return new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open('myDatabase', 1);

		request.onerror = (event) => {
			reject(request.error);
		};

		request.onsuccess = (event) => {
			resolve(request.result);
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			db.createObjectStore('data', { keyPath: 'key' });
		};
	});
}

async function getValue<T>(key: string): Promise<T> {
	if (!db) {
		db = await openDB();
	}

	return new Promise<T>((resolve, reject) => {
		const transaction = db!.transaction('data', 'readonly');
		const objectStore = transaction.objectStore('data');
		const request = objectStore.get(key);

		request.onsuccess = (event) => {
			resolve(request.result ? request.result.value : defaultValues[key]);
		};

		request.onerror = (event) => {
			reject(request.error);
		};
	});
}

async function setValue<T>(key: string, value: T) {
	if (!db) {
		db = await openDB();
	}

	return new Promise<void>((resolve, reject) => {
		const transaction = db!.transaction('data', 'readwrite');
		const objectStore = transaction.objectStore('data');
		const request = objectStore.put({ key, value });

		request.onsuccess = (event) => {
			resolve();
		};

		request.onerror = (event) => {
			reject(request.error);
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
