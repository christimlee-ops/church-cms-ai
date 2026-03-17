import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiClock, FiMapPin, FiUsers } from "react-icons/fi";

export const metadata = {
  title: "Sunday School for Kids | Calvary Lutheran Church Chandler AZ",
  description: "Sunday school for children of all ages at Calvary Lutheran Church in Chandler, AZ. Bible stories, songs, and crafts every Sunday at 10:30 AM.",
};

const classes = [
  {
    age: "Preschool & Kindergarten",
    description: "Bible stories, songs, crafts, and activities that introduce our youngest members to Jesus and His love for them.",
  },
  {
    age: "Elementary (Grades 1-4)",
    description: "Age-appropriate lessons from the Old and New Testaments that build a strong foundation of biblical knowledge.",
  },
  {
    age: "Middle School (Grades 5-6)",
    description: "Engaging lessons that help young people apply God's Word to their everyday lives and prepare for confirmation.",
  },
  {
    age: "High School (Grades 9-12)",
    description: "Discussions and studies designed to strengthen faith during the teen years and equip students to share the Gospel.",
  },
];

export default function SundaySchoolPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/sunday-school.webp" alt="Sunday School" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Sunday School</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              Bible-based instruction for children and teens of all ages.
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
              <p className="text-secondary-500">Sundays at 10:30 AM</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiMapPin className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Where</h3>
              <p className="text-secondary-500">Calvary Lutheran Church</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiUsers className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Who</h3>
              <p className="text-secondary-500">All ages welcome</p>
            </div>
          </div>

          <h2 className="text-center mb-8">Classes by Age</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((cls) => (
              <div key={cls.age} className="card p-6">
                <h3 className="text-lg mb-2 text-navy-500">{cls.age}</h3>
                <p className="text-secondary-400 text-sm leading-relaxed">{cls.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto text-center">
          <h2 className="mb-4">New to Sunday School?</h2>
          <p className="text-secondary-500 text-lg mb-8 max-w-xl mx-auto">
            Simply come to church on Sunday morning! After the 9:00 AM worship service,
            Sunday School begins at 10:30 AM. We&apos;ll help your family find the right class.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us for More Info
          </Link>
        </div>
      </section>
    </>
  );
}
