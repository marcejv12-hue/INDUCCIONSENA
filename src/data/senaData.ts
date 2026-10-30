import {
  InstitutionalSymbol,
  ValueItem,
  RightDutyItem,
  ScenarioDilemma,
  EvaluationQuestion,
  CohortFicha,
  Apprentice,
  LifecycleStage,
  NovedadMatricula,
  FaltaDisciplinariaAcademica,
  MedidaFormativaDisciplinaria,
  ComiteEtapa,
  ComiteMiembro
} from '../types/sena';

export const SENA_INSTITUTIONAL_SYMBOLS: InstitutionalSymbol[] = [
  {
    id: 'escudo',
    name: 'Escudo del SENA',
    tagline: 'Reflejo de los tres sectores de la economía nacional',
    description: 'El escudo del SENA fue diseñado en los orígenes de la entidad para representar las tres fuerzas económicas sobre las cuales se capacita a la fuerza laboral de Colombia.',
    elements: [
      {
        title: 'Rueda dentada (Piñón)',
        meaning: 'Simboliza la industria, el desarrollo tecnológico, la fuerza mecánica y la innovación de los procesos productivos.'
      },
      {
        title: 'Caduceo de Mercurio',
        meaning: 'Representa el sector del comercio, los servicios, las finanzas y las relaciones comerciales que dinamizan la economía.'
      },
      {
        title: 'Ramas de Café',
        meaning: 'Evocan el sector primario y agropecuario colombiano, raíz fundamental de la producción de alimentos y materias primas del país.'
      }
    ],
    funFact: 'Fue creado a finales de la década de 1950 bajo el liderazgo de Rodolfo Martínez Tono, fundador insigne del SENA.'
  },
  {
    id: 'bandera',
    name: 'Bandera Institucional',
    tagline: 'Símbolo de paz, esperanza y compromiso social',
    description: 'La bandera del SENA ondea en todas las sedes y centros de formación del país. Su diseño sobrio evoca los más altos valores ciudadanos.',
    elements: [
      {
        title: 'Fondo Blanco',
        meaning: 'Simboliza la paz, la transparencia, la tranquilidad y la convivencia pacífica que el SENA promueve en toda Colombia.'
      },
      {
        title: 'Escudo Verde Centrado',
        meaning: 'El verde institucional encarna la esperanza, la juventud, el crecimiento continuo y el florecimiento del talento de los aprendices.'
      }
    ],
    funFact: 'La bandera se iza en actos protocolarios solemnes y en ceremonias de certificación de aprendices.'
  },
  {
    id: 'logosimbolo',
    name: 'Logosímbolo (El Aprendiz)',
    tagline: 'El ser humano en marcha hacia el porvenir',
    description: 'El logosímbolo gráfico moderno del SENA representa la razón de ser de la institución: el aprendiz colombiano como protagonista de su propio destino y progreso.',
    elements: [
      {
        title: 'Figura Humana estilizada',
        meaning: 'Representa al aprendiz en actitud activa, libre y constructiva.'
      },
      {
        title: 'Camino en perspectiva',
        meaning: 'El sendero que se abre hacia el futuro profesional, guiado por la formación profesional integral.'
      },
      {
        title: 'Brazos abiertos',
        meaning: 'La capacidad de abrazar el conocimiento, servir a la comunidad y liderar la transformación de la sociedad.'
      }
    ],
    funFact: 'Representa la evolución gráfica de la institución manteniendo siempre la centralidad en el ser humano integral.'
  },
  {
    id: 'himno',
    name: 'Himno del SENA',
    tagline: 'Canto marcial que exalta el trabajo, la patria y la educación',
    description: 'Compuesto en su letra por Jesús Briceño S. y música de Luis Alfredo Sarmiento, el himno es entonado por generaciones de aprendices en cada centro de formación.',
    elements: [
      {
        title: 'Coro',
        meaning: '"Estudiantes del SENA, adelante / por Colombia luchad con amor / con el ánimo noble y radiante / transformemos el mundo en mejor."'
      },
      {
        title: 'Valores en sus estrofas',
        meaning: 'Exalta el trabajo digno, la superación del ser humano frente al destino, la fraternidad y el servicio a la nación.'
      }
    ],
    funFact: 'Es un himno que invita a superar la resignación y convertir el conocimiento técnico en herramienta de paz.'
  }
];

export const SENA_VALUES: ValueItem[] = [
  {
    id: 'dignidad',
    title: 'Dignidad Humana',
    description: 'Reconocer que cada aprendiz, instructor y colaborador tiene un valor intrínseco innegociable.',
    applicationInSena: 'Trato respetuoso, libre de discriminación por credo, género, raza u origen en todos los talleres y ambientes.'
  },
  {
    id: 'responsabilidad',
    title: 'Libertad con Responsabilidad',
    description: 'Capacidad de tomar decisiones autónomas asumiendo con madurez sus consecuencias formativas.',
    applicationInSena: 'Asistir con puntualidad, cuidar los equipos de los laboratorios y presentar evidencias con honestidad académica.'
  },
  {
    id: 'bien_comun',
    title: 'Prevalencia del Bien Común',
    description: 'El interés general de la comunidad educativa prima sobre los intereses particulares.',
    applicationInSena: 'Cuidado de las zonas comunes, bibliotecas, cafeterías y ambientes de formación compartidos.'
  },
  {
    id: 'solidaridad',
    title: 'Solidaridad y Trabajo en Equipo',
    description: 'Disposición permanente para apoyar a los compañeros y sumar talentos para solucionar desafíos.',
    applicationInSena: 'Apoyo mutuo en proyectos formativos colaborativos y en iniciativas de Bienestar al Aprendiz.'
  },
  {
    id: 'transparencia',
    title: 'Transparencia e Integridad',
    description: 'Actuar con coherencia ética entre lo que se piensa, se dice y se hace.',
    applicationInSena: 'Cero tolerancia con el plagio, la suplantación o la alteración de documentos en SofiaPlus.'
  }
];

