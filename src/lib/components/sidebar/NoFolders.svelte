<!--this component exists to show a illustration that represents that there is no folder exists and prompts to create one-->
<script lang="ts">
	import Addfolder from '$lib/assets/Addfolder.svg';
	import CreateFolderBigButton from '$lib/components/sidebar/CreateFolderBigBtn.svelte';
</script>

<div class="no-folders">
	<img src={Addfolder} alt="an illustration representing a folder with some notes in it" />
	<div>
		<span class="no-folders-text">No folders found</span>
		<span class="no-folders-subtext">Folders let you organize your notes</span>
	</div>
	<div class="create-btn">
		<CreateFolderBigButton />
	</div>
</div>

<style>
	@media (max-width: 549px) {
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

	@media (min-width: 550px) and (max-width: 649px) {
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

	@media (min-width: 650px) and (max-width: 1023px) {
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

	@media (min-width: 1024px) and (max-width: 1429px) {
		.no-folders-text {
			font-size: 1.55rem;
		}
		.no-folders-subtext {
			font-size: 1.05rem;
			position: relative;
			bottom: 0.8rem;
		}
		.create-btn {
			margin-right: 5rem;
		}
		img {
			height: 14rem;
			width: 17rem;
		}
	}

	@media (min-width: 1430px) and (max-width: 1739px) {
		img {
			height: 17rem;
			width: 19rem;
		}

		.no-folders-text {
			font-size: 2.1rem;
		}
		.no-folders-subtext {
			font-size: 1.3rem;
			position: relative;
			bottom: 0.8rem;
		}
		.create-btn {
			margin-right: 9rem;
		}
	}

	@media (min-width: 1740px) {
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
		margin: 1em 0;
	}

	.no-folders-subtext {
		color: var(--grey-1);
	}
</style>
