import { generateUUID } from '$lib/utils/globals';

class CreateFolder implements Folder {
	// class to create new folder objects
	id: Folder['id']; // the id
	title: Folder['title']; // the title
	notes: Folder['notes']; // and the notes array
	// the constructor needs the id and the title, the chapters will be implemented later
	constructor(title: Folder['title']) {
		this.id = generateUUID(); // generates a unique id
		this.title = title;
		this.notes = [{ id: generateUUID(), title: `Example Note`, content: `# Hello World` }]; // some defaults
	}
}

export { CreateFolder };
