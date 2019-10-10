import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule, Effect } from '@ngrx/effects';
import { reducers } from '.';
import { CoreDataModule } from '@venturplex/core-data';
import { UsersEffects } from './users/users.effects';

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    NxModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    EffectsModule.forRoot([UsersEffects])
  ]
})
export class CoreStateModule {}
