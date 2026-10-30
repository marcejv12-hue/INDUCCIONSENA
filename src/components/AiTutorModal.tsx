import React, { useState } from 'react';
import { HelpCircle, X, Send, Bot, User, Sparkles, BookOpen } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface Message {
  role: 'tutor' | 'user';
  text: string;
  source?: string;
}

interface AiTutorModalProps {
  onClose: () => void;
}

const FREQUENT_QUESTIONS = [
  '¿Cómo funciona el Comité de Evaluación y Seguimiento según el Acuerdo 009 de 2024?',
  '¿Cuál es la diferencia entre medida formativa y sancionatoria?',
  '¿Cuáles son los pasos para radicar un aplazamiento o reingreso?',
  '¿Qué pasa si falto tres días seguidos sin justificación?',
  '¿Qué plazo tengo para interponer Recurso de Reposición?',
  '¿Se puede usar Inteligencia Artificial en mis evidencias?',
  '¿Cuáles son los requisitos obligatorios para la certificación?',
];

export const AiTutorModal: React.FC<AiTutorModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'tutor',
      text: '¡Hola, aprendiz SENA! Soy tu Orientador Virtual de Inducción. Puedes consultarme cualquier duda sobre el Reglamento del Aprendiz (Actualizaciones vigentes 2026), derechos, deberes, ética digital con IA, plataformas Zajuna/SofiaPlus o trámites institucionales.',
      source: 'Reglamento del Aprendiz SENA (Actualización 2026)'
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const getKnowledgeResponse = (query: string): { text: string; source: string } => {
    const q = query.toLowerCase();

    if (q.includes('comité') || q.includes('comite') || q.includes('descargos') || q.includes('debido proceso')) {
      return {
        text: 'Según el Acuerdo 009 de 2024, el Comité de Evaluación y Seguimiento es el órgano colegiado que analiza faltas graves o gravísimas. Requiere citación formal con mínimo cinco (5) días hábiles de anticipación, traslado de pruebas, audiencia de descargos (donde el aprendiz ejerce su derecho a la defensa), acta de recomendación y resolución del Subdirector de Centro.',
        source: 'Acuerdo 009 de 2024, Capítulo VI - Del Comité y el Debido Proceso'
      };
    }

    if (q.includes('recurso') || q.includes('reposición') || q.includes('reposicion') || q.includes('impugnar')) {
      return {
        text: 'Contra la resolución sancionatoria del Subdirector procede el Recurso de Reposición, el cual debe interponerse dentro de los CINCO (5) DÍAS HÁBILES siguientes a la notificación personal. Mientras se resuelve el recurso, la sanción no queda en firme.',
        source: 'Acuerdo 009 de 2024, Art. Recurso de Reposición'
      };
    }

    if (q.includes('medida formativa') || q.includes('formativas') || q.includes('sancionatoria') || q.includes('sanción') || q.includes('sancion')) {
      return {
        text: 'El Acuerdo 009 de 2024 distingue: 1) Medidas Formativas: Llamado de atención verbal reflexivo y Llamado de atención escrito con Plan de Mejoramiento (máximo 30 días para superar dificultades); 2) Medidas Sancionatorias (impuestas por el Subdirector): Condicionamiento de matrícula (pérdida transitoria de beneficios) y Cancelación de matrícula (con inhabilidad de 6 meses a 2 años).',
        source: 'Acuerdo 009 de 2024, Régimen Disciplinario'
      };
    }

    if (q.includes('reingreso') || q.includes('reincorpor') || q.includes('volver')) {
      return {
        text: 'Para el Reingreso tras un aplazamiento autorizado, debes radicar la solicitud formal ante Coordinación Académica con al menos quince (15) días hábiles de anticipación antes de vencer el aplazamiento. Se verificará disponibilidad de cupo en la ficha correspondiente y la vigencia del diseño curricular.',
        source: 'Acuerdo 009 de 2024, Capítulo IV - Novedades de Matrícula'
      };
    }

    if (q.includes('certificación') || q.includes('certificacion') || q.includes('grado') || q.includes('paz y salvo')) {
      return {
        text: 'Para certificarte necesitas: 1) 100% de los resultados de aprendizaje de la etapa lectiva y de la etapa productiva en estado APROBADO en SofiaPlus; 2) Paz y salvo integral (biblioteca, bienestar, almacén y coordinación); 3) Pruebas de Estado Saber TyT presentadas (para nivel Tecnólogo); y 4) Documento de identidad vigente registrado.',
        source: 'Acuerdo 009 de 2024, Capítulo V - De la Certificación'
      };
    }

    if (q.includes('inteligencia artificial') || q.includes('ia') || q.includes('chatgpt') || q.includes('plagio')) {
      return {
        text: 'Bajo la Actualización 2026 del Reglamento, el uso de Inteligencia Artificial está permitido como herramienta formativa y de apoyo en Zajuna, siempre que se declare de manera transparente y se cite adecuadamente. Copiar y pegar contenido generado por IA haciéndolo pasar como propio sin autoría personal constituye falta gravísima por fraude y vulneración a la integridad académica.',
        source: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Integridad y Ética Digital'
      };
    }

    if (q.includes('mediación') || q.includes('conciliación') || q.includes('acuerdos')) {
      return {
        text: 'La Actualización 2026 incorpora la Mediación Pedagógica Previa y enfoque restaurativo. Ante diferencias o dificultades de convivencia, antes de citar a Comité de Evaluación y Seguimiento, el instructor y vocero lideran un espacio dialógico para acordar compromisos de mejora formativa.',
        source: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Convivencia y Debido Proceso'
      };
    }

    if (q.includes('incapacidad') || q.includes('médic') || q.includes('enfermedad') || q.includes('ausencia')) {
      return {
        text: 'Debes radicar la constancia médica expedida por tu EPS o soporte de fuerza mayor ante la coordinación académica o por los canales digitales institucionales en Zajuna/SofiaPlus dentro de los tres (3) días hábiles siguientes al hecho.',
        source: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Deberes'
      };
    }

    if (q.includes('tres días') || q.includes('deserción') || q.includes('desertar') || q.includes('falto')) {
      return {
        text: 'La inasistencia injustificada durante tres (3) días hábiles consecutivos activa el procedimiento de DESERCIÓN del proceso formativo. Esto conlleva la cancelación de matrícula e inhabilidad de 6 meses en SofiaPlus para inscribirte en nuevos programas del SENA.',
        source: 'Reglamento del Aprendiz (Actualización 2026), Trámites Formativos'
      };
    }

    if (q.includes('mejoramiento') || q.includes('no apruebo') || q.includes('perdí') || q.includes('calificación')) {
      return {
        text: 'Tienes derecho garantizado al Debido Proceso y a concertar con tu instructor un Plan de Mejoramiento Pedagógico. El instructor definirá actividades formativas de refuerzo para que alcances los resultados pendientes antes de cualquier reporte disciplinario.',
        source: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Derechos'
      };
    }

    if (q.includes('etapa productiva') || q.includes('práctica') || q.includes('contrato') || q.includes('comunitaria')) {
      return {
        text: 'La Actualización 2026 amplió las alternativas de Etapa Productiva: 1) Contrato de Aprendizaje (presencial o teletrabajo); 2) Proyectos en Economía Popular y Comunitaria / Campesena; 3) Vínculo laboral; 4) Investigación aplicada con semilleros SENNOVA; 5) Emprendimiento con Fondo Emprender; 6) Pasantías sociales o institucionales; 7) Monitorías técnicas en el SENA.',
        source: 'Reglamento del Aprendiz (Actualización 2026), Modalidades Productivas'
      };
    }

    if (q.includes('aplazamiento') || q.includes('aplazar') || q.includes('congelar')) {
      return {
        text: 'El aplazamiento es un trámite formal en SofiaPlus que te permite suspender temporalmente tu formación hasta por seis (6) meses prorrogables por motivos debidamente justificados (salud, fuerza mayor comprobada o servicio militar) reservando tu cupo.',
        source: 'Reglamento del Aprendiz (Actualización 2026), Trámites Formativos'
      };
    }

    if (q.includes('carné') || q.includes('carnet') || q.includes('uniforme')) {
      return {
        text: 'El porte del carné institucional (físico o mediante la credencial digital autorizada) y uniforme reglamentario es un deber de identidad y bioseguridad. Prestarlo a terceros o alterarlo es una falta grave prohibida por el reglamento.',
        source: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Deberes'
      };
    }

    if (q.includes('escudo') || q.includes('bandera') || q.includes('himno') || q.includes('símbolo')) {
      return {
        text: 'Los símbolos del SENA son: 1) El Escudo oficial con piñón (industria), caduceo (comercio y servicios) y ramas de café (agro); 2) La Bandera blanca con escudo verde (paz y esperanza); 3) El Logosímbolo del aprendiz caminando hacia el porvenir; y 4) El Himno marcial compuesto por Jesús Briceño.',
        source: 'Identidad Institucional SENA'
      };
    }

    return {
      text: 'Recuerda que como aprendiz SENA tienes derecho a una formación integral de calidad y el deber de acatar el Reglamento (Actualizaciones vigentes 2026). Ante cualquier novedad o duda procedimental, apóyate en tu Vocero de Ficha y Coordinador Académico del Centro de Formación.',
      source: 'Reglamento del Aprendiz SENA (Actualización 2026)'
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMessage: Message = { role: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getKnowledgeResponse(query);
      setMessages(prev => [
        ...prev,
        { role: 'tutor', text: response.text, source: response.source }
      ]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[560px] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center text-[#39A900] shrink-0 shadow-xs">
              <SenaLogo className="w-full h-full" fill="#39A900" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight">Orientador Virtual SENA</h3>
              <span className="text-[11px] text-slate-300">Reglamento del Aprendiz e Inducción</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-slate-400 font-semibold whitespace-nowrap">Consultas frecuentes:</span>
          {FREQUENT_QUESTIONS.slice(0, 3).map((fq, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(fq)}
              className="text-[11px] px-2.5 py-1 bg-white border border-slate-200 hover:border-[#39A900] hover:text-[#39A900] text-slate-600 rounded-md whitespace-nowrap transition-colors"
            >
              {fq}
            </button>
          ))}
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'tutor' && (
                <div className="w-6 h-6 rounded-md bg-white border border-slate-200 p-0.5 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <SenaLogo className="w-full h-full" fill="#39A900" />
                </div>
              )}
              <div
                className={`max-w-[82%] p-3 rounded-xl leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60'
                }`}
              >
                <p>{msg.text}</p>
                {msg.source && (
                  <div className="mt-1.5 pt-1.5 border-t border-slate-200/50 text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#39A900]" />
                    <span>Fuente: {msg.source}</span>
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-slate-400 text-xs">
              <div className="w-6 h-6 rounded-md bg-white border border-slate-200 p-0.5 flex items-center justify-center shrink-0">
                <SenaLogo className="w-full h-full" fill="#39A900" />
              </div>
              <span>Orientador consultando el reglamento...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Pregunta sobre derechos, deberes, comités o trámites..."
            className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2 rounded-xl bg-[#39A900] text-white hover:bg-[#2d8500] disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
