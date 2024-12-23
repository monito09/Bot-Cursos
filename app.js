const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Flujo Principal
const flujoPrincipal = addKeyword(['hola', 'inicio', 'menú', 'menu', 'volver'])
    .addAnswer('👋 ¡Hola! Bienvenido al asistente virtual de CAT Perú.')
    .addAnswer([
        '¿En qué puedo ayudarte hoy?',
        '1️⃣ Información sobre *cursos* 📚',
        '2️⃣ Contáctanos para más *información* 📞',
        '3️⃣ Preguntas *frecuentes* ❓',
    ])
    .addAnswer('Responde con el número de la opción que desees.');

// Flujo de Cursos
const flujoCursos = addKeyword(['1', 'informacion de cursos'])
    .addAnswer('📚 Ofrecemos los siguientes tipos de cursos:')
    .addAnswer(['1️⃣ *Preuniversitarios*', '2️⃣ *Profesionales*'])
    .addAnswer('Escribe *"Cursos pre"* o *"Cursos pro"* para obtener informacion sobre los cursos, de lo contrario escribe *"menu"* para regresar.');

const flujoPreuniversitarios = addKeyword(['Cursospre', 'Cursos pre', 'cursos pre', 'Cursos Pre', 'cursospre','CURSOS PRE', 'CURSOSPRE'])
    .addAnswer('🎓 Cursos Preuniversitarios:')
    .addAnswer([
        '- *Matemáticas* 🧮',
        '- *Economía* 💲',
        '- *Historia* 📜',
        '- *Desarrollo Personal* 🙋',
        '- *Inglés* 🇺🇸',
        '- *Química* 🧪',
    ])
    .addAnswer('Si deseas información sobre algún curso en particular puedes visitar nuestra paginaweb: https://cat-peru.com/course/')
    .addAnswer('Aca podrás encontrar la informacion para cada curso y también poder inscribirte para poder alimentar tu conocimiento hacia tu ingreso a la universidad.')
    .addAnswer('Escribe *"menu"* para regresar.');

const flujoProfesionales = addKeyword(['Cursospro', 'Cursos pro', 'cursos pro', 'Cursos Pro', 'cursospro','CURSOS PRO', 'CURSOSPRO'])
    .addAnswer('💼 Cursos Profesionales:')
    .addAnswer([
        '- *Networking* 👾',
        '- *Cybersecurity* 🕵️‍♀️',
        '- *IT y SO* 💻',
        '- *Data Science* 📊',
        '- *Programación* ⌨️',
    ])
    .addAnswer('Si deseas información sobre algún curso en particular puedes visitar nuestra paginaweb: https://cat-peru.com/home/courses.php')
    .addAnswer('Aca podrás encontrar la información para aumentar tu conocimiento y elevar tu status profesional.')
    .addAnswer('Escribe *"menu"* para regresar.');

// Flujo de Contacto
const flujoContacto = addKeyword(['2', 'contacto', 'hablar con personal'])
    .addAnswer('📞 Información de Contacto:')
    .addAnswer([
        '✅ *Teléfono*: +51 956 335 265',
        '✅ *Email*: acatdemy@cat-peru.com',
        '✅ *Instagram*: https://www.instagram.com/acatdemy3/',
        '✅ *Facebook*: https://www.facebook.com/cat.trujillo.edu',
    ])
    .addAnswer('Escribe *"menu"* para regresar.');

// Flujo de Preguntas Frecuentes
const flujoFAQ = addKeyword(['3', 'faq', 'preguntas'])
    .addAnswer('❓ *Preguntas Frecuentes:*')
    .addAnswer(['🅰 *¿Los cursos tienen certificación?*', '🅱 *¿Cuáles son los métodos de pago?*'])
    .addAnswer('Escribe la letra: *A* o *B* para más detalles o *"menu"* para regresar.');

const flujoCertificacion = addKeyword(['b', 'B', 'certificacion'])
    .addAnswer('🎓 Sí, todos nuestros cursos incluyen certificación oficial al finalizar. 🎉')
    .addAnswer('Escribe *"menu"* para regresar.');

const flujoPagos = addKeyword(['a', 'A', 'pago', 'pagos'])
    .addAnswer('💳 Métodos de Pago:')
    .addAnswer(['Aceptamos Yape a nombre de *Centro de Altas Tecnologías E.I.R.L.*.'])
    .addAnswer('Escribe *"menu"* para regresar.');

// Integrar todos los flujos
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterProvider = createProvider(BaileysProvider);

    const adapterFlow = createFlow([
        flujoPrincipal,
        flujoCursos,
        flujoPreuniversitarios,
        flujoProfesionales,
        flujoContacto,
        flujoFAQ,
        flujoCertificacion,
        flujoPagos,
    ]);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });


};

QRPortalWeb()

main()
