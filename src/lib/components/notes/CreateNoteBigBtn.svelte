<!--this is a big button that is shown to create notes when there is no notes in a folder-->
<script lang="ts">
	import { folders } from '$lib/stores/db'; // the folders array as ususal
	import { CreateNote } from '$lib/utils/classes';
	import { onMount } from 'svelte'; // for dynamic importing
	let AddSvg: any; // the variables to hold the dynaimically imported comps
	let CreateAction: any;
	// lazily importing the components here
	onMount(async () => {
		AddSvg = (await import('$lib/assets/svg/AddSvg.svelte')).default;
		CreateAction = (await import('$lib/components/modals/CreateModal.svelte')).default;
	});
	export let currentFolderIndex: number; // passed by the notessection.svetle
	let title: string; // the title variable which will be used throughout here
	let showCreateModal = false; // the varable that closes the modal
	let error = false;
	const createNote = () => {
		// if there is already a note with the sametitle then error is set to true
		if ($folders[currentFolderIndex].notes.some((note) => note.title === title.trim())) {
			error = true;
		} else {
			// else the note will be pushed
			$folders[currentFolderIndex].notes.push(
				// this note will be pushed to the notes array of the currentfolder
				new CreateNote(title.trim())
			);
			$folders = $folders;
			title = '';
			error = false;
			showCreateModal = false;
		}
	};
	let size = matchMedia('(min-width:1740px)').matches
		? '39'
		: matchMedia('(min-width:1430px) and (max-width:1739px)').matches ||
		  matchMedia('(min-width:550px) and (max-width:1023px)').matches
		? '32'
		: '26';
</script>

<button on:click={() => (showCreateModal = true)} on:keydown={() => (showCreateModal = true)}>
	<!--clicking the button will open the modal-->
	<span>
		<svelte:component this={AddSvg} color="white" {size} />
		Create Note
	</span>
</button>

{#if showCreateModal}
	<!--opens the modal here-->
	<!-- on cancel , the title is wiped and then error is set to false, then closes the modal, on proceed, the pushnote function is runned. the title is binded which will have the value from the input tag in the delete modal, plus the error is set to false and the slot content is passed to the modal-->
	<svelte:component
		this={CreateAction}
		contentType="note"
		on:cancel={() => {
			title = '';
			error = false;
			showCreateModal = false;
		}}
		bind:title
		on:proceed={createNote}
		{error}
	/>
{/if}

<style>
	@media (min-width: 1740px) {
		button {
			width: 17rem;
			height: 5rem;
			font-size: 1.8rem;
		}
	}

	@media (max-width: 1739px) {
		button {
			width: 13rem;
			height: 4rem;
			font-size: 1.5rem;
		}
	}

	@media (max-width: 1429px) {
		button {
			width: 12.5rem;
			height: 3.5rem;
			font-size: 1.37rem;
		}
	}

	@media (max-width: 1023px) {
		button {
			width: 15rem;
			height: 4.2rem;
			font-size: 1.6rem;
		}
	}

	@media (max-width: 549px) {
		button {
			width: 12.5rem;
			height: 3.5rem;
			font-size: 1.37rem;
		}
	}

	button {
		color: white;
		background-color: var(--green);
		border: transparent;
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
