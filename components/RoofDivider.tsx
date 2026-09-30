const HOUSES = [
  { w: 70, wall: 14, roof: 22 },
  { w: 90, wall: 20, roof: 34 },
  { w: 60, wall: 12, roof: 18 },
  { w: 100, wall: 22, roof: 40 },
  { w: 75, wall: 16, roof: 26 },
  { w: 85, wall: 18, roof: 30 },
  { w: 65, wall: 13, roof: 20 },
  { w: 95, wall: 21, roof: 36 },
];

const BASELINE = 64;

function buildSkylinePath() {
  let x = 0;
  const points: string[] = [`M0,${BASELINE}`];

  for (const house of HOUSES) {
    points.push(`L${x},${BASELINE - house.wall}`);
    points.push(`L${x + house.w / 2},${BASELINE - house.wall - house.roof}`);
    points.push(`L${x + house.w},${BASELINE - house.wall}`);
    points.push(`L${x + house.w},${BASELINE}`);
    x += house.w;
  }

  points.push(`L${x},${BASELINE}Z`);
  return { path: points.join(" "), width: x };
}

const { path, width } = buildSkylinePath();

/**
 * A literal roofline: a repeating skyline of pitched-roof houses, used as the
 * seam between the hero and the sections that follow it.
 */
export default function RoofDivider({
  flip = false,
  fill = "fill-glacier",
  className = "",
}: {
  flip?: boolean;
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${width * 2} ${BASELINE}`}
      preserveAspectRatio="none"
      className={`block h-10 w-full sm:h-14 ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <path d={path} className={fill} />
      <path d={path} transform={`translate(${width}, 0)`} className={fill} />
    </svg>
  );
}
