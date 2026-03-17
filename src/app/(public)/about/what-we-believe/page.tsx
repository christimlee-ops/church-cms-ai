import Image from "next/image";
import Link from "next/link";
import { FiBookOpen, FiHeart, FiUsers, FiStar } from "react-icons/fi";

export const metadata = {
  title: "What We Believe | WELS Lutheran Church Chandler AZ",
  description: "Calvary Lutheran Church holds to the Bible as God's inerrant Word and the Lutheran Confessions. Learn what WELS Lutherans believe about salvation, Scripture, and the Sacraments.",
};

const missionPoints = [
  {
    icon: FiHeart,
    title: "Leading Sinners to Know Their Savior",
    description: "We share the good news of Jesus Christ — that God so loved the world He gave His only Son, so that everyone who believes in Him shall not perish but have eternal life (John 3:16).",
  },
  {
    icon: FiBookOpen,
    title: "Strengthening Believers in Their Faith",
    description: "Through faithful preaching, teaching, and the Sacraments, we nurture the faith of every member so they may grow in the grace and knowledge of our Lord Jesus Christ (2 Peter 3:18).",
  },
  {
    icon: FiStar,
    title: "Encouraging Lifelong Study of God's Word",
    description: "We believe the Bible is the inspired, inerrant Word of God and the sole authority for faith and life. We encourage every member — from toddler to senior — to be in the Word regularly (2 Timothy 3:16-17).",
  },
  {
    icon: FiUsers,
    title: "Equipping Disciples to Share the Gospel",
    description: "We are committed to training and equipping members to share the saving message of Christ in their homes, workplaces, and communities (Matthew 28:19-20).",
  },
];

const beliefs = [
  { title: "The Bible", text: "We believe the Bible is the verbally inspired, inerrant Word of God — without error in everything it says. It is the sole authority for all matters of faith and life." },
  { title: "The Triune God", text: "We believe in one God — Father, Son, and Holy Spirit — three persons in one God, as revealed in Scripture." },
  { title: "Jesus Christ", text: "We believe Jesus Christ is true God and true man, who lived a perfect life, died on the cross to pay for the sins of the world, and rose again on the third day." },
  { title: "Salvation by Grace", text: "We believe that salvation is a free gift of God's grace, received through faith in Jesus Christ alone — not by our own works or merit (Ephesians 2:8-9)." },
  { title: "The Sacraments", text: "We believe that Baptism and the Lord's Supper are means of grace through which God strengthens and sustains the faith He has given us." },
  { title: "The Lutheran Confessions", text: "We subscribe to the Lutheran Confessions as contained in the Book of Concord of 1580, because they are a true and correct exposition of Holy Scripture." },
];

export default function WhatWeBelievePage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/headers/books-1.jpg" alt="Books and Bible at Calvary Lutheran Church" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">What We Believe</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              Grounded in Scripture and the Lutheran Confessions.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-4">Our Mission</h2>
          <p className="text-center text-secondary-500 text-lg max-w-3xl mx-auto mb-12">
            The mission of Calvary Lutheran Church is to glorify God by:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {missionPoints.map((point) => (
              <div key={point.title} className="card p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-navy-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-6 h-6 text-navy-500" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2">{point.title}</h3>
                    <p className="text-secondary-400 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-4">Our Beliefs</h2>
          <p className="text-center text-secondary-500 text-lg max-w-3xl mx-auto mb-12">
            As a WELS congregation, we believe, teach, and confess the following truths of Scripture:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {beliefs.map((belief) => (
              <div key={belief.title} className="card p-6">
                <h3 className="text-lg mb-3 text-navy-500">{belief.title}</h3>
                <p className="text-secondary-400 text-sm leading-relaxed">{belief.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="flex-1">
              <Image src="/images/pages/Synod2-1024x1024-1.png" alt="Wisconsin Evangelical Lutheran Synod" width={1024} height={1024} className="rounded-xl shadow-lg w-full h-auto" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            <div className="flex-1 prose-church">
              <h2>Wisconsin Evangelical Lutheran Synod</h2>
              <p>
                Calvary Lutheran Church is a member of the Wisconsin Evangelical Lutheran Synod
                (WELS), a fellowship of nearly 1,300 congregations united in faith and Christ-centered mission.
              </p>
              <p>
                WELS congregations are committed to sharing the gospel message in communities
                across the nation and around the world through home and world missions, ministerial
                education, and a range of ministries that serve people at every stage of life.
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
          <h2 className="text-white mb-4">Want to Learn More?</h2>
          <p className="text-navy-100 text-lg mb-8 max-w-xl mx-auto">
            Interested in what we believe and teach? Our Adult Bible Instruction class is designed for anyone who wants to learn more about the Christian faith and what Lutherans believe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-gold-500/25">
              Contact Pastor Spaude
            </Link>
            <Link href="/education/bible-classes" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors">
              View Bible Classes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
