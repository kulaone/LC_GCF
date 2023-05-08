const form = document.getElementById('translation-form');
const englishText = document.getElementById('english-text');
const translatedText = document.getElementById('translated-text');

const backendUrl = '<YOUR_ENDPOINT_URL_HERE>';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({translate: englishText.value})
    });
    const chatResponse = await response.json();
    const translatedMessage = chatResponse.text;
    translatedText.textContent = translatedMessage;
});
