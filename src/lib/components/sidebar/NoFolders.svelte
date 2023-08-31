<script lang="ts">
	import AddFolder from '$lib/assets/AddFolder.svg';
	import CreateFolderBigButton from '$lib/components/sidebar/CreateFolderBigBtn.svelte';
</script>

<div class="no-folders">
	<img src={AddFolder} alt="an illustration representing a folder with some notes in it" />
	<div style="">
		<span class="no-folders-text">No folders found</span>
		<span class="no-folders-subtext">Folders let you organize your notes</span>
	</div>
	<div class="create-btn">
		<CreateFolderBigButton />
	</div>
</div>

<style>
	@media screen and (max-width: 549px) {
		.no-folders-text {
			font-size: 1.83rem;
		}
		.no-folders-subtext {
			font-size: 1.2rem;
			position: relative;
			bottom: 0.8rem;
		}
		.create-btn {
			margin-right: 7.1rem;
		}
		img {
			height: 17rem;
			width: 19rem;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 649px) {
		.no-folders-text {
			font-size: 2.4rem;
		}
		.no-folders-subtext {
			font-size: 1.6rem;
			position: relative;
			bottom: 0.8rem;
		}
		.create-btn {
			margin-right: 8.5rem;
		}
		img {
			height: 24rem;
			width: 24rem;
		}
	}
	@media screen and (min-width: 650px) and (max-width: 1023px) {
		.no-folders-text {
			font-size: 2.7rem;
		}
		.no-folders-subtext {
			font-size: 1.77rem;
			position: relative;
			bottom: 0.8rem;
		}
		.create-btn {
			margin-right: 11rem;
		}
		img {
			height: 24rem;
			width: 30rem;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1429px) {
		.no-folders-text {
			font-size: 1.6rem;
		}
		.no-folders-subtext {
			font-size: 1.1rem;
			position: relative;
			bottom: 0.8rem;
		}
		.create-btn {
			margin-right: 5rem;
		}
		img {
			height: 15rem;
			width: 18rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		img {
			height: 20rem;
			width: 22rem;
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
			margin-right: 9rem;
		}
	}
	@media screen and (min-width: 1740px) {
		.no-folders-text {
			font-size: 2.83rem;
		}
		.no-folders-subtext {
			font-size: 1.8rem;
			position: relative;
			bottom: 1.3rem;
		}
		.create-btn {
			margin-right: 12rem;
		}
		img {
			height: 27rem;
			width: 28rem;
		}
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
	.no-folders-text,
	.no-folders-subtext {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
	}
	.no-folders-subtext {
		color: var(--blue-grey);
	}
</style>
