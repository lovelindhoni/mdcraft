<script lang="ts">
	import { books, currentBookId, currentNoteId } from '$lib/store'; // importing books and the id's
	import DeleteIcon from '$lib/assets/DeleteSvg.svelte'; // importing the svg's
	import EditIcon from '$lib/assets/EditSvg.svelte';
	let EditCreateAction: any; // this holds the dynamically imported modal
	let DeleteAction: any;
	import { onMount } from 'svelte';
	onMount(async () => {
		EditCreateAction = (await import('$lib/components/actions/EditAction.svelte')).default;
		DeleteAction = (await import('$lib/components/actions/DeleteAction.svelte')).default;
	});
	export let bookId: string; // exporting the bookId to programmatically get the book-id while looping in each block with the books array in the dashboard page
	$: bookIndex = $books.findIndex((book) => book.id === bookId); // finding the right book in the array with the acquired bookIndex
	let showEditModal = false; // shows the edit modal when edit icon is clicked
	let showDeleteModal = false; // shows the delete modal when delete icon is clicked
	let title = ''; // the title which i am gonna fuck through the whole sidebar. It gets the booktitle of the book from the modals
	let errorMessage = ''; // it has the error message passed to the modal, whenever there is a duplicate book title
	function onDeleteProceed() {
		// this function causes the deletion of a book
		$books.splice(bookIndex, 1); // removes the book from the array
		$books = $books; // very own courtesty of svelte
		if ($currentBookId === bookId) {
			// when the deleted book is the currented book, then the id's are set to null
			$currentNoteId = null;
			$currentBookId = null;
		}
		showDeleteModal = false; // closes the delete modal
	}
	function onEditProceed() {
		// this function causes the editing of a book
		if (
			// if the book's title of this component is not equal to the title from the modal and  if there is already a book with the same title as the new book title from the modal(because i dont want to show error when the user gives the existing title to its book itself) then, the error message is stored.
			$books[bookIndex].title !== title.trim() &&
			$books.some((book) => book.title === title.trim())
		) {
			errorMessage = `Ouch!😬 book title '${title}' is in use, try another🙏`;
		} else {
			// else, the the trimmed title is stored as the new title for the book in this component, and closes the edit modal
			$books[bookIndex].title = title.trim();
			errorMessage = '';
			showEditModal = false;
		}
	}
</script>

<div class="book-container" on:click on:keydown>
	<!--even forwarding, clicking this component will aset the currentBookId-->
	<div class="book-title">
		<p>{@html $books[bookIndex].title.replace(/ /g, '&nbsp;')}</p>
		<!--preserving whitespace-->
		<!--i used this regex to save the whitespace-->
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
	<svelte:component
		this={DeleteAction}
		on:cancel={() => (showDeleteModal = false)}
		on:proceed={onDeleteProceed}
		title={$books[bookIndex].title}
		><svelte:fragment
			>Warning 🚫<br /> This action cannot be undone. Are you sure you want to delete the book:</svelte:fragment
		></svelte:component
	>
{:else if showEditModal}
	<!--shows the edit modal, this child component exposes the title taken as input and here it is bounded to the title, when closing the modal, the title is cleared, so that when editing other books, wont show this book title , the book title is passed to the oldtitle prop and it gets edited and return to the title-->
	<svelte:component
		this={EditCreateAction}
		oldTitle={$books[bookIndex].title}
		on:cancel={() => {
			showEditModal = false;
			title = '';
			errorMessage = '';
		}}
		bind:title
		on:proceed={onEditProceed}
		{errorMessage}
		><svelte:fragment
			>edit the title of your book : <br />{@html title.replace(/ /g, '&nbsp;')}<br /><span
				>(max 30 characters)</span
			></svelte:fragment
		></svelte:component
	>
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
		height: 16.5%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		border: 2px solid black;
		box-sizing: border-box;
		padding-left: 0.8rem;
		padding-right: 0.3rem;
		margin: 0.6rem;
		border-radius: 0.6rem;
		overflow-wrap: break-word;
		cursor: pointer;
	}
	.book-title {
		width: 80%;
	}
	.icons {
		height: 40%;
		width: 40%;
		cursor: pointer;
	}
	p {
		font-size: 1.43rem;
	}
</style>
