<script lang="ts">
	import { tick, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const onToggle = async (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'q') {
			edit = !edit; // Toggles the editor, the shortcut is Ctrl + Q
		}
		if (edit) {
			await tick(); // waiting for dom changes to finish
			dispatch('focusEditor'); // dispatching event for adding focus and placeholder on code-editor
		}
	};
	export let edit = false;
</script>

<div role="checkbox" aria-checked="false">
	<label class="toggle" for="toggle">
		<!--binded the edit exported edit variable with the checked state of this input element. Also forwarded an change event to add the placeholder text and focus state on the code-editor when this input element is changed-->
		<input
			title="editor-slider"
			placeholder=", "
			type="checkbox"
			bind:checked={edit}
			id="toggle"
			on:change={() => dispatch('focusEditor')}
		/>
		<span class="slider round" />
	</label>
	<!--The span attribute is used here to act as a label to  the toggle -->
	<span class="edit-label" class:edit>Edit</span><span class:edit class="edit-shortcut">
		(Ctrl + Q)</span
	>
</div>
<svelte:window on:keydown={onToggle} />

<style>
	@media (min-width: 1740px) {
		.edit-label,
		.edit-shortcut {
			font-size: 1.44rem;
		}
	}
	@media (max-width: 1739px) {
		.edit-label,
		.edit-shortcut {
			font-size: 1.32rem;
		}
	}
	@media (max-width: 1429px) {
		.edit-label,
		.edit-shortcut {
			font-size: 1.15rem;
		}
	}
	@media (min-width: 1024px) {
		.toggle {
			width: 3.6rem;
			height: 1.7rem;
		}
		.slider:before {
			height: 1.4rem;
			width: 1.65rem;
			left: 0.17rem;
			bottom: 0.16rem;
		}
		input:checked + .slider:before {
			-webkit-transform: translateX(1.6rem);
			-ms-transform: translateX(1.6rem);
			transform: translateX(1.6rem);
		}
	}
	@media (max-width: 1023px) {
		.toggle {
			width: 3.6rem;
			height: 1.7rem;
		}
		.slider:before {
			height: 1.4rem;
			width: 1.5rem;
			left: 0.17rem;
			bottom: 0.16rem;
		}
		input:checked + .slider:before {
			-webkit-transform: translateX(1.7rem);
			-ms-transform: translateX(1.7rem);
			transform: translateX(1.75rem);
		}
		.edit-label {
			font-size: 1.3rem;
		}
		.edit-shortcut {
			display: none;
		}
	}
	@media (max-width: 549px) {
		.toggle {
			width: 3.15rem;
			height: 1.5rem;
		}
		.slider:before {
			height: 1.25rem;
			width: 1.25rem;
			left: 0.17rem;
			bottom: 0.13rem;
		}
		input:checked + .slider:before {
			-webkit-transform: translateX(1.6rem);
			-ms-transform: translateX(1.6rem);
			transform: translateX(1.6rem);
		}
		.edit-label {
			font-size: 1.2rem;
		}
		.edit-shortcut {
			display: none;
		}
	}
	div {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.toggle {
		position: relative;
		display: inline-block;
	}

	/* Hiding the default checkbox*/
	.toggle input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		border-radius: 0.8rem;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: hsl(0, 0%, 50%);
		-webkit-transition: 0.3s;
		transition: 0.3s;
	}
	/* Before sliding */
	.slider:before {
		position: absolute;
		content: '';
		border-radius: 50%;
		background-color: white;
		-webkit-transition: 0.3s;
		transition: 0.3s;
	}

	input:checked + .slider {
		background-color: var(--orange);
	}
	.edit-label,
	.edit-shortcut {
		color: hsl(0, 0%, 80%);
	}
	.edit {
		color: var(--orange);
	}
</style>
