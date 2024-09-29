import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TaskListComponent } from './pages/task/components/task-list/task-list.component';
import { ComboboxComponent } from './shared/components/combobox/combobox.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './pages/task/task.component';
import { AvatarPipe } from './shared/pipes/avatar.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TaskListComponent,
    ComboboxComponent,
    CreateTaskComponent,
    TaskComponent,
    AvatarPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
