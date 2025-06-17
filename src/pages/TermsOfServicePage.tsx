import React from 'react';

function TermsOfServicePage() {
  return (
    <div style={{ fontFamily: 'serif', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '30px' }}>
        Terms of Service
      </h1>
      <p style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '40px' }}>
        <strong>Last Updated:</strong> June 18, 2025
      </p>

      {/* --- Section 1: Agreement to Terms --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>1. Agreement to Terms</h2>
      <div style={{ paddingLeft: '20px' }}>
        <p><strong>1.1. Scope and Binding Effect.</strong> These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("User," "you"), and the creators and operators of CigarVerse ("CigarVerse," "we," "us," or "our"). These Terms govern your access to and use of all services provided by CigarVerse, including our websites, applications, software, community platforms, and bots (collectively, the "Services").</p>
        <p><strong>1.2. Acceptance.</strong> By accessing, downloading, or using any of our Services, you acknowledge that you have read, understood, and agree to be bound by all of these Terms. If you do not agree with all of these Terms, you are prohibited from using the Services and must discontinue use immediately.</p>
        <p><strong>1.3. Supplemental Policies.</strong> Our Privacy Policy is an integral part of these Terms and is incorporated herein by reference. Certain services may be subject to additional terms, which will be presented to you with such services.</p>
      </div>

      {/* --- Section 2: Intellectual Property Rights --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>2. Intellectual Property Rights</h2>
      <div style={{ paddingLeft: '20px' }}>
        <p><strong>2.1. Ownership.</strong> The Services are our proprietary property. All source code, databases, functionality, software, designs, content, and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by applicable intellectual property laws.</p>
        <p><strong>2.2. Limited License.</strong> You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your personal, non-commercial use, strictly in accordance with these Terms.</p>
      </div>

      {/* --- Section 3: User Representations and Obligations --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>3. User Representations and Obligations</h2>
      <div style={{ paddingLeft: '20px' }}>
        <p><strong>3.1. User Warranties.</strong> By using the Services, you represent and warrant that: (a) all information you submit is true and accurate; (b) you have the legal capacity to agree to these Terms; (c) you are at least 13 years of age; (d) your use of the Services will not violate any applicable law or regulation.</p>
      </div>

      {/* --- Section 4: Prohibited Activities --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>4. Prohibited Activities</h2>
      <div style={{ paddingLeft: '20px' }}>
        <p>You may only use the Services for their intended purpose. You agree not to:</p>
        <div style={{ paddingLeft: '30px' }}>
            <p>a. Systematically retrieve data to create a collection or database without our written permission.</p>
            <p>b. Use the Services for any unauthorized or illegal purpose.</p>
            <p>c. Interfere with security-related features of the Services.</p>
            <p>d. Engage in any activity that, in our judgment, harasses, abuses, or harms another person.</p>
            <p>e. Use automated systems (e.g., bots, scripts) in a manner that disrupts the Services.</p>
            <p>f. Disparage, tarnish, or otherwise harm the reputation of the Services or our community.</p>
        </div>
      </div>

      {/* --- Section 5: Third-Party Platforms --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>5. Third-Party Platforms and Content</h2>
       <div style={{ paddingLeft: '20px' }}>
        <p><strong>5.1. Integration.</strong> The Services may integrate with third-party platforms like Discord or X. Your use of these platforms is subject to their respective terms and policies, for which we are not responsible.</p>
        <p><strong>5.2. No Endorsement.</strong> We are not responsible for any third-party websites or content accessed through the Services.</p>
      </div>

      {/* --- Section 6: Term and Termination --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>6. Term and Termination</h2>
      <div style={{ paddingLeft: '20px' }}>
        <p><strong>6.1. Duration of Terms.</strong> These Terms remain in effect as long as you use the Services.</p>
        <p><strong>6.2. Termination by Us.</strong> We are committed to maintaining a safe and positive environment. Therefore, we reserve the right to suspend or terminate your access to the Services, at our discretion and without notice, if we believe you have breached these Terms, violated any law, or engaged in conduct that is harmful to our community or the integrity of the Services. Our primary goal in such cases is to protect the community and the platform.</p>
        <p><strong>6.3. Termination by You.</strong> You may terminate your relationship with us at any time by ceasing all use of the Services.</p>
      </div>

      {/* --- Section 7: Disclaimers and Liability --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>7. Disclaimers and Limitation of Liability</h2>
      <div style={{ paddingLeft: '20px' }}>
        <p><strong>7.1. "AS IS" Basis.</strong> THE SERVICES ARE PROVIDED ON AN "AS-IS" AND "AS-AVAILABLE" BASIS. YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        <p><strong>7.2. Limitation of Liability.</strong> IN NO EVENT WILL WE OR OUR TEAM MEMBERS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICES.</p>
      </div>

      {/* --- Section 8: Indemnification --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>8. Indemnification</h2>
      <div style={{ paddingLeft: '20px' }}>
          <p><strong>8.1. Agreement to Indemnify.</strong> You agree to defend, indemnify, and hold us harmless from any loss, damage, liability, or claim, including reasonable attorneys’ fees, arising from your use of the Services or your breach of these Terms.</p>
      </div>

      {/* --- Section 9: Miscellaneous --- */}
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '40px' }}>9. Miscellaneous</h2>
      <div style={{ paddingLeft: '20px' }}>
          <p><strong>9.1. Governing Law.</strong> These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles.</p>
          <p><strong>9.2. Modifications.</strong> We reserve the right to modify these Terms at any time. We will alert you about changes by updating the "Last Updated" date. Continued use of the Services after such changes constitutes your acceptance of the new Terms.</p>
          <p><strong>9.3. Entire Agreement.</strong> These Terms and any policies posted by us on the Services constitute the entire agreement between you and us.</p>
          <p><strong>9.4. Contact.</strong> For any questions or complaints regarding the Services, please contact us:</p>
          <div style={{ paddingLeft: '30px', fontStyle: 'italic' }}>
              <p>CigarVerse Project<br/>Email: contact@cigarverse.space<br/>Website: cigarverse.space</p>
          </div>
      </div>
    </div>
  );
}

export default TermsOfServicePage;