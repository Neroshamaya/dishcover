

// With Thens

/* fetch('http://localhost:3000/products').then(response => {
  if(response.ok){
    response.json().then((jsonResponse) => {
      console.log(jsonResponse)
    })
  } else {
    console.log('erreur')
  }
})
 */

// With async function

async function getProducts() {
    // https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
    const fetchPromise = fetch('/products')

    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await
    const fetchResponse = await fetchPromise
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
    if (fetchResponse.ok == true) {
        const products = await fetchResponse.json()
        console.log(products)
        var productDiv = document.getElementById('products')
        productDiv.innerHTML = '<h1>Products</h1>'
        products.forEach((category) => {
            console.log(document)
            const categoryTitleH2Element = document.createElement('h2')
            categoryTitleH2Element.innerHTML = category.title
            categoryTitleH2Element.className = 'title-products'

            productDiv.appendChild(categoryTitleH2Element)


            const productList = document.createElement('div')
            productList.className = 'product'


            category.products.forEach((product, productIndex) => {
                const productListItem = document.createElement('div')
                productListItem.className = 'product-list-item'

                const productItem = document.createElement('div')
                productItem.className = 'product-card'

                const productItemImage = document.createElement('img')
                productItemImage.setAttribute('src', `${product.image}?lock=${productIndex}`)
                productItem.appendChild(productItemImage)

                const productItemTitle = document.createElement('h3')
                productItemTitle.innerHTML = product.title
                productItem.appendChild(productItemTitle)

                let productItemDescription = document.createElement('div')
                productItemDescription.classList.add('product-description')
                productItemDescription.innerHTML = product.description
                productItem.appendChild(productItemDescription)
                /*         productItemDescription.innerHTML = product.description
                productItem.appendChild(productItemDescription) */

                const productItemPrice = document.createElement('div')
                productItemPrice.classList.add('product-price')
                productItemPrice.innerHTML = `${product.price} €`
                productItem.appendChild(productItemPrice)
                /*         productItemPrice.innerHTML = `${product.price} €`
                productItem.appendChild(productItemPrice) */


                productListItem.appendChild(productItem)
                productList.appendChild(productListItem)
            })
            productDiv.appendChild(productList)
        })
    }
}

getProducts()
