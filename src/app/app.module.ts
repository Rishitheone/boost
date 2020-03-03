import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserComponent } from "./pages/user/user.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { ActivityComponent } from "./pages/activity/activity.component";
import { ActivityCompleteComponent } from "./pages/activity/activity-complete/activity-complete.component";
import { ActivityPopupComponent } from "./pages/activity/activity-popup/activity-popup.component";
import { ActivityTableComponent } from "./pages/activity/activity-table/activity-table.component";
import { CompletePopupComponent } from "./pages/activity/complete-popup/complete-popup.component";
import { UserCreateComponent } from "./pages/user/user-create/user-create.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./Auth/auth.interceptor";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSelectModule } from "@angular/material/select";
// import { ToastrModule } from "ngx-toastr";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    ActivityComponent,
    ActivityCompleteComponent,
    ActivityPopupComponent,
    ActivityTableComponent,
    CompletePopupComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    ChartsModule,
    MatGridListModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    // ToastrModule.forRoot({
    //   progressBar: true
    // })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    UserCreateComponent,
    ActivityPopupComponent,
    CompletePopupComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
