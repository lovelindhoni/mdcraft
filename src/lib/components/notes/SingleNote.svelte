<script lang="ts">
	import { books } from '$lib/store'; // the books array as ususal
	import { onMount } from 'svelte';
	let EditSvg: any; // the icons
	let DeleteSvg: any;
	let RenameAction: any; // the modals
	let DeleteAction: any;
	onMount(async () => {
		EditSvg = (await import('$lib/assets/EditSvg.svelte')).default;
		DeleteSvg = (await import('$lib/assets/DeleteSvg.svelte')).default;
		RenameAction = (await import('$lib/components/actions/RenameAction.svelte')).default;
		DeleteAction = (await import('$lib/components/actions/DeleteAction.svelte')).default;
	});
	export let noteId: string; // the noteId which will be fulfilled by the notesSection.svelte
	export let currentBookIndex: number; // also  fulfilled by the notesection
	$: noteIndex = $books[currentBookIndex].notes.findIndex((note) => note.id === noteId); // this goes over the notes array and finds the index of the note using the id
	let showDeleteModal = false; // for the delete modal
	let showRename = false; // for the rename modal
	let noError = true;
	let title = '';
	function deleteNote() {
		// it removes the note from the notes array using its index
		$books[currentBookIndex].notes.splice(noteIndex, 1);
		$books = $books;
		showDeleteModal = false; // closes the modal
	}
	function onRename() {
		// this function causes the renaming of a book
		if (
			// if the title is duplicate with any other title in notes, then noError is false
			$books[currentBookIndex].notes[noteIndex].title !== title.trim() &&
			$books[currentBookIndex].notes.some((note) => note.title === title.trim())
		) {
			noError = false;
		} else {
			// else, the the trimmed title is stored as the new title for the book in this component, and closes the rename modal
			$books[currentBookIndex].notes[noteIndex].title = title.trim();
			showRename = false;
		}
	}
</script>

<div>
	<div role="button" tabindex="0" class="notes-container" on:click on:keydown>
		<!--for preserving the whitespaces-->
		<p>{@html $books[currentBookIndex].notes[noteIndex].title.replace(/ /g, '&nbsp;')}</p>
		<!--title of the note-->
		<div class="actions" role="group">
			<div
				role="button"
				tabindex="0"
				class="icon"
				on:click|stopPropagation={() => (showRename = true)}
				on:keydown|stopPropagation={() => (showRename = true)}
			>
				<svelte:component this={EditSvg} />
			</div>
			<!--the rename and delete icon for doing opertation in the note-->
			<div
				class="icon"
				role="button"
				tabindex="0"
				on:click|stopPropagation={() => (showDeleteModal = true)}
				on:keydown|stopPropagation={() => (showDeleteModal = true)}
			>
				<svelte:component this={DeleteSvg} />
			</div>
		</div>
	</div>
	<hr />
</div>
{#if showDeleteModal}
	<svelte:component
		this={DeleteAction}
		on:cancel={() => (showDeleteModal = false)}
		on:proceed={deleteNote}
		><svelte:fragment
			>Are you sure you want to delete this note?</svelte:fragment
		></svelte:component
	>
{:else if showRename}
	<svelte:component
		this={RenameAction}
		on:cancel={() => {
			showRename = false;
			noError = true;
			title = '';
		}}
		bind:title
		oldTitle={$books[currentBookIndex].notes[noteIndex].title}
		on:proceed={onRename}
		{noError}>Rename Note</svelte:component
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
		margin-bottom: 1rem;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		cursor: pointer;
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