export const SENA_RIGHTS_DUTIES: RightDutyItem[] = [
  // DERECHOS
  {
    id: 'der_1',
    type: 'derecho',
    title: 'Recibir formación integral de alta calidad',
    article: 'Reglamento del Aprendiz, Art. 7, Numeral 1',
    description: 'Acceder a una formación acorde con el programa matriculado, con instructores idóneos, metodología por proyectos y tecnologías pertinentes.',
    category: 'academico',
    realWorldExample: 'Tu instructor debe orientar las sesiones con planes de trabajo claros, guías de aprendizaje y acceso a software y herramientas actualizadas.'
  },
  {
    id: 'der_2',
    type: 'derecho',
    title: 'Acceso a infraestructura, talleres y ambientes',
    article: 'Reglamento del Aprendiz, Art. 7, Numeral 2',
    description: 'Hacer uso adecuado de los laboratorios, bibliotecas físicas y virtuales, conectividad a internet, simuladores y maquinaria especializada.',
    category: 'institucional',
    realWorldExample: 'Tener reserva y disponibilidad para usar las máquinas de mecanizado, laboratorios de software o cocinas de gastronomía bajo protocolos de bioseguridad.'
  },
  {
    id: 'der_3',
    type: 'derecho',
    title: 'Debido proceso y ser escuchado',
    article: 'Reglamento del Aprendiz, Art. 7, Numeral 3',
    description: 'Garantía fundamental de ser escuchado, presentar descargos y aportar pruebas antes de que se tome cualquier medida formativa o sancionatoria.',
    category: 'academico',
    realWorldExample: 'Si un instructor reporta un incumplimiento, el aprendiz tiene derecho a ser citado ante el Comité de Evaluación y Seguimiento para exponer sus descargos.'
  },
  {
    id: 'der_4',
    type: 'derecho',
    title: 'Recibir el carné institucional del SENA',
    article: 'Reglamento del Aprendiz, Art. 7, Numeral 6',
    description: 'Ser identificado como aprendiz SENA mediante un documento oficial vigente durante todo el periodo lectivo y productivo.',
    category: 'institucional',
    realWorldExample: 'El carné te permite ingresar a las sedes a nivel nacional, hacer préstamos bibliográficos y acceder a convenios de transporte y culturales.'
  },
  {
    id: 'der_5',
    type: 'derecho',
    title: 'Postularse a estímulos, incentivos y apoyos',
    article: 'Reglamento del Aprendiz, Art. 7, Numeral 8',
    description: 'Participar en convocatorias para apoyos de sostenimiento regular o FIC, monitorías de apoyo técnico, pasantías y reconocimientos por excelencia.',
    category: 'representacion',
    realWorldExample: 'Si obtienes un promedio destacado y demuestras vocación de servicio, puedes postularte a monitor de laboratorio con auxilio económico mensual.'
  },
  {
    id: 'der_6',
    type: 'derecho',
    title: 'Plan de mejoramiento pedagógico y mediación restaurativa',
    article: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Derechos',
    description: 'Recibir retroalimentación oportuna (máximo 8 días hábiles) sobre evaluaciones, concertar planes de mejora y acceder a espacios de diálogo pedagógico restaurativo antes de sanciones.',
    category: 'academico',
    realWorldExample: 'Si no alcanzaste el resultado de aprendizaje, tu instructor acuerda contigo actividades de refuerzo y mediación pedagógica personalizada.'
  },
  {
    id: 'der_7',
    type: 'derecho',
    title: 'Elegir y ser elegido representante de aprendices',
    article: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Representación',
    description: 'Participar democráticamente en las elecciones de voceros de ficha y representantes de centro, con voz activa en los comités de convivencia y formativos.',
    category: 'representacion',
    realWorldExample: 'Votar en las jornadas democráticas anuales y postularte como vocero de tu grupo para canalizar inquietudes académicas y de bienestar.'
  },
  {
    id: 'der_8',
    type: 'derecho',
    title: 'Alfabetización digital y uso asistido de Inteligencia Artificial',
    article: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Entornos Digitales',
    description: 'Acceder a formación en tecnologías emergentes, uso ético de herramientas de IA para potenciar el aprendizaje y soporte técnico continuo en la plataforma Zajuna.',
    category: 'institucional',
    realWorldExample: 'Recibir acompañamiento para utilizar IA generativa como asistente de investigación y estructuración de proyectos formativos sin vulnerar derechos de autor.'
  },

  // DEBERES
  {
    id: 'deb_1',
    type: 'deber',
    title: 'Asistir con puntualidad y cumplir el 100% de actividades en Zajuna',
    article: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Deberes',
    description: 'Cumplir rigurosamente con los horarios en ambientes presenciales y con las evidencias programadas en el ecosistema virtual oficial (Zajuna / SofiaPlus).',
    category: 'academico',
    realWorldExample: 'Llegar puntual a talleres y participar activamente en foros, sesiones sincrónicas y entregas virtuales en los plazos convenidos.',
    consequenceIfBreached: 'Inasistencias injustificadas acumuladas activan la alerta temprana y pueden derivar en plan de mejoramiento o deserción.'
  },
  {
    id: 'deb_2',
    type: 'deber',
    title: 'Portar dignamente el carné institucional (físico o digital) y uniforme',
    article: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Deberes',
    description: 'Portar visiblemente el carné institucional oficial (físico o mediante la credencial digital autorizada) y el uniforme reglamentario con decoro y pulcritud.',
    category: 'institucional',
    realWorldExample: 'Tener el carné visible al ingresar por portería y vestir los EPP requeridos en laboratorios y centros de formación.',
    consequenceIfBreached: 'Restricción preventiva de acceso a talleres técnicos y llamado pedagógico de atención.'
  },
  {
    id: 'deb_3',
    type: 'deber',
    title: 'Justificar inasistencias en máximo 3 días hábiles vía Zajuna/SofiaPlus',
    article: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Deberes',
    description: 'Radicar la constancia médica expedida por EPS o soporte de fuerza mayor a través de los canales digitales institucionales dentro de los 3 días hábiles siguientes.',
    category: 'academico',
    realWorldExample: 'Si tuviste incapacidad médica, radicar el soporte en el módulo de novedades de la plataforma dentro de las 72 horas hábiles.',
    consequenceIfBreached: 'La ausencia queda reportada como injustificada, afectando la continuidad de apoyos de sostenimiento.'
  },
  {
    id: 'deb_4',
    type: 'deber',
    title: 'Cuidar las instalaciones, herramientas y recursos tecnológicos',
    article: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Deberes',
    description: 'Hacer uso responsable de bienes, software, licencias institucionales y maquinaria del SENA, reportando fallas oportunamente.',
    category: 'seguridad',
    realWorldExample: 'Al culminar la práctica, apagar equipos, desconectar periféricos y devolver las herramientas en el inventario del laboratorio.',
    consequenceIfBreached: 'Responsabilidad formativa y administrativa de reposición, además de medida disciplinaria por negligencia.'
  },
  {
    id: 'deb_5',
    type: 'deber',
    title: 'Ciberconvivencia y respeto a toda la comunidad educativa',
    article: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Convivencia y Ética',
    description: 'Mantener un trato respetuoso, incluyente y libre de discriminación o ciberacoso en todos los ambientes presenciales y canales virtuales.',
    category: 'convivencia',
    realWorldExample: 'Expresar ideas con asertividad y cordialidad en foros y grupos de trabajo, sin agresiones verbales ni hostigamiento digital.',
    consequenceIfBreached: 'Falta disciplinaria grave con apertura de proceso restaurativo o citación a Comité de Evaluación y Seguimiento.'
  },
  {
    id: 'deb_6',
    type: 'deber',
    title: 'Acatar normas de Seguridad y Salud en el Trabajo (SST)',
    article: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Deberes',
    description: 'Utilizar obligatoriamente los Elementos de Protección Personal (EPP) y respetar las señalizaciones de emergencia y evacuación.',
    category: 'seguridad',
    realWorldExample: 'No ingresar a un taller de construcción o química sin botas punta de acero, gafas de seguridad y guantes de nitrilo reglamentarios.',
    consequenceIfBreached: 'Expulsión inmediata del ambiente de riesgo por salvaguarda de la vida y sanción disciplinaria.'
  },
  {
    id: 'deb_7',
    type: 'deber',
    title: 'Uso ético, transparente y citado de herramientas de IA',
    article: 'Reglamento del Aprendiz (Actualización 2026), Capítulo Integridad Académica',
    description: 'Garantizar la autoría propia de evidencias, declarando de forma transparente cualquier uso de modelos de Inteligencia Artificial y evitando el plagio generativo.',
    category: 'academico',
    realWorldExample: 'Incluir en el informe técnico la sección de metodologías indicando los prompts utilizados y la validación propia de las respuestas obtenidas.',
    consequenceIfBreached: 'Presentar evidencias generadas al 100% por IA sin análisis propio constituye falta gravísima por vulneración a la integridad académica.'
  },

  // PROHIBICIONES
  {
    id: 'proh_1',
    type: 'prohibicion',
    title: 'Cometer plagio o fraude en evidencias',
    article: 'Reglamento del Aprendiz, Art. 9, Numeral 2',
    description: 'Copiar proyectos, suplantar la identidad de otro aprendiz en plataformas o comercializar evidencias de aprendizaje.',
    category: 'academico',
    realWorldExample: 'Entregar como propio un informe descargado de internet o un software programado por otra persona sin citar la fuente.',
    consequenceIfBreached: 'Falta gravísima que puede acarrear la cancelación definitiva de la matrícula e inhabilidad para matricularse en el SENA.'
  },
  {
    id: 'proh_2',
    type: 'prohibicion',
    title: 'Ingreso o consumo de sustancias psicoactivas o alcohol',
    article: 'Reglamento del Aprendiz, Art. 9, Numeral 5',
    description: 'Ingresar bajo los efectos, consumir o comercializar bebidas embriagantes o sustancias psicoactivas en cualquier sede del SENA.',
    category: 'convivencia',
    realWorldExample: 'Llegar con aliento alcohólico a un taller de mecanizado o portar botellas de licor en el morral.',
    consequenceIfBreached: 'Falta gravísima con apertura de proceso disciplinario sancionatorio inmediato.'
  },
  {
    id: 'proh_3',
    type: 'prohibicion',
    title: 'Prestar, alterar o comercializar el carné del SENA',
    article: 'Reglamento del Aprendiz, Art. 9, Numeral 7',
    description: 'Facilitar el carné personal a terceros para que ingresen a la sede o modificar sus datos para obtener beneficios fraudulentos.',
    category: 'institucional',
    realWorldExample: 'Prestar tu carné a un amigo ajeno al SENA para que entre a las canchas deportivas o use la sala de computo.',
    consequenceIfBreached: 'Sanción disciplinaria grave y retención preventiva del documento.'
  }
];

export const SENA_SCENARIO_DILEMMAS: ScenarioDilemma[] = [
  {
    id: 'dilema_1',
    title: 'Dilema 1: La Ausencia Médica Imprevista',
    context: 'Camilo, aprendiz de la ficha de Biotecnología, sufrió un cuadro viral agudo que le impidió asistir a dos días de prácticas presenciales en el laboratorio. Su EPS le otorgó una incapacidad por 48 horas. Camilo se siente mejor al tercer día y vuelve a clases.',
    question: '¿Cuál es el procedimiento legal exacto que Camilo debe seguir según el Reglamento del Aprendiz?',
    options: [
      {
        id: 'opt_1a',
        text: 'Esperar a final de mes para entregar todas las incapacidades acumuladas directamente al instructor líder.',
        isCorrect: false,
        feedback: 'Incorrecto. El reglamento fija un plazo perentorio de máximo 3 días hábiles siguientes al hecho. Dejarlo para fin de mes invalida la justificación.',
        regulationArticle: 'Art. 8, Numeral 4'
      },
      {
        id: 'opt_1b',
        text: 'Radicar la constancia médica de la EPS ante la coordinación académica o por canal institucional dentro de los 3 días hábiles siguientes a la inasistencia.',
        isCorrect: true,
        feedback: '¡Excelente! El artículo 8 del reglamento estipula que las justificaciones deben presentarse formalmente dentro de los 3 días hábiles posteriores al término de la incapacidad.',
        regulationArticle: 'Art. 8, Numeral 4'
      },
      {
        id: 'opt_1c',
        text: 'Solo avisar por un mensaje informal de WhatsApp a un compañero de clase para que le firme la lista de asistencia.',
        isCorrect: false,
        feedback: 'Incorrecto. La suplantación en listas de asistencia es una falta gravísima que afecta tanto a quien la pide como a quien la comete.',
        regulationArticle: 'Art. 9, Numeral 2'
      }
    ]
  },
  {
    id: 'dilema_2',
    title: 'Dilema 2: Seguridad en el Ambiente de Trabajo',
    context: 'En el taller de Mecatrónica, Luisa y Julián están listos para manipular un torno CNC. Julián olvidó sus gafas de seguridad y le pide a Luisa empezar de una vez para no atrasar la evidencia de la mañana.',
    question: '¿Cuál es la conducta ética y reglamentaria que debe prevalecer?',
    options: [
      {
        id: 'opt_2a',
        text: 'Comenzar con cuidado a velocidad reducida mientras el instructor no esté mirando.',
        isCorrect: false,
        feedback: 'Peligroso e incorrecto. La seguridad en el SENA es innegociable; omitir los EPP pone en riesgo inminente la integridad física y viola las normas de SST.',
        regulationArticle: 'Art. 8, Numeral 12'
      },
      {
        id: 'opt_2b',
        text: 'Suspender el encendido del equipo, recordar que los EPP son obligatorios por reglamento y solicitar al almacén o instructor unos anteojos de repuesto antes de operar.',
        isCorrect: true,
        feedback: '¡Correcto! El aprendiz tiene el deber de acatar las normas de SST y velar por la seguridad colectiva. Ninguna entrega de evidencia justifica poner en peligro la vida.',
        regulationArticle: 'Art. 8, Numeral 12 y Art. 10'
      },
      {
        id: 'opt_2c',
        text: 'Permitir que Julián opere cubriéndose los ojos con la mano libre cuando salten virutas.',
        isCorrect: false,
        feedback: 'Absolutamente prohibido. Genera riesgo de ceguera y constituye una falta disciplinaria flagrante.',
        regulationArticle: 'Art. 9, Numeral 14'
      }
    ]
  },
  {
    id: 'dilema_3',
    title: 'Dilema 3: Oportunidad Laboral y Trámite de Novedad',
    context: 'Mariana está en su 4to mes de etapa lectiva en ADSO. Ha surgido una oportunidad familiar inaplazable que le exige mudarse a otra ciudad durante 5 meses. Ella no quiere perder su cupo en el SENA.',
    question: '¿Qué figura reglamentaria debe solicitar Mariana a través del aplicativo SofiaPlus?',
    options: [
      {
        id: 'opt_3a',
        text: 'Dejar de asistir y reaparecer 5 meses después solicitando que le reactiven la ficha.',
        isCorrect: false,
        feedback: 'Incorrecto. Si deja de asistir por más de 3 días sin justificar, se declarará deserción y quedará sancionada con inhabilidad de 6 meses en el SENA.',
        regulationArticle: 'Art. 22 - Deserción'
      },
      {
        id: 'opt_3b',
        text: 'Solicitar formalmente la novedad de Aplazamiento debidamente motivada y con soportes antes de ausentarse.',
        isCorrect: true,
        feedback: '¡Exacto! El aplazamiento es el trámite legal que autoriza suspender temporalmente el proceso formativo hasta por 6 meses prorrogable, reservando el cupo.',
        regulationArticle: 'Art. 21 - Trámites de Aprendices'
      },
      {
        id: 'opt_3c',
        text: 'Pedirle al vocero de ficha que le haga las tareas durante los 5 meses.',
        isCorrect: false,
        feedback: 'Totalmente incorrecto. El fraude y la delegación indebida son causales de cancelación inmediata de matrícula.',
        regulationArticle: 'Art. 9'
      }
    ]
  },
  {
    id: 'dilema_4',
    title: 'Dilema 4: Disconformidad con una Calificación y Debido Proceso',
    context: 'Esteban no está de acuerdo con la evaluación de "No Aprobado" que su instructor le asignó en una evidencia técnica. Él considera que cumplió todos los criterios de la rúbrica.',
    question: '¿Cuál es el camino que garantiza el debido proceso del aprendiz según el reglamento?',
    options: [
      {
        id: 'opt_4a',
        text: 'Publicar quejas en redes sociales y crear un grupo de protesta contra el instructor.',
        isCorrect: false,
        feedback: 'Inadecuado y lesivo contra la imagen institucional y el ambiente de convivencia.',
        regulationArticle: 'Art. 9'
      },
      {
        id: 'opt_4b',
        text: 'Dialogar respetuosamente con el instructor dentro de los dos días siguientes; de persistir el desacuerdo, solicitar formalmente por escrito la revisión ante el Coordinador Académico para que designe un segundo evaluador.',
        isCorrect: true,
        feedback: '¡Excelente! El debido proceso contempla el diálogo directo primero y, de ser necesario, la solicitud motivada de un segundo instructor evaluador.',
        regulationArticle: 'Art. 7, Numeral 10 y Art. 14'
      },
      {
        id: 'opt_4c',
        text: 'Resignarse a reprobar sin solicitar retroalimentación.',
        isCorrect: false,
        feedback: 'Incorrecto. El aprendiz tiene el derecho fundamental a ser retroalimentado y a concertar planes de mejoramiento.',
        regulationArticle: 'Art. 7, Numeral 1'
      }
    ]
  }
];

export const SENA_EVALUATION_QUESTIONS: EvaluationQuestion[] = [
  // DIMENSIÓN 1: Identidad y Símbolos
  {
    id: 'eval_1',
    dimension: 'identidad',
    question: '¿Qué representa la rueda dentada (piñón) presente en el escudo oficial del SENA?',
    options: [
      'La producción agrícola tradicional del campo colombiano.',
      'El sector industrial, el desarrollo técnico y la fuerza motriz del trabajo.',
      'El intercambio comercial internacional y aduanero.',
      'El transporte terrestre y las vías fluviales del país.'
    ],
    correctIndex: 1,
    explanation: 'La rueda dentada simboliza el sector secundario o industrial y la capacidad transformadora de la tecnología y el trabajo.',
    articleReference: 'Identidad Institucional - Símbolos SENA'
  },
  {
    id: 'eval_2',
    dimension: 'identidad',
    question: 'En el logosímbolo oficial del SENA, ¿cuál es el significado de la figura humana en camino?',
    options: [
      'Un deportista corriendo por una pista atlética institucional.',
      'El aprendiz como protagonista que avanza por un camino hacia su futuro y crecimiento profesional.',
      'Un trabajador despidiéndose de su centro de formación.',
      'Un símbolo religioso de devoción y plegaria.'
    ],
    correctIndex: 1,
    explanation: 'El logosímbolo encarna al aprendiz en marcha, con los brazos abiertos para apropiar el conocimiento y transformar positivamente a Colombia.',
    articleReference: 'Manual de Imagen e Identidad Corporativa SENA'
  },
  {
    id: 'eval_3',
    dimension: 'identidad',
    question: '¿Cuáles son los tres sectores económicos reflejados en el escudo histórico del SENA?',
    options: [
      'Petróleo, carbón y energía solar.',
      'Turismo, hotelería y aviación civil.',
      'Industria (piñón), Comercio y Servicios (caduceo) y Sector Agropecuario (café).',
      'Textil, construcción y telecomunicaciones.'
    ],
    correctIndex: 2,
    explanation: 'El escudo reúne los tres pilares de la economía nacional: la industria (rueda dentada), el comercio (caduceo) y el agro (ramas de café).',
    articleReference: 'Historia y Simbología Institucional SENA'
  },
  {
    id: 'eval_4',
    dimension: 'identidad',
    question: '¿Quién es reconocido como el fundador principal y líder de la creación del SENA en 1957?',
    options: [
      'Rodolfo Martínez Tono.',
      'Gabriel García Márquez.',
      'Alberto Lleras Camargo.',
      'Jesús Briceño Sánchez.'
    ],
    correctIndex: 0,
    explanation: 'El abogado y economista cartagenero Rodolfo Martínez Tono concibió la idea y fue el director general fundador del SENA.',
    articleReference: 'Historia de la Creación del SENA (Decreto Ley 118 de 1957)'
  },

  // DIMENSIÓN 2: Derechos y Deberes
  {
    id: 'eval_5',
    dimension: 'derechos_deberes',
    question: 'Si un aprendiz presenta una calamidad de salud que le impide asistir al centro de formación, ¿cuál es el plazo reglamentario para radicar la justificación médica?',
    options: [
      'Máximo al finalizar el trimestre de formación.',
      'Hasta 15 días calendario posteriores a la inasistencia.',
      'Dentro de los 3 días hábiles siguientes al hecho o término de la incapacidad.',
      'No es necesario radicar soporte si el vocero de ficha avisa por chat.'
    ],
    correctIndex: 2,
    explanation: 'El artículo 8 del Reglamento del Aprendiz fija de forma perentoria un plazo máximo de 3 días hábiles para justificar ausencias con soporte legal válido.',
    articleReference: 'Reglamento del Aprendiz, Art. 8, Numeral 4'
  },
  {
    id: 'eval_6',
    dimension: 'derechos_deberes',
    question: '¿Cuál de los siguientes es un DERECHO fundamental consagrado para los aprendices del SENA?',
    options: [
      'Asistir a los talleres sin usar los Elementos de Protección Personal (EPP).',
      'Recibir inducción completa, formación de calidad y trato respetuoso libre de discriminación.',
      'Prestar el carné institucional a terceros durante los fines de semana.',
      'Modificar autónomamente las fechas del cronograma de SofiaPlus.'
    ],
    correctIndex: 1,
    explanation: 'El artículo 7 establece como derecho inalienable recibir una inducción integral, formación técnica de calidad y trato con dignidad humana.',
    articleReference: 'Reglamento del Aprendiz, Art. 7, Numeral 1'
  },
  {
    id: 'eval_7',
    dimension: 'derechos_deberes',
    question: '¿Qué estipula el reglamento sobre el porte del carné institucional y el uniforme?',
    options: [
      'Es opcional y solo se exige en visitas de auditoría externa.',
      'El aprendiz debe portarlo visiblemente en las instalaciones y talleres, cuidando su decoro y buen uso.',
      'Solo los instructores están obligados a identificarse.',
      'El carné solo es necesario para ingresar a la biblioteca virtual.'
    ],
    correctIndex: 1,
    explanation: 'Portar el carné visible y usar el uniforme adecuado son deberes institucionales que salvaguardan la seguridad y la convivencia en los centros.',
    articleReference: 'Reglamento del Aprendiz, Art. 8, Numeral 3'
  },
  {
    id: 'eval_8',
    dimension: 'derechos_deberes',
    question: 'En caso de que un aprendiz no alcance la aprobación de un resultado de aprendizaje en la primera oportunidad, ¿a qué tiene derecho antes de ser sancionado?',
    options: [
      'A la cancelación inmediata y definitiva de la matrícula.',
      'A concertar un Plan de Mejoramiento Académico pedagógico con su instructor.',
      'A pagar una multa económica en la tesorería del centro.',
      'A repetir todo el programa de formación desde el inicio.'
    ],
    correctIndex: 1,
    explanation: 'El debido proceso pedagógico exige concertar un plan de mejoramiento con actividades complementarias para subsanar los resultados pendientes.',
    articleReference: 'Reglamento del Aprendiz, Art. 7 y Art. 14'
  },

  // DIMENSIÓN 3: Faltas, Medidas Formativas y Debido Proceso
  {
    id: 'eval_9',
    dimension: 'debido_proceso',
    question: '¿Cómo se clasifican reglamentariamente las faltas cometidas por un aprendiz en el SENA?',
    options: [
      'Simples, complejas y extraordinarias.',
      'Leves, Graves y Gravísimas.',
      'Penales, civiles y administrativas.',
      'Primarias, secundarias y finales.'
    ],
    correctIndex: 1,
    explanation: 'El Acuerdo 009 de 2024 clasifica las faltas en tres categorías según su gravedad, daño ocasionado e intencionalidad: leves, graves y gravísimas, diferenciando las medidas formativas preventivas de las sanciones disciplinarias.',
    articleReference: 'Acuerdo 009 de 2024, Régimen Disciplinario y Clasificación de Faltas'
  },
  {
    id: 'eval_10',
    dimension: 'debido_proceso',
    question: '¿Cuál de las siguientes conductas está tipificada expresamente como FALTA GRAVÍSIMA?',
    options: [
      'Llegar 5 minutos tarde a una clase teórica.',
      'Olvidar el carné institucional en la casa en un día de formación.',
      'Cometer fraude, suplantación de personas o plagio deliberado en evidencias de aprendizaje.',
      'Solicitar cambio de horario por motivos laborales.'
    ],
    correctIndex: 2,
    explanation: 'El plagio y la suplantación atentan contra la fe pública y la ética académica, tipificándose en el Acuerdo 009 de 2024 como faltas gravísimas sujetas a cancelación de matrícula.',
    articleReference: 'Acuerdo 009 de 2024, Faltas Gravísimas'
  },
  {
    id: 'eval_11',
    dimension: 'debido_proceso',
    question: '¿Qué instancia institucional investiga los casos disciplinarios graves y emite recomendaciones de sanción al Subdirector de Centro?',
    options: [
      'El Consejo de Seguridad Municipal.',
      'El Comité de Evaluación y Seguimiento del Centro de Formación.',
      'La Defensoría del Pueblo.',
      'El personero estudiantil de la ficha.'
    ],
    correctIndex: 1,
    explanation: 'El Comité de Evaluación y Seguimiento es el órgano colegiado que analiza las evidencias, escucha descargos y recomienda las medidas pertinentes garantizando el debido proceso.',
    articleReference: 'Acuerdo 009 de 2024, Capítulo VI - Comité de Evaluación y Seguimiento'
  },
  {
    id: 'eval_12',
    dimension: 'debido_proceso',
    question: '¿Con cuánta antelación mínima debe citarse formalmente a un aprendiz a la sesión del Comité de Evaluación y Seguimiento?',
    options: [
      '2 horas antes de la reunión.',
      'Con al menos CINCO (5) DÍAS HÁBILES de anticipación, con traslado de las pruebas.',
      'No se requiere citación previa.',
      '30 días después de emitida la sanción.'
    ],
    correctIndex: 1,
    explanation: 'El Acuerdo 009 de 2024 establece que la citación al aprendiz debe realizarse con un término no menor a cinco (5) días hábiles para garantizar su derecho a preparar la defensa y conocer el pliego de pruebas.',
    articleReference: 'Acuerdo 009 de 2024, Procedimiento del Comité de Evaluación y Seguimiento'
  },

  // DIMENSIÓN 4: Trámites, SofiaPlus y Etapa Productiva
  {
    id: 'eval_13',
    dimension: 'etapa_productiva',
    question: '¿Cuánto tiempo máximo puede durar reglamentariamente la solicitud de "Aplazamiento" del proceso formativo?',
    options: [
      'Hasta por 6 meses calendario, prorrogables por motivos justificados.',
      'Máximo 1 semana.',
      'Hasta 5 años sin límite de tiempo.',
      'Solo se permite aplazar 24 horas.'
    ],
    correctIndex: 0,
    explanation: 'El aplazamiento puede autorizarse hasta por seis (6) meses prorrogable una sola vez por causa debidamente demostrada.',
    articleReference: 'Reglamento del Aprendiz, Art. 21'
  },
  {
    id: 'eval_14',
    dimension: 'etapa_productiva',
    question: '¿Cuál de las siguientes NO es una alternativa válida para el desarrollo de la Etapa Productiva en el SENA?',
    options: [
      'Contrato de Aprendizaje con una empresa patrocinadora.',
      'Proyecto Productivo o creación de unidad de negocio validada por el centro.',
      'Pasantía en entidad pública o privada o monitoría en el SENA.',
      'Pagar una tarifa monetaria para omitir la práctica empresarial.'
    ],
    correctIndex: 3,
    explanation: 'La etapa productiva es indispensable para la certificación formativa; no existe mecanismo monetario para exonerarse de ella.',
    articleReference: 'Alternativas de Etapa Productiva SENA'
  },
  {
    id: 'eval_15',
    dimension: 'etapa_productiva',
    question: '¿Qué sucede cuando un aprendiz no asiste a su formación durante tres (3) días consecutivos sin justificar legalmente?',
    options: [
      'Se le asigna automáticamente una beca de sostenimiento.',
      'Se inicia el trámite de declaración de DESERCIÓN del proceso formativo.',
      'Se le adelanta a la etapa productiva.',
      'El sistema SofiaPlus borra todas las materias sin registro.'
    ],
    correctIndex: 1,
    explanation: 'La inasistencia injustificada por más de tres días consecutivos activa el protocolo de deserción con cancelación de matrícula e inhabilidad temporal.',
    articleReference: 'Reglamento del Aprendiz, Art. 22 - Deserción'
  }
];

export const MOCK_COHORTS: CohortFicha[] = [
  {
    id: 'ficha_1',
    code: '2824102',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    journey: 'Diurna',
    totalApprentices: 32,
    instructorLeader: 'Ing. Carlos Alberto Morales',
    startDate: '15 de Febrero de 2026',
    centerName: 'Centro de Biotecnología Industrial y Tecnologías de la Información',
    regionalName: 'Regional Valle'
  },
  {
    id: 'ficha_2',
    code: '2715890',
    programName: 'Tecnólogo en Gestión Administrativa y Talento Humano',
    journey: 'Mixta',
    totalApprentices: 28,
    instructorLeader: 'Dra. Marcela Jaramillo Vélez',
    startDate: '01 de Marzo de 2026',
    centerName: 'Centro de Gestión de Mercados, Logística y TIC',
    regionalName: 'Regional Distrito Capital'
  },
  {
    id: 'ficha_3',
    code: '2901345',
    programName: 'Técnico en Mantenimiento de Equipos de Cómputo',
    journey: 'Nocturna',
    totalApprentices: 25,
    instructorLeader: 'Lic. Andrés Felipe Henao',
    startDate: '10 de Marzo de 2026',
    centerName: 'Centro Nacional Colombo Alemán',
    regionalName: 'Regional Atlántico'
  }
];

export const MOCK_APPRENTICES: Apprentice[] = [
  {
    id: 'app_1',
    documentType: 'CC',
    documentNumber: '1098765432',
    fullName: 'Laura Sofía Gómez Restrepo',
    email: 'lsgomez@misena.edu.co',
    fichaId: 'ficha_1',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Tecnologías de la Información',
    regional: 'Regional Valle',
    progressPercent: 100,
    inductionCompleted: true,
    lastActive: 'Hace 1 hora',
    status: 'aprobado',
    evaluationResult: {
      score: 93,
      percentage: 93,
      passed: true,
      answers: { eval_1: 1, eval_2: 1, eval_3: 2, eval_4: 0, eval_5: 2, eval_6: 1, eval_7: 1, eval_8: 1, eval_9: 1, eval_10: 2, eval_11: 1, eval_12: 1, eval_13: 0, eval_14: 3, eval_15: 1 },
      dimensionScores: {
        identidad: { total: 4, correct: 4, percentage: 100 },
        derechos_deberes: { total: 4, correct: 4, percentage: 100 },
        debido_proceso: { total: 4, correct: 4, percentage: 100 },
        etapa_productiva: { total: 3, correct: 2, percentage: 67 }
      },
      completedAt: '2026-10-26T14:30:00Z',
      certificateId: 'SENA-IND-2026-VAL-88219'
    }
  },
  {
    id: 'app_2',
    documentType: 'TI',
    documentNumber: '1012345678',
    fullName: 'Juan Diego Martínez Osorio',
    email: 'jdmartinez@misena.edu.co',
    fichaId: 'ficha_1',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Tecnologías de la Información',
    regional: 'Regional Valle',
    progressPercent: 100,
    inductionCompleted: true,
    lastActive: 'Hace 3 horas',
    status: 'aprobado',
    evaluationResult: {
      score: 87,
      percentage: 87,
      passed: true,
      answers: { eval_1: 1, eval_2: 1, eval_3: 2, eval_4: 0, eval_5: 2, eval_6: 1, eval_7: 1, eval_8: 1, eval_9: 1, eval_10: 2, eval_11: 1, eval_12: 1, eval_13: 1, eval_14: 3, eval_15: 1 },
      dimensionScores: {
        identidad: { total: 4, correct: 4, percentage: 100 },
        derechos_deberes: { total: 4, correct: 4, percentage: 100 },
        debido_proceso: { total: 4, correct: 3, percentage: 75 },
        etapa_productiva: { total: 3, correct: 2, percentage: 67 }
      },
      completedAt: '2026-10-25T11:15:00Z',
      certificateId: 'SENA-IND-2026-VAL-88220'
    }
  },
  {
    id: 'app_3',
    documentType: 'CC',
    documentNumber: '1123456789',
    fullName: 'Valentina Caicedo Muñoz',
    email: 'vcaicedo@misena.edu.co',
    fichaId: 'ficha_1',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Tecnologías de la Información',
    regional: 'Regional Valle',
    progressPercent: 75,
    inductionCompleted: false,
    lastActive: 'Hace 5 horas',
    status: 'en_progreso'
  },
  {
    id: 'app_4',
    documentType: 'CC',
    documentNumber: '1088765431',
    fullName: 'Mateo Alejandro Benítez Ruiz',
    email: 'mbenitez@misena.edu.co',
    fichaId: 'ficha_1',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Tecnologías de la Información',
    regional: 'Regional Valle',
    progressPercent: 100,
    inductionCompleted: true,
    lastActive: 'Hace 1 día',
    status: 'por_mejorar',
    evaluationResult: {
      score: 53,
      percentage: 53,
      passed: false,
      answers: { eval_1: 0, eval_2: 1, eval_3: 1, eval_4: 0, eval_5: 0, eval_6: 1, eval_7: 0, eval_8: 1, eval_9: 0, eval_10: 2, eval_11: 0, eval_12: 1, eval_13: 1, eval_14: 3, eval_15: 0 },
      dimensionScores: {
        identidad: { total: 4, correct: 2, percentage: 50 },
        derechos_deberes: { total: 4, correct: 2, percentage: 50 },
        debido_proceso: { total: 4, correct: 2, percentage: 50 },
        etapa_productiva: { total: 3, correct: 1, percentage: 33 }
      },
      completedAt: '2026-10-24T16:00:00Z',
      certificateId: 'SENA-IND-REINTENTO'
    }
  },
  {
    id: 'app_5',
    documentType: 'PPT',
    documentNumber: '9876543210',
    fullName: 'Yelitza Coromoto Rangel',
    email: 'yrangel@misena.edu.co',
    fichaId: 'ficha_1',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Tecnologías de la Información',
    regional: 'Regional Valle',
    progressPercent: 20,
    inductionCompleted: false,
    lastActive: 'Hace 2 días',
    status: 'pendiente'
  },
  {
    id: 'app_6',
    documentType: 'CC',
    documentNumber: '1095432187',
    fullName: 'Brayan Estiven Quintero Díaz',
    email: 'bquintero@misena.edu.co',
    fichaId: 'ficha_1',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Tecnologías de la Información',
    regional: 'Regional Valle',
    progressPercent: 100,
    inductionCompleted: true,
    lastActive: 'Hace 4 horas',
    status: 'aprobado',
    evaluationResult: {
      score: 93,
      percentage: 93,
      passed: true,
      answers: { eval_1: 1, eval_2: 1, eval_3: 2, eval_4: 0, eval_5: 2, eval_6: 1, eval_7: 1, eval_8: 1, eval_9: 1, eval_10: 2, eval_11: 1, eval_12: 1, eval_13: 0, eval_14: 3, eval_15: 1 },
      dimensionScores: {
        identidad: { total: 4, correct: 4, percentage: 100 },
        derechos_deberes: { total: 4, correct: 4, percentage: 100 },
        debido_proceso: { total: 4, correct: 4, percentage: 100 },
        etapa_productiva: { total: 3, correct: 2, percentage: 67 }
      },
      completedAt: '2026-10-26T17:45:00Z',
      certificateId: 'SENA-IND-2026-VAL-88221'
    }
  }
];

