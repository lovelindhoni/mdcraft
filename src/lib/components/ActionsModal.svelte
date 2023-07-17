<script lang="ts">
	// this model has the delete modal, edit modal and create modal
	import { createEventDispatcher, onMount } from 'svelte'; // importing createeventdispatcher for the cancel and proceed events and the onmount for registering the proceed shortcut key
	const dispatch = createEventDispatcher(); // initialising the dispatcher
	export let title: string; // this title is common for both book title and note title, whereever i refernence as title , it is common to both book title and note title
	export let whatAction: 'edit' | 'create' | 'delete'; // this prop is what specifies which modal to be used, contains only three possible values
	export let oldTitle = ''; // this prop get its value from the edit modal, where the old title is getten and binded to the input tag
	$: if (whatAction === 'edit') {
		title = oldTitle; // when edit mode, the edited oldtitle is assigned to the title
	}
	function focusInput(node: HTMLInputElement) {
		node.focus(); // focusing the input tag whenever it is present at dom
		return {
			// removes it on destroy
			destroy() {
				node.blur();
			}
		};
	}
	export let errorMessage = ''; // the error message which gets its value from createbook, single book , singlenote and create note component
	const proceedKey = (event: KeyboardEvent) => {
		// this function is dispatched the proceed event when enter is clicked and the booktile is not empty
		if (event.key === 'Enter' && title.trim() !== ``) {
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

<div class="modal-container">
	<!--this form has the modal's gut-->
	<form class="modal-content">
		<!-- this paragraph shows the error message-->
		<p id="error">{@html errorMessage.replace(/ /g, '&nbsp;')}</p>
		<!--this regex is used to preserve the whitespace-->
		<!--when the mode is create-->
		{#if whatAction === 'create'}
			<lable for="title"><slot name="create" /></lable>
			<!--the slot will be fulfilled by the components that creates the note and books-->
			<div class="input">
				<!--focused onmount and the value is binded to the booktitle, maxlength is 30-->
				<input bind:value={title} id="title" maxlength="30" use:focusInput spellcheck="false" />
			</div>
		{:else if whatAction === 'edit'}
			<!--when the mode is edit-->
			<lable for="title"><slot name="edit" /></lable>
			<!--will be fulfilled by the editing components-->
			<div class="input">
				<!--oldbooktitle from the singlebook and singlenote component is stored binded, whenever it is changed then the title is also changed, see the script function, focuses onmount , maxlength is 30-->
				<input bind:value={oldTitle} id="title" maxlength="30" use:focusInput spellcheck="false" />
			</div>
		{:else}
			<!--when the mode is delete-->
			<p id="delete-warning">
				<!--a warning message is shown, telling it can't be recovered-->
				<slot name="delete" />
				<!--will be fulfilld by the deletion components-->
				{@html title.replace(/ /g, '&nbsp;')}
			</p>
		{/if}
		<div class="modal-actions">
			<!--it has the event buttons, proceed and cancel, when proceed is clicked and the title is not empty then the proceed event is dispatched, on cancel is clicked, then the cancel event is dispatched-->
			<button on:click={() => (title.trim() !== '' ? dispatch('proceed') : null)}>proceed</button>
			<button on:click={() => dispatch('cancel')}>cancel</button>
		</div>
	</form>
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
		cursor: pointer;
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
	:global(span) {
		font-size: 1.2rem;
	}
	lable {
		display: flex;
		flex-direction: column;
		font-size: 1.6rem;
		gap: 0.5rem;
	}
	#error {
		font-size: 1.3rem;
	}
</style>
