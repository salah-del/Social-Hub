import { useState, useEffect } from 'react';

const VideoDescription = ({ description }) => {
    const [desc, setDesc] = useState(
        description
            ? description.length > 200
                ? description.slice(0, 200) + "..."
                : description
            : "No description for this video."
    );
    const [expandDesc, setExpandDesc] = useState(description ? description.length > 200 : false);

    useEffect(() => {
        setDesc(
            description
                ? description.length > 200
                    ? description.slice(0, 200) + "..."
                    : description
                : "No description for this video."
        );
        setExpandDesc(description ? description.length > 200 : false);
    }, [description]);

    const handleExpandDesc = () => {
        setDesc(description);
        setExpandDesc(false);
    };

    const handleShrinkDesc = () => {
        setDesc(description.slice(0, 200) + "...");
        setExpandDesc(true);
    };

    return (
        <div className="p-2 max-w-full text-wrap flex-wrap border rounded-md bg-gray-100 text-gray-600 text-sm font-semibold">
            {desc}
            {expandDesc && (
                <button
                    onClick={handleExpandDesc}
                    className="underline block hover:no-underline text-sm font-semibold text-black"
                >
                    Show more
                </button>
            )}
            {!expandDesc && description.length > 200 && (
                <button
                    onClick={handleShrinkDesc}
                    className="block underline hover:no-underline text-sm font-semibold text-black"
                >
                    Show less
                </button>
            )}
        </div>
    );
};

export default VideoDescription;
