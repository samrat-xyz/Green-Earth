const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

loadCategories()

const displayCategories = (categoriesItem) => {
    console.log(categoriesItem) // দেখে নাও কী কী ডাটা আসছে
    let categorySection = document.getElementById('category-section')

    for (let category of categoriesItem) {
        let categoriyItems = document.createElement('li')
        categoriyItems.innerHTML = `
        
            <span class="my-3 text-lg py-1 px-2 hover:bg-green-600 text-black hover:text-white rounded-sm block">
                ${category.category_name}
            </span>
        `
        categorySection.appendChild(categoriyItems)
    }
}
