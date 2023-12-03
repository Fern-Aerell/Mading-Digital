const axios = require('axios');
const fs = require("fs/promises");
const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);
const github_package_json_url = "https://raw.githubusercontent.com/Fern-Aerell/Mading-Digital/main/package.json";

async function gitPull() {
    try {
        const { stdout, stderr } = await execPromise('git pull origin main');
        console.log('Stdout:', stdout);
        console.log('Stderr:', stderr);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function check_update() {
    const github_version = (await axios.get(github_package_json_url)).data.version;
    const version = JSON.parse((await fs.readFile("package.json")).toString()).version;
    return {
        github_version: github_version,
        local_version: version,
        status: version != github_version
    };
}

async function update() {
    await gitPull();
}

async function main() {
    const check_update_result = await check_update();
    if(check_update_result.status) {
        console.log(`Update tersedia...`);
        console.log(`Versi : ${check_update_result.local_version} ke ${check_update_result.github_version}`);
        await update();
    }else{
        console.log(`${check_update_result.local_version} sudah versi terbaru...`);
    }
}

main();
