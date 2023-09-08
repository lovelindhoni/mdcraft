<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AddSvg from '$lib/assets/AddSvg.svelte';
	import CloseSvg from '$lib/assets/CloseSvg.svelte';
	import { focusInput } from '$lib/store';
	const dispatch = createEventDispatcher();
	export let title = ''; // the title which is created and send to the comps
	export let contentType: string;
	export let noError = true;
	$: disabled = title.length === 0 ? true : false; // for disabling the ok button
	let size = matchMedia('(max-width:549px)').matches
		? '20'
		: matchMedia('(max-width:1023px)').matches
		? '24'
		: '26';
</script>

<div class="modal-container">
	<div role="dialog" class="modal-content">
		<div class="title-closebtn">
			<div class="title-logo">
				<span class="create-icon"><AddSvg color="white" {size} /></span>
				<label for="newtitle">Create {contentType}</label>
			</div>
			<span
				class="close-btn"
				role="button"
				tabindex="0"
				on:click={() => dispatch('cancel')}
				on:keydown={() => dispatch('cancel')}><CloseSvg {size} /></span
			>
			<!--the slot will be fulfilled by the components that creates the note and folders-->
		</div>
		<div class="input" role="textbox">
			<!--focused onmount and the value is binded to the foldertitle, maxlength is 30-->
			<input
				class:errorInput={!noError}
				type="text"
				placeholder="Enter the title of your {contentType.toLowerCase()}"
				bind:value={title}
				class="newtitle"
				maxlength="30"
				spellcheck="false"
				use:focusInput
			/>
			<span class:noError class="error">This name is already in use, try a different name</span>
		</div>
		<div class="modal-actions" role="button">
			<!--it has the event buttons, proceed and cancel, when proceed is clicked and the title is not empty then the proceed event is dispatched, on cancel is clicked, then the cancel event is dispatched-->
			<button class="cancel" on:click={() => dispatch('cancel')}>cancel</button>
			<button
				class="create"
				{disabled}
				on:click={() => (title.trim() !== '' ? dispatch('proceed') : null)}>ok</button
			>
		</div>
	</div>
</div>

<style>
	@media (min-width: 1740px) {
		.modal-content {
			height: 33%;
			width: 35%;
		}
		label {
			font-size: 1.78rem;
		}
	}

	@media (min-width: 1430px) and (max-width: 1739px) {
		.modal-content {
			height: 37%;
			width: 40%;
		}
		label {
			font-size: 1.6rem;
		}
	}

	@media (min-width: 1024px) and (max-width: 1429px) {
		.modal-content {
			height: 42.5%;
			width: 40%;
		}
		label {
			font-size: 1.6rem;
		}
	}

	@media (min-width: 1024px) {
		.title-logo {
			gap: 1rem;
		}
		.create-icon {
			height: 2rem;
			width: 2rem;
		}
		.close-btn {
			position: relative;
			top: 0.2rem;
		}
		.input {
			height: 12%;
			width: 90%;
		}
		input {
			font-size: large;
			border-radius: 0.6rem;
		}
		button {
			width: 6rem;
			height: 3rem;
			font-size: 1.2rem;
		}
		.error {
			font-size: 1.05rem;
		}
		.modal-actions {
			gap: 3em;
		}
	}

	@media (min-width: 550px) and (max-width: 1023px) {
		.modal-content {
			height: 24%;
			width: 60%;
		}
		label {
			font-size: 1.5rem;
		}
		.title-logo {
			gap: 0.8rem;
		}
		.create-icon {
			height: 2rem;
			width: 2rem;
		}
		.close-btn {
			position: relative;
			top: 0.2rem;
			right: 1rem;
		}
		.input {
			height: 12%;
			width: 90%;
		}
		button {
			width: 5.5rem;
			height: 2.7rem;
			font-size: 1.08rem;
		}
		.error {
			font-size: 1rem;
		}
		input {
			font-size: medium;
			border-radius: 0.6rem;
		}
		.modal-actions {
			gap: 3em;
		}
	}

	@media (max-width: 549px) and (max-height: 699px), (max-width: 549px) and (min-height: 700px) {
		.modal-content {
			height: 34%;
			width: 80%;
		}
		label {
			font-size: 1.2rem;
		}
		.title-logo {
			gap: 0.6rem;
		}
		.create-icon {
			height: 1.5rem;
			width: 1.5rem;
		}
		.close-btn {
			position: relative;
			bottom: 0.1rem;
			right: 1rem;
		}
		.input {
			height: 13%;
			width: 90%;
		}
		button {
			width: 4.2rem;
			height: 2.4rem;
			font-size: 1rem;
		}
		.error {
			font-size: 0.735rem;
		}
		input {
			font-size: medium;
			border-radius: 0.4rem;
		}
		.modal-actions {
			gap: 1.5em;
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
		background-color: hsla(0, 0%, 0%, 0.8);
		z-index: 69;
	}

	.input {
		position: relative;
		bottom: 0.9rem;
		margin-left: 2rem;
	}

	.modal-content {
		border-radius: 0.9rem;
		background-color: hsl(0, 0%, 17%);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: start;
		box-sizing: border-box;
		border-top: 10px solid var(--green);
	}

	.modal-actions {
		display: flex;
		align-self: end;
		margin-right: 2rem;
	}

	button {
		min-width: auto;
		border-radius: 0.6rem;
		cursor: pointer;
		color: white;
	}

	input {
		height: 100%;
		width: 85%;
		background-color: var(--grey-2);
		color: white;
		outline: none;
		border: none;
	}

	input::placeholder {
		color: var(--grey-1);
	}

	label {
		text-align: center;
		position: relative;
		top: 0.3rem;
	}

	.noError {
		display: none !important;
	}

	.error {
		color: hsl(10, 100%, 70%);
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
	}

	.errorInput {
		border: solid;
		border-color: hsl(10, 100%, 70%);
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

	.title-closebtn {
		display: flex;
		width: 90%;
		justify-content: space-between;
		margin-left: 2rem;
	}

	.create {
		background-color: var(--green);
		border: 0;
		font-weight: 800;
	}

	.create:hover {
		background-color: hsl(102, 52%, 58%);
	}

	.cancel {
		background-color: transparent;
		border: 2px solid var(--green);
	}

	.create:disabled {
		background-color: hsl(0, 0%, 30%);
		color: var(--grey-1);
		cursor: not-allowed;
	}

	.create-icon {
		border-radius: 50%;
		background-color: var(--green);
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		top: 0.2rem;
	}

	.title-logo {
		display: flex;
	}
</style>
