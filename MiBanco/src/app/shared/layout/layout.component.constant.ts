import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from "../components/molecules/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

export const LAYOUT_IMPORTS = [
    MatSidenavModule,
    MatButtonModule,
    NavbarComponent,
    RouterOutlet
];

