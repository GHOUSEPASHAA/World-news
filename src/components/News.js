import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);

        try {
            let data = await fetch(url);
            props.setProgress(30);

            if (!data.ok) {
                console.error(`Error: Fetch failed with status ${data.status} - ${data.statusText}`);
            }

            let parsedData = await data.json();
            props.setProgress(70);

            setArticles(parsedData.articles || []);
            setTotalResults(parsedData.totalResults);
        } catch (error) {
            console.error("Error fetching news articles:", error);
            setArticles([]);
        } finally {
            setLoading(false);
            props.setProgress(100);
        }
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
    }, [page]); // Update news whenever the page changes

    const handleNextClick = () => {
        setPage(page + 1);
    };

    const handlePrevClick = () => {
        setPage(page - 1);
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                World News - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>
            {loading && <Spinner />}

            <div className="container">
                <div className="row">
                    {articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem 
                                    title={element.title || ""} 
                                    description={element.description || ""} 
                                    imageUrl={element.urlToImage} 
                                    newsUrl={element.url} 
                                    author={element.author} 
                                    date={element.publishedAt} 
                                    source={element.source.name} 
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination buttons */}
            <div className="container d-flex justify-content-between my-3">
                <button
                    disabled={page <= 1} // Disable Previous button on first page
                    className="btn btn-dark"
                    onClick={handlePrevClick}
                >
                    &larr; Previous
                </button>
                <button
                    disabled={page >= Math.ceil(totalResults / props.pageSize)} // Disable Next button if no more articles
                    className="btn btn-dark"
                    onClick={handleNextClick}
                >
                    Next &rarr;
                </button>
            </div>
        </>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
