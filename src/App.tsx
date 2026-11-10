import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Sparkles,
  Server,
  Network,
  Palette,
  Brain,
  Monitor,
} from "lucide-react";

import { Icon as IconifyIcon } from "@iconify/react";

import { useEffect, useState, useRef, type CSSProperties } from "react";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./data/projects"; 
import { ChevronLeft, ChevronRight } from "lucide-react"

import profileImage1 from "./images/profile-1.jpg";
import profileImage2 from "./images/profile-2.jpg";
import profileImage3 from "./images/profile-3.jpg";
import profileImage4 from "./images/profile-4.jpg";

import dbKlikImage from "./images/activities/db-klik.jpg";
import itcImage from "./images/activities/itc.jpg";
import litbangImage from "./images/activities/litbang.jpg";
import diesNatalisImage from "./images/activities/dies-natalis.jpg";
import futsalImage from "./images/activities/futsal.jpg";
import gemastikImage from "./images/activities/gemastik.jpg";
import gtsImage from "./images/activities/gts.jpg";
import makrabImage from "./images/activities/makrab.jpg";
import bemFtImage from "./images/activities/bem-ft.jpg";
import wisudaImage from "./images/activities/wisuda.jpg";
import researchImage from "./images/activities/research.jpg";

import dataScienceCertificate from "./images/certificates/data-science.pdf";
import pythonCertificate from "./images/certificates/python.pdf";
import webinarCertificate from "./images/certificates/webinar.pdf";
import internshipCertificate from "./images/certificates/magang.pdf";
import dpwCertificate from "./images/certificates/dpw.pdf";
import jsCertificate from "./images/certificates/js.pdf";
import rCertificate from "./images/certificates/r.pdf";
import financialCertificate from "./images/certificates/financial.pdf";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("portfolio-theme");

  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/* -------------------------------------------------------------------------
   Responsive helpers
   Media query tidak bisa ditulis di inline style, jadi breakpoint dibaca
   lewat matchMedia dan hasilnya dipakai untuk memilih nilai style.
------------------------------------------------------------------------- */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange();
    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

type Breakpoints = {
  max1200: boolean;
  max1024: boolean;
  max900: boolean;
  max768: boolean;
  max640: boolean;
  max480: boolean;
  max420: boolean;
};

function useBreakpoints(): Breakpoints {
  return {
    max1200: useMediaQuery("(max-width: 1200px)"),
    max1024: useMediaQuery("(max-width: 1024px)"),
    max900: useMediaQuery("(max-width: 900px)"),
    max768: useMediaQuery("(max-width: 768px)"),
    max640: useMediaQuery("(max-width: 640px)"),
    max480: useMediaQuery("(max-width: 480px)"),
    max420: useMediaQuery("(max-width: 420px)"),
  };
}

/* -------------------------------------------------------------------------
   Inline styles
------------------------------------------------------------------------- */

const ACCENT = "#b64a35";
const ACCENT_SOFT = "#e58b73";
const MUTED_ON_DARK = "#a1a2a4";
const LINE_ON_DARK = "#34363a";
const HAIRLINE = "1px solid var(--line)";

const defineStyles = <T extends Record<string, CSSProperties>>(styles: T): T =>
  styles;

const iconBox = (size: number): CSSProperties => ({
  display: "grid",
  placeItems: "center",
  width: size,
  height: size,
  border: HAIRLINE,
  borderRadius: 5,
  color: ACCENT,
});

const chip = (
  padding: string,
  fontSize: string,
  letterSpacing?: string
): CSSProperties => ({
  padding,
  border: HAIRLINE,
  borderRadius: 3,
  fontSize,
  letterSpacing,
});

const cardShell: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  border: HAIRLINE,
  borderRadius: 6,
  transition: "transform 0.3s ease, border-color 0.3s ease",
};

