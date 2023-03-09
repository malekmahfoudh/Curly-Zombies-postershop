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
    let container = document.querySelector('.checkout-container__products')
    container.innerHTML = "";

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
                productContainer.id = `${data[i].id}`
                productContainer.innerHTML = `
                    <img src="${imgUrl}" alt="Bild på ${title} produkt">
                    <section class="prod-info">
                        <h3>${title}</h3>
                        <button class="delete-btn">Ta bort från varukorg</button>
                    </section>
                `
                container.appendChild(productContainer);

                break;
            }
            
        }
        
    }

    let deleteBtnList = document.querySelectorAll('.delete-btn')
    deleteBtnList.forEach(btn => {
        btn.addEventListener('click', () => {

            let index = cartList.indexOf(btn.parentNode.parentNode.id);
            cartList.splice(index, 1);
            addProductsToUI()
            addProductsInfoToUI()
            updateProductCount()

        })
    })
}


async function addProductsInfoToUI() {
    let infoContainer = document.querySelector('.berat-test');
    infoContainer.innerHTML = "";
    let data = await fetchProducts()
    // Product info
    
    data.forEach(product => {
        
        for (let i = 0; i < cartList.length; i++) {
            
            if (product.id == cartList[i]) {
                let infoContainer = document.querySelector('.berat-test');
                // infoContainer.innerHTML = "";
                let info = document.createElement('article');
                info.classList.add('checkout-info__product-info');
                info.id = product.title;
                
                
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
            
            let target = document.getElementById(`${product.title}`)
            console.log(target,' TARGET');
            target.innerHTML = `
            <p class="product-name">${product.title}</p>
            <p class="product-amount">${count}</p>
            <p class="product-price">${product.price * count}</p>
            ` 
            
        }
    })
}




addProductsToUI()
addProductsInfoToUI()
updateProductCount()