document.addEventListener("DOMContentLoaded", async function () {
    const fallbackImage = "assets/img/gallery/placeholder.jpg"; // Local fallback image
    const itemsContainer = document.getElementById("items-container");
    let localImages = []; // To store loaded images

    // ✅ **Fetch Images from JSON**
    async function fetchImageData() {
        try {
            const response = await fetch("assets/data/images.json");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            localImages = data.images; // Store images from JSON
            console.log("✅ Loaded images:", localImages);
        } catch (error) {
            console.error("❌ Error loading JSON:", error);
        }
    }

    // ✅ **Get Random Image**
    function getRandomImage() {
        if (localImages.length === 0) {
            console.warn("⚠️ No images loaded! Using fallback.");
            return fallbackImage; // Use fallback if JSON fails
        }
        const randomIndex = Math.floor(Math.random() * localImages.length);
        return localImages[randomIndex]; // Pick a random image
    }

    // ✅ **Create Item Card**
    function createItemCard(name, price) {
        const imageUrl = getRandomImage();
        console.log(`📸 Assigned Image for "${name}":`, imageUrl);

        return `
            <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="properties properties2 pb-40">
                    <div class="properties-card">
                        <div class="properties-img">
                            <a href="#"><img src="${imageUrl}" alt="${name}"></a>
                            <div class="img-cap">
                                <span>Add to cart</span>
                            </div>
                        </div>
                        <div class="properties-caption properties-caption2">
                            <h3><a href="#">${name}</a></h3>
                            <div class="properties-footer">
                                <div class="price">
                                    <span>$${price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ✅ **Load Items (after fetching images)**
    async function loadItems() {
        await fetchImageData(); // Wait for JSON to load

        const items = [
            { name: "Chocolate Pastry", price: 12.99 },
            { name: "Vanilla Cupcake", price: 8.99 },
            { name: "Strawberry Dessert", price: 14.99 },
            { name: "Blueberry Tart", price: 11.49 },
            { name: "Lemon Cupcake", price: 9.99 },
            { name: "Raspberry Pastry", price: 13.50 }
        ];

        let content = "";
        for (const item of items) {
            content += createItemCard(item.name, item.price);
        }

        itemsContainer.innerHTML = content;
        console.log("✅ Items loaded successfully!");
    }

    // Start the process
    loadItems();
});
