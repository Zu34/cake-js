document.addEventListener("DOMContentLoaded", function () {
    const unsplashApiKey = "lRNY8tCveV4BEwlCJMXJGOJSOPgWqP1SuzvOYETNvC8"; // Replace with your actual key
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=cake&client_id=${unsplashApiKey}`;

    fetch(unsplashUrl)
        .then(response => response.json())
        .then(data => {
            document.querySelector(".about-img1 img").src = data.urls.regular;
        })
        .catch(error => console.error("Error fetching cake image:", error));
});
