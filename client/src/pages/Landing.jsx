import { Link } from 'react-router-dom';
import { useState } from 'react';

const features = [
  { icon: 'school', color: '#16A34A', tint: '#DCFCE7', label: 'Academic', title: 'Verified Notes', desc: 'Crowdsourced study guides, past exams & lecture notes authenticated by professors and top TAs.', link: '/notes', cta: 'Browse Vaults' },
  { icon: 'celebration', color: '#B45309', tint: '#FEF3C7', label: 'Social & Career', title: 'Campus Events', desc: 'Never miss a hackathon, workshop, club mixer or cultural fest with real-time RSVPs.', link: '/events', cta: 'Explore Calendar' },
  { icon: 'sentiment_very_satisfied', color: '#111827', tint: '#F3F4F6', label: 'Community', title: 'MemeZone', desc: 'Campus humor, relatable exam stress memes & inside jokes curated by students, for students.', link: '/memes', cta: 'View Feed' },
  { icon: 'terminal', color: '#4F46E5', tint: '#EEF2FF', label: 'Tech', title: 'CodeArena', desc: 'Real-time competitive coding battles, algorithmic duels & campus leaderboards for tech interview prep.', link: '/codearena', cta: 'Join Next Duel' },
];

const steps = [
  { n: '01', title: 'Sign Up', desc: 'Join using your official .edu college email in under 60 seconds with instant SSO.', icon: 'domain_verification' },
  { n: '02', title: 'Get Verified', desc: 'Unlock instant access to verified campus vaults, department channels, and peer networks.', icon: 'lock_open' },
  { n: '03', title: 'Explore & Excel', desc: 'Collaborate on notes, compete in code sprints, RSVP to hackathons, and level up.', icon: 'trending_up' },
];

