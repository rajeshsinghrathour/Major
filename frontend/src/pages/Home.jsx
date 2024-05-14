import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [appliance, setAppliance] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAppliance(event.target.value);
  };

  const selectAppliance = (e) => {
    e.preventDefault();
    navigate(`/${appliance}`); 
  };

  return (
    <div className='container'>
      <div className='container-fluid'>
        <div className='h4 text-justify'>
          <label className='h2'>Energy</label>
          <label className='h1 text-success'>Save</label> helps to find the
          areas of high energy consumption in households based on predicting
          the health of the appliances
        </div>
        <div className='lead text-justify mb-3'>
          Our prediction models accurately predict the star rating of the
          appliances, old or new, with a number of features, and present a
          number of valuable insights on the ways of reducing the wastage
        </div>
      </div>
      <div className='jumbotron text-center'>
        <div className='display-4'>Let's Get Started</div>
        <div className='form-group'>
          <select
            className='form-control form-control-lg'
            value={appliance}
            onChange={handleChange}
          >
            <option value='' hidden>
              Select an Appliance
            </option>
            <option value='dryer'>Dryer</option>
            <option value='monitor'>Monitor</option>
            <option value='washing_machine'>Washing Machine</option>
          </select>
        </div>
        <button
          type='submit'
          className='btn btn-lg btn-success w-25'
          onClick={selectAppliance}
        >
          Select
        </button>
      </div>
    </div>
  );
}

export default Home;
