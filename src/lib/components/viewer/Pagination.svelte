<script lang="ts">
	import { books, currentBookId, currentNoteId } from '$lib/store'; // for showing the titles of book and
	export let currentBookIndex: number; // these will be satisfied by the viewer
	export let currentNoteIndex: number;
</script>

{#if $currentBookId !== null && $currentNoteId !== null}
	<!--when the id's are not null-->
	<!-- when the id's are not null-->
	<nav>
		<!-- clicking the book will set the currentNoteId to null-->
		<span
			class="url"
			on:click={() => currentNoteId.set(null)}
			on:keydown={() => currentNoteId.set(null)}
			>{$books[currentBookIndex].title}
		</span>
		<span>/ {$books[currentBookIndex].notes[currentNoteIndex].title} </span>
	</nav>
{/if}

<style>
	/**some shitty styles*/
	span {
		font-size: 1.2rem;
	}
	.url {
		cursor: pointer;
		color: #3a0ca3;
	}
	.url:hover {
		border-bottom: 1px solid #3a0ca3;
	}
</style>
