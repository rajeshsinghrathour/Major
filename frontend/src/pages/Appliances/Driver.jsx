import React, { useState } from 'react';
import Response from '../Response';
import headers from '../../utils/Headers';
import ServerError from '../../utils/ServerError'

const Dryer = () => {
  const [combination, setCombination] = useState(true);
  const [control, setControl] = useState('Timer');
  const [comparitiveEnergyConsumption, setComparitiveEnergyConsumption] = useState('');
  const [programTime, setProgramTime] = useState('');
  const [type, setType] = useState('Vented');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === 'combination') {
      setCombination(value === 'true');
    } else if (name === 'control') {
      setControl(value);
    } else if (name === 'comparitiveEnergyConsumption') {
      setComparitiveEnergyConsumption(value);
    } else if (name === 'programTime') {
      setProgramTime(value);
    } else if (name === 'type') {
      setType(value);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = [
      combination,
      control,
      parseInt(comparitiveEnergyConsumption),
      parseInt(programTime),
      type
    ];

    fetch('http://localhost:5000/api/predict/dryer', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: headers,
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
        specifications: data
      })
    })
      .then(response => response.json())
      .then(res => {
        setResponse({
          category: res.category,
          info: res.info,
          inference: res.text,
          correlatedParameters: res.correlatedParameters,
          starRange: res.starRange,
          links: res.links,
          idealEnergy: res.idealEnergy
        });
      })
      .catch(() => {
        setServerError(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {!response && !serverError && (
        <div>
          <div className='container-fluid mb-5 display-4'>
            Tell us about your Dryer
          </div>
          <form className='container w-50' onSubmit={submitForm}>
            <div className='form-group'>
              <label htmlFor='combination' className='form-inline'>Combination - washer+dryer?</label>
              <select
                className='form-control'
                id='combination'
                name='combination'
                value={combination ? 'true' : 'false'}
                onChange={handleChange}
                required
              >
                <option value='true'>True</option>
                <option value='false'>False</option>
              </select>
            </div>

            <div className='form-group'>
              <label className='form-inline'>Control</label>
              <select
                className='form-control'
                name='control'
                value={control}
                onChange={handleChange}
              >
                <option value='Timer'>Timer</option>
                <option value='Autosensing'>Autosensing</option>
                <option value='Manual'>Manual</option>
              </select>
            </div>
            
            <div className='form-group'>
              <label htmlFor='comparitiveEnergyConsumption' className='form-inline'>
                Current Comparitive Energy Consumption
              </label>
              <input
                type='number'
                id='comparitiveEnergyConsumption'
                className='form-control'
                placeholder='Energy Consumption of the product expressed as kilowatt hours per years'
                name='comparitiveEnergyConsumption'
                value={comparitiveEnergyConsumption}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='programTime' className='form-inline'>Program Time</label>
              <input
                type='number'
                id='programTime'
                className='form-control'
                placeholder='Program time in minutes'
                name='programTime'
                value={programTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label className='form-inline'>Type</label>
              <select
                className='form-control'
                name='type'
                value={type}
                onChange={handleChange}
              >
                <option value='Vented'>Vented</option>
                <option value='Condenser'>Condenser</option>
              </select>
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
      )}
      {response && <Response response={response} appliance='dryer' />}
      {serverError && <ServerError />}
    </div>
  );
};

export default Dryer;
