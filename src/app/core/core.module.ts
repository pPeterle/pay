import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';
import { AppointmentService } from './services/appointment.service';
import { LocalStorageDatabase } from './database/local-storage-database.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    LocalStorageDatabase,
    AppointmentService
  ],
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
