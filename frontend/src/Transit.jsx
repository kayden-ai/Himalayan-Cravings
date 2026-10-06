import {useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for React-Leaflet's default missing marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function Transit() {
  const [routeResult, setRouteResult] = useState('');
  const [startStation, setStartStation] = useState('Lauttasaari');
  const [startCoords, setStartCoords] = useState(null);

  const API_KEY = '8e84ce7de960461db94b18c6cae3e0c3';
  const restaurantCoords = [60.2239, 24.7581];

  const fetchRoute = async () => {
    setRouteResult('Fetching real HSL route and map...');
    setStartCoords(null);

    try {
      const geoResponse = await fetch(
        `https://api.digitransit.fi/geocoding/v1/search?text=${encodeURIComponent(startStation)}&size=1`,
        {headers: {'digitransit-subscription-key': API_KEY}}
      );

      if (!geoResponse.ok)
        throw new Error('Failed to connect to location server.');

      const geoData = await geoResponse.json();

      if (!geoData.features || geoData.features.length === 0) {
        throw new Error('Location not found in Helsinki area.');
      }

      const startLon = geoData.features[0].geometry.coordinates[0];
      const startLat = geoData.features[0].geometry.coordinates[1];

      // THIS TRIGGERS THE MAP TO APPEAR
      setStartCoords([startLat, startLon]);

      const query = `{
        plan(
          from: {lat: ${startLat}, lon: ${startLon}}
          to: {lat: ${restaurantCoords[0]}, lon: ${restaurantCoords[1]}}
          numItineraries: 1
        ) {
          itineraries { legs { mode route { shortName } from { name } to { name } } }
        }
      }`;

      const routeResponse = await fetch(
        'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'digitransit-subscription-key': API_KEY,
          },
          body: JSON.stringify({query: query}),
        }
      );

      if (!routeResponse.ok) throw new Error('Route API rejected the request.');

      const data = await routeResponse.json();

      if (!data.data || !data.data.plan || !data.data.plan.itineraries.length) {
        throw new Error('No transit route found from there.');
      }

      const legs = data.data.plan.itineraries[0].legs;

      let resultText = '';
      legs.forEach((leg) => {
        const vehicle = leg.route ? leg.route.shortName : leg.mode;
        const fromName =
          leg.from.name === 'Origin' ? startStation : leg.from.name;
        const toName =
          leg.to.name === 'Destination' ? 'the restaurant' : leg.to.name;

        resultText += `Take ${vehicle} from ${fromName} to ${toName}. `;
      });

      setRouteResult(resultText);
    } catch (error) {
      setRouteResult(error.message);
    }
  };

  return (
    <div className="card" style={{maxWidth: '800px', width: '100%'}}>
      <h2 className="page-header">Find Your Way Here</h2>
      <div className="input-group">
        <input
          value={startStation}
          onChange={(e) => setStartStation(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchRoute} className="btn-primary">
          Get Route
        </button>
      </div>

      <p
        className="route-result"
        style={{marginTop: '15px', lineHeight: '1.5'}}
      >
        {routeResult}
      </p>

      {startCoords && (
        <div
          style={{
            height: '350px',
            width: '100%',
            marginTop: '20px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #ddd',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <MapContainer
            center={startCoords}
            zoom={11}
            style={{height: '100%', width: '100%'}}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={startCoords}>
              <Popup>
                <strong>Start:</strong> {startStation}
              </Popup>
            </Marker>

            <Marker position={restaurantCoords}>
              <Popup>
                <strong>Destination:</strong>
                <br />
                Himalayan Cravings
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default Transit;
