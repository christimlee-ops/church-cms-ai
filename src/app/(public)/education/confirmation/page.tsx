import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiClock, FiMapPin, FiUsers, FiBookOpen, FiCheckCircle, FiHeart, FiStar } from "react-icons/fi";

export const metadata = {
  title: "Confirmation Classes | Calvary Lutheran Church Chandler AZ",
  description: "Two-year confirmation program for 7th and 8th graders at Calvary Lutheran Church in Chandler, AZ. Sundays at 11:30 AM.",
};

const topics = [
  {
    icon: FiBookOpen,
    title: "Luther's Small Catechism",
    description: "Students study the Six Chief Parts of Christian doctrine as explained by Martin Luther — the Ten Commandments, the Apostles' Creed, the Lord's Prayer, Baptism, Confession, and the Lord's Supper.",
  },
  {
    icon: FiCheckCircle,
    title: "Key Christian Doctrines",
    description: "A thorough overview of what the Bible teaches about God, sin, grace, salvation, the Church, and the Sacraments — grounded in Scripture and the Lutheran Confessions.",
  },
  {
    icon: FiHeart,
    title: "Living the Faith",
    description: "Confirmation is not just head knowledge — it is heart knowledge. Students learn how to apply God's Word to their daily lives and grow as disciples of Christ.",
  },
  {
    icon: FiStar,
    title: "Public Confession of Faith",
    description: "At the end of the two-year program, confirmands make a public confession of their faith before the congregation, affirming the truths they have studied and believe.",
  },
];

export default function ConfirmationPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/sacrament.jpg" alt="Confirmation" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Confirmation</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              A 2-year catechism series for 7th and 8th graders.
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
              <h3 className="text-lg mb-1">When</h3>
              <p className="text-secondary-500">Sundays at 11:30 AM</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiMapPin className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Where</h3>
              <p className="text-secondary-500">Calvary Lutheran Church</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiUsers className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Who</h3>
              <p className="text-secondary-500">7th &amp; 8th Grade students</p>
            </div>
          </div>

          <h2 className="text-center mb-8">What Confirmation Covers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {topics.map((topic) => (
              <div key={topic.title} className="card p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-navy-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <topic.icon className="w-6 h-6 text-navy-500" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">{topic.title}</h3>
                    <p className="text-secondary-400 text-sm leading-relaxed">{topic.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-8">About Our Confirmation Program</h2>
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-1 relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg">
              <Image src="/images/cross-752x1024.jpg" alt="Cross at Calvary Lutheran Church Chandler" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          <div className="flex-1 prose-church">
            <p>
              Confirmation at Calvary Lutheran Church is a two-year program that walks
              7th and 8th grade students through Luther&apos;s Small Catechism and the
              core teachings of the Christian faith. Classes meet on Sundays at 11:30 AM
              following Bible Study and Sunday School.
            </p>
            <p>
              The program is led by <strong>Pastor Martin Spaude</strong>, who guides
              students through the key doctrines of Scripture — including the Ten
              Commandments, the Apostles&apos; Creed, the Lord&apos;s Prayer, Baptism,
              Confession, and the Lord&apos;s Supper. Students learn not only what we
              believe as Lutherans, but <em>why</em> we believe it, based on God&apos;s
              inerrant Word.
            </p>
            <p>
              At the conclusion of the program, confirmands stand before the congregation
              to make a public confession of their faith — affirming the truths of
              Scripture and committing to a life of faithfulness to God&apos;s Word and
              the Sacraments.
            </p>
          </div>
          </div>
        </div>
      </section>

      <section className="relative bg-navy-500 text-white section-padding overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gold-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container-wide mx-auto text-center">
          <h2 className="text-white mb-4">Enroll in Confirmation</h2>
          <p className="text-navy-100 text-lg mb-8 max-w-xl mx-auto">
            Is your child entering 7th or 8th grade? Contact Pastor Spaude for
            enrollment information and to learn more about our confirmation program.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-gold-500/25">
              Contact Pastor Spaude
            </Link>
            <a href="tel:4809639397" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors">
              Call (480) 963-9397
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
