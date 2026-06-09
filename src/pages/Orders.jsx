export default function Orders() {
    const orders = [
        { id: 1, customer: "Budi", total: 150000, status: "Pending" },
        { id: 2, customer: "Siti", total: 250000, status: "Completed" },
        { id: 3, customer: "Andi", total: 100000, status: "Processing" },
    ]

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Orders</h1>

            <div className="bg-white p-4 rounded-xl shadow">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">No</th>
                            <th className="p-2">Customer</th>
                            <th className="p-2">Total</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-gray-100">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{item.customer}</td>
                                <td className="p-2">Rp {item.total.toLocaleString()}</td>
                                <td className="p-2">
                                    <span
                                        className={`px-2 py-1 rounded text-white text-sm ${item.status === "Completed"
                                                ? "bg-green-500"
                                                : item.status === "Pending"
                                                    ? "bg-yellow-500"
                                                    : "bg-blue-500"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-2">
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                                        Detail
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