<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	const proceedKey = (event: KeyboardEvent) => {
		// this function is dispatched the proceed event when enter is clicked and the booktile is not empty
		if (event.key === 'Enter') {
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

<div class="modal-container" role="alertdialog">
	<div class="modal-content">
		<!--when the mode is delete-->
		<p id="delete-warning" role="alert">
			<!--a warning message is shown, telling it can't be recovered-->
			<slot />
		</p>
		<div class="modal-actions" role="button">
			<!--it has the event buttons, proceed and cancel, when proceed is clicked and the title is not empty then the proceed event is dispatched, on cancel is clicked, then the cancel event is dispatched-->
			<button on:click={() => dispatch('proceed')}>proceed</button>
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
		z-index: 69;
	}
	.modal-content {
		text-align: center;
		height: 44%;
		width: 40%;
		box-sizing: border-box;
		padding: 4rem;
		border-radius: 2rem;
		background-color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1.5rem;
	}
	.modal-actions {
		display: flex;
		justify-content: space-around;
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
</style>
