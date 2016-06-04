var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var app_component_1 = require('./app.component');
require('../public/css/styles.styl');
if (process.env.ENV === 'production') {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [router_deprecated_1.ROUTER_PROVIDERS]);
//# sourceMappingURL=main.js.map