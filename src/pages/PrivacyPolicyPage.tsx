import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import ParticleBackground from '../components/ui/ParticleBackground';

function PrivacyPolicyPage() {
  return (
    <div style={{ fontFamily: 'serif', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '30px' }}>
        Privacy Policy
      </h1>
      <p style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '40px' }}>
        <strong>Last Updated:</strong> June 18, 2025
      </p>

      {/* --- Section 1: Introduction --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>1. Introduction</h2>
      <div style={{ paddingLeft: '20px' }}>
        <p><strong>1.1. Commitment.</strong> CigarVerse ("we," "us," "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services (the "Services").</p>
        <p><strong>1.2. Consent.</strong> By using our Services, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access our Services.</p>
        <p><strong>1.3. Core Principles.</strong> Our data handling is guided by these principles:
        </p>
        <div style={{ paddingLeft: '30px' }}>
          <p>a. <strong>Data Minimization:</strong> We collect only the minimum amount of information necessary for the specific function of our Services.</p>
          <p>b. <strong>Purpose Limitation:</strong> We use your data exclusively for the purpose for which it was collected and for internal operational needs.</p>
          <p>c. <strong>No Data Selling:</strong> We will never sell, rent, or trade your personal information to any third party.</p>
        </div>
      </div>

      {/* --- Section 2: Information We Collect --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>2. Information We Collect</h2>
      <div style={{ paddingLeft: '20px' }}>
        <p><strong>2.1. Automatically Collected Information.</strong> When you interact with our Services, particularly through third-party platforms like Discord or X (formerly Twitter), we may automatically collect certain information necessary for the Service to function. This may include:</p>
        <div style={{ paddingLeft: '30px' }}>
          <p>a. <strong>Platform Identifiers:</strong> Your unique User ID from the third-party platform (e.g., Discord User ID). This serves as a unique identifier for you within our system without revealing your personal identity.</p>
          <p>b. <strong>Community-Specific Data:</strong> Information about your status within our specific community on that platform, such as your roles or membership status. This is used solely for validation and to provide role-based features.</p>
        </div>
        <p><strong>2.2. Information You Provide.</strong> We collect information you directly provide to us, such as when you submit a support ticket or communicate with us. This is limited to the context of your query.</p>
        <p><strong>2.3. Data We Do Not Collect.</strong> We explicitly DO NOT collect personal data such as your email address, full name, physical address, or message content from third-party platforms unless you voluntarily provide it to us directly.</p>
      </div>
      
      {/* --- Section 3: Use of Your Information --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>3. The Sole Purpose of Data Use</h2>
       <div style={{ paddingLeft: '20px' }}>
        <p><strong>3.1. Exclusive Purpose: Internal Validation.</strong> The information we collect is used for one exclusive purpose: to validate your eligibility and participation within the CigarVerse project. This includes, but is not limited to:</p>
        <div style={{ paddingLeft: '30px' }}>
            <p>a. Verifying that you have met specific criteria for community events or airdrops.</p>
            <p>b. Authenticating your identity within our services to prevent fraud and abuse (such as Sybil attacks).</p>
            <p>c. Operating the core functionalities of our applications (e.g., assigning roles based on verified status).</p>
        </div>
        <p><strong>3.2. No Other Uses.</strong> Your data will never be used for marketing, advertising, user profiling, or any purpose other than the internal operational needs of the CigarVerse project. We will not sell, rent, trade, or share your personal data with any third party for their promotional purposes.</p>
      </div>

      {/* --- Section 4: Data Storage and Security --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>4. Data Storage and Security</h2>
       <div style={{ paddingLeft: '20px' }}>
        <p><strong>4.1. Storage.</strong> Information we collect is stored on secure servers. We retain this data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or until you request its deletion.</p>
        <p><strong>4.2. Security.</strong> We use administrative, technical, and physical security measures to help protect your information. While we have taken reasonable steps to secure the information we handle, please be aware that no security measures are perfect or impenetrable.</p>
      </div>

      {/* --- Section 5: Your Rights and Choices --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>5. Your Rights and Choices</h2>
      <div style={{ paddingLeft: '20px' }}>
        <p><strong>5.1. Access and Deletion.</strong> You have the right to request access to the information we hold about you and to request its deletion. Please contact us to make such a request.</p>
        <p><strong>5.2. Revoking Permissions.</strong> You can revoke our access to your third-party platform account at any time through the security or application settings of that platform (e.g., "Authorized Apps" in Discord).</p>
      </div>

      {/* --- Section 6: Policy Towards Children --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>6. Policy Towards Children</h2>
      <div style={{ paddingLeft: '20px' }}>
          <p><strong>6.1. Age Limitation.</strong> We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will take steps to delete that information as quickly as possible.</p>
      </div>

      {/* --- Section 7: Changes and Contact --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>7. Changes and Contact Information</h2>
      <div style={{ paddingLeft: '20px' }}>
          <p><strong>7.1. Changes to This Policy.</strong> We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.</p>
          <p><strong>7.2. Contact Us.</strong> If you have questions or comments about this Privacy Policy, please contact us at:</p>
          <div style={{ paddingLeft: '30px', fontStyle: 'italic' }}>
              <p>Cigarverse<br/>Email: privacy@cigarverse.space</p>
          </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;