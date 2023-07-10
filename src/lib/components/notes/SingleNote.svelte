<script lang="ts">
	import { books } from '$lib/stores'; // the books array as ususal
	import EditSvg from '$lib/assets/EditSvg.svelte'; // the icons
	import DeleteSvg from '$lib/assets/DeleteSvg.svelte';
	import ActionsModal from '$lib/components/ActionsModal.svelte'; // the modal for actions
	export let currentBookIndex: number; // this prop will be fulfilled by the notes.svelte
	export let noteId: string; // the noteId which will be fulfilled by the notes.svelte
	const noteIndex = $books[currentBookIndex].notes.findIndex((note) => note.id === noteId); // this goes over the notes array and finds the index of the note using the id
	let showDeleteModal = false; // for the delete modal
	let showEditModal = false; // for the edit modal
	let errorMessage = '';
	let title = '';
	function deleteNote() {
		// it removes the note from the notes array using its index
		$books[currentBookIndex].notes.splice(noteIndex, 1);
		$books = $books; // #svelte
		showDeleteModal = false; // closes the modal
	}
	function onEdit() {
		// this function causes the editing of a book
		if (
			// if the title is duplicate with any other title in notes, then error message is given
			$books[currentBookIndex].notes[noteIndex].title !== title.trim() &&
			$books[currentBookIndex].notes.some((note) => note.title === title.trim())
		) {
			errorMessage = `Ouch!😬 note title '${title}' is in use, try another🙏`;
		} else {
			// else, the the trimmed title is stored as the new title for the book in this component, and closes the edit modal
			$books[currentBookIndex].notes[noteIndex].title = title.trim();
			showEditModal = false;
		}
	}
</script>

<div>
	<div class="notes-container">
		<!--for preserving the whitespaces-->
		<p>{@html $books[currentBookIndex].notes[noteIndex].title.replace(/ /g, '&nbsp;')}</p>
		<!--title of the note-->
		<div class="actions">
			<div
				class="icon"
				on:click={() => (showEditModal = true)}
				on:keydown={() => (showEditModal = true)}
			>
				<EditSvg />
			</div>
			<!--the edit and delete icon for doing opertation in the note-->
			<div
				class="icon"
				on:click={() => (showDeleteModal = true)}
				on:keydown={() => (showDeleteModal = true)}
			>
				<DeleteSvg />
			</div>
		</div>
	</div>
	<hr />
</div>
{#if showDeleteModal}
	<ActionsModal
		whatAction="delete"
		on:cancel={() => (showDeleteModal = false)}
		on:proceed={deleteNote}
		title={$books[currentBookIndex].notes[noteIndex].title}
		><svelte:fragment slot="delete"
			>you sure? this note cannot be recovered after deletion!<br />note:</svelte:fragment
		></ActionsModal
	>
{:else if showEditModal}
	<ActionsModal
		whatAction="edit"
		on:cancel={() => {
			showEditModal = false;
			title = '';
		}}
		bind:title
		oldTitle={$books[currentBookIndex].notes[noteIndex].title}
		on:proceed={onEdit}
		{errorMessage}
		><svelte:fragment slot="edit"
			>edit the title of your note : <br />{@html title.replace(/ /g, '&nbsp;')}<span
				>(max 30 characters)</span
			></svelte:fragment
		></ActionsModal
	>
{/if}

<style>
	/* some shitty styles */
	div {
		font-family: Arial, Helvetica, sans-serif;
	}
	p {
		margin: 0;
		font-size: 1.43rem;
	}

	.notes-container {
		margin-right: 1.5rem;
		margin-left: 1.5rem;
		margin-top: 2.3rem;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	hr {
		margin-right: 1rem;
		margin-left: 1rem;
	}

	.actions {
		display: flex;
		height: 100%;
		width: 14%;
		justify-content: space-around;
	}
	.icon {
		height: 40%;
		width: 40%;
		display: flex;
		justify-content: center;
		cursor: pointer;
	}
</style>
