import React from 'react'
import CardSlider from "../components/CardSlider"

export default React.memo(function Slider({movies}) {

    const getMoviesFromRange = (from,to) =>{
        return movies.slice(from,to)
        //we only need 20 movies for every categories
    }

  return (
    <div>
        <CardSlider title = "Trending Now" data={getMoviesFromRange(0,10)} />
        <CardSlider title = "New Releases" data={getMoviesFromRange(10,20)} />
        <CardSlider title = "Blockbuster Movies" data={getMoviesFromRange(20,30)} />
        <CardSlider title = "Top 10 today" data={getMoviesFromRange(30,40)} />
        <CardSlider title = "Action Movies" data={getMoviesFromRange(40,50)} />
        <CardSlider title = "Thriller Movies" data={getMoviesFromRange(50,60)} />

    </div>
  )
})
