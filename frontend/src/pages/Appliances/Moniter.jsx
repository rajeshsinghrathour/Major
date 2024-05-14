import React, { useState } from 'react';
import Response from '../Response';
import headers from '../../utils/Headers';
import ServerError from '../../utils/ServerError';

function Monitor() {
  const [screenTechnology, setScreenTechnology] = useState('LCD');
  const [comparitiveEnergyConsumption, setComparitiveEnergyConsumption] = useState('');
  const [activeStandbyPower, setActiveStandbyPower] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case 'screenTechnology':
        setScreenTechnology(value);
        break;
      case 'comparitiveEnergyConsumption':
        setComparitiveEnergyConsumption(value);
        break;
      case 'activeStandbyPower':
        setActiveStandbyPower(value);
        break;
      default:
        break;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = [
      screenTechnology,
      parseInt(comparitiveEnergyConsumption),
      parseFloat(activeStandbyPower),
    ];

    fetch('http://localhost:5000/api/predict/monitor', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: headers,
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
        specifications: data,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setResponse({
          category: res.category,
          info: res.info,
          inference: res.text,
          correlatedParameters: res.correlatedParameters,
          starRange: res.starRange,
          links: res.links,
          idealEnergy: res.idealEnergy,
        });
      })
      .catch(() => {
        setServerError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formContent = (
    <div>
      <div className='container-fluid mb-5 display-4'>
        Tell us about your Monitor
      </div>
      <form className='container w-50' onSubmit={submitForm}>
        <div className='form-group'>
          <label htmlFor='screenTechnology' className='form-inline'>
            Screen Technology
          </label>
          <select
            className='form-control'
            id='screenTechnology'
            name='screenTechnology'
            value={screenTechnology}
            onChange={handleChange}
          >
            <option value='LCD'>LCD</option>
            <option value='LCD (LED)'>LCD (LED)</option>
            <option value='OLED'>OLED</option>
          </select>
        </div>

        <div className='form-group'>
          <label
            htmlFor='comparitiveEnergyConsumption'
            className='form-inline'
          >
            Current Comparitive Energy Consumption
          </label>
          <input
            type='number'
            id='comparitiveEnergyConsumption'
            className='form-control'
            placeholder='Comparative Energy Consumption expressed as kilowatt hours per years'
            name='comparitiveEnergyConsumption'
            value={comparitiveEnergyConsumption}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='activeStandbyPower' className='form-inline'>
            Active Standby Power
          </label>
          <input
            type='text'
            id='activeStandbyPower'
            className='form-control'
            placeholder='Amount of energy used by the monitor in Active Standby Mode in watts'
            name='activeStandbyPower'
            value={activeStandbyPower}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type='submit'
          className='btn btn-success'
          disabled={loading}
        >
          {!loading ? 'Find Star Rating' : 'Submitting...'}
        </button>
        <button
          type='reset'
          className='btn btn-info ml-3'
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Back to Home
        </button>
      </form>
    </div>
  );

  return (
    <div>
      {response ? (
        <Response response={response} appliance='monitor' />
      ) : serverError ? (
        <ServerError />
      ) : (
        formContent
      )}
    </div>
  );
}

export default Monitor;
