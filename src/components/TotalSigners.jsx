import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function TotalSigners(props) {
  const [value, setValue] = useState("3");
  const [minimumSigners, setMinimumSigners] = useState("3");
  const [error, setError] = useState("");
  const [errorMinimum, setErrorMinimum] = useState("");

  //   useEffect(() => {
  //     setError("");
  //     setErrorMinimum("");
  //   }, [value, minimumSigners]);
  const save = () => {
    props.setOpen("false");
  };
  console.log("tabs popup", props.tab, props.open);
  return (
    <div>
      <Button onClick={() => save()}>X</Button>
      <Modal.Dialog
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.open}
      >
        <Modal.Header>
          <Modal.Title>Select Signers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{props.tab}</p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>How many signers do you want to create ?</Form.Label>
              <Form.Control
                onChange={(e) => setValue(e.target.value)}
                value={value}
                type="number"
                placeholder="Total signers"
                autoFocus
              />
              <span className="text-danger">{error}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                What is the minimum number of signatures required to sign a
                transaction ?
              </Form.Label>
              <Form.Control
                onChange={(e) => setMinimumSigners(e.target.value)}
                value={minimumSigners}
                type="number"
                placeholder="Minimum signers"
                autoFocus
              />
              <span className="text-danger">{errorMinimum}</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => save()}>
            Next
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
      {/* <h3>totalSigners</h3>
      <form>
        <label>How many signers do you want to create ?</label>
        <input name='value' value={value} onChange={e => setValue(e.target.value)}></input>
        <label>
          What is the minimum number of signatures required to sign a
          transaction ?
        </label>
        <input name='minimumSigners' value={minimumSigners} onChange={e => setMinimumSigners(e.target.value)}></input>
        <button>Next</button>
      </form> */}
    </div>
  );
}

export default TotalSigners;
