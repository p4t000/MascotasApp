import { useEffect, useState } from "react";
import apiMascotas from "../api/apiMascotas";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf"
import 'notyf/notyf.min.css'

function MascotasDetail({ id }) {
  const [listadoComentarios, setListadoComentarios] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [estado, setEstado] = useState('perdida');

  const [estadoChoices, setEstadoChoices] = useState([]);

  useEffect(() => {
    const fetchComentarios = async () => {
      // Peticion api hacia mascotas
      try {
        // Peticion GET
        const response = await apiMascotas.get(`/mascotas/${id}`);
        console.log(response);
        if (response.status === 200) {
          setListadoComentarios(response.data.comentarios);
          console.log("Comentarios", response.data.comentarios);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

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
  
    fetchComentarios();
    fetchChoices();
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

      try {
        const response = await apiMascotas.patch(`/mascotas/${id}/`, {estado: estado});
        console.log(response);
        if (response.status === 200){
          console.log("Estado actualizado:", response.data);
          notyf.success("Estado actualizado correctamente");
        }
        else {
          notyf.error("No se pudo actualizar el estado de la mascota");
        }
      } catch (error) {
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
        navigate('/mascotas/');
      }
    
    }

  
  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Ocultar detalles" : "Ver detalles"}
      </button>
        {isVisible && (
          <>
            <p>Cambiar estado de mascota</p>
            <form onSubmit={e => handleSubmit(e)}>
              <label>Estado:</label>
              <select onChange={e => setEstado(e.target.value)}>
                {estadoChoices.map((choice) => (<option key={choice.value} value={choice.value}>{choice.label}</option>))}
              </select>
              <button type="submit">Guardar</button>
            </form>
            {listadoComentarios.map((comentario) => (
              <div key={comentario.id}>
                <h4>Comentario</h4>
                <p>Autor: {comentario.autor}</p>
                <p>Contenido: {comentario.contenido}</p>
              </div>
            ))}
          </>
        )}
    </>
  );
}

export default MascotasDetail;
