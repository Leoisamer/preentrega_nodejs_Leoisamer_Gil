const URL_BASE = "https://fakestoreapi.com";

const argumentos = process.argv.slice(2);

const [metodo, recurso, ...parametros] = argumentos;

const [coleccion, idProducto] = (recurso ?? "").split("/");

async function hacerPeticion(url, opciones) {
  const respuesta = await fetch(url, opciones);

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
  }

  return respuesta.json();
}

async function obtenerProductos() {
  const url = idProducto
    ? `${URL_BASE}/products/${idProducto}`
    : `${URL_BASE}/products`;
  return hacerPeticion(url);
}

async function crearProducto([titulo, precio, categoria]) {
  if (!titulo || !precio || !categoria) {
    throw new Error("Faltan datos. Uso: POST products <title> <price> <category>");
  }

  if (Number.isNaN(Number(precio))) {
    throw new Error("El precio tiene que ser un número.");
  }

  const nuevoProducto = {
    title: titulo,
    price: Number(precio),
    category: categoria,
  };

  return hacerPeticion(`${URL_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoProducto),
  });
}

async function eliminarProducto() {
  if (!idProducto) {
    throw new Error("Falta el id. Uso: DELETE products/<productId>");
  }

  return hacerPeticion(`${URL_BASE}/products/${idProducto}`, {
    method: "DELETE",
  });
}

async function principal() {
  if (!metodo || coleccion !== "products") {
    throw new Error(
      "Comando inválido. Ejemplos:\n" +
        "  npm run start GET products\n" +
        "  npm run start GET products/15\n" +
        "  npm run start POST products T-Shirt-Rex 300 remeras\n" +
        "  npm run start DELETE products/7"
    );
  }

  switch (metodo.toUpperCase()) {
    case "GET":
      return obtenerProductos();
    case "POST":
      return crearProducto(parametros);
    case "DELETE":
      return eliminarProducto();
    default:
      throw new Error(`Método no soportado: ${metodo}`);
  }
}

try {
  const resultado = await principal();
  console.log(resultado);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}