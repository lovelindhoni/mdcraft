<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/store'; // importing folders and the id's
	import DeleteIcon from '$lib/assets/DeleteSvg.svelte'; // importing the svg's
	import EditIcon from '$lib/assets/EditSvg.svelte';
	let RenameAction: any; // these holds the dynamically imported modal
	let DeleteAction: any;
	import { onMount } from 'svelte';
	onMount(async () => {
		RenameAction = (await import('$lib/components/actions/RenameAction.svelte')).default;
		DeleteAction = (await import('$lib/components/actions/DeleteAction.svelte')).default;
	});
	export let folderId: string; // exporting the folderId to programmatically get the folder-id while looping in each block with the folders array in the dashboard page
	$: folderIndex = $folders.findIndex((folder) => folder.id === folderId); // finding the right folder in the array with the acquired folderIndex
	$: selected = folderId === $currentFolderId ? true : false;
	let showRename = false; // shows the rename modal when edit icon is clicked
	let showDeleteModal = false; // shows the delete modal when delete icon is clicked
	let title = ''; // the title which i am gonna fuck through the whole sidebar. It gets the foldertitle of the folder from the modals
	let noError = true; //  whenever there is a duplicate folder title, a boolean value is passed to the modals
	$: iconColor = $currentFolderId === folderId ? 'white' : '';
	function onDeleteProceed() {
		// this function causes the deletion of a folder
		$folders.splice(folderIndex, 1); // removes the folder from the array
		$folders = $folders; // very own courtesty of svelte
		if ($currentFolderId === folderId) {
			// when the deleted folder is the currented folder, then the id's are set to null
			$currentNoteId = null;
			$currentFolderId = null;
		}
		showDeleteModal = false; // closes the delete modal
	}
	function onRename() {
		// this function causes the editing of a folder
		if (
			// if the folder's title of this component is not equal to the title from the modal and  if there is already a folder with the same title as the new folder title from the modal(because i dont want to show error when the user gives the existing title to its folder itself) then, the there the noerror is set to false.
			$folders[folderIndex].title !== title.trim() &&
			$folders.some((folder) => folder.title === title.trim())
		) {
			noError = false;
		} else {
			// else, the the trimmed title is stored as the new title for the folder in this component, and closes the edit modal
			$folders[folderIndex].title = title.trim();
			noError = true;
			showRename = false;
		}
	}
	let onHover: boolean; // this variable changes the color of the folder at hover
</script>

<!--When the mouse is hovered above the folder, onhover is set to true, else false-->
<div
	on:mouseover={() => (onHover = true)}
	on:mouseout={() => (onHover = false)}
	on:focus={() => (onHover = true)}
	on:blur={() => (onHover = false)}
	class:on-hover={!selected && onHover}
	role="button"
	tabindex="0"
	class:selected
	class="folder-container"
	on:click
	on:keydown
>
	<!--even forwarding, clicking this component will aset the currentFolderId-->
	<div role="menuitem" class="folder-title">
		<p>{@html $folders[folderIndex].title.replace(/ /g, '&nbsp;')}</p>
		<!--preserving whitespace-->
		<!--i used this regex to save the whitespace-->
		<!--This is the folder title of this component, i have been reffering in the above comments-->
	</div>
	<div role="group" class="actions">
		<!--the edit and delete icons are imported and then the clicking of it will open its respective modals-->
		<!--used stop propagation to avoid propagating the event to the parent that is the singlefolder component-->
		<div
			role="button"
			tabindex="0"
			class="icons"
			on:click|stopPropagation={() => (showRename = true)}
			on:keydown|stopPropagation={() => (showRename = true)}
		>
			<EditIcon color={iconColor} />
		</div>
		<div
			role="button"
			tabindex="0"
			class="icons"
			on:click|stopPropagation={() => (showDeleteModal = true)}
			on:keydown|stopPropagation={() => (showDeleteModal = true)}
		>
			<DeleteIcon color={iconColor} />
		</div>
	</div>
</div>

{#if showDeleteModal}
	<!--shows the delete modal,  it passes the folder title of this component to the delete modal-->
	<svelte:component
		this={DeleteAction}
		on:cancel={() => (showDeleteModal = false)}
		on:proceed={onDeleteProceed}>Delete Folder?</svelte:component
	>
{:else if showRename}
	<!--shows the rename modal, this child component exposes the title taken as input and here it is bounded to the title, when closing the modal, the title is cleared, so that when renaming other folders, wont show this folder title , the folder title is passed to the oldtitle prop and it gets renamed and return to the title-->
	<svelte:component
		this={RenameAction}
		oldTitle={$folders[folderIndex].title}
		on:cancel={() => {
			showRename = false;
			title = '';
			noError = true;
		}}
		bind:title
		on:proceed={onRename}
		{noError}>Rename Folder</svelte:component
	>
{/if}

<style>
	.actions {
		height: 100%;
		width: 20%;
		align-items: center;
		justify-content: space-between;
		display: flex;
	}
	.folder-container {
		height: 12%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2px solid var(--light-purple);
		box-sizing: border-box;
		margin-bottom: 1rem;
		padding-left: 0.8rem;
		padding-right: 0.3rem;
		border-radius: 0.6rem;
		word-break: break-all;
		cursor: pointer;
	}
	.on-hover {
		background-color: var(--light-purple);
		border-bottom: 2px solid var(--purple);
	}
	.selected {
		background-color: var(--purple);
		color: white;
		border-bottom: transparent;
	}
	.folder-title {
		width: 80%;
	}
	.icons {
		height: 40%;
		width: 40%;
		cursor: pointer;
	}
	p {
		font-size: 1.28rem;
		font-weight: 500;
	}
</style>
