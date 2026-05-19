import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		csp: {
			directives: {
				'img-src': ['self', 'https://avatars.githubusercontent.com']
			}
		}
	}
};

export default config;
