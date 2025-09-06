// Categories Load Function
const loadCategories = () => {
    const categorySection = document.getElementById('category-section');

    // ✅ একটাই লোডার দেখানো
    categorySection.innerHTML = `<span id="category-loader" class="loading loading-dots loading-lg"></span>`;

    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

loadCategories()

const displayCategories = (categoriesItem) => {
    const categorySection = document.getElementById('category-section');
    categorySection.innerHTML = ""; 

    for (let category of categoriesItem) {
        const categoryItem = document.createElement('li');
        categoryItem.innerHTML = `
            <span class="my-3 text-lg py-1 px-2 hover:bg-green-600 text-black hover:text-white rounded-sm block">
                ${category.category_name}
            </span>
        `;
        categorySection.appendChild(categoryItem);
    }
}



// Cards Load Function
const loadCards = () => {
    const cardSection = document.getElementById('card-section');

    
    cardSection.innerHTML = ``;

    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => displayCards(data.plants))
}

loadCards()

const displayCards = (cards) => {
    const cardSection = document.getElementById('card-section');
    cardSection.innerHTML = ""; 

    for (let card of cards) {
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
            <div class="p-4 rounded-xl shadow-2xl">
                <div class="mb-2">
                    <img src="${card.image}" alt="${card.name}" class="w-full h-40 object-cover rounded-lg">
                </div>
                <div>
                    <h3 class="text-lg font-bold">${card.name}</h3>
                    <p class="text-sm text-gray-600 my-2">${card.description.slice(0, 80)}...</p>
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
}
