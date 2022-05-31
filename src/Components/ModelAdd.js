import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ModelAdd = () => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageName, setErrorMessageName] = useState("");
  const [valid, setValid] = useState(false);

  const handleClose = () => {setShow(false); setErrorMessageName("");setErrorMessage("")}
  const handleShow = () => {setShow(true);setErrorMessageName("");setErrorMessage("")}

  const checkUrl = (e) => {
    const { value } = e.target;
    setValid(validate(value));
    console.log(valid);
  };

  const validate = (value) => {
    if (validateUrl(value)) {
      setErrorMessage("Is Valid URL");
    } else {
      setErrorMessage("Is Not Valid URL");
    }
  };

  const validateUrl = (websiteUrl) => {
    var urlRegEx = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return urlRegEx.test(websiteUrl.toLowerCase());
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    
    if (formDataObj.name.length > 0) {
      const myPoki = [...JSON.parse(localStorage.getItem("my-Pokies")), formDataObj];

      localStorage.setItem("my-Pokies",JSON.stringify( myPoki));
      console.log(localStorage.getItem('my-Pokies'))
      handleClose();
    } else {
        e.preventDefault();
        setErrorMessage("Is Not Valid URL");
        setErrorMessageName("Is Not Valid Name")
      
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Pokemon
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={onFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add pokemon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter name" />
              <Form.Text style={{ color: "red" }} className="text-muted">
                {errorMessageName}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImg">
              <Form.Label>Img</Form.Label>
              <Form.Control
                type="text"
                name="urlImage"
                placeholder="img Url"
                onChange={checkUrl}
              />
              <Form.Text style={{ color: "red" }} className="text-muted">
                {errorMessage}
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModelAdd;
