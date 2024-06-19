import Dashboard from '../views/pages/admin/dashboard';
import Pengguna from '../views/pages/admin/pengguna';
import Buku from '../views/pages/admin/buku';
import TambahBuku from '../views/pages/admin/tambah-buku';
import EditBuku from '../views/pages/admin/edit-buku';

const adminRoutes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/pengguna': Pengguna,
  '/buku': Buku,
  '/tambah-buku': TambahBuku,
  '/edit-buku/:id': EditBuku,
};

export default adminRoutes;