export const HIMNO_SENA_LYRICS = [
  {
    stanza: 'Coro',
    text: 'Estudiantes del SENA, ¡adelante!\nPor Colombia luchad con amor,\ncon el ánimo noble y radiante\ntransformemos el mundo en mejor.'
  },
  {
    stanza: 'Estrofa I',
    text: 'De la patria el futuro destino,\nen las manos del joven está,\nel trabajo es seguro camino,\nque el progreso a Colombia dará.'
  },
  {
    stanza: 'Estrofa II',
    text: 'En la forja del SENA se forman,\nhombres libres que saben triunfar,\ncon la ciencia y la técnica norman,\nun mañana de paz y bienestar.'
  },
  {
    stanza: 'Estrofa III',
    text: 'Hoy la patria nos llama al trabajo,\ncon nobleza, constancia y valor,\nno habrá sombras, tinieblas ni atajos,\nsi en el pecho florece el honor.'
  }
];

// ==========================================
// ACUERDO 009 DE 2024 - CICLO DE VIDA DEL APRENDIZ
// ==========================================

export const SENA_LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: 'ingreso',
    title: '1. Ingreso a la Formación',
    badge: 'Matrícula e Inducción',
    subtitle: 'Nacimiento del vínculo formativo institucional',
    description: 'El ingreso formaliza la condición de aprendiz SENA mediante la inscripción, verificación documental, legalización de la matrícula y la participación en la inducción integral obligatoria.',
    keyPhases: [
      {
        name: 'Inscripción y Verificación Documental',
        description: 'Carga de documento de identidad vigente, comprobación de requisitos de escolaridad y aceptación de términos en SofíaPlus / Zajuna.',
        deliverableOrAction: 'Documentación al 100% validada en plataforma.'
      },
      {
        name: 'Inducción Institucional Obligatoria',
        description: 'Jornada pedagógica de inmersión institucional: valores, símbolos, deberes, derechos, SST, plataforma virtual y servicios de Bienestar.',
        deliverableOrAction: 'Asistencia obligatoria y aprobación de la evaluación de inducción.'
      },
      {
        name: 'Diagnóstico y Concertación Inicial',
        description: 'Reconocimiento de aprendizajes previos, perfil de entrada del aprendiz y concertación de la ruta formativa con los instructores.',
        deliverableOrAction: 'Acta de concertación y suscripción del compromiso del aprendiz.'
      }
    ],
    regulatoryRequirements: [
      'Acreditar documento de identidad legalmente vigente en Colombia.',
      'Certificados académicos requeridos según el nivel (Técnico Laboral o Tecnólogo).',
      'Asistir al 100% de las actividades programadas en la semana de inducción.',
      'Firmar el compromiso de acatar el Reglamento del Aprendiz SENA.'
    ],
    tipsForApprentices: [
      'Activa de inmediato tu correo institucional @misena.edu.co para recibir todas las comunicaciones oficiales.',
      'Verifica que tus nombres y número de documento en SofíaPlus coincidan exactamente con tu cédula para evitar demoras en la titulación.',
      'Asiste a cada sesión de inducción: es requisito indispensable para habilitar tu plataforma académica.'
    ],
    articleAcuerdo009: 'Acuerdo 009 de 2024, Capítulo II - Del Ingreso y Matrícula'
  },
  {
    id: 'permanencia',
    title: '2. Permanencia y Trayectoria',
    badge: 'Etapa Lectiva y Formativa',
    subtitle: 'Desarrollo de competencias y convivencia en el SENA',
    description: 'La permanencia representa la trayectoria activa del aprendiz en el proceso formativo integral, demostrando puntualidad, participación en ambientes de aprendizaje presenciales o virtuales (Zajuna), evaluación por competencias y uso de los servicios de Bienestar.',
    keyPhases: [
      {
        name: 'Asistencia y Participación en Ambientes',
        description: 'Cumplimiento del horario pactado y registro oportuno de actividades presenciales y virtuales en la plataforma Zajuna LMS.',
        deliverableOrAction: 'Asistencia mínima del 80% y entrega de evidencias en tiempos concertados.'
      },
      {
        name: 'Evaluación Formativa del Aprendizaje',
        description: 'Emisión de juicios evaluativos basados en competencias: Aprobado (A) o No Aprobado / Deficiente (D) sobre evidencias de conocimiento, desempeño y producto.',
        deliverableOrAction: 'Portafolio de evidencias digital actualizado en Zajuna.'
      },
      {
        name: 'Planes de Mejoramiento Pedagógico',
        description: 'Mecanismo preventivo pedagógico ante dificultades de aprendizaje o juicios en D, para superar la competencia antes de instancias disciplinarias.',
        deliverableOrAction: 'Plan concertado con instructor con plazo máximo de 30 días.'
      },
      {
        name: 'Bienestar al Aprendiz y Liderazgo',
        description: 'Acceso a salud integral, apoyos de sostenimiento, monitorías, deporte, arte, cultura, liderazgo y representación estudiantil.',
        deliverableOrAction: 'Participación en convocatorias de apoyo y bienestar.'
      }
    ],
    regulatoryRequirements: [
      'Asistir a las sesiones programadas y justificar inasistencias dentro de los 3 días hábiles siguientes.',
      'Portar con dignidad y pulcritud el carné institucional y los elementos de protección personal (EPP) en talleres.',
      'Respetar las normas de convivencia, los derechos humanos y la ciberconvivencia en canales institucionales.',
      'Presentar y sustentar evidencias de aprendizaje con originalidad y ética.'
    ],
    tipsForApprentices: [
      'Revisa quincenalmente tu historial de juicios de evaluación en SofíaPlus para asegurar que tus resultados estén registrados como Aprobados.',
      'Si tienes una calamidad doméstica o enfermedad, entrega la incapacidad médica EPS a tu instructor antes de que pasen 3 días hábiles.',
      'Si se te dificulta un tema técnico, solicita tutorías de refuerzo pedagógico antes de que culmine el trimestre.'
    ],
    articleAcuerdo009: 'Acuerdo 009 de 2024, Capítulo III - De la Permanencia y la Evaluación'
  },
  {
    id: 'novedades',
    title: '3. Novedades de Matrícula',
    badge: 'Modificaciones Administrativas',
    subtitle: 'Gestión formal de cambios, aplazamientos y contingencias',
    description: 'Las novedades son los actos administrativos que modifican formalmente el estado de la matrícula del aprendiz durante su formación: aplazamiento, traslado, cambio de jornada, retiro voluntario y el trámite preventivo de deserción.',
    keyPhases: [
      {
        name: 'Radicación Oportuna de la Solicitud',
        description: 'El aprendiz radica formalmente su solicitud motivada con soportes documentales ante la Coordinación Académica a través del sistema SofiaPlus o por ventanilla.',
        deliverableOrAction: 'Radicado oficial y soportes anexos (médicos, laborales o de fuerza mayor).'
      },
      {
        name: 'Estudio de Viabilidad Académica y Cupo',
        description: 'La Coordinación verifica el estado del aprendiz, el historial académico, la disponibilidad de cupos en la ficha de destino y las causales de ley.',
        deliverableOrAction: 'Concepto técnico de Coordinación Académica.'
      },
      {
        name: 'Expedición de Acto Administrativo',
        description: 'El Subdirector de Centro emite la resolución o acto correspondiente que aprueba o deniega la novedad con notificación formal al aprendiz.',
        deliverableOrAction: 'Resolución notificada y actualización del estado en SofiaPlus.'
      }
    ],
    regulatoryRequirements: [
      'Radicar la novedad antes de incurrir en inasistencias que configuren deserción.',
      'Aportar pruebas documentales idóneas en casos de fuerza mayor o calamidad comprobada.',
      'Estar a paz y salvo con la entrega de materiales, inventarios y libros del centro.',
      'Acatar los plazos máximos normados en el Acuerdo 009 de 2024.'
    ],
    tipsForApprentices: [
      '¡Jamás abandones el centro sin radicar tu novedad! Si no puedes continuar, solicita retiro voluntario o aplazamiento para no recibir sanción de inhabilidad.',
      'El aplazamiento tiene un plazo legal máximo de 6 meses (prorrogable por causa médica prolongada o servicio militar).',
      'Guarda siempre copia con sello de radicado o número de solicitud generado en SofiaPlus.'
    ],
    articleAcuerdo009: 'Acuerdo 009 de 2024, Capítulo IV - De las Novedades de Matrícula'
  },
  {
    id: 'reingreso',
    title: '4. Reingreso a la Formación',
    badge: 'Reincorporación',
    subtitle: 'Retorno formal tras un aplazamiento concedido',
    description: 'Procedimiento reglamentario mediante el cual el aprendiz que suspendió temporal y legalmente su formación mediante aplazamiento, solicita reincorporarse al SENA para culminar su plan de estudios.',
    keyPhases: [
      {
        name: 'Solicitud Formal Anticipada',
        description: 'El aprendiz debe radicar su solicitud ante la Coordinación Académica al menos quince (15) días hábiles antes de vencerse el término de su aplazamiento.',
        deliverableOrAction: 'Solicitud de reingreso con referencia al acto de aplazamiento previo.'
      },
      {
        name: 'Validación de Disponibilidad de Ficha y Cupo',
        description: 'La coordinación analiza si existe ficha activa en el mismo trimestre o nivel del programa y si hay cupo disponible para el aprendiz.',
        deliverableOrAction: 'Asignación formal de nueva ficha o inclusión en lista de espera prioritaria.'
      },
      {
        name: 'Alineación Curricular y Equivalencias',
        description: 'Si el programa tuvo actualización curricular durante el aplazamiento, se realiza estudio de homologación para empatar los resultados de aprendizaje.',
        deliverableOrAction: 'Acta de equivalencias y concertación de plan de nivelación.'
      }
    ],
    regulatoryRequirements: [
      'Haber obtenido previamente resolución de aplazamiento vigente.',
      'No haber superado el plazo máximo autorizado en la resolución de aplazamiento.',
      'Que el programa de formación continúe ofertado o exista diseño curricular en transición.',
      'Paz y salvo institucional vigente a la fecha de reingreso.'
    ],
    tipsForApprentices: [
      'No esperes al último día de tu aplazamiento para solicitar reingreso: el trámite requiere al menos 15 días hábiles de anticipación.',
      'Si tu programa cambió de versión durante el aplazamiento, tu instructor vocero te guiará con las equivalencias académicas sin perder lo avanzado.'
    ],
    articleAcuerdo009: 'Acuerdo 009 de 2024, Capítulo IV, Art. de Reingreso'
  },
  {
    id: 'certificacion',
    title: '5. Certificación y Titulación',
    badge: 'Graduación y Cierre Exitoso',
    subtitle: 'Culminación del ciclo formativo y expedición del título',
    description: 'Etapa culmen donde el aprendiz acredita haber cumplido satisfactoriamente con la totalidad de los resultados de aprendizaje de la etapa lectiva y de la etapa productiva, obteniendo el título oficial otorgado por el SENA a nombre de la República de Colombia.',
    keyPhases: [
      {
        name: 'Aprobación del 100% de Competencias Lectivas',
        description: 'Verificación en SofiaPlus de que la totalidad de los resultados de aprendizaje de la etapa lectiva se encuentren en estado APROBADO.',
        deliverableOrAction: 'Reporte académico consolidado de etapa lectiva aprobado.'
      },
      {
        name: 'Cierre y Evaluación de Etapa Productiva',
        description: 'Acreditación de la alternativa productiva desarrollada (contrato de aprendizaje, proyecto productivo, pasantía, monitoría, etc.) con bitácoras quincenales y visitas del instructor de seguimiento.',
        deliverableOrAction: 'Formato F-023 con concepto APROBADO y certificación de la empresa/entidad.'
      },
      {
        name: 'Paz y Salvo Integral Institucional',
        description: 'Trámite digital de paz y salvo que certifica no adeudar libros en biblioteca, herramientas en almacén, materiales de taller ni tener sanciones disciplinarias activas.',
        deliverableOrAction: 'Paz y Salvo institucional debidamente firmado en sistema.'
      },
      {
        name: 'Expedición de Título y Acta de Grado',
        description: 'Emisión del título oficial con código de verificación QR nacional y entrega en ceremonia solemne o certificación por ventanilla digital.',
        deliverableOrAction: 'Título profesional integral y acta de grado oficial.'
      }
    ],
    regulatoryRequirements: [
      'Tener el 100% de los resultados de aprendizaje de etapa lectiva y productiva aprobados.',
      'Haber presentado las pruebas de Estado saber TyT (exigido para nivel Tecnológico).',
      'Paz y salvo expedido por biblioteca, bienestar, almacén y coordinación académica.',
      'Documento de identidad vigente actualizado en la base de datos institucional.'
    ],
    tipsForApprentices: [
      'No dejes acumular tus bitácoras quincenales durante la etapa productiva: entrégalas en las fechas exactas a tu instructor de seguimiento.',
      'Revisa que tu nombre esté escrito con exactitud (tildes, segundo apellido) para que tu diploma salga perfecto desde el primer momento.'
    ],
    articleAcuerdo009: 'Acuerdo 009 de 2024, Capítulo V - De la Certificación'
  }
];

// ==========================================
// NOVEDADES DE MATRÍCULA (ACUERDO 009 DE 2024)
// ==========================================

export const SENA_NOVEDADES_CATALOGO: NovedadMatricula[] = [
  {
    id: 'nov_aplazamiento',
    title: 'Aplazamiento de la Formación',
    shortDesc: 'Suspensión temporal voluntaria de la formación por causa justificada comprobada.',
    type: 'aplazamiento',
    validCauses: [
      'Servicio militar obligatorio o vinculación a fuerzas del orden.',
      'Incapacidad médica prolongada debidamente validada por EPS o entidad de salud.',
      'Calamidad doméstica grave o situaciones de fuerza mayor soportadas.',
      'Motivos laborales sobrevinientes que impidan transitoriamente continuar la jornada.'
    ],
    maxPeriodAndConditions: 'Hasta por un máximo de seis (6) meses calendario continuos o discontinuos. Prorrogable por una sola vez en casos de servicio militar o incapacidad médica certificada.',
    procedureSteps: [
      'Radicar solicitud motivada por escrito o SofiaPlus ante la Coordinación Académica antes de faltar.',
      'Anexar las pruebas y soportes documentales correspondientes.',
      'Esperar la emisión de la resolución motivada expedida por el Subdirector de Centro.',
      'Solicitar el reingreso al menos 15 días hábiles antes del vencimiento del aplazamiento.'
    ],
    consequencesAndImpact: 'El aprendiz queda en estado "Aplazado", congela su historial académico y no pierde su avance. No computa para deserción siempre que esté autorizado.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Art. de Aplazamiento',
    requiresCommittee: false
  },
  {
    id: 'nov_traslado',
    title: 'Traslado (de Centro o de Ficha)',
    shortDesc: 'Cambio de una ficha a otra en el mismo programa, o cambio entre centros de formación del SENA.',
    type: 'traslado',
    validCauses: [
      'Cambio de domicilio o ciudad de residencia del aprendiz.',
      'Situaciones de seguridad personal o vulnerabilidad manifiesta.',
      'Razones laborales acreditadas del aprendiz o de sus padres si es menor de edad.'
    ],
    maxPeriodAndConditions: 'Debe haberse cursado y aprobado al menos el primer trimestre del programa. Requiere existencia de cupo en la ficha de destino y coincidencia en la versión curricular.',
    procedureSteps: [
      'Radicar solicitud motivada ante el Centro de Formación de origen.',
      'Verificar paz y salvo académico y de inventarios en el centro emisor.',
      'Remisión del expediente a la Coordinación Académica del Centro receptor.',
      'Aprobación formal mediante acto administrativo y registro en SofiaPlus.'
    ],
    consequencesAndImpact: 'Conserva el 100% de las competencias aprobadas en el centro de origen sin reiniciar el programa.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Art. de Traslado',
    requiresCommittee: false
  },
  {
    id: 'nov_retiro_voluntario',
    title: 'Retiro Voluntario de la Formación',
    shortDesc: 'Manifestación libre y expresa del aprendiz solicitando la desvinculación formal del programa.',
    type: 'retiro_voluntario',
    validCauses: [
      'Decisión autónoma y personal del aprendiz manifestada antes de incurrir en faltas.',
      'Imposibilidad definitiva de continuar los estudios por circunstancias de vida sobrevinientes.',
      'Oportunidades laborales incompatibles con el horario de formación presencial.'
    ],
    maxPeriodAndConditions: 'Debe radicarse mientras el aprendiz se encuentre en estado activo, sin tener iniciado un proceso disciplinario en Comité de Evaluación.',
    procedureSteps: [
      'Radicar comunicación formal escrita manifestando los motivos del retiro.',
      'Entrega de elementos a cargo y obtención de paz y salvo institucional.',
      'Actualización del estado a "Retiro Voluntario" en SofiaPlus por la administración.'
    ],
    consequencesAndImpact: 'Genera sanción de inhabilidad de seis (6) meses para inscribirse a nuevos programas presenciales o virtuales del SENA, salvo que se demuestre fuerza mayor justificada.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Art. de Retiro Voluntario',
    requiresCommittee: false
  },
  {
    id: 'nov_desercion',
    title: 'Deserción de la Formación',
    shortDesc: 'Abandono injustificado del proceso formativo tipificado expresamente en el reglamento.',
    type: 'desercion',
    validCauses: [
      'Inasistencia injustificada durante tres (3) días hábiles consecutivos en modalidad presencial.',
      'No ingresar a la plataforma Zajuna ni entregar evidencias durante treinta (30) días calendario en formación virtual.',
      'No presentarse a la formación una vez vencido el término concedido en el aplazamiento sin haber pedido prórroga o reingreso.',
      'No presentar las evidencias de etapa productiva o no reportarse con el instructor asignado.'
    ],
    maxPeriodAndConditions: 'El instructor reporta la novedad a la Coordinación. Se envía un requerimiento formal al aprendiz otorgándole CINCO (5) DÍAS HÁBILES para que aporte las justificaciones médicas o de fuerza mayor.',
    procedureSteps: [
      'Constatación de la causal de inasistencia o inactividad por el instructor líder.',
      'Envío de comunicación o requerimiento oficial al correo del aprendiz concediendo 5 días hábiles.',
      'Vencido el plazo sin respuesta o con justificación insuficiente, se declara la deserción.',
      'Expedición de Resolución de Cancelación de Matrícula por el Subdirector de Centro.'
    ],
    consequencesAndImpact: 'Cancelación definitiva de la matrícula e imposición de INHABILIDAD DE SEIS (6) MESES para inscribirse en cualquier programa de formación titulada del SENA a nivel nacional.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Art. de Deserción y Trámite',
    requiresCommittee: false
  },
  {
    id: 'nov_cambio_jornada',
    title: 'Cambio de Jornada',
    shortDesc: 'Modificación del horario de estudio (Diurna, Nocturna, Madrugada o Fines de Semana) en el mismo centro.',
    type: 'cambio_jornada',
    validCauses: [
      'Contrato de trabajo formal sobreviniente con horario cruzado.',
      'Responsabilidades familiares o de cuidado acreditadas.',
      'Razones de salud certificadas por profesional médico tratante.'
    ],
    maxPeriodAndConditions: 'Sujeto a la existencia de la misma versión curricular en la jornada solicitada y cupo disponible.',
    procedureSteps: [
      'Solicitud radicada ante Coordinación Académica con carta laboral o soporte médico.',
      'Evaluación de compatibilidad pedagógica del plan de formación.',
      'Aprobación y reubicación en la nueva ficha correspondiente.'
    ],
    consequencesAndImpact: 'El aprendiz continúa su proceso formativo en el nuevo horario sin traumatismos curriculares.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Art. de Cambio de Jornada',
    requiresCommittee: false
  }
];

// ==========================================
// RÉGIMEN DE FALTAS (ACUERDO 009 DE 2024)
// ==========================================

export const SENA_FALTAS_REGIMEN: FaltaDisciplinariaAcademica[] = [
  // Faltas Leves
  {
    id: 'falta_leve_1',
    type: 'academica',
    severity: 'leve',
    title: 'Incumplimiento esporádico de evidencias sin justificación',
    description: 'No entregar oportunamente una evidencia de aprendizaje en la fecha concertada, sin que medie causa médica o fuerza mayor, pero sin antecedentes de morosidad reiterada.',
    qualificationCriteria: [
      'Falta de premeditación o dolo.',
      'Afectación mínima del ritmo formativo del grupo.',
      'Primer incidente registrado en el trimestre formativo.'
    ],
    typicalCases: [
      'Olvidar subir un taller individual a Zajuna el domingo por la noche habiendo asistido a las sesiones.',
      'Presentar la evidencia con un día de retraso sin previo aviso al instructor.'
    ],
    associatedMeasure: 'Llamado de atención verbal reflexivo y acuerdo pedagógico de entrega extraordinaria.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Régimen de Faltas - Art. Faltas Leves Académicas'
  },
  {
    id: 'falta_leve_2',
    type: 'disciplinaria',
    severity: 'leve',
    title: 'Inobservancia leve del porte de uniforme o uso del carné',
    description: 'Ingresar al centro o taller sin portar visiblemente el carné institucional o sin el uniforme reglamentario, cuando no represente peligro inminente para la seguridad y salud en el trabajo.',
    qualificationCriteria: [
      'Conducta culposa por descuido u olvido ocasional.',
      'No genera riesgo físico a terceros ni daño material.',
      'Actitud respetuosa del aprendiz al ser reconvenido.'
    ],
    typicalCases: [
      'Olvidar el carné en casa y no solicitar el pase provisional en portería.',
      'Asistir a una clase teórica con calzado deportivo cuando el manual exigía calzado institucional cerrado.'
    ],
    associatedMeasure: 'Llamado de atención verbal y compromiso de portar el carné en todos los ambientes.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Régimen Disciplinario - Faltas Leves'
  },

  // Faltas Graves
  {
    id: 'falta_grave_1',
    type: 'academica',
    severity: 'grave',
    title: 'Incumplimiento reiterado de compromisos o planes de mejoramiento',
    description: 'No cumplir de forma injustificada con las actividades pactadas en un Plan de Mejoramiento Académico formalmente suscrito, o acumular inasistencias injustificadas que comprometan el 15% de la formación.',
    qualificationCriteria: [
      'Reiteración de la conducta tras advertencias previas.',
      'Afectación sustancial al desarrollo de las competencias profesionales.',
      'Desinterés demostrado en las oportunidades pedagógicas brindadas.'
    ],
    typicalCases: [
      'Firmar un plan de mejora por 15 días y no presentar ninguna de las tres evidencias acordadas.',
      'Faltar reiteradamente a las sesiones virtuales sincrónicas sin excusa médica válida.'
    ],
    associatedMeasure: 'Remisión formal al Comité de Evaluación y Seguimiento; recomendación de Condicionamiento de Matrícula.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Faltas Graves Académicas'
  },
  {
    id: 'falta_grave_2',
    type: 'disciplinaria',
    severity: 'grave',
    title: 'Violación reiterada de normas de SST o daño culposo de equipos',
    description: 'Negarse a usar los Elementos de Protección Personal (EPP) en talleres mecánicos, de cocina o laboratorios con riesgo biológico o químico, o manipular maquinaria sin autorización causando averías.',
    qualificationCriteria: [
      'Puesta en peligro de la integridad física propia o de compañeros.',
      'Daño patrimonial a los bienes institucionales por negligencia grave.',
      'Desacato directo a las instrucciones de seguridad industrial.'
    ],
    typicalCases: [
      'Operar un torno mecánico o sierra sin gafas protectoras tras dos advertencias del instructor de taller.',
      'Descargar software malicioso o desactivar firewalls en las salas de cómputo del centro.'
    ],
    associatedMeasure: 'Comité de Evaluación y Seguimiento: Plan de mejoramiento disciplinario o Condicionamiento de matrícula con resarcimiento de daños.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Faltas Graves Disciplinarias'
  },

  // Faltas Gravísimas
  {
    id: 'falta_gravisima_1',
    type: 'academica',
    severity: 'gravisima',
    title: 'Plagio deliberado, fraude en evaluaciones o suplantación académica',
    description: 'Copiar total o parcialmente trabajos ajenos haciéndolos pasar como propios, comprar proyectos formativos, suplantar a otro aprendiz en exámenes o usar herramientas de IA generativa para falsificar evidencias completas sin declarar la fuente.',
    qualificationCriteria: [
      'Existencia de dolo, fraude y mala fe probada.',
      'Vulneración directa de la fe pública y la ética profesional.',
      'Afectación al prestigio institucional y a los derechos de autor.'
    ],
    typicalCases: [
      'Presentar el código fuente de un software comercial o de otro compañero cambiándole únicamente el autor en la carátula.',
      'Pagar a un tercero para que realice las pruebas y exámenes en la plataforma Zajuna.'
    ],
    associatedMeasure: 'Comité de Evaluación y Seguimiento: Cancelación Definitiva de Matrícula con inhabilidad de 6 meses a 2 años.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Faltas Gravísimas Académicas'
  },
  {
    id: 'falta_gravisima_2',
    type: 'disciplinaria',
    severity: 'gravisima',
    title: 'Agresión física o verbal, porte de armas, hurto o estupefacientes',
    description: 'Cometer actos violentos contra compañeros, instructores o personal, portar cualquier tipo de arma de fuego o cortopunzante, ingresar bajo efectos o comercializar sustancias psicoactivas dentro del centro o en plataformas virtuales.',
    qualificationCriteria: [
      'Comisión de delitos tipificados en el Código Penal colombiano.',
      'Violación flagrante de la dignidad y la vida de la comunidad educativa.',
      'Imposibilidad de mantener la convivencia armónica pacífica.'
    ],
    typicalCases: [
      'Agredir físicamente a un compañero o instructor durante un desacuerdo en el ambiente de aprendizaje.',
      'Ingresar bebidas alcohólicas o sustancias estupefacientes al centro de formación.',
      'Sustraer elementos de valor, herramientas o equipos del centro o de compañeros.'
    ],
    associatedMeasure: 'Comité de Evaluación y Seguimiento inmediato: Cancelación de Matrícula e inhabilidad máxima de dos (2) años, más denuncia penal si aplica.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Faltas Gravísimas Disciplinarias'
  }
];

// ==========================================
// MEDIDAS FORMATIVAS Y SANCIONATORIAS (ACUERDO 009 DE 2024)
// ==========================================

export const SENA_MEDIDAS_CATALOGO: MedidaFormativaDisciplinaria[] = [
  {
    id: 'medida_verbal',
    category: 'formativa',
    name: 'Llamado de Atención Verbal Reflexivo',
    authority: 'Instructor de la competencia o Coordinador Académico',
    definition: 'Intervención pedagógica personal y directa entre el instructor y el aprendiz, orientada a generar reflexión sobre la conducta inadecuada o el atraso académico y buscar correctivos inmediatos.',
    executionTerm: 'Inmediato (se deja constancia en el anecdotario pedagógico).',
    legalEffects: [
      'No genera antecedentes disciplinarios en el registro de SofíaPlus.',
      'Permite acordar compromisos pedagógicos directos sin convocar a comités.',
      'Sirve de referente preventivo para evitar escalamientos.'
    ],
    restorativeApproach: 'Enfoque restaurativo de diálogo y reconocimiento del error sin estigmatizar al aprendiz.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Art. Medidas Formativas - Llamado Verbal'
  },
  {
    id: 'medida_escrito_plan',
    category: 'formativa',
    name: 'Llamado de Atención Escrito con Plan de Mejoramiento',
    authority: 'Instructor con aprobación de la Coordinación Académica',
    definition: 'Comunicación formal dirigida al aprendiz donde se especifica con claridad la falta leve o dificultad académica, acompañada de la firma obligatoria de un Plan de Mejoramiento con metas concretas y verificables.',
    executionTerm: 'Plazo concertado no mayor a treinta (30) días calendario para la ejecución y evaluación del plan.',
    legalEffects: [
      'Se archiva en la carpeta del aprendiz como antecedente pedagógico formativo.',
      'El cumplimiento satisfactorio del plan extingue la falta y restablece la normalidad.',
      'El incumplimiento injustificado del plan eleva automáticamente el caso a falta grave y remisión al Comité.'
    ],
    restorativeApproach: 'El plan de mejora define metas específicas de nivelación técnica o acciones pedagógicas de reparación comunitaria.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Art. Plan de Mejoramiento Pedagógico'
  },
  {
    id: 'medida_condicionamiento',
    category: 'sancionatoria',
    name: 'Condicionamiento de Matrícula',
    authority: 'Subdirector de Centro de Formación (mediante Resolución Motivada)',
    definition: 'Sanción disciplinaria formal impuesta cuando el aprendiz comete una falta grave o incumple un plan de mejoramiento previo. El aprendiz continúa sus estudios pero queda bajo estricto periodo de prueba disciplinaria y académica.',
    executionTerm: 'Durante el periodo formativo que determine la resolución (generalmente un trimestre o hasta finalizar el ciclo).',
    legalEffects: [
      'Pérdida temporal de beneficios institucionales (apoyos de sostenimiento, monitorías o representación).',
      'Firma de un acta de compromiso indeclinable ante la Coordinación Académica.',
      'Cualquier nueva falta durante la vigencia del condicionamiento causará la cancelación inmediata de matrícula.'
    ],
    restorativeApproach: 'Mantiene al aprendiz dentro del sistema educativo brindándole una última oportunidad tutelada de corrección.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Art. de Sanciones - Condicionamiento de Matrícula'
  },
  {
    id: 'medida_cancelacion',
    category: 'sancionatoria',
    name: 'Cancelación de Matrícula',
    authority: 'Subdirector de Centro de Formación (mediante Resolución Motivada sujeta a Recursos)',
    definition: 'Máxima sanción disciplinaria que implica la desvinculación definitiva del aprendiz del SENA debido a faltas gravísimas o por reiteración de faltas graves en estado de condicionamiento.',
    executionTerm: 'Inmediata a la firmeza del acto administrativo, con inhabilidad de seis (6) meses a dos (2) años.',
    legalEffects: [
      'Pérdida total e irrevocable de la condición de aprendiz SENA en el programa cursado.',
      'Imposición de inhabilidad nacional en el sistema SofiaPlus para inscribirse a cualquier programa del SENA.',
      'Anotación formal en el registro histórico y terminación anticipada de contratos de aprendizaje.'
    ],
    restorativeApproach: 'Medida extrema de última ratio para salvaguardar la integridad de la comunidad educativa y el orden institucional.',
    articleAcuerdo009: 'Acuerdo 009 de 2024, Art. de Sanciones - Cancelación de Matrícula'
  }
];

// ==========================================
// COMITÉ DE EVALUACIÓN Y SEGUIMIENTO (ACUERDO 009 DE 2024)
// ==========================================

export const SENA_COMITE_MIEMBROS: ComiteMiembro[] = [
  {
    id: 'subdirector_delegado',
    title: 'Subdirector de Centro o su Delegado',
    roleDescription: 'Preside la sesión colegiada del comité, modera el debate y posteriormente adopta la decisión sancionatoria mediante resolución motivada.',
    voteRight: 'Voz y Voto',
    importance: 'Garante de la legalidad institucional y de las políticas del Centro de Formación.'
  },
  {
    id: 'coordinador_academico',
    title: 'Coordinador Académico',
    roleDescription: 'Presenta el consolidado del estado académico del aprendiz, planes de mejora suscritos y antecedentes formativos de la ficha.',
    voteRight: 'Voz y Voto',
    importance: 'Aporta la perspectiva técnica pedagógica y el rigor curricular.'
  },
  {
    id: 'coordinador_bienestar',
    title: 'Coordinador de Formación / Bienestar al Aprendiz',
    roleDescription: 'Analiza el contexto socioeconómico, familiar y psicosocial del aprendiz para determinar atenuantes y rutas de acompañamiento.',
    voteRight: 'Voz y Voto',
    importance: 'Vela por el enfoque biopsicosocial y las garantías fundamentales del aprendiz.'
  },
  {
    id: 'instructor_vocero',
    title: 'Instructor Vocero de la Ficha o Instructor Quejoso',
    roleDescription: 'Expone con claridad las evidencias del caso, los llamados de atención verbales/escritos previos y el resultado del seguimiento pedagógico.',
    voteRight: 'Voz y Voto',
    importance: 'Testigo directo de los hechos y del desempeño en el ambiente de aprendizaje.'
  },
  {
    id: 'aprendiz_representante',
    title: 'Aprendiz Representante de Centro o Vocero de Ficha',
    roleDescription: 'Representa a la comunidad estudiantil, ejerce veeduría del debido proceso y aporta la visión de los aprendices en la deliberación.',
    voteRight: 'Voz y Voto',
    importance: 'Garantía democrática de participación estudiantil en los órganos de gobierno escolar.'
  },
  {
    id: 'profesional_psicosocial',
    title: 'Profesional de Bienestar (Psicólogo / Trabajador Social)',
    roleDescription: 'Brinda asesoría técnica especializada sobre aspectos emocionales, de inclusión o salud mental que puedan estar incidiendo en la conducta.',
    voteRight: 'Solo Voz (Consultivo)',
    importance: 'Asegura que las decisiones no ignoren situaciones de vulnerabilidad o discapacidad.'
  }
];

export const SENA_COMITE_ETAPAS: ComiteEtapa[] = [
  {
    step: 1,
    phaseName: 'Radicación de Queja o Informe Motivado',
    responsibleActor: 'Instructor, Coordinador o Miembro de la Comunidad SENA',
    legalTimeLimit: 'Dentro de los 5 días hábiles siguientes al conocimiento de los hechos',
    summary: 'Se presenta el informe formal con las evidencias objetivas y soportes que sustentan la presunta falta académica o disciplinaria.',
    detailedProcess: [
      'Redacción detallada de las circunstancias de tiempo, modo y lugar de los hechos.',
      'Anexar copia de evidencias técnicas, testimonios, pantallazos de Zajuna o informes de laboratorio.',
      'Verificar si se agotaron previamente las medidas formativas y el plan de mejoramiento pedagógico.'
    ],
    guaranteesForApprentice: [
      'Prohibición expresa de quejas anónimas o sin soporte probatorio objetivo.',
      'Presunción de inocencia mientras no se demuestre la responsabilidad con pruebas idóneas.'
    ]
  },
  {
    step: 2,
    phaseName: 'Citación Oficial y Traslado de Cargos',
    responsibleActor: 'Secretaría Técnica del Comité de Evaluación y Seguimiento',
    legalTimeLimit: 'Mínimo CINCO (5) DÍAS HÁBILES de antelación a la fecha de la sesión',
    summary: 'Se notifica formalmente al aprendiz comunicándole con precisión los hechos imputados y entregándole copia de todas las pruebas.',
    detailedProcess: [
      'Envío de la comunicación formal al correo @misena.edu.co y entrega física con acuse de recibo.',
      'Indicación explícita del día, hora y lugar (o enlace virtual) donde sesionará el Comité.',
      'Puesta a disposición del expediente completo para que el aprendiz pueda revisarlo antes de la audiencia.'
    ],
    guaranteesForApprentice: [
      'Derecho a contar con tiempo razonable (mínimo 5 días hábiles) para preparar su defensa.',
      'Derecho a conocer de manera transparente e integral todas las pruebas en su contra.'
    ]
  },
  {
    step: 3,
    phaseName: 'Audiencia de Descargos y Práctica de Pruebas',
    responsibleActor: 'Comité de Evaluación y Aprendiz (con o sin acudiente/asesor)',
    legalTimeLimit: 'Día y hora señalados en la citación oficial',
    summary: 'El aprendiz ejerce plenamente su derecho constitucional a la defensa, es escuchado con respeto y aporta sus pruebas o testigos.',
    detailedProcess: [
      'Instalación del comité y verificación del quórum reglamentario.',
      'Lectura de los cargos formulados en el informe motivado.',
      'Uso de la palabra por parte del aprendiz para presentar sus descargos verbales o escritos.',
      'Aporte y recepción de pruebas de descargo (documentos médicos, testimonios de compañeros, bitácoras).'
    ],
    guaranteesForApprentice: [
      'Derecho a ser escuchado sin interrupciones hostiles ni prejuzgamiento.',
      'Derecho a ser asistido por su acudiente (si es menor de edad) o por un representante de su confianza.',
      'Derecho a controvertir las pruebas aportadas por los quejosos.'
    ]
  },
  {
    step: 4,
    phaseName: 'Deliberación y Recomendación Motivada',
    responsibleActor: 'Miembros con voto del Comité de Evaluación y Seguimiento',
    legalTimeLimit: 'Dentro de la misma sesión o máximo en los 3 días hábiles siguientes',
    summary: 'El comité evalúa colegiadamente las pruebas, analiza atenuantes y agravantes, y emite un acta con la recomendación pedagógica o sancionatoria.',
    detailedProcess: [
      'Valoración integral de las pruebas bajo las reglas de la sana crítica.',
      'Análisis de la intencionalidad, reiteración, historial de calificaciones y contexto personal.',
      'Votación formal de los miembros con derecho a voto.',
      'Elaboración del Acta Oficial del Comité con los fundamentos de la recomendación dirigida al Subdirector.'
    ],
    guaranteesForApprentice: [
      'Decisión colegiada e imparcial, no unipersonal.',
      'Obligación de motivar jurídicamente y pedagógicamente cada recomendación formulada.'
    ]
  },
  {
    step: 5,
    phaseName: 'Expedición de Acto Administrativo',
    responsibleActor: 'Subdirector de Centro de Formación',
    legalTimeLimit: 'Dentro de los CINCO (5) DÍAS HÁBILES siguientes al recibo del acta',
    summary: 'El Subdirector expide la Resolución motivada que decide el caso: archivo, medida formativa, condicionamiento o cancelación de matrícula.',
    detailedProcess: [
      'Revisión del expediente y del acta de recomendación por parte de la Subdirección y su equipo jurídico.',
      'Emisión de la Resolución Administrativa formal motivada en las normas del Acuerdo 009 de 2024.',
      'Notificación personal o por correo electrónico institucional al aprendiz, con copia al acudiente si es menor.'
    ],
    guaranteesForApprentice: [
      'La resolución debe indicar taxativamente los recursos que proceden contra ella y el plazo para interponerlos.',
      'Certeza jurídica sobre la situación académica y formativa del aprendiz.'
    ]
  },
  {
    step: 6,
    phaseName: 'Garantía del Recurso de Reposición',
    responsibleActor: 'Aprendiz y Subdirector de Centro',
    legalTimeLimit: 'CINCO (5) DÍAS HÁBILES contados a partir de la notificación personal',
    summary: 'Si el aprendiz no está conforme con la sanción, tiene derecho legal a interponer Recurso de Reposición para que el Subdirector revise la decisión.',
    detailedProcess: [
      'Redacción y radicación del escrito de impugnación expresando las razones de inconformidad.',
      'El recurso se resuelve de fondo por el Subdirector dentro de los plazos de ley.',
      'La sanción NO queda en firme hasta que el recurso haya sido formalmente resuelto.'
    ],
    guaranteesForApprentice: [
      'Doble examen de la decisión con efecto suspensivo de la sanción durante el trámite del recurso.',
      'Cierre formal del debido proceso con plenas garantías constitucionales del Art. 29 de la Carta Política.'
    ]
  }
];

