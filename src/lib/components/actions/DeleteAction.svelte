<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import DeleteSvg from '$lib/assets/DeleteSvg.svelte';
	import CloseSvg from '$lib/assets/CloseSvg.svelte';
	const dispatch = createEventDispatcher();
	let size = matchMedia('(max-width:549px)').matches
		? '16'
		: matchMedia('(max-width:1023px)').matches
		? '18'
		: '20';
</script>

<div class="modal-container">
	<div role="alertdialog" class="modal-content">
		<!--when the mode is delete-->
		<div class="title-and-closebtn">
			<span class="delete-warning" role="alert">
				<!--a warning message is shown, telling it can't be recovered-->
				<span class="delete-icon"><DeleteSvg color="white" {size} /></span>
				<span class="delete-element"><slot /></span>
			</span>
			<span
				class="close-btn"
				role="button"
				tabindex="0"
				on:click={() => dispatch('cancel')}
				on:keydown={() => dispatch('cancel')}
				><CloseSvg size={(parseInt(size) + 4).toString()} /></span
			>
		</div>
		<span class="warning-msg">Are you really sure? It cannot be recovered after deletion!</span>
		<div class="modal-actions" role="button">
			<!--it has the event buttons, proceed and cancel, when proceed is clicked and the title is not empty then the proceed event is dispatched, on cancel is clicked, then the cancel event is dispatched-->
			<button class="cancel-btn" on:click={() => dispatch('cancel')}>cancel</button>
			<button class="delete-btn" on:click={() => dispatch('proceed')}>ok</button>
		</div>
	</div>
</div>

<style>
	@media (min-width: 1740px) {
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
	@media (min-width: 1430px) and (max-width: 1739px) {
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
	@media (min-width: 1024px) and (max-width: 1429px) {
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
	@media (min-width: 1024px) {
		button {
			width: 6rem;
			height: 3rem;
			font-size: 1.2rem;
		}
		.modal-actions {
			gap: 3em;
		}
		.delete-warning {
			font-size: 1.6rem;
		}
		.delete-icon {
			height: 2rem;
			width: 2rem;
		}
		.close-btn {
			position: relative;
			right: 0.8rem;
			top: 1.6rem;
		}
	}
	@media (min-width: 550px) and (max-width: 1023px) {
		.modal-content {
			height: 24%;
			width: 60%;
		}
		.delete-icon {
			height: 1.9rem;
			width: 1.9rem;
		}
		.close-btn {
			position: relative;
			right: 0.8rem;
			top: 1.3rem;
		}
		.delete-warning {
			font-size: 1.4rem;
		}
		.warning-msg {
			font-size: 1.21rem;
			margin-right: 2rem;
			line-height: 1.2;
		}
		button {
			width: 5.5rem;
			height: 2.7rem;
			font-size: 1.08rem;
		}
		.modal-actions {
			gap: 1.5em;
		}
	}
	@media (max-width: 549px) and (max-height: 699px) {
		.modal-content {
			height: 34%;
			width: 80%;
		}
		.warning-msg {
			font-size: 0.94rem;
			margin-right: 2rem;
			line-height: 1.2;
		}
		button {
			width: 4.2rem;
			height: 2.4rem;
			font-size: 1rem;
		}
		.modal-actions {
			gap: 1.5em;
		}
		.delete-warning {
			font-size: 1.1rem;
		}
		.delete-icon {
			height: 1.6rem;
			width: 1.6rem;
		}
		.close-btn {
			position: relative;
			right: 0.8rem;
			top: 1rem;
		}
	}
	@media (max-width: 549px) and (min-height: 700px) {
		.modal-content {
			height: 26%;
			width: 80%;
		}
		.warning-msg {
			font-size: 0.94rem;
			margin-right: 2rem;
			line-height: 1.2;
		}
		button {
			width: 4.2rem;
			height: 2.4rem;
			font-size: 1rem;
		}
		.modal-actions {
			gap: 1.5em;
		}
		.delete-warning {
			font-size: 1.1rem;
		}
		.delete-icon {
			height: 1.6rem;
			width: 1.6rem;
		}
		.close-btn {
			position: relative;
			right: 0.8rem;
			top: 1rem;
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
		background-color: hsl(0, 0%, 17%);
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
	}
	button {
		min-width: auto;
		border-radius: 0.6rem;
		cursor: pointer;
		color: white;
	}
	.title-and-closebtn {
		margin-left: 2rem;
	}
	.delete-btn {
		background-color: var(--red);
		border: 0;
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
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
	.close-btn {
		display: flex;
		cursor: pointer;
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		height: 2.2rem;
		width: 2.2rem;
	}
	.close-btn:hover {
		background-color: var(--grey-2);
	}
	.title-and-closebtn {
		width: 90%;
		display: flex;
		justify-content: space-between;
	}
	.warning-msg {
		text-align: start;
		color: hsl(0, 0%, 77%);
		padding-left: 2.5rem;
		position: relative;
		bottom: 1.5rem;
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0;
		margin-inline-end: 0;
	}
	.delete-warning {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0;
		margin-inline-end: 0;
	}
</style>
