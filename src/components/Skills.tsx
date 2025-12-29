import { motion } from "framer-motion";

// Skill categories and data - Real skills from actual projects
const SKILL_CATEGORIES = {
  Frontend: [
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Framer Motion",
    "HTML",
    "CSS",
  ],
  Backend: [
    "Laravel",
    "MySQL",
    "REST API",
  ],
  Tools: ["VS Code", "Git", "Node.js", "Vite", "ChatGPT", "Vercel"],
};

// Color palettes for different skill types
const SKILL_COLORS = {
  Frontend: {
    bg: "bg-cyan-900/30",
    text: "text-cyan-300",
    ring: "ring-cyan-700/40",
    glow: "shadow-cyan-500/20",
  },
  Backend: {
    bg: "bg-emerald-900/30",
    text: "text-emerald-300",
    ring: "ring-emerald-700/40",
    glow: "shadow-emerald-500/20",
  },
  Tools: {
    bg: "bg-indigo-900/30",
    text: "text-indigo-300",
    ring: "ring-indigo-700/40",
    glow: "shadow-indigo-500/20",
  },
};

// Custom SVG Icons for technologies
const ReactIcon = () => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    alt="React"
    className="w-4 h-4"
  />
);

const NextIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M11.572 0c-.176 0-.31.001-.358.007a11.17 11.17 0 0 0-1.027.12 10.888 10.888 0 0 0-2.624.775 10.52 10.52 0 0 0-2.194 1.347c-.01.01-.018.02-.027.03A11.113 11.113 0 0 0 .007 11.572c-.006.048-.007.182-.007.358v.14c0 .176.001.31.007.358a11.17 11.17 0 0 0 .12 1.027c.2.9.504 1.75.775 2.624.27.874.504 1.748.775 2.624a10.52 10.52 0 0 0 1.347 2.194c.01.01.02.018.03.027a11.113 11.113 0 0 0 5.323 2.347c.048.006.182.007.358.007h.14c.176 0 .31-.001.358-.007a11.17 11.17 0 0 0 1.027-.12c.9-.2 1.75-.504 2.624-.775.874-.27 1.748-.504 2.624-.775a10.52 10.52 0 0 0 2.194-1.347c.01-.01.018-.02.027-.03a11.113 11.113 0 0 0 2.347-5.323c.006-.048.007-.182.007-.358v-.14c0-.176-.001-.31-.007-.358a11.17 11.17 0 0 0-.12-1.027 10.888 10.888 0 0 0-.775-2.624 10.52 10.52 0 0 0-1.347-2.194c-.01-.01-.02-.018-.03-.027A11.113 11.113 0 0 0 13.43.007C13.382.001 13.248 0 13.072 0h-1.5zM12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z" />
    <path d="M12 6l6 6-6 6-6-6 6-6z" />
  </svg>
);

const TypeScriptIcon = () => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    alt="TypeScript"
    className="w-4 h-4"
  />
);

const JavaScriptIcon = () => (
  <svg
    viewBox="0 0 48 48"
    className="w-5 h-5"
  >
    <path fill="#ffd600" d="M6,42V6h36v36H6z" />
    <path
      fill="#000001"
      d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"
    />
  </svg>
);

const TailwindIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
      fill="#06B6D4"
    />
  </svg>
);

const FramerIcon = () => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg"
    alt="Framer Motion"
    className="w-4 h-4"
  />
);

const ReduxIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M16.633 16.324c-.105-.102-.105-.27 0-.372l.84-.84c.102-.102.27-.102.372 0l1.68 1.68c.102.102.102.27 0 .372l-.84.84c-.102.102-.27.102-.372 0l-1.68-1.68z"
      fill="#764ABC"
    />
    <path
      d="M7.367 7.676c.105.102.105.27 0 .372l-.84.84c-.102.102-.27.102-.372 0L4.475 7.208c-.102-.102-.102-.27 0-.372l.84-.84c.102-.102.27-.102.372 0l1.68 1.68z"
      fill="#764ABC"
    />
    <path
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
      fill="#764ABC"
    />
  </svg>
);

const ZustandIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      fill="#FF6B6B"
    />
  </svg>
);

const NodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.080-0.383 c0.585-0.203,0.703-0.250,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.990,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"
      fill="#339933"
    />
  </svg>
);

const ExpressIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957c-2.35 1.1-4.967.64-6.945-1.2-2.05-1.89-2.67-4.65-1.15-7.417z"
      fill="#000000"
    />
  </svg>
);

const MongoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M17.193 9.555c-1.264-5.58-7.134-5.164-8.72.693C7.35 3.133 2.33 9.723 5.7 16.015c.329.933.89 1.715 1.544 2.388 1.323 1.315 2.887 2.033 4.752 2.033 1.866 0 3.43-.718 4.752-2.033.655-.673 1.215-1.455 1.544-2.388.24-.68.36-1.38.36-2.08 0-.7-.12-1.4-.36-2.08-.33-.933-.89-1.715-1.544-2.388-.655-.673-1.215-1.455-1.544-2.388z"
      fill="#4DB33D"
    />
    <path
      d="M12.996 2.5c-.5 0-1 .5-1 1v1c0 .5.5 1 1 1s1-.5 1-1v-1c0-.5-.5-1-1-1z"
      fill="#4DB33D"
    />
  </svg>
);

const PostgresIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M23.111 6.25c-.5-.5-1.25-.5-1.75 0L19.5 7.25c-.5.5-.5 1.25 0 1.75l1.861 1.861c.5.5 1.25.5 1.75 0s.5-1.25 0-1.75L21.25 8l1.861-1.75c.5-.5.5-1.25 0-1.75z"
      fill="#336791"
    />
    <path
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
      fill="#336791"
    />
  </svg>
);

const PrismaIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M21.807 3.048c-.5-.5-1.25-.5-1.75 0L19.5 3.25c-.5.5-.5 1.25 0 1.75l1.557 1.557c.5.5 1.25.5 1.75 0s.5-1.25 0-1.75L21.25 4l.557-.952c.5-.5.5-1.25 0-1.75z"
      fill="#2D3748"
    />
    <path
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
      fill="#2D3748"
    />
  </svg>
);

const RestIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" fill="#61DAFB" />
  </svg>
);

const GraphQLIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      fill="#E10098"
    />
  </svg>
);

const JestIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      fill="#C21325"
    />
  </svg>
);

const CypressIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      fill="#17202C"
    />
  </svg>
);

const GitIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.218-.091-.423-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"
      fill="#F05032"
    />
  </svg>
);

const ViteIcon = () => (
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
    alt="Vite"
    className="w-4 h-4"
  />
);

const WebpackIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M22.1987 18.498l-9.7699 5.5022v-4.2855l6.0872-3.3338 3.6827 2.117zm.6683-.6026V6.3884l-3.5752 2.0544v7.396zm-21.0657.6026l9.7699 5.5022v-4.2855L5.484 16.3809l-3.6827 2.117zm-.6683-.6026V6.3884l3.5751 2.0544v7.396zm.4183-12.2515l10.0199-5.644v4.1434L5.152 7.6587 1.4336 5.644zm12.249-.0001l9.7699 5.644-3.6827 2.117-6.0872-3.3338V5.644zm-1.0001 1.0708L5.7368 10.802v7.2675l2.6364-1.4452V12.004l3.1818-1.7381 3.1818 1.7381v4.6192l2.6364 1.4452V10.802L12.6825 6.7147zm-8.2498 8.89l-2.6364-1.4452L2.1508 18.498l9.7699 5.5022v-4.1434l-6.0872-3.3338zm15.2525 0l-6.0872 3.3338V23.998l9.7699-5.5022-2.6364-1.4452z"
      fill="#8DD6F9"
    />
  </svg>
);

const LaravelIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.02.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.039-.01-.012-.021-.023-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z"
      fill="#FF2D20"
    />
  </svg>
);

