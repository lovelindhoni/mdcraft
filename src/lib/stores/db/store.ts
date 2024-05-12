import { writable } from 'svelte/store';
import { getValue, setValue } from './db';

const folders = writable<Folder[]>(await getValue<Folder[]>('folders'));

folders.subscribe((value) => {
	setValue('folders', value);
});

const currentFolderId = writable<ID>(await getValue<ID>('currentFolderId'));
currentFolderId.subscribe((value) => {
	setValue('currentFolderId', value);
});

const currentNoteId = writable<ID>(await getValue<ID>('currentNoteId'));
currentNoteId.subscribe((value) => {
	setValue('currentNoteId', value);
});

export { folders, currentFolderId, currentNoteId };
