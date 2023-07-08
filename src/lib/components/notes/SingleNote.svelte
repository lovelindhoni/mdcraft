<script lang="ts">
	import { books } from '$lib/stores'; 
	import EditSvg from '$lib/assets/EditSvg.svelte';
	import DeleteSvg from '$lib/assets/DeleteSvg.svelte';
	export let currentBookIndex: number; // this prop will be fulfilled by the notes.svelte
</script>

<div>
	{#if $books[currentBookIndex].notes.length > 0} <!--if there are more than one note in the notes array, then the note is displayed-->
		{#each $books[currentBookIndex].notes as note} <!--looping through the notes array as note-->
			<div class="notes-container">
				<h3>{note.title}</h3> <!--title of the note-->
				<div class="actions">
					<EditSvg /> <!--the edit and delete icon for doing opertation in the note-->
					<DeleteSvg />
				</div>
			</div>
			<hr />
		{/each}
	{:else} <!--if the array length is zero, then we will ask them to create some notes-->
		<p>Pls create some chapters in the {$books[currentBookIndex].title}</p>
	{/if}
</div>

<style>
	/* some shitty styles */
	div {
		font-family: Arial, Helvetica, sans-serif;
	}
	h3 {
		margin: 0;
		font-size: 1.25rem;
	}

	.notes-container {
		padding-right: 1.5rem;
		padding-left: 1.5rem;
		padding-top: 2.1rem;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.actions {
		display: flex;
		gap: 2rem;
	}
</style>
