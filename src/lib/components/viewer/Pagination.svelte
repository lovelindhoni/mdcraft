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
			role="link"
			tabindex="0"
			>{$folders[currentFolderIndex].title}
		</span>

		<span>/ {$folders[currentFolderIndex].notes[currentNoteIndex].title} </span>
	</nav>
{/if}

<style>
	@media screen and (min-width: 1740px) {
		span {
			font-size: 1.57rem;
			max-width: 15vw;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		span {
			font-size: 1.32rem;
			max-width: 10vw;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1429px) {
		span {
			font-size: 1.21rem;
			max-width: 13vw;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 1023px) {
		span {
			font-size: 1.3rem;
			max-width: 25vw;
			display: inline-block;
		}
	}
	@media screen and (max-width: 549px) {
		span {
			font-size: 1rem;
			width: 40vw;
			display: block;
		}
	}
	span {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.url {
		cursor: pointer;
		color: var(--orange);
	}
	.url:hover {
		border-bottom: 2px solid var(--orange);
	}
</style>
