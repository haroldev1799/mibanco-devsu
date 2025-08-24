import { FormControl, NgControl } from '@angular/forms';
import { NumberRangeDirective } from './numberRange.directive';

describe('NumberRangeDirective', () => {
  let directive: NumberRangeDirective;
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl();
    const ngControl = { control } as Partial<NgControl> as NgControl;
    directive = new NumberRangeDirective(ngControl);
    directive.min = 1;
    directive.max = 99;
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('debería corregir valor menor que min', () => {
    const input = document.createElement('input');
    input.value = '0';

    directive.onInput({ target: input } as any);

    expect(control.value).toBe(1);
    expect(input.value).toBe('1');
  });

  it('debería corregir valor mayor que max', () => {
    const input = document.createElement('input');
    input.value = '150';

    directive.onInput({ target: input } as any);

    expect(control.value).toBe(99);
    expect(input.value).toBe('99');
  });

  it('debería aceptar valor dentro del rango', () => {
    const input = document.createElement('input');
    input.value = '50';

    directive.onInput({ target: input } as any);

    expect(control.value).toBe(50);
    expect(input.value).toBe('50');
  });

  it('debería resetear si no es número', () => {
    const input = document.createElement('input');
    input.value = 'abc';

    directive.onInput({ target: input } as any);

    expect(control.value).toBeNull();
    expect(input.value).toBe('abc');
  });

  it('debería aceptar exactamente el min', () => {
    const input = document.createElement('input');
    input.value = '1';

    directive.onInput({ target: input } as any);

    expect(control.value).toBe(1);
    expect(input.value).toBe('1');
  });

  it('debería aceptar exactamente el max', () => {
    const input = document.createElement('input');
    input.value = '99';

    directive.onInput({ target: input } as any);

    expect(control.value).toBe(99);
    expect(input.value).toBe('99');
  });
});
