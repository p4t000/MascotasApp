import { useEffect, useState } from "react";
import apiMascotas from "../api/apiMascotas";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf"
import 'notyf/notyf.min.css'

function MascotasForm() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoAnimal, setTipoAnimal] = useState('perro');
    const [estado, setEstado] = useState('perdida');
    const [imagen, setImagen] = useState('');
    const [tamano, setTamano] = useState('pequeno');
    const [edad, setEdad] = useState('');
    const [raza, setRaza] = useState('');
    const [sexo, setSexo] = useState('macho');
    const [error, setError] = useState('');

    const [estadoChoices, setEstadoChoices] = useState([]);
    const [tipoAnimalChoices, setTipoAnimalChoices] = useState([]);
    const [tamanoChoices, setTamanoChoices] = useState([]);
    const [sexoChoices, setSexoChoices] = useState([]);

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const response = await apiMascotas.get('choices/');
                if (response.status === 200) {
                    setEstadoChoices(response.data.estado);
                    console.log(response.data.estado);
                }
            } catch (error) {
                console.error("Error fetching choices:", error);
            }
        };

        const fetchTipoAnimalChoices = async () => {
            try {
                const response = await apiMascotas.get('choices/');
                if (response.status === 200) {
                    setTipoAnimalChoices(response.data.tipo_animal);
                    console.log(response.data.tipo_animal);
                }
            } catch (error) {
                console.error("Error fetching tipo animal choices:", error);
            }
        };

        const fetchTamanoChoices = async () => {
            try {
                const response = await apiMascotas.get('choices/');
                if (response.status === 200) {
                    setTamanoChoices(response.data.tamano);
                    console.log(response.data.tamano);
                }
            } catch (error) {
                console.error("Error fetching tamano choices:", error);
            }
        };

        const fetchSexoChoices = async () => {
            try {
                const response = await apiMascotas.get('choices/');
                if (response.status === 200) {
                    setSexoChoices(response.data.sexo);
                    console.log(response.data.sexo);
                }
            } catch (error) {
                console.error("Error fetching sexo choices:", error);
            }
        };
        {/**PROMISEALL por si quieren investigar */ }
        Promise.all([
            fetchChoices(),
            fetchTipoAnimalChoices(),
            fetchTamanoChoices(),
            fetchSexoChoices()
        ]);
    }, []);

    const navigate = useNavigate();

    const notyf = new Notyf({
    position: {
      x: 'center',
      y: 'top'
    }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a un servidor o actualizar el estado de la aplicación.
        console.log("Formulario enviado");

        // Validaciones
        if (nombre.trim() === ""){
            setError("Nombre no puede estar vacío");
            return
        }

        if (descripcion.trim() === ""){
            setError("Descripción no puede estar vacío");
            return
        }

        if (raza.trim() === ""){
            setError("Raza no puede estar vacío");
            return
        }

        if (nombre.trim() === ""){
            setError("Nombre no puede estar vacío");
            return
        }

        if (edad <= 0){
            setError("Edad debe ser un número mayor a 0");
            return
        }

        if (isNaN(edad)){
            setError("Edad debe ser un número");
            return
        }

        if (!imagen) {
            setError('Debe seleccionar una imagen');
            return;
    }

        // Crear FormData para enviar la imagen y los demás datos
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('tipo_animal', tipoAnimal);
        formData.append('estado', estado);
        formData.append('imagen', imagen);
        formData.append('tamano', tamano);
        formData.append('edad', edad);
        formData.append('raza', raza);
        formData.append('sexo', sexo);

        try {
            const response = await apiMascotas.post('/mascotas/', formData);
            if (response.status === 201) {
                console.log("Mascota creada:", response.data);
                notyf.success("Mascota creada con éxito");
            } else {
                notyf.error("No se pudo crear mascota");
            }
            
        } catch (error) {
            notyf.error("No se pudo crear mascota");
            if (error.response) {
                // La API respondió con un código de error
                switch (error.response.status) {
                    case 400:
                    console.error("Solicitud incorrecta.");
                    break;

                    case 401:
                    console.error("No autorizado.");
                    break;

                    case 403:
                    console.error("Acceso denegado.");
                    break;

                    case 404:
                    console.error("Recurso no encontrado.");
                    break;

                    case 409:
                    console.error("Conflicto en los datos.");
                    break;

                    case 500:
                    console.error("Error interno del servidor.");
                    break;

                    default:
                    console.error(
                        `Error ${error.response.status}:`,
                        error.response.data
                    );
                }

            } else if (error.request) {
            // La petición se envió pero no hubo respuesta
            console.error("No se recibió respuesta del servidor.");

            } else {
            // Error al configurar la petición
            console.error("Error:", error.message);
            }
        } finally {
        
            setError("");
            console.log(response);
            navigate('/mascotas/listado'); // Redirige a la página de listado después de enviar el formulario
        }
        

        
    }

    return (
        <form onSubmit={e => handleSubmit(e)} encType="multipart/form-data">
            <label>Nombre:</label>
            <input type="text" placeholder="Nombre" onChange={e => setNombre(e.target.value)}/>
            <label>Descripción:</label>
            <input type="text" placeholder="Descripción" onChange={e => setDescripcion(e.target.value)}/>
            <label>Raza:</label>
            <input type="text" placeholder="Raza" onChange={e => setRaza(e.target.value)}/>
            <label>Edad:</label>
            <input type="number" placeholder="Edad" onChange={e => setEdad(e.target.value)}/>
            <label>Estado:</label>
            <select onChange={e => setEstado(e.target.value)}>
                {estadoChoices.map((choice) => (<option key={choice.value} value={choice.value}>{choice.label}</option>))}
            </select>
            <label>Tipo animal:</label>
            <select onChange={e => setTipoAnimal(e.target.value)}>
                {tipoAnimalChoices.map((choice) => (<option key={choice.value} value={choice.value}>{choice.label}</option>))}
            </select>
            <label>Tamaño:</label>
            <select onChange={e => setTamano(e.target.value)}>
                {tamanoChoices.map((choice) => (<option key={choice.value} value={choice.value}>{choice.label}</option>))}
            </select>
            <label>Sexo:</label>
            <select onChange={e => setSexo(e.target.value)}>
                {sexoChoices.map((choice) => (<option key={choice.value} value={choice.value}>{choice.label}</option>))}
            </select>
            <label>Imagen:</label>
            <input onChange={e => setImagen(e.target.files[0])} type="file" placeholder="Imagen" />
            <button type="submit">Guardar</button>
            <p>{error}</p>
        </form >
    )
}

export default MascotasForm;