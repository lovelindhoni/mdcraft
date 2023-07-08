<script lang="ts">
	import { books, currentBookId } from '$lib/stores'; // importing books array
	import type { Book } from '$lib/stores'; // importing the book' interface, because i had to :(
	import DeleteIcon from '$lib/assets/DeleteSvg.svelte'; // svg file as a component
	import EditIcon from '$lib/assets/EditSvg.svelte'; // svg file as a svelte component
	import ActionsModal from '$lib/components/sidebar/ActionsModal.svelte'; // importing the modal for showing for delete and edit events
	export let bookId: number; // exporting the book id to programmatically get the book-id while looping in each block with the books array in the dashboard page
	const bookIndex = $books.findIndex((book) => book.id === bookId); // finding the right book in the array with the acquired bookIndex
	let showEditModal = false; // shows the edit modal when edit icon is clicked
	let showDeleteModal = false; // shows the delete modal when delete icon is clicked
	let bookTitle: string; // the bookTitle which i am gonna fuck through the whole sidebar. It gets the title of the book from the modals
	let errorMessage: string; // it has the error message passed to the modal, whenever there is a duplicate book title
	function onDeleteProceed() {
		// this function causes the deletion of a book
		$books.splice(bookIndex, 1); // removes the book from the array
		$books = $books; // very own ourtesty of svelte
		if($currentBookId === bookId){ // checks whether the deleted book is the current book, if yes, then the currentbook is set to null
			$currentBookId = null;
		}
		showDeleteModal = false; // closes the delete modal
	}
	function onEditProceed() {
		// this function causes the editing of a book
		if (
			// if the book's title of this component is not equal to the bookTitle from the modal and  if there is already a book with the same title as the new book title from the modal(because i dont want to show error when the user gives the existing title to its book itself) then, the error message is stored.
			$books[bookIndex].title !== bookTitle.trim() &&
			$books.includes($books.find((book) => book.title === bookTitle.trim()) as Book)
		) {
			errorMessage = `book title ${bookTitle} is in use, try another `;
		} else {
			// else, the the trimmed bookTitle is stored as the new title for the book in this component, and closes the edit modal
			$books[bookIndex].title = bookTitle.trim();
			showEditModal = false;
		}
	}
</script>

<div class="book-container" on:click on:keydown> <!--even forwarding, clicking this component will aset the currentBookId-->
	<div class="book-title">
		<p>{$books[bookIndex].title}</p>
		<!--This is the book title of this component, i have been reffering in the above comments-->
	</div>
	<div class="actions">
		<!--the edit and delete icons are imported and then the clicking of it will open its respective modals-->
		<!--used stop propagation to avoid propagating the event to the parent that is the singlebook component-->
		<div
			class="icons"
			on:click|stopPropagation={() => (showEditModal = true)}   
			on:keydown|stopPropagation={() => (showEditModal = true)}
		>
			<EditIcon />
		</div>
		<div
			class="icons"
			on:click|stopPropagation={() => (showDeleteModal = true)}
			on:keydown|stopPropagation={() => (showDeleteModal = true)}
		>
			<DeleteIcon />
		</div>
	</div>
</div>

{#if showDeleteModal}
	<!--shows the delete modal,  it passes the book title of this component to the ActionsModal-->
	<ActionsModal
		whatAction="delete"
		on:cancel={() => (showDeleteModal = false)}
		on:proceed={onDeleteProceed}
		bookTitle={$books[bookIndex].title}
	/>
{:else if showEditModal}
	<!--shows the edit modal, this child component exposes the bookTitle taken as input and here it is bounded to the booktitle, when closing the modal, the Booktitle is cleared, so that when editing other books, wont show this book title , the book title is passed to the oldbooktitle prop and it gets edited and return to the bookTitle-->
	<ActionsModal
		whatAction="edit"
		on:cancel={() => {
			showEditModal = false;
			bookTitle = '';
		}}
		bind:bookTitle
		oldBookTitle={$books[bookIndex].title}
		on:proceed={onEditProceed}
		{errorMessage}
	/>
{/if}

<style>
	/* Some shitty styles */
	.actions {
		display: flex;
		height: 100%;
		width: 20%;
		align-items: center;
		justify-content: space-around;
	}
	.book-container {
		font-family: Arial, Helvetica, sans-serif;
		height: 12.5%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 2px solid black;
		box-sizing: border-box;
		padding-left: 0.8rem;
		padding-right: 0.3rem;
		margin: 0.6rem;
		border-radius: 0.6rem;
	}
	.book-title {
		width: 80%;
	}
	.icons {
		height: 40%;
		width: 40%;
	}
	p {
		font-size: 1.43rem;
	}
</style>
