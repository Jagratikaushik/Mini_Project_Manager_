import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";
import ProjectForm from "../components/ProjectForm";

interface Project {
  id: number;
  title: string;
  description: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const deleteProject = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => { 
    fetchProjects(); 
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px 0'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Header */}
        <div style={{ 
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          padding: '30px 40px',
          marginBottom: '30px',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ 
              margin: '0 0 5px 0',
              fontSize: '32px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Dashboard
            </h1>
            <p style={{ 
              margin: '0',
              color: '#666',
              fontSize: '16px'
            }}>
              Manage your projects and tasks
            </p>
          </div>
          
          <button 
            onClick={logout} 
            style={{ 
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.3)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
        
        {/* Project Form */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          padding: '30px 40px',
          marginBottom: '30px'
        }}>
          <ProjectForm onSuccess={fetchProjects} />
        </div>
        
        {/* Projects Section */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          padding: '30px 40px'
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
              Your Projects
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
              {projects.length}
            </span>
          </div>
          
          {projects.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#666'
            }}>
              <div style={{ 
                fontSize: '64px',
                marginBottom: '20px'
              }}>📋</div>
              <h3 style={{ 
                margin: '0 0 10px 0',
                color: '#333'
              }}>No projects yet</h3>
              <p style={{ 
                margin: '0',
                fontSize: '16px'
              }}>Create your first project above to get started!</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {projects.map(project => (
                <div 
                  key={project.id} 
                  style={{ 
                    background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
                    border: '2px solid #e8ecff',
                    borderRadius: '16px',
                    padding: '25px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLDivElement).style.transform = 'translateY(-5px)';
                    (e.target as HTMLDivElement).style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.15)';
                    (e.target as HTMLDivElement).style.borderColor = '#667eea';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLDivElement).style.transform = 'translateY(0)';
                    (e.target as HTMLDivElement).style.boxShadow = 'none';
                    (e.target as HTMLDivElement).style.borderColor = '#e8ecff';
                  }}
                >
                  {/* Decorative element */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    opacity: '0.1'
                  }}></div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ 
                      margin: '0 0 10px 0',
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#333',
                      lineHeight: '1.3'
                    }}>
                      {project.title}
                    </h3>
                    <p style={{ 
                      margin: '0',
                      color: '#666',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}>
                      {project.description}
                    </p>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                  }}>
                    <Link 
                      to={`/projects/${project.id}`}
                      style={{ 
                        flex: '1',
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                        (e.target as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLAnchorElement).style.transform = 'translateY(0)';
                        (e.target as HTMLAnchorElement).style.boxShadow = 'none';
                      }}
                    >
                      <span>👁️</span>
                      View Details
                    </Link>
                    
                    <button 
                      onClick={() => deleteProject(project.id)}
                      style={{ 
                        padding: '12px 16px',
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                        (e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                        (e.target as HTMLButtonElement).style.boxShadow = 'none';
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}