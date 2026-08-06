import { useEffect, useState } from "react";
import MascotasItem from "./MascotasItem";
import apiMascotas from "../api/apiMascotas";
import './MascotasList.css'

function MascotasList() {
    const [listadoMascotas, setListadoMascotas] = useState([]);

    useEffect(() => {
        const fetchMascotas = async () => {
            try{
                const response = await apiMascotas.get("mascotas/");
                console.log(response);
                if (response.status === 200) {
                    setListadoMascotas(response.data);
                }
            }catch(error){
                console.log(error.response);
            }
        }

        fetchMascotas();
    }, []);

    return (
        <article>
            <h3 className="mascotas-list__title">Mascotas List</h3>
            {listadoMascotas.length === 0 ? (
                <p className="mascotas-list__empty">No hay mascotas registradas.</p>
            ) : (
                <div className="mascotas-list__grid">
                    <MascotasItem listado={listadoMascotas} />
                </div>
            )}
        </article>
    )
}

export default MascotasList;
