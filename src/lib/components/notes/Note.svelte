<script lang="ts">
	import { folders } from '$lib/stores/db'; // the folders array as ususal
	import { onMount } from 'svelte'; // for lazy importing
	import EditSvg from '$lib/assets/svg/EditSvg.svelte';
	import DeleteSvg from '$lib/assets/svg/DeleteSvg.svelte';
	let RenameAction: any; // the modals
	let DeleteAction: any;
	onMount(async () => {
		RenameAction = (await import('$lib/components/modals/RenameModal.svelte')).default;
		DeleteAction = (await import('$lib/components/modals/DeleteModal.svelte')).default;
	});
	export let noteId: string; // the noteId which will be fulfilled by the notesSection.svelte
	export let currentFolderIndex: number; // also  fulfilled by the notesection
	$: noteIndex = $folders[currentFolderIndex].notes.findIndex((note) => note.id === noteId); // this goes over the notes array and finds the index of the note using the id
	let showDeleteModal = false; // for the delete modal
	let showRenameModal = false; // for the rename modal
	let error = false;
	let title = '';
	const deleteNote = () => {
		// it removes the note from the notes array using its index
		$folders[currentFolderIndex].notes.splice(noteIndex, 1);
		$folders = $folders;
		showDeleteModal = false; // closes the modal
	};
	const renameNote = () => {
		// this function causes the renaming of a folder
		if (
			// if the title is duplicate with any other title in notes, then error is false
			$folders[currentFolderIndex].notes[noteIndex].title !== title.trim() &&
			$folders[currentFolderIndex].notes.some((note) => note.title === title.trim())
		) {
			error = true;
		} else {
			// else, the the trimmed title is stored as the new title for the folder in this component, and closes the rename modal
			$folders[currentFolderIndex].notes[noteIndex].title = title.trim();
			showRenameModal = false;
		}
	};
	let size = matchMedia('(min-width:1740px)').matches
		? '28' // size of the icons, decided by the width of viewport
		: matchMedia('(min-width:1430px) and (max-width:1739px)').matches ||
		  matchMedia('(min-width:549px) and (max-width:1023px)').matches
		? '23'
		: '21';
	// below variables holds the color of the icon, when they are hovered orange else grey
	let editIconColor = '#b3b3b3';
	let deleteIconColor = '#b3b3b3';
</script>

<div role="button" tabindex="0" class="note-container" on:click on:keydown>
	<!--for preserving the whitespaces-->
	<span>{$folders[currentFolderIndex].notes[noteIndex].title}</span>
	<!--title of the note-->
	<div class="actions" role="group">
		<div
			on:mouseover={() => (editIconColor = '#f96743')}
			on:mouseout={() => (editIconColor = '#b3b3b3')}
			on:focus={() => (editIconColor = '#f96743')}
			on:blur={() => (editIconColor = '#b3b3b3')}
			role="button"
			tabindex="0"
			class="icon"
			title="edit"
			on:click|stopPropagation={() => (showRenameModal = true)}
			on:keydown|stopPropagation={() => (showRenameModal = true)}
		>
			<EditSvg color={editIconColor} {size} />
		</div>
		<!--the rename and delete icon for doing opertation in the note-->
		<div
			on:mouseover={() => (deleteIconColor = '#f96743')}
			on:mouseout={() => (deleteIconColor = '#b3b3b3')}
			on:focus={() => (deleteIconColor = '#f96743')}
			on:blur={() => (deleteIconColor = '#b3b3b3')}
			class="icon"
			title="delete"
			role="button"
			tabindex="0"
			on:click|stopPropagation={() => (showDeleteModal = true)}
			on:keydown|stopPropagation={() => (showDeleteModal = true)}
		>
			<DeleteSvg color={deleteIconColor} {size} />
		</div>
	</div>
</div>
{#if showDeleteModal}
	<svelte:component
		this={DeleteAction}
		on:cancel={() => (showDeleteModal = false)}
		on:proceed={deleteNote}>Delete Note?</svelte:component
	>
{:else if showRenameModal}
	<svelte:component
		this={RenameAction}
		on:cancel={() => {
			showRenameModal = false;
			error = false;
			title = '';
		}}
		bind:title
		oldTitle={$folders[currentFolderIndex].notes[noteIndex].title}
		on:proceed={renameNote}
		{error}>Rename Note</svelte:component
	>
{/if}

<style>
	@media (min-width: 1740px) {
		span {
			font-size: 1.7rem;
		}
		.note-container {
			height: 5rem;
		}
		.actions {
			gap: 0.8rem;
			margin-right: 0.5rem;
		}
	}
	@media (max-width: 1739px) {
		span {
			font-size: 1.43rem;
		}
		.note-container {
			height: 3.8rem;
		}
	}
	@media (max-width: 1429px) {
		span {
			font-size: 1.32rem;
		}
		.note-container {
			height: 3.42rem;
		}
	}
	@media (max-width: 1300px) {
		span {
			font-size: 1.3rem;
		}
		.note-container {
			height: 3.4rem;
		}
	}
	@media (min-width: 1024px) {
		.note-container {
			width: 75%;
		}
		.actions {
			padding-left: 0.4rem;
			padding-top: 0.1rem;
		}
	}
	@media (max-width: 1023px) {
		span {
			font-size: 1.45rem;
		}
		.note-container {
			height: 4rem;
			border-bottom: 1px solid var(--grey-1);
			width: 64%;
			padding-left: 0.6rem;
		}
		.actions {
			padding-left: 0.3rem;
			padding-right: 0.3rem;
		}
	}
	@media (max-width: 649px) {
		span {
			font-size: 1.45rem;
		}
		.note-container {
			height: 4rem;
			border-bottom: 1px solid var(--grey-1);
			width: 70%;
			padding-left: 0.3rem;
		}
	}
	@media (max-width: 549px) {
		span {
			font-size: 1.2rem;
		}
		.note-container {
			height: 3.4rem;
			border-bottom: 1px solid var(--grey-1);
			width: 85%;
			padding-left: 0.5rem;
		}
		.actions {
			padding-left: 0.3rem;
			padding-right: 0.3rem;
		}
	}
	.note-container {
		margin-bottom: 1.3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		margin-right: auto;
		margin-left: auto;
	}
	.note-container:hover {
		background-color: transparent;
		color: var(--orange);
	}
	.actions {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100%;
		box-sizing: border-box;
		width: 6.2rem;
	}
	.icon {
		cursor: pointer;
	}
	span {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: pre;
		display: block;
		width: 75%;
	}
</style>
