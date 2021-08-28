
# Memory Card game

This app allow you to play memory card game.

## Demo

You can see the demo here:
https://memory-game-ivory-theta.vercel.app/
 

## Installation

 
npm:

```bash
npm install
```

yarn:

```bash
yarn
```

## Deployment

To Start this project run

npm:

```bash
npm run start
```

yarn:

```bash
yarn start
```

To build the project run:

npm:

```bash
npm run build
```

yarn:

```bash
yarn build
```

## Testing

npm:

```bash
npm run test
```


yarn:


```bash
yarn test
```


## API Reference

For the api, I used tinyfac API.

#### Get TV Show details

```http
  GET https://tinyfac.es/api/data?limit=8
```

You should get the response like the below image.

‍‍‍```javascript
  {
  approved: true,
  created_at: 1627199933.924436,
  first_name: "Tailor",
  gender: "male",
  id: 69,
  last_name: "Pippins",
  source: {name: "Joshua Sisco", updated_at: 1627199913.900815, id: 69, created_at: 1627199913.900815,…},
  updated_at: 1627199933.924436,
  url: "https://res.cloudinary.com/tinyfac-es/image/upload/w_1024,h_1024,c_fit/v1627199931/facebook/fvslz3twinvrrplyzya8.jpg"
  }
```

 
