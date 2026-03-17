import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiClock, FiMapPin, FiUsers, FiHeart, FiBookOpen, FiStar } from "react-icons/fi";

export const metadata = { title: "Mornings with Mommy" };

const features = [
  {
    icon: FiBookOpen,
    title: "Christ-Centered Activities",
    description: "Each gathering includes Bible stories, songs, and activities that introduce young children and their caregivers to Jesus and His love.",
  },
  {
    icon: FiUsers,
    title: "Social Connection",
    description: "A welcoming space for parents, grandparents, and caregivers to connect with other families in the Chandler community.",
  },
  {
    icon: FiHeart,
    title: "Family Friendly",
    description: "Designed for children ages 0-6 and their caregivers, with age-appropriate crafts, play, and learning in a safe, nurturing environment.",
  },
  {
    icon: FiStar,
    title: "Community Building",
    description: "Mornings with Mommy is a bridge between Calvary Lutheran Church and the Chandler community, building relationships through faith and fellowship.",
  },
];

export default function MorningsWithMommyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/childrens-message.webp" alt="Mornings with Mommy" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Mornings with Mommy</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              A ministry for children ages 0-6 and their caregivers.
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
              <h3 className="text-lg mb-1">Schedule</h3>
              <p className="text-secondary-500">1st Tuesday of each month</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiMapPin className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Location</h3>
              <p className="text-secondary-500">Calvary Lutheran Church, Chandler AZ</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiUsers className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Ages</h3>
              <p className="text-secondary-500">0-6 years + caregivers</p>
            </div>
          </div>

          <h2 className="text-center mb-8">What Makes Mornings with Mommy Special</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/classroom-smaller-kids.jpg"
                alt="Children at Mornings with Mommy"
                fill
                className="object-cover"
              />
            </div>
            <div className="prose-church">
              <p>
                Mornings with Mommy is a ministry of Calvary Lutheran Church designed to
                serve young families in the Chandler area. On the 1st Tuesday of each
                month, children ages 0-6 and their caregivers gather for a morning of
                Christ-centered fun, learning, and fellowship.
              </p>
              <p>
                Each session includes Bible stories, songs, crafts, and free play — all
                in a safe, welcoming environment. Whether you&apos;re a parent, grandparent,
                or caregiver, Mornings with Mommy is a wonderful opportunity to connect
                with other families while sharing the love of Jesus with your little ones.
              </p>
              <p>
                The program is directed by <strong>Bridget Spaude</strong> and{" "}
                <strong>Rachel Traudt</strong>, who are passionate about building community
                and sharing God&apos;s Word with young families.
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
          <h2 className="text-white mb-4">Join Us for Mornings with Mommy</h2>
          <p className="text-navy-100 text-lg mb-8 max-w-xl mx-auto">
            Interested in Mornings with Mommy? We&apos;d love to hear from you.
            Contact us for more information about upcoming sessions and how to get involved.
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
