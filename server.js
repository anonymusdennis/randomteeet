import express from 'express';
import cors from 'cors';
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Twitter client with API Key and Secret (App-only auth)
const getTwitterClient = async () => {
  const apiKey = process.env.TWITTER_API_KEY;
  const apiSecret = process.env.TWITTER_API_SECRET;
  
  if (!apiKey || !apiSecret || apiKey === 'your_api_key_here') {
    return null;
  }
  
  // Create app-only client using API key and secret
  const client = new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
  });
  
  // Get app-only (bearer) token
  const appOnlyClient = await client.appLogin();
  return appOnlyClient;
};

// Cache the client to avoid regenerating bearer token on every request
let cachedClient = null;
let clientInitialized = false;

const getClient = async () => {
  if (!clientInitialized) {
    try {
      cachedClient = await getTwitterClient();
      clientInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Twitter client:', error.message);
      clientInitialized = true; // Mark as initialized even on failure to avoid retry loop
    }
  }
  return cachedClient;
};

// Endpoint to get a random tweet with an image
app.get('/api/random-tweet', async (req, res) => {
  try {
    const client = await getClient();
    
    if (!client) {
      // Return mock data if no API key is configured
      return res.json({
        success: true,
        mock: true,
        data: {
          imageUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/400`,
          text: 'This is a mock tweet! Configure your Twitter API keys in .env to get real tweets.',
          author: 'MockUser',
          tweetUrl: 'https://twitter.com'
        }
      });
    }

    // Search for recent tweets containing images
    // Using popular search terms that often have images
    const searchTerms = [
      'nature photo',
      'sunset',
      'cute animals',
      'art',
      'photography',
      'landscape',
      'travel',
      'food',
      'flowers',
      'sky'
    ];
    
    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    
    const tweets = await client.v2.search(randomTerm, {
      'tweet.fields': ['attachments', 'author_id', 'text'],
      'expansions': ['attachments.media_keys', 'author_id'],
      'media.fields': ['url', 'preview_image_url', 'type'],
      'user.fields': ['username'],
      'max_results': 100
    });

    // Filter tweets that have images
    const tweetsWithImages = [];
    
    if (tweets.data?.data && tweets.includes?.media) {
      for (const tweet of tweets.data.data) {
        if (tweet.attachments?.media_keys) {
          const mediaKey = tweet.attachments.media_keys[0];
          const media = tweets.includes.media.find(m => m.media_key === mediaKey);
          
          if (media && media.type === 'photo' && media.url) {
            const author = tweets.includes.users?.find(u => u.id === tweet.author_id);
            tweetsWithImages.push({
              imageUrl: media.url,
              text: tweet.text,
              author: author?.username || 'Unknown',
              tweetId: tweet.id
            });
          }
        }
      }
    }

    if (tweetsWithImages.length === 0) {
      // Fallback to mock data if no images found
      return res.json({
        success: true,
        mock: true,
        data: {
          imageUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/400`,
          text: 'No tweets with images found. Here\'s a random image instead!',
          author: 'RandomImage',
          tweetUrl: 'https://twitter.com'
        }
      });
    }

    // Pick a random tweet with an image
    const randomTweet = tweetsWithImages[Math.floor(Math.random() * tweetsWithImages.length)];
    
    res.json({
      success: true,
      mock: false,
      data: {
        imageUrl: randomTweet.imageUrl,
        text: randomTweet.text,
        author: randomTweet.author,
        tweetUrl: `https://twitter.com/${randomTweet.author}/status/${randomTweet.tweetId}`
      }
    });

  } catch (error) {
    console.error('Twitter API Error:', error);
    
    // Return mock data on error
    res.json({
      success: true,
      mock: true,
      error: error.message,
      data: {
        imageUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/600/400`,
        text: 'Error fetching tweet. Here\'s a random image instead!',
        author: 'ErrorFallback',
        tweetUrl: 'https://twitter.com'
      }
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const client = await getClient();
  res.json({ 
    status: 'ok',
    twitterConfigured: client !== null
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Initialize client on startup
  getClient().then(client => {
    console.log(`Twitter API configured: ${client !== null}`);
  });
});
