export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero-gradient">
        <div className="container-wide mx-auto text-center">
          <h1>Privacy Policy</h1>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="prose-church max-w-3xl mx-auto">
            <p><strong>Last updated:</strong> March 15, 2026</p>

            <h2>Introduction</h2>
            <p>
              Calvary Lutheran Church (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects
              your privacy and is committed to protecting any personal information you share with us
              through this website.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Contact form submissions:</strong> Name, email address, phone number, and message content when you use our contact form.</li>
              <li><strong>Member portal:</strong> Information provided during account creation and profile setup, including name, email, phone, and address.</li>
              <li><strong>Website usage:</strong> Basic analytics data such as pages visited and browser type.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Respond to your inquiries and prayer requests</li>
              <li>Provide access to the members-only portal</li>
              <li>Send church communications you have requested</li>
              <li>Improve our website and services</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or share your personal information with third parties, except
              as necessary to operate this website (e.g., web hosting providers) or as required by law.
            </p>

            <h2>Data Security</h2>
            <p>
              We take reasonable measures to protect your information. However, no method of
              transmission over the Internet is 100% secure.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us at{" "}
              <a href="mailto:office@calvarychandler.net">office@calvarychandler.net</a> or
              call <a href="tel:4809639397">(480) 963-9397</a>.
            </p>

            <p>
              Calvary Lutheran Church<br />
              1270 N Dobson Rd<br />
              Chandler, AZ 85224
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
