import { BsStarFill } from "react-icons/bs"
import ReviewImg from "../../assets/images/reviews-graph.png"

const Reviews = () => {
    const reviewsData = [
        {
            rating: 5,
            name: "Elliot",
            date: "January 3, 2023",
            text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
            id: "1",
        },
        {
            rating: 5,
            name: "Sandy",
            date: "December 12, 2022",
            text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
            id: "2",
        },
    ]
    
    return (
        <section className="px-7 text-semi-black">
            <div className="flex items-center mb-8">
                <h2 className="font-bold m-0 mr-5">Your reviews</h2>
                <p className="m-0 text-dark-gray">
                    Last <span className="underline font-bold">30 days</span>
                </p>
            </div>
            <img
                className="w-full max-w-lg mb-9"
                src={ReviewImg}
                alt="Review graph"
            />
            <h3>Reviews (2)</h3>
            {reviewsData.map((review) => (
                <div key={review.id}>
                    <div className="my-6">
                        <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                                <BsStarFill className="text-primary-color mr-1" key={i} />
                            ))}
                        </div>
                        <div className="flex">
                            <p className="text-semi-black mr-3 font-semibold">{review.name}</p>
                            <p className="text-[#8c8c8c]">{review.date}</p>
                        </div>
                        <p>{review.text}</p>
                    </div>
                    <hr className="bg-[#c7c7c7] h-px border-none" />
                </div>
            ))}
        </section>
    )
}

export default Reviews