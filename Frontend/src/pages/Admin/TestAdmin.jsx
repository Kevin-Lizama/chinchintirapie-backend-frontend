import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/Admin.css';

function TestAdmin() {
    return (
        <div style={{ display: 'flex' }}>

            <AdminSidebar />

            <div className="admin-content">
                <h1 className="admin-title">Panel de Administración</h1>
                <p className="admin-subtitle">Vista de prueba del admin</p>
            </div>

        </div>
    );
}

export default TestAdmin;