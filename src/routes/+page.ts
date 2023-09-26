// For vercel analytics...
import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
 
inject({ mode: dev ? 'development' : 'production' });

// I had to because then only indexdeb works good. Biggest decision I have made in this project.
export const ssr = false;
