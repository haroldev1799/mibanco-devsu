import { FormControl, NgControl } from '@angular/forms';
import { UppercaseDirective } from './upperCase.directive';

describe('UppercaseDirective', () => {
  let directive: UppercaseDirective;
  let control: FormControl;
  let mockElement: { nativeElement: HTMLInputElement };

  beforeEach(() => {
    control = new FormControl('');
    const ngControl = { control } as Partial<NgControl> as NgControl;
    mockElement = { nativeElement: document.createElement('input') };

    directive = new UppercaseDirective(mockElement as any, ngControl);
  });

  it('debería crear la directiva', () => {
    expect(directive).toBeTruthy();
  });

  it('debería convertir a mayúsculas lo escrito en el input', () => {
    const input = mockElement.nativeElement;
    input.value = 'iron man';

    directive.onInput({ target: input } as any);

    expect(input.value).toBe('IRON MAN');
    expect(control.value).toBe('IRON MAN');
  });

  it('debería manejar valores ya en mayúsculas sin cambiarlos', () => {
    const input = mockElement.nativeElement;
    input.value = 'HULK';

    directive.onInput({ target: input } as any);

    expect(input.value).toBe('HULK');
    expect(control.value).toBe('HULK');
  });

  it('debería mantener vacío si el usuario no escribe nada', () => {
    const input = mockElement.nativeElement;
    input.value = '';

    directive.onInput({ target: input } as any);

    expect(input.value).toBe('');
    expect(control.value).toBe('');
  });
});
