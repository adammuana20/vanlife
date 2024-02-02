import IncomeImg from "../../assets/images/income-graph.png"

const Income = () => {
    const transactionsData = [
        { amount: 720, date: "Jan 3, '23", id: "1" },
        { amount: 560, date: "Dec 12, '22", id: "2" },
        { amount: 980, date: "Dec 3, '22", id: "3" },
    ]
    return (
        <section className="px-7 text-semi-black">
            <h2>Income</h2>
            <p className="text-dark-gray">
                Last <span className="underline font-bold">30 days</span>
            </p>
            <h3 className="text-semi-black font-black">$2,260</h3>
            <img
                className="w-full max-w-lg"
                src={IncomeImg}
                alt="Income graph"
            />
            <div className="info-header">
                <h3 className="font-bold mt-[3.75rem]">Your transactions (3)</h3>
                <p className="text-drak-gray">
                    Last <span className="underline font-bold">30 days</span>
                </p>
            </div>
            <div>
                { transactionsData.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-white mb-8 rounded-md px-7 py-5">
                        <h3 className="font-semi-bold m-0">${item.amount}</h3>
                        <p className="text-dark-gray">{item.date}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Income