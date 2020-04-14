import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';

import { AppComponent } from './app.component';
import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { TodoDashboardComponent } from './todo-dashboard/todo-dashboard.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './todo.service';
// import { TodoService } from './todo.service';

@NgModule({
  declarations: [
    AppComponent,
    HttpClientModule,
    TodoDashboardComponent,
    TodoListComponent,
    TodoService
    
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [NgReduxModule],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension) {

    var enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}
