export default function Customers() {
    const data = [
        { id: 1, name: "Budi", email: "budi@mail.com", phone: "08123456789" },
        { id: 2, name: "Siti", email: "siti@mail.com", phone: "08234567890" },
        { id: 3, name: "Andi", email: "andi@mail.com", phone: "08345678901" },
    ]

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Customers</h1>

            <div className="bg-white p-4 rounded-xl shadow">
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border p-2 rounded w-1/3"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        + Add Customer
                    </button>
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">No</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-gray-100">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.email}</td>
                                <td className="p-2">{item.phone}</td>
                                <td className="p-2 flex gap-2">
                                    <button className="bg-yellow-400 px-2 py-1 rounded text-white">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 px-2 py-1 rounded text-white">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}