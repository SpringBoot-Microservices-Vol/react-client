import React, {useRef, useState} from "react";
import { API }  from "../utils/API";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import {useForm} from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SupervisorForm() {
    const baseUrl = '/supervisors';
    const {handleSubmit} = useForm();
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let firstName = useRef();
    let lastName = useRef();
    // let hall = useRef();

    let myValue = {
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        // hallDTO: undefined,
    };

    function handleInsert() {
        myValue.id = -1;
        myValue.firstName = firstName.current.value;
        myValue.lastName = lastName.current.value;

        API.post(baseUrl, myValue).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        handleClose();


    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleShow}>
                <Modal.Header>
                    <Modal.Title>Insereaza in baza de date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId={"firstName"}>
                            <Form.Label>Prenume</Form.Label>
                            <Form.Control ref={firstName} type="text" placeholder=""/>
                        </Form.Group>

                        <Form.Group controlId={"lastName"}>
                            <Form.Label>Nr. maxim de locuri</Form.Label>
                            <Form.Control ref={lastName} type="text" placeholder=""/>
                        </Form.Group>

                        <Button variant="secondary" onClick={handleClose}>
                            Inchide
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit(handleInsert)}>
                            Insereaza
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </React.Fragment>
    )
}