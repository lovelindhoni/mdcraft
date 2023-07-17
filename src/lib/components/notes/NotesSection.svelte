<!--this connects all the comps in the notes folder. it will be impported to the dashboard-->
<script lang="ts">
	import { books, currentBookId, currentNoteId } from '$lib/store'; // importing the books and currentBookId
	import { onMount } from 'svelte';
	let CreateNote: any; // the variables for holding the dynamcially imported comps
	let SingleNote: any;
	onMount(async () => {
		CreateNote = (await import('$lib/components/notes/CreateNote.svelte')).default;
		SingleNote = (await import('$lib/components/notes/SingleNote.svelte')).default;
	});
	export let currentBookIndex: number; // fulfilled by the +page.svelte
</script>

{#if $currentBookId !== null}
	<!--incase if any book are selected-->
	<div class="notes-container">
		<div class="titleandbtn">
			<h1>{@html $books[currentBookIndex].title.replace(/ /g, '&nbsp;')}</h1>
			<!--the regex to preserve the whitespaces-->
			<!--the title of that book-->
			<svelte:component this={CreateNote} {currentBookIndex} />
			<!--passing the currentbookindex to the createnote-->
		</div>
		<div style="overflow-y:auto">
			{#if $books[currentBookIndex].notes.length > 0}
				<!--if the notesarray is not empty-->
				{#each $books[currentBookIndex].notes as note (note.id)}
					<svelte:component
						this={SingleNote}
						{currentBookIndex}
						noteId={note.id}
						on:click={() => currentNoteId.set(note.id)}
						on:keydown={() => currentNoteId.set(note.id)}
					/>
				{/each}
			{:else}
				<!--if the array length is zero, then we will ask them to create some notes-->
				<p class="no-notes">
					would you mind creating some notes in {@html $books[currentBookIndex].title.replace(
						/ /g,
						'&nbsp;'
					)}? 📝
				</p>
			{/if}
		</div>
	</div>
{:else}
	<!--if no book are selected then-->
	<p class="choose-book">👈 pick a book from there</p>
{/if}

<style>
	/**some shitty temporary styles*/
	h1,
	p {
		font-family: Arial, Helvetica, sans-serif;
	}
	.titleandbtn {
		display: flex;
		height: 10%;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding-left: 1.3rem;
		padding-right: 1.3rem;
	}
	.notes-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 1.3rem;
		box-sizing: border-box;
	}
	h1 {
		font-size: 2.3rem;
		font-weight: normal;
	}
	.no-notes {
		font-size: 2rem;
		text-align: center;
		margin-top: 10rem;
		margin-left: 10rem;
		margin-right: 10rem;
		line-height: 1.3;
	}
	.choose-book {
		font-size: 2rem;
		text-align: center;
		margin-top: 15rem;
	}
</style>
