import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const OrderModal = ({ showModal, setShowModal, modalType, products }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [milage, setMilage] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const resetState = () => {
    setTotalPrice(0);
    setMilage('');
    setStartDate('');
    setEndDate('');
    setSelectedProduct('');
  };

  const calculateDays = (startDate, endDate) => {
    let difference = endDate.getTime() - startDate.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  const bookExecute = () => {
    if (selectedProduct === '') {
      toast.error('Please select a product.', {
        autoClose: 2000,
      });
    } else if (startDate === '' || startDate === null) {
      toast.error('Please select start date.', {
        autoClose: 2000,
      });
    } else if (endDate === '' || endDate === null) {
      toast.error('Please select end date.', {
        autoClose: 2000,
      });
    } else if (calculateDays(new Date(startDate), new Date(endDate)) < 1) {
      toast.error('Start date can not be same or greater than end date.', {
        autoClose: 3000,
      });
    } else {
      const totalDays = calculateDays(new Date(startDate), new Date(endDate));

      const product = products.filter(
        (product) => product.id === parseInt(selectedProduct)
      );
      // console.log(product[0].price * totalDays);
      setTotalPrice(product[0].price * totalDays);
      setShowModal(false);
      setConfirmModal(true);
    }
  };

  const returnExecute = () => {
    if (selectedProduct === '') {
      toast.error('Please select a product.', {
        autoClose: 2000,
      });
    } else if (milage === '' || milage === null) {
      toast.error('Please enter milage.', {
        autoClose: 2000,
      });
    } else {
      const product = products.filter(
        (product) => product.id === parseInt(selectedProduct)
      );
      // console.log(product);
      // console.log(milage);
      setTotalPrice(product[0].price * parseInt(milage));
      setShowModal(false);
      setConfirmModal(true);
    }
  };

  const handleFirstModal = () => {
    if (modalType === 'Book') {
      bookExecute();
    } else if (modalType === 'Return') {
      returnExecute();
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          resetState();
        }}
        dialogClassName='book-return'
      >
        <div className='modal-body'>
          <div className='head'>
            <h5>{modalType} a product</h5>
            <button
              type='button'
              className='btn-close'
              onClick={() => {
                setShowModal(false);
                resetState();
              }}
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
                  <option value={product.id} key={i}>
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
                  type='number'
                  className='form-control'
                  placeholder='Used Milage'
                  value={milage}
                  onChange={(e) => setMilage(e.target.value)}
                />
              )}
            </div>
          </div>

          <div className='footer'>
            <button
              className='me-2 no'
              onClick={() => {
                resetState();
                setShowModal(false);
              }}
            >
              Close
            </button>
            <button className='yes' onClick={handleFirstModal}>
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        show={confirmModal}
        onHide={() => {
          resetState();
          setConfirmModal(false);
        }}
        dialogClassName='book-return'
      >
        <div className='modal-body'>
          <div className='head'>
            <h5>{modalType} a product</h5>
            <button
              type='button'
              className='btn-close'
              onClick={() => {
                resetState();
                setConfirmModal(false);
              }}
            ></button>
          </div>

          <div className='body'>
            <p className='mb-1 fw-semibold'>
              Your {modalType === 'Book' ? 'estimated' : 'total'} price is $
              {totalPrice}
            </p>
            <p className='fw-semibold'>Do you want to procedure?</p>
          </div>

          <div className='footer'>
            <button
              className='me-2 no'
              onClick={() => {
                resetState();
                setConfirmModal(false);
              }}
            >
              Close
            </button>
            <button
              className='yes'
              onClick={() => {
                resetState();
                setConfirmModal(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderModal;
