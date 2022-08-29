import { Routes } from '@angular/router';
import { AuthorizationGuard } from 'src/app/shared/routes/authorization.guard';

export const full_content: Routes = [
  { 
    path: 'dashboard', 
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },

   {
    path: 'profile',
    canActivate:[AuthorizationGuard],
    data: {
      allowedRoles: ['superAdmin','Driver','Admin']
    },
    
    loadChildren: () => import('../../modules/profile/profile.module').then(m => m.ProfileModule)
  },


  {
    path:'admins',
    canActivate:[AuthorizationGuard],
    data: {
      allowedRoles: ['superAdmin']
    },
    loadChildren: () => import('../../modules/admins/admins.module').then(m=> m.AdminsModule)

  },

  {
    path:'drivers',
    canActivate:[AuthorizationGuard],
    data: {
      allowedRoles: ['Admin']
    },
    loadChildren: () => import('../../modules/drivers/drivers.module').then(m=> m.DriversModule),

  },
  {
    path:'truck',
    canActivate:[AuthorizationGuard],
    data: {
      allowedRoles: ['Driver']
    },
    loadChildren: () => import('../../modules/truck/truck.module').then(m=> m.TruckModule),

  },
  {
    path: 'guard',
    canActivate:[AuthorizationGuard],
    data: {
      allowedRoles: ['superAdmin','Admin']
    },
    
    loadChildren: () => import('../../modules/guard/guard.module').then(m => m.GuardModule)
  },
  {
    path: 'browseinspection',
    canActivate:[AuthorizationGuard],
    data: {
      allowedRoles: ['superAdmin','Admin']
    },
    
    loadChildren: () => import('../../modules/browseinspection/browseinspection.module').then(m =>m.BrowseinspectionModule )
},
{
  path: 'company',
  canActivate:[AuthorizationGuard],
  data: {
    allowedRoles: ['superAdmin','Admin']
  },
  
  loadChildren: () => import('../../modules/company/company.module').then(m=>m.CompanyModule)
},
{
  path: 'users',
  canActivate:[AuthorizationGuard],
  loadChildren: () => import('../../modules/users/users.module').then(m=>m.UsersModule)
},


{
  path:'gifts',
  canActivate:[AuthorizationGuard],
  loadChildren: () => import('../../modules/gifts/gifts.module').then(m=> m.GiftsModule)

},


{
  path:'allChilds',
  canActivate:[AuthorizationGuard],
  loadChildren: () => import('../../modules/child-list/child-list.module').then(m=> m.ChildListModule)

},

{
  path: 'customer',
  canActivate:[AuthorizationGuard],
  data: {
    allowedRoles: ['superAdmin','Admin']
  },
  
  loadChildren: () => import('../../modules/customer/customer.module').then(m=>m.CustomerModule)
},  

{
  path: 'settings',
  canActivate:[AuthorizationGuard],

  loadChildren: () => import('../../modules/settings/settings.module').then(m=>m.SettingsModule)
},  


]
