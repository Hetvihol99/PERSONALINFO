import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

export default function About() {
  const navigate = useNavigate();
  const text = "About Myself";

  const [displayedText, setDisplayedText] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [downloading, setDownloading] = useState(false);

  // TYPING EFFECT
  useEffect(() => {
    let index = 0;
    let interval;

    const startTyping = () => {
      setDisplayedText("");
      interval = setInterval(() => {
        index++;
        setDisplayedText(text.slice(0, index));

        if (index === text.length) {
          clearInterval(interval);
          setTimeout(() => {
            index = 0;
            startTyping();
          }, 5000);
        }
      }, 120);
    };

    startTyping();
    return () => clearInterval(interval);
  }, []);

  // DOWNLOAD FUNCTION - FIXED
  const handleDownload = () => {
    if (downloading) return;

    setDownloading(true);
    setCountdown(3);

    let time = 3;

    const timer = setInterval(() => {
      time--;
      setCountdown(time);

      if (time <= 0) {
        clearInterval(timer);

        // Create a complete HTML document for PDF
        const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Het Vihol Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        body {
            font-family: 'Segoe UI', 'Helvetica Neue', Tahoma, Geneva, Verdana, sans-serif;
            background: #000000;
            padding: 20px;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
        }

        .resume-wrapper {
            background: #0d0d0d;
            border: 1px solid #222222;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
        }

        .header {
            background: #000000;
            border-bottom: 2px solid #333333;
            padding: 45px 40px;
            display: flex;
            gap: 40px;
            align-items: flex-start;
        }

        .profile-photo {
            width: 150px;
            height: 150px;
            border-radius: 12px;
            border: 3px solid #444444;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
            flex-shrink: 0;
            object-fit: cover;
            transition: all 0.3s ease;
        }

        .profile-photo:hover {
            border-color: #666666;
            box-shadow: 0 12px 32px rgba(255, 255, 255, 0.1);
            transform: translateY(-3px);
        }

        .header-content {
            flex: 1;
        }

        .header-content h1 {
            font-size: 42px;
            margin-bottom: 8px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: #ffffff;
        }

        .header-content .title {
            font-size: 16px;
            color: #b0b0b0;
            margin-bottom: 18px;
            font-weight: 400;
            letter-spacing: 0.5px;
        }

        .contact-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            font-size: 13px;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px;
            background: #1a1a1a;
            border-radius: 6px;
            border: 1px solid #333333;
            transition: all 0.3s ease;
        }

        .contact-item:hover {
            background: #252525;
            border-color: #444444;
        }

        .contact-icon {
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #fffcfc;
        }

        .contact-item a {
            color: #ffffff;
            text-decoration: none;
            word-break: break-all;
            transition: color 0.3s ease;
        }

        .contact-item a:hover {
            color: #a1a1a1;
        }

        .content {
            padding: 40px;
            background: #0d0d0d;
        }

        .section {
            margin-bottom: 35px;
        }

        .section:last-child {
            margin-bottom: 0;
        }

        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid #333333;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .section-content {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .summary-text {
            color: #d0d0d0;
            line-height: 1.8;
            font-size: 14px;
            background: #1a1a1a;
            padding: 20px;
            border-left: 3px solid #444444;
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            border-left: 3px solid #555555;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
        }

        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .skill-category {
            background: #1a1a1a;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #2a2a2a;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
            transition: all 0.3s ease;
        }

        .skill-category:hover {
            background: #1f1f1f;
            border-color: #333333;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.04);
        }

        .skill-category h3 {
            color: #ffffff;
            font-size: 14px;
            margin-bottom: 15px;
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .skill-tag {
            background: #2a2a2a;
            color: #e0e0e0;
            padding: 8px 14px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            border: 1px solid #3a3a3a;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
            cursor: default;
        }

        .skill-tag:hover {
            background: #333333;
            border-color: #444444;
            color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
        }

        .project {
            background: #1a1a1a;
            padding: 18px;
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            border-left: 3px solid #444444;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
            transition: all 0.3s ease;
        }

        .project:hover {
            background: #1f1f1f;
            border-color: #333333;
            border-left-color: #555555;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.04);
        }

        .project h3 {
            color: #ffffff;
            font-size: 15px;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .project p {
            color: #b0b0b0;
            font-size: 13px;
            line-height: 1.6;
        }

        .project p + p {
            margin-top: 8px;
        }

        .education-item {
            background: #1a1a1a;
            padding: 18px;
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            border-left: 3px solid #444444;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
        }

        .education-item h3 {
            color: #ffffff;
            font-size: 15px;
            margin-bottom: 8px;
            font-weight: 600;
        }

        .education-item p {
            color: #b0b0b0;
            font-size: 13px;
            line-height: 1.6;
        }

        .strengths-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .strength-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 14px;
            background: #1a1a1a;
            border-radius: 6px;
            border: 1px solid #2a2a2a;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
            transition: all 0.3s ease;
        }

        .strength-item:hover {
            background: #1f1f1f;
            border-color: #333333;
        }

        .strength-icon {
            color: #808080;
            font-weight: bold;
            margin-top: 2px;
            font-size: 16px;
        }

        .strength-item p {
            color: #d0d0d0;
            font-size: 13px;
            font-weight: 500;
        }

        .objective-box {
            background: #1a1a1a;
            border: 1px solid #333333;
            color: #d0d0d0;
            padding: 24px;
            border-radius: 8px;
            font-size: 14px;
            line-height: 1.8;
            box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.02);
        }

        @media print {
            body {
                background: #000000;
                padding: 0;
            }
            .resume-wrapper {
                box-shadow: none;
            }
            .header {
                page-break-after: avoid;
            }
            .section {
                page-break-inside: avoid;
            }
        }

        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                align-items: center;
                text-align: center;
                padding: 30px 20px;
            }

            .header-content h1 {
                font-size: 32px;
            }

            .contact-info {
                grid-template-columns: 1fr;
            }

            .skills-grid {
                grid-template-columns: 1fr;
            }

            .strengths-list {
                grid-template-columns: 1fr;
            }

            .content {
                padding: 25px;
            }
        }

        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
            background: #333333;
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #444444;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="resume-wrapper">
            <!-- Header -->
            <div class="header">
                <img src="https://raw.githubusercontent.com/Hetvihol99/web-images-link/main/het-vihol.png" alt="Het Vihol" class="profile-photo">
                <div class="header-content">
                    <h1>Het Vihol</h1>
                    <p class="title">Frontend Developer | B.Tech CS Student</p>
                    <div class="contact-info">
                        <div class="contact-item">
                            <span class="contact-icon">🏠︎</span>
                            <span>Ahmedabad, Gujarat, India</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">✉︎</span>
                            <a href="mailto:hetvihol8576@gmail.com">hetvihol8576@gmail.com</a>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">🆆</span>
                            <a href="https://github.com/Hetvihol99" target="_blank">Portfolio Website</a>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">⛆</span>
                            <a href="https://github.com/Hetvihol99" target="_blank">Hetvihol99</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="content">
                <!-- Professional Summary -->
                <section class="section">
                    <h2 class="section-title">Professional Summary</h2>
                    <div class="summary-text">
                        Driven and detail-oriented B.Tech Computer Science student at Adani University, Ahmedabad, with a strong passion for frontend development and modern web technologies. Proficient in building responsive, interactive, and visually polished web applications using React, TypeScript, and Tailwind CSS. An adaptable learner who thrives on solving problems and continuously exploring new tools and frameworks.
                    </div>
                </section>

                <!-- Technical Skills -->
                <section class="section">
                    <h2 class="section-title">Technical Skills</h2>
                    <div class="skills-grid">
                        <div class="skill-category">
                            <h3>Frontend Development</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">HTML5</span>
                                <span class="skill-tag">CSS3</span>
                                <span class="skill-tag">JavaScript</span>
                                <span class="skill-tag">TypeScript</span>
                                <span class="skill-tag">React.js</span>
                                <span class="skill-tag">Next.js</span>
                                <span class="skill-tag">Tailwind CSS</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>Tools & Platforms</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Git & GitHub</span>
                                <span class="skill-tag">Firebase</span>
                                <span class="skill-tag">Vercel</span>
                                <span class="skill-tag">Netlify</span>
                                <span class="skill-tag">Windows Terminal</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Projects -->
                <section class="section">
                    <h2 class="section-title">Projects</h2>
                    <div class="section-content">
                        <div class="project">
                            <h3>Personal Portfolio Website</h3>
                            <p>• Developed a modern responsive portfolio website</p>
                            <p>• Created smooth animations and interactive UI components</p>
                            <p>• Optimized the website for performance and mobile responsiveness</p>
                        </div>
                        <div class="project">
                            <h3>Frontend Showcase Projects</h3>
                            <p>• Built multiple frontend UI projects using React and Tailwind CSS</p>
                            <p>• Developed responsive layouts and reusable components</p>
                            <p>• Focused on modern design, clean code structure, and user experience</p>
                        </div>
                    </div>
                </section>

                <!-- Education -->
                <section class="section">
                    <h2 class="section-title">Education</h2>
                    <div class="education-item">
                        <h3>B.Tech in Computer Science</h3>
                        <p>Currently pursuing B.Tech Computer Science degree from Adani University, Ahmedabad, Gujarat</p>
                    </div>
                </section>

                <!-- Strengths -->
                <section class="section">
                    <h2 class="section-title">Key Strengths</h2>
                    <div class="strengths-list">
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Fast Learner</p>
                        </div>
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Creative Problem Solving</p>
                        </div>
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Strong Interest in Technology</p>
                        </div>
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Consistent Self-Learning</p>
                        </div>
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Team Collaboration</p>
                        </div>
                        <div class="strength-item">
                            <span class="strength-icon">✔</span>
                            <p>Goal-Oriented Approach</p>
                        </div>
                    </div>
                </section>

                <!-- Career Objective -->
                <section class="section">
                    <h2 class="section-title">Career Objective</h2>
                    <div class="objective-box">
                        To leverage my skills in frontend development and computer science to build innovative, user-centric digital products. I aim to grow as a full-stack developer while contributing to projects that create real-world impact and push the boundaries of modern web technology.
                    </div>
                </section>

                <!-- Additional Interests -->
                <section class="section">
                    <h2 class="section-title">Additional Interests</h2>
                    <div class="skills-grid">
                        <div class="skill-category">
                            <h3>Technical Interests</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Web Development</span>
                                <span class="skill-tag">UI/UX Design</span>
                                <span class="skill-tag">Modern Web Technologies</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</body>
</html>
        `;

        const blob = new Blob([resumeHTML], {
          type: "text/html"
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "Het_Vihol_Resume.html";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 10000);

        setDownloading(false);
        setCountdown(null);
      }
    }, 1000);
  };


  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white px-4 sm:px-6 py-10">
      {/* ANIMATED BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />
      </div>

      {/* BACK BUTTON */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="
          fixed
          top-5
          left-5
          z-50
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-white/15
          bg-white/8
          backdrop-blur-xl
          hover:bg-white/15
          hover:border-white/30
          transition-all
          duration-300
          shadow-lg
        "
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen gap-8">

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center"
        >
          <img
            src="/assets/het.jpg"
            alt="Het Vihol"
            className="
              w-[200px]
              sm:w-[280px]
              md:w-[320px]
              rounded-2xl
              border
              border-white/15
              object-cover
              shadow-[0_20px_60px_rgba(0,0,0,0.6)]
              hover:border-white/25
              transition-all
              duration-300
            "
          />

          {/* DIVIDER LINE */}
          <div
            className="
              mt-6
              h-[1px]
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              w-[90vw]
              sm:w-[400px]
              md:w-[500px]
            "
          />
        </motion.div>

        {/* GLASS BOX CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            w-full
            max-w-4xl
            h-[500px]
            sm:h-[550px]
            md:h-[600px]
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-3xl
            overflow-hidden
            shadow-[0_20px_70px_rgba(0,0,0,0.5)]
            group
          "
        >
          {/* GLASS LIGHT EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* HEADER SECTION */}
          <div
            className="
              relative
              z-20
              flex
              items-center
              justify-center
              px-6
              py-6
              sm:py-8
              border-b
              border-white/10
              bg-black/30
              backdrop-blur-2xl
            "
          >
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                tracking-tight
              "
            >
              {displayedText}
              <span className="animate-pulse ml-2">|</span>
            </h1>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div
            className="
              relative
              z-10
              h-[calc(100%-80px)]
              overflow-y-auto
              px-6
              sm:px-10
              md:px-12
              py-8
              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-white/10
              hover:scrollbar-thumb-white/20
            "
          >
            <div
              className="
                text-white/70
                text-sm
                sm:text-base
                leading-8
                tracking-wide
                space-y-6
              "
            >
              <p>
                I'm Het Vihol — a B.Tech Computer Science student at Adani University,
                Ahmedabad, and a frontend developer who's deeply passionate about
                crafting digital experiences that look and feel premium.
              </p>

              <p>
                My journey into tech started with a simple curiosity — wondering
                how the websites and apps I used every day were actually built.
                That curiosity quickly snowballed into a genuine obsession with code.
              </p>

              <p>
                I spend most of my time working with React, TypeScript, Next.js,
                and Tailwind CSS — turning ideas and Figma designs into responsive,
                animated, pixel-perfect interfaces that users actually enjoy.
              </p>

              <p>
                What drives me is the intersection of design and engineering.
                I love when code produces something beautiful — a smooth animation,
                a perfectly responsive layout, or an interaction that just feels right.
              </p>

              <p>
                Alongside frontend development, I'm building a strong foundation
                in computer science through my B.Tech at Adani University —
                algorithms, data structures, and software engineering principles
                that make me a more well-rounded developer.
              </p>

              <p>
                I'm an adaptable learner — I pick up new technologies fast
                and enjoy the process of going from "I have no idea how this works"
                to "I just built something with it."
              </p>

              <p>
                My goal is to grow into a developer who can build full products
                end-to-end — from concept and design to deployment and scale.
              </p>

              <p>
                For me, coding isn't just coursework or a career path — it's
                a creative outlet, a problem-solving playground, and honestly,
                something I'd be doing even if nobody was watching.
              </p>
            </div>
          </div>
        </motion.div>

        {/* DOWNLOAD BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          onClick={handleDownload}
          disabled={downloading}
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            justify-center
            gap-3
            px-8
            sm:px-10
            py-3
            sm:py-4
            rounded-2xl
            border
            border-white/15
            bg-white/8
            backdrop-blur-xl
            hover:bg-white/15
            hover:border-white/30
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-all
            duration-300
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            hover:shadow-[0_15px_50px_rgba(255,255,255,0.08)]
          "
        >
          {/* BUTTON GLOW EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* BUTTON CONTENT */}
          <div className="relative z-10 flex items-center gap-3">
            <Download
              size={20}
              className="
                group-hover:scale-110
                group-hover:-translate-y-1
                transition-all
                duration-300
              "
            />
            <span className="font-semibold tracking-wide">
              {downloading ? `Downloading in ${countdown}s` : "Download Resume"}
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}