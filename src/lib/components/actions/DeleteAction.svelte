<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import DeleteSvg from '$lib/assets/DeleteSvg.svelte';
	import CloseSvg from '$lib/assets/CloseSvg.svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="modal-container">
	<div role="alertdialog" class="modal-content">
		<!--when the mode is delete-->
		<div class="title-and-closebtn">
			<p class="delete-warning" role="alert">
				<!--a warning message is shown, telling it can't be recovered-->
				<span class="delete-icon"><DeleteSvg color="white" /></span>
				<slot />
			</p>
			<span
				class="close-btn"
				role="button"
				tabindex="0"
				on:click={() => dispatch('cancel')}
				on:keydown={() => dispatch('cancel')}><CloseSvg /></span
			>
		</div>
		<p class="warning-msg">Are you really sure? It cannot be recovered after deletion!</p>
		<div class="modal-actions" role="button">
			<!--it has the event buttons, proceed and cancel, when proceed is clicked and the title is not empty then the proceed event is dispatched, on cancel is clicked, then the cancel event is dispatched-->
			<button class="cancel-btn" on:click={() => dispatch('cancel')}>cancel</button>
			<button class="delete-btn" on:click={() => dispatch('proceed')}>ok</button>
		</div>
	</div>
</div>

<style>
	.modal-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 69;
	}
	.modal-content {
		text-align: center;
		height: 44%;
		width: 40%;
		box-sizing: border-box;
		border-radius: 0.9rem;
		background-color: var(--background);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: space-around;
		border-top: 10px solid var(--red);
	}
	.modal-actions {
		display: flex;
		gap: 3em;
		align-self: end;
		margin-right: 2rem;
		margin-bottom: 1rem;
	}
	button {
		min-width: auto;
		width: 6rem;
		height: 3rem;
		font-size: 1.2rem;
		border-radius: 0.6rem;
		cursor: pointer;
	}
	.delete-warning {
		font-size: 1.6rem;
		line-height: 1.3;
	}
	.delete-btn {
		background-color: var(--red);
		color: white;
		border: 0px;
		font-weight: 800;
	}
	.delete-btn:hover {
		background-color: hsl(6, 85%, 60%);
	}
	.cancel-btn {
		background-color: transparent;
		border: 2px solid var(--red);
	}
	.delete-icon {
		margin-right: 0.8rem;
		border-radius: 50%;
		padding: 3px;
		padding-top: 6px;
		padding-right: 8px;
		padding-left: 9px;
		box-sizing: border-box;
		background-color: var(--red);
	}
	.close-btn {
		display: block;
		position: relative;
		top: 1.3rem;
		cursor: pointer;
		border-radius: 50%;
		height: 2.2rem;
		width: 2.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.close-btn:hover {
		background-color: lightgrey;
	}
	.title-and-closebtn {
		margin-left: 2rem;
		display: flex;
		width: 90%;
		justify-content: space-between;
	}
	.warning-msg {
		font-size: 1.3rem;
		padding-left: 2.5rem;
		text-align: start;
		position: relative;
		bottom: 1.5rem;
		color: hsl(201, 15%, 24%);
	}
</style>
