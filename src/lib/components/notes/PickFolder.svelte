<script lang="ts">
	import PickFolder from '$lib/assets/PickFolder.svg';
</script>

<!--if no Folder are selected then-->

<div class="pick-Folder">
	<div>
		<p class="choose-folder">Pick a folder from your left</p>
		<p class="choose-folder-subtext">To see your notes</p>
	</div>
	<img src={PickFolder} alt="A girl picking a folder from the Foldershelves" />
</div>

<style>
	.choose-folder-subtext {
		color: var(--blue-grey);
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
	@media screen and (min-width: 1024px) and (max-width: 1429px) {
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
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
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
	@media screen and (min-width: 1740px) {
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
