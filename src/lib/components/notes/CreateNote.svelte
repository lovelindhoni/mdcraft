<!--This component is a small button that would create notes in a folder-->
<script lang="ts">
	import { folders } from '$lib/stores/db'; // the folders array as usual
	import { CreateNote } from '$lib/utils/classes';
	import { onMount } from 'svelte'; // for dynamic importing
	let AddSvg: any; // the variables to hold the dynaimically imported comps
	let CreateAction: any;
	onMount(async () => {
		AddSvg = (await import('$lib/assets/svg/AddSvg.svelte')).default;
		CreateAction = (await import('$lib/components/modals/CreateModal.svelte')).default;
	});
	export let currentFolderIndex: number; // passed by the notessection.svetle
	let title: string; // the title variable which will be used throughout here
	let showCreateModal = false; // the varable that closes the modal
	let error = false;
	const createNote = () => {
		// if there is already a note with the sametitle then error is set to false
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
	let size = matchMedia('(max-width:549px)').matches
		? '20'
		: matchMedia('(max-width:1023px)').matches
		? '24'
		: matchMedia('(max-width:1450px)').matches
		? '27'
		: '32';
</script>

<div class="title-btn">
	<h2>/{$folders[currentFolderIndex].title}</h2>
	<button
		on:click={() => (showCreateModal = true)}
		on:keydown={() => (showCreateModal = true)}
		title="create-note"
	>
		<svelte:component this={AddSvg} color="white" {size} />
	</button>
</div>
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
			width: 3rem;
			height: 3rem;
		}
		h2 {
			font-size: 2.5rem;
		}
	}
	@media (max-width: 1739px) {
		button {
			width: 2.6rem;
			height: 2.6rem;
		}
		h2 {
			font-size: 2.1rem;
		}
	}
	@media (max-width: 1429px) {
		button {
			width: 2.5rem;
			height: 2.5rem;
		}
		h2 {
			font-size: 2rem;
		}
	}

	@media (max-width: 1023px) {
		button {
			width: 2.8rem;
			height: 2.8rem;
		}
		h2 {
			font-size: 2.2rem;
		}
	}
	@media (max-width: 649px) {
		h2 {
			font-size: 2.05rem;
		}
		button {
			width: 2.8rem;
			height: 2.8rem;
		}
	}
	@media (max-width: 549px) {
		button {
			width: 2.3rem;
			height: 2.3rem;
		}
		h2 {
			font-size: 1.6rem;
		}
	}

	button {
		border: 0;
		background-color: var(--green);
		border-radius: 50%;
		box-sizing: border-box;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 0.8rem;
	}

	button:hover {
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
	}

	h2 {
		font-weight: normal;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: pre;
		width: 70%;
	}

	.title-btn {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		height: 100%;
	}
</style>
