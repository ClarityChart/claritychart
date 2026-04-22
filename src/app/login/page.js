'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        channel: 'email',
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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });
    if (error) {
      setError('Invalid or expired code. Please try again.');
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a2535', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <div style={{ background: '#2d4460', border: '1px solid rgba(196,168,130,0.3)', borderTop: '3px solid #d4b896', borderRadius: '8px', padding: '48px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '28px', color: '#f0e8dc', fontFamily: 'Georgia, serif', fontWeight: 'bold', marginBottom: '8px' }}>Clarity<span style={{ color: '#d4b896' }}>Chart</span></div>
          <div style={{ fontSize: '13px', color: '#9a8c78', letterSpacing: '2px', fontFamily: 'Courier New, monospace' }}>CLINICAL DOCUMENTATION PLATFORM</div>
        </div>
        {!sent ? (
          <form onSubmit={handleSendOtp}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#d4b896', fontFamily: 'Courier New, monospace', letterSpacing: '1px', marginBottom: '8px' }}>EMAIL ADDRESS</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(196,168,130,0.3)', borderRadius: '6px', color: '#f0e8dc', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            {error && <div style={{ background: 'rgba(240,128,128,0.15)', border: '1px solid rgba(240,128,128,0.4)', borderRadius: '6px', padding: '12px 16px', color: '#f08080', fontSize: '14px', marginBottom: '20px' }}>{error}</div>}
            <button type="submit" disabled={loading || !email} style={{ width: '100%', padding: '13px', background: loading || !email ? 'rgba(196,168,130,0.3)' : '#d4b896', border: 'none', borderRadius: '6px', color: '#1a2535', fontSize: '14px', fontFamily: 'Courier New, monospace', fontWeight: '700', letterSpacing: '1px', cursor: loading || !email ? 'not-allowed' : 'pointer' }}>
              {loading ? 'SENDING...' : 'SEND LOGIN CODE'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✉</div>
              <div style={{ fontSize: '15px', color: '#9a8c78', lineHeight: 1.6 }}>A 6-digit code was sent to <strong style={{ color: '#d4b896' }}>{email}</strong>. Check your email and enter the code below.</div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#d4b896', fontFamily: 'Courier New, monospace', letterSpacing: '1px', marginBottom: '8px' }}>ENTER 6-DIGIT CODE</label>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="123456" required maxLength={6} style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(196,168,130,0.3)', borderRadius: '6px', color: '#f0e8dc', fontSize: '24px', outline: 'none', boxSizing: 'border-box', textAlign: 'center', letterSpacing: '8px', fontFamily: 'Courier New, monospace' }} />
            </div>
            {error && <div style={{ background: 'rgba(240,128,128,0.15)', border: '1px solid rgba(240,128,128,0.4)', borderRadius: '6px', padding: '12px 16px', color: '#f08080', fontSize: '14px', marginBottom: '20px' }}>{error}</div>}
            <button type="submit" disabled={loading || otp.length !== 6} style={{ width: '100%', padding: '13px', background: loading || otp.length !== 6 ? 'rgba(196,168,130,0.3)' : '#d4b896', border: 'none', borderRadius: '6px', color: '#1a2535', fontSize: '14px', fontFamily: 'Courier New, monospace', fontWeight: '700', letterSpacing: '1px', cursor: loading || otp.length !== 6 ? 'not-allowed' : 'pointer' }}>
              {loading ? 'VERIFYING...' : 'VERIFY CODE'}
            </button>
            <button type="button" onClick={() => { setSent(false); setOtp(''); setError(''); }} style={{ width: '100%', marginTop: '12px', padding: '10px', background: 'none', border: 'none', color: '#9a8c78', cursor: 'pointer', fontSize: '13px', fontFamily: 'Courier New, monospace' }}>Use a different email</button>
          </form>
        )}
      </div>
    </div>
  );
}
