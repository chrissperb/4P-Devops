function Svg({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconLightbulb(props) {
  return (
    <Svg {...props}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .9 1.6l.1.6h5.2l.1-.6c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3Z" />
    </Svg>
  );
}

export function IconCode(props) {
  return (
    <Svg {...props}>
      <path d="m8 8-5 4 5 4M16 8l5 4-5 4M13.5 5l-3 14" />
    </Svg>
  );
}

export function IconBug(props) {
  return (
    <Svg {...props}>
      <path d="M8 9a4 4 0 0 1 8 0v3a4 4 0 0 1-8 0V9Z" />
      <path d="M9 8 7.5 6M15 8l1.5-2M8 12H4M20 12h-4M9 15l-1.5 2M15 15l1.5 2M12 16v3" />
    </Svg>
  );
}

export function IconRocket(props) {
  return (
    <Svg {...props}>
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.9-.9.9-2.3 0-3.2a2.2 2.2 0 0 0-3 .2Z" />
      <path d="M9 14 7 12a13 13 0 0 1 2-6.5C11 3 14 2 18 2c0 4-1 7-3.5 9A13 13 0 0 1 9 14Z" />
      <circle cx="15" cy="9" r="1.6" />
    </Svg>
  );
}

export function IconServer(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </Svg>
  );
}

export function IconCulture(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3" />
      <circle cx="5" cy="17" r="2.4" />
      <circle cx="19" cy="17" r="2.4" />
      <path d="M10 10.5 6.6 15M14 10.5 17.4 15M7.4 17h9.2" />
    </Svg>
  );
}

export function IconAutomation(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h9M4 7l3-3M4 7l3 3" />
      <path d="M20 17h-9M20 17l-3-3M20 17l-3 3" />
      <circle cx="17" cy="7" r="2" />
      <circle cx="7" cy="17" r="2" />
    </Svg>
  );
}

export function IconMeasurement(props) {
  return (
    <Svg {...props}>
      <path d="M4 19V5M4 19h16" />
      <path d="M8 19v-5M12 19v-9M16 19v-6M20 19V7" />
    </Svg>
  );
}

export function IconSharing(props) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
    </Svg>
  );
}

export function IconFlow(props) {
  return (
    <Svg {...props}>
      <path d="M3 8h13a4 4 0 0 1 0 8H6" />
      <path d="m9 13-3 3 3 3" />
    </Svg>
  );
}

export function IconFeedback(props) {
  return (
    <Svg {...props}>
      <path d="M20 11a8 8 0 0 0-14-5M4 6v3h3" />
      <path d="M4 13a8 8 0 0 0 14 5M20 18v-3h-3" />
    </Svg>
  );
}

export function IconLearning(props) {
  return (
    <Svg {...props}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M7 11v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4" />
      <path d="M21 8v5" />
    </Svg>
  );
}

export function IconRadar(props) {
  return (
    <Svg {...props}>
      <path d="M12 12 5 5" />
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M12 7a5 5 0 1 0 5 5" />
      <circle cx="12" cy="12" r="1" />
    </Svg>
  );
}

export function IconBell(props) {
  return (
    <Svg {...props}>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </Svg>
  );
}

export function IconWrench(props) {
  return (
    <Svg {...props}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2 2.3-2.3Z" />
    </Svg>
  );
}

export function IconBook(props) {
  return (
    <Svg {...props}>
      <path d="M4 5a2 2 0 0 1 2-2h11v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M17 19H6M9 3v14" />
    </Svg>
  );
}

export function IconFlask(props) {
  return (
    <Svg {...props}>
      <path d="M9 3h6M10 3v5L5 17a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 17L14 8V3" />
      <path d="M7.5 14h9" />
    </Svg>
  );
}

export function IconChart(props) {
  return (
    <Svg {...props}>
      <path d="M4 4v16h16" />
      <path d="M8 16l3-4 3 2 4-6" />
    </Svg>
  );
}

export function IconBrain(props) {
  return (
    <Svg {...props}>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8V15a3 3 0 0 0 4 2.8V20h1.5V4H9Z" />
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8V15a3 3 0 0 1-4 2.8V20h-1.5V4H15Z" />
    </Svg>
  );
}

export function IconTrendUp(props) {
  return (
    <Svg {...props}>
      <path d="M3 17 10 10l4 4 7-7" />
      <path d="M16 7h5v5" />
    </Svg>
  );
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <path d="m5 13 4 4L19 7" />
    </Svg>
  );
}

export function IconX(props) {
  return (
    <Svg {...props}>
      <path d="M6 6 18 18M18 6 6 18" />
    </Svg>
  );
}

export function IconChevron(props) {
  return (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

export function IconArrowRight(props) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconArrowLeft(props) {
  return (
    <Svg {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </Svg>
  );
}

export function IconSpark(props) {
  return (
    <Svg {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </Svg>
  );
}

export function IconShield(props) {
  return (
    <Svg {...props}>
      <path d="M12 3 5 6v5c0 4.2 2.8 8 7 10 4.2-2 7-5.8 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}

export function IconGauge(props) {
  return (
    <Svg {...props}>
      <path d="M12 15a3 3 0 1 0 0-5 3 3 0 0 0 0 5Z" />
      <path d="M13.5 10.5 18 6" />
      <path d="M4 18a9 9 0 1 1 16 0" />
    </Svg>
  );
}

export function IconInfinity(props) {
  return (
    <Svg {...props}>
      <path d="M7 9c-2 0-3.5 1.3-3.5 3S5 15 7 15c2.5 0 3.5-6 6.5-6 1.6 0 3 1.3 3 3s-1.4 3-3 3c-3 0-4-6-6.5-6Z" />
    </Svg>
  );
}
