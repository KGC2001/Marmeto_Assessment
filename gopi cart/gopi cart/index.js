document.addEventListener("DOMContentLoaded", async () => {
    const productUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448';

    // Fetch product data
    const fetchProductData = async () => {
        try {
            const response = await fetch(productUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const productData = await fetchProductData();
    const product = productData.product;

    // Elements
    const mainImageEl = document.getElementById('mainImage');
    const thumbnailContainerEl = document.getElementById('thumbnailContainer');
    const vendorEl = document.getElementById('vendor');
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const compareAtPriceEl = document.getElementById('compareAtPrice');
    const percentageOffEl = document.getElementById('percentageOff');
    const colorSelectorEl = document.getElementById('colorSelector');
    const sizeSelectorEl = document.getElementById('sizeSelector');
    const quantityEl = document.getElementById('quantity');
    const addToCartBtnEl = document.getElementById('addToCartBtn');
    const cartMessageEl = document.getElementById('cartMessage');
    const descriptionEl = document.getElementById('description');
    const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
    const increaseQuantityBtn = document.getElementById('increaseQuantity');
    const quantityInput = document.getElementById('quantity');

    decreaseQuantityBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseQuantityBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    // Populate elements
    // mainImageEl.src = product.images[0].src;
    vendorEl.textContent = product.vendor;
    titleEl.textContent = product.title;
    priceEl.textContent = product.price;
    compareAtPriceEl.textContent = product.compare_at_price;

    const percentageOff = Math.round(((parseFloat(product.compare_at_price.replace('$', '')) - parseFloat(product.price.replace('$', ''))) / parseFloat(product.compare_at_price.replace('$', ''))) * 100);
    percentageOffEl.textContent = `${percentageOff}% off`;

    // product.images.forEach(image => {
    //     const img = document.createElement('img');
    //     img.src = image.src;
    //     img.addEventListener('click', () => {
    //         mainImageEl.src = image.src;
    //     });
    //     thumbnailContainerEl.appendChild(img);
    // });
    const imageUrls = [
        'https://images.meesho.com/images/products/54283158/xawyf_512.webp',
        'https://images.meesho.com/images/products/54283158/bbbha_512.webp',
        'https://images.meesho.com/images/products/54283158/1chc4_512.webp',
        'https://images.meesho.com/images/products/54283158/jwqth_512.webp'
    ];

    // Function to create <img> elements with provided URLs
    const createImageElement = (imageUrl) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Product Image';
        return img;
    };

    // Modify the main image and thumbnails with provided images
    // const mainImageEl = document.getElementById('mainImage');
    // const thumbnailContainerEl = document.getElementById('thumbnailContainer');

    mainImageEl.src = imageUrls[0]; // Set main image
    thumbnailContainerEl.innerHTML = ''; // Clear existing thumbnails

    // Populate thumbnails
    imageUrls.forEach((imageUrl) => {
        const img = createImageElement(imageUrl);
        img.addEventListener('click', () => {
            mainImageEl.src = imageUrl;
        });
        thumbnailContainerEl.appendChild(img);
    });

    product.options.forEach(option => {
        if (option.name === "Color") {
            option.values.forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.textContent = Object.keys(color)[0];
                colorDiv.style.backgroundColor = Object.values(color)[0];
                colorDiv.style.height = '40px';
                colorDiv.style.width = '40px';
                colorDiv.style.display = 'inline-block';
                colorDiv.style.margin = '5px';
                colorDiv.style.textAlign = 'center';
                colorDiv.style.lineHeight = '40px';
                colorDiv.addEventListener('click', (event) => {
                    document.querySelectorAll('#colorSelector div').forEach(el => el.classList.remove('selected'));
                    event.target.classList.add('selected');
                });
                colorSelectorEl.appendChild(colorDiv);
            });
        } else if (option.name === "Size") {
            option.values.forEach(size => {
                const sizeLabel = document.createElement('label');
                sizeLabel.style.display = 'flex';
                sizeLabel.style.alignItems = 'center';
                // sizeLabel.style.margin = '1px';

                const sizeInput = document.createElement('input');
                sizeInput.type = 'radio';
                sizeInput.name = 'size';
                sizeInput.value = size;
                    // sizeInput.style.display = 'none'; // Hide the actual radio button

                const sizeDiv = document.createElement('div');
                sizeDiv.className = 'sizeButton';
                sizeDiv.textContent = size;
                sizeDiv.style.padding = '1px 10px';
                sizeDiv.style.fontSize = '10px';
                sizeDiv.style.borderRadius = '30%'; // Make it round
                sizeDiv.style.width = '30px'; // Adjust size as needed
                sizeDiv.style.height = '30px'; // Adjust size as needed
                sizeDiv.style.display = 'flex';
                sizeDiv.style.justifyContent = 'center';
                sizeDiv.style.alignItems = 'center';
                sizeDiv.style.border = '1px solid #ccc'; // Add border for clarity

                sizeDiv.addEventListener('click', (event) => {
                    document.querySelectorAll('#sizeSelector .sizeButton').forEach(el => el.classList.remove('selected'));
                    sizeDiv.classList.add('selected');
                });

                sizeLabel.appendChild(sizeInput);
                sizeLabel.appendChild(sizeDiv);
                sizeSelectorEl.appendChild(sizeLabel);
            });
        }
    });

    addToCartBtnEl.addEventListener('click', () => {
        const selectedColor = colorSelectorEl.querySelector('.selected')?.textContent || 'No color selected';
        const selectedSize = sizeSelectorEl.querySelector('.selected')?.textContent || 'No size selected';
        const quantity = quantityEl.value;
        cartMessageEl.textContent = `Added ${quantity} of ${product.title} (Color: ${selectedColor}, Size: ${selectedSize}) to cart.`;
        cartMessageEl.style.display = 'block';
    });

    descriptionEl.innerHTML = product.description;
});
