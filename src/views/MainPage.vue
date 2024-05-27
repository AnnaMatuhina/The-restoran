<template>
    <div class="main-page">
        <img 
            src="@/assets/img/logo.svg" 
            alt="logo"
            class="logo"
        />

        <select class="dropdown" v-model="selectedCategory" id="fruitSelect" @change="handleCategoryChange">
            <option class="dropdown-option" v-for="category in this.productCategory" :key="category.id" :value="category.id">
                {{ category.categoryName }}
            </option>
        </select>

        <button id="basket" class="basket" @click="cangeCartStateBtn">
            <p id="item-count">{{ cartItems }}</p>
            <img id="basket-icon" src="@/assets/img/basket.svg" alt="basket">
        </button>

        <div class="menu">
            <div v-for="productItem in this.selectedProductList" :key="productItem.id">
                <div class="dish-card cereal">
                    <div class="dish-img">
                        <img :src="getImage(productItem.itemImagePath)">
                    </div>
                    <div class="dish-info">
                        <div class="main-dish-info">
                            <a class="open-info">
                                <h3>{{ productItem.itemName }}</h3>
                            </a>
                            <p class="price">{{ productItem.price }} ₽</p>
                        </div>
                    </div>
                    <button data-cart type="button" class="buy-dish" @click="addProductToCart(productItem)">
                        <h3>Добавить в корзину</h3>
                    </button>
                </div>
            </div>
        </div>

        <div class="modal" id="my-modal" v-show="cartState">
            <div class="modal_box">
                <button id="close-modal" class="close-modal-" @click="cangeCartStateBtn">
                    <img id="cross-icon" src="@/assets/img/cross.svg" alt="close-modal">
                </button>

                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Ваш заказ</h5>
                        <div class="container" v-if="letCartDisplaySelectedProductItems">
                            <div v-for="cartItem in this.cartProductList" :key="cartItem.id">
                                <div class="dish-info-in">
                                    <div class="main-dish-info-in">
                                        <a class="open-info-in possition">
                                            <h3>{{ cartItem.itemName }}</h3>
                                        </a>
                                        <p class="price-in possition">
                                            {{ cartItem.price }}
                                        </p>
                                        <img class="cart-delete-btn" src="@/assets/img/cross.svg" alt="close-modal" @click="deleteProductFromCart(cartItem)">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="lower-part" v-if="letCartDisplaySelectedProductItems">
                            <div class="result">
                                <div class="line"></div>
                                <div class = "flex">
                                    <a>
                                        <h3>ИТОГО</h3>
                                    </a> 
                                    <p>{{ cartSumm }}</p>
                                </div>
                            </div>
                            <button class="buy">Оформить заказ</button>
                        </div>
                        <div data-cart-empty class="alert alert-secondary" role="alert" v-if="!letCartDisplaySelectedProductItems">
                            Корзина пуста
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            productItems: [
                {
                    id: 1,
                    itemName: "Каша c ягодами",
                    itemImagePath: "img/cereal-1.png",
                    category: "cereal",
                    price: 225
                },
                {
                    id: 2,
                    itemName: "Каша с шоколадом",
                    itemImagePath: "img/cereal-2.png",
                    category: "cereal",
                    price: 150
                },
                {
                    id: 3,
                    itemName: "Коктель холодный Махито",
                    itemImagePath: "img/cocktail.png",
                    category: "cocktail",
                    price: 155
                },
                {
                    "id": 4,
                    "itemName": "Сок апельсиновый",
                    "itemImagePath": "img/juice.png",
                    "category": "juice",
                    "price": 99
                },
                {
                    "id": 5,
                    "itemName": "Стейк",
                    "itemImagePath": "img/meat-1.png",
                    "category": "meat",
                    "price": 369
                },
                {
                    "id": 6,
                    "itemName": "Курица в духовке",
                    "itemImagePath": "img/meat-2.png",
                    "category": "meat",
                    "price": 299
                },
                {
                    "id": 7,
                    "itemName": "Суп с морепродуктами",
                    "itemImagePath": "img/soup-1.png",
                    "category": "soup",
                    "price": 259
                },
                {
                    "id": 8,
                    "itemName": "Крем суп тыквенный",
                    "itemImagePath": "img/soup-2.png",
                    "category": "soup",
                    "price": 259
                },
                {
                    "id": 9,
                    "itemName": "Чай черный",
                    "itemImagePath": "img/tea.png",
                    "category": "tea",
                    "price": 99
                }
            ],
            productCategory: [
                {
                    id: 1,
                    categoryName: "Все",
                    categoryType: "all"
                },
                {
                    id: 2,
                    categoryName: "Мясо",
                    categoryType: "meat"
                },
                {
                    id: 3,
                    categoryName: "Соки",
                    categoryType: "juice"
                },
                {
                    id: 4,
                    categoryName: "Коктели",
                    categoryType: "cocktail"
                },
                {
                    id: 5,
                    categoryName: "Каши",
                    categoryType: "cereal"
                },
                {
                    id: 6,
                    categoryName: "Супы",
                    categoryType: "soup"
                },
                {
                    id: 7,
                    categoryName: "Чай",
                    categoryType: "tea"
                },
            ],
            selectedCategory: 1,
            selectedProductList: [],
            localStorageProductsKey: 'productItems',
            cartItems: null,
            cartState: false,
            cartProductList: [],
            cartSumm: null
        }
    },
    methods: {
        initializeSelectedProductList() {
            this.selectedProductList = this.productItems;
        },
        initializeCartProductList() {
            const storedArray = localStorage.getItem(this.localStorageProductsKey);

            if (storedArray !== null) {
                this.cartProductList = JSON.parse(storedArray);
            }
        },
        getImage(imagePath) {
            const imgUrl = new URL(`../assets/${imagePath}`, import.meta.url).href;
            return imgUrl;
        },
        handleCategoryChange() {
            this.filterProductItems(this.selectedCategory);
        },
        filterProductItems(filterItem) {
            switch(filterItem) {
                case 1:
                    this.selectedProductList = this.productItems;
                    break;
                default:
                    var selectedProductType = this.productCategory.find((elem) => elem.id == filterItem).categoryType;
                    this.selectedProductList = this.productItems.filter((product) => product.category == selectedProductType);
                    break;
            }
        },
        cangeCartStateBtn() {
            this.cartState = !this.cartState;
        },
        addProductToCart(productItem) {
            const storedArray = localStorage.getItem(this.localStorageProductsKey);
            let productArray = [];

            if (storedArray !== null) {
                productArray = JSON.parse(storedArray);
            }

            productArray.push(productItem);

            localStorage.setItem(this.localStorageProductsKey, JSON.stringify(productArray));

            this.updateCartItemsCount();
            this.updateCartProductList();
            this.updateCartSumm();
        },
        updateCartItemsCount() {
            const storedArray = localStorage.getItem(this.localStorageProductsKey);
            if (storedArray === null) {
                this.cartItems = 0;
            } else {
                this.cartItems = JSON.parse(storedArray).length;
            }
        },
        updateCartProductList() {
            const storedArray = localStorage.getItem(this.localStorageProductsKey);
            this.cartProductList = JSON.parse(storedArray);
        },
        updateCartSumm() {
            const storedArray = localStorage.getItem(this.localStorageProductsKey);
            const cartProductArray = JSON.parse(storedArray);
            let summ = 0;

            for (let i = 0; i < cartProductArray.length; i++) {
                summ += cartProductArray[i].price;
            }

            this.cartSumm = summ;
        },
        letCartDisplaySelectedProductItems() {
            if (this.cartItems > 0) {
                return true;
            } else {
                return false;
            }
        },
        deleteProductFromCart(cartItem) {
            const storedArray = localStorage.getItem(this.localStorageProductsKey);
            const cartArray = JSON.parse(storedArray);

            const index = cartArray.findIndex(item => item.id === cartItem.id && item.itemName === cartItem.itemName);

            if (index !== -1) {
                cartArray.splice(index, 1);
            }

            localStorage.setItem(this.localStorageProductsKey, JSON.stringify(cartArray));

            this.updateCartProductList();
            this.updateCartItemsCount();
            this.updateCartSumm();
        }
    },
    mounted() {
        this.initializeSelectedProductList();
        this.updateCartItemsCount();
        this.initializeCartProductList();
    },
}
</script>


<style scoped>
.dropdown {
    position: absolute;
    top: 334px;
    left: 40px;
    border: none;
    background-color: #F0F0F0;
    width: 261px;
    height: 59px;
    text-align: center;
    z-index: 3;
    font-family: 'Inter', sans-serif;
}

.dropdown-option {
    height: 59px;
    background-color: #F0F0F0;
}

body {
    font-family: 'Inter', sans-serif;
    padding: 0;
    margin: 0;
}

.main-page {
    justify-content: center;
}

.logo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 80px;
}

/*фильтр*/
#dropdown-list {
    position: absolute;
    top: 334px;
    left: 40px;
    width: 261px;
    height: 59px;
    background-color: #F0F0F0;
    border: none;
    text-align: center;
    z-index: 3;
}

#choose-template {
    cursor: pointer;
}

#text-container {
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

#list-container {
    text-align: center;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #F0F0F0;
    
}

#templates-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

#templates-list li {
    padding: 10px;
}

#templates-list li {
    text-decoration: none;
    color: black;
}


#templates-list li:hover {
    background-color: #FFF50F; 
}

#templates-list li:hover {
    color: black; 
}
/**/

.menu {
    background-color: #F0F0F0;
    padding-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 50px;

    margin-left: 30px;
    margin-right: 30px;

    position: relative;
    top: 420px;
    grid-template-columns: repeat(3, 1fr);
    display: flex;
    flex-wrap: wrap;
    gap: 20px; 
    z-index: 2;
}


