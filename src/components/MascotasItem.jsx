import MascotasDetail from "./MascotasDetail";
import './MascotasItem.css'

function MascotasItem({ listado }) {
  return (
    <>
      {listado.map((mascota) => (
        <div className="mascota-card" key={mascota.id}>
          <img className="mascota-card__img" src={mascota.imagen} alt={mascota.nombre} />
          <div className="mascota-card__body">
            <h4 className="mascota-card__nombre">Nombre mascota: {mascota.nombre}</h4>
            <p className="mascota-card__descripcion">Descripción: {mascota.descripcion}</p>
            <p className="mascota-card__dato"><strong>Tipo:</strong> {mascota.tipo_animal}</p>
            <p className="mascota-card__estado">
              {mascota.estado === "en_adopcion" ? "En adopción" : mascota.estado}
            </p>
            <p className="mascota-card__dato"><strong>Edad:</strong> {mascota.edad} años</p>
            <p className="mascota-card__dato"><strong>Raza:</strong> {mascota.raza}</p>
            <p className="mascota-card__dato"><strong>Sexo:</strong> {mascota.sexo}</p>
            <p className="mascota-card__dato"><strong>Tamaño:</strong> {mascota.tamano}</p>
            <MascotasDetail id={mascota.id} />
          </div>
        </div>
      ))}
    </>
  );
}

export default MascotasItem;
