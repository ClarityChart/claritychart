export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', background: '#1a2535', fontFamily: 'Georgia, serif', color: '#f0e8dc', padding: '60px clamp(20px,5vw,120px)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '13px', letterSpacing: '3px', color: '#d4b896', fontFamily: 'Courier New, monospace', marginBottom: '12px' }}>CLARITYCHART</div>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>Privacy Policy</h1>
          <div style={{ fontSize: '14px', color: '#9a8c78', fontFamily: 'Courier New, monospace' }}>Effective Date: April 2026</div>
        </div>

        {[
          {
            title: '1. Overview',
            body: 'ClarityChart is an AI-powered clinical documentation platform designed exclusively for hospice care organizations. This Privacy Policy describes how ClarityChart collects, uses, and protects information in connection with our platform. ClarityChart is committed to maintaining the privacy and security of all information entrusted to us.'
          },
          {
            title: '2. Information We Collect',
            body: 'ClarityChart collects the following categories of information: (a) Account Information — email addresses of authorized users for authentication purposes; (b) Usage Data — metadata about platform usage including timestamps, module accessed, and token counts, with no patient identifiers stored; (c) Clinical Documentation Inputs — text entered by clinicians during documentation sessions, which is transmitted to the Anthropic API for processing and is not stored by ClarityChart after the session ends.'
          },
          {
            title: '3. How We Use Information',
            body: 'We use collected information solely to: provide and operate the ClarityChart platform; authenticate authorized users; maintain security audit logs as required by HIPAA; and improve platform performance and reliability. We do not sell, rent, or share user information with third parties for marketing purposes.'
          },
          {
            title: '4. Protected Health Information (PHI)',
            body: 'ClarityChart is designed for use with de-identified clinical information using patient initials only. Users are responsible for ensuring that no full names, dates of birth, Social Security numbers, medical record numbers, or other direct patient identifiers are entered into the platform until a fully HIPAA-compliant deployment is confirmed for their organization. ClarityChart does not store clinical documentation after sessions end.'
          },
          {
            title: '5. Third-Party Services',
            body: 'ClarityChart utilizes the following third-party services: (a) Anthropic — AI processing of clinical documentation inputs. Anthropic processes text submitted through the platform to generate clinical documentation. A Business Associate Agreement (BAA) is in place or in process with Anthropic; (b) Amazon Web Services (AWS) — hosting and infrastructure. A BAA is in place with AWS; (c) Supabase — user authentication and session management. User email addresses are stored in Supabase for authentication purposes only.'
          },
          {
            title: '6. Data Security',
            body: 'ClarityChart implements the following security measures: encrypted data transmission (TLS/HTTPS) for all communications; access controls requiring authenticated login for all platform access; audit logging of all platform access and generation events; hosting on AWS infrastructure with HIPAA-eligible configurations; and role-based access with administrator-controlled user provisioning.'
          },
          {
            title: '7. Data Retention',
            body: 'User account information (email addresses) is retained for the duration of the user's authorized access to the platform. Authentication logs are retained for a minimum of six years as required by HIPAA. Clinical documentation inputs are not retained by ClarityChart after the session ends — generated documents exist only in the user's browser session and must be copied or saved by the user.'
          },
          {
            title: '8. User Rights',
            body: 'Authorized users may request access to, correction of, or deletion of their account information by contacting the ClarityChart administrator. Users whose access is terminated will have their account credentials removed from the platform within a reasonable timeframe.'
          },
          {
            title: '9. HIPAA Compliance',
            body: 'ClarityChart is committed to operating in compliance with the Health Insurance Portability and Accountability Act (HIPAA) and its implementing regulations. Hospice organizations using ClarityChart should ensure that a Business Associate Agreement is executed between their organization and ClarityChart prior to entering any Protected Health Information into the platform.'
          },
          {
            title: '10. Changes to This Policy',
            body: 'ClarityChart reserves the right to update this Privacy Policy. Authorized users will be notified of material changes. Continued use of the platform following notification constitutes acceptance of the updated policy.'
          },
          {
            title: '11. Contact',
            body: 'For privacy-related questions or to request a Business Associate Agreement, please contact: ClarityChart | privacy@claritychart.com'
          },
        ].map(({ title, body }) => (
          <div key={title} style={{ marginBottom: '36px', paddingBottom: '36px', borderBottom: '1px solid rgba(196,168,130,0.15)' }}>
            <h2 style={{ fontSize: '18px', color: '#d4b896', fontFamily: 'Courier New, monospace', letterSpacing: '1px', marginBottom: '12px' }}>{title}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#c8b8a8' }}>{body}</p>
          </div>
        ))}

        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(196,168,130,0.2)', fontSize: '13px', color: '#6b7280', fontFamily: 'Courier New, monospace', textAlign: 'center' }}>
          ClarityChart · Built exclusively for hospice · April 2026
        </div>
      </div>
    </div>
  );
}
