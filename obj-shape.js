function shapeOf(obj, depth = 0) {
    const indents = depth > 0 ? '  ' : ''; //add an indent in every nested object except the first
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

const myObj = [{
        "id": "0001",
        "type": "donut",
        "name": "Cake",
        "ppu": 0.55,
        "batters": {
            "batter": [
                { "id": "1001", "type": "Regular" },
                { "id": "1002", "type": "Chocolate" },
                { "id": "1003", "type": "Blueberry" },
                { "id": "1004", "type": "Devil's Food" }
            ]
        },
        "topping": [
            { "id": "5001", "type": "None" },
            { "id": "5002", "type": "Glazed" },
            { "id": "5005", "type": "Sugar" },
            { "id": "5007", "type": "Powdered Sugar" },
            { "id": "5006", "type": "Chocolate with Sprinkles" },
            { "id": "5003", "type": "Chocolate" },
            { "id": "5004", "type": "Maple" }
        ]
    },
    {
        "id": "0002",
        "type": "donut",
        "name": "Raised",
        "ppu": 0.55,
        "batters": {
            "batter": [
                { "id": "1001", "type": "Regular" }
            ]
        },
        "topping": [
            { "id": "5001", "type": "None" },
            { "id": "5002", "type": "Glazed" },
            { "id": "5005", "type": "Sugar" },
            { "id": "5003", "type": "Chocolate" },
            { "id": "5004", "type": "Maple" }
        ]
    },
    {
        "id": "0003",
        "type": "donut",
        "name": "Old Fashioned",
        "ppu": 0.55,
        "batters": {
            "batter": [
                { "id": "1001", "type": "Regular" },
                { "id": "1002", "type": "Chocolate" }
            ]
        },
        "topping": [
            { "id": "5001", "type": "None" },
            { "id": "5002", "type": "Glazed" },
            { "id": "5003", "type": "Chocolate" },
            { "id": "5004", "type": "Maple" }
        ]
    }
]

function parseArray(arr, depth) {
    if (arr.length == 0) return '[]'; //empty array
    else return shapeOf(arr[0], depth) + '[]'; //get the type of the first element
}

console.log(shapeOf(myObj));