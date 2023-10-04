document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('search-input').value;
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json`)
        .then(response => response.json())
        .then(data => {
            let resultsHTML = '<h2>Search Results:</h2>';
            data.query.search.forEach(result => {
                resultsHTML += `
                    <div class="result">
                        <h3><a href="https://en.wikipedia.org/?curid=${result.pageid}">${result.title}</a></h3>
                        <p>${result.snippet}</p>
                    </div>
                `;
            });
            document.getElementById('results').innerHTML = resultsHTML;
        })
        .catch(error => console.error('Error:', error));
});
