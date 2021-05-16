import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';


describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show login/signUp button when user is not logged in', () => {
        fixture.detectChanges();
        const login = fixture.debugElement.nativeElement.querySelector('#auth');
        if (component.isLoggedIn() === false) {
            expect(login.innerHTML).toBe(' HOME.PROFILE.ITEM_1 ');
        } else {
            expect(login.innerHTML).toBe(' HOME.PROFILE.ITEM_2 ');
        }
    });
});
