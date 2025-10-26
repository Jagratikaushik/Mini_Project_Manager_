import React, { useState } from "react";
import api from "../api/axiosConfig";

interface ProjectFormProps {
  onSuccess: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/projects', { title, description });
      setTitle('');
      setDescription('');
      onSuccess();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px'
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
          <span style={{ fontSize: '24px' }}>📝</span>
        </div>
        <div>
          <h3 style={{ 
            margin: '0 0 5px 0',
            fontSize: '22px',
            fontWeight: '600',
            color: '#333'
          }}>
            Create New Project
          </h3>
          <p style={{ 
            margin: '0',
            color: '#666',
            fontSize: '14px'
          }}>
            Start a new project to organize your tasks
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block',
            marginBottom: '8px',
            color: '#555',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            Project Title
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Enter project title (e.g., Website Redesign)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

        {/* Description Field */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ 
            display: 'block',
            marginBottom: '8px',
            color: '#555',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            Project Description
          </label>
          <div style={{ position: 'relative' }}>
            <textarea
              placeholder="Describe your project goals, requirements, and key deliverables..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                minHeight: '120px',
                resize: 'vertical',
                fontFamily: 'inherit',
                lineHeight: '1.5',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                (e.target as HTMLTextAreaElement).style.borderColor = '#667eea';
                (e.target as HTMLTextAreaElement).style.backgroundColor = 'white';
                (e.target as HTMLTextAreaElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLTextAreaElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)';
              }}
              onBlur={(e) => {
                (e.target as HTMLTextAreaElement).style.borderColor = '#e1e8ed';
                (e.target as HTMLTextAreaElement).style.backgroundColor = '#f8f9fa';
                (e.target as HTMLTextAreaElement).style.transform = 'translateY(0)';
                (e.target as HTMLTextAreaElement).style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%',
            padding: '16px 24px',
            background: loading 
              ? 'linear-gradient(135deg, #ccc 0%, #999 100%)'
              : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
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
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.3)';
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
              Creating Project...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ marginRight: '10px' }}>✨</span>
              Create Project
            </span>
          )}
        </button>
      </form>

      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        borderRadius: '50%',
        opacity: '0.03',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(45deg, #28a745, #20c997)',
        borderRadius: '50%',
        opacity: '0.03',
        pointerEvents: 'none'
      }}></div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProjectForm;