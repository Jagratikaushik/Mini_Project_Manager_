import React, { useState } from 'react';
import api from '../api/axiosConfig';

interface TaskFormProps {
  projectId: number;
  onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ projectId, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Creating task for project:', projectId);
      console.log('Request URL:', `/projects/${projectId}/tasks`);
      console.log('Full URL:', `${api.defaults.baseURL}/projects/${projectId}/tasks`);
      console.log('Task data:', { title, description });
      
      const response = await api.post(`/projects/${projectId}/tasks`, { 
        title, 
        description: description || undefined 
      });
      
      console.log('Task created successfully:', response.data);
      setTitle('');
      setDescription('');
      onSuccess();
    } catch (error: any) {
      console.error('Error creating task:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Request config:', error.config);
      setError(error.response?.data?.message || error.message || 'Failed to create task');
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
          background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
          borderRadius: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '15px'
        }}>
          <span style={{ fontSize: '24px' }}>✅</span>
        </div>
        <div>
          <h3 style={{ 
            margin: '0 0 5px 0',
            fontSize: '22px',
            fontWeight: '600',
            color: '#333'
          }}>
            Add New Task
          </h3>
          <p style={{ 
            margin: '0',
            color: '#666',
            fontSize: '14px'
          }}>
            Break down your project into manageable tasks
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
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
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '10px' }}>⚠️</span>
            {error}
          </div>
        )}

        {/* Task Title Field */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block',
            marginBottom: '8px',
            color: '#555',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            Task Title
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Enter task title (e.g., Design homepage mockup)"
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
                (e.target as HTMLInputElement).style.borderColor = '#28a745';
                (e.target as HTMLInputElement).style.backgroundColor = 'white';
                (e.target as HTMLInputElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLInputElement).style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.15)';
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

        {/* Task Description Field */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ 
            display: 'block',
            marginBottom: '8px',
            color: '#555',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            Task Description (Optional)
          </label>
          <div style={{ position: 'relative' }}>
            <textarea
              placeholder="Add task details, requirements, or notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '15px 20px',
                border: '2px solid #e1e8ed',
                borderRadius: '12px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                outline: 'none',
                backgroundColor: '#f8f9fa',
                minHeight: '100px',
                resize: 'vertical',
                fontFamily: 'inherit',
                lineHeight: '1.5',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                (e.target as HTMLTextAreaElement).style.borderColor = '#28a745';
                (e.target as HTMLTextAreaElement).style.backgroundColor = 'white';
                (e.target as HTMLTextAreaElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLTextAreaElement).style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.15)';
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
              Adding Task...
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ marginRight: '10px' }}>➕</span>
              Add Task
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

export default TaskForm;