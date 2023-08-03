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
		<div class="titleandbtn" role="group">
			<h1>{@html $folders[currentFolderIndex].title.replace(/ /g, '&nbsp;')}</h1>
			<!--the regex to preserve the whitespaces-->
			<!--the title of that Folder-->
			<svelte:component this={CreateNote} {currentFolderIndex} />
			<!--passing the currentFolderindex to the createnote-->
		</div>
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
	.titleandbtn {
		display: flex;
		height: 10%;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding-left: 2.3rem;
		padding-right: 2.6rem;
	}
	.notes-and-title {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		padding: 1.3rem;
		padding-left: 0.5rem;
		box-sizing: border-box;
	}
	.notes {
		overflow-y: auto;
		height: 100%;
		margin-top: 1rem;
	}
	h1 {
		font-size: 2rem;
		font-weight: normal;
	}
	.no-notes {
		margin-top: 4rem;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: space-around;
	}
	.choose-Folder {
		font-size: 1.7rem;
	}
	.choose-Folder-subtext {
		font-size: 1.3rem;
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
		height: 20rem;
		width: 20rem;
		filter: contrast(75%);
	}
	.create-note {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}
	.create-note-text {
		font-size: 1.8rem;
	}
	.create-note-subtext {
		font-size: 1.18rem;
		color: var(--blue-grey);
		position: relative;
		bottom: 0.9rem;
	}
</style>
