<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { focusInput } from '$lib/store';
	const dispatch = createEventDispatcher();
	export let title: string;
	export let errorMessage = ' ';
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

<main class="modal-container">
	<form class="modal-content">
		<p id="error">{@html errorMessage.replace(/ /g, '&nbsp;')}</p>
		<lable for="newtitle"><slot /></lable>
		<!--the slot will be fulfilled by the components that creates the note and books-->
		<div class="input">
			<!--focused onmount and the value is binded to the booktitle, maxlength is 30-->
			<input
				type="text"
				bind:value={title}
				id="newtitle"
				maxlength="30"
				spellcheck="false"
				use:focusInput
			/>
		</div>
		<div class="modal-actions">
			<!--it has the event buttons, proceed and cancel, when proceed is clicked and the title is not empty then the proceed event is dispatched, on cancel is clicked, then the cancel event is dispatched-->
			<button on:click={() => (title.trim() !== '' ? dispatch('proceed') : null)}>proceed</button>
			<button on:click={() => dispatch('cancel')}>cancel</button>
		</div>
	</form>
</main>

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
		height: 61%;
		width: 50%;
		box-sizing: border-box;
		border-radius: 2rem;
		background-color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		gap: 1.3rem;
	}

	.modal-actions {
		display: flex;
		gap: 7.5rem;
		margin-top: 0.2rem;
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
	}
	input {
		height: 100%;
		width: 100%;
		font-size: 100%;
		border-radius: 0.6rem;
		font-weight: bold;
	}
	lable {
		font-size: 1.6rem;
		text-align: center;
		line-height: 1.35;
	}
	:global(span) {
		font-size: 1.2rem;
		font-weight: lighter;
	}
	#error {
		font-size: 1.3rem;
	}
</style>
