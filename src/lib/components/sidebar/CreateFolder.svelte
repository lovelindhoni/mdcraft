<!--this is a small button that would create new folders, in the sidebar section-->
<script lang="ts">
	import { folders } from '$lib/stores/db'; // importing the folders array from the store
	import { CreateFolder } from '$lib/utils/classes';
	import AddIcon from '$lib/assets/svg/AddSvg.svelte'; // the addicon svg
	import { onMount } from 'svelte';
	let CreateAction: any; // for dynamically importing the create action modal
	onMount(async () => {
		CreateAction = (await import('$lib/components/modals/CreateModal.svelte')).default;
	});
	let showCreate = false; // decides to show the create modal
	let title: string; // the value from the input box is stored here
	let error = false; // noerror when there is no duplicate in folders
	const newFolder = () => {
		// this function create the folder
		// if the user enetered title is not unique, then the noErrror is set to false and also wipes the title to start from fresh
		if ($folders.some((folder) => folder.title === title.trim())) {
			error = true;
		} else {
			// if the title is unique, then the title is trimmed and pushed to the folders arrray through the createFolder class
			$folders.push(
				// if the folder array is empty, then the created folder will have the id 0, if is not empty then one greater than the id of the last folder in the array will be the id of this new folder, and also the trimmed title is passed
				new CreateFolder(title.trim())
			);
			$folders = $folders; // courtesy of svelte
			title = ''; // wipes the title for a clean start
			error = false; // noerror then
			showCreate = false; // closes the create folder modal
		}
	};
	let size = matchMedia('(max-width:549px)').matches
		? // for changing the size of the icons
		  '20'
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
		<AddIcon color="white" {size} />
	</button>
</div>
{#if showCreate}
	<!--opens the modal here-->
	<!-- on cancel , both the title is wiped and error is set to false, then closes the modal, on proceed, the newFolder function is runned. the title is binded which will have the value from the input tag in the delete modal, plus the error is set to true-->
	<svelte:component
		this={CreateAction}
		contentType="Folder"
		on:cancel={() => {
			title = '';
			error = false;
			showCreate = false;
		}}
		bind:title
		on:proceed={newFolder}
		{error}
	/>
{/if}

<style>
	@media (min-width: 1740px) {
		h2 {
			font-size: 2.45rem;
		}
		.container {
			margin-bottom: 1.25rem;
			width: 90%;
		}
		button {
			height: 3rem;
			width: 3rem;
		}
	}
	@media (min-width: 1430px) and (max-width: 1739px) {
		h2 {
			font-size: 1.9rem;
		}
		.container {
			margin-bottom: 1.2rem;
			width: 90%;
		}
		button {
			height: 2.6rem;
			width: 2.6rem;
		}
	}
	@media (min-width: 1151px) and (max-width: 1429px) {
		h2 {
			font-size: 1.72rem;
		}
		.container {
			margin-bottom: 0.5rem;
			width: 90%;
		}
		button {
			height: 2.5rem;
			width: 2.5rem;
		}
	}
	@media (min-width: 1024px) and (max-width: 1150px) {
		h2 {
			font-size: 1.52rem;
		}
		.container {
			margin-bottom: 0.5rem;
			width: 90%;
		}
		button {
			height: 2.2rem;
			width: 2.2rem;
		}
	}
	@media (min-width: 650px) and (max-width: 1023px) {
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
	@media (min-width: 550px) and (max-width: 649px) {
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
	@media (max-width: 549px) {
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
	}
	button:hover {
		box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
	}
	h2 {
		font-weight: 500;
	}
</style>
