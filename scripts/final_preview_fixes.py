from pathlib import Path
import re

p = Path('index.html')
s = p.read_text(encoding='utf-8')

# Río mes a mes: use the existing month planner already present in the site.
planner = 'Master3MonthWeatherPlanner'
if f'function {planner}' not in s:
    raise SystemExit(f'{planner} component missing')

# Remove only the nav item created by our preview patch, then insert exactly one
# next to the main Guía item. Other internal rio_mes_a_mes references are preserved.
month_nav = "      { id: 'rio_mes_a_mes', label: 'Mes a mes', icon: 'calendar-days' },\n"
s = s.replace(month_nav, '')
nav_anchor = "{ id: 'guia', label: 'Guía'"
pos = s.find(nav_anchor)
if pos < 0:
    raise SystemExit('Main Guía navigation anchor missing')
line_end = s.find('\n', pos)
if line_end < 0:
    raise SystemExit('Main Guía navigation line ending missing')
s = s[:line_end + 1] + month_nav + s[line_end + 1:]

# Remove any preview route produced previously and expose the real existing planner.
s = re.sub(r"\s*case 'rio_mes_a_mes': return <Rio365(?:\s+go=\{go\})?\s*/>;", '', s)
s = re.sub(r"\s*case 'rio_mes_a_mes': return <Master3MonthWeatherPlanner\s*/>;", '', s)
route_anchor = "case 'grandes_eventos':"
if route_anchor not in s:
    raise SystemExit('grandes_eventos route anchor missing')
s = s.replace(route_anchor, "case 'rio_mes_a_mes': return <Master3MonthWeatherPlanner />;\n      " + route_anchor, 1)

# Keep the official live parsers wired to same-origin endpoints, regardless of
# whether the older frontend declared null constants or config objects.
s = s.replace("const INEA_ENDPOINT = null;", "const INEA_ENDPOINT = '/api/inea-balneabilidade';")
s = s.replace("const MARINHA_ENDPOINT = null;", "const MARINHA_ENDPOINT = '/api/marinha-ressaca';")
s = re.sub(r"(COPA_INEA_CONFIG\s*=\s*\{[^}]*?endpoint\s*:\s*)null", r"\1'/api/inea-balneabilidade'", s, flags=re.S)
s = re.sub(r"(COPA_MARINHA_CONFIG\s*=\s*\{[^}]*?endpoint\s*:\s*)null", r"\1'/api/marinha-ressaca'", s, flags=re.S)

p.write_text(s, encoding='utf-8')
print('final preview fixes applied', len(s))
