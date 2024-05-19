import{a as h,i as p,S as L}from"./assets/vendor-eded45c0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&f(d)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function f(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const y=a=>a.map(e=>`<div class="js-section-images">
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
    </div>`).join(""),m=15,j="43826847-f350fa9fd32410ec3fefedfc5";h.defaults.baseURL="https://pixabay.com/api/";const g=async(a="flowers",e=1)=>await h("",{params:{...{key:j,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:m,page:e}}}),o=document.querySelector(".js-gallery"),b=document.querySelector(".form-field"),l=document.querySelector(".loader"),i=document.querySelector(".js-load-btn");let u=1,n="",c=0;b.addEventListener("submit",P);async function P(a){if(a.preventDefault(),n=a.target.elements.searchKeyword.value.trim(),n===""){o.innerHTML="",a.target.reset(),p.error({timeout:2e3,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#d37a7a",close:!1,closeOnClick:!0});return}o.innerHTML="",l.classList.remove("is-hidden");try{const{totalHits:e,data:r}=await g(n,u);r.hits.length===0&&p.error({timeout:2e3,position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",backgroundColor:"#d37a7a",close:!1,closeOnClick:!0}),o.insertAdjacentHTML("beforeend",y(r.hits)),new L(".gallery a",{captionsData:"alt",captionDelay:250}),c=Math.ceil(r.totalHits/m),c>1&&i.classList.remove("d-none")}catch(e){console.log(e)}a.target.reset(),l.classList.add("is-hidden")}i.addEventListener("click",v);async function v(a){u+=1,i.classList.add("d-none"),l.classList.remove("is-hidden");const{data:e}=await g(n,u);o.insertAdjacentHTML("beforeend",y(e.hits)),c=Math.ceil(e.totalHits/m),c>1&&i.classList.remove("d-none"),l.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
