import data from './data.json';
import { generateUUID } from '$lib/utils/globals';

const defaultValues: { folders: Folder[]; currentNoteId: ID; currentFolderId: ID } = {
	folders: [
		// the folders array , which is array of folder objects
		{
			id: generateUUID(),
			title: `Markdown`,
			notes: [
				{
					// This note is a reference to markdown syntax elements.
					id: generateUUID(),
					title: `Markdown Cheatsheet`,
					content: data.markdown.mdcheatsheet
				},
				{
					// Project's readme
					id: generateUUID(),
					title: `README.md`,
					content: data.markdown.readmemd
				}
			]
		},
		{
			id: generateUUID(),
			title: `Typescript`,
			notes: [
				{
					id: generateUUID(),
					title: `Typescript Basics`,
					content: data.typescript.typescriptbasics
				},
				{
					id: generateUUID(),
					title: `Advanced Typescript Concepts`,
					content: data.typescript.advancedtypescript
				},
				{
					id: generateUUID(),
					title: `Typescript in Practice`,
					content: data.typescript.typescriptinpractice
				}
			]
		},
		{
			id: generateUUID(),
			title: `SQL`,
			notes: [
				{
					id: generateUUID(),
					title: `Data Query and Retrieval`,
					content: data.sql.dataquery
				},
				{
					id: generateUUID(),
					title: `Data Modification and Management`,
					content: data.sql.datamodifications
				},
				{
					id: generateUUID(),
					title: `Database Schema and Indexing`,
					content: data.sql.dataindexing
				}
			]
		}
	],
	// both the id's are default to null at first. it also has the type string because of crypt.randomuuid
	currentFolderId: null,
	currentNoteId: null
};

if (matchMedia('(min-width:1024px)').matches) {
	defaultValues.currentFolderId = defaultValues.folders[0].id;
	defaultValues.currentNoteId = defaultValues.folders[0].notes[1].id;
}

export default defaultValues;
