import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './Assignment1.css';

const Assignment1 = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://picsum.photos/v2/list?page=${page}`);
        setArticles(prevArticles => [...prevArticles, ...response.data.map(article => ({ ...article, likes: 0 }))]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleLike = (index) => {
    setArticles(prevArticles => {
      const newArticles = [...prevArticles];
      newArticles[index] = {
        ...newArticles[index],
        likes: newArticles[index].likes + 1
      };
      return newArticles;
    });
  };

  return (
    <div className="assignment-container">
      <h1 className="heading-right">Photo Gallery</h1> {/* Added class for right alignment */}
      <div className="article-list">
        {articles.map((article, index) => (
          <div className="article" key={index}>
            <img src={article.download_url} alt={article.author} />
            <div className="author">{article.author}</div>
            <div className="likes" onClick={() => handleLike(index)}>
              <FontAwesomeIcon icon={faThumbsUp} />
              <span>{article.likes}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="load-more" onClick={handleLoadMore}>Load More</button>
    </div>
  );
}

export default Assignment1;
