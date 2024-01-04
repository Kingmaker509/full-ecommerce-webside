import React from 'react'
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({ review }) => {

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activecolor: "tomato",
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25
  }

  console.log(review);


  return (
    <>
      <div className="col-lg-3 col-md-6 col-12 border ">
        <div className="p-4 reciew-card">
          <img src="/photo.png" className='img-fluid profile1 py-1' alt="profile picher" />
          <p className='font1'>{review.name}</p>
          <ReactStars {...options} />
          <span className='font2 py-2'>{review.comment}</span>
       </div>
      </div>
    </>
  )
}

export default ReviewCard