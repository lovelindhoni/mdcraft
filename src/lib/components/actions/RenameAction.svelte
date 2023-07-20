<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { focusInput } from '$lib/store'; // for focussing the input tag
	const dispatch = createEventDispatcher();
	export let title = ''; // the title string which is modified and send to the other comps
	const proceedKey = (event: KeyboardEvent) => {
		// this function is dispatched the proceed event when enter is clicked and the booktile is not empty
		if (event.key === 'Enter' && title.trim() !== ``) {
			dispatch('proceed'); //
		}
	};
	export let oldTitle = ''; // this prop get its value from the comps, where there is a need for renaming, where the old title is gotten and binded to the input tag
	export let disabled = false;
	$: {
		title = oldTitle;
		title.length === 0 ? (disabled = true) : (disabled = false);
	} // when rename mode, the renamed oldtitle is assigned to the title, whenever the title lenght is 0, then the ok button is disabled
	export let noError = true; // initilly there is no errror, so it is true
	onMount(() => {
		// Adds the proceedkey to the window onmount
		window.addEventListener('keydown', proceedKey);
		return () => {
			// Removes the proceed from the window ondestroy
			window.removeEventListener('keydown', proceedKey);
		};
	});
</script>

<div class="modal-container" role="alertdialog">
	<form class="modal-content">
		<lable for="newtitle"><slot /></lable>
		<!--the slot will be fulfilled by the components that creates the note and books-->
		<div class="input" role="textbox">
			<!--focused onmount and the value is binded to the booktitle, maxlength is 30-->
			<!--the class:directive is when there a error then, the border is set to color red-->
			<input
				class:errorInput={!noError}
				type="text"
				bind:value={oldTitle}
				id="newtitle"
				maxlength="30"
				spellcheck="false"
				use:focusInput
			/>
			<p class:noError class="error">This name is already in use, try a different name</p>
		</div>
		<div class="modal-actions" role="group">
			<!--it has the event buttons, proceed and cancel, when proceed is clicked and the title is not empty then the proceed event is dispatched, on cancel is clicked, then the cancel event is dispatched-->
			<button {disabled} on:click={() => (title.trim() !== '' ? dispatch('proceed') : null)}
				>ok</button
			>
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
		z-index: 69;
	}

	.modal-content {
		height: 44%;
		width: 40%;
		box-sizing: border-box;
		border-radius: 2rem;
		background-color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
	}

	.modal-actions {
		display: flex;
		gap: 8em;
	}
	button {
		min-width: auto;
		width: 6rem;
		height: 3rem;
		font-size: 1.2rem;
		border-radius: 0.6rem;
		cursor: pointer;
	}
	.input {
		height: 11%;
		width: 70%;
		text-align: center;
		position: relative;
		bottom: 0.8rem;
	}
	input {
		height: 100%;
		width: 100%;
		font-size: 100%;
		border-radius: 0.4rem;
		font-weight: bold;
	}
	lable {
		font-size: 1.6rem;
		text-align: center;
		position: relative;
		top: 0.7rem;
	}
	.noError {
		display: none;
	}
	.error {
		font-size: 1.1rem;
		color: red;
	}
	.errorInput {
		border-color: red;
	}
</style>