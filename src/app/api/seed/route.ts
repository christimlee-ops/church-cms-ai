import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const seedPages = [
  {
    title: "About Calvary Lutheran Church",
    slug: "about",
    showInNav: true,
    sortOrder: 1,
    content: `<h2>About Calvary Lutheran Church</h2>
<p>Calvary Lutheran Church is a congregation of the Wisconsin Evangelical Lutheran Synod (WELS) located in Chandler, Arizona. Founded in 1977, we are a community of believers united by God's Word and the Lutheran Confessions.</p>
<p>Our core message is simple: <strong>God's love for the world is a gift for all people — shown through Jesus Christ's life, death, and resurrection.</strong></p>

<h2>What Makes Us Different</h2>
<p>We are <em>Christian</em> — we teach that Jesus Christ is the Savior of the whole world.</p>
<p>We are <em>Confessionally Lutheran</em> — we believe Scripture is 100% flawless and without errors, and we faithfully preach and teach God's Word.</p>
<p>We believe in weekly worship centered on receiving God's grace through Scripture readings, traditional and contemporary Christian music, and the pastoral proclamation of God's Word.</p>

<h2>Our Values</h2>
<p><strong>God's Word</strong> — We hold that Scripture is the inspired, inerrant Word of God and the only rule and guide for faith and life.</p>
<p><strong>Worship</strong> — Christ and Him crucified are at the center of our worship. We gather to receive God's gifts of grace through Word and Sacrament.</p>
<p><strong>Education</strong> — From Mornings with Mommy to Sunday School, Bible Study, and Confirmation, we help all ages grow in faith.</p>
<p><strong>Community</strong> — We are a caring congregation rooted in fellowship, prayer, and mutual encouragement.</p>

<h2>Our Staff</h2>
<p><strong>Pastor Martin Spaude</strong> — Pastor Spaude serves as the shepherd of Calvary Lutheran Church in Chandler, faithfully proclaiming God's Word and administering the Sacraments to the congregation and community.</p>

<h2>Our History</h2>
<p>Calvary Lutheran Church was founded in 1977 in Chandler, Arizona. For nearly 50 years, we have faithfully proclaimed God's Word to the Chandler community. As part of the Wisconsin Evangelical Lutheran Synod and the worldwide Confessional Evangelical Lutheran Conference (CELC), we stand on the unchanging truths of Scripture and the Lutheran Confessions.</p>
<p>Today, Calvary continues to be a place where people of all backgrounds can hear the Gospel, receive the Sacraments, and find a church family rooted in God's love.</p>`,
  },
  {
    title: "Plan Your Visit",
    slug: "visit",
    showInNav: true,
    sortOrder: 2,
    content: `<h2>We'd Love to Welcome You!</h2>
<p>Whether you've been a Lutheran your whole life or are stepping into a church for the first time, you are welcome at Calvary. Our services are warm, reverent, and focused on God's Word.</p>

<h3>Worship Schedule</h3>
<p><strong>Saturday Worship:</strong> 6:00 PM</p>
<p><strong>Sunday Worship:</strong> 9:00 AM</p>
<p><strong>Bible Study &amp; Sunday School:</strong> 10:30 AM (all ages)</p>
<p><strong>Confirmation:</strong> 11:30 AM (7th &amp; 8th Grade)</p>

<h3>What to Expect</h3>
<p>Our worship includes Scripture readings, a blend of contemporary and traditional Christian music, a pastoral message from God's Word, and the celebration of Baptism and Holy Communion. Jesus said, "Man does not live on bread alone, but on every word that comes from the mouth of God," and that truth shapes everything we do.</p>

<h3>Families Welcome</h3>
<p>We love seeing families in worship! Busy bags are available for young children, and a mother's room is available for families who need extra support during services.</p>

<h3>A Note About Offering</h3>
<p>Our guests and visitors should not feel compelled to give any kind of monetary donation. We want you to simply come, worship, and receive God's grace.</p>

<h3>Location &amp; Parking</h3>
<p>We're located at <strong>1270 N Dobson Rd, Chandler, AZ 85224</strong>. Parking is available on site.</p>
<p>Questions? Call us at <strong>(480) 963-9397</strong> or email <strong>pastor@calvarychandler.net</strong>.</p>`,
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
<p>Calvary is a member of the <strong>Wisconsin Evangelical Lutheran Synod (WELS)</strong> and the worldwide <strong>Confessional Evangelical Lutheran Conference (CELC)</strong>.</p>

<h3>Key Teachings</h3>
<p><strong>Scripture Alone (Sola Scriptura)</strong> — The Bible is God's inspired Word, the only perfect guide for faith and life.</p>
<p><strong>Grace Alone (Sola Gratia)</strong> — Salvation is a free gift of God, not earned by human effort.</p>
<p><strong>Faith Alone (Sola Fide)</strong> — We receive God's gift of salvation through faith in Jesus Christ.</p>
<p><strong>Christ Alone (Solus Christus)</strong> — Jesus Christ is the only way to the Father and the Savior of the whole world.</p>

<h3>The Means of Grace</h3>
<p>God comes to us through His Word and the Sacraments of Baptism and Holy Communion — what we call the "visible Word." These are the means through which the Holy Spirit creates and strengthens faith.</p>

<h3>Learn More</h3>
<p>We invite you to explore our beliefs further through our Bible Information Class. Contact Pastor Spaude at (480) 963-9397 to schedule a time.</p>`,
  },
  {
    title: "Education & Ministries",
    slug: "education",
    showInNav: true,
    sortOrder: 4,
    content: `<h2>Education at Calvary</h2>
<p>We believe that growing in God's Word is a lifelong journey. Calvary offers education programs for every age — from toddlers to adults.</p>

<h3>Sunday School (Ages 2–18)</h3>
<p>Every Sunday at <strong>10:30 AM</strong>, following worship. Our 60-minute classes include Bible lessons, Scripture memorization, singing, and art projects. We help youth "grow in the grace and knowledge of our Lord and Savior Jesus Christ" (2 Peter 3:18).</p>

<h3>Adult Bible Study</h3>
<p>Sundays at <strong>10:30 AM</strong>. Our studies rotate between in-depth book studies and the teachings of the Lutheran Confessions.</p>

<h3>Confirmation</h3>
<p>Sundays at <strong>11:30 AM</strong>. A 2-year catechism series for 7th and 8th graders, led by Pastor Spaude. Students study Luther's Small Catechism and prepare to make a public confession of their faith.</p>

<h3>Bible Information Class</h3>
<p>An introductory course covering the basic teachings of the Bible and our church. Ideal for prospective members or anyone wanting a deeper understanding of what we believe. Schedule individually with Pastor Spaude.</p>

<h3>Mornings with Mommy</h3>
<p>Held the 1st Tuesday of each month, Mornings with Mommy is a ministry for children ages 0-6 and their caregivers. Directed by Bridget Spaude and Rachel Traudt, the program offers Christ-centered activities, play, and fellowship for families in the Chandler area.</p>`,
  },
  {
    title: "Sermons & Worship",
    slug: "sermons",
    showInNav: true,
    sortOrder: 5,
    content: `<h2>Sermons &amp; Worship</h2>
<p>Watch or listen to recent messages from Pastor Spaude. Our sermons are centered on God's Word and are also available on our YouTube channel.</p>
<p>"Jesus said, 'Man does not live on bread alone, but on every word that comes from the mouth of God.'" — Matthew 4:4</p>`,
  },
  {
    title: "Events at Calvary",
    slug: "events",
    showInNav: true,
    sortOrder: 6,
    content: `<h2>Upcoming Events</h2>
<p>Stay connected with what's happening at Calvary Lutheran Church. From worship services to fellowship events and community outreach, there's always something going on.</p>`,
  },
  {
    title: "Blog",
    slug: "blog",
    showInNav: true,
    sortOrder: 7,
    content: `<h2>Blog</h2>
<p>Devotions, updates, and encouragement from the Calvary family. Stay connected with our congregation throughout the week.</p>`,
  },
  {
    title: "Contact Calvary",
    slug: "contact",
    showInNav: true,
    sortOrder: 8,
    content: `<h2>Contact Us</h2>
<p>We'd love to hear from you — whether you have a question, a prayer request, or just want to learn more about Calvary.</p>
<p><strong>Address:</strong> 1270 N Dobson Rd, Chandler, AZ 85224</p>
<p><strong>Phone:</strong> (480) 963-9397</p>
<p><strong>Email:</strong> pastor@calvarychandler.net</p>
<p><strong>Pastor:</strong> Martin Spaude</p>`,
  },
  {
    title: "Privacy Policy",
    slug: "privacy",
    showInNav: false,
    sortOrder: 99,
    content: `<h2>Privacy Policy</h2>
<p>Calvary Lutheran Church respects your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
<h3>Information We Collect</h3>
<p>We may collect personal information such as your name, email address, and phone number when you fill out a contact form, register for events, or subscribe to our communications.</p>
<h3>How We Use Your Information</h3>
<p>Your information is used solely to respond to your inquiries, send church updates and event information, and improve our services.</p>
<h3>Data Protection</h3>
<p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.</p>
<h3>Contact</h3>
<p>If you have questions about this privacy policy, please contact us at pastor@calvarychandler.net.</p>`,
  },
];

const seedBlogPosts = [
  {
    title: "Welcome to the New Calvary Website",
    slug: "welcome-new-calvary-website",
    excerpt: "We are excited to launch our brand new church website! Stay connected with everything happening at Calvary Lutheran Church in Chandler.",
    content: `<p>We are thrilled to announce the launch of our brand new website for Calvary Lutheran Church! This has been a labor of love, and we're excited to share it with our congregation and the Chandler community.</p>
<h3>What You Can Do</h3>
<ul>
<li><strong>Watch Sermons</strong> — Catch up on messages from Pastor Spaude on our Worship page.</li>
<li><strong>Stay Updated</strong> — Check our Events page for upcoming services, Bible studies, and fellowship gatherings.</li>
<li><strong>Read Our Blog</strong> — We'll share devotionals, updates, and encouraging content regularly.</li>
<li><strong>Connect With Us</strong> — Use our contact form to reach out anytime with questions or prayer requests.</li>
</ul>
<p>We pray this website helps you stay connected with Calvary throughout the week. To God be the glory!</p>`,
    tags: ["announcement", "community"],
  },
  {
    title: "Growing in Grace: Why Scripture Matters at Calvary",
    slug: "growing-in-grace-why-scripture-matters-calvary",
    excerpt: "At Calvary Lutheran Church in Chandler, AZ, we believe Scripture is 100% flawless and without errors. Here's why that conviction shapes everything we do.",
    content: `<p>"Your words are a lamp for my feet and a light for my path." — Psalm 119:105</p>
<p>At Calvary, one of our core convictions is that Scripture is the inspired, inerrant Word of God. But what does that mean for our daily lives?</p>
<h3>A Sure Foundation</h3>
<p>In a world full of shifting opinions and uncertain truths, God's Word stands firm. When we say Scripture is "inerrant," we mean it is completely trustworthy — without errors in everything it teaches. This isn't a limitation; it's a gift. It means we have a sure foundation for faith, life, and every decision we face.</p>
<h3>The Means of Grace</h3>
<p>God doesn't just give us information through His Word — He gives us Himself. Through the Gospel in Word and Sacrament, the Holy Spirit creates and strengthens faith. That's why we gather each Saturday evening and Sunday morning: not merely to learn about God, but to receive His grace.</p>
<h3>Growing Together</h3>
<p>Whether in Saturday or Sunday worship, Bible study, Sunday School, or Confirmation, we invite you to grow with us in the knowledge of God's Word. As the Apostle Peter wrote, "Grow in the grace and knowledge of our Lord and Savior Jesus Christ" (2 Peter 3:18).</p>
<p>Join us at Calvary as we continue to grow in grace together.</p>`,
    tags: ["faith", "scripture", "lutheran", "chandler"],
  },
  {
    title: "Why Families Choose Calvary Lutheran Church in Chandler, AZ",
    slug: "why-families-choose-calvary-lutheran-church-chandler-az",
    excerpt: "Looking for a family church in Chandler, AZ? Discover why families throughout the community call Calvary Lutheran Church their church home.",
    content: `<p>Finding the right church for your family is one of the most important decisions you can make. If you're searching for a <strong>family church in Chandler, AZ</strong>, Calvary Lutheran Church offers a welcoming, Christ-centered community where every member of your family can grow in faith.</p>

<h2>A Church That Welcomes Every Generation</h2>
<p>At Calvary, you'll find families of all sizes and stages worshiping together every Saturday at 6:00 PM and Sunday at 9:00 AM. We believe that faith is built in the home and nurtured in the church, so we've designed our ministries to serve the whole family — from infants to grandparents.</p>
<p>Our worship is reverent yet approachable. Busy bags are available for young children, and a mother's room provides a comfortable space for families with infants. We want you to feel at home, not stressed about keeping little ones quiet.</p>

<h3>Education for Every Age</h3>
<p>Following Sunday worship, our Sunday School and Bible study programs begin at 10:30 AM. Children ages 2–18 engage in Bible lessons, Scripture memorization, singing, and art projects. Adults gather for in-depth Bible study led by Pastor Martin Spaude. Confirmation for 7th and 8th graders meets at 11:30 AM.</p>

<h3>Mornings with Mommy</h3>
<p>On the 1st Tuesday of each month, <strong>Mornings with Mommy</strong> brings together children ages 0-6 and their caregivers for Christ-centered activities, play, and fellowship. Directed by Bridget Spaude and Rachel Traudt, this program is a wonderful way for young families to connect.</p>

<h2>Rooted in the Chandler Community</h2>
<p>Located at <strong>1270 N Dobson Rd</strong>, Calvary has been part of the Chandler community since 1977. We're not just one of the <strong>churches in Chandler, AZ</strong> — we're a family that invites you to belong.</p>
<p>Whether you're new to the area or have lived in Chandler your whole life, we'd love to meet you. Join us for worship this weekend, or call us at <strong>(480) 963-9397</strong> to learn more.</p>`,
    tags: ["family", "community", "chandler", "church"],
  },
  {
    title: "What to Expect at Worship at Calvary in Chandler",
    slug: "what-to-expect-worship-calvary-chandler",
    excerpt: "Visiting a new church can feel uncertain. Here's everything you need to know about worship at Calvary Lutheran Church in Chandler, Arizona.",
    content: `<p>If you're looking for a <strong>worship</strong> experience in <strong>Chandler, AZ</strong> that is welcoming, meaningful, and centered on God's Word, Calvary Lutheran Church is the place for you. Whether you've been a Lutheran your whole life or you're stepping into a church for the first time, here's what you can expect.</p>

<h2>Our Worship Services</h2>
<p>We offer two worship opportunities each week:</p>
<ul>
<li><strong>Saturday Evening</strong> — 6:00 PM</li>
<li><strong>Sunday Morning</strong> — 9:00 AM</li>
</ul>
<p>Our services typically last about an hour and include:</p>
<ul>
<li><strong>Scripture Readings</strong> — Passages from the Old Testament, Epistles, and Gospels</li>
<li><strong>Hymns and Music</strong> — A blend of traditional hymns and contemporary Christian songs</li>
<li><strong>Sermon</strong> — A pastoral message from Pastor Martin Spaude rooted in God's Word</li>
<li><strong>The Sacraments</strong> — Regular celebration of Baptism and Holy Communion</li>
<li><strong>Prayers</strong> — Congregational prayers for the church, community, and world</li>
</ul>

<h3>Come As You Are</h3>
<p>There's no dress code at Calvary. Some members wear suits and dresses, others wear jeans and casual attire. What matters is that you're here to receive God's gifts of grace. You'll find a warm congregation ready to greet you.</p>

<h3>A Note for Visitors</h3>
<p>We want our guests to feel completely at ease. You will not be singled out or put on the spot. If you'd like, our members are happy to help you follow along during the service. And please don't feel compelled to give an offering — we simply want you to come, worship, and experience God's grace.</p>

<h2>After the Service</h2>
<p>On Sunday at <strong>10:30 AM</strong>, we offer Bible Study for adults and Sunday School for children and youth. It's a wonderful time to ask questions, meet other members, and grow in faith. Coffee and fellowship are always part of the morning!</p>

<h2>How to Find Us</h2>
<p>Calvary <strong>Lutheran Church in Chandler, Arizona</strong> is located at <strong>1270 N Dobson Rd, Chandler, AZ 85224</strong>. Parking is available on site.</p>
<p>Have questions before your visit? Call us at <strong>(480) 963-9397</strong> or reach out through our contact page. We look forward to welcoming you!</p>`,
    tags: ["worship", "visitors", "chandler", "sunday"],
  },
  {
    title: "Bible Study in Chandler, Arizona: Grow in God's Word at Calvary",
    slug: "bible-study-chandler-arizona-grow-gods-word-calvary",
    excerpt: "Looking for Bible study in Chandler, Arizona? Calvary Lutheran Church offers multiple opportunities each week for adults and children to grow in God's Word.",
    content: `<p>Whether you're a lifelong student of the Bible or just beginning to explore the Christian faith, <strong>Bible study in Chandler, Arizona</strong> is alive and well at Calvary Lutheran Church. We believe that growing in God's Word is a lifelong journey, and we offer multiple opportunities each week to help you along the way.</p>

<h2>Sunday Morning Bible Study — 10:30 AM</h2>
<p>Right after our 9:00 AM worship service, adults gather for a 60-minute study led by Pastor Martin Spaude. Our topics rotate between in-depth book studies of Scripture and explorations of the Lutheran Confessions. Whether we're walking through the book of Romans or examining the Augsburg Confession, every session is designed to deepen your understanding of God's grace.</p>
<p>No prior Bible knowledge is required. Questions are always welcome, and our atmosphere is warm and encouraging. Grab a cup of coffee and join the conversation!</p>

<h3>Sunday School — 10:30 AM</h3>
<p>While adults study, children ages 2–18 gather for Sunday School. Our dedicated teachers lead age-appropriate Bible lessons that include Scripture memorization, singing, and creative activities. We take to heart Peter's encouragement to "grow in the grace and knowledge of our Lord and Savior Jesus Christ" (2 Peter 3:18).</p>

<h2>Confirmation — 11:30 AM</h2>
<p>Our 2-year confirmation program for 7th and 8th graders meets Sundays at 11:30 AM. Led by Pastor Spaude, students study Luther's Small Catechism and the key doctrines of Scripture, preparing to make a public confession of their faith.</p>

<h2>Bible Information Class</h2>
<p>New to the faith or considering membership? Our Bible Information Class is an introductory course that covers the basic teachings of Scripture and the Lutheran Church. It's perfect for anyone who wants to understand what we believe and why. Sessions are scheduled individually with Pastor Spaude at your convenience.</p>

<h2>Join Our Christian Community in Chandler</h2>
<p>At Calvary, Bible study is more than just learning — it's fellowship. It's the <strong>Christian community in Chandler</strong> that gathers around God's Word and supports one another in faith and life. We'd love to have you join us.</p>
<p>Calvary Lutheran Church is located at <strong>1270 N Dobson Rd, Chandler, AZ 85224</strong>. Call <strong>(480) 963-9397</strong> for more information or to schedule a Bible Information Class with Pastor Spaude.</p>`,
    tags: ["bible-study", "education", "chandler", "faith"],
  },
  {
    title: "Community Events and Fellowship at Calvary Lutheran Church",
    slug: "community-events-fellowship-calvary-lutheran-church",
    excerpt: "From worship services to fellowship gatherings, discover the community events that make Calvary Lutheran Church a vibrant part of Chandler, Arizona.",
    content: `<p>Church is about more than Sunday mornings. At Calvary Lutheran Church, we believe that Christian fellowship strengthens our faith and builds lasting relationships. If you're looking for <strong>church events in Chandler, AZ</strong>, you'll find a vibrant, active congregation here.</p>

<h2>Weekly Gatherings</h2>
<p>Our regular schedule provides a rhythm of worship, learning, and community:</p>
<ul>
<li><strong>Saturday Worship</strong> — 6:00 PM every Saturday</li>
<li><strong>Sunday Worship</strong> — 9:00 AM every Sunday</li>
<li><strong>Bible Study &amp; Sunday School</strong> — 10:30 AM every Sunday</li>
<li><strong>Confirmation</strong> — 11:30 AM every Sunday</li>
<li><strong>Mornings with Mommy</strong> — 1st Tuesday of each month</li>
</ul>
<p>These weekly touchpoints keep our congregation connected to God's Word and to one another. Coffee and conversation before and after services are always part of the experience.</p>

<h3>Seasonal Worship and Celebrations</h3>
<p>Throughout the church year, we celebrate special services that draw our congregation and community together:</p>
<ul>
<li><strong>Advent and Christmas Services</strong> — Midweek Advent worship and a Christmas Eve candlelight service</li>
<li><strong>Lenten and Easter Services</strong> — Midweek Lenten meditations, Maundy Thursday, Good Friday, and Easter sunrise worship</li>
<li><strong>Reformation Sunday</strong> — Celebrating the heritage of the Lutheran Reformation</li>
<li><strong>Vacation Bible School</strong> — A summer favorite for kids featuring Bible lessons, crafts, songs, and games</li>
</ul>

<h2>Fellowship and Outreach</h2>
<p>Calvary isn't just a <strong>community church in Chandler, Arizona</strong> — it's a family. Our members regularly gather for potluck dinners, fellowship meals, and special events that build friendships and strengthen our bond as a congregation.</p>
<p>We also reach out to the Chandler community through service projects, food drives, and our Mornings with Mommy program, which serves young families with Christ-centered activities each month.</p>

<h2>Get Involved</h2>
<p>There's a place for you at Calvary — whether you want to sing in the choir, help in Sunday School, volunteer for church events, or simply come to worship and fellowship. No matter where you are in your faith journey, you're welcome here.</p>
<p>Visit us at <strong>1270 N Dobson Rd, Chandler, AZ 85224</strong>, or call <strong>(480) 963-9397</strong> to learn about upcoming events. We'd love to see you!</p>`,
    tags: ["events", "community", "fellowship", "chandler"],
  },
  {
    title: "Mornings with Mommy: A Ministry for Young Families in Chandler",
    slug: "mornings-with-mommy-ministry-young-families-chandler",
    excerpt: "Mornings with Mommy at Calvary Lutheran Church brings together children ages 0-6 and their caregivers for Christ-centered activities in Chandler, Arizona.",
    content: `<p>Finding community as a young family can be challenging. That's why Calvary Lutheran Church in Chandler offers <strong>Mornings with Mommy</strong> — a monthly ministry designed to bring together children ages 0-6 and their caregivers for a morning of faith, fun, and fellowship.</p>

<h2>What Is Mornings with Mommy?</h2>
<p>Held on the 1st Tuesday of each month, Mornings with Mommy is a free program open to all families in the Chandler area. Each session includes Bible stories, songs, crafts, and free play in a safe, welcoming environment. It's a wonderful way for parents, grandparents, and caregivers to connect with other families while introducing their little ones to the love of Jesus.</p>

<h3>Led with Love</h3>
<p>The program is directed by <strong>Bridget Spaude</strong> and <strong>Rachel Traudt</strong>, who bring a passion for ministry and a heart for serving young families. Their goal is to create a warm, Christ-centered space where both children and caregivers feel at home.</p>

<h2>Why Mornings with Mommy?</h2>
<ul>
<li><strong>Christ-centered activities</strong> — Bible stories and songs woven into every session</li>
<li><strong>Social connection</strong> — Build friendships with other families in Chandler</li>
<li><strong>Family friendly</strong> — Designed for children ages 0-6 and their caregivers</li>
<li><strong>Community building</strong> — A bridge between Calvary and the Chandler community</li>
</ul>

<h2>Join Us</h2>
<p>Mornings with Mommy is open to all families in the Chandler area, regardless of church membership. We'd love to welcome you and your little ones!</p>
<p>Calvary Lutheran Church is located at <strong>1270 N Dobson Rd, Chandler, AZ 85224</strong>. For more information, call <strong>(480) 963-9397</strong> or visit our contact page. We'd love to see you on the 1st Tuesday!</p>`,
    tags: ["family", "education", "chandler", "mornings-with-mommy"],
  },
  {
    title: "What Makes Calvary a Confessional Lutheran Church in Chandler",
    slug: "what-makes-calvary-confessional-lutheran-church-chandler",
    excerpt: "What does it mean to be a confessional Lutheran church? Learn what sets Calvary apart as a WELS congregation in Chandler, Arizona.",
    content: `<p>If you've been searching for a <strong>Lutheran church in Chandler, Arizona</strong>, you may have noticed that not all Lutheran churches are the same. At Calvary, we proudly identify as a <em>confessional</em> Lutheran congregation — but what does that mean, and why does it matter?</p>

<h2>Confessional Means Faithful to Scripture</h2>
<p>The word "confessional" comes from the Lutheran Confessions — a collection of statements of faith written during and after the Reformation that explain what the Bible teaches. At Calvary, we believe these Confessions are a faithful and accurate summary of God's Word. We don't add to Scripture, and we don't take away from it. We teach the Bible as the inspired, inerrant Word of God — completely flawless and without errors.</p>
<p>This means that when you worship at Calvary, you can trust that what you hear from the pulpit is rooted in Scripture alone.</p>

<h3>Part of the Wisconsin Evangelical Lutheran Synod</h3>
<p>Calvary is a member of the <strong>Wisconsin Evangelical Lutheran Synod (WELS)</strong>, one of the most conservative Lutheran bodies in America. WELS congregations are united by a shared commitment to the authority of Scripture and the Lutheran Confessions. We are also part of the <strong>Confessional Evangelical Lutheran Conference (CELC)</strong>, a worldwide fellowship of confessional Lutheran churches.</p>

<h2>What You'll Experience at Calvary</h2>
<p>Our worship is centered on Christ and Him crucified. Every service is built around the Means of Grace — God's Word and the Sacraments of Baptism and Holy Communion. Through these means, the Holy Spirit creates and strengthens faith. As Jesus Himself said, "Man does not live on bread alone, but on every word that comes from the mouth of God" (Matthew 4:4).</p>

<h3>The Three "Solas"</h3>
<p>Our teaching rests on the great Reformation principles:</p>
<ul>
<li><strong>Scripture Alone (Sola Scriptura)</strong> — The Bible is the only perfect guide for faith and life</li>
<li><strong>Grace Alone (Sola Gratia)</strong> — Salvation is a free gift from God, not earned by works</li>
<li><strong>Faith Alone (Sola Fide)</strong> — We receive salvation through faith in Jesus Christ</li>
</ul>

<h2>Come and See</h2>
<p>Among the <strong>churches in Chandler, AZ</strong>, Calvary stands on the unchanging truths of God's Word. Whether you're a lifelong Lutheran or exploring the faith for the first time, we invite you to come and see what confessional Lutheranism looks like in practice.</p>
<p>Join us for worship Saturday at 6:00 PM or Sunday at 9:00 AM at <strong>1270 N Dobson Rd, Chandler, AZ 85224</strong>, or call Pastor Spaude at <strong>(480) 963-9397</strong>. We'd love to welcome you.</p>`,
    tags: ["lutheran", "faith", "wels", "chandler"],
  },
  {
    title: "Looking for a Church Near Me in Chandler, Gilbert, or Mesa?",
    slug: "church-near-me-chandler-gilbert-mesa-arizona",
    excerpt: "If you're searching for a church near me in Chandler, Gilbert, Mesa, or the East Valley, Calvary Lutheran Church welcomes you with open arms.",
    content: `<p>Moving to a new area — or simply searching for a <strong>church near me</strong> — can feel overwhelming. With so many options in the East Valley, how do you find a church that feels like home? If you're in <strong>Chandler, Gilbert, Mesa, Tempe</strong>, or anywhere in the Phoenix East Valley, Calvary Lutheran Church might be exactly what you're looking for.</p>

<h2>Why Calvary Lutheran Church?</h2>
<p>Calvary is a <strong>WELS Lutheran church in Chandler, AZ</strong> that has been serving the community since 1977. We're located at <strong>1270 N Dobson Rd, Chandler, AZ 85224</strong> — easily accessible from Gilbert, Mesa, Tempe, and surrounding areas.</p>
<p>What sets us apart is our commitment to teaching the Bible faithfully and creating a welcoming environment for everyone — singles, couples, families, and seniors alike.</p>

<h3>Convenient Worship Times</h3>
<p>We know schedules are busy, so we offer two worship services each week:</p>
<ul>
<li><strong>Saturday at 6:00 PM</strong> — Perfect if your Sundays are packed</li>
<li><strong>Sunday at 9:00 AM</strong> — Traditional Sunday morning worship</li>
</ul>
<p>After Sunday worship, Bible Study and Sunday School begin at 10:30 AM for all ages.</p>

<h2>Programs for Every Stage of Life</h2>
<ul>
<li><strong>Mornings with Mommy</strong> — For children ages 0-6 and caregivers (1st Tuesday monthly)</li>
<li><strong>Sunday School</strong> — Ages 2-18, Sundays at 10:30 AM</li>
<li><strong>Confirmation</strong> — 7th and 8th graders, Sundays at 11:30 AM</li>
<li><strong>Adult Bible Study</strong> — Sundays at 10:30 AM</li>
<li><strong>Bible Information Class</strong> — For anyone exploring the faith</li>
</ul>

<h2>Serving the East Valley Community</h2>
<p>Whether you live in <strong>Chandler, Gilbert, Mesa, Tempe, Queen Creek, or San Tan Valley</strong>, Calvary is just a short drive away. We're proud to be a welcoming <strong>Christian church near you</strong> that puts God's Word at the center of everything we do.</p>
<p>Stop searching for a "<strong>church near me</strong>" and come see for yourself. Visit us this weekend or call <strong>(480) 963-9397</strong>. We'd love to meet you!</p>`,
    tags: ["church-near-me", "chandler", "gilbert", "mesa", "east-valley"],
  },
  {
    title: "5 Reasons to Visit a Lutheran Church This Weekend in Chandler AZ",
    slug: "5-reasons-visit-lutheran-church-weekend-chandler-az",
    excerpt: "Thinking about visiting a Lutheran church? Here are five reasons to try Calvary Lutheran Church in Chandler, Arizona this weekend.",
    content: `<p>Maybe you've driven past a <strong>Lutheran church in Chandler</strong> and wondered what it's like inside. Maybe you've been meaning to find a new church home but haven't taken the first step. Here are five reasons this weekend is the perfect time to visit Calvary Lutheran Church.</p>

<h2>1. You'll Hear the Gospel — Not Opinions</h2>
<p>At Calvary, every sermon is rooted in Scripture. Pastor Martin Spaude faithfully preaches God's Word — not pop psychology, not political commentary, not self-help advice. You'll hear the timeless message of Jesus Christ crucified and risen for you.</p>

<h2>2. Everyone Is Welcome — No Exceptions</h2>
<p>Whether you've been a Christian your whole life or you're walking into a church for the first time, you belong at Calvary. There's no dress code, no pressure, and no judgment. Come as you are.</p>

<h2>3. There's Something for Every Age</h2>
<p>From <strong>Mornings with Mommy</strong> (ages 0-6) to Sunday School, Confirmation, and adult Bible study, Calvary has programs for every member of your family. Your kids will love it, and so will you.</p>

<h2>4. Two Services to Fit Your Schedule</h2>
<p>Can't make it Sunday morning? Join us <strong>Saturday at 6:00 PM</strong>. Prefer the traditional Sunday experience? We worship at <strong>9:00 AM</strong>. Either way, you'll experience the same Christ-centered worship.</p>

<h2>5. A Caring Community Since 1977</h2>
<p>Calvary has been part of the <strong>Chandler community</strong> for nearly 50 years. When you walk through our doors, you're not just visiting a building — you're joining a family that cares about you and your spiritual well-being.</p>

<h2>Come This Weekend</h2>
<p>Calvary Lutheran Church is located at <strong>1270 N Dobson Rd, Chandler, AZ 85224</strong>. Parking is free, the coffee is hot, and the welcome is genuine. We can't wait to meet you.</p>
<p>Questions? Call <strong>(480) 963-9397</strong> or visit our <a href="/visit">Plan Your Visit</a> page.</p>`,
    tags: ["visit", "lutheran", "chandler", "worship", "newcomers"],
  },
];

