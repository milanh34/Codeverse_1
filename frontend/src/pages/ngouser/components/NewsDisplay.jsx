import React, { useState, useEffect } from 'react';
import { fetchNGONews, mockNewsData } from './News';
import { Card } from '@/components/ui/card';

const NewsDisplay = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNGONews();
        setNews(newsData.length > 0 ? newsData : mockNewsData);
      } catch (error) {
        console.error('Error loading news:', error);
        setNews(mockNewsData);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return <div>Loading news...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {news.map((article) => (
        <Card key={article.id} className="p-4 hover:shadow-lg transition-shadow">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.src = '/placeholder-news.jpg';
              }}
            />
          )}
          <div className="space-y-2">
            <h3 className="font-bold text-lg line-clamp-2">{article.title}</h3>
            <p className="text-sm text-gray-500">{article.date}</p>
            <p className="text-sm line-clamp-3">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Read more
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NewsDisplay;
