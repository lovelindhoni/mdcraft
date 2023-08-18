<script lang="ts">
	import { onMount } from 'svelte'; // onMount for registering events
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 'Enter') {
			edit = !edit; // Toggles the editor, the shortcut is Ctrl + Enter
		}
	};
	onMount(() => {
		// Adds the shorcut to the window onmount
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			// Removes the shortcut from the window ondestroy
			window.removeEventListener('keydown', handleKeyDown);
		};
	});
	export let edit = false;
</script>

<div role="checkbox" aria-checked="false">
	<label class="toggle">
		<input type="checkbox" bind:checked={edit} />
		<span class="slider round" />
	</label>
	<!--The span attribute is used here to act as a label to  the toggle -->
	<span class="edit-label" class:edit>Edit (Ctrl + Enter)</span>
</div>

<style>
	/* CSS for toggle*/
	@media screen and (min-width: 1740px) {
		.edit-label {
			font-size: 1.44rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		.edit-label {
			font-size: 1.32rem;
		}
	}
	@media screen and (max-width: 1429px) {
		.edit-label {
			font-size: 1.15rem;
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
		width: 3.6rem;
		height: 1.7rem;
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
		background-color: hsl(0, 0%, 80%);
		-webkit-transition: 0.3s;
		transition: 0.3s;
	}
	/* Before sliding */
	.slider:before {
		position: absolute;
		content: '';
		height: 1.4rem;
		width: 1.65rem;
		left: 0.17rem;
		bottom: 0.16rem;
		border-radius: 50%;
		background-color: white;
		-webkit-transition: 0.3s;
		transition: 0.3s;
	}

	input:checked + .slider {
		background-color: var(--purple);
	}
	input:checked + .slider:before {
		-webkit-transform: translateX(1.6rem);
		-ms-transform: translateX(1.6rem);
		transform: translateX(1.6rem);
	}
	.edit-label {
		color: hsl(0, 0%, 55%);
	}
	.edit {
		color: var(--vibrant-purple);
	}
</style>
