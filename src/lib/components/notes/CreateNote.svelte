<script lang="ts">
	import { books } from '$lib/store'; // the books array as ususal
	import { onMount } from 'svelte'; // for dynamic importing
	let AddSvg: any; // the variables to hold the dynaimically imported comps
	let CreateAction: any;
	onMount(async () => {
		AddSvg = (await import('$lib/assets/AddSvg.svelte')).default;
		CreateAction = (await import('$lib/components/actions/CreateAction.svelte')).default;
	});
	export let currentBookIndex: number; // passed by the notessection.svetle
	let title: string; // the title variable which will be used throughout here
	let showModal = false; // the varable that closes the modal
	let errorMessage = '';
	class CreateNote implements Note {
		// this class generates the note objects which will be pushed to the book.notes array
		id: Note['id'];
		title: Note['title'];
		content: Note['content'];
		constructor(title: Note['title']) {
			this.id = crypto.randomUUID();
			this.title = title;
			this.content = `# Hello world`;
		}
	}
	function pushNote() {
		// if there is already a note with the sametitle then error message is given
		if ($books[currentBookIndex].notes.some((note) => note.title === title.trim())) {
			errorMessage = `Ouch!😬 note title '${title}' is in use, try another🙏`;
		} else {
			// else the note will be pushed
			$books[currentBookIndex].notes.push(
				// this note will be pushed to the notes array of the currentbook
				new CreateNote(title.trim())
			);
			$books = $books;
			title = '';
			errorMessage = '';
			showModal = false;
		}
	}
</script>

<button
	class="notebutton"
	on:click={() => (showModal = true)}
	on:keydown={() => (showModal = true)}
>
	<div class="newnotebtn">
		<svelte:component this={AddSvg} />
	</div>
</button>
{#if showModal}
	<!--opens the modal here-->
	<!-- on cancel , both the title and error message is wiped, then closes the modal, on proceed, the pushnote function is runned. the title is binded which will have the value from the input tag in the delete modal, plus the error message and the slot content   is passed to the modal-->
	<svelte:component
		this={CreateAction}
		whatAction="create"
		on:cancel={() => {
			title = '';
			errorMessage = '';
			showModal = false;
		}}
		bind:title
		on:proceed={pushNote}
		{errorMessage}
		><svelte:fragment
			>enter a short, unique name <br />for your note in {@html $books[
				currentBookIndex
			].title.replace(/ /g, '&nbsp;')}<br /><span>(max 30 characters)</span></svelte:fragment
		></svelte:component
	>
{/if}

<style>
	/* some temporary shitty styles */
	button {
		width: 11%;
		height: 100%;
		border-radius: 1rem;
		font-family: Arial, Helvetica, sans-serif;
		box-sizing: border-box;
		cursor: pointer;
	}
	.newnotebtn {
		display: flex;
		gap: 0.3rem;
		justify-content: center;
		align-items: center;
	}
</style>
