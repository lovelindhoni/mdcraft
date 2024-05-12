<!--This component has the title and the imported social icons.-->
<script lang="ts">
	import Social from '$lib/components/header/Social.svelte';
</script>

<header><a href="https://mdcraft.vercel.app" target="_blank">MdCraft</a> <Social /></header>

<style>
	@media (min-width: 1740px) {
		header a {
			font-size: 3.2rem;
		}
	}
	@media (max-width: 1739px) {
		header a {
			font-size: 2.6rem;
		}
	}
	@media (max-width: 1429px) {
		header a {
			font-size: 2.2rem;
		}
	}
	@media (max-width: 1150px) {
		header a {
			font-size: 1.8rem;
		}
	}
	@media (min-width: 1024px) {
		header {
			height: 100%;
			grid-row-start: span 2;
			grid-column-start: span 6;
			padding: 1rem 2rem 0;
			align-items: center;
		}
	}
	@media (max-width: 1023px) {
		header {
			width: 68%;
			height: 10%;
			margin: 0 auto 0;
			padding: 2.1rem 1.6rem 0;
			align-items: baseline;
		}
		header a {
			font-size: 2.8rem;
		}
	}
	@media (max-width: 649px) {
		header {
			width: 80%;
			margin: 0 auto 0;
			height: 10%;
			padding: 1rem 1.6rem 0;
			align-items: baseline;
		}
		header a {
			font-size: 2.8rem;
		}
	}
	@media (max-width: 549px) {
		header {
			width: 100%;
			height: 10%;
			padding: 2.2rem 1.6rem 0;
			align-items: baseline;
		}
		header a {
			font-size: 2.05rem;
		}
	}
	@media (max-width: 399px) {
		header {
			width: 100%;
			height: 9%;
			padding: 1rem 1.6rem 0;
			align-items: baseline;
		}
		header a {
			font-size: 2.05rem;
		}
	}
	header {
		display: flex;
		box-sizing: border-box;
		cursor: default;
		justify-content: space-between;
	}
	header a {
		color: var(--orange);
		text-decoration: none;
	}
</style>
