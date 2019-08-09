import {NgModule} from '@angular/core';
import {Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {EditExhibitionComponent} from './components/exhibitions/edit-exhibition.component';
import {EditExhibitionVisualComponent} from './components/exhibitions/edit-exhibition-visual/edit-exhibition-visual.component';
import {ChooseEditorComponent} from './components/exhibitions/choose-editor/choose-editor.component';
import {ListExhibitionComponent} from './components/exhibitions/list-exhibition.component';
import {ExhibitionExistsGuard} from './exhibition-exists.guard';


const routes: Routes = [
    {path: '', component: ListExhibitionComponent},
  {
    path: ':exhibitionId',
    canActivate: [ExhibitionExistsGuard],
    component: ChooseEditorComponent,
    children: [
      {path: '', redirectTo: 'visual', pathMatch: 'full'},
      {path: 'legacy', component: EditExhibitionComponent},
      {path: 'visual', component: EditExhibitionVisualComponent}
    ],
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        {
            provide: [ExhibitionExistsGuard],
            useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
        }
    ]
})
export class AppRoutingModule {
}
