const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448';
const cartMessage = ['', '', ''];
const handleProductImage = (event) => {
    event.preventDefault();

    document.querySelectorAll('.thumbnail').forEach((ele) => {

        if (ele.classList.contains('thumbnail-design')) {
            ele.classList.remove('thumbnail-design');


        }
        if (event.target.src === ele.childNodes[1].src) {
            ele.classList.add('thumbnail-design');
        }



    });


    const productImageElement = document.querySelector('.product-image-img');
    productImageElement.src = event.target.src;
}
const render = (product) => {
    cartMessage[0] = product.title;
    cartMessage[1] = 'Yellow';
    cartMessage[2] = 'small';











    const productVendorElement = document.querySelector(".product-vendor");
    productVendorElement.innerText = 'Marmeto';

    const productTitleElement = document.querySelector('.product-title');
    productTitleElement.innerText = product.title;

    const priceElement = document.querySelector('.price');
    priceElement.innerText = product.price + '.00';
    const percentageOffElement = document.querySelector('.percentage-off');
    const percentageOff = Math.round(((Number(product.compare_at_price.slice(1)) - Number(product.price.slice(1))) / Number(product.compare_at_price.slice(1))) * 100);
    percentageOffElement.innerHTML = `<div>${percentageOff}&percnt; Off</div>`;

    const compareAtPriceElement = document.querySelector('.compare-at-price');
    compareAtPriceElement.innerText = product.compare_at_price + '.00';

    const colors = [...product.options[0].values];

    const colorsElement = document.querySelector('.colors');

    colors.forEach((colorObj) => {
        const colorElement = document.createElement('div');
        colorElement.style.height = '30px';
        colorElement.style.width = '30px';
        colorElement.style.backgroundColor = Object.values(colorObj)[0];
        colorElement.addEventListener('click', () => {
            // console.log(document.querySelectorAll('.colors'));
            document.querySelectorAll('.color').forEach((curColorEle) => {
                curColorEle.style.borderRadius = '0px';
            });


            cartMessage[1] = Object.keys(colorObj)[0];


            colorElement.style.borderRadius = '15px';
        });
        colorElement.classList.add('color');
        colorsElement.appendChild(colorElement);
    });


    const sizes = [...product.options[1].values];
    const sizesElement = document.querySelector('.sizes');

    sizes.forEach(size => {
        const sizeElement = document.createElement('div');

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'size'; // Set a common name for all radio buttons
        if (size === 'Small') {
            radioInput.checked = true;
            radioInput.style.accentColor = '#3A4980';

        }

        const label = document.createElement('label');

        label.setAttribute('for', size);
        label.textContent = size; // Set the label text content
        sizeElement.classList.add("sizelabel");
        sizeElement.appendChild(radioInput);
        sizeElement.appendChild(label);


        sizeElement.addEventListener('click', () => {
            document.querySelectorAll('.sizelabel').forEach((curSizeEle) => {
                if (curSizeEle.classList.contains("selected"))
                    curSizeEle.classList.remove("selected");
            })
            sizeElement.classList.add('selected');
            radioInput.checked = true;
            radioInput.style.accentColor = '#3A4980';
            cartMessage[2] = size;


        });
        label.style.marginLeft = '-6px';
        sizeElement.style.display = 'flex';
        sizeElement.style.alignItems = 'center';
        sizeElement.style.justifyContent = 'center';
        sizesElement.appendChild(sizeElement);

    });


    const descriptionElement = document.querySelector('.description');
    descriptionElement.innerHTML = product.description;



}
function decrementQuantity() {
    const quantityElement = document.querySelector('.quantity-value');
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
    }
}

function incrementQuantity() {
    const quantityElement = document.querySelector('.quantity-value');
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
}
const addToCart = () => {
    const messageElement = document.querySelector('.message');
    messageElement.style.opacity = 1;
    messageElement.innerText = `${cartMessage[0]} with color ${cartMessage[1]}  and ${cartMessage[2]} added to cart`;
}
const fetchApi = async (apiUrl) => {
    const response = await fetch(apiUrl);
    const products = await response.json();
    const product = products.product;

    render(product);
}

fetchApi(apiUrl);