const MySQLIcon = () => (
  <svg
    viewBox="0 0 48 48"
    className="w-5 h-5"
  >
    <circle cx="24" cy="24" r="20" fill="#216287" />
    <circle cx="24" cy="24" r="18" fill="#e87912" />
    <path
      fill="#216287"
      d="M29.69,31.95c0,4.35-3.09,7.98-7.19,8.82l-0.55,0.1C13.53,39.87,7,32.7,7,24c0-9.39,7.61-17,17-17 c0.17,0,0.35,0,0.52,0.01c-3.5,1.23-6.02,4.56-6.02,8.49c0,1.49,0.36,2.9,1.01,4.14c0.86,1.66,2.3,2.94,3.97,3.78l1.22,0.61 c1.67,0.84,3.12,2.12,3.98,3.78C29.32,29.05,29.69,30.46,29.69,31.95z"
    />
    <path
      fill="#fff"
      d="M24,6C14.059,6,6,14.059,6,24c0,8.671,6.132,15.906,14.295,17.614l0.012,0.063l0.159-0.029 C21.609,41.876,22.79,42,24,42c9.941,0,18-8.059,18-18C42,14.059,33.941,6,24,6z M8,24c0-7.935,5.813-14.521,13.4-15.769 C19.309,9.994,18,12.626,18,15.5c0,1.519,0.367,3.029,1.062,4.368c0.865,1.668,2.316,3.051,4.197,3.996l1.219,0.613 c1.691,0.852,2.991,2.084,3.759,3.564c0.63,1.214,0.949,2.528,0.949,3.907c0,3.645-2.35,6.857-5.711,8.024 C14.897,39.693,8,32.645,8,24z M25.905,39.876c2.599-1.721,4.281-4.668,4.281-7.927c0-1.52-0.367-3.029-1.062-4.368 c-0.865-1.668-2.316-3.051-4.197-3.996l-1.219-0.613c-1.692-0.852-2.991-2.083-3.759-3.564C19.319,18.193,19,16.879,19,15.5 c0-3.173,1.781-6.017,4.464-7.473C23.643,8.021,23.819,8,24,8c8.822,0,16,7.178,16,16C40,32.177,33.831,38.93,25.905,39.876z"
    />
    <path
      fill="#fff"
      d="M38.458,27.528c-0.776-0.927-2.018-1.829-2.809-3.135c-0.111-0.184-0.053-0.407,0.135-0.507 C36.799,23.342,36.978,23.441,38,23c-1-1-2.037-1.36-3.681-1.774c-0.322-0.067-0.507-0.337-0.561-0.634 c-0.088-0.323-0.275-0.87-0.471-1.307c-1.421-2.871-3.192-6.625-6.786-6.907c-0.237-0.003-0.463-0.099-0.62-0.257 c-0.453-0.432-1.087-0.967-1.67-1.055c-0.115,0.011-0.057-0.028-0.146,0.054c-0.233,0.273-0.186,0.283-0.026,0.63 c0.216,0.369,0.628,0.791,1.033,1.208c0.411,0.531,0.126,1.308,0.396,1.904c0.111,0.423,0.344,0.923,0.603,1.229 c0.125,0.161,0.163,0.365,0.124,0.55c-0.288,1.377-0.491,2.862-0.212,4.241c0.006,0.147,0.15,0.202,0.256,0.149 c0.033-0.026,0.032-0.008,0.16-0.233C26.556,20.448,27.675,18.307,28,19c0.473,1.538,1.13,4.53,2.522,5.455 c0.059,0.025,0.013,0.122-0.045,0.089c-1.454-0.751-2.631-2.682-2.978-3.984c-0.27,0.023-0.512,0.242-0.648,0.493 c-0.205,0.719-1.26,0.756-1.449-0.013c-0.076-0.298-0.138-0.6-0.167-0.905c-0.111-1.11-0.041-2.753,0.211-3.582 c-0.704-0.76-1.098-2.227-1.005-2.995c-0.413-0.418-0.847-0.829-1.17-1.344c-0.608-0.774-0.076-2.132,0.967-2.083 c0.924,0.077,1.672,0.707,2.33,1.301c0.729-0.065,2.173,0.444,2.982,0.991c1.834,1.191,2.799,3.236,3.847,5.078 c0.409,0.836,1.142,2.25,1.123,2.924c1.866,0.578,3.975,1.277,5.039,3.046c0.019,0.035,0.001,0.08-0.038,0.091 c0,0-2.9,0.91-2.9,0.91l1.921,3C38.575,27.522,38.495,27.584,38.458,27.528L38.458,27.528z"
    />
    <path fill="#fff" d="M27.046,13.688l0.833,1.189C27.879,14.878,28.83,13.53,27.046,13.688z" />
  </svg>
);

const HTMLIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
      fill="#E34F26"
    />
  </svg>
);

const CSSIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"
      fill="#1572B6"
    />
  </svg>
);

const VercelIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M12 0L24 24H0L12 0z"
      fill="currentColor"
    />
  </svg>
);

const RESTAPIIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 2c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z"
      fill="#009688"
    />
  </svg>
);

const VSCodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"
      fill="#007ACC"
    />
  </svg>
);

const NodeJSIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path
      d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.080-0.383 c0.585-0.203,0.703-0.250,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.990,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"
      fill="#339933"
    />
  </svg>
);

const ChatGPTIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4"
  >
    <path
      d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681l-.004 6.788zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5-.005-2.999z"
      fill="#10A37F"
    />
  </svg>
);

// Skill to icon mapping
const SKILL_ICONS: Record<string, any> = {
  // Frontend
  React: ReactIcon,
  TypeScript: TypeScriptIcon,
  JavaScript: JavaScriptIcon,
  "Tailwind CSS": TailwindIcon,
  "Framer Motion": FramerIcon,
  HTML: HTMLIcon,
  CSS: CSSIcon,

  // Backend
  Laravel: LaravelIcon,
  MySQL: MySQLIcon,
  "REST API": RESTAPIIcon,

  // Tools
  "VS Code": VSCodeIcon,
  Git: GitIcon,
  "Node.js": NodeJSIcon,
  Vite: ViteIcon,
  ChatGPT: ChatGPTIcon,
  Vercel: VercelIcon,
};

