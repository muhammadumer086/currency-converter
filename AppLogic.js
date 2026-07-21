

const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchangeMsg = document.querySelector(".exchangeMsg");

for (let select of dropdowns) {
    for (currCode in country) {
        let option =document.createElement("option");
     option.innerText = currCode;
        option.value = currCode;
         if (select.name === "from" && currCode === "USD") {
    option.selected = true;
} else if (select.name === "to" && currCode === "INR") {
    option.selected = true;
}
    select.append(option);

}

    select.addEventListener("change", (event) => {
    updateFlag(event.target);
    })
    }

 const updateFlag = (selectElement) => {
        let currencyCode = selectElement.value;
        let countrycode = country[currencyCode];
        let newFlagUrl = `https://flagsapi.com/${countrycode}/flat/64.png`;
        let flagImg = selectElement.parentElement.querySelector("img");
        flagImg.src = newFlagUrl;
    }
    
btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let amountVal = document.querySelector("form input").value;
    console.log(amountVal);
const fromCurrencyCode = fromCurrency.value;
const toCurrencyCode = toCurrency.value;
console.log(fromCurrencyCode, toCurrencyCode);
    if (amountVal === ""   ||amountVal <= 0) {
        alert("Please enter a valid amount");
        return;
    }
 const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyCode.toLowerCase()}.min.json`;
 console.log(URL);
 let response = await fetch(URL);
 let data = await response.json();
 
 let convertedAmount = data[fromCurrencyCode.toLowerCase()][toCurrencyCode.toLowerCase()] * amountVal;

 console.log(convertedAmount.toFixed(2));
 msg.innerText = `${amountVal} ${fromCurrencyCode} = ${convertedAmount.toFixed(2)} ${toCurrencyCode}`;
 exchangeMsg.innerText = `1 ${fromCurrencyCode} = ${data[fromCurrencyCode.toLowerCase()][toCurrencyCode.toLowerCase()].toFixed(4)} ${toCurrencyCode}`;
})    