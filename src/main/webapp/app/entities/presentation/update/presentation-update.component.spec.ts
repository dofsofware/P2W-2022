import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PresentationService } from '../service/presentation.service';
import { IPresentation, Presentation } from '../presentation.model';

import { PresentationUpdateComponent } from './presentation-update.component';

describe('Presentation Management Update Component', () => {
  let comp: PresentationUpdateComponent;
  let fixture: ComponentFixture<PresentationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let presentationService: PresentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PresentationUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PresentationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PresentationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    presentationService = TestBed.inject(PresentationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const presentation: IPresentation = { id: 456 };

      activatedRoute.data = of({ presentation });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(presentation));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Presentation>>();
      const presentation = { id: 123 };
      jest.spyOn(presentationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ presentation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: presentation }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(presentationService.update).toHaveBeenCalledWith(presentation);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Presentation>>();
      const presentation = new Presentation();
      jest.spyOn(presentationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ presentation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: presentation }));
      saveSubject.complete();

      // THEN
      expect(presentationService.create).toHaveBeenCalledWith(presentation);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Presentation>>();
      const presentation = { id: 123 };
      jest.spyOn(presentationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ presentation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(presentationService.update).toHaveBeenCalledWith(presentation);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
