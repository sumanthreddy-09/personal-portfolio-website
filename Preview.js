import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Navbar from '../components/Navbar';

const Preview = () => {
  const navigate = useNavigate();
  const resumeRef = useRef();
  const [resumeData, setResumeData] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('resumia_resume');
    if (saved) {
      setResumeData(JSON.parse(saved));
    } else {
      navigate('/builder');
    }
  }, [navigate]);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    setDownloading(true);
    
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (!resumeData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', background: '#f1f5f9', minHeight: '100vh' }}>
        <div className="container">
          {/* Action Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '30px',
            position: 'sticky',
            top: '80px',
            zIndex: 10,
            padding: '16px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <button onClick={() => navigate('/builder')} className="btn-secondary">
              <i className="fas fa-edit"></i> Edit Resume
            </button>
            <button onClick={downloadPDF} className="btn-primary" disabled={downloading}>
              <i className="fas fa-download"></i> {downloading ? 'Generating...' : 'Download PDF'}
            </button>
          </div>

          {/* Resume Preview */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }}>
            <div ref={resumeRef} style={{ padding: '40px', background: 'white' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #2563EB', paddingBottom: '20px' }}>
                {resumeData.photo && (
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 16px',
                    border: '3px solid #2563EB'
                  }}>
                    <img src={resumeData.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <h1 style={{ fontSize: '28px', marginBottom: '8px', color: '#1a1a2e' }}>{resumeData.fullName || 'Your Name'}</h1>
                <p style={{ fontSize: '16px', color: '#2563EB', fontWeight: 500 }}>{resumeData.professionalTitle || 'Professional Title'}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px', fontSize: '12px', color: '#666' }}>
                  {resumeData.email && <span><i className="fas fa-envelope"></i> {resumeData.email}</span>}
                  {resumeData.phone && <span><i className="fas fa-phone"></i> {resumeData.phone}</span>}
                  {resumeData.location && <span><i className="fas fa-map-marker-alt"></i> {resumeData.location}</span>}
                </div>
              </div>

              {/* Summary */}
              {resumeData.objective && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ color: '#2563EB', marginBottom: '10px', fontSize: '18px' }}>Professional Summary</h3>
                  <p style={{ color: '#4a5568', lineHeight: '1.6' }}>{resumeData.objective}</p>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ color: '#2563EB', marginBottom: '10px', fontSize: '18px' }}>Skills</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {resumeData.skills.map((skill, idx) => (
                      <span key={idx} style={{
                        background: '#e2e8f0',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '13px'
                      }}>{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ color: '#2563EB', marginBottom: '10px', fontSize: '18px' }}>Work Experience</h3>
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <strong>{exp.title}</strong>
                        <span style={{ color: '#666', fontSize: '13px' }}>{exp.company} | {exp.years}</span>
                      </div>
                      <p style={{ color: '#4a5568', fontSize: '14px', marginTop: '4px' }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ color: '#2563EB', marginBottom: '10px', fontSize: '18px' }}>Education</h3>
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <strong>{edu.degree}</strong>
                        <span style={{ color: '#666', fontSize: '13px' }}>{edu.institution} | {edu.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {resumeData.projects && resumeData.projects.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ color: '#2563EB', marginBottom: '10px', fontSize: '18px' }}>Projects</h3>
                  {resumeData.projects.map((project, idx) => (
                    <div key={idx} style={{ marginBottom: '12px' }}>
                      <strong>{project.name}</strong>
                      <p style={{ color: '#4a5568', fontSize: '14px', marginTop: '4px' }}>{project.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Languages */}
              {resumeData.languages && resumeData.languages.length > 0 && (
                <div>
                  <h3 style={{ color: '#2563EB', marginBottom: '10px', fontSize: '18px' }}>Languages</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {resumeData.languages.map((lang, idx) => (
                      <span key={idx}>{lang}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;