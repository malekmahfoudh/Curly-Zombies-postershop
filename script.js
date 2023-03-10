
let cartList = [];

let items = localStorage.getItem('cart');
cartList = items.split(',');

console.log(cartList);

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
        articleCard.id = product.id;
        articleCard.innerHTML = `
            <img src="${imgUrl}" alt="Bild på ${title} produkt">
            <section class="prod-info">
            <h3>${title}</h3>
            <p>${desc}</p>
            <button>Oh, take my money</button>
            </section>
        `
        
        // Kollar om det är kampanj
        if (product.campaign === true) {
            bigContainer.appendChild(articleCard)
        } else {
            smallContainer.appendChild(articleCard);
        }
    })

    let allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            let chosenProductID = button.parentNode.parentNode.id;

            
            let targetProduct = productList.find(product => product.id == button.parentNode.parentNode.id);
            console.log(targetProduct);
            targetProduct.quantity += 1;

            addToCart(chosenProductID);
            console.log(cartList);
        })
    })

}

renderProducts();

function addToCart(item) {
    cartList.push(item);
}

let cartBtn = document.querySelector('#checkout-cart');
cartBtn.addEventListener('click', () => {
    localStorage.setItem('cart', cartList)
})

