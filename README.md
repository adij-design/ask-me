# ask-me

Starter for the Tech 1 Lecture 9 class activity: a page with one text box that asks Sarvam a question through your own server on Vercel.

## What's inside

| File | What it does |
| --- | --- |
| `index.html` | The page. The form goes inside `<main>`. |
| `style.css` | How it looks, same as web-starter |
| `scripts.js` | Sends the question to `/api/ask` and displays the answer |
| `api/ask.js` | Calls Sarvam on the server, keeping your API key out of the browser |
| `.gitignore` | Keeps `.env` out of GitHub. Already done for you. |
| `test-sarvam.mjs` | Checks your key works: `node --env-file=.env test-sarvam.mjs` |
| `.env.example` | The names of the keys this project needs, with fake values |

## How to use it

1. Press **Use this template** to get your own copy, and clone it with GitHub Desktop.
2. In your editor, copy `.env.example`, name the copy `.env`, and paste your Sarvam key into it. Do this yourself, not through your agent.
3. Optional: check your key with `node --env-file=.env test-sarvam.mjs`. You should see `200` and a hello.
4. Check GitHub Desktop: `.env` should not appear in the list of changes.
5. Deploy the project to Vercel. In the Vercel project settings, add `SARVAM_API_KEY` as an environment variable, then redeploy.

This won't work on GitHub Pages. It needs Vercel to run the code in `api/`. For local development, use `vercel dev` with the key in `.env`.
