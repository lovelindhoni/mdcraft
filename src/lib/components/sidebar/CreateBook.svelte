<script lang="ts">
	import { books } from '$lib/store'; // importing the books array from the store
	import AddIcon from '$lib/assets/AddSvg.svelte'; // the addicon svg
	import ActionsModal from '$lib/components/ActionsModal.svelte'; // the Actions modal which shows the create a new book modal in this component
	class CreateBook implements Book {
		// class to create new book objects
		id: Book['id']; // the id
		title: Book['title']; // the title
		notes: Book['notes']; // and the notes array
		// the constructor needs the id and the title, the chapters will be implemented later
		constructor(title: Book['title']) {
			this.id = crypto.randomUUID();
			this.title = title;
			this.notes = [{ id: crypto.randomUUID(), title: `Example Note`, content: `# Hello World` }]; // some defaults
		}
	}
	let showCreateModal = false; // decides to show the create modal
	let title: string; // the value from the input box is stored here
	let errorMessage = ''; // the errorMessage when duplicating a book,passed to the modal
	function newBook() {
		// this function create the book
		// if the user enetered title is not unique, then the error message is given along with the title that causes this error, also wipes the title to start from fresh
		if ($books.some((book) => book.title === title.trim())) {
			errorMessage = `Ouch!😬 title '${title}' is in use, try another🙏`;
		} else {
			// if the title is unique, then the title is trimmed and pushed to the books arrray through the createBook class
			$books.push(
				// if the book array is empty, then the created book will have the id 0, if is not empty then one greater than the id of the last book in the array will be the id of this new book, and also the trimmed title is passed
				new CreateBook(title.trim())
			);
			$books = $books; // courtesy of svelte
			title = ''; // wipes the title for a clean start
			errorMessage = ''; // wipes the error
			showCreateModal = false; // closes the create book modal
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
	<!-- on cancel , both the title and error message is wiped, then closes the modal, on proceed, the newbook function is runned. the title is binded which will have the value from the input tag in the delete modal, plus the error message is passed to the modal-->
	<ActionsModal
		whatAction="create"
		on:cancel={() => {
			title = '';
			errorMessage = '';
			showCreateModal = false;
		}}
		bind:title
		on:proceed={newBook}
		{errorMessage}
		><svelte:fragment slot="create"
			>enter a short, unique name for your book<span>(max 30 characters)</span></svelte:fragment
		></ActionsModal
	>
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
		cursor: pointer;
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
