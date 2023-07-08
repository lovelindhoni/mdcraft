<script lang="ts">
	import { books } from '$lib/stores'; // the books array as ususal
	import AddSvg from '$lib/assets/AddSvg.svelte'; 
	import type {Note} from '$lib/stores'; // importing note interface to ensure class shape
	export let currentBookIndex: number; // this prop will be fulfilled by the notes.svelte
	class CreateNote implements Note{ // this class generates the note objects which will be pushed to the book.notes array
		id: number;
		title: string;
		content: string;
		constructor(id: number, title: string, content: string) {
			this.id = id;
			this.title = title;
			this.content = content;
		}
	}
	function pushNote() {
		$books[currentBookIndex].notes.push( // this note will be pushed to the notes array of the currentbook
			new CreateNote(
				// if the notes array is empty then, the id will be zero, else, the id will be one greater than the last object's id in that array
				$books[currentBookIndex].notes.length === 0 ? 0 : $books[currentBookIndex].notes[$books[currentBookIndex].notes.length - 1].id + 1,
				'Sample Note',
				`# Hello world`
			)
		);
		$books = $books; 
	}
</script>

<button class="notebutton" on:click={pushNote} on:keydown={pushNote}>
	<div class="newnotebtn">
		<AddSvg />
	</div>
</button>

<style>
	/* some temporary shitty styles */
	button {
		width: 11%;
		height: 100%;
		border-radius: 1rem;
		font-family: Arial, Helvetica, sans-serif;
		box-sizing: border-box;
	}
	.newnotebtn {
		display: flex;
		gap: 0.3rem;
		justify-content: center;
		align-items: center;
	}
</style>
