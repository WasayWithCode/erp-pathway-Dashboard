const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  chart: "M4 19V5m0 14h16M8 16v-5m4 5V8m4 8v-9",
  check: "m5 12 4 4L19 6",
  close: "m6 6 12 12M18 6 6 18",
  community: "M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 21a6 6 0 0 1 12 0m3 0a5 5 0 0 0-5-4.8",
  dashboard: "M4 5h7v7H4V5Zm10 0h6v4h-6V5ZM4 15h6v5H4v-5Zm9-3h7v8h-7v-8Z",
  finance: "M5 19V5h14v14H5Zm3-4h8M8 9h8m-8 3h4",
  inventory: "m4 7 8-4 8 4-8 4-8-4Zm0 0v10l8 4 8-4V7M12 11v10",
  menu: "M4 7h16M4 12h16M4 17h16",
  operations: "M12 3v4m0 10v4M5.6 5.6l2.8 2.8m8.2 8.2 2.8 2.8M3 12h4m10 0h4M5.6 18.4l2.8-2.8m8.2-8.2 2.8-2.8M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z",
  people: "M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 2a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 21a6 6 0 0 1 12 0m3 0a5 5 0 0 0-5-4.8",
  roadmap: "M5 5h4v4H5V5Zm10 0h4v4h-4V5ZM5 15h4v4H5v-4Zm10 0h4v4h-4v-4ZM9 7h6M7 9v6m10-6v6M9 17h6",
  search: "m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",
  spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Zm5 12 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z",
  support: "M12 3a8 8 0 0 0-8 8v3a3 3 0 0 0 3 3h1v-6H5v-1a7 7 0 0 1 14 0v1h-3v6h2a3 3 0 0 1-3 3h-3",
};

const Icon = ({ name = "spark", className = "h-5 w-5", strokeWidth = 1.8, ...props }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    {...props}
  >
    <path d={paths[name] || paths.spark} />
  </svg>
);

export default Icon;
