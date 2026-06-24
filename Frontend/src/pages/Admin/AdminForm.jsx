import { useState } from 'react';
import '../../styles/Admin.css';

function AdminForm({ tipo }) {

    const [form, setForm] = useState({
        titulo: '',
        contenido: '',
        autor: '',
        fecha: '',
        etiqueta: '',
        nombre: '',
        correo: '',
        telefono: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Conectar con el servicio del backend
    };

    return (
        <div className="admin-container">

            {/* 🔥 TÍTULO DINÁMICO */}
            <h1 className="admin-title">
                {tipo === "usuario" ? "Crear usuario" : `Crear ${tipo}`}
            </h1>

            <form onSubmit={handleSubmit} className="admin-form">

                {/* 🔥 FORM ESPECIAL PARA USUARIOS */}
                {tipo === "usuario" ? (
                    <>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="telefono"
                            placeholder="Teléfono"
                            onChange={handleChange}
                        />

                        <button type="submit">Crear Usuario</button>
                    </>
                ) : (
                    <>
                        {/* 🔥 FORM NORMAL (TODO LO QUE YA TENÍAS) */}

                        <input
                            type="text"
                            name="titulo"
                            placeholder="Título"
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="contenido"
                            placeholder={`Contenido de ${tipo}`}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="autor"
                            placeholder="Autor"
                            onChange={handleChange}
                        />

                        <input
                            type="file"
                            name="archivo"
                            accept="image/*,video/*"
                            onChange={handleChange}
                        />

                        <input
                            type="date"
                            name="fecha"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="etiqueta"
                            placeholder="Etiqueta"
                            onChange={handleChange}
                        />

                        <button type="submit">Publicar</button>
                    </>
                )}

            </form>
        </div>
    );
}

export default AdminForm;