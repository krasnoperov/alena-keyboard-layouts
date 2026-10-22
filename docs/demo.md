# Interactive keyboard demo

The site is titled **Multilingual Mac Keyboard Layouts**. Its two ready-made choices are
**Direct input** and **Dead keys**; **Make it yours** supplies an interview
and design prompt for an LLM agent. All three actions copy prompts rather than
installing anything automatically.

English, Spanish, Catalan, Portuguese, French and Italian share English Es. Russian uses Russian Es. Those
macOS source names intentionally remain distinct from the package names.

## Run locally

```sh
python3 tools/build-demo.py
python3 -m http.server 8769 --directory dist/demo --bind 127.0.0.1
```

Open http://127.0.0.1:8769. The build stages the site and byte-identical copies of
the four source keylayout files. Browser code parses their modifier maps, outputs,
actions and terminators. The SVG supplies physical Apple US ANSI geometry only.
The demo does not install layouts or change macOS preferences.

Click screen modifiers or hold keyboard modifiers outside the native typing
field. The screen Globe switches between the two preview sources. Amber keys
start composition; the next letter previews the result. Native typing in the
text field reports the installed macOS layout, which may differ from the preview.

## Deploy

The supplied Wrangler configuration targets `keyboard.krasnoperov.me`:

```sh
npm ci
npx wrangler login
npm run deploy
```

A Cloudflare account authorized for that domain is required. Deploy only after
checking the preview and ensuring the prompt links match a published release.

## Typing animation

The README's short GIF focuses on a few useful gestures; `/typing-demo/` serves
the full MP4 with English, Spanish, French and Russian messages. Letter timing
is regular; a longer pause appears only for a newly unlocked shortcut milestone.
The US Shift row is shown before typing Cyrillic and while entering 100% in both
sources. The final card points to the agent design prompt.

`demo/typing-story.html` builds both timelines from the native XML. With the staged
site served on port 8769, optional authoring tools can regenerate the media:

```sh
# Optional authoring dependencies: Playwright + Chromium, Pillow, imageio-ffmpeg.
node tools/render-typing-demo.cjs --short
node tools/render-typing-demo.cjs
python3 tools/encode-typing-demo.py dist/typing-frames-short assets/typing-preview.gif
python3 tools/encode-typing-demo.py dist/typing-frames demo/media/typing-demo.mp4
```

The animation is an instructional rendering, not a recording of physical input
on macOS. It validates its displayed outputs against the XML as it builds frames.
