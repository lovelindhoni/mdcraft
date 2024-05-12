# MdCraft: In-Browser Markdown Playground

MdCraft is an open-source web app that serves as an in-browser Markdown editor and previewer. It allows users to create, organize, and edit Markdown notes with a live HTML preview and code highlighting. It's a convenient tool for taking notes during programming tutorials and more.

## Tech Stack

Mdcraft is not possible without these awesome open source projects.

- [SvelteKit](https://kit.svelte.dev) - Modern framework for building fast and
  efficient web apps with simplicity
- [Typescript](https://www.typescriptlang.org/) - 😅
- [Marked](https://marked.js.org/) - A markdown parser and compiler. Built for speed.
- [HighlightJS](https://highlightjs.org/) - Syntax highlighter with language auto-detection and zero dependencies.
- [Sanitize-Html](https://github.com/apostrophecms/sanitize-html) - Provides a simple HTML sanitizer with a clear API.
- [Svelte-Codejar](https://github.com/novacbn/svelte-codejar) - Svelte Binding for the embeddable code editor [Codjar](https://medv.io/codejar/)
- [Emoji-Js](https://github.com/iamcal/js-emoji) - A JS Emoji conversion library

## Features

- **Completely Client Side!**: Your notes - Your browser - Offline - Dot.

- **Folder-Based Organization**: Users can create, rename, and delete folders to organize their notes efficiently.

- **Markdown Notes**: Create individual notes inside folders, with the ability to rename and delete them.

- **Live HTML Preview**: Edit the Markdown content of a note in a syntax-highlighted environment and instantly see a live HTML preview with highlighted code blocks.

- **Markdown Download**: Notes can be downloaded in `.md` format, making it easy to save and share your work.

- **Data Persistence**: All data is stored in IndexedDB, ensuring no data loss even if you refresh the page.

- **PWA Support**: MdCraft is presented as a Progressive Web App (PWA) with full offline capabilities, making it accessible wherever you are.

## Usage

MdCraft was primarily created for:

- Taking quick notes while watching programming tutorials online.
- Creating and organizing Markdown-based documentation.
- Collaborative Markdown editing and previewing.

In addition to these use cases, MdCraft comes pre-loaded with some useful reference notes on:

- TypeScript language fundamentals.
- SQL database concepts.

Feel free to explore and delete these pre-created notes or create your own!

## Acknowledgments

Special thanks to [Navin Kodag](https://github.com/100lvlmaster) for sharing the service-worker script. You can find a post about it on [dev.to](https://dev.to/100lvlmaster/create-a-pwa-with-sveltekit-svelte-a36).

## Roadmap

Here are some features and improvements planned for MdCraft in the so-far future:

- **GitHub Gist Integration**: Streamline the process of sharing your notes by enabling users to publish their notes as GitHub Gists directly from MdCraft.

## Project Setup

Clone the repository:

```sh
git clone https://github.com/lovelindhoni/mdcraft.git
```

Install dependencies:

```sh
pnpm install
```

Run the development server:

```sh
pnpm run dev
```

Open a web browser and navigate to `http://localhost:5173`\
\
For production build:

```sh
pnpm run build
```

For running in production mode:

```sh
pnpm run preview
```

Open a web browser and navigate to `http://localhost:4173`

## MIT License
