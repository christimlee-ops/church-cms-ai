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
  {
    title: "Why Families Choose St. Mark Lutheran Church in Salina, KS",
    slug: "why-families-choose-st-mark-lutheran-church-salina-ks",
    excerpt: "Looking for a family church in Salina, KS? Discover why families throughout the community call St. Mark Lutheran Church their church home.",
    content: `<p>Finding the right church for your family is one of the most important decisions you can make. If you're searching for a <strong>family church in Salina, KS</strong>, St. Mark Lutheran Church offers a welcoming, Christ-centered community where every member of your family can grow in faith.</p>

<h2>A Church That Welcomes Every Generation</h2>
<p>At St. Mark, you'll find families of all sizes and stages worshiping together every Sunday at 9:00 AM. We believe that faith is built in the home and nurtured in the church, so we've designed our ministries to serve the whole family — from toddlers to grandparents.</p>
<p>Our Sunday worship is reverent yet approachable. Busy bags are available for young children, and a mother's room provides a comfortable space for families with infants. We want you to feel at home, not stressed about keeping little ones quiet.</p>

<h3>Education for Every Age</h3>
<p>Following worship, our Sunday School and Bible study programs begin at 10:15 AM. Children ages 2–18 engage in Bible lessons, Scripture memorization, singing, and art projects. Adults gather for in-depth Bible study led by Pastor Jim Winterstein. Wednesday evening classes at 6:00 PM offer even more opportunities to grow together.</p>

<h3>Little Lions Preschool</h3>
<p>Since 2006, our <strong>Little Lions Preschool</strong> has provided Christ-centered early education to families across Salina. Directed by Ms. Laurel Coates, a veteran educator with over 20 years of experience and a degree from Dr. Martin Luther College, Little Lions combines quality academics with the love of Jesus.</p>

<h2>Rooted in the Salina Community</h2>
<p>Located at <strong>2349 S. Ohio St.</strong> on the northeast corner of Ohio and Magnolia, St. Mark has been part of the Salina community since 1974. We're not just one of the <strong>churches in Salina, KS</strong> — we're a family that invites you to belong.</p>
<p>Whether you're new to the area or have lived in Salina your whole life, we'd love to meet you. Join us for worship this Sunday at 9:00 AM, or call us at <strong>(785) 825-7455</strong> to learn more.</p>`,
    tags: ["family", "community", "salina", "church"],
  },
  {
    title: "What to Expect at Sunday Worship at St. Mark in Salina",
    slug: "what-to-expect-sunday-worship-st-mark-salina",
    excerpt: "Visiting a new church can feel uncertain. Here's everything you need to know about Sunday worship at St. Mark Lutheran Church in Salina, Kansas.",
    content: `<p>If you're looking for a <strong>Sunday worship</strong> experience in <strong>Salina, KS</strong> that is welcoming, meaningful, and centered on God's Word, St. Mark Lutheran Church is the place for you. Whether you've been a Lutheran your whole life or you're stepping into a church for the first time, here's what you can expect.</p>

<h2>Our Worship Service</h2>
<p>We gather every Sunday at <strong>9:00 AM</strong> for worship. Our service typically lasts about an hour and includes:</p>
<ul>
<li><strong>Scripture Readings</strong> — Passages from the Old Testament, Epistles, and Gospels</li>
<li><strong>Hymns and Music</strong> — A blend of traditional hymns and contemporary Christian songs</li>
<li><strong>Sermon</strong> — A pastoral message from Pastor Jim Winterstein rooted in God's Word</li>
<li><strong>The Sacraments</strong> — Regular celebration of Baptism and Holy Communion</li>
<li><strong>Prayers</strong> — Congregational prayers for the church, community, and world</li>
</ul>

<h3>Come As You Are</h3>
<p>There's no dress code at St. Mark. Some members wear suits and dresses, others wear jeans and casual attire. What matters is that you're here to receive God's gifts of grace. You'll find a warm congregation ready to greet you.</p>

<h3>A Note for Visitors</h3>
<p>We want our guests to feel completely at ease. You will not be singled out or put on the spot. If you'd like, our members are happy to help you follow along during the service. And please don't feel compelled to give an offering — we simply want you to come, worship, and experience God's grace.</p>

<h2>After the Service</h2>
<p>At <strong>10:15 AM</strong>, we offer Bible Study for adults and Sunday School for children and youth. It's a wonderful time to ask questions, meet other members, and grow in faith. Coffee and fellowship are always part of the morning!</p>

<h2>How to Find Us</h2>
<p>St. Mark <strong>Lutheran Church in Salina, Kansas</strong> is located at <strong>2349 S. Ohio St., Salina, KS 67401</strong>, on the northeast corner of Ohio and Magnolia. Parking is available from both streets.</p>
<p>Have questions before your visit? Call us at <strong>(785) 825-7455</strong> or reach out through our contact page. We look forward to welcoming you this Sunday!</p>`,
    tags: ["worship", "visitors", "salina", "sunday"],
  },
  {
    title: "Bible Study in Salina, Kansas: Grow in God's Word at St. Mark",
    slug: "bible-study-salina-kansas-grow-gods-word-st-mark",
    excerpt: "Looking for Bible study in Salina, Kansas? St. Mark Lutheran Church offers multiple opportunities each week for adults and children to grow in God's Word.",
    content: `<p>Whether you're a lifelong student of the Bible or just beginning to explore the Christian faith, <strong>Bible study in Salina, Kansas</strong> is alive and well at St. Mark Lutheran Church. We believe that growing in God's Word is a lifelong journey, and we offer multiple opportunities each week to help you along the way.</p>

<h2>Sunday Morning Bible Study — 10:15 AM</h2>
<p>Right after our 9:00 AM worship service, adults gather for a 60-minute study led by Pastor Jim Winterstein. Our topics rotate between in-depth book studies of Scripture and explorations of the Lutheran Confessions. Whether we're walking through the book of Romans or examining the Augsburg Confession, every session is designed to deepen your understanding of God's grace.</p>
<p>No prior Bible knowledge is required. Questions are always welcome, and our atmosphere is warm and encouraging. Grab a cup of coffee and join the conversation!</p>

<h3>Sunday School — 10:15 AM</h3>
<p>While adults study, children ages 2–18 gather for Sunday School. Our dedicated teachers lead age-appropriate Bible lessons that include Scripture memorization, singing, and creative activities. We take to heart Peter's encouragement to "grow in the grace and knowledge of our Lord and Savior Jesus Christ" (2 Peter 3:18).</p>

<h2>Wednesday Evening Bible Classes — 6:00 PM</h2>
<p>During the school year, we offer separate Wednesday evening classes for children and adults at 6:00 PM. These midweek gatherings are a great way to stay connected and continue growing in faith between Sundays. During Advent and Lent, our Wednesday classes transition into special midweek worship services.</p>

<h2>Bible Information Class</h2>
<p>New to the faith or considering membership? Our Bible Information Class is an introductory course that covers the basic teachings of Scripture and the Lutheran Church. It's perfect for anyone who wants to understand what we believe and why. Sessions are scheduled individually with Pastor Winterstein at your convenience.</p>

<h2>Join Our Christian Community in Salina</h2>
<p>At St. Mark, Bible study is more than just learning — it's fellowship. It's the <strong>Christian community in Salina</strong> that gathers around God's Word and supports one another in faith and life. We'd love to have you join us.</p>
<p>St. Mark Lutheran Church is located at <strong>2349 S. Ohio St., Salina, KS 67401</strong>. Call <strong>(785) 825-7455</strong> for more information or to schedule a Bible Information Class with Pastor Winterstein.</p>`,
    tags: ["bible-study", "education", "salina", "faith"],
  },
  {
    title: "Community Events and Fellowship at St. Mark Lutheran Church",
    slug: "community-events-fellowship-st-mark-lutheran-church",
    excerpt: "From worship services to fellowship gatherings, discover the community events that make St. Mark Lutheran Church a vibrant part of Salina, Kansas.",
    content: `<p>Church is about more than Sunday mornings. At St. Mark Lutheran Church, we believe that Christian fellowship strengthens our faith and builds lasting relationships. If you're looking for <strong>church events in Salina, KS</strong>, you'll find a vibrant, active congregation here.</p>

<h2>Weekly Gatherings</h2>
<p>Our regular schedule provides a rhythm of worship, learning, and community:</p>
<ul>
<li><strong>Sunday Worship</strong> — 9:00 AM every Sunday</li>
<li><strong>Bible Study &amp; Sunday School</strong> — 10:15 AM every Sunday</li>
<li><strong>Wednesday Evening Bible Classes</strong> — 6:00 PM during the school year</li>
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
<p>St. Mark isn't just a <strong>community church in Salina, Kansas</strong> — it's a family. Our members regularly gather for potluck dinners, fellowship meals, and special events that build friendships and strengthen our bond as a congregation.</p>
<p>We also reach out to the Salina community through service projects, food drives, and our Little Lions Preschool, which has been serving families with Christ-centered education since 2006.</p>

<h2>Get Involved</h2>
<p>There's a place for you at St. Mark — whether you want to sing in the choir, help in Sunday School, volunteer for church events, or simply come to worship and fellowship. No matter where you are in your faith journey, you're welcome here.</p>
<p>Visit us at <strong>2349 S. Ohio St., Salina, KS 67401</strong>, or call <strong>(785) 825-7455</strong> to learn about upcoming events. We'd love to see you!</p>`,
    tags: ["events", "community", "fellowship", "salina"],
  },
  {
    title: "Little Lions Preschool: Christ-Centered Early Education in Salina",
    slug: "little-lions-preschool-christ-centered-early-education-salina",
    excerpt: "Since 2006, Little Lions Preschool at St. Mark Lutheran Church has offered quality, Christ-centered early education to families in Salina, Kansas.",
    content: `<p>When it comes to finding the right preschool, Salina families want quality academics, a safe environment, and values they can trust. Since 2006, <strong>Little Lions Preschool</strong> at St. Mark Lutheran Church has delivered all three — providing Christ-centered early education that prepares children for school and for life.</p>

<h2>A Foundation of Faith and Learning</h2>
<p>Little Lions Preschool isn't just daycare with a Bible verse on the wall. Our curriculum integrates academic excellence with the love of Jesus in every lesson. Children learn letters, numbers, colors, shapes, and early reading skills alongside daily Bible stories, prayers, and songs of faith. We believe the best education nurtures the whole child — mind, body, and spirit.</p>

<h3>Experienced, Caring Leadership</h3>
<p>Our director and lead teacher, <strong>Ms. Laurel Coates</strong>, holds a Bachelor of Science in Elementary Education from Dr. Martin Luther College in New Ulm, Minnesota. With over 20 years of classroom experience, Ms. Coates brings a passion for teaching and a deep love for sharing God's Word with young learners.</p>

<h2>What Makes Little Lions Special</h2>
<ul>
<li><strong>Christ-centered curriculum</strong> — Bible stories and Christian values woven into daily activities</li>
<li><strong>Small class sizes</strong> — Individual attention for each student</li>
<li><strong>Experienced teacher</strong> — Over 20 years of dedicated early education experience</li>
<li><strong>Established program</strong> — Serving Salina families since 2006</li>
<li><strong>Safe, nurturing environment</strong> — A place where children are loved and encouraged</li>
</ul>

<h3>Preparing Children for the Future</h3>
<p>Little Lions alumni enter kindergarten well-prepared — not only academically but socially and spiritually. Our <strong>youth programs in Salina, KS</strong> are designed to give children a strong start. As they grow, St. Mark's Sunday School and Wednesday classes continue to build on that foundation throughout their school years.</p>

<h2>Enrollment Information</h2>
<p>Little Lions Preschool is open to all families in the Salina area, regardless of church membership. We welcome you to schedule a tour, visit a classroom, and see firsthand what makes our program special.</p>
<p>St. Mark Lutheran Church is located at <strong>2349 S. Ohio St., Salina, KS 67401</strong>. For enrollment information, call <strong>(785) 825-7455</strong> or visit <strong>littlelionspreschool.org</strong>. We'd love to welcome your little lion!</p>`,
    tags: ["preschool", "education", "family", "salina"],
  },
  {
    title: "What Makes St. Mark a Confessional Lutheran Church in Salina",
    slug: "what-makes-st-mark-confessional-lutheran-church-salina",
    excerpt: "What does it mean to be a confessional Lutheran church? Learn what sets St. Mark apart as a WELS congregation in Salina, Kansas.",
    content: `<p>If you've been searching for a <strong>Lutheran church in Salina, Kansas</strong>, you may have noticed that not all Lutheran churches are the same. At St. Mark, we proudly identify as a <em>confessional</em> Lutheran congregation — but what does that mean, and why does it matter?</p>

<h2>Confessional Means Faithful to Scripture</h2>
<p>The word "confessional" comes from the Lutheran Confessions — a collection of statements of faith written during and after the Reformation that explain what the Bible teaches. At St. Mark, we believe these Confessions are a faithful and accurate summary of God's Word. We don't add to Scripture, and we don't take away from it. We teach the Bible as the inspired, inerrant Word of God — completely flawless and without errors.</p>
<p>This means that when you worship at St. Mark, you can trust that what you hear from the pulpit is rooted in Scripture alone.</p>

<h3>Part of the Wisconsin Evangelical Lutheran Synod</h3>
<p>St. Mark is a member of the <strong>Wisconsin Evangelical Lutheran Synod (WELS)</strong>, one of the most conservative Lutheran bodies in America. WELS congregations are united by a shared commitment to the authority of Scripture and the Lutheran Confessions. We are also part of the <strong>Confessional Evangelical Lutheran Conference (CELC)</strong>, a worldwide fellowship of confessional Lutheran churches.</p>

<h2>What You'll Experience at St. Mark</h2>
<p>Our worship is centered on Christ and Him crucified. Every service is built around the Means of Grace — God's Word and the Sacraments of Baptism and Holy Communion. Through these means, the Holy Spirit creates and strengthens faith. As Jesus Himself said, "Man does not live on bread alone, but on every word that comes from the mouth of God" (Matthew 4:4).</p>

<h3>The Three "Solas"</h3>
<p>Our teaching rests on the great Reformation principles:</p>
<ul>
<li><strong>Scripture Alone (Sola Scriptura)</strong> — The Bible is the only perfect guide for faith and life</li>
<li><strong>Grace Alone (Sola Gratia)</strong> — Salvation is a free gift from God, not earned by works</li>
<li><strong>Faith Alone (Sola Fide)</strong> — We receive salvation through faith in Jesus Christ</li>
</ul>

<h2>Come and See</h2>
<p>Among the <strong>churches in Salina, KS</strong>, St. Mark stands on the unchanging truths of God's Word. Whether you're a lifelong Lutheran or exploring the faith for the first time, we invite you to come and see what confessional Lutheranism looks like in practice.</p>
<p>Join us for worship any Sunday at 9:00 AM at <strong>2349 S. Ohio St., Salina, KS 67401</strong>, or call Pastor Winterstein at <strong>(785) 825-7455</strong>. We'd love to welcome you.</p>`,
    tags: ["lutheran", "faith", "wels", "salina"],
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
