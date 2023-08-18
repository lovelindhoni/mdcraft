<!--This component connects all the components in the sidebar folder, this will be exported to the dashboard page-->
<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/store'; // of course, the folders array, and the Id's
	import CreateFolder from '$lib/components/sidebar/CreateFolder.svelte'; // the create new button
	import Folder from '$lib/components/sidebar/Folder.svelte'; // the component that will display the folder
	import AddFolder from '$lib/assets/AddFolder.svg';
	import CreateFolderBigButton from '$lib/components/sidebar/CreateFolderBigBtn.svelte';
</script>

<!--the creatFolder button-->
<CreateFolder />
{#if $folders.length !== 0}
	<!--if there are no folders then the message is displayed, else the folders are looped -->
	<div class="folders" role="menu">
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
	<div class="no-folders">
		<img src={AddFolder} alt="an illustration representing a folder with some notes in it" />
		<div style="margin-right:2rem">
			<p class="no-folders-text">No folders found</p>
			<p class="no-folders-subtext">Folders let you organize your notes</p>
		</div>
		<div class="create-btn">
			<CreateFolderBigButton />
		</div>
	</div>
{/if}

<style>
	@media screen and (min-width: 1740px) {
		img {
			height: 27rem;
			width: 28rem;
		}
		.folders {
			height: 87%;
		}
		.no-folders-text {
			font-size: 2.83rem;
		}
		.no-folders-subtext {
			font-size: 1.8rem;
			position: relative;
			bottom: 1.3rem;
		}
		.create-btn {
			margin-right: 13rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		img {
			height: 20rem;
			width: 22rem;
		}
		.folders {
			height: 84%;
		}
		.no-folders-text {
			font-size: 2.15rem;
		}
		.no-folders-subtext {
			font-size: 1.4rem;
			position: relative;
			bottom: 0.8rem;
		}
		.create-btn {
			margin-right: 10rem;
		}
	}
	@media screen and (max-width: 1429px) {
		img {
			height: 15rem;
			width: 18rem;
		}
		.folders {
			height: 83%;
		}
		.no-folders-text {
			font-size: 1.6rem;
		}
		.no-folders-subtext {
			font-size: 1.1rem;
			position: relative;
			bottom: 0.8rem;
		}
		.create-btn {
			margin-right: 5.8rem;
		}
	}
	.folders {
		overflow-y: auto;
		padding-left: 0.3rem;
		padding-right: 0.3rem;
		margin-top: 0.3rem;
		box-sizing: border-box;
	}
	img {
		filter: contrast(75%);
	}
	.no-folders {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	.no-folders-subtext {
		color: var(--blue-grey);
	}
</style>
