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
	let size = matchMedia('(min-width:1740px)').matches
		? '28'
		: matchMedia('(min-width:1430px) and (max-width:1739px)').matches
		? '23'
		: '21';
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
			<svelte:component this={EditSvg} color={iconColor} {size} />
		</div>
		<!--the rename and delete icon for doing opertation in the note-->
		<div
			class="icon"
			role="button"
			tabindex="0"
			on:click|stopPropagation={() => (showDeleteModal = true)}
			on:keydown|stopPropagation={() => (showDeleteModal = true)}
		>
			<svelte:component this={DeleteSvg} color={iconColor} {size} />
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
	@media screen and (min-width: 1740px) {
		p {
			font-size: 1.7rem;
		}
		.notes-container {
			height: 5rem;
			border-top-left-radius: 1rem;
			border-top-right-radius: 1rem;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			border-bottom: 3px solid var(--light-purple);
		}
		.actions {
			gap: 0.8rem;
			margin-right: 0.5rem;
		}
		.selected {
			border-bottom-left-radius: 1rem;
			border-bottom-right-radius: 1rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		p {
			font-size: 1.43rem;
		}
		.notes-container {
			height: 3.8rem;
			border-top-left-radius: 0.9rem;
			border-top-right-radius: 0.9rem;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			border-bottom: 2px solid var(--light-purple);
		}
		.selected {
			border-bottom-left-radius: 0.9rem;
			border-bottom-right-radius: 0.9rem;
		}
	}
	@media screen and (min-width: 1301px) and (max-width: 1429px) {
		p {
			font-size: 1.32rem;
		}
		.notes-container {
			height: 3.42rem;
			border-top-left-radius: 0.8rem;
			border-top-right-radius: 0.8rem;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			border-bottom: 2px solid var(--light-purple);
		}
		.selected {
			border-bottom-left-radius: 0.8rem;
			border-bottom-right-radius: 0.8rem;
		}
	}
	@media screen and (max-width: 1300px) {
		p {
			font-size: 1.3rem;
		}
		.notes-container {
			height: 3.4rem;
			border-top-left-radius: 0.8rem;
			border-top-right-radius: 0.8rem;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			border-bottom: 2px solid var(--light-purple);
		}
		.selected {
			border-bottom-left-radius: 0.8rem;
			border-bottom-right-radius: 0.8rem;
		}
	}
	.notes-container {
		width: 75%;
		margin-bottom: 1.3rem;
		padding-left: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		margin-right: auto;
		margin-left: auto;
	}
	.selected {
		background-color: var(--purple);
		color: white;
		border-bottom: 2px solid var(--purple);
	}
	.actions {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100%;
		width: 6.2rem;
	}
	.icon {
		display: flex;
		justify-content: center;
		cursor: pointer;
		height: 40%;
		width: 40%;
	}
</style>
