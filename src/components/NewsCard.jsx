import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import axios from "axios";

// Assets for icons and default images
import love from "../assets/love.svg";
import comment from "../assets/comment.svg";
import save from "../assets/save.svg";
import share from "../assets/share.svg";
import profilePic from "../assets/profilePic.png"; // Replace with dynamic if available

const API_URL = "https://newsapi.org/v2/top-headlines";
const API_KEY = "bc4906feb6d348118ee4dd06a504fc36"; // Your API Key

function NewsCard({ selectedSource }) {
    const [newsItems, setNewsItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Swipe handlers to navigate news items
    const handlers = useSwipeable({
        onSwipedLeft: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length),
        onSwipedRight: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        sources: selectedSource,  // Get news from the selected source
                        pageSize: 5,  // You can adjust this as per need
                    },
                    headers: {
                        "X-Api-Key": API_KEY,
                    },
                });
                setNewsItems(response.data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        }

        if (selectedSource) {
            fetchNews();
        }
    }, [selectedSource]);

    if (newsItems.length === 0) {
        return <p>No news available</p>;
    }

    const currentNews = newsItems[currentIndex];

    return (
        <div {...handlers} className="rounded-lg relative">

            {/* News Info */}

            <div className="relative">
                <img className="w-full h-auto max-h-[15rem] object-cover" src={currentNews.urlToImage || profilePic} alt="news-img" />
                <div className="max-h-[15rem] absolute inset-0 bg-black opacity-50"></div>
                <div className="p-4 absolute bottom-0 w-full">
                    <p className="text-[14px] text-gray-500 bg-white py-1 px-2 inline rounded-full">
                        {currentNews.source.name || "Unknown Source"}
                    </p>
                    <p className="mt-2 text-white text-[20px]">{currentNews.title}</p>
                </div>
            </div>

            {/* News Meta */}
            <div className="flex items-center m justify-between p-3 border-b-[1px]">
                <div className="flex-col">
                    <p className="text-[14px] text-gray-500">{currentNews.author || "Unknown Author"}</p>
                    <p className="text-[14px] text-gray-500">{new Date(currentNews.publishedAt).toLocaleString()}</p>
                </div>
                <div className="flex-row justify-around">
                    <img src={profilePic} alt="profile" className="w-12 border rounded-full" />
                </div>
            </div>

            {/* News Content */}
            <div className="">
                <p className="text-[18px] p-4 leading-8">
                    {currentNews.content ? currentNews.content.slice(0, 200) + "..." : currentNews.description}
                </p>
            </div>

            {/* Interaction Icons */}
            <div className="flex justify-around border fixed bottom-0 w-full sm:w-1/3 pt-3 pb-2">
                <span className="font-semibold"><img src={love} alt="love" className="w-[24px]" /> 24k</span>
                <span className="font-semibold"><img src={comment} alt="comment" className="w-[24px]" /> 47</span>
                <span className="font-semibold"><img src={share} alt="share" className="w-[24px]" /> 1.5k</span>
                <span className="font-semibold"><img src={save} alt="save" className="w-[24px]" /> 2k</span>
            </div>
        </div>
    );
}

export default NewsCard;
