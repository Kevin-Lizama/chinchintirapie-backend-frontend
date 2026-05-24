import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/Admin.css';

function AdminLayout({ children }) {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-content">
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;