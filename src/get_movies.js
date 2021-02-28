import React, { useState, useEffect } from "react";
import axios from "axios";

let count = 0;

export default function Get_Movies() {
    const [movie, setMovie] = useState("");
    let [movieDetails, setMovieDetails] = useState("");
    let [hoverShow, setHoverShow] = useState(false);
    let [showModal, setShowModal] = useState(false);
    let [inputValue, setInputValue] = useState("");
    let [hoverID, setHoverID] = useState(0);
    let trailerButton;

    const handleChange = (e) => {
        setHoverID(0);
        setInputValue(e.target.value);
    };

    if (inputValue == "") {
        setInputValue("Star Wars: Episode");
    }

    //////// show modal on click ///////////

    const handleShowDetails = (id) => {
        setShowModal(!showModal);
        setMovieDetails("");

        if (id != undefined) {
            axios
                .get(`/handleClick/${id}`)
                .then((response) => {
                    setHoverID(id);
                    setMovieDetails(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    //////// end /////////////

    //////// show details on hover and change details on input ////////

    const handleHover = (id) => {
        count = 1;
        setHoverID(id);

        axios
            .get(`/handleHover/${id}`)
            .then((response) => {
                setHoverShow(true);
                setMovieDetails(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (movie != undefined && movie != "" && count == 0) {
        handleHover(movie.titles[0].id);
    }

    //////////// end //////////////

    ///////// search for movies ///////////

    useEffect(() => {
        axios
            .get(`/handleSearch/${inputValue}`)
            .then((response) => {
                setMovie(response.data);
                handleHover(response.data.titles[0].id);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [inputValue]);

    ///////////// end ///////////////

    const hideModalFunction = () => {
        setShowModal(false);
    };

    const defaultImg = (e) => {
        e.target.src = "/src/img/defaultImg.jpg";
    };

    if (movieDetails.trailer) {
        if (movieDetails.trailer.link != "") {
            trailerButton = (
                <a
                    href={movieDetails.trailer.link}
                    target="_blank"
                    rel="noopener"
                >
                    <div className="backgroundTrailerButton">Watch Trailer</div>
                </a>
            );
        } else {
            trailerButton = <span></span>;
        }
    }

    return (
        <div className="movieContainer-parent">
            <nav>
                <div className="navElement">
                    <h1 id="logo">Watch this</h1>
                    <div id="search-container">
                        <i className="fas fa-search"></i>
                        <input
                            placeholder="Star Wars: Episode"
                            onChange={(e) => handleChange(e)}
                            id="search"
                            type="text"
                        />
                    </div>
                </div>
            </nav>

            {/* Show the background after loading the page and changing the input */}

            <div className="backgroundOnHover-parent">
                {movie && hoverID == 0 && (
                    <div className="backgroundOnHover">
                        <img
                            src={movie.titles[0].image}
                            onError={(e) => defaultImg(e)}
                        />

                        <div className="backgroundChild">
                            <div className="backgroundTitle">
                                {movie.titles[0].title}
                            </div>{" "}
                            <div className="moviePlot">
                                {" "}
                                {movieDetails.plot
                                    ? movieDetails.plot
                                    : "No description available"}
                            </div>
                            <div className="backgroundDetails">
                                <div>
                                    Rating:{" "}
                                    {movieDetails.rating
                                        ? movieDetails.rating
                                        : "-"}
                                </div>
                                <div>
                                    Lenght:{" "}
                                    {movieDetails.length
                                        ? movieDetails.length
                                        : "-"}
                                </div>
                                <div>
                                    Year:{" "}
                                    {movieDetails.year
                                        ? movieDetails.year
                                        : "-"}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Change background on hover */}

                {movie &&
                    movie.titles.map((element) => (
                        <div
                            className="background-container-onChange"
                            key={element.id}
                        >
                            {hoverShow && hoverID == element.id && (
                                <div className="backgroundOnHover">
                                    <img
                                        src={element.image}
                                        onError={(e) => defaultImg(e)}
                                    />

                                    <div className="backgroundChild">
                                        <div className="backgroundTitle">
                                            {element.title}
                                        </div>{" "}
                                        {!showModal && (
                                            <>
                                                <div className="moviePlot">
                                                    {" "}
                                                    {movieDetails.plot
                                                        ? movieDetails.plot
                                                        : "No description available"}
                                                </div>
                                                <div className="backgroundDetails">
                                                    <div>
                                                        Rating:{" "}
                                                        {movieDetails.rating
                                                            ? movieDetails.rating
                                                            : "-"}
                                                    </div>
                                                    <div>
                                                        Lenght:{" "}
                                                        {movieDetails.length
                                                            ? movieDetails.length
                                                            : "-"}
                                                    </div>
                                                    <div>
                                                        Year:{" "}
                                                        {movieDetails.year
                                                            ? movieDetails.year
                                                            : "-"}
                                                    </div>
                                                </div>
                                                <div className="backgroundOnHover-button-container">
                                                    <div>{trailerButton}</div>
                                                    <div>
                                                        <button
                                                            className="moreInfoButton"
                                                            onClick={() =>
                                                                handleShowDetails(
                                                                    element.id
                                                                )
                                                            }
                                                        >
                                                            More Information
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {showModal && (
                                            <div className="backgroundDetails">
                                                LOADING...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            {/* Show search results on input */}

            <div className="movieContainer-subParent-container">
                <h2>What you are looking for</h2>
                <i className="fas fa-chevron-right"></i>
                <i className="fas fa-chevron-left"></i>
                <div className="movieContainer-subParent-parent">
                    <div className="movieContainer-subParent">
                        <>
                            {movie &&
                                movie.titles.map((element) => (
                                    <div
                                        onClick={() =>
                                            handleShowDetails(element.id)
                                        }
                                        onMouseOver={() =>
                                            handleHover(element.id)
                                        }
                                        className="movieContainer"
                                        key={element.id}
                                    >
                                        <img
                                            src={element.image}
                                            onError={(e) => defaultImg(e)}
                                        />
                                        <div className="title-container">
                                            <div className="title">
                                                {element.title}
                                            </div>{" "}
                                            <span className="hoverShow">
                                                {hoverShow &&
                                                    hoverID == element.id && (
                                                        <>
                                                            <span>
                                                                Rating:{" "}
                                                                {movieDetails.rating
                                                                    ? movieDetails.rating
                                                                    : "-"}
                                                            </span>
                                                            <span>
                                                                Length:{" "}
                                                                {movieDetails.length
                                                                    ? movieDetails.length
                                                                    : "-"}
                                                            </span>
                                                            <span>
                                                                Year:{" "}
                                                                {movieDetails.year
                                                                    ? movieDetails.year
                                                                    : "-"}
                                                            </span>
                                                        </>
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </>
                    </div>
                </div>
            </div>

            <div id="footer">
                <span>by Philipp Specht</span>
            </div>

            {/* Show modal on click */}

            {showModal && movieDetails != "" && movieDetails != undefined && (
                <>
                    <div
                        className="modal"
                        onClick={() => hideModalFunction(movieDetails.id)}
                    >
                        <h2 className="modalTitle">{movieDetails.title}</h2>
                        <img
                            src={movieDetails.poster}
                            onError={(e) => defaultImg(e)}
                        />
                        <div className="movieText">
                            {movieDetails.plot
                                ? movieDetails.plot
                                : "No description available"}
                            <div className="modalDetails">
                                <h3>Movie Details</h3>
                                <div className="modalDetailsData">
                                    Rating:{" "}
                                    {movieDetails.rating
                                        ? movieDetails.rating
                                        : "-"}
                                </div>
                                <div className="modalDetailsData">
                                    Lenght:{" "}
                                    {movieDetails.length
                                        ? movieDetails.length
                                        : "-"}
                                </div>
                                <div className="modalDetailsData">
                                    Year:{" "}
                                    {movieDetails.year
                                        ? movieDetails.year
                                        : "-"}
                                </div>
                                <div className="actors">
                                    <h3>Actors</h3>
                                    {movieDetails.cast.map((element) => (
                                        <p key={element.actor_id}>
                                            {element.actor}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="backgroundOnHover-button-container">
                                <div>{trailerButton}</div>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => hideModalFunction()}
                        className="blurBackground"
                    ></div>
                </>
            )}
        </div>
    );
}
