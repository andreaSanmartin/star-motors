# [Star Motors](https://demos.creative-tim.com/light-bootstrap-dashboard-angular2/dashboard)
[![version][version-badge]][CHANGELOG] ![license][license-badge]

![alt text](src/assets/img/opt_lbd_angular_thumbnail.jpg)

**[StarMotors Dashboard Angular](https://demos.creative-tim.com/light-bootstrap-dashboard-angular2/dashboard)** is an admin dashboard template designed to be beautiful and simple. It is built on top of Bootstrap 3, using [StarMotors Dashboard](https://www.creative-tim.com/product/light-bootstrap-dashboard) and it is fully responsive. It comes with a big collections of elements that will offer you multiple possibilities to create the app that best fits your needs. It can be used to create admin panels, project management systems, web applications backend, CMS or CRM.

The product represents a big suite of front-end developer tools that can help you jump start your project. We have created it thinking about things you actually need in a dashboard. StarMotors Dashboard Angular 2 contains multiple handpicked and optimized plugins. Everything is designed to fit with one another. As you will be able to see, the dashboard you can access on Creative Tim is a customization of this product.

It comes with 6 filter colors for the sidebar (“black”, “azure”,”green”,”orange”,”red”,”purple”) and an option to have a background image.

Special thanks go to: Robert McIntosh for the notification system Chartist for the wonderful charts We are very excited to share this dashboard with you and we look forward to hearing your feedback!

## Links:

+ [Live Preview](https://demos.creative-tim.com/light-bootstrap-dashboard-angular2/dashboard)
+ [StarMotors Dashboard PRO Angular](https://www.creative-tim.com/product/light-bootstrap-dashboard-pro-angular2/?ref=lbd-angular-github) ($49)

## Quick Start:

Quick start options:

+ [Download from Github](https://github.com/creativetimofficial/light-bootstrap-dashboard-angular2/archive/master.zip).
+ [Download from Creative Tim](https://www.creative-tim.com/product/light-bootstrap-dashboard-angular2).
+ Clone the repo: `git clone https://github.com/creativetimofficial/light-bootstrap-dashboard-angular2.git`.

## Terminal Commands

1. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
2. Open Terminal
3. Go to your file project
4. Run in terminal: ```npm install -g @angular/cli```
5. Install Dependence: ```ng add @angular/fire  --save```
5. Then: ```npm install```
6. And: ```ng serve```
7. Navigate to `http://localhost:4200/`

### What's included

Within the download you'll find the following directories and files:
```
light-bootstrap-dashboard-angular
├── CHANGELOG.md
├── LICENSE.md
├── README.md
├── angular.json
├── documentation
│   ├── css
│   └── tutorial-lbd-angular2.html
├── e2e
├── karma.conf.js
├── package-lock.json
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.routing.ts
│   │   ├── comercializadora
│   │   │   ├── pila-dodumento.component.css
│   │   │   ├── pila-dodumento.html
│   │   │   ├── pila-dodumento.spec.ts
│   │   │   └── pila-dodumento.ts
│   │   ├── comercializadora_DocumentoRevision
│   │   │   ├── documentos-revision.component.css
│   │   │   ├── documentos-revision.component.html
│   │   │   ├── documentos-revision.component.spec.ts
│   │   │   └── documentos-revision.component.ts
│   │   ├── layouts
│   │   │   └── admin-layout
│   │   │       ├── admin-layout.component.html
│   │   │       ├── admin-layout.component.scss
│   │   │       ├── admin-layout.component.spec.ts
│   │   │       ├── admin-layout.component.ts
│   │   │       ├── admin-layout.module.ts
│   │   │       └── admin-layout.routing.ts
│   │   ├── lbd
│   │   │   ├── lbd-chart
│   │   │   │   ├── lbd-chart.component.html
│   │   │   │   └── lbd-chart.component.ts
│   │   │   └── lbd.module.ts
│   │   ├── cotizacion
│   │   │   ├── cotizacion.component.css
│   │   │   ├── cotizacion.component.html
│   │   │   ├── cotizacion.component.spec.ts
│   │   │   └── cotizacion.component.ts
│   │   ├── notifications
│   │   │   ├── notifications.component.css
│   │   │   ├── notifications.component.html
│   │   │   ├── notifications.component.spec.ts
│   │   │   └── notifications.component.ts
│   │   ├── shared
│   │   │   ├── footer
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.ts
│   │   │   │   └── footer.module.ts
│   │   │   └── navbar
│   │   │       ├── navbar.component.html
│   │   │       ├── navbar.component.ts
│   │   │       └── navbar.module.ts
│   │   ├── sidebar
│   │   │   ├── sidebar.component.html
│   │   │   ├── sidebar.component.ts
│   │   │   └── sidebar.module.ts
│   │   ├── despacharRepuestos
│   │   │   ├── depachar-repuestos.component.css
│   │   │   ├── depachar-repuestos.component.html
│   │   │   ├── depachar-repuestos.component.spec.ts
│   │   │   └── depachar-repuestos.component.ts
│   │   ├── detailCotizacion
│   │   │   ├── detalle-cotizacion.component.css
│   │   │   ├── detalle-cotizacion.component.html
│   │   │   ├── detalle-cotizacion.component.spec.ts
│   │   │   └── detalle-cotizacion.component.ts
│   │   ├── detalleGarantia
│   │   │   ├── detalle-garantia.component.css
│   │   │   ├── detalle-garantia.component.html
│   │   │   ├── detalle-garantia.component.spec.ts
│   │   │   └── detalle-garantia.component.ts
│   │   │── detallesDespachoRepuestos
│   │   │    ├── detalle-despacho-repuestos.component.css
│   │   │    ├── detalle-despacho-repuestos.component.html
│   │   │    ├── detalle-despacho-repuestos.component.spec.ts
│   │   │    └── detalle-despacho-repuestos.component.ts
│   │   │─── detailCotizacion
│   │   │    ├── detail-cotizacion.component.css
│   │   │    ├── detail-cotizacion.component.html
│   │   │    ├── detail-cotizacion.component.spec.ts
│   │   │    └── detail-cotizacion.component.ts
│   │   │
│   │   │    ├── detalle-despacho-repuestos.component.css
│   │   │    ├── detalle-despacho-repuestos.component.html
│   │   │    ├── detalle-despacho-repuestos.component.spec.ts
│   │   │    └── detalle-despacho-repuestos.component.ts
│   │   │ 
│   │   │
│   │   │
│   │   │
│   │   │
│   │   │
│   │   │
│   │   │
│   │   │
│   │   │
│   │   │
│   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   └── sass
│   │       ├── lbd
│   │       └── light-bootstrap-dashboard.scss
│   ├── environments
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   └── tsconfig.json
├── tslint.json
└── typings.json

```
## Useful Links

More products from Creative Tim: <https://www.creative-tim.com/bootstrap-themes>

Tutorials: <https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w>

Freebies: <https://www.creative-tim.com/products>

Affiliate Program (earn money): <https://www.creative-tim.com/affiliates/new>

Social Media:

Twitter: <https://twitter.com/CreativeTim>

Facebook: <https://www.facebook.com/CreativeTim>

Dribbble: <https://dribbble.com/creativetim>

Google+: <https://plus.google.com/+CreativetimPage>

Instagram: <https://instagram.com/creativetimofficial>

[CHANGELOG]: ./CHANGELOG.md

[version-badge]: https://img.shields.io/badge/version-1.7.0-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg 
