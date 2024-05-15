
document.addEventListener("DOMContentLoaded", function() {
    var chooseTemplate = document.getElementById("choose-template");
    var listContainer = document.getElementById("list-container");

    chooseTemplate.addEventListener("click", function() {
        listContainer.style.display = (listContainer.style.display === "block") ? "none" : "block";
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const listItems = document.querySelectorAll('#templates-list li');
    const cards = document.querySelectorAll('.dish-card');

    listItems.forEach(item => {
        item.addEventListener('click', function () {
            const category = this.getAttribute('data-id');
            filterCards(category);
        });
    });

    function filterCards(category) {
        cards.forEach(card => {
            if (category === 'all' || card.classList.contains(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const basketIcon = document.getElementById('basket-icon');
    
    document.getElementById('basket').addEventListener('mouseover', function () {
        basketIcon.src = 'img/basket_hover.svg';
    });

    document.getElementById('basket').addEventListener('mouseout', function () {
        basketIcon.src = 'img/basket.svg';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const basketIcon = document.getElementById('cross-icon');
    
    document.getElementById('close-modal').addEventListener('mouseover', function () {
        basketIcon.src = 'img/cross_hover.svg';
    });

    document.getElementById('close-modal').addEventListener('mouseout', function () {
        basketIcon.src = 'img/cross.svg';
    });
});

document.getElementById('basket').addEventListener("click", function() {
    document.getElementById('my-modal').classList.add('open')
})


document.getElementById('close-modal').addEventListener("click", function() {
    document.getElementById('my-modal').classList.remove('open')
})


window.addEventListener('keydown', (e)=>{
    if (e.key == "Escape") {
        document.getElementById("my-modal").classList.remove("open")
    }
})

document.querySelector("#my-modal .modal_box").addEventListener('click', event=>{
    event._isClickWithInModal = true;
})
document.getElementById('my-modal').addEventListener('click', event=>{
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});


document.addEventListener('DOMContentLoaded', () => {
 
    const addToCartButtons = document.querySelectorAll('.buy-dish');

    const itemCount = document.getElementById('item-count');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {

            itemCount.textContent = parseInt(itemCount.textContent) + 1;
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {

    const addToCartButtons = document.querySelectorAll('[data-cart]');


    let verticalMargin = 0;

    let isFirstItemAdded = false;


    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
  
            const dishCard = button.closest('.dish-card');

            const dishName = dishCard.querySelector('h3').textContent;
            const dishPrice = dishCard.querySelector('.price').textContent;

            const cartItem = document.createElement('div');
            cartItem.classList.add('die');
            cartItem.style.marginTop = verticalMargin + 'px';

            cartItem.innerHTML = `
                <div class="dish-info-in">
                    <div class="main-dish-info-in">
                        <a class="open-info-in possition"><h3>${dishName}</h3></a>
                        <p class="price-in possition">${dishPrice}</p>
                    </div>
                </div>
            `;

            const cartContainer = document.querySelector('.modal_box .container');
            const cartContainerLow = document.querySelector('.modal_box .card-body')

            cartContainer.appendChild(cartItem);

            if (!isFirstItemAdded) {
                const lowerPart = document.createElement('div');
                lowerPart.classList.add('lower-part');
                lowerPart.innerHTML = `
                    <div class="result">
                        <div class="line"></div>
                        <div class = "flex">
                            <a><h3>ИТОГО</h3></a> 
                            <p>${dishPrice}</p>
                        </div>
                    </div>
                    <button class="buy">Оформить заказ</button>
                `;
                cartContainerLow.appendChild(lowerPart);
                isFirstItemAdded = true;
            } else {
         
                const totalPriceElement = document.querySelector('.result p');
                const currentPrice = parseFloat(totalPriceElement.textContent.replace('₽', ''));
                const newPrice = currentPrice + parseFloat(dishPrice);
                totalPriceElement.textContent = newPrice + ' ₽';
            }


            const cartEmptyMessage = document.querySelector('[data-cart-empty]');
            if (cartEmptyMessage) {

                cartEmptyMessage.style.display = 'none';
            }

            verticalMargin += 80;

        });
    });
});





