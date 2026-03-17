import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiGlobe, FiUsers, FiBookOpen, FiHeart, FiMail } from "react-icons/fi";

export const metadata = {
  title: "ASU Campus Ministry | Calvary Lutheran Church Chandler AZ",
  description: "Calvary Lutheran Church's campus ministry at Arizona State University — a welcoming community for college students with Bible studies and fellowship in the East Valley.",
};

const highlights = [
  {
    icon: FiBookOpen,
    title: "Bible Study",
    description: "Regular Bible study sessions designed for college students — exploring Scripture in a welcoming, no-pressure environment.",
  },
  {
    icon: FiUsers,
    title: "Fellowship",
    description: "Connect with other Christian students at ASU. Build friendships rooted in faith and encouragement.",
  },
  {
    icon: FiHeart,
    title: "Worship",
    description: "Join us for worship at Calvary Lutheran Church — Saturdays at 6:00 PM or Sundays at 9:00 AM. All students welcome.",
  },
  {
    icon: FiGlobe,
    title: "Outreach",
    description: "Sharing the love of Christ with the ASU community through service, conversation, and genuine care.",
  },
];

export default function ASUCampusMinistryPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/headers/brickwall.jpg" alt="ASU Campus Ministry at Calvary Lutheran Church" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">ASU Campus Ministry</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              A welcoming community for college students with Bible studies and fellowship.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <Link href="/education" className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-sm mb-8 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Ministries
          </Link>

          <div className="max-w-3xl mx-auto prose-church mb-12">
            <h2>Ministry to ASU Students</h2>
            <p>
              Calvary Lutheran Church reaches out to college students at Arizona State University
              with the message of Christ&apos;s love and forgiveness. Whether you&apos;re a
              freshman just starting out or a graduate student, you&apos;re welcome to join us
              for Bible study, fellowship, and worship.
            </p>
            <p>
              College is a time of growth, questions, and new experiences. Our campus ministry
              provides a place where students can explore the Christian faith, find community
              with other believers, and be strengthened by God&apos;s Word during their time at ASU.
            </p>
            <p>
              Interested in getting connected? Reach out to Pastor Spaude at{" "}
              <a href="mailto:pastor@calvarychandler.net">pastor@calvarychandler.net</a> or
              call <a href="tel:6029030035">(602) 903-0035</a>.
            </p>
          </div>

          <h2 className="text-center mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {highlights.map((item) => (
              <div key={item.title} className="card p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-navy-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-navy-500" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">{item.title}</h3>
                    <p className="text-secondary-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="card p-8 max-w-lg mx-auto border-t-4 border-gold-500">
              <FiMail className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-xl mb-2">Get Connected</h3>
              <p className="text-secondary-400 text-sm mb-4">
                Contact Pastor Spaude to learn about upcoming Bible studies and events for ASU students.
              </p>
              <a href="mailto:pastor@calvarychandler.net" className="btn-secondary inline-flex">
                Email Pastor Spaude
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
