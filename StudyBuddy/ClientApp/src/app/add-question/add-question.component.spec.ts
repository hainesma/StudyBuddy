/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AddQuestionComponent } from './add-question.component';

let component: AddQuestionComponent;
let fixture: ComponentFixture<AddQuestionComponent>;

describe('AddQuestion component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddQuestionComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AddQuestionComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});