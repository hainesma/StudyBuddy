/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { FavoriteComponent } from './favorite.component';

let component: FavoriteComponent;
let fixture: ComponentFixture<FavoriteComponent>;

describe('Favorite component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FavoriteComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(FavoriteComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});