<!--this connects all the comps in the notes folder. it will be impported to the dashboard-->
<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/store'; // importing the folders and the id's
	import { onMount } from 'svelte';
	import AddNotes from '$lib/assets/AddNotes.svg';
	import CreateNoteBigBtn from './CreateNoteBigBtn.svelte';
	import PickFolder from '$lib/assets/PickFolder.svg';
	let CreateNote: any; // the variables for holding the dynamcially imported comps
	let Note: any;
	onMount(async () => {
		CreateNote = (await import('$lib/components/notes/CreateNote.svelte')).default;
		Note = (await import('$lib/components/notes/Note.svelte')).default;
	});
	export let currentFolderIndex: number; // fulfilled by the +page.svelte
</script>

{#if $currentFolderId !== null}
	<!--incase if any Folder are selected-->
	<div role="menu" class="notes-and-title">
		{#if $folders[currentFolderIndex].notes.length > 0}
			<div class="titleandbtn" role="group">
				<h1>{@html $folders[currentFolderIndex].title.replace(/ /g, '&nbsp;')}</h1>
				<!--the regex to preserve the whitespaces-->
				<!--the title of that Folder-->
				<svelte:component this={CreateNote} {currentFolderIndex} />
				<!--passing the currentFolderindex to the createnote-->
			</div>
		{/if}
		<div class="notes">
			{#if $folders[currentFolderIndex].notes.length > 0}
				<!--if the notesarray is not empty-->
				{#each $folders[currentFolderIndex].notes as note (note.id)}
					<svelte:component
						this={Note}
						{currentFolderIndex}
						noteId={note.id}
						on:click={() => currentNoteId.set(note.id)}
						on:keydown={() => currentNoteId.set(note.id)}
					/>
				{/each}
			{:else}
				<!--if the array length is zero, then we will ask them to create some notes-->
				<div class="no-notes">
					<img src={AddNotes} alt="Notes Taking illustration" />
					<div class="create-note">
						<div class="no-note-text">
							<p class="create-note-text">Create a note here</p>
							<p class="create-note-subtext">Write notes in markdown syntax with ease</p>
						</div>
						<CreateNoteBigBtn {currentFolderIndex} />
					</div>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<!--if no Folder are selected then-->
	<div class="pick-Folder">
		<div>
			<p class="choose-Folder">Pick a folder from your left</p>
			<p class="choose-Folder-subtext">To see your notes</p>
		</div>
		<img src={PickFolder} alt="A girl picking a folder from the Foldershelves" />
	</div>
{/if}

<style>
	@media screen and (min-width: 1740px) {
		h1 {
			font-size: 2.62rem;
		}
		img {
			height: 28rem;
			width: 28rem;
		}
		.create-note-text {
			font-size: 3rem;
		}
		.create-note-subtext {
			font-size: 1.9rem;
		}
		.choose-Folder {
			font-size: 3rem;
		}
		.choose-Folder-subtext {
			font-size: 2.2rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		h1 {
			font-size: 2.45rem;
		}
		img {
			height: 22rem;
			width: 22rem;
		}
		.create-note-text {
			font-size: 2.22rem;
		}
		.create-note-subtext {
			font-size: 1.435rem;
		}
		.choose-Folder {
			font-size: 2.25rem;
		}
		.choose-Folder-subtext {
			font-size: 1.7rem;
		}
	}
	@media screen and (max-width: 1429px) {
		h1 {
			font-size: 2.07rem;
		}
		img {
			height: 18rem;
			width: 18rem;
		}
		.create-note-text {
			font-size: 1.9rem;
		}
		.create-note-subtext {
			font-size: 1.2rem;
		}
		.choose-Folder {
			font-size: 1.9rem;
		}
		.choose-Folder-subtext {
			font-size: 1.4rem;
		}
	}
	.titleandbtn {
		height: 10%;
		margin-top: 1.2rem;
		margin-bottom: 2rem;
		width: 75%;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
	h1 {
		font-weight: normal;
	}
	.no-notes {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		height: 100%;
	}
	.choose-Folder-subtext {
		color: var(--blue-grey);
	}
	.pick-Folder {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	img {
		filter: contrast(75%);
	}
	.create-note {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}
	.create-note-subtext {
		color: var(--blue-grey);
		position: relative;
		bottom: 0.9rem;
	}
</style>
