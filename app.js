const url="https://newsapi.org/v2/everything?q=";
const API_KEY= "876e87e160e241bd90f408b999da18ea";


window.addEventListener("load", ()=>{fetchNews("India")});
function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardscontainer= document.getElementById("cards-container");
    const newscardstem= document.getElementById("template-news-cards");
    cardscontainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone= newscardstem.content.cloneNode(true);
        fillDatainCard(cardclone , article);
        cardscontainer.appendChild(cardclone);
    });
}

function fillDatainCard(cardclone, article){
    const newsImg= cardclone.querySelector('#new-img');
    const newstitle= cardclone.querySelector('#news-title');
    const newssource= cardclone.querySelector('#news-source');
    const newsdesc= cardclone.querySelector('#news-desc');

    newsImg.src= article.urlToImage;
    newsdesc.innerHTML=article.description;
    newstitle.innerHTML=article.title;

    const data = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newssource.innerHTML=`${article.source.name} - ${data}`;

    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}
let curselect = null;
function onNavItemClick(id){
    fetchNews(id);
    const navitem= document.getElementById(id);
    curselect?.classList.remove('active');
    curselect= navitem;
    curselect.classList.add('active');
};

const searchinp= document.getElementById("news-input");
const searchbtn= document.getElementById('search');

searchbtn.addEventListener("click",()=>{
    const query= searchinp.value;
    if(!query) return;
    fetchNews(query);
    curselect?.classList.remove('active');
    curselect=null;
});

const totop=document.querySelector(".to-top");
window.addEventListener("scroll",()=>{
    if(window.pageYOffset > 100){
        totop.classList.add("active");
    } else {
        totop.classList.remove("active");
    }
})

