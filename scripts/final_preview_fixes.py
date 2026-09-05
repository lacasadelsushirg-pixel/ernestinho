from pathlib import Path
import re

p = Path('index.html')
s = p.read_text(encoding='utf-8')

# Río mes a mes: use the existing month planner already present in the site.
planner = 'Master3MonthWeatherPlanner'
if f'function {planner}' not in s:
    raise SystemExit(f'{planner} component missing')

# Remove only a main-nav item created by our preview patch. Preserve all other
# internal rio_mes_a_mes content already present in the application.
s = re.sub(
    r"^[ \t]*\{\s*id\s*:\s*['\"]rio_mes_a_mes['\"]\s*,\s*label\s*:\s*['\"]Mes a mes['\"]\s*,\s*icon\s*:\s*['\"]calendar-days['\"]\s*\},?\s*\n",
    '', s, flags=re.M
)
month_nav = "      { id: 'rio_mes_a_mes', label: 'Mes a mes', icon: 'calendar-days' },\n"

# Locate the Guía nav item regardless of whitespace or quote style.
nav_match = re.search(r"^[ \t]*\{[^\n{}]*\bid\s*:\s*['\"]guia['\"][^\n{}]*\}\s*,?\s*$", s, flags=re.M | re.I)
if not nav_match:
    raise SystemExit('Main Guía navigation item missing')
insert_at = nav_match.end()
if insert_at < len(s) and s[insert_at] == '\n':
    insert_at += 1
else:
    month_nav = '\n' + month_nav
s = s[:insert_at] + month_nav + s[insert_at:]

# Remove any preview route produced previously and expose the real existing planner.
s = re.sub(r"\s*case\s+['\"]rio_mes_a_mes['\"]\s*:\s*return\s*<Rio365(?:\s+go=\{go\})?\s*/>;", '', s)
s = re.sub(r"\s*case\s+['\"]rio_mes_a_mes['\"]\s*:\s*return\s*<Master3MonthWeatherPlanner\s*/>;", '', s)
route_match = re.search(r"case\s+['\"]grandes_eventos['\"]\s*:", s)
if not route_match:
    raise SystemExit('grandes_eventos route anchor missing')
s = s[:route_match.start()] + "case 'rio_mes_a_mes': return <Master3MonthWeatherPlanner />;\n      " + s[route_match.start():]

# Keep the official live parsers wired to same-origin endpoints, regardless of
# whether the older frontend declared null constants or config objects.
s = s.replace("const INEA_ENDPOINT = null;", "const INEA_ENDPOINT = '/api/inea-balneabilidade';")
s = s.replace("const MARINHA_ENDPOINT = null;", "const MARINHA_ENDPOINT = '/api/marinha-ressaca';")
s = re.sub(r"(COPA_INEA_CONFIG\s*=\s*\{[^}]*?endpoint\s*:\s*)null", r"\1'/api/inea-balneabilidade'", s, flags=re.S)
s = re.sub(r"(COPA_MARINHA_CONFIG\s*=\s*\{[^}]*?endpoint\s*:\s*)null", r"\1'/api/marinha-ressaca'", s, flags=re.S)

p.write_text(s, encoding='utf-8')
print('final preview fixes applied', len(s))
