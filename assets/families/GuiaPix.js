function GuiaPix({ onVolver }) {
    const pasos = [
        ['1', 'Abre tu aplicación', 'Entra en la cuenta o billetera que permita pagar Pix en Brasil.'],
        ['2', 'Elige Pix', 'Selecciona leer QR, Pix Copia e Cola o ingresar una clave.'],
        ['3', 'Revisa la conversión', 'Si tu app es extranjera, comprueba tipo de cambio, comisión y total en tu moneda.'],
        ['4', 'Confirma al destinatario', 'Lee nombre, institución y valor antes de autorizar.'],
        ['5', 'Guarda el comprobante', 'El pago normalmente se confirma en pocos segundos.']
    ];
    const bloques = [
        ['¿Qué es Pix?', 'Es el sistema brasileño de pagos instantáneos coordinado por el Banco Central. Funciona todos los días, a cualquier hora, y mueve reales entre cuentas participantes en pocos segundos.'],
        ['¿Un turista puede usarlo?', 'Pix es doméstico: para enviarlo directamente necesitas una cuenta habilitada en una institución participante. Algunas aplicaciones extranjeras ofrecen pago de QR Pix mediante acuerdos con socios brasileños: debitan tu moneda, informan su cambio y el socio completa el Pix en reales. La disponibilidad depende de país, aplicación, identificación y condiciones del proveedor.'],
        ['¿Necesito CPF?', 'Para abrir muchas cuentas brasileñas normalmente se solicita CPF y verificación de identidad. Tener CPF por sí solo no garantiza la apertura: cada institución define a quién acepta. Un visitante también puede pagar mediante una aplicación extranjera compatible sin convertirse en titular de una cuenta Pix brasileña.'],
        ['Claves Pix', 'El receptor puede informar CPF/CNPJ, teléfono, correo electrónico o una clave aleatoria. También puede mostrar un QR o código Pix Copia e Cola. Nunca necesitas registrar una clave propia solamente para pagar.'],
        ['¿Es seguro?', 'La infraestructura tiene autenticación y controles de seguridad, pero el usuario debe comprobar los datos mostrados antes de confirmar. Un Pix autorizado no funciona como una compra con tarjeta que pueda cancelarse libremente.'],
        ['Cambio y cotización', 'Pix siempre se liquida en reales. Si pagas desde una aplicación extranjera, mira cuántas unidades de tu moneda serán debitadas, cuántos reales recibirá el comercio, la comisión y el tipo de cambio final. Compara ese total con tarjeta o efectivo.'],
        ['Devoluciones y fraude', 'Para una compra cancelada, pide al receptor que use la función de devolución vinculada a la operación. El MED permite intentar recuperar fondos en casos de fraude, golpe o coerción; no garantiza recuperación y no sustituye una disputa comercial ordinaria. Contacta inmediatamente a tu institución.'],
        ['Pix en la playa y ferias', 'Pide el QR al vendedor, confirma nombre y valor y no entregues el celular desbloqueado. Si escribes el valor manualmente, revísalo antes de confirmar. Evita códigos enviados por desconocidos o pegatinas que parezcan colocadas encima del QR original.']
    ];
    return React.createElement("section", { className: "min-h-screen bg-slate-50 pb-20" },
        React.createElement("div", { className: "bg-gradient-to-br from-teal-950 via-teal-800 to-emerald-500 text-white" },
            React.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-16" },
                React.createElement("button", { onClick: onVolver, className: "font-bold text-sm text-white/80" }, "\u2190 Volver"),
                React.createElement("div", { className: "mt-10 text-6xl" }, "\u25C8"),
                React.createElement("span", { className: "block mt-5 text-emerald-200 text-xs font-black uppercase tracking-[.25em]" }, "Dinero y pagos en Brasil"),
                React.createElement("h1", { className: "text-5xl sm:text-7xl font-black mt-2" }, "GU\u00CDA PIX"),
                React.createElement("p", { className: "mt-5 max-w-2xl text-teal-50 text-lg" }, "C\u00F3mo pagar, qui\u00E9n puede utilizarlo, c\u00F3mo cotizar y qu\u00E9 revisar para hacerlo con seguridad."))),
        React.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-12" },
            React.createElement("div", { className: "bg-amber-50 border-2 border-amber-300 rounded-3xl p-6" },
                React.createElement("h2", { className: "font-black text-amber-950" }, "Lo esencial para un extranjero"),
                React.createElement("p", { className: "text-sm text-amber-900 mt-2" }, "No existe una lista universal de pa\u00EDses que \u201Ctengan Pix\u201D. La posibilidad depende de que tu banco o aplicaci\u00F3n ofrezca una soluci\u00F3n compatible, y puede cambiar. Antes de viajar, consulta dentro de tu propia aplicaci\u00F3n si permite leer QR Pix brasile\u00F1os y muestra la conversi\u00F3n.")),
            React.createElement("div", { className: "grid md:grid-cols-2 gap-5 mt-8" }, bloques.map(([t, p]) => React.createElement("article", { key: t, className: "bg-white border border-slate-100 rounded-3xl p-6 " },
                React.createElement("h2", { className: "text-xl font-black text-slate-900" }, t),
                React.createElement("p", { className: "text-sm text-slate-600 leading-relaxed mt-3" }, p)))),
            React.createElement("h2", { className: "text-3xl font-black mt-14" }, "C\u00F3mo pagar paso a paso"),
            React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6" }, pasos.map(([num, t, p]) => React.createElement("div", { key: num, className: "bg-teal-950 text-white rounded-2xl p-5" },
                React.createElement("span", { className: "w-9 h-9 bg-emerald-400 text-teal-950 rounded-full flex items-center justify-center font-black" }, num),
                React.createElement("h3", { className: "font-black mt-4" }, t),
                React.createElement("p", { className: "text-xs text-teal-100 mt-2 leading-relaxed" }, p)))),
            React.createElement("div", { className: "mt-12 bg-rose-50 border border-rose-200 rounded-3xl p-7" },
                React.createElement("h2", { className: "text-xl font-black text-rose-950" }, "Se\u00F1ales de alerta"),
                React.createElement("ul", { className: "grid sm:grid-cols-2 gap-3 mt-4 text-sm text-rose-900" },
                    React.createElement("li", null, "\u2022 El nombre mostrado no corresponde al comercio."),
                    React.createElement("li", null, "\u2022 Te presionan para confirmar r\u00E1pidamente."),
                    React.createElement("li", null, "\u2022 El valor tiene un cero adicional."),
                    React.createElement("li", null, "\u2022 Te piden devolver un supuesto Pix mediante otra transferencia."),
                    React.createElement("li", null, "\u2022 El QR lleg\u00F3 desde un contacto desconocido."),
                    React.createElement("li", null, "\u2022 Prometen premios o devoluciones para obtener acceso al celular."))),
            React.createElement("div", { className: "mt-10 flex flex-wrap gap-3" },
                React.createElement("a", { href: "https://www.bcb.gov.br/estabilidadefinanceira/pix", target: "_blank", rel: "noopener noreferrer", className: "bg-teal-700 text-white px-5 py-3 rounded-xl text-xs font-black uppercase" }, "Banco Central: Pix"),
                React.createElement("a", { href: "https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca", target: "_blank", rel: "noopener noreferrer", className: "bg-slate-900 text-white px-5 py-3 rounded-xl text-xs font-black uppercase" }, "Seguridad y MED")),
            React.createElement("p", { className: "mt-6 text-xs text-slate-500" }, "Informaci\u00F3n orientativa revisada en septiembre de 2026. Servicios, comisiones y disponibilidad de aplicaciones pueden cambiar.")));
}
window.GuiaPix=GuiaPix;
