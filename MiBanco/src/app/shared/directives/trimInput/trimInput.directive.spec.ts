import { ElementRef } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { TrimInputDirective } from './trimInput.directive';

describe('TrimInputDirective', () => {
  let directive: TrimInputDirective;
  let elementRef: ElementRef;
  let mockNgControl: Partial<NgControl>;
  let control: FormControl;

  beforeEach(() => {
    const inputEl = document.createElement('input');
    elementRef = new ElementRef(inputEl);

    control = new FormControl('');
    mockNgControl = { control } as Partial<NgControl> as NgControl;

    directive = new TrimInputDirective(elementRef, mockNgControl as NgControl);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should trim spaces on blur and update DOM & FormControl', () => {
    elementRef.nativeElement.value = '   hello world   ';
    control.setValue('   hello world   ');

    directive.onBlur();

    expect(elementRef.nativeElement.value).toBe('hello world');
    expect(control.value).toBe('hello world');
  });

  it('should keep value if no spaces to trim', () => {
    elementRef.nativeElement.value = 'Angular';
    control.setValue('Angular');

    directive.onBlur();

    expect(elementRef.nativeElement.value).toBe('Angular');
    expect(control.value).toBe('Angular');
  });

  it('should handle empty value safely', () => {
    elementRef.nativeElement.value = '';
    control.setValue('');

    directive.onBlur();

    expect(elementRef.nativeElement.value).toBe('');
    expect(control.value).toBe('');
  });
});
