import StockChart from "./stockChart";


class Stock {

    public readonly name: string;
    public price: number;
    public readonly stability: number;
    public readonly history: number[] = [];
    public readonly color: string;

    public readonly index: number;

    constructor(name: string, defaultPrice: number, stability: number, color: string) {
        this.name = name;
        this.price = defaultPrice;
        this.stability = stability;
        this.color = color;
        this.history.push(this.price);

        this.index = StockChart.addStock(this);
    }

    public calculateNextPrice() {
        const fluctuation = Math.round((Math.random() * (this.stability + this.stability) - this.stability) * 100) / 100;
        const newPrice = this.price + fluctuation;
        if (newPrice < 0) {
            this.price = 0.00;
        } else {
            this.price = newPrice;
        }
        this.history.push(this.price);
        return this.price;
    }

}

export default Stock;