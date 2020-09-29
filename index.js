#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');
const { exit } = require('process');

const args = process.argv.slice(2);
const jsQueryString = args.slice(1).join(' ');
const fpath = args[0];
let root;

async function main() {
    if (!fpath) {
        console.log('USAGE:\n$ jr URI/path jsQueryString');
        console.log('URI/path:');
        console.log('Please specify protocol (http/https) if it is a URI, otherwise relative or absolute path works for local.');
        console.log('jsQueryString:');
        console.log('The data you want returned in root.prop or root[\'prop\'] syntax. The literal JSON data is returned by root. You can also use any JS function as well as included shapeOf(obj: Object) function to get the shape of an object.\nShorthand for shapeOf(root) is shape');
        exit(1);
    }
    if (!jsQueryString) {
        console.log('No arguments provided.');
        console.log('Use root to access the entire JSON response and access items with [] or . syntax as needed');
        console.log('Use shapeOf(obj: Object) to get TypeScript-style shape for any property.\nShorthand for shapeOf(root) is shape');
        exit(1);
    }
    if (fpath.match(/https?:\/\//)) { //is URL
        const res = await fetch(fpath)
            .catch(e => {
                console.log(`ERROR: fetching from URL (${fpath}) failed.`);
                exit(1);
            });
        if (res) root = await res.json();
    } else {
        if (fs.existsSync(fpath)) {
            root = JSON.parse(fs.readFileSync(fpath).toString());
        } else {

        }
    }


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

function shapeOf(obj, depth = 1) {
    const indents = depth > 0 ? '  ' : ''; //add an indent in every nested object except the first
    if (typeof obj !== 'object') { //handles string, number, boolean, null etc.
        return typeof obj;
    } else { //handles object or array
        let outObj = {};
        if (Array.isArray(obj)) { //handles array
            if (!obj[0]) return '[]';
            for (const prop in obj[0]) {
                outObj[prop] = shapeOf(obj[0][prop], 1);
            }
            return (JSON.stringify(outObj, false, 2).replace(/\"/g, '')).replace(/\\n/g, ' ' + depth + '\n' + indents) + '[]';
        } else { //handles object
            for (const prop in obj) {
                outObj[prop] = shapeOf(obj[prop], 1);
            }
        }
        return (JSON.stringify(outObj, false, 2).replace(/\"/g, '')).replace(/\\n/g, '\n' + indents);
    }
}

function parseArray(arr, depth) {
    if (arr.length == 0) return '[]'; //empty array
    else return shapeOf(arr[0], 0) + '[]'; //get the type of the first element
}

main();