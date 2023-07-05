<script lang="ts">
	// this model has the delete modal, edit modal and create modal
	import { createEventDispatcher, onMount } from 'svelte'; // importing createeventdispatcher for the cancel and proceed events and the onmount for registering the proceed shortcut key
	const dispatch = createEventDispatcher(); // initialising the dispatcher
	export let bookTitle: string; // the book title as usual taken from the input tag here, used to update the book titles in books array
	export let whatAction: 'edit' | 'create' | 'delete'; // this prop is what specifies which modal to be used, contains only three possible values
	export let oldBookTitle: string = ''; // this prop get its value from the edit modal, where the old book title is getten and binded to the input tag
	$: if (whatAction === 'edit') {
		bookTitle = oldBookTitle; // when edit mode, the edited booktitle is assigned to the booktitle
	}
	function focusInput(node: HTMLInputElement) {
		node.focus(); // focuses the input area when it is in dom, using svetl action
	}
	export let errorMessage: string = ''; // the error message which gets its value from createbook and single book component
	const proceedKey = (event: KeyboardEvent) => {
		// this function is dispatched the proceed event when enter is clicked and the booktile is not empty
		if (event.key === 'Enter' && bookTitle.trim() !== '') {
			dispatch('proceed'); //
		}
	};
	onMount(() => {
		// Adds the proceedkey to the window onmount
		window.addEventListener('keydown', proceedKey);
		return () => {
			// Removes the proceed from the window ondestroy
			window.removeEventListener('keydown', proceedKey);
		};
	});
</script>

<!-- the modal container that has everything, when outside the modal is clicked, then the modal is closed be dispatching the cancel event-->
<div
	class="modal-container"
	on:click={(event) => (event.target === event.currentTarget ? dispatch('cancel') : null)}
	on:keydown={(event) => (event.target === event.currentTarget ? dispatch('cancel') : null)}
>
	<!--this div has the modal's gut-->
	<div class="modal-content">
		<!-- this paragraph shows the error message-->
		<p id="error">{errorMessage}</p>
		<!--when the mode is create-->
		{#if whatAction === 'create'}
			<lable for="bookTitle"
				>enter a short, unique name for your book<span>(max 40 characters)</span></lable
			>
			<div class="input-box">
				<!--focused onmount and the value is binded to the booktitle, maxlength is 40-->
				<input bind:value={bookTitle} id="bookTitle" use:focusInput maxlength="40" />
			</div>
		{:else if whatAction === 'edit'}
			<!--when the mode is edit-->
			<lable for="bookTitle"
				>edit the title of your book : <br />{bookTitle}<span>(max 40 characters)</span></lable
			>
			<div class="input">
				<!--oldbooktitle from the singlebook component is stored binded, whenever it is changed then the booktitle is also changed, see the script function, focuses onmount , maxlength is 40-->
				<input bind:value={oldBookTitle} id="bookTitle" use:focusInput maxlength="40" />
			</div>
		{:else}
			<!--when the mode is delete-->
			<p id="delete-warning">
				<!--a warning message is shown, telling it can't be recovered-->
				you sure? this book cannot be recovered after deletion!<br />book: {bookTitle}
			</p>
		{/if}
		<div class="modal-actions">
			<!--it has the event buttons, proceed and cancel, when proceed is clicked and the booktitle is not empty then the proceed event is dispatched, on cancel is clicked, then the cancel event is dispatched-->
			<button on:click={() => (bookTitle.trim() !== '' ? dispatch('proceed') : null)}
				>proceed</button
			>
			<button on:click={() => dispatch('cancel')}>cancel</button>
		</div>
	</div>
</div>

<style>
	/**some very shitty styles*/
	.modal-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		font-family: Arial, Helvetica, sans-serif;
	}

	.modal-content {
		text-align: center;
		height: 50%;
		width: 50%;
		box-sizing: border-box;
		padding: 2.6rem;
		border-radius: 2rem;
		background-color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
	}

	.modal-actions {
		display: flex;
		justify-content: space-around;
		margin-top: 1.8rem;
	}
	button {
		min-width: auto;
		width: 6rem;
		height: 3rem;
		font-size: 1.2rem;
		border-radius: 0.6rem;
	}
	#delete-warning {
		font-size: 1.5rem;
		line-height: 1.3;
		margin-bottom: 2rem;
	}
	.input {
		width: 100%;
		height: 20%;
	}
	input {
		width: 100%;
		height: 200%;
		border-radius: 0.6rem;
		padding-left: 1rem;
		padding-right: 1rem;
		font-size: 100%;
		font-weight: bold;
		box-sizing: border-box;
	}
	span {
		font-size: 1.2rem;
	}
	lable {
		display: flex;
		flex-direction: column;
		font-size: 1.6rem;
		gap: 0.5rem;
	}
	#error {
		font-size: 1.4rem;
	}
</style>
