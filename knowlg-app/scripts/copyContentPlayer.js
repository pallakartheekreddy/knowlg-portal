const path = require('path');
const fs = require('fs-extra');

function copyFromNodeModule(src, dist) {
    try {
        const files = fs.readdirSync(src);

        files.forEach(function (file) {
            if (!(['node_modules', 'preview.html', 'README.md', 'chunks', 'preview_cdn.html', 'package.json'].includes(file))) {
                fs.copySync(path.join(src, file), path.join(dist, file));
            }
        });
    } catch (e) {
        console.error(e);
    }

}

function copyFromContentPlayer(src, dist) {
    try {
        fs.copySync(src, dist);
    } catch (e) {
        console.error(e);
    }

}
module.exports = function (context) {
    var srcPath;
    var destinationPath;

    srcPath = path.join(__dirname, '../content');
    destinationPath = path.join(__dirname, '../www/content');
    copyFromContentPlayer(srcPath, destinationPath);
    console.log('copied from content to www/content');

    srcPath = path.join(__dirname, '../node_modules/@project-sunbird/content');
    destinationPath = path.join(__dirname, '../www/content');
    copyFromNodeModule(srcPath, destinationPath);
    console.log('copied from node_modules/content to wwww/content');
}





