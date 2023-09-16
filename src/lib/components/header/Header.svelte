<!--This component has the title and the imported social icons.-->
<script lang="ts">
	import Social from '$lib/components/header/Social.svelte';
</script>

<header>MdCraft <Social /></header>

<style>
	@media screen and (min-width: 1740px) {
		header {
			font-size: 3.2rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		header {
			font-size: 2.6rem;
		}
	}
	@media screen and (min-width: 1151px) and (max-width: 1429px) {
		header {
			font-size: 2.2rem;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1150px) {
		header {
			font-size: 1.8rem;
		}
	}
	@media screen and (min-width: 1024px) {
		header {
			height: 100%;
			grid-row-start: span 2;
			grid-column-start: span 7;
			padding: 1rem 2rem 0;
			align-items: center;
		}
	}
	@media screen and (min-width: 650px) and (max-width: 1023px) {
		header {
			width: 68%;
			height: 10%;
			margin: 0 auto 0;
			padding: 2.1rem 1.6rem 0;
			font-size: 2.8rem;
			align-items: baseline;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 649px) {
		header {
			width: 80%;
			margin: 0 auto 0;
			height: 10%;
			font-size: 2.8rem;
			padding: 1rem 1.6rem 0;
			align-items: baseline;
		}
	}
	@media screen and (min-width: 400px) and (max-width: 549px) {
		header {
			width: 100%;
			height: 10%;
			font-size: 2.05rem;
			padding: 2.2rem 1.6rem 0;
			align-items: baseline;
		}
	}
	@media screen and (max-width: 399px) {
		header {
			width: 100%;
			height: 9%;
			font-size: 2.05rem;
			padding: 1rem 1.6rem 0;
			align-items: baseline;
		}
	}
	header {
		display: flex;
		color: var(--orange);
		box-sizing: border-box;
		cursor: default;
		justify-content: space-between;
	}
</style>
