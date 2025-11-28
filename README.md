# Random Tweet 🐦

A fun onepager React webapp that displays random Twitter images with a single click!

## Features

- 🎲 **Random Button** - Large centered button that fetches random Twitter images
- 🔄 **Repositioning** - Button moves to top-left after first click for easy repeat clicks  
- 🐦 **Twitter API Integration** - Uses Twitter API v2 to fetch real tweets with images
- 📱 **Demo Mode** - Works with placeholder images when API keys aren't configured
- ✨ **Fun Animations** - Smooth transitions and playful captions
- 🌓 **Dark/Light Mode** - Respects system color scheme preferences
- 🚀 **Single Server** - Backend and frontend served from one server.js file

## Screenshots

### Initial State
![Initial state with centered Random button](https://github.com/user-attachments/assets/ece8f8cb-8d3a-4f8e-a10a-f8b39c0d6384)

### After Clicking (Demo Mode)
![After clicking showing tweet info](https://github.com/user-attachments/assets/62f26060-ba31-488e-a3b1-d6b75ccf71ff)

## Setup

### Quick Start (Recommended)

Run the install script to set up everything automatically:

```bash
./install.sh
```

This will:
- Install all dependencies
- Create `.env` from template
- Optionally configure Twitter API credentials
- Launch the server

### Manual Setup

#### 1. Install dependencies

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

Build and start the server (frontend + backend in one):

```bash
npm start
```

Or for development with hot reload:

```bash
# Terminal 1 - Start the backend server
npm run server

# Terminal 2 - Start the frontend dev server
npm run dev
```

### 4. Open in browser

Visit [http://localhost:3001](http://localhost:3001)

## Scripts

- `npm start` - Build frontend and start server (production mode, single server)
- `npm run dev` - Start Vite development server (frontend only)
- `npm run server` - Start Express backend server (serves built frontend too)
- `npm run dev:all` - Start both dev servers
- `npm run build` - Build frontend for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Tech Stack

- **Frontend:** React 19, Vite
- **Backend:** Express.js (serves both API and static frontend)
- **Twitter API:** [twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2)
- **Styling:** CSS with animations

## License

MIT

## Production Deployment

The app runs from a single `server.js` file that serves both the API and frontend.

### Deploy to Production

1. Set your environment variables:
   ```bash
   export PORT=3001
   export TWITTER_API_KEY=your_api_key
   export TWITTER_API_SECRET=your_api_secret
   ```

2. Build and start:
   ```bash
   npm start
   ```

The server will be accessible at `http://<your-server-ip>:3001` serving both the frontend and API.

### Recommended Hosting Services

- **Railway** - Easy Node.js deployment
- **Render** - Free tier available
- **Fly.io** - Global edge deployment
- **Heroku** - Classic PaaS option

## Hosting on GitHub Pages

This app can be deployed as a static website on GitHub Pages (works in Demo Mode only):

### Automatic Deployment

1. Fork this repository
2. Go to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Push to `main` branch - the app will auto-deploy

Your site will be available at: `https://<username>.github.io/randomteeet/`

### Manual Build

```bash
# Build for GitHub Pages
GITHUB_PAGES=true npm run build

# Preview locally
npm run preview
```

> **Note:** When hosted on GitHub Pages, the app runs in Demo Mode (shows random placeholder images) since there's no backend server. For full functionality with Twitter API, use a Node.js hosting service.
