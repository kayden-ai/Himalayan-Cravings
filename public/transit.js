console.log('Transit routing script successfully connected!');

const routeBtn = document.getElementById('route-btn');
const startLocationInput = document.getElementById('start-location');
const routeResult = document.getElementById('route-result');

if (routeBtn) {
  routeBtn.addEventListener('click', () => {
    const startNode = startLocationInput.value.trim();

    if (startNode === '') {
      routeResult.innerHTML = '❌ Please enter a starting station.';
      return;
    }

    routeResult.innerHTML = '⏳ Calculating transit routes...';

    setTimeout(() => {
      const routes = [
        `🚆 Take the commuter train from ${startNode} to Central Station, then walk 5 minutes.`,
        `🚌 Take the local bus from ${startNode} directly to the City Center stop.`,
        `🚋 Take the tram connection from ${startNode} heading downtown.`,
      ];

      const randomRoute = routes[Math.floor(Math.random() * routes.length)];

      routeResult.innerHTML = `
                <p><strong>✅ Recommended Route:</strong></p>
                <p>${randomRoute}</p>
            `;
    }, 800);
  });
}
