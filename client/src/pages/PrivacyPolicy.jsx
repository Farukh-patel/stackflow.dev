import { SEO } from '../components/SEO.jsx';

export function PrivacyPolicy() {
  return (
    <section className="prose max-w-none text-slate-700 dark:text-gray-300 dark:prose-invert">
      <SEO title="Privacy Policy – stackflow.dev" description="Privacy policy for stackflow.dev" />
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-sm sm:text-base text-slate-600 dark:text-gray-300">
        <div>
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p className="mb-2">
            At stackflow.dev ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our digital products.
          </p>
          <p>
            Please read this privacy policy carefully. By using our website and services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
          
          <div className="ml-4 space-y-3">
            <div>
              <h3 className="font-semibold mb-1">2.1. Information You Provide</h3>
              <p className="mb-2">We collect information that you voluntarily provide to us, including:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Email address (required for purchase)</li>
                <li>Payment information (processed securely through Razorpay)</li>
                <li>Order details and purchase history</li>
                <li>Any communications you send to us</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-1">2.2. Automatically Collected Information</h3>
              <p className="mb-2">When you visit our website, we may automatically collect:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p className="mb-2">We use the information we collect for the following purposes:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>To process and fulfill your orders</li>
            <li>To send you download links and product access</li>
            <li>To communicate with you about your orders and provide customer support</li>
            <li>To improve our website and services</li>
            <li>To analyze website usage and trends</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To comply with legal obligations</li>
            <li>To send you marketing communications (with your consent)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">4. Payment Information</h2>
          <p className="mb-2">
            All payment processing is handled securely by Razorpay, a third-party payment processor. We do not store your credit card details or other sensitive payment information on our servers.
          </p>
          <p>
            When you make a purchase, your payment information is transmitted directly to Razorpay and is subject to Razorpay's privacy policy. We only receive confirmation of successful payment and order details.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">5. Cookies and Tracking Technologies</h2>
          <p className="mb-2">
            We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
          </p>
          <p className="mb-2">We use cookies for:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Remembering your preferences and settings</li>
            <li>Analyzing website traffic and usage patterns</li>
            <li>Maintaining your shopping cart</li>
            <li>Providing a better user experience</li>
          </ul>
          <p className="mt-2">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">6. Data Sharing and Disclosure</h2>
          <p className="mb-2">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
          
          <div className="ml-4 space-y-2">
            <div>
              <h3 className="font-semibold mb-1">6.1. Service Providers</h3>
              <p>
                We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving you, such as payment processors (Razorpay), hosting providers, and analytics services.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">6.2. Legal Requirements</h3>
              <p>
                We may disclose your information if required to do so by law or in response to valid requests by public authorities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">6.3. Business Transfers</h3>
              <p>
                If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">7. Data Security</h2>
          <p className="mb-2">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
          <p>
            While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">8. Data Retention</h2>
          <p className="mb-2">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>
          <p>
            We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">9. Your Rights</h2>
          <p className="mb-2">Depending on your location, you may have certain rights regarding your personal information:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Right to access your personal information</li>
            <li>Right to correct inaccurate information</li>
            <li>Right to request deletion of your information</li>
            <li>Right to object to processing of your information</li>
            <li>Right to data portability</li>
            <li>Right to withdraw consent (where applicable)</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, please contact us using the contact information provided below.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">10. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will delete such information.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">11. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">12. International Data Transfers</h2>
          <p>
            Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our services, you consent to the transfer of your information to these locations.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">13. Changes to This Privacy Policy</h2>
          <p className="mb-2">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">14. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to exercise your rights regarding your personal information, please contact us through the website's contact form or the support email provided.
          </p>
        </div>

        <div className="text-xs text-slate-500 dark:text-gray-400 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </section>
  );
}

