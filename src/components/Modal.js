import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const OrderModal = ({ showModal, setShowModal, modalType, products }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [milage, setMilage] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName='book-return'
      >
        <div className='modal-body'>
          <div className='head'>
            <h5>{modalType} a product</h5>
            <button
              type='button'
              className='btn-close'
              onClick={() => setShowModal(false)}
            ></button>
          </div>

          <div className='body'>
            <select
              className='form-select form-select'
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value=''>Select a product</option>
              {products &&
                products.map((product, i) => (
                  <option value={product.name} key={i}>
                    {product.name}
                  </option>
                ))}
            </select>

            <div className='date my-3'>
              {modalType === 'Book' ? (
                <>
                  <input
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type='date'
                    className='form-control me-1'
                  />
                  <input
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type='date'
                    className='form-control ms-1'
                  />
                </>
              ) : (
                <input
                  type='text'
                  className='form-control'
                  placeholder='Used Milage'
                  value={milage}
                  onChange={(e) => setMilage(e.target.value)}
                />
              )}
            </div>
          </div>

          <div className='footer'>
            <button className='me-2 no' onClick={() => setShowModal(false)}>
              Close
            </button>
            <button
              className='yes'
              onClick={() => {
                setShowModal(false);
                setConfirmModal(true);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        show={confirmModal}
        onHide={() => setConfirmModal(false)}
        dialogClassName='book-return'
      >
        <div className='modal-body'>
          <div className='head'>
            <h5>{modalType} a product</h5>
            <button
              type='button'
              className='btn-close'
              onClick={() => setConfirmModal(false)}
            ></button>
          </div>

          <div className='body'>
            <p className='mb-1 fw-semibold'>Yout total price is $1200</p>
            <p className='fw-semibold'>Do you want to procedure?</p>
          </div>

          <div className='footer'>
            <button className='me-2 no' onClick={() => setConfirmModal(false)}>
              Close
            </button>
            <button className='yes' onClick={() => setConfirmModal(false)}>
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderModal;
