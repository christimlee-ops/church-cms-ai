import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const seedPages = [
  {
    title: "About St. Mark Lutheran Church",
    slug: "about",
    showInNav: true,
    sortOrder: 1,
    content: `<h2>About St. Mark Evangelical Lutheran Church</h2>
<p>St. Mark Evangelical Lutheran Church is a congregation of the Wisconsin Evangelical Lutheran Synod (WELS) located in Salina, Kansas. Founded in 1974, we are a community of believers united by God's Word and the Lutheran Confessions.</p>
<p>Our core message is simple: <strong>God's love for the world is a gift for all people — shown through Jesus Christ's life, death, and resurrection.</strong></p>

<h2>What Makes Us Different</h2>
<p>We are <em>Christian</em> — we teach that Jesus Christ is the Savior of the whole world.</p>
<p>We are <em>Confessionally Lutheran</em> — we believe Scripture is 100% flawless and without errors, and we faithfully preach and teach God's Word.</p>
<p>We believe in weekly worship centered on receiving God's grace through Scripture readings, traditional and contemporary Christian music, and the pastoral proclamation of God's Word.</p>

<h2>Our Values</h2>
<p><strong>God's Word</strong> — We hold that Scripture is the inspired, inerrant Word of God and the only rule and guide for faith and life.</p>
<p><strong>Worship</strong> — Christ and Him crucified are at the center of our worship. We gather to receive God's gifts of grace through Word and Sacrament.</p>
<p><strong>Education</strong> — From Little Lions Preschool to Sunday School, Bible Study, and Wednesday classes, we help all ages grow in faith.</p>
<p><strong>Community</strong> — We are a caring congregation rooted in fellowship, prayer, and mutual encouragement.</p>

<h2>Our Staff</h2>
<p><strong>Pastor Jim Winterstein</strong> — Pastor Winterstein arrived in Salina in 2023 after 24 years of faithful service in Mesa, Arizona. He and his wife Wendy are blessed to serve the St. Mark congregation.</p>
<p><strong>Ms. Laurel Coates</strong> — Little Lions Preschool Director and Teacher. Ms. Coates holds a BS in Elementary Education from Dr. Martin Luther College in New Ulm, MN and has over 20 years of teaching experience.</p>

<h2>Our History</h2>
<p>St. Mark was founded in 1974 in Salina, Kansas. For over 50 years, we have faithfully proclaimed God's Word to the Salina community. As part of the Wisconsin Evangelical Lutheran Synod and the worldwide Confessional Evangelical Lutheran Conference (CELC), we stand on the unchanging truths of Scripture and the Lutheran Confessions.</p>
<p>Today, St. Mark continues to be a place where people of all backgrounds can hear the Gospel, receive the Sacraments, and find a church family rooted in God's love.</p>`,
  },
  {
    title: "Plan Your Visit",
    slug: "visit",
    showInNav: true,
    sortOrder: 2,
    content: `<h2>We'd Love to Welcome You!</h2>
<p>Whether you've been a Lutheran your whole life or are stepping into a church for the first time, you are welcome at St. Mark. Our services are warm, reverent, and focused on God's Word.</p>

<h3>Worship Schedule</h3>
<p><strong>Sunday Worship:</strong> 9:00 AM</p>
<p><strong>Bible Study &amp; Sunday School:</strong> 10:15 AM (all ages)</p>
<p><strong>Wednesday Bible Classes:</strong> 6:00 PM (during the school year)</p>

<h3>What to Expect</h3>
<p>Our worship includes Scripture readings, a blend of contemporary and traditional Christian music, a pastoral message from God's Word, and the celebration of Baptism and Holy Communion. Jesus said, "Man does not live on bread alone, but on every word that comes from the mouth of God," and that truth shapes everything we do.</p>

<h3>Families Welcome</h3>
<p>We love seeing families in worship! Busy bags are available for young children, and a mother's room is available for families who need extra support during services.</p>

<h3>A Note About Offering</h3>
<p>Our guests and visitors should not feel compelled to give any kind of monetary donation. We want you to simply come, worship, and receive God's grace.</p>

<h3>Location &amp; Parking</h3>
<p>We're located at <strong>2349 S. Ohio St., Salina, KS 67401</strong> — on the northeast corner of Ohio and Magnolia. Parking is available from both Ohio and Magnolia streets.</p>
<p>Questions? Call us at <strong>(785) 825-7455</strong> or email <strong>stmarksalina@gmail.com</strong>.</p>`,
  },
  {
    title: "What We Believe",
    slug: "what-we-believe",
    showInNav: true,
    sortOrder: 3,
    content: `<h2>What We Believe</h2>
<p><em>"Your words are a lamp for my feet and a light for my path."</em> — Psalm 119:105 (EHV)</p>

<p>Christ and Him crucified for us are at the center of our worship and teaching. We believe the Bible is the inspired, inerrant Word of God — completely flawless and without errors — and the only source and standard for Christian doctrine.</p>

<h3>Our Confessional Identity</h3>
<p>St. Mark is a member of the <strong>Wisconsin Evangelical Lutheran Synod (WELS)</strong>, the <strong>Evangelical Lutheran Synod (ELS)</strong>, and the worldwide <strong>Confessional Evangelical Lutheran Conference (CELC)</strong>.</p>

<h3>Key Teachings</h3>
<p><strong>Scripture Alone (Sola Scriptura)</strong> — The Bible is God's inspired Word, the only perfect guide for faith and life.</p>
<p><strong>Grace Alone (Sola Gratia)</strong> — Salvation is a free gift of God, not earned by human effort.</p>
<p><strong>Faith Alone (Sola Fide)</strong> — We receive God's gift of salvation through faith in Jesus Christ.</p>
<p><strong>Christ Alone (Solus Christus)</strong> — Jesus Christ is the only way to the Father and the Savior of the whole world.</p>

<h3>The Means of Grace</h3>
<p>God comes to us through His Word and the Sacraments of Baptism and Holy Communion — what we call the "visible Word." These are the means through which the Holy Spirit creates and strengthens faith.</p>

<h3>Learn More</h3>
<p>We invite you to explore our beliefs further through our Bible Information Class. Contact Pastor Winterstein at (785) 825-7455 to schedule a time.</p>`,
  },
  {
    title: "Education & Sunday School",
    slug: "education",
    showInNav: true,
    sortOrder: 4,
    content: `<h2>Education at St. Mark</h2>
<p>We believe that growing in God's Word is a lifelong journey. St. Mark offers education programs for every age — from toddlers to adults.</p>

<h3>Sunday School (Ages 2–18)</h3>
<p>Every Sunday at <strong>10:15 AM</strong>, following worship. Our 60-minute classes include Bible lessons, Scripture memorization, singing, and art projects. We help youth "grow in the grace and knowledge of our Lord and Savior Jesus Christ" (2 Peter 3:18).</p>

<h3>Adult Bible Study</h3>
<p>Sundays at <strong>10:15 AM</strong>. Our studies rotate between in-depth book studies and the teachings of the Lutheran Confessions.</p>

<h3>Wednesday Evening Classes</h3>
<p>Separate Bible classes for children and adults at <strong>6:00 PM</strong>. Classes break during summer (Memorial Day through Labor Day) and transition into midweek worship during Advent and Lent.</p>

<h3>Bible Information Class</h3>
<p>An introductory course covering the basic teachings of the Bible and our church. Ideal for prospective members or anyone wanting a deeper understanding of what we believe. Schedule individually with Pastor Winterstein.</p>

<h3>Little Lions Preschool</h3>
<p>Established in 2006, Little Lions Preschool has served numerous families throughout Salina with quality, academic, and Christ-centered preschool education. Directed by Ms. Laurel Coates (BS Elementary Education, Dr. Martin Luther College), the program has over 15 years of excellence.</p>
<p>Learn more at <strong>littlelionspreschool.org</strong>.</p>`,
  },
  {
    title: "Sermons & Worship",
    slug: "sermons",
    showInNav: true,
    sortOrder: 5,
    content: `<h2>Sermons &amp; Worship</h2>
<p>Watch or listen to recent messages from Pastor Winterstein. Our sermons are centered on God's Word and are also available on our YouTube channel.</p>
<p>"Jesus said, 'Man does not live on bread alone, but on every word that comes from the mouth of God.'" — Matthew 4:4</p>`,
  },
  {
    title: "Events at St. Mark",
    slug: "events",
    showInNav: true,
    sortOrder: 6,
    content: `<h2>Upcoming Events</h2>
<p>Stay connected with what's happening at St. Mark Lutheran Church. From worship services to fellowship events and community outreach, there's always something going on.</p>`,
  },
  {
    title: "Blog",
    slug: "blog",
    showInNav: true,
    sortOrder: 7,
    content: `<h2>Blog</h2>
<p>Devotions, updates, and encouragement from the St. Mark family. Stay connected with our congregation throughout the week.</p>`,
  },
  {
    title: "Contact St. Mark",
    slug: "contact",
    showInNav: true,
    sortOrder: 8,
    content: `<h2>Contact Us</h2>
<p>We'd love to hear from you — whether you have a question, a prayer request, or just want to learn more about St. Mark.</p>
<p><strong>Address:</strong> 2349 S. Ohio St., Salina, KS 67401</p>
<p><strong>Phone:</strong> (785) 825-7455</p>
<p><strong>Email:</strong> stmarksalina@gmail.com</p>
<p><strong>Pastor:</strong> Jim Winterstein</p>`,
  },
  {
    title: "Privacy Policy",
    slug: "privacy",
    showInNav: false,
    sortOrder: 99,
    content: `<h2>Privacy Policy</h2>
<p>St. Mark Evangelical Lutheran Church respects your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
<h3>Information We Collect</h3>
<p>We may collect personal information such as your name, email address, and phone number when you fill out a contact form, register for events, or subscribe to our communications.</p>
<h3>How We Use Your Information</h3>
<p>Your information is used solely to respond to your inquiries, send church updates and event information, and improve our services.</p>
<h3>Data Protection</h3>
<p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</p>
<h3>Contact</h3>
<p>If you have questions about this privacy policy, please contact us at stmarksalina@gmail.com.</p>`,
  },
];

