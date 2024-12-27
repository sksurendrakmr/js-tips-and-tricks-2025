async function main(){
    for (let i = 0; i < 999999; i+=100) {
        const p = []
        for (let j = 0; j < 100; j++) {
            p.push(sendRequest((i+j).toString()))
        }
        await Promise.all(p);
    }
}