import axios from 'axios';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username || username === '@your-medium-username') {
    return res.status(400).json({ 
      error: 'Please configure your Medium username in pages/blogs.js' 
    });
  }

  try {
    const mediumUsername = username.replace('@', '');
    const rssUrl = `https://medium.com/feed/${mediumUsername}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status !== 'ok') {
      throw new Error('Failed to fetch Medium posts');
    }

    const posts = data.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description.replace(/<[^>]*>/g, '').substring(0, 300),
      categories: item.categories
    }));

    res.status(200).json({ posts });
  } catch (error) {
    console.error('Medium API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch blog posts. Make sure your username is correct.',
      details: error.message 
    });
  }
}