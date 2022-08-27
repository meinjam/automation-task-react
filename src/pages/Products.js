import React, { useEffect, useState } from 'react';
import ArrowIcon from '../assets/img/chevron-right.svg';
import OrderModal from '../components/Modal';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import Search from '../components/Products/Search';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setmodalType] = useState('Book');

  useEffect(() => {
    // fetchData();
    const getUrl = new URL(window.location.href);
    const paramsSearch = getUrl.searchParams.get('search');

    if (paramsSearch) {
      // console.log('params found', paramsSearch);
      fetchData(paramsSearch);
      setSearchTxt(paramsSearch);
    } else {
      // console.log('no params found');
      fetchData();
    }
  }, []);

  const fetchData = (search = '') => {
    setFetchingData(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/products?search=${search}`)
      .then((resp) => {
        console.log(resp.data);
        setProducts(resp.data);
        setFetchingData(false);
      })
      .catch((error) => {
        console.log(error.response);
        setFetchingData(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTxt.trim() === '') {
      toast.error('Please type something and search', {
        autoClose: 2000,
      });
    } else {
      // console.log(searchTxt);
      const params = new URLSearchParams(window.location.search);
      params.set('search', searchTxt);
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${params}`
      );

      fetchData(searchTxt);
    }
  };

  const handleOpenModal = (type) => {
    setmodalType(type);
    setShowModal(true);
  };

  return (
    <section className='products py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <Search
              searchTxt={searchTxt}
              setSearchTxt={setSearchTxt}
              handleSearch={handleSearch}
              fetchData={fetchData}
            />

            <div className='table-responsive'>
              <table className='table table-bordered shadow-sm'>
                <thead>
                  <tr>
                    <th className='id'>
                      <div className='th-div'>
                        <span className='name'>Id</span>
                        <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span>
                      </div>
                    </th>
                    <th className='name'>
                      <div className='th-div'>
                        <span className='name'>Name</span>
                        <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span>
                      </div>
                    </th>
                    <th className='code'>
                      <div className='th-div'>
                        <span className='name'>Code</span>
                        <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span>
                      </div>
                    </th>
                    <th className='availability'>
                      <div className='th-div'>
                        <span className='name'>Availability</span>
                        <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span>
                      </div>
                    </th>
                    <th className='ntr'>
                      <div className='th-div'>
                        <span className='name'>Needing To Repair</span>
                        <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span>
                      </div>
                    </th>
                    <th className='ntdurar'>
                      <div className='th-div'>
                        <span className='name'>Durability</span>
                        <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span>
                      </div>
                    </th>
                    <th className='mile'>
                      <div className='th-div'>
                        <span className='name'>Mileage</span>
                        <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!fetchingData && (
                    <>
                      {products &&
                        products.map((product, i) => (
                          <tr key={i}>
                            <td>#{i + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.code}</td>
                            <td>{product.availability ? 'True' : 'False'}</td>
                            <td>{product.needing_repair ? 'True' : 'False'}</td>
                            <td>{product.durability}</td>
                            <td>{product.mileage}</td>
                          </tr>
                        ))}
                    </>
                  )}
                </tbody>
              </table>

              {fetchingData && (
                <div className='mb-3'>
                  <Skeleton count={10} height={40} />
                </div>
              )}
            </div>

            {!fetchingData && (
              <>
                {products && products.length === 0 && (
                  <>
                    <h5>Sorry no data found.</h5>
                  </>
                )}
              </>
            )}

            {!fetchingData && (
              <>
                {products && products.length !== 0 && (
                  <div className='button-group'>
                    <button
                      className='me-2'
                      onClick={() => handleOpenModal('Book')}
                    >
                      Book
                    </button>
                    <button onClick={() => handleOpenModal('Return')}>
                      Return
                    </button>
                  </div>
                )}
              </>
            )}

            <OrderModal
              showModal={showModal}
              setShowModal={setShowModal}
              modalType={modalType}
              products={products}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
