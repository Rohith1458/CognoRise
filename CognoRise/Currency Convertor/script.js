document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'e8323dac73d65ab51d8382c5';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amount = document.getElementById('amount');
    const convertButton = document.getElementById('convertButton');
    const result = document.getElementById('result');

    // Fetch the list of currencies and populate the select elements
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        });

    // Add event listener to the convert button
    convertButton.addEventListener('click', () => {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amountValue = amount.value;

        if (amountValue === '' || isNaN(amountValue)) {
            result.textContent = 'Please enter a valid amount';
            return;
        }

        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rate;
                if (rate) {
                    const convertedAmount = (amountValue * rate).toFixed(2);
                    result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
                } else {
                    result.textContent = 'Conversion rate not available';
                }
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
                result.textContent = 'Error fetching exchange rates';
            });
    });
});
