#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');

const args = process.argv.slice(2);
const jsQueryString = args.slice(1).join(' ');
const path = args[0];
let root;

async function main() {
    if (path.match(/https?:\/\/[A-Za-z-0-9-]+(\/[a-zA-Z0-9]+\/?)*/)) { //is URL
        const res = await fetch(path);
        root = await res.json();
    } else root = JSON.parse(fs.readFileSync(args[0]).toString());


    let myObj;

    if (jsQueryString.toLowerCase() === 'shape') {
        console.log(shapeOf(root));
    } else {
        myObj = eval(jsQueryString);
        if (!myObj) {
            console.log('Invalid syntax');
            return;
        }
        console.log(myObj);
    }
}

function shapeOf(obj, depth = 0) {
    let indent = '';
    for (let i = 0; i < depth; i++) indent += '  ';
    if (obj.length) {
        if (typeof obj[0] !== 'string') {
            return (shapeOf(obj[0]) + '[]').replace(/\n/g, '\n' + indent);
        } else return 'string[]';
    }
    let outObj = {};
    for (let arg in obj) {
        if (typeof obj[arg] !== 'object') {
            outObj[arg] = typeof obj[arg];
        } else outObj[arg] = shapeOf(obj[arg], depth++);
    }
    return JSON.stringify(outObj, false, 2).replace(/\\n/g, '\n').replace(/\\"|"/g, '');
}

main();