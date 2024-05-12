const focusInput = (node: HTMLInputElement) => {
	node.focus(); // Focuses the textarea if it is present on DOM using the svelte action
	return {
		destroy() {
			// when it is removed out of dom then focus is blurred
			node.blur();
		}
	};
};

export { focusInput };
