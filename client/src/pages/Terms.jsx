import { SEO } from '../components/SEO.jsx';

export function Terms() {
  return (
    <section className="prose max-w-none text-slate-700 dark:text-gray-300 dark:prose-invert">
      <SEO title="Terms & Conditions – stackflow.dev" description="Terms and conditions for using stackflow.dev" />
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Terms & Conditions</h1>
      
      <div className="space-y-6 text-sm sm:text-base text-slate-600 dark:text-gray-300">
        <div>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="mb-2">
            By accessing and using stackflow.dev ("the Website"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
          <p>
            If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
          <p className="mb-2">
            Permission is granted to temporarily download one copy of the materials (information or software) on stackflow.dev's website for personal, non-commercial transitory viewing only.
          </p>
          <p className="mb-2">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
          <p className="mt-2">
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by stackflow.dev at any time.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">3. Intellectual Property Rights</h2>
          <p className="mb-2">
            All content included on this site, such as text, graphics, logos, images, PDFs, and software, is the property of stackflow.dev or its content suppliers and protected by copyright and other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any of the content without express written permission from stackflow.dev.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">4. Digital Products</h2>
          <p className="mb-2">
            All products sold on stackflow.dev are digital products delivered via download. Upon successful payment, you will receive access to download the purchased digital products.
          </p>
          <p className="mb-2">You understand and agree that:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Digital products are non-transferable</li>
            <li>You are responsible for maintaining the security of your download links</li>
            <li>Download links may expire after a specified period</li>
            <li>Sharing download links with unauthorized users is prohibited</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">5. User Accounts</h2>
          <p className="mb-2">
            When you make a purchase, you may be required to provide an email address. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
          <p>
            You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">6. Payment Terms</h2>
          <p className="mb-2">
            All payments are processed securely through Razorpay. By making a purchase, you agree to pay the specified price for the products you select.
          </p>
          <p className="mb-2">
            Prices are displayed in Indian Rupees (INR) and are subject to change without notice. You are responsible for paying all applicable taxes and fees.
          </p>
          <p className="mt-3 font-semibold text-slate-800 dark:text-gray-100">
            All sales are final. Once a purchase is completed and the digital product is delivered, no refunds or cancellations will be provided.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">7. Disclaimer</h2>
          <p className="mb-2">
            The materials on stackflow.dev's website are provided on an 'as is' basis. stackflow.dev makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Further, stackflow.dev does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">8. Limitations</h2>
          <p>
            In no event shall stackflow.dev or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on stackflow.dev's website, even if stackflow.dev or a stackflow.dev authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">9. Modifications</h2>
          <p>
            stackflow.dev may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">11. Contact Information</h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us through the website or via the contact information provided.
          </p>
        </div>

        <div className="text-xs text-slate-500 dark:text-gray-400 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </section>
  );
}

