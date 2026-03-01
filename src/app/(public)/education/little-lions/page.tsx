import Link from "next/link";
import { FiArrowLeft, FiClock, FiMapPin, FiStar, FiHeart, FiBookOpen, FiUsers } from "react-icons/fi";

export const metadata = { title: "Little Lions Preschool" };

const features = [
  {
    icon: FiBookOpen,
    title: "Christ-Centered Curriculum",
    description: "Every day includes Bible stories, prayer, and songs that introduce children to Jesus and His love for them.",
  },
  {
    icon: FiStar,
    title: "Academic Excellence",
    description: "Age-appropriate academics including pre-reading, math concepts, science exploration, and social skills development.",
  },
  {
    icon: FiHeart,
    title: "Caring Environment",
    description: "Small class sizes and dedicated teachers ensure each child receives personal attention in a safe, nurturing setting.",
  },
  {
    icon: FiUsers,
    title: "Community Connection",
    description: "Serving Salina families since 2006, Little Lions is a bridge between the church and the community.",
  },
];

export default function LittleLionsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-church-light to-church-cream section-padding">
        <div className="container-wide mx-auto text-center">
          <Link href="/education" className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-sm mb-6 transition-colors">
            <FiArrowLeft className="w-4 h-4" /> Back to Education
          </Link>
          <h1 className="mb-6">Little Lions Preschool</h1>
          <p className="text-lg text-secondary-500 leading-relaxed max-w-2xl mx-auto">
            Quality, Christ-centered early childhood education at St. Mark Lutheran Church.
            Serving Salina families with love and academic excellence since 2006.
          </p>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiClock className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Schedule</h3>
              <p className="text-secondary-500">Weekday mornings during the school year</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiMapPin className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Location</h3>
              <p className="text-secondary-500">St. Mark Lutheran Church, Salina KS</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiUsers className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Ages</h3>
              <p className="text-secondary-500">3 and 4 year olds</p>
            </div>
          </div>

          <h2 className="text-center mb-8">What Makes Little Lions Special</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-navy-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-navy-500" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">{feature.title}</h3>
                    <p className="text-secondary-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-8">About Our Program</h2>
          <div className="prose-church max-w-3xl mx-auto">
            <p>
              Little Lions Preschool was established in 2006 as a ministry of St. Mark
              Evangelical Lutheran Church. Our mission is to provide a loving, Christian
              environment where young children can learn and grow — academically, socially,
              and spiritually.
            </p>
            <p>
              Our program follows a structured curriculum that prepares children for
              kindergarten while nurturing their faith. Each day includes circle time,
              hands-on learning activities, outdoor play, snack time, and age-appropriate
              devotions from God&apos;s Word.
            </p>
            <p>
              Little Lions is open to all families in the Salina area regardless of church
              membership. We believe that sharing the love of Christ with children and
              their families is at the heart of what we do.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-navy-500 text-white section-padding overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gold-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container-wide mx-auto text-center">
          <h2 className="text-white mb-4">Enroll Your Child</h2>
          <p className="text-navy-100 text-lg mb-8 max-w-xl mx-auto">
            Interested in Little Lions Preschool? We&apos;d love to hear from you.
            Contact us for enrollment information, tuition details, or to schedule a visit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-gold-500/25">
              Contact Us
            </Link>
            <a href="tel:7858237196" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors">
              Call (785) 823-7196
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
