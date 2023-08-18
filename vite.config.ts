import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		target: 'esnext',
		rollupOptions: {
			output: {
				// added config for manual chunks for reducing build size
				manualChunks: (id) => {
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				}
			}
		}
	}
});
