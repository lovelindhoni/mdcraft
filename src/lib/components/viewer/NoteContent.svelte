<div class="viewer">
	<slot />
</div>

<style>
	.viewer {
		height: 87%;
		width: 100%;
		box-sizing: border-box;
		overflow-y: auto;
		padding: 1rem 2.5rem;
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
	@media screen and (max-width: 1429px) {
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
	:global(.viewer p),
	:global(.viewer ol),
	:global(.viewer ul),
	:global(.viewer mark),
	:global(.viewer a),
	:global(.viewer del),
	:global(.viewer em),
	:global(.viewer strong) {
		line-height: 1.15;
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
		border: 0.12rem solid black;
	}
	:global(.viewer a) {
		color: var(--vibrant-purple);
	}
	:global(.viewer blockquote) {
		background-color: hsl(0, 0%, 94%);
		border-left: 10px solid hsl(0, 0%, 80%);
		padding: 0.02rem 1rem;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		color: var(--blue-grey);
	}
	:global(.viewer img) {
		height: auto;
		width: auto;
		max-width: 100%;
		max-height: 21em;
	}
	:global(code) {
		padding: 0.14rem;
		background-color: lightgray;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		border-radius: 0.5rem;
	}
	:global(pre code) {
		margin-right: 0.5rem;
		border-radius: 0.5rem;
	}
</style>