const seedEvents = [
  {
    title: "Saturday Worship Service",
    slug: "saturday-worship-service",
    description: "Join us for Saturday evening worship centered on God's Word. Our service includes Scripture readings, hymns, a sermon from Pastor Spaude, and the celebration of the Sacraments. All are welcome — come as you are!",
    location: "Calvary Lutheran Church",
    startDate: getNextSaturday(18),
    endDate: getNextSaturday(19),
    category: "worship",
  },
  {
    title: "Sunday Worship Service",
    slug: "sunday-worship-service",
    description: "Join us for Sunday morning worship centered on God's Word. Our service includes Scripture readings, hymns, a sermon from Pastor Spaude, and the celebration of the Sacraments. All are welcome — come as you are!",
    location: "Calvary Lutheran Church",
    startDate: getNextSunday(9),
    endDate: getNextSunday(10),
    category: "worship",
  },
  {
    title: "Bible Study & Sunday School",
    slug: "bible-study-sunday-school",
    description: "Adult Bible study and Sunday School for ages 2-18. A wonderful opportunity to grow in God's Word together as a congregation. Coffee and fellowship included!",
    location: "Calvary Lutheran Church",
    startDate: getNextSunday(10, 30),
    endDate: getNextSunday(11, 30),
    category: "community",
  },
  {
    title: "Mornings with Mommy",
    slug: "mornings-with-mommy",
    description: "A Christ-centered ministry for children ages 0-6 and their caregivers. Join us on the 1st Tuesday of each month for Bible stories, songs, crafts, and fellowship. Directed by Bridget Spaude and Rachel Traudt. Open to all families in the Chandler area.",
    location: "Calvary Lutheran Church",
    startDate: getNextTuesday(9, 30),
    endDate: getNextTuesday(11),
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
function getNextTuesday(hour: number, minute = 0) { return getNextDayOfWeek(2, hour, minute); }
function getNextSaturday(hour: number, minute = 0) { return getNextDayOfWeek(6, hour, minute); }

export async function POST() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    const admin = await prisma.user.upsert({
      where: { email: "admin@calvarychandler.net" },
      update: {},
      create: {
        name: "Pastor Spaude",
        email: "admin@calvarychandler.net",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {},
      create: {
        churchName: "Calvary Lutheran Church",
        tagline: "Grow in the grace and knowledge of our Lord and Savior Jesus Christ.",
        email: "pastor@calvarychandler.net",
        phone: "(480) 963-9397",
        address: "1270 N Dobson Rd, Chandler, AZ 85224",
        facebookUrl: "https://www.facebook.com/CalvaryLutheranChurchChandler/",
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
      message: "Calvary database seeded successfully",
      adminEmail: "admin@calvarychandler.net",
      counts: { pages: pageCount, posts: postCount, events: eventCount },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
