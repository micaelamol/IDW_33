# IDW_33
Repositorio para la clase IDW

## Integrantes del grupo 33
- Carlos Aníbal Gabrovich  
- Enzo Sebastián Guido  
- Vanesa Micaela Molina  
- Paola Peñalva Rebaque
## Descripción
Primer avance del trabajo práctico final integrador de IDW.

## Estructura del sitio
El sitio está compuesto por las siguientes páginas:

- index.html: Página de inicio o portada con bienvenida y acceso a turnos  
- institucional.html: Información sobre la institución y sus valores  
- contacto.html: Formulario y datos de contacto  
- Carpetas:
  - estilos/: Archivos CSS organizados por sección  
  - imagenes/: Recursos visuales como el logotipo.

## Estilo visual aplicado
Se definió un diseño profesional, con las siguientes características:

- Paleta de colores: cálida y profesional (tonos verde claro , naranjas y grises)  
- Tipografías legibles: Montserrat y Open Sans  
- Botones: para solicitar turnos  
- Footer informativo: dirección, contacto e Instagram


## Trabajo colaborativo

El desarrollo se realizó en equipo

- Uso de GitHub para sincronizar cambios 
- Correcciones visuales y semánticas aplicadas en conjunto  
- Organización de carpetas y archivos  

## TP2: 2da ETAPA TRABAJO FINAL INTEGRADOR 
Qué se hizo:

-Navbar responsiva:
-Incluye todas las secciones del sitio y funciona correctamente en computadoras y dispositivos -móviles gracias al menú hamburguesa.

Portada atractiva:
-Con imagen de fondo, mensaje de bienvenida y botón para solicitar turnos.

Obras sociales:
- En cada obra social se utilizó clases de Bootstrap para construir una estructura responsiva

Catálogo del equipo médico:
-Cada profesional tiene su propia tarjeta (card) con foto, nombre y especialidad. Las cards -están organizadas en una grilla responsive que se adapta a celulares, tablets y computadoras.

Modo oscuro:
Los usuarios pueden alternar entre modo claro y oscuro con un botón flotante.

Footer:
Contiene información de contacto, dirección, teléfono, email e Instagram del centro.

Tecnologías utilizadas
-HTML5 y CSS3.
-Bootstrap 5 para grillas, cards, navbar y responsividad

## TP2: 3er ETAPA TRABAJO FINAL INTEGRADOR 

- Las cards del staff fueron pasadas a una constante en staff.js para ser cargadas dinamicamente en index.htm desde el archivo inicio.js

- Se realizo un login para el ingreso al area de administracion, utiliza un archivo config.js para almacenar los usuarios y contraseñas habilitadas, establece una variable en sesionstorage para el control de sesion

- El acceso no autorizado esta bloqueado en admin.html, este maneja el abm de medicos, especialidades y obra social a traves de los archivos javascript correspondientes almacenando en localstorage los cambios

- El area de reservas y turnos esta aun en desarrollo