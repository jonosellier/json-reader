#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');

const args = process.argv.slice(2);
const jsQueryString = args.slice(1).join(' ');
const path = args[0];
let root;

async function main() {
    if (path.match(/https?:\/\//)) { //is URL
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
    const indents = depth > 0 ? '  ' : ''; //add an indent in every nested object except the first
    if(!obj) return (JSON.stringify(null, false, 2).replace(/\"/g, '')).replace(/\\n/g, '\n' + indents);
    if (typeof obj !== 'object') { //handles string, number, boolean, null etc.
        return typeof obj;
    } else { //handles object or array
        let outObj = {};
        if (Array.isArray(obj)) { //handles array
            outObj = parseArray(obj, depth);
        } else { //handles object
            for (const prop in obj) {
                outObj[prop] = shapeOf(obj[prop], depth + 1);
            }
        }
        return (JSON.stringify(outObj, false, 2).replace(/\"/g, '')).replace(/\\n/g, '\n' + indents);
    }
}

function parseArray(arr, depth) {
    if (arr.length == 0) return '[]'; //empty array
    else return shapeOf(arr[0], depth) + '[]'; //get the type of the first element
}

main();