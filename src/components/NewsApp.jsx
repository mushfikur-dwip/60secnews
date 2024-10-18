import React, { useState } from "react";
import NewsSources from "./NewsSources";
import NewsCard from "./NewsCard";

function NewsApp() {
    const [selectedSource, setSelectedSource] = useState("");

    const handleSourceSelect = (source) => {
        setSelectedSource(source);
    };

    return (
        <div>
            <NewsSources onSourceSelect={handleSourceSelect} />
            {selectedSource && <NewsCard selectedSource={selectedSource} />}
        </div>
    );
}

export default NewsApp;
