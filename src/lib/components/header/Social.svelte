<!--This is the component that has the social icons.-->
<script lang="ts">
	import Github from '$lib/assets/svg/github.svg';
	import Mail from '$lib/assets/svg/mail.svg';
</script>

<div class="social-container">
	<div class="icon-parent">
		<a href="https://github.com/lovelindhoni/mdcraft" target="_blank">
			<img src={Github} alt="Github" />
		</a>
	</div>
	<div class="icon-parent">
		<a href="https://mailto:jblovelindhoni@gmail.com" target="_blank">
			<img src={Mail} alt="Mail" />
		</a>
	</div>
</div>

<style>
	.social-container {
		display: flex;
	}
	img {
		cursor: pointer;
	}
	.icon-parent {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}
	.icon-parent:hover {
		border-bottom: 2px solid var(--orange);
	}
	@media (max-width: 549px) {
		img {
			height: 1.25rem;
			width: 1.25rem;
		}
		.social-container {
			gap: 1.2rem;
		}
	}
	@media (max-width: 1023px) {
		img {
			height: 1.65rem;
			width: 1.65rem;
		}
		.social-container {
			gap: 1.4rem;
		}
	}
	@media (max-width: 1429px) {
		img {
			height: 1.35rem;
			width: 1.35rem;
		}
		.social-container {
			gap: 1.3rem;
		}
		.icon-parent {
			height: 2.3rem;
		}
	}
	@media (max-width: 1739px) {
		img {
			height: 1.6rem;
			width: 1.6rem;
		}
		.social-container {
			gap: 1.45rem;
		}
		.icon-parent {
			height: 2.7rem;
		}
	}
	@media (min-width: 1740px) {
		img {
			height: 1.9rem;
			width: 1.9rem;
		}
		.social-container {
			gap: 1.8rem;
		}
		.icon-parent {
			height: 3.05rem;
		}
	}
</style>
