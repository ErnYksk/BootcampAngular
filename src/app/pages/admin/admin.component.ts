import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestComponent } from '../test/test.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  @ViewChild('content', { read: ViewContainerRef }) content!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  loadBootcampsComponent() {
    this.content.clear();
    const factory = this.resolver.resolveComponentFactory(TestComponent);
    const componentRef = this.content.createComponent(factory);
  }
}
