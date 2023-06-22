import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../Css/form.scss';

export default function UpdateTurn() {

    let navigate = useNavigate();

    const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    const routeNameRegex = /^[a-z]+(?:-[a-z]+)*$/;

    const { id } = useParams();

    const [busTurn, setBusTurn] = useState({
        turnNo: "",
        turnTime: "",
        routeName: ""
    });

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [error, setError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const { turnNo, turnTime, routeName } = busTurn;

    const onInputChange = (e) => {
        setBusTurn({ ...busTurn, [e.target.name]: e.target.value }
        )
    };

    useEffect(() => {
        loadBusTurns();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!turnNo) {
            showError("Please enter a value for Turn No.")
        }
        else if (!/^T\d{1,3}$/.test(turnNo)) {
            showError("Turn No. should be in the format T#, T##, or T###.(e.g., T8))");
        }
        else if (!turnTime) {
            showError("Please enter a value for Turn Time.")
        }
        else if (!timeRegex.test(turnTime)) {
            showError("Turn Time should be in the format HH:MM (e.g., 09:30).");
        }
        else if (!routeName) {
            showError("Please enter a value for Route Name.")
        }
        else if (
            routeName.length >= 100 || !routeNameRegex.test(routeName)) {
                showError(
                "Route Name should only contain simple letters and a hyphen (-), with a maximum length of 100 characters."
            );
        }
        else {
            setShowConfirmationModal(true);
        }
    };

    const handleConfirmUpdate = async () => {
        setShowConfirmationModal(false);
        try {
            await axios.put(`http://localhost:8080/api/v1/turn/${id}`, busTurn);
            setShowSuccessModal(true);
        } catch (error) {
            showError("Failed to update turn ");
        }
    };

    const showError = (errorMessage) => {
        setError(errorMessage);
        setShowErrorModal(true);
    };

    const handleCloseModals = () => {
        setShowConfirmationModal(false);
        setShowSuccessModal(false);
        setShowErrorModal(false);
        navigate('/turn');
    };
        
    const loadBusTurns = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/turn/${id}`);
        setBusTurn(result.data);
    }

    return (
        <div className='contrainer'>
            <div className="detailsBox">
                <div >
                    <h2 >Update details of Turns</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='turnNo' className='label' rm>Turn No</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter turn no '
                                name='turnNo'
                                value={turnNo}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='turnTime' className='label'>Turn Time</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter turn time'
                                name='turnTime'
                                value={turnTime}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='routeName' className='label'>Route Name</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter route name'
                                name='routeName'
                                value={routeName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="button"  >Submit</button>
                        <Link to="/turn" style={{ textDecoration: "none" }}> <button>Cancel</button></Link>

                    </form>
                </div>
            </div>
            <Modal show={showConfirmationModal} onHide={handleCloseModals} centered >
                <Modal.Header closeButton style={{ backgroundColor: "#5fb689" }}>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontFamily: "sans-serif" }}>
                    Are you sure you want to update this turn?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModals}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUpdate}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showSuccessModal} onHide={handleCloseModals} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#5fb689" }}>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontFamily: "sans-serif" }}>
                    <p>Bus turn updated successfully!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModals}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showErrorModal}
                onHide={() => setShowErrorModal(false)}
                centered
            >
                <Modal.Header closeButton style={{ backgroundColor: "#4ca1c6e1" }}>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontFamily: "sans-serif" }}>
                    <p>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowErrorModal(false)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}