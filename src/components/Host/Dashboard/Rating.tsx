import React from 'react'
import { BsStarFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Rating = () => {
  return (
    <section className="bg-semi-orange py-6 px-7 flex items-center">
        <h2 className="m-0">Review score</h2>
        <BsStarFill className="text-primary-color ml-4 text-2xl" />
        <p className="ml-1 text-xl text-dark-gray mr-auto">
            <span className="font-bold text-semi-black">5.0</span>/5
        </p>
        <Link to="reviews">Details</Link>
    </section>
  )
}

export default Rating