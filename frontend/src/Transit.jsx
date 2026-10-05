import {useState} from 'react';

function Transit() {
  const [routeResult, setRouteResult] = useState('');
  const [startStation, setStartStation] = useState('Helsinki');

  const fetchRoute = async () => {
    setRouteResult('Fetching real HSL route...');
    try {
      const query = `{
        plan(
          from: {lat: 60.1704, lon: 24.9415}
          to: {lat: 60.2239, lon: 24.7581}
          numItineraries: 1
        ) {
          itineraries { legs { mode route { shortName } from { name } to { name } } }
        }
      }`;

      const response = await fetch(
        'https://api.digitransit.fi/routing/v2/routers/hsl/index/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/graphql',
            'digitransit-subscription-key': '8c9a8757c0324116b18fa2ae69019b28',
          },
          body: query,
        }
      );

      if (!response.ok) {
        throw new Error('Access denied due to invalid subscription key.');
      }

      const data = await response.json();
      const legs = data.data.plan.itineraries[0].legs;

      let resultText = '';
      legs.forEach((leg) => {
        const vehicle = leg.route ? leg.route.shortName : leg.mode;
        resultText += `Take ${vehicle} from ${leg.from.name} to ${leg.to.name}. `;
      });
      setRouteResult(resultText);
    } catch (error) {
      setRouteResult(error.message);
    }
  };

  return (
    <div>
      <h2>Find Your Way Here</h2>
      <input
        value={startStation}
        onChange={(e) => setStartStation(e.target.value)}
        style={{
          padding: '8px',
          marginRight: '10px',
          border: '1px solid #ccc',
          borderRadius: '3px',
        }}
      />
      <button
        onClick={fetchRoute}
        style={{
          background: '#28a745',
          color: 'white',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
        }}
      >
        Get Transit Route
      </button>
      <p style={{marginTop: '15px', fontWeight: 'bold'}}>{routeResult}</p>
    </div>
  );
}

export default Transit;
