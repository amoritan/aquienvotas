# ![](https://s3-sa-east-1.amazonaws.com/assets.aquienvotas.com/icon-36.svg) AQuienVotas 
> Web Application | [Application Programming Interface (API)](https://github.com/andresmoritan/aquienvotas-api "API de AQuienVotas en GitHub")

![Travis (.com)](https://img.shields.io/travis/com/andresmoritan/aquienvotas.svg) ![Website](https://img.shields.io/website/https/aquienvotas.com.svg) ![GitHub](https://img.shields.io/github/license/andresmoritan/aquienvotas.svg)

**AQuienVotas** es una plataforma web para generar estadísticas de intención de voto y opinión a través de encuestas transparentes y representativas.

La versión del proyecto publicada en [www.aquienvotas.com](https://www.aquienvotas.com "AQuienVotas") tiene como objetivo representar la opinión de la población de cara a las elecciones ejecutivas del año 2019 en Argentina a través distintas encuestas sobre la intención de voto y la opinión de los visitantes frente temas de debate público en el país. 

Los resultados obtenidos son ponderados y expuestos en tiempo real. Apuntamos a colaborar, con datos de calidad, en el debate público mediante el desarrollo de una herramienta neutral, transparente y accesible.

### Acerca del equipo
Somos cuatro argentinos con interés en política, estadística y tecnología. Nuestro objetivo es construir una herramienta neutral y representativa para producir un set de datos público de calidad con valores anónimos de opinión, orientación política y segmentación.

- **[@andresmoritan](https://twitter.com/andresmoritan "Twitter de Andres Moritan")  (Desarrollo)**: Es programador, creó y mantiene la plataforma; Diseña e implementa la arquitectura y las interfaces.
- **[@ineslovisolo](https://twitter.com/ineslovisolo "Twitter de Ines Lovisolo") (Análisis)**: Es politóloga especialista en opinión pública, maneja los análisis políticos y asegura la validez estadística los resultados.
- **[@andreskloster](https://twitter.com/AndresKloster "Twitter de Andres Kloster") (Difusión)**: Es especialista en posicionamiento web, se encarga de comunicar y difundir el proyecto.
- **[@lapaulaalcala](https://twitter.com/lapaulaalcala "Twitter de Paula Alcala") (Estrategia)**: Es licenciada en ciencias de la educación, define la experiencia de la aplicación, el contenido y la estrategia del proyecto.

---- 

## Acerca de la tecnología

**AQuienVotas** es desarrollando como **software libre** bajo la licencia _GNU Affero General Public License (AGPL)_ con el objetivo de fomentar la transparencia y la colaboración dentro del proyecto.

**Aquellos/as que tengan interés en formar parte del proyecto, son bienvenidos/as a brindar su aporte al desarrollo de esta apasionante herramienta.**

Quienes residan -y voten- fuera de Argentina y tengan interés en utilizar la herramienta en su país, también son bienvenidos/as a ponerse en contacto para poder brindarles apoyo en la implementación.

> El presente código fuente y las instrucciones que se detallan a continuación corresponden a la _Web Application_ del proyecto. Para conocer y/o colaborar con la _Application Programming Interface (API)_ de **AQuienVotas** debes visitar [este repositorio](https://github.com/andresmoritan/aquienvotas-api "AQuienVotas (Application Programming Interface) en GitHub").

### Acerca del stack

El front-end de la plataforma se encuentra desarrollado utilizando la librería [React](https://github.com/facebook/react/ "React") _(v 16.7.0)_ junto con [Redux](https://www.github.com/reduxjs/redux "Redux") _(v 4.0.1)_ para administrar estados compartidos, [styled-components](https://github.com/styled-components/styled-components "styled-components") _(v 4.1.3)_ para generar estilos y [axios](https://github.com/axios/axios "axios") _(v 0.18.0)_ como cliente HTTP.

### Para colaborar

Hacer un fork del repositorio y clonarlo en tu equipo.

```bash
git clone https://github.com/YOUR-USER-NAME/aquienvotas.git
cd aquienvotas
```

Configurar tus variables de entorno en un archivo `.env` en el directorio raíz del proyecto.

```bash
#.env.local
REACT_APP_SERVER_URI='http://YOUR-IP:3000'
REACT_APP_FB_APP_ID=YOUR_FB_APP_ID
REACT_APP_ANALYTICS_ID=YOUR_ANALYTICS_ID
```

Instalar las dependencias. _Requiere tener instalado previamente Node (v 10.15.0)_

```bash
npm install
```

Ejecuta el cliente de forma local.

```bash
npm run start
```

A partir de aquí podrás hacer tu magia y generar un Pull Request en el repositorio principal cuando estés listo/a para hacer público tu trabajo.

---- 

AQuienVotas
Copyright (C) 2015-2019 Andres Moritan

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).
