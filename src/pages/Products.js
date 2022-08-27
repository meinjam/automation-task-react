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

  const [sortName, setSortName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    let searchTxt = '';
    let pType = 'id';
    let pName = 'asc';

    for (const param of params) {
      if (param[0] === 'search') {
        searchTxt = param[1];
      } else {
        pType = param[0];
        pName = param[1];
        setSortName(`${param[0]}_${param[1]}`);
      }
    }

    fetchData(searchTxt, pType, pName);
  }, []);

  const fetchData = (search = '', sortBy = 'id', type = 'asc') => {
    setFetchingData(true);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/products?search=${search}&${sortBy}=${type}`
      )
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

      let pName = 'id';
      let pType = 'asc';

      for (const param of params) {
        // console.log(param[0]);
        if (param[0] === 'id' || param[0] === 'name' || param[0] === 'price') {
          pName = param[0];
          pType = param[1];
        }
      }

      params.set('search', searchTxt);
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${params}`
      );

      fetchData(searchTxt, pName, pType);
    }
  };

  const handleOpenModal = (type) => {
    setmodalType(type);
    setShowModal(true);
  };

  const handleSort = (name, type) => {
    // console.log(name);
    // console.log(type);

    setSortName(`${name}_${type}`);

    const params = new URLSearchParams(window.location.search);

    if (params.has('id')) {
      params.delete('id');
    } else if (params.has('name')) {
      params.delete('name');
    } else if (params.has('price')) {
      params.delete('price');
    }

    params.set(`${name}`, type);
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`
    );
    fetchData(searchTxt, name, type);
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
              setSortName={setSortName}
            />

            <div className='table-responsive'>
              <table className='table table-bordered shadow-sm'>
                <thead>
                  <tr>
                    <th className='id'>
                      <div className='th-div'>
                        <span className='name'>Id</span>
                        <span className='filter-arrow'>
                          {/* <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='icon icon-tabler icon-tabler-chevron-up'
                            width={20}
                            height={20}
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='#ffffff'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <polyline points='6 15 12 9 18 15' />
                          </svg> */}
                          <img
                            src={ArrowIcon}
                            alt=''
                            className={`bottom-arrow ${
                              sortName === 'id_desc' ? 'active' : ''
                            }`}
                            onClick={() => handleSort('id', 'desc')}
                          />
                          {/* <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='icon icon-tabler icon-tabler-chevron-down'
                            width={20}
                            height={20}
                            viewBox='0 0 24 24'
                            strokeWidth='2'
                            stroke='#ffffff'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                            <polyline points='6 9 12 15 18 9' />
                          </svg> */}
                          <img
                            onClick={() => handleSort('id', 'asc')}
                            src={ArrowIcon}
                            alt=''
                            className={`top-arrow ${
                              sortName === 'id_asc' ? 'active' : ''
                            }`}
                          />
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
                            onClick={() => handleSort('name', 'desc')}
                          />
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='top-arrow'
                            onClick={() => handleSort('name', 'asc')}
                          />
                        </span>
                      </div>
                    </th>
                    <th className='code'>
                      <div className='th-div'>
                        <span className='name'>Code</span>
                        {/* <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span> */}
                      </div>
                    </th>
                    <th className='availability'>
                      <div className='th-div'>
                        <span className='name'>Availability</span>
                        {/* <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span> */}
                      </div>
                    </th>
                    {/* <th className='ntr'>
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
                    </th> */}
                    <th className='price'>
                      <div className='th-div'>
                        <span className='name'>Price</span>
                        <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                            onClick={() => handleSort('price', 'desc')}
                          />
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='top-arrow'
                            onClick={() => handleSort('price', 'asc')}
                          />
                        </span>
                      </div>
                    </th>
                    <th className='ntdurar'>
                      <div className='th-div'>
                        <span className='name'>Durability</span>
                        {/* <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span> */}
                      </div>
                    </th>
                    <th className='mile'>
                      <div className='th-div'>
                        <span className='name'>Mileage</span>
                        {/* <span className='filter-arrow'>
                          <img
                            src={ArrowIcon}
                            alt=''
                            className='bottom-arrow'
                          />
                          <img src={ArrowIcon} alt='' className='top-arrow' />
                        </span> */}
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
                            <td>#{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.code}</td>
                            <td>{product.availability ? 'True' : 'False'}</td>
                            {/* <td>{product.needing_repair ? 'True' : 'False'}</td> */}
                            <td>{product.price}</td>
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
