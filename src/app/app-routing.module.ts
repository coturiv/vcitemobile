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
    path: 'citation/:cId',
    loadChildren: './pages/citation/citation.module#CitationPageModule' 
  },
  { 
    path: 'vchalk',
    loadChildren: './pages/vchalk/vchalk.module#VchalkPageModule' 
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
  },
  { 
    path: 'change-password',
    loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule'
  },
  { 
    path: 'maps',
    loadChildren: './pages/maps/maps.module#MapsPageModule' 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
