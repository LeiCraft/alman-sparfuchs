//@ts-ignore
import Stock from "./stocks/stock.js";
import StockChart from "./stocks/stockChart.js";

class Game {

    public static stocks: Stock[] = [];

    private static initalized: boolean = false;

    public static init() {
        if (this.initalized) return;
        this.initalized = true;

		StockChart.init();

        StockChart.addRound();

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

        this.loadCookie();

        StockChart.chart.update();
    }

    public static nextRound(save = true) {
        StockChart.addRound();
        for (const stock of this.stocks) {
            const newPrice = stock.calculateNextPrice();
            StockChart.addData(stock.index, newPrice);
        }
        StockChart.chart.update();
        if (save) this.saveCookie();
    }

    public static loadCookie() {
        for (const stock of this.stocks) {
            console.log(stock.index)
            const cookieString = document.cookie
                .split('; ')
                .find((row) => row.startsWith(`stock_history_${stock.index}=`));
            
            if (cookieString) {
                const serializedArray = decodeURIComponent(cookieString.split('=')[1]);
                stock.history = JSON.parse(serializedArray);
                stock.price = stock.history[stock.history.length - 1];
                stock.setShowPrice(stock.price);
                StockChart.clearData(stock.index);
                for (const item of stock.history) {
                    StockChart.addData(stock.index, item);
                }
            } else {
                return;
            }
        }
        for (let i = 0; i < this.stocks[0].history.length - 1; i++) {
            StockChart.addRound();
        }
    }

    public static saveCookie() {
        for (const stock of this.stocks) {
            const serializedArray = JSON.stringify(stock.history);
            document.cookie = `stock_history_${stock.index}=${encodeURIComponent(serializedArray)}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        }
    }

    public static deleteCookie() {
        for (const stock of this.stocks) {
            document.cookie = `stock_history_${stock.index}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }
    }

    public static resetGame() {
        for (const stock of this.stocks) {
            stock.price = 100;
            stock.history = [100];
            StockChart.clearData(stock.index);
            StockChart.addData(stock.index, 100);
            stock.setShowPrice(100);
        }
        StockChart.chart.update();
    }

}

// @ts-ignore
globalThis.game = Game;

export default Game;