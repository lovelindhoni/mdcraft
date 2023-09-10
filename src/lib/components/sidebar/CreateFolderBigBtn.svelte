<script lang="ts">
	import { folders } from '$lib/store'; // importing the folders array from the store
	import { onMount } from 'svelte';
	import AddSvg from '$lib/assets/AddSvg.svelte';
	let CreateAction: any; // for dynamically importing the actions modal
	onMount(async () => {
		CreateAction = (await import('$lib/components/actions/CreateAction.svelte')).default;
	});
	class CreateFolder implements Folder {
		// class to create new folder objects
		id: Folder['id']; // the id
		title: Folder['title']; // the title
		notes: Folder['notes']; // and the notes array
		// the constructor needs the id and the title, the chapters will be implemented later
		constructor(title: Folder['title']) {
			this.id = crypto.randomUUID(); // generates a unique id
			this.title = title;
			this.notes = [{ id: crypto.randomUUID(), title: `Example Note`, content: `# Hello World` }]; // some defaults
		}
	}
	let showCreate = false; // decides to show the create modal
	let title: string; // the value from the input box is stored here
	let noError = true; // noErrror when there is no duplicate in folders
	function newFolder() {
		// this function create the folder
		// if the user enetered title is not unique, then the noErrror is set to false and also wipes the title to start from fresh
		if ($folders.some((folder) => folder.title === title.trim())) {
			noError = false;
		} else {
			// if the title is unique, then the title is trimmed and pushed to the folders arrray through the createFolder class
			$folders.push(
				// if the folder array is empty, then the created folder will have the id 0, if is not empty then one greater than the id of the last folder in the array will be the id of this new folder, and also the trimmed title is passed
				new CreateFolder(title.trim())
			);
			$folders = $folders; // courtesy of svelte
			title = ''; // wipes the title for a clean start
			noError = true; // noerror then
			showCreate = false; // closes the create folder modal
		}
	}
	let size = matchMedia('(min-width:1740px)').matches
		? '39'
		: matchMedia('(min-width:1430px) and (max-width:1739px)').matches ||
		  matchMedia('(min-width:549px) and (max-width:1023px)').matches
		? '32'
		: '26';
</script>

<button on:click={() => (showCreate = true)} on:keydown={() => (showCreate = true)}>
	<!--clicking the button will open the modal-->
	<span>
		<AddSvg color="white" {size} />
		Create Folder
	</span>
</button>
{#if showCreate}
	<!--opens the modal here-->
	<!-- on cancel , both the title is wiped and noerror is set to true, then closes the modal, on proceed, the newFolder function is runned. the title is binded which will have the value from the input tag in the delete modal, plus the noerror is set to false-->
	<svelte:component
		this={CreateAction}
		contentType="Folder"
		on:cancel={() => {
			title = '';
			noError = true;
			showCreate = false;
		}}
		bind:title
		on:proceed={newFolder}
		{noError}
	/>
{/if}

<style>
	@media (min-width: 1740px) {
		button {
			width: 16.5rem;
			height: 5rem;
			font-size: 1.86rem;
			border-radius: 1.2rem;
		}
	}

	@media (min-width: 1430px) and (max-width: 1739px) {
		button {
			width: 13rem;
			height: 4rem;
			font-size: 1.45rem;
			border-radius: 0.8rem;
		}
	}

	@media (min-width: 1024px) and (max-width: 1429px) {
		button {
			width: 12.5rem;
			height: 3.5rem;
			font-size: 1.37rem;
			border-radius: 0.8rem;
		}
	}

	@media (min-width: 550px) and (max-width: 1023px) {
		button {
			width: 17rem;
			height: 4.5rem;
			font-size: 1.85rem;
			border-radius: 0.8rem;
		}
	}

	@media (max-width: 549px) {
		button {
			width: 11rem;
			height: 3.5rem;
			font-size: 1.3rem;
			border-radius: 0.8rem;
		}
	}

	button {
		color: white;
		background-color: var(--green);
		border: none;
		cursor: pointer;
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
