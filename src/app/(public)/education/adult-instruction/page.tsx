import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiClock, FiMapPin, FiUsers, FiBookOpen, FiCheckCircle, FiHeart, FiStar } from "react-icons/fi";

export const metadata = {
  title: "Adult Bible Instruction Class | Calvary Lutheran Church Chandler AZ",
  description: "Join Pastor Spaude for engaging sessions in grace and prayer at Calvary Lutheran Church's Adult Bible Instruction Class in Chandler, AZ.",
};

const topics = [
  {
    icon: FiBookOpen,
    title: "The Bible",
    description: "What is the Bible? Why can we trust it? We explore the inspiration, inerrancy, and authority of God's Word as the foundation for all we believe and teach.",
  },
  {
    icon: FiHeart,
    title: "Law & Gospel",
    description: "Understanding the two great teachings of Scripture — God's holy Law that shows our sin, and the Gospel that reveals His saving grace in Jesus Christ.",
  },
  {
    icon: FiCheckCircle,
    title: "The Sacraments",
    description: "A study of Baptism and the Lord's Supper — what they are, what they do, and why they matter for the Christian life.",
  },
  {
    icon: FiStar,
    title: "The Christian Life",
    description: "How does faith in Christ shape the way we live? We discuss prayer, worship, stewardship, and our calling as God's people in the world.",
  },
];

export default function AdultInstructionPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/headers/books-1.jpg" alt="Adult Bible Instruction at Calvary Lutheran Church" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Adult Bible Instruction</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              An in-depth study of the Christian faith led by Pastor Spaude.
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
              <p className="text-secondary-500">Contact the church office for current schedule</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiMapPin className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Where</h3>
              <p className="text-secondary-500">Calvary Lutheran Church</p>
            </div>
            <div className="card p-6 text-center border-t-4 border-gold-500">
              <FiUsers className="w-8 h-8 text-gold-500 mx-auto mb-3" />
              <h3 className="text-lg mb-1">Who</h3>
              <p className="text-secondary-500">Adults interested in the Christian faith</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto prose-church mb-12">
            <h2>About This Class</h2>
            <p>
              Whether you are exploring the Christian faith for the first time, considering
              membership at Calvary, or simply want to deepen your understanding of what
              Lutherans believe and teach, our Adult Bible Instruction class is for you.
            </p>
            <p>
              Led by Pastor Spaude, this class covers the core teachings of the Bible as
              summarized in Luther&apos;s Small Catechism. Sessions are engaging, welcoming,
              and grounded in Scripture. There is no pressure — just an open invitation to
              grow in the grace and knowledge of our Lord Jesus Christ.
            </p>
            <p>
              To sign up or learn more, contact Pastor Spaude at{" "}
              <a href="mailto:pastor@calvarychandler.net">pastor@calvarychandler.net</a> or
              call <a href="tel:6029030035">(602) 903-0035</a>.
            </p>
          </div>

          <h2 className="text-center mb-8">What We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
    </>
  );
}
