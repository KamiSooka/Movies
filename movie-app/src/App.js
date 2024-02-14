import React, { useState, useEffect } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, FormControl, Nav, Navbar, Button } from 'react-bootstrap';
const api_key = process.env.REACT_APP_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
 

  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = query ? `${API_SEARCH}${query}&page=${currentPage}` : `${API_URL}&page=${currentPage}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setMovies(data.results);
        console.log(data.results);
        console.log(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
  
    fetchMovies();
  }, [currentPage, query]);
  
  const searchMovie = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1); // Reset currentPage to 1 when performing a new search
  };

  const changeHandler = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    searchMovie(searchQuery);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant='dark'>
        <Container fluid>
          <Navbar.Brand href='/home'>MovieDb App</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll'></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav
              className='me-auto my-2 my-lg-3'
              style={{ maxHeight: '100px' }}
              navbarScroll
            ></Nav>

            <Form className='d-flex'>
              <FormControl
                type='search'
                placeholder='Recherche de film'
                className='me-2'
                aria-label='search'
                name='query'
                value={query}
                onChange={changeHandler}
              ></FormControl>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className='container'>
            <div className='grid'>
              {movies.map((movieReq) =>
                <MovieBox key={movieReq.id} title={movieReq.title} {...movieReq} />
              )}
            </div>
          </div>
        ) : (
          <h2>Désolé !! Aucun Film Trouvé</h2>
        )}
      </div>

      <div style={{ textAlign: 'center', margin: '20px' }}>
        {(currentPage===1)?null:
        <Button variant="secondary" onClick={prevPage}>Page précédente</Button>}{' '}
        <Button variant="secondary" onClick={nextPage}>Page suivante</Button>
      </div>
    </>
  );
}

export default App;
