    import { useState } from 'react';
    import '../../styles/Admin.css';

    function NoticiasAdmin() {
        const [form, setForm] = useState({
            titulo: '',
            contenido: '',
            autor: '',
            fecha: '',
            etiqueta: ''
        });

        const handleChange = (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            console.log('Noticia enviada:', form);

            // Aquí después irá el fetch al backend
        };

        return (
            <div className="admin-container">
                <h1 className="admin-title">Crear Noticia</h1>

                <form onSubmit={handleSubmit} className="admin-form">

                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="contenido"
                        placeholder="Contenido de la noticia"
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
                        placeholder="Etiqueta (ej: evento, cultura)"
                        onChange={handleChange}
                    />

                    <button type="submit">Publicar</button>

                </form>
            </div>
        );
    }

    export default NoticiasAdmin;