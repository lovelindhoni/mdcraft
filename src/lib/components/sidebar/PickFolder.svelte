<!--This component exists to show that if there is no folder is selected then, a illustration is shown to pick a folder from the sidebar-->
<script lang="ts">
	import PickFolder from '$lib/assets/PickFolder.svg';
</script>

<div class="pick-Folder">
	<div>
		<span class="choose-folder">Pick a folder from your left</span>
		<span class="choose-folder-subtext">To see your notes</span>
	</div>
	<img src={PickFolder} alt="A girl picking a folder from the Foldershelves" />
</div>

<style>
	.choose-folder-subtext {
		color: var(--grey-1);
	}

	.choose-folder,
	.choose-folder-subtext {
		display: block;
		margin: 1em 0;
	}

	.pick-Folder {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	img {
		filter: contrast(75%);
	}

	@media (min-width: 1024px) and (max-width: 1429px) {
		.choose-folder {
			font-size: 1.9rem;
		}
		.choose-folder-subtext {
			font-size: 1.4rem;
		}
		img {
			height: 18rem;
			width: 18rem;
		}
	}

	@media (min-width: 1430px) and (max-width: 1739px) {
		.choose-folder {
			font-size: 2.25rem;
		}
		.choose-folder-subtext {
			font-size: 1.7rem;
		}
		img {
			height: 22rem;
			width: 22rem;
		}
	}

	@media (min-width: 1740px) {
		.choose-folder {
			font-size: 3rem;
		}
		.choose-folder-subtext {
			font-size: 2.2rem;
		}
		img {
			height: 28rem;
			width: 28rem;
		}
	}
</style>
