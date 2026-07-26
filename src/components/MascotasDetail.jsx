import { useEffect, useState } from "react";
import apiMascotas from "../api/apiMascotas";

function MascotasDetail({ id }) {
  const [listadoComentarios, setListadoComentarios] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

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

    fetchComentarios();
  }, []);

  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Ocultar comentarios" : "Ver comentarios"}
      </button>
      {listadoComentarios.map((comentario) => (
        <>
          {isVisible && (
            <div>
              <p>Autor: {comentario.autor}</p>
              <p>Contenido: {comentario.contenido}</p>
            </div>
          )}
        </>
      ))}
    </>
  );
}

export default MascotasDetail;
