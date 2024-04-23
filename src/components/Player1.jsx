import React from 'react'
import { useState, useEffect } from 'react'

function Player1() {
    const [keyword, setkeyword] = useState("")
    const [isloading, setisloading] = useState(true);
    const [tracks, settracks] = useState([])

    const gettracks = async () => {
        setisloading(true)
        let data = await fetch(`https://v1.nocodeapi.com/krishna24/spotify/qrtmCAKxesHCIwFr/search?q=${keyword === "" ? "trending" : keyword}daku&type=track`)
        let convertedData = await data.json();
        console.log(convertedData.tracks.items);
        settracks(convertedData.tracks.items);
        setisloading(false)
    }
    useEffect(() => {
        gettracks()
    }, [])

    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Music-Player
                    </a>

                    <div className="collapse navbar-collapse d-flex justify-content-center " id="navbarSupportedContent">


                        <input
                            value={keyword}
                            onChange={event => setkeyword(event.target.value)}
                            className="form-control me-2 w-75"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" onClick={gettracks}>
                            Search
                        </button>

                    </div>
                </div>
            </nav>

            <div className="container">
                <div className={`row ${isloading ? "" : "d-none"}`}>
                    <div className="col-12 py-5 text-center">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <button onClick={gettracks} className='btn btn-primary'>get data</button> */}
                    {
                        tracks.map((element) => {
                            return (
                                <div className='col-lg-3 col-md-6 py-2' key={element.id}>
                                    {/* <img className='border-2 w-100' src={element.album.images[0].url} alt="krishna" /> */}


                                    <div className="card" >
                                        {/* <img src="..." className="card-img-top" alt="..." /> */}
                                        <img className='card-img-top border-2 w-100' src={element.album.images[0].url} alt="krishna" />
                                        <div className="card-body">
                                            <h5 className="card-title">{element.name}</h5>
                                            <p className="card-text">
                                                Artist:{element.album.artists[0].name}
                                            </p>
                                            <p className="card-text">
                                                Release_Date: {element.album.release_date}
                                            </p>
                                            <audio src={element.preview_url} controls className='w-100'></audio>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </>
    )
}

export default Player1