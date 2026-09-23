/* EC attractions sections — lazy extracted 2026-09-23 */
(function(){function ECSection_attractions({section,T,onBack,go,lang}){return React.createElement(React.Fragment,null,
section === 'atracciones' && (React.createElement("section", { className: "py-12 bg-[#071313] text-white min-h-screen" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                    React.createElement("button", { onClick: () => go('que_hacer'), className: "mb-8 text-white/75 hover:text-amber-300 font-black text-xs uppercase" }, "← Volver a Qué hacer"),
                    React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-10" },
                        React.createElement("span", { className: "text-amber-300 font-bold text-xs uppercase tracking-widest block mb-2" }, "Qué hacer en Río"),
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4" }, "Atracciones de Río de Janeiro"),
                        React.createElement("p", { className: "text-white/65 text-base sm:text-lg" }, "Museos, iglesias, fortalezas, teatros y espacios culturales. Entra por imagen y descubre cada lugar con toda su información.")),
                    React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                      ['centros_culturales','Centros culturales','Arte, exposiciones, música, cine y patrimonio.',(CENTROS_CULTURALES_DATA[0]||{}).miniatura || (CENTROS_CULTURALES_DATA[0]||{}).fotoPrincipal,'🎭'],
                      ['museos','Museos','Historia, ciencia, arte, aviación y patrimonio naval.',(MUSEOS_DATA[0]||{}).miniatura || (MUSEOS_DATA[0]||{}).fotoPrincipal,'🏛️'],
                      ['iglesias','Iglesias','Templos históricos y arquitectura religiosa carioca.',(IGLESIAS_DATA[0]||{}).miniatura || (IGLESIAS_DATA[0]||{}).fotoPrincipal,'⛪'],
                      ['fuertes_fortalezas','Fuertes y fortalezas','Construcciones militares, historia y vistas de Río.',(FUERTES_DATA[0]||{}).miniatura || (FUERTES_DATA[0]||{}).fotoPrincipal,'🏰'],
                      ['teatros','Teatros','Grandes escenarios, conciertos y salas históricas.',(TEATROS_DATA[0]||{}).miniatura || (TEATROS_DATA[0]||{}).fotoPrincipal,'🎭'],
                      ['espacios_literarios','Espacios literarios','Bibliotecas, escritores y patrimonio literario.',(ESPACIOS_LITERARIOS_DATA[0]||{}).miniatura || (ESPACIOS_LITERARIOS_DATA[0]||{}).fotoPrincipal,'📚']
                    ].map(a=>React.createElement("button",{key:a[0],onClick:()=>{ if(a[0]==='espacios_literarios'){setDetalleRuta(null);seoNavigate('/espacios-literarios');setHistorialSecciones(prev=>[...prev,seccionActual].slice(-50));setSeccionActualBase('espacios_literarios');}else go(a[0]);},className:"group text-left bg-[#102424] rounded-[1.7rem] overflow-hidden border border-white/10  hover:border-amber-300/60 transition-all"},
                      React.createElement("div",{className:"aspect-[4/3] overflow-hidden bg-slate-900"},a[3]?React.createElement("img",{src:a[3],alt:a[1],loading:"lazy",className:"w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"}):React.createElement("div",{className:"w-full h-full flex items-center justify-center text-6xl"},a[4])),
                      React.createElement("div",{className:"p-5"},React.createElement("span",{className:"text-2xl"},a[4]),React.createElement("h2",{className:"text-xl font-black text-white uppercase mt-2"},a[1]),React.createElement("p",{className:"text-sm text-white/60 mt-2"},a[2]),React.createElement("span",{className:"inline-flex mt-4 text-xs font-black text-amber-300"},"VER TODO →")))))))),
)}window.ECSection_attractions=ECSection_attractions;})();
