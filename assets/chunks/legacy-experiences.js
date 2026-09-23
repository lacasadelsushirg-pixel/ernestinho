/* EC legacy experiences landing — lazy extracted 2026-09-23 */
(function(){function ECLegacyExperiences({T,go,onReserve,onBack,lang}){return React.createElement(React.Fragment,null,
true && (React.createElement("section", { className: "py-12 bg-white" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6" },
                    React.createElement("div", { className: "text-center max-w-4xl mx-auto mb-12" },
                        React.createElement("span", { className: "text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2" }, T("✨ EXPERIENCIAS ERNESTINHO")),
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5" }, "Cuando quieras pasar de descubrir R\u00EDo a vivirlo."),
                        React.createElement("p", { className: "text-slate-600 text-base leading-relaxed" }, "Vive R\u00EDo de la mano de un equipo apasionado por mostrarte lo mejor de la Ciudad Maravillosa. Junto a mi equipo de gu\u00EDas y operadores locales, te ayudamos a transformar el viaje en experiencias que realmente vas a recordar."),
                        React.createElement("p", { className: "text-slate-500 text-sm mt-3" }, "Aqu\u00ED s\u00ED quiero que las fotograf\u00EDas hablen. Las miniaturas que ya trabajamos siguen siendo protagonistas.")),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8" }, EXPERIENCIAS_DATA.map((exp) => (React.createElement("div", { key: exp.id, className: "bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex flex-col sm:flex-row   transition-all" },
                        React.createElement("div", { className: "sm:w-2/5 aspect-[16/10] sm:aspect-auto sm:min-h-[260px] relative" },
                            React.createElement("img", { src: exp.portadaExperiencias || exp.imagen, alt: exp.titulo, className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "sm:w-3/5 p-4 sm:p-6 flex flex-col justify-between" },
                            React.createElement("div", null,
                                React.createElement("div", { className: "flex justify-between items-center mb-2" },
                                    React.createElement("span", { className: "text-xs font-bold text-teal-600 uppercase" }, "\u2605 Tour Guiado"),
                                    React.createElement("span", { className: "text-xs font-black bg-amber-400 px-2.5 py-1 rounded-md text-slate-950" }, exp.precio)),
                                React.createElement("h3", { className: "text-xl font-bold text-slate-900 mb-2" }, exp.titulo),
                                React.createElement("p", { className: "hidden sm:block text-slate-600 text-xs leading-relaxed mb-4" }, exp.descripcion),
                                React.createElement("div", { className: "hidden sm:block text-[11px] text-slate-500 space-y-1 mb-6" },
                                    React.createElement("p", null,
                                        "\u23F1\uFE0F Duraci\u00F3n: ",
                                        exp.duracion),
                                    React.createElement("p", null,
                                        "\uD83D\uDC65 Grupo: ",
                                        exp.grupo),
                                    React.createElement("p", null,
                                        "\uD83D\uDCCD Punto: ",
                                        exp.encuentro))),
                            React.createElement("div", { className: "flex flex-col sm:flex-row gap-2 mt-4" },
                                React.createElement("button", { onClick: () => {
                                        if (exp.id === 'exp-1') {
                                            go('full_day_rio');
                                        }
                                        else if (exp.id === 'exp-2') {
                                            go('buzios');
                                        }
                                        else {
                                            go(`detalle_${exp.id}`);
                                        }
                                    }, className: "w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase py-3 rounded-xl transition-colors " }, "\uD83D\uDC41\uFE0F Ver Experiencia"),
                                React.createElement("button", { onClick: () => onReserve(exp), className: "w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase py-3 rounded-xl transition-colors " }, "\uD83D\uDCC5 Reservar Ahora"))))))),
                    React.createElement("div", { className: "mt-16 mb-8" },
                        React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase tracking-widest" }, "Nuevas actividades"),
                        React.createElement("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 uppercase mt-2" }, "M\u00E1s formas de vivir R\u00EDo")),
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7" }, ACTIVIDADES_NUEVAS.map((actividad) => React.createElement("article", { key: actividad.id, className: "bg-slate-50 rounded-3xl overflow-hidden border border-slate-100  flex flex-col" },
                        React.createElement("div", { className: "h-56" },
                            React.createElement("img", { src: actividad.portadaExperiencias || actividad.miniatura, alt: actividad.titulo, className: "w-full h-full object-cover" })),
                        React.createElement("div", { className: "p-6 flex flex-col flex-1" },
                            React.createElement("span", { className: "text-teal-600 font-black text-xs uppercase" }, actividad.categoria),
                            React.createElement("h3", { className: "text-2xl font-black mt-2" }, actividad.titulo),
                            React.createElement("p", { className: "text-sm text-slate-600 mt-3 flex-1" }, actividad.intro),
                            React.createElement("div", { className: "flex items-center justify-between mt-6" },
                                React.createElement("span", { className: "bg-amber-400 rounded-full px-3 py-1 text-xs font-black" }, actividad.precio),
                                React.createElement("a", { href: `/experiencias/${seoSlug(actividad.titulo)}`, onClick: (ev) => { if (!(ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey)) { ev.preventDefault(); seoNavigate(`/experiencias/${seoSlug(actividad.titulo)}`); go(`actividad_${actividad.id}`); } }, className: "bg-slate-900 text-white rounded-full px-5 py-3 text-xs font-black uppercase" }, "Ver actividad"))))))))),
            seccionActual.startsWith('actividad_') && React.createElement(ActividadNuevaDetalle, { actividad: ACTIVIDADES_NUEVAS.find(a => `actividad_${a.id}` === seccionActual), onVolver: onBack, lang: lang }),
)}window.ECLegacyExperiences=ECLegacyExperiences;})();
