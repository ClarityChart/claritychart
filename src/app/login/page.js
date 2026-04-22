'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Handle hash-based auth response from Supabase
    const handleHashChange = async () => {
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        const { data, error } = await supabase.auth.getSession();
        if (data?.session) {
          router.push('/');
        }
      }
      if (hash && hash.includes('error')) {
        const params = new URLSearchParams(hash.substring(1));
        setError(params.get('error_description') || 'Login link expired. Please request a new one.');
        setSent(false);
      }
    };

    handleHashChange();

    // Also check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/');
    });
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: 'https://main.d11wz2rc2ib1uy.amplifyapp.com/auth/callback',
      },
    });
    if (error) {
      setError(error.message === 'Signups not allowed for otp'
        ? 'This email is not authorized. Please contact your administrator.'
        : error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#1a2535',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      <div style={{
        background: '#2d4460', border: '1px solid rgba(196,168,130,0.3)',
        borderTop: '3px solid #d4b896', borderRadius: '8px',
        padding: '48px', width: '100%', maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '28px', color: '#f0e8dc', fontFamily: 'Georgia, serif', fontWeight: 'bold', marginBottom: '8px' }}>
            Clarity<span style={{ color: '#d4b896' }}>Chart</span>
          </div>
          <div style={{ fontSize: '13px', color: '#9a8c78', letterSpacing: '2px', fontFamily: 'Courier New, monospace' }}>
            CLINICAL DOCUMENTATION PLATFORM
          </div>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>✉</div>
            <div style={{ fontSize: '18px', color: '#f0e8dc', marginBottom: '12px', fontWeight: '600' }}>
              Check your email
            </div>
            <div style={{ fontSize: '15px', color: '#9a8c78', lineHeight: 1.6 }}>
              A secure login link has been sent to <strong style={{ color: '#d4b896' }}>{email}</strong>.
              Click the link to access ClarityChart.
            </div>
            <div style={{ marginTop: '24px', fontSize: '13px', color: '#6b7280' }}>
              Link expires in 1 hour. Check your spam folder if not received.
            </div>
            <button
              onClick={() => setSent(false)}
              style={{
                marginTop: '20px', background: 'none', border: 'none',
                color: '#d4b896', cursor: 'pointer', fontSize: '14px',
                fontFamily: 'Courier New, monospace', textDecoration: 'underline',
              }}
            >
              Try a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#d4b896', fontFamily: 'Courier New, monospace', letterSpacing: '1px', marginBottom: '8px' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  width: '100%', padding: '12px 16px',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid rgba(196,168,130,0.3)',
                  borderRadius: '6px', color: '#f0e8dc',
                  fontSize: '16px', outline: 'none', boxSizing: 'border-box',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
            </div>
            {error && (
              <div style={{
                background: 'rgba(240,128,128,0.15)', border: '1px solid rgba(240,128,128,0.4)',
                borderRadius: '6px', padding: '12px 16px', color: '#f08080',
                fontSize: '14px', marginBottom: '20px',
              }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !email}
              style={{
                width: '100%', padding: '13px',
                background: loading || !email ? 'rgba(196,168,130,0.3)' : '#d4b896',
                border: 'none', borderRadius: '6px',
                color: '#1a2535', fontSize: '14px',
                fontFamily: 'Courier New, monospace', fontWeight: '700',
                letterSpacing: '1px', cursor: loading || !email ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {loading ? 'SENDING...' : 'SEND LOGIN LINK'}
            </button>
            <div style={{ marginTop: '20px', fontSize: '13px', color: '#6b7280', textAlign: 'center', lineHeight: 1.6 }}>
              Enter your email to receive a secure one-time login link.
              No password required.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
