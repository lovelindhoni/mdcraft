<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/stores/db'; // importing folders and the id's
	import DeleteIcon from '$lib/assets/svg/DeleteSvg.svelte'; // importing the svg's
	import EditIcon from '$lib/assets/svg/EditSvg.svelte';
	let RenameAction: any; // these holds the dynamically imported modals
	let DeleteAction: any;
	import { onMount } from 'svelte';
	onMount(async () => {
		RenameAction = (await import('$lib/components/modals/RenameModal.svelte')).default;
		DeleteAction = (await import('$lib/components/modals/DeleteModal.svelte')).default;
	});
	export let folderId: string; // exporting the folderId to programmatically get the folder-id while looping in each block with the folders array in the dashboard page
	$: folderIndex = $folders.findIndex((folder) => folder.id === folderId); // finding the right folder in the array with the acquired folderIndex
	$: selected = folderId === $currentFolderId ? true : false;
	let showRename = false; // shows the rename modal when edit icon is clicked
	let showDeleteModal = false; // shows the delete modal when delete icon is clicked
	let title = ''; // the title which i am gonna fuck through the whole sidebar. It gets the foldertitle of the folder from the modals
	let error = false; //  whenever there is a duplicate folder title, a boolean value is passed to the modals
	let editIconColor = '#b3b3b3'; // below variables holds the color of the icon, when they are hovered orange else grey
	let deleteIconColor = '#b3b3b3';
	const deleteFolder = () => {
		// this function causes the deletion of a folder
		$folders.splice(folderIndex, 1); // removes the folder from the array
		$folders = $folders; // very own courtesty of svelte
		if ($currentFolderId === folderId) {
			// when the deleted folder is the currented folder, then the id's are set to null
			currentNoteId.set(null);
			currentFolderId.set(null);
		}
		showDeleteModal = false; // closes the delete modal
	};
	const renameFolder = () => {
		// this function causes the editing of a folder
		if (
			// if the folder's title of this component is not equal to the title from the modal and  if there is already a folder with the same title as the new folder title from the modal(because i dont want to show error when the user gives the existing title to its folder itself) then, the there the error is set to true.
			$folders[folderIndex].title !== title.trim() &&
			$folders.some((folder) => folder.title === title.trim())
		) {
			error = true;
		} else {
			// else, the the trimmed title is stored as the new title for the folder in this component, and closes the edit modal
			$folders[folderIndex].title = title.trim();
			error = false;
			showRename = false;
		}
	};
	let size = matchMedia('(min-width:1740px)').matches
		? '28'
		: matchMedia('(min-width:1430px) and (max-width:1739px)').matches ||
		  matchMedia('(min-width:549px) and (max-width:1023px)').matches
		? '23'
		: '21'; // size of the icons, decided by the width of viewport
</script>

<!--When the mouse is hovered above the folder, onhover is set to true, else false-->
<div role="button" tabindex="0" class:selected class="folder-container" on:click on:keydown>
	<!--even forwarding, clicking this component will aset the currentFolderId-->
	<div class="folder-title">
		<span>{$folders[folderIndex].title}</span>
		<!--This is the folder title of this component, i have been reffering in the above comments-->
	</div>
	<div role="group" class="actions">
		<!--the edit and delete icons are imported and then the clicking of it will open its respective modals-->
		<!--used stop propagation to avoid propagating the event to the parent that is the singlefolder component-->
		<div
			on:mouseover={() => (editIconColor = '#f96743')}
			on:mouseout={() => (editIconColor = '#b3b3b3')}
			on:focus={() => (editIconColor = '#f96743')}
			on:blur={() => (editIconColor = '#b3b3b3')}
			role="button"
			tabindex="0"
			class="icons"
			title="edit"
			on:click|stopPropagation={() => (showRename = true)}
			on:keydown|stopPropagation={() => (showRename = true)}
		>
			<EditIcon color={editIconColor} {size} />
		</div>
		<div
			on:mouseover={() => (deleteIconColor = '#f96743')}
			on:mouseout={() => (deleteIconColor = '#b3b3b3')}
			on:focus={() => (deleteIconColor = '#f96743')}
			on:blur={() => (deleteIconColor = '#b3b3b3')}
			role="button"
			tabindex="0"
			class="icons"
			title="delete"
			on:click|stopPropagation={() => (showDeleteModal = true)}
			on:keydown|stopPropagation={() => (showDeleteModal = true)}
		>
			<DeleteIcon color={deleteIconColor} {size} />
		</div>
	</div>
</div>

{#if showDeleteModal}
	<!--shows the delete modal,  it passes the folder title of this component to the delete modal-->
	<svelte:component
		this={DeleteAction}
		on:cancel={() => (showDeleteModal = false)}
		on:proceed={deleteFolder}>Delete Folder?</svelte:component
	>
{:else if showRename}
	<!--shows the rename modal, this child component exposes the title taken as input and here it is bounded to the title, when closing the modal, the title is cleared, so that when renaming other folders, wont show this folder title , the folder title is passed to the oldtitle prop and it gets renamed and return to the title-->
	<svelte:component
		this={RenameAction}
		oldTitle={$folders[folderIndex].title}
		on:cancel={() => {
			showRename = false;
			title = '';
			error = false;
		}}
		bind:title
		on:proceed={renameFolder}
		{error}>Rename Folder</svelte:component
	>
{/if}

<style>
	@media (min-width: 1740px) {
		span {
			font-size: 1.75rem;
		}
		.folder-container {
			height: 5rem;
			margin-bottom: 1.5rem;
		}

		.actions {
			gap: 1.5rem;
			margin-right: 0.5rem;
		}
	}
	@media (min-width: 1430px) and (max-width: 1739px) {
		span {
			font-size: 1.43rem;
		}
		.folder-container {
			height: 3.8rem;
			margin-bottom: 1rem;
		}
	}
	@media (min-width: 1301px) and (max-width: 1429px) {
		span {
			font-size: 1.3rem;
		}
		.folder-container {
			height: 3.42rem;
			margin-bottom: 1rem;
		}
	}
	@media (min-width: 1151px) and (max-width: 1300px) {
		span {
			font-size: 1.25rem;
		}
		.folder-container {
			height: 3.4rem;
			margin-bottom: 1rem;
		}
	}
	@media (min-width: 1024px) and (max-width: 1150px) {
		span {
			font-size: 1.3rem;
		}
		.folder-container {
			height: 3.5rem;
			margin-bottom: 1rem;
		}
	}
	@media (min-width: 1024px) {
		.actions {
			padding-left: 0.4rem;
			padding-right: 0.4rem;
			padding-top: 0.1rem;
		}
	}
	@media (min-width: 550px) and (max-width: 1023px) {
		span {
			font-size: 1.5rem;
		}
		.folder-container {
			height: 4rem;
			margin-bottom: 1rem;
			border-bottom: 1px solid var(--grey-2);
		}
		.actions {
			padding-left: 0.3rem;
			padding-right: 0.3rem;
		}
	}
	@media (max-width: 549px) {
		span {
			font-size: 1.22rem;
		}
		.folder-container {
			height: 3.4rem;
			margin-bottom: 1rem;
			border-bottom: 1px solid var(--grey-2);
		}
		.actions {
			padding-left: 0.3rem;
			padding-right: 0.3rem;
		}
	}
	.actions {
		align-items: center;
		justify-content: space-between;
		display: flex;
		height: 100%;
		width: 4.8em;
		box-sizing: border-box;
	}
	.folder-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		cursor: pointer;
		margin-right: auto;
		margin-left: auto;
		width: 95%;
		padding-left: 0.8rem;
		padding-right: 0.3rem;
	}
	.folder-container:hover {
		color: var(--orange);
	}
	.folder-title {
		width: 75%;
	}
	.selected {
		background-color: transparent;
		color: var(--orange);
		border-left: 3px solid var(--orange);
	}
	.icons {
		cursor: pointer;
	}
	span {
		font-weight: 500;
		text-overflow: ellipsis;
		overflow: hidden;
		display: block;
		white-space: pre;
	}
</style>
