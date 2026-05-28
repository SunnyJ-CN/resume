import React from "react";
import ReactDOM from "react-dom/client";
import { Download, Github, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
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

const iconSize = 15;

type Html2PdfWorker = {
  set: (options: unknown) => Html2PdfWorker;
  from: (source: HTMLElement) => Html2PdfWorker;
  save: () => Promise<void>;
};

type Html2PdfFactory = () => Html2PdfWorker;

function formatPdfDate(date: Date) {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
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
  const [isDownloading, setIsDownloading] = React.useState(false);

  async function downloadPdf() {
    const resume = document.querySelector<HTMLElement>(".resume-sheet");

    if (!resume || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      const html2pdfModule = await import("html2pdf.js");
      const html2pdf = html2pdfModule.default as Html2PdfFactory;
      const fileName = `姬向阳-iOS开发工程师 ${formatPdfDate(new Date())}.pdf`;

      await html2pdf()
        .set({
          filename: fileName,
          margin: [8, 8, 8, 8],
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
          pagebreak: { mode: ["css", "legacy"] },
        })
        .from(resume)
        .save();
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <main className="resume-page">
      <div className="resume-toolbar" aria-label="简历操作">
        <button type="button" onClick={downloadPdf} disabled={isDownloading}>
          <Download size={15} aria-hidden="true" />
          {isDownloading ? "正在生成 PDF..." : "下载 PDF"}
        </button>
      </div>

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
            <a href={`mailto:${profile.email}`}>
              <Mail size={iconSize} aria-hidden="true" />
              {profile.email}
            </a>
            <a href={`tel:${profile.phone}`}>
              <Phone size={iconSize} aria-hidden="true" />
              {profile.phone}
            </a>
            <button type="button" onClick={copyWechatAndOpen}>
              <MessageCircle size={iconSize} aria-hidden="true" />
              微信：{profile.wechat}
            </button>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={iconSize} aria-hidden="true" />
              github.com/SunnyJ-CN
            </a>
            <span>
              <MapPin size={iconSize} aria-hidden="true" />
              {profile.location}
            </span>
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
          <p className="skills-line">{skills.join(" / ")}</p>
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
                    <h3>
                      {project.appStore ? (
                        <a href={project.appStore} target="_blank" rel="noreferrer">
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <p>{project.role}</p>
                  </div>
                  <div className="entry-meta">
                    <time>{project.period}</time>
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
