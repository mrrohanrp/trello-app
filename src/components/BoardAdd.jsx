import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CREATEBOARD } from '../store/actions';
import { Modal, Button } from 'react-bootstrap';
import styles from './BoardAdd.module.scss';
import { getNewId } from '../utils/utils';

const colors = ['blue', 'orange', 'green', 'red', 'purple', 'pink', 'mint', 'sky', 'gray'];

const BoardAdd = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('blue');
  const [modalShow, setModalShow] = useState(false);

  const inputRef = useRef();

  const dispatch = useDispatch();

  const handleModalClose = () => {
    setName('');
    setModalShow(false);
  };

  const handleModalShow = () => {
    setModalShow(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };

  const handleClickColor = (e) => {
    setColor(e.target.value);
  };

  const handleClickAdd = (e) => {
    if (!e.key || e.key === 'Enter') {
      const boardId = 'b' + getNewId();
      dispatch(CREATEBOARD({ boardId, name, color }));
      setName('');
      handleModalClose();
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="col-lg-2 col-md-3 col-sm-4 my-2">
        <Button
          variant="outline-primary"
          onClick={handleModalShow}
          className="btn btn-block text-start h-100 w-100"
        >
          <p className="fw-bolder h5 h-100">Create new board</p>
        </Button>
      </div>

      <Modal show={modalShow} onHide={handleModalClose} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>Create board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col">
            {/**
             * board colors
             */}
            <div id="board-color" className="row-3">
              <div>
                <label htmlFor="background-picker">Background</label>
              </div>
              <ul id="background-picker" className="d-flex p-0 mb-2">
                {colors.map((color) => (
                  <li className={`${styles.color_picker} me-2`} key={color}>
                    <Button
                      className={`btn bg-${color} bg-${color}-hover h-100 w-100`}
                      id={`option-${color}`}
                      title={color}
                      value={color}
                      onClick={handleClickColor}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div id="board-title" className="row-auto">
              <label className="w-100">
                <div>
                  Board title <span className="text-danger ms-1">*</span>
                </div>
                <input
                  className={`${styles.title_input} bg-${color}`}
                  ref={inputRef}
                  type="text"
                  required=""
                  aria-invalid="true"
                  aria-required="true"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  onChange={handleChange}
                  value={name}
                  maxLength={50}
                />
              </label>
              {!name && (
                <div className="d-flex flex-row">
                  <span role="img" aria-label="wave" className="me-2">
                    👋
                  </span>
                  <p>Board title is required</p>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button variant="danger" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={handleClickAdd}
            disabled={!name || !color}
            className={`bg-${color} bg-${color}-hover`}
          >
            Create Board
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BoardAdd;
