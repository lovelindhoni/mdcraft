<script lang="ts">
	import CreateNoteBigBtn from './CreateNoteBigBtn.svelte';
	import AddNotes from '$lib/assets/AddNotes.svg';
	export let currentFolderIndex: number;
</script>

<div class="no-notes">
	<img src={AddNotes} alt="Notes Taking illustration" />
	<div class="create-note">
		<div class="no-note-text">
			<span class="create-note-text">Create a note here</span>
			<span class="create-note-subtext">Write notes in markdown syntax with ease</span>
		</div>
		<CreateNoteBigBtn {currentFolderIndex} />
	</div>
</div>

<style>
	@media screen and (min-width: 1740px) {
		.create-note-text {
			font-size: 3rem;
		}
		.create-note-subtext {
			font-size: 1.9rem;
		}
		img {
			height: 28rem;
			width: 28rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		.create-note-text {
			font-size: 2.22rem;
		}
		.create-note-subtext {
			font-size: 1.435rem;
		}
		img {
			height: 22rem;
			width: 22rem;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1429px) {
		.create-note-text {
			font-size: 1.9rem;
		}
		.create-note-subtext {
			font-size: 1.2rem;
		}
		img {
			height: 18rem;
			width: 18rem;
		}
	}
	@media screen and (min-width: 1024px) {
		.no-notes {
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			justify-content: space-around;
			height: 100%;
			width: 100%;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 1023px) {
		.no-notes {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 80%;
			margin: auto;
			width: 62%;
		}
		.create-note-text {
			font-size: 2.5rem;
		}
		.create-note-subtext {
			font-size: 1.5rem;
		}
		img {
			height: 23rem;
			width: 23rem;
		}
	}
	@media screen and (max-width: 549px) {
		.no-notes {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 80%;
			width: 100%;
			margin-top: auto;
			margin-bottom: auto;
			padding-left: 2rem;
			padding-right: 2rem;
		}
		.create-note-text {
			font-size: 1.7rem;
		}
		.create-note-subtext {
			font-size: 1.15rem;
		}
		img {
			height: 15rem;
			width: 15rem;
		}
	}
	img {
		filter: contrast(75%);
	}
	.no-notes {
		box-sizing: border-box;
	}
	.create-note {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}
	.create-note-subtext {
		color: var(--blue-grey);
		position: relative;
		bottom: 0.9rem;
	}
	.create-note-text,
	.create-note-subtext {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
	}
</style>
