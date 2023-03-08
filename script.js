
async function fetchProducts() {
    const response = await fetch("posters.json");
    let data = await response.json();

    return data;
}

async function renderProducts() {
    let smallContainer = document.querySelector(".small-posters__container");
    let bigContainer = document.querySelector(".big-posters__container");
    smallContainer.innerHTML = "";
    bigContainer.innerHTML = "";

    // Hämta datan
    let productList = await fetchProducts();

    productList.forEach(product => {
        let imgUrl = product.url;
        let title = product.title;
        let desc = product.description;
        let price = product.price;

        // Skapar kortet
        let articleCard = document.createElement("article");
            articleCard.innerHTML = `
                <img src="${imgUrl}" alt="Bild på ${title} produkt">
                <h3>${title}</h3>
                <p>${desc}</p>
                <button>Oh, take my money</button>
            `
        // Kollar om det är kampanj
        if (product.campaign === true) {
            bigContainer.appendChild(articleCard)
        } else {
            smallContainer.appendChild(articleCard);
        }
    })
}

renderProducts();

