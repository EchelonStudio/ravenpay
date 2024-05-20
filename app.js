async function fetchCryptoData() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30');
    const data = await response.json();

    // Assuming that data.prices contains the data in the format [timestamp, price]
    // Here we just mock the open, high, low, close prices for demonstration purposes
    return data.prices.map((price, index) => {
        return {
            x: price[0],
            o: price[1], // Open price (mocked as price for simplicity)
            h: price[1] * 1.1, // High price (mocked)
            l: price[1] * 0.9, // Low price (mocked)
            c: price[1] // Close price (mocked as price for simplicity)
        };
    });
}

async function renderChart() {
    const ctx = document.getElementById('chart');
    const prices = await fetchCryptoData();

    new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: 'Bitcoin Price',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            }
        }
    });
}

renderChart();
