const loadScript = url =>
    new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);
        script.onload = ()=>{
            resolve();
        }
        script.onerror = ()=> {
            reject();
        }
    })
;
/*单页加载JS*/
export function loadJs(src) {
    return new Promise((resolve,reject)=> {
        Promise.all(src.map(loadScript))
            .then(async () => {
                resolve()
            })
            .catch(() => {
                reject();
            })
    })
}
/*获取URL参数*/
export function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
}
