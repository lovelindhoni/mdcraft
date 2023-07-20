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

<label class="toggle">
	<input type="checkbox" bind:checked={edit} />
	<span class="slider round" />
</label>

<style>
	/* CSS for toggle*/
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
		background-color: #cccccc;
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
		background-color: #3a0ca3;
	}
	input:checked + .slider:before {
		-webkit-transform: translateX(1.6rem);
		-ms-transform: translateX(1.6rem);
		transform: translateX(1.6rem);
	}
</style>
