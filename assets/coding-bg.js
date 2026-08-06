// Live Coding Session Animated Background Engine
(function () {
  function initCodingBg() {
    if (document.getElementById('bg-coding-wrapper')) return;

    // Create container elements
    const wrapper = document.createElement('div');
    wrapper.id = 'bg-coding-wrapper';
    wrapper.className = 'fixed inset-0 pointer-events-none -z-50 overflow-hidden select-none';

    // 1. Base Photo background - increased contrast & brightness
    const img = document.createElement('img');
    img.src = 'assets/coding.avif';
    img.alt = 'Coding background';
    img.className = 'absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-50 filter brightness-110 contrast-125 saturate-130 transition-opacity duration-500 scale-105';

    // 2. Lighter overlay to let background code shine through
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-themeBg/45 dark:bg-themeBg/60 backdrop-blur-[1px] transition-colors duration-500';

    // 3. Canvas for high-visibility code streaming animation
    const canvas = document.createElement('canvas');
    canvas.id = 'codingCanvas';
    canvas.className = 'absolute inset-0 w-full h-full opacity-95 dark:opacity-100 pointer-events-none';

    wrapper.appendChild(img);
    wrapper.appendChild(overlay);
    wrapper.appendChild(canvas);
    document.body.prepend(wrapper);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    });

    const codeTokens = [
      'const app = initializeApp(config);',
      'async function buildUI() {',
      '  const res = await fetch("/api/v1/projects");',
      '  const data = await res.json();',
      '  return data.map(item => <Card {...item} />);',
      '}',
      'export default function Portfolio() {',
      '  const [theme, setTheme] = useState("dark");',
      '  useEffect(() => { document.body.className = theme; }, [theme]);',
      '  return <main class="bento-grid"><Hero /></main>;',
      '}',
      '// Tailwind CSS modern layout engine',
      '.bento-card { backdrop-filter: blur(20px); transition: all 0.4s; }',
      'const metrics = { conversion: "+148%", latency: "24ms" };',
      'interface Project { id: string; title: string; url: string; }',
      'git commit -m "feat: live coding session animated background"',
      'npm run dev -- --host 0.0.0.0 --port 3000',
      '<div className="relative overflow-hidden rounded-2xl border">',
      'const [active, setActive] = useState(true);',
      'window.requestAnimationFrame(step);',
      'const gradient = ctx.createLinearGradient(0, 0, width, height);'
    ];

    // High-visibility neon colors
    const colorsDark = ['#C084FC', '#38BDF8', '#34D399', '#F472B6', '#FDE047', '#60A5FA', '#22D3EE'];
    const colorsLight = ['#7C3AED', '#0284C7', '#059669', '#DB2777', '#D97706', '#2563EB', '#0891B2'];

    let columns = [];

    function initColumns() {
      columns = [];
      const colWidth = 240;
      const numCols = Math.ceil(width / colWidth) + 1;

      for (let i = 0; i < numCols; i++) {
        columns.push({
          x: i * colWidth + (Math.random() * 20 - 10),
          y: Math.random() * height,
          speed: 0.7 + Math.random() * 0.9,
          snippetIndex: Math.floor(Math.random() * codeTokens.length),
          charIndex: Math.floor(Math.random() * 12),
          opacity: 0.65 + Math.random() * 0.35
        });
      }
    }

    initColumns();

    let lastTime = 0;
    function animate(time) {
      if (time - lastTime < 30) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
      const fontColors = isDark ? colorsDark : colorsLight;

      ctx.font = 'bold 15px "JetBrains Mono", "Fira Code", "Consolas", monospace';

      columns.forEach((col, idx) => {
        const snippet = codeTokens[col.snippetIndex];
        const visibleText = snippet.substring(0, Math.floor(col.charIndex));

        ctx.fillStyle = fontColors[idx % fontColors.length];
        ctx.globalAlpha = isDark ? col.opacity : col.opacity * 0.85;
        
        ctx.fillText(visibleText + (col.charIndex < snippet.length ? '█' : ''), col.x, col.y);

        col.charIndex += 0.5 + col.speed * 0.4;
        col.y += 0.5 * col.speed;

        if (col.charIndex >= snippet.length + 10) {
          col.charIndex = 0;
          col.snippetIndex = (col.snippetIndex + 1) % codeTokens.length;
          col.y += 28;
        }

        if (col.y > height + 40) {
          col.y = -30 - Math.random() * 50;
          col.charIndex = 0;
          col.snippetIndex = Math.floor(Math.random() * codeTokens.length);
        }
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodingBg);
  } else {
    initCodingBg();
  }
})();
