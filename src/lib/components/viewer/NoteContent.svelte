<script>
	import 'highlight.js/styles/base16/dracula.css'; // dracula theme for now
</script>

<div class="viewer">
	<slot />
</div>

<style>
	.viewer {
		width: 100%;
		box-sizing: border-box;
		overflow-y: auto;

		overflow-wrap: break-word;
	}
	/*Styles for the generated Html*/
	@media screen and (min-width: 1740px) {
		:global(.viewer h1) {
			font-size: 3rem;
		}
		:global(.viewer h2) {
			font-size: 2.4rem;
		}
		:global(.viewer h3) {
			font-size: 2rem;
		}
		:global(.viewer h4) {
			font-size: 1.6rem;
		}
		:global(.viewer h5) {
			font-size: 1.2rem;
		}
		:global(.viewer h6) {
			font-size: 1.1rem;
		}
		:global(.viewer p),
		:global(.viewer ol),
		:global(.viewer ul),
		:global(.viewer mark),
		:global(.viewer a),
		:global(.viewer del),
		:global(.viewer em),
		:global(.viewer strong) {
			font-size: 1.7rem;
		}
		:global(.viewer code) {
			font-size: 1.55rem;
		}
		:global(.viewer table) {
			font-size: 1.53rem;
		}
		:global(pre span) {
			font-size: 1.5rem;
		}
	}
	@media screen and (min-width: 1430px) and (max-width: 1739px) {
		:global(.viewer h1) {
			font-size: 2.4rem;
		}
		:global(.viewer h2) {
			font-size: 2.1rem;
		}
		:global(.viewer h3) {
			font-size: 1.7rem;
		}
		:global(.viewer h4) {
			font-size: 1.4rem;
		}
		:global(.viewer h5) {
			font-size: 1rem;
		}
		:global(.viewer h6) {
			font-size: 0.92rem;
		}
		:global(.viewer p),
		:global(.viewer ol),
		:global(.viewer ul),
		:global(.viewer mark),
		:global(.viewer a),
		:global(.viewer del),
		:global(.viewer em),
		:global(.viewer strong) {
			font-size: 1.35rem;
		}
		:global(.viewer code) {
			font-size: 1.25rem;
		}
		:global(.viewer table) {
			font-size: 1.25rem;
		}
		:global(pre span) {
			font-size: 1.26rem;
		}
	}
	@media screen and (min-width: 1024px) and (max-width: 1429px) {
		:global(.viewer h1) {
			font-size: 2.2rem;
		}
		:global(.viewer h2) {
			font-size: 1.7rem;
		}
		:global(.viewer h3) {
			font-size: 1.4rem;
		}
		:global(.viewer h4) {
			font-size: 1.15rem;
		}
		:global(.viewer h5) {
			font-size: 0.92rem;
		}
		:global(.viewer h6) {
			font-size: 0.74rem;
		}
		:global(.viewer p),
		:global(.viewer ol),
		:global(.viewer ul),
		:global(.viewer mark),
		:global(.viewer a),
		:global(.viewer del),
		:global(.viewer em),
		:global(.viewer strong) {
			font-size: 1.2rem;
		}
		:global(.viewer code) {
			font-size: 1.05rem;
		}
		:global(.viewer table) {
			font-size: 1.15rem;
		}
		:global(pre span) {
			font-size: 1.05rem;
		}
	}
	@media screen and (min-width: 1024px) {
		.viewer {
			height: 87%;
			padding: 1rem 2.5rem;
		}
	}
	@media screen and (min-width: 650px) and (max-width: 1023px) {
		.viewer {
			padding-top: 1rem;
			padding-bottom: 2rem;
			padding-left: 20vw;
			padding-right: 20vw;
			height: 86%;
		}
		:global(.viewer h1) {
			font-size: 2.2rem;
		}
		:global(.viewer h2) {
			font-size: 1.7rem;
		}
		:global(.viewer h3) {
			font-size: 1.4rem;
		}
		:global(.viewer h4) {
			font-size: 1.15rem;
		}
		:global(.viewer h5) {
			font-size: 0.92rem;
		}
		:global(.viewer h6) {
			font-size: 0.74rem;
		}
		:global(.viewer p),
		:global(.viewer ol),
		:global(.viewer ul),
		:global(.viewer mark),
		:global(.viewer a),
		:global(.viewer del),
		:global(.viewer em),
		:global(.viewer strong) {
			font-size: 1.3rem;
		}
		:global(.viewer code) {
			font-size: 1.2rem;
		}
		:global(.viewer table) {
			font-size: 1.25rem;
		}
		:global(pre span) {
			font-size: 1.2rem;
		}
	}
	@media screen and (min-width: 550px) and (max-width: 649px) {
		.viewer {
			padding-top: 1rem;
			padding-bottom: 2rem;
			padding-left: 15vw;
			padding-right: 15vw;
			height: 86%;
		}
		:global(.viewer h1) {
			font-size: 2.2rem;
		}
		:global(.viewer h2) {
			font-size: 1.7rem;
		}
		:global(.viewer h3) {
			font-size: 1.4rem;
		}
		:global(.viewer h4) {
			font-size: 1.15rem;
		}
		:global(.viewer h5) {
			font-size: 0.92rem;
		}
		:global(.viewer h6) {
			font-size: 0.74rem;
		}
		:global(.viewer p),
		:global(.viewer ol),
		:global(.viewer ul),
		:global(.viewer mark),
		:global(.viewer a),
		:global(.viewer del),
		:global(.viewer em),
		:global(.viewer strong) {
			font-size: 1.25rem;
		}
		:global(.viewer code) {
			font-size: 1.13rem;
		}
		:global(.viewer table) {
			font-size: 1.2rem;
		}
		:global(pre span) {
			font-size: 1.13rem;
		}
	}
	@media screen and (max-width: 549px) {
		.viewer {
			padding-top: 1rem;
			padding-bottom: 2rem;
			padding-left: 8vw;
			padding-right: 8vw;
			height: 81%;
		}
		:global(.viewer h1) {
			font-size: 2rem;
		}
		:global(.viewer h2) {
			font-size: 1.5rem;
		}
		:global(.viewer h3) {
			font-size: 1.2rem;
		}
		:global(.viewer h4) {
			font-size: 1.12rem;
		}
		:global(.viewer h5) {
			font-size: 0.83rem;
		}
		:global(.viewer h6) {
			font-size: 0.75rem;
		}
		:global(.viewer p),
		:global(.viewer ol),
		:global(.viewer ul),
		:global(.viewer mark),
		:global(.viewer a),
		:global(.viewer del),
		:global(.viewer em),
		:global(.viewer strong) {
			font-size: 1.1rem;
		}
		:global(.viewer code) {
			font-size: 1rem;
		}
		:global(.viewer table) {
			font-size: 1.05rem;
		}
		:global(pre span) {
			font-size: 1rem;
		}
	}
	:global(.viewer p),
	:global(.viewer ol),
	:global(.viewer ul),
	:global(.viewer mark),
	:global(.viewer a),
	:global(.viewer del),
	:global(.viewer em),
	:global(.viewer strong) {
		line-height: 1.5;
	}
	:global(.viewer mark) {
		padding: 0.11rem;
		border-radius: 0.4rem;
	}
	:global(.viewer table) {
		border-collapse: collapse;
		width: 100%;
		overflow-wrap: break-word;
	}
	:global(.viewer table th),
	:global(.viewer table td) {
		padding: 0.7rem;
		text-align: left;
		border: 0.12rem solid var(--grey-1);
		line-height: 1.5;
	}
	:global(.viewer hr){
         color:var(--grey-2)
	}
	:global(.viewer a) {
		color: var(--orange);
	}
	:global(.viewer blockquote) {
		border-left: 6px solid hsl(0, 0%, 80%);
		padding: 0.02rem 1rem;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		font-family: Georgia, 'Times New Roman', Times, serif;
		font-style: italic;
		color: hsl(0, 0%, 80%);
	}
	:global(.viewer img) {
		height: auto;
		width: auto;
		max-width: 100%;
		max-height: 21em;
		filter: brightness(0.8) contrast(1.2);
	}
	:global(code) {
		padding: 0.14rem;
		background-color: hsl(0, 0%, 32%);
		color: white;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.5rem;
	}
	:global(pre code) {
		margin-right: 0.5rem;
		border-radius: 0.5rem;
	}
</style>
