import StockChart from "./stockChart";

interface StockStability {
    high: number;
    low: number;
}

class StockUtils {

    static roundToTwo(input: number) {
        input = Math.round(parseFloat(input.toString() + "e2"));
        return Number(input.toString() + "e-2");
    }

}

class Stock {

    public readonly name: string;
    public price: number;
    public readonly stability: StockStability;
    public history: number[] = [];
    public readonly color: string;

    public readonly index: number;

    constructor(name: string, defaultPrice: number, stability: StockStability, color: string) {
        this.name = name;
        this.price = defaultPrice;
        this.stability = stability;
        this.color = color;
        this.history.push(this.price);

        this.index = StockChart.addStock(this);

        (document.getElementById("current-prices") as HTMLElement).innerHTML += `
            <div id="stock-price-${this.index}" class="stock-price h4 me-3">
                ${name}: <span class="stock-price-value">100</span>€
            </div>
        `;
    }

    public calculateNextPrice() {
        const fluctuation = Math.random() * (this.stability.high + this.stability.high) - this.stability.low;
        const newPrice = StockUtils.roundToTwo(this.price + fluctuation);
        if (newPrice < 0) {
            this.price = 0.00;
        } else {
            this.price = newPrice;  
        }
        this.history.push(this.price);
        (document.getElementById(`stock-price-${this.index}`)?.querySelector(".stock-price-value") as HTMLElement).innerText = newPrice.toString();
        return this.price;
    }

}

export default Stock;
