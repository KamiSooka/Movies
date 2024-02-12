import { Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import React, { useState } from "react";
import { Button } from 'react-bootstrap';
const API_IMG="https://image.tmdb.org/t/p/w500/";

const MovieBox = ({title, poster_path, vote_average, release_date, overview})=>{
    
    const [show, setShow]=useState(false); 

    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);
    
    return(
        <div className="card text-center bg-secondary mb-3">
            <div className="card-body">
                <img className="card-img-top" src={API_IMG + poster_path} alt={title} />
                <div className="card-body">
                    <button type="button" className="btn btn-dark" onClick={handleShow}>Voir plus</button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <ModalTitle>Détails du film</ModalTitle>
                        </Modal.Header>
                        <ModalBody>
                        <img className="card-img-top" src={API_IMG+poster_path} alt="{title}"/>
                            <h3>{title}</h3>
                            <h4>IMDb : {vote_average}</h4>
                            <h5>Date de sortie : {release_date}</h5>
                            <br></br>
                            <h6>Aperçu</h6>
                            <p>{overview}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button varient="secondary" onClick={handleClose}>Fermer</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </div>
    )
}


export default MovieBox;