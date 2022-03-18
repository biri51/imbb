import { Container, Content } from './styles'
import React, { useState } from 'react'
// import IMDBlogo from '../../assets/IMDB_Logo.svg'
import bb from '../../assets/bb.jpg'
import { api } from '../../services/api'

export function SearchBar() {

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [film, setFilm] = useState({
        title: '',
        year: '',
        imDb: '',
        metacritic: '',
        rottenTomatoes: '',
    })



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    const handleResults = async (event: React.MouseEvent<HTMLElement>) => {
        const request = await api.get(`/en/API/SearchMovie/k_2x0536bh/${search}`)
        setResults(request.data.results)
        // console.log(results)
    }

    const handleOnClick = async (id: string) => {
        const request = await api.get(`/en/API/Ratings/k_2x0536bh/${id}`)
        // console.log(request)
        setFilm(request.data)
        // console.log(film)
    }


    return (
        <div>
            <Container>
                {/* <img src={IMDBlogo} alt="API IMDB" className="logo" /> */}
                <input type="text" placeholder='PESQUISE SEU FILME' value={search} onChange={handleInputChange} />
                <button type="submit" onClick={handleResults}>
                    <img src={bb} className="bbImg" alt="bbusque" />
                </button>
            </Container>

            <Content>
                <div className='results'>
                    {results.map((movie: any) => (
                        <li>
                            <img src={movie.image} alt={movie.title}></img>
                            <span>{movie.title}</span>
                            <button onClick={() => handleOnClick(movie.id)}>
                                <strong>{movie.title}</strong>
                            </button>
                        </li>
                    ))}
                </div>
                <div>
                    <span>Título:{film.title}</span>
                    <span>{film.year}</span>
                    <span>{film.imDb}</span>
                    {/* <span>{film.metacritic}</span>
                    <span>{film.rottenTomatoes}</span> */}
                </div>
            </Content>
        </div>
    )
}