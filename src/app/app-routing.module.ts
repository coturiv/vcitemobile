import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'citations',
    pathMatch: 'full'
  },
  { 
    path: 'citations', 
    loadChildren: './pages/citations/citations.module#CitationsPageModule' 
  },
  { 
    path: 'qrscan', 
    loadChildren: './pages/qrscan/qrscan.module#QrscanPageModule'
  },
  { 
    path: 'citation/:cid', 
    loadChildren: './pages/citation/citation.module#CitationPageModule'
  },
  { 
    path: 'login', 
    loadChildren: './pages/login/login.module#LoginPageModule' 
  },
  { 
    path: 'settings', 
    loadChildren: './pages/settings/settings.module#SettingsPageModule' 
  },
  { 
    path: 'reference', 
    loadChildren: './pages/reference/reference.module#ReferencePageModule' 
  },
  { 
    path: 'about', 
    loadChildren: './pages/about/about.module#AboutPageModule' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