const seedBlogPosts = [
  {
    title: "Welcome to the New St. Mark Website",
    slug: "welcome-new-st-mark-website",
    excerpt: "We are excited to launch our brand new church website! Stay connected with everything happening at St. Mark Lutheran Church in Salina.",
    content: `<p>We are thrilled to announce the launch of our brand new website for St. Mark Evangelical Lutheran Church! This has been a labor of love, and we're excited to share it with our congregation and the Salina community.</p>
<h3>What You Can Do</h3>
<ul>
<li><strong>Watch Sermons</strong> — Catch up on messages from Pastor Winterstein on our Worship page.</li>
<li><strong>Stay Updated</strong> — Check our Events page for upcoming services, Bible studies, and fellowship gatherings.</li>
<li><strong>Read Our Blog</strong> — We'll share devotionals, updates, and encouraging content regularly.</li>
<li><strong>Connect With Us</strong> — Use our contact form to reach out anytime with questions or prayer requests.</li>
</ul>
<p>We pray this website helps you stay connected with St. Mark throughout the week. To God be the glory!</p>`,
    tags: ["announcement", "community"],
  },
  {
    title: "Standing on the Word: Why Scripture Matters",
    slug: "standing-on-the-word-why-scripture-matters",
    excerpt: "At St. Mark, we believe Scripture is 100% flawless and without errors. Here's why that conviction shapes everything we do.",
    content: `<p>"Your words are a lamp for my feet and a light for my path." — Psalm 119:105</p>
<p>At St. Mark, one of our core convictions is that Scripture is the inspired, inerrant Word of God. But what does that mean for our daily lives?</p>
<h3>A Sure Foundation</h3>
<p>In a world full of shifting opinions and uncertain truths, God's Word stands firm. When we say Scripture is "inerrant," we mean it is completely trustworthy — without errors in everything it teaches. This isn't a limitation; it's a gift. It means we have a sure foundation for faith, life, and every decision we face.</p>
<h3>The Means of Grace</h3>
<p>God doesn't just give us information through His Word — He gives us Himself. Through the Gospel in Word and Sacrament, the Holy Spirit creates and strengthens faith. That's why we gather each Sunday: not merely to learn about God, but to receive His grace.</p>
<h3>Growing Together</h3>
<p>Whether in Sunday worship, Bible study, Sunday School, or our Wednesday evening classes, we invite you to grow with us in the knowledge of God's Word. As the Apostle Peter wrote, "Grow in the grace and knowledge of our Lord and Savior Jesus Christ" (2 Peter 3:18).</p>
<p>Join us at St. Mark as we continue to stand on the Word together.</p>`,
    tags: ["faith", "scripture", "lutheran"],
  },
];

