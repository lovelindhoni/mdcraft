<script lang="ts">
	import { books, currentBookId } from '$lib/stores'; // importing the books and currentBookId
	import CreateNote from '$lib/components/notes/CreateNote.svelte'; // the createnote and singlenote 
	import SingleNote from '$lib/components/notes/SingleNote.svelte';
	$: currentBookIndex = $books.findIndex((book) => book.id === $currentBookId); // this will loop over find the currentbookIndex based on the id of that book, i made it reacitve
</script>

{#if $currentBookId !== null} <!--incase if some books are selected-->
	<div class="notes-container">
		<div class="titleandbtn">
			<h1>{$books[currentBookIndex].title}</h1> <!--the title of that book-->
			<CreateNote {currentBookIndex} /> <!--passing the currentbokindex to the createnote-->
		</div>
		<SingleNote {currentBookIndex} /> <!--passing the currentbookindex gto the singlenote-->
	</div>
{:else} <!--if no book are selected then-->
	<p>Choose a book Pls</p>
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
		padding-left:1.3rem;
		padding-right : 1.3rem;
	}
	.notes-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 1.3rem;
		box-sizing: border-box;
	}
	h1 {
		font-size: 2.2rem;
	}
</style>
