# ClarityAI

**A full-stack AI app that helps families build structured recovery and relapse-prevention plans for a loved one struggling with addiction.**

Most families facing addiction figure it out the hard way — or not at all. Crisis by crisis, through trial and error and years of expensive therapy, while the person they love keeps slipping. ClarityAI compresses that painful learning curve: it takes approaches that have actually worked for other families and turns them into a clear, personalized plan — how to stage an intervention, how to stop enabling, how to support long-term sobriety, and what to do when things get hard.

> Not everyone can afford therapy. Everyone can follow a good plan.

---

## Honest by design

ClarityAI's intake questions are direct — sometimes uncomfortably so. That's intentional. Vague answers produce vague plans, and vague plans don't survive contact with addiction. Real change starts with telling the truth about the situation, and the app is built to ask for it. No sugarcoating, no empty reassurance — just the questions a good counselor would make you answer.

## What it does

- Generates **structured, personalized recovery plans** from a family's real situation — not generic advice
- Asks **hard, honest intake questions**, because accurate plans require accurate answers
- Focuses on **relapse prevention**, intervention planning, and breaking enabling patterns
- Delivers guidance in plain language, step by step
- Runs on the **Anthropic Claude API**, with an optional **fully local AI mode** — sensitive family information never has to leave the machine

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite |
| Backend | Node.js, Express |
| AI | Anthropic Claude API + local models via **Ollama** |
| Infra | Self-hosted Ubuntu GPU server for local inference |

## Architecture

```
React (Vite) frontend  ->  Express API  ->  Claude API  (cloud mode)
                                        \
                                         ->  Ollama on local GPU server  (private/offline mode)
```

The **local mode** routes requests to an Ollama model running on a dedicated Ubuntu GPU box instead of the cloud — full privacy for families who need it.

## Running it locally

**Backend** (Express API, runs on port `3000`):
```bash
# from the backend folder
npm install
# add your key to a .env file:  ANTHROPIC_API_KEY=your_key_here
npm start
```

**Frontend** (React + Vite):
```bash
cd frontend
npm install
npm run dev
```

Then open the Vite URL (default `http://localhost:5173`).

> Note: the backend currently runs locally / self-hosted and is not deployed publicly.

## Roadmap

- [ ] Deploy a public demo (cloud mode) so it's clickable
- [ ] Save and revisit plans — a "second brain" for a family's recovery journey
- [ ] Polish the local Ollama mode toggle in the UI

## Why I built it

This one's personal. My family dealt with addiction, and we had to learn how to overcome it the hard way — without proper education we wasted years of our lives. There is a better way. ClarityAI is the tool I wish we'd had, and a first step toward building something that can genuinely change outcomes for struggling addicts and the people who love them.

## License

MIT