function createStyles(bp: Breakpoints) {
  const { max1200, max1024, max900, max768, max640, max480, max420 } = bp;

  const columns = (desktop: number) =>
    max640
      ? "1fr"
      : max1200
        ? "repeat(2, minmax(0, 1fr))"
        : `repeat(${desktop}, minmax(0, 1fr))`;

  const shell: CSSProperties = {
    position: "relative",
    padding: max640 ? "65px 0" : max900 ? "80px 0" : "110px 0",
  };

  const tinted: CSSProperties = { ...shell, background: "var(--tint)" };

  const banded: CSSProperties = {
    ...tinted,
    borderTop: HAIRLINE,
    borderBottom: HAIRLINE,
  };

  const eyebrow: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "1.35px",
    color: "var(--muted)",
  };

  const dot: CSSProperties = {
    display: "inline-block",
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#6c9b73",
  };

  const sectionHeading: CSSProperties = {
    display: "flex",
    flexDirection: max900 ? "column" : "row",
    alignItems: max900 ? "flex-start" : "flex-end",
    justifyContent: "space-between",
    gap: max900 ? 20 : 40,
    marginBottom: 52,
  };

  const sectionH2: CSSProperties = {
    maxWidth: 780,
    margin: "18px 0 0",
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
    fontWeight: 600,
    lineHeight: 1.05,
    letterSpacing: "-0.065em",
  };

  const sectionP: CSSProperties = {
    maxWidth: max900 ? 520 : 340,
    margin: "0 0 4px",
    color: "var(--muted)",
    fontSize: "0.95rem",
    lineHeight: 1.8,
  };

  const cardLabel: CSSProperties = {
    color: "var(--muted)",
    fontSize: "0.68rem",
    letterSpacing: "0.12em",
  };

  const button: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: max480 ? "12px 11px" : "13px 17px",
    borderRadius: 4,
    fontSize: max480 ? 11 : 12,
    fontWeight: 600,
    flex: max480 ? 1 : undefined,
    transition:
      "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease",
  };

  const statisticCard = (index: number): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: max420 ? 20 : max640 ? 25 : 35,
    borderRight:
      index === 3 || (max640 && index === 1) ? undefined : HAIRLINE,
    borderBottom: max640 && index < 2 ? HAIRLINE : undefined,
  });

  return {
    statisticCard,
    ...defineStyles({
      cursorGlow: {
        position: "fixed",
        top: 0,
        left: 0,
        width: 280,
        height: 280,
        borderRadius: "20%",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transform: "translate3d(-500px, -500px, 0)",
        transition: "opacity 0.5s ease",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 40%, transparent 70%)",
        filter: "blur(35px)",
        marginLeft: -140,
        marginTop: -140,
      },
      /* ---------------------------- Hero ---------------------------- */
      hero: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: max480 ? 560 : max768 ? 570 : max1024 ? 600 : 660,
        paddingTop: max640 ? 30 : 10,
        paddingBottom: 35,
      },
      heroTopline: {
        display: "flex",
        flexDirection: max480 ? "column" : "row",
        alignItems: max768 ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: max480 ? 12 : 16,
      },
      eyebrow,
      eyebrowDot: dot,
      eyebrowDivider: { color: "var(--accent)" },
      availability: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        color: "var(--muted)",
        fontSize: max768 ? 8 : 10,
        letterSpacing: "1px",
        textAlign: max480 ? "left" : max768 ? "right" : undefined,
      },
      availabilityIcon: { color: "var(--accent)" },
      heroLayout: {
        display: "grid",
        gridTemplateColumns: max900
          ? "1fr"
          : "minmax(0, 1.15fr) minmax(320px, 0.85fr)",
        alignItems: "center",
        gap: max640 ? 40 : max1200 ? 50 : "clamp(50px, 8vw, 120px)",
        padding: max640 ? "10px 0" : max900 ? "25px 0 30px" : "25px 0 70px",
        paddingLeft: max640 ? 20 : max900 ? 30 : 60,
        paddingRight: max640 ? 20 : max900 ? 30 : 60,
      },
      heroContent: {
        maxWidth: 700,
        // paddingTop: max480 ? 45 : max768 ? 62 : max1024 ? 65 : 76,
      },
      sectionEyebrow: {
        ...eyebrow,
        color: "var(--accent)",
        fontSize: "0.7rem",
        letterSpacing: "0.12em",
      },
      heroH1: {
        maxWidth: 1040,
        margin: "24px 0",
        fontSize: max640
          ? "clamp(2.8rem, 12vw, 4.5rem)"
          : max900
            ? "clamp(3.5rem, 10vw, 6rem)"
            : "clamp(3.5rem, 7.3vw, 7.2rem)",
        fontWeight: 600,
        lineHeight: 0.98,
        letterSpacing: "-0.075em",
      },
      accent: { color: ACCENT },
      heroDescription: {
        maxWidth: 490,
        color: "var(--muted)",
        fontSize: max640 ? "0.92rem" : "1.05rem",
        lineHeight: 1.85,
      },
      heroActions: {
        display: "flex",
        flexDirection: max420 ? "column" : "row",
        alignItems: max420 ? "stretch" : undefined,
        flexWrap: "wrap",
        gap: 12,
        marginTop: 32,
        width: max480 ? "100%" : undefined,
      },
      buttonPrimary: {
        ...button,
        background: "var(--accent)",
        color: "#fff",
      },
      buttonSecondary: {
        ...button,
        border: HAIRLINE,
        color: "var(--ink)",
      },
      heroSocials: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 30,
      },
      heroSocialLink: {
        display: "grid",
        placeItems: "center",
        width: 38,
        height: 38,
        border: HAIRLINE,
        borderRadius: "50%",
        color: "inherit",
        transition: "all 0.25s ease",
      },
      heroProfile: {
        width: "100%",
        maxWidth: max900 ? 560 : 470,
        justifySelf: max900 ? "start" : "end",
        padding: 18,
        border: HAIRLINE,
        borderRadius: 8,
        background: "var(--glass-strong)",
      },
      heroProfileHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        paddingBottom: 16,
        fontSize: "0.65rem",
        letterSpacing: "0.1em",
        color: "var(--muted)",
      },
      profileStatus: {
        display: "flex",
        alignItems: "center",
        gap: 7,
      },
      profileStatusDot: dot,
      heroProfileVisual: {
        position: "relative",
        width: "100%",
        maxWidth: 450,
        margin: "0 auto",
        display: "grid",
        placeItems: "center",
        minHeight: max640 ? 280 : 370,
        overflow: "hidden",
        background: "var(--visual-bg)",
        borderRadius: 5,
      },
      profileSlider: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 5,
      },

      profileSlide: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        transition: "transform 0.5s ease-in-out",
      },

      profileImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      },

      profileSliderControls: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pointerEvents: "none",
        zIndex: 5,
      },

      profileSliderButton: {
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.45)",
        background: "rgba(0,0,0,0.25)",
        color: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)",
        transition: "all 0.25s ease",
        pointerEvents: "auto",
        margin: "0 14px",
      },

      profileSliderDots: {
        position: "absolute",
        bottom: 18,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 10px",
        borderRadius: 20,
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(5px)",
        pointerEvents: "auto",
      },

      profileSliderDot: {
        height: 5,
        borderRadius: 10,
        border: "none",
        background: "#fff",
        cursor: "pointer",
        padding: 0,
        transition: "all 0.3s ease",
      },
      profilePlaceholder: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        color: "var(--ink)",
      },
      profilePlaceholderIcon: {
        display: "grid",
        placeItems: "center",
        width: 110,
        height: 110,
        marginBottom: 8,
        border: "1px solid rgba(182, 74, 53, 0.35)",
        borderRadius: "50%",
        color: ACCENT,
      },
      profilePlaceholderName: {
        fontSize: "2rem",
        fontWeight: 600,
        letterSpacing: "0.15em",
      },
      profilePlaceholderRole: {
        fontSize: "0.65rem",
        letterSpacing: "0.15em",
        color: "#6f706f",
      },
      heroProfileInfo: {
        display: "grid",
        gridTemplateColumns: max640 ? "1fr 1fr" : "1fr 1fr auto",
        alignItems: "center",
        gap: 20,
        paddingTop: 22,
      },
      profileLabel: {
        display: "block",
        marginBottom: 8,
        color: "var(--muted)",
        fontSize: "0.62rem",
        letterSpacing: "0.1em",
      },
      profileInfoTitle: {
        fontSize: max420 ? "0.75rem" : "0.83rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      profileInfoArrow: {
        color: ACCENT,
        display: max640 ? "none" : undefined,
      },
      heroFoot: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: max420 ? 12 : 16,
        marginTop: "auto",
        paddingTop: 22,
        paddingBottom: 22,
        borderTop: HAIRLINE,
        borderBottom: HAIRLINE,
        color: "var(--muted)",
        fontSize: max640 ? "0.55rem" : "0.65rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
      },
      heroFootRight: {
        display: "flex",
        alignItems: "center",
        gap: 8,
      },

      /* --------------------------- Shared ---------------------------- */
      sectionHeading,
      sectionH2,
      sectionH2Accent: { color: ACCENT },
      sectionP,
      cardLabel,
      sectionNote: {
        marginTop: 35,
        paddingTop: 20,
        borderTop: HAIRLINE,
        color: "var(--muted)",
        fontSize: "0.65rem",
        letterSpacing: "0.12em",
      },
      textLink: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        marginTop: 8,
        color: "inherit",
        fontSize: "0.75rem",
        fontWeight: 600,
        transition: "color 0.2s ease",
      },

      /* ---------------------------- About ---------------------------- */
      aboutSection: tinted,
      aboutGrid: {
        display: "grid",
        gridTemplateColumns: max900 ? "1fr" : "1.15fr 0.85fr",
        gap: 18,
      },
      aboutCard: {
        ...cardShell,
        minHeight: max640 ? "auto" : 300,
        padding: max420 ? 22 : 30,
        background: "var(--canvas)",
      },
      aboutCardMain: {
        ...cardShell,
        minHeight: max640 ? "auto" : "100%",
        padding: max420 ? 22 : 30,
        background: "var(--canvas)",
      },
      aboutSideGrid: {
        display: "grid",
        gridTemplateColumns: max640
          ? "1fr"
          : max900
            ? "repeat(2, minmax(0, 1fr))"
            : "1fr 1fr",
        gap: 18,
      },
      aboutSideCard: {
        ...cardShell,
        minHeight: "100%",
        padding: 24,
        background: "var(--canvas)",
      },
      aboutCardIcon: { ...iconBox(44), marginBottom: 24 },
      aboutTitle: {
        margin: "18px 0",
        fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
        lineHeight: 1.35,
        letterSpacing: "-0.04em",
      },
      aboutText: {
        marginBottom: 14,
        color: "var(--muted)",
        fontSize: "0.9rem",
        lineHeight: 1.85,
      },
      aboutCardBottom: {
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        marginTop: "auto",
        paddingTop: 25,
      },
      aboutTag: chip("8px 10px", "0.62rem", "0.07em"),

      aboutEducation: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "18px 0",
        marginTop: 12,
        marginBottom: 8,
        borderTop: HAIRLINE,
        borderBottom: HAIRLINE,
      },

      aboutEducationIcon: {
        width: 42,
        height: 42,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: HAIRLINE,
        borderRadius: 12,
        color: "var(--accent)",
      },

      aboutEducationContent: {
        flex: 1,
        minWidth: 0,
      },

      aboutEducationLabel: {
        display: "block",
        fontSize: 9,
        letterSpacing: "0.14em",
        color: "var(--muted)",
        marginBottom: 5,
      },

      aboutEducationDegree: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--ink)",
        margin: 0,
      },

      aboutEducationUniversity: {
        fontSize: 12,
        color: "var(--muted)",
        margin: "5px 0 0",
      },

      aboutEducationGpa: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        flexShrink: 0,
      },

      aboutEducationGpaLabel: {
        fontSize: 9,
        letterSpacing: "0.12em",
        color: "var(--muted)",
        marginBottom: 3,
      },

      aboutEducationGpaValue: {
        fontSize: 22,
        fontWeight: 600,
        color: "var(--accent)",
        lineHeight: 1.2,
      },

      aboutEducationGpaScale: {
        fontSize: 10,
        color: "var(--muted)",
      },

      /* ---------------------------- Skills --------------------------- */
      skillsSection: shell,
      toolkitHeading: { ...sectionHeading, marginBottom: 45 },
      skillsGrid: {
        display: "grid",
        gridTemplateColumns: columns(4),
        gap: 16,
      },
      skillCard: {
        ...cardShell,
        minHeight: max640 ? "auto" : 300,
        padding: max420 ? 22 : 25,
        background: "var(--glass)",
      },
      skillCardHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
      },
      skillIcon: iconBox(42),
      skillNumber: { color: "var(--muted)", fontSize: "0.68rem" },
      skillTitle: {
        marginBottom: 12,
        fontSize: "1.1rem",
        letterSpacing: "-0.03em",
      },
      skillText: {
        marginBottom: 22,
        color: "var(--muted)",
        fontSize: "0.82rem",
        lineHeight: 1.7,
      },
      skillItems: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 8,
        marginTop: 20,
      },

      skillItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        minWidth: 0,
        minHeight: 76,
        padding: "10px 6px",
        borderRadius: 12,
        background: "var(--skill-surface)",
        transition: "transform 0.25s ease",
      },

      skillItemLogo: {
        width: 20,
        height: 20,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },

      skillItemImage: {
        width: 20,
        height: 20,
        objectFit: "contain",
        display: "block",
      },

      skillItemName: {
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 1.3,
        color: "var(--ink)",
        textAlign: "center",
        overflowWrap: "anywhere",
      },

      skillCapabilities: {
        marginTop: 22,
      },

      skillCapabilitiesLabel: {
        display: "block",
        fontSize: 9,
        letterSpacing: "0.14em",
        color: "var(--muted)",
        marginBottom: 12,
      },

      skillCapabilityTags: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      },
      skillTag: chip("7px 9px", "0.68rem"),

      toolsSection: {
        marginTop: 65,
        paddingTop: 35,
        borderTop: HAIRLINE,
      },

      toolsHeading: {
        marginBottom: 28,
      },

      toolsTitle: {
        fontSize: "clamp(24px, 3vw, 32px)",
        fontWeight: 600,
        letterSpacing: "-0.04em",
        color: "var(--ink)",
        margin: "12px 0",
      },

      toolsDescription: {
        fontSize: 13,
        lineHeight: 1.7,
        color: "var(--muted)",
        maxWidth: 480,
        margin: 0,
      },

      toolsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))",
        gap: 12,
      },

      toolItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "20px 12px",
        border: HAIRLINE,
        borderRadius: 14,
        background: "var(--surface)",
        transition: "transform 0.25s ease, border-color 0.25s ease",
      },

      toolLogoWrapper: {
        width: 38,
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },

      toolLogo: {
        width: 34,
        height: 34,
        objectFit: "contain",
      },

      toolName: {
        fontSize: 11,
        fontWeight: 500,
        color: "var(--ink)",
        textAlign: "center",
        lineHeight: 1.5,
      },

      /* -------------------------- Experience ------------------------- */
      experienceSection: banded,
      experienceGrid: {
        display: "grid",
        gridTemplateColumns: columns(3),
        gap: 18,
      },
      experienceCard: {
        ...cardShell,
        minHeight: max640 ? "auto" : 340,
        padding: max420 ? 22 : 28,
        background: "var(--canvas)",
      },
      experienceCardHeader: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 30,
      },
      experienceCategory: {
        color: "var(--muted)",
        fontSize: "0.62rem",
        letterSpacing: "0.1em",
      },
      experienceNumber: { color: ACCENT, fontSize: "0.75rem" },
      experienceDate: {
        marginBottom: 14,
        color: ACCENT,
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
      },
      experienceTitle: {
        marginBottom: 8,
        fontSize: "1.5rem",
        letterSpacing: "-0.04em",
      },
      experienceRole: {
        marginBottom: 16,
        fontSize: "0.88rem",
        fontWeight: 500,
      },
      experienceText: {
        marginBottom: 24,
        color: "var(--muted)",
        fontSize: "0.84rem",
        lineHeight: 1.8,
      },
      experienceTags: {
        display: "flex",
        flexWrap: "wrap",
        gap: 7,
        marginTop: "auto",
      },
      experienceTag: chip("7px 9px", "0.65rem"),

      /* -------------------------- Activities ------------------------- */
      activitiesSection: shell,
      activitiesGrid: {
        display: "grid",
        gridTemplateColumns: columns(4),
        gap: 18,
      },
      activityCard: {
        flex: "0 0 calc(25% - 15px)",
        minWidth: "0",
        scrollSnapAlign: "start",
        border: "1px solid var(--line)",
        background: "var(--surface)",
        borderRadius: "8px",
        overflow: "hidden",
      },
      activityImage: {
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        overflow: "hidden",
        background: "var(--surface-strong)",
      },

      activityImagePlaceholder: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      },
      activityNumber: {
        position: "absolute",
        right: 15,
        bottom: 12,
        color: "var(--muted)",
        fontSize: "0.68rem",
        letterSpacing: "0.1em",
      },
      activityContent: { padding: max640 ? 20 : 22 },
      activityCategory: {
        color: ACCENT,
        fontSize: "0.62rem",
        letterSpacing: "0.12em",
      },
      activityTitle: {
        margin: "12px 0",
        fontSize: "1.05rem",
        lineHeight: 1.45,
        letterSpacing: "-0.03em",
      },
      activityText: {
        marginBottom: 20,
        color: "var(--muted)",
        fontSize: "0.8rem",
        lineHeight: 1.75,
      },
      activitiesSliderWrapper: {
        position: "relative",
        width: "100%",
      },

      activitiesSlider: {
        display: "flex",
        gap: "20px",
        overflowX: "auto",
        scrollBehavior: "smooth",
        scrollSnapType: "x mandatory",
        scrollbarWidth: "none",
        paddingBottom: "10px",
      },

      activitiesSliderControls: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        marginTop: "24px",
      },

      activitiesSliderButton: {
        display: "grid",
        placeItems: "center",
        width: "42px",
        height: "42px",
        border: "1px solid var(--line)",
        borderRadius: "50%",
        background: "var(--surface)",
        color: "var(--ink)",
        cursor: "pointer",
        transition: "all 0.2s ease",
      },

      /* ----------------------------- Work ---------------------------- */
      workSection: banded,
      workHeading: { ...sectionHeading, marginBottom: 45 },
      projectsGrid: {
        display: "grid",
        gridTemplateColumns: max640 ? "1fr" : "repeat(2, minmax(0, 1fr))",
        gap: 24,
      },
      projectCell: { minWidth: 0 },
      projectCellFeatured: {
        minWidth: 0,
        gridColumn: max640 ? "auto" : "1 / -1",
      },
      workBottom: {
        display: "flex",
        flexDirection: max768 ? "column" : "row",
        alignItems: max640 ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: 25,
        marginTop: 40,
        paddingTop: 22,
        borderTop: HAIRLINE,
      },
      workBottomNote: {
        color: "var(--muted)",
        fontSize: "0.65rem",
        letterSpacing: "0.1em",
      },
      workBottomLink: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: "0.8rem",
        fontWeight: 600,
        transition: "color 0.2s ease",
      },

      /* -------------------------- Statistics ------------------------- */
      statisticsSection: {
        position: "relative",
        padding: max640 ? "65px 0" : max900 ? "80px 0" : "70px 0",
      },
      statisticsGrid: {
        display: "grid",
        gridTemplateColumns: max640
          ? "repeat(2, minmax(0, 1fr))"
          : "repeat(4, minmax(0, 1fr))",
        border: HAIRLINE,
        borderRadius: 6,
      },
      statisticValue: {
        color: ACCENT,
        fontSize: "clamp(2.5rem, 4vw, 4rem)",
        lineHeight: 1,
        letterSpacing: "-0.07em",
      },
      statisticLabel: {
        color: "var(--muted)",
        fontSize: "0.65rem",
        letterSpacing: "0.1em",
      },

      /* ------------------------ Certifications ----------------------- */
      certificationsSection: tinted,
      certificationsGrid: {
        display: "grid",
        gridTemplateColumns: columns(3),
        gap: 16,
      },
      certificationCard: {
        ...cardShell,
        minHeight: max640 ? "auto" : 245,
        padding: 25,
        background: "var(--canvas)",
      },
      certificationHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 25,
      },
      certificationIcon: iconBox(40),
      certificationNumber: { color: "var(--muted)", fontSize: "0.7rem" },
      certificationCategory: {
        color: ACCENT,
        fontSize: "0.62rem",
        letterSpacing: "0.12em",
      },
      certificationTitle: {
        margin: "12px 0",
        fontSize: "1.1rem",
        lineHeight: 1.5,
      },
      certificationText: {
        marginBottom: 20,
        color: "var(--muted)",
        fontSize: "0.82rem",
      },
      certificationLink: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        marginTop: "auto",
        color: "var(--muted)",
        fontSize: "0.65rem",
        letterSpacing: "0.1em",
      },

      /* ---------------------------- Contact -------------------------- */
      contactSection: {
        ...shell,
        background: "var(--contact-bg)",
        color: "#f2f0eb",
      },
      contactInner: {
        paddingTop: max768 ? 75 : 92,
        paddingBottom: max768 ? 24 : 28,
      },
      contactHeading: { ...sectionHeading, marginBottom: max640 ? 40 : 65 },
      contactEyebrow: { ...eyebrow, color: MUTED_ON_DARK },
      contactH2: { ...sectionH2, margin: "18px 0 22px", color: "#f2f0eb" },
      contactHeadingText: { ...sectionP, color: MUTED_ON_DARK },
      contactLayout: {
        display: "grid",
        gridTemplateColumns: max900
          ? "1fr"
          : "minmax(0, 0.9fr) minmax(0, 1.1fr)",
        gap: "clamp(40px, 8vw, 110px)",
      },
      contactInfoTitle: {
        marginBottom: 20,
        fontSize: "clamp(2rem, 4vw, 3.5rem)",
        lineHeight: 1.1,
        letterSpacing: "-0.06em",
      },
      contactInfoAccent: { color: ACCENT_SOFT },
      contactInfoText: {
        maxWidth: 400,
        marginBottom: 35,
        color: MUTED_ON_DARK,
        fontSize: "0.9rem",
        lineHeight: 1.85,
      },
      contactLinks: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
      },
      contactLinkCard: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: 18,
        border: `1px solid ${LINE_ON_DARK}`,
        borderRadius: 5,
        color: "#f2f0eb",
        transition: "border-color 0.25s ease, transform 0.25s ease",
      },
      contactLinkIcon: { color: ACCENT_SOFT },
      contactLinkText: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        flex: 1,
        fontSize: "0.85rem",
      },
      contactLinkLabel: {
        color: MUTED_ON_DARK,
        fontSize: "0.6rem",
        letterSpacing: "0.1em",
      },
      contactLinkArrow: { color: MUTED_ON_DARK },
      contactFormCard: {
        padding: max640 ? 22 : "clamp(25px, 4vw, 40px)",
        border: `1px solid ${LINE_ON_DARK}`,
        borderRadius: 6,
        background: "#202225",
      },
      contactCardLabel: { ...cardLabel, color: MUTED_ON_DARK },
      contactFormTitle: {
        margin: "15px 0 30px",
        fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
        letterSpacing: "-0.05em",
      },
      contactForm: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
      },
      contactLabel: {
        display: "flex",
        flexDirection: "column",
        gap: 9,
        color: MUTED_ON_DARK,
        fontSize: "0.75rem",
      },
      contactField: {
        width: "100%",
        padding: "14px 15px",
        border: `1px solid ${LINE_ON_DARK}`,
        borderRadius: 4,
        outline: "none",
        background: "#17191c",
        color: "#f2f0eb",
        fontFamily: "inherit",
        fontSize: "0.85rem",
        transition: "border-color 0.2s ease",
      },
      contactTextarea: {
        width: "100%",
        minHeight: 120,
        padding: "14px 15px",
        border: `1px solid ${LINE_ON_DARK}`,
        borderRadius: 4,
        outline: "none",
        background: "#17191c",
        color: "#f2f0eb",
        fontFamily: "inherit",
        fontSize: "0.85rem",
        resize: "vertical",
        transition: "border-color 0.2s ease",
      },
      contactSubmit: {
        ...button,
        alignSelf: "flex-start",
        marginTop: 5,
        border: "none",
        cursor: "pointer",
        background: "var(--accent)",
        color: "#fff",
      },
      contactFooter: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: max640 ? 18 : 25,
        marginTop: 70,
        paddingTop: 25,
        borderTop: `1px solid ${LINE_ON_DARK}`,
      },
      contactFooterLink: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: MUTED_ON_DARK,
        fontSize: "0.75rem",
        transition: "color 0.2s ease",
      },
      contactFooterNote: {
        width: max768 ? "100%" : undefined,
        marginLeft: max640 ? 0 : "auto",
        paddingTop: max768 ? 10 : undefined,
        color: "#77797d",
        fontSize: "0.7rem",
      },
    }),
  };
}

/* -------------------------------------------------------------------------
   Data
------------------------------------------------------------------------- */

const profileImages = [
  profileImage1,
  profileImage2,
  profileImage3,
  profileImage4,
];

const skills = [
  {
    number: "01",
    title: "Programming & Database",
    description:
      "Writing programs and working with relational databases.",
    icon: Code2,
    items: [
      { name: "Python", icon: "simple-icons:python" },
      { name: "PHP", icon: "simple-icons:php" },
      { name: "TypeScript", icon: "simple-icons:typescript" },
      { name: "Flask", icon: "simple-icons:flask" },
      { name: "JavaScript", icon: "simple-icons:javascript" },
      { name: "MySQL", icon: "simple-icons:mysql" },
      { name: "PostgreSQL", icon: "simple-icons:postgresql" },
      { name: "Git", icon: "simple-icons:git" },
      { name: "GitHub", icon: "simple-icons:github" },
    ],
  },
  {
    number: "02",
    title: "Frontend Development",
    description:
      "Building responsive and interactive user interfaces.",
    icon: Monitor,
    items: [
      { name: "HTML5", icon: "simple-icons:html5" },
      { name: "CSS", icon: "simple-icons:css" },
      { name: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
      { name: "React", icon: "simple-icons:react" },
      { name: "Bootstrap", icon: "simple-icons:bootstrap" },
      { name: "AJAX", icon: "simple-icons:ajax" },
    ],
  },
  {
    number: "03",
    title: "Backend Development",
    description:
      "Developing application logic and server-side systems.",
    icon: Server,
    items: [
      { name: "Laravel", icon: "simple-icons:laravel" },
      { name: "CodeIgniter", icon: "simple-icons:codeigniter" },
      { name: "PHP", icon: "simple-icons:php" },
      { name: "Node.js", icon: "simple-icons:nodedotjs" },
      { name: "PostgreSQL", icon: "simple-icons:postgresql" },
      { name: "MySQL", icon: "simple-icons:mysql" },
    ],
  },
  {
    number: "04",
    title: "Data Science & Deep Learning",
    description:
      "Exploring data analysis, machine learning, and deep learning approaches.",
    icon: Brain,
    items: [
      { name: "Python", icon: "simple-icons:python" },
      { name: "Google Colab", icon: "simple-icons:googlecolab" },
      { name: "Kaggle", icon: "simple-icons:kaggle" },
      { name: "Pandas", icon: "simple-icons:pandas" },
      { name: "PyTorch", icon: "simple-icons:pytorch" },
      { name: "TensorFlow", icon: "simple-icons:tensorflow" },
    ],
    capabilities: [
      "Classification",
      "Prediction",
      "Clustering",
    ],
  },
  {
    number: "05",
    title: "IT Infrastructure",
    description:
      "Understanding network infrastructure and configuration.",
    icon: Network,
    items: [
      { name: "Cisco", icon: "simple-icons:cisco" },
      { name: "VirtualBox", icon: "simple-icons:virtualbox" },
    ],
    capabilities: [
      "Computer Networking",
    ],
  },
  {
    number: "06",
    title: "Design & Productivity",
    description:
      "Creating visual content and managing documents, data, and workflows.",
    icon: Palette,
    items: [
      { name: "CorelDRAW", icon: "simple-icons:coreldraw" },
      { name: "Photoshop", icon: "simple-icons:adobephotoshop" },
      { name: "Google Docs", icon: "simple-icons:googledocs" },
      { name: "Google Sheets", icon: "simple-icons:googlesheets" },
      { name: "Google Slides", icon: "simple-icons:googleslides" },
      { name: "Google Apps Script", icon: "simple-icons:googleappsscript" },
    ],
  },
];

const experiences = [
  {
    number: "01",
    period: "2026 - PRESENT",
    category: "WORK EXPERIENCE",
    title: "BPS Pamekasan",
    role: "Technical & Data Support | Internship",
    description:
      "Contributing to technical support, data processing, and digital service development. Supporting the development and maintenance of the online queue system, as well as assisting with statistical data and public service administration.",
    tags: ["Public Sector", "Data Processing", "Web Development"],
  },
  {
    number: "02",
    period: "2026",
    category: "RESEARCH EXPERIENCE",
    title: "LPPM Universitas Trunojoyo Madura",
    role: "Lecturer Research Assistant",
    description:
      "Assisting in research on rice variety detection using Artificial Neural Networks. Responsible for collecting, preprocessing, labeling, and managing rice grain image datasets, as well as supporting model implementation, testing, and performance evaluation.",
    tags: ["Artificial Intelligence", "Machine Learning", "Data Processing"],
  },
  {
    number: "03",
    period: "2025",
    category: "PROFESSIONAL EXPERIENCE",
    title: "CV DB Klik",
    role: "Fullstack Developer | Internship",
    description:
      "Developed a web-based job vacancy system (DB Job) using Laravel, PHP, AJAX, and JavaScript, featuring job search, applicant management, and notification integration. Contributed to an Omnichannel logistics project by implementing Picklist, Packlist, Ready-to-Pack, and SN Out features.",
    tags: ["Laravel", "PHP", "JavaScript", "Fullstack Development"],
  },
  {
    number: "04",
    period: "2022 - 2023",
    category: "ORGANIZATIONAL EXPERIENCE",
    title: "BEM Faculty of Engineering",
    role: "Strategic Studies & Action Division",
    description:
      "Conducted in-depth studies on campus, national, and global issues affecting students, including education policies and social issues. Contributed to student advocacy by organizing open discussion forums between students and faculty to address existing concerns.",
    tags: ["Leadership", "Student Advocacy", "Research"],
  },
  {
    number: "05",
    period: "2022 - 2023",
    category: "ORGANIZATIONAL EXPERIENCE",
    title: "Information Technology Center (ITC)",
    role: "Research & Development Division",
    description:
      "Conducted research on emerging technologies such as Artificial Intelligence, Internet of Things, and web technologies. Developed web application prototypes to support internal organizational activities, including event management and new member registration systems.",
    tags: ["Research", "Web Development", "Artificial Intelligence"],
  },
  {
    number: "06",
    period: "2022 - 2026",
    category: "EDUCATION",
    title: "Universitas Trunojoyo Madura",
    role: "Bachelor's in Informatics Engineering",
    description:
      "Developed a strong foundation in software engineering, information technology, data processing, and application development through academic coursework and practical projects.",
    tags: ["Informatics", "Software Engineering", "Technology"],
  },
];

const activities = [
  {
    number: "01",
    category: "INTERNSHIP",
    title: "DB Klik Internship",
    description:
      "Gained hands-on experience in fullstack web development and contributed to real-world technology projects.",
    image: dbKlikImage,
  },
  {
    number: "02",
    category: "ORGANIZATION",
    title: "ITC Organization",
    description:
      "Actively participated in the Information Technology Center student organization and its technology-related activities.",
    image: itcImage,
  },
  {
    number: "03",
    category: "RESEARCH & DEVELOPMENT",
    title: "ITC R&D Division",
    description:
      "Explored emerging technologies and contributed to research and development activities within the organization.",
    image: litbangImage,
  },
  {
    number: "04",
    category: "EVENT",
    title: "ITC Dies Natalis",
    description:
      "Participated in the ITC anniversary celebration and its organizational activities.",
    image: diesNatalisImage,
  },
  {
    number: "05",
    category: "SPORT",
    title: "ITC Futsal",
    description:
      "Participated in futsal activities with ITC members to strengthen teamwork and camaraderie.",
    image: futsalImage,
  },
  {
    number: "06",
    category: "COMMITTEE",
    title: "GEMASTIK",
    description:
      "Contributed as a committee member in GEMASTIK, supporting the organization and execution of student activities in information and communication technology.",
    image: gemastikImage,
  },
  {
    number: "07",
    category: "COMMUNITY",
    title: "ITC Goes to School",
    description:
      "Participated in ITC community activities aimed at introducing information technology to school students.",
    image: gtsImage,
  },
  {
    number: "08",
    category: "ORGANIZATION",
    title: "ITC Makrab",
    description:
      "Joined ITC's student gathering activities to build connections and strengthen relationships among members.",
    image: makrabImage,
  },
  {
    number: "09",
    category: "EVENT",
    title: "BEM FT Inauguration 2022",
    description:
      "Participated in the inauguration event of the Faculty of Engineering Student Executive Board in 2022.",
    image: bemFtImage,
  },
  {
    number: "10",
    category: "STUDENT ADVOCACY",
    title: "Graduation Escort",
    description:
      "Participated in student advocacy activities during the graduation ceremony escort.",
    image: wisudaImage,
  },
  {
    number: "11",
    category: "RESEARCH",
    title: "Lecturer Research Assistant",
    description:
      "Assisted in rice variety detection research using Artificial Neural Networks, including dataset preparation, model testing, and evaluation.",
    image: researchImage,
  },
];

const certifications = [
  {
    number: "01",
    title: "Introduction to Data Science with Python",
    issuer: "DQLab",
    category: "DATA SCIENCE",
    year: "2024",
    file: dataScienceCertificate,
  },
  {
    number: "02",
    title: "Python Fundamental for Data Science",
    issuer: "DQLab",
    category: "DATA SCIENCE",
    year: "2024",
    file: pythonCertificate,
  },
  {
    number: "03",
    title: "The Role of Coding in Modern Learning",
    issuer: "Bangkalan Dev",
    category: "WEBINAR",
    year: "2025",
    file: webinarCertificate,
  },
  {
    number: "04",
    title: "Certificate of Completion Intern at DB Klik",
    issuer: "DB Klik",
    category: "INTERNSHIP",
    year: "2025",
    file: internshipCertificate,
  },
  {
    number: "05",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    category: "WEB DEVELOPMENT",
    year: "2026",
    file: dpwCertificate,
  },
  {
    number: "06",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding",
    category: "PROGRAMMING",
    year: "2026",
    file: jsCertificate,
  },
  {
    number: "08",
    category: "Data Science",
    title: "R Fundamental for Data Science",
    issuer: "DQLab",
    file: rCertificate,
  },
  {
    number: "09",
    category: "Financial Literacy",
    title: "Introduction to Financial Literacy",
    issuer: "Dicoding",
    file: financialCertificate,
  },
];

const stats = [
  { value: "03", label: "PROJECTS" },
  { value: "02", label: "EXPERIENCES" },
  { value: "04", label: "TECH CATEGORIES" },
  { value: "05", label: "CERTIFICATIONS" },
];

/* -------------------------------------------------------------------------
   App
------------------------------------------------------------------------- */

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const s = createStyles(useBreakpoints());

  const [activeProfile, setActiveProfile] = useState(0)

  const nextProfile = () => {
    setActiveProfile((prev) => (prev + 1) % profileImages.length)
  }

  const prevProfile = () => {
    setActiveProfile(
      (prev) => (prev - 1 + profileImages.length) % profileImages.length
    )
  }

  const cursorGlowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = cursorGlowRef.current
    if (!glow) return

    const handleMouseMove = (event: MouseEvent) => {
      glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      glow.style.opacity = "1"
    }

    const handleMouseLeave = () => {
      glow.style.opacity = "0"
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      nextProfile()
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");

    localStorage.setItem("portfolio-theme", theme);

    const metaTheme = document.querySelector('meta[name="theme-color"]');

    metaTheme?.setAttribute(
      "content",
      theme === "dark" ? "#17191c" : "#f7f5f0"
    );
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "light" ? "dark" : "light"));

  const tools = [
    { name: "Visual Studio Code", icon: "simple-icons:visualstudiocode" },
    { name: "WordPress", icon: "simple-icons:wordpress" },
    { name: "Cisco Packet Tracer", icon: "simple-icons:cisco" },
    { name: "VirtualBox", icon: "simple-icons:virtualbox" },
    { name: "GitHub", icon: "simple-icons:github" },
    { name: "Canva", icon: "simple-icons:canva" },
    { name: "CorelDRAW", icon: "simple-icons:coreldraw" },
    { name: "Photoshop", icon: "simple-icons:adobephotoshop" },
    { name: "Microsoft Word", icon: "simple-icons:microsoftword" },
    { name: "Microsoft Excel", icon: "simple-icons:microsoftexcel" },
    { name: "Microsoft PowerPoint", icon: "simple-icons:microsoftpowerpoint" },
  ];

  const activitiesSliderRef = useRef<HTMLDivElement>(null);

  const [isActivitiesPaused, setIsActivitiesPaused] = useState(false);

  const scrollActivities = (direction: "left" | "right") => {
    const slider = activitiesSliderRef.current;
    if (!slider) return;

    const card = slider.querySelector<HTMLElement>(".activity-card");
    if (!card) return;

    const gap = 20;
    const scrollAmount = card.offsetWidth + gap;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (direction === "right") {
      if (slider.scrollLeft >= maxScroll - 5) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        slider.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    } else {
      if (slider.scrollLeft <= 5) {
        slider.scrollTo({
          left: maxScroll,
          behavior: "smooth",
        });
      } else {
        slider.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Autoplay setiap 3,5 detik
  useEffect(() => {
    if (isActivitiesPaused) return;

    const interval = setInterval(() => {
      scrollActivities("right");
    }, 3500);

    return () => clearInterval(interval);
  }, [isActivitiesPaused]);

  return (
    <>
      <div
        ref={cursorGlowRef}
        style={s.cursorGlow}
      />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="top">
        {/* HERO */}
        {/* className "hero" dipertahankan untuk .hero::before (pseudo-element) */}
        <section className="hero container" id="home" style={s.hero}>
          <motion.div
            style={s.heroTopline}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>

          <div style={s.heroLayout}>
            <motion.div
              style={s.heroContent}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              <span style={s.sectionEyebrow}>HELLO, I'M RIZAL</span>

              <h1 style={s.heroH1}>
                Turning ideas
                <br />
                into digital
                <br />
                <span style={s.accent}>experiences.</span>
              </h1>

              <p style={s.heroDescription}>
                An Informatics Engineering graduate passionate about
                web development, data, and building useful digital
                solutions.
              </p>

              <div style={s.heroActions}>
                <a
                  className="button button-primary"
                  style={s.buttonPrimary}
                  href="#work"
                >
                  Explore my work
                  <ArrowUpRight size={16} />
                </a>

                <a
                  className="button button-secondary"
                  style={s.buttonSecondary}
                  href="#contact"
                >
                  Download CV
                  <ArrowDown size={15} />
                </a>
              </div>

              <div style={s.heroSocials}>
                <a
                  className="hero-social"
                  style={s.heroSocialLink}
                  href="https://github.com/FaizalRisaldi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>

                <a
                  className="hero-social"
                  style={s.heroSocialLink}
                  href="https://linkedin.com/in/faizalrisaldi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>

                <a
                  className="hero-social"
                  style={s.heroSocialLink}
                  href="mailto:risaldifaizal46@gmail.com"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </motion.div>

            <motion.div
              style={s.heroProfile}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >

              <div style={s.heroProfileVisual}>
                <div style={s.profileSlider}>
                  {profileImages.map((image, index) => (
                    <div
                      key={image}
                      style={{
                        ...s.profileSlide,
                        transform: `translateX(${(index - activeProfile) * 100}%)`,
                      }}
                    >
                      <img
                        src={image}
                        alt={`Profil ${index + 1}`}
                        style={s.profileImage}
                      />
                    </div>
                  ))}

                  {/* Controls di dalam gambar */}
                  <div style={s.profileSliderControls}>
                    <button
                      style={s.profileSliderButton}
                      onClick={prevProfile}
                      aria-label="Foto sebelumnya"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <div style={s.profileSliderDots}>
                      {profileImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveProfile(index)}
                          style={{
                            ...s.profileSliderDot,
                            opacity: activeProfile === index ? 1 : 0.4,
                            width: activeProfile === index ? 14 : 5,
                          }}
                          aria-label={`Pilih foto ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      style={s.profileSliderButton}
                      onClick={nextProfile}
                      aria-label="Foto berikutnya"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>
                </div>
              </div>

              <div style={s.heroProfileInfo}>
                <div>
                  <span style={s.profileLabel}>BASED IN</span>
                  <h3 style={s.profileInfoTitle}>Pamekasan, Jawa Timur</h3>
                </div>

                <div>
                  <span style={s.profileLabel}>SPECIALIZATION</span>
                  <h3 style={s.profileInfoTitle}>Web Development & Data</h3>
                </div>

                <ArrowUpRight size={18} style={s.profileInfoArrow} />
              </div>
            </motion.div>
          </div>

          <div style={s.heroFoot}>
            <span>BASED IN PAMEKASAN</span>
            <span style={s.heroFootRight}>
              SCROLL TO EXPLORE
              <ArrowDown size={12} />
            </span>
          </div>
        </section>

        {/* ABOUT */}
        <section style={s.aboutSection} id="about">
          <div className="container">
            <div style={s.sectionHeading}>
              <div>
                <span style={s.sectionEyebrow}>A LITTLE ABOUT ME / 01</span>

                <h2 style={s.sectionH2}>
                  About <span style={s.sectionH2Accent}>Me.</span>
                </h2>
              </div>

              <p style={s.sectionP}>
                A curious developer who enjoys learning, creating,
                and solving real-world problems through technology.
              </p>
            </div>

            <div style={s.aboutGrid}>
              <motion.article
                className="hover-card"
                style={s.aboutCardMain}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div style={s.aboutCardIcon}>
                  <GraduationCap size={20} />
                </div>

                <span style={s.cardLabel}>MY BACKGROUND</span>

                <h3 style={s.aboutTitle}>
                  Hello, I'm an
                  <span style={s.accent}> Informatics Engineering Graduate.</span>
                </h3>

                <p style={s.aboutText}>
                  I have a background in Informatics Engineering and
                  enjoy turning complex problems into clear, practical
                  digital solutions.
                </p>

                <p style={s.aboutText}>
                  From understanding user needs to building, testing,
                  and refining an application, I value thoughtful
                  decisions and the details that make software useful.
                </p>

                <div style={s.aboutEducation}>
                  <div style={s.aboutEducationIcon}>
                    <GraduationCap size={18} />
                  </div>

                  <div style={s.aboutEducationContent}>
                    <span style={s.aboutEducationLabel}>EDUCATION</span>

                    <h4 style={s.aboutEducationDegree}>
                      Informatics Engineering
                    </h4>

                    <p style={s.aboutEducationUniversity}>
                      Universitas Trunojoyo Madura
                    </p>
                  </div>

                  <div style={s.aboutEducationGpa}>
                    <span style={s.aboutEducationGpaLabel}>GPA</span>
                    <strong style={s.aboutEducationGpaValue}>3.56</strong>
                    <small style={s.aboutEducationGpaScale}>/ 4.00</small>
                  </div>
                </div>

                <div style={s.aboutCardBottom}>
                  <span style={s.aboutTag}>SOFTWARE DEVELOPMENT</span>
                  <span style={s.aboutTag}>DATA & TECHNOLOGY</span>
                </div>
              </motion.article>

              <div style={s.aboutSideGrid}>
                <motion.article
                  className="hover-card"
                  style={s.aboutSideCard}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                >
                  <div style={s.aboutCardIcon}>
                    <Code2 size={20} />
                  </div>

                  <span style={s.cardLabel}>WHAT I DO</span>

                  <h3 style={s.aboutTitle}>Building useful digital products.</h3>

                  <p style={s.aboutText}>
                    Developing web applications and exploring
                    data-driven solutions.
                  </p>
                </motion.article>

                <motion.article
                  className="hover-card"
                  style={s.aboutSideCard}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.16 }}
                >
                  <div style={s.aboutCardIcon}>
                    <Sparkles size={20} />
                  </div>

                  <span style={s.cardLabel}>MY APPROACH</span>

                  <h3 style={s.aboutTitle}>Learn, build, and improve.</h3>

                  <p style={s.aboutText}>
                    Always curious to explore new tools and
                    continuously improve my skills.
                  </p>
                </motion.article>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section style={s.skillsSection} id="skills">
          <div className="container">
            <div style={s.toolkitHeading}>
              <div>
                <span style={s.sectionEyebrow}>
                  TOOLS & TECHNOLOGIES / 02
                </span>

                <h2 style={s.sectionH2}>
                  Skills, tools & <span style={s.sectionH2Accent}>technologies.</span>
                </h2>
              </div>

              <p style={s.sectionP}>
                Technologies and tools I use to develop,
                analyze, and create digital solutions.
              </p>
            </div>

            <div style={s.skillsGrid}>
              {skills.map((skill, index) => {
                const Icon = skill.icon;

                return (
                  <motion.article
                    className="hover-card hover-card-lg"
                    style={s.skillCard}
                    key={skill.number}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.06,
                    }}
                  >
                    <div style={s.skillCardHeader}>
                      <div style={s.skillIcon}>
                        <Icon size={19} />
                      </div>

                      <span style={s.skillNumber}>{skill.number}</span>
                    </div>

                    <h3 style={s.skillTitle}>{skill.title}</h3>

                    <p style={s.skillText}>{skill.description}</p>
                      <div style={s.skillItems}>
                        {skill.items.map((item) => (
                          <div style={s.skillItem} key={item.name}>
                            <div style={s.skillItemLogo}>
                              <IconifyIcon
                                icon={item.icon}
                                width={24}
                                height={24}
                                color="var(--accent)"
                              />
                            </div>
                            <span style={s.skillItemName}>
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    {skill.capabilities && (
                      <div style={s.skillCapabilities}>
                        <span style={s.skillCapabilitiesLabel}>
                          AREAS OF APPLICATION
                        </span>

                        <div style={s.skillCapabilityTags}>
                          {skill.capabilities.map((capability) => (
                            <span
                              key={capability}
                              style={s.skillTag}
                            >
                              {capability}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>

            <div style={s.toolsSection}>
              <div style={s.toolsHeading}>
                <span style={s.sectionEyebrow}>
                  SOFTWARE & APPLICATIONS
                </span>

                <h3 style={s.toolsTitle}>
                  Tools I <span style={s.sectionH2Accent}>use.</span>
                </h3>

                <p style={s.toolsDescription}>
                  Applications and software I use for development,
                  networking, data analysis, and creative work.
                </p>
              </div>

              <div style={s.toolsGrid}>
                {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  style={s.toolItem}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                  }}
                >
                  <div style={s.toolLogoWrapper}>
                    <IconifyIcon
                      icon={tool.icon}
                      width={24}
                      height={24}
                      color="var(--accent)"
                    />
                  </div>

                  <span style={s.toolName}>{tool.name}</span>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section style={s.experienceSection} id="experience">
          <div className="container">
            <div style={s.sectionHeading}>
              <div>
                <span style={s.sectionEyebrow}>BACKGROUND / 03</span>

                <h2 style={s.sectionH2}>
                  Experience that <span style={s.sectionH2Accent}>shapes me.</span>
                </h2>
              </div>

              <p style={s.sectionP}>
                Learning through real work, collaboration,
                and building.
              </p>
            </div>

            <div style={s.experienceGrid}>
              {experiences.map((experience, index) => (
                <motion.article
                  className="hover-card"
                  style={s.experienceCard}
                  key={experience.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                >
                  <div style={s.experienceCardHeader}>
                    <span style={s.experienceCategory}>
                      {experience.category}
                    </span>

                    <span style={s.experienceNumber}>{experience.number}</span>
                  </div>

                  <span style={s.experienceDate}>{experience.period}</span>

                  <h3 style={s.experienceTitle}>{experience.title}</h3>

                  <h4 style={s.experienceRole}>{experience.role}</h4>

                  <p style={s.experienceText}>{experience.description}</p>

                  <div style={s.experienceTags}>
                    {experience.tags.map((tag) => (
                      <span style={s.experienceTag} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ACTIVITIES */}
        <section style={s.activitiesSection} id="activities">
          <div className="container">
            <div style={s.sectionHeading}>
              <div>
                <span style={s.sectionEyebrow}>HIGHLIGHTS / 04</span>

                <h2 style={s.sectionH2}>
                  Activities & <span style={s.sectionH2Accent}>Committees.</span>
                </h2>
              </div>

              <p style={s.sectionP}>
                A collection of activities, organizational
                experiences, and professional milestones.
              </p>
            </div>

            <div
              style={s.activitiesSliderWrapper}
              onMouseEnter={() => setIsActivitiesPaused(true)}
              onMouseLeave={() => setIsActivitiesPaused(false)}
            >
              <button
                type="button"
                className="activities-slider-arrow activities-slider-arrow-left"
                onClick={() => scrollActivities("left")}
                aria-label="Previous activities"
              >
                <ChevronLeft size={22} />
              </button>

              <div
                style={s.activitiesSlider}
                ref={activitiesSliderRef}
              >
                {activities.map((activity, index) => (
                  <motion.article
                    className="hover-card activity-card"
                    style={s.activityCard}
                    key={activity.number}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.04,
                    }}
                  >
                    <div style={s.activityImage}>
                      <img
                        src={activity.image}
                        alt={activity.title}
                        style={s.activityImagePlaceholder}
                        loading="lazy"
                      />

                      <span style={s.activityNumber}>
                        {activity.number}
                      </span>
                    </div>

                    <div style={s.activityContent}>
                      <span style={s.activityCategory}>
                        {activity.category}
                      </span>

                      <h3 style={s.activityTitle}>
                        {activity.title}
                      </h3>

                      <p style={s.activityText}>
                        {activity.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <button
                type="button"
                className="activities-slider-arrow activities-slider-arrow-right"
                onClick={() => scrollActivities("right")}
                aria-label="Next activities"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div style={s.sectionNote}>SELECTED ACTIVITIES & EXPERIENCES</div>
          </div>
        </section>

        {/* PROJECTS */}
        <section style={s.workSection} id="projects">
          <div className="container" style={s.workHeading}>
            <div>
              <span style={s.sectionEyebrow}>PORTFOLIO / 05</span>

              <h2 style={s.sectionH2}>
                Selected <span style={s.sectionH2Accent}>work.</span>
              </h2>
            </div>

            <p style={s.sectionP}>
              A selection of projects where I explored ideas,
              built solutions, and learned by doing.
            </p>
          </div>

          <div className="container" style={s.projectsGrid}>
            {projects.map((project, index) => (
              <motion.div
                key={project.number}
                /* className dipertahankan: ProjectCard memakai
                   selector ".project-featured .project-visual" di styles.css */
                className={index === 0 ? "project-featured" : ""}
                style={index === 0 ? s.projectCellFeatured : s.projectCell}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <div className="container" style={s.workBottom}>
            <span style={s.workBottomNote}>
              MORE PROJECTS & CASE STUDIES COMING SOON
            </span>

            <a href="#contact" className="hover-link" style={s.workBottomLink}>
              Let’s talk about a project
              <ArrowUpRight size={15} />
            </a>
          </div>
        </section>

        {/* STATISTICS */}
        <section style={s.statisticsSection}>
          <div className="container">
            <div style={s.statisticsGrid}>
              {stats.map((stat, index) => (
                <div style={s.statisticCard(index)} key={stat.label}>
                  <span style={s.statisticValue}>{stat.value}</span>

                  <span style={s.statisticLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section style={s.certificationsSection} id="certifications">
          <div className="container">
            <div style={s.sectionHeading}>
              <div>
                <span style={s.sectionEyebrow}>LEARNING / 06</span>

                <h2 style={s.sectionH2}>
                  Certifications & <span style={s.sectionH2Accent}>professional training.</span>
                </h2>
              </div>

              <p style={s.sectionP}>
                Certifications and training that support
                my continuous learning journey.
              </p>
            </div>

            <div style={s.certificationsGrid}>
              {certifications.map((certification, index) => (
                <motion.article
                  className="hover-card"
                  style={{
                    ...s.certificationCard,
                    cursor: "pointer",
                  }}
                  key={certification.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  onClick={() => {
                    window.open(
                      certification.file,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  <div style={s.certificationHeader}>
                    <div style={s.certificationIcon}>
                      <Download size={17} />
                    </div>

                    <span style={s.certificationNumber}>
                      {certification.number}
                    </span>
                  </div>

                  <span style={s.certificationCategory}>
                    {certification.category}
                  </span>

                  <h3 style={s.certificationTitle}>
                    {certification.title}
                  </h3>

                  <p style={s.certificationText}>
                    {certification.issuer}
                  </p>

                  <span style={s.certificationLink}>
                    VIEW CERTIFICATE
                    <ArrowUpRight size={13} />
                  </span>
                </motion.article>
              ))}
            </div>

            <div style={s.sectionNote}>CONTINUOUS LEARNING & DEVELOPMENT</div>
          </div>
        </section>

        {/* CONTACT */}
        <section style={s.contactSection} id="contact">
          <div className="container" style={s.contactInner}>
            <div style={s.contactHeading}>
              <div>
                <span style={s.contactEyebrow}>LET’S CONNECT / 07</span>

                <h2 style={s.contactH2}>
                  Let's start a
                  <br />
                  <span style={s.sectionH2Accent}>conversation.</span>
                </h2>
              </div>

              <p style={s.contactHeadingText}>
                Open to opportunities, collaborations,
                and interesting projects.
              </p>
            </div>

            <div style={s.contactLayout}>
              <div>
                <h3 style={s.contactInfoTitle}>
                  Let’s make something
                  <br />
                  <span style={s.contactInfoAccent}>happen.</span>
                </h3>

                <p style={s.contactInfoText}>
                  Have a project, opportunity, or idea?
                  Feel free to reach out. I would love
                  to hear from you.
                </p>

                <div style={s.contactLinks}>
                  <a
                    href="mailto:risaldifaizal46@gmail.com"
                    className="contact-link-card"
                    style={s.contactLinkCard}
                  >
                    <Mail size={17} style={s.contactLinkIcon} />
                    <span style={s.contactLinkText}>
                      <small style={s.contactLinkLabel}>EMAIL</small>
                      risaldifaizal46@gmail.com
                    </span>
                    <ArrowUpRight size={15} style={s.contactLinkArrow} />
                  </a>

                  <a
                    href="https://github.com/FaizalRisaldi"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-link-card"
                    style={s.contactLinkCard}
                  >
                    <Github size={17} style={s.contactLinkIcon} />
                    <span style={s.contactLinkText}>
                      <small style={s.contactLinkLabel}>GITHUB</small>
                      FaizalRisaldi
                    </span>
                    <ArrowUpRight size={15} style={s.contactLinkArrow} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/faizalrisaldi/"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-link-card"
                    style={s.contactLinkCard}
                  >
                    <Linkedin size={17} style={s.contactLinkIcon} />
                    <span style={s.contactLinkText}>
                      <small style={s.contactLinkLabel}>LINKEDIN</small>
                      Faizal Risaldi
                    </span>
                    <ArrowUpRight size={15} style={s.contactLinkArrow} />
                  </a>
                </div>
              </div>

              <div style={s.contactFormCard}>
                <span style={s.contactCardLabel}>SEND ME A MESSAGE</span>

                <h3 style={s.contactFormTitle}>Tell me about your idea.</h3>

                <form
                  style={s.contactForm}
                  onSubmit={(event) => {
                    event.preventDefault();

                    const formData = new FormData(event.currentTarget);
                    const name = formData.get("name");
                    const email = formData.get("email");
                    const subject = formData.get("subject");
                    const message = formData.get("message");

                    const mailto = `mailto:hello@example.com?subject=${encodeURIComponent(
                      String(subject)
                    )}&body=${encodeURIComponent(
                      `Name: ${name}\nEmail: ${email}\n\n${message}`
                    )}`;

                    window.location.href = mailto;
                  }}
                >
                  <label style={s.contactLabel}>
                    Your name
                    <input
                      className="contact-field"
                      style={s.contactField}
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                  </label>

                  <label style={s.contactLabel}>
                    Your email
                    <input
                      className="contact-field"
                      style={s.contactField}
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </label>

                  <label style={s.contactLabel}>
                    Subject
                    <input
                      className="contact-field"
                      style={s.contactField}
                      type="text"
                      name="subject"
                      placeholder="What is this about?"
                      required
                    />
                  </label>

                  <label style={s.contactLabel}>
                    Message
                    <textarea
                      className="contact-field"
                      style={s.contactTextarea}
                      name="message"
                      rows={4}
                      placeholder="Tell me more about your idea..."
                      required
                    />
                  </label>

                  <button
                    className="button button-primary"
                    style={s.contactSubmit}
                    type="submit"
                  >
                    Send message
                    <ArrowUpRight size={16} />
                  </button>
                </form>
              </div>
            </div>

            <div style={s.contactFooter}>
              <a
                href="https://github.com/FaizalRisaldi"
                target="_blank"
                rel="noreferrer"
                className="contact-footer-link"
                style={s.contactFooterLink}
              >
                <Github size={15} />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/faizalrisaldi"
                target="_blank"
                rel="noreferrer"
                className="contact-footer-link"
                style={s.contactFooterLink}
              >
                <Linkedin size={15} />
                LinkedIn
              </a>

              <a
                href="mailto:risaldifaizal46@gmail.com"
                className="contact-footer-link"
                style={s.contactFooterLink}
              >
                <Mail size={15} />
                Email
              </a>

              <span style={s.contactFooterNote}>
                © 2026 Rizal. Built with care.
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}