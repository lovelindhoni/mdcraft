<script lang="ts">
	import { folders, currentFolderId, currentNoteId } from '$lib/store'; // for showing the titles of folder and
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
			>{$folders[currentFolderIndex].title}
		</span>

		<span>/ {$folders[currentFolderIndex].notes[currentNoteIndex].title} </span>
	</nav>
{/if}

<style>
	@media screen and (min-width: 1740px) {
		span {
			font-size: 1.57rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		span {
			font-size: 1.32rem;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1429px) {
		span {
			font-size: 1.21rem;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 1023px) {
		span {
			font-size: 1.3rem;
			max-width: 25vw;
			display: inline-block;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}
	@media screen and (max-width: 549px) {
		span {
			font-size: 1.04rem;
			display: block;
			width: 40vw;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}
	.url {
		cursor: pointer;
		color: var(--vibrant-purple);
	}
	.url:hover {
		border-bottom: 2px solid var(--vibrant-purple);
	}
</style>
