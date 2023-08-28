<script lang="ts">
	import Back from '$lib/assets/back.svg';
</script>

<div class="go-back" on:click on:keydown>
	<img src={Back} alt="a svg describing a backwards" />
	<span>Back</span>
</div>

<style>
	@media screen and (min-width: 550px) and (max-width: 1023px) {
		.go-back {
			font-size: 1.5rem;
		}
		img {
			height: 1.5rem;
			width: 1.5rem;
		}
	}
	@media screen and (max-width: 549px) {
		.go-back {
			font-size: 1.1rem;
		}
		img {
			height: 1.1rem;
			width: 1.1rem;
		}
	}
	.go-back {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-bottom: 2px solid var(--vibrant-purple);
		width: max-content;
		color: var(--purple);
	}
	img {
		filter: invert(18%) sepia(97%) saturate(3704%) hue-rotate(272deg) brightness(74%) contrast(122%);
	}
</style>
