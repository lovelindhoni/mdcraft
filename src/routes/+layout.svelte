<script lang="ts">
	// for consistent css
	import 'normalize.css';
</script>

<slot />

<style>
	/**Just declared some global colors*/
	:root {
		--orange: hsl(12, 94%, 62%);
		--background: hsl(0, 0%, 13%);
		--text: hsl(0, 0%, 85%);
		--green: hsl(102, 52%, 48%);
		--blue: hsl(192, 55%, 52%);
		--red: hsl(12, 80%, 52%);
		--grey-1: hsl(0, 0%, 75%);
		--grey-2: hsl(0, 0%, 40%);
	}
</style>
