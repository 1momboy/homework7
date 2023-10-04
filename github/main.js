document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('search-input').value;
    fetch(`https://api.github.com/search/repositories?q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            let resultsHTML = '<h2>Search Results:</h2>';
            if (data && data.items) {
                data.items.forEach(repo => {
                    resultsHTML += `
                        <div class="repo">
                            <h3><a href="${repo.html_url}">${repo.name}</a></h3>
                            <p>${repo.description}</p>
                            <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                            <p><strong>Forks:</strong> ${repo.forks_count}</p>
                        </div>
                    `;
                });
            } else {
                resultsHTML += '<p>No results found.</p>';
            }
            document.getElementById('results').innerHTML = resultsHTML;
        })
        
        .catch(error => console.log('Error:', error));
});