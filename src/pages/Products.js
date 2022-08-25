import React, { useState } from 'react';
import SearchIcon from '../assets/img/search.svg';
import ArrowIcon from '../assets/img/chevron-right.svg';
import OrderModal from '../components/Modal';

const Products = () => {
  const [products, setProducts] = useState([
    {
      code: 'm1',
      name: 'Boom lift 40',
      type: 'meter',
      availability: true,
      needing_repair: false,
      durability: 4000,
      max_durability: 8000,
      mileage: 10000,
      price: 1000,
      minimum_rent_period: 4,
    },
    {
      code: 'm2',
      name: 'Boom lift 60',
      type: 'meter',
      availability: true,
      needing_repair: false,
      durability: 8000,
      max_durability: 10000,
      mileage: 5000,
      price: 1500,
      minimum_rent_period: 4,
    },
    {
      code: 'm3',
      name: 'Boom lift 80',
      type: 'meter',
      availability: false,
      needing_repair: true,
      durability: 500,
      max_durability: 12000,
      mileage: 200,
      price: 2000,
      minimum_rent_period: 2,
    },
    {
      code: 'm4',
      name: 'Boom lift 100',
      type: 'meter',
      availability: true,
      needing_repair: false,
      durability: 4000,
      max_durability: 12000,
      mileage: 8500,
      price: 2500,
      minimum_rent_period: 2,
    },
    {
      code: 'm5',
      name: 'Boom lift 20',
      type: 'meter',
      availability: true,
      needing_repair: false,
      durability: 1200,
      max_durability: 8000,
      mileage: 600,
      price: 500,
      minimum_rent_period: 1,
    },
    {
      code: 'm6',
      name: 'Boom lift 20',
      type: 'meter',
      availability: true,
      needing_repair: false,
      durability: 8000,
      max_durability: 8000,
      mileage: 0,
      price: 500,
      minimum_rent_period: 1,
    },
    {
      code: 'm7',
      name: 'Boom lift 20',
      type: 'meter',
      availability: true,
      needing_repair: false,
      durability: 5000,
      max_durability: 8000,
      mileage: 1200,
      price: 500,
      minimum_rent_period: 1,
    },
    {
      code: 'm8',
      name: 'Boom lift 40',
      type: 'meter',
      availability: true,
      needing_repair: false,
      durability: 8000,
      max_durability: 10000,
      mileage: 2500,
      price: 1000,
      minimum_rent_period: 2,
    },
  ]);
  const [searchTxt, setSearchTxt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setmodalType] = useState('Book');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchTxt);
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
            <form onSubmit={handleSearch}>
              <div className='input-group mb-3 justify-content-end'>
                <input
                  type='text'
                  className=''
                  placeholder='Search product'
                  value={searchTxt}
                  onChange={(e) => setSearchTxt(e.target.value)}
                />
                <button type='submit' className='input-group-text'>
                  <img src={SearchIcon} alt='' />
                </button>
              </div>
            </form>

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
                  {products.length !== 0 &&
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
                </tbody>
              </table>
            </div>

            <div className='button-group'>
              <button className='me-2' onClick={() => handleOpenModal('Book')}>
                Book
              </button>
              <button onClick={() => handleOpenModal('Return')}>Return</button>
            </div>

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
