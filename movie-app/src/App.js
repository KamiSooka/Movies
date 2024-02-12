import React,{  useState , useEffect } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, FormControl, Nav, Navbar, Button } from 'react-bootstrap';

const API_URL='https://api.themoviedb.org/3/movie/popular?api_key=724291aa1f2e89f75787cf66d5d1d8c8';
const API_SEARCH='https://api.themoviedb.org/3/search/movie?api_key=724291aa1f2e89f75787cf66d5d1d8c8&query';

function App() {

  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(()=>{
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data.results)
      setMovies(data.results)
    })
  }, [])


  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Recherche");
    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=724291aa1f2e89f75787cf66d5d1d8c8&query=${query}`;
      const res= await fetch(url);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
  return (
    <>
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container fluid>
        <Navbar.Brand href='/home'>MovieDb App</Navbar.Brand>
        <Navbar.Brand href='/home'>Tendance</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll'></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav 
            className='me-auto my-2 my-lg-3'
            style={{maxHeight: '100px'}}
            navbarScroll></Nav>

            <Form className='d-flex' onSubmit={searchMovie}>
              <FormControl
              type='search'
              placeholder='Recherche de film'
              className='me-2'
              aria-label='search'
              name='query'
              value={query} onChange={changeHandler}></FormControl>

              <Button variant="secondary" type="submit">Recherche</Button>
            </Form>
          </Navbar.Collapse>
      </Container>
      </Navbar>
      <div>
        {movies.length > 0 ?(
        <div className='container'>
          <div className='grid'>
            {movies.map((movieReq)=>
            <MovieBox key={movieReq.id} {...movieReq}/>)}
          </div>
        </div>
        ):(
          <h2>Désolé !! Aucun Film Trouvé</h2>
        )}
        
      
    
      </div>
    </>
  );
}

export default App;
