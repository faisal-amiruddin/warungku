import { Link } from 'react-router-dom'
import Button from '../common/Button'

function MenuCard({ menu, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg">{menu.nama}</h3>
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${menu.kategori === 'Makanan' ? 'bg-orange-100 text-orange-700' : ''}
              ${menu.kategori === 'Minuman' ? 'bg-blue-100 text-blue-700' : ''}
              ${menu.kategori === 'Snack' ? 'bg-purple-100 text-purple-700' : ''}
            `}>
              {menu.kategori}
            </span>
          </div>
          
          <p className="text-2xl font-bold text-green-600 mb-2">
            Rp {menu.harga.toLocaleString('id-ID')}
          </p>
          
          {menu.deskripsi && (
            <p className="text-gray-500 text-sm mb-3">{menu.deskripsi}</p>
          )}
          
          <div className="flex items-center gap-2">
            <span className={`
              inline-flex items-center gap-1 text-sm font-medium
              ${menu.tersedia ? 'text-green-600' : 'text-red-600'}
            `}>
              <span className={`w-2 h-2 rounded-full ${menu.tersedia ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {menu.tersedia ? 'Tersedia' : 'Habis'}
            </span>
            
            {menu.createdAt && (
              <span className="text-xs text-gray-400">
                Ditambahkan: {new Date(menu.createdAt).toLocaleDateString('id-ID')}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 ml-4">
          <Link to={`/edit/${menu._id}`}>
            <Button variant="warning" size="sm">
              Edit
            </Button>
          </Link>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => onDelete(menu._id)}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MenuCard