import "@/components/graph/Graph.css";

export const Graph = () => {
  return (
    <div className="graph-container">
      <svg viewBox="0 0 300 300" className="graph">
        {/*I: Rectangle*/}
        <rect x="150" y="30" width="60" height="120" />

        {/*IV: Triangle*/}
        <polygon className="triangle" points="150,270 150,150 270,150" />

        {/*II: Arc */}
        <path className="arc"  d="M 150 30 A 120 120 0 0 0 30 150 L 150 150 Z"  />

        {/*Axises*/}
        <line x1="0" y1="150" x2="290" y2="150" />
        <line x1="150" y1="10" x2="150" y2="300" />

        {/*Arrows*/}
        <polygon className="arrow" points="150,0 144,15 150,10 156,15" />
        <polygon className="arrow" points="300,150 285,156 290,150 285,144" />

        {/*Y marks*/}
        <line x1="145" x2="155" y1="30" y2="30" />
        <line x1="145" x2="155" y1="90" y2="90" />
        <line x1="145" x2="155" y1="210" y2="210" />
        <line x1="145" x2="155" y1="270" y2="270" />

        {/*X marks*/}
        <line y1="145" y2="155" x1="30" x2="30" />
        <line y1="145" y2="155" x1="90" x2="90" />
        <line y1="145" y2="155" x1="210" x2="210" />
        <line y1="145" y2="155" x1="270" x2="270" />

        {/*Axises labels*/}
        <text x="290" y="140" font-size="16">x</text>
        <text x="160" y="10" font-size="16">y</text>

        {/*R labels on Y*/}
        <text x="160" y="35" font-size="16">R</text>
        <text x="160" y="95" font-size="16">R/2</text>
        <text x="160" y="215" font-size="16">-R/2</text>
        <text x="160" y="275" font-size="16">-R</text>

        <text y="140" x="20" font-size="16">-R</text>
        <text y="140" x="75" font-size="16">-R/2</text>
        <text y="140" x="200" font-size="16">R/2</text>
        <text y="140" x="265" font-size="16">R</text>
      </svg>
    </div>
  );
};