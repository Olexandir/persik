import { NgModule } from "@angular/core";
import { GenresPipe } from './genres.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        GenresPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        GenresPipe
    ]
})

export class PipesModule { }
