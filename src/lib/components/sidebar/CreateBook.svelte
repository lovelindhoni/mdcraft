<script lang="ts">
	import { books } from '$lib/stores'; // importing the books array from the store
	import type { Book } from '$lib/stores'; // importing the Book interface from the stores, for the CreateBook class
	import AddIcon from '$lib/assets/AddSvg.svelte'; // the addicon svg
	import ActionsModal from '$lib/components/sidebar/ActionsModal.svelte'; // the Actions modal which shows the create a new book modal in this component
	class CreateBook {
		// class to create new book objects
		id: Book['id']; // the id
		title: Book['title']; // the title
		chapter: Book['chapter']; // and the chapter array
		// the constructor needs the id and the title, the chapters will be implemented later
		constructor(id: Book['id'], title: Book['title']) {
			this.id = id;
			this.title = title;
			this.chapter = [{ id: 0, title: 'Example Note', content: `Hello World` }]; // some defaults
		}
	}
	let showCreateModal = false; // decides to show the create modal
	let bookTitle: string; // the value from the input box is stored here
	let errorMessage: string; // the errorMessage when duplicating a book,passed to the modal
	function newBook() {
		// this function create the book
		// if the user enetered book title is not unique, then the error message is given along with the booktitle that causes this error, also wipes the booktitle to start from fresh
		if ($books.includes($books.find((book) => book.title === bookTitle.trim()) as Book)) {
			errorMessage = `Ouch!😬 book title '${bookTitle}' is in use, try another🙏`;
		} else {
			// if the book title is unique, then the book title is trimmed and pushed to the books arrray through the createBook class
			$books.push(
				// if the book array is empty, then the created book will have the id 0, if is not empty then one greater than the id of the last book in the array will be the id of this new book, and also the trimmed book title is passed
				new CreateBook($books.length !== 0 ? $books[$books.length - 1].id + 1 : 0, bookTitle.trim())
			);
			$books = $books; // courtesy of svelte
			bookTitle = ''; // wipes the book title for a clean start
			showCreateModal = false; // closes the create book modal
			errorMessage = ''; // wipes the error message
		}
	}
</script>

<button on:click={() => (showCreateModal = true)} on:keydown={() => (showCreateModal = true)}>
	<!--clicking the button will open the modal-->
	<div class="newbookbtn">
		<p>create new</p>
		<AddIcon />
		<!--the addicon is used here-->
	</div>
</button>

{#if showCreateModal}
	<!--opens the modal here-->
	<!-- on cancel , both the booktitle and error message is wiped, then closes the modal, on proceed, the newbook function is runned. the bookTitle is binded which will have the value from the input tag in the delete modal, plus the error message is passed to the modal-->
	<ActionsModal
		whatAction="create"
		on:cancel={() => {
			bookTitle = '';
			errorMessage = '';
			showCreateModal = false;
		}}
		bind:bookTitle
		on:proceed={newBook}
		{errorMessage}
	/>
{/if}

<style>
	/* some shitty styles */
	button {
		height: 14%;
		width: 90%;
		box-sizing: border-box;
		margin-left: 1.3rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
		border-radius: 1rem;
		font-family: Arial, Helvetica, sans-serif;
	}
	.newbookbtn {
		display: flex;
		gap: 0.3rem;
		justify-content: center;
		align-items: center;
	}
	p {
		font-size: 1.5rem;
	}
</style>
