const apiKey = "AIzaSyBbiIep-PV-FR9V2IxrpwLEfmZdexqg68Q"; 
const searchQuery = "cake making tutorial";
const maxResults = 5;
const videoBtn = document.getElementById("video-play-btn");
const videoFrameContainer = document.getElementById("video-frame-container");
const youtubeIframe = document.getElementById("youtube-iframe");

// ✅ Fetch a YouTube video
async function fetchCakeVideo() {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchQuery}&key=${apiKey}&type=video`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items.length > 0) {
            const randomVideo = data.items[Math.floor(Math.random() * data.items.length)];
            const videoId = randomVideo.id.videoId;
            youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
    } catch (error) {
        console.error("❌ Error fetching YouTube videos:", error);
    }
}

// ✅ Play video when clicking the button
videoBtn.addEventListener("click", () => {
    fetchCakeVideo();
    videoBtn.style.display = "none"; // Hide play button
    videoFrameContainer.style.display = "block"; // Show video frame
});