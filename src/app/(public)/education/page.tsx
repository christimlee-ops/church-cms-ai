import Link from "next/link";
import { FiBookOpen, FiBook, FiStar, FiArrowRight } from "react-icons/fi";

export const metadata = { title: "Education" };

const programs = [
  {
    icon: FiBookOpen,
    title: "Sunday School",
    description: "Classes for all ages every Sunday at 10:15 AM. Children, teens, and adults grow together in the knowledge of God's Word.",
    href: "/education/sunday-school",
  },
  {
    icon: FiBook,
    title: "Bible Study",
    description: "Deepen your understanding of Scripture through our adult Bible study groups held on Sundays and Wednesdays.",
    href: "/education/bible-study",
  },
  {
    icon: FiStar,
    title: "Little Lions Preschool",
    description: "Quality, Christ-centered early childhood education serving Salina families since 2006. Academic excellence rooted in God's love.",
    href: "/education/little-lions",
  },
];

export default function EducationPage() {
  return (
    <>
      <section className="relative bg-navy-500 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/children-singing.webp" alt="Children singing at St. Mark" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-900/70" />
        </div>
        <div className="relative section-padding">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-6">Education at St. Mark</h1>
            <p className="text-lg text-navy-100 leading-relaxed max-w-2xl mx-auto">
              From our youngest learners to lifelong students of the Bible, St. Mark offers
              opportunities to grow in the grace and knowledge of our Lord Jesus Christ.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Link key={program.title} href={program.href} className="card p-8 group border-b-4 border-transparent hover:border-gold-500 transition-all">
                <div className="w-14 h-14 bg-navy-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold-500/10 transition-colors">
                  <program.icon className="w-7 h-7 text-navy-500 group-hover:text-gold-600 transition-colors" />
                </div>
                <h3 className="text-xl mb-3 group-hover:text-navy-500 transition-colors">{program.title}</h3>
                <p className="text-secondary-400 text-sm leading-relaxed mb-4">{program.description}</p>
                <span className="inline-flex items-center gap-1 text-gold-600 text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn More <FiArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <img src="/children-service.webp" alt="Children's service at St. Mark" className="rounded-xl shadow-lg w-full object-cover" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="mb-4">Our Commitment to Christian Education</h2>
              <div className="prose-church">
                <p>
                  At St. Mark, we believe that Christian education is a lifelong journey. God commands
                  us to &quot;train up a child in the way he should go&quot; (Proverbs 22:6), and we
                  take that calling seriously at every age and stage of life.
                </p>
                <p>
                  Whether it&apos;s a three-year-old learning Bible stories in Little Lions Preschool,
                  a teenager exploring the catechism in confirmation class, or an adult digging deeper
                  into Paul&apos;s letters, our goal is the same: to know Christ and make Him known.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
