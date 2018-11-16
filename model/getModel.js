const fs = require("fs")

let modelPath = "./model/"

model = {}

fs.readdir(modelPath, (err, files) => {
    if (err) throw err;
    let fileList = files.filter(function(file){
        return fs.statSync(modelPath + file).isFile() && /.*\.json$/.test(file);
    })
    for(let item of fileList){
        let json = JSON.parse(fs.readFileSync(modelPath + item, 'utf8'));
        console.log(json)
        model = Object.assign(model,json)
    }

fs.writeFile('../app/src/renderer/assets/model.json', JSON.stringify(model, "", '    '), (err) => {
    if (err) {
        throw err;
    }
});

})
