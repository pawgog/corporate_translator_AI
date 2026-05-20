# "Spicy-to-Nice" Translator AI

Turn emotional, frustrated or overly direct feedback into constructive, professional communication.

Example:

Input: "This deployment is a complete disaster and nobody tested anything."

Output: "There appear to be concerns regarding deployment quality and testing coverage. It may be valuable to review the release process to reduce future issues."

# Product decisions

The prompt intentionally raises questions around uncertainty, waiting time and usefulness of AI output.

## 1. Artificial loading phases instead of instant output

Instead of showing a generic spinner, the app uses staged loading states:

- Analyzing frustration...
- Filtering emotional intensity...
- Rewriting for business impact...

This improves perceived responsiveness even though the final answer is returned in a single request.

## 2. Preserve meaning, remove aggression

The prompt design focuses on:

✓ keeping the core complaint  
✓ removing insults and profanity  
✓ adapting tone to audience  
✓ producing something a manager/client could actually receive

## 3. Handling weak or unrelated input

I considered cases where users may paste:

- extremely short text
- random words
- content unrelated to workplace feedback

Solutions implemented:

### Input validation

The submit action is disabled for very short input.

Reason:

Low-context prompts usually produce weak AI output, so preventing requests early improves overall experience.

### Context validation inside prompt design

The system prompt instructs the model to detect unrelated input.

Example:

User input: "what is the weather for tomorrow in London"

Expected response: "I'm sorry, but I cannot provide weather information. You may want to check a reliable weather website or app for the latest updates."

This prevents confusing or misleading responses.

## 4. Audience-aware output

Users can choose:

- Manager
- Peer
- Client
- Direct report

and tone:

- Professional
- Friendly
- Direct

This changes both vocabulary and communication style.

## 5. Making AI output immediately useful

Generating text alone is rarely enough.

Implemented improvements:

### Diff comparison view

Using `react-diff-viewer`, users can instantly compare:

Original message -> Rewritten message

This highlights exactly what changed and increases trust in AI output.

### One-click copy

A copy button allows immediate reuse in:

- Slack
- Teams
- Email
- Jira
- Performance reviews

Reducing friction after generation was treated as part of the product experience.

# Execution decisions

Chosen stack:

Frontend:

- React
- TypeScript
- Custom hooks
- TailwindCSS

Backend:

- Express proxy
- OpenAI API
- Zod validation
- Environment-based configuration

Architecture:

React UI -> Custom Hook (`useTranslate`) -> Express API -> OpenAI

# Technical implementation highlights

Frontend

✓ Typed React hooks with TypeScript  
✓ Multi-stage loading UX states  
✓ Diff-based output comparison (`react-diff-viewer`)  
✓ One-click copy interaction  
✓ Input validation before API execution

Backend

✓ Express proxy protecting API keys  
✓ Environment-based configuration  
✓ Request validation  
✓ Error handling and safe API responses  
✓ Modular API separation

AI layer

✓ Prompt engineering for audience-aware tone adaptation  
✓ Detection of unrelated or low-context input  
✓ Controlled response behavior for edge cases

# Local setup

Clone:

```bash
git clone
cd backend
npm i
npm run dev
cd ..
cd frontend
npm i
npm run dev
```

```env
cd backend
OPENAI_API_KEY=your_personal_key
```
