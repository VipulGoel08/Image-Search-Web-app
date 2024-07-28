const accessKey = "EiNdBfHt9sA6GIIAEStHV5OMc_sfpIrY7A7biN3_cqY";

const formEl = document.getElementById("form-element");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("showmore-btn");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Check if data.results is defined
        if (!data.results) {
            throw new Error("Unexpected response structure");
        }

        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }


        results.forEach((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('search-result');
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        if (page > 1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
})