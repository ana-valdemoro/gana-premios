## Contenido
Este proyecto consta de dos carpetas principales Back y Front, que se correponden cada una con las dos partes en las que se divide el mismo.
## Requisitos no funcionales
### Front
• React  
• Formik  
• [Material-UI](https://mui.com/)  
• React-query  
• React-redux  
• redux-persist  
• i18next

### Back
• JavaScript   
• NodeJS con Express  
• MongoDB   
• Mongoose
• Docker  
• i18n    • Mailtrap

## Instalación y ejecución
**Primero:** se clona el repositorio con `git clone https://github.com/ana-valdemoro/gana-premios.git`  
**Segundo:** entramos en la siguiente ruta de carpetas Front/code y ejecutamos `npm install`. Despues ejecutamos `npm start` para iniciar la parte de Front.  
**Tercero:** entramos en la ruta de carpetas Back/code/docker, ejecutamos el archivo `build-docker-compose` y después para iniciar y parar los contenedores de docker utilizamos los scripts de `start-docker-compose` y `stop-docker-compose`

## Notas
Este proyecto esta aún en desarrollo, por lo que es posible que funcionalidades como el envio de emails, que están ligadas a mailtrap, o quizas la conexión con la base de datos en mongoAtlas fallé.


