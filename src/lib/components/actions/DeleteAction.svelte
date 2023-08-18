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
				<span class="delete-element"><slot /></span>
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
	@media screen and (min-width: 1740px) {
		.modal-content {
			height: 33.5%;
			width: 37%;
		}
		.warning-msg {
			font-size: 1.6rem;
			margin-right: 3rem;
			line-height: 1.3;
		}
		.delete-element {
			font-size: 1.79rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		.modal-content {
			height: 37%;
			width: 40%;
		}
		.warning-msg {
			font-size: 1.4rem;
			margin-right: 3rem;
			line-height: 1.3;
		}
	}
	@media screen and (min-width: 1100px) and (max-width: 1439px) {
		.modal-content {
			height: 44%;
			width: 40%;
		}
		.warning-msg {
			font-size: 1.3rem;
			margin-right: 3rem;
			line-height: 1.3;
		}
	}
	@media screen and (max-width: 1099px) {
		.modal-content {
			height: 44%;
			width: 50%;
		}
		.warning-msg {
			font-size: 1.3rem;
			margin-right: 2rem;
			line-height: 1.2;
		}
	}
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
		box-sizing: border-box;
		background-color: var(--background);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: space-around;
		border-top: 10px solid var(--red);
		border-radius: 0.9rem;
	}
	.modal-actions {
		display: flex;
		align-self: end;
		margin-right: 2rem;
		margin-bottom: 1rem;
		gap: 3em;
	}
	button {
		min-width: auto;
		border-radius: 0.6rem;
		cursor: pointer;
		width: 6rem;
		height: 3rem;
		font-size: 1.2rem;
	}
	.title-and-closebtn {
		margin-left: 2rem;
	}
	.delete-warning {
		font-size: 1.6rem;
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
		box-sizing: border-box;
		background-color: var(--red);
		border-radius: 50%;
		margin-right: 0.8rem;
		padding: 3px;
		padding-top: 6px;
		padding-right: 8px;
		padding-left: 9px;
	}
	.close-btn {
		display: flex;
		cursor: pointer;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 2.2rem;
		width: 2.2rem;
		position: relative;
		top: 1.3rem;
	}
	.close-btn:hover {
		background-color: lightgrey;
	}
	.title-and-closebtn {
		width: 90%;
		display: flex;
		justify-content: space-between;
	}
	.warning-msg {
		text-align: start;
		color: hsl(201, 15%, 24%);
		padding-left: 2.5rem;
		position: relative;
		bottom: 1.5rem;
	}
</style>
