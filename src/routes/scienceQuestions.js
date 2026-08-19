<!DOCTYPE html>
<html lang="en" class="intro-lock">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SCICOMM — Scientific Rating Platform</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #070b1a;
    --surface: #0e1530;
    --surface2: #131c3a;
    --border: #1e2d5a;
    --text: #e8eaf6;
    --text-muted: #8892b0;
    --text-faint: #4a5580;
    --accent: #4fc3f7;
    --accent-light: #1a2a4a;
    --accent-dark: #0288d1;
    --gold: #ffd54f;
    --gold-light: #2a2010;
    --coral: #ff6b6b;
    --coral-light: #2a1010;
    --blue: #64b5f6;
    --blue-light: #0d1f3a;
    --purple: #ce93d8;
    --purple-light: #1a0d2a;
    --teal: #4db6ac;
    --teal-light: #0d2520;
    --radius: 12px;
    --radius-sm: 8px;
    --shadow: 0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

  /* NAV */
  nav {
    background: rgba(7,11,26,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(79,195,247,0.15);
    padding: 0.5rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    min-height: 64px; position: sticky; top: 0; z-index: 100; flex-wrap: wrap; row-gap: 8px;
  }
  .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
  .nav-logo {
    width: 42px; height: 42px; background: #fff; border-radius: 50%; padding: 5px;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    box-shadow: var(--shadow); flex-shrink: 0;
  }
  .nav-logo img { width: 100%; height: 100%; object-fit: contain; }
  .nav-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; color: var(--text); line-height: 1.25; }
  .nav-subtitle { font-size: 0.7rem; color: var(--accent); font-weight: 500; }
  .nav-links { display: flex; gap: 4px; align-items: center; flex: 1; justify-content: center; }
  .nav-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .nav-btn {
    padding: 8px 16px; border-radius: var(--radius-sm); font-size: 0.875rem;
    cursor: pointer; transition: all 0.15s; border: none; font-family: inherit;
    background: transparent; color: var(--text-muted);
  }
  .nav-btn:hover { background: var(--surface2); color: var(--text); }
  .nav-item { position: relative; display: inline-flex; }
  .nav-tooltip {
    position: absolute; top: 100%; left: 50%; transform: translateX(-50%) translateY(-4px);
    padding-top: 12px; min-width: 190px;
    opacity: 0; visibility: hidden; pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease; z-index: 80;
  }
  .nav-tooltip-panel {
    position: relative;
    background: rgba(10,16,38,0.98); border: 1px solid rgba(79,195,247,0.25); border-radius: 10px;
    padding: 10px 8px; box-shadow: 0 14px 34px rgba(0,0,0,0.55);
  }
  .nav-tooltip-panel::before {
    content: ''; position: absolute; top: -6px; left: 50%; transform: translateX(-50%) rotate(45deg);
    width: 10px; height: 10px; background: rgba(10,16,38,0.98);
    border-left: 1px solid rgba(79,195,247,0.25); border-top: 1px solid rgba(79,195,247,0.25);
  }
  .nav-item:hover .nav-tooltip { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); pointer-events: auto; }
  .nav-tooltip-title { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.07em; color: rgba(255,255,255,0.35); font-weight: 700; padding: 4px 10px 8px; }
  .nav-tooltip-item { display: block; width: 100%; text-align: left; background: none; border: none; font-family: inherit; font-size: 0.85rem; color: #e8f6ff; padding: 8px 10px; border-radius: 7px; cursor: pointer; transition: background 0.15s, color 0.15s; }
  .nav-tooltip-item:hover { background: rgba(79,195,247,0.12); color: #4fc3f7; }
  .nav-btn-dd { display: inline-flex; align-items: center; gap: 6px; }
  .nav-chevron { transition: transform 0.2s ease; flex-shrink: 0; transform: rotate(0deg); }
  .nav-item:hover .nav-chevron,
  .nav-btn-dd:active .nav-chevron,
  .nav-btn-dd.active .nav-chevron { transform: rotate(180deg); }
  .nav-btn.active { background: var(--surface2); color: var(--text); font-weight: 500; }
  .nav-btn.primary { background: linear-gradient(135deg, #4fc3f7, #1a237e); color: white; font-weight: 500; }
  .nav-btn.primary:hover { background: var(--accent-dark); }
  .nav-user { display: flex; align-items: center; gap: 8px; font-size: 0.875rem; color: var(--text-muted); flex-wrap: wrap; justify-content: flex-end; }
  .avatar {
    width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #4fc3f7, #1a237e);
    color: white; display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 600; cursor: pointer;
  }

  /* PAGES */
  .page { display: none; }
  .page.active { display: block; }

  /* HERO */
  .hero { padding: 5rem 2rem 4rem; max-width: 1100px; margin: 0 auto; text-align: center; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--accent-light); color: var(--accent-dark);
    border-radius: 999px; padding: 6px 14px; font-size: 0.8rem;
    font-weight: 500; margin-bottom: 1.5rem;
  }
  .hero-badge span { width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg, #4fc3f7, #1a237e); }
  h1 {
    font-family: 'Syne', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800; line-height: 1.1; margin-bottom: 1.25rem; letter-spacing: -0.02em;
  }
  h1 em { color: var(--accent); font-style: normal; }
  .hero p {
    font-size: 1.15rem; color: var(--text-muted); max-width: 560px;
    margin: 0 auto 2.5rem; line-height: 1.7; font-weight: 300;
  }
  .hero-cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-hero {
    padding: 14px 28px; border-radius: var(--radius); font-size: 1rem;
    font-weight: 500; cursor: pointer; border: none; font-family: inherit; transition: all 0.2s;
  }
  .btn-hero.solid { background: linear-gradient(135deg, #4fc3f7, #1a237e); color: white; }
  .btn-hero.solid:hover { background: var(--accent-dark); transform: translateY(-1px); box-shadow: var(--shadow-lg); }
  .btn-hero.outline { background: white; color: var(--text); border: 1px solid var(--border); }
  .btn-hero.outline:hover { border-color: var(--accent); color: var(--accent); }

  /* STATS BAR */
  .stats-bar {
    max-width: 1100px; margin: 0 auto 3rem; padding: 0 2rem;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;
  }
  .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem 1.5rem; box-shadow: var(--shadow); }
  .stat-num { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 700; color: var(--text); }
  .stat-label { font-size: 0.8rem; color: var(--text-muted); margin-top: 2px; font-weight: 300; }
  .stat-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }

  /* SECTION */
  .section { max-width: 1100px; margin: 0 auto; padding: 0 2rem 4rem; }
  .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; }
  .section-title { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 700; }
  .section-sub { font-size: 0.875rem; color: var(--text-muted); margin-top: 2px; }
  .view-all { font-size: 0.875rem; color: var(--accent); cursor: pointer; background: none; border: none; font-family: inherit; font-weight: 500; }
  .view-all:hover { text-decoration: underline; }

  /* CARDS GRID */
  .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem; overflow: visible; }
  .rating-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 1.5rem;
    box-shadow: var(--shadow); transition: all 0.2s; cursor: pointer; position: relative; overflow: visible;
  }
  .rating-card:hover { border-color: var(--accent); box-shadow: var(--shadow-lg); transform: translateY(-2px); }
  .card-type-bar { height: 3px; background: linear-gradient(135deg, #4fc3f7, #1a237e); border-radius: 999px; margin-bottom: 1rem; }
  .card-type-bar.curiosity { background: var(--gold); }
  .card-type-bar.attitude { background: var(--coral); }
  .card-type-bar.paper { background: var(--blue); }
  .card-type-bar.tool { background: var(--purple); }
  .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
  .card-tag {
    font-size: 0.7rem; font-weight: 600; padding: 3px 10px; border-radius: 999px;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
  .tag-curiosity { background: var(--gold-light); color: #8b6914; }
  .tag-attitude { background: var(--coral-light); color: #8b3322; }
  .tag-paper { background: var(--blue-light); color: #1a3d5c; }
  .tag-tool { background: var(--purple-light); color: #3a2e63; }
  .tag-general { background: var(--accent-light); color: var(--accent-dark); }
  .tag-school { background: var(--teal-light); color: var(--accent); }
  .tag-principal { background: var(--blue-light); color: var(--blue); }
  .card-stars { display: flex; gap: 2px; }
  .star { color: var(--gold); font-size: 14px; }
  .star.empty { color: var(--border); }
  .card-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; line-height: 1.3; }
  .card-meta { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem; }
  .card-desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; font-weight: 300; margin-bottom: 1rem; }
  .card-footer { display: flex; align-items: center; justify-content: space-between; }
  .card-author { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--text-muted); }
  .mini-avatar {
    width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #4fc3f7, #1a237e);
    color: white; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 600;
  }
  .card-votes { font-size: 0.75rem; color: var(--text-faint); }
  .rating-score { display: flex; flex-direction: column; align-items: center; background: var(--surface2); border-radius: var(--radius-sm); padding: 4px 10px; }
  .score-num { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--accent); }
  .score-label { font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

  /* FILTERS */
  .filter-bar { display: flex; gap: 8px; margin-bottom: 1.5rem; flex-wrap: wrap; }
  .filter-chip {
    padding: 7px 16px; border-radius: 999px; font-size: 0.85rem;
    cursor: pointer; border: 1px solid var(--border); background: var(--surface);
    color: var(--text-muted); transition: all 0.15s; font-family: inherit; font-weight: 400;
  }
  .filter-chip:hover { border-color: var(--accent); color: var(--accent); }
  .filter-chip.active { background: linear-gradient(135deg, #4fc3f7, #1a237e); color: white; border-color: var(--accent); font-weight: 500; }

  /* MODAL */
  .modal-overlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5);
    z-index: 200; align-items: center; justify-content: center; padding: 1rem;
  }
  .modal-overlay.open { display: flex; }
  .modal {
    background: var(--surface); border-radius: var(--radius); padding: 2rem;
    max-width: 560px; width: 100%; max-height: 90vh; overflow-y: auto;
    box-shadow: var(--shadow-lg); animation: slideUp 0.2s ease;
  }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
  .modal-title { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 700; }
  .modal-close {
    width: 32px; height: 32px; border-radius: var(--radius-sm); border: 1px solid var(--border);
    background: var(--surface); cursor: pointer; font-size: 1.1rem; display: flex;
    align-items: center; justify-content: center; color: var(--text-muted); transition: all 0.15s;
  }
  .modal-close:hover { background: var(--coral-light); color: var(--coral); border-color: var(--coral); }

  /* REGISTRATION TYPE MODAL */
  .reg-type-sub { color: var(--text-muted); font-size: 0.875rem; margin: -0.75rem 0 1.5rem; line-height: 1.5; }
  .reg-type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  .reg-type-card {
    background: var(--surface2); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 1.75rem 1.25rem; text-align: center; transition: border-color 0.15s, transform 0.15s;
  }
  .reg-type-card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .reg-type-icon {
    width: 56px; height: 56px; border-radius: 50%; background: var(--accent-light);
    display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 1rem;
  }
  .reg-type-card.school .reg-type-icon { background: var(--teal-light); }
  .reg-type-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.05rem; color: var(--text); margin-bottom: 0.5rem; }
  .reg-type-desc { font-size: 0.82rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 1.4rem; min-height: 58px; }
  .reg-type-btn {
    width: 100%; padding: 11px; background: linear-gradient(135deg, #4fc3f7, #1a237e); color: white;
    border: none; border-radius: var(--radius-sm); font-family: inherit; font-size: 0.9rem;
    font-weight: 500; cursor: pointer; transition: all 0.2s;
  }
  .reg-type-btn:hover { background: var(--accent-dark); }
  @media (max-width: 640px) { .reg-type-grid { grid-template-columns: 1fr; } }

  /* FORMS */
  .form-group { margin-bottom: 1.25rem; }
  label { font-size: 0.875rem; font-weight: 500; display: block; margin-bottom: 6px; color: var(--text); }
  input, textarea, select {
    width: 100%; padding: 10px 14px; border: 1px solid var(--border);
    border-radius: var(--radius-sm); font-family: inherit; font-size: 0.9rem;
    background: var(--surface); color: var(--text); transition: border-color 0.15s; outline: none;
  }
  input:focus, textarea:focus, select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(45,106,79,0.1); }
  textarea { resize: vertical; min-height: 100px; }
  .form-hint { font-size: 0.75rem; color: var(--text-faint); margin-top: 4px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* STAR RATING INPUT */
  .star-rating-input { display: flex; gap: 6px; }
  .star-input { font-size: 24px; cursor: pointer; color: var(--border); transition: color 0.1s; }
  .star-input.active, .star-input:hover, .star-input.hover { color: var(--gold); }

  /* TRAIT SLIDERS */
  .trait-row { margin-bottom: 1rem; }
  .trait-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
  .trait-name { font-size: 0.875rem; font-weight: 500; }
  .trait-val { font-size: 0.875rem; color: var(--accent); font-weight: 600; }
  input[type=range] { padding: 0; border: none; box-shadow: none; accent-color: var(--accent); }
  input[type=range]:focus { border: none; box-shadow: none; }

  /* SUBMIT BTN */
  .btn-submit {
    width: 100%; padding: 13px; background: linear-gradient(135deg, #4fc3f7, #1a237e); color: white;
    border: none; border-radius: var(--radius); font-family: inherit;
    font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.2s; margin-top: 0.5rem;
  }
  .btn-submit:hover { background: var(--accent-dark); }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  /* AUTH */
  .auth-wrap { max-width: 480px; margin: 5rem auto; padding: 0 2rem; }
  .auth-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 2.5rem; box-shadow: var(--shadow); }
  .auth-title { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
  .auth-sub { color: var(--text-muted); font-size: 0.9rem; font-weight: 300; margin-bottom: 2rem; }
  .auth-switch { text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--text-muted); }
  .auth-switch button { background: none; border: none; color: var(--accent); cursor: pointer; font-family: inherit; font-weight: 500; }

  /* ROLE SELECT — 3 columns for signup */
  .role-select { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 1.25rem; }
  .role-btn {
    padding: 12px 8px; border: 2px solid var(--border); border-radius: var(--radius-sm);
    cursor: pointer; background: var(--surface); text-align: center;
    transition: all 0.15s; font-family: inherit;
  }
  .role-btn.active { border-color: var(--accent); background: var(--accent-light); }
  .role-btn.active.school-role { border-color: var(--accent); background: var(--teal-light); }
  .role-icon { font-size: 1.5rem; display: block; margin-bottom: 4px; }
  .role-name { font-size: 0.8rem; font-weight: 500; color: var(--text); }
  .role-desc { font-size: 0.65rem; color: var(--text-muted); }

  /* SCHOOL BADGE */
  .school-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--teal-light); color: var(--accent);
    border-radius: 999px; padding: 3px 10px; font-size: 0.75rem; font-weight: 600;
  }

  /* PRINCIPAL DASHBOARD */
  .principal-dashboard { max-width: 1100px; margin: 0 auto; padding: 2rem; }
  .principal-header {
    background: linear-gradient(135deg, #0a1628 0%, #0d2044 50%, #0a1628 100%); border: 1px solid rgba(79,195,247,0.2);
    border-radius: var(--radius); padding: 2rem; color: white; margin-bottom: 2rem;
    display: flex; align-items: center; gap: 1.5rem;
  }
  .principal-header-icon { font-size: 3rem; }
  .principal-header-title { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; }
  .principal-header-sub { font-size: 0.9rem; opacity: 0.8; margin-top: 4px; }
  .school-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .school-stat-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 1.25rem; box-shadow: var(--shadow); text-align: center;
  }
  .school-stat-num { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: var(--accent); }
  .school-stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 300; margin-top: 4px; }

  /* DETAIL PAGE */
  .detail-hero { background: var(--surface); border-bottom: 1px solid var(--border); padding: 2.5rem 2rem; }
  .detail-inner { max-width: 1100px; margin: 0 auto; }
  .detail-tag { margin-bottom: 1rem; }
  .detail-title { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.2; }
  .detail-sub { color: var(--text-muted); font-weight: 300; margin-bottom: 1.5rem; }
  .detail-metrics { display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center; }
  .metric { display: flex; flex-direction: column; }
  .metric-val { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 700; }
  .metric-val.gold { color: var(--gold); }
  .metric-val.green { color: var(--accent); }
  .metric-label { font-size: 0.75rem; color: var(--text-muted); }

  /* TRAIT BARS */
  .trait-bar-wrap { margin-bottom: 0.75rem; }
  .trait-bar-header { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 0.85rem; }
  .trait-bar-track { height: 8px; background: var(--surface2); border-radius: 999px; overflow: hidden; }
  .trait-bar-fill { height: 100%; border-radius: 999px; background: linear-gradient(135deg, #4fc3f7, #1a237e); transition: width 0.6s ease; }
  .trait-bar-fill.gold { background: var(--gold); }
  .trait-bar-fill.coral { background: var(--coral); }
  .trait-bar-fill.blue { background: var(--blue); }
  .trait-bar-fill.purple { background: var(--purple); }

  /* REVIEWS */
  .review-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; margin-bottom: 0.75rem; }
  .review-header { display: flex; align-items: center; gap: 8px; margin-bottom: 0.75rem; }
  .review-author { font-weight: 500; font-size: 0.9rem; }
  .review-role { font-size: 0.75rem; color: var(--text-muted); }
  .review-date { font-size: 0.75rem; color: var(--text-faint); margin-left: auto; }
  .review-text { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; font-weight: 300; }

  /* LEADERBOARD */
  .leaderboard-row {
    display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); margin-bottom: 0.5rem; transition: all 0.15s; cursor: pointer;
  }
  .leaderboard-row:hover { border-color: var(--accent); }
  .rank-num { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800; color: var(--text-faint); min-width: 28px; text-align: center; }
  .rank-num.top3 { color: var(--gold); }
  .lb-name { font-weight: 500; flex: 1; }
  .lb-meta { font-size: 0.8rem; color: var(--text-muted); }
  .lb-score { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--accent); text-align: right; min-width: 50px; }

  /* ADMIN PANEL */
  .admin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .admin-stat { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; }
  .admin-stat-num { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; }
  .admin-stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 300; }
  .admin-table { width: 100%; border-collapse: collapse; background: var(--surface); border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); }
  .admin-table th { padding: 12px 16px; text-align: left; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); background: var(--surface2); }
  .admin-table td { padding: 12px 16px; font-size: 0.875rem; border-top: 1px solid var(--border); }
  .admin-table tr:hover td { background: var(--surface2); }
  .tbl-btn { padding: 4px 10px; border-radius: var(--radius-sm); border: 1px solid; cursor: pointer; font-size: 0.75rem; font-family: inherit; transition: all 0.15s; background: transparent; }
  .tbl-btn.danger { border-color: var(--coral); color: var(--coral); }
  .tbl-btn.danger:hover { background: var(--coral); color: white; }
  .tbl-btn.success { border-color: var(--accent); color: var(--accent); }
  .tbl-btn.success:hover { background: linear-gradient(135deg, #4fc3f7, #1a237e); color: white; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
    background: var(--text); color: white; padding: 12px 20px;
    border-radius: var(--radius); font-size: 0.875rem; font-weight: 500;
    box-shadow: var(--shadow-lg); transform: translateY(100px); opacity: 0;
    transition: all 0.3s; max-width: 300px;
  }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast.success { background: linear-gradient(135deg, #4fc3f7, #1a237e); }
  .toast.error { background: var(--coral); }

  /* FOOTER */
  footer { background: #030610; color: white; padding: 3rem 2rem; margin-top: 4rem; border-top: 1px solid rgba(79,195,247,0.15); }
  .footer-inner { max-width: 1100px; margin: 0 auto; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 2.5rem; }
  .footer-brand-name { font-family: 'Syne', sans-serif; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.75rem; color: white; }
  .footer-desc { font-size: 0.875rem; color: rgba(255,255,255,0.5); line-height: 1.7; font-weight: 300; }
  .footer-social { display: flex; gap: 12px; margin-top: 1.25rem; }
  .social-btn {
    width: 38px; height: 38px; border-radius: var(--radius-sm);
    border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center;
    justify-content: center; cursor: pointer; transition: all 0.2s;
    text-decoration: none; color: white; font-size: 0.85rem;
  }
  .social-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.3); }
  .footer-col-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.4); margin-bottom: 1rem; }
  .footer-link { display: block; color: rgba(255,255,255,0.6); font-size: 0.875rem; text-decoration: none; margin-bottom: 0.6rem; transition: color 0.15s; cursor: pointer; background: none; border: none; font-family: inherit; text-align: left; }
  .footer-link:hover { color: white; }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
  .footer-copy { font-size: 0.8rem; color: rgba(255,255,255,0.3); }

  /* TABS */
  .tab-bar { display: flex; gap: 4px; border-bottom: 1px solid var(--border); margin-bottom: 1.5rem; }
  .tab {
    padding: 10px 18px; cursor: pointer; font-size: 0.875rem; color: var(--text-muted);
    border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s;
    background: none; border-top: none; border-left: none; border-right: none;
    font-family: inherit; font-weight: 400;
  }
  .tab:hover { color: var(--text); }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 500; }

  /* SEARCH BAR */
  .search-wrap { position: relative; margin-bottom: 1.5rem; }
  .search-wrap input { padding-left: 42px; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 1rem; pointer-events: none; }

  /* EMPTY STATE */
  .empty-state { text-align: center; padding: 4rem 2rem; color: var(--text-muted); }
  .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
  .empty-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; color: var(--text); margin-bottom: 0.5rem; }

  /* SCHOOL INFO CARD */
  .info-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 1.25rem; margin-bottom: 1rem; display: flex; gap: 1rem; align-items: flex-start;
  }
  .info-card-icon { font-size: 1.5rem; flex-shrink: 0; }
  .info-card-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
  .info-card-value { font-size: 0.95rem; color: var(--text); margin-top: 2px; font-weight: 500; }




  /* RATING CARD HOVER POPUP */
  .rating-card { position: relative; }
  #card-tooltip {
    position: fixed; z-index: 99999;
    background: rgba(10,18,50,0.98);
    border: 1px solid rgba(79,195,247,0.45);
    border-radius: 14px; padding: 14px 16px;
    width: 270px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.8), 0 0 30px rgba(79,195,247,0.15);
    pointer-events: none; opacity: 0;
    transition: opacity 0.18s ease, transform 0.18s ease;
    transform: translateY(6px);
    font-family: 'DM Sans', sans-serif;
  }
  #card-tooltip.show { opacity: 1; transform: translateY(0); }
  #card-tooltip::after {
    content: ''; position: absolute; top: 100%; left: 50%;
    transform: translateX(-50%);
    border: 7px solid transparent;
    border-top-color: rgba(79,195,247,0.45);
  }
  .card-popup-title {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 0.85rem; color: #4fc3f7; margin-bottom: 8px;
    border-bottom: 1px solid rgba(79,195,247,0.15); padding-bottom: 6px;
  }
  .card-popup-row {
    display: flex; justify-content: space-between;
    font-size: 0.75rem; margin-bottom: 4px; align-items: center;
  }
  .card-popup-label { color: rgba(255,255,255,0.45); }
  .card-popup-val { color: rgba(255,255,255,0.9); font-weight: 600; }
  .card-popup-bar {
    height: 4px; border-radius: 999px;
    background: rgba(255,255,255,0.08); margin-top: 2px; overflow: hidden;
  }
  .card-popup-bar-fill {
    height: 100%; border-radius: 999px;
    background: linear-gradient(90deg, #4fc3f7, #0288d1);
  }

  /* DARK THEME CARD GLOW */
  .rating-card:hover { border-color: rgba(79,195,247,0.5); box-shadow: 0 0 30px rgba(79,195,247,0.12), 0 8px 32px rgba(0,0,0,0.4); }
  .stat-card:hover { border-color: rgba(79,195,247,0.4); box-shadow: 0 0 25px rgba(79,195,247,0.1), 0 8px 32px rgba(0,0,0,0.3); }
  .leaderboard-row:hover { border-color: rgba(79,195,247,0.4); box-shadow: 0 0 20px rgba(79,195,247,0.08); }
  .nav-btn.primary { background: linear-gradient(135deg, #4fc3f7, #0288d1); color: #070b1a; font-weight:700; }
  .nav-btn.primary:hover { background: linear-gradient(135deg, #81d4fa, #4fc3f7); }
  .filter-chip.active { background: linear-gradient(135deg, #4fc3f7, #0288d1); border-color: #4fc3f7; color: #070b1a; }
  .tab.active { color: #4fc3f7; border-bottom-color: #4fc3f7; }
  input:focus, textarea:focus, select:focus { border-color: #4fc3f7; box-shadow: 0 0 0 3px rgba(79,195,247,0.15); }
  .modal { background: #0e1530; }
  input, textarea, select { background: #070b1a; color: var(--text); border-color: var(--border); }
  .role-btn { background: #070b1a; border-color: var(--border); }
  .role-btn.active { border-color: #4fc3f7; background: rgba(79,195,247,0.1); }
  .auth-card { background: #0e1530; }
  .hero-badge { background: rgba(79,195,247,0.1); color: #4fc3f7; }
  h1 em { color: #4fc3f7; }
  .score-num { color: #4fc3f7; }
  .view-all { color: #4fc3f7; }
  .school-stat-num { color: #4fc3f7; }
  .lb-score { color: #4fc3f7; }
  .trait-val { color: #4fc3f7; }
  .trait-bar-fill { background: linear-gradient(90deg, #4fc3f7, #0288d1); }
  .metric-val.green { color: #4fc3f7; }
  /* Star glow */
  .star { color: #ffd54f; text-shadow: 0 0 8px rgba(255,213,79,0.5); }
  .star-input.active { color: #ffd54f; text-shadow: 0 0 10px rgba(255,213,79,0.6); }

  /* SCIENCE CANVAS */
  #sci-canvas {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 0; opacity: 0.4;
  }

  /* FLOATING SCIENCE ICONS */
  .sci-float {
    position: fixed; font-size: 1.8rem; pointer-events: none; z-index: 0;
    opacity: 0; animation: sciFloat linear infinite;
  }
  @keyframes sciFloat {
    0%   { transform: translateY(105vh) rotate(0deg) scale(0.8); opacity: 0; }
    8%   { opacity: 0.2; }
    92%  { opacity: 0.2; }
    100% { transform: translateY(-5vh) rotate(360deg) scale(1.1); opacity: 0; }
  }

  /* SCROLL REVEAL */
  .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* HERO GRADIENT */
  .hero::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at 15% 60%, rgba(26,35,126,0.07) 0%, transparent 55%),
                radial-gradient(ellipse at 85% 20%, rgba(26,35,126,0.05) 0%, transparent 50%);
  }
  .hero { position: relative; overflow: hidden; }

  /* DNA STRIP */
  .dna-strip { width: 100%; overflow: hidden; height: 56px; opacity: 0.13; pointer-events: none; margin: -1rem 0 0; }
  .dna-strip svg { width: 200%; animation: dnaScroll 10s linear infinite; display: block; }
  @keyframes dnaScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ATOM SPIN */
  .atom-deco { position: absolute; pointer-events: none; animation: atomSpin 18s linear infinite; }
  @keyframes atomSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  /* SCICOMM LOGO MARK GLOW */
  .scicomm-logo-wrap { animation: scicommLogoPulse 4.5s ease-in-out infinite; }
  @keyframes scicommLogoPulse {
    0%, 100% { filter: drop-shadow(0 0 10px rgba(79,195,247,0.32)); transform: scale(1); }
    50% { filter: drop-shadow(0 0 28px rgba(79,195,247,0.6)); transform: scale(1.035); }
  }

  /* STAT CARDS */
  .stat-card { transition: all 0.3s; }
  .stat-card:hover { transform: translateY(-5px); box-shadow: 0 8px 32px rgba(26,35,126,0.13); border-color: var(--accent); }

  /* SECTION REVEAL DIVIDER */
  .sci-divider { text-align: center; padding: 0.5rem 0 1.5rem; opacity: 0.13; font-size: 1.4rem; letter-spacing: 1.2rem; pointer-events: none; }

  /* ===================== MOBILE RESPONSIVE ===================== */

  /* Hamburger menu */
  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    cursor: pointer; padding: 6px; background: none; border: none;
    z-index: 201;
  }
  .hamburger span {
    display: block; width: 24px; height: 2px;
    background: var(--text); border-radius: 2px;
    transition: all 0.3s;
  }
  .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

  /* Mobile nav drawer */
  .mobile-nav-drawer {
    display: none; position: fixed; top: 64px; left: 0; right: 0; bottom: 0;
    background: rgba(7,11,26,0.98); backdrop-filter: blur(16px);
    z-index: 200; flex-direction: column; padding: 2rem 1.5rem;
    gap: 4px; overflow-y: auto;
    border-top: 1px solid rgba(79,195,247,0.15);
  }
  .mobile-nav-drawer.open { display: flex; }
  .mobile-nav-drawer .nav-btn {
    width: 100%; text-align: left; padding: 14px 16px;
    font-size: 1rem; border-radius: 10px;
    border-bottom: 1px solid rgba(79,195,247,0.06);
    color: rgba(255,255,255,0.7);
  }
  .mobile-nav-drawer .nav-btn:hover { background: rgba(79,195,247,0.08); color: #4fc3f7; }
  .mobile-nav-drawer .nav-btn.primary {
    margin-top: 1rem; text-align: center; padding: 14px;
    background: linear-gradient(135deg,#4fc3f7,#0288d1); color: #070b1a;
  }
  .mobile-nav-divider { height: 1px; background: rgba(79,195,247,0.1); margin: 0.5rem 0; }

  @media (max-width: 768px) {
    /* NAV */
    nav { padding: 0 1rem; height: 58px; }
    #nav-links { display: none !important; }
    #user-nav { display: none !important; }
    #nav-actions { display: none !important; }
    .hamburger { display: flex !important; }
    .nav-title { font-size: 0.95rem; }

    /* HERO */
    .hero { padding: 2rem 1rem 2rem !important; min-height: auto !important; }
    .hero h1 { font-size: clamp(1.6rem,7vw,2.4rem) !important; }
    .hero p { font-size: 0.9rem !important; }
    .hero-cta { flex-direction: column; align-items: center; gap: 10px; }
    .btn-hero { width: 100%; max-width: 280px; padding: 13px 20px !important; font-size:0.9rem !important; }

    /* HERO IMAGE STRIP */
    .sci-img-wrap { width: 60px !important; height: 60px !important; }

    /* STATS BAR */
    .stats-bar { grid-template-columns: 1fr 1fr; gap: 0.75rem; padding: 0 1rem; margin-bottom: 1.5rem; }
    .stat-num { font-size: 1.5rem; }

    /* SECTIONS */
    .section { padding: 0 1rem 2rem; }
    .section-header { flex-direction: column; align-items: flex-start; gap: 8px; }

    /* CARDS */
    .cards-grid { grid-template-columns: 1fr; gap: 0.75rem; }
    .rating-card { padding: 1.1rem; }

    /* DETAIL PAGE */
    #detail-content { grid-template-columns: 1fr !important; }
    .detail-hero { padding: 1.5rem 1rem; }
    .detail-title { font-size: 1.4rem; }
    .detail-metrics { gap: 0.75rem; flex-wrap: wrap; }
    .metric-val { font-size: 1.1rem; }

    /* LEADERBOARD */
    .leaderboard-row { padding: 0.85rem 1rem; gap: 0.75rem; }
    .lb-score { font-size: 1rem; }

    /* AUTH */
    .auth-wrap { margin: 2rem auto; padding: 0 1rem; }
    .auth-card { padding: 1.5rem; }
    .role-select { grid-template-columns: 1fr; gap: 8px; }
    .role-btn { padding: 10px; display: flex; align-items: center; gap: 10px; text-align: left; }
    .role-icon { font-size: 1.2rem; margin-bottom: 0 !important; }

    /* FORMS */
    .form-row { grid-template-columns: 1fr; gap: 0; }
    .modal { padding: 1.25rem; margin: 0.5rem; border-radius: 14px; }
    .modal-title { font-size: 1rem; }

    /* ABOUT PAGE */
    #page-about > div { padding: 2rem 1rem; }
    #page-about h1 { font-size: 1.8rem !important; }
    #page-about [style*="grid-template-columns:1fr 1fr"] { grid-template-columns: 1fr !important; }

    /* EXAM PAGE */
    .principal-dashboard { padding: 1.5rem 1rem; }
    .principal-header { flex-direction: column; gap: 0.75rem; padding: 1.25rem; }
    .principal-header-title { font-size: 1.1rem; }
    .school-stat-grid { grid-template-columns: 1fr 1fr; }

    /* FOOTER */
    .footer-top { grid-template-columns: 1fr; gap: 1.5rem; }
    .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
    footer { padding: 2rem 1rem; }

    /* EXAM MODAL */
    .exam-modal { max-width: 100% !important; }
    .q-option { padding: 8px 10px; font-size: 0.82rem; }

    /* DNA STRIP */
    .dna-strip { display: none; }

    /* ADMIN TABLE */
    .admin-table { font-size: 0.75rem; }
    .admin-table th, .admin-table td { padding: 8px 10px; }

    /* PROFILE */
    #page-profile .section { padding-top: 1.5rem; }

    /* TABS */
    .tab { padding: 8px 12px; font-size: 0.8rem; }
    .tab-bar { overflow-x: auto; -webkit-overflow-scrolling: touch; }

    /* FILTER BAR */
    .filter-bar { overflow-x: auto; -webkit-overflow-scrolling: touch; flex-wrap: nowrap; padding-bottom: 4px; }
    .filter-chip { white-space: nowrap; flex-shrink: 0; }

    /* SEARCH */
    .search-wrap input { font-size: 0.9rem; }
  }

  @media (max-width: 400px) {
    .stats-bar { grid-template-columns: 1fr; }
    .school-stat-grid { grid-template-columns: 1fr; }
    h1 { font-size: 1.5rem !important; }
  }

  /* ===================== INTRO LOADER ===================== */
  html.intro-lock, html.intro-lock body { overflow: hidden !important; height: 100%; }

  #intro-loader {
    position: fixed; inset: 0; z-index: 999999;
    display: flex; align-items: center; justify-content: center;
    background:
      radial-gradient(circle at 50% 42%, rgba(79,195,247,0.14), transparent 60%),
      var(--bg);
    overflow: hidden;
    animation: introOverlayOut 0.45s ease forwards;
    animation-delay: 1.55s;
  }
  #intro-loader::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(79,195,247,0.10), transparent 65%);
    opacity: 0; animation: introGlow 1.1s ease forwards;
    animation-delay: 0.05s;
  }
  #intro-loader.intro-done { display: none; }

  .intro-stage {
    position: relative; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    width: 100%; height: 100%;
  }

  .intro-logo-circle {
    position: relative; z-index: 3;
    width: 96px; height: 96px; border-radius: 50%;
    background: #fff; padding: 10px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 40px rgba(79,195,247,0.35), 0 0 0 1px rgba(79,195,247,0.15);
    opacity: 0; transform: scale(0.25) rotate(-14deg);
    animation: introLogoPop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards,
               introLogoRise 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.05s, 0.55s;
  }
  .intro-logo-circle img { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }

  .intro-text-wrap {
    position: absolute; left: 50%; top: 50%; z-index: 1;
    transform: translate(-50%, -50%) scale(0.5);
    display: flex; flex-direction: column; align-items: center;
    opacity: 0;
    animation: introTextReveal 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: 0.5s;
  }
  .intro-brand-name {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 2.1rem; letter-spacing: 0.06em;
    color: var(--text);
    text-shadow: 0 0 24px rgba(79,195,247,0.35);
  }
  .intro-brand-name em {
    color: var(--accent); font-style: normal;
  }
  .intro-brand-tag {
    margin-top: 6px; font-size: 0.78rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--text-muted); font-weight: 500;
    opacity: 0; animation: introFadeUp 0.5s ease forwards; animation-delay: 0.85s;
  }

  .intro-ring {
    position: absolute; z-index: 2; width: 96px; height: 96px; border-radius: 50%;
    border: 1.5px solid rgba(79,195,247,0.5);
    opacity: 0; transform: scale(0.7);
    animation: introRingPulse 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: 0.55s;
  }

  @keyframes introLogoPop {
    0% { opacity: 0; transform: scale(0.25) rotate(-14deg); }
    60% { opacity: 1; transform: scale(1.12) rotate(3deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes introLogoRise {
    0% { transform: translateY(0) scale(1); }
    100% { transform: translateY(-42px) scale(0.82); }
  }
  @keyframes introTextReveal {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    100% { opacity: 1; transform: translate(-50%, 40px) scale(1); }
  }
  @keyframes introFadeUp {
    0% { opacity: 0; transform: translateY(6px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes introRingPulse {
    0% { opacity: 0.9; transform: scale(0.7); }
    70% { opacity: 0; transform: scale(2.6); }
    100% { opacity: 0; transform: scale(2.6); }
  }
  @keyframes introGlow {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes introOverlayOut {
    0% { opacity: 1; visibility: visible; }
    100% { opacity: 0; visibility: hidden; transform: scale(1.03); }
  }

  @media (prefers-reduced-motion: reduce) {
    #intro-loader, .intro-logo-circle, .intro-text-wrap, .intro-brand-tag, .intro-ring {
      animation: none !important;
    }
    #intro-loader { display: none !important; }
  }
  /* =================== /INTRO LOADER ======================= */

  /* =================== SCIENCE QUESTION GENERATOR =================== */
  .sq-toolbar { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:1.25rem; }
  .sq-count { font-size:0.875rem; color:var(--text-muted); }
  .sq-btn { border:none; border-radius:8px; padding:9px 18px; font-weight:700; font-size:0.85rem; cursor:pointer; font-family:inherit; transition:transform .15s; }
  .sq-btn:hover { transform:translateY(-1px); }
  .sq-btn-primary { background:linear-gradient(135deg,#4fc3f7,#0288d1); color:#070b1a; }
  .sq-btn-gold { background:linear-gradient(135deg,#ffd54f,#ff9d2f); color:#241800; }
  .sq-btn-ghost { background:rgba(79,195,247,0.1); border:1px solid rgba(79,195,247,0.3); color:#4fc3f7; }
  .sq-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:1rem; }
  .sq-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:1rem; display:flex; flex-direction:column; gap:0.75rem; transition:border-color .2s, transform .2s; }
  .sq-card:hover { border-color:rgba(79,195,247,0.4); transform:translateY(-2px); }
  .sq-card-anim { height:110px; border-radius:10px; background:radial-gradient(circle at 50% 40%, rgba(79,195,247,0.09), rgba(0,0,0,0)); display:flex; align-items:center; justify-content:center; overflow:hidden; }
  .sq-card-anim svg { width:100%; height:100%; }
  .sq-illustration-img-wrap { width:100%; height:100%; background:#fff; border-radius:10px; display:flex; align-items:center; justify-content:center; overflow:hidden; }
  .sq-illustration-img-wrap img { width:100%; height:100%; object-fit:contain; display:block; }
  .sq-card-text { font-size:0.9rem; font-weight:500; line-height:1.4; min-height:2.6em; }
  .sq-card-actions { display:flex; gap:6px; margin-top:auto; }
  .sq-card-actions .tbl-btn { flex:1; text-align:center; }

  .sq-player-overlay { display:none; position:fixed; inset:0; background:rgba(4,7,18,0.94); z-index:300; align-items:center; justify-content:center; padding:1.25rem; }
  .sq-player-overlay.open { display:flex; }
  .sq-player { width:100%; max-width:1080px; max-height:92vh; overflow-y:auto; background:linear-gradient(180deg,#0e1530,#070b1a); border:1px solid rgba(79,195,247,0.25); border-radius:20px; padding:1.75rem; box-shadow:var(--shadow-lg); animation:slideUp .25s ease; }
  .sq-player-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; }
  .sq-player-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.15rem; }
  .sq-player-close { background:none; border:1px solid rgba(255,255,255,0.2); color:var(--text); border-radius:8px; width:34px; height:34px; cursor:pointer; font-size:1rem; }
  .sq-page-grid { display:block; }
  /* Single-question layout: statement + 5-point options on the left,
     black & white illustration on the right. */
  .sq-qcard-single { background:rgba(255,255,255,0.02); border:1px solid rgba(79,195,247,0.15); border-radius:16px; padding:1.75rem; display:grid; grid-template-columns:1.15fr 1fr; gap:2rem; align-items:center; min-height:400px; }
  @media (max-width:760px){ .sq-qcard-single { grid-template-columns:1fr; padding:1.25rem; } }
  .sq-qcard-left { display:flex; flex-direction:column; }
  .sq-qcard-right { width:100%; height:100%; min-height:220px; display:flex; align-items:center; justify-content:center; }
  .sq-qcard-right .sq-illustration-img-wrap { max-width:340px; max-height:320px; margin:0 auto; }
  .sq-qcard-num { font-size:0.7rem; letter-spacing:0.08em; text-transform:uppercase; color:#4fc3f7; font-weight:700; margin-bottom:0.6rem; }
  .sq-qcard-text-single { font-family:'Syne',sans-serif; font-weight:700; font-size:1.3rem; line-height:1.5; margin-bottom:1.5rem; }
  .sq-opts-single { display:flex; flex-direction:column; gap:10px; width:100%; }
  .sq-opt { border-radius:10px; padding:10px 8px; font-size:0.8rem; font-weight:600; cursor:pointer; font-family:inherit; border:1px solid; background:rgba(255,255,255,0.03); color:var(--text); transition:all .15s; }
  .sq-opts-single .sq-opt { text-align:left; padding:14px 18px; font-size:0.95rem; }
  .sq-opt[data-v="1"] { border-color:rgba(79,195,247,0.4); }
  .sq-opt[data-v="2"] { border-color:rgba(77,182,172,0.4); }
  .sq-opt[data-v="3"] { border-color:rgba(255,213,79,0.4); }
  .sq-opt[data-v="4"] { border-color:rgba(255,152,0,0.45); }
  .sq-opt[data-v="5"] { border-color:rgba(255,107,107,0.4); }
  .sq-opt:hover { transform:translateY(-2px); }
  .sq-opt.selected[data-v="1"] { background:rgba(79,195,247,0.22); color:#4fc3f7; }
  .sq-opt.selected[data-v="2"] { background:rgba(77,182,172,0.22); color:#4db6ac; }
  .sq-opt.selected[data-v="3"] { background:rgba(255,213,79,0.22); color:#ffd54f; }
  .sq-opt.selected[data-v="4"] { background:rgba(255,152,0,0.22); color:#ff9800; }
  .sq-opt.selected[data-v="5"] { background:rgba(255,107,107,0.22); color:#ff6b6b; }
  .sq-player-nav { display:flex; justify-content:space-between; align-items:center; margin-top:1.5rem; }
  .sq-page-dots { display:flex; gap:6px; }
  .sq-page-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.18); }
  .sq-page-dot.active { background:#4fc3f7; width:20px; border-radius:4px; }

  .sq-thankyou { display:none; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:3rem 1rem; min-height:360px; }
  .sq-thankyou.show { display:flex; }
  .sq-thankyou-icon { width:76px; height:76px; border-radius:50%; background:rgba(79,195,247,0.14); border:1px solid rgba(79,195,247,0.35); display:flex; align-items:center; justify-content:center; font-size:2.1rem; margin-bottom:1.25rem; }
  .sq-thankyou-title { font-family:'Syne',sans-serif; font-weight:800; font-size:1.4rem; margin-bottom:0.6rem; }
  .sq-thankyou-msg { color:rgba(255,255,255,0.55); font-size:0.9rem; max-width:420px; line-height:1.6; margin-bottom:1.75rem; }

  .sq-rocket-stage { display:flex; align-items:center; justify-content:center; height:110px; }
  .sq-rocket-emoji { font-size:3.5rem; animation: sq-rocket-float 1.8s ease-in-out infinite; filter: drop-shadow(0 8px 14px rgba(79,195,247,0.35)); }
  @keyframes sq-rocket-float {
    0%, 100% { transform: translateY(0) rotate(-8deg); }
    50% { transform: translateY(-18px) rotate(-8deg); }
  }

  @keyframes sqOrbit { from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
  @keyframes sqOrbitRev { from{ transform:rotate(360deg); } to{ transform:rotate(0deg); } }
  @keyframes sqGrowStem { 0%{ transform:scaleY(0); } 100%{ transform:scaleY(1); } }
  @keyframes sqLeafPop { 0%,60%{ opacity:0; transform:scale(0.3); } 100%{ opacity:1; transform:scale(1); } }
  @keyframes sqDrop { 0%{ transform:translateY(0); opacity:0; } 20%{ opacity:1; } 100%{ transform:translateY(55px); opacity:0; } }
  @keyframes sqRipple { 0%{ transform:scale(0.3); opacity:0.9; } 100%{ transform:scale(1.8); opacity:0; } }
  @keyframes sqBubble { 0%{ transform:translateY(0) scale(0.6); opacity:0.9; } 100%{ transform:translateY(-46px) scale(1.1); opacity:0; } }
  @keyframes sqSway { 0%,100%{ transform:rotate(-24deg); } 50%{ transform:rotate(24deg); } }
  @keyframes sqFlicker { 0%,19%,21%,50%,53%,100%{ opacity:1; } 20%,52%{ opacity:0.25; } }
  .sq-anim-atom-nucleus { animation: hcPulseScale 2.2s ease-in-out infinite; }
  .sq-anim-orbit1 { transform-origin:100px 100px; animation: sqOrbit 4s linear infinite; }
  .sq-anim-orbit2 { transform-origin:100px 100px; animation: sqOrbitRev 6s linear infinite; }
  .sq-anim-orbit3 { transform-origin:100px 100px; animation: sqOrbit 8s linear infinite; }
  .sq-anim-stem { transform-origin:bottom center; animation: sqGrowStem 2.4s ease-out infinite alternate; }
  .sq-anim-leaf { animation: sqLeafPop 2.4s ease-out infinite alternate; }
  .sq-anim-drop { animation: sqDrop 1.6s linear infinite; }
  .sq-anim-ripple { transform-origin:center; animation: sqRipple 2.2s ease-out infinite; }
  .sq-anim-bubble { animation: sqBubble 2.2s ease-in infinite; }
  .sq-anim-pendulum { transform-origin:100px 30px; animation: sqSway 2.4s ease-in-out infinite; }
  .sq-anim-bolt { animation: sqFlicker 3s linear infinite; }
  /* =================== /SCIENCE QUESTION GENERATOR =================== */
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
</head>
<body>

<!-- INTRO LOADER -->
<div id="intro-loader" aria-hidden="true">
  <div class="intro-stage">
    <div class="intro-ring"></div>
    <div class="intro-logo-circle">
      <img id="intro-logo-img" src="" alt="">
    </div>
    <div class="intro-text-wrap">
      <div class="intro-brand-name">SCI<em>COMM</em></div>
    </div>
  </div>
</div>

<div id="card-tooltip" style="position:fixed;z-index:999999;background:rgba(10,18,50,0.98);border:1px solid rgba(79,195,247,0.45);border-radius:14px;padding:14px 16px;width:270px;box-shadow:0 8px 40px rgba(0,0,0,0.8),0 0 30px rgba(79,195,247,0.15);pointer-events:none;opacity:0;transition:opacity 0.2s ease;font-family:DM Sans,sans-serif;display:none;"></div>

<!-- SCIENCE BACKGROUND CANVAS -->
<canvas id="sci-canvas"></canvas>

<!-- FLOATING SCIENCE EMOJIS -->
<div id="sci-floats"></div>


<!-- NAV -->
<div style="background:linear-gradient(90deg,#0a0f24,#0e1530 50%,#0a0f24);border-bottom:1px solid rgba(79,195,247,0.15);display:flex;align-items:center;justify-content:center;gap:10px;padding:8px 16px;font-size:0.8rem;color:var(--text-muted);text-align:center;">
  <span style="width:5px;height:5px;border-radius:50%;background:#4fc3f7;box-shadow:0 0 6px #4fc3f7;flex-shrink:0;"></span>
  Welcome to <strong style="color:#ffd54f;font-weight:600;">SciComm</strong>&nbsp;— building the next generation of scientific thinkers
</div>
<nav>
  <a class="nav-brand" id="nav-brand" onclick="showPage('home')" style="cursor:pointer; text-decoration:none;">
    <div class="nav-logo"><img src="data:image/png;base64,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" id="brand-logo-img" alt="SCICOMM"></div>
    <div>
      <div class="nav-title">SCICOMM</div>
    </div>
  </a>
  <div class="nav-links" id="nav-links">
    <button class="nav-btn active" onclick="showPage('home'); setActive(this)">Home</button>
    <div class="nav-item">
      <button class="nav-btn nav-btn-dd" onclick="showPage('about'); setActive(this)">
        About Us
        <svg class="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="nav-tooltip">
        <div class="nav-tooltip-panel">
        <div class="nav-tooltip-title">Inside About Us</div>
        <button class="nav-tooltip-item" onclick="showPage('about-story')">Our Story</button>
        <button class="nav-tooltip-item" onclick="showPage('about-whatwedo')">What We Do</button>
        <button class="nav-tooltip-item" onclick="showPage('about-mission')">Mission &amp; Vision</button>
        <button class="nav-tooltip-item" onclick="showPage('about-why')">Why Choose SciComm?</button>
        <button class="nav-tooltip-item" onclick="showPage('about-commitment')">Our Commitment</button>
      </div>
      </div>
    </div>
    <button class="nav-btn" onclick="showPage('teams'); setActive(this)">Team</button>
    <div class="nav-item">
      <button class="nav-btn nav-btn-dd" onclick="showPage('brochure'); setActive(this)">
        Brochure
        <svg class="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="nav-tooltip">
        <div class="nav-tooltip-panel">
        <div class="nav-tooltip-title">Inside Brochure</div>
        <button class="nav-tooltip-item" onclick="showPage('brochure')">Program Overview</button>
      </div>
      </div>
    </div>
    <div class="nav-item">
      <button class="nav-btn nav-btn-dd" onclick="showPage('client'); setActive(this)">
        Client
        <svg class="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="nav-tooltip">
        <div class="nav-tooltip-panel">
        <div class="nav-tooltip-title">Inside Client</div>
        <button class="nav-tooltip-item" onclick="showPage('client')">List of Clients</button>
      </div>
      </div>
    </div>
    <div class="nav-item">
      <button class="nav-btn nav-btn-dd" onclick="showPage('archive'); setActive(this)">
        Archive
        <svg class="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="nav-tooltip">
        <div class="nav-tooltip-panel">
        <div class="nav-tooltip-title">Inside Archive</div>
        <button class="nav-tooltip-item" onclick="showPage('archive')">Previous Data</button>
      </div>
      </div>
    </div>
    <button class="nav-btn" onclick="showPage('contact'); setActive(this)">Contact Us</button>
  </div>
  <div class="nav-actions" id="nav-actions">
    <button class="nav-btn primary" id="nav-signin-btn" onclick="showPage('auth')">Sign In</button>
    <div id="user-nav" style="display:none;" class="nav-user">
      <div class="avatar" id="user-avatar" onclick="showPage('profile')"></div>
      <span id="user-name-nav"></span>
      <button class="nav-btn" onclick="logout()">Sign out</button>
    </div>
  </div>
  <!-- HAMBURGER (mobile only) -->
  <button class="hamburger" id="hamburger-btn" onclick="toggleMobileNav()" style="display:none;">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- GLOBAL BACK BUTTON — lets people return to the previous page from anywhere, not just Home -->
<button id="global-back-btn" onclick="goBack()" style="display:none;position:sticky;top:8px;left:8px;z-index:90;align-items:center;gap:6px;margin:10px 0 0 16px;background:rgba(14,21,48,0.92);border:1px solid rgba(79,195,247,0.3);border-radius:8px;padding:8px 14px;color:#4fc3f7;font-family:inherit;font-size:0.85rem;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.35);">← Back</button>

<!-- MOBILE NAV DRAWER -->
<div class="mobile-nav-drawer" id="mobile-nav-drawer">
  <button class="nav-btn" onclick="mobileNav('home')">🏠 Home</button>
  <button class="nav-btn" onclick="mobileNav('about')">ℹ️ About Us</button>
  <button class="nav-btn" onclick="mobileNav('teams')">👥 Team</button>
  <button class="nav-btn" onclick="mobileNav('brochure')">Brochure</button>
  <button class="nav-btn" onclick="mobileNav('client')">Client</button>
  <button class="nav-btn" onclick="mobileNav('archive')">Archive</button>
  <button class="nav-btn" onclick="mobileNav('contact')">Contact Us</button>
  <div class="mobile-nav-divider"></div>
  <div id="mobile-nav-user"></div>
</div>

<!-- TOAST -->
<div class="toast" id="toast"></div>

<!-- HOME PAGE -->
<div class="page active" id="page-home">
  <!-- HERO CAROUSEL: The Scientific Mindset -->
  <style>
    .hc-wrap { position:relative; width:100%; max-width:1900px; margin:0 auto; height:640px; overflow:hidden; background:var(--bg); }
    @media (max-width:980px){ .hc-wrap{ height:780px; } }
    @media (max-width:640px){ .hc-wrap{ height:860px; } }
    .hc-bubbles { position:absolute; inset:0; pointer-events:none; z-index:1; overflow:hidden; }
    .hc-bubble { position:absolute; border-radius:50%; opacity:0.35; background:radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), rgba(255,255,255,0.02)); animation: hcFloatUp linear infinite; }
    @keyframes hcFloatUp { 0%{transform:translateY(20px) translateX(0) scale(1);} 50%{transform:translateY(-30px) translateX(14px) scale(1.05);} 100%{transform:translateY(20px) translateX(0) scale(1);} }
    .hc-slide { position:absolute; inset:0; display:flex; align-items:center; padding:0 6vw; opacity:0; visibility:hidden; transform:scale(1.03); transition:opacity 1.1s cubic-bezier(.4,0,.2,1), transform 1.4s cubic-bezier(.4,0,.2,1), visibility 0s linear 1.1s; z-index:2; }
    .hc-slide.active { opacity:1; visibility:visible; transform:scale(1); transition:opacity 1.1s cubic-bezier(.4,0,.2,1), transform 1.4s cubic-bezier(.4,0,.2,1); z-index:3; }
    .hc-inner { position:relative; z-index:4; max-width:1900px; margin:0 auto; width:100%; display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:3vw; }
    @media (max-width:980px){ .hc-inner{ grid-template-columns:1fr; text-align:center; gap:1.5rem; } }
    .hc-text { max-width:620px; }
    @media (max-width:980px){ .hc-text{ max-width:100%; margin:0 auto; } }
    .hc-eyebrow { display:inline-flex; align-items:center; gap:8px; border-radius:999px; padding:6px 16px; font-size:0.78rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:1.3rem; border:1px solid var(--tc); color:var(--tc); background:var(--tg); opacity:0; transform:translateY(14px); }
    .hc-title { font-family:'Syne',sans-serif; font-weight:800; line-height:1.06; font-size:clamp(2.2rem,4.2vw,3.9rem); letter-spacing:-0.02em; margin-bottom:1.1rem; color:#fff; opacity:0; transform:translateY(18px); }
    .hc-title em { font-style:normal; color:var(--tc); }
    .hc-desc { font-size:1.05rem; color:var(--text-muted); line-height:1.75; font-weight:300; margin-bottom:1.9rem; max-width:540px; opacity:0; transform:translateY(18px); }
    @media (max-width:980px){ .hc-desc{ margin:0 auto 1.9rem; } }
    .hc-cta { display:flex; gap:12px; flex-wrap:wrap; opacity:0; transform:translateY(18px); }
    @media (max-width:980px){ .hc-cta{ justify-content:center; } }
    .hc-btn-primary { padding:13px 28px; border-radius:999px; font-weight:600; font-size:0.92rem; border:none; cursor:pointer; font-family:inherit; color:#071018; background:var(--tc); box-shadow:0 6px 24px var(--tg); transition:transform .2s; }
    .hc-btn-primary:hover { transform:translateY(-2px); }
    .hc-btn-ghost { padding:13px 24px; border-radius:999px; font-weight:500; font-size:0.92rem; border:1px solid rgba(255,255,255,0.25); cursor:pointer; font-family:inherit; color:#fff; background:rgba(255,255,255,0.04); transition:all .2s; }
    .hc-btn-ghost:hover { background:rgba(255,255,255,0.1); }
    .hc-slide.active .hc-eyebrow { animation: hcRise .7s .25s cubic-bezier(.2,.7,.2,1) forwards; }
    .hc-slide.active .hc-title   { animation: hcRise .8s .40s cubic-bezier(.2,.7,.2,1) forwards; }
    .hc-slide.active .hc-desc    { animation: hcRise .8s .55s cubic-bezier(.2,.7,.2,1) forwards; }
    .hc-slide.active .hc-cta     { animation: hcRise .8s .70s cubic-bezier(.2,.7,.2,1) forwards; }
    @keyframes hcRise { to { opacity:1; transform:translateY(0); } }
    .hc-visual { position:relative; display:flex; align-items:center; justify-content:center; height:100%; }
    .hc-visual svg { width:min(400px,90%); height:auto; filter:drop-shadow(0 20px 50px rgba(0,0,0,0.45)); }
    @media (max-width:980px){ .hc-visual{ height:300px; } }
    .hc-index { position:absolute; top:24px; right:6vw; z-index:5; font-family:'Syne',sans-serif; font-weight:800; font-size:0.82rem; color:var(--text-faint); letter-spacing:0.08em; display:flex; align-items:center; gap:6px; }
    .hc-index .cur { color:var(--tc); font-size:1.05rem; }
    .hc-arrow { position:absolute; top:50%; transform:translateY(-50%); width:44px; height:44px; border-radius:50%; background:rgba(14,21,48,0.75); border:1px solid rgba(79,195,247,0.25); display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--text); z-index:20; transition:all 0.2s; backdrop-filter:blur(6px); }
    .hc-arrow:hover { background:rgba(79,195,247,0.18); border-color:var(--accent); }
    .hc-arrow.prev { left:20px; } .hc-arrow.next { right:20px; }
    @media (max-width:640px){ .hc-arrow{ width:36px; height:36px; } .hc-arrow.prev{left:8px;} .hc-arrow.next{right:8px;} }
    .hc-dots { position:absolute; bottom:24px; left:0; right:0; z-index:20; display:flex; align-items:center; justify-content:center; gap:10px; }
    .hc-dot { width:32px; height:5px; border-radius:999px; background:rgba(255,255,255,0.18); cursor:pointer; overflow:hidden; position:relative; transition:background .3s; }
    .hc-dot .fill { position:absolute; inset:0; width:0%; background:var(--accent); border-radius:999px; }
    .hc-dot.active .fill { animation: hcFillDot 5s linear forwards; }
    .hc-dot.active { background:rgba(255,255,255,0.28); }
    @keyframes hcFillDot { from{width:0%;} to{width:100%;} }
    .floating-register { position:fixed; bottom:28px; right:28px; z-index:900; display:inline-flex; align-items:center; gap:9px; padding:14px 26px; border-radius:999px; border:none; cursor:pointer; background:linear-gradient(135deg,#ffd54f,#ff9d2f); color:#241800; font-weight:700; font-family:inherit; font-size:0.9rem; box-shadow:0 10px 30px rgba(255,183,43,0.4); animation: hcPulseGlow 2.6s ease-in-out infinite; transition:transform 0.2s ease; }
    .floating-register:hover { transform:translateY(-3px) scale(1.03); }
    @keyframes hcPulseGlow { 0%,100%{ box-shadow:0 10px 30px rgba(255,183,43,0.35); } 50%{ box-shadow:0 10px 40px rgba(255,183,43,0.6); } }
    @media (max-width:640px){ .floating-register span.long{ display:none; } .floating-register{ bottom:20px; right:20px; padding:14px; } }
    @keyframes hcSpin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
    @keyframes hcSpinRev { from{transform:rotate(360deg);} to{transform:rotate(0deg);} }
    @keyframes hcFloatY { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
    @keyframes hcFloatY2 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(8px);} }
    @keyframes hcPulseScale { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(1.12);opacity:.7;} }
    @keyframes hcBlink { 0%,100%{opacity:1;} 50%{opacity:.2;} }
    @keyframes hcDash { to{ stroke-dashoffset:-200; } }
    @keyframes hcSway { 0%,100%{transform:rotate(-6deg);} 50%{transform:rotate(6deg);} }
    @keyframes hcRiseFade { 0%{opacity:0;transform:translateY(6px);} 30%,70%{opacity:1;transform:translateY(0);} 100%{opacity:0;transform:translateY(-10px);} }
    .an-spin { transform-origin:center; animation:hcSpin 14s linear infinite; }
    .an-spin-rev { transform-origin:center; animation:hcSpinRev 18s linear infinite; }
    .an-float { animation:hcFloatY 3.2s ease-in-out infinite; }
    .an-float2 { animation:hcFloatY2 3.6s ease-in-out infinite; }
    .an-pulse { transform-origin:center; animation:hcPulseScale 2.4s ease-in-out infinite; }
    .an-blink { animation:hcBlink 2s ease-in-out infinite; }
    .an-dash { stroke-dasharray:8 6; animation:hcDash 4s linear infinite; }
    .an-sway { transform-origin:50% 100%; animation:hcSway 3s ease-in-out infinite; }
    .an-rise { animation:hcRiseFade 3s ease-in-out infinite; }
    .an-rise-d1 { animation-delay:.6s; }
    .an-rise-d2 { animation-delay:1.2s; }
  </style>

  <div class="hc-wrap" id="hcWrap">
    <div class="hc-bubbles" id="hcBubbles"></div>

    <!-- SLIDE 1: CURIOSITY -->
    <div class="hc-slide active" style="--tc:var(--gold); --tg:rgba(255,213,79,0.16);">
      <div class="hc-inner">
        <div class="hc-text">
          <div class="hc-eyebrow">🔍 Trait One</div>
          <h1 class="hc-title">Stay <em>Curious</em>, Always Ask Why</h1>
          <p class="hc-desc">An eternal drive to ask questions, explore the unknown, and dig into how and why things really work — the spark that starts every discovery.</p>
        </div>
        <div class="hc-visual">
          <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
            <circle cx="210" cy="210" r="170" fill="rgba(255,213,79,0.07)"/>
            <circle cx="210" cy="210" r="130" fill="none" stroke="rgba(255,213,79,0.25)" stroke-width="1.5" stroke-dasharray="4 8" class="an-spin"/>
            <g class="an-float">
              <circle cx="205" cy="180" r="62" fill="#ffd54f" opacity="0.15"/>
              <path d="M205 120c-38 0-62 28-62 60 0 24 14 38 24 50 6 7 8 14 8 22h60c0-8 2-15 8-22 10-12 24-26 24-50 0-32-24-60-62-60z" fill="#ffd54f" opacity="0.9"/>
              <rect x="180" y="252" width="50" height="14" rx="4" fill="#e8eaf6"/>
              <rect x="186" y="270" width="38" height="10" rx="4" fill="#8892b0"/>
              <path d="M188 178 L202 192 L224 160" stroke="#241800" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <text x="70" y="120" font-family="Syne, sans-serif" font-size="46" font-weight="800" fill="#ffd54f" class="an-rise">?</text>
            <text x="330" y="150" font-family="Syne, sans-serif" font-size="34" font-weight="800" fill="#ffd54f" opacity="0.7" class="an-rise an-rise-d1">?</text>
            <text x="90" y="320" font-family="Syne, sans-serif" font-size="30" font-weight="800" fill="#ffd54f" opacity="0.5" class="an-rise an-rise-d2">?</text>
            <g class="an-float2" transform="translate(255,255)">
              <circle cx="0" cy="0" r="34" fill="rgba(7,11,26,0.4)" stroke="#fff" stroke-width="6"/>
              <line x1="24" y1="24" x2="52" y2="52" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="hc-index"><span class="cur">01</span> / 05</div>
    </div>

    <!-- SLIDE 2: OPEN-MINDEDNESS -->
    <div class="hc-slide" style="--tc:var(--teal); --tg:rgba(77,182,172,0.16);">
      <div class="hc-inner">
        <div class="hc-text">
          <div class="hc-eyebrow">🌐 Trait Two</div>
          <h1 class="hc-title">Practice <em>Open-Mindedness</em></h1>
          <p class="hc-desc">Willingness to weigh new evidence fairly, revise beliefs, and engage with ideas that challenge assumptions — because the best minds keep growing.</p>
        </div>
        <div class="hc-visual">
          <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
            <circle cx="210" cy="210" r="170" fill="rgba(77,182,172,0.07)"/>
            <g class="an-spin" transform-origin="210px 210px">
              <circle cx="210" cy="210" r="110" fill="none" stroke="#4db6ac" stroke-width="2" opacity="0.55"/>
              <ellipse cx="210" cy="210" rx="110" ry="42" fill="none" stroke="#4db6ac" stroke-width="1.4" opacity="0.5"/>
              <ellipse cx="210" cy="210" rx="60" ry="110" fill="none" stroke="#4db6ac" stroke-width="1.4" opacity="0.5"/>
              <ellipse cx="210" cy="210" rx="110" ry="82" fill="none" stroke="#4db6ac" stroke-width="1.2" opacity="0.35"/>
            </g>
            <circle cx="210" cy="210" r="88" fill="#4db6ac" opacity="0.14"/>
            <g class="an-float">
              <circle cx="150" cy="170" r="8" fill="#4db6ac"/>
              <circle cx="260" cy="150" r="10" fill="#4db6ac"/>
              <circle cx="270" cy="260" r="7" fill="#4db6ac"/>
              <circle cx="160" cy="270" r="9" fill="#4db6ac"/>
              <circle cx="210" cy="210" r="13" fill="#e8eaf6"/>
              <line x1="150" y1="170" x2="210" y2="210" stroke="#4db6ac" stroke-width="2" class="an-dash"/>
              <line x1="260" y1="150" x2="210" y2="210" stroke="#4db6ac" stroke-width="2" class="an-dash"/>
              <line x1="270" y1="260" x2="210" y2="210" stroke="#4db6ac" stroke-width="2" class="an-dash"/>
              <line x1="160" y1="270" x2="210" y2="210" stroke="#4db6ac" stroke-width="2" class="an-dash"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="hc-index"><span class="cur">02</span> / 05</div>
    </div>

    <!-- SLIDE 3: RATIONALITY -->
    <div class="hc-slide" style="--tc:var(--purple); --tg:rgba(206,147,216,0.16);">
      <div class="hc-inner">
        <div class="hc-text">
          <div class="hc-eyebrow">🧮 Trait Three</div>
          <h1 class="hc-title">Think with <em>Rationality</em></h1>
          <p class="hc-desc">Using logic and reason to evaluate claims, weigh alternatives, and make decisions grounded in evidence rather than assumption.</p>
        </div>
        <div class="hc-visual">
          <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
            <circle cx="210" cy="210" r="170" fill="rgba(206,147,216,0.07)"/>
            <g class="an-float">
              <line x1="210" y1="110" x2="210" y2="300" stroke="#ce93d8" stroke-width="8" stroke-linecap="round"/>
              <rect x="192" y="292" width="36" height="16" rx="4" fill="#ce93d8"/>
              <g class="an-sway">
                <line x1="130" y1="150" x2="290" y2="150" stroke="#ce93d8" stroke-width="6" stroke-linecap="round"/>
                <circle cx="210" cy="150" r="9" fill="#e8eaf6"/>
                <line x1="130" y1="150" x2="130" y2="195" stroke="#ce93d8" stroke-width="3"/>
                <path d="M104 195 a26 20 0 0 0 52 0 Z" fill="#ce93d8" opacity="0.85"/>
                <line x1="290" y1="150" x2="290" y2="195" stroke="#ce93d8" stroke-width="3"/>
                <path d="M264 195 a26 20 0 0 0 52 0 Z" fill="#ce93d8" opacity="0.85"/>
              </g>
            </g>
            <text x="90" y="330" font-family="Syne, sans-serif" font-size="30" font-weight="800" fill="#ce93d8" class="an-rise">∴</text>
            <text x="310" y="320" font-family="Syne, sans-serif" font-size="28" font-weight="800" fill="#ce93d8" opacity="0.7" class="an-rise an-rise-d1">=</text>
            <text x="80" y="120" font-family="Syne, sans-serif" font-size="26" font-weight="800" fill="#ce93d8" opacity="0.6" class="an-rise an-rise-d2">π</text>
          </svg>
        </div>
      </div>
      <div class="hc-index"><span class="cur">03</span> / 05</div>
    </div>

    <!-- SLIDE 4: AVERSION TO SUPERSTITION -->
    <div class="hc-slide" style="--tc:var(--coral); --tg:rgba(255,107,107,0.16);">
      <div class="hc-inner">
        <div class="hc-text">
          <div class="hc-eyebrow">🧿 Trait Four</div>
          <h1 class="hc-title">A Vision <em>Beyond Superstition</em></h1>
          <p class="hc-desc">Rejecting unfounded beliefs and myths in favour of an evidence-based understanding of the world — replacing fear of the unknown with facts.</p>
        </div>
        <div class="hc-visual">
          <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
            <circle cx="210" cy="210" r="170" fill="rgba(255,107,107,0.07)"/>
            <g class="an-spin-rev" opacity="0.4">
              <line x1="210" y1="60" x2="210" y2="100" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/>
              <line x1="210" y1="320" x2="210" y2="360" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/>
              <line x1="60" y1="210" x2="100" y2="210" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/>
              <line x1="320" y1="210" x2="360" y2="210" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/>
              <line x1="107" y1="107" x2="135" y2="135" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/>
              <line x1="313" y1="313" x2="285" y2="285" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/>
              <line x1="313" y1="107" x2="285" y2="135" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/>
              <line x1="107" y1="313" x2="135" y2="285" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/>
            </g>
            <g class="an-float">
              <path d="M110 210 Q210 130 310 210 Q210 290 110 210 Z" fill="none" stroke="#ff6b6b" stroke-width="6" stroke-linejoin="round"/>
              <circle cx="210" cy="210" r="34" fill="#ff6b6b"/>
              <circle cx="210" cy="210" r="14" fill="#070b1a" class="an-blink"/>
            </g>
            <g transform="translate(300,300)" opacity="0.85">
              <circle cx="0" cy="0" r="30" fill="rgba(7,11,26,0.55)" stroke="#ff6b6b" stroke-width="2.5"/>
              <path d="M-12 8 a12 14 0 1 1 24 0" fill="none" stroke="#e8eaf6" stroke-width="4" stroke-linecap="round"/>
              <line x1="-16" y1="-16" x2="16" y2="16" stroke="#ff6b6b" stroke-width="4" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="hc-index"><span class="cur">04</span> / 05</div>
    </div>

    <!-- SLIDE 5: BELIEF IN SCIENTIFIC METHOD -->
    <div class="hc-slide" style="--tc:var(--accent); --tg:rgba(79,195,247,0.16);">
      <div class="hc-inner">
        <div class="hc-text">
          <div class="hc-eyebrow">🔬 Trait Five</div>
          <h1 class="hc-title">Trust the <em>Scientific Method</em></h1>
          <p class="hc-desc">Trusting systematic observation, experimentation, and peer review as the path to reliable knowledge — the foundation everything else stands on.</p>
        </div>
        <div class="hc-visual">
          <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
            <circle cx="210" cy="210" r="170" fill="rgba(79,195,247,0.07)"/>
            <g class="an-spin" transform-origin="210px 210px">
              <ellipse cx="210" cy="210" rx="120" ry="46" fill="none" stroke="#4fc3f7" stroke-width="2" opacity="0.55"/>
            </g>
            <g class="an-spin-rev" transform-origin="210px 210px">
              <ellipse cx="210" cy="210" rx="120" ry="46" fill="none" stroke="#4fc3f7" stroke-width="2" opacity="0.4" transform="rotate(60 210 210)"/>
            </g>
            <g class="an-spin" transform-origin="210px 210px" style="animation-duration:20s;">
              <ellipse cx="210" cy="210" rx="120" ry="46" fill="none" stroke="#4fc3f7" stroke-width="2" opacity="0.4" transform="rotate(120 210 210)"/>
            </g>
            <circle cx="210" cy="210" r="20" fill="#4fc3f7" class="an-pulse"/>
            <g class="an-float" transform="translate(210,235)">
              <path d="M-14 -60 h28 v34 l22 44 a10 10 0 0 1 -9 15 h-54 a10 10 0 0 1 -9 -15 l22 -44 Z" fill="rgba(7,11,26,0.5)" stroke="#e8eaf6" stroke-width="4" stroke-linejoin="round"/>
              <path d="M-19 4 a30 12 0 0 0 38 0 Z" fill="#4fc3f7" opacity="0.85"/>
              <line x1="-16" y1="-60" x2="16" y2="-60" stroke="#e8eaf6" stroke-width="4" stroke-linecap="round"/>
              <circle cx="-4" cy="-10" r="3" fill="#4fc3f7" class="an-blink"/>
              <circle cx="8" cy="0" r="2.4" fill="#4fc3f7" class="an-blink"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="hc-index"><span class="cur">05</span> / 05</div>
    </div>

    <button class="hc-arrow prev" aria-label="Previous slide" onclick="hcGo(hcCurrent-1)">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <button class="hc-arrow next" aria-label="Next slide" onclick="hcGo(hcCurrent+1)">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>

    <div class="hc-dots" id="hcDots"></div>
  </div>

  <!-- FLOATING REGISTER BUTTON — follows scroll across the whole home page (hidden once signed in) -->
  <button class="floating-register" id="floating-register-btn" onclick="openModal('register-type-modal')">✏️ <span class="long">Register Now</span></button>

  <!-- DNA STRIP -->
  <div class="dna-strip">
    <svg viewBox="0 0 1200 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0,28 Q50,8 100,28 Q150,48 200,28 Q250,8 300,28 Q350,48 400,28 Q450,8 500,28 Q550,48 600,28 Q650,8 700,28 Q750,48 800,28 Q850,8 900,28 Q950,48 1000,28 Q1050,8 1100,28 Q1150,48 1200,28" stroke="#4fc3f7" stroke-width="2.5" fill="none"/>
      <path d="M0,28 Q50,48 100,28 Q150,8 200,28 Q250,48 300,28 Q350,8 400,28 Q450,48 500,28 Q550,8 600,28 Q650,48 700,28 Q750,8 800,28 Q850,48 900,28 Q950,8 1000,28 Q1050,48 1100,28 Q1150,8 1200,28" stroke="#4fc3f7" stroke-width="2.5" fill="none"/>
      <circle cx="100" cy="28" r="4" fill="#4fc3f7"/><circle cx="200" cy="28" r="4" fill="#4fc3f7"/>
      <circle cx="300" cy="28" r="4" fill="#4fc3f7"/><circle cx="400" cy="28" r="4" fill="#4fc3f7"/>
      <circle cx="500" cy="28" r="4" fill="#4fc3f7"/><circle cx="600" cy="28" r="4" fill="#4fc3f7"/>
      <circle cx="700" cy="28" r="4" fill="#4fc3f7"/><circle cx="800" cy="28" r="4" fill="#4fc3f7"/>
      <circle cx="900" cy="28" r="4" fill="#4fc3f7"/><circle cx="1000" cy="28" r="4" fill="#4fc3f7"/>
      <circle cx="1100" cy="28" r="4" fill="#4fc3f7"/>
    </svg>
  </div>
  <style>
    /* EMPOWER BANNER — replaces the five scientific-mindset trait cards */
    .empower-banner {
      position: relative; max-width: 1100px; margin: 1rem auto 3rem; padding: 4.5rem 2rem;
      border-radius: 36px; overflow: hidden; text-align: center;
      background: radial-gradient(circle at 20% 20%, rgba(255,213,79,0.10), transparent 45%),
                  radial-gradient(circle at 80% 30%, rgba(77,182,172,0.10), transparent 45%),
                  radial-gradient(circle at 50% 90%, rgba(206,147,216,0.10), transparent 45%),
                  var(--surface);
      border: 1px solid var(--border); box-shadow: var(--shadow);
    }
    .empower-banner::before, .empower-banner::after {
      content: ''; position: absolute; border-radius: 50%; pointer-events: none;
    }
    .empower-banner::before {
      width: 260px; height: 260px; top: -110px; left: -90px;
      background: radial-gradient(circle, rgba(255,213,79,0.18), transparent 70%);
    }
    .empower-banner::after {
      width: 300px; height: 300px; bottom: -140px; right: -100px;
      background: radial-gradient(circle, rgba(79,195,247,0.16), transparent 70%);
    }
    .empower-eyebrow {
      position: relative; display: inline-flex; align-items: center; gap: 8px;
      padding: 0.4rem 1rem; border-radius: 999px; border: 1px solid var(--border);
      background: rgba(255,255,255,0.04); color: var(--accent); font-size: 0.78rem; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.6rem;
    }
    .empower-title {
      position: relative; font-family: 'Syne', sans-serif; font-weight: 800; line-height: 1.18;
      font-size: clamp(1.9rem, 4vw, 3.1rem); max-width: 820px; margin: 0 auto;
      background: linear-gradient(100deg, #ffd54f 0%, #4fc3f7 35%, #4db6ac 60%, #ce93d8 85%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .empower-underline {
      position: relative; width: 92px; height: 4px; margin: 1.8rem auto 0; border-radius: 999px;
      background: linear-gradient(90deg, #ffd54f, #4fc3f7, #4db6ac, #ce93d8);
    }
    @media (max-width: 640px) {
      .empower-banner { padding: 3.2rem 1.4rem; border-radius: 26px; }
    }

    /* SPARK OF DISCOVERY — orbit showcase */
    .orbit-stage { max-width: 1100px; margin: 0 auto; padding: 1rem 2rem 3.5rem; }
    .orbit-arena {
      position: relative; height: 340px; max-width: 640px; margin: 1.75rem auto 0;
      border-radius: 28px; border: 1px solid var(--border);
      background: radial-gradient(circle at 50% 50%, rgba(79,195,247,0.08), transparent 65%);
      display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .orbit-nucleus {
      position: absolute; width: 78px; height: 78px; border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #7fd8ff, #1a237e 70%);
      display: flex; align-items: center; justify-content: center; font-size: 1.8rem;
      box-shadow: 0 0 30px rgba(79,195,247,0.55), 0 0 60px rgba(79,195,247,0.25);
      animation: scicommPulse 2.6s ease-in-out infinite;
      z-index: 2;
    }
    @keyframes scicommPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
    .orbit-ring {
      position: absolute; border: 1px solid rgba(79,195,247,0.35); border-radius: 50%;
    }
    .orbit-ring.r1 { width: 190px; height: 190px; transform: rotate(20deg); }
    .orbit-ring.r2 { width: 260px; height: 260px; transform: rotate(-30deg); }
    .orbit-ring.r3 { width: 320px; height: 320px; transform: rotate(65deg); }
    .orbit-spin { position: absolute; inset: 0; }
    .orbit-spin.s1 { animation: scicommSpin 9s linear infinite; }
    .orbit-spin.s2 { animation: scicommSpin 14s linear infinite reverse; }
    .orbit-spin.s3 { animation: scicommSpin 20s linear infinite; }
    @keyframes scicommSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    .orbit-badge {
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 6px; white-space: nowrap;
      background: var(--surface2); border: 1px solid rgba(79,195,247,0.4);
      border-radius: 999px; padding: 6px 14px; font-size: 0.78rem; font-weight: 600; color: #fff;
      box-shadow: 0 4px 16px rgba(0,0,0,0.4), 0 0 14px rgba(79,195,247,0.2);
    }
    .orbit-values {
      display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 1.75rem;
    }
    .orbit-value {
      background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 1rem 1.4rem; text-align: center; min-width: 130px; box-shadow: var(--shadow);
      animation: scicommBob 4s ease-in-out infinite;
    }
    .orbit-value:nth-child(2) { animation-delay: 0.6s; }
    .orbit-value:nth-child(3) { animation-delay: 1.2s; }
    .orbit-value:nth-child(4) { animation-delay: 1.8s; }
    @keyframes scicommBob {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    .orbit-value-icon { font-size: 1.4rem; margin-bottom: 4px; }
    .orbit-value-label { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--text); }
    @media (max-width: 640px) {
      .orbit-arena { max-width: 100%; height: 300px; }
      .orbit-ring.r1 { width: 140px; height: 140px; }
      .orbit-ring.r2 { width: 195px; height: 195px; }
      .orbit-ring.r3 { width: 250px; height: 250px; }
    }
  </style>

  <div class="empower-banner reveal">
    <div class="empower-eyebrow">✦ Our Mission</div>
    <h2 class="empower-title">Empowering young minds with scientific thinking</h2>
    <div class="empower-underline"></div>
  </div>

  <div class="orbit-stage">
    <div class="section-header reveal" style="justify-content:center; text-align:center;">
      <div><div class="section-title">The Spark of Discovery</div><div class="section-sub">Curiosity at the core, with every scientific value orbiting around it</div></div>
    </div>
    <div class="orbit-arena">
      <div class="orbit-ring r1"><div class="orbit-spin s1"><div class="orbit-badge">🔍 Curiosity</div></div></div>
      <div class="orbit-ring r2"><div class="orbit-spin s2"><div class="orbit-badge">🧮 Rationality</div></div></div>
      <div class="orbit-ring r3"><div class="orbit-spin s3"><div class="orbit-badge">🔬 Scientific Method</div></div></div>
      <div class="orbit-nucleus">⚛️</div>
    </div>
    <div class="orbit-values">
      <div class="orbit-value"><div class="orbit-value-icon">🌐</div><div class="orbit-value-label">Open-Minded</div></div>
      <div class="orbit-value"><div class="orbit-value-icon">🧿</div><div class="orbit-value-label">Evidence First</div></div>
      <div class="orbit-value"><div class="orbit-value-icon">💡</div><div class="orbit-value-label">Bold Ideas</div></div>
      <div class="orbit-value"><div class="orbit-value-icon">🚀</div><div class="orbit-value-label">Keep Growing</div></div>
    </div>
  </div>
</div>

</div>


<!-- ABOUT US PAGE -->
<div class="page" id="page-about">
  <div style="max-width:960px;margin:0 auto;padding:3rem 2rem;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:3rem;">
      <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(79,195,247,0.1);color:#4fc3f7;border:1px solid rgba(79,195,247,0.25);border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1rem;">
        <span style="width:6px;height:6px;border-radius:50%;background:#4fc3f7;display:inline-block;box-shadow:0 0 8px #4fc3f7;"></span>
        Who We Are
      </div>
      <h1 style="font-family:Syne,sans-serif;font-size:clamp(2rem,5vw,3rem);font-weight:800;color:#fff;margin-bottom:1rem;line-height:1.15;">
        Empowering Minds Through<br><em style="color:#4fc3f7;font-style:normal;">Scientific Thinking</em>
      </h1>
      <p style="color:rgba(255,255,255,0.55);font-size:1rem;max-width:640px;margin:0 auto;line-height:1.8;">
        At SciComm, we believe that scientific thinking is more than a subject — it is a way of understanding the world, making informed decisions, and solving real-life problems.
      </p>
    </div>

    <!-- Intro card -->
    <div id="about-story" style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.2);border-radius:16px;padding:2.5rem;margin-bottom:2rem;box-shadow:0 8px 40px rgba(0,0,0,0.5);position:relative;overflow:hidden;">
      <div style="position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:rgba(79,195,247,0.04);pointer-events:none;"></div>
      <div style="font-family:Syne,sans-serif;font-size:1.1rem;font-weight:700;color:#4fc3f7;margin-bottom:1rem;">Our Story</div>
      <p style="color:rgba(255,255,255,0.65);line-height:1.95;font-size:0.95rem;">
        Our mission is to cultivate curiosity, critical thinking, and evidence-based reasoning among learners, educators, researchers, and professionals through scientifically designed assessments and educational initiatives.
        We specialize in developing and conducting <strong style="color:#4fc3f7;">Scientific Attitude Tests</strong>, <strong style="color:#4fc3f7;">Psychometric Tests</strong>, and <strong style="color:#4fc3f7;">Scientific Aptitude Tests</strong> that help individuals discover their strengths, understand their potential, and make informed academic and career choices.
        Our assessments are built on sound scientific principles and are designed to provide reliable, objective, and meaningful insights.
      </p>
    </div>

    <!-- 3 What We Do cards -->
    <div id="about-whatwedo" style="font-family:Syne,sans-serif;font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:1.25rem;">What We Do</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;margin-bottom:2rem;">

      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.75rem;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(79,195,247,0.5)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='rgba(79,195,247,0.18)';this.style.transform='translateY(0)'">
        <div style="font-size:2.2rem;margin-bottom:0.75rem;">🧠</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:0.6rem;font-size:1rem;">Scientific Attitude Assessment</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.5);line-height:1.75;">We measure an individual's inclination toward logical reasoning, curiosity, objectivity, open-mindedness, and evidence-based thinking — qualities that form the foundation of scientific temperament.</div>
      </div>

      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.75rem;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(79,195,247,0.5)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='rgba(79,195,247,0.18)';this.style.transform='translateY(0)'">
        <div style="font-size:2.2rem;margin-bottom:0.75rem;">📊</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:0.6rem;font-size:1rem;">Psychometric Assessment</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.5);line-height:1.75;">Our scientifically validated psychometric tools evaluate personality traits, cognitive abilities, behavioral preferences, interests, and emotional competencies — enabling individuals and organizations to make better decisions.</div>
      </div>

      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.75rem;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(79,195,247,0.5)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='rgba(79,195,247,0.18)';this.style.transform='translateY(0)'">
        <div style="font-size:2.2rem;margin-bottom:0.75rem;">🔬</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:0.6rem;font-size:1rem;">Scientific Aptitude Assessment</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.5);line-height:1.75;">Our aptitude tests identify an individual's natural potential for scientific learning, analytical thinking, quantitative reasoning, and problem-solving — helping nurture future innovators and researchers.</div>
      </div>

    </div>

    <!-- Mission & Vision -->
    <div id="about-mission" style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:2rem;">
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:14px;padding:1.75rem;">
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:1rem;font-size:1rem;">🎯 Our Mission</div>
        <ul style="font-size:0.875rem;color:rgba(255,255,255,0.55);line-height:1.9;padding-left:1.2rem;">
          <li>Promote scientific attitude and evidence-based thinking</li>
          <li>Provide reliable, research-driven assessment tools</li>
          <li>Support students in identifying their academic and career potential</li>
          <li>Assist educators in talent identification and development</li>
          <li>Encourage lifelong learning through scientific literacy</li>
        </ul>
      </div>
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:14px;padding:1.75rem;">
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:1rem;font-size:1rem;">🌟 Our Vision</div>
        <p style="font-size:0.875rem;color:rgba(255,255,255,0.55);line-height:1.85;">
          To build a society where scientific temperament, rational thinking, and informed decision-making become integral to education, research, and everyday life.
        </p>
      </div>
    </div>

    <!-- Why Choose SciComm -->
    <div id="about-why" style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:14px;padding:1.75rem;margin-bottom:2rem;">
      <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:1rem;font-size:1rem;">Why Choose SciComm?</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.75rem;">
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>Scientifically designed and validated assessment tools
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>Reliable, objective and data-driven evaluation
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>User-friendly online testing platform
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>Comprehensive performance reports with actionable insights
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>Suitable for schools, colleges, universities and organizations
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>Commitment to quality, ethics and continuous innovation
        </div>
      </div>
    </div>

    <!-- Commitment -->
    <div id="about-commitment" style="background:linear-gradient(135deg,rgba(79,195,247,0.07),rgba(2,136,209,0.04));border:1px solid rgba(79,195,247,0.2);border-radius:16px;padding:2rem;margin-bottom:2rem;text-align:center;">
      <div style="font-size:2rem;margin-bottom:0.75rem;">🤝</div>
      <div style="font-family:Syne,sans-serif;font-weight:700;color:#fff;font-size:1.1rem;margin-bottom:0.75rem;">Our Commitment</div>
      <p style="font-size:0.9rem;color:rgba(255,255,255,0.55);line-height:1.85;max-width:660px;margin:0 auto;">
        Every assessment at SciComm is developed with the highest standards of scientific rigor, fairness, and integrity. We continuously refine our methodologies through research and innovation to ensure that our assessments remain relevant, accurate, and impactful. At SciComm, we are not just conducting tests — we are nurturing scientific minds, inspiring curiosity, and helping individuals unlock their true potential.
      </p>
    </div>

    <!-- Final tagline + CTA -->
    <div style="text-align:center;padding:2.5rem 2rem;background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.2);border-radius:16px;">
      <p style="font-family:Syne,sans-serif;font-size:1.1rem;font-weight:700;color:#4fc3f7;margin-bottom:0.5rem;font-style:italic;">
        "Discover your potential. Develop scientific thinking. Shape a brighter future with SciComm."
      </p>
      <p style="color:rgba(255,255,255,0.45);font-size:0.875rem;margin-bottom:1.5rem;">Join thousands of students, educators and institutions already on the platform.</p>
      <button onclick="showPage('auth')" style="background:linear-gradient(135deg,#4fc3f7,#0288d1);color:#070b1a;border:none;border-radius:10px;padding:13px 32px;font-weight:700;font-size:1rem;cursor:pointer;font-family:inherit;box-shadow:0 0 24px rgba(79,195,247,0.3);">
        Get Started →
      </button>
    </div>

  </div>
</div>


<!-- ABOUT SUB-PAGE: OUR STORY -->
<div class="page" id="page-about-story">
  <div style="max-width:960px;margin:0 auto;padding:3rem 2rem;">
    <button onclick="showPage('about')" style="background:none;border:none;cursor:pointer;color:#4fc3f7;font-family:inherit;font-size:0.875rem;padding:0;margin-bottom:1.75rem;display:inline-flex;align-items:center;gap:6px;">← Back to About Us</button>
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(79,195,247,0.1);color:#4fc3f7;border:1px solid rgba(79,195,247,0.25);border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1.25rem;">
      <span style="width:6px;height:6px;border-radius:50%;background:#4fc3f7;display:inline-block;box-shadow:0 0 8px #4fc3f7;"></span>
      About Us
    </div>
    <h1 style="font-family:Syne,sans-serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;color:#fff;margin-bottom:2rem;line-height:1.2;">Our Story</h1>

    <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.2);border-radius:16px;padding:2.5rem;box-shadow:0 8px 40px rgba(0,0,0,0.5);position:relative;overflow:hidden;">
      <div style="position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:rgba(79,195,247,0.04);pointer-events:none;"></div>
      <p style="color:rgba(255,255,255,0.65);line-height:1.95;font-size:0.98rem;">
        Our mission is to cultivate curiosity, critical thinking, and evidence-based reasoning among learners, educators, researchers, and professionals through scientifically designed assessments and educational initiatives.
        We specialize in developing and conducting <strong style="color:#4fc3f7;">Scientific Attitude Tests</strong>, <strong style="color:#4fc3f7;">Psychometric Tests</strong>, and <strong style="color:#4fc3f7;">Scientific Aptitude Tests</strong> that help individuals discover their strengths, understand their potential, and make informed academic and career choices.
        Our assessments are built on sound scientific principles and are designed to provide reliable, objective, and meaningful insights.
      </p>
    </div>
  </div>
</div>


<!-- ABOUT SUB-PAGE: WHAT WE DO -->
<div class="page" id="page-about-whatwedo">
  <div style="max-width:960px;margin:0 auto;padding:3rem 2rem;">
    <button onclick="showPage('about')" style="background:none;border:none;cursor:pointer;color:#4fc3f7;font-family:inherit;font-size:0.875rem;padding:0;margin-bottom:1.75rem;display:inline-flex;align-items:center;gap:6px;">← Back to About Us</button>
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(79,195,247,0.1);color:#4fc3f7;border:1px solid rgba(79,195,247,0.25);border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1.25rem;">
      <span style="width:6px;height:6px;border-radius:50%;background:#4fc3f7;display:inline-block;box-shadow:0 0 8px #4fc3f7;"></span>
      About Us
    </div>
    <h1 style="font-family:Syne,sans-serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;color:#fff;margin-bottom:2rem;line-height:1.2;">What We Do</h1>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;">

      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.75rem;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(79,195,247,0.5)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='rgba(79,195,247,0.18)';this.style.transform='translateY(0)'">
        <div style="font-size:2.2rem;margin-bottom:0.75rem;">🧠</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:0.6rem;font-size:1rem;">Scientific Attitude Assessment</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.5);line-height:1.75;">We measure an individual's inclination toward logical reasoning, curiosity, objectivity, open-mindedness, and evidence-based thinking — qualities that form the foundation of scientific temperament.</div>
      </div>

      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.75rem;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(79,195,247,0.5)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='rgba(79,195,247,0.18)';this.style.transform='translateY(0)'">
        <div style="font-size:2.2rem;margin-bottom:0.75rem;">📊</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:0.6rem;font-size:1rem;">Psychometric Assessment</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.5);line-height:1.75;">Our scientifically validated psychometric tools evaluate personality traits, cognitive abilities, behavioral preferences, interests, and emotional competencies — enabling individuals and organizations to make better decisions.</div>
      </div>

      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.75rem;transition:all 0.3s;" onmouseover="this.style.borderColor='rgba(79,195,247,0.5)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='rgba(79,195,247,0.18)';this.style.transform='translateY(0)'">
        <div style="font-size:2.2rem;margin-bottom:0.75rem;">🔬</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:0.6rem;font-size:1rem;">Scientific Aptitude Assessment</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.5);line-height:1.75;">Our aptitude tests identify an individual's natural potential for scientific learning, analytical thinking, quantitative reasoning, and problem-solving — helping nurture future innovators and researchers.</div>
      </div>

    </div>
  </div>
</div>


<!-- ABOUT SUB-PAGE: MISSION & VISION -->
<div class="page" id="page-about-mission">
  <div style="max-width:960px;margin:0 auto;padding:3rem 2rem;">
    <button onclick="showPage('about')" style="background:none;border:none;cursor:pointer;color:#4fc3f7;font-family:inherit;font-size:0.875rem;padding:0;margin-bottom:1.75rem;display:inline-flex;align-items:center;gap:6px;">← Back to About Us</button>
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(79,195,247,0.1);color:#4fc3f7;border:1px solid rgba(79,195,247,0.25);border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1.25rem;">
      <span style="width:6px;height:6px;border-radius:50%;background:#4fc3f7;display:inline-block;box-shadow:0 0 8px #4fc3f7;"></span>
      About Us
    </div>
    <h1 style="font-family:Syne,sans-serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;color:#fff;margin-bottom:2rem;line-height:1.2;">Mission &amp; Vision</h1>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:14px;padding:1.75rem;">
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:1rem;font-size:1rem;">🎯 Our Mission</div>
        <ul style="font-size:0.875rem;color:rgba(255,255,255,0.55);line-height:1.9;padding-left:1.2rem;">
          <li>Promote scientific attitude and evidence-based thinking</li>
          <li>Provide reliable, research-driven assessment tools</li>
          <li>Support students in identifying their academic and career potential</li>
          <li>Assist educators in talent identification and development</li>
          <li>Encourage lifelong learning through scientific literacy</li>
        </ul>
      </div>
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:14px;padding:1.75rem;">
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;margin-bottom:1rem;font-size:1rem;">🌟 Our Vision</div>
        <p style="font-size:0.875rem;color:rgba(255,255,255,0.55);line-height:1.85;">
          To build a society where scientific temperament, rational thinking, and informed decision-making become integral to education, research, and everyday life.
        </p>
      </div>
    </div>
  </div>
</div>


<!-- ABOUT SUB-PAGE: WHY CHOOSE SCICOMM -->
<div class="page" id="page-about-why">
  <div style="max-width:960px;margin:0 auto;padding:3rem 2rem;">
    <button onclick="showPage('about')" style="background:none;border:none;cursor:pointer;color:#4fc3f7;font-family:inherit;font-size:0.875rem;padding:0;margin-bottom:1.75rem;display:inline-flex;align-items:center;gap:6px;">← Back to About Us</button>
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(79,195,247,0.1);color:#4fc3f7;border:1px solid rgba(79,195,247,0.25);border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1.25rem;">
      <span style="width:6px;height:6px;border-radius:50%;background:#4fc3f7;display:inline-block;box-shadow:0 0 8px #4fc3f7;"></span>
      About Us
    </div>
    <h1 style="font-family:Syne,sans-serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;color:#fff;margin-bottom:2rem;line-height:1.2;">Why Choose SciComm?</h1>

    <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:14px;padding:1.75rem;">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.75rem;">
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>Scientifically designed and validated assessment tools
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>Reliable, objective and data-driven evaluation
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>User-friendly online testing platform
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>Comprehensive performance reports with actionable insights
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>Suitable for schools, colleges, universities and organizations
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:rgba(255,255,255,0.6);">
          <span style="color:#4fc3f7;font-weight:700;flex-shrink:0;">✓</span>Commitment to quality, ethics and continuous innovation
        </div>
      </div>
    </div>
  </div>
</div>


<!-- ABOUT SUB-PAGE: OUR COMMITMENT -->
<div class="page" id="page-about-commitment">
  <div style="max-width:960px;margin:0 auto;padding:3rem 2rem;">
    <button onclick="showPage('about')" style="background:none;border:none;cursor:pointer;color:#4fc3f7;font-family:inherit;font-size:0.875rem;padding:0;margin-bottom:1.75rem;display:inline-flex;align-items:center;gap:6px;">← Back to About Us</button>
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(79,195,247,0.1);color:#4fc3f7;border:1px solid rgba(79,195,247,0.25);border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1.25rem;">
      <span style="width:6px;height:6px;border-radius:50%;background:#4fc3f7;display:inline-block;box-shadow:0 0 8px #4fc3f7;"></span>
      About Us
    </div>
    <h1 style="font-family:Syne,sans-serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;color:#fff;margin-bottom:2rem;line-height:1.2;">Our Commitment</h1>

    <div style="background:linear-gradient(135deg,rgba(79,195,247,0.07),rgba(2,136,209,0.04));border:1px solid rgba(79,195,247,0.2);border-radius:16px;padding:2.5rem;text-align:center;">
      <div style="font-size:2.2rem;margin-bottom:0.75rem;">🤝</div>
      <p style="font-size:0.95rem;color:rgba(255,255,255,0.55);line-height:1.9;max-width:660px;margin:0 auto;">
        Every assessment at SciComm is developed with the highest standards of scientific rigor, fairness, and integrity. We continuously refine our methodologies through research and innovation to ensure that our assessments remain relevant, accurate, and impactful. At SciComm, we are not just conducting tests — we are nurturing scientific minds, inspiring curiosity, and helping individuals unlock their true potential.
      </p>
    </div>
  </div>
</div>


<!-- TEAM PAGE -->
<div class="page" id="page-teams">
  <div class="team-page-wrap">

    <!-- Header -->
    <div class="team-header">
      <div class="team-eyebrow">
        <span class="team-eyebrow-dot"></span>
        Our Team
      </div>
      <h1 class="team-h1">
        The People Behind <em>SciComm</em>
      </h1>
      <p class="team-lede">
        A small, focused team bringing together science, strategy and technology to build a platform that measures scientific temperament the right way.
      </p>
    </div>

    <!-- Founder spotlight -->
    <div class="orbit-card orbit-card--founder">
      <div class="orbit-avatar-wrap orbit-avatar-wrap--lg" style="--orbit-color:#4fc3f7;">
        <span class="orbit-ring"></span>
        <span class="orbit-ring orbit-ring--2"></span>
        <div class="orbit-avatar" style="background:linear-gradient(135deg,#4fc3f7,#1a237e);">AS</div>
      </div>
      <div class="orbit-body">
        <div class="orbit-name-row">
          <div class="orbit-name orbit-name--lg">Dr. Ajay Sharma</div>
          <span class="orbit-badge orbit-badge--gold">★ Founder</span>
          <span class="orbit-badge orbit-badge--blue">Director</span>
        </div>
        <p class="orbit-bio orbit-bio--lg">
          The founding vision behind SciComm — leading the platform's scientific direction, assessment design and long-term roadmap for how scientific attitude and aptitude are measured and nurtured in students.
        </p>
      </div>
    </div>

    <!-- Leadership -->
    <div class="team-group-header">
      <span class="team-group-icon" style="--gi-color:#4fc3f7;">◎</span>
      <div>
        <div class="team-group-title">Leadership</div>
        <div class="team-group-sub">Steering strategy, research and people</div>
      </div>
    </div>
    <div class="orbit-grid">

      <div class="orbit-card">
        <div class="orbit-avatar-wrap" style="--orbit-color:#64b5f6;">
          <span class="orbit-ring"></span>
          <div class="orbit-avatar" style="background:linear-gradient(135deg,#64b5f6,#0d47a1);">AS</div>
        </div>
        <div class="orbit-name">Mr. Adhyan Sareen</div>
        <div class="orbit-role" style="color:#64b5f6;background:rgba(100,181,246,0.12);">Education Research &amp; School Programs Lead</div>
        <p class="orbit-bio">Works directly with schools to bring SciComm's assessments into real classrooms — aligning the platform's research with curricula and helping schools adopt it with confidence.</p>
      </div>

      <div class="orbit-card">
        <div class="orbit-avatar-wrap" style="--orbit-color:#4db6ac;">
          <span class="orbit-ring"></span>
          <div class="orbit-avatar" style="background:linear-gradient(135deg,#4db6ac,#00695c);">RS</div>
        </div>
        <div class="orbit-name">Mr. Rahul Sharma</div>
        <div class="orbit-role-row">
          <div class="orbit-role" style="color:#4db6ac;background:rgba(77,182,172,0.12);">Learning, Development &amp; Behavioural Research Lead</div>
          <div class="orbit-role" style="color:#4db6ac;background:rgba(77,182,172,0.12);">HR</div>
        </div>
        <p class="orbit-bio">Studies how students engage with scientific thinking and turns those findings into training and growth pathways — while also building and nurturing the team behind SciComm.</p>
      </div>

      <div class="orbit-card">
        <div class="orbit-avatar-wrap" style="--orbit-color:#ce93d8;">
          <span class="orbit-ring"></span>
          <div class="orbit-avatar" style="background:linear-gradient(135deg,#ce93d8,#6a1b9a);">D</div>
        </div>
        <div class="orbit-name">Mrs. Devolka</div>
        <div class="orbit-role" style="color:#ce93d8;background:rgba(206,147,216,0.12);">Education Research &amp; School Programs Lead</div>
        <p class="orbit-bio">Builds and sustains SciComm's relationships with schools — running onboarding and outreach so every partner school gets the most out of the platform.</p>
      </div>

    </div>

    <!-- Technology & Research Systems -->
    <div class="team-group-header" style="margin-top:2.75rem;">
      <span class="team-group-icon" style="--gi-color:#4fc3f7;">⬡</span>
      <div>
        <div class="team-group-title">Technology &amp; Research Systems Lead</div>
        <div class="team-group-sub">Building, shipping and designing the platform</div>
      </div>
    </div>
    <div class="orbit-grid">

      <div class="orbit-card">
        <div class="orbit-avatar-wrap" style="--orbit-color:#ff6b6b;">
          <span class="orbit-ring"></span>
          <div class="orbit-avatar" style="background:linear-gradient(135deg,#ff6b6b,#c62828);">PS</div>
        </div>
        <div class="orbit-name">Mr. Pranshu Sharma</div>
        <div class="orbit-role" style="color:#ff8a80;background:rgba(255,107,107,0.12);">Deployment</div>
        <p class="orbit-bio">Owns deployment and infrastructure — keeping SciComm live, fast and reliable for every student and school, every single day.</p>
      </div>

      <div class="orbit-card">
        <div class="orbit-avatar-wrap" style="--orbit-color:#4fc3f7;">
          <span class="orbit-ring"></span>
          <div class="orbit-avatar" style="background:linear-gradient(135deg,#4fc3f7,#0288d1);">ES</div>
        </div>
        <div class="orbit-name">Miss. Eashita Sethi</div>
        <div class="orbit-role" style="color:#4fc3f7;background:rgba(79,195,247,0.12);">Developer</div>
        <p class="orbit-bio">Builds and maintains the core platform — writing the code that powers assessments, dashboards and reports behind the scenes.</p>
      </div>

      <div class="orbit-card">
        <div class="orbit-avatar-wrap" style="--orbit-color:#ffd54f;">
          <span class="orbit-ring"></span>
          <div class="orbit-avatar" style="background:linear-gradient(135deg,#ffd54f,#c9971a);color:#2a2010;">R</div>
        </div>
        <div class="orbit-name" style="color:#4fc3f7;">Mr. Rajveer</div>
        <div class="orbit-role" style="color:#ffd54f;background:rgba(255,213,79,0.14);">Designing</div>
        <p class="orbit-bio">Shapes the visual identity and user experience — designing interfaces that make scientific assessments feel simple, clear and genuinely engaging.</p>
      </div>

    </div>

  </div>
</div>

<style>
  .team-page-wrap { max-width:1100px; margin:0 auto; padding:3rem 2rem 4.5rem; }

  /* Header */
  .team-header { text-align:center; margin-bottom:3rem; }
  .team-eyebrow {
    display:inline-flex; align-items:center; gap:8px; background:rgba(79,195,247,0.1); color:#4fc3f7;
    border:1px solid rgba(79,195,247,0.25); border-radius:999px; padding:5px 16px; font-size:0.78rem;
    font-weight:600; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:1rem;
  }
  .team-eyebrow-dot { width:6px; height:6px; border-radius:50%; background:#4fc3f7; display:inline-block; box-shadow:0 0 8px #4fc3f7; }
  .team-h1 { font-family:'Syne',sans-serif; font-size:clamp(1.8rem,4.5vw,2.6rem); font-weight:800; color:#fff; margin-bottom:1rem; line-height:1.15; }
  .team-h1 em { color:#4fc3f7; font-style:normal; }
  .team-lede { color:rgba(255,255,255,0.55); font-size:0.95rem; max-width:620px; margin:0 auto; line-height:1.8; }

  /* Group headers */
  .team-group-header { display:flex; align-items:center; gap:0.85rem; margin-bottom:1.25rem; }
  .team-group-icon {
    width:34px; height:34px; flex-shrink:0; border-radius:10px; display:flex; align-items:center; justify-content:center;
    font-size:1.1rem; color:var(--gi-color,#4fc3f7); background:rgba(79,195,247,0.1); border:1px solid rgba(79,195,247,0.25);
  }
  .team-group-title { font-family:'Syne',sans-serif; font-size:1.15rem; font-weight:700; color:#fff; }
  .team-group-sub { font-size:0.875rem; color:rgba(255,255,255,0.5); margin-top:2px; }

  /* Orbit avatar signature element */
  .orbit-avatar-wrap { position:relative; width:56px; height:56px; flex-shrink:0; margin-bottom:1rem; }
  .orbit-avatar-wrap--lg { width:92px; height:92px; margin-bottom:0; }
  .orbit-ring {
    position:absolute; inset:-7px; border-radius:50%; border:1px dashed color-mix(in srgb, var(--orbit-color,#4fc3f7) 55%, transparent);
    animation: orbit-spin 14s linear infinite; transition:border-color 0.3s ease;
  }
  .orbit-ring--2 { inset:-14px; border-style:dotted; opacity:0.6; animation-duration:22s; animation-direction:reverse; }
  .orbit-avatar {
    position:relative; width:100%; height:100%; border-radius:50%; display:flex; align-items:center; justify-content:center;
    font-family:'Syne',sans-serif; font-weight:800; font-size:1.05rem; color:#fff;
    box-shadow:0 6px 18px rgba(0,0,0,0.35);
  }
  .orbit-avatar-wrap--lg .orbit-avatar { font-size:1.7rem; box-shadow:0 8px 24px rgba(79,195,247,0.35); }

  /* Cards */
  .orbit-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:1.25rem; }
  .orbit-card {
    background:rgba(14,21,48,0.9); border:1px solid #1e2d5a; border-radius:16px;
    padding:1.5rem; transition:transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; position:relative;
  }
  .orbit-card:not(.orbit-card--founder):hover { border-color:rgba(79,195,247,0.45); box-shadow:0 10px 30px rgba(0,0,0,0.45); transform:translateY(-4px); }
  .orbit-card:not(.orbit-card--founder):hover .orbit-ring { animation-duration:4s; border-color:var(--orbit-color,#4fc3f7); }

  .orbit-card--founder {
    display:flex; align-items:center; gap:1.75rem; flex-wrap:wrap;
    background:linear-gradient(135deg,rgba(79,195,247,0.1),rgba(14,21,48,0.95));
    border:1px solid rgba(79,195,247,0.35); border-radius:18px; padding:2rem; margin-bottom:2.5rem;
    box-shadow:0 8px 32px rgba(0,0,0,0.35);
  }
  .orbit-card--founder:hover { border-color:rgba(79,195,247,0.55); box-shadow:0 10px 36px rgba(79,195,247,0.15); }
  .orbit-card--founder:hover .orbit-ring { animation-duration:5s; border-color:#4fc3f7; }
  .orbit-body { flex:1; min-width:240px; }

  .orbit-name-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:0.35rem; }
  .orbit-name { font-family:'Syne',sans-serif; font-weight:700; color:#fff; font-size:1.02rem; margin-bottom:0.4rem; }
  .orbit-name--lg { font-size:1.25rem; margin-bottom:0; }
  .orbit-badge { font-size:0.68rem; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; border-radius:999px; padding:3px 10px; }
  .orbit-badge--gold { color:#8b6914; background:#2a2010; }
  .orbit-badge--blue { color:#64b5f6; background:#0d1f3a; }
  .orbit-role { display:inline-block; font-size:0.68rem; font-weight:700; letter-spacing:0.05em; text-transform:uppercase; border-radius:999px; padding:3px 10px; margin-bottom:0.85rem; }
  .orbit-role-row { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:0.85rem; }
  .orbit-role-row .orbit-role { margin-bottom:0; }
  .orbit-bio { color:rgba(255,255,255,0.55); font-size:0.83rem; line-height:1.7; }
  .orbit-bio--lg { color:rgba(255,255,255,0.6); font-size:0.9rem; line-height:1.75; max-width:640px; }

  @keyframes orbit-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { .orbit-ring { animation:none; } }
  @media (max-width:640px) {
    .orbit-card--founder { flex-direction:column; text-align:center; }
    .orbit-name-row { justify-content:center; }
  }
</style>

<!-- BROCHURE PAGE -->
<div class="page" id="page-brochure">
  <div style="max-width:1100px;margin:0 auto;padding:3rem 2rem 4rem;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:2.5rem;">
      <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(79,195,247,0.1);color:#4fc3f7;border:1px solid rgba(79,195,247,0.25);border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1rem;">
        <span style="width:6px;height:6px;border-radius:50%;background:#4fc3f7;display:inline-block;box-shadow:0 0 8px #4fc3f7;"></span>
        Brochure
      </div>
      <h1 style="font-family:Syne,sans-serif;font-size:clamp(1.8rem,4.5vw,2.6rem);font-weight:800;color:#fff;margin-bottom:1rem;line-height:1.15;">
        Program <em style="color:#4fc3f7;font-style:normal;">Overview</em>
      </h1>
      <p style="color:rgba(255,255,255,0.55);font-size:0.95rem;max-width:600px;margin:0 auto;line-height:1.8;">
        A quick look at what SciComm offers — our assessments, methodology, and how the platform works end to end.
      </p>
    </div>

    <!-- Brochure download cards -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;max-width:760px;margin:0 auto;">

      <!-- Card 1: English -->
      <div class="brochure-card" style="background:rgba(14,21,48,0.9);border:1px solid var(--border,#1e2d5a);border-radius:16px;overflow:hidden;transition:all .2s;">
        <div style="position:relative;padding:1.75rem 1.5rem 1.25rem;background:linear-gradient(160deg,rgba(79,195,247,0.12),rgba(2,136,209,0.03));border-bottom:1px dashed rgba(79,195,247,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:52px;height:66px;flex-shrink:0;background:linear-gradient(135deg,#4fc3f7,#1a237e);border-radius:5px;position:relative;box-shadow:0 6px 18px rgba(0,0,0,0.35);">
              <div style="position:absolute;inset:8px 6px auto 6px;height:2px;background:rgba(255,255,255,0.55);"></div>
              <div style="position:absolute;top:16px;left:6px;right:10px;height:2px;background:rgba(255,255,255,0.35);"></div>
              <div style="position:absolute;top:22px;left:6px;right:14px;height:2px;background:rgba(255,255,255,0.35);"></div>
              <div style="position:absolute;bottom:8px;left:6px;font-size:0.5rem;font-weight:700;color:#fff;">SCICOMM</div>
            </div>
            <div>
              <span style="display:inline-block;font-size:0.65rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#4fc3f7;background:rgba(79,195,247,0.12);border-radius:999px;padding:2px 10px;margin-bottom:6px;">Trifold · PDF</span>
              <div style="font-family:Syne,sans-serif;font-weight:700;color:#fff;font-size:1.02rem;">Program Brochure</div>
              <div style="font-size:0.78rem;color:rgba(255,255,255,0.45);">English</div>
            </div>
          </div>
        </div>
        <div style="padding:1.25rem 1.5rem 1.5rem;">
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:1.1rem;">
            Covers SciComm's Scientific Attitude, Psychometric, and Scientific Aptitude assessments, who they're for, and how to get evaluated on our online platform.
          </p>
          <a href="#" download style="display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#4fc3f7,#0288d1);color:#070b1a;border:none;border-radius:10px;padding:11px 20px;font-weight:700;font-size:0.85rem;cursor:pointer;font-family:inherit;text-decoration:none;">
            ⬇ Download Brochure
          </a>
        </div>
      </div>

      <!-- Card 2: Hindi -->
      <div class="brochure-card" style="background:rgba(14,21,48,0.9);border:1px solid var(--border,#1e2d5a);border-radius:16px;overflow:hidden;transition:all .2s;">
        <div style="position:relative;padding:1.75rem 1.5rem 1.25rem;background:linear-gradient(160deg,rgba(255,213,79,0.12),rgba(255,213,79,0.02));border-bottom:1px dashed rgba(255,213,79,0.3);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:52px;height:66px;flex-shrink:0;background:linear-gradient(135deg,#ffd54f,#c9971a);border-radius:5px;position:relative;box-shadow:0 6px 18px rgba(0,0,0,0.35);">
              <div style="position:absolute;inset:8px 6px auto 6px;height:2px;background:rgba(0,0,0,0.4);"></div>
              <div style="position:absolute;top:16px;left:6px;right:10px;height:2px;background:rgba(0,0,0,0.25);"></div>
              <div style="position:absolute;top:22px;left:6px;right:14px;height:2px;background:rgba(0,0,0,0.25);"></div>
              <div style="position:absolute;bottom:8px;left:6px;font-size:0.5rem;font-weight:700;color:#070b1a;">SCICOMM</div>
            </div>
            <div>
              <span style="display:inline-block;font-size:0.65rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#ffd54f;background:rgba(255,213,79,0.14);border-radius:999px;padding:2px 10px;margin-bottom:6px;">Trifold · PDF</span>
              <div style="font-family:Syne,sans-serif;font-weight:700;color:#fff;font-size:1.02rem;">Program Brochure</div>
              <div style="font-size:0.78rem;color:rgba(255,255,255,0.45);">Hindi</div>
            </div>
          </div>
        </div>
        <div style="padding:1.25rem 1.5rem 1.5rem;">
          <p style="font-size:0.82rem;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:1.1rem;">
            SciComm ke Scientific Attitude, Psychometric aur Scientific Aptitude assessments, eligibility, aur online platform par register karne ki poori jaankari.
          </p>
          <a href="#" download style="display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#ffd54f,#c9971a);color:#070b1a;border:none;border-radius:10px;padding:11px 20px;font-weight:700;font-size:0.85rem;cursor:pointer;font-family:inherit;text-decoration:none;">
            ⬇ Download Brochure
          </a>
        </div>
      </div>

    </div>
  </div>
</div>

<style>
  .brochure-card:hover { border-color: rgba(79,195,247,0.45); box-shadow: 0 8px 32px rgba(0,0,0,0.5); transform: translateY(-3px); }
</style>

<!-- CLIENT PAGE -->
<div class="page" id="page-client">
  <div style="max-width:1000px;margin:0 auto;padding:3rem 2rem;">
    <div style="text-align:center;margin-bottom:2.5rem;">
      <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(79,195,247,0.1);color:#4fc3f7;border:1px solid rgba(79,195,247,0.25);border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1rem;">
        <span style="width:6px;height:6px;border-radius:50%;background:#4fc3f7;display:inline-block;box-shadow:0 0 8px #4fc3f7;"></span>
        Client
      </div>
      <h1 style="font-family:Syne,sans-serif;font-size:clamp(1.8rem,4.5vw,2.6rem);font-weight:800;color:#fff;margin-bottom:1rem;line-height:1.15;">
        List of <em style="color:#4fc3f7;font-style:normal;">Clients</em>
      </h1>
      <p style="color:rgba(255,255,255,0.55);font-size:0.95rem;max-width:600px;margin:0 auto;line-height:1.8;">
        Schools, institutions and organizations we've worked with.
      </p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.25rem;">
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.5rem;text-align:center;">
        <div style="font-size:1.6rem;margin-bottom:0.5rem;">🏫</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#fff;font-size:0.95rem;">Client Name 1</div>
      </div>
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.5rem;text-align:center;">
        <div style="font-size:1.6rem;margin-bottom:0.5rem;">🏫</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#fff;font-size:0.95rem;">Client Name 2</div>
      </div>
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.5rem;text-align:center;">
        <div style="font-size:1.6rem;margin-bottom:0.5rem;">🏫</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#fff;font-size:0.95rem;">Client Name 3</div>
      </div>
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.5rem;text-align:center;">
        <div style="font-size:1.6rem;margin-bottom:0.5rem;">🏫</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#fff;font-size:0.95rem;">Client Name 4</div>
      </div>
    </div>
    <p style="text-align:center;color:rgba(255,255,255,0.35);font-size:0.8rem;margin-top:1.5rem;">Replace these placeholder cards with your actual client names/logos.</p>
  </div>
</div>

<!-- ARCHIVE PAGE -->
<div class="page" id="page-archive">
  <div style="max-width:900px;margin:0 auto;padding:3rem 2rem;">
    <div style="text-align:center;margin-bottom:2.5rem;">
      <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(79,195,247,0.1);color:#4fc3f7;border:1px solid rgba(79,195,247,0.25);border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1rem;">
        <span style="width:6px;height:6px;border-radius:50%;background:#4fc3f7;display:inline-block;box-shadow:0 0 8px #4fc3f7;"></span>
        Archive
      </div>
      <h1 style="font-family:Syne,sans-serif;font-size:clamp(1.8rem,4.5vw,2.6rem);font-weight:800;color:#fff;margin-bottom:1rem;line-height:1.15;">
        Previous <em style="color:#4fc3f7;font-style:normal;">Data</em>
      </h1>
      <p style="color:rgba(255,255,255,0.55);font-size:0.95rem;max-width:600px;margin:0 auto;line-height:1.8;">
        Past reports, records and historical activity from earlier sessions.
      </p>
    </div>

    <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:1.75rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:0.9rem 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <span style="color:rgba(255,255,255,0.7);font-size:0.9rem;">Previous Batch Records</span>
        <span style="color:rgba(255,255,255,0.35);font-size:0.78rem;">Coming soon</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding:0.9rem 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <span style="color:rgba(255,255,255,0.7);font-size:0.9rem;">Past Assessment Reports</span>
        <span style="color:rgba(255,255,255,0.35);font-size:0.78rem;">Coming soon</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding:0.9rem 0;">
        <span style="color:rgba(255,255,255,0.7);font-size:0.9rem;">Historical Ratings</span>
        <span style="color:rgba(255,255,255,0.35);font-size:0.78rem;">Coming soon</span>
      </div>
    </div>
  </div>
</div>

<!-- CONTACT US PAGE -->
<div class="page" id="page-contact">
  <!-- Banner -->
  <div style="background:linear-gradient(135deg, rgba(26,35,126,0.35), rgba(7,11,26,0.6));border-bottom:1px solid rgba(79,195,247,0.15);padding:2.75rem 2rem;">
    <div style="max-width:1100px;margin:0 auto;">
      <h1 style="font-family:Syne,sans-serif;font-weight:800;font-size:clamp(1.6rem,4vw,2.1rem);color:#fff;margin-bottom:0.6rem;">Contact Us</h1>
      <div style="font-size:0.85rem;">
        <span style="color:#4fc3f7;font-weight:600;cursor:pointer;" onclick="showPage('home')">Home</span>
        <span style="color:rgba(255,255,255,0.35);"> / </span>
        <span style="color:rgba(255,255,255,0.6);">Contact Us</span>
      </div>
    </div>
  </div>

  <!-- Cards -->
  <div style="max-width:1100px;margin:0 auto;padding:3rem 2rem;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;">

      <!-- Email card -->
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:2rem 1.5rem;text-align:center;position:relative;overflow:hidden;">
        <div style="height:3px;background:linear-gradient(135deg,#4fc3f7,#1a237e);position:absolute;top:0;left:0;right:0;"></div>
        <div style="width:60px;height:60px;border-radius:50%;background:rgba(79,195,247,0.12);display:flex;align-items:center;justify-content:center;margin:0 auto 1.1rem;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg>
        </div>
        <div style="font-family:Syne,sans-serif;font-weight:700;font-size:0.95rem;color:#fff;letter-spacing:0.04em;margin-bottom:1.25rem;">E-MAIL ID</div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;padding:0.7rem 0;border-top:1px solid rgba(255,255,255,0.08);">
          <span style="color:rgba(255,255,255,0.5);">Office</span>
          <a href="mailto:info@scicomm.com" style="color:#fff;font-weight:600;text-decoration:none;">info@scicomm.com</a>
        </div>
      </div>

      <!-- Support card -->
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:2rem 1.5rem;text-align:center;position:relative;overflow:hidden;">
        <div style="height:3px;background:linear-gradient(135deg,#4fc3f7,#1a237e);position:absolute;top:0;left:0;right:0;"></div>
        <div style="width:60px;height:60px;border-radius:50%;background:rgba(79,195,247,0.12);display:flex;align-items:center;justify-content:center;margin:0 auto 1.1rem;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
        </div>
        <div style="font-family:Syne,sans-serif;font-weight:700;font-size:0.95rem;color:#fff;letter-spacing:0.04em;margin-bottom:1.25rem;">SUPPORT</div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;padding:0.7rem 0;border-top:1px solid rgba(255,255,255,0.08);">
          <span style="color:rgba(255,255,255,0.5);">Mobile</span>
          <span style="color:#fff;font-weight:600;"><a href="tel:+919501779518" style="color:#fff;text-decoration:none;">+91 95017 79518</a> / <a href="tel:+917009404712" style="color:#fff;text-decoration:none;">+91 70094 04712</a></span>
        </div>
      </div>

      <!-- Location card -->
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.18);border-radius:14px;padding:2rem 1.5rem;text-align:center;position:relative;overflow:hidden;">
        <div style="height:3px;background:linear-gradient(135deg,#4fc3f7,#1a237e);position:absolute;top:0;left:0;right:0;"></div>
        <div style="width:60px;height:60px;border-radius:50%;background:rgba(79,195,247,0.12);display:flex;align-items:center;justify-content:center;margin:0 auto 1.1rem;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div style="font-family:Syne,sans-serif;font-weight:700;font-size:0.95rem;color:#fff;letter-spacing:0.04em;margin-bottom:1.25rem;">OUR LOCATION</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.7);line-height:1.9;padding:0.7rem 0;border-top:1px solid rgba(255,255,255,0.08);">
          F17/257, Street No. 2,<br>Indira Colony, Majitha Road,<br>Amritsar, Punjab – 143001
        </div>
      </div>

    </div>
  </div>
</div>

<style>
  /* EXAM PAGE */
  .exam-card {
    background: rgba(14,21,48,0.9); border: 1px solid rgba(79,195,247,0.18);
    border-radius: 14px; padding: 1.5rem; transition: all 0.25s; cursor:pointer;
  }
  .exam-card:hover { border-color: rgba(79,195,247,0.55); transform: translateY(-3px); box-shadow: 0 0 24px rgba(79,195,247,0.1); }
  .exam-badge { display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:3px 12px;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em; }
  .exam-badge.open { background:rgba(79,195,247,0.12);color:#4fc3f7;border:1px solid rgba(79,195,247,0.3); }
  .exam-badge.closed { background:rgba(212,97,74,0.12);color:#ff6b6b;border:1px solid rgba(212,97,74,0.3); }
  .exam-badge.upcoming { background:rgba(255,213,79,0.12);color:#ffd54f;border:1px solid rgba(255,213,79,0.3); }

  /* EXAM ATTEMPT MODAL */
  .exam-modal { max-width: 680px; }
  .question-card {
    background: rgba(7,11,26,0.8); border: 1px solid rgba(79,195,247,0.12);
    border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem;
  }
  .q-text { font-size:0.95rem;color:rgba(255,255,255,0.85);margin-bottom:0.75rem;line-height:1.6; }
  .q-options { display:flex;flex-direction:column;gap:8px; }
  .q-option {
    display:flex;align-items:center;gap:10px;padding:10px 14px;
    border-radius:8px;border:1px solid rgba(79,195,247,0.15);
    cursor:pointer;transition:all 0.15s;font-size:0.875rem;color:rgba(255,255,255,0.7);
    background:rgba(14,21,48,0.5);
  }
  .q-option:hover { border-color:rgba(79,195,247,0.45);background:rgba(79,195,247,0.07); }
  .q-option.selected { border-color:#4fc3f7;background:rgba(79,195,247,0.12);color:#fff; }
  .q-option input[type=radio] { accent-color:#4fc3f7; }
</style>

<!-- EXAM PAGE -->
<div class="page" id="page-exam">
  <div style="max-width:1000px;margin:0 auto;padding:3rem 2rem;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:3rem;">
      <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(79,195,247,0.1);color:#4fc3f7;border:1px solid rgba(79,195,247,0.25);border-radius:999px;padding:5px 16px;font-size:0.78rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:1rem;">
        <span style="width:6px;height:6px;border-radius:50%;background:#4fc3f7;display:inline-block;box-shadow:0 0 8px #4fc3f7;"></span>
        Online Examination Portal
      </div>
      <h1 style="font-family:Syne,sans-serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;color:#fff;margin-bottom:0.75rem;">
        SCICOMM <em style="color:#4fc3f7;font-style:normal;">Exam Portal</em>
      </h1>
      <p style="color:rgba(255,255,255,0.5);font-size:0.95rem;max-width:560px;margin:0 auto 1.5rem;line-height:1.7;">
        Secure, structured online assessments for Scientific Attitude, Psychometric and Scientific Aptitude tests.
      </p>
      <button onclick="scrollToAttemptExam()" style="background:linear-gradient(135deg,#4fc3f7,#0288d1);color:#070b1a;border:none;border-radius:10px;padding:12px 30px;font-weight:800;font-size:0.95rem;cursor:pointer;font-family:inherit;box-shadow:0 4px 20px rgba(79,195,247,0.3);">📝 Attempt Exam</button>
    </div>

    <!-- How it works -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2.5rem;">
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:12px;padding:1.25rem;text-align:center;">
        <div style="font-size:1.8rem;margin-bottom:0.5rem;">🔐</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;font-size:0.85rem;margin-bottom:0.4rem;">Step 1 — Login</div>
        <div style="font-size:0.78rem;color:rgba(255,255,255,0.45);line-height:1.6;">Sign in with your school email and provided password</div>
      </div>
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:12px;padding:1.25rem;text-align:center;">
        <div style="font-size:1.8rem;margin-bottom:0.5rem;">📋</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;font-size:0.85rem;margin-bottom:0.4rem;">Step 2 — Fill Details</div>
        <div style="font-size:0.78rem;color:rgba(255,255,255,0.45);line-height:1.6;">Enter your Name, Roll No and Section before starting</div>
      </div>
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:12px;padding:1.25rem;text-align:center;">
        <div style="font-size:1.8rem;margin-bottom:0.5rem;">📝</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;font-size:0.85rem;margin-bottom:0.4rem;">Step 3 — Attempt</div>
        <div style="font-size:0.78rem;color:rgba(255,255,255,0.45);line-height:1.6;">Answer all questions within the allotted time</div>
      </div>
      <div style="background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:12px;padding:1.25rem;text-align:center;">
        <div style="font-size:1.8rem;margin-bottom:0.5rem;">📊</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#4fc3f7;font-size:0.85rem;margin-bottom:0.4rem;">Step 4 — Results</div>
        <div style="font-size:0.78rem;color:rgba(255,255,255,0.45);line-height:1.6;">Your answers are recorded and your teacher/school will share your results</div>
      </div>
    </div>

    <!-- Important notice -->
    <div style="background:rgba(255,213,79,0.06);border:1px solid rgba(255,213,79,0.25);border-radius:12px;padding:1rem 1.25rem;margin-bottom:2rem;display:flex;gap:12px;align-items:flex-start;">
      <span style="font-size:1.2rem;flex-shrink:0;">⚠️</span>
      <div style="font-size:0.85rem;color:rgba(255,255,255,0.6);line-height:1.7;">
        <strong style="color:#ffd54f;">Important:</strong> All students sign in using the same shared login provided by your teacher/school. Ask your teacher for the student login email and password if you don't have it.
      </div>
    </div>

    <!-- Science Attitude Questions (student-facing; content fully managed by Admin) -->
    <div id="student-science-section" style="display:none;background:linear-gradient(135deg,rgba(79,195,247,0.08),rgba(206,147,216,0.06));border:1px solid rgba(79,195,247,0.25);border-radius:14px;padding:1.5rem;margin-bottom:2rem;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
      <div>
        <div style="font-family:Syne,sans-serif;font-weight:800;font-size:1.05rem;color:#fff;margin-bottom:0.4rem;">🧬 Science Attitude Questions</div>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.55);line-height:1.6;max-width:520px;">Answer a short set of science statements on a Strongly Agree → Strongly Disagree scale (with Neutral). Questions are set by your Admin.</div>
      </div>
      <button class="sq-btn sq-btn-gold" onclick="openStudentSciencePrompt()">▶ Start</button>
    </div>

    <!-- Exam listing -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;">
      <div style="font-family:Syne,sans-serif;font-weight:700;font-size:1.1rem;color:#fff;">Available Exams</div>
      <div id="exam-role-actions"></div>
    </div>
    <div id="exam-list"></div>

  </div>
</div>

<!-- SCIENCE QUESTIONS — LAUNCH POPUP (shown right after student sign-in, and from the Start button) -->
<div class="modal-overlay" id="sq-student-modal">
  <div class="modal" style="max-width:420px;text-align:center;position:relative;">
    <button class="modal-close" onclick="closeModal('sq-student-modal')" style="position:absolute;top:1.1rem;right:1.1rem;">✕</button>
    <div class="sq-rocket-stage">
      <div class="sq-rocket-emoji">🚀</div>
    </div>
    <div style="font-family:Syne,sans-serif;font-weight:800;font-size:1.25rem;color:#fff;margin:0.75rem 0 0.5rem;">Ready to Begin?</div>
    <div style="font-size:0.85rem;color:rgba(255,255,255,0.55);line-height:1.6;margin-bottom:1.75rem;">Tap below to start your Science Attitude Questions.</div>
    <button class="sq-btn sq-btn-gold" style="width:100%;padding:14px;font-size:0.95rem;" onclick="sqStudentStart()">▶ Start Exam</button>
  </div>
</div>


<!-- EXAM ATTEMPT MODAL -->
<div class="modal-overlay" id="exam-attempt-modal">
  <div class="modal exam-modal">
    <div class="modal-header">
      <div class="modal-title" id="exam-attempt-title">📝 Exam</div>
      <button class="modal-close" onclick="closeModal('exam-attempt-modal')">✕</button>
    </div>
    <!-- Step 1: Student details -->
    <div id="exam-details-step">
      <div style="background:rgba(79,195,247,0.06);border:1px solid rgba(79,195,247,0.2);border-radius:10px;padding:1rem;margin-bottom:1.25rem;font-size:0.85rem;color:rgba(255,255,255,0.6);line-height:1.6;">
        📋 Please fill in your details before starting the exam. Make sure your information is correct.
      </div>
      <div class="form-group"><label>Full Name</label><input type="text" id="exam-student-name" placeholder="Your full name as per school records"></div>
      <div class="form-row">
        <div class="form-group"><label>Roll Number</label><input type="text" id="exam-roll-no" placeholder="e.g. 2024001"></div>
        <div class="form-group"><label>Section</label><input type="text" id="exam-section" placeholder="e.g. A, B, C"></div>
      </div>
      <div class="form-group"><label>School Name</label><input type="text" id="exam-school-name" placeholder="Your school name"></div>
      <button class="btn-submit" onclick="startExamAttempt()">Start Exam →</button>
    </div>
    <!-- Step 2: Questions -->
    <div id="exam-questions-step" style="display:none;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid rgba(79,195,247,0.15);">
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.5);" id="exam-progress-label">Question 1 of 10</div>
        <div style="font-family:Syne,sans-serif;font-weight:700;color:#ff6b6b;font-size:0.95rem;" id="exam-timer">⏱ 30:00</div>
      </div>
      <div id="exam-questions-container"></div>
      <button class="btn-submit" onclick="submitExam()" style="margin-top:1rem;">Submit Exam ✓</button>
    </div>
    <!-- Step 3: Result -->
    <div id="exam-result-step" style="display:none;text-align:center;padding:1rem 0;">
      <div style="font-size:3rem;margin-bottom:1rem;">🎉</div>
      <div style="font-family:Syne,sans-serif;font-weight:800;font-size:1.5rem;color:#4fc3f7;margin-bottom:0.5rem;" id="exam-result-score"></div>
      <div style="color:rgba(255,255,255,0.55);margin-bottom:1.5rem;" id="exam-result-msg"></div>
      <div id="exam-result-breakdown" style="text-align:left;margin-bottom:1.5rem;"></div>
      <button class="btn-submit" onclick="closeModal('exam-attempt-modal')" style="width:auto;padding:10px 28px;">Close</button>
    </div>
  </div>
</div>

<!-- UPLOAD EXAM MODAL (Teacher/Admin only) -->
<div class="modal-overlay" id="upload-exam-modal">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title">📤 Upload Exam Paper</div>
      <button class="modal-close" onclick="closeModal('upload-exam-modal')">✕</button>
    </div>
    <div class="form-group"><label>Exam Title</label><input type="text" id="ue-title" placeholder="e.g. Scientific Attitude Test — Class 10"></div>
    <div class="form-row">
      <div class="form-group"><label>Subject / Type</label>
        <select id="ue-type">
          <option value="attitude">🧠 Scientific Attitude</option>
          <option value="psychometric">📊 Psychometric</option>
          <option value="aptitude">🔬 Scientific Aptitude</option>
        </select>
      </div>
      <div class="form-group"><label>Duration (minutes)</label><input type="number" id="ue-duration" placeholder="30" value="30" min="5" max="180"><div id="ue-duration-note" style="font-size:0.72rem;color:rgba(255,255,255,0.4);margin-top:4px;"></div></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Target Class / Grade</label><input type="text" id="ue-class" placeholder="e.g. Class 10, All"></div>
      <div class="form-group"><label>Exam Date</label><input type="date" id="ue-date"></div>
    </div>
    <div class="form-group"><label>Allowed School <span style="color:#4fc3f7;font-size:0.75rem;">(this exam will only be visible to students of this school)</span></label><input type="text" id="ue-school" placeholder="School name or leave blank"><div id="ue-school-note" style="font-size:0.72rem;color:rgba(255,255,255,0.4);margin-top:4px;"></div></div>
    <div class="form-row">
      <div class="form-group">
        <label>Exam ID / Code <span style="color:#4fc3f7;font-size:0.75rem;">(students use this to access exam)</span></label>
        <input type="text" id="ue-code" placeholder="e.g. SAT2024 (auto-generated if blank)">
      </div>
      <div class="form-group">
        <label>Exam Password <span style="color:#ffd54f;font-size:0.75rem;">(required to start)</span></label>
        <input type="text" id="ue-password" placeholder="e.g. science@123">
      </div>
    </div>
    <div class="form-group">
      <label>📎 Upload Question Paper File <span style="color:rgba(255,255,255,0.4);font-size:0.75rem;">(optional — PDF, Word, or image, max 5MB)</span></label>
      <input type="file" id="ue-file" accept=".pdf,.doc,.docx,image/*" onchange="handleExamFileSelect(event)">
      <div id="ue-file-note" style="font-size:0.72rem;color:rgba(255,255,255,0.4);margin-top:4px;"></div>
    </div>
    <div style="font-size:0.875rem;font-weight:500;color:var(--text);margin-bottom:0.75rem;">Questions <span style="color:rgba(255,255,255,0.4);font-size:0.75rem;">(add at least 1 — or upload a question paper file above instead)</span></div>
    <div id="questions-builder"></div>
    <button onclick="addQuestion()" style="background:rgba(79,195,247,0.1);border:1px solid rgba(79,195,247,0.3);color:#4fc3f7;border-radius:8px;padding:8px 16px;cursor:pointer;font-family:inherit;font-size:0.85rem;margin-bottom:1rem;width:100%;">+ Add Question</button>
    <button class="btn-submit" onclick="uploadExam()">Upload Exam Paper</button>
  </div>
</div>


<!-- RATINGS PAGE -->
<div class="page" id="page-ratings">
  <div class="section" style="padding-top:2rem;">
    <div class="section-header">
      <div><div class="section-title">All Ratings</div><div class="section-sub">Browse and filter scientific assessments</div></div>
      <button class="nav-btn primary" style="border:none;" onclick="openModal('add-modal')">+ Add Rating</button>
    </div>
    <div class="search-wrap">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Search by name, topic, or keyword…" id="search-input" oninput="renderRatings()">
    </div>
    <div class="filter-bar">
      <button class="filter-chip active" onclick="setFilter('all', this)">All</button>
      <button class="filter-chip" onclick="setFilter('curiosity', this)">🔬 Curiosity</button>
      <button class="filter-chip" onclick="setFilter('attitude', this)">🧠 Attitude</button>
      <button class="filter-chip" onclick="setFilter('paper', this)">📄 Research Paper</button>
      <button class="filter-chip" onclick="setFilter('tool', this)">🛠 Tool</button>
      <button class="filter-chip" onclick="setFilter('general', this)">⭐ General</button>
    </div>
    <div class="cards-grid" id="all-cards"></div>
  </div>
</div>

<!-- DETAIL PAGE -->
<div class="page" id="page-detail">
  <div class="detail-hero">
    <div class="detail-inner">
      <div style="margin-bottom:1rem;">
        <button onclick="goBack()" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-family:inherit;font-size:0.875rem;padding:0;">← Back</button>
      </div>
      <div class="detail-tag" id="detail-tag"></div>
      <div class="detail-title" id="detail-title"></div>
      <div class="detail-sub" id="detail-sub"></div>
      <div class="detail-metrics" id="detail-metrics"></div>
    </div>
  </div>
  <div class="section" style="padding-top:2rem; display:grid; grid-template-columns: 1fr 320px; gap:2rem;" id="detail-content">
    <div>
      <div class="tab-bar">
        <button class="tab active" onclick="setDetailTab('reviews', this)">Reviews</button>
        <button class="tab" onclick="setDetailTab('traits', this)">Trait Analysis</button>
      </div>
      <div id="detail-reviews"></div>
      <div id="detail-traits" style="display:none;"></div>
      <div style="margin-top:1.5rem;" id="add-review-section"></div>
    </div>
    <div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;box-shadow:var(--shadow);">
        <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;margin-bottom:1rem;">Score Breakdown</div>
        <div id="detail-breakdown"></div>
      </div>
    </div>
  </div>
</div>

<!-- LEADERBOARD PAGE -->
<div class="page" id="page-leaderboard">
  <div class="section" style="padding-top:2rem;">
    <div class="section-header">
      <div><div class="section-title"> Leaderboard</div><div class="section-sub">Top-rated students by scientific performance</div></div>
    </div>
    <div class="tab-bar">
      <button class="tab active" onclick="setLbTab('overall', this)">Overall</button>
      <button class="tab" onclick="setLbTab('curiosity', this)">Curiosity</button>
      <button class="tab" onclick="setLbTab('attitude', this)">Attitude</button>
    </div>
    <div id="leaderboard-list"></div>
  </div>
</div>

<!-- AUTH PAGE -->
<div class="page" id="page-auth">
  <div class="auth-wrap">
    <div id="auth-tab-bar" style="display:flex;gap:8px;margin-bottom:1.25rem;background:rgba(14,21,48,0.9);border:1px solid rgba(79,195,247,0.15);border-radius:12px;padding:6px;">
      <button id="auth-tab-normal" onclick="setAuthMode('normal')" style="flex:1;padding:10px;border:none;border-radius:8px;font-family:inherit;font-size:0.85rem;font-weight:600;cursor:pointer;background:var(--surface2);color:#fff;">🎓 Student / School</button>
      <button id="auth-tab-admin" onclick="setAuthMode('admin')" style="flex:1;padding:10px;border:none;border-radius:8px;font-family:inherit;font-size:0.85rem;font-weight:600;cursor:pointer;background:transparent;color:rgba(255,255,255,0.5);">🔒 Admin</button>
    </div>
    <div class="auth-card"><div id="auth-form-area"></div></div>
    <div class="auth-switch" id="auth-switch-area"></div>
  </div>
</div>

<!-- PROFILE PAGE -->
<div class="page" id="page-profile">
  <div class="section" style="padding-top:2rem; max-width:700px;">
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:2rem;">
      <div class="avatar" id="profile-avatar" style="width:56px;height:56px;font-size:1.1rem;border-radius:50%;"></div>
      <div>
        <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:1.25rem;" id="profile-name"></div>
        <div style="color:var(--text-muted);font-size:0.875rem;" id="profile-role-label"></div>
      </div>
    </div>
    <div id="profile-extra-info"></div>
    <div id="profile-student-login" style="margin-bottom:2rem;"></div>
  </div>
</div>

<!-- PRINCIPAL DASHBOARD PAGE -->
<div class="page" id="page-principal">
  <div class="principal-dashboard">
    <div class="principal-header">
      <div class="principal-header-icon">🏛️</div>
      <div>
        <div class="principal-header-title" id="principal-school-name">School Dashboard</div>
        <div class="principal-header-sub" id="principal-school-sub">View and monitor your school's student ratings</div>
      </div>
    </div>
    <div class="school-stat-grid" id="principal-stats"></div>

    <div style="margin-bottom:1rem;">
      <div class="section-title" style="margin-bottom:0.5rem;">🏆 Top Students</div>
      <div class="section-sub">Ranked by overall scientific performance score</div>
    </div>
    <div id="principal-top-students" style="margin-bottom:2.5rem;"></div>

    <div style="margin-bottom:1.5rem;">
      <div class="section-title" style="margin-bottom:0.5rem;">All Student Ratings</div>
      <div class="section-sub">Every rating submitted for students in your school</div>
    </div>
    <div class="search-wrap">
      <span class="search-icon">🔍</span>
      <input type="text" placeholder="Search student name…" id="principal-search" oninput="renderPrincipalDashboard()">
    </div>
    <div class="cards-grid" id="principal-cards"></div>
  </div>
</div>

<!-- ADMIN PAGE -->
<div class="page" id="page-admin">
  <div class="section" style="padding-top:2rem;">
    <div class="section-title" style="margin-bottom:1.5rem;">⚙️ Admin Dashboard</div>
    <div class="admin-grid" id="admin-stats"></div>
    <div class="tab-bar">
      <button class="tab active" onclick="setAdminTab('schools', this)">Schools</button>
      <button class="tab" onclick="setAdminTab('questions', this)">🧬 Generate Questions</button>
      <button class="tab" onclick="setAdminTab('results', this)">📊 Exam Results</button>
      <button class="tab" onclick="setAdminTab('studentlogin', this)">🔑 Student Login</button>
    </div>
    <div id="admin-content"></div>
  </div>
</div>

<!-- ADD / EDIT SCIENCE QUESTION MODAL -->
<div class="modal-overlay" id="sq-modal">
  <div class="modal" style="max-width:480px;">
    <div class="modal-header">
      <div class="modal-title" id="sq-modal-title">Add Science Question</div>
      <button class="modal-close" onclick="closeModal('sq-modal')">✕</button>
    </div>
    <input type="hidden" id="sq-edit-id">
    <div class="form-group">
      <label>Question Statement</label>
      <textarea id="sq-text" rows="3" placeholder="e.g. Plants play a vital role in balancing our ecosystem."></textarea>
    </div>
    <div class="form-group">
      <label>Illustration Image <span style="font-weight:400;color:var(--text-muted);">(recommended — a simple black &amp; white scitoon shown next to this question. Keep it related to this question only.)</span></label>
      <input type="file" id="sq-image-file" accept="image/*" onchange="sqHandleImageUpload(event)">
      <input type="hidden" id="sq-image-data">
      <div id="sq-image-preview-wrap" style="display:none;margin-top:10px;position:relative;max-width:200px;">
        <img id="sq-image-preview" style="width:100%;display:block;border-radius:8px;border:1px solid var(--border);background:#fff;" alt="Preview">
        <button type="button" onclick="sqRemoveImage()" title="Remove image" style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.65);color:#fff;border:none;border-radius:6px;width:26px;height:26px;cursor:pointer;font-size:0.85rem;">✕</button>
      </div>
      <div style="font-size:0.72rem;color:var(--text-faint);margin-top:6px;">No image uploaded → a generic black &amp; white science illustration is shown instead.</div>
    </div>
    <div class="form-group">
      <label>Section <span style="font-weight:400;color:var(--text-muted);">(groups this question on the Generate Questions page, like the tabs in the survey sheet)</span></label>
      <select id="sq-category">
        <option value="">No Section / General</option>
        <option value="Rationality">Rationality</option>
        <option value="Open-mindedness">Open-mindedness</option>
        <option value="Confidence in Scientific Method">Confidence in Scientific Method</option>
        <option value="Curiosity">Curiosity</option>
        <option value="Aversion to Superstition">Aversion to Superstition</option>
      </select>
    </div>
    <div style="background:var(--surface2);border-radius:var(--radius);padding:1rem;margin-bottom:1.25rem;">
      <div style="font-size:0.8rem;font-weight:600;color:var(--text-muted);margin-bottom:0.75rem;">🎯 Target Audience <span style="font-weight:400;">(optional — leave blank to show to every school/class)</span></div>
      <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div class="form-group" style="margin-bottom:0;"><label>School Name</label><input type="text" id="sq-school" placeholder="e.g. Delhi Public School"></div>
        <div class="form-group" style="margin-bottom:0;"><label>Class</label><input type="text" id="sq-class" placeholder="e.g. 9th, 10-A, or a range like 9-12"></div>
      </div>
    </div>
    <button class="btn-submit" onclick="saveQuestionForm()">Save Question</button>
  </div>
</div>

<!-- SCIENCE QUESTION PREVIEW PLAYER -->
<div class="sq-player-overlay" id="sq-player-overlay">
  <div class="sq-player">
    <div class="sq-player-head">
      <div class="sq-player-title" id="sq-player-title">🧬 Scientific Attitude Study (S.A.S) — Preview</div>
      <button class="sq-player-close" id="sq-player-close" onclick="closeQuestionPreview()">✕</button>
    </div>
    <div class="sq-page-grid" id="sq-page-grid"></div>
    <div class="sq-player-nav" id="sq-player-nav">
      <button class="sq-btn sq-btn-ghost" id="sq-prev-btn" onclick="sqPrevPage()">← Prev</button>
      <div class="sq-page-dots" id="sq-page-dots"></div>
      <button class="sq-btn sq-btn-primary" id="sq-next-btn" onclick="sqNextPage()">Next →</button>
    </div>
    <div class="sq-thankyou" id="sq-thankyou">
      <div class="sq-thankyou-icon">🎉</div>
      <div class="sq-thankyou-title">Thank You!</div>
      <div class="sq-thankyou-msg" id="sq-thankyou-msg">You've completed the Scientific Attitude Study (S.A.S). Your responses have been recorded — thanks for taking the time to share your thoughts!</div>
      <button class="sq-btn sq-btn-primary" onclick="closeQuestionPreview()">Done ✓</button>
    </div>
  </div>
</div>

<!-- ADD RATING MODAL -->
<div class="modal-overlay" id="add-modal">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title">Submit Scientific Rating</div>
      <button class="modal-close" onclick="closeModal('add-modal')">✕</button>
    </div>
    <div class="form-group">
      <label>Student / Subject Name</label>
      <input type="text" id="f-name" placeholder="Full name of the student">
    </div>
    <div class="form-group">
      <label>Rating Category</label>
      <select id="f-category">
        <option value="general">⭐ General Scientific Rating</option>
        <option value="curiosity">🔬 Scientific Curiosity</option>
        <option value="attitude">🧠 Scientific Attitude</option>
        <option value="paper">📄 Research Paper</option>
        <option value="tool">🛠 Scientific Tool / Software</option>
      </select>
    </div>
    <div class="form-group">
      <label>Brief Description / Topic</label>
      <input type="text" id="f-topic" placeholder="e.g. Presentation on CRISPR, Lab report quality…">
    </div>
    <div class="form-group" id="f-school-group" style="display:none;">
      <label>School Name (optional)</label>
      <input type="text" id="f-school" placeholder="Student's school name">
    </div>
    <div class="form-group">
      <label>Overall Rating</label>
      <div class="star-rating-input" id="star-input">
        <span class="star-input" data-val="1" onclick="setStars(1)">★</span>
        <span class="star-input" data-val="2" onclick="setStars(2)">★</span>
        <span class="star-input" data-val="3" onclick="setStars(3)">★</span>
        <span class="star-input" data-val="4" onclick="setStars(4)">★</span>
        <span class="star-input" data-val="5" onclick="setStars(5)">★</span>
      </div>
    </div>
    <div style="background:var(--surface2);border-radius:var(--radius);padding:1.25rem;margin-bottom:1.25rem;">
      <div style="font-size:0.875rem;font-weight:500;margin-bottom:1rem;color:var(--text-muted);">Scientific Trait Scores</div>
      <div class="trait-row">
        <div class="trait-header"><span class="trait-name">🔬 Curiosity Level</span><span class="trait-val" id="v-curiosity">5</span></div>
        <input type="range" min="1" max="10" value="5" id="s-curiosity" oninput="document.getElementById('v-curiosity').textContent=this.value">
      </div>
      <div class="trait-row">
        <div class="trait-header"><span class="trait-name">🧠 Scientific Attitude</span><span class="trait-val" id="v-attitude">5</span></div>
        <input type="range" min="1" max="10" value="5" id="s-attitude" oninput="document.getElementById('v-attitude').textContent=this.value">
      </div>
      <div class="trait-row">
        <div class="trait-header"><span class="trait-name">💬 Communication Skills</span><span class="trait-val" id="v-comm">5</span></div>
        <input type="range" min="1" max="10" value="5" id="s-comm" oninput="document.getElementById('v-comm').textContent=this.value">
      </div>
      <div class="trait-row">
        <div class="trait-header"><span class="trait-name">🔭 Research Depth</span><span class="trait-val" id="v-research">5</span></div>
        <input type="range" min="1" max="10" value="5" id="s-research" oninput="document.getElementById('v-research').textContent=this.value">
      </div>
      <div class="trait-row">
        <div class="trait-header"><span class="trait-name">💡 Innovation Thinking</span><span class="trait-val" id="v-innovation">5</span></div>
        <input type="range" min="1" max="10" value="5" id="s-innovation" oninput="document.getElementById('v-innovation').textContent=this.value">
      </div>
    </div>
    <div class="form-group">
      <label>Detailed Review</label>
      <textarea id="f-review" placeholder="Share your observations about this student's scientific approach, strengths, and areas for growth…"></textarea>
    </div>
    <button class="btn-submit" onclick="submitRating()">Submit Rating</button>
  </div>
</div>

<!-- REGISTER TYPE MODAL -->
<div class="modal-overlay" id="register-type-modal">
  <div class="modal" style="max-width:720px;">
    <div class="modal-header">
      <div class="modal-title">Choose Your Registration Type</div>
      <button class="modal-close" onclick="closeModal('register-type-modal')">✕</button>
    </div>
    <div class="reg-type-sub">Register your school and enable students to participate through your institution.</div>
    <div class="reg-type-grid" style="grid-template-columns:1fr;max-width:340px;margin:0 auto;">
      <div class="reg-type-card school">
        <div class="reg-type-icon">🏫</div>
        <div class="reg-type-title">School Registration</div>
        <div class="reg-type-desc">Register your school and enable students to participate through your institution.</div>
        <button class="reg-type-btn" onclick="closeModal('register-type-modal'); showPage('auth'); renderAuth(false, 'school');">Register Now →</button>
      </div>
    </div>
  </div>
</div>

<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:0.75rem;">
        <div style="background:white;border-radius:10px;padding:6px 10px;display:inline-flex;align-items:center;justify-content:center;">
          <span style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:#1a237e;letter-spacing:0.05em;">SCICOMM</span>
        </div>
      </div>
        <div class="footer-desc">A platform to rate and track scientific curiosity, attitude and communication skills of students. Built to make science evaluation simple and meaningful.</div>
        <div class="footer-social">
          <a class="social-btn" href="https://facebook.com" target="_blank" title="Facebook">f</a>
          <a class="social-btn" href="https://twitter.com" target="_blank" title="Twitter / X">𝕏</a>
          <a class="social-btn" href="https://instagram.com" target="_blank" title="Instagram" style="padding:0;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" stroke-width="2"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </a>
          <a class="social-btn" href="https://linkedin.com" target="_blank" title="LinkedIn">in</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Navigate</div>
        <button class="footer-link" onclick="showPage('home')">Home</button>
        <button class="footer-link" onclick="showPage('about')">About Us</button>
        <button class="footer-link" onclick="showPage('ratings')">Browse Ratings</button>
        <button class="footer-link" onclick="showPage('leaderboard')">Leaderboard</button>
        <button class="footer-link" onclick="showPage('exam')">Exams</button>
        <button class="footer-link" onclick="openModal('add-modal')">Submit a Rating</button>
        <button class="footer-link" onclick="showPage('contact')">Contact Us</button>
      </div>
      <div>
        <div class="footer-col-title">About</div>
        <span class="footer-link">Scientific Method</span>
        <span class="footer-link">Rating Criteria</span>
        <span class="footer-link">Privacy Policy</span>
        <button class="footer-link" onclick="showPage('contact')">Contact Office</button>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2026 SciComm Hub. All rights reserved.</div>
    </div>
  </div>
</footer>

<script>
// ===================== DATA STORE =====================
// IMPORTANT: this app's data (questions, illustration images, exams, etc.)
// used to live only in the browser's own localStorage. localStorage is
// PRIVATE TO EACH BROWSER/DEVICE — nothing saved there is ever sent
// anywhere else. That's why an admin-uploaded illustration image showed up
// fine on the device that uploaded it, but every other device just saw its
// own empty/blank local copy and fell back to the generic placeholder
// illustration.
//
// Fix: persist through window.storage, a real server-side key/value store
// (shared:true) that all devices/browsers read from and write to, so an
// uploaded image is visible everywhere, not just on the device that
// uploaded it.
//
// A second, related bug: science questions (with their illustration images)
// were all saved together as ONE combined save every time a single question
// was added/edited. As more illustrations were uploaded over time, that
// combined save got larger and larger, and once it got big enough a save
// could silently fail — which left the *shared* copy stuck on an older,
// mostly-imageless version of the question list. The admin's own screen
// still looked right (it reads its own up-to-date in-memory copy right
// after saving), but anyone re-loading the page — including "Preview
// Questions" after a reload, or students, or other devices — would fall
// back to that stale/imageless shared copy, which is why every question
// appeared to show the exact same (default) illustration.
//
// Fix: every science question now gets its OWN separate storage key. Saving
// one question's image can never be blocked, delayed, or overwritten by
// any other question's data, no matter how many illustrations pile up.
//
// ===================== BACKEND API LAYER =====================
// Users, ratings, exams, exam results and settings now live in a real
// database on a backend server, instead of the browser. This means data is
// shared across every device and browser, not stuck on just one.
//
// The Science Questions quiz module (with its illustration images) and the
// "registeredStudents" list are NOT connected to that backend yet — they
// still save to this browser only (localStorage), same as the whole app
// used to work. They can be connected later the same way everything else
// here was.
const API_BASE = 'https://extraordinary-energy-production-6518.up.railway.app';

let accessToken = null;
let refreshToken = null;

async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (accessToken) headers['Authorization'] = 'Bearer ' + accessToken;
  const res = await fetch(API_BASE + path, { ...options, headers });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) throw new Error((data && data.error) || 'Something went wrong. Please try again.');
  return data;
}

async function apiUpload(path, file) {
  const form = new FormData();
  form.append('file', file);
  const headers = {};
  if (accessToken) headers['Authorization'] = 'Bearer ' + accessToken;
  const res = await fetch(API_BASE + path, { method: 'POST', headers, body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'File upload failed');
  return data;
}

const HAS_CLOUD_STORAGE = false; // window.storage only exists inside Claude.ai's own preview, not on a real hosted site
const DB_KEY = 'scicomm_db';
const CORE_KEY = 'scicomm_core';        // users, ratings, registeredStudents, settings, examAttempts
const EXAMS_KEY = 'scicomm_exams';      // exams (incl. uploaded question-paper files)
const SQ_INDEX_KEY = 'sq_index';        // ordered list of science-question IDs
const SQ_ITEM_PREFIX = 'sq_item_';      // + question id -> that one question (incl. its image)
const EMPTY_DB = { users: [], ratings: [], registeredStudents: [], settings: {}, examAttempts: [], scienceQuestions: [], exams: [] };

let currentUser = null;
let currentFilter = 'all';
let currentStars = 0;
let prevPage = 'home';
let lbTab = 'overall';
let adminTab = 'schools';

// In-memory copy of the database. Once loaded (see loadDBFromStorage /
// bootstrap below), getDB() just returns this synchronously — the rest of
// the app is written as if storage were synchronous, so we keep that
// contract and do the actual persistence to window.storage in the
// background from saveDB() / sqPersist*().
let DB_CACHE = null;

function getDB() {
  if (!DB_CACHE) DB_CACHE = { ...EMPTY_DB };
  return DB_CACHE;
}

// Loads users/ratings/exams/examAttempts/settings from the real backend
// database. Science questions and registeredStudents stay local for now.
// Must be awaited once, before the app renders anything.
async function loadDBFromStorage() {
  const local = (() => {
    try { return JSON.parse(localStorage.getItem(DB_KEY)) || {}; } catch { return {}; }
  })();
  DB_CACHE = {
    ...EMPTY_DB,
    scienceQuestions: local.scienceQuestions || [],
    registeredStudents: local.registeredStudents || [],
    settings: local.settings || {}, // local-only flags (e.g. scienceQuestionsSeeded) live here
  };
  try { DB_CACHE.ratings = await api('/api/ratings'); } catch (e) { console.error(e); }
  if (currentUser) { try { DB_CACHE.exams = await api('/api/exams'); } catch (e) { console.error(e); } }
  return DB_CACHE;
}

// Persists science questions + registeredStudents to this browser's
// localStorage (unchanged from before). Everything else (users, ratings,
// exams, exam results, settings) is written to the real backend via
// explicit api() calls inside each action (login, submitRating, etc.) —
// this function no longer needs to save those itself.
function saveDB(db) {
  DB_CACHE = db;
  try {
    localStorage.setItem(DB_KEY, JSON.stringify({
      scienceQuestions: db.scienceQuestions || [],
      registeredStudents: db.registeredStudents || [],
      settings: db.settings || {},
    }));
    return true;
  } catch (err) {
    console.error('saveDB failed:', err);
    showToast('⚠️ Could not save — storage is full. Try a smaller image or remove some old images.', 'error');
    return false;
  }
}

// Persists ONE science question (add or edit) to its own storage key, plus
// the shared index of question IDs if the set of questions changed. This is
// what the admin add/edit form calls, so uploading an illustration for one
// question is never affected by how many images every OTHER question has.
async function sqPersistOne(db, q) {
  if (!HAS_CLOUD_STORAGE) { saveDB(db); return; }
  try {
    const ids = (db.scienceQuestions || []).map(x => x.id);
    const res = await window.storage.set(SQ_ITEM_PREFIX + q.id, JSON.stringify(q), true);
    if (!res) throw new Error('storage.set returned no result');
    await window.storage.set(SQ_INDEX_KEY, JSON.stringify(ids), true);
  } catch (err) {
    console.error('sqPersistOne failed:', err);
    showToast('⚠️ Could not save this question to the server — try a smaller image, or check your connection and try again.', 'error');
  }
}

// Removes one science question's storage key and updates the index.
async function sqPersistDelete(db, id) {
  if (!HAS_CLOUD_STORAGE) { saveDB(db); return; }
  try {
    const ids = (db.scienceQuestions || []).map(x => x.id);
    await window.storage.set(SQ_INDEX_KEY, JSON.stringify(ids), true);
    await window.storage.delete(SQ_ITEM_PREFIX + id, true);
  } catch (err) {
    console.error('sqPersistDelete failed:', err);
  }
}

// Persists every current science question to its own key. Used only by the
// one-time starter-question seeding (see seedScienceQuestions) — a bulk
// operation that happens once per fresh install, not on every edit.
async function sqPersistAll(db) {
  if (!HAS_CLOUD_STORAGE) { saveDB(db); return; }
  try {
    const qs = db.scienceQuestions || [];
    const ids = qs.map(q => q.id);
    await window.storage.set(SQ_INDEX_KEY, JSON.stringify(ids), true);
    await Promise.all(qs.map(q => window.storage.set(SQ_ITEM_PREFIX + q.id, JSON.stringify(q), true)));
  } catch (err) {
    console.error('sqPersistAll failed:', err);
  }
}

function loadSession() {
  const s = localStorage.getItem('scicomm_session');
  if (s) {
    try {
      const parsed = JSON.parse(s);
      currentUser = parsed.user;
      accessToken = parsed.accessToken;
      refreshToken = parsed.refreshToken;
      updateNavForUser();
    } catch {}
  }
}
function saveSession(user, tokens) {
  currentUser = user;
  accessToken = tokens.accessToken;
  refreshToken = tokens.refreshToken;
  localStorage.setItem('scicomm_session', JSON.stringify({ user, accessToken, refreshToken }));
}
function clearSession() {
  currentUser = null; accessToken = null; refreshToken = null;
  localStorage.removeItem('scicomm_session');
}
async function loadUsers() {
  if (!currentUser || currentUser.role !== 'admin') return;
  try { DB_CACHE.users = await api('/api/users'); } catch (e) { console.error(e); }
}
async function loadExamAttempts() {
  if (!currentUser || currentUser.role !== 'admin') return;
  try { DB_CACHE.examAttempts = await api('/api/exam-attempts'); } catch (e) { console.error(e); }
}
async function loadExams() {
  if (!currentUser) { DB_CACHE.exams = []; return; }
  try { DB_CACHE.exams = (await api('/api/exams')).map(ex => ({ ...ex, questions: (ex.questions || []).map(q => ({ ...q, text: q.question })) })); } catch (e) { console.error(e); }
}
async function loadRatings() {
  try { DB_CACHE.ratings = await api('/api/ratings'); } catch (e) { console.error(e); }
}

// Seed data now lives in the real backend database (loaded via loadDBFromStorage),
// not generated locally in this browser — that's the whole point of connecting a
// real backend. This function is intentionally removed.

// ===================== NAV & PAGES =====================
function showPage(id) {
  prevPage = document.querySelector('.page.active')?.id?.replace('page-', '') || 'home';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id)?.classList.add('active');
  window.scrollTo(0, 0);
  const backBtn = document.getElementById('global-back-btn');
  if (backBtn) backBtn.style.display = (id === 'home') ? 'none' : 'inline-flex';
  if (id === 'home') renderHome();
  if (id === 'ratings') renderRatings();
  if (id === 'leaderboard') renderLeaderboard();
  if (id === 'auth') { authMode = 'normal'; renderAuth(true); const nt=document.getElementById('auth-tab-normal'), at=document.getElementById('auth-tab-admin'); if (nt && at) { nt.style.background='var(--surface2)'; nt.style.color='#fff'; at.style.background='transparent'; at.style.color='rgba(255,255,255,0.5)'; } }
  if (id === 'profile') renderProfile();
  if (id === 'admin') renderAdmin();
  if (id === 'about') {}
  if (id === 'teams') {}
  if (id === 'exam') renderExamPage();
  if (id === 'principal') renderPrincipalDashboard();
  if (id === 'about' || id.indexOf('about-') === 0) {
    const nb = document.querySelector(`.nav-btn[onclick*="showPage('about')"]`);
    if (nb) setActive(nb);
  }
}
function goBack() { showPage(prevPage || 'home'); }
function goToSection(page, sectionId) {
  showPage(page);
  const nb = document.querySelector(`.nav-btn[onclick*="showPage('${page}')"]`);
  if (nb) setActive(nb);
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 60);
}
function setActive(el) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function updateNavForUser() {
  const floatingRegisterBtn = document.getElementById('floating-register-btn');
  if (currentUser) {
    document.getElementById('nav-links').style.display = 'none';
    document.getElementById('nav-signin-btn').style.display = 'none';
    document.getElementById('user-nav').style.display = 'flex';
    document.getElementById('user-name-nav').textContent = currentUser.name;
    document.getElementById('user-avatar').textContent = initials(currentUser.name);
    if (floatingRegisterBtn) floatingRegisterBtn.style.display = 'none';

    const ul = document.getElementById('user-nav');
    // Remove old dynamic buttons
    ul.querySelectorAll('.dyn-nav-btn').forEach(b => b.remove());

    if (currentUser.role === 'admin') {
      const b = document.createElement('button');
      b.className = 'nav-btn dyn-nav-btn';
      b.innerHTML = '⚙️ Admin Panel';
      b.onclick = () => showPage('admin');
      ul.prepend(b);
    }
    if (currentUser.role === 'principal') {
      const b = document.createElement('button');
      b.className = 'nav-btn dyn-nav-btn'; b.textContent = '🏛️ Dashboard'; b.onclick = () => showPage('principal');
      ul.prepend(b);
    }
    // Keep the main site navigation (Home, About, Teams) visible in the
    // header even while logged in — grouped together with the profile/sign-out controls on the right,
    // instead of disappearing once a student (or anyone else) signs in.
    const navGroup = document.createElement('div');
    navGroup.className = 'dyn-nav-btn';
    navGroup.style.cssText = 'display:contents;';
    navGroup.innerHTML = `
      <button class="nav-btn" onclick="showPage('home'); setActive(this)">Home</button>
      <div class="nav-item">
        <button class="nav-btn nav-btn-dd" onclick="showPage('about'); setActive(this)">
          About Us
          <svg class="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="nav-tooltip">
        <div class="nav-tooltip-panel">
        <div class="nav-tooltip-title">Inside About Us</div>
          <button class="nav-tooltip-item" onclick="showPage('about-story')">Our Story</button>
          <button class="nav-tooltip-item" onclick="showPage('about-whatwedo')">What We Do</button>
          <button class="nav-tooltip-item" onclick="showPage('about-mission')">Mission &amp; Vision</button>
          <button class="nav-tooltip-item" onclick="showPage('about-why')">Why Choose SciComm?</button>
          <button class="nav-tooltip-item" onclick="showPage('about-commitment')">Our Commitment</button>
        </div>
      </div>
      </div>
      <button class="nav-btn" onclick="showPage('teams'); setActive(this)">Team</button>
      <div class="nav-item">
        <button class="nav-btn nav-btn-dd" onclick="showPage('brochure'); setActive(this)">
          Brochure
          <svg class="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="nav-tooltip">
        <div class="nav-tooltip-panel">
        <div class="nav-tooltip-title">Inside Brochure</div>
          <button class="nav-tooltip-item" onclick="showPage('brochure')">Program Overview</button>
        </div>
      </div>
      </div>
      <div class="nav-item">
        <button class="nav-btn nav-btn-dd" onclick="showPage('client'); setActive(this)">
          Client
          <svg class="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="nav-tooltip">
        <div class="nav-tooltip-panel">
        <div class="nav-tooltip-title">Inside Client</div>
          <button class="nav-tooltip-item" onclick="showPage('client')">List of Clients</button>
        </div>
      </div>
      </div>
      <div class="nav-item">
        <button class="nav-btn nav-btn-dd" onclick="showPage('archive'); setActive(this)">
          Archive
          <svg class="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="nav-tooltip">
        <div class="nav-tooltip-panel">
        <div class="nav-tooltip-title">Inside Archive</div>
          <button class="nav-tooltip-item" onclick="showPage('archive')">Previous Data</button>
        </div>
      </div>
      </div>
      <button class="nav-btn" onclick="showPage('contact'); setActive(this)">Contact Us</button>`;
    ul.prepend(navGroup);
    // Show school name field in rating modal if teacher
    const sg = document.getElementById('f-school-group');
    if (sg) sg.style.display = (currentUser.role === 'teacher' || currentUser.role === 'admin') ? '' : 'none';
  } else {
    document.getElementById('nav-links').style.display = 'flex';
    document.getElementById('nav-signin-btn').style.display = '';
    document.getElementById('user-nav').style.display = 'none';
    if (floatingRegisterBtn) floatingRegisterBtn.style.display = '';
  }
}

// ===================== AUTH =====================
let authMode = 'normal';
function setAuthMode(mode) {
  authMode = mode;
  const normalTab = document.getElementById('auth-tab-normal');
  const adminTab = document.getElementById('auth-tab-admin');
  if (mode === 'admin') {
    adminTab.style.background = 'var(--surface2)'; adminTab.style.color = '#ffd54f';
    normalTab.style.background = 'transparent'; normalTab.style.color = 'rgba(255,255,255,0.5)';
  } else {
    normalTab.style.background = 'var(--surface2)'; normalTab.style.color = '#fff';
    adminTab.style.background = 'transparent'; adminTab.style.color = 'rgba(255,255,255,0.5)';
  }
  renderAuth(true);
}

function renderAuth(isLogin, forcedRole) {
  const area = document.getElementById('auth-form-area');
  const sw = document.getElementById('auth-switch-area');
  const tabBar = document.getElementById('auth-tab-bar');
  if (tabBar) tabBar.style.display = isLogin ? 'flex' : 'none';

  if (authMode === 'admin') {
    // Dedicated Admin Login — separate from the student/teacher/school panel, no self-signup.
    area.innerHTML = `
      <div class="auth-title">🔒 Admin Login</div>
      <div class="auth-sub">Restricted access — authorized administrators only</div>
      <div class="form-group"><label>Admin Email</label><input type="email" id="a-email" placeholder="admin@scicomm.in"></div>
      ${passwordViewFieldHtml('a-pass', '••••••••')}
      <button class="btn-submit" onclick="doAdminLogin()" style="background:linear-gradient(135deg,#ffd54f,#c9971f);color:#070b1a;">Sign In as Admin</button>`;
    sw.innerHTML = `Not an admin? <button onclick="setAuthMode('normal')">Go to Student / School login</button>`;
    return;
  }

  if (isLogin) {
    area.innerHTML = `
      <div class="auth-title">Welcome back</div>
      <div class="auth-sub">Sign in to your SciComm Hub account</div>
      <div class="form-group"><label>Full Name</label><input type="text" id="a-login-name" placeholder="Your full name"></div>
      <div class="form-row">
        <div class="form-group"><label>Father's Name</label><input type="text" id="a-login-fathername" placeholder="Father's full name"></div>
        <div class="form-group"><label>Date of Birth</label><input type="date" id="a-login-dob"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Class</label><input type="text" id="a-login-class" placeholder="e.g. 10th"></div>
        <div class="form-group"><label>Roll No.</label><input type="text" id="a-login-rollno" placeholder="e.g. 23"></div>
      </div>
      <div class="form-group"><label>School Name</label><input type="text" id="a-login-school" placeholder="Your school name"></div>
      <div class="form-group"><label>Email</label><input type="email" id="a-email" placeholder="you@office.edu"></div>
      ${passwordViewFieldHtml('a-pass', '••••••••')}
      <button class="btn-submit" onclick="doLogin()">Sign In</button>`;
    sw.innerHTML = `Don't have an account? <button onclick="renderAuth(false)">Sign up</button>`;
  } else {
    const titleText = 'School Registration';
    area.innerHTML = `
      <div class="auth-title">${titleText}</div>
      <div id="role-fields"></div>
      <button class="btn-submit" onclick="doRegister()">Create Account</button>`;
    sw.innerHTML = `Already have an account? <button onclick="renderAuth(true)">Sign in</button>`;
    selectedRole = 'school';
    renderRoleFields(selectedRole);
  }
}

let selectedRole = 'student';
function selectRole(r) {
  selectedRole = r;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('role-' + r);
  if (btn) btn.classList.add('active');
  renderRoleFields(r);
}

function renderRoleFields(role) {
  const el = document.getElementById('role-fields');
  if (!el) return;

  // Common fields
  const commonFields = `
    <div class="form-group"><label>Full Name</label><input type="text" id="a-name" placeholder="Your full name"></div>
    <div class="form-group"><label>Email</label><input type="email" id="a-email" placeholder="you@office.edu"></div>
    <div class="form-group"><label>School Name <span style="color:#4fc3f7;font-size:0.75rem;">(must match your school's registered name exactly)</span></label><input type="text" id="a-school" placeholder="e.g. Delhi Public School"></div>
    <div class="form-row">
      <div class="form-group"><label>Phone Number</label><input type="tel" id="a-phone" placeholder="+91 98765 43210"></div>
      ${passwordFieldHtml('a-pass', 'Create a password')}
    </div>
    <div class="form-group"><label>Address</label><input type="text" id="a-address" placeholder="Your address"></div>`;

  if (role === 'school') {
    el.innerHTML = `
      <div class="form-group"><label>School Name</label><input type="text" id="a-name" placeholder="Full name of the school"></div>
      <div class="form-group"><label>School Email</label><input type="email" id="a-email" placeholder="info@yourschool.edu"></div>
      <div class="form-row">
        <div class="form-group"><label>Phone Number</label><input type="tel" id="a-phone" placeholder="School phone number"></div>
        ${passwordFieldHtml('a-pass', 'Create a password')}
      </div>
      <div class="form-group"><label>School Address</label><input type="text" id="a-address" placeholder="Full school address with city & PIN"></div>
      <div class="form-group"><label>Principal's Name</label><input type="text" id="a-principal" placeholder="Full name of the principal"></div>
      <div style="background:var(--teal-light);border-radius:var(--radius-sm);padding:12px 14px;margin-bottom:1.25rem;font-size:0.82rem;color:var(--accent);font-weight:500;">
        🏫 After registering your school, the principal can sign up separately using the <strong>School</strong> email and selecting <strong>Principal</strong> role to access the school dashboard.
      </div>`;
  } else {
    el.innerHTML = commonFields;
  }
}

// Builds a password field with a show/hide toggle and a live strength checklist.
// The checklist is guidance only — whatever password the person types is accepted.
function passwordFieldHtml(inputId, placeholder) {
  const strengthId = inputId + '-strength';
  return `
    <div class="form-group">
      <label>Password</label>
      <div style="position:relative;">
        <input type="password" id="${inputId}" placeholder="${placeholder}" autocomplete="new-password" oninput="checkPasswordStrength('${inputId}','${strengthId}')" style="padding-right:44px;">
        <button type="button" onclick="togglePasswordVisibility('${inputId}', this)" aria-label="Show password" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.5);font-size:1rem;padding:4px 6px;line-height:1;">👁️</button>
      </div>
      <div id="${strengthId}" style="margin-top:6px;font-size:0.72rem;line-height:1.7;"></div>
    </div>`;
}

// Builds a simple password field with just a show/hide toggle (no strength checklist) — used for login screens.
function passwordViewFieldHtml(inputId, placeholder) {
  return `
    <div class="form-group">
      <label>Password</label>
      <div style="position:relative;">
        <input type="password" id="${inputId}" placeholder="${placeholder}" autocomplete="current-password" style="padding-right:44px;">
        <button type="button" onclick="togglePasswordVisibility('${inputId}', this)" aria-label="Show password" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.5);font-size:1rem;padding:4px 6px;line-height:1;">👁️</button>
      </div>
    </div>`;
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; btn.setAttribute('aria-label', 'Hide password'); }
  else { input.type = 'password'; btn.textContent = '👁️'; btn.setAttribute('aria-label', 'Show password'); }
}

function checkPasswordStrength(inputId, targetId) {
  const input = document.getElementById(inputId);
  const target = document.getElementById(targetId);
  if (!input || !target) return;
  const val = input.value;
  if (!val) { target.innerHTML = ''; return; }

  const checks = [
    { label: 'At least 8 characters', pass: val.length >= 8 },
    { label: 'One uppercase letter (A-Z)', pass: /[A-Z]/.test(val) },
    { label: 'One lowercase letter (a-z)', pass: /[a-z]/.test(val) },
    { label: 'One number (0-9)', pass: /[0-9]/.test(val) },
    { label: 'One special character (!@#$%...)', pass: /[!@#$%^&*(),.?":{}|<>_\-\[\]\\\/~`+=;']/.test(val) }
  ];
  const passedCount = checks.filter(c => c.pass).length;

  let strengthLabel = 'Weak', strengthColor = '#ff5252';
  if (passedCount >= 5) { strengthLabel = 'Strong'; strengthColor = '#4caf50'; }
  else if (passedCount >= 3) { strengthLabel = 'Medium'; strengthColor = '#ffd54f'; }

  const listHtml = checks.map(c =>
    `<div style="color:${c.pass ? '#4caf50' : 'rgba(255,255,255,0.45)'};">${c.pass ? '✓' : '○'} ${c.label}</div>`
  ).join('');

  target.innerHTML = `
    <div style="font-weight:600;color:${strengthColor};margin-bottom:2px;">Password strength: ${strengthLabel}</div>
    ${listHtml}
    <div style="color:rgba(255,255,255,0.4);margin-top:4px;">💡 These are just suggestions — you're free to use whatever password you'd like.</div>`;
}

// Shared student login — same email & password for every student, always kept equal to the current exam password.
// Both the email and password are stored in db.settings so they can be changed at any time by an admin or school.
function getStudentLoginEmail() {
  const db = getDB();
  return (db.settings && db.settings.studentEmail) || 'student@scicomm.in';
}
async function doLogin() {
  const email = document.getElementById('a-email').value.trim().toLowerCase();
  const pass = document.getElementById('a-pass').value.trim();

  // Extra identity details captured on the Sign In screen (mainly for students).
  // These aren't stored in the backend yet — they're kept on the signed-in session
  // in this browser only, same as everything else in this app used to work.
  const loginName = document.getElementById('a-login-name')?.value.trim() || '';
  const fatherName = document.getElementById('a-login-fathername')?.value.trim() || '';
  const dob = document.getElementById('a-login-dob')?.value || '';
  const className = document.getElementById('a-login-class')?.value.trim() || '';
  const rollNo = document.getElementById('a-login-rollno')?.value.trim() || '';
  const loginSchool = document.getElementById('a-login-school')?.value.trim() || '';

  const studentLoginEmail = getStudentLoginEmail();
  if (email === studentLoginEmail) {
    try {
      const data = await api('/api/auth/student-login', { method: 'POST', body: JSON.stringify({ password: pass }) });
      const studentUser = {
        ...data.user,
        name: loginName || data.user.name, fatherName, dob, className, rollNo,
        schoolName: loginSchool || data.user.schoolName
      };
      saveSession(studentUser, data);
      updateNavForUser();
      showToast('Welcome, ' + studentUser.name + '! 👋', 'success');
      goToExamAfterLogin();
    } catch (e) { showToast(e.message || 'Invalid credentials', 'error'); }
    return;
  }

  try {
    const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password: pass }) });
    if (data.user.role === 'admin') return showToast('Admin accounts must sign in from the 🔒 Admin tab above', 'error');
    const user = { ...data.user };
    if (fatherName) user.fatherName = fatherName;
    if (dob) user.dob = dob;
    if (className) user.className = className;
    if (rollNo) user.rollNo = rollNo;
    if (loginSchool) user.schoolName = loginSchool;
    saveSession(user, data);
    updateNavForUser();
    if (user.role === 'school') { showPage('profile'); showToast('Welcome, ' + user.name + '! 🏫', 'success'); }
    else if (user.role === 'principal') { showPage('principal'); showToast('Welcome, ' + user.name + '! 🏛️', 'success'); }
    else if (user.role === 'student') { showToast('Welcome back, ' + user.name + '! 👋', 'success'); goToExamAfterLogin(); }
    else { showPage('home'); showToast('Welcome back, ' + user.name + '! 👋', 'success'); }
  } catch (e) { showToast(e.message || 'Invalid credentials', 'error'); }
}

// Takes a freshly signed-in student straight into their exam — no options, no
// list to browse. The 🚀 Start Exam launch popup pops open immediately on top
// of the home page, every time, with nothing else shown first.
function goToExamAfterLogin() {
  showPage('home');
  maybeShowScienceStartPopup();
}

// Shows the 🚀 "Start Exam" launch popup for the Scientific Attitude Study (S.A.S).
// Skipped if this student (by login name) has already submitted it — persisted
// via db.examAttempts, so it stays skipped across sign-out/sign-in too.
function maybeShowScienceStartPopup() {
  if (!currentUser || currentUser.role !== 'student') return;
  if (hasAttemptedExam('science-attitude')) return;
  sqFilterSchool = currentUser.schoolName || '';
  sqFilterClass = currentUser.className || '';
  openModal('sq-student-modal');
}

async function doAdminLogin() {
  const email = document.getElementById('a-email').value.trim().toLowerCase();
  const pass = document.getElementById('a-pass').value.trim();
  try {
    const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password: pass }) });
    if (data.user.role !== 'admin') return showToast('This account is not an admin — use the Student/School tab', 'error');
    saveSession(data.user, data);
    updateNavForUser();
    showPage('admin');
    showToast('Welcome, ' + data.user.name + '! ⚙️', 'success');
  } catch (e) { showToast(e.message || 'Invalid credentials', 'error'); }
}

async function doRegister() {
  const name = document.getElementById('a-name')?.value.trim();
  const email = document.getElementById('a-email')?.value.trim();
  const pass = document.getElementById('a-pass')?.value;
  const phone = document.getElementById('a-phone')?.value.trim() || '';
  const address = document.getElementById('a-address')?.value.trim() || '';

  if (!name || !email || !pass) return showToast('Please fill all required fields', 'error');

  const payload = { name, email, password: pass, role: selectedRole, phone, address };
  if (selectedRole === 'student' || selectedRole === 'teacher') {
    payload.schoolName = document.getElementById('a-school')?.value.trim() || '';
  }
  if (selectedRole === 'school') {
    payload.schoolName = name;
    payload.principalName = document.getElementById('a-principal')?.value.trim() || '';
  }

  try {
    const data = await api('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) });
    saveSession(data.user, data);
    updateNavForUser();
    if (selectedRole === 'school') { showPage('profile'); showToast('School registered! Welcome 🏫', 'success'); }
    else if (selectedRole === 'principal') { showPage('principal'); showToast('Account created! Welcome, ' + name + ' 🏛️', 'success'); }
    else { showPage('home'); showToast('Account created! Welcome, ' + name + ' 🎉', 'success'); }
  } catch (e) { showToast(e.message || 'Registration failed', 'error'); }
}

async function logout() {
  const rt = refreshToken;
  clearSession();
  updateNavForUser();
  showPage('home');
  showToast('Signed out successfully');
  if (rt) { try { await api('/api/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken: rt }) }); } catch {} }
}

// ===================== RENDER HOME =====================
function renderHome() {
  // Home page stats/recent-ratings cards were replaced with the Scientific
  // Mindset traits section and Spark of Discovery orbit showcase, so there's nothing to render here now.
}

// ===================== RATINGS =====================
function renderRatings() {
  const db = getDB();
  const q = document.getElementById('search-input')?.value?.toLowerCase() || '';
  let items = db.ratings;
  if (currentFilter !== 'all') items = items.filter(r => r.category === currentFilter);
  if (q) items = items.filter(r => r.studentName.toLowerCase().includes(q) || r.topic.toLowerCase().includes(q) || r.review.toLowerCase().includes(q));
  items = items.sort((a, b) => new Date(b.date) - new Date(a.date));
  document.getElementById('all-cards').innerHTML = items.map(r => cardHTML(r)).join('') || emptyState('No results', 'Try adjusting your filters or search query.');
}
function setFilter(f, el) {
  currentFilter = f;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderRatings();
}

function cardHTML(r) {
  const stars = [1,2,3,4,5].map(i => `<span class="star${i <= r.stars ? '' : ' empty'}">★</span>`).join('');
  const score = ((r.curiosity + r.attitude + r.comm + r.research + r.innovation) / 5).toFixed(1);
  const catLabel = { curiosity: '🔬 Curiosity', attitude: '🧠 Attitude', paper: '📄 Research Paper', tool: '🛠 Tool', general: '⭐ General' };
  const schoolTag = r.school ? `<span style="font-size:0.7rem;color:var(--accent);background:var(--teal-light);padding:2px 8px;border-radius:999px;margin-left:6px;">🏫 ${r.school}</span>` : '';
  return `<div class="rating-card" onclick="showDetail('${r.id}')">
    <div class="card-type-bar ${r.category}"></div>
    <div class="card-header">
      <span class="card-tag tag-${r.category}">${catLabel[r.category] || r.category}</span>
      <div class="rating-score"><div class="score-num">${score}</div><div class="score-label">score</div></div>
    </div>
    <div class="card-title">${r.studentName}${schoolTag}</div>
    <div class="card-meta">${r.topic}</div>
    <div class="card-stars">${stars}</div>
    <div class="card-desc">${r.review.length > 120 ? r.review.slice(0, 120) + '…' : r.review}</div>
    <div class="card-footer">
      <div class="card-author">
        <div class="mini-avatar">${initials(r.authorName)}</div>
        <div><div>${r.authorName}</div><div class="review-role">${r.authorRole}</div></div>
      </div>
      <div class="card-votes">${r.votes || 0} helpful</div>
    </div>
  </div>`;
}
function emptyState(title, sub) {
  return `<div class="empty-state" style="grid-column:1/-1;"><div class="empty-icon">🔭</div><div class="empty-title">${title}</div><div>${sub}</div></div>`;
}

// ===================== DETAIL PAGE =====================
function showDetail(id) {
  prevPage = document.querySelector('.page.active')?.id?.replace('page-', '') || 'home';
  const db = getDB();
  const r = db.ratings.find(x => x.id === id);
  if (!r) return;
  const catLabel = { curiosity: '🔬 Curiosity', attitude: '🧠 Attitude', paper: '📄 Research Paper', tool: '🛠 Tool', general: '⭐ General' };
  const score = ((r.curiosity + r.attitude + r.comm + r.research + r.innovation) / 5).toFixed(1);
  const stars = [1,2,3,4,5].map(i => `<span style="color:${i <= r.stars ? 'var(--gold)' : 'var(--border)'}">★</span>`).join('');

  document.getElementById('detail-tag').innerHTML = `<span class="card-tag tag-${r.category}">${catLabel[r.category]}</span>`;
  document.getElementById('detail-title').textContent = r.studentName;
  document.getElementById('detail-sub').textContent = r.topic;
  document.getElementById('detail-metrics').innerHTML = `
    <div class="metric"><div class="metric-val gold">${stars}</div><div class="metric-label">Overall Rating</div></div>
    <div class="metric"><div class="metric-val green">${score}/10</div><div class="metric-label">Composite Score</div></div>
    <div class="metric"><div class="metric-val">${r.date}</div><div class="metric-label">Rated On</div></div>
    <div class="metric"><div class="metric-val">${r.votes || 0}</div><div class="metric-label">Found Helpful</div></div>
    ${r.school ? `<div class="metric"><div style="font-size:1rem;font-weight:600;color:var(--accent)">🏫 ${r.school}</div><div class="metric-label">School</div></div>` : ''}`;

  const allForStudent = db.ratings.filter(x => x.studentName === r.studentName);
  document.getElementById('detail-reviews').innerHTML = allForStudent.map(rev => `
    <div class="review-card">
      <div class="review-header">
        <div class="mini-avatar" style="width:30px;height:30px;font-size:0.7rem;">${initials(rev.authorName)}</div>
        <div><div class="review-author">${rev.authorName}</div><div class="review-role">${rev.authorRole}</div></div>
        <div class="review-date">${rev.date}</div>
      </div>
      <div class="card-stars" style="margin-bottom:8px;">${[1,2,3,4,5].map(i=>`<span class="star${i<=rev.stars?'':' empty'}">★</span>`).join('')}</div>
      <div class="review-text">${rev.review}</div>
    </div>`).join('');

  const avgC = avg(allForStudent.map(x => x.curiosity));
  const avgA = avg(allForStudent.map(x => x.attitude));
  const avgCo = avg(allForStudent.map(x => x.comm));
  const avgR = avg(allForStudent.map(x => x.research));
  const avgI = avg(allForStudent.map(x => x.innovation));
  document.getElementById('detail-traits').innerHTML = `
    ${traitBar('🔬 Scientific Curiosity', avgC, 'gold')}
    ${traitBar('🧠 Scientific Attitude', avgA, 'coral')}
    ${traitBar('💬 Communication', avgCo, '')}
    ${traitBar('🔭 Research Depth', avgR, 'blue')}
    ${traitBar('💡 Innovation', avgI, 'purple')}`;

  document.getElementById('detail-breakdown').innerHTML = `
    ${miniBar('Curiosity', r.curiosity)}${miniBar('Attitude', r.attitude)}
    ${miniBar('Communication', r.comm)}${miniBar('Research', r.research)}${miniBar('Innovation', r.innovation)}`;

  if (currentUser && currentUser.role !== 'school') {
    document.getElementById('add-review-section').innerHTML = `
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;">
        <div style="font-family:'Syne',sans-serif;font-weight:700;margin-bottom:1rem;">Add Your Review</div>
        <div class="star-rating-input" id="detail-stars" style="margin-bottom:12px;">
          ${[1,2,3,4,5].map(i=>`<span class="star-input" onclick="setDetailStars(${i},'${r.studentName}')">★</span>`).join('')}
        </div>
        <textarea id="detail-review-text" placeholder="Share your assessment…" style="margin-bottom:12px;"></textarea>
        <button class="btn-submit" style="width:auto;padding:10px 20px;" onclick="addReview('${r.studentName}')">Submit Review</button>
      </div>`;
  }
  showPage('detail');
}

let detailStars = 0;
function setDetailStars(n) {
  detailStars = n;
  document.querySelectorAll('#detail-stars .star-input').forEach((s, i) => {
    s.style.color = i < n ? 'var(--gold)' : 'var(--border)';
  });
}
async function addReview(studentName) {
  if (!currentUser) return showToast('Please sign in first', 'error');
  const text = document.getElementById('detail-review-text').value.trim();
  if (!text) return showToast('Please write a review', 'error');
  if (!detailStars) return showToast('Please select a star rating', 'error');
  try {
    const nr = await api('/api/ratings', {
      method: 'POST',
      body: JSON.stringify({
        studentName, category: 'general', topic: 'Follow-up review', review: text, stars: detailStars,
        curiosity: 5, attitude: 5, comm: 5, research: 5, innovation: 5, school: ''
      })
    });
    await loadRatings();
    showToast('Review submitted! ✨', 'success');
    showDetail(DB_CACHE.ratings.find(r => r.studentName === studentName)?.id || nr.id);
  } catch (e) { showToast(e.message || 'Could not submit review', 'error'); }
}

function traitBar(label, val, color) {
  return `<div class="trait-bar-wrap">
    <div class="trait-bar-header"><span>${label}</span><span style="font-weight:600;color:var(--accent)">${val}/10</span></div>
    <div class="trait-bar-track"><div class="trait-bar-fill ${color}" style="width:${val*10}%"></div></div>
  </div>`;
}
function miniBar(label, val) {
  return `<div style="margin-bottom:10px;">
    <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:3px;">
      <span style="color:var(--text-muted)">${label}</span><span style="font-weight:600">${val}/10</span>
    </div>
    <div class="trait-bar-track"><div class="trait-bar-fill" style="width:${val*10}%"></div></div>
  </div>`;
}

function setDetailTab(tab, el) {
  document.querySelectorAll('#page-detail .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('detail-reviews').style.display = tab === 'reviews' ? '' : 'none';
  document.getElementById('detail-traits').style.display = tab === 'traits' ? '' : 'none';
}

// ===================== LEADERBOARD =====================
function renderLeaderboard() {
  const db = getDB();
  const studentMap = {};
  db.ratings.forEach(r => {
    if (!studentMap[r.studentName]) studentMap[r.studentName] = { name: r.studentName, ratings: [], school: r.school || '' };
    studentMap[r.studentName].ratings.push(r);
  });
  let sorted = Object.values(studentMap).map(s => {
    const ra = s.ratings;
    return {
      name: s.name, school: s.school,
      overall: avg(ra.map(r => (r.curiosity + r.attitude + r.comm + r.research + r.innovation) / 5)),
      curiosity: avg(ra.map(r => r.curiosity)),
      attitude: avg(ra.map(r => r.attitude)),
      count: ra.length
    };
  });
  const sortKey = lbTab === 'curiosity' ? 'curiosity' : lbTab === 'attitude' ? 'attitude' : 'overall';
  sorted.sort((a, b) => b[sortKey] - a[sortKey]);
  document.getElementById('leaderboard-list').innerHTML = sorted.map((s, i) => {
    const score = s[sortKey].toFixed(1);
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
    return `<div class="leaderboard-row">
      <div class="rank-num ${i < 3 ? 'top3' : ''}">${medal || (i + 1)}</div>
      <div>
        <div class="lb-name">${s.name}</div>
        <div class="lb-meta">${s.count} rating${s.count !== 1 ? 's' : ''}${s.school ? ' · 🏫 ' + s.school : ''}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <div style="font-size:0.75rem;color:var(--text-faint);">C:${s.curiosity.toFixed(1)} A:${s.attitude.toFixed(1)}</div>
        <div class="lb-score">${score}</div>
      </div>
    </div>`;
  }).join('') || emptyState('No ratings yet', '');
}
function setLbTab(tab, el) {
  lbTab = tab;
  document.querySelectorAll('#page-leaderboard .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderLeaderboard();
}

// ===================== PRINCIPAL DASHBOARD =====================
function goToStudentFromPrincipal(studentName) {
  const db = getDB();
  const r = db.ratings.find(x => x.studentName === studentName);
  if (r) showDetail(r.id);
}
function renderPrincipalDashboard() {
  if (!currentUser || currentUser.role !== 'principal') return;
  const db = getDB();
  const schoolName = currentUser.schoolName || '';
  document.getElementById('principal-school-name').textContent = schoolName || 'School Dashboard';
  document.getElementById('principal-school-sub').textContent = 'Principal: ' + currentUser.name + (schoolName ? ' · ' + schoolName : '');

  const q = document.getElementById('principal-search')?.value?.toLowerCase() || '';
  // Get all ratings for this school
  let schoolRatings = db.ratings.filter(r => r.school && r.school.toLowerCase() === schoolName.toLowerCase());
  if (q) schoolRatings = schoolRatings.filter(r => r.studentName.toLowerCase().includes(q));

  const uniqueStudents = [...new Set(schoolRatings.map(r => r.studentName))];
  const avgScore = schoolRatings.length ? avg(schoolRatings.map(r => (r.curiosity + r.attitude + r.comm + r.research + r.innovation) / 5)) : 0;
  const topStudent = uniqueStudents.length ? (() => {
    let best = '', bestScore = -1;
    uniqueStudents.forEach(s => {
      const rs = schoolRatings.filter(r => r.studentName === s);
      const sc = avg(rs.map(r => (r.curiosity + r.attitude + r.comm + r.research + r.innovation) / 5));
      if (sc > bestScore) { bestScore = sc; best = s; }
    });
    return best;
  })() : 'N/A';

  document.getElementById('principal-stats').innerHTML = `
    <div class="school-stat-card"><div class="school-stat-num">${schoolRatings.length}</div><div class="school-stat-label">Total Ratings</div></div>
    <div class="school-stat-card"><div class="school-stat-num">${uniqueStudents.length}</div><div class="school-stat-label">Students Rated</div></div>
    <div class="school-stat-card"><div class="school-stat-num">${avgScore.toFixed(1)}</div><div class="school-stat-label">Avg. Score</div></div>
    <div class="school-stat-card" style="grid-column:span 1;"><div style="font-size:1rem;font-weight:700;color:var(--accent);font-family:'Syne',sans-serif;">${topStudent}</div><div class="school-stat-label">Top Performer</div></div>`;

  // Top Students leaderboard (ranked by composite score across ALL school ratings, regardless of search filter)
  let allSchoolRatings = db.ratings.filter(r => r.school && r.school.toLowerCase() === schoolName.toLowerCase());
  const studentMap = {};
  allSchoolRatings.forEach(r => {
    if (!studentMap[r.studentName]) studentMap[r.studentName] = [];
    studentMap[r.studentName].push(r);
  });
  let ranked = Object.keys(studentMap).map(name => {
    const ra = studentMap[name];
    return {
      name,
      score: avg(ra.map(r => (r.curiosity + r.attitude + r.comm + r.research + r.innovation) / 5)),
      stars: avg(ra.map(r => r.stars)),
      count: ra.length
    };
  }).sort((a, b) => b.score - a.score);

  document.getElementById('principal-top-students').innerHTML = ranked.length
    ? ranked.slice(0, 10).map((s, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
        return `<div class="leaderboard-row" onclick="goToStudentFromPrincipal('${s.name}')">
          <div class="rank-num ${i < 3 ? 'top3' : ''}">${medal || (i + 1)}</div>
          <div>
            <div class="lb-name">${s.name}</div>
            <div class="lb-meta">${s.count} rating${s.count !== 1 ? 's' : ''} · ${'★'.repeat(Math.round(s.stars))}${'☆'.repeat(5-Math.round(s.stars))}</div>
          </div>
          <div class="lb-score">${s.score.toFixed(1)}</div>
        </div>`;
      }).join('')
    : emptyState('No students ranked yet', 'Once teachers rate students from ' + (schoolName || 'your school') + ', they\'ll appear here ranked by score.');

  document.getElementById('principal-cards').innerHTML = schoolRatings.length
    ? schoolRatings.sort((a,b) => new Date(b.date) - new Date(a.date)).map(r => cardHTML(r)).join('')
    : emptyState('No student ratings yet', 'Ratings for ' + (schoolName || 'your school') + ' students will appear here.');
}

// ===================== PROFILE =====================
function renderProfile() {
  if (!currentUser) return showPage('auth');
  document.getElementById('profile-avatar').textContent = initials(currentUser.name);
  document.getElementById('profile-name').textContent = currentUser.name;

  let roleLabel = cap(currentUser.role) + ' · ' + currentUser.email;
  if (currentUser.role === 'school') roleLabel = '🏫 School · ' + currentUser.email;
  if (currentUser.role === 'principal') roleLabel = '🏛️ Principal · ' + currentUser.email;
  document.getElementById('profile-role-label').textContent = roleLabel;

  // Extra info cards for school/principal
  let extraHTML = '';
  if (currentUser.role === 'student') {
    const dobDisplay = currentUser.dob ? new Date(currentUser.dob + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
    extraHTML += `<div style="font-family:'Syne',sans-serif;font-weight:700;font-size:0.95rem;color:var(--text-muted);margin-bottom:0.75rem;text-transform:uppercase;letter-spacing:0.05em;">Student Details</div>`;
    extraHTML += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
      <div class="info-card"><div><div class="info-card-label">Full Name</div><div class="info-card-value">${currentUser.name || '—'}</div></div></div>
      <div class="info-card"><div><div class="info-card-label">Father's Name</div><div class="info-card-value">${currentUser.fatherName || '—'}</div></div></div>
      <div class="info-card"><div><div class="info-card-label">Date of Birth</div><div class="info-card-value">${dobDisplay}</div></div></div>
      <div class="info-card"><div><div class="info-card-label">Class</div><div class="info-card-value">${currentUser.className || '—'}</div></div></div>
      <div class="info-card" style="grid-column:span 2;"><div><div class="info-card-label">Roll No.</div><div class="info-card-value">${currentUser.rollNo || '—'}</div></div></div>
    </div>`;
  }
  if (currentUser.phone || currentUser.address) {
    extraHTML += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">`;
    if (currentUser.phone) extraHTML += `<div class="info-card"><div class="info-card-icon">📞</div><div><div class="info-card-label">Phone</div><div class="info-card-value">${currentUser.phone}</div></div></div>`;
    if (currentUser.address) extraHTML += `<div class="info-card" style="grid-column:span ${currentUser.phone ? '1' : '2'};"><div class="info-card-icon">📍</div><div><div class="info-card-label">Address</div><div class="info-card-value">${currentUser.address}</div></div></div>`;
    extraHTML += `</div>`;
  }
  if (currentUser.role === 'school') {
    if (currentUser.principalName) extraHTML += `<div class="info-card" style="margin-bottom:1.5rem;"><div class="info-card-icon">🏛️</div><div><div class="info-card-label">Principal</div><div class="info-card-value">${currentUser.principalName}</div></div></div>`;
    const db = getDB();
    const schoolRatings = db.ratings.filter(r => r.school && r.school.toLowerCase() === (currentUser.schoolName || currentUser.name).toLowerCase());
    const students = [...new Set(schoolRatings.map(r => r.studentName))];
    extraHTML += `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:2rem;">
      <div class="school-stat-card"><div class="school-stat-num">${schoolRatings.length}</div><div class="school-stat-label">Student Ratings</div></div>
      <div class="school-stat-card"><div class="school-stat-num">${students.length}</div><div class="school-stat-label">Students Tracked</div></div>
      <div class="school-stat-card"><div class="school-stat-num">${schoolRatings.length ? avg(schoolRatings.map(r => r.stars)).toFixed(1) : '—'} ★</div><div class="school-stat-label">Avg. Rating</div></div>
    </div>`;
  }
  document.getElementById('profile-extra-info').innerHTML = extraHTML;

  if (currentUser.role === 'school') {
    const db = getDB();
    const schoolName = currentUser.schoolName || currentUser.name;
    const schoolRatings = db.ratings.filter(r => r.school && r.school.toLowerCase() === schoolName.toLowerCase());

    // Build top students leaderboard
    const studentMap = {};
    schoolRatings.forEach(r => {
      if (!studentMap[r.studentName]) studentMap[r.studentName] = [];
      studentMap[r.studentName].push(r);
    });
    const ranked = Object.keys(studentMap).map(name => {
      const ra = studentMap[name];
      return { name, score: avg(ra.map(r => (r.curiosity + r.attitude + r.comm + r.research + r.innovation) / 5)), count: ra.length };
    }).sort((a, b) => b.score - a.score);

    const topHTML = ranked.length ? `
      <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:1.1rem;margin-bottom:1rem;">🏆 Top Students</div>
      <div style="margin-bottom:2rem;">${ranked.slice(0,5).map((s,i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
        return `<div class="leaderboard-row" onclick="goToStudentFromPrincipal('${s.name}')">
          <div class="rank-num ${i<3?'top3':''}">${medal || (i+1)}</div>
          <div><div class="lb-name">${s.name}</div><div class="lb-meta">${s.count} rating${s.count!==1?'s':''}</div></div>
          <div class="lb-score">${s.score.toFixed(1)}</div>
        </div>`;
      }).join('')}</div>` : '';

    document.getElementById('profile-extra-info').innerHTML += topHTML;

    document.getElementById('profile-student-login').innerHTML = sharedStudentLoginCardHTML('school');

    const schoolRatingsHTML = `<div style="font-family:'Syne',sans-serif;font-weight:700;font-size:1.1rem;margin-bottom:1rem;">School Student Ratings</div>` +
      (schoolRatings.length
        ? schoolRatings.map(r => cardHTML(r)).join('')
        : emptyState('No ratings for your school yet', 'Ratings tagged with your school will appear here.'));
    document.getElementById('profile-extra-info').innerHTML += schoolRatingsHTML;
  } else {
    document.getElementById('profile-student-login').innerHTML = '';
  }
}

// ===================== ADMIN =====================
async function renderAdmin() {
  if (!currentUser || currentUser.role !== 'admin') {
    showToast('Access denied — Admins only', 'error');
    return showPage('home');
  }
  await Promise.all([loadUsers(), loadExams(), loadExamAttempts(), loadRatings()]);
  const db = getDB();
  const schools = db.users.filter(u => u.role === 'school').length;
  const totalExams = (db.exams||[]).length;
  const totalAttempts = (db.examAttempts||[]).length;
  document.getElementById('admin-stats').innerHTML = `
    <div class="admin-stat"><div class="admin-stat-num">${db.users.length}</div><div class="admin-stat-label">Registered Users</div></div>
    <div class="admin-stat"><div class="admin-stat-num">${schools}</div><div class="admin-stat-label">Schools</div></div>
    <div class="admin-stat"><div class="admin-stat-num">${totalExams}</div><div class="admin-stat-label">Total Exams</div></div>
    <div class="admin-stat"><div class="admin-stat-num">${totalAttempts}</div><div class="admin-stat-label">Exam Attempts</div></div>`;
  renderAdminContent(adminTab);
}
function setAdminTab(tab, el) {
  adminTab = tab;
  document.querySelectorAll('#page-admin .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderAdminContent(tab);
}
function renderAdminContent(tab) {
  const db = getDB();
  if (tab === 'schools') {
    const schools = db.users.filter(u => u.role === 'school');
    const principals = db.users.filter(u => u.role === 'principal');
    document.getElementById('admin-content').innerHTML = schools.length ? `
      <table class="admin-table">
        <thead><tr><th>School Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Principal</th><th>Students Rated</th></tr></thead>
        <tbody>${schools.map(s => {
          const sName = s.schoolName || s.name;
          const principal = principals.find(p => p.schoolId === s.id || p.schoolName === sName);
          const studentCount = [...new Set(db.ratings.filter(r => r.school && r.school.toLowerCase() === sName.toLowerCase()).map(r => r.studentName))].length;
          return `<tr>
            <td style="font-weight:600">🏫 ${sName}</td>
            <td style="color:var(--text-muted)">${s.email}</td>
            <td style="color:var(--text-muted)">${s.phone || '—'}</td>
            <td style="color:var(--text-muted);font-size:0.8rem">${s.address || '—'}</td>
            <td>${principal ? principal.name : (s.principalName || '—')}</td>
            <td style="font-weight:600;color:var(--accent)">${studentCount}</td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>` : emptyState('No schools registered yet', 'Schools will appear here once they sign up.');
  } else if (tab === 'questions') {
    renderQuestionManager();
  } else if (tab === 'results') {
    const attempts = db.examAttempts || [];
    const exams = db.exams || [];
    document.getElementById('admin-content').innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:10px;">
        <div style="font-size:0.875rem;color:var(--text-muted);">${attempts.length} total attempt(s)</div>
        <div style="display:flex;gap:8px;">
          <select id="results-filter-exam" onchange="renderAdmin()" style="padding:7px 12px;font-size:0.82rem;border-radius:8px;">
            <option value="all">All Exams</option>
            ${exams.map(e=>`<option value="${e.id}">${e.title}</option>`).join('')}
          </select>
          <button onclick="exportResultsToExcel()" style="background:linear-gradient(135deg,#4fc3f7,#0288d1);color:#070b1a;border:none;border-radius:8px;padding:8px 16px;font-weight:700;font-size:0.85rem;cursor:pointer;font-family:inherit;">📥 Export to Excel</button>
        </div>
      </div>` +
      (attempts.length ? `<table class="admin-table" id="results-table">
        <thead><tr><th>#</th><th>Student Name</th><th>Roll No</th><th>Section</th><th>School</th><th>Exam</th><th>Score</th><th>Percentage</th><th>Date</th></tr></thead>
        <tbody>${attempts.map((a,i) => {
          const exam = exams.find(e=>e.id===a.examId);
          const examTitle = exam ? exam.title : (a.examTitle || 'Unknown');
          const pctColor = a.pct>=80?'#4fc3f7':a.pct>=60?'#ffd54f':'#ff6b6b';
          return `<tr>
            <td style="color:var(--text-muted)">${i+1}</td>
            <td style="font-weight:600">${a.studentName||'—'}</td>
            <td style="color:var(--text-muted)">${a.rollNo||'—'}</td>
            <td>${a.section||'—'}</td>
            <td style="color:var(--text-muted);font-size:0.8rem">${a.school||'—'}</td>
            <td style="font-size:0.8rem">${examTitle}</td>
            <td style="font-weight:700">${a.score}/${a.total}</td>
            <td><span style="color:${pctColor};font-weight:700;">${a.pct}%</span></td>
            <td style="color:var(--text-muted)">${a.date}</td>
          </tr>`;
        }).join('')}</tbody>
      </table>` : '<div class="empty-state"><div class="empty-icon">📊</div><div class="empty-title">No Results Yet</div><div>Student exam results will appear here once they attempt exams.</div></div>');

  } else if (tab === 'studentlogin') {
    document.getElementById('admin-content').innerHTML = sharedStudentLoginCardHTML('admin');
  }
}

// ===================== SCIENCE QUESTION GENERATOR =====================
// A bank of Likert-style ("Strongly Agree" → "Strongly Disagree") science
// attitude statements, each paired with a small themed animation that's
// picked automatically from keywords in the question text (or set manually).
// Default black & white scitoon illustration for the "careers" question —
// two students (microscope + flask) with thought bubbles showing the
// real-world benefits of science. Admins can replace/remove it any time
// from the question editor.
const SQ_CAREER_IMAGE = "data:image/jpeg;base64,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";

// Generic black & white scitoon illustration shown for any question that
// doesn't have its own custom uploaded image. Replaces the old animated
// SVG fallback so every question — with or without a custom image — is
// always shown as a plain black & white illustration.
const SQ_DEFAULT_IMAGE = "data:image/jpeg;base64,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";

function seedScienceQuestions(db) {
  if (!db.scienceQuestions) db.scienceQuestions = [];
  // Seed the starter question bank only the very first time this feature is
  // used. Once seeded (flag persisted in db.settings), an admin deleting all
  // questions results in a genuinely empty list — it will NOT be refilled.
  if (!db.settings) db.settings = {};
  if (!db.settings.scienceQuestionsSeeded) {
    const starters = [
      { text: 'I enjoy conducting experiments to test my own ideas.', type: 'flask' },
      { text: 'Plants play a vital role in balancing our ecosystem.', type: 'plant' },
      { text: 'Understanding atoms helps me make sense of the world around me.', type: 'atom' },
      { text: 'I am curious about how the planets and the solar system work.', type: 'orbit' },
      { text: 'The water cycle explains why rain keeps returning to Earth.', type: 'water' },
      { text: 'Electricity and energy are essential to modern scientific progress.', type: 'electric' },
    ];
    starters.forEach(s => db.scienceQuestions.push({ id: uid(), text: s.text, type: s.type, image: '', school: '', className: '' }));
    db.settings.scienceQuestionsSeeded = true;
    saveDB(db);
    sqPersistAll(db);
  }
  // One-off addition (kept separate from the block above so it still gets
  // added even on databases that were seeded before this question existed).
  // Shown only to Class 9–12 students, at every school — className '9-12' is
  // a range, matched against the grade number in the student's own class field.
  // Self-healing: re-adds this specific question if it's missing for ANY
  // reason (never seeded, or removed by an admin at some point), rather
  // than relying solely on the one-time flag — so it can't silently stay
  // gone after being deleted once.
  const CAREER_QUESTION_TEXT = 'Scientific careers are more useful for the advancement of society.';
  const careerQuestionExists = (db.scienceQuestions || []).some(q => sqNormalizeText(q.text) === sqNormalizeText(CAREER_QUESTION_TEXT));
  if (!careerQuestionExists) {
    db.scienceQuestions.unshift({
      id: uid(),
      text: CAREER_QUESTION_TEXT,
      type: 'career', category: 'Rationality', image: SQ_CAREER_IMAGE, school: '', className: '9-12'
    });
    db.settings.careerQuestionSeeded = true;
    saveDB(db);
    sqPersistAll(db);
  }
  // Bulk import of the full "Scientific Attitude" survey (39 statements
  // across 5 subscales: Rationality, Open-mindedness, Confidence in
  // Scientific Method, Curiosity, Aversion to Superstition), sourced from
  // the uploaded Survey_Question.xlsx. Runs once, guarded by its own flag,
  // so re-opening the app or re-seeding never duplicates these. The
  // "Scientific careers..." statement is intentionally left out here since
  // it's already seeded above as the dedicated career-illustration question.
  if (!db.settings.surveyQuestionsSeeded) {
    const surveySections = [
      { category: 'Rationality', statements: [
        'Traditional society hampers the growth of science.',
        'Science is suitable for all students regardless of gender.',
        'Studying science is not everybody\u2019s cup of tea.',
        'Traditional beliefs should be accepted even when they are against scientific research.',
        'Studying science subjects enhances our intellect.',
        'Scientists do not live a normal family life.',
      ]},
      { category: 'Open-mindedness', statements: [
        'Science makes us dependent on machines.',
        'Sharing knowledge with others is harmful.',
        'Any new idea can be criticized in the absence of facts.',
        'Science subjects have infinite opportunities.',
        'Science is responsible for low moral standards.',
        'Positive criticism is useful for the advancement of knowledge.',
        'The opinion of a novice (new or inexperienced person) should be rejected even if supported by evidence.',
        'Scientific advancements have only adverse effects on mankind.',
        'Study of science helps in generating new ideas.',
        'One may feel offended by a person who has different thinking.',
      ]},
      { category: 'Confidence in Scientific Method', statements: [
        'Enough evidence should be collected before accepting an idea.',
        'Testing of knowledge should follow proper procedures.',
        'One should be honest and truthful in collecting and recording data.',
        'Data can be manipulated according to need.',
        'One should suspend decision in the absence of sufficient data.',
        'The known is the basis for knowing the unknown.',
        'A questioning attitude helps in defining a problem.',
        'Any hypothesis should be accepted or rejected on the basis of sufficient evidence.',
        'Knowledge should be considered tentative.',
      ]},
      { category: 'Curiosity', statements: [
        'One should explore the unknown.',
        'There is no conclusion that is final or ultimate.',
        'There is a scientific cause for everything that takes place in this world.',
        'To conduct enquiry is the task of scientists and not of common people.',
        'One should be interested in knowing the \u201cwhy\u201d of natural phenomena.',
        'One should search for reality behind appearances.',
      ]},
      { category: 'Aversion to Superstition', statements: [
        'A scientist should report discoveries even if they contradict religion.',
        'Use of lemon and green chilies protects from the evil eye.',
        'Ghosts exist.',
        'For solving a problem, one should consult an astrologer.',
        'There is nothing like fate; a person makes his or her own fate.',
        'Praying or reciting mantras before an exam helps to score more marks.',
        'If a black cat crosses one\u2019s path, it brings bad luck.',
      ]},
    ];
    surveySections.forEach(section => {
      section.statements.forEach(text => {
        db.scienceQuestions.push({ id: uid(), text, type: 'auto', category: section.category, image: '', school: '', className: '' });
      });
    });
    db.settings.surveyQuestionsSeeded = true;
    saveDB(db);
    sqPersistAll(db);
  }
  migrateSurveyQuestionCategories(db);
}

// Normalizes text for matching: lowercase, strip curly/straight quotes and
// punctuation, collapse whitespace. Lets us match a question's text to its
// correct survey section even if it was typed by hand with slightly
// different punctuation/quote characters than the source spreadsheet.
function sqNormalizeText(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[\u2018\u2019']/g, '')
    .replace(/[\u201c\u201d"]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Canonical text -> section mapping for the 39-item Scientific Attitude
// survey (Survey_Question.xlsx), plus the standalone career-illustration
// question. Used to (re)assign the correct section/category to any
// question already sitting in the database — including ones added before
// the Section field existed, or added manually and left uncategorized.
const SQ_SURVEY_CATEGORY_MAP = (() => {
  const sections = {
    'Rationality': [
      'Traditional society hampers the growth of science.',
      'Science is suitable for all students regardless of gender.',
      'Studying science is not everybody\u2019s cup of tea.',
      'Traditional beliefs should be accepted even when they are against scientific research.',
      'Studying science subjects enhances our intellect.',
      'Scientists do not live a normal family life.',
      'Scientific careers are more useful for the advancement of society.',
    ],
    'Open-mindedness': [
      'Science makes us dependent on machines.',
      'Sharing knowledge with others is harmful.',
      'Any new idea can be criticized in the absence of facts.',
      'Science subjects have infinite opportunities.',
      'Science is responsible for low moral standards.',
      'Positive criticism is useful for the advancement of knowledge.',
      'The opinion of a novice (new or inexperienced person) should be rejected even if supported by evidence.',
      'Scientific advancements have only adverse effects on mankind.',
      'Study of science helps in generating new ideas.',
      'One may feel offended by a person who has different thinking.',
    ],
    'Confidence in Scientific Method': [
      'Enough evidence should be collected before accepting an idea.',
      'Testing of knowledge should follow proper procedures.',
      'One should be honest and truthful in collecting and recording data.',
      'Data can be manipulated according to need.',
      'One should suspend decision in the absence of sufficient data.',
      'The known is the basis for knowing the unknown.',
      'A questioning attitude helps in defining a problem.',
      'Any hypothesis should be accepted or rejected on the basis of sufficient evidence.',
      'Knowledge should be considered tentative.',
    ],
    'Curiosity': [
      'One should explore the unknown.',
      'There is no conclusion that is final or ultimate.',
      'There is a scientific cause for everything that takes place in this world.',
      'To conduct enquiry is the task of scientists and not of common people.',
      'One should be interested in knowing the \u201cwhy\u201d of natural phenomena.',
      'One should search for reality behind appearances.',
    ],
    'Aversion to Superstition': [
      'A scientist should report discoveries even if they contradict religion.',
      'Use of lemon and green chilies protects from the evil eye.',
      'Ghosts exist.',
      'For solving a problem, one should consult an astrologer.',
      'There is nothing like fate; a person makes his or her own fate.',
      'Praying or reciting mantras before an exam helps to score more marks.',
      'If a black cat crosses one\u2019s path, it brings bad luck.',
    ],
  };
  const map = {};
  Object.keys(sections).forEach(category => {
    sections[category].forEach(text => { map[sqNormalizeText(text)] = category; });
  });
  return map;
})();

// One-time pass over every question currently in the database: if its text
// matches one of the 39 survey statements (or the career question), its
// category is set/corrected to the right section — Rationality,
// Open-mindedness, Confidence in Scientific Method, Curiosity, or Aversion
// to Superstition — regardless of whether it already had a (possibly
// missing or wrong) category, and regardless of when/how it was added.
// Runs once per database, guarded by its own flag, then never touches
// categories again so manual edits afterward stick.
function migrateSurveyQuestionCategories(db) {
  if (db.settings.surveyCategoriesMigrated) return;
  let changed = false;
  (db.scienceQuestions || []).forEach(q => {
    const key = sqNormalizeText(q.text);
    const correctCategory = SQ_SURVEY_CATEGORY_MAP[key];
    if (correctCategory && q.category !== correctCategory) {
      q.category = correctCategory;
      changed = true;
    }
  });
  db.settings.surveyCategoriesMigrated = true;
  saveDB(db);
  if (changed) sqPersistAll(db);
}

// Parses the leading grade number out of a free-text class label, e.g.
// "10th" -> 10, "9-A" -> 9, "Class 12" -> 12, "10" -> 10. Returns null if
// no number can be found (so such students fall back to seeing unrestricted
// questions only, never mismatched ones).
function sqParseGrade(label) {
  const m = String(label || '').match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}

// True if a student's class label falls inside a "9-12"-style range string
// set on a question. Falls back to plain exact-text matching for any
// className value that isn't a two-number range (e.g. "10-A" section labels
// keep working exactly as before). If the student's own class field is
// blank/unparseable (the field is optional at login), this fails OPEN —
// the question still shows — rather than silently hiding it from a student
// who simply never typed a class number.
function sqClassMatchesRange(studentClassLabel, rangeStr) {
  const m = String(rangeStr || '').trim().match(/^(\d+)\s*-\s*(\d+)$/);
  if (!m) return null; // not a range — caller should fall back to exact match
  const lo = parseInt(m[1], 10), hi = parseInt(m[2], 10);
  const grade = sqParseGrade(studentClassLabel);
  if (grade === null) return true; // unknown class — don't hide it, show it
  return grade >= lo && grade <= hi;
}

// Picks the best-fitting animation theme by scanning the question text for
// science keywords; falls back to a rotating default so every card still
// looks distinct even for generic statements.
function pickAnimType(text, fallbackIndex) {
  const t = (text || '').toLowerCase();
  const rules = [
    { type: 'orbit',    words: ['planet','solar','orbit','space','universe','star','galaxy'] },
    { type: 'atom',     words: ['atom','electron','element','molecule','proton','neutron'] },
    { type: 'plant',    words: ['plant','photosynthesis','grow','seed','leaf','tree','ecosystem'] },
    { type: 'water',    words: ['water','rain','cycle','ocean','river','cloud','evaporat'] },
    { type: 'electric', words: ['electric','circuit','current','energy','power','bulb','charge'] },
    { type: 'wave',     words: ['wave','sound','light','frequency','vibrat','echo'] },
    { type: 'flask',    words: ['chemical','reaction','acid','mixture','experiment','lab','compound'] },
    { type: 'pendulum', words: ['force','motion','gravity','pendulum','physics','push','pull'] },
  ];
  for (const r of rules) if (r.words.some(w => t.includes(w))) return r.type;
  const fallbacks = ['atom','orbit','plant','water','electric','wave','flask','pendulum'];
  return fallbacks[(fallbackIndex || 0) % fallbacks.length];
}

// Returns an inline SVG string for the given animation theme, sized to fill
// its container (used both as a small card thumbnail and the large preview).
function sqAnimSVG(type) {
  switch (type) {
    case 'atom': return `
      <svg viewBox="0 0 200 200"><g>
        <ellipse class="sq-anim-orbit1" cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#4fc3f7" stroke-width="1.5" opacity="0.5"/>
        <ellipse class="sq-anim-orbit2" cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#ce93d8" stroke-width="1.5" opacity="0.5" transform="rotate(60 100 100)"/>
        <ellipse class="sq-anim-orbit3" cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#4db6ac" stroke-width="1.5" opacity="0.5" transform="rotate(120 100 100)"/>
        <circle class="sq-anim-atom-nucleus" cx="100" cy="100" r="12" fill="#ffd54f"/>
        <circle cx="180" cy="100" r="4" fill="#4fc3f7"><animateMotion dur="4s" repeatCount="indefinite" path="M0,0 a80,30 0 1,0 -0.1,0"/></circle>
        <circle cx="180" cy="100" r="4" fill="#ce93d8"><animateMotion dur="6s" repeatCount="indefinite" path="M0,0 a80,30 0 1,1 -0.1,0" rotate="60"/></circle>
      </g></svg>`;
    case 'orbit': return `
      <svg viewBox="0 0 200 200"><g>
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.1)"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.1)"/>
        <circle class="sq-anim-atom-nucleus" cx="100" cy="100" r="16" fill="#ffd54f"/>
        <g class="sq-anim-orbit1"><circle cx="170" cy="100" r="6" fill="#4fc3f7"/></g>
        <g class="sq-anim-orbit3"><circle cx="40" cy="100" r="9" fill="#ff6b6b"/></g>
      </svg>`;
    case 'plant': return `
      <svg viewBox="0 0 200 200"><g>
        <ellipse cx="100" cy="178" rx="55" ry="8" fill="rgba(79,195,247,0.08)"/>
        <rect class="sq-anim-stem" x="96" y="90" width="8" height="88" rx="4" fill="#4db6ac"/>
        <ellipse class="sq-anim-leaf" cx="72" cy="120" rx="24" ry="12" fill="#4db6ac" transform="rotate(-25 72 120)" style="animation-delay:.3s"/>
        <ellipse class="sq-anim-leaf" cx="128" cy="105" rx="24" ry="12" fill="#66c2b8" transform="rotate(25 128 105)" style="animation-delay:.7s"/>
        <circle class="sq-anim-leaf" cx="100" cy="80" r="16" fill="#ffd54f" style="animation-delay:1.1s"/>
      </g></svg>`;
    case 'water': return `
      <svg viewBox="0 0 200 200"><g>
        <ellipse cx="70" cy="55" rx="34" ry="18" fill="rgba(232,234,246,0.85)"/>
        <ellipse cx="100" cy="48" rx="26" ry="15" fill="rgba(232,234,246,0.85)"/>
        <circle class="sq-anim-drop" cx="65" cy="70" r="4" fill="#4fc3f7"/>
        <circle class="sq-anim-drop" cx="90" cy="70" r="4" fill="#4fc3f7" style="animation-delay:.5s"/>
        <circle class="sq-anim-drop" cx="115" cy="70" r="4" fill="#4fc3f7" style="animation-delay:1s"/>
        <path d="M0,150 Q50,135 100,150 T200,150 V200 H0 Z" fill="#0288d1" opacity="0.5"/>
        <path d="M0,160 Q50,148 100,160 T200,160 V200 H0 Z" fill="#4fc3f7" opacity="0.4"/>
      </g></svg>`;
    case 'electric': return `
      <svg viewBox="0 0 200 200"><g>
        <circle class="sq-anim-atom-nucleus" cx="100" cy="70" r="34" fill="none" stroke="#ffd54f" stroke-width="3" opacity="0.6"/>
        <polygon class="sq-anim-bolt" points="105,30 80,95 98,95 90,150 130,80 108,80" fill="#ffd54f"/>
      </g></svg>`;
    case 'wave': return `
      <svg viewBox="0 0 200 200"><g>
        <circle class="sq-anim-ripple" cx="100" cy="100" r="20" fill="none" stroke="#4fc3f7" stroke-width="3"/>
        <circle class="sq-anim-ripple" cx="100" cy="100" r="20" fill="none" stroke="#4fc3f7" stroke-width="3" style="animation-delay:.7s"/>
        <circle class="sq-anim-ripple" cx="100" cy="100" r="20" fill="none" stroke="#4fc3f7" stroke-width="3" style="animation-delay:1.4s"/>
        <circle cx="100" cy="100" r="10" fill="#4fc3f7"/>
      </g></svg>`;
    case 'flask': return `
      <svg viewBox="0 0 200 200"><g>
        <path d="M85,30 h30 v40 l30,80 a10,10 0 0 1 -10,14 h-70 a10,10 0 0 1 -10,-14 l30,-80 z" fill="none" stroke="#ce93d8" stroke-width="3"/>
        <path d="M65,120 h70 l16,44 a10,10 0 0 1 -10,14 h-82 a10,10 0 0 1 -10,-14 z" fill="#ce93d8" opacity="0.35"/>
        <circle class="sq-anim-bubble" cx="90" cy="150" r="5" fill="#ce93d8"/>
        <circle class="sq-anim-bubble" cx="110" cy="155" r="4" fill="#4fc3f7" style="animation-delay:.6s"/>
        <circle class="sq-anim-bubble" cx="100" cy="145" r="3" fill="#ffd54f" style="animation-delay:1.2s"/>
      </g></svg>`;
    case 'pendulum': return `
      <svg viewBox="0 0 200 200"><g>
        <line x1="40" y1="30" x2="160" y2="30" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
        <g class="sq-anim-pendulum">
          <line x1="100" y1="30" x2="100" y2="130" stroke="#4fc3f7" stroke-width="3"/>
          <circle cx="100" cy="140" r="16" fill="#ff6b6b"/>
        </g>
      </g></svg>`;
    // Black-and-white line-art "scitoon" (no colour, no AI-generated art) for
    // the "scientific careers advance society" statement — two students at a
    // lab bench (microscope + flask) with ONE symbol above them, a globe with
    // a small rising-progress mark, standing in for "advancement of society"
    // without crowding the picture with several separate thought-bubbles.
    case 'career': return `
      <svg viewBox="0 0 220 170">
        <rect x="3" y="3" width="214" height="164" rx="14" fill="#ffffff"/>
        <g fill="none" stroke="#111111" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">

          <!-- bench line -->
          <line x1="14" y1="150" x2="206" y2="150"/>

          <!-- central globe — one clear symbol for "society / the world",
               instead of several thought-bubbles, so the picture stays simple -->
          <circle cx="110" cy="38" r="21"/>
          <path d="M89,38 Q110,26 131,38 Q110,50 89,38" stroke-width="2.2"/>
          <path d="M110,17 L110,59" stroke-width="2.2"/>
          <path d="M98,21 Q86,38 98,55" stroke-width="2.2"/>
          <path d="M122,21 Q134,38 122,55" stroke-width="2.2"/>
          <!-- short rays, echoing the "glow" around the globe in the reference photo -->
          <line x1="110" y1="6" x2="110" y2="12"/>
          <line x1="85" y1="14" x2="89" y2="18"/>
          <line x1="135" y1="14" x2="131" y2="18"/>
          <line x1="70" y1="38" x2="76" y2="38"/>
          <line x1="150" y1="38" x2="144" y2="38"/>

          <!-- small rising-progress mark under the globe = "advancement" -->
          <path d="M96,72 L104,64 L112,69 L124,54" stroke-width="2.2"/>
          <path d="M116,54 L124,54 L124,62" stroke-width="2.2" fill="none"/>

          <!-- LEFT student: boy at microscope -->
          <circle cx="52" cy="88" r="13"/>
          <path d="M40,72 Q46,58 52,60 Q58,58 63,70" stroke-width="2.4"/>
          <path d="M34,150 Q34,116 52,111 Q70,116 70,150 Z"/>
          <path d="M52,111 L52,132"/>
          <path d="M52,120 L62,128"/>

          <!-- microscope on the bench between them -->
          <rect x="86" y="140" width="26" height="7" rx="1.5"/>
          <path d="M99,140 L99,120"/>
          <path d="M99,120 Q99,104 110,98"/>
          <rect x="90" y="126" width="18" height="6" rx="1"/>
          <path d="M110,98 L118,92" stroke-width="3.2"/>
          <circle cx="120" cy="90" r="3.2" fill="#111111"/>

          <!-- RIGHT student: girl holding a flask -->
          <circle cx="162" cy="86" r="13"/>
          <path d="M150,76 Q150,58 162,58 Q176,58 175,76 Q178,84 172,86" stroke-width="2.4"/>
          <path d="M144,150 Q144,114 162,109 Q180,114 180,150 Z"/>
          <path d="M162,109 L162,124 L176,100"/>

          <!-- flask -->
          <path d="M172,72 L172,60 L180,60 L180,72 L188,92 Q190,98 184,98 L168,98 Q162,98 164,92 Z"/>
          <circle cx="174" cy="90" r="1.6" fill="#111111"/>
          <circle cx="179" cy="93" r="1.3" fill="#111111"/>

          <!-- books beside the boy -->
          <rect x="16" y="140" width="20" height="5" rx="1"/>
          <rect x="18" y="135" width="18" height="5" rx="1"/>
          <rect x="16" y="130" width="20" height="5" rx="1"/>
        </g>
      </svg>`;
    default: return sqAnimSVG('atom');
  }
}

// Returns the visual for a question: the admin-uploaded illustration image
// if one exists on the question, otherwise falls back to the auto-picked
// animated SVG. Keeping this in one place means every screen that shows a
// question (admin grid, admin preview, student questionnaire) stays in sync.
function sqIllustration(q, type) {
  // Always render a plain black & white illustration — a custom one if the
  // admin uploaded it for this question, otherwise a generic science-themed
  // default. The old animated SVG themes are no longer used.
  const src = (q && q.image) ? q.image : SQ_DEFAULT_IMAGE;
  const alt = 'Illustration for: ' + (q && q.text ? q.text : 'science question').replace(/"/g, '&quot;');
  return `<div class="sq-illustration-img-wrap"><img src="${src}" alt="${alt}"></div>`;
}

// Fixed display order for the known survey sections (matches the tab order
// in the source Survey_Question.xlsx). Any category not in this list is
// appended after these, in first-seen order; uncategorized questions render
// last under "General".
const SQ_SECTION_ORDER = ['Rationality', 'Open-mindedness', 'Confidence in Scientific Method', 'Curiosity', 'Aversion to Superstition'];

function sqRenderCard(q, i) {
  const type = q.type && q.type !== 'auto' ? q.type : pickAnimType(q.text, i);
  const targetLabel = (q.school || q.className)
    ? `🎯 ${q.school || 'All Schools'}${q.className ? ' · ' + q.className : ''}`
    : '🌐 All Schools · All Classes';
  return `
      <div class="sq-card">
        <div class="sq-card-anim">${sqIllustration(q, type)}</div>
        <div class="sq-card-text">${q.text}</div>
        <div style="font-size:0.72rem;color:var(--text-muted);">${targetLabel}</div>
        <div class="sq-card-actions">
          <button class="tbl-btn success" onclick="editQuestion('${q.id}')">✏️ Edit</button>
          <button class="tbl-btn danger" onclick="deleteQuestion('${q.id}')">🗑 Delete</button>
        </div>
      </div>`;
}

function renderQuestionManager() {
  const db = getDB();
  seedScienceQuestions(db);
  const qs = db.scienceQuestions;

  // Group questions by category (section), preserving section order from
  // SQ_SECTION_ORDER first, then any other categories in first-seen order,
  // then uncategorized questions last under "General".
  const groups = new Map();
  const otherOrder = [];
  qs.forEach(q => {
    const key = (q.category || '').trim();
    if (!groups.has(key)) {
      groups.set(key, []);
      if (key && !SQ_SECTION_ORDER.includes(key)) otherOrder.push(key);
    }
    groups.get(key).push(q);
  });
  const orderedKeys = [...SQ_SECTION_ORDER.filter(k => groups.has(k)), ...otherOrder];

  const sectionsHtml = orderedKeys.map(key => {
    const items = groups.get(key);
    const label = key || 'General';
    return `
    <div class="sq-section" style="margin-bottom:1.75rem;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.75rem;">
        <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;color:var(--text);">${label}</div>
        <div style="font-size:0.72rem;color:var(--text-muted);">${items.length} question${items.length === 1 ? '' : 's'}</div>
        <div style="flex:1;border-bottom:1px solid var(--border);"></div>
      </div>
      <div class="sq-grid">${items.map((q, i) => sqRenderCard(q, i)).join('')}</div>
    </div>`;
  }).join('');

  document.getElementById('admin-content').innerHTML = `
    <div class="sq-toolbar">
      <div class="sq-count">${qs.length} science question(s) · 5-point Strongly Agree → Strongly Disagree scale · visible to students on the Exam Portal</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="sq-btn sq-btn-gold" onclick="openQuestionPreview()">▶ Preview Questions</button>
        <button class="sq-btn sq-btn-primary" onclick="openAddQuestion()">➕ Add Question</button>
      </div>
    </div>
    ${qs.length ? sectionsHtml : '<div class="empty-state"><div class="empty-icon">🧬</div><div class="empty-title">No Questions Yet</div><div>Add your first science attitude question to get started.</div></div>'}
  `;
}

// Auto-detects the illustration for a question from its text/keywords. The
// admin never picks or previews it manually — it's computed wherever the
// question is actually shown (question cards, exam portal, results, etc.).
function openAddQuestion() {
  sqUploadSeq++; sqImageProcessing = false; // invalidate any still-processing upload from a previous question
  document.getElementById('sq-modal-title').textContent = 'Add Science Question';
  document.getElementById('sq-edit-id').value = '';
  document.getElementById('sq-text').value = '';
  document.getElementById('sq-category').value = '';
  document.getElementById('sq-school').value = '';
  document.getElementById('sq-class').value = '';
  sqRemoveImage();
  openModal('sq-modal');
}

function editQuestion(id) {
  if (!currentUser || currentUser.role !== 'admin') return showToast('Only Admin can edit questions', 'error');
  sqUploadSeq++; sqImageProcessing = false; // invalidate any still-processing upload from a previous question
  const db = getDB();
  const q = (db.scienceQuestions || []).find(x => x.id === id);
  if (!q) return;
  document.getElementById('sq-modal-title').textContent = 'Edit Science Question';
  document.getElementById('sq-edit-id').value = q.id;
  document.getElementById('sq-text').value = q.text;
  document.getElementById('sq-category').value = q.category || '';
  document.getElementById('sq-school').value = q.school || '';
  document.getElementById('sq-class').value = q.className || '';
  document.getElementById('sq-image-file').value = '';
  if (q.image) {
    document.getElementById('sq-image-data').value = q.image;
    document.getElementById('sq-image-preview').src = q.image;
    document.getElementById('sq-image-preview-wrap').style.display = 'block';
  } else {
    sqRemoveImage();
  }
  openModal('sq-modal');
}

// Reads an uploaded illustration and shrinks it to a reasonable size before
// storing it as a base64 data URL alongside the question. Reading the file,
// decoding it, and resizing it are all asynchronous, so there's a brief
// window between picking a file and the image actually being ready to
// save. Two related bugs came from that window:
//  1) Clicking Save during that window saved a BLANK image (the hidden
//     field hadn't been filled in yet), which falls back to the same
//     default illustration — making unrelated questions appear to share
//     "the same image" when really neither had a real one saved.
//  2) If the admin closed this form and opened a DIFFERENT question before
//     an earlier upload's processing finished, the late-arriving result
//     could land on the WRONG question's hidden field.
// sqImageProcessing + sqUploadSeq guard against both: saveQuestionForm()
// refuses to save while an image is still processing, and each upload is
// tagged with the sequence number active when it started, so a late result
// is discarded if the form has since moved on to a different question.
let sqImageProcessing = false;
let sqUploadSeq = 0;

function sqHandleImageUpload(evt) {
  const file = evt.target.files && evt.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('Please choose an image file', 'error');
    evt.target.value = '';
    return;
  }
  if (file.size > 8 * 1024 * 1024) {
    showToast('Image is too large — please use one under 8MB', 'error');
    evt.target.value = '';
    return;
  }
  sqImageProcessing = true;
  const myUploadSeq = sqUploadSeq;
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const MAX_DIM = 800;
      let w = img.naturalWidth, h = img.naturalHeight;
      if (w > MAX_DIM || h > MAX_DIM) {
        if (w >= h) { h = Math.round(h * (MAX_DIM / w)); w = MAX_DIM; }
        else { w = Math.round(w * (MAX_DIM / h)); h = MAX_DIM; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff'; // flattens transparency so PNGs re-encode cleanly as JPEG
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      let dataUrl;
      try {
        dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      } catch (err) {
        dataUrl = e.target.result; // fallback to the original if canvas re-encoding fails
      }
      if (myUploadSeq !== sqUploadSeq) return; // the form moved on to a different question — discard
      document.getElementById('sq-image-data').value = dataUrl;
      document.getElementById('sq-image-preview').src = dataUrl;
      document.getElementById('sq-image-preview-wrap').style.display = 'block';
      sqImageProcessing = false;
    };
    img.onerror = function () {
      showToast('Could not read that image', 'error');
      if (myUploadSeq === sqUploadSeq) sqImageProcessing = false;
    };
    img.src = e.target.result;
  };
  reader.onerror = function () {
    showToast('Could not read that image', 'error');
    if (myUploadSeq === sqUploadSeq) sqImageProcessing = false;
  };
  reader.readAsDataURL(file);
}

function sqRemoveImage() {
  document.getElementById('sq-image-data').value = '';
  const fileInput = document.getElementById('sq-image-file');
  if (fileInput) fileInput.value = '';
  document.getElementById('sq-image-preview-wrap').style.display = 'none';
}

function saveQuestionForm() {
  if (!currentUser || currentUser.role !== 'admin') return showToast('Only Admin can manage questions', 'error');
  if (sqImageProcessing) {
    showToast('Still processing the image — please wait a moment and click Save again', 'error');
    return;
  }
  const text = document.getElementById('sq-text').value.trim();
  if (!text) return showToast('Please enter a question statement', 'error');
  // Type is always auto-detected from the question text — the admin no
  // longer picks a theme manually. It's only used as a fallback animation
  // when no illustration image has been uploaded for this question.
  const type = 'auto';
  const category = document.getElementById('sq-category').value;
  const image = document.getElementById('sq-image-data').value || '';
  const school = document.getElementById('sq-school').value.trim();
  const className = document.getElementById('sq-class').value.trim();
  const editId = document.getElementById('sq-edit-id').value;
  const db = getDB();
  seedScienceQuestions(db);
  let savedQuestion;
  if (editId) {
    const q = db.scienceQuestions.find(x => x.id === editId);
    if (q) { q.text = text; q.type = type; q.category = category; q.image = image; q.school = school; q.className = className; savedQuestion = q; }
  } else {
    savedQuestion = { id: uid(), text, type, category, image, school, className };
    db.scienceQuestions.push(savedQuestion);
  }
  DB_CACHE = db; // reflect immediately for anything reading getDB() right after this
  if (savedQuestion) sqPersistOne(db, savedQuestion);
  closeModal('sq-modal');
  showToast(editId ? 'Question updated' : 'Question added', 'success');
  renderQuestionManager();
}

function deleteQuestion(id) {
  if (!currentUser || currentUser.role !== 'admin') return showToast('Only Admin can delete questions', 'error');
  const db = getDB();
  db.scienceQuestions = (db.scienceQuestions || []).filter(q => q.id !== id);
  DB_CACHE = db;
  sqPersistDelete(db, id);
  showToast('Question deleted');
  renderQuestionManager();
}

// ---- Paginated preview/player: 1 question per page, each with its own
// illustration image (shown on the right) and a 5-point Strongly Agree →
// Strongly Disagree scale with Neutral (shown on the left).
// Used both by Admin (unfiltered "Preview") and by Students on the Exam
// Portal (filtered to their own school + class, plus any question left
// open to "All Schools / All Classes"). Editing is never exposed here —
// only the Admin panel's Generate Questions tab can add/edit/delete. ----
let sqPreviewPage = 0;
let sqAnswers = {}; // qId -> selected value (1-4), tracks answers for the current questionnaire session
let sqFilterSchool = null;
let sqFilterClass = null;
const sqOptionLabels = ['1. Strongly Agree', '2. Agree', '3. Neutral', '4. Disagree', '5. Strongly Disagree'];

function sqGetFilteredList() {
  const db = getDB();
  seedScienceQuestions(db);
  const qs = db.scienceQuestions || [];
  if (sqFilterSchool === null && sqFilterClass === null) return qs; // admin: unfiltered
  const school = (sqFilterSchool || '').trim().toLowerCase();
  const cls = (sqFilterClass || '').trim().toLowerCase();
  return qs.filter(q => {
    const qSchool = (q.school || '').trim().toLowerCase();
    const qClass = (q.className || '').trim();
    const schoolOk = !qSchool || qSchool === school;
    let classOk;
    if (!qClass) {
      classOk = true;
    } else {
      const rangeResult = sqClassMatchesRange(sqFilterClass, qClass);
      classOk = rangeResult !== null ? rangeResult : qClass.toLowerCase() === cls;
    }
    return schoolOk && classOk;
  });
}

function openStudentSciencePrompt() {
  if (!currentUser || currentUser.role !== 'student') { showPage('auth'); showToast('Please sign in as a student first', 'error'); return; }
  if (hasAttemptedExam('science-attitude')) {
    alert('You have already submitted the Scientific Attitude Study (S.A.S). Re-attempting is not allowed.');
    return;
  }
  openModal('sq-student-modal');
}
function sqStudentStart() {
  if (hasAttemptedExam('science-attitude')) {
    closeModal('sq-student-modal');
    alert('You have already submitted the Scientific Attitude Study (S.A.S). Re-attempting is not allowed.');
    return;
  }
  closeModal('sq-student-modal');
  // School/Class are already on file from the student's account — no need to ask again.
  openStudentQuestionPreview(currentUser.schoolName || '', currentUser.className || '');
}

function openQuestionPreview() {
  if (!currentUser || currentUser.role !== 'admin') return showToast('Only Admin can access this preview', 'error');
  sqFilterSchool = null; sqFilterClass = null; // admin sees every question, unfiltered
  const list = sqGetFilteredList();
  if (!list.length) return showToast('Add a question first', 'error');
  document.getElementById('sq-player-title').textContent = '🧬 Scientific Attitude Study (S.A.S) — Preview';
  sqPreviewPage = 0;
  sqAnswers = {};
  sqShowQuestions();
  document.getElementById('sq-player-overlay').classList.add('open');
  const sqCloseBtn = document.getElementById('sq-player-close');
  if (sqCloseBtn) sqCloseBtn.style.display = '';
  sqRenderPage();
}
function openStudentQuestionPreview(school, className) {
  sqFilterSchool = school || '';
  sqFilterClass = className || '';
  const list = sqGetFilteredList();
  if (!list.length) { showToast('No science questions available for your school/class yet', 'error'); return; }
  document.getElementById('sq-player-title').textContent = '🧬 Scientific Attitude Study (S.A.S)';
  sqPreviewPage = 0;
  sqAnswers = {};
  sqShowQuestions();
  document.getElementById('sq-player-overlay').classList.add('open');
  const sqCloseBtn = document.getElementById('sq-player-close');
  if (sqCloseBtn) sqCloseBtn.style.display = 'none';
  sqRenderPage();
}
function closeQuestionPreview() {
  document.getElementById('sq-player-overlay').classList.remove('open');
}
// Switch the player back to question view (grid + nav) and hide the thank-you screen
function sqShowQuestions() {
  document.getElementById('sq-page-grid').style.display = '';
  document.getElementById('sq-player-nav').style.display = '';
  document.getElementById('sq-thankyou').classList.remove('show');
}
function sqTotalPages() {
  return Math.max(1, sqGetFilteredList().length);
}
function sqRenderPage() {
  const qs = sqGetFilteredList();
  const totalPages = sqTotalPages();
  if (sqPreviewPage >= totalPages) sqPreviewPage = totalPages - 1;
  if (sqPreviewPage < 0) sqPreviewPage = 0;
  const pageItems = qs.slice(sqPreviewPage, sqPreviewPage + 1);
  document.getElementById('sq-page-grid').innerHTML = pageItems.map((q, idx) => {
    const globalIndex = sqPreviewPage + idx;
    const type = q.type && q.type !== 'auto' ? q.type : pickAnimType(q.text, globalIndex);
    return `
    <div class="sq-qcard-single">
      <div class="sq-qcard-left">
        <div class="sq-qcard-num">Question ${globalIndex + 1}</div>
        <div class="sq-qcard-text-single">${q.text}</div>
        <div class="sq-opts-single" id="sq-opts-${q.id}">
          ${sqOptionLabels.map((label, i) => `<button class="sq-opt${sqAnswers[q.id] === i+1 ? ' selected' : ''}" data-v="${i+1}" onclick="sqSelectOption('${q.id}', ${i+1}, this)">${label}</button>`).join('')}
        </div>
      </div>
      <div class="sq-qcard-right">${sqIllustration(q, type)}</div>
    </div>`;
  }).join('');
  document.getElementById('sq-page-dots').innerHTML = Array.from({length: totalPages}).map((_, i) =>
    `<div class="sq-page-dot ${i === sqPreviewPage ? 'active' : ''}"></div>`).join('');

  // On the last page, the Next button becomes Submit so the questionnaire has a clear end.
  const isLastPage = sqPreviewPage === totalPages - 1;
  const nextBtn = document.getElementById('sq-next-btn');
  nextBtn.textContent = isLastPage ? 'Submit ✓' : 'Next →';
  document.getElementById('sq-prev-btn').style.visibility = sqPreviewPage === 0 ? 'hidden' : 'visible';
}
function sqSelectOption(qId, val, el) {
  sqAnswers[qId] = val;
  document.querySelectorAll(`#sq-opts-${qId} .sq-opt`).forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}
// Returns the question objects shown on the given page that don't yet have an answer.
function sqUnansweredOnPage(page) {
  const qs = sqGetFilteredList();
  const pageItems = qs.slice(page, page + 1);
  return pageItems.filter(q => !sqAnswers[q.id]);
}
function sqNextPage() {
  const totalPages = sqTotalPages();
  const unanswered = sqUnansweredOnPage(sqPreviewPage);
  if (unanswered.length) {
    showToast('Please answer the question' + (unanswered.length > 1 ? 's' : '') + ' before continuing', 'error');
    return;
  }
  const isLastPage = sqPreviewPage === totalPages - 1;
  if (isLastPage) { sqFinish(); return; }
  sqPreviewPage++;
  sqRenderPage();
}
function sqPrevPage() {
  if (sqPreviewPage === 0) return;
  sqPreviewPage--;
  sqRenderPage();
}
// Called once every question has been answered — shows the thank-you screen and
// (for real students, not the Admin preview) records the completion so it shows
// up in the Admin's Exam Results tab and Excel export.
function sqFinish() {
  document.getElementById('sq-page-grid').style.display = 'none';
  document.getElementById('sq-player-nav').style.display = 'none';
  document.getElementById('sq-thankyou').classList.add('show');
  if (currentUser && currentUser.role === 'student') saveScienceAttempt();
  showToast('Questionnaire submitted — thank you!', 'success');
}

// Persists a completed Scientific Attitude Study (S.A.S) as an "exam attempt" so
// it appears in Admin > Exam Results and the Excel export, same as real exams.
function saveScienceAttempt() {
  const db = getDB();
  if (!db.examAttempts) db.examAttempts = [];
  const qs = sqGetFilteredList();
  const answered = Object.keys(sqAnswers).length;

  // Record the question text + the 5-point option the student picked for every
  // question, so the Excel export can list the full questionnaire alongside
  // each student's answers, not just how many they completed.
  const answers = qs.map(q => ({
    question: q.text,
    selected: sqAnswers[q.id] ? sqOptionLabels[sqAnswers[q.id] - 1] : 'Not answered'
  }));

  db.examAttempts.push({
    id: uid(),
    examId: 'science-attitude',
    examTitle: 'Scientific Attitude Study (S.A.S)',
    studentId: currentUser.id,
    studentName: currentUser.name || '',
    rollNo: currentUser.rollNo || '',
    section: currentUser.className || '',
    school: currentUser.schoolName || '',
    score: answered,
    total: qs.length,
    pct: qs.length ? Math.round((answered / qs.length) * 100) : null,
    date: today(),
    answers
  });
  saveDB(db);
}
// ===================== /SCIENCE QUESTION GENERATOR =====================

// Shared markup for the "Shared Student Login" credentials card — reused by the
// Admin Panel and by a school's own profile page so either can change the
// email and password used by every student, at any time.
function sharedStudentLoginCardHTML(prefix) {
  const db = getDB();
  const studentEmail = getStudentLoginEmail();
  const studentPass = (db.settings && db.settings.studentPassword) || '';
  return `
      <div style="max-width:480px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;">
        <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;margin-bottom:0.5rem;">🔑 Shared Student Login</div>
        <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:1.25rem;line-height:1.6;">
          Every student signs in with the <strong>same email and password</strong> below — no individual accounts needed.
          Update either field any time; changes apply immediately to all students.
        </div>
        <div class="form-group"><label>Student Login Email</label><input type="email" id="${prefix}-student-email" value="${studentEmail}"></div>
        <div class="form-group"><label>Student Login Password</label><input type="text" id="${prefix}-student-pass" value="${studentPass}"></div>
        <button class="btn-submit" onclick="updateStudentCredentials('${prefix}')" style="width:auto;padding:10px 24px;">Save Changes</button>
      </div>`;
}

async function updateStudentCredentials(prefix) {
  const emailInput = document.getElementById(prefix + '-student-email');
  const passInput = document.getElementById(prefix + '-student-pass');
  const email = emailInput.value.trim().toLowerCase();
  const pass = passInput.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showToast('Enter a valid email address', 'error');
  if (!pass) return showToast('Password cannot be empty', 'error');

  const fixedEmail = getStudentLoginEmail().toLowerCase(); // student@scicomm.in — the backend only supports this one shared address for now
  if (email !== fixedEmail) {
    return showToast('The student login email is fixed to ' + fixedEmail + ' for now — only the password can be changed here', 'error');
  }

  try {
    await api('/api/settings', { method: 'PATCH', body: JSON.stringify({ studentPassword: pass }) });
    DB_CACHE.settings.studentPassword = pass;
    showToast('Student login password updated ✅', 'success');
    if (prefix === 'admin') renderAdmin();
    else if (prefix === 'school') renderProfile();
  } catch (e) { showToast(e.message || 'Could not update password', 'error'); }
}

async function deleteRating(id) {
  try {
    await api('/api/ratings/' + id, { method: 'DELETE' });
    await loadRatings();
    renderAdmin();
    showToast('Rating deleted');
  } catch (e) { showToast(e.message || 'Could not delete rating', 'error'); }
}

// ===================== CONTACT US =====================
function submitContactForm() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  if (!name || !email || !message) return showToast('Please fill in all fields', 'error');
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-message').value = '';
  showToast('Message sent — we will get back to you soon');
}

// ===================== SUBMIT RATING =====================
function setStars(n) {
  currentStars = n;
  document.querySelectorAll('#star-input .star-input').forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
}
async function submitRating() {
  if (!currentUser) return (closeModal('add-modal'), showPage('auth'), showToast('Please sign in first', 'error'));
  const name = document.getElementById('f-name').value.trim();
  const topic = document.getElementById('f-topic').value.trim();
  const category = document.getElementById('f-category').value;
  const review = document.getElementById('f-review').value.trim();
  const school = document.getElementById('f-school')?.value.trim() || '';
  if (!name || !topic || !review) return showToast('Please fill all required fields', 'error');
  if (!currentStars) return showToast('Please select a star rating', 'error');
  try {
    await api('/api/ratings', {
      method: 'POST',
      body: JSON.stringify({
        studentName: name, category, topic, review, stars: currentStars,
        curiosity: +document.getElementById('s-curiosity').value,
        attitude: +document.getElementById('s-attitude').value,
        comm: +document.getElementById('s-comm').value,
        research: +document.getElementById('s-research').value,
        innovation: +document.getElementById('s-innovation').value,
        school
      })
    });
    await loadRatings();
    closeModal('add-modal');
    document.getElementById('f-name').value = '';
    document.getElementById('f-topic').value = '';
    document.getElementById('f-review').value = '';
    if (document.getElementById('f-school')) document.getElementById('f-school').value = '';
    setStars(0);
    showToast('Rating submitted successfully! 🎉', 'success');
    renderHome();
  } catch (e) { showToast(e.message || 'Could not submit rating', 'error'); }
}

// ===================== TOAST =====================
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ===================== UTILS =====================
function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }
function initials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }
function today() { return new Date().toISOString().slice(0, 10); }
function avg(arr) { return arr.length ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : 0; }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
});

// ===================== INIT =====================
(async function bootstrapApp() {
  loadSession(); // must run first — loadDBFromStorage() checks currentUser to decide whether to fetch exams
  await loadDBFromStorage();
  renderAuth(true);
  renderHome();
  updateNavForUser();
})();

// ===================== SCIENCE ANIMATIONS =====================
(function() {
  // --- Floating science emoji icons ---
  const icons = ['⚗️','🔬','🧬','🔭','🧪','🧫','💊','🔋','⚛️','🧲','🌡️','🔩','💉','🧠','🌊','⚡','🌿','🔑'];
  const container = document.getElementById('sci-floats');
  function spawnFloat() {
    const el = document.createElement('div');
    el.className = 'sci-float';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    const size = 1.2 + Math.random() * 1.4;
    const dur = 12 + Math.random() * 18;
    const left = Math.random() * 100;
    el.style.cssText = `left:${left}vw; font-size:${size}rem; animation-duration:${dur}s; animation-delay:${Math.random()*8}s;`;
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 10) * 1000);
  }
  for (let i = 0; i < 12; i++) setTimeout(spawnFloat, i * 1200);
  setInterval(spawnFloat, 2500);

  // --- Canvas: animated molecule network ---
  const canvas = document.getElementById('sci-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Node() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.r = 2 + Math.random() * 3;
  }

  for (let i = 0; i < 38; i++) nodes.push(new Node());

  // Scroll parallax offset
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    const parallax = scrollY * 0.08;

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = (nodes[i].y - parallax) - (nodes[j].y - parallax);
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 160) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79,195,247,${0.5 * (1 - dist/160)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y - parallax % H);
          ctx.lineTo(nodes[j].x, nodes[j].y - parallax % H);
          ctx.stroke();
        }
      }
    }

    // Draw nodes (atoms)
    nodes.forEach(n => {
      const py = n.y - (parallax * 0.12) % H;
      ctx.beginPath();
      ctx.arc(n.x, py, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79,195,247,0.8)';
      ctx.fill();
      // orbit ring
      ctx.beginPath();
      ctx.ellipse(n.x, py, n.r * 4, n.r * 1.5, Date.now()/3000 + n.x, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(79,195,247,0.2)';
      ctx.lineWidth = 0.7;
      ctx.stroke();
    });

    requestAnimationFrame(drawFrame);
  }
  drawFrame();

  // --- Scroll reveal ---
  const revealEls = document.querySelectorAll('.stat-card, .rating-card, .section-header, .reveal, .empower-banner');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible', 'reveal'); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => { el.classList.add('reveal'); observer.observe(el); });

  // Re-observe after dynamic renders
  const origRenderHome = window.renderHome;
  // patch after render
  const patchReveal = () => {
    setTimeout(() => {
      document.querySelectorAll('.stat-card, .rating-card').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
      });
    }, 100);
  };
  document.addEventListener('click', patchReveal);
})();

</script>

<script>
(function(){
  const tip = document.getElementById('card-tooltip');
  let hideTimer;

  window.showCardTooltip = function(e, el) {
    clearTimeout(hideTimer);
    const d = JSON.parse(decodeURIComponent(el.dataset.tip));
    const bw = v => Math.round(v * 10);
    tip.innerHTML =
      '<div style="font-family:Syne,sans-serif;font-weight:700;font-size:0.85rem;color:#4fc3f7;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid rgba(79,195,247,0.15);">📊 ' + d.name + '</div>' +
      row('🔬 Curiosity', d.curiosity, bw(d.curiosity)) +
      row('🧠 Attitude', d.attitude, bw(d.attitude)) +
      row('💬 Communication', d.comm, bw(d.comm)) +
      row('🔭 Research', d.research, bw(d.research)) +
      row('💡 Innovation', d.innovation, bw(d.innovation)) +
      '<div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(79,195,247,0.15);display:flex;justify-content:space-between;">' +
      '<span style="font-size:0.7rem;color:rgba(255,255,255,0.4)">By ' + d.author + '</span>' +
      '<span style="font-size:0.75rem;font-weight:700;color:#4fc3f7">⭐ ' + d.score + '/10</span></div>';

    tip.style.display = 'block';
    tip.style.opacity = '0';

    const rect = el.getBoundingClientRect();
    const tipW = 270, tipH = 310;
    let left = rect.left + (rect.width / 2) - (tipW / 2);
    let top;

    // Position above or below
    if (rect.top > tipH + 20) {
      top = rect.top - tipH - 12;
    } else {
      top = rect.bottom + 12;
    }

    // Keep in viewport horizontally
    if (left < 8) left = 8;
    if (left + tipW > window.innerWidth - 8) left = window.innerWidth - tipW - 8;

    tip.style.left = left + 'px';
    tip.style.top = top + 'px';

    requestAnimationFrame(() => { tip.style.opacity = '1'; });
  };

  window.hideCardTooltip = function() {
    hideTimer = setTimeout(() => {
      tip.style.opacity = '0';
      setTimeout(() => { tip.style.display = 'none'; }, 200);
    }, 80);
  };

  function row(label, val, pct) {
    return '<div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-top:5px;margin-bottom:2px;">' +
      '<span style="color:rgba(255,255,255,0.45)">' + label + '</span>' +
      '<span style="color:#fff;font-weight:600">' + val + '/10</span></div>' +
      '<div style="height:4px;border-radius:999px;background:rgba(255,255,255,0.08);overflow:hidden;">' +
      '<div style="height:100%;width:' + pct + '%;border-radius:999px;background:linear-gradient(90deg,#4fc3f7,#0288d1);"></div></div>';
  }
})();

// ===================== EXAM SYSTEM =====================
let currentExam = null;
let examAnswers = {};
let examTimerInterval = null;
let examStudentInfo = {};
let questionCount = 0;
let examFileData = null;

function scrollToAttemptExam() {
  if (!currentUser) { showPage('auth'); showToast('Please sign in to attempt an exam', 'error'); return; }
  const db = getDB();
  const exams = (db.exams || []).filter(canSeeExam);
  const openUnattempted = exams.filter(ex => ex.status === 'open' && !hasAttemptedExam(ex.id));
  if (currentUser.role === 'student' && openUnattempted.length === 1) {
    openExamAttempt(openUnattempted[0].id);
    return;
  }
  document.getElementById('exam-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Persistent "already submitted" check — keyed by the student's login name (not
// by browser session), so signing out and back in as the SAME name still blocks
// re-attempting an exam already submitted. A different name typed at the shared
// student login is treated as a different student, and will see the exam normally.
function hasAttemptedExam(examId) {
  if (!currentUser || currentUser.role !== 'student') return false;
  const name = (currentUser.name || '').trim().toLowerCase();
  if (!name) return false;
  const db = getDB();
  return (db.examAttempts || []).some(a =>
    a.examId === examId && (a.studentName || '').trim().toLowerCase() === name
  );
}

function canSeeExam(ex) {
  if (!currentUser) return !ex.school; // logged-out visitors only see public (all-school) exams
  if (currentUser.role === 'admin') return true;
  if (!ex.school) return true; // open to all schools
  const mySchool = (currentUser.schoolName || '').trim().toLowerCase();
  return !!mySchool && mySchool === ex.school.trim().toLowerCase();
}

async function renderExamPage() {
  await loadExams();
  const db = getDB();
  const allExams = db.exams || [];
  // A school's exam papers are only visible to students/teachers of that same school —
  // exams with no school set are public to everyone. Admin always sees everything.
  const exams = allExams.filter(canSeeExam);

  // The Science Attitude Questions block is a student-only feature; the actual
  // question content is entirely managed from the Admin panel's Generate
  // Questions tab (students can only view and answer, never add/edit/delete).
  const scienceSection = document.getElementById('student-science-section');
  if (scienceSection) {
    scienceSection.style.display = (currentUser && currentUser.role === 'student') ? 'flex' : 'none';
    const scienceBtn = scienceSection.querySelector('.sq-btn-gold');
    if (scienceBtn && currentUser && currentUser.role === 'student') {
      if (hasAttemptedExam('science-attitude')) {
        scienceBtn.textContent = '✅ Submitted';
        scienceBtn.disabled = true;
        scienceBtn.style.opacity = '0.5';
        scienceBtn.style.cursor = 'not-allowed';
        scienceBtn.onclick = null;
      } else {
        scienceBtn.textContent = '▶ Start';
        scienceBtn.disabled = false;
        scienceBtn.style.opacity = '';
        scienceBtn.style.cursor = '';
        scienceBtn.onclick = openStudentSciencePrompt;
      }
    }
  }

  // Show upload button for teacher/admin
  const roleActions = document.getElementById('exam-role-actions');
  if (currentUser && currentUser.role === 'admin') {
    roleActions.innerHTML = `<button onclick="openUploadExam()" style="background:linear-gradient(135deg,#4fc3f7,#0288d1);color:#070b1a;border:none;border-radius:8px;padding:8px 18px;font-weight:700;font-size:0.85rem;cursor:pointer;font-family:inherit;">📤 Upload Exam Paper</button>`;
  } else if (currentUser && currentUser.role === 'teacher') {
    roleActions.innerHTML = `<button onclick="openUploadExam()" style="background:rgba(79,195,247,0.1);border:1px solid rgba(79,195,247,0.3);color:#4fc3f7;border-radius:8px;padding:8px 18px;font-size:0.85rem;cursor:pointer;font-family:inherit;">📤 Upload Exam</button>`;
  } else {
    roleActions.innerHTML = '';
  }

  const list = document.getElementById('exam-list');
  if (!exams.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">📝</div><div class="empty-title">No Exams Available Yet</div><div>Your teacher will upload exam papers here. Check back soon!</div></div>`;
    return;
  }

  list.innerHTML = exams.map(ex => {
    const now = new Date(); const examDate = new Date(ex.date);
    const isOpen = ex.status === 'open';
    const isPast = examDate < now && !isOpen;
    const badgeClass = isOpen ? 'open' : isPast ? 'closed' : 'upcoming';
    const badgeText = isOpen ? '🟢 Open' : isPast ? '🔴 Closed' : '🟡 Upcoming';
    const typeLabel = { attitude: '🧠 Scientific Attitude', psychometric: '📊 Psychometric', aptitude: '🔬 Scientific Aptitude' };
    const attempted = currentUser && hasAttemptedExam(ex.id);
    // Only Admin, or the teacher who uploaded this exam, can manage/close/delete it —
    // one school's teacher can't touch another school's exam.
    const canManage = currentUser && (currentUser.role === 'admin' || (currentUser.role === 'teacher' && ex.uploadedBy === currentUser.name));

    return `<div class="exam-card" style="margin-bottom:1rem;" id="exam-card-${ex.id}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem;flex-wrap:wrap;gap:8px;">
        <div>
          <span class="exam-badge ${badgeClass}">${badgeText}</span>
          <span style="font-size:0.72rem;color:rgba(255,255,255,0.4);margin-left:8px;">${typeLabel[ex.type] || ex.type}</span>
        </div>
        <div style="font-size:0.75rem;color:rgba(255,255,255,0.35);">📅 ${ex.date} · ⏱ ${ex.duration} mins</div>
      </div>
      <div style="font-family:Syne,sans-serif;font-weight:700;font-size:1rem;color:#fff;margin-bottom:0.3rem;">${ex.title}</div>
      <div style="font-size:0.8rem;color:rgba(255,255,255,0.4);margin-bottom:1rem;">${ex.targetClass ? 'For: ' + ex.targetClass : ''} ${ex.school ? '· 🏫 ' + ex.school : '· 🌐 All Schools'}</div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <span style="font-size:0.8rem;color:rgba(255,255,255,0.4);">${ex.questions ? ex.questions.length : 0} questions</span>
        ${ex.paperFile ? `<a href="${ex.paperFile.dataUrl}" download="${ex.paperFile.name}" target="_blank" style="font-size:0.8rem;color:#ffd54f;text-decoration:none;">📎 ${ex.paperFile.name}</a>` : ''}
        ${attempted
          ? `<span style="font-size:0.8rem;color:#4fc3f7;font-weight:600;">✅ Attempted · Submitted</span>`
          : isOpen
            ? `<button onclick="openExamAttempt('${ex.id}')" class="attempt-now-btn" style="background:linear-gradient(135deg,#4fc3f7,#0288d1);color:#070b1a;border:none;border-radius:8px;padding:7px 18px;font-weight:700;font-size:0.82rem;cursor:pointer;font-family:inherit;">📝 Attempt Now →</button>`
            : `<span style="font-size:0.8rem;color:rgba(255,255,255,0.3);">${isPast ? 'Exam closed' : 'Not open yet'}</span>`
        }
        ${canManage
          ? `<button onclick="toggleExamStatus('${ex.id}')" style="background:transparent;border:1px solid rgba(79,195,247,0.3);color:#4fc3f7;border-radius:8px;padding:6px 14px;font-size:0.78rem;cursor:pointer;font-family:inherit;">${isOpen ? 'Close Exam' : 'Open Exam'}</button>
             <button onclick="deleteExam('${ex.id}')" style="background:transparent;border:1px solid rgba(255,107,107,0.3);color:#ff6b6b;border-radius:8px;padding:6px 14px;font-size:0.78rem;cursor:pointer;font-family:inherit;">Delete</button>`
          : ''
        }
      </div>
    </div>`;
  }).join('');
}

function openExamAttempt(examId) {
  if (!currentUser) return (showPage('auth'), showToast('Please sign in first', 'error'));
  if (currentUser.role !== 'student') return showToast('Only students can attempt exams', 'error');
  const db = getDB();
  const exam = (db.exams || []).find(e => e.id === examId);
  if (!exam) return showToast('Exam not found', 'error');
  // Defense in depth: even if this got called directly, block cross-school access.
  if (!canSeeExam(exam)) return showToast('This exam is not available for your school', 'error');
  // Block re-attempts by the same student name, even after sign-out/sign-in —
  // this check is persisted (based on db.examAttempts), not just session state.
  if (hasAttemptedExam(examId)) {
    alert('You have already submitted this exam. Re-attempting is not allowed.');
    return;
  }
  // Check if pre-registered
  const isRegistered = (db.registeredStudents || []).some(s => s.studentId === currentUser.id && s.examId === examId) || true; // allow all for now
  if (!isRegistered) return showToast('You are not registered for this exam', 'error');
  // Ask for exam password
  const enteredPass = prompt(`Enter the exam password for "${exam.title}":`);
  if (!enteredPass) return;
  if (enteredPass.trim() !== (exam.examPassword||'')) return showToast('❌ Wrong password! Contact your teacher.', 'error');

  currentExam = exam;
  examAnswers = {};
  document.getElementById('exam-attempt-title').textContent = '📝 ' + exam.title;
  document.getElementById('exam-details-step').style.display = '';
  document.getElementById('exam-questions-step').style.display = 'none';
  document.getElementById('exam-result-step').style.display = 'none';
  // Pre-fill name if known
  if (currentUser.name) document.getElementById('exam-student-name').value = currentUser.name;
  openModal('exam-attempt-modal');
}

function startExamAttempt() {
  const name = document.getElementById('exam-student-name').value.trim();
  const rollNo = document.getElementById('exam-roll-no').value.trim();
  const section = document.getElementById('exam-section').value.trim();
  const school = document.getElementById('exam-school-name').value.trim();
  if (!name || !rollNo || !section) return showToast('Please fill Name, Roll No and Section', 'error');
  examStudentInfo = { name, rollNo, section, school };

  // Build questions
  const qs = currentExam.questions || [];
  document.getElementById('exam-progress-label').textContent = qs.length ? `${qs.length} Questions` : 'Question Paper';
  const fileBlock = currentExam.paperFile ? `
    <div style="background:rgba(79,195,247,0.06);border:1px solid rgba(79,195,247,0.25);border-radius:10px;padding:1rem;margin-bottom:1rem;text-align:center;">
      <div style="font-size:0.85rem;color:rgba(255,255,255,0.6);margin-bottom:0.6rem;">📎 Question paper attached — open it to read/answer the questions${qs.length ? ' (also answer the MCQs below)' : ''}.</div>
      <a href="${currentExam.paperFile.dataUrl}" download="${currentExam.paperFile.name}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#4fc3f7,#0288d1);color:#070b1a;border-radius:8px;padding:8px 18px;font-weight:700;font-size:0.82rem;text-decoration:none;">📄 Open ${currentExam.paperFile.name}</a>
    </div>` : '';
  document.getElementById('exam-questions-container').innerHTML = fileBlock + (qs.length ? qs.map((q, i) => `
    <div class="question-card">
      <div class="q-text"><strong style="color:#4fc3f7;">Q${i+1}.</strong> ${q.text}</div>
      <div class="q-options">
        ${q.options.map((opt, j) => `
          <label class="q-option" onclick="selectOption(${i}, ${j}, this)">
            <input type="radio" name="q${i}" value="${j}" style="display:none;">
            <span style="width:22px;height:22px;border-radius:50%;border:2px solid rgba(79,195,247,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.7rem;font-weight:700;color:#4fc3f7;">${String.fromCharCode(65+j)}</span>
            ${opt}
          </label>`).join('')}
      </div>
    </div>`).join('') : '<div style="text-align:center;color:rgba(255,255,255,0.4);font-size:0.85rem;padding:1rem 0;">Once you have answered the paper, click Submit below to mark it complete.</div>');

  document.getElementById('exam-details-step').style.display = 'none';
  document.getElementById('exam-questions-step').style.display = '';

  // Timer
  let seconds = (currentExam.duration || 30) * 60;
  clearInterval(examTimerInterval);
  examTimerInterval = setInterval(() => {
    seconds--;
    const m = Math.floor(seconds / 60).toString().padStart(2,'0');
    const s = (seconds % 60).toString().padStart(2,'0');
    document.getElementById('exam-timer').textContent = `⏱ ${m}:${s}`;
    if (seconds <= 0) { clearInterval(examTimerInterval); submitExam(); }
  }, 1000);
}

function selectOption(qIdx, optIdx, el) {
  examAnswers[qIdx] = optIdx;
  // Highlight selected
  el.closest('.q-options').querySelectorAll('.q-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}

async function submitExam() {
  clearInterval(examTimerInterval);
  const qs = currentExam.questions || [];
  // Send the raw selected-option indices — the server (not this browser) does the
  // actual grading against its own answer key, so a student can't inflate their score
  // by editing anything in this browser.
  const answersArray = qs.map((_, i) => (examAnswers[i] !== undefined ? examAnswers[i] : null));

  try {
    await api('/api/exam-attempts', {
      method: 'POST',
      body: JSON.stringify({
        examId: currentExam.id, studentName: examStudentInfo.name, rollNo: examStudentInfo.rollNo,
        section: examStudentInfo.section, school: examStudentInfo.school, answers: answersArray
      })
    });

    // Scores/results are not shown to students or teachers — only Admin can view them.
    document.getElementById('exam-questions-step').style.display = 'none';
    document.getElementById('exam-result-step').style.display = '';
    document.getElementById('exam-result-score').textContent = 'Paper Submitted ✅';
    document.getElementById('exam-result-msg').textContent = 'Your answers have been recorded. Your teacher/school will share results with you separately.';
    document.getElementById('exam-result-breakdown').innerHTML = '';

    showToast('Exam submitted successfully!', 'success');
    renderExamPage();
  } catch (e) { showToast(e.message || 'Could not submit exam', 'error'); }
}

// ---- Upload Exam (Teacher/Admin) ----
function handleExamFileSelect(event) {
  const file = event.target.files[0];
  const note = document.getElementById('ue-file-note');
  if (!file) { examFileData = null; note.textContent = ''; return; }
  if (file.size > 5 * 1024 * 1024) {
    showToast('File too large — max 5MB', 'error');
    event.target.value = '';
    examFileData = null;
    note.textContent = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    examFileData = { name: file.name, type: file.type, dataUrl: reader.result, rawFile: file };
    note.textContent = '✅ ' + file.name + ' ready to upload';
    note.style.color = '#4fc3f7';
  };
  reader.onerror = () => {
    showToast('Could not read file', 'error');
    examFileData = null;
  };
  reader.readAsDataURL(file);
}

function openUploadExam() {
  if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) return showToast('Access denied', 'error');
  questionCount = 0;
  document.getElementById('questions-builder').innerHTML = '';
  document.getElementById('ue-date').value = today();
  addQuestion(); addQuestion(); addQuestion();
  examFileData = null;
  document.getElementById('ue-file').value = '';
  document.getElementById('ue-file-note').textContent = '';

  // Teachers can only publish exams for their own registered school, so one school's
  // exam papers never become visible or attemptable by students of another school.
  const schoolInput = document.getElementById('ue-school');
  const schoolNote = document.getElementById('ue-school-note');
  if (currentUser.role === 'admin') {
    schoolInput.value = '';
    schoolInput.disabled = false;
    schoolInput.style.opacity = '1';
    schoolNote.textContent = '';
  } else {
    schoolInput.value = currentUser.schoolName || '';
    schoolInput.disabled = true;
    schoolInput.style.opacity = '0.6';
    schoolNote.textContent = currentUser.schoolName
      ? '🔒 Locked to your school — only ' + currentUser.schoolName + ' students will see this exam.'
      : '⚠️ No school set on your account — please update your profile with your school name.';
  }

  // Only Admin is allowed to set/change the exam timer. Teachers get a locked default
  // and must ask the Admin to adjust it (Admin can do this anytime from the Exam
  // Management tab via the "⏱ Timer" button).
  const durationInput = document.getElementById('ue-duration');
  const durationNote = document.getElementById('ue-duration-note');
  if (currentUser.role === 'admin') {
    durationInput.disabled = false;
    durationInput.style.opacity = '1';
    durationNote.textContent = '';
  } else {
    durationInput.value = 30;
    durationInput.disabled = true;
    durationInput.style.opacity = '0.6';
    durationNote.textContent = '🔒 Only Admin can set the exam timer. Default 30 mins applied — ask Admin to change it.';
  }

  openModal('upload-exam-modal');
}

function addQuestion() {
  questionCount++;
  const qb = document.getElementById('questions-builder');
  const div = document.createElement('div');
  div.id = 'qb-' + questionCount;
  div.style.cssText = 'background:rgba(7,11,26,0.8);border:1px solid rgba(79,195,247,0.12);border-radius:10px;padding:1rem;margin-bottom:0.75rem;';
  div.innerHTML = `
    <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
      <span style="font-size:0.8rem;font-weight:600;color:#4fc3f7;">Question ${questionCount}</span>
      <button onclick="document.getElementById('qb-${questionCount}').remove()" style="background:none;border:none;color:#ff6b6b;cursor:pointer;font-size:0.75rem;">✕ Remove</button>
    </div>
    <input type="text" placeholder="Enter question text" id="qt-${questionCount}" style="margin-bottom:8px;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
      <input type="text" placeholder="Option A" id="qo-${questionCount}-0">
      <input type="text" placeholder="Option B" id="qo-${questionCount}-1">
      <input type="text" placeholder="Option C" id="qo-${questionCount}-2">
      <input type="text" placeholder="Option D" id="qo-${questionCount}-3">
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <label style="font-size:0.78rem;color:rgba(255,255,255,0.5);">Correct answer:</label>
      <select id="qc-${questionCount}" style="width:auto;padding:6px 10px;font-size:0.8rem;">
        <option value="0">A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option>
      </select>
    </div>`;
  qb.appendChild(div);
}

async function uploadExam() {
  const title = document.getElementById('ue-title').value.trim();
  const type = document.getElementById('ue-type').value;
  // Only Admin may set the exam timer/duration. Any other role is locked to the 30 min default,
  // regardless of what value ends up in the input field.
  const duration = (currentUser && currentUser.role === 'admin') ? (+document.getElementById('ue-duration').value || 30) : 30;
  const targetClass = document.getElementById('ue-class').value.trim();
  const date = document.getElementById('ue-date').value;
  // Teachers are locked to their own school regardless of any client-side tampering;
  // only Admin may publish an exam for another school or leave it blank (all schools).
  const school = (currentUser && currentUser.role === 'admin')
    ? document.getElementById('ue-school').value.trim()
    : (currentUser.schoolName || '');
  if (!title) return showToast('Please enter exam title', 'error');

  // Collect questions
  const questions = [];
  document.querySelectorAll('[id^="qt-"]').forEach(el => {
    const n = el.id.split('-')[1];
    const text = el.value.trim();
    if (!text) return;
    const options = [0,1,2,3].map(i => (document.getElementById(`qo-${n}-${i}`)?.value.trim() || ''));
    const correct = +document.getElementById(`qc-${n}`)?.value;
    if (options.filter(o=>o).length < 2) return;
    questions.push({ question: text, options, correct });
  });

  if (questions.length < 1 && !examFileData) return showToast('Please add at least 1 question or upload a question paper file', 'error');

  const examCode = document.getElementById('ue-code').value.trim().toUpperCase() || ('EXAM-' + Math.random().toString(36).slice(2,6).toUpperCase());
  const examPassword = document.getElementById('ue-password').value.trim() || 'scicomm@' + Math.floor(1000+Math.random()*9000);
  const studentLoginEmail = getStudentLoginEmail();

  try {
    let paperFile = null;
    if (examFileData && examFileData.rawFile) {
      const uploaded = await apiUpload('/api/uploads/exam-paper', examFileData.rawFile);
      paperFile = { name: uploaded.name, dataUrl: API_BASE + uploaded.url };
    }
    await api('/api/exams', {
      method: 'POST',
      body: JSON.stringify({ title, type, duration, targetClass, date, school, questions, examCode, examPassword, paperFile })
    });
    await api('/api/settings', { method: 'PATCH', body: JSON.stringify({ studentPassword: examPassword }) });
    await loadExams();
    examFileData = null;
    closeModal('upload-exam-modal');
    showToast('Exam uploaded! Student login → Email: ' + studentLoginEmail + ' · Password: ' + examPassword, 'success');
    renderExamPage();
  } catch (e) { showToast(e.message || 'Could not upload exam', 'error'); }
}

function canManageExam(exam) {
  if (!currentUser || !exam) return false;
  return currentUser.role === 'admin' || (currentUser.role === 'teacher' && exam.uploadedBy === currentUser.name);
}

async function toggleExamStatus(examId) {
  const db = getDB();
  const exam = (db.exams || []).find(e => e.id === examId);
  if (!exam) return;
  if (!canManageExam(exam)) return showToast('You can only manage exams you uploaded', 'error');
  const newStatus = exam.status === 'open' ? 'closed' : 'open';
  try {
    await api('/api/exams/' + examId, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
    await loadExams();
    renderExamPage();
  } catch (e) { showToast(e.message || 'Could not update exam', 'error'); }
}

async function deleteExam(examId) {
  const db = getDB();
  const exam = (db.exams || []).find(e => e.id === examId);
  if (!exam) return;
  if (!canManageExam(exam)) return showToast('You can only manage exams you uploaded', 'error');
  try {
    await api('/api/exams/' + examId, { method: 'DELETE' });
    await loadExams();
    showToast('Exam deleted');
    renderExamPage();
  } catch (e) { showToast(e.message || 'Could not delete exam', 'error'); }
}


// ===================== MOBILE NAV =====================
function toggleMobileNav() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const btn = document.getElementById('hamburger-btn');
  drawer.classList.toggle('open');
  btn.classList.toggle('open');
  // Update user section in drawer
  const userEl = document.getElementById('mobile-nav-user');
  if (currentUser) {
    userEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;background:rgba(79,195,247,0.06);border-radius:10px;margin-bottom:8px;">
        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#4fc3f7,#0288d1);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;color:#070b1a;flex-shrink:0;">${initials(currentUser.name)}</div>
        <div><div style="font-size:0.9rem;font-weight:600;color:#fff;">${currentUser.name}</div><div style="font-size:0.75rem;color:rgba(255,255,255,0.4);">${currentUser.role}</div></div>
      </div>
      ${currentUser.role === 'principal' ? '<button class="nav-btn" onclick="mobileNav(\'principal\')">🏛️ My Dashboard</button>' : ''}
      ${currentUser.role === 'admin' ? '<button class="nav-btn" onclick="mobileNav(\'admin\')">⚙️ Admin Panel</button>' : ''}
      <button class="nav-btn" onclick="mobileNav('profile')">👤 My Profile</button>
      <button class="nav-btn" onclick="logout();toggleMobileNav();" style="color:#ff6b6b;">Sign Out</button>
      <div class="mobile-nav-divider"></div>`;
  } else {
    userEl.innerHTML = `<button class="nav-btn" onclick="mobileNav('auth')" style="color:#4fc3f7;">Sign In / Sign Up</button><div class="mobile-nav-divider"></div>`;
  }
}

function mobileNav(page) {
  showPage(page);
  const drawer = document.getElementById('mobile-nav-drawer');
  const btn = document.getElementById('hamburger-btn');
  drawer.classList.remove('open');
  btn.classList.remove('open');
}

// Close drawer on outside click
document.addEventListener('click', function(e) {
  const drawer = document.getElementById('mobile-nav-drawer');
  const btn = document.getElementById('hamburger-btn');
  if (drawer.classList.contains('open') && !drawer.contains(e.target) && !btn.contains(e.target)) {
    drawer.classList.remove('open');
    btn.classList.remove('open');
  }
});


// ---- Admin: Edit Exam Timer ----
async function editExamTimer(examId) {
  if (!currentUser || currentUser.role !== 'admin') return showToast('Only Admin can set the exam timer', 'error');
  const db = getDB();
  const exam = (db.exams||[]).find(e => e.id === examId);
  if (!exam) return;
  const newDur = prompt(`Set new duration (minutes) for "${exam.title}":`, exam.duration);
  if (!newDur || isNaN(newDur)) return;
  try {
    await api('/api/exams/' + examId, { method: 'PATCH', body: JSON.stringify({ duration: +newDur }) });
    await loadExams();
    showToast('Timer updated to ' + newDur + ' minutes ✅', 'success');
    renderAdmin();
  } catch (e) { showToast(e.message || 'Could not update timer', 'error'); }
}

// ---- Admin: Export Results to Excel ----

// Builds the rows for a "detailed" per-exam sheet: base student/date columns
// followed by one column per question (header = the question text) whose
// cells hold the answer that student actually selected. Different attempts
// for the same exam can carry slightly different question sets (e.g. the
// S.A.S questionnaire is filtered per school/class), so the column list is
// the union of every question seen across the attempts, in first-seen order.
// Turns the raw selected-option indices the server stored (e.g. [1, 3, 0]) back into
// readable {question, selected, correctAnswer} entries, using the matching exam's
// question list — which only Admin/teacher can see in full (with correct answers).
function enrichAttemptAnswers(attempt, exam) {
  if (!exam || !Array.isArray(attempt.answers)) return [];
  const qs = exam.questions || [];
  return qs.map((q, i) => {
    const selIdx = attempt.answers[i];
    const selected = (selIdx !== undefined && selIdx !== null && q.options && q.options[selIdx] !== undefined)
      ? q.options[selIdx] : 'Not answered';
    const correctAnswer = (q.options && q.options[q.correct] !== undefined) ? q.options[q.correct] : '';
    return { question: q.text, selected, correctAnswer };
  });
}

function buildDetailedResultSheet(attemptsList) {
  const qTexts = [];
  const qSeen = new Set();
  attemptsList.forEach(a => {
    (a.answers || []).forEach(ans => {
      if (!qSeen.has(ans.question)) { qSeen.add(ans.question); qTexts.push(ans.question); }
    });
  });

  const header = ['#','Student Name','Roll No','Class','School','Date', ...qTexts];
  const rows = [header];
  attemptsList.forEach((a, i) => {
    const answerMap = {};
    (a.answers || []).forEach(ans => { answerMap[ans.question] = ans.selected; });
    const row = [i+1, a.studentName||'', a.rollNo||'', a.section||'', a.school||'', a.date];
    qTexts.forEach(qt => row.push(answerMap[qt] !== undefined ? answerMap[qt] : (a.answers ? '' : 'N/A (attempted before this update)')));
    rows.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  const baseCols = [{wch:4},{wch:20},{wch:12},{wch:10},{wch:20},{wch:12}];
  const qCols = qTexts.map(() => ({wch:38}));
  ws['!cols'] = baseCols.concat(qCols);
  return ws;
}

function exportResultsToExcel() {
  const db = getDB();
  const exams = db.exams || [];
  // Reconstruct each attempt's readable answer breakdown from the raw indices
  // the server stored, using that attempt's exam question list.
  const attempts = (db.examAttempts || []).map(a => ({
    ...a, answers: enrichAttemptAnswers(a, exams.find(e => e.id === a.examId))
  }));
  if (!attempts.length) return showToast('No results to export yet', 'error');

  // Group by exam for separate sheets
  const wb = XLSX.utils.book_new();

  // Sheet 1: All results (quick overview, one row per attempt)
  const allData = [['#','Student Name','Roll No','Class','School','Exam Title','Exam Type','Score','Total','Percentage','Date','See Sheet']];
  attempts.forEach((a,i) => {
    const exam = exams.find(e=>e.id===a.examId);
    const examTitle = exam ? exam.title : (a.examTitle || 'Unknown');
    allData.push([
      i+1, a.studentName||'', a.rollNo||'', a.section||'', a.school||'',
      examTitle, exam?exam.type:'',
      a.score, a.total, a.pct+'%', a.date, examTitle
    ]);
  });
  const ws1 = XLSX.utils.aoa_to_sheet(allData);
  ws1['!cols'] = [{wch:4},{wch:20},{wch:12},{wch:10},{wch:20},{wch:30},{wch:15},{wch:8},{wch:8},{wch:12},{wch:12},{wch:30}];
  XLSX.utils.book_append_sheet(wb, ws1, 'All Results');

  // Sheet per exam — full question paper + each student's answers
  exams.forEach(ex => {
    const examAttempts = attempts.filter(a => a.examId === ex.id);
    if (!examAttempts.length) return;
    const ws = buildDetailedResultSheet(examAttempts);
    const sheetName = ex.title.slice(0,28).replace(/[:\/?*\[\]]/g,'');
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  // Sheet for Scientific Attitude Study (S.A.S) attempts (these aren't tied to a db.exams entry)
  const scienceAttempts = attempts.filter(a => a.examId === 'science-attitude');
  if (scienceAttempts.length) {
    const ws = buildDetailedResultSheet(scienceAttempts);
    XLSX.utils.book_append_sheet(wb, ws, 'Science Attitude');
  }

  XLSX.writeFile(wb, 'SCICOMM_Exam_Results_' + today() + '.xlsx');
  showToast('Excel file downloaded! 📥', 'success');
}

// ---- Hide exam upload button from non-admin/teacher on exam page ----
const _origRenderExamPage = window.renderExamPage;

</script>

<script>
(function () {
  var hcSlides, hcDotsEls, hcTotal, hcTimer, hcHovering = false;
  window.hcCurrent = 0;
  var HC_AUTOPLAY_MS = 5000;

  function hcInit() {
    var wrap = document.getElementById('hcWrap');
    if (!wrap || wrap.dataset.hcInit) return;
    wrap.dataset.hcInit = '1';

    hcSlides = wrap.querySelectorAll('.hc-slide');
    hcTotal = hcSlides.length;

    var dotsWrap = document.getElementById('hcDots');
    dotsWrap.innerHTML = '';
    hcSlides.forEach(function (s, i) {
      var dot = document.createElement('div');
      dot.className = 'hc-dot' + (i === 0 ? ' active' : '');
      dot.innerHTML = '<span class="fill"></span>';
      dot.addEventListener('click', function () { hcGo(i, true); });
      dotsWrap.appendChild(dot);
    });
    hcDotsEls = dotsWrap.querySelectorAll('.hc-dot');

    hcStart();

    // Use real cursor movement (mousemove) rather than mouseenter to detect hover.
    // mouseenter can fire without any physical mouse movement when the DOM changes
    // under a stationary cursor (e.g. the intro overlay being removed right on top
    // of the carousel) — that spurious "enter" would pause autoplay forever since
    // no matching mouseleave ever follows. mousemove only ever fires from an actual
    // pointer movement, so it can't be triggered that way.
    wrap.addEventListener('mousemove', function () {
      if (!hcHovering) { hcHovering = true; clearInterval(hcTimer); }
    });
    wrap.addEventListener('mouseleave', function () {
      hcHovering = false;
      hcStart();
    });

    var touchStartX = 0;
    wrap.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx > 0 ? hcGo(hcCurrent - 1, true) : hcGo(hcCurrent + 1, true); }
    }, { passive: true });

    var bubbleField = document.getElementById('hcBubbles');
    for (var i = 0; i < 16; i++) {
      var b = document.createElement('div');
      b.className = 'hc-bubble';
      var size = 10 + Math.random() * 46;
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = Math.random() * 100 + '%';
      b.style.top = Math.random() * 100 + '%';
      b.style.animationDuration = (6 + Math.random() * 8) + 's';
      b.style.animationDelay = (Math.random() * 5) + 's';
      bubbleField.appendChild(b);
    }
  }

  window.hcGo = function (index, userAction) {
    if (!hcSlides) return;
    hcCurrent = ((index % hcTotal) + hcTotal) % hcTotal;
    hcSlides.forEach(function (s, i) { s.classList.toggle('active', i === hcCurrent); });
    hcDotsEls.forEach(function (d, i) { d.classList.toggle('active', i === hcCurrent); });
    if (userAction) hcRestart();
  };

  function hcNext() { hcGo(hcCurrent + 1); }
  function hcStart() {
    clearInterval(hcTimer); // always clear first so repeated calls can never stack multiple timers
    if (hcHovering) return; // don't resume autoplay while the pointer is still resting on the carousel
    hcTimer = setInterval(hcNext, HC_AUTOPLAY_MS);
  }
  function hcRestart() { hcStart(); }

  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('page-home') || !document.getElementById('page-home').classList.contains('active')) return;
    if (e.key === 'ArrowRight') hcGo(hcCurrent + 1, true);
    if (e.key === 'ArrowLeft') hcGo(hcCurrent - 1, true);
  });

  // init on load, and re-init if the home page is shown again later
  document.addEventListener('DOMContentLoaded', hcInit);
  if (document.readyState !== 'loading') hcInit();
})();
</script>
<script>
(function () {
  var overlay = document.getElementById('intro-loader');
  if (!overlay) return;

  // Reuse the exact logo already embedded in the nav — no duplicate asset needed.
  var brandLogo = document.getElementById('brand-logo-img');
  var introLogo = document.getElementById('intro-logo-img');
  if (brandLogo && introLogo) {
    introLogo.src = brandLogo.src;
    introLogo.alt = brandLogo.alt || 'SCICOMM';
  }

  var TOTAL_MS = 2000; // total intro duration, matches the CSS timeline

  function finishIntro() {
    document.documentElement.classList.remove('intro-lock');
    overlay.classList.add('intro-done');
    // Fully remove from DOM after it's hidden so it can't intercept clicks/taps.
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 50);
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishIntro();
  } else {
    setTimeout(finishIntro, TOTAL_MS);
  }
})();
</script>
</body>
</html>
