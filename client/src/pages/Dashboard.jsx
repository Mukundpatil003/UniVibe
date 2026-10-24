import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [events, setEvents] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/notes?limit=4`),
      axios.get(`${API}/events`),
      axios.get(`${API}/discussions`),
    ]).then(([n, e, d]) => {
      setNotes(n.data.notes || []);
      setEvents(e.data.slice(0, 3));
      setDiscussions(d.data.slice(0, 3));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const days = ['M','T','W','T','F','S','S'];
  const streak = user?.streak || 14;

  return (
    <div className="sidebar-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main style={{ paddingTop:'4.5rem', padding:'5rem 2rem 2rem', minHeight:'100vh', background:'#F3F4F6' }}>
          {loading ? (
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:300 }}>
              <div className="spinner" style={{ width:36, height:36, borderWidth:4 }} />
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              {/* Hero section */}
              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'1.25rem' }}>
                {/* Left: Greeting + Progress */}
                <div className="card hover-lift anim-fade-in-up" style={{ padding:'1.75rem' }}>
                  <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', background:'#F3F4F6', padding:'0.375rem 0.875rem', borderRadius:9999, fontSize:'0.75rem', color:'#6B7280' }}>
                      <span style={{ width:7, height:7, borderRadius:'50%', background:'#16A34A', animation:'beaconPulse 2s infinite' }} />
                      Semester 5 • {user?.department || 'Computer Science'} • {user?.university || 'Campus'} Vault Connected
                    </div>
                    <span className="badge badge-amber">
                      <span className="material-symbols-outlined" style={{ fontSize:'0.8125rem' }}>alarm</span>
                      Midterms in 12 Days
                    </span>
                  </div>
                  <h1 style={{ fontSize:'1.75rem', fontWeight:800, color:'#111827', letterSpacing:'-0.02em', marginBottom:'0.5rem' }}>
                    Hey {user?.name?.split(' ')[0] || 'there'}, ready to ace this semester? 👋
                  </h1>
                  <p style={{ fontSize:'0.875rem', color:'#6B7280', marginBottom:'1.25rem' }}>Keeping pace with CS2810 & Database Systems. 4 assignments completed ahead of schedule this week.</p>
                  {/* Progress bar */}
                  <div style={{ background:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:'0.75rem', padding:'1rem', marginBottom:'1.25rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.625rem' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                        <span className="material-symbols-outlined" style={{ color:'#16A34A', fontSize:'1.125rem' }}>calendar_view_week</span>
                        <span style={{ fontSize:'0.8125rem', fontWeight:600, color:'#111827' }}>Week 8 of 16</span>
                        <span style={{ color:'#6B7280', fontSize:'0.8125rem' }}>(50% Completed)</span>
                      </div>
                      <button style={{ fontSize:'0.75rem', fontWeight:600, color:'#111827', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:3 }}>
                        View Syllabus <span className="material-symbols-outlined" style={{ fontSize:'0.875rem' }}>arrow_forward</span>
                      </button>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill bar-shimmer" style={{ width:'50%' }} />
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:'0.5rem', fontSize:'0.6875rem', color:'#6B7280' }}>
                      <span>Aug 28 • Fall Kickoff</span>
                      <span style={{ fontWeight:600, color:'#16A34A' }}>● Midterm Checkpoint</span>
                      <span>Dec 18 • Finals Week</span>
                    </div>
                  </div>
                  {/* Stats */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.75rem' }}>
                    {[
                      { icon:'grade', tint:'#FEF3C7', color:'#B45309', val:user?.gpa || '3.88', lbl:'Cumulative GPA' },
                      { icon:'verified', tint:'#DCFCE7', color:'#15803D', val: user?.notesUploaded || '14', lbl:'Notes Verified' },
                      { icon:'event_available', tint:'#EDE9FE', color:'#8B5CF6', val: user?.eventsRsvp?.length || '3', lbl:'Hackathon RSVPs' },
                    ].map(s => (
                      <div key={s.lbl} style={{ background:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:'0.75rem', padding:'0.875rem', display:'flex', alignItems:'center', gap:'0.625rem', transition:'all 0.2s', cursor:'pointer' }}>
                        <div style={{ width:40, height:40, borderRadius:'0.625rem', background:s.tint, color:s.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <span className="material-symbols-outlined">{s.icon}</span>
                        </div>
                        <div>
                          <div style={{ fontSize:'1.25rem', fontWeight:800, color:'#111827', lineHeight:1.2 }}>{s.val}</div>
                          <div style={{ fontSize:'0.6875rem', color:'#6B7280' }}>{s.lbl}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: CodeArena XP */}
                <div className="card hover-lift anim-fade-in-up delay-1" style={{ padding:'1.75rem', display:'flex', flexDirection:'column' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize:'1.125rem' }}>terminal</span>
                      <span style={{ fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#6B7280' }}>CodeArena XP</span>
                    </div>
                    <span className="badge badge-green">
                      <span style={{ width:5, height:5, borderRadius:'50%', background:'#15803D', animation:'beaconPulse 2s infinite', display:'inline-block' }} /> Live
                    </span>
                  </div>
                  {/* Streak */}
                  <div style={{ background:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:'0.75rem', padding:'0.875rem', marginBottom:'1rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.75rem' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.375rem', fontWeight:700, color:'#111827' }}>
                        <span style={{ fontSize:'1.125rem' }}>🔥</span> {streak}-Day Streak
                      </div>
                      <span className="badge badge-amber streak-halo">+50 XP Today</span>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'4px', textAlign:'center' }}>
                      {days.map((d, i) => {
                        const done = i < 6;
                        return (
                          <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                            <span style={{ fontSize:'0.625rem', color:'#6B7280', fontWeight:500 }}>{d}</span>
                            <div style={{ width:28, height:28, borderRadius:'0.375rem', background: done ? '#EA580C' : '#FEF3C7', color: done ? '#fff' : '#B45309', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.625rem', border: done ? 'none' : '1px solid #F59E0B' }}>
                              <span className="material-symbols-outlined" style={{ fontSize:'0.875rem' }}>{done ? 'check' : 'bolt'}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* XP bar */}
                  <div style={{ marginBottom:'1rem' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'0.375rem' }}>
                      <div style={{ display:'flex', alignItems:'baseline', gap:'0.25rem' }}>
                        <span style={{ fontSize:'1.5rem', fontWeight:800, color:'#111827' }}>{user?.xp?.toLocaleString() || '2,840'}</span>
                        <span style={{ fontSize:'0.75rem', color:'#6B7280', fontWeight:600 }}>XP</span>
                      </div>
                      <span style={{ fontSize:'0.75rem', fontWeight:600, color:'#111827' }}>Rank #12</span>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill bar-shimmer" style={{ width:'78%', background:'#16A34A' }} />
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.6875rem', color:'#6B7280', marginTop:'0.25rem' }}>
                      <span>Platinum Tier</span>
                      <span style={{ fontWeight:500, color:'#111827' }}>160 XP to Diamond</span>
                    </div>
                  </div>
                  <Link to="/codearena" className="btn btn-primary btn-press" style={{ width:'100%', padding:'0.625rem', borderRadius:'0.75rem', marginTop:'auto' }}>
                    <span className="material-symbols-outlined" style={{ fontSize:'1rem' }}>swords</span>
                    Enter Daily Duel (24m left)
                  </Link>
                </div>
              </div>

              {/* 2-col grid */}
              <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'1.25rem' }}>
                {/* Discussions */}
                <div className="anim-fade-in-up delay-2">
                  <div className="section-header" style={{ marginBottom:'0.875rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.625rem' }}>
                      <div style={{ width:32, height:32, borderRadius:'0.5rem', background:'#F3F4F6', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span className="material-symbols-outlined" style={{ fontSize:'1.125rem' }}>forum</span>
                      </div>
                      <span className="section-title">Trending Discussions</span>
                    </div>
                    <Link to="/discussions" style={{ fontSize:'0.75rem', fontWeight:700, color:'#111827', display:'flex', alignItems:'center', gap:2 }}>Explore All <span className="material-symbols-outlined" style={{ fontSize:'0.875rem' }}>chevron_right</span></Link>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
                    {discussions.map(d => (
                      <div key={d._id} className="card card-sm hover-lift" style={{ padding:'1rem' }}>
                        <div style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem' }}>
                          <div style={{ width:38, height:38, borderRadius:'50%', background:'#F3F4F6', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.75rem', flexShrink:0, color:'#111827', border:'1px solid #E5E7EB' }}>
                            {d.author?.name?.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:'flex', gap:'0.375rem', marginBottom:'0.25rem', flexWrap:'wrap' }}>
                              {d.course && <span className="badge badge-gray" style={{ textTransform:'uppercase', letterSpacing:'0.06em' }}>{d.course}</span>}
                              <span style={{ fontSize:'0.6875rem', color:'#6B7280' }}>{d.author?.name} • {new Date(d.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p style={{ fontSize:'0.875rem', fontWeight:600, color:'#111827', marginBottom:'0.125rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.title}</p>
                            <p style={{ fontSize:'0.75rem', color:'#6B7280', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.body}</p>
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:'0.375rem', fontSize:'0.75rem', color:'#6B7280', flexShrink:0 }}>
                            <span className="material-symbols-outlined" style={{ fontSize:'1rem' }}>keyboard_arrow_up</span>
                            <span style={{ fontWeight:600, color:'#111827' }}>{d.upvotes?.length || 0}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming events */}
                <div className="anim-fade-in-up delay-3">
                  <div className="section-header" style={{ marginBottom:'0.875rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.625rem' }}>
                      <div style={{ width:32, height:32, borderRadius:'0.5rem', background:'#FEF3C7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <span className="material-symbols-outlined" style={{ fontSize:'1.125rem', color:'#B45309' }}>calendar_month</span>
                      </div>
                      <span className="section-title">Upcoming Events</span>
                    </div>
                    <Link to="/events" style={{ fontSize:'0.75rem', fontWeight:700, color:'#111827' }}>View All</Link>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
                    {events.map(ev => (
                      <div key={ev._id} className="card card-sm hover-lift" style={{ padding:'0.875rem', display:'flex', alignItems:'center', gap:'0.875rem' }}>
                        <div style={{ width:44, height:44, borderRadius:'0.75rem', background:'#FEF3C7', color:'#B45309', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <span className="material-symbols-outlined">event</span>
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <p style={{ fontWeight:700, fontSize:'0.8125rem', color:'#111827', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{ev.title}</p>
                          <p style={{ fontSize:'0.6875rem', color:'#6B7280' }}>{new Date(ev.date).toLocaleDateString()} • {ev.rsvps?.length || 0} RSVPs</p>
                        </div>
                        <span className={`badge ${ev.category === 'hackathon' ? 'badge-orange' : ev.category === 'workshop' ? 'badge-blue' : 'badge-gray'}`} style={{ textTransform:'capitalize', flexShrink:0 }}>{ev.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes grid */}
              <div className="anim-fade-in-up delay-4">
                <div className="section-header" style={{ marginBottom:'0.875rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.625rem' }}>
                    <div style={{ width:32, height:32, borderRadius:'0.5rem', background:'#DCFCE7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize:'1.125rem', color:'#15803D' }}>menu_book</span>
                    </div>
                    <div>
                      <div className="section-title">Recent Verified Notes</div>
                      <div style={{ fontSize:'0.6875rem', color:'#6B7280' }}>Reviewed by Department TAs & Faculty</div>
                    </div>
                  </div>
                  <Link to="/notes" style={{ fontSize:'0.75rem', fontWeight:700, color:'#111827' }}>Browse All</Link>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'0.875rem' }}>
                  {notes.map(note => (
                    <div key={note._id} className="card card-sm hover-lift" style={{ padding:'1rem', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                      <div>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem' }}>
                          <span className="badge badge-gray" style={{ textTransform:'uppercase', letterSpacing:'0.06em', fontSize:'0.625rem' }}>{note.course}</span>
                          {note.verified && <span className="badge badge-green" style={{ fontSize:'0.625rem' }}><span className="material-symbols-outlined" style={{ fontSize:'0.75rem' }}>verified</span> Verified</span>}
                        </div>
                        <h3 style={{ fontWeight:700, fontSize:'0.875rem', color:'#111827', marginBottom:'0.25rem', lineHeight:1.4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{note.title}</h3>
                        <p style={{ fontSize:'0.75rem', color:'#6B7280', marginBottom:'0.875rem' }}>{note.university} • {note.professor}</p>
                      </div>
                      <div style={{ borderTop:'1px solid #F3F4F6', paddingTop:'0.75rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div style={{ display:'flex', gap:'0.625rem', color:'#6B7280', fontSize:'0.6875rem' }}>
                          <span style={{ display:'flex', gap:2, alignItems:'center' }}><span className="material-symbols-outlined" style={{ fontSize:'0.875rem' }}>download</span> {note.downloads?.toLocaleString()}</span>
                          <span style={{ display:'flex', gap:2, alignItems:'center', color:'#F59E0B', fontWeight:600 }}><span className="material-symbols-outlined" style={{ fontSize:'0.875rem' }}>star</span> {note.rating}</span>
                        </div>
                        <button className="btn btn-primary btn-press" style={{ height:30, fontSize:'0.75rem', padding:'0 0.75rem', borderRadius:'0.5rem' }}>
                          <span className="material-symbols-outlined" style={{ fontSize:'0.875rem' }}>download</span> Get PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
