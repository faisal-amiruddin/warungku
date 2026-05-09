import MenuCard from './MenuCard'
import EmptyState from '../common/EmptyState'
import Loading from '../common/Loading'
import Button from '../common/Button'
import { Link } from 'react-router-dom'

function MenuList({ menuList, loading, onDelete }) {
  if (loading) {
    return <Loading message="Memuat daftar menu..." />
  }

  if (menuList.length === 0) {
    return (
      <EmptyState
        icon="🍜"
        title="Belum Ada Menu"
        description="Warungmu masih kosong nih. Yuk, tambahin menu pertama!"
        action={
          <Link to="/tambah">
            <Button variant="primary" size="lg">
              + Tambah Menu Pertama
            </Button>
          </Link>
        }
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {menuList.map(menu => (
        <MenuCard 
          key={menu._id} 
          menu={menu} 
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default MenuList