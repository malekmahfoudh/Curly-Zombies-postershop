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

    for (let i = 0; i < data.length; i++) {
        // Här börjar Ninja

        for (let j = 0; j < cartList.length; j++) {
            if (data[i].id == cartList[j]) {
                let container = document.querySelector('.checkout-container__products')
                let imgUrl = data[i].url;
                let title = data[i].title;
                let productContainer = document.createElement('article');
                productContainer.classList.add('checkout-container__product-item')
                productContainer.innerHTML = `
                    <img src="${imgUrl}" alt="Bild på ${title} produkt">
                    <section class="prod-info">
                        <h3>${title}</h3>
                        <button class="delete-btn">Ta bort från varukorg</button>
                    </section>
                `
                container.appendChild(productContainer);


                // let infoContainer = document.querySelector('.berat-test');
                // let info = document.createElement('article');
                // info.classList.add('checkout-info__product-info');
                // info.classList.add(`${data[i].title}`);
                

                // info.innerHTML = `
                //     <p>${data[i].title}</p>
                //     <p>${matches}</p>
                //     <p>${data[i].price}</p>
                // ` 
                // infoContainer.appendChild(info);

                break;
            }
            
        }
        
    }
}


addProductsToUI()

// Kolla endast unik produkt en gång. Lägg till i lista.
// En lista/array med endast EN PRODUKT av varje ID. 
// Med den renderar vi ut endast "valda produkter".

// for (let i = 1; i <= data.length; i++) {
//     // Här börjar Ninja
//     for (let j = 0; j < cartList.length; j++) {

//         if (data[i] == cartList[j]) {
//             let container = document.querySelector('.checkout-container__products')
//             let imgUrl = product.url;
//             let title = product.title;
//             let productContainer = document.createElement('article');
//             productContainer.classList.add('checkout-container__product-item')
//             productContainer.innerHTML = `
//                 <img src="${imgUrl}" alt="Bild på ${title} produkt">
//                 <section class="prod-info">
//                     <h3>${title}</h3>
//                     <button class="delete-btn">Ta bort från varukorg</button>
//                 </section>
//             `
//             container.appendChild(productContainer);
//             break;
//         }
        
//     }
    
// }





async function addProductsInfoToUI() {
    let data = await fetchProducts()
    // Product info
    
    data.forEach(product => {
        let count = 0;

        for (let i = 0; i < cartList.length; i++) {

            if (product.id == cartList[i]) {
                let infoContainer = document.querySelector('.berat-test');
                // infoContainer.innerHTML = "";
                let info = document.createElement('article');
                info.classList.add('checkout-info__product-info');
                info.id =product.id;
                

                info.innerHTML = `
                    <p class="product-name">${product.title}</p>
                    <p class="product-amount">${product.quantity}</p>
                    <p class="product-price">${product.price}</p>
                ` 
                infoContainer.appendChild(info);
                break;
            }
            
        }
    })
}

// För varje produkt skapar vi ett count värde.
// Kolla igenom våran Cart lista.
// För varje träff, öka produktens count.
// Uppdatera Count till UI.
// När hela carten är slut, kör nästa produkt.


async function updateProductCount() {
    let data = await fetchProducts()
    // Product info
    
    data.forEach(product => {
        let count = 0;
        for (let i = 0; i < cartList.length; i++) {
            if (product.id == cartList[i]) {
                count++;
            }
        }
        
        if (document.getElementById(`${product.id}`)) {
            console.log(`${product.title} har ${count} st`);

            let target = document.getElementById(`${product.id}`)
            console.log(target,' TARGET');
            target.innerHTML = `
                    <p class="product-name">${product.title}</p>
                    <p class="product-amount">${count}</p>
                    <p class="product-price">${product.price * count}</p>
                ` 

        }
        // target.childNodes;
        // console.log(target2,' TARGET2222222 HERE');
        // let amount = target.nth-child(2);
        
        // amount.innerHTML = count;
    })
}


addProductsInfoToUI()
updateProductCount()