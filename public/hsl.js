const fetchTransitRoute = async () => {
  const query = `{
      plan(
        from: {lat: 60.1704, lon: 24.9415}
        to: {lat: 60.2239, lon: 24.7581}
        numItineraries: 1
      ) {
        itineraries {
          legs {
            mode
            startTime
            endTime
            from { name }
            to { name }
            route { shortName }
          }
        }
      }
    }`;

  const response = await fetch(
    'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
        'digitransit-subscription-key': 'YOUR_HSL_API_KEY_HERE',
      },
      body: query,
    }
  );

  const data = await response.json();
  const legs = data.data.plan.itineraries[0].legs;

  legs.forEach((leg) => {
    const vehicle = leg.route ? leg.route.shortName : leg.mode;
    console.log(`Take \({vehicle} from\){leg.from.name} to ${leg.to.name}`);
  });
};
