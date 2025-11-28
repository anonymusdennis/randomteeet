import { useState, useCallback } from 'react'
import './App.css'

// API endpoint - set VITE_API_URL environment variable for production deployment
// Example: VITE_API_URL=https://your-backend-api.example.com npm run build
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Fun captions to display with images
const funCaptions = [
  "🐦 Tweet tweet!",
  "📱 Fresh from the timeline!",
  "🔥 This one's trending!",
  "💫 Random magic!",
  "🎲 What'll we get next?",
  "🌟 Another gem found!",
  "🎯 Bullseye pick!",
  "🎨 Art from the void!",
  "🚀 Launching randomness!",
  "✨ Sparkly fresh!",
]

function App() {
  const [hasClicked, setHasClicked] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [tweetText, setTweetText] = useState('')
  const [tweetAuthor, setTweetAuthor] = useState('')
  const [tweetUrl, setTweetUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [imageCount, setImageCount] = useState(0)
  const [isMock, setIsMock] = useState(false)

  const fetchRandomImage = useCallback(async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch(`${API_URL}/api/random-tweet`)
      const result = await response.json()
      
      if (result.success && result.data) {
        setImageUrl(result.data.imageUrl)
        setTweetText(result.data.text)
        setTweetAuthor(result.data.author)
        setTweetUrl(result.data.tweetUrl)
        setIsMock(result.mock)
      }
    } catch (error) {
      // Fallback to random image if API is not available
      console.warn('API fetch failed, using fallback:', error.message)
      const randomId = Math.floor(Math.random() * 1000)
      setImageUrl(`https://picsum.photos/seed/${randomId}/600/400`)
      setTweetText('Server not available. Showing random image!')
      setTweetAuthor('Offline')
      setTweetUrl('')
      setIsMock(true)
    }
    
    const randomCaption = funCaptions[Math.floor(Math.random() * funCaptions.length)]
    setCaption(randomCaption)
    setHasClicked(true)
    setImageCount(prev => prev + 1)
    setIsLoading(false)
  }, [])

  return (
    <div className={`app ${hasClicked ? 'has-image' : ''}`}>
      <button 
        className={`random-button ${hasClicked ? 'top-left' : 'centered'} ${isLoading ? 'loading' : ''}`}
        onClick={fetchRandomImage}
        disabled={isLoading}
      >
        {isLoading ? '🔄 Loading...' : '🎲 Random'}
      </button>

      {hasClicked && (
        <div className="content">
          <div className="image-container">
            {imageUrl && (
              <>
                <img 
                  src={imageUrl} 
                  alt="Random tweet image" 
                  className="random-image"
                  key={imageUrl}
                />
                <p className="caption">{caption}</p>
                {tweetText && (
                  <div className="tweet-info">
                    <p className="tweet-text">{tweetText}</p>
                    {tweetAuthor && (
                      <p className="tweet-author">
                        — @{tweetAuthor}
                        {tweetUrl && (
                          <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="tweet-link">
                            View Tweet 🔗
                          </a>
                        )}
                      </p>
                    )}
                  </div>
                )}
                <p className="counter">
                  Images viewed: {imageCount} 🐦
                  {isMock && <span className="mock-badge">Demo Mode</span>}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {!hasClicked && (
        <div className="intro-text">
          <h1>🐦 Random Tweet</h1>
          <p>Click the button to discover random Twitter images!</p>
        </div>
      )}
    </div>
  )
}

export default App
