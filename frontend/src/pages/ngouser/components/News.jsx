import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NEWS_API_URL = 'https://newsdata.io/api/1/news';
const API_KEY = 'pub_72484a15c47fd1fdb8e7ae390d6768d94edd3&q=ngo%20india%20news'; 



export const fetchNGONews = async () => {
  try {
    const response = await axios.get(`${NEWS_API_URL}?apikey=${API_KEY}&q=NGO`);
    const formattedNews = response.data.results.map(article => ({
      id: article.article_id || Math.random().toString(36).substr(2, 9),
      title: article.title,
      description: article.description,
      content: article.content,
      date: new Date(article.pubDate).toLocaleDateString(),
      source: article.source_id,
      image: article.image_url || '/placeholder-news.jpg',
      url: article.link,
      category: article.category?.[0] || 'General',
      language: article.language || 'en'
    }));
    return formattedNews;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// Mock data for fallback and development
export const mockNewsData = [
  {
    id: '1',
    title: 'Local NGO Launches Environmental Initiative',
    description: 'Community-based organization starts new recycling program',
    content: 'A local NGO has launched a new environmental initiative aimed at...',
    date: '2024-02-20',
    source: 'Environmental News',
    image: 'https://example.com/image1.jpg',
    url: 'https://example.com/news/1',
    category: 'Environment',
    language: 'en'
  },
  {
    id: '2',
    title: 'NGO Partners with Government for Education Program',
    description: 'New partnership aims to improve rural education access',
    content: 'A leading NGO has partnered with the government to launch...',
    date: '2024-02-19',
    source: 'Education Weekly',
    image: 'https://example.com/image2.jpg',
    url: 'https://example.com/news/2',
    category: 'Education',
    language: 'en'
  },
  // Add more mock articles as needed
];

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNGONews();
        setNews(newsData.length > 0 ? newsData : mockNewsData);
      } catch (err) {
        setError(err.message);
        setNews(mockNewsData); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) return <div>Loading news...</div>;
  if (error) return <div>Error loading news: {error}</div>;

  return news;
};

export default News;
