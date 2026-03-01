import Link from "next/link";
import { FiArrowLeft, FiClock, FiMapPin, FiBookOpen } from "react-icons/fi";

export const metadata = { title: "Bible Study" };

const studies = [
  {
    name: "Sunday Morning Bible Study",
    time: "Sundays at 10:15 AM",
    description: "Join us after worship for an in-depth look at books of the Bible, doctrinal topics, and practical application of God's Word to daily life.",
  },
  {
    name: "Wednesday Evening Bible Class",
    time: "Wednesdays at 6:00 PM",
    description: "A midweek opportunity to study Scripture in a smaller group setting. Topics rotate throughout the year and all are welcome to attend.",
  },
];

export default function BibleStudyPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-church-light to-church-cream section-padding">
        <div className="container-wide mx-auto text-center">
          <Link href="/education" className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-sm mb-6 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Education
          </Link>
          <h1 className="mb-6">Bible Study</h1>
          <p className="text-lg text-secondary-500 leading-relaxed max-w-2xl mx-auto">
            Grow in the grace and knowledge of our Lord through weekly Bible study at St. Mark.
            Whether you&apos;re new to the faith or a lifelong student of Scripture, you&apos;re welcome here.
          </p>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiClock className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Sunday</h3>
              <p className="text-secondary-500">10:15 AM</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiClock className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Wednesday</h3>
              <p className="text-secondary-500">6:00 PM</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiMapPin className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Where</h3>
              <p className="text-secondary-500">St. Mark Lutheran Church</p>
            </div>
          </div>

          <h2 className="text-center mb-8">Our Bible Studies</h2>
          <div className="space-y-6">
            {studies.map((study) => (
              <div key={study.name} className="card p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-navy-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiBookOpen className="w-6 h-6 text-navy-500" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-1">{study.name}</h3>
                    <p className="text-gold-600 font-semibold text-sm mb-3">{study.time}</p>
                    <p className="text-secondary-400 leading-relaxed">{study.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto text-center">
          <h2 className="mb-4">Why Study the Bible?</h2>
          <div className="prose-church max-w-3xl mx-auto">
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
      </section>
    </>
  );
}
