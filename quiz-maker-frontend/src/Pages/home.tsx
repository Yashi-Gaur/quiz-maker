import { useState } from "react";

function Home() {
    const [url, setUrl] = useState("");
    const [topic, setTopic] = useState("");
    return(
        <>
            <h2>Quiz Maker</h2>
            <p>Enter a URL and an optional topic to create a quiz</p>
            <div style={{display: "flex", gap: "8px", justifyContent: "center", marginBottom: "12px"}}>
                <input
                    type="text"
                    placeholder="Website URL"
                    value={url}
                    onChange={(e) => {setUrl(e.target.value)}}
                />
                <input
                    type="text"
                    placeholder="Topic"
                    value={topic}
                    onChange={(e) => {setTopic(e.target.value)}}
                />
            </div>
            <button>Enter</button>
        </>
    )
}

export default Home;
