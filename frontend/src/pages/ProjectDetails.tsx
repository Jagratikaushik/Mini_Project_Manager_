import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
  description?: string;
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching project with ID:', id);
      const res = await api.get(`/projects/${id}`);
      console.log('Project response:', res.data);
      setProject(res.data);
    } catch (error: any) {
      console.error('Error fetching project:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      setError(error.response?.data?.message || error.message || 'Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (id) {
      fetchProject(); 
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            border: '3px solid #667eea',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span style={{ fontSize: '18px', color: '#333' }}>Loading project...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
          <h3 style={{ color: '#e74c3c', margin: '0 0 10px 0' }}>Error Loading Project</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>{error}</p>
          <Link 
            to="/dashboard"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: '600'
            }}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ color: '#333', margin: '0 0 10px 0' }}>Project Not Found</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>The requested project could not be found.</p>
          <Link 
            to="/dashboard"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: '600'
            }}
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const completedTasks = project.tasks?.filter((task: Task) => task.isCompleted).length || 0;
  const totalTasks = project.tasks?.length || 0;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px 0'
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Header with Back Button */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          padding: '30px 40px',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link 
            to="/dashboard" 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#667eea',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              padding: '10px 20px',
              borderRadius: '10px',
              background: '#f8f9ff',
              border: '2px solid #e8ecff'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#667eea';
              (e.target as HTMLAnchorElement).style.color = 'white';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.background = '#f8f9ff';
              (e.target as HTMLAnchorElement).style.color = '#667eea';
            }}
          >
            <span>←</span>
            Back to Dashboard
          </Link>

          {/* Progress Stats */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
              borderRadius: '12px',
              border: '2px solid #e8ecff'
            }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#667eea' }}>{completedTasks}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Completed</div>
            </div>
            <div style={{
              textAlign: 'center',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
              borderRadius: '12px',
              border: '2px solid #e8ecff'
            }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#667eea' }}>{totalTasks}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Total Tasks</div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          padding: '40px',
          marginBottom: '30px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            borderRadius: '50%',
            opacity: '0.1'
          }}></div>

          <div style={{ marginBottom: '25px' }}>
            <h1 style={{ 
              margin: '0 0 15px 0',
              fontSize: '32px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {project.title}
            </h1>
            <p style={{ 
              margin: '0',
              color: '#666',
              fontSize: '18px',
              lineHeight: '1.6'
            }}>
              {project.description}
            </p>
          </div>

          {/* Progress Bar */}
          {totalTasks > 0 && (
            <div style={{ marginTop: '25px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>
                  Project Progress
                </span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#667eea' }}>
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#f0f2ff',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progressPercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Task Form */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          padding: '40px',
          marginBottom: '30px'
        }}>
          <TaskForm projectId={parseInt(id!)} onSuccess={fetchProject} />
        </div>
        
        {/* Tasks Section */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          padding: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <h2 style={{ 
              margin: '0',
              fontSize: '24px',
              fontWeight: '600',
              color: '#333'
            }}>
              Task List
            </h2>
            <span style={{
              marginLeft: '15px',
              backgroundColor: '#667eea',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {totalTasks}
            </span>
          </div>
          
          {project.tasks && project.tasks.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {project.tasks.map((task: Task) => (
                <TaskItem key={task.id} task={task} refresh={fetchProject} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>No tasks yet</h3>
              <p style={{ margin: '0', fontSize: '16px' }}>Add your first task above to get started!</p>
            </div>
          )}
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
}