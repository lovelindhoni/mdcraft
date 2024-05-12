const onResize = () => {
	// this function runs at resize of the window
	if (window.innerHeight / window.screen.availHeight > 0.6) {
		// thanks to https://stackoverflow.com/a/72853206 for the excellent condition above to check whether virtual keyboard is opened or not. Because the keyboard opening creates a resizing event, the dimensions are calculated again after the keypad takes some place at viewport, leading to inconsistencies. The above condition is true when keyboard is not opened
		const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		const layoutDiv = document.querySelector('.layout') as HTMLDivElement;
		if (layoutDiv) {
			layoutDiv.style.width = w + 'px';
			layoutDiv.style.height = h + 'px';
		}
		// the above lines literally calculates the viewport size in pixels to ensure consistent size even when keyboard is opened
	}
};

export { onResize };
