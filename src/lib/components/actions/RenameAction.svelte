<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { focusInput } from '$lib/store'; // for focussing the input tag
	import EditSvg from '$lib/assets/EditSvg.svelte';
	import CloseSvg from '$lib/assets/CloseSvg.svelte';
	const dispatch = createEventDispatcher();
	export let title = ''; // the title string which is modified and send to the other comps
	export let oldTitle = ''; // this prop get its value from the comps, where there is a need for renaming, where the old title is gotten and binded to the input tag
	export let disabled = false;
	$: {
		title = oldTitle;
		disabled = title.length === 0 ? true : false;
	} // when rename, the renamed oldtitle is assigned to the title, whenever the title lenght is 0, then the ok button is disabled
	export let noError = true; // initilly there is no errror, so it is true
</script>

<div class="modal-container">
	<div role="dialog" class="modal-content">
		<div class="title-closebtn">
			<lable for="newtitle"><span class="edit-icon"><EditSvg color="white" /></span><slot /></lable>
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
			<!--the class:directive is when there a error then, the border is set to color red-->
			<input
				placeholder="Your title should be 1-30 chars"
				class:errorInput={!noError}
				type="text"
				bind:value={oldTitle}
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
				class="rename-btn"
				{disabled}
				on:click={() => (title.trim() !== '' ? dispatch('proceed') : null)}>ok</button
			>
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
		background-color: hsla(0, 0%, 0%, 0.8);
		z-index: 69;
	}

	.modal-content {
		height: 44%;
		width: 40%;
		box-sizing: border-box;
		border-radius: 0.9rem;
		background-color: var(--background);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: start;
		box-sizing: border-box;
		border-top: 10px solid var(--blue);
	}

	.modal-actions {
		display: flex;
		gap: 3em;
		align-self: end;
		margin-right: 2rem;
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
		bottom: 1.2rem;
		margin-left: 2rem;
	}
	input {
		height: 100%;
		width: 100%;
		font-size: 100%;
		border-radius: 0.4rem;
		font-weight: bold;
	}
	input::placeholder {
		color: hsl(0, 0%, 65%);
	}
	lable {
		font-size: 1.6rem;
		text-align: center;
		position: relative;
		top: 0.3rem;
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
	.close-btn {
		display: block;
		position: relative;
		top: 0.2rem;
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
	.title-closebtn {
		margin-left: 2rem;
		display: flex;
		width: 90%;
		justify-content: space-between;
	}
	.rename-btn {
		background-color: var(--blue);
		color: white;
		border: 0px;
		font-weight: 800;
	}
	.rename-btn:hover {
		background-color: hsl(186, 50%, 60%);
	}
	.cancel {
		background-color: transparent;
		border: 2px solid var(--blue);
	}
	.rename-btn:disabled {
		background-color: lightgrey;
		color: darkgrey;
	}
	.edit-icon {
		margin-right: 0.9rem;
		border-radius: 50%;
		padding: 3px;
		padding-left: 6px;
		padding-right: 6px;
		background-color: var(--blue);
	}
</style>
