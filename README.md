# Vuetify List

> A simple example of using `v-data-table` with an external API source, along with the ability to view individual items

Thanks to [jsonplaceholder](https://jsonplaceholder.typicode.com) for the awesome API

## Run in Docker

```bash
# build image
docker build -t benshelton/vuetify-list .

# run in container, available on localhost:8080
docker run -it -p 8080:80 --rm --name vuetify-list benshelton/vuetify-list
```

## Development setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Run your unit tests

```bash
npm run test:unit
```
