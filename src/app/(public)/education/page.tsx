import Link from "next/link";
import { FiBookOpen, FiBook, FiStar, FiUsers, FiArrowRight } from "react-icons/fi";

export const metadata = { title: "Ministries" };

const programs = [
  {
    icon: FiBook,
    title: "Bible Classes",
    description: "Deepen your understanding of Scripture through our adult Bible classes held on Sundays at 10:30 AM and Wednesday evenings.",
    href: "/education/bible-classes",
  },
  {
    icon: FiBookOpen,
    title: "Sunday School",
    description: "Children learn Bible stories, sing songs, and grow in their faith every Sunday at 10:30 AM.",
    href: "/education/sunday-school",
  },
  {
    icon: FiUsers,
    title: "Confirmation",
    description: "Instruction for 7th and 8th graders in the teachings of the Bible and Luther's Catechism, Sundays at 11:30 AM.",
    href: "/education/confirmation",
  },
  {
    icon: FiStar,
    title: "Mornings with Mommy",
    description: "A program for children ages 0-6 and their parents, meeting the 1st Tuesday of each month for activities, songs, and fellowship.",
    href: "/education/mornings-with-mommy",
  },
];

export default function EducationPage() {
  return (
    <>
      <section className="relative bg-navy-500 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/childrens-message.webp" alt="Children's message at Calvary" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-900/30" />
        </div>
        <div className="relative section-padding">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-6">Ministries at Calvary</h1>
            <p className="text-lg text-navy-100 leading-relaxed max-w-2xl mx-auto">
              From our youngest learners to lifelong students of the Bible, Calvary offers
              opportunities to grow in the grace and knowledge of our Lord Jesus Christ.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <img src="/images/family-bible-hour-1-1024x683.webp" alt="Family Bible hour at Calvary" className="rounded-xl shadow-lg w-full object-cover" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="mb-4">Our Commitment to Christian Education</h2>
              <div className="prose-church">
                <p>
                  At Calvary, we believe that Christian education is a lifelong journey. God commands
                  us to &quot;train up a child in the way he should go&quot; (Proverbs 22:6), and we
                  take that calling seriously at every age and stage of life.
                </p>
                <p>
                  Whether it&apos;s a toddler enjoying Mornings with Mommy, a child learning Bible
                  stories in Sunday School, a teenager exploring the catechism in Confirmation class,
                  or an adult digging deeper into Paul&apos;s letters in Bible Class, our goal is the
                  same: to know Christ and make Him known.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
