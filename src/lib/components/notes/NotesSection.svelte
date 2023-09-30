<!--this connects all the comps in the notes folder. It will be imported to the main page-->
<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/store'; // importing the folders and the id's
	import { onMount } from 'svelte';
	let GoBack: any = null;
	let PickFolder: any = null;
	onMount(async () => {
		if (matchMedia('(min-width:1023px)').matches) {
			PickFolder = (await import('$lib/components/sidebar/PickFolder.svelte')).default;
		} else {
			GoBack = (await import('$lib/components/header/GoBack.svelte')).default;
		}
	});
	import CreateNote from '$lib/components/notes/CreateNote.svelte';
	import Note from '$lib/components/notes/Note.svelte';
	import NoNotes from '$lib/components/notes/NoNotes.svelte';
	export let currentFolderIndex: number; // fulfilled by the +page.svelte
</script>

{#if $currentFolderId}
	<!--incase if any Folder are selected-->
	<div class="notes-and-title">
		{#if ($folders[currentFolderIndex].notes.length > 0 && matchMedia('(min-width:1024px)').matches) || matchMedia('(max-width:1023px)').matches}
			<!--The block below is rendered when the user agent is mobile or on a tablet, or when there is at least one note in the selected folder on larger screens-->
			<div class="mast-head" role="group">
				<svelte:component
					this={GoBack}
					on:click={() => currentFolderId.set(null)}
					on:keydown={() => currentFolderId.set(null)}
				/>
				<!--the title of the current folder-->
				<CreateNote {currentFolderIndex} />
				<!--passing the currentFolderindex to the createnote-->
			</div>
		{/if}
		<div class="notes">
			{#if $folders[currentFolderIndex].notes.length > 0}
				<!--if the notesarray is not empty-->
				{#each $folders[currentFolderIndex].notes as note (note.id)}
					<Note
						{currentFolderIndex}
						noteId={note.id}
						on:click={() => currentNoteId.set(note.id)}
						on:keydown={() => currentNoteId.set(note.id)}
					/>
				{/each}
			{:else}
				<!--if the array length is zero, then we will ask them to create some notes-->
				<NoNotes {currentFolderIndex} />
			{/if}
		</div>
	</div>
{:else}
	<!--if no Folder are selected then-->
	<svelte:component this={PickFolder} />
{/if}

<style>
	@media (min-width: 1024px) {
		.mast-head {
			width: 75%;
		}
	}

	@media (min-width: 650px) and (max-width: 1023px) {
		.mast-head {
			width: 62%;
		}
		.notes {
			margin-top: 0.5rem;
		}
	}

	@media (min-width: 550px) and (max-width: 649px) {
		.mast-head {
			width: 70%;
		}
		.notes {
			margin-top: 0.5rem;
		}
	}

	@media (max-width: 549px) {
		.mast-head {
			width: 85%;
		}
		.notes {
			margin-top: 0.4rem;
		}
	}

	.mast-head {
		height: 10%;
		margin: 1.2rem 0 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.notes-and-title {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		align-items: center;
	}

	.notes {
		overflow-y: auto;
		width: 100%;
		height: 100%;
	}
</style>
