import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BootcampComponent } from './bootcamp/bootcamp.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { InstructorComponent } from './instructor/instructor.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchPipe],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  @ViewChild('content', { read: ViewContainerRef }) content!: ViewContainerRef;
  selectedEntity: string = 'Dashboard'; // Default selected entity

  constructor(private resolver: ComponentFactoryResolver) {}

  loadBootcampsComponent() {
    this.content.clear();
    const factory = this.resolver.resolveComponentFactory(BootcampComponent);
    const componentRef = this.content.createComponent(factory);
  }

  updateTitle(entity: string): void {
    console.log('Entity selected:', entity);
    this.selectedEntity = entity;
  }

  loadInstructorComponent() {
    this.content.clear();
    const factory = this.resolver.resolveComponentFactory(InstructorComponent);
    const componentRef = this.content.createComponent(factory);
  }
}
