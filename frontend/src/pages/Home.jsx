import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MenuList from '../components/menu/MenuList'
import Button from '../components/common/Button'
import { useMenu } from '../hooks/useMenu'

function Home() {
  const { menuList, loading, error, fetchAll, deleteMenu } = useMenu()

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const handleDelete = async (id) => {
    if (window.confirm('Yakin mau hapus menu ini? Tindakan ini tidak bisa dibatalkan.')) {
      try {
        await deleteMenu(id)
      } catch (err) {
        alert('Gagal menghapus menu: ' + err.message)
      }
    }
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
        <Button onClick={fetchAll} variant="primary" className="mt-4">
          Coba Lagi
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daftar Menu</h1>
          <p className="text-gray-500 mt-1">
            Kelola menu warungmu dengan mudah
          </p>
        </div>
        
        {menuList.length > 0 && (
          <Link to="/tambah">
            <Button variant="primary">
              + Tambah Menu
            </Button>
          </Link>
        )}
      </div>

      <MenuList 
        menuList={menuList}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Home