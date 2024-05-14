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
            new Stock(
                "LeiCoin",
                100,
                {high: 5, low: 2},
                "rgb(0, 255, 255)"
            ),
            new Stock(
                "DAX",
                100,
                {high: 7, low: 4.25},
                "rgb(255, 255, 0)"
            ),
            new Stock(
                "Nvida",
                100,
                {high: 9, low: 6.25},
                "rgb(0, 255, 0)"
            ),
            new Stock(
                "Tesla",
                100,
                {high: 13, low: 10.5},
                "rgb(255, 0, 0)"
            ),
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