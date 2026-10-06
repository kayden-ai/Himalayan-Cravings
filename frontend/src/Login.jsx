import {useState} from 'react';

function Login({setUser, setActiveTab}) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');

  const handleAuth = async () => {
    if (isRegistering) {
      try {
        const response = await fetch(
          'https://himalayan-cravings.onrender.com/users',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, username, email, password, role}),
          }
        );

        if (response.ok) {
          alert('Account created');
          setIsRegistering(false);
        } else {
          const data = await response.json();
          alert('Registration failed: ' + data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(
          'https://himalayan-cravings.onrender.com/auth/login',
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
          }
        );

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          const payload = JSON.parse(atob(data.token.split('.')[1]));
          setUser({token: data.token, role: payload.role});
          setActiveTab('menu');
        } else {
          alert('Login failed: ' + data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="card">
      <h2 className="page-header">
        {isRegistering ? 'Create Account' : 'Login'}
      </h2>

      {isRegistering && (
        <div style={{marginBottom: '15px'}}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <select
              className="input-field"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="admin">Employee</option>
            </select>
          </div>
        </div>
      )}

      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleAuth} className="btn-primary full-width">
        {isRegistering ? 'Sign Up' : 'Sign In'}
      </button>

      <p
        onClick={() => setIsRegistering(!isRegistering)}
        style={{
          marginTop: '20px',
          textAlign: 'center',
          color: '#d9381e',
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        {isRegistering
          ? 'Already have an account? Log in'
          : 'Need an account? Register here'}
      </p>
    </div>
  );
}

export default Login;
