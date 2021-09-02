// Function for loading data
const searchBooks = () =>{
    const searchItem = document.getElementById('search-items');
    const searchText = searchItem.value;
    
    // Clear data
    searchItem.value = '';

    if(searchText === ''){
        alert("Please type your desired books name!");
    }
    
    // Load data
    else{
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));
    }
}

// Function for displaying search result
const displayBooks = data =>{
    //Picking total search results numbers
    const totalDocs = data.numFound;

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // Showing Total search results numbers
    const searchResultNumber = document.getElementById('search-items-number');
    searchResultNumber.innerHTML = `
    <h4 class="search-result-number p-2 w-50 mx-auto text-center"><i class="fas fa-search"></i> Search Result Found ${totalDocs === 0 ? 'no' : totalDocs} Items</h4>
    `;

    // Showing Books items
    const docs = data.docs;
    docs.forEach(doc =>{
        const div = document.createElement('div');
        div.classList.add('col');

        const imgThumb = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;

        // Adding items into the div
        div.innerHTML = `
        <div class="card h-100 p-2 books-card">
            <img src="${imgThumb}" class="card-img-top" height="400px" alt="...">
            <div class="card-body">
                <h3 class="card-title">${doc.title}</h3>
                <p class="card-text text-primary fw-bold"><span class="text-dark fw-bold">Author Name: </span>${doc.author_name === undefined ? 'Not available' : doc.author_name[0]}</p>
                <p class="card-text text-danger"><span class="text-dark fw-bold">Publishers: </span>${doc.publisher === undefined ? 'Not available' : doc.publisher[0]}</p>
            </div>
            <div class="card-footer bg-dark">
                <small class="text-warning"><span class="text-white fw-bold">First Published:</span> ${doc.first_publish_year === undefined ? 'Not available' : doc.first_publish_year }</small>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
}