import Dashboard from '../views/pages/admin/dashboard';
import Pengguna from '../views/pages/admin/pengguna';
import Buku from '../views/pages/admin/buku';
import TambahBuku from '../views/pages/admin/tambah-buku';
import EditUser from '../views/pages/admin/edit-user';

const adminRoutes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/pengguna': Pengguna,
  '/buku': Buku,
  '/tambah-buku': TambahBuku,
  '/edit-user': EditUser,
};

export default adminRoutes;
