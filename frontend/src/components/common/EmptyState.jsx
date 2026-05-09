function EmptyState({ 
  icon = '📭', 
  title = 'Data Kosong', 
  description = 'Belum ada data yang tersedia.',
  action = null 
}) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {action}
    </div>
  )
}

export default EmptyState