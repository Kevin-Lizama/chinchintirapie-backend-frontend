import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function AdminList({ tipo }) {

    const location = useLocation();

    // eslint-disable-next-line no-unused-vars
    const esEditar = location.pathname.includes('editar');
    // eslint-disable-next-line no-unused-vars
    const esEliminar = location.pathname.includes('eliminar');
    // 🔥 Datos iniciales por tipo (mock)
    const initialData = {
        noticias: [
            { id: 1, titulo: "Noticia 1", autor: "A", fecha: "2026-01-01" }
        ],
        cronicas: [
            { id: 1, titulo: "Crónica 1", autor: "B", fecha: "2026-02-02" }
        ],
        material: [
            { id: 1, titulo: "Material 1", autor: "C", fecha: "2026-03-03" }
        ],
        repositorio: [
            { id: 1, titulo: "Repo 1", autor: "D", fecha: "2026-04-04" }
        ],
        cedoc: [
            { id: 1, titulo: "Documento 1", autor: "E", fecha: "2026-05-05" }
        ],
        eventos: [
            { id: 1, titulo: "Evento 1", autor: "F", fecha: "2026-06-06" }
        ],
        usuarios: [
            { id: 1, titulo: "Usuario 1", autor: "Admin", fecha: "2026-01-01" }
        ]
    };

    // 🔥 Estado inicial correcto (sin useEffect)
    const [data, setData] = useState(initialData[tipo] || []);

    // 🔥 Eliminar (simulación)
    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    return (
        <div className="admin-container">
            <h2>Listado de {tipo}</h2>

            {data.map((item) => (
                <div key={item.id}>
                    <p>{item.titulo}</p>
                    <p>{item.autor}</p>
                    <p>{item.fecha}</p>

                    <div className="user-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => console.log("Editar", item.id)}>
                            Editar
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => handleDelete(item.id)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminList;