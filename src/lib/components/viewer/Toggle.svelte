<script lang="ts">
	import { onMount } from 'svelte'; // onMount for registering events
	export let edit = false; // it will be passed to the viewer.svelte
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
</script>

<div class="toggle">
	<input id="toggleEditor" type="checkbox" bind:checked={edit} />
	<label for="toggleEditor">Edit (Ctrl + Enter)</label>
</div>
<!--no styles yet-->
