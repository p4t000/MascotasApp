import { useEffect, useState } from "react";
import apiMascotas from "../api/apiMascotas";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf"
import 'notyf/notyf.min.css'
import './MascotasDetail.css'

function MascotasDetail({ id }) {
  const [listadoComentarios, setListadoComentarios] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [estado, setEstado] = useState('perdida');
  const [autor, setAutor] = useState('');
  const [contenido, setContenido] = useState('');
  const [error, setError] = useState('');


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
   
  }, [id]);

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

  const handleDeleteComentario = async (comentarioId) => {
    try {
      const response = await apiMascotas.delete(`/comentarios/${comentarioId}/`);
      if (response.status === 204){
        console.log("Comentario eliminado", response.data);
        notyf.success("Comentario eliminado correctamente");
        setListadoComentarios((comentarios) =>
          comentarios.filter((comentario) => comentario.id !== comentarioId)
        );
      }
      else {
        notyf.error("No se pudo eliminar comentario");
      }
    } catch (error) {
      notyf.error("No se pudo eliminar comentario");
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
  

  const handleDelete = async () => {
    try {
      const response = await apiMascotas.delete(`/mascotas/${id}/`);
      if (response.status === 204){
        console.log("Mascota eliminada", response.data);
        notyf.success("Mascota eliminada correctamente");
      }
      else {
        notyf.error("No se pudo eliminar mascota");
      }
    } catch (error) {
      notyf.error("No se pudo eliminar mascota");
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

  const handleSubmitComentario = async (e) => {
    e.preventDefault();

    if (autor.trim() === "") {
      setError("Autor no puede ser vacío");
      return
    }
    
    if (contenido.trim() === "") {
      setError("Comentario no puede ser vacío");
      return
    }

    const comentario = {
      autor: autor,
      contenido: contenido
    }
    try {
      const response = await apiMascotas.post(`/mascotas/${id}/comentar/`, comentario);
      if (response.status === 201) {
          console.log("Comentario creado:", response.data);
          notyf.success("Comentario creado con éxito");
      } else {
          notyf.error("No se pudo crear comentario");
      }
            
    } catch (error) {
      notyf.error("No se pudo crear comentario");
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
      navigate('/mascotas/listado/'); 
    }
  }
  
  return (
    <>
      <button className="detalle__toggle" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Ocultar detalles" : "Ver detalles"}
      </button>
        {isVisible && (
          <div className="detalle">
            <button className="detalle__btn detalle__btn--peligro" onClick={() => handleDelete()}>Eliminar mascota</button>
            <p className="detalle__subtitle">Agregar comentario</p>
            <form onSubmit={e => handleSubmitComentario(e)}>
              <label className="detalle__label">Autor:</label>
              <input className="detalle__input" type="text" placeholder="Autor" onChange={e => setAutor(e.target.value)}></input>
              <label className="detalle__label">Comentario:</label>
              <input className="detalle__input" type="text" placeholder="Comentario" onChange={e => setContenido(e.target.value)}></input>
              <button className="detalle__btn detalle__btn--guardar" type="submit">Guardar</button>
              <p className="detalle__error">{error}</p>
            </form>
            <p className="detalle__subtitle">Cambiar estado de mascota</p>
            <form onSubmit={e => handleSubmit(e)}>
              <label className="detalle__label">Estado:</label>
              <select className="detalle__select" onChange={e => setEstado(e.target.value)}>
                {estadoChoices.map((choice) => (<option key={choice.value} value={choice.value}>{choice.label}</option>))}
              </select>
              <button className="detalle__btn detalle__btn--guardar" type="submit">Guardar</button>
            </form>
            {listadoComentarios.map((comentario) => (
              <div className="detalle__comentario" key={comentario.id}>
                <h4>Comentario</h4>
                <p>Autor: {comentario.autor}</p>
                <p>Contenido: {comentario.contenido}</p>
                <button className="detalle__btn detalle__btn--peligro" onClick={() => handleDeleteComentario(comentario.id)}>Eliminar comentario</button>
              </div>
            ))}
          </div>
        )}
    </>
  );
}

export default MascotasDetail;
