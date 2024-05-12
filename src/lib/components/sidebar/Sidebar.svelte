<!--This component connects all the components in the sidebar folder, this will be exported to the dashboard page-->
<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/stores/db'; // of course, the folders array, and the Id's
	import CreateFolder from '$lib/components/sidebar/CreateFolder.svelte'; // the create new button
	import Folder from '$lib/components/sidebar/Folder.svelte'; // the component that will display the folder
	import NoFolders from '$lib/components/sidebar/NoFolders.svelte';
</script>

<!--the creatFolder button-->
<CreateFolder />
{#if $folders.length !== 0}
	<!--if there are no folders then the message is displayed, else the folders are looped -->
	<div class="folders">
		{#each $folders as folder (folder.id)}
			<!--when a folder is clicked then the currentFolderId is set to its folder Id and the curretnnoteid is set to null-->
			<Folder
				folderId={folder.id}
				on:click={() => {
					currentNoteId.set(null);
					currentFolderId.set(folder.id);
				}}
				on:keydown={() => {
					currentNoteId.set(null);
					currentFolderId.set(folder.id);
				}}
			/>
		{/each}
	</div>
{:else}
	<!--if there are no folders left -->
	<NoFolders />
{/if}

<style>
	@media (min-width: 1740px) {
		.folders {
			height: 86%;
		}
	}

	@media (min-width: 1430px) and (max-width: 1739px) {
		.folders {
			height: 79%;
		}
	}

	@media (min-width: 1024px) and (max-width: 1429px) {
		.folders {
			height: 75%;
		}
	}

	@media (min-width: 650px) and (max-width: 1023px) {
		.folders {
			height: 88.5%;
			width: 70%;
			margin-right: auto;
			margin-left: auto;
		}
	}

	@media (min-width: 550px) and (max-width: 649px) {
		.folders {
			height: 88.5%;
			width: 82%;
			margin-right: auto;
			margin-left: auto;
		}
	}

	@media (max-width: 549px) {
		.folders {
			height: 80%;
		}
	}

	.folders {
		overflow-y: auto;
		padding: 0.3rem;
		margin-top: 0.3rem;
		box-sizing: border-box;
	}
</style>
