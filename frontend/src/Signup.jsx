import {useState} from 'react';
import {useLanguage} from './App';

function Signup({setActiveTab}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {t} = useLanguage();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://himalayan-cravings.onrender.com/auth/register',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, password}),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setActiveTab('login');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="card" style={{maxWidth: '400px', margin: '40px auto'}}>
      <h2 className="page-header">{t.signup}</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form
        onSubmit={handleSignup}
        style={{display: 'flex', flexDirection: 'column', gap: '15px'}}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input-field"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
          required
        />
        <button type="submit" className="btn-primary">
          {t.signup}
        </button>
      </form>
    </div>
  );
}

export default Signup;
