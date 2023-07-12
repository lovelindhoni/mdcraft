<script lang="ts">
	import { books, currentBookId, currentBookIndex, currentNoteId } from '$lib/store'; // importing the books and currentBookId
	import CreateNote from '$lib/components/notes/CreateNote.svelte'; // the createnote and singlenote
	import SingleNote from '$lib/components/notes/SingleNote.svelte';
</script>

{#if $currentBookId !== null}
	<!--incase if any book are selected-->
	<div class="notes-container">
		<div class="titleandbtn">
			<h1>{@html $books[$currentBookIndex].title.replace(/ /g, '&nbsp;')}</h1>
			<!--the regex to preserve the whitespaces-->
			<!--the title of that book-->
			<CreateNote />
			<!--passing the currentbokindex to the createnote-->
		</div>
		{#if $books[$currentBookIndex].notes.length > 0}
			<!--if the notesarray is not empty-->
			{#each $books[$currentBookIndex].notes as note (note.id)}
				<SingleNote
					noteId={note.id}
					on:click={() => currentNoteId.set(note.id)}
					on:keydown={() => currentNoteId.set(note.id)}
				/>
			{/each}
		{:else}
			<!--if the array length is zero, then we will ask them to create some notes-->
			<p class="no-notes">
				would you mind creating some notes in {@html $books[$currentBookIndex].title.replace(
					/ /g,
					'&nbsp;'
				)}? 📝
			</p>
		{/if}
	</div>
{:else if $currentBookId === null}
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
