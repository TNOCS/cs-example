// (<any>window).FUSEBOX_AURELIA_LOADER_RELOAD = true;
import 'aurelia-bootstrapper';
import { Aurelia } from 'aurelia-framework';
import 'fuse-box-aurelia-loader';
import 'https://cdn.jsdelivr.net/leaflet/1.0.3/leaflet.css';
import './styles/styles.css';

declare var FuseBox: any;

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin('@csnext/cs-leaflet-plugin');
    // use logging

    if (FuseBox.import('process').env.devMode) {
        aurelia.use.developmentLogging();
    }
    await aurelia.start();
    await aurelia.setRoot('app');
}