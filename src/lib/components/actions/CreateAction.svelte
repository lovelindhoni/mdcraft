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
</script>

<div class="modal-container">
	<div role="dialog" class="modal-content">
		<div class="title-closebtn">
			<lable for="newtitle"
				><span class="create-icon"><AddSvg color="white" /></span>Create {contentType}</lable
			>
			<span
				class="close-btn"
				role="button"
				tabindex="0"
				on:click={() => dispatch('cancel')}
				on:keydown={() => dispatch('cancel')}><CloseSvg /></span
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
			<p class:noError class="error">This name is already in use, try a different name</p>
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
	@media screen and (min-width: 1740px) {
		.modal-content {
			height: 33%;
			width: 35%;
		}
		lable {
			font-size: 1.78rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		.modal-content {
			height: 37%;
			width: 40%;
		}
		lable {
			font-size: 1.6rem;
		}
	}
	@media screen and (min-width: 1099px) and (max-width: 1429px) {
		.modal-content {
			height: 42.5%;
			width: 40%;
		}
		lable {
			font-size: 1.6rem;
		}
	}
	@media screen and (max-width: 1099px) {
		.modal-content {
			height: 44%;
			width: 50%;
		}
		lable {
			font-size: 1.6rem;
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
		height: 12%;
		width: 90%;
	}
	.modal-content {
		border-radius: 0.9rem;
		box-sizing: border-box;
		background-color: var(--background);
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
		gap: 3em;
		margin-right: 2rem;
	}
	button {
		min-width: auto;
		border-radius: 0.6rem;
		cursor: pointer;
		width: 6rem;
		height: 3rem;
		font-size: 1.2rem;
	}
	input {
		height: 100%;
		width: 85%;
		font-size: large;
		border-radius: 0.6rem;
	}
	input::placeholder {
		color: hsl(0, 0%, 65%);
		font-size: medium;
	}
	lable {
		text-align: center;
		position: relative;
		top: 0.3rem;
	}
	.noError {
		display: none;
	}
	.error {
		color: red;
		font-size: 1.05rem;
	}
	.errorInput {
		border-color: red;
	}
	.close-btn {
		display: flex;
		cursor: pointer;
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		height: 2.2rem;
		width: 2.2rem;
		position: relative;
		top: 0.2rem;
	}
	.close-btn:hover {
		background-color: lightgrey;
	}
	.title-closebtn {
		display: flex;
		width: 90%;
		justify-content: space-between;
		margin-left: 2rem;
	}
	.create {
		background-color: var(--green);
		color: white;
		border: 0;
		font-weight: 800;
	}
	.create:hover {
		background-color: hsl(96, 41%, 60%);
	}
	.cancel {
		background-color: transparent;
		border: 2px solid var(--green);
	}
	.create:disabled {
		background-color: lightgrey;
		color: darkgrey;
	}
	.create-icon {
		border-radius: 50%;
		background-color: var(--green);
		box-sizing: border-box;
		margin-right: 0.9rem;
		padding-left: 5px;
		padding-right: 4px;
		padding-top: 6px;
	}
</style>
