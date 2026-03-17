import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiClock, FiMapPin, FiBookOpen, FiMonitor } from "react-icons/fi";

export const metadata = {
  title: "Bible Study & Bible Classes | Calvary Lutheran Church Chandler AZ",
  description: "Join weekly Bible study classes at Calvary Lutheran Church in Chandler, AZ. Sunday at 10:30 AM and Wednesday evenings. All are welcome.",
};

const studies = [
  {
    name: "Sunday Morning Bible Class",
    time: "Sundays at 10:30 AM",
    location: "In-person at Calvary",
    description: "Join us after worship for an in-depth look at books of the Bible, doctrinal topics, and practical application of God's Word to daily life.",
  },
  {
    name: "Wednesday Evening Bible Class",
    time: "Wednesdays at 7:00 PM",
    location: "In-person and online",
    description: "A midweek opportunity to study Scripture. Classes are available both in person at Calvary and online for those who cannot attend. Topics rotate throughout the year.",
  },
];

const currentStudies = [
  { title: "Revelation", description: "A detailed study of the final book of the Bible — its prophecies, symbols, and message of hope for believers." },
  { title: "Colossians", description: "Paul's letter to the church at Colossae, emphasizing the supremacy of Christ and life rooted in Him." },
  { title: "Just Jesus", description: "A focused study on the person and work of Jesus Christ as revealed in the Gospels." },
  { title: "Lamentations", description: "Exploring the prophet Jeremiah's grief over the fall of Jerusalem and the faithfulness of God even in suffering." },
  { title: "Defenders and Defamers", description: "A study of key figures throughout church history who have defended or distorted the Christian faith." },
];

export default function BibleClassesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/brass.jpg" alt="Bible study class at Calvary Lutheran Church Chandler AZ" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Bible Classes</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              Weekly Bible classes for all ages and stages of faith.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <Link href="/education" className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-sm mb-8 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Ministries
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiClock className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Sunday</h3>
              <p className="text-secondary-500">10:30 AM</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiClock className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Wednesday</h3>
              <p className="text-secondary-500">7:00 PM</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiMonitor className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Online</h3>
              <p className="text-secondary-500">Wednesday classes available online</p>
            </div>
          </div>

          <h2 className="text-center mb-8">Our Bible Classes</h2>
          <div className="space-y-6">
            {studies.map((study) => (
              <div key={study.name} className="card p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-navy-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiBookOpen className="w-6 h-6 text-navy-500" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-1">{study.name}</h3>
                    <p className="text-gold-600 font-semibold text-sm mb-1">{study.time}</p>
                    <p className="text-secondary-400 text-sm mb-3 flex items-center gap-1">
                      <FiMapPin className="w-3.5 h-3.5" /> {study.location}
                    </p>
                    <p className="text-secondary-400 leading-relaxed">{study.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-8">Current Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {currentStudies.map((study) => (
              <div key={study.title} className="card p-6">
                <h3 className="text-lg mb-2 text-navy-500">{study.title}</h3>
                <p className="text-secondary-400 text-sm leading-relaxed">{study.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-1 relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg">
              <Image src="/images/bible-study.jpg" alt="Bible study group at Calvary Lutheran Church" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="mb-4">Why Study the Bible?</h2>
              <div className="prose-church">
                <p>
                  &quot;Your word is a lamp to my feet and a light to my path.&quot; — Psalm 119:105
                </p>
                <p>
                  The Bible is God&apos;s inspired, inerrant Word — the only source of truth for faith
                  and life. Through regular study we grow closer to our Savior, find comfort in His
                  promises, and are equipped to share the hope we have with others.
                </p>
              </div>
              <Link href="/contact" className="btn-primary mt-8">
                Questions? Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
