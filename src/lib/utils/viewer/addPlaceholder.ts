const addPlaceholder = (edit: boolean) => {
	// This function adds the placeholder text in the code-editor and focuses it
	if (edit) {
		// when it is edit mode, the pre element with code-editor class is captured
		const preElement = document.querySelector('pre.code-editor') as HTMLPreElement;
		if (preElement) {
			// data-placeholder attribute with a value is being set
			preElement.setAttribute('data-placeholder', 'Start MdCrafting...');
			// preElement is focussed
			preElement.focus();
		}
	}
};

export { addPlaceholder };
