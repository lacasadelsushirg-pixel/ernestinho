from pathlib import Path
import re

p = Path('index.html')
s = p.read_text(encoding='utf-8')

# The application already has a real Río mes a mes destination wired to the
# existing month planner. A previous preview patch added a second nav item;
# remove only that duplicate and preserve the site's native navigation/renderer.
planner = 'Master3MonthWeatherPlanner'
if f'function {planner}' not in s:
    raise SystemExit(f'{planner} component missing')

s = re.sub(
    r"^[ \t]*\{\s*id\s*:\s*['\"]rio_mes_a_mes['\"]\s*,\s*label\s*:\s*['\"]Mes a mes['\"]\s*,\s*icon\s*:\s*['\"]calendar-days['\"]\s*\},?\s*\n",
    '', s, flags=re.M
)

native_nav = re.findall(
    r"\{\s*id\s*:\s*['\"]rio_mes_a_mes['\"]\s*,\s*label\s*:\s*['\"]Mes a mes['\"]\s*\}",
    s
)
if len(native_nav) != 1:
    raise SystemExit(f'Expected one native Mes a mes nav item, found {len(native_nav)}')

native_render = "{seccionActual === 'rio_mes_a_mes' && <Master3MonthWeatherPlanner />}"
if native_render not in s:
    raise SystemExit('Native Río mes a mes renderer missing')

# Remove any stale switch-route line from an earlier experimental patch if it
# exists. This SPA uses conditional rendering, not a switch route here.
s = re.sub(r"\s*case\s+['\"]rio_mes_a_mes['\"]\s*:\s*return\s*<Rio365(?:\s+go=\{go\})?\s*/>;", '', s)
s = re.sub(r"\s*case\s+['\"]rio_mes_a_mes['\"]\s*:\s*return\s*<Master3MonthWeatherPlanner\s*/>;", '', s)

# Keep the official live parsers wired to same-origin endpoints, regardless of
# whether the older frontend declared null constants or config objects.
s = s.replace("const INEA_ENDPOINT = null;", "const INEA_ENDPOINT = '/api/inea-balneabilidade';")
s = s.replace("const MARINHA_ENDPOINT = null;", "const MARINHA_ENDPOINT = '/api/marinha-ressaca';")
s = re.sub(r"(COPA_INEA_CONFIG\s*=\s*\{[^}]*?endpoint\s*:\s*)null", r"\1'/api/inea-balneabilidade'", s, flags=re.S)
s = re.sub(r"(COPA_MARINHA_CONFIG\s*=\s*\{[^}]*?endpoint\s*:\s*)null", r"\1'/api/marinha-ressaca'", s, flags=re.S)

p.write_text(s, encoding='utf-8')
print('final preview fixes applied', len(s))
