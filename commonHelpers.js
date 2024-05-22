import{a as g,S as b,i as d}from"./assets/vendor-eded45c0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))h(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&h(f)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const p=t=>t.map(e=>`<div class="js-section-images">
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
    </div>`).join(""),m=15,j="43826847-f350fa9fd32410ec3fefedfc5";g.defaults.baseURL="https://pixabay.com/api/";const y=async(t="flowers",e=1)=>await g("",{params:{...{key:j,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:m,page:e}}}),L=new b(".gallery a",{captionsData:"alt",captionDelay:250}),i=document.querySelector(".js-gallery"),w=document.querySelector(".form-field"),c=document.querySelector(".loader"),r=document.querySelector(".js-load-btn");let u="",l=1,n=0;r.classList.add("d-none");async function C(t){if(t.preventDefault(),l=1,r.classList.add("d-none"),u=t.target.elements.searchKeyword.value.trim(),u===""){i.innerHTML="",d.error({timeout:2e3,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#d37a7a",close:!1,closeOnClick:!0}),t.target.reset();return}i.innerHTML="",c.classList.remove("is-hidden");try{const{totalHits:e,data:a}=await y(u,l);if(a.hits.length===0){c.classList.add("is-hidden"),d.error({timeout:2e3,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#d37a7a",close:!1,closeOnClick:!0}),t.target.reset();return}i.insertAdjacentHTML("beforeend",p(a.hits)),n=Math.ceil(a.totalHits/m),n>1&&r.classList.remove("d-none"),L.refresh(),l>=n&&(r.classList.add("d-none"),d.error({timeout:5e3,position:"topRight",message:"We're sorry, but you've reached the end of search results.",messageColor:"#fff",backgroundColor:"#d37a7a",close:!1,closeOnClick:!0}))}catch(e){console.log(e)}t.target.reset(),c.classList.add("is-hidden")}const v=()=>{const e=i.querySelector(".js-section-images:last-child").getBoundingClientRect().height*2;window.scrollBy({top:e,left:0,behavior:"smooth"})};async function P(t){try{l+=1,r.classList.add("d-none"),c.classList.remove("is-hidden");const{data:e,totalHits:a}=await y(u,l);i.insertAdjacentHTML("beforeend",p(e.hits)),L.refresh(),v(),n=Math.ceil(e.totalHits/m),n>1&&r.classList.remove("d-none"),c.classList.add("is-hidden"),l>=n&&(r.classList.add("d-none"),d.error({timeout:5e3,position:"topRight",message:"We're sorry, but you've reached the end of search results.",messageColor:"#fff",backgroundColor:"#d37a7a",close:!1,closeOnClick:!0}))}catch(e){console.log(e)}}w.addEventListener("submit",C);r.addEventListener("click",P);
//# sourceMappingURL=commonHelpers.js.map
