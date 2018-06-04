let deck = {
    suits:["hearts","spades","clubs","diamonds"],
    carts:Array(52),
    createCardPicker:function(){
        return function(){
            let pickedCard = Math.floor(Math.random()*52);
            let pickedSuit = Math.floor(pickedCard/13);
            return {
                suit:this.suits[pickedSuit],
                card:pickedCard%13
            }
        }
    }
}
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);



let deck = {
    suits:["hearts","spades","clubs","diamonds"],
    carts:Array(52),
    createCardPicker:function(){
        let obj = this;
        return function(){
            let pickedCard = Math.floor(Math.random()*52);
            let pickedSuit = Math.floor(pickedCard/13);
            return {
                suit:obj.suits[pickedSuit],
                card:pickedCard%13
            }
        }
    }
}
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);