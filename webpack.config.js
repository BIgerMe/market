/*暂时未使用@todo*/
const {resolve} = require("path")
module.exports = {
    /*入口*/
    entry: './src/main.js',
    /*输出*/
    output: {
        filename:'index.js',
        path: resolve(__dirname,"build")
    }
}
