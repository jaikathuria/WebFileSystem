const fs = require('fs')
const path = require('path')

function File(name, type, size, url) {
    return {
        name,
        type,
        size,
        url
    }
}
    
function readDirectory(url,name){
    const content = {}
    const fullURL = path.join(__dirname,url)
    const files = fs.readdirSync(url)

    for(let file of files){
        const fileURL = path.join(fullURL,file)
        try{
            const stat = fs.lstatSync(fileURL)
            if(stat.isFile()){
                const type = path.extname(file) || null
                content[file] = File(file, type, stat.size,`${url}/${file}`)
            } else if (stat.isDirectory()){
                content[file] = readDirectory(`${url}/${file}`,file)
            }
        } catch (err) {
            console.log(`${err}`)
        }
    }
    return {
        name,
        type: 'directory',
        content,
        url
    }
}


module.exports = {
    readDirectory,
}

