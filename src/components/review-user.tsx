import { StarIcon, UserRound } from "lucide-react"

const reviews = [
    {
        name: "John Doe",
        review: "Great service and friendly staff!",
        rating: 5,
    },
    {
        name: "Jane Smith",
        review: "The experience was average, could be improved.",
        rating: 3,
    },
    {
        name: "Alice Johnson",
        review: "Not satisfied with the quality of the product.",
        rating: 2,
    },
    {
        name: "Bob Brown",
        review: "Excellent quality and fast delivery!",
        rating: 4,
    }
]

export default function ReviewUser() {
    const backgroundColors = [
        "bg-cyan-200",
        "bg-emerald-300",
        "bg-amber-300"
    ]

    const textColors = [
        "text-blue-700",
        "text-green-700",
        "text-orange-700"
    ]

    return (
        <div className="flex flex-wrap w-full gap-4 justify-center mt-18">
            {reviews.map((review, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-sm relative">
                    <div className={`absolute -top-8 left-2 w-18 h-18 rounded-xl text-xl flex justify-center items-center ${backgroundColors[index % backgroundColors.length]}`}>
                        <UserRound className="w-10 h-10 text-white" />
                    </div>
                    <div className="pb-4">
                        <h3 className={`${textColors[index % textColors.length]} font-bold text-xl pl-18`}>{review.name}</h3>
                        <p className="mb-2">{review.review}</p>
                    </div>
                    <span className="bg-white p-2 rounded-lg absolute -bottom-5 right-5 shadow-md">
                        {Array.from({length: review.rating}).map((_, id) => (
                            <StarIcon key={id} className="w-5 h-5 text-yellow-400 inline-block" />
                        )) }
                    </span>
                </div>
            ))}
        </div>
    )
}

function InitialIcon({ title }: { title: string }) {
	const initial = title
		.split(" ")
		.filter((_, index) => index < 2)
		.map((word) => word.charAt(0).toUpperCase())
		.join("");
	return initial;
}