# ClarityAI

**A full-stack AI app that helps families build structured recovery and relapse-prevention plans for a loved one struggling with addiction.**

Most families facing addiction figure it out the hard way (or not at all)— through crisis, trial and error, and years of expensive therapy. ClarityAI takes approaches that have actually worked for other families and turns them into a clear, personalized plan: how to stage an intervention, how to stop enabling, how to support long-term sobriety, and what to do when things get hard. 
This interface means a lot to me: my family dealt with addiction, and we had to learn how to overcome it the hard way. There is a better way. This is a small step towards one day building something that truly can make a difference in the lives of struggling addicts worldwide. 

> Not everyone can afford therapy. Everyone can follow a good plan.


---

## What it does

- Generates **structured, personalized recovery plans** from a family's situation
- Focuses on **relapse prevention**, intervention planning, and breaking enabling patterns
- Delivers guidance in plain language, step by step
- Runs on the **Anthropic Claude API**, with an optional **fully local AI mode** for privacy

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

The **local mode** routes requests to an Ollama model running on a dedicated Ubuntu GPU box instead of the cloud — so sensitive family information never has to leave the machine.

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
- [ ] Save and revisit plans ("second brain" for a family's recovery journey)
- [ ] Polish the local Ollama mode toggle in the UI

## Why I built it

This one's personal. My family went through addiction and came out the other side — but we did it the slow, painful way. ClarityAI is the tool I wish we'd had.

## License

MIT

