import React from "react";
import ReactDOM from "react-dom/client";
import {
  AppWindow,
  BriefcaseBusiness,
  CalendarDays,
  Github,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { Section } from "./components/Section";
import {
  computed,
  contactLinks,
  education,
  experiences,
  profile,
  projects,
  skills,
  strengths,
} from "./data/resume";
import "./styles.css";

function iconFor(label: string) {
  if (label.includes("邮件")) return <Mail size={18} aria-hidden="true" />;
  if (label.includes("电话")) return <Phone size={18} aria-hidden="true" />;
  if (label.includes("GitHub")) return <Github size={18} aria-hidden="true" />;
  return <AppWindow size={18} aria-hidden="true" />;
}

async function copyWechatAndOpen() {
  try {
    await navigator.clipboard.writeText(profile.wechat);
  } catch {
    // 部分浏览器会限制剪切板权限，协议拉起仍可继续尝试。
  }

  window.location.href = "weixin://";
}

function App() {
  return (
    <main>
      <section className="hero">
        <nav aria-label="页面导航">
          <a href="#projects">项目</a>
          <a href="#experience">经历</a>
          <a href="#contact">联系</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Swift / 车联网 / BLE / WebRTC</p>
            <h1>{profile.name}</h1>
            <p className="hero-title">{profile.title}</p>
            <p className="hero-summary">
              {computed.totalExperience}移动端研发经验，{computed.currentCompanyYears}
              车联网 App 一线交付经验。长期负责复杂业务从技术方案到线上稳定性的完整链路，关注代码健壮性、工程可维护性与用户真实体验。
            </p>
            <div className="hero-actions">
              {contactLinks.map((link) =>
                link.href === "weixin://" ? (
                  <button
                    key={link.label}
                    className="button"
                    type="button"
                    onClick={copyWechatAndOpen}
                    title={`复制微信号：${profile.wechat}`}
                  >
                    {iconFor(link.label)}
                    {link.label}
                  </button>
                ) : (
                  <a key={link.label} className="button" href={link.href}>
                    {iconFor(link.label)}
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </div>

          <aside className="profile-panel" aria-label="简历摘要">
            <div>
              <span>当前城市</span>
              <strong>
                <MapPin size={18} aria-hidden="true" />
                {profile.location}
              </strong>
            </div>
            <div>
              <span>工作经验</span>
              <strong>
                <CalendarDays size={18} aria-hidden="true" />
                {computed.totalExperience}
              </strong>
            </div>
            <div>
              <span>核心方向</span>
              <strong>
                <TerminalSquare size={18} aria-hidden="true" />
                iOS 工程化
              </strong>
            </div>
          </aside>
        </div>
      </section>

      <Section eyebrow="Profile" title="个人优势">
        <div className="strength-grid">
          {strengths.map((item) => (
            <article key={item} className="strength-item">
              <Sparkles size={20} aria-hidden="true" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Stack" title="技术栈">
        <div className="tag-list">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </Section>

      <Section eyebrow="Projects" title="重点项目">
        <div id="projects" className="project-list">
          {projects.map((project) => (
            <article key={project.name} className="project-card">
              <div className="project-head">
                <div>
                  <span>{project.period}</span>
                  <h3>{project.name}</h3>
                  <p>{project.role}</p>
                </div>
                {project.appStore ? (
                  <a className="store-link" href={project.appStore} target="_blank" rel="noreferrer">
                    App Store
                  </a>
                ) : null}
              </div>
              <p className="project-summary">{project.summary}</p>
              <div className="tag-list compact">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <ul>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Experience" title="工作经历">
        <div id="experience" className="timeline">
          {experiences.map((item) => (
            <article key={item.company} className="timeline-item">
              <div className="timeline-dot" />
              <div>
                <span>{item.period}</span>
                <h3>
                  <BriefcaseBusiness size={19} aria-hidden="true" />
                  {item.company}
                </h3>
                <p>{item.role}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Education" title="教育经历">
        <article className="education-card">
          <div>
            <span>{education.period}</span>
            <h3>{education.school}</h3>
          </div>
          <p>{education.degree}</p>
        </article>
      </Section>

      <footer id="contact">
        <div>
          <strong>{profile.name}</strong>
          <p>期待参与更有长期价值的 iOS、车联网与移动端工程化工作。</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone}`}>{profile.phone}</a>
          <span>微信：{profile.wechat}</span>
        </div>
      </footer>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
