document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("converter-form");
  const resultDiv = document.getElementById("result");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const amount = parseFloat(event.target.amount.value);
    const currency = event.target.currency.value;

    if (isNaN(amount) || amount <= 0) {
      resultDiv.textContent = "Please enter a valid amount";
      return;
    }

    loader.style.display = "block";
    resultDiv.textContent = "";

    try {
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`
      );
      const data = await response.json();
      const rate = data.rates[0].mid;
      const convertedAmount = (amount * rate).toFixed(2);
      resultDiv.textContent = `TO ${convertedAmount} PLN`;
    } catch (error) {
      resultDiv.textContent = "Error fetching exchange rate";
    } finally {
      loader.style.display = "none";
    }
  });
});
