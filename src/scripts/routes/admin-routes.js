import Dashboard from '../views/pages/admin/dashboard';
import Pengguna from '../views/pages/admin/pengguna';
import Buku from '../views/pages/admin/buku';
import TambahBuku from '../views/pages/admin/tambah-buku';

const adminRoutes = {
  '/': Dashboard,
  '/dashboard': Dashboard,
  '/pengguna': Pengguna,
  '/buku': Buku,
  '/tambah-buku': TambahBuku,
};

export default adminRoutes;
