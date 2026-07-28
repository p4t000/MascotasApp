# 🐾 Sistema de Gestión de Mascotas - React JS

Por: Mario Barahona y Patricio Leiva

Aplicación web desarrollada con **React JS** que permite gestionar información de mascotas mediante el consumo de una **API REST**. 

El sistema permite realizar operaciones CRUD (**Create, Read, Update, Delete**) sobre las mascotas, permitiendo listar, registrar, editar y eliminar registros.

---

## 📌 Características principales

- ✅ Listado de mascotas mediante petición **GET**.
- ✅ Registro de nuevas mascotas mediante petición **POST**.
- ✅ Actualización parcial de información mediante petición **PATCH**.
- ✅ Eliminación de mascotas mediante petición **DELETE**.
- ✅ Visualización del detalle de cada mascota.
- ✅ Manejo de formularios utilizando React.
- ✅ Consumo de API mediante Axios.
- ✅ Manejo de estados con Hooks de React.

---

# 🛠️ Tecnologías utilizadas

## Frontend

- React JS
- JavaScript ES6+
- HTML5
- Axios
- React Hooks:
  - `useState`
  - `useEffect`

## Backend

La aplicación consume una API REST externa encargada de almacenar y gestionar la información de las mascotas.

# ⚙️ Instalación y ejecución

## 1. Clonar repositorio

```bash
git clone https://github.com/usuario/proyecto-mascotas.git
```

## 2. Acceder al proyecto

```bash
cd proyecto-mascotas
```

## 3. Instalar dependencias

```bash
npm install
```
```bash
npm install react-router-dom
```
```bash
npm install axios
```
```bash
npm install notyf
```

## 4. Ejecutar aplicación

```bash
npm run dev
```

# Uso de IA gratuita

En este proyecto se utilizó la asistencia de ChatGPT y Google (Gemini), principalmente para:

- Creación de un botón y su lógica que permita ocultar/mostrar detalles de la mascota (comentarios, botón de eliminar y formulario para cambiar el estado de la mascota)
- Manejo de errores (catch) que arroja la API, para lograr capturarlos y mostrarlos por consola.
