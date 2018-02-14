const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;


form.addEventListener('submit',function (e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  let uri = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=45648ce845bb4678ba50c7ec3edb0ec7`;
  fetch(uri)
     .then(function(response){
         console.log(response);
         return response.json();
         getJson();
     }).then(function(data){
      addNews(data);
    })
     .catch(function(){
      handleError()
     }) 
  
});

function getJson() {
  const data = JSON.parse(this.responseText);
  addNews(data)
}

function handleError(){
  console.log('se ha presentado un error');
}

function addNews(data){
  const articles = data.response.docs;
  console.log(articles);

  articles.forEach(function(news) {
    console.log(news);
    let title = news.headline.main; 
    console.log(title);
    let snippet = news.snippet;
    let url = news.web_url;
    console.log(url);
    
  let link = document.createElement('a');
  link.setAttribute("href", url);
  link.setAttribute("target","_blank");
  link.classList.add('link');
  let ul = document.createElement('ul');
  ul.classList.add('news');
  let liTitle = document.createElement('li');
  liTitle.classList.add('title');
  let liContent = document.createElement('li');
  liTitle.innerText = title;
  liContent.innerText = snippet;
  link.appendChild(ul);
  ul.appendChild(liTitle);
  ul.appendChild(liContent);
  responseContainer.appendChild(link);
});

}
