import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MenuForm from '../components/menu/MenuForm'
import Loading from '../components/common/Loading'
import { useMenu } from '../hooks/useMenu'

function EditMenu() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateMenu, getMenu } = useMenu()
  const [menuData, setMenuData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu(id)
        setMenuData(data)
      } catch (error) {
        alert('Gagal memuat data menu')
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [id, getMenu, navigate])

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      await updateMenu(id, formData)
      navigate('/')
    } catch (error) {
      alert('Gagal mengupdate menu: ' + (error.response?.data?.message || error.message))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <Loading message="Memuat data menu..." />
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Menu</h1>
        <p className="text-gray-500 mt-1">
          Perbarui informasi menu {menuData?.nama}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <MenuForm 
          initialData={menuData} 
          onSubmit={handleSubmit} 
          isLoading={isSubmitting}
        />
      </div>
    </div>
  )
}

export default EditMenu