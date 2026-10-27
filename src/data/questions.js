export const questions = [
  {
    id: 1,
    category: "Fundamentos de MongoDB",
    type: "multiple",
    question: "¿Cuál de las siguientes afirmaciones describe mejor a MongoDB?",
    options: [
      "Es una base de datos relacional basada en tablas y filas",
      "Es una base de datos NoSQL orientada a documentos",
      "Es exclusivamente una base de datos en memoria",
      "Requiere obligatoriamente un esquema rígido para todos los documentos"
    ],
    answer: 1,
    explanation: "MongoDB es una base de datos NoSQL orientada a documentos. Almacena la información en documentos JSON-like (BSON), lo que da flexibilidad frente a las tablas relacionales."
  },
  {
    id: 2,
    category: "Fundamentos de MongoDB",
    type: "multiple",
    question: "¿Qué significa BSON en MongoDB?",
    options: [
      "Binary Script Object Notation",
      "Binary JSON",
      "Basic Structured Object Notation",
      "Binary Serialized Object Network"
    ],
    answer: 1,
    explanation: "BSON (Binary JSON) es una representación binaria de documentos JSON que extiende los tipos de datos (ObjectId, Date, Binary, Decimal128, etc.) para un almacenamiento más eficiente."
  },
  {
    id: 3,
    category: "Fundamentos de MongoDB",
    type: "truefalse",
    question: "Verdadero o Falso: Todos los documentos de una colección DEBEN tener exactamente los mismos campos.",
    options: ["Verdadero", "Falso"],
    answer: 1,
    explanation: "Falso. MongoDB es schemaless a nivel de colección: cada documento puede tener campos distintos, aunque por buena práctica se mantiene consistencia con Mongoose."
  },
  {
    id: 4,
    category: "Fundamentos de MongoDB",
    type: "multiple",
    question: "¿Cómo se llama el identificador único autogenerado por defecto en un documento?",
    options: ["_uuid", "_key", "_id", "_primary"],
    answer: 2,
    explanation: "MongoDB crea automáticamente un campo _id de tipo ObjectId si no se especifica uno. Contiene timestamp, máquina, proceso y contador."
  },
  {
    id: 5,
    category: "Mongoose Core & ODM",
    type: "multiple",
    question: "¿Qué es Mongoose?",
    options: [
      "Un driver nativo de MongoDB escrito en C++",
      "Un ODM (Object Document Mapper) para Node.js que permite modelar datos con esquemas",
      "Un sistema de autenticación para MongoDB",
      "Un cliente gráfico para MongoDB Atlas"
    ],
    answer: 1,
    explanation: "Mongoose es un ODM: mapea objetos JavaScript a documentos BSON y aporta esquemas, validaciones, middlewares, virtuals y helpers."
  },
  {
    id: 6,
    category: "Mongoose Core & ODM",
    type: "multiple",
    question: "¿Cuál es la función principal de un Schema en Mongoose?",
    options: [
      "Definir la estructura, tipos, validaciones y comportamientos del documento",
      "Crear índices automáticamente en el servidor",
      "Conectar a múltiples clusters al mismo tiempo",
      "Generar el _id manualmente"
    ],
    answer: 0,
    explanation: "El Schema define el contrato de datos: campos, tipos, valores por defecto, required, enum y validadores personalizados."
  },
  {
    id: 7,
    category: "Mongoose Core & ODM",
    type: "multiple",
    question: "¿Qué método compila un Schema en un Model?",
    options: [
      "mongoose.define()",
      "mongoose.model('Nombre', schema)",
      "mongoose.schemaToModel()",
      "new Schema.model()"
    ],
    answer: 1,
    explanation: "mongoose.model() compila el Schema en un Model, el constructor con el que se hacen consultas, inserciones, actualizaciones y borrados."
  },
  {
    id: 8,
    category: "Mongoose Core & ODM",
    type: "truefalse",
    question: "Verdadero o Falso: Por convención, Mongoose pluraliza el nombre del modelo para inferir la colección (User → users).",
    options: ["Verdadero", "Falso"],
    answer: 0,
    explanation: "Verdadero. Mongoose pluraliza y pasa a minúsculas el nombre del modelo. Se puede sobreescribir con el tercer parámetro de mongoose.model()."
  },
  {
    id: 9,
    category: "CRUD y Validaciones",
    type: "multiple",
    question: "¿Cuál de los siguientes métodos es el más adecuado para actualizar un documento y obtener el documento ACTUALIZADO?",
    options: [
      "Model.updateOne()",
      "Model.replaceOne()",
      "Model.findByIdAndUpdate(id, update, { new: true })",
      "Model.updateMany()"
    ],
    answer: 2,
    explanation: "Con { new: true }, findByIdAndUpdate retorna el documento ya modificado. Sin new:true devuelve el documento anterior a la actualización."
  },
  {
    id: 10,
    category: "CRUD y Validaciones",
    type: "truefalse",
    question: "Verdadero o Falso: Al usar findByIdAndUpdate, las validaciones del Schema NO se ejecutan a menos que se especifique { runValidators: true }.",
    options: ["Verdadero", "Falso"],
    answer: 0,
    explanation: "Verdadero. Las actualizaciones directas omiten las validaciones por defecto. Para aplicarlas hay que agregar runValidators: true."
  },
  {
    id: 11,
    category: "CRUD y Validaciones",
    type: "multiple",
    question: "¿Qué hace Model.findByIdAndDelete(id)?",
    options: [
      "Solo marca el documento como eliminado",
      "Busca por _id, lo elimina y retorna el documento eliminado",
      "Elimina toda la colección",
      "Crea una copia de seguridad antes de borrar"
    ],
    answer: 1,
    explanation: "findByIdAndDelete encuentra el documento por _id, lo borra de la colección y retorna ese documento (o null si no existe)."
  },
  {
    id: 12,
    category: "Relaciones y .populate()",
    type: "multiple",
    question: "En un Schema, ¿cómo se indica que un campo hace referencia a otro modelo?",
    options: [
      "type: String, foreign: true",
      "type: Schema.Types.ObjectId, ref: 'User'",
      "type: Reference, model: User",
      "type: Link, target: 'User'"
    ],
    answer: 1,
    explanation: "Se declara type: mongoose.Schema.Types.ObjectId y ref apuntando al nombre del Model con el que se desea relacionar."
  },
  {
    id: 13,
    category: "Relaciones y .populate()",
    type: "multiple",
    question: "¿Qué función cumple .populate() en una consulta Mongoose?",
    options: [
      "Elimina documentos duplicados",
      "Reemplaza los ObjectId referenciados por los documentos completos de la colección referenciada",
      "Ordena los resultados alfabéticamente",
      "Convierte el array a string"
    ],
    answer: 1,
    explanation: ".populate() hace un 'join' a nivel de aplicación: busca los documentos referenciados por _id en la colección indicada por ref e inyecta en la ruta especificada."
  },
  {
    id: 14,
    category: "Relaciones y .populate()",
    type: "multiple",
    question: "¿Cuál es un caso IDEAL para DOCUMENTOS EMBEBIDOS en lugar de referencias?",
    options: [
      "Comentarios que pueden tener miles de autores distintos y crecer sin límite",
      "Dirección de envío que siempre pertenece al pedido y se consulta junto a él",
      "Lista de seguidores con millones de registros",
      "Productos referenciados por miles de carritos"
    ],
    answer: 1,
    explanation: "Embedding es ideal para relaciones 1:1 o 1:pocos con fuerte pertenencia y lectura conjunta. Para colecciones masivas o compartidas conviene referencing + populate."
  },
  {
    id: 15,
    category: "Relaciones y .populate()",
    type: "truefalse",
    question: "Verdadero o Falso: Usar .populate() siempre es más eficiente que cualquier otra estrategia y elimina la necesidad de modelar los datos.",
    options: ["Verdadero", "Falso"],
    answer: 1,
    explanation: "Falso. .populate() genera consultas adicionales; un mal uso causa el clásico 'N+1 queries'. Hay que elegir entre embedding vs referencing según el patrón de lectura/escritura."
  }
]
