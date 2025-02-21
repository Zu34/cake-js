document.addEventListener("DOMContentLoaded", async function () {
    const sliderContainer = document.querySelector(".latest-items-active");

    // ✅ Fetch JSON Data
    async function fetchSliderData() {
        try {
            const response = await fetch("assets/data/images.json");
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            return data.images;
        } catch (error) {
            console.error("❌ Error loading JSON:", error);
            return [];
        }
    }

    // ✅ Create Image Card for Slider (matching your style)
    function createSliderCard(imageUrl) {
        return `
            <div class="properties pb-30">
                <div class="properties-card">
                    <div class="properties-img">
                        <a href="#"><img src="${imageUrl}" alt="Product Image"></a>
                        <div class="img-cap">
                            <span>Add to cart</span>
                        </div>
                    </div>
                    <div class="properties-caption properties-caption2">
                        <h3><a href="#">Delicious Cake</a></h3>
                        <div class="properties-footer">
                            <div class="price">
                                <span>$98.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ✅ Load Slider with JSON Data
    async function loadSlider() {
        const images = await fetchSliderData();
        if (images.length === 0) return;

        let content = "";
        for (const imageUrl of images) {
            content += createSliderCard(imageUrl);
        }

        sliderContainer.innerHTML = content; // Inject slides

        // ✅ Destroy Slick if already initialized, then reinitialize
        setTimeout(() => {
            if ($('.latest-items-active').hasClass('slick-initialized')) {
                $('.latest-items-active').slick('unslick'); // Destroy existing instance
            }

            // ✅ Reinitialize Slick.js
            $('.latest-items-active').slick({
                Infinite:true,
                slidesToShow: 3,  // Adjust according to your design
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: false,
                dots: false,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: { slidesToShow: 2 }
                    },
                    {
                        breakpoint: 768,
                        settings: { slidesToShow: 1 }
                    }
                ]
            });
        }, 300);
    }

    // Start the process
    loadSlider();
});
