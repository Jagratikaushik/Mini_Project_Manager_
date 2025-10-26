import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form submitted!');
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { username, password });
      const response = await api.post('/auth/login', { username, password });
      console.log('Login response:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token saved, navigating to dashboard');
        
        // Force a page reload to ensure App.tsx re-evaluates authentication
        window.location.href = '/dashboard';
        
        // Alternative: Use navigate if you don't want to reload
        // navigate('/dashboard');
      } else {
        setError('No token received from server');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        setError(err.response.data?.message || err.response.data || 'Login failed');
      } else if (err.request) {
        setError('Network error - cannot connect to server');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Add click handler for debugging
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '50%',
          opacity: '0.1'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(45deg, #764ba2, #667eea)',
          borderRadius: '50%',
          opacity: '0.1'
        }}></div>

        {/* Project Name */}
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <span style={{ fontSize: '24px' }}>📋</span>
            </div>
            <h1 style={{
              margin: '0',
              fontSize: '24px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Mini Project Manager
            </h1>
          </div>
          
          <h2 style={{ 
            color: '#333',
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 10px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Welcome Back</h2>
          <p style={{ 
            color: '#666', 
            margin: '0',
            fontSize: '16px'
          }}>Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontWeight: '600',
              fontSize: '14px'
            }}>Username</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                style={{ 
                  width: '100%', 
                  padding: '15px 20px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  backgroundColor: '#f8f9fa',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = '#667eea';
                  (e.target as HTMLInputElement).style.backgroundColor = 'white';
                  (e.target as HTMLInputElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLInputElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = '#e1e8ed';
                  (e.target as HTMLInputElement).style.backgroundColor = '#f8f9fa';
                  (e.target as HTMLInputElement).style.transform = 'translateY(0)';
                  (e.target as HTMLInputElement).style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontWeight: '600',
              fontSize: '14px'
            }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{ 
                  width: '100%', 
                  padding: '15px 50px 15px 20px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  backgroundColor: '#f8f9fa',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = '#667eea';
                  (e.target as HTMLInputElement).style.backgroundColor = 'white';
                  (e.target as HTMLInputElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLInputElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = '#e1e8ed';
                  (e.target as HTMLInputElement).style.backgroundColor = '#f8f9fa';
                  (e.target as HTMLInputElement).style.transform = 'translateY(0)';
                  (e.target as HTMLInputElement).style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  fontSize: '18px',
                  padding: '5px'
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ 
              color: '#e74c3c',
              backgroundColor: '#ffeaea',
              border: '1px solid #f5c6cb',
              borderRadius: '8px',
              padding: '12px 15px',
              marginBottom: '20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              animation: 'shake 0.5s ease-in-out'
            }}>
              <span style={{ marginRight: '10px' }}>⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            onClick={handleButtonClick}
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '16px',
              background: loading 
                ? 'linear-gradient(135deg, #ccc 0%, #999 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white', 
              border: 'none', 
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.target as HTMLButtonElement).style.boxShadow = 'none';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '10px'
                }}></span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e1e8ed'
        }}>
          <p style={{ 
            color: '#666',
            margin: '0',
            fontSize: '15px'
          }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={{ 
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#764ba2'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#667eea'}
            >
              Create one here
            </Link>
          </p>
        </div>

        {/* Add CSS animations */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Login;