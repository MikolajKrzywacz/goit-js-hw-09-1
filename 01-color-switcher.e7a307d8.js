const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");let a;e.addEventListener("click",(()=>{e.disabled=!0,a=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.addEventListener("click",(()=>{e.disabled=!1,clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.e7a307d8.js.map
