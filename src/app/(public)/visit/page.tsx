import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiClock, FiHeart, FiUsers, FiBookOpen, FiMusic } from "react-icons/fi";

export const metadata = { title: "Plan Your Visit" };

const faqs = [
  {
    icon: FiHeart,
    question: "What kind of church is Calvary?",
    answer: "Calvary Lutheran Church is a congregation of the Wisconsin Evangelical Lutheran Synod (WELS). We are Bible-believing Christians who trust that God's Word is the sole authority for faith and life. Our worship, teaching, and fellowship are all centered on Jesus Christ and His saving work.",
  },
  {
    icon: FiMapPin,
    question: "Where is Calvary located?",
    answer: "We are located at 1270 N Dobson Rd, Chandler, AZ 85224 — right in the heart of Chandler. There is plenty of free parking available.",
  },
  {
    icon: FiUsers,
    question: "What should I wear?",
    answer: "Come as you are! You'll see everything from casual to dressy at Calvary. We want you to feel comfortable so you can focus on what matters most — hearing God's Word.",
  },
  {
    icon: FiMusic,
    question: "What should I expect during the service?",
    answer: "Our worship services include hymns, Scripture readings, prayer, and a sermon based on God's Word. The service typically lasts about an hour. You are welcome to participate as much or as little as you feel comfortable — there is no pressure. Guests should not feel compelled to give during the offering.",
  },
  {
    icon: FiBookOpen,
    question: "What about my kids?",
    answer: "Children are always welcome in our worship services! We also offer Sunday School for kids at 10:30 AM on Sundays, where they learn Bible stories, sing songs, and do crafts. Our Mornings with Mommy program (1st Tuesday of each month) serves children ages 0-6 and their caregivers.",
  },
  {
    icon: FiClock,
    question: "When are services?",
    answer: "Saturday Worship at 6:00 PM, Sunday Worship at 9:00 AM, Bible Study & Sunday School at 10:30 AM, and Confirmation at 11:30 AM.",
  },
];

export default function VisitPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/seats.jpg" alt="Seating inside Calvary Lutheran Church" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Plan Your Visit</h1>
            <p className="text-lg text-navy-100 leading-relaxed max-w-2xl mx-auto">
              Whether you&apos;ve been a Lutheran your whole life or are stepping into a church
              for the first time, we&apos;d love to welcome you to Calvary.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-10">What to Know Before You Visit</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="card p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-navy-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <faq.icon className="w-6 h-6 text-navy-500" />
                    </div>
                    <div>
                      <h3 className="text-xl mb-2">{faq.question}</h3>
                      <p className="text-secondary-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Service Times</h2>
              <div className="space-y-4">
                <div className="card p-5 flex items-center gap-4 border-l-4 border-gold-500">
                  <FiClock className="w-6 h-6 text-gold-500 shrink-0" />
                  <div>
                    <h3 className="text-lg">Saturday Worship</h3>
                    <p className="text-2xl font-heading font-bold text-navy-500">6:00 PM</p>
                  </div>
                </div>
                <div className="card p-5 flex items-center gap-4 border-l-4 border-gold-500">
                  <FiClock className="w-6 h-6 text-gold-500 shrink-0" />
                  <div>
                    <h3 className="text-lg">Sunday Worship</h3>
                    <p className="text-2xl font-heading font-bold text-navy-500">9:00 AM</p>
                  </div>
                </div>
                <div className="card p-5 flex items-center gap-4 border-l-4 border-gold-500">
                  <FiClock className="w-6 h-6 text-gold-500 shrink-0" />
                  <div>
                    <h3 className="text-lg">Bible Study & Sunday School</h3>
                    <p className="text-2xl font-heading font-bold text-navy-500">10:30 AM</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-secondary-500 text-sm mt-6 px-2">
                <FiMapPin className="w-4 h-4 text-gold-500" />
                1270 N Dobson Rd, Chandler, AZ 85224
              </div>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src="https://maps.google.com/maps?q=1270+N+Dobson+Rd,+Chandler,+AZ+85224&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Calvary Lutheran Church location"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-navy-500 text-white section-padding overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gold-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container-wide mx-auto text-center">
          <h2 className="text-white mb-4">We&apos;d Love to Meet You</h2>
          <p className="text-navy-100 text-lg mb-8 max-w-xl mx-auto">
            Have questions before your visit? Feel free to reach out to Pastor Spaude
            or the church office. We look forward to welcoming you!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-gold-500/25">
              Contact Us
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
