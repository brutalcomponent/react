/**
 * @file src/components/core/Icon/index.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Icon component barrel export with common icons and variants
 */
export { Icon, BrutalIcon, SpinningIcon, AnimatedIcon } from "./Icon";
export type { IconProps } from "./types";

// Common icons - organized by category
export {
  // Navigation
  FaArrowLeft,
  FaArrowRight,
  FaChevronRight,
  FaChevronDown,
  FaChevronLeft,
  FaChevronUp,
  FaBars,
  FaTimes,
  FaHome,

  // Actions
  FaPlus,
  FaTrash,
  FaEdit,
  FaCopy,
  FaDownload,
  FaUpload,
  FaSync,
  FaSearch,
  FaFilter,
  FaSort,

  // Status & Feedback
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
  FaCheckCircle,
  FaQuestionCircle,

  // Content
  FaEye,
  FaEyeSlash,
  FaHeart,
  FaFileAlt,
  FaImage,
  FaCode,
  FaTag,
  FaCalendarAlt as FaCalendar,
  FaClock,

  // Communication
  FaEnvelope,
  FaPhone,
  FaComment,
  FaShare,

  // Social & External
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaExternalLinkAlt,
  FaGlobe,

  // Business & Location
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaUtensils,

  // User & Security
  FaUser,
  FaUsers,
  FaLock,
  FaUnlock,
  FaKey,

  // Media & Files
  FaCamera,
  FaVideo,
  FaMusic,
  FaFile,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,

  // Settings & Tools
  FaCog,
  FaTools,
  FaWrench,
} from "react-icons/fa";

// Additional icons from other packs
export {
  // More modern icons from Heroicons style
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineFire,
} from "react-icons/hi";

export {
  // Simple icons for brands/tech
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
} from "react-icons/si";
