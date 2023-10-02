<!--this is a download button that would create a blob url that facilitates s the user to download the markdown as a .md file.-->
<script lang="ts">
	import DownloadButton from '$lib/assets/download.svg';
	export let title: string;
	export let content: string;
	function downloadMarkdown() {
		// Create a Blob containing the Markdown content
		const blob = new Blob([content], {
			type: 'text/markdown'
		});
		// Create a temporary URL for the Blob
		const url = window.URL.createObjectURL(blob);
		const downloadLink = document.createElement('a');
		downloadLink.href = url;
		// below condition is to prevent double extensions while downloading i.e README.md.md
		downloadLink.download = title.slice(-3) == '.md' ? title : title + '.md';
		// Trigger a click event on the link to start the download
		downloadLink.click();
		// Clean up by revoking the Blob URL
		window.URL.revokeObjectURL(url);
	}
</script>

<button class="download-button" on:click={downloadMarkdown}
	><img src={DownloadButton} alt="download button" /></button
>

<style>
	@media (max-width: 549px) {
		.download-button {
			height: 1.55rem;
			width: 1.55rem;
		}
		.download-button img {
			height: 100%;
			width: 100%;
		}
	}
	@media (min-width: 550px) and (max-width: 1023px) {
		.download-button {
			height: 2rem;
			width: 2rem;
		}
		.download-button img {
			height: 100%;
			width: 100%;
		}
	}
	@media (min-width: 1024px) and (max-width: 1429px) {
		.download-button {
			height: 2.2rem;
		}
		.download-button img {
			height: 1.57rem;
			width: 1.57rem;
		}
	}
	@media (min-width: 1430px) and (max-width: 1739px) {
		.download-button {
			height: 2.3rem;
		}
		.download-button img {
			height: 1.7rem;
			width: 1.7rem;
		}
	}
	@media (min-width: 1740px) {
		.download-button {
			height: 2.8rem;
		}
		.download-button img {
			height: 2.2rem;
			width: 2.2rem;
		}
	}
	.download-button:hover {
		border-bottom: 2px solid var(--orange);
	}
	.download-button {
		border: none;
		padding: 0;
		background: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
</style>
