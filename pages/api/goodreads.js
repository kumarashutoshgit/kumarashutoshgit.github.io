import axios from 'axios';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId || userId === 'YOUR_GOODREADS_USER_ID') {
    return res.status(400).json({ 
      error: 'Please configure your Goodreads User ID in pages/books.js' 
    });
  }

  try {
    const rssUrl = `https://www.goodreads.com/review/list_rss/${userId}?shelf=read`;
    
    const response = await axios.get(rssUrl);
    const xml = response.data;
    
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    
    const books = items.slice(0, 20).map(item => {
      const getTag = (tag) => {
        const match = item.match(new RegExp(`<${tag}>(.*?)</${tag}>`, 's'));
        return match ? match[1].trim() : '';
      };
      
      return {
        title: getTag('title').replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1'),
        author: getTag('author_name'),
        rating: getTag('user_rating'),
        link: getTag('link'),
      };
    });

    res.status(200).json({ books });
  } catch (error) {
    console.error('Goodreads API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch books. Make sure your Goodreads profile is public.',
      details: error.message 
    });
  }
}