//@ts-ignore
import Stock from "./stocks/stock.js";
import StockChart from "./stocks/stockChart.js";

class Game {

    public static stocks: Stock[] = [];

    private static initalized: boolean = false;

    public static init() {
        if (this.initalized) return;
        this.initalized = true;

        this.stocks.push(
            new Stock("DAX", 100, 3, "rgb(255, 255, 0)"),
            new Stock("Nvida", 100, 5, "rgb(0, 255, 0)"),
            new Stock("Tesla", 100, 7, "rgb(255, 0, 0)"),
            new Stock("LeiCoin", 100, 9, "rgb(0, 255, 255)")
        );

        StockChart.chart.update();
    }

    public static nextRound() {
        StockChart.addRound();
        for (const stock of this.stocks) {
            const newPrice = stock.calculateNextPrice();
            StockChart.addData(stock.index, newPrice);
        }
        StockChart.chart.update();
    }

}

// @ts-ignore
globalThis.game = Game;

export default Game;