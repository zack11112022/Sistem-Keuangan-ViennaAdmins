export default function PageHeader({ title }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500">Welcome back 👋</p>
    </div>
  )
}