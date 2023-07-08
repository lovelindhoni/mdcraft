<script lang="ts">
	import Viewer from '$lib/components/Viewer.svelte'; // Importing the Viewver component
	import { onMount } from 'svelte'; // onMount for adding the keybaord shortcut to the window
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte'; // the sidebar 
	import Notes from '$lib/components/notes/Notes.svelte'; // imported notes component
	let edit = true; // The prop that is passed to the Viewver.svelte
	// Below function adds a keyboard shortcut for toggling the checkbox
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'Enter') {
			edit = !edit; // Toggles the editor, the shortcut is Ctrl + Enter
		}
	};
	onMount(() => {
		// Adds the shorcut to the window onmount
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			// Removes the shortcut from the window ondestroy
			window.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<div class="layout">
	<div class="header">header</div>
	<div class="toggle">
		<input id="toggleEditor" type="checkbox" bind:checked={edit} />
		<label for="toggleEditor">Edit (Ctrl + Enter)</label>
	</div>
	<div class="sidebar">
		<Sidebar />
	</div>
	<div class="editor">
		<Notes/> <!--used notes component temporarily for this commit-->
	</div>
</div>

<style>
	.layout {
		height: 97vh;
		box-sizing: border-box;
		display: grid;
		gap: 0.25rem;
		grid-template-rows: repeat(20, 5%);
		grid-template-columns: repeat(20, 5%);
		margin-right: 0.5rem; /* for mobiles margin-right : 3.5rem */
	}

	.editor,
	.toggle,
	.header,
	.sidebar {
		border: 0.2rem solid;
	}
	.header {
		grid-row-start: span 2;
		grid-column-start: span 7;
	}
	.sidebar {
		grid-row: 3 / span 16;
		grid-column-start: span 7;
		overflow-y: auto;
	}
	.toggle {
		grid-column-start: span 12;
		grid-row-start: span 1;
	}
	.editor {
		grid-row: 2 / span 17;
		grid-column-start: span 12;
		height : 100%;
		width:100%;
	}
</style>
