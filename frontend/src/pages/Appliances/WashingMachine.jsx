import React, { useState } from 'react';
import Response from '../Response';
import headers from '../../utils/Headers';
import ServerError from '../../utils/ServerError';

const WashingMachine = () => {
  const [state, setState] = useState({
    cap: '',
    cecWarm: '',
    connMode: 'Dual',
    delayStartMode: true,
    internalHeater: 'Yes',
    standbyPowerUsage: '',
    type: 'Drum',
    progTime: '',
    response: '',
    loading: false,
    serverError: false
  });

  const handleChange = event => {
    event.preventDefault();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleBoolean = event => {
    event.preventDefault();
    const value = event.target.value === 'true';
    setState({ ...state, [event.target.name]: value });
  };

  const submitForm = e => {
    e.preventDefault();
    setState({ ...state, loading: true });
    const data = [
      parseInt(state.cap),
      parseInt(state.cecWarm),
      state.connMode,
      state.delayStartMode,
      state.internalHeater,
      parseFloat(state.standbyPowerUsage),
      state.type,
      parseInt(state.progTime)
    ];

    fetch('http://localhost:5000/api/predict/washing_machine', {
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
        setState({
          ...state,
          response: {
            category: res.category,
            info: res.info,
            inference: res.text,
            correlatedParameters: res.correlatedParameters,
            starRange: res.starRange,
            links: res.links,
            idealEnergy: res.idealEnergy
          },
          loading: false
        });
      })
      .catch(() => {
        setState({ ...state, serverError: true, loading: false });
      });
  };

  return (
    <div>
      <div className='container-fluid mb-5 display-4'>
        Tell us about your Washing Machine
      </div>
      <form className='container w-50' onSubmit={submitForm}>
        <div className='form-group'>
          <label htmlFor='cap' className='form-inline'>
            Capacity
          </label>
          <input
            type='number'
            id='cap'
            className='form-control'
            placeholder='Enter value in kg'
            name='cap'
            value={state.cap}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='cecWarm' className='form-inline'>
            Current Comparative Energy Consumption for Warm Use
          </label>
          <input
            type='number'
            id='cecWarm'
            className='form-control'
            placeholder='Energy Consumption of the product expressed as kilowatt hours per year'
            name='cecWarm'
            value={state.cecWarm}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-inline'>Connection Mode</label>
          <select
            className='form-control'
            name='connMode'
            value={state.connMode}
            onChange={handleChange}
          >
            <option value='Dual'>Dual</option>
            <option value='Cold'>Cold</option>
          </select>
        </div>

        <div className='form-group'>
          <label className='form-inline'>Delay Start Mode</label>
          <select
            className='form-control'
            name='delayStartMode'
            value={state.delayStartMode.toString()}
            onChange={handleBoolean}
          >
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
        </div>

        <div className='form-group'>
          <label className='form-inline'>Internal Heater?</label>
          <select
            className='form-control'
            name='internalHeater'
            value={state.internalHeater}
            onChange={handleChange}
          >
            <option value='Yes'>Yes</option>
            <option value='No'>No</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='standbyPowerUsage' className='form-inline'>
            Standby Power Usage
          </label>
          <input
            type='text'
            id='standbyPowerUsage'
            className='form-control'
            placeholder='Enter value in watts'
            name='standbyPowerUsage'
            value={state.standbyPowerUsage}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label className='form-inline'>Type</label>
          <select
            className='form-control'
            name='type'
            value={state.type}
            onChange={handleChange}
          >
            <option value='Drum'>Drum</option>
            <option value='Non-Drum'>Non-Drum</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='progTime' className='form-inline'>
            Program Time
          </label>
          <input
            type='number'
            id='progTime'
            className='form-control'
            placeholder='Enter time in minutes'
            name='progTime'
            value={state.progTime}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type='submit'
          className='form-group btn btn-success'
          disabled={state.loading}
        >
          {!state.loading ? 'Find Star Rating' : 'Submitting...'}
        </button>
        <button
          type='reset'
          className='form-group btn btn-info ml-3'
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Back to Home
        </button>
      </form>

      {state.response && (
        <Response response={state.response} appliance='washing_machine' />
      )}
      {state.serverError && <ServerError />}
    </div>
  );
};


export default WashingMachine;
