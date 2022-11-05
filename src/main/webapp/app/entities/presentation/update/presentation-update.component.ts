import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPresentation, Presentation } from '../presentation.model';
import { PresentationService } from '../service/presentation.service';

@Component({
  selector: 'jhi-presentation-update',
  templateUrl: './presentation-update.component.html',
})
export class PresentationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected presentationService: PresentationService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ presentation }) => {
      this.updateForm(presentation);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const presentation = this.createFromForm();
    if (presentation.id !== undefined) {
      this.subscribeToSaveResponse(this.presentationService.update(presentation));
    } else {
      this.subscribeToSaveResponse(this.presentationService.create(presentation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPresentation>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(presentation: IPresentation): void {
    this.editForm.patchValue({
      id: presentation.id,
    });
  }

  protected createFromForm(): IPresentation {
    return {
      ...new Presentation(),
      id: this.editForm.get(['id'])!.value,
    };
  }
}
