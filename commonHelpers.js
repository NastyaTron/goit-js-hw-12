import{a as p,i as m,S as b}from"./assets/vendor-eded45c0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))h(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&h(u)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function h(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const g=t=>t.map(e=>`<div class="js-section-images">
        <a href="${e.largeImageURL}">
        <img
          src="${e.webformatURL}"
          alt="${e.tags}"
          class="js-gallery-img"
        /></a>
        <div class="js-group-text">
          <small class="js-text"
            >Likes <span class="js-span-text">${e.likes}</span></small
          >
          <small class="js-text"
            >Views <span class="js-span-text">${e.views}</span></small
          >
          <small class="js-text"
            >Comments <span class="js-span-text">${e.comments}</span></small
          >
          <small class="js-text"
            >Downloads
            <span class="js-span-text">${e.downloads}</span></small
          >
        </div>
    </div>`).join(""),f=15,j="43826847-f350fa9fd32410ec3fefedfc5";p.defaults.baseURL="https://pixabay.com/api/";const y=async(t="flowers",e=1)=>await p("",{params:{...{key:j,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:f,page:e}}}),l=document.querySelector(".js-gallery"),v=document.querySelector(".form-field"),d=document.querySelector(".loader"),o=document.querySelector(".js-load-btn");let i=1,c="",n=0;o.classList.add("d-none");v.addEventListener("submit",w);async function w(t){if(t.preventDefault(),c=t.target.elements.searchKeyword.value.trim(),c===""){l.innerHTML="",t.target.reset(),o.classList.add("d-none"),m.error({timeout:2e3,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#d37a7a",close:!1,closeOnClick:!0});return}l.innerHTML="",d.classList.remove("is-hidden");try{const{totalHits:e,data:r}=await y(c,i);r.hits.length===0&&(o.classList.add("d-none"),m.error({timeout:2e3,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#d37a7a",close:!1,closeOnClick:!0})),l.insertAdjacentHTML("beforeend",g(r.hits)),n=Math.ceil(r.totalHits/f),n>1&&o.classList.remove("d-none"),new b(".gallery a",{captionsData:"alt",captionDelay:250})}catch(e){console.log(e)}t.target.reset(),d.classList.add("is-hidden")}const E=()=>{const e=l.querySelector(".js-section-images:last-child").getBoundingClientRect().height*2;window.scrollBy({top:e,left:0,behavior:"smooth"})};o.addEventListener("click",L);async function L(t){i+=1,o.classList.add("d-none"),d.classList.remove("is-hidden");const{data:e}=await y(c,i);l.insertAdjacentHTML("beforeend",g(e.hits)),E(),n=Math.ceil(e.totalHits/f),n>1&&o.classList.remove("d-none"),d.classList.add("is-hidden"),i>n&&(o.classList.add("d-none"),o.removeEventListener("click",L),m.error({timeout:2e3,position:"topRight",message:"We're sorry, but you've reached the end of search results.",messageColor:"#fff",backgroundColor:"#d37a7a",close:!1,closeOnClick:!0}))}
//# sourceMappingURL=commonHelpers.js.map
