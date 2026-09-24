function Master4CopacabanaFood({ go }) {
    const [q, setQ] = useState('');
    const [cat, setCat] = useState('Todos');
    const [posto, setPosto] = useState('Todos');
    const cats = ['Todos', 'Brasileña', 'Buffet', 'Boteco', 'Churrascaria', 'Italiana', 'Japonesa', 'Café', 'Panadería', 'Vegana', 'Mariscos', 'Pizza', 'Açaí', 'Árabe', 'Peruana', 'Hotel', 'Quiosco'];
    const norm = x => (x || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const matchesCat = (r, c) => { if (c === 'Todos')
        return true; const z = norm(r.categoria + ' ' + r.descripcion); const m = { Brasileña: ['brasil', 'mineira', 'nordest'], Buffet: ['buffet', 'self-service', 'quilo'], Boteco: ['boteco', 'bar'], Churrascaria: ['churrasc', 'rodizio', 'parrilla'], Italiana: ['italiana', 'pizza', 'past'], Japonesa: ['japonesa', 'sushi', 'nikkei', 'omakase'], Café: ['cafe', 'confeitaria', 'brunch'], Panadería: ['panader', 'padaria', 'bakery'], Vegana: ['vegan', 'vegetar'], Mariscos: ['marisco', 'pescado', 'ceviche'], Pizza: ['pizza'], Açaí: ['acai', 'jugos'], Árabe: ['arabe', 'liban'], Peruana: ['peru', 'ceviche', 'nikkei'], Hotel: ['hotel', 'rooftop'], Quiosco: ['quiosco'] }; return (m[c] || [norm(c)]).some(k => z.includes(k)); };
    const filtered = COPACABANA_RESTAURANTES_40.filter(r => (cat === 'Todos' || matchesCat(r, cat)) && (posto === 'Todos' || r.posto === posto) && norm(r.nombre + ' ' + r.categoria + ' ' + r.direccion + ' ' + r.descripcion).includes(norm(q)));
    const legacyImg = r => { try {
        const hit = (GASTRONOMIA_DATA || []).find(x => norm(x.nombre || x.name || '').includes(norm(r.nombre).split(' - ')[0]) || norm(r.nombre).includes(norm(x.nombre || x.name || '')));
        return hit && (hit.imagen || hit.image || hit.foto || hit.img) || '';
    }
    catch (e) {
        return '';
    } };
    return React.createElement("div", { className: "min-h-screen bg-[#f7f7f4] pb-24" },
        React.createElement("header", { className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6" },
            React.createElement("button", { onClick: () => go('master4_gastronomia'), className: "text-xs font-black" }, "\u2190 GASTRONOM\u00CDA"),
            React.createElement("div", { className: "mt-5 rounded-[2rem] bg-slate-950 text-white p-7 sm:p-10 overflow-hidden relative" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-300" }, "\uD83C\uDF7D\uFE0F COPACABANA \u00B7 GU\u00CDA ERNESTINHO"),
                React.createElement("h1", { className: "text-4xl sm:text-6xl font-black mt-2 max-w-4xl" }, "Comer en Copacabana"),
                React.createElement("p", { className: "text-sm sm:text-base text-white/70 mt-3 max-w-2xl" }, "Una base enorme para elegir seg\u00FAn tus ganas, presupuesto y zona. Desde un PF de barrio hasta una cena frente al mar."),
                React.createElement("div", { className: "mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black" },
                    COPACABANA_RESTAURANTES_40.length,
                    " lugares cargados en esta versi\u00F3n"))),
        React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6" },
            React.createElement("div", { className: "sticky top-0 z-20 bg-[#f7f7f4]/95 backdrop-blur py-3 -mx-1 px-1" },
                React.createElement("input", { value: q, onChange: e => setQ(e.target.value), placeholder: "Buscar restaurante, comida o calle\u2026", className: "w-full rounded-2xl border bg-white px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500" }),
                React.createElement("div", { className: "flex gap-2 overflow-x-auto mt-3 pb-1", style: { scrollbarWidth: 'none' } }, cats.map(x => React.createElement("button", { key: x, onClick: () => setCat(x), className: `whitespace-nowrap rounded-full px-4 py-2 text-[10px] font-black border ${cat === x ? 'bg-slate-950 text-white border-slate-950' : 'bg-white text-slate-700'}` }, x))),
                React.createElement("div", { className: "flex gap-2 overflow-x-auto mt-2 pb-1", style: { scrollbarWidth: 'none' } }, ['Todos', 'Posto 2', 'Posto 3', 'Posto 4', 'Posto 5', 'Posto 6'].map(x => React.createElement("button", { key: x, onClick: () => setPosto(x), className: `whitespace-nowrap rounded-full px-4 py-2 text-[10px] font-black ${posto === x ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-800'}` }, x)))),
            React.createElement("div", { className: "flex items-center justify-between mt-3 mb-4" },
                React.createElement("p", { className: "text-xs font-bold text-slate-500" },
                    "Mostrando ",
                    filtered.length,
                    " lugares"),
                React.createElement("button", { onClick: () => { setQ(''); setCat('Todos'); setPosto('Todos'); }, className: "text-[10px] font-black" }, "LIMPIAR FILTROS")),
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, filtered.map(r => {
                const img = legacyImg(r);
                return React.createElement("article", { key: r.id, className: "rounded-[1.7rem] bg-white border overflow-hidden " },
                    img ? React.createElement("img", { src: img, alt: r.nombre, className: "w-full aspect-[4/3] object-cover" }) : React.createElement("div", { className: "aspect-[4/3] bg-gradient-to-br from-amber-100 via-orange-50 to-emerald-50 grid place-items-center" },
                        React.createElement("div", { className: "text-center px-6" },
                            React.createElement("div", { className: "text-5xl" }, "\uD83C\uDF7D\uFE0F"),
                            React.createElement("span", { className: "block mt-3 text-[9px] font-black text-slate-500" }, "FOTO PENDIENTE"))),
                    React.createElement("div", { className: "p-5" },
                        React.createElement("div", { className: "flex items-start gap-3" },
                            React.createElement("div", { className: "flex-1" },
                                React.createElement("span", { className: "text-[9px] font-black text-emerald-700 uppercase" }, r.categoria),
                                React.createElement("h2", { className: "text-xl font-black mt-1 leading-tight" }, r.nombre)),
                            React.createElement("span", { className: "rounded-full bg-amber-100 px-3 py-1 text-xs font-black" }, r.precio)),
                        React.createElement("p", { className: "text-xs text-slate-500 mt-2" },
                            "\uD83D\uDCCD ",
                            r.direccion),
                        React.createElement("p", { className: "text-xs font-bold text-slate-600 mt-1" },
                            r.posto !== 'Todos' ? r.posto + ' · ' : '',
                            "Copacabana"),
                        React.createElement("p", { className: "text-sm text-slate-700 mt-3" }, r.descripcion),
                        React.createElement("div", { className: "grid grid-cols-2 gap-2 mt-4" },
                            React.createElement("a", { href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.nombre + ' ' + r.direccion + ' Rio de Janeiro')}`, target: "_blank", rel: "noopener noreferrer", className: "rounded-xl bg-slate-950 text-white text-center px-3 py-3 text-[10px] font-black" }, "\uD83D\uDCCD VER EN MAPA"),
                            React.createElement("button", { onClick: () => { try {
                                    const k = 'ernestinho-mi-rio-v3';
                                    const a = JSON.parse(localStorage.getItem(k) || '[]');
                                    if (!a.some(x => x.id === r.id)) {
                                        a.push({ id: r.id, name: r.nombre, type: 'gastronomia', zone: 'Copacabana' });
                                        localStorage.setItem(k, JSON.stringify(a));
                                    }
                                    alert('Guardado en Mi Río ❤️');
                                }
                                catch (e) { } }, className: "rounded-xl border px-3 py-3 text-[10px] font-black" }, "\u2661 MI R\u00CDO"))));
            })),
            !filtered.length && React.createElement("div", { className: "rounded-[2rem] bg-white border p-10 text-center" },
                React.createElement("div", { className: "text-4xl" }, "\uD83D\uDD0E"),
                React.createElement("h3", { className: "text-xl font-black mt-3" }, "No encontr\u00E9 coincidencias"),
                React.createElement("p", { className: "text-sm text-slate-500 mt-2" }, "Prueba otra categor\u00EDa, Posto o palabra.")),
            React.createElement("div", { className: "mt-8 rounded-[2rem] bg-amber-100 p-6 sm:p-8" },
                React.createElement("span", { className: "text-[10px] font-black text-amber-900" }, "\uD83D\uDC4B NOTA DE ERNESTINHO"),
                React.createElement("h3", { className: "text-2xl font-black mt-2" }, "Una gu\u00EDa grande, pero f\u00E1cil de usar."),
                React.createElement("p", { className: "text-sm text-slate-700 mt-2" }, "Los horarios, precios y operaciones pueden cambiar. Por eso esta secci\u00F3n prioriza descubrir por tipo y zona; antes de salir, confirma el dato operativo del d\u00EDa."))));
}
window.Master4CopacabanaFood=Master4CopacabanaFood;