// Individual skill component
const SkillCard = ({
  skill,
  category,
}: {
  skill: string;
  category: keyof typeof SKILL_CATEGORIES;
}) => {
  const colors = SKILL_COLORS[category];
  const IconComponent =
    SKILL_ICONS[skill] ||
    (() => <div className="w-4 h-4 bg-gray-500 rounded" />);

  // Get the appropriate glow color for each category
  const getGlowColor = (category: keyof typeof SKILL_CATEGORIES) => {
    switch (category) {
      case "Frontend":
        return "rgba(6, 182, 212, 0.4)"; // cyan-500
      case "Backend":
        return "rgba(16, 185, 129, 0.4)"; // emerald-500
      case "Tools":
        return "rgba(99, 102, 241, 0.4)"; // indigo-500
      default:
        return "rgba(6, 182, 212, 0.4)";
    }
  };

  const getGlowColorLight = (category: keyof typeof SKILL_CATEGORIES) => {
    switch (category) {
      case "Frontend":
        return "rgba(6, 182, 212, 0.2)"; // cyan-500
      case "Backend":
        return "rgba(16, 185, 129, 0.2)"; // emerald-500
      case "Tools":
        return "rgba(99, 102, 241, 0.2)"; // indigo-500
      default:
        return "rgba(6, 182, 212, 0.2)";
    }
  };

  const getGlowColorBorder = (category: keyof typeof SKILL_CATEGORIES) => {
    switch (category) {
      case "Frontend":
        return "rgba(6, 182, 212, 0.6)"; // cyan-500
      case "Backend":
        return "rgba(16, 185, 129, 0.6)"; // emerald-500
      case "Tools":
        return "rgba(99, 102, 241, 0.6)"; // indigo-500
      default:
        return "rgba(6, 182, 212, 0.6)";
    }
  };

  return (
    <motion.div
      className={`
        relative rounded-lg sm:rounded-xl px-3 sm:px-5 md:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium ring-1 backdrop-blur-sm
        ${colors.bg} ${colors.text} ${colors.ring}
        overflow-hidden group
      `}
      style={{
        borderRadius: "0.75rem", // Ensures consistent border radius during scaling
      }}
      initial={{ opacity: 0, y: 20, scale: 1 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          delay: Math.random() * 0.2,
          type: "spring",
          stiffness: 120,
        },
      }}
    >
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
        <div className="flex-shrink-0">
          <IconComponent />
        </div>
        <span className="font-medium whitespace-nowrap">{skill}</span>
      </div>
    </motion.div>
  );
};

// Category section component
const SkillCategory = ({
  title,
  skills,
  category,
}: {
  title: string;
  skills: string[];
  category: keyof typeof SKILL_CATEGORIES;
}) => {
  const colors = SKILL_COLORS[category];

  // Get the appropriate glow class for each category
  const getGlowClass = (category: keyof typeof SKILL_CATEGORIES) => {
    switch (category) {
      case "Frontend":
        return "hover:glow-cyan";
      case "Backend":
        return "hover:glow-emerald";
      case "Tools":
        return "hover:glow-indigo";
      default:
        return "hover:glow-cyan";
    }
  };

  return (
    <motion.div
      className={`group relative bg-gray-800/40 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md ring-1 ring-inset ring-white/5 overflow-hidden transition-all duration-500 ${getGlowClass(
        category
      )}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Category Header */}
      <div className="relative z-10 mb-4">
        <h3 className={`text-lg sm:text-xl font-semibold ${colors.text} mb-2`}>{title}</h3>
        <div
          className={`h-1 w-12 sm:w-16 rounded-full transition-all duration-300 group-hover:w-20 sm:group-hover:w-24 ${colors.bg.replace(
            "/30",
            "/60"
          )}`}
        />
      </div>

      {/* Skills Grid - Single line layout */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill}
            skill={skill}
            category={category}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen py-16 sm:py-20 relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Keep title EXACTLY as-is */}
        <div className="text-center mb-12 sm:mb-16 animate-slideUp">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-3 sm:mb-4 text-foreground">
            Technical{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Technologies I've used in real projects - from responsive frontends to database-driven backends
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
            <SkillCategory
              key={category}
              title={category}
              skills={skills}
              category={category as keyof typeof SKILL_CATEGORIES}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto px-4">
            Continuously learning and adapting to new technologies in the
            ever-evolving landscape of web development. Always excited to
            explore new tools and frameworks that can enhance user experiences
            and development workflows.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