const seedEvents = [
  {
    title: "Sunday Worship Service",
    slug: "sunday-worship-service",
    description: "Join us for worship centered on God's Word. Our service includes Scripture readings, hymns, a sermon from Pastor Winterstein, and the celebration of the Sacraments. All are welcome — come as you are!",
    location: "St. Mark Lutheran Church",
    startDate: getNextSunday(9),
    endDate: getNextSunday(10),
    category: "worship",
  },
  {
    title: "Bible Study & Sunday School",
    slug: "bible-study-sunday-school",
    description: "Adult Bible study and Sunday School for ages 2-18. A wonderful opportunity to grow in God's Word together as a congregation. Coffee and fellowship included!",
    location: "St. Mark Lutheran Church",
    startDate: getNextSunday(10, 15),
    endDate: getNextSunday(11, 15),
    category: "community",
  },
  {
    title: "Wednesday Evening Bible Classes",
    slug: "wednesday-evening-bible-classes",
    description: "Separate Bible classes for children and adults. During Advent and Lent, these classes transition into special midweek worship services.",
    location: "St. Mark Lutheran Church",
    startDate: getNextWednesday(18),
    endDate: getNextWednesday(19, 30),
    category: "community",
  },
  {
    title: "Little Lions Preschool Open House",
    slug: "little-lions-preschool-open-house",
    description: "Come visit our Christ-centered Little Lions Preschool! Meet Director Laurel Coates, tour the classrooms, and learn about enrollment for the upcoming school year. Quality, academic, and Christ-centered education since 2006.",
    location: "Little Lions Preschool at St. Mark",
    startDate: getNextSaturday(9),
    endDate: getNextSaturday(11),
    category: "outreach",
  },
];

