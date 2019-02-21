import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '../../../material.module';
import {ExhibitionInspectorComponent} from './exhibition-inspector.component';
import {FormsModule} from '@angular/forms';
import {RoomInspectorComponent} from './room/room-inspector.component';
import {SharedComponentsModule} from '../../shared/shared-components.module';
import {RoomCanvasComponent} from './room/room-canvas.component';
import {WallInspectorComponent} from './wall/wall-inspector.component';
import {WallCanvasComponent} from './wall/wall-canvas.component';

@NgModule({
    declarations: [ ExhibitionInspectorComponent, RoomInspectorComponent, RoomCanvasComponent, WallInspectorComponent, WallCanvasComponent ],
    imports: [ BrowserModule, MaterialModule, FormsModule, SharedComponentsModule ],
    exports: [ ExhibitionInspectorComponent, RoomInspectorComponent, WallInspectorComponent ]
})
export class InspectorModule {}
