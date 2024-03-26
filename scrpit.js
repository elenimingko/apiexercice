async function fetchData() {
  const urls = [
    "https://api.artic.edu/api/v1/artworks/129883",
    "https://api.artic.edu/api/v1/artworks/129884",
    "https://api.artic.edu/api/v1/artworks/129885",
  ];

  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)));

    if (!responses.every((response) => response.ok)) {
      throw new Error("Failed to fetch data");
    }

    const data = await Promise.all(
      responses.map((response) => response.json())
    );

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function display(data) {
  const container = document.getElementById("container");

  data.forEach((artwork) => {
    const div = document.createElement("div");
    div.classList.add("artwork");

    const title = document.createElement("h2");
    title.textContent = artwork.data.title;

    const description = document.createElement("p");
    description.textContent = artwork.data.description;

    const image = document.createElement("img");
    image.src = artwork.config.url;

    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(image);

    container.appendChild(div);
  });
}

fetchData()
  .then(display)
  .catch((error) => console.error("Error:", error));
