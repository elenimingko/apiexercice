const response = fetch("https://api.artic.edu/api/v1/artworks/129883");

const responseJson = response.then((res) => res.json());
responseJson.then((json) => console.log(json));
