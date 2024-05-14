import React, { useEffect } from 'react';

function Response({ response, appliance }) {
  useEffect(() => {
    const inferenceElement = document.getElementById('inference');
    if (response) {
      const category = response.category;
      inferenceElement.classList.remove('text-danger', 'text-info', 'text-success');
      inferenceElement.classList.add(category === 0 ? 'text-danger' : category === 1 ? 'text-info' : 'text-success');
    }
  }, [response]);

  const links = response?.links || []; // Handle potential undefined response
  const listItems = links.map((link) => (
    <li key={link} className='list-group-item'>
      <a href={link}>{link}</a>
    </li>
  ));

  const tableRows = response?.correlatedParameters
    ? Object.keys(response.correlatedParameters).map((parameter) => (
        <tr key={parameter}>
          <td>{parameter}</td>
          <td>{response.correlatedParameters[parameter].join()}</td>
        </tr>
      ))
    : [];

  return (
    <div className='row'>
      <div className='col-3' />
      <div className='card col-6 mx-0 px-0'>
        <div id='header' className='card-header h2'>
          Energy<label className='h1 text-success'>Save</label> Report
        </div>
        <div id='body' className='card-body'>
          <div id='category' className='card-title h3'>
            Category {response?.category}
          </div>
          <div id='star_range' className='card-subtitle small font-bold'>
            (Range {response?.starRange})
          </div>
          <div id='info' className='lead mb-3'>
            {response?.info}
          </div>
          <div id='inference' className='font-italic mb-4'>
            {response?.inference}
          </div>
          <hr className='my-4' />

          {Object.keys(response?.correlatedParameters || {}).length !== 0 ? (
            <React.Fragment>
              <label className='lead'>
                Range of values for Category {response?.category}
              </label>
              <table className='table mb-1'>
                <thead className='thead-dark'>
                  <tr>
                    <th scope='col'>Parameter</th>
                    <th scope='col'>Range</th>
                  </tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>
              {response?.category === 2 ? null : (
                <label className='small text-info font-italic mt-0 mb-4'>
                  If these parameters are dealt with, you can achieve a
                  reduction of{' '}
                  {response?.idealEnergy?.[1] - response?.idealEnergy?.[0]}{' '}
                  kW/Hr
                </label>
              )}
              <hr className='my-4' />
            </React.Fragment>
          ) : null}

          <div id='links'>
            <label className='h4'>Helpful Links</label>
            <ul className='list-group'>{listItems}</ul>
          </div>
        </div>
        <div id='footer' className='card-footer'>
          <button
            className='btn btn-success'
            onClick={() => (window.location.href = appliance)}
          >
            Fill Details Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Response;
