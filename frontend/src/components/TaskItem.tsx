import React, { useState } from 'react';
import api from '../api/axiosConfig';

interface Task {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
}

interface TaskItemProps {
  task: Task;
  refresh: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, refresh }) => {
  const [loading, setLoading] = useState(false);

  const toggleComplete = async () => {
    setLoading(true);
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        isCompleted: !task.isCompleted
      });
      refresh();
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await api.delete(`/tasks/${task.id}`);
        refresh();
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ 
      padding: '25px', 
      background: task.isCompleted 
        ? 'linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)'
        : 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
      border: `2px solid ${task.isCompleted ? '#c3e6cb' : '#e8ecff'}`,
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Status indicator */}
      <div style={{
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        width: '4px',
        background: task.isCompleted 
          ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}></div>

      {/* Task content */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px'
      }}>
        <div style={{ flex: 1 }}>
          {/* Task status icon */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '15px',
            marginBottom: task.description ? '10px' : '0'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: task.isCompleted 
                ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                : '#e8ecff',
              border: `2px solid ${task.isCompleted ? '#28a745' : '#667eea'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2px',
              flexShrink: 0
            }}>
              {task.isCompleted && (
                <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
              )}
            </div>
            
            <div style={{ flex: 1 }}>
              <h4 style={{ 
                margin: '0',
                fontSize: '18px',
                fontWeight: '600',
                textDecoration: task.isCompleted ? 'line-through' : 'none',
                color: task.isCompleted ? '#6c757d' : '#333',
                lineHeight: '1.3'
              }}>
                {task.title}
              </h4>
            </div>
          </div>
          
          {task.description && (
            <div style={{ marginLeft: '39px' }}>
              <p style={{ 
                margin: '0', 
                color: task.isCompleted ? '#6c757d' : '#666',
                fontSize: '14px',
                lineHeight: '1.5',
                opacity: task.isCompleted ? 0.7 : 1
              }}>
                {task.description}
              </p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button 
            onClick={toggleComplete}
            disabled={loading}
            style={{ 
              padding: '10px 16px',
              background: task.isCompleted 
                ? 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'
                : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white', 
              border: 'none', 
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLButtonElement).style.boxShadow = task.isCompleted
                  ? '0 6px 20px rgba(255, 193, 7, 0.3)'
                  : '0 6px 20px rgba(40, 167, 69, 0.3)';
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
              <span style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></span>
            ) : (
              <>
                <span>{task.isCompleted ? '↶' : '✓'}</span>
                {task.isCompleted ? 'Undo' : 'Complete'}
              </>
            )}
          </button>
          
          <button 
            onClick={deleteTask}
            disabled={loading}
            style={{ 
              padding: '10px 16px',
              background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
              color: 'white', 
              border: 'none', 
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.3)';
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
              <span style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></span>
            ) : (
              <>
                <span>🗑️</span>
                Delete
              </>
            )}
          </button>
        </div>
      </div>

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

export default TaskItem;