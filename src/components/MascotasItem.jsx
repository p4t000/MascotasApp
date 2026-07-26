import MascotasDetail from "./MascotasDetail";

function MascotasItem({ listado }) {
  return (
    <>
      {listado.map((mascota) => (
        <div key={mascota.id}>
          <img src={mascota.imagen} alt={mascota.nombre} />
          <h4>Nombre mascota: {mascota.nombre}</h4>
          <p>Descripción: {mascota.descripcion}</p>
          <p>Tipo de animal: {mascota.tipo_animal}</p>
          <p>
            Estado:{" "}
            {mascota.estado === "en_adopcion" ? "En adopción" : mascota.estado}
          </p>
          <p>Edad: {mascota.edad} años</p>
          <p>Raza: {mascota.raza}</p>
          <p>Sexo: {mascota.sexo}</p>
          <p>Tamaño: {mascota.tamano}</p>
          <MascotasDetail id={mascota.id} />
        </div>
      ))}
      {/** Aca deberian estar todos los datos de mascota */}
    </>
  );
}

export default MascotasItem;
