<!--This component connects all the components in the sidebar folder, this will be exported to the dashboard page-->
<script lang="ts">
	import { books, currentBookId, currentNoteId } from '$lib/store'; // of course, the books array, and the Id's
	import CreateBook from '$lib/components/sidebar/CreateBook.svelte'; // the create new button
	import SingleBook from '$lib/components/sidebar/SingleBook.svelte'; // the component that will display the book
</script>

<CreateBook />
<!--the creatbook button-->
{#if $books.length !== 0}
	<!--if there are no books then the message is displayed, else the books are looped -->
	<div class="notes">
		{#each $books as book (book.id)}
			<!--when a book is clicked then the currentbookId is set to its book Id and the curretnnoteid is set to null-->
			<SingleBook
				bookId={book.id}
				on:click={() => {
					currentNoteId.set(null);
					currentBookId.set(book.id);
				}}
				on:keydown={() => {
					currentNoteId.set(null);
					currentBookId.set(book.id);
				}}
			/>
		{/each}
	</div>
{:else}
	<!--if there are no books left -->
	<p>Hey there, buddy!😄 Looks like you have no books here. Why don't you create some 📚?</p>
{/if}

<style>
	/**some shitty styles*/
	p {
		font-size: 1.6rem;
		font-family: Arial, Helvetica, sans-serif;
		margin: 2.3rem;
		line-height: 1.3;
		margin-top: 4rem;
	}
	.notes {
		height: 80%;
		overflow-y: auto;
	}
</style>