/*карточка блюда*/
.dish-card {    
    width: 530px;
    height: 532px;
    background-color: #C7C7C7;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
}

.dish-img{
    height: 360px;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.dish-img img{
    width: 100%;
    object-fit: cover;
}

.dish-info{
    padding: 13.4px 34px 22.17px 23.2px;
}

.main-dish-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dish-card {
    position: relative;
    border-radius: 4px;
}

.dish-card button {
    width: 410px;
    height: 60px;
    padding: 10px;
    position: absolute;
    top: 437px;
    left: 70px;
}
.buy-dish{
    display: block;
    width: 348;
    height: 60px;
    margin-top: 10px;
    padding: 8px;
    background-color: #FFFFFF;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.buy-dish:hover {
    background-color: #FFF50F;
}

/*корзина*/
#basket {
    position: absolute;
    top: 333px;
    right: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
}

#item-count {
    font-size: 24px;
    font-weight: bold;
    margin-right: 10px;
}

#basket img {
    width: 50px;
    height: 50px;
    transition: transform 0.3s ease;
}

#basket:hover img {
    transform: scale(1.1);
}

/*модальное окно*/
.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: rgba(0, 0, 0, .3);
    display: grid;
    align-items:center;
    justify-content: center;
    overflow-y: auto;
    transition: opacity .4s, visibility .4s;
}

.modal_box {
    position: relative;
    width: 1388px;
    height: 726px;
    z-index: 4;
    background-color: #F0F0F0;
    margin: 30px 15px;
    box-shadow: 0px 0px 17px -7px rgba(34, 60, 80, 0.2);
}

.close-modal- {
    position: absolute;
    top: 30px;
    right: 30px;
    background: none;
    border: none;
    padding: 5px;

}
.close-modal-:hover img {
    transform: scale(1.1);
}

/*внутри корзины*/
.card-title {
    position: absolute;
    top: 20px;
    left: 80px;
    font-weight: 600;
    font-size: 22px;
}

[data-cart-empty] {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #8D8D8D;
    font-weight: 300;
}

/*плашка*/
.die {
    width: 1228px;
    height: 59px;
    background-color: #EAEAEA; 
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
}

.main-dish-info-in {
    background-color: #cacaca;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.open-info-in {
    width: 300px;
    margin-right: 850px;
}

.open-info-in h3 {
    margin: 15px;
}

.price-in {
    width: 60px;
    margin: 15px; 
}

/*итог*/
.line {
    width: 455px;
    height: 1px;
    background-color: #000000;
}


.lower-part {
    position: absolute;
    top: 612px; 
    left: 80px; 
    z-index: 8;
    display: flex; 
    justify-content: space-between;
}

.result {
    margin-right: 350px; 
}

.flex {
    display: flex;
    align-items: center;
    gap: 345px; 
}


.buy {
    background-color: #EAEAEA; 
    width: 395px; 
    height: 70px; 
    font-size: 22px; 
    text-align: center; 
    line-height: 70px; 
    border: none;
    cursor: pointer; 
}

.buy:hover {
    background-color: #FFF50F;
}

.container {
    overflow: auto;
    width: 1228px;
    height: 430px; 
    position: absolute;
    top: 117px;
    left: 80px;
    z-index: 8;
}

.cart-delete-btn {
    margin-right: 30px;
}

.cart-delete-btn:hover {
    transform: scale(1.1);
}
</style>