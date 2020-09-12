# json-reader

Install from the `*.tgz` file with `npm i -g *.tgz`

# Usage
`$ jr path/to/file "root.attr"`
`$ jr http://server/url "root.attr"`

The thrid argument is *any* JavaScript code. Use quotes to make sure everything is parsed correctly. The JSON data root is assigned `root` so to access an attribute , `attr`, you use `root.attr`. The same goes for if the JSON is an array, you can access it by `root[idx]` and have full access to array functions such as `map`, `reduce`, `filter` and array properties like `length`.

## Included Helper functions

### `shapeOf(obj: object)`
Retrns a TypeScript-style shape of the provided object. A shortcut to `shapeOf(root)` is passing `shape` as the third argument, however if you need the shape of a nested object, array, etc. use `shapeOf(root.attr[idx].whatever)`

# Examples
Using `test.json` inside this repo:

## `jr test.json root`
Returns the entire file

## `jr test.json shape`
Returns the following:
```typescript
{
  _id: string,
  index: number,
  guid: string,
  isActive: boolean,
  balance: string,
  picture: string,
  age: number,
  eyeColor: string,
  name: string,
  gender: string,
  company: string,
  email: string,
  phone: string,
  address: string,
  about: string,
  registered: string,
  latitude: number,
  longitude: number,
  tags: string[],
  friends: {
    id: number,
    name: string
  }[],
  greeting: string,
  favoriteFruit: string
}[]
```

## `jr test.json "shapeOf(root[0].friends)"`

Returns the following:
```typescript
{
  id: number,
  name: string
}[]
```

## `jr test.json "root.map(item => item.friends.length)"`

Returns the following:
```typescript
[ 3, 3, 3, 3, 3 ]
```

## `jr https://jsonplaceholder.typicode.com/comments 'root.slice(1,10)'`

Returns the following:
```typescript
[ { postId: 1,
    id: 2,
    name: 'quo vero reiciendis velit similique earum',
    email: 'Jayne_Kuhic@sydney.com',
    body:
     'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint 
nostrum voluptatem reiciendis et' },
  { postId: 1,
    id: 3,
    name: 'odio adipisci rerum aut animi',
    email: 'Nikita@garfield.biz',
    body:
     'quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione' },
  { postId: 1,
    id: 4,
    name: 'alias odio sit',
    email: 'Lew@alysha.tv',
    body:
     'non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati' },
  { postId: 1,
    id: 5,
    name: 'vero eaque aliquid doloribus et culpa',
    email: 'Hayden@althea.biz',
    body:
     'harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et' },  { postId: 2,
    id: 6,
    name: 'et fugit eligendi deleniti quidem qui sint nihil autem',
    email: 'Presley.Mueller@myrl.com',
    body:
     'doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in' },
  { postId: 2,
    id: 7,
    name:
     'repellat consequatur praesentium vel minus molestias voluptatum',
    email: 'Dallas@ole.me',
    body:
     'maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor' },
  { postId: 2,
    id: 8,
    name: 'et omnis dolorem',
    email: 'Mallory_Kunze@marie.org',
    body:
     'ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque' },
  { postId: 2,
    id: 9,
    name: 'provident id voluptas',
    email: 'Meghan_Littel@rene.us',
    body:
     'sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus' },
  { postId: 2,
    id: 10,
    name: 'eaque et deleniti atque tenetur ut quo ut',
    email: 'Carmen_Keeling@caroline.name',
    body:
     'voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis' } ]
     ```
