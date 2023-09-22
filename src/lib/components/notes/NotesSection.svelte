<!--this connects all the comps in the notes folder. it will be imported to the main page-->
<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/store'; // importing the folders and the id's
	import { onMount } from 'svelte';
	let GoBack: any = null;
	let PickFolder: any = null;
	// i am dynamically importing it becauses these are needed only for smaller screens.
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
		<!--I seriously dont know why i made this logic, but it is needed-->
		{#if ($folders[currentFolderIndex].notes.length > 0 && matchMedia('(min-width:1024px)').matches) || matchMedia('(max-width:1023px)').matches}
			<div class="mast" role="group">
				{#if matchMedia('(max-width:1023px').matches}
					<svelte:component
						this={GoBack}
						on:click={() => currentFolderId.set(null)}
						on:keydown={() => currentFolderId.set(null)}
					/>
				{/if}
				<div class="title-btn">
					<h2>/{@html $folders[currentFolderIndex].title}</h2>
					<!--the regex to preserve the whitespaces-->
					<!--the title of that Folder-->
					<CreateNote {currentFolderIndex} />
					<!--passing the currentFolderindex to the createnote-->
				</div>
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
	@media (min-width: 1740px) {
		h2 {
			font-size: 2.5rem;
		}
	}

	@media (min-width: 1430px) and (max-width: 1739px) {
		h2 {
			font-size: 2.1rem;
		}
	}

	@media (min-width: 1024px) and (max-width: 1429px) {
		h2 {
			font-size: 2rem;
		}
	}

	@media (min-width: 1024px) {
		.mast {
			width: 75%;
		}
	}

	@media (min-width: 649px) and (max-width: 1023px) {
		h2 {
			font-size: 2.2rem;
		}
		.mast {
			width: 62%;
		}
		.notes {
			margin-top: 0.5rem;
		}
	}

	@media (min-width: 550px) and (max-width: 649px) {
		h2 {
			font-size: 2.05rem;
		}
		.mast {
			width: 70%;
		}
		.notes {
			margin-top: 0.5rem;
		}
	}

	@media (max-width: 549px) {
		h2 {
			font-size: 1.6rem;
		}
		.mast {
			width: 85%;
		}
		.notes {
			margin-top: 0.4rem;
		}
	}

	.mast {
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

	h2 {
		font-weight: normal;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: pre;
		width: 70%;
	}

	.title-btn {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
</style>
