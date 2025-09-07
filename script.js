// ==================== Load Categories ====================
const loadCategories = () => {
    const categorySection = document.getElementById('category-section');
    
    // Small loader while categories load
    categorySection.innerHTML = `<span class="loading loading-dots loading-lg flex justify-center my-4"></span>`;

    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.error("Error loading categories:", err));
};

loadCategories();

const displayCategories = (categories) => {
    const categorySection = document.getElementById('category-section');
    categorySection.innerHTML = ""; 

    // Add "All Trees" option
    const allTreesItem = document.createElement('li');
    allTreesItem.innerHTML = `
        <span onclick="loadCards()" 
            class="my-3 text-lg py-1 px-2 hover:bg-green-600 text-black hover:text-white rounded-sm block cursor-pointer">
            🌳 All Trees
        </span>
    `;
    categorySection.appendChild(allTreesItem);

    // Add categories from API
    for (let category of categories) {
        const categoryItem = document.createElement('li');
        categoryItem.innerHTML = `
            <span onclick="loadCategoryData(${category.id})" 
                class="my-3 text-lg py-1 px-2 hover:bg-green-600 text-black hover:text-white rounded-sm block cursor-pointer">
                ${category.category_name}
            </span>
        `;
        categorySection.appendChild(categoryItem);
    }
};

// ==================== Load Category Data ====================
const loadCategoryData = (id) => {
    const section = document.getElementById('card-section');

    // Loader spanning all columns
    section.innerHTML = `
        <div class="col-span-full flex justify-center my-6">
            <span class="loading loading-dots loading-lg"></span>
        </div>
    `;

    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryData(data.plants))
        .catch(err => console.error("Error loading category data:", err));
};

// ==================== Display Category Data ====================
const displayCategoryData = (plants) => {
    const section = document.getElementById('card-section');
    section.innerHTML = "";

    if (!plants || plants.length === 0) {
        section.innerHTML = `<p class="col-span-full text-center text-gray-500">No plants found in this category.</p>`;
        return;
    }

    for (let plant of plants) {
        let contentDiv = document.createElement('div');
        contentDiv.innerHTML = `
            <div class="p-4 rounded-xl shadow-2xl">
                <div class="mb-2">
                    <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded-lg">
                </div>
                <div>
                    <h3 class="text-lg font-bold">${plant.name}</h3>
                    <p class="text-sm text-gray-600 my-2">${plant.description}</p>
                    <div class="flex items-center justify-between my-2">
                        <h5 class="rounded-lg py-1 px-2 text-sm text-[#15803D] bg-[#DCFCE7]">${plant.category}</h5>
                        <span class="font-semibold">$${plant.price}</span>
                    </div>
                    <button class="bg-green-500 text-white py-2 w-full rounded-lg mt-2 hover:bg-green-600">Add To Cart</button>
                </div>
            </div>
        `; 
        section.appendChild(contentDiv);
    }
};

// ==================== Load All Cards ====================
const loadCards = () => {
    const cardSection = document.getElementById('card-section');

    // Loader spanning all columns
    cardSection.innerHTML = `
        <div class="col-span-full flex justify-center my-6">
            <span class="loading loading-dots loading-lg"></span>
        </div>
    `;

    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayCards(data.plants))
        .catch(err => console.error("Error loading cards:", err));
};

loadCards();

// ==================== Display All Cards ====================
const displayCards = (cards) => {
    const cardSection = document.getElementById('card-section');
    cardSection.innerHTML = ""; 

    if (!cards || cards.length === 0) {
        cardSection.innerHTML = `<p class="col-span-full text-center text-gray-500">No plants available.</p>`;
        return;
    }

    for (let card of cards) {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div class="p-4 rounded-xl shadow-2xl">
                <div class="mb-2">
                    <img src="${card.image}" alt="${card.name}" class="w-full h-40 object-cover rounded-lg">
                </div>
                <div>
                    <h3 class="text-lg font-bold">${card.name}</h3>
                    <p class="text-sm text-gray-600 my-2">${card.description}</p>
                    <div class="flex items-center justify-between my-2">
                        <h5 class="rounded-lg py-1 px-2 text-sm text-[#15803D] bg-[#DCFCE7]">${card.category}</h5>
                        <span class="font-semibold">$${card.price}</span>
                    </div>
                    <button class="bg-green-500 text-white py-2 w-full rounded-lg mt-2 hover:bg-green-600">Add To Cart</button>
                </div>
            </div>
        `;
        cardSection.appendChild(cardDiv);
    }
};
