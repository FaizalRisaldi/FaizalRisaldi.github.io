import { ArrowUpRight, Activity, MessageCircle, ScanSearch } from "lucide-react";
import type { Project } from "../data/projects";

function QueueVisual() {
  return (
    <div className="visual-window queue-window">
      <div className="window-topbar">
        <div className="window-dots"><i /><i /><i /></div>
        <span>bps / operator dashboard</span>
        <span className="window-status"><b /> Live</span>
      </div>
      <div className="queue-layout">
        <aside className="queue-sidebar">
          <div className="queue-mark">BPS<span>.</span></div>
          <div className="sidebar-active">Overview</div>
          <div>Queue</div>
          <div>Reservations</div>
          <div>Counter</div>
        </aside>
        <div className="queue-content">
          <div className="queue-heading">
            <div><small>MONDAY, 09 NOVEMBER</small><h3>Good morning, Operator.</h3></div>
            <span className="operator-avatar">OP</span>
          </div>
          <div className="queue-metrics">
            <div><small>Queues today</small><strong>128</strong><span>↑ Service overview</span></div>
            <div><small>Completed</small><strong>96</strong><span>Queue progress</span></div>
          </div>
          <div className="queue-chart">
            <div className="chart-head"><b>Queue activity</b><small>Today</small></div>
            <div className="chart-bars">
              {[28, 44, 36, 62, 50, 78, 56, 88, 68, 46, 73, 59].map((height, index) => (
                <i key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenfessVisual() {
  return (
    <div className="visual-window menfess-window">
      <div className="menfess-header"><span className="menfess-symbol"><MessageCircle size={18} /></span><div><b>menfess / moderation</b><small>Submission review</small></div><span className="review-pill">IN REVIEW</span></div>
      <div className="submission-card">
        <div className="submission-meta"><span>ANONYMOUS SUBMISSION</span><span>#MF-024</span></div>
        <p>“Ada rekomendasi tempat ngopi yang nyaman buat nugas di Pamekasan?”</p>
        <div className="submission-tags"><span>Community</span><span>Text post</span></div>
      </div>
      <div className="moderation-actions"><span>Awaiting admin decision</span><div><button>Reject</button><button className="approve">Approve & publish ↗</button></div></div>
    </div>
  );
}

function RiceVisual() {
  return (
    <div className="visual-window rice-window">
      <div className="rice-top"><div><span className="rice-kicker">VISION LAB / 03</span><h3>Grain analysis</h3></div><ScanSearch size={21} /></div>
      <div className="grain-stage">
        <div className="grain-grid">
          {Array.from({ length: 24 }, (_, i) => (
            <i key={i} className={`grain grain-${i % 5}`} />
          ))}
        </div>
        <div className="scan-overlay"><span>CLASSIFICATION AREA</span><b /></div>
      </div>
      <div className="rice-results"><div><small>Detected samples</small><b>24 grains</b></div><div><small>Model status</small><b><Activity size={13} /> Analysis ready</b></div></div>
    </div>
  );
}

export default function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual project-visual-${project.theme}`}>
      {project.theme === "queue" && <QueueVisual />}
      {project.theme === "menfess" && <MenfessVisual />}
      {project.theme === "rice" && <RiceVisual />}
      <div className="visual-corner"><ArrowUpRight size={18} /></div>
    </div>
  );
}
