import React, { useState } from 'react';
import { createUser } from '../services/api';

const UserCreate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in both fields.');
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const response = await createUser([{ name, email }]);
      console.log(response.data);
      setName('');
      setEmail('');
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setErrorMsg('Failed to create user. Check your API.');
    } finally {
      setLoading(false);
    }
  };

  const techBadges = [
    { label: 'MongoDB', color: '#085041', bg: '#E1F5EE', border: '#5DCAA5' },
    { label: 'Express', color: '#444441', bg: '#F1EFE8', border: '#B4B2A9' },
    { label: 'React',   color: '#0C447C', bg: '#E6F1FB', border: '#85B7EB' },
    { label: 'Node',    color: '#27500A', bg: '#EAF3DE', border: '#97C459' },
    { label: 'Docker',  color: '#185FA5', bg: '#E6F1FB', border: '#378ADD' },
  ];

  return (
    <div style={styles.card}>
      {/* Tech badges */}
      <div style={styles.badgeRow}>
        {techBadges.map(b => (
          <span key={b.label} style={{ ...styles.badge, color: b.color, background: b.bg, borderColor: b.border }}>
            {b.label}
          </span>
        ))}
      </div>

      <hr style={styles.divider} />

      {/* Alerts */}
      {status === 'success' && (
        <div style={{ ...styles.alert, ...styles.alertSuccess }}>
          ✓ User created successfully!
        </div>
      )}
      {status === 'error' && (
        <div style={{ ...styles.alert, ...styles.alertError }}>
          ✗ {errorMsg}
        </div>
      )}

      {/* Name field */}
      <div style={styles.field}>
        <label style={styles.label}>👤 Full name</label>
        <div style={styles.inputWrap}>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. Ravi Sharma"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      {/* Email field */}
      <div style={styles.field}>
        <label style={styles.label}>✉️ Email address</label>
        <div style={styles.inputWrap}>
          <input
            style={styles.input}
            type="email"
            placeholder="e.g. ravi@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Creating...' : '+ Create user'}
      </button>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: 480,
    margin: '2rem auto',
    padding: '1.5rem',
    borderRadius: 12,
    border: '1px solid #e2e8f0',
    background: '#fff',
    fontFamily: 'sans-serif',
  },
  badgeRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  badge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    border: '1px solid',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e2e8f0',
    marginBottom: '1.25rem',
  },
  alert: {
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 13,
    marginBottom: '1rem',
    border: '1px solid',
  },
  alertSuccess: {
    background: '#f0fdf4',
    color: '#166534',
    borderColor: '#bbf7d0',
  },
  alertError: {
    background: '#fef2f2',
    color: '#991b1b',
    borderColor: '#fecaca',
  },
  field: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    color: '#64748b',
    marginBottom: 6,
  },
  inputWrap: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '9px 12px',
    fontSize: 14,
    borderRadius: 8,
    border: '1px solid #cbd5e1',
    background: '#f8fafc',
    color: '#0f172a',
    outline: 'none',
    boxSizing: 'border-box',
  },
  btn: {
    width: '100%',
    marginTop: '1.25rem',
    padding: '10px',
    borderRadius: 8,
    border: 'none',
    background: '#378ADD',
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
  },
};

export default UserCreate;