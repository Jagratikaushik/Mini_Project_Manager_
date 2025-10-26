import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    
    try {
      console.log('Attempting registration with:', { username, password });
      console.log('Making request to:', `${api.defaults.baseURL}/auth/register`);
      
      const response = await api.post("/auth/register", { username, password });
      console.log('Registration response:', response.data);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      console.error("Full error object:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        setMessage(error.response.data?.message || error.response.data || "Registration failed");
      } else if (error.request) {
        console.error("Request was made but no response received");
        console.error("Request details:", error.request);
        setMessage("Network error - Cannot connect to server. Check if backend is running on port 5290");
      } else {
        console.error("Error setting up request:", error.message);
        setMessage("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
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

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ 
            color: '#333',
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 10px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Create Account</h2>
          <p style={{ 
            color: '#666', 
            margin: '0',
            fontSize: '16px'
          }}>Sign up to get started</p>
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
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          {message && (
            <div style={{ 
              color: message.includes('successful') ? '#27ae60' : '#e74c3c',
              backgroundColor: message.includes('successful') ? '#eafaf1' : '#ffeaea',
              border: message.includes('successful') ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
              borderRadius: '8px',
              padding: '12px 15px',
              marginBottom: '20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              animation: message.includes('successful') ? 'fadeInSuccess 0.5s ease-in-out' : 'shake 0.5s ease-in-out'
            }}>
              <span style={{ marginRight: '10px' }}>
                {message.includes('successful') ? '✅' : '⚠️'}
              </span>
              {message}
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            style={{ 
              width: '100%', 
              padding: '16px',
              background: isLoading 
                ? 'linear-gradient(135deg, #ccc 0%, #999 100%)'
                : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white', 
              border: 'none', 
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.target as HTMLButtonElement).style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? (
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
                Creating account...
              </span>
            ) : (
              'Create Account'
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
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#764ba2'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#667eea'}
            >
              Sign in here
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
          @keyframes fadeInSuccess {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}