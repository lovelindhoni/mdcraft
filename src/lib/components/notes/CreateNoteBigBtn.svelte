<script lang="ts">
	import { folders } from '$lib/store'; // the folders array as ususal
	import { onMount } from 'svelte'; // for dynamic importing
	let AddSvg: any; // the variables to hold the dynaimically imported comps
	let CreateAction: any;
	onMount(async () => {
		AddSvg = (await import('$lib/assets/AddSvg.svelte')).default;
		CreateAction = (await import('$lib/components/actions/CreateAction.svelte')).default;
	});
	export let currentFolderIndex: number; // passed by the notessection.svetle
	let title: string; // the title variable which will be used throughout here
	let showModal = false; // the varable that closes the modal
	let noError = true;
	class CreateNote implements Note {
		// this class generates the note objects which will be pushed to the folder.notes array
		id: Note['id'];
		title: Note['title'];
		content: Note['content'];
		constructor(title: Note['title']) {
			this.id = crypto.randomUUID();
			this.title = title;
			this.content = `# Hello world`;
		}
	}
	function newNote() {
		// if there is already a note with the sametitle then noError is set to false
		if ($folders[currentFolderIndex].notes.some((note) => note.title === title.trim())) {
			noError = false;
		} else {
			// else the note will be pushed
			$folders[currentFolderIndex].notes.push(
				// this note will be pushed to the notes array of the currentfolder
				new CreateNote(title.trim())
			);
			$folders = $folders;
			title = '';
			noError = true;
			showModal = false;
		}
	}
	let size = matchMedia('(min-width:1740px)').matches
		? '39'
		: matchMedia('(min-width:1430px) and (max-width:1739px)').matches ||
		  matchMedia('(min-width:550px) and (max-width:1023px)')
		? '32'
		: '26';
</script>

<button on:click={() => (showModal = true)} on:keydown={() => (showModal = true)}>
	<!--clicking the button will open the modal-->
	<span>
		<svelte:component this={AddSvg} color="white" {size} />
		Create Note
	</span>
</button>
{#if showModal}
	<!--opens the modal here-->
	<!-- on cancel , the title is wiped and then noerror is set to true, then closes the modal, on proceed, the pushnote function is runned. the title is binded which will have the value from the input tag in the delete modal, plus the noerror is set to true and the slot content is passed to the modal-->
	<svelte:component
		this={CreateAction}
		contentType="note"
		on:cancel={() => {
			title = '';
			noError = true;
			showModal = false;
		}}
		bind:title
		on:proceed={newNote}
		{noError}
	/>
{/if}

<style>
	@media screen and (min-width: 1740px) {
		button {
			width: 17rem;
			height: 5rem;
			font-size: 1.8rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		button {
			width: 14rem;
			height: 4.2rem;
			font-size: 1.6rem;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1429px) {
		button {
			width: 12.5rem;
			height: 3.5rem;
			font-size: 1.37rem;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 1023px) {
		button {
			width: 15rem;
			height: 4.2rem;
			font-size: 1.6rem;
		}
	}
	@media screen and (max-width: 549px) {
		button {
			width: 12.5rem;
			height: 3.5rem;
			font-size: 1.37rem;
		}
	}
	button {
		color: white;
		background-color: var(--green);
		border-color: transparent;
		cursor: pointer;
		border-radius: 0.8rem;
	}
	button:hover {
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
	}
	span {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
	}
</style>
