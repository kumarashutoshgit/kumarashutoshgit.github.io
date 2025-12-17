import axios from 'axios';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId || userId === 'YOUR_GOODREADS_USER_ID') {
    return res.status(400).json({ 
      error: 'Please configure your Goodreads User ID in pages/books.js' 
    });
  }

  try {
    // Goodreads RSS feed - fetching ALL books (increase per_page to maximum)
    const rssUrl = `https://www.goodreads.com/review/list_rss/${userId}?shelf=read&per_page=200`;
    
    const response = await axios.get(rssUrl);
    const xml = response.data;
    
    // Parse all items from RSS feed
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    
    const books = items.map(item => {
      const getTag = (tag) => {
        const match = item.match(new RegExp(`<${tag}>(.*?)</${tag}>`, 's'));
        return match ? match[1].trim() : '';
      };
      
      // Extract title (remove CDATA wrapper)
      const title = getTag('title').replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1');
      
      // Extract author
      const author = getTag('author_name');
      
      // Extract rating
      const rating = getTag('user_rating');
      
      // Extract link
      const link = getTag('link');
      
      // Extract read date
      const dateRead = getTag('user_read_at');
      
      // Extract book description
      const description = getTag('book_description').replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1').replace(/<[^>]*>/g, '');
      
      return {
        title: title,
        author: author,
        rating: rating,
        link: link,
        dateRead: dateRead,
        description: description.substring(0, 200),
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