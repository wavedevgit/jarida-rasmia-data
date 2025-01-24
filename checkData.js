const fs = require('fs');

async function main() {
    const bo = await (
        await fetch(
            'https://raw.githubusercontent.com/wavedevgit/laws-tracker/refs/heads/main/data/barlaman/jarida/BO.json',
        )
    ).json();
    const eci = await (
        await fetch(
            'https://raw.githubusercontent.com/wavedevgit/laws-tracker/refs/heads/main/data/barlaman/jarida/ECI.json',
        )
    ).json();
    const info = {};
    for (let file of bo.data) {
        const name = file.url.split('/').pop().split('.')[0] + '.json';
        file.url = file.url.startsWith('/') ? 'http://www.sgg.gov.ma' + file.url : file.url;
        info[name] = file;
        if (!fs.existsSync('./data/' + name)) {
            console.log('BO, Missing', file.num, file.url);
        }
    }
    for (let file of eci.data) {
        const name = file.url.split('/').pop().split('.')[0] + '.json';
        file.url = file.url.startsWith('/') ? 'http://www.sgg.gov.ma' + file.url : file.url;
        info[name] = file;
        if (!fs.existsSync('./data/' + name)) {
            console.log('eci, Missing', file.num, file.url);
        }
    }
    fs.writeFileSync('./info.json', JSON.stringify(info));
}
main();
