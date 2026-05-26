import React from "react";
import ReactDOM from "react-dom/client";
import {
  computed,
  education,
  experiences,
  profile,
  projects,
  skills,
  strengths,
} from "./data/resume";
import "./styles.css";

async function copyWechatAndOpen() {
  try {
    await navigator.clipboard.writeText(profile.wechat);
  } catch {
    // 浏览器可能限制剪切板权限，仍继续尝试拉起微信。
  }

  window.location.href = "weixin://";
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function App() {
  return (
    <main className="resume-page">
      <article className="resume-sheet">
        <header className="resume-header">
          <div>
            <h1>{profile.name}</h1>
            <p className="headline">{profile.title}</p>
            <p className="summary">
              {computed.totalExperience}移动端研发经验，{computed.currentCompanyYears}
              车联网 App 研发与交付经验。关注 Swift 代码质量、复杂业务拆解、软硬件互联链路稳定性与移动端工程效率。
            </p>
          </div>
          <address className="contact" id="contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone}`}>{profile.phone}</a>
            <button type="button" onClick={copyWechatAndOpen}>
              微信：{profile.wechat}
            </button>
            <a href={profile.github} target="_blank" rel="noreferrer">
              github.com/SunnyJ-CN
            </a>
            <span>{profile.location}</span>
          </address>
        </header>

        <Section title="个人优势">
          <ul className="plain-list">
            {strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="专业技能">
          <div className="skills-list">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </Section>

        <Section title="工作经历">
          <div className="entry-list">
            {experiences.map((item) => (
              <section className="entry" key={item.company}>
                <div className="entry-title">
                  <div>
                    <h3>{item.company}</h3>
                    <p>{item.role}</p>
                  </div>
                  <time>{item.period}</time>
                </div>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Section>

        <Section title="项目经历">
          <div className="entry-list" id="projects">
            {projects.map((project) => (
              <section className="entry project" key={project.name}>
                <div className="entry-title">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.role}</p>
                  </div>
                  <div className="entry-meta">
                    <time>{project.period}</time>
                    {project.appStore ? (
                      <a href={project.appStore} target="_blank" rel="noreferrer">
                        App Store
                      </a>
                    ) : null}
                  </div>
                </div>
                <p className="project-summary">{project.summary}</p>
                <p className="project-stack">{project.stack.join(" / ")}</p>
                <ul>
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Section>

        <Section title="教育经历">
          <section className="entry compact-entry">
            <div className="entry-title">
              <div>
                <h3>{education.school}</h3>
                <p>{education.degree}</p>
              </div>
              <time>{education.period}</time>
            </div>
          </section>
        </Section>
      </article>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
