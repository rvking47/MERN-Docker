import React, { useState, useEffect } from 'react';
import { listUser } from '../services/api';

const getInitials = name =>
    name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await listUser();
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    return (
        <div style={styles.card}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <div style={styles.title}>👥 All users</div>
                    <div style={styles.sub}>MongoDB collection</div>
                </div>
                <div style={styles.headerRight}>
                    <span style={styles.countBadge}>{users.length} user{users.length !== 1 ? 's' : ''}</span>
                    <button style={styles.refreshBtn} onClick={fetchUsers}>↺ Refresh</button>
                </div>
            </div>

            {/* Tech badges */}
            <div style={styles.badgeRow}>
                {[
                    { label: 'MongoDB', color: '#085041', bg: '#E1F5EE', border: '#5DCAA5' },
                    { label: 'Express', color: '#444441', bg: '#F1EFE8', border: '#B4B2A9' },
                    { label: 'React', color: '#0C447C', bg: '#E6F1FB', border: '#85B7EB' },
                    { label: 'Node', color: '#27500A', bg: '#EAF3DE', border: '#97C459' },
                    { label: 'Docker', color: '#185FA5', bg: '#E6F1FB', border: '#378ADD' },
                ].map(b => (
                    <span key={b.label} style={{ ...styles.badge, color: b.color, background: b.bg, borderColor: b.border }}>
                        {b.label}
                    </span>
                ))}
            </div>

            <hr style={styles.divider} />

            {/* States */}
            {loading && <p style={styles.empty}>Loading users...</p>}
            {!loading && users.length === 0 && (
                <p style={styles.empty}>No users yet. Create one!</p>
            )}

            {/* User items */}
            {!loading && users.map(user => (
                <div key={user._id} style={styles.userItem}>
                    <div style={styles.avatar}>{getInitials(user.name)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={styles.userName}>{user.name}</div>
                        <div style={styles.userEmail}>✉️ {user.email}</div>
                        <div style={styles.userId}>🗄 {user._id}</div>
                        <div style={styles.pillRow}>
                            <span style={{ ...styles.pill, color: '#085041', background: '#E1F5EE', borderColor: '#5DCAA5' }}>MongoDB</span>
                            <span style={{ ...styles.pill, color: '#185FA5', background: '#E6F1FB', borderColor: '#378ADD' }}>Docker</span>
                        </div>
                    </div>
                    <span style={{ color: '#94a3b8', fontSize: 18 }}>›</span>
                </div>
            ))}
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
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 15,
        fontWeight: 500,
        color: '#0f172a',
    },
    sub: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 2,
    },
    countBadge: {
        background: '#f1f5f9',
        border: '1px solid #e2e8f0',
        borderRadius: 20,
        padding: '3px 10px',
        fontSize: 12,
        color: '#64748b',
    },
    refreshBtn: {
        padding: '5px 12px',
        fontSize: 12,
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        background: 'transparent',
        color: '#64748b',
        cursor: 'pointer',
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
        marginBottom: '1rem',
    },
    empty: {
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: 13,
        padding: '2rem 0',
    },
    userItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        marginBottom: 8,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: '#E6F1FB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 500,
        color: '#0C447C',
        flexShrink: 0,
    },
    userName: {
        fontSize: 14,
        fontWeight: 500,
        color: '#0f172a',
    },
    userEmail: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 2,
    },
    userId: {
        fontSize: 11,
        color: '#94a3b8',
        fontFamily: 'monospace',
        marginTop: 2,
    },
    pillRow: {
        display: 'flex',
        gap: 4,
        marginTop: 6,
    },
    pill: {
        fontSize: 10,
        padding: '2px 7px',
        borderRadius: 10,
        border: '1px solid',
        fontWeight: 500,
    },
};

export default UserList;