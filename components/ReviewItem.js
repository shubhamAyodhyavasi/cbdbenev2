const ReviewItem = () => {
    return(        
        <div className="rating__wrapper">
            <div className="rating__star">
                <h5 className="rating__star--name">Name</h5>
            </div>
            <div className="rating__text">
                <h5 className="rating__text--name">Best product ever!!!</h5>
                <p className="rating__text--msg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
            </div>
            <div className="rating__date">
                <p className="rating__date--msg">12 september 2017</p>
            </div>
        </div>
    )

}

export default ReviewItem