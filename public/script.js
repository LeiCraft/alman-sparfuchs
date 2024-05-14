// Function to generate random fluctuations in stock value
export function randomFluctuation(stability) {
    return Math.random() * (stability + stability) - stability;
}

// Function to update stock value and stability
export function updateStock(stock) {
    const currentPrice = stock.value;
    const fluctuation = randomFluctuation(stock.stability);
    const newValue = currentPrice + fluctuation;
    if (newValue < 0) {
        stock.value = 0.00;
    }
    document.getElementById(stock.id + '-value').textContent = newValue.toFixed(2);
}

export const stocks = [
    { id: 'stock1', name: "DAX", value: 100.00, stability: 3 },
    { id: 'stock2', name: "Stock 2", value: 100.00, stability: 5 },
    { id: 'stock3', name: "Stock 3", value: 100.00, stability: 7 }, 
    { id: 'stock4', name: "Stock 4", value: 100.00, stability: 9 }
];

stocks.forEach(stock => {
    document.getElementById("stockBody").innerHTML += `
        <tr id="${stock.id}">
            <td>${stock.name}</td>
            <td id="${stock.id}-value">${stock.value}</td>
            <td id="${stock.id}-stability">${stock.stability}</td>
        </tr>
    `;
});


// Function to update all stocks
document.getElementById("update-stocks-button").addEventListener("click", function(event) {
    stocks.forEach(stock => {
        updateStock(stock);
    });
});