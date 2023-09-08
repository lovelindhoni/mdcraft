<script lang="ts">
	import Back from '$lib/assets/back.svg';
	import { currentNoteId } from '$lib/store';
</script>

<div class="go-back {currentNoteId ? 'go-back-to-notes' : 'go-back-to-folder'}" on:click on:keydown>
	<img
		class={currentNoteId ? 'arrow-logo-to-notes' : 'arrow-logo-to-folder'}
		src={Back}
		alt="a svg describing a backwards"
	/>
	<span>Back</span>
</div>

<style>
	@media screen and (min-width: 550px) and (max-width: 1023px) {
		.go-back-to-folder {
			font-size: 1.5rem;
		}
		.arrow-logo-to-folder {
			height: 1.5rem;
			width: 1.5rem;
		}
		.arrow-logo-to-notes {
			height: 1.3rem;
			width: 1.04rem;
		}
		.go-back-to-notes {
			font-size: 1.3rem;
		}
	}
	@media screen and (max-width: 549px) {
		.go-back-to-folder {
			font-size: 1.1rem;
		}
		.arrow-logo-to-folder {
			height: 1.1rem;
			width: 1.1rem;
		}
		.arrow-logo-to-notes {
			height: 1.04rem;
			width: 1.04rem;
		}
		.go-back-to-notes {
			font-size: 1.04rem;
		}
	}
	.go-back {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-bottom: 2px solid var(--vibrant-orange);
		width: max-content;
		color: var(--orange);
	}
</style>