export default function Landing() {
  const [rsvpd, setRsvpd] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ minHeight:'100vh', background:'#F3F4F6', fontFamily:"'Inter',sans-serif" }}>
      {/* Navbar */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, height:64, background:'rgba(255,255,255,0.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid #E5E7EB', display:'flex', alignItems:'center', padding:'0 1.5rem' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
            <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
              <div style={{ width:32, height:32, borderRadius:'0.5rem', background:'#EA580C', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'1.125rem' }}>U</div>
              <span style={{ fontSize:'1.25rem', fontWeight:800, color:'#111827', letterSpacing:'-0.02em' }}>UniVibe</span>
            </Link>
            <nav style={{ display:'flex', gap:'0.25rem' }}>
              {['Notes','Events','Memes','CodeArena'].map(x => (
                <Link key={x} to={`/${x.toLowerCase()}`} style={{ padding:'0.375rem 0.875rem', borderRadius:'0.5rem', fontSize:'0.875rem', fontWeight:500, color:'#6B7280', transition:'all 0.15s' }}>{x}</Link>
              ))}
            </nav>
          </div>
          <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
            <Link to="/login" className="btn btn-secondary btn-press" style={{ height:36 }}>Login</Link>
            <Link to="/signup" className="btn btn-primary btn-press" style={{ height:36 }}>Sign Up</Link>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop:64 }}>
        {/* Hero */}
        <section style={{ padding:'3rem 1.5rem 2rem', maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
            <div className="anim-fade-in-up" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', padding:'0.25rem 1rem', borderRadius:9999, background:'#fff', border:'1px solid #E5E7EB', marginBottom:'1.5rem', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#16A34A', animation:'beaconPulse 1.8s infinite ease-in-out' }} />
              <span style={{ fontSize:'0.75rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'#111827' }}>The Collegiate Digital Hub</span>
              <span style={{ color:'#9CA3AF' }}>•</span>
              <span style={{ fontSize:'0.75rem', fontWeight:600, background:'#FEF3C7', color:'#B45309', padding:'2px 8px', borderRadius:9999 }}>140+ Campuses Live</span>
            </div>
            <h1 className="anim-fade-in-up delay-1" style={{ fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:800, color:'#111827', letterSpacing:'-0.03em', lineHeight:1.15, maxWidth:900, marginBottom:'1.25rem' }}>
              Notes. Memes. Events.<br /><span>All in one UniVibe.</span>
            </h1>
            <p className="anim-fade-in-up delay-2" style={{ fontSize:'1.125rem', color:'#6B7280', maxWidth:680, lineHeight:1.7, marginBottom:'2rem' }}>
              The definitive campus companion connecting ambitious college students. Share peer-reviewed notes, RSVP for campus hackathons, blow off steam with memes, and test your code on CodeArena.
            </p>
            <div className="anim-fade-in-up delay-3" style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', justifyContent:'center', marginBottom:'3rem' }}>
              <Link to="/signup" className="btn btn-primary btn-press" style={{ padding:'0.75rem 1.75rem', fontSize:'0.9375rem', borderRadius:'0.75rem' }}>
                Get Started <span className="material-symbols-outlined" style={{ fontSize:'1.125rem' }}>arrow_forward</span>
              </Link>
              <Link to="/login" className="btn btn-secondary btn-press" style={{ padding:'0.75rem 1.75rem', fontSize:'0.9375rem', borderRadius:'0.75rem' }}>Login with .edu</Link>
            </div>

            {/* Hero cards */}
            <div className="anim-fade-in-up delay-4" style={{ width:'100%', maxWidth:960, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
              <div className="card hover-lift" style={{ padding:'1.5rem', textAlign:'left' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
                  <span style={{ fontSize:'0.75rem', fontWeight:700, color:'#111827' }}>Fall 2025 • CS 2810 Curricula</span>
                  <span className="badge badge-green"><span className="material-symbols-outlined" style={{ fontSize:'0.75rem' }}>verified</span> TA Approved</span>
                </div>
                <h3 style={{ fontWeight:700, fontSize:'1rem', marginBottom:'0.5rem' }}>Data Structures & Complexity Vault</h3>
                <p style={{ fontSize:'0.8125rem', color:'#6B7280', lineHeight:1.6, marginBottom:'1rem' }}>Complete annotated dynamic programming trees, BFS/DFS proofs, and Midterm review recaps.</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'0.75rem', borderTop:'1px solid #F3F4F6' }}>
                  <div style={{ display:'flex', gap:'0.75rem', color:'#6B7280', fontSize:'0.75rem' }}>
                    <span style={{ display:'flex', gap:3, alignItems:'center' }}><span className="material-symbols-outlined" style={{ fontSize:'0.875rem' }}>download</span> 4,210</span>
                    <span style={{ display:'flex', gap:3, alignItems:'center' }}><span className="material-symbols-outlined" style={{ fontSize:'0.875rem', color:'#F59E0B' }}>star</span><strong style={{ color:'#111827' }}>4.9</strong></span>
                  </div>
                  <span style={{ fontSize:'0.75rem', fontWeight:600, color:'#16A34A', display:'flex', gap:3, alignItems:'center' }}><span className="material-symbols-outlined" style={{ fontSize:'0.875rem' }}>check_circle</span> Verified</span>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                <div className="card hover-lift" style={{ padding:'1.25rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' }}>
                    <span style={{ fontSize:'0.6875rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'0.06em' }}>Live CodeArena</span>
                    <span className="badge badge-red" style={{ fontSize:'0.6875rem' }}>
                      <span style={{ width:6, height:6, borderRadius:'50%', background:'#EF4444', display:'inline-block', animation:'beaconPulse 1.8s infinite' }} /> LIVE
                    </span>
                  </div>
                  <div style={{ fontWeight:700, fontSize:'0.9375rem', marginBottom:3 }}>Sprint #84: Binary Inversion</div>
                  <div style={{ fontSize:'0.75rem', color:'#6B7280' }}>324 students competing right now</div>
                </div>
                <button className="card hover-lift btn-press" onClick={() => setRsvpd(r => !r)} style={{ padding:'1.25rem', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.75rem', cursor:'pointer', border:'1px solid #E5E7EB' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                    <div style={{ width:44, height:44, borderRadius:'0.75rem', background:'#FEF3C7', color:'#B45309', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span className="material-symbols-outlined">local_fire_department</span>
                    </div>
                    <div style={{ textAlign:'left' }}>
                      <div style={{ fontWeight:700, fontSize:'0.875rem' }}>HackMIT 2025 RSVP</div>
                      <div style={{ fontSize:'0.75rem', color:'#6B7280' }}>{rsvpd ? '88 peers attending (Including you! 🎉)' : '87 campus peers attending'}</div>
                    </div>
                  </div>
                  <span className={`badge ${rsvpd ? 'badge-green' : 'badge-gray'}`}>{rsvpd ? "RSVP'd ✓" : 'RSVP'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding:'2rem 1.5rem', maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <div style={{ fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#6B7280', marginBottom:'0.25rem' }}>Ecosystem Pillars</div>
              <h2 style={{ fontSize:'1.75rem', fontWeight:800, color:'#111827', letterSpacing:'-0.02em' }}>Everything Campus Life Needs</h2>
            </div>
            <p style={{ fontSize:'0.875rem', color:'#6B7280', maxWidth:400, lineHeight:1.6 }}>Engineered for academic success, social connection, and career development across modern university cohorts.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'1rem' }}>
            {features.map(f => (
              <div key={f.title} className="card hover-lift" style={{ padding:'1.5rem', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1.25rem', alignItems:'center' }}>
                    <div style={{ width:44, height:44, borderRadius:'0.75rem', background:f.tint, color:f.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span className="material-symbols-outlined">{f.icon}</span>
                    </div>
                    <span className="badge badge-gray">{f.label}</span>
                  </div>
                  <h3 style={{ fontWeight:700, fontSize:'1rem', marginBottom:'0.5rem' }}>{f.title}</h3>
                  <p style={{ fontSize:'0.8125rem', color:'#6B7280', lineHeight:1.6 }}>{f.desc}</p>
                </div>
                <div style={{ paddingTop:'1rem', marginTop:'1rem', borderTop:'1px solid #F3F4F6' }}>
                  <Link to={f.link} style={{ fontSize:'0.75rem', fontWeight:700, color:'#111827', display:'flex', alignItems:'center', gap:4 }}>
                    {f.cta} <span className="material-symbols-outlined" style={{ fontSize:'1rem' }}>arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding:'2rem 1.5rem', maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'1.5rem' }}>
            <div style={{ fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#6B7280', marginBottom:'0.25rem' }}>Frictionless Onboarding</div>
            <h2 style={{ fontSize:'1.75rem', fontWeight:800, color:'#111827', letterSpacing:'-0.02em' }}>Get Started in 3 Simple Steps</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1rem' }}>
            {steps.map(s => (
              <div key={s.n} className="card hover-lift" style={{ padding:'1.5rem', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                <div>
                  <div style={{ fontSize:'2rem', fontWeight:800, color:'#E5E7EB', marginBottom:'0.75rem', fontVariantNumeric:'tabular-nums' }}>{s.n}</div>
                  <h3 style={{ fontWeight:700, fontSize:'1rem', marginBottom:'0.5rem' }}>{s.title}</h3>
                  <p style={{ fontSize:'0.8125rem', color:'#6B7280', lineHeight:1.6 }}>{s.desc}</p>
                </div>
                <div style={{ paddingTop:'1rem', marginTop:'1rem', borderTop:'1px solid #F3F4F6', display:'flex', alignItems:'center', gap:'0.5rem', color:'#6B7280', fontSize:'0.75rem' }}>
                  <span className="material-symbols-outlined" style={{ color:'#16A34A', fontSize:'1.125rem' }}>{s.icon}</span>
                  {s.icon === 'domain_verification' ? 'Domain match verification' : s.icon === 'lock_open' ? 'Full vault & channel access' : 'Measurable semester boost'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:'2rem 1.5rem 4rem', maxWidth:1280, margin:'0 auto' }}>
          <div className="card" style={{ padding:'3rem', textAlign:'center' }}>
            <div style={{ maxWidth:600, margin:'0 auto' }}>
              <h2 style={{ fontSize:'1.75rem', fontWeight:800, color:'#111827', letterSpacing:'-0.02em', marginBottom:'0.75rem' }}>Ready to Upgrade Your Campus Experience?</h2>
              <p style={{ fontSize:'0.9375rem', color:'#6B7280', lineHeight:1.7, marginBottom:'1.5rem' }}>Join thousands of students across 140+ universities today. Access verified resources, discover your campus scene, and level up.</p>
              {submitted ? (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem', color:'#16A34A', fontWeight:600 }}>
                  <span className="material-symbols-outlined">check_circle</span> Verification link sent! Check your inbox.
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display:'flex', gap:'0.75rem', justifyContent:'center', flexWrap:'wrap' }}>
                  <input className="form-input" style={{ maxWidth:320 }} type="email" required placeholder="student@university.edu" value={email} onChange={e => setEmail(e.target.value)} />
                  <button type="submit" className="btn btn-primary btn-press">Join UniVibe Now</button>
                </form>
              )}
              <p style={{ fontSize:'0.75rem', color:'#6B7280', marginTop:'1rem', display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
                <span className="material-symbols-outlined" style={{ color:'#16A34A', fontSize:'1rem' }}>check</span>
                Free for all verified college students with an .edu address
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background:'#fff', borderTop:'1px solid #E5E7EB', padding:'2rem 1.5rem' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
            <div style={{ width:28, height:28, borderRadius:'0.5rem', background:'#EA580C', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>U</div>
            <span style={{ fontWeight:800, color:'#111827' }}>UniVibe</span>
          </div>
          <p style={{ fontSize:'0.75rem', color:'#6B7280' }}>© 2025 UniVibe Technologies Inc. Built for higher education excellence.</p>
        </div>
      </footer>
    </div>
  );
}
