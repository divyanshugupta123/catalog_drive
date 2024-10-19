const fs = require('fs');

const decodeValue = (value, base) => parseInt(value, base);

const readJsonFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};
const solution = (points) => {
    let ans = 0;
    points.forEach(([x_i, y_i], i) => {
        let product = y_i;
        points.forEach(([x_j], j) => {
            if (i !== j) {
                product *= -x_j / (x_i - x_j);
            }
        });
        ans += product;
    });
    return Math.round(ans);
};
const ts = (json) => {
    // i'm using here spread operator
    const { keys, ...data } = json;
    const points = [];
    for (const key in data) {
        const { base, value } = data[key];
        const x = parseInt(key); 
        const y = decodeValue(value, parseInt(base)); 
        points.push([x, y]);
    }

    return solution(points);
};

const main = () => {
    const ts1 = readJsonFile('./file1.json');
    const ts2 = readJsonFile('./file2.json');

    const result1 = ts(ts1);
    console.log(`Constant term for Testcase 1: ${result1}`);

    const result2 = ts(ts2);
    console.log(`Constant term for Testcase 2: ${result2}`);
};

main();
