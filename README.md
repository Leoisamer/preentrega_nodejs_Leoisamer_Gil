# Esta es una Preentrega Node.js: gestión de productos, que se elabora como condición de cursada.

Programa de terminal que consume la API [FakeStore](https://fakestoreapi.com/docs) para consultar, crear y eliminar productos.

## Requisitos

Node.js 18 o superior (usa `fetch` nativo). No tiene dependencias externas.

## Uso

```
npm run start GET products
npm run start GET products/15
npm run start POST products T-Shirt-Rex 300 remeras
npm run start DELETE products/7
```

## Notas

- Los títulos con espacios van entre comillas: `"Remera Rex"`.
- FakeStore simula las operaciones: el POST y el DELETE responden, pero no guardan cambios reales.