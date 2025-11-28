# Random Tweet 🐦

A fun onepager React webapp that displays random Twitter images with a single click!

## Features

- 🎲 **Random Button** - Large centered button that fetches random Twitter images
- 🔄 **Repositioning** - Button moves to top-left after first click for easy repeat clicks  
- 🐦 **Twitter API Integration** - Uses Twitter API v2 to fetch real tweets with images
- 📱 **Demo Mode** - Works with placeholder images when API keys aren't configured
- ✨ **Fun Animations** - Smooth transitions and playful captions
- 🌓 **Dark/Light Mode** - Respects system color scheme preferences

## Screenshots

### Initial State
![Initial state with centered Random button](https://github.com/user-attachments/assets/ece8f8cb-8d3a-4f8e-a10a-f8b39c0d6384)

### After Clicking (Demo Mode)
![After clicking showing tweet info](https://github.com/user-attachments/assets/62f26060-ba31-488e-a3b1-d6b75ccf71ff)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Twitter API (Optional)

Copy the example environment file and add your Twitter API credentials:

```bash
cp .env.example .env
```

Edit `.env` with your credentials from [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard):

```env
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here
```

> **Note:** The app works in Demo Mode without API keys, showing placeholder images instead.

### 3. Run the application

Start both the backend server and frontend:

```bash
# Terminal 1 - Start the backend server
npm run server

# Terminal 2 - Start the frontend
npm run dev
```

Or run both together:

```bash
npm run dev:all
```

### 4. Open in browser

Visit [http://localhost:5173](http://localhost:5173)

## Scripts

- `npm run dev` - Start Vite development server (frontend only)
- `npm run server` - Start Express backend server
- `npm run dev:all` - Start both servers
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Tech Stack

- **Frontend:** React 19, Vite
- **Backend:** Express.js
- **Twitter API:** [twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2)
- **Styling:** CSS with animations

## License

MIT
