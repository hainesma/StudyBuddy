/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { QuestionListComponent } from './question-list.component';

let component: QuestionListComponent;
let fixture: ComponentFixture<QuestionListComponent>;

describe('QuestionList component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ QuestionListComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(QuestionListComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});