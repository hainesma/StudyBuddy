﻿/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { QuestionComponent } from './question.component';

let component: QuestionComponent;
let fixture: ComponentFixture<QuestionComponent>;

describe('Question component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ QuestionComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(QuestionComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});