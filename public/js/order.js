let order = {}

window.addEventListener('DOMContentLoaded', () => {
    const localStorage = window.localStorage.getItem('orderStorage');
    const localStorageIdEstablishment = localStorage ? Object.entries(JSON.parse(localStorage))[0][1]['idEstablishment'] : undefined;
    const idEstablishment = document.querySelector('.current-establishment-order') ? document.querySelector('.current-establishment-order').id : undefined;
    const btnCreateOrder = document.getElementById('createOrder');
    const idUser = document.querySelector('#order input[name="idUser"]');

    if (localStorage && localStorageIdEstablishment && idEstablishment && idEstablishment === localStorageIdEstablishment) {
        Object.entries(JSON.parse(localStorage)).forEach(values => {
            modifyDOMOrder(JSON.parse(localStorage), values[0]);
        })
    } else {
        if (idEstablishment) {
            window.localStorage.removeItem('orderStorage');
        }
    }
    if (btnCreateOrder) {
        btnCreateOrder.addEventListener('click', () => {
            if (idUser.value) {
                window.localStorage.removeItem('orderStorage');
            }
        })
    }
})

function incrementProduct({ id, name, price, photo, idEstablishment }) {
    const localStorage = window.localStorage.getItem('orderStorage');
    if (localStorage) {
        order = JSON.parse(localStorage);
    }

    const currentQuantity = order[id]?.quantity || 0;
    order[id] = { quantity: currentQuantity + 1, name, price, photo, idEstablishment };

    window.localStorage.removeItem('orderStorage');
    window.localStorage.setItem('orderStorage', JSON.stringify(order));
    modifyDOMOrder(order, id);
}

function decreasingProduct({ id, name, price, photo, idEstablishment }) {
    const localStorage = window.localStorage.getItem('orderStorage');
    if (localStorage) {
        order = JSON.parse(localStorage);
    }

    const currentQuantity = order[id]?.quantity || 0;
    order[id] = { quantity: currentQuantity - 1, name, price, photo, idEstablishment };

    if (currentQuantity <= 1) {
        delete order[id]
    }
    window.localStorage.removeItem('orderStorage');
    window.localStorage.setItem('orderStorage', JSON.stringify(order));
    modifyDOMOrder(order, id);
}

function modifyDOMOrder(order, id) {
    document.getElementById(id).innerText = order[id] ? order[id].quantity : 0;

    if(!order.length){
        document.querySelector(`#order span.total-order`).innerText = 0;
    }

    if (order[id]) {
        const total = Object.keys(order).reduce((total, product) => {
            total += order[product].quantity * order[product].price;
            return total;
        }, 0);
        document.querySelector(`#order span.total-order`).innerText = total.toFixed(2);
    }

    if (document.getElementById(`order-${id}`)) {
        if (order[id]) {
            document.querySelector(`#order-${id} .quantityProduct`).innerText = order[id].quantity;
            document.querySelector(`#order-${id} [name="quantity"]`).value = order[id].quantity;
        } else {
            document.querySelector('#order [name="productsSelected"]').value = parseInt(document.querySelector('#order [name="productsSelected"]').value) - 1;
            document.querySelector(`#order-${id}`).remove();
        }
    } else {
        if (order[id]) {
            let elementProduct = document.createElement('div');
            elementProduct.setAttribute('id', `order-${id}`);
            elementProduct.setAttribute('class', 'row mt-2 mb-2');

            let imgProduct = document.createElement('div');
            imgProduct.setAttribute('class', 'col-2');
            let showImg = document.createElement("img");
            showImg.setAttribute('class', 'w-100 h-100');
            showImg.src = order[id].photo;

            imgProduct.append(showImg);

            let inputProduct = document.createElement('div');
            inputProduct.setAttribute('class', 'col-4 d-flex justify-content-center align-items-center');
            let showProduct = document.createElement("p");
            showProduct.setAttribute('class', 'nameProduct custom-align-center');
            showProduct.innerText = order[id].name;

            let product = document.createElement("INPUT");
            product.setAttribute("type", "hidden");
            product.setAttribute("name", "product");
            product.value = id;
            inputProduct.append(showProduct, product);

            let inputQuantity = document.createElement('div');
            inputQuantity.setAttribute('class', 'col-3 d-flex justify-content-center align-items-center');
            let showQuantity = document.createElement("p");
            showQuantity.setAttribute('class', 'quantityProduct custom-align-center');
            showQuantity.innerText = order[id].quantity;

            let quantity = document.createElement("INPUT");
            quantity.setAttribute("type", "hidden");
            quantity.setAttribute("name", "quantity");
            quantity.value = order[id].quantity;
            inputQuantity.append(showQuantity, quantity);

            let inputPrice = document.createElement('div');
            inputPrice.setAttribute('class', 'col-3 d-flex justify-content-center align-items-center');
            let showPrice = document.createElement("p");
            showPrice.setAttribute('class', 'priceProduct custom-align-center custom-currency');
            let spanShowPrice = document.createElement('span');
            spanShowPrice.innerText = order[id].price;
            showPrice.append(spanShowPrice);

            let price = document.createElement("INPUT");
            price.setAttribute("type", "hidden");
            price.setAttribute("name", "unitPrice");
            price.value = order[id].price;
            inputPrice.append(showPrice, price);

            elementProduct.append(imgProduct, inputProduct, inputQuantity, inputPrice);
            document.querySelector('#order .descriptionProducts').append(elementProduct);
            document.querySelector('#order [name="productsSelected"]').value = parseInt(document.querySelector('#order [name="productsSelected"]').value) + 1;
        }
    }

    if (document.querySelector('#order .descriptionProducts').childNodes.length === 1){
        document.querySelector('#order button[type="submit"]').disabled = true;
    } else {
        document.querySelector('#order button[type="submit"]').disabled = false;
    }
}