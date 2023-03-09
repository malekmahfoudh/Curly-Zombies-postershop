let cartList = [];

let items = localStorage.getItem('cart');

for (let i = 0; i < items.length; i++) {
    if (items[i] !== ",") {
        cartList.push(items[i]);
    }
}

console.log(cartList);

let backBtn = document.querySelector('#backBtn');
backBtn.addEventListener('click', () => {
    localStorage.setItem('cart', cartList)
})

async function fetchProducts() {
    const response = await fetch("posters.json");
    let data = await response.json();

    return data;
}


async function addProductsToUI() {
    let data = await fetchProducts()

    cartList.forEach(item => {

        // För varje ID / produkt i carten
        // Rendera ut UI som matchar med dens ID från Databas
        
        data.forEach(product => {

            if (product.id == item) {
                let container = document.querySelector('.checkout-container__products')
                let imgUrl = product.url;
                let title = product.title;
                console.log(title, 'Titel funkar');
                let productContainer = document.createElement('article');
                productContainer.classList.add('checkout-container__product-item')
                productContainer.innerHTML = `
                    <img src="${imgUrl}" alt="Bild på ${title} produkt">
                    <section class="prod-info">
                        <h3>${title}</h3>
                        <button class="delete-btn">Ta bort från varukorg</button>
                    </section>
                `
                console.log(container,'Container here');
                container.appendChild(productContainer);



              

            }
        })
    })
}


addProductsToUI()


async function addProductsInfoToUI() {
    let data = await fetchProducts()
    // Product info
    let matches = 0;

    data.forEach(product => {
        console.log(product);
        cartList.forEach(item => {
            if (product.id == item) {
                matches++;
                let infoContainer = document.querySelector('.checkout-info');
                let preInfo = document.querySelector('.checkout-info__product-info')
                preInfo.innerHTML = "";

                let info = document.createElement('article');
                info.classList.add('checkout-info__product-info');
                info.innerHTML = `
                    <p>${product.title}</p>
                    <p>${matches}</p>
                    <p>${product.price}</p>
                ` 
                infoContainer.appendChild(info);
            }
        })
    })
   





  
}

addProductsInfoToUI()