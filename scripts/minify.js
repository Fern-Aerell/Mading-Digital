const fs = require("fs/promises");
const jsObfuscator = require('javascript-obfuscator');

async function obfuscatorJS(input, output) {
    const content = (await fs.readFile(input)).toString();
    await fs.writeFile(output, jsObfuscator.obfuscate(content).getObfuscatedCode());
}

async function minifyJS(input, output) {
    const { minify } = await import("minify");
    const jsMinify = minify.js;
    const content = (await fs.readFile(input)).toString();
    await fs.writeFile(output, await jsMinify(content));
}

async function minifyHTML(input, output) {
    const { minify } = await import("minify");
    const htmlMinify = minify.html;
    const content = (await fs.readFile(input)).toString();
    await fs.writeFile(output, await htmlMinify(content));
}

async function minifyCSS(input, output) {
    const { minify } = await import("minify");
    const cssMinify = minify.css;
    const content = (await fs.readFile(input)).toString();
    await fs.writeFile(output, await cssMinify(content));
}

async function minifyReader(path) {
    try {
        const path1 = await fs.readdir(path);
        if(path1.length > 0) {
            path1.forEach(async (path2) => {
                minifyReader(`${path}/${path2}`);
            });
        }
    } catch(error) {
        if(path.endsWith(".html") || path.endsWith(".ejs")) {
            minifyHTML(path, path.replace("src/", ""));
        }else if(path.endsWith(".css")) {
            minifyCSS(path, path.replace("src/", ""));
        }else if(path.endsWith(".js")) {
            obfuscatorJS(path, path.replace("src/", ""));
        }
    }
}

async function main() {
    await minifyReader("src");
}

main();