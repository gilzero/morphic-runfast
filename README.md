# Morphic

An AI-powered search engine with a generative UI.

> [!CAUTION]
> Morphic is built with Vercel AI SDK RSC. AI SDK RSC is [experimental](https://sdk.vercel.ai/docs/getting-started/navigating-the-library#when-to-use-ai-sdk-rsc) and has some limitations. When using it in production, it is recommended to [migrate](https://sdk.vercel.ai/docs/ai-sdk-rsc/migrating-to-ui) to SDK UI.

![capture](/public/capture-240404_blk.png)

> [!NOTE]
> Please note that there are differences between this repository and the official website [morphic.sh](https://morphic.sh). The official website is a fork of this repository with additional features such as authentication, which are necessary for providing the service online. The core source code of Morphic resides in this repository, and it's designed to be easily built and deployed.

## 🗂️ Overview

- 🛠 [Features](#-features)
- 🧱 [Stack](#-stack)
- 🚀 [Quickstart](#-quickstart)
- 🌐 [Deploy](#-deploy)
- 🔎 [Search Engine](#-search-engine)
- ✅ [Verified models](#-verified-models)

## 🛠 Features

- Search and answer using GenerativeUI
- Understand user's questions
- Search history functionality
- Share search results ([Optional](https://github.com/miurla/morphic/blob/main/.env.local.example))
- Video search support ([Optional](https://github.com/miurla/morphic/blob/main/.env.local.example))
- Get answers from specified URLs
- Use as a search engine [※](#-search-engine)
- Support for providers other than OpenAI
  - Google Generative AI Provider
  - Anthropic Provider
  - Groq Provider
- Local Redis support
- Configurable search depth (basic or advanced)

## 🧱 Stack

- App framework: [Next.js](https://nextjs.org/)
- Text streaming / Generative UI: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- Generative Model: [OpenAI](https://openai.com/)
- Search API: [Tavily AI](https://tavily.com/) / [Serper](https://serper.dev) / [SearXNG](https://docs.searxng.org/)
- Extract API: [Tavily AI](https://tavily.com/) / [Jina AI](https://jina.ai/)
- Database (Serverless/Local): [Upstash](https://upstash.com/) / [Redis](https://redis.io/)
- Component library: [shadcn/ui](https://ui.shadcn.com/)
- Headless component primitives: [Radix UI](https://www.radix-ui.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Quickstart

### 1. Fork and Clone repo

Fork the repo to your Github account, then run the following command to clone the repo:

```
git clone git@github.com:[YOUR_GITHUB_ACCOUNT]/morphic.git
```

### 2. Install dependencies

```
cd morphic
bun install
```

### 3. Setting up Upstash Redis

Follow the guide below to set up Upstash Redis. Create a database and obtain `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Refer to the [Upstash guide](https://upstash.com/blog/rag-chatbot-upstash#setting-up-upstash-redis) for instructions on how to proceed.

If you intend to use a local Redis, you can skip this step.

### 4. Fill out secrets

```
cp .env.local.example .env.local
```

Your .env.local file should look like this:

```
# OpenAI API key retrieved here: https://platform.openai.com/api-keys
OPENAI_API_KEY=

# Tavily API Key retrieved here: https://app.tavily.com/home
TAVILY_API_KEY=

# Upstash Redis URL and Token retrieved here: https://console.upstash.com/redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

## Redis Configuration

This application supports both Upstash Redis and local Redis. To use local Redis:

1. Set `USE_LOCAL_REDIS=true` in your `.env.local` file.
2. Optionally, set `LOCAL_REDIS_URL` if your local Redis is not running on the default `localhost:6379` or `redis://redis:6379` if you're using docker compose.

To use Upstash Redis:

1. Set `USE_LOCAL_REDIS=false` or leave it unset in your `.env.local` file.
2. Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` with your Upstash credentials.


```

### 5. Run app locally

#### Using Bun

To run the application locally using Bun, execute the following command:

`bun dev`

You can now visit <http://localhost:3000> in your web browser.

#### Using Docker

To run the application using Docker, use the following command:

`docker compose up -d`

This will start the application in detached mode. You can access it at <http://localhost:3000>.

## 🌐 Deploy

Host your own live version of Morphic with Vercel or Cloudflare Pages.

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmiurla%2Fmorphic&env=OPENAI_API_KEY,TAVILY_API_KEY,UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN)

## 🔎 Search Engine

### Setting up the Search Engine in Your Browser

If you want to use Morphic as a search engine in your browser, follow these steps:

1. Open your browser settings.
2. Navigate to the search engine settings section.
3. Select "Manage search engines and site search".
4. Under "Site search", click on "Add".
5. Fill in the fields as follows:
   - **Search engine**: Morphic
   - **Shortcut**: morphic
   - **URL with %s in place of query**: `https://morphic.sh/search?q=%s`
6. Click "Add" to save the new search engine.
7. Find "Morphic" in the list of site search, click on the three dots next to it, and select "Make default".

This will allow you to use Morphic as your default search engine in the browser.


## ✅ Verified models

### List of models applicable to all

- OpenAI
  - gpt-4o
  - gpt-4o-mini
  - gpt-4-turbo
  - gpt-3.5-turbo
- Google
  - Gemini 1.5 Pro (Unstable)
  - Gemini 2.0 Flash (Experimental)
- Anthropic
  - Claude 3.5 Sonnet
- Groq
  - llama3-groq-8b-8192-tool-use-preview
  - llama3-groq-70b-8192-tool-use-preview

## Roadmaps

- [ ] Add more models
- [ ] Add more providers
- [ ] Add more features
- [ ] Add more UI
- [ ] Add more tests
- [ ] Add more documentation

## Checkpoints

- [ ] 2025-02-06: Add more models. sonar and reasoning pro.

