const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Note = require('./models/Note');
const Event = require('./models/Event');
const Meme = require('./models/Meme');
const Discussion = require('./models/Discussion');
const Notification = require('./models/Notification');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected for seeding');

    // Clear existing
    await Promise.all([
      User.deleteMany({}),
      Note.deleteMany({}),
      Event.deleteMany({}),
      Meme.deleteMany({}),
      Discussion.deleteMany({}),
      Notification.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Users
    const students = await User.create([
      { name: 'Aarav Sharma', email: 'aarav@mit.edu', password: 'password123', role: 'student', university: 'MIT', department: 'Computer Science', year: '5th Semester', xp: 2840, streak: 14, verified: true, gpa: 3.88 },
      { name: 'Priya Singh', email: 'priya@stanford.edu', password: 'password123', role: 'student', university: 'Stanford', department: 'Data Science', year: '3rd Year', xp: 1920, streak: 7, verified: true, gpa: 3.95 },
      { name: 'Kevin Lin', email: 'kevin@mit.edu', password: 'password123', role: 'student', university: 'MIT', department: 'Computer Science', year: '4th Year', xp: 3200, streak: 21, verified: true, gpa: 3.72 },
      { name: 'Devon Ray', email: 'devon@ucb.edu', password: 'password123', role: 'student', university: 'UC Berkeley', department: 'EECS', year: '2nd Year', xp: 980, streak: 3, gpa: 3.60 },
      { name: 'Sofia Torres', email: 'sofia@stanford.edu', password: 'password123', role: 'student', university: 'Stanford', department: 'Computer Science', year: '4th Year', xp: 2100, streak: 10, verified: true, gpa: 3.80 },
      { name: 'Liam Kim', email: 'liam@mit.edu', password: 'password123', role: 'student', university: 'MIT', department: 'Mathematics', year: '3rd Year', xp: 1560, streak: 5, gpa: 3.70 },
    ]);

    const [teacher1, teacher2] = await User.create([
      { name: 'Prof. Arjun Mehta', email: 'mehta@mit.edu', password: 'password123', role: 'teacher', university: 'MIT', department: 'Computer Science', verified: true, xp: 500 },
      { name: 'Dr. Lisa Chen', email: 'lchen@stanford.edu', password: 'password123', role: 'teacher', university: 'Stanford', department: 'Data Science', verified: true, xp: 450 },
    ]);

    console.log('👥 Users seeded');

    // Notes
    const notes = await Note.create([
      { title: 'Data Structures & Algorithms Vault: Graph Algorithms & Dynamic Programming', description: 'Complete set of annotated dynamic programming trees, BFS/DFS proofs, and Midterm review recaps.', course: 'CS204', subject: 'Algorithms', university: 'MIT', professor: 'Prof. Leiserson', author: students[0]._id, downloads: 4210, rating: 4.9, ratingCount: 342, verified: true, verifiedBy: teacher1._id, tags: ['algorithms', 'graphs', 'DP'], pages: 64 },
      { title: 'Database Management Systems: B+ Trees, Indexing & Normalization Cheatsheet', description: 'Stanford DB systems condensed notes with SQL optimization rules and query planning diagrams.', course: 'CS301', subject: 'Databases', university: 'Stanford', professor: 'Dr. Widom', author: students[1]._id, downloads: 2940, rating: 4.8, ratingCount: 218, verified: true, verifiedBy: teacher2._id, tags: ['databases', 'SQL', 'B-trees'], pages: 48 },
      { title: 'Operating Systems: Concurrency, Semaphores & Virtual Memory Illustrated', description: 'UC Berkeley complete diagrammatic memory paging breakdowns with annotated diagrams.', course: 'CS210', subject: 'Operating Systems', university: 'UC Berkeley', professor: 'Prof. Patterson', author: students[3]._id, downloads: 3820, rating: 4.95, ratingCount: 401, verified: true, verifiedBy: teacher1._id, tags: ['OS', 'memory', 'concurrency'], pages: 72 },
      { title: 'Machine Learning Fundamentals: Neural Networks, Backprop & Loss Functions', description: 'Visual walkthrough of gradient descent, activation functions and CNN architecture diagrams.', course: 'AI102', subject: 'Machine Learning', university: 'Stanford', professor: 'Prof. Ng', author: students[4]._id, downloads: 5100, rating: 4.92, ratingCount: 512, verified: true, verifiedBy: teacher2._id, tags: ['ML', 'neural networks', 'AI'], pages: 90 },
      { title: 'Computer Networks: TCP/IP Stack, Routing Protocols & Socket Programming', description: 'Layer-by-layer breakdown of network protocols with coding examples in Python.', course: 'CS305', subject: 'Networks', university: 'MIT', professor: 'Prof. Balakrishnan', author: students[2]._id, downloads: 1820, rating: 4.7, ratingCount: 156, verified: false, tags: ['networking', 'TCP', 'sockets'], pages: 56 },
      { title: 'Linear Algebra for ML: Eigenvalues, SVD & Matrix Decomposition', description: 'MIT OCW-style notes condensed into clear derivations with visual intuition for key concepts.', course: 'MATH201', subject: 'Linear Algebra', university: 'MIT', professor: 'Prof. Strang', author: students[5]._id, downloads: 3100, rating: 4.85, ratingCount: 289, verified: true, verifiedBy: teacher1._id, tags: ['math', 'linear algebra', 'ML'], pages: 44 },
    ]);
    console.log('📝 Notes seeded');

    // Events
    const events = await Event.create([
      { title: 'HackMIT 2025', description: 'Flagship 24-hour hackathon at MIT with $50K in prizes across 8 tracks including Web3, AI, and Sustainability.', date: new Date('2025-11-15'), time: '9:00 AM', location: 'MIT Stata Center', category: 'hackathon', createdBy: teacher1._id, rsvps: [students[0]._id, students[2]._id, students[4]._id], maxAttendees: 500, tags: ['hackathon', 'prizes', 'AI'] },
      { title: 'AI & Machine Learning Workshop', description: 'Hands-on workshop covering PyTorch, Transformer architectures, and deploying ML models to production.', date: new Date('2025-10-28'), time: '2:00 PM', location: 'Stanford AI Lab, Room 104', category: 'workshop', createdBy: teacher2._id, rsvps: [students[1]._id, students[4]._id, students[5]._id], maxAttendees: 80, tags: ['AI', 'workshop', 'PyTorch'] },
      { title: 'Campus Cultural Fest 2025', description: 'Annual multicultural celebration with performances, food stalls, and cultural exhibitions from 40+ student clubs.', date: new Date('2025-11-02'), time: '11:00 AM', location: 'Central Campus Quad', category: 'cultural', createdBy: students[3]._id, rsvps: [students[0]._id, students[1]._id, students[2]._id, students[3]._id, students[5]._id], maxAttendees: 2000, tags: ['culture', 'festival', 'community'] },
      { title: 'Competitive Programming Bootcamp', description: 'Intensive 2-day camp covering advanced algorithms, data structures, and competitive problem-solving strategies.', date: new Date('2025-11-08'), time: '10:00 AM', location: 'CSAIL Building, MIT', category: 'workshop', createdBy: teacher1._id, rsvps: [students[0]._id, students[2]._id, students[5]._id], maxAttendees: 60, tags: ['competitive programming', 'algorithms'] },
      { title: 'Stanford-MIT Debate Championship', description: 'Annual inter-university debate tournament with topics on AI ethics, tech policy, and future of education.', date: new Date('2025-11-20'), time: '6:00 PM', location: 'Memorial Auditorium', category: 'other', createdBy: teacher2._id, rsvps: [students[1]._id, students[4]._id], maxAttendees: 300, tags: ['debate', 'ethics', 'AI'] },
    ]);
    console.log('📅 Events seeded');

    // Memes
    await Meme.create([
      { imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UTCgIFqNjUPC1docnuj9q6xzq_Lv7nexjV6DvTwSAZvfsKPEPQZf7GdL7fOsnTOf7jIBuUlRm7-rZ7Z1tD5602RRkATweR592FJEkjd9cLP9Pe1-cCzPLfnrX4v820eJIPRyKUGUlVX54d3fQLwFtgcgQrGvuuLRlFrSebNa4LNlQOUABSOPZwhSMJDLz7NweFjPVl3biMe64UZ8zF250ayDwieWfoyhyhQ-kfegNOnqRhvIZoQZ2Snlc', caption: 'When the compiler throws 100 errors on your first assignment 😭', author: students[0]._id, likes: [students[1]._id, students[2]._id, students[3]._id, students[4]._id, students[5]._id], tags: ['programming', 'relatable', 'compiler'] },
      { imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UrhwqYNMZUMuB-jlKJ2MhP8jDGqTvEOn4jJuiF4KwTI6S-0HyZ9YTuyQQ58y0jM8-dZiTpH2h0DQ0OmhTnbRzRHPym_mXXxSdfcx75YNt52ASdctLQ8WxXMv1a3wHckZeU-nMX_eQBwl0RwfFg_8XPoyLJ1pITjFnbhiLSVscXKqB-NA3NYfYwB8am84ANgLK7if2hJkgTA5PZO_5qnrVkVSdT8Pg286q_FVBJzrIUaLn_7hZwWvrycv0', caption: 'Professor explaining recursion: "To understand recursion, you must first understand recursion" 🤯', author: students[1]._id, likes: [students[0]._id, students[2]._id, students[4]._id], tags: ['recursion', 'professor', 'funny'] },
      { imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1V5K2NmwRECvbTK_rpVBpBpgcR4flFz5KDV7r17tETGmD-U_BkoDUZdLgtUPxBXKFOHvOPvb3_EO6UBx3MZ4H_lsbkavxusmkewWN-jlyxGqpMCbZDPnBukdsMJgfnAtI81dLZmoeOQmbDugw6DVd3RIjd4R_9x4s4tVW6COV00kE3lLFoiyAwKRjb4BFCPSLPtC1QekcI97ATrTrWZLqFExU9T8abLi5X43QtPc701C_97k57Fs4D9Dgw', caption: 'Finals week at the library at 3 AM 📚☕ The struggle is real', author: students[2]._id, likes: [students[0]._id, students[1]._id, students[3]._id, students[4]._id, students[5]._id], tags: ['finals', 'library', 'coffee', 'allnighter'] },
    ]);
    console.log('😂 Memes seeded');

    // Discussions
    const discussions = await Discussion.create([
      { title: 'CS 2810: Midterm DP Trees revision tips & cheat sheets', body: 'Compiled recursive memoization patterns and DAG visualization notes for the Friday midterm. Best resources for dynamic programming?', course: 'CS204', category: 'Academic', author: students[1]._id, upvotes: [students[0]._id, students[2]._id, students[3]._id, students[4]._id, students[5]._id], tags: ['DP', 'midterm', 'algorithms'], replies: [{ author: students[5]._id, text: 'Does this cover DAGs with negative weights?' }, { author: students[0]._id, text: 'Check the CLRS textbook Chapter 15, has excellent memoization examples!' }] },
      { title: 'HackMIT 2025: Looking for 1 frontend dev with Three.js / React skills', body: 'We already have backend + ML infrastructure ready on GCP. Aiming for the Web3/Graphics track! DM if interested.', course: '', category: 'Team Building', author: students[2]._id, upvotes: [students[0]._id, students[1]._id, students[3]._id, students[4]._id, students[5]._id, teacher1._id], tags: ['hackathon', 'React', 'Three.js', 'teamup'], replies: [{ author: students[4]._id, text: 'Just DM me my portfolio link! Built 3 WebGL projects.' }] },
      { title: 'Best study cafes around North Campus with reliable Wi-Fi & quiet corners', body: 'Need spot recommendations that are open past 11 PM with solid espresso and plenty of wall outlets.', course: '', category: 'Campus Life', author: students[3]._id, upvotes: [students[0]._id, students[1]._id, students[2]._id, students[4]._id, students[5]._id, teacher1._id, teacher2._id], tags: ['campus', 'study', 'cafes'], replies: [{ author: students[1]._id, text: 'The Foundry Cafe on 4th Ave has Gigabit fiber & booths!' }] },
      { title: 'Tips for getting TA positions for CS courses next semester', body: 'I am a junior CS student with a 3.9 GPA. What\'s the application timeline and what do professors look for?', course: 'CS204', category: 'Academic', author: students[5]._id, upvotes: [students[0]._id, students[3]._id], tags: ['TA', 'career', 'application'], replies: [] },
    ]);
    console.log('💬 Discussions seeded');

    // Notifications
    await Notification.create([
      { user: students[0]._id, title: 'Note Verified!', message: 'Your CS204 note has been verified by Prof. Mehta', type: 'note', read: false },
      { user: students[0]._id, title: 'HackMIT RSVP Confirmed', message: 'You\'ve successfully RSVP\'d to HackMIT 2025. See you there! 🚀', type: 'event', read: false },
      { user: students[0]._id, title: '14-Day Streak! 🔥', message: 'You\'ve maintained a 14-day coding streak on CodeArena. Keep it up!', type: 'achievement', read: true },
      { user: students[0]._id, title: 'New Reply on Your Discussion', message: 'Liam Kim replied to your CS 2810 DP Trees post', type: 'discussion', read: false },
      { user: students[0]._id, title: 'Welcome to UniVibe! 🎓', message: 'Your .edu account has been verified. Explore campus features!', type: 'system', read: true },
    ]);
    console.log('🔔 Notifications seeded');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📧 Demo login credentials:');
    console.log('   Student: aarav@mit.edu / password123');
    console.log('   Teacher: mehta@mit.edu / password123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seed();