function getNextDayOfWeek(dayOfWeek: number, hour: number, minute = 0): Date {
  const now = new Date();
  const result = new Date(now);
  const currentDay = now.getDay();
  const daysUntil = (dayOfWeek - currentDay + 7) % 7 || 7;
  result.setDate(now.getDate() + daysUntil);
  result.setHours(hour, minute, 0, 0);
  return result;
}

function getNextSunday(hour: number, minute = 0) { return getNextDayOfWeek(0, hour, minute); }
function getNextWednesday(hour: number, minute = 0) { return getNextDayOfWeek(3, hour, minute); }
function getNextSaturday(hour: number, minute = 0) { return getNextDayOfWeek(6, hour, minute); }

export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    const admin = await prisma.user.upsert({
      where: { email: "admin@stmarksalina.org" },
      update: {},
      create: {
        name: "Pastor Winterstein",
        email: "admin@stmarksalina.org",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {},
      create: {
        churchName: "St. Mark Evangelical Lutheran Church",
        tagline: "Saved by the Cross. Standing on the Word. Serving to the glory of God.",
        email: "stmarksalina@gmail.com",
        phone: "(785) 825-7455",
        address: "2349 S. Ohio St., Salina, KS 67401",
        vimeoUserId: "user157825759",
        facebookUrl: "https://www.facebook.com/stmarksalina/",
      },
    });

    for (const page of seedPages) {
      await prisma.page.upsert({
        where: { slug: page.slug },
        update: { title: page.title, content: page.content, showInNav: page.showInNav, sortOrder: page.sortOrder },
        create: { title: page.title, slug: page.slug, content: page.content, status: "PUBLISHED", showInNav: page.showInNav, sortOrder: page.sortOrder, authorId: admin.id },
      });
    }

    for (const post of seedBlogPosts) {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: { title: post.title, content: post.content, excerpt: post.excerpt, tags: post.tags },
        create: { title: post.title, slug: post.slug, content: post.content, excerpt: post.excerpt, status: "PUBLISHED", publishedAt: new Date(), tags: post.tags, authorId: admin.id },
      });
    }

    for (const event of seedEvents) {
      await prisma.event.upsert({
        where: { slug: event.slug },
        update: { title: event.title, description: event.description, location: event.location, startDate: event.startDate, endDate: event.endDate, category: event.category },
        create: { title: event.title, slug: event.slug, description: event.description, location: event.location, startDate: event.startDate, endDate: event.endDate ?? null, allDay: false, category: event.category, status: "UPCOMING", authorId: admin.id },
      });
    }

    const pageCount = await prisma.page.count();
    const postCount = await prisma.blogPost.count();
    const eventCount = await prisma.event.count();

    return NextResponse.json({
      message: "St. Mark database seeded successfully",
      adminEmail: "admin@stmarksalina.org",
      counts: { pages: pageCount, posts: postCount, events: eventCount },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
