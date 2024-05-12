import { generateUUID } from '$lib/utils/globals';

class CreateNote implements Note {
	// this class generates the note objects which will be pushed to the folder.notes array
	id: Note['id'];
	title: Note['title'];
	content: Note['content'];
	constructor(title: Note['title']) {
		this.id = generateUUID();
		this.title = title;
		this.content = `# Hello world`;
	}
}

export { CreateNote };
