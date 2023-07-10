<!--This component connects all the components in the sidebar folder, this will be exported to the dashboard page-->
<script lang="ts">
	import CreateBook from '$lib/components/sidebar/CreateBook.svelte'; // the create new button
	import SingleBook from '$lib/components/sidebar/SingleBook.svelte'; // the component that will display all the books
	import { books, currentBookId } from '$lib/stores'; // of course, the books array, and the currentBookId
</script>

<CreateBook />
{#if $books.length !== 0}
	<!--if there are no books then the message is displayed, else the books are looped -->
	{#each $books as book}
		<!--i am sorry that i have not used the keyed each block, it freezes the page at rarer occasions-->
		<!--when a book is clicked then the currentbookId is set to its book Id-->
		<SingleBook
			bookId={book.id}
			on:click={() => currentBookId.set(book.id)}
			on:keydown={() => currentBookId.set(book.id)}
		/>
		<!--clicking this component will set the currentBookId to its respective book id -->
	{/each}
{:else}
	<p>Hey there, buddy!😄 Looks like you have no books here. Why don't you create some 📚?</p>
{/if}

<style>
	p {
		font-size: 1.6rem;
		font-family: Arial, Helvetica, sans-serif;
		margin: 2.3rem;
		line-height: 1.3;
		margin-top: 4rem;
	}
</style>
