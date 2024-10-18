import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "bc4906feb6d348118ee4dd06a504fc36";
const SOURCES_URL = "https://newsapi.org/v2/top-headlines/sources";

function NewsSources({ onSourceSelect }) {
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch sources based on category, language, and country
    useEffect(() => {
        async function fetchSources() {
            setLoading(true);
            setError(null); // Reset error state
            try {
                const response = await axios.get(SOURCES_URL, {
                    params: {
                        category: "technology", // Example: technology news
                        language: "en",         // Example: English language
                        country: "",            // Example: US-based news
                    },
                    headers: {
                        "X-Api-Key": API_KEY,
                    },
                });
                setSources(response.data.sources); // Store the fetched sources
            } catch (error) {
                setError("Error fetching sources. Please try again later.");
                console.error("Error fetching sources:", error);
            } finally {
                setLoading(false); // Set loading to false after request
            }
        }

        fetchSources();
    }, []);

    const handleSourceChange = (source) => {
        setSelectedSource(source);
        onSourceSelect(source); // Pass selected source to parent component
    };

    return (
        <div className="bg-gray-900 p-4">
            {loading && <p className="text-white text-center">Loading sources...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
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
                            aria-label={`Select ${source.name} as news source`}
                        >
                            {source.name}
                        </button>
                    ))
                ) : (
                    !loading && <p className="text-white text-center">No sources available.</p>
                )}
            </div>
        </div>
    );
}

export default NewsSources;
