# ⚡ Gmail Gemini Assistant

> Write, reply, and refine your emails instantly using Gemini 2.5 Flash directly inside Gmail.

**Gmail Gemini Assistant** is a lightweight Chrome extension that seamlessly integrates Google's **Gemini 2.5 Flash** into the Gmail interface. Whether you're starting a new email or replying to an existing thread, get AI-crafted responses in one click without leaving your inbox.

---

## ✨ Features

- 🎯 **Inline Native Integration:** Adds a clean **✨ IA** button right next to Gmail's native *Send* toolbar.
- 💬 **Context-Aware Replies:** Automatically reads the last received message in the thread to generate accurate, context-specific responses.
- ⚡ **Powered by Gemini 2.5 Flash:** Fast, smart, and precise text generation optimized for email drafting.
- 🔒 **Privacy-First:** Your Gemini API key stays locally on your machine and is never shared or tracked.

---

## 🚀 Quick Start & Installation

Since this is a custom extension, you can install it in Developer Mode in under 2 minutes.

### 1. Clone the repository
```bash
git clone [https://github.com/MartinRabier/GmailAIExtension.git]
cd nom-du-repo

### 2. Configure Your API Key

Get a free API key from **Google AI Studio**.

Create a `config.js` file at the root of the project by copying the example file:

```bash
cp config.example.js config.js
```

Open `config.js` and replace the placeholder with your API key:

```javascript
const CONFIG = {
  GEMINI_API_KEY: "YOUR_ACTUAL_GEMINI_API_KEY"
};
```

---

## 3. Load the Extension into Google Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (top-right corner).
3. Click **Load unpacked**.
4. Select the project folder.

---

## 🛠️ How It Works

1. Open **Gmail** and click **Compose** or **Reply**.
2. Click the **✨ IA** button next to the **Send** button.
3. Enter a short instruction, for example:

   > *"Politely decline the meeting request and offer next Tuesday instead."*

4. Click **Generate**.
5. The AI will automatically write the response directly into the Gmail editor.

---

## 🛡️ Security & Privacy

- The `config.js` file is excluded via `.gitignore` to prevent accidentally committing your API key.
- Never commit your private API keys to GitHub.
- Keep `config.example.js` as the public template for sharing the project.
