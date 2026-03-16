import Image from "next/image";
import { FiHeart, FiBookOpen, FiUsers, FiBook } from "react-icons/fi";

const values = [
  { icon: FiHeart, title: "Leading Sinners to Know Their Savior", description: "We share the good news of Jesus Christ so that all may know His saving grace (John 3:16)." },
  { icon: FiBookOpen, title: "Strengthening Believers in Their Faith", description: "Through faithful preaching, teaching, and the Sacraments, we nurture the faith of every member (2 Peter 3:18)." },
  { icon: FiBook, title: "Encouraging Lifelong Study of God's Word", description: "We believe the Bible is the inspired, inerrant Word of God and encourage every member to be in the Word regularly (2 Timothy 3:16-17)." },
  { icon: FiUsers, title: "Equipping Disciples to Share the Gospel", description: "We train and equip members to share the saving message of Christ in their homes, workplaces, and communities (Matthew 28:19-20)." },
];

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-navy-500 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/books-1.jpg" alt="Calvary Lutheran Church" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/30" />
        </div>
        <div className="relative section-padding">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-6">About Calvary Lutheran Church</h1>
            <p className="text-lg text-navy-100 leading-relaxed max-w-2xl mx-auto">
              Calvary Lutheran Church is a congregation of the Wisconsin Evangelical
              Lutheran Synod (WELS), founded in 1977 in Chandler, Arizona. We are a community of
              believers grounded in God&apos;s Word, united in worship, and dedicated to sharing
              the saving message of Jesus Christ.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-12">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card p-8 text-center">
                <value.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-secondary-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-8">Our Story</h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <Image src="/images/Calvary-Front-Yard-scaled.jpg" alt="Calvary Lutheran Church building" width={800} height={533} className="rounded-xl shadow-lg w-full object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="flex-1 prose-church">
            <p>
              Calvary Lutheran Church was founded in 1977 as a mission congregation
              of the Wisconsin Evangelical Lutheran Synod (WELS) in Chandler, Arizona. From humble
              beginnings, God has blessed our congregation with steady growth and a deep commitment
              to His Word and Sacraments.
            </p>
            <p>
              As a WELS congregation, we hold firmly to the teachings of the Lutheran Confessions
              and the inerrant Scriptures. We believe that salvation is by grace alone, through
              faith alone, in Christ alone -- and we joyfully share this message with our community.
            </p>
            <p>
              Today, under the faithful leadership of Pastor Martin Spaude, Calvary continues to
              be a place where people of all ages can hear the Gospel, grow in faith, and experience
              the love of Christ in a caring congregation. Our Mornings with Mommy program serves
              young families in the Chandler area, and our Bible Classes, Sunday School, and
              Confirmation instruction nurture believers at every stage of life.
            </p>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
