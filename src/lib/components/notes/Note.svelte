<script lang="ts">
	import { folders } from '$lib/store'; // the folders array as ususal
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
	export let currentFolderIndex: number; // also  fulfilled by the notesection
	$: noteIndex = $folders[currentFolderIndex].notes.findIndex((note) => note.id === noteId); // this goes over the notes array and finds the index of the note using the id
	let showDeleteModal = false; // for the delete modal
	let showRename = false; // for the rename modal
	let noError = true;
	let title = '';
	function deleteNote() {
		// it removes the note from the notes array using its index
		$folders[currentFolderIndex].notes.splice(noteIndex, 1);
		$folders = $folders;
		showDeleteModal = false; // closes the modal
	}
	function onRename() {
		// this function causes the renaming of a folder
		if (
			// if the title is duplicate with any other title in notes, then noError is false
			$folders[currentFolderIndex].notes[noteIndex].title !== title.trim() &&
			$folders[currentFolderIndex].notes.some((note) => note.title === title.trim())
		) {
			noError = false;
		} else {
			// else, the the trimmed title is stored as the new title for the folder in this component, and closes the rename modal
			$folders[currentFolderIndex].notes[noteIndex].title = title.trim();
			showRename = false;
		}
	}
	let iconColor: string; // the variable used to changes the color of the icons at selection. This is passed to the icons comps
	let selected = false; // this variable decides to apply the styling when the note is hovered
</script>

<div
	on:mouseover={() => {
		selected = true;
		iconColor = 'white';
	}}
	on:mouseout={() => {
		selected = false;
		iconColor = '';
	}}
	on:focus={() => {
		selected = true;
		iconColor = 'white';
	}}
	on:blur={() => {
		selected = false;
		iconColor = '';
	}}
	role="button"
	tabindex="0"
	class="notes-container"
	class:selected
	on:click
	on:keydown
>
	<!--for preserving the whitespaces-->
	<p>{@html $folders[currentFolderIndex].notes[noteIndex].title.replace(/ /g, '&nbsp;')}</p>
	<!--title of the note-->
	<div class="actions" role="group">
		<div
			role="button"
			tabindex="0"
			class="icon"
			on:click|stopPropagation={() => (showRename = true)}
			on:keydown|stopPropagation={() => (showRename = true)}
		>
			<svelte:component this={EditSvg} color={iconColor} />
		</div>
		<!--the rename and delete icon for doing opertation in the note-->
		<div
			class="icon"
			role="button"
			tabindex="0"
			on:click|stopPropagation={() => (showDeleteModal = true)}
			on:keydown|stopPropagation={() => (showDeleteModal = true)}
		>
			<svelte:component this={DeleteSvg} color={iconColor} />
		</div>
	</div>
</div>
{#if showDeleteModal}
	<svelte:component
		this={DeleteAction}
		on:cancel={() => (showDeleteModal = false)}
		on:proceed={deleteNote}>Delete Note?</svelte:component
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
		oldTitle={$folders[currentFolderIndex].notes[noteIndex].title}
		on:proceed={onRename}
		{noError}>Rename Note</svelte:component
	>
{/if}

<style>
	p {
		margin: 0;
		font-size: 1.35rem;
	}

	.notes-container {
		margin-right: 1.5rem;
		margin-left: 1.5rem;
		height: 11%;
		margin-bottom: 1.3rem;
		padding-left: 1rem;
		border-radius: 0.6rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		border-bottom: 2px solid var(--light-purple);
	}
	.selected {
		background-color: var(--purple);
		color: white;
		border-bottom: 2px solid var(--purple);
	}
	.actions {
		display: flex;
		height: 100%;
		width: 14%;
		justify-content: space-around;
		align-items: center;
	}
	.icon {
		height: 40%;
		width: 40%;
		display: flex;
		justify-content: center;
		cursor: pointer;
	}
</style>
