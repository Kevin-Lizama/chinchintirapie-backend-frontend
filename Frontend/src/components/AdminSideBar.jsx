import { NavLink } from 'react-router-dom';
import '../styles/AdminSideBar.css';
import { useState } from 'react';

function AdminSidebar() {
    const [openNoticias, setOpenNoticias] = useState(false);
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar__logo">
                <h2>Panel Admin</h2>
            </div>
            <nav className="admin-sidebar__nav">
                <div className="admin-sidebar__nav-link"
                    onClick={() => setOpenNoticias(!openNoticias)}>
                    Noticias
                </div>
                {openNoticias && (
                    <div className="admin-submenu">
                        <NavLink to="/admin/noticias">Agregar Noticia</NavLink>
                        <NavLink to="/admin/noticias/editar">Modificar Noticia</NavLink>
                        <NavLink to="/admin/noticias/eliminar">Eliminar Noticia</NavLink>
                    </div>
                )}
                <NavLink to="/admin/cronicas">
                    Crónicas
                </NavLink>
                <NavLink to="/admin/material">
                    Material Educativo
                </NavLink>
                <NavLink to="/admin/repositorio">
                    Repositorio
                </NavLink>
                <NavLink to="/admin/cedoc">
                    CEDOC
                </NavLink>
                <NavLink to="/admin/eventos">
                    Eventos
                </NavLink>
                <NavLink to="/admin/usuarios">
                    Usuarios
                </NavLink>
            </nav>
        </aside>
    );
}
export default AdminSidebar;