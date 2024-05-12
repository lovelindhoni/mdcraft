<!--I am so sorry for my poor choice of name of this component, this component shows the name of the note selected and its parent folder, on the viewer section-->
<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/stores/db'; // for showing the titles of folder
	export let currentFolderIndex: number; // these will be satisfied by the viewer
	export let currentNoteIndex: number;
</script>

{#if $currentFolderId && $currentNoteId}
	<!--when the id's are not null-->
	<nav>
		<!-- clicking the folder will set the currentNoteId to null-->
		<span
			class="url"
			on:click={() => currentNoteId.set(null)}
			on:keydown={() => currentNoteId.set(null)}
			role="link"
			tabindex="0"
			>{$folders[currentFolderIndex].title}
		</span>

		<span>/ {$folders[currentFolderIndex].notes[currentNoteIndex].title} </span>
	</nav>
{/if}

<style>
	@media (min-width: 1740px) {
		span {
			font-size: 1.57rem;
			max-width: 17vw;
			display: inline-block;
		}
	}
	@media (max-width: 1739px) {
		span {
			font-size: 1.32rem;
			max-width: 16vw;
			display: inline-block;
		}
	}
	@media (max-width: 1429px) {
		span {
			font-size: 1.21rem;
			max-width: 13vw;
			display: inline-block;
		}
	}
	@media (max-width: 1023px) {
		span {
			font-size: 1.3rem;
			max-width: 25vw;
			display: inline-block;
		}
	}
	@media (max-width: 649px) {
		span {
			font-size: 1.3rem;
			max-width: 22vw;
			display: inline-block;
		}
	}
	@media (max-width: 549px) {
		span {
			font-size: 1rem;
			max-width: 40vw;
			display: block;
		}
	}
	span {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: pre;
	}
	.url {
		cursor: pointer;
		color: var(--orange);
	}
	.url:hover {
		border-bottom: 2px solid var(--orange);
	}
</style>
