import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "bc4906feb6d348118ee4dd06a504fc36";
const SOURCES_URL = "https://newsapi.org/v2/top-headlines/sources";

function NewsSources({ onSourceSelect }) {
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState("");

    // Fetch sources based on category, language, and country
    useEffect(() => {
        async function fetchSources() {
            try {
                const response = await axios.get(SOURCES_URL, {
                    params: {
                        category: "sports",  // Example: sports news
                        language: "en",  // Example: English language
                        country: "us",  // Example: US-based news
                    },
                    headers: {
                        "X-Api-Key": API_KEY,
                    },
                });
                setSources(response.data.sources);  // Store the fetched sources
            } catch (error) {
                console.error("Error fetching sources:", error);
            }
        }

        fetchSources();
    }, []);

    const handleSourceChange = (source) => {
        setSelectedSource(source);
        onSourceSelect(source);  // Pass selected source to parent component
    };

    return (
        <div className="bg-gray-900 p-4">
            {/* <h2 className="text-white text-xl font-semibold mb-2 text-center">Select a News Source:</h2> */}
            <div className="overflow-x-auto hide-scrollbar whitespace-nowrap">
                {sources.length > 0 ? (
                    sources.map((source) => (
                        <button
                            key={source.id}
                            onClick={() => handleSourceChange(source.id)}
                            className={`inline-block text-white py-2 px-4 mx-2 rounded-lg transition duration-300 ease-in-out ${selectedSource === source.id
                                    ? "bg-blue-600"
                                    : "bg-gray-800 hover:bg-gray-700"
                                }`}
                        >
                            {source.name}
                        </button>
                    ))
                ) : (
                    <p className="text-white">Loading sources...</p>
                )}
            </div>
        </div>
    );
}

export default NewsSources;
