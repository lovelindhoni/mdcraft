<script lang="ts">
	import { folders } from '$lib/store'; // importing the folders array from the store
	import AddIcon from '$lib/assets/AddSvg.svelte'; // the addicon svg
	import { onMount } from 'svelte';
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
	let size = matchMedia('(max-width:549px)').matches
		? '20'
		: matchMedia('(max-width:1023px)').matches
		? '24'
		: matchMedia('(max-width:1450px)').matches
		? '27'
		: '32';
</script>

<div class="container">
	<h2>Folders</h2>
	<button
		on:click={() => (showCreate = true)}
		on:keydown={() => (showCreate = true)}
		title="create-folder"
	>
		<!--clicking the button will open the modal-->
		<div class="newFolderbtn">
			<AddIcon color="white" {size} />
		</div>
	</button>
</div>
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
	@media screen and (min-width: 1740px) {
		h2 {
			font-size: 2.45rem;
		}
		.container {
			margin-bottom: 1.25rem;
			width: 90%;
		}
		button {
			height: 3.1rem;
			width: 3.1rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		h2 {
			font-size: 1.9rem;
		}
		.container {
			margin-bottom: 1.2rem;
			width: 90%;
		}
		button {
			height: 2.7rem;
			width: 2.7rem;
		}
	}
	@media screen and (min-width: 1151px) and (max-width: 1429px) {
		h2 {
			font-size: 1.72rem;
		}
		.container {
			margin-bottom: 0.5rem;
			width: 90%;
		}
		button {
			height: 2.6rem;
			width: 2.6rem;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1150px) {
		h2 {
			font-size: 1.52rem;
		}
		.container {
			margin-bottom: 0.5rem;
			width: 90%;
		}
		button {
			height: 2.3rem;
			width: 2.3rem;
		}
	}
	@media screen and (min-width: 650px) and (max-width: 1023px) {
		h2 {
			font-size: 2.3rem;
		}
		.container {
			margin-bottom: 0.5rem;
			width: 62%;
		}
		button {
			height: 2.75rem;
			width: 2.75rem;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 649px) {
		h2 {
			font-size: 2.25rem;
		}
		.container {
			margin-bottom: 0.5rem;
			width: 73%;
		}
		button {
			height: 2.75rem;
			width: 2.75rem;
		}
	}
	@media screen and (max-width: 549px) {
		h2 {
			font-size: 1.65rem;
		}
		.container {
			margin-bottom: 0.5rem;
			width: 88%;
		}
		button {
			height: 2.5rem;
			width: 2.5rem;
		}
	}
	.container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: auto;
		margin-left: auto;
		margin-top: 1rem;
		height: 5rem;
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border-radius: 50%;
		background-color: var(--green);
		border: 1px solid transparent;
		padding-left: 0.5rem;
		padding-top: 0.2rem;
	}
	button:hover {
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
	}
	h2 {
		font-weight: 500;
	}
</style>
