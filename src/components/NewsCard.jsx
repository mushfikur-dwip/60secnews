import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import axios from "axios";

// Assets for icons and default images
import love from "../assets/love.svg";
import comment from "../assets/comment.svg";
import save from "../assets/save.svg";
import share from "../assets/share.svg";
import profilePic from "../assets/profilePic.png"; // Replace with dynamic if available

const API_URL = "https://newsapi.org/v2/everything";
const API_KEY = "bc4906feb6d348118ee4dd06a504fc36"; // Your API Key

function NewsCard({ selectedSource }) {
    const [newsItems, setNewsItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Swipe handlers to navigate news items
    const handlers = useSwipeable({
        onSwipedLeft: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length),
        onSwipedRight: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            setError(null); // Reset error state
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        sources: selectedSource, // Get news from the selected source
                        pageSize: 5,  // You can adjust this as per need
                    },
                    headers: {
                        "X-Api-Key": API_KEY,
                    },
                });
                setNewsItems(response.data.articles);
            } catch (error) {
                setError("Error fetching news. Please try again later.");
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false); // Set loading to false after request
            }
        }

        if (selectedSource) {
            fetchNews();
        }
    }, [selectedSource]);

    if (loading) {
        return <p className="text-center">Loading news...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (newsItems.length === 0) {
        return <p className="text-center">No news available</p>;
    }

    const currentNews = newsItems[currentIndex];

    return (
        <div {...handlers} className="rounded-lg relative">

            {/* News Info */}
            <div className="relative">
                <img className="w-full h-auto max-h-[15rem] object-cover" src={currentNews.urlToImage || profilePic} alt={currentNews.title} />
                <div className="max-h-[15rem] absolute inset-0 bg-black opacity-50"></div>
                <div className="p-4 absolute bottom-0 w-full">
                    <p className="text-[14px] text-gray-500 bg-white py-1 px-2 inline rounded-full">
                        {currentNews.source.name || "Unknown Source"}
                    </p>
                    <p className="mt-2 text-white text-[20px]">{currentNews.title}</p>
                </div>
            </div>

            {/* News Meta */}
            <div className="flex items-center justify-between p-3 border-b-[1px]">
                <div className="flex-col">
                    <p className="text-[14px] text-gray-500">{currentNews.author || "Unknown Author"}</p>
                    <p className="text-[14px] text-gray-500">{new Date(currentNews.publishedAt).toLocaleString()}</p>
                </div>
                <a className="px-3 h-10 bg-[#2463eb] rounded-full text-white flex items-center" target="_blank" rel="noopener noreferrer" href={currentNews.url}>Open Link</a>
            </div>

            {/* News Content */}
            <div>
                {/* <p className="text-[18px] p-4 pb-0">Description</p>
                <p className="text-[18px] p-4 leading-8">{currentNews.description}</p> */}
                <p className="text-[18px] p-4 leading-8">
                    {currentNews.content ? currentNews.content.slice(0, 200) + "..." : currentNews.description}
                </p>
            </div>

            {/* Interaction Icons */}
            <div className="flex justify-around fixed bottom-0 w-full sm:w-1/3 pt-3 pb-2">
                <img src="https://newssitedesign.com/updatenews/wp-content/uploads/2021/12/biggapon-1.gif" alt="ads" />
            </div>
        </div>
    );
}

export default NewsCard;
