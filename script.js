// ==================== Cart State ====================
let cart = [];
let activeCategoryId = "all"; // default active "All Trees"

// ==================== Load Categories ====================
const loadCategories = () => {
  const categorySection = document.getElementById("category-section");

  // Small loader while categories load
  categorySection.innerHTML = `<span class="loading loading-dots loading-lg flex justify-center my-4"></span>`;

  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.error("Error loading categories:", err));
};

loadCategories();

const displayCategories = (categories) => {
  const categorySection = document.getElementById("category-section");
  categorySection.innerHTML = "";

  // Add "All Trees" option
  const allTreesItem = document.createElement("li");
  allTreesItem.innerHTML = `
        <span data-id="all" onclick="handleCategoryClick('all')" 
            class="my-3 text-lg py-1 px-2 rounded-sm block cursor-pointer ${
              activeCategoryId === "all"
                ? "bg-green-600 text-white"
                : "hover:bg-green-600 text-black hover:text-white"
            }">
             All Trees
        </span>
    `;
  categorySection.appendChild(allTreesItem);

  // Add categories from API
  for (let category of categories) {
    const categoryItem = document.createElement("li");
    categoryItem.innerHTML = `
            <span data-id="${category.id}" onclick="handleCategoryClick('${category.id}')" 
                class="my-3 text-lg py-1 px-2 rounded-sm block cursor-pointer ${
                  activeCategoryId == category.id
                    ? "bg-green-600 text-white"
                    : "hover:bg-green-600 text-black hover:text-white"
                }">
                ${category.category_name}
            </span>
        `;
    categorySection.appendChild(categoryItem);
  }
};

// ==================== Handle Category Click ====================
const handleCategoryClick = (id) => {
  activeCategoryId = id; // update active category

  // Re-render categories with updated active
  loadCategories();

  // Load data
  if (id === "all") {
    loadCards();
  } else {
    loadCategoryData(id);
  }
};

// ==================== Load Category Data ====================
const loadCategoryData = (id) => {
  const section = document.getElementById("card-section");

  // Loader spanning all columns
  section.innerHTML = `
        <div class="col-span-full flex justify-center my-6">
            <span class="loading loading-dots loading-lg"></span>
        </div>
    `;

  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryData(data.plants))
    .catch((err) => console.error("Error loading category data:", err));
};

// ==================== Display Category Data ====================
const displayCategoryData = (plants) => {
  const section = document.getElementById("card-section");
  section.innerHTML = "";

  if (!plants || plants.length === 0) {
    section.innerHTML = `<p class="col-span-full text-center text-gray-500">No plants found in this category.</p>`;
    return;
  }

  for (let plant of plants) {
    let contentDiv = document.createElement("div");
    contentDiv.innerHTML = `
            <div class="p-4 rounded-xl shadow-2xl">
                <div class="mb-2">
                    <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded-lg">
                </div>
                <div>
                    <h3 class="text-lg font-bold">${plant.name}</h3>
                    <p class="text-sm text-gray-600 my-2">
                      ${plant.description.length > 80 ? plant.description.slice(0, 80) + "..." : plant.description}
                    </p>
                    <div class="flex items-center justify-between my-2">
                        <h5 class="rounded-lg py-1 px-2 text-sm text-[#15803D] bg-[#DCFCE7]">${plant.category}</h5>
                        <span class="font-semibold">৳${plant.price}</span>
                    </div>
                    <button onclick='addToCart(${JSON.stringify(
                      plant
                    )})' class="text-white py-2 w-full bg-[#15803D] rounded-full mt-2 hover:bg-green-600 cursor-pointer">Add To Cart</button>
                </div>
            </div>
        `;
    section.appendChild(contentDiv);
  }
};

// ==================== Load All Cards ====================
const loadCards = () => {
  const cardSection = document.getElementById("card-section");

  // Loader spanning all columns
  cardSection.innerHTML = `
        <div class="col-span-full flex justify-center my-6">
            <span class="loading loading-dots loading-lg"></span>
        </div>
    `;

  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => displayCards(data.plants))
    .catch((err) => console.error("Error loading cards:", err));
};

loadCards();

// ==================== Display All Cards ====================
const displayCards = (cards) => {
  const cardSection = document.getElementById("card-section");
  cardSection.innerHTML = "";

  if (!cards || cards.length === 0) {
    cardSection.innerHTML = `<p class="col-span-full text-center text-gray-500">No plants available.</p>`;
    return;
  }

  for (let card of cards) {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
            <div class="p-4 rounded-xl shadow-2xl">
                <div class="mb-2">
                    <img src="${card.image}" alt="${card.name}" class="w-full h-40 object-cover rounded-lg">
                </div>
                <div>
                    <h3 class="text-lg font-bold">${card.name}</h3>
                    <p class="text-sm text-gray-600 my-2">
                      ${card.description.length > 80 ? card.description.slice(0, 80) + "..." : card.description}
                    </p>
                    <div class="flex items-center justify-between my-2">
                        <h5 class="rounded-lg py-1 px-2 text-sm text-[#15803D] bg-[#DCFCE7]">${card.category}</h5>
                        <span class="font-semibold">৳${card.price}</span>
                    </div>
                    <button onclick='addToCart(${JSON.stringify(
                      card
                    )})' class="bg-[#15803D] rounded-full text-white py-2 w-full mt-2 hover:bg-green-600 cursor-pointer">Add To Cart</button>
                </div>
            </div>
        `;
    cardSection.appendChild(cardDiv);
  }
};

// ==================== Add To Cart ====================
const addToCart = (product) => {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  displayCart();
};

// ==================== Display Cart ====================
const displayCart = () => {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.classList = "flex justify-between items-center mb-2";

    li.innerHTML = `
      <div class="flex items-center justify-between py-2 px-3 rounded-sm shadow-sm bg-[#F0FDF4] w-full">
        <div class="flex flex-col ">
          <span class="font-medium text-gray-800">${item.name}</span>
          <span class="text-sm text-gray-600">৳${item.price} × ${item.quantity}</span>
        </div>
        <button onclick="removeFromCart(${index})" class="text-sm cursor-pointer">❌</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  // total section update
  cartTotal.innerText = `Total: ৳${total}`;
};

// ==================== Remove From Cart ====================
const removeFromCart = (index) => {
  cart.splice(index, 1);
  displayCart();
};
