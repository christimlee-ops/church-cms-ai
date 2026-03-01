import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import {
  FiCalendar,
  FiBookOpen,
  FiUsers,
  FiHeart,
  FiPlay,
  FiArrowRight,
  FiMapPin,
  FiClock,
  FiUser,
  FiBook,
  FiMusic,
  FiStar,
  FiHome,
  FiCoffee,
  FiGlobe,
  FiRepeat,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { formatRecurringSchedule } from "@/lib/recurrence";

const iconMap: Record<string, IconType> = {
  FiBookOpen,
  FiBook,
  FiUsers,
  FiHeart,
  FiCalendar,
  FiMusic,
  FiStar,
  FiHome,
  FiCoffee,
  FiGlobe,
};

const defaultHero = {
  welcomeLabel: "Welcome to St. Mark",
  title: "Saved by the Cross.",
  titleAccent: "Standing on the Word.",
  description:
    "God's love for the world is a gift for all people — shown through Jesus Christ's life, death, and resurrection. You're welcome here.",
  primaryBtnText: "Plan Your Visit",
  primaryBtnLink: "/visit",
  secondaryBtnText: "Watch Sermons",
  secondaryBtnLink: "/sermons",
};

const defaultService = {
  label: "Join Us This Week",
  title: "Worship & Study Schedule",
  description:
    "All are welcome — whether you've been a Lutheran your whole life or are stepping into a church for the first time.",
  times: [
    { name: "Sunday Worship", time: "9:00 AM", subtitle: "Scripture, music & proclamation" },
    { name: "Bible Study & Sunday School", time: "10:15 AM", subtitle: "All ages — toddlers to adults" },
    { name: "Wednesday Classes", time: "6:00 PM", subtitle: "Children & adult Bible classes" },
  ],
};

const defaultHighlight = {
  label: "Get Connected",
  title: "Life at St. Mark",
  description:
    "From Sunday worship to weekday Bible studies and our Little Lions Preschool, there are many ways to grow in faith and community.",
  items: [
    { title: "Sunday Worship", description: "Christ and Him crucified are at the center of our worship every Sunday at 9:00 AM with Scripture readings, music, and pastoral proclamation of God's Word.", link: "/sermons", icon: "FiBookOpen" },
    { title: "Bible Study & Sunday School", description: "Grow in the grace and knowledge of our Lord at 10:15 AM. Classes for all ages, from toddlers through adults.", link: "/education", icon: "FiBook" },
    { title: "Little Lions Preschool", description: "Quality, academic, and Christ-centered preschool education serving Salina families since 2006.", link: "/education", icon: "FiUsers" },
    { title: "Community & Fellowship", description: "Connect with a caring congregation rooted in God's Word. We welcome visitors and new members warmly.", link: "/contact", icon: "FiHeart" },
  ],
};

const defaultSermon = {
  label: "This Week's Message",
  title: "Watch Our Latest Sermon",
  description:
    "Missed a Sunday? Our sermons are available online so you can stay connected with God's Word throughout the week.",
  buttonText: "View All Sermons",
  buttonLink: "/sermons",
};

const defaultCta = {
  title: "New to Salina? Visiting for the First Time?",
  description:
    "Whether you've been a Lutheran your whole life or are just beginning to explore the Christian faith, we'd love to welcome you. Our guests should not feel compelled to give — just come and receive God's grace.",
  primaryBtnText: "Plan Your Visit",
  primaryBtnLink: "/visit",
  secondaryBtnText: "Contact Pastor Winterstein",
  secondaryBtnLink: "/contact",
};

async function getHomepageContent() {
  try {
    const content = await prisma.homepageContent.findUnique({
      where: { id: "default" },
    });
    if (!content) return null;
    return {
      hero: { ...defaultHero, ...(content.heroSection as Record<string, unknown>) },
      service: { ...defaultService, ...(content.serviceSection as Record<string, unknown>) },
      highlight: { ...defaultHighlight, ...(content.highlightSection as Record<string, unknown>) },
      sermon: { ...defaultSermon, ...(content.sermonSection as Record<string, unknown>) },
      cta: { ...defaultCta, ...(content.ctaSection as Record<string, unknown>) },
    };
  } catch {
    return null;
  }
}

async function getFeaturedEvents() {
  try {
    return await prisma.event.findMany({
      where: { status: "UPCOMING" },
      orderBy: { startDate: "asc" },
    });
  } catch {
    return [];
  }
}

async function getLatestPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { author: { select: { name: true } } },
      take: 3,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [homepage, events, posts] = await Promise.all([
    getHomepageContent(),
    getFeaturedEvents(),
    getLatestPosts(),
  ]);

  const hero = (homepage?.hero ?? defaultHero) as typeof defaultHero;
  const service = (homepage?.service ?? defaultService) as typeof defaultService;
  const hl = (homepage?.highlight ?? defaultHighlight) as typeof defaultHighlight;
  const sermonData = (homepage?.sermon ?? defaultSermon) as typeof defaultSermon;
  const cta = (homepage?.cta ?? defaultCta) as typeof defaultCta;

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative bg-navy-500 text-white overflow-hidden" aria-label="Welcome to St. Mark Lutheran Church">
        <div className="absolute inset-0">
          <img src="/Chruch.webp" alt="St. Mark Lutheran Church" className="w-full h-full object-cover object-[center_30%]" />
          <div className="absolute inset-0 bg-navy-900/70" />
        </div>

        <div className="relative container-wide mx-auto px-4 py-28 md:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-gold-500/30">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              {hero.welcomeLabel}
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              {hero.title}
              <br />
              <span className="text-gold-400">{hero.titleAccent}</span>
            </h1>
            <p className="text-xl md:text-2xl text-navy-100 mb-10 leading-relaxed max-w-2xl">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={hero.primaryBtnLink}
                className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3.5 px-8 rounded-lg transition-colors inline-flex items-center gap-2 text-lg shadow-lg shadow-gold-500/25"
              >
                {hero.primaryBtnText}
                <FiArrowRight />
              </Link>
              <Link
                href={hero.secondaryBtnLink}
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-lg transition-colors inline-flex items-center gap-2 text-lg"
              >
                <FiPlay className="w-5 h-5" />
                {hero.secondaryBtnText}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fefcf8" />
          </svg>
        </div>
      </section>

      {/* ── Service Times ── */}
      <section className="section-padding bg-church-cream" aria-label="Service times and schedule">
        <div className="container-wide mx-auto text-center">
          <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">{service.label}</span>
          <h2 className="mt-3 mb-4">{service.title}</h2>
          <p className="text-secondary-500 text-lg mb-12 max-w-2xl mx-auto">
            {service.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.times.map((st: { name: string; time: string; subtitle: string }, i: number) => (
              <article key={i} className="card p-8 text-center border-t-4 border-gold-500">
                <FiClock className="w-8 h-8 text-gold-500 mx-auto mb-3" />
                <h3 className="text-xl mb-2">{st.name}</h3>
                <p className="text-3xl font-heading font-bold text-navy-500">{st.time}</p>
                <p className="text-secondary-400 mt-2">{st.subtitle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ministry Highlights ── */}
      <section className="section-padding bg-church-light" aria-label="Ministries and programs at St. Mark">
        <div className="container-wide mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">{hl.label}</span>
            <h2 className="mt-3 mb-4">{hl.title}</h2>
            <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
              {hl.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hl.items.map((item: { title: string; description: string; link: string; icon: string }) => {
              const Icon = iconMap[item.icon] || FiBookOpen;
              return (
                <Link key={item.title} href={item.link} className="card p-8 group border-b-4 border-transparent hover:border-gold-500 transition-all">
                  <div className="w-14 h-14 bg-navy-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold-500/10 transition-colors">
                    <Icon className="w-7 h-7 text-navy-500 group-hover:text-gold-600 transition-colors" />
                  </div>
                  <h3 className="text-xl mb-3 group-hover:text-navy-500 transition-colors">{item.title}</h3>
                  <p className="text-secondary-400 text-sm leading-relaxed">{item.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Events ── */}
      <section className="section-padding bg-church-cream" aria-label="Upcoming church events in Salina KS">
        <div className="container-wide mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">Upcoming</span>
              <h2 className="mt-3">Upcoming Events</h2>
            </div>
            <Link href="/events" className="hidden md:inline-flex items-center gap-2 text-navy-500 hover:text-gold-600 font-semibold transition-colors">
              View All Events <FiArrowRight />
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
              <FiCalendar className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-secondary-400 mb-2">No upcoming events</h3>
              <p className="text-secondary-400">Check back soon or follow us on Facebook for announcements.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="card group">
                  <div className="aspect-[16/10] bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center relative overflow-hidden">
                    {event.featuredImage ? (
                      <img src={event.featuredImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="text-center">
                        <FiCalendar className="w-10 h-10 text-navy-300 mx-auto mb-2" />
                        <span className="text-navy-200 text-sm">{event.category || "Event"}</span>
                      </div>
                    )}
                    {event.recurring ? (
                      <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 rounded-lg px-3 py-1.5 text-center shadow-lg">
                        <FiRepeat className="w-4 h-4 mx-auto" />
                      </div>
                    ) : (
                      <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 rounded-lg px-3 py-1.5 text-center shadow-lg">
                        <span className="block text-xs font-bold uppercase">{format(new Date(event.startDate), "MMM")}</span>
                        <span className="block text-lg font-bold leading-none">{format(new Date(event.startDate), "d")}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg mb-2 group-hover:text-navy-500 transition-colors">{event.title}</h3>
                    <div className="space-y-1.5 text-secondary-400 text-sm">
                      {event.recurring ? (
                        <p className="flex items-center gap-2">
                          <FiRepeat className="w-4 h-4 text-gold-500" />
                          {formatRecurringSchedule(event.recurring, event.recurringDays, event.recurringTime)}
                        </p>
                      ) : (
                        <p className="flex items-center gap-2">
                          <FiClock className="w-4 h-4 text-gold-500" />
                          {event.allDay ? "All Day" : format(new Date(event.startDate), "h:mm a")}
                        </p>
                      )}
                      {event.location && (
                        <p className="flex items-center gap-2">
                          <FiMapPin className="w-4 h-4 text-gold-500" /> {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link href="/events" className="btn-outline">View All Events <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ── Latest Blog Posts ── */}
      <section className="section-padding bg-white" aria-label="Latest blog posts from St. Mark Lutheran Church">
        <div className="container-wide mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">From Our Blog</span>
              <h2 className="mt-3">Latest Posts</h2>
            </div>
            <Link href="/blog" className="hidden md:inline-flex items-center gap-2 text-navy-500 hover:text-gold-600 font-semibold transition-colors">
              View All Posts <FiArrowRight />
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-church-light rounded-xl border border-gray-100">
              <FiBookOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-secondary-400 mb-2">No blog posts yet</h3>
              <p className="text-secondary-400">Blog posts will appear here once published.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="card group">
                  {post.featuredImage ? (
                    <div className="aspect-[16/10] bg-church-light overflow-hidden">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center">
                      <span className="text-white/20 font-heading text-6xl font-bold">SM</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-secondary-400 mb-3">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1.5">
                          <FiCalendar className="w-3.5 h-3.5 text-gold-500" />
                          {format(new Date(post.publishedAt), "MMM d, yyyy")}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <FiUser className="w-3.5 h-3.5 text-gold-500" />
                        {post.author.name}
                      </span>
                    </div>
                    <h3 className="text-lg mb-2 group-hover:text-navy-500 transition-colors">{post.title}</h3>
                    {post.excerpt && <p className="text-secondary-400 text-sm line-clamp-2">{post.excerpt}</p>}
                    <span className="inline-flex items-center gap-1 text-gold-600 text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                      Read More <FiArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link href="/blog" className="btn-outline">View All Posts <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ── Sermon / Video ── */}
      <section className="section-padding bg-church-light" aria-label="Watch recent sermons from St. Mark Salina">
        <div className="container-wide mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">{sermonData.label}</span>
              <h2 className="mt-3 mb-4">{sermonData.title}</h2>
              <p className="text-secondary-500 text-lg mb-6 leading-relaxed">
                {sermonData.description}
              </p>
              <Link href={sermonData.buttonLink} className="btn-secondary">
                {sermonData.buttonText} <FiArrowRight />
              </Link>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                <img src="/church-service.webp" alt="Worship service at St. Mark Lutheran Church" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Map ── */}
      <section className="section-padding bg-white" aria-label="Find St. Mark Lutheran Church on the map">
        <div className="container-wide mx-auto">
          <div className="text-center mb-10">
            <span className="text-gold-500 font-semibold text-sm uppercase tracking-widest">Find Us</span>
            <h2 className="mt-3 mb-4">Visit St. Mark</h2>
            <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
              2349 S. Ohio St., Salina, KS 67401
            </p>
          </div>
          <div className="aspect-[16/7] rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=2349+S+Ohio+St,+Salina,+KS+67401&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St. Mark Lutheran Church location"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-navy-500 text-white section-padding overflow-hidden" aria-label="Visit St. Mark Lutheran Church in Salina Kansas">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gold-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container-wide mx-auto text-center">
          <h2 className="text-white mb-4">{cta.title}</h2>
          <p className="text-navy-100 text-lg mb-8 max-w-xl mx-auto">
            {cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={cta.primaryBtnLink} className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-gold-500/25">
              {cta.primaryBtnText}
            </Link>
            <Link href={cta.secondaryBtnLink} className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors">
              {cta.secondaryBtnText}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
