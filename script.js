const input = document.querySelector("#text");
const button = document.querySelector("#button");
const load_more = document.querySelector("#load_more");
const images_output = document.querySelector("#images_wrapper");
let page = "1";

button.addEventListener("click", giveValue);

function giveValue() {
  let query = input.value;
  giveQuery(query);
  query = "";
}

function giveQuery(query, page) {
  fetch(
    `https://api.unsplash.com/search/photos?client_id=MlTvzkhkT5qSUigXDJP1uOCbkDJaiikDxxmYz9ZIBK8&page=${page}&query=${query}`
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result.results);

      showImages(result.results);

      load_more.addEventListener("click", pageChange);
      function pageChange() {
        page += 1;
        giveQuery(input.value, page); // Fetch the next page with the updated page number and the same query
        showImages(result.results);
      }
    })

    .catch((error) => console.log(error));
}

function showImages(data) {
  images_output.innerText = "";

  data.forEach((element) => {
    const content = document.createElement("div");
    content.classList.add("container");
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.classList.add("image");
    img.src = element.urls.regular;

    const div2 = document.createElement("div");
    const para = document.createElement("p");
    para.innerText = element.alt_description;
    para.classList.add("para");

    div.append(img);
    div2.append(para);
    content.append(div, div2);
    images_output.append(content);
  });
}
