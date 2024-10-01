import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription, SubscriptionLike} from "rxjs";
import {NgIf} from "@angular/common";
import {UrlConstant} from "../../core/constants/url.constant";
import {EventSourceService} from "../../providers/services/event-source.service";

@Component({
  selector: 'app-text-process',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  providers: [EventSourceService],
  templateUrl: './text-process.component.html',
  styleUrl: './text-process.component.scss'
})
export class TextProcessComponent implements OnDestroy {
  textForm: FormGroup;
  outputText: string = '';
  isProcessing: boolean = false;
  private eventSource!: EventSource;
  private eventSourceSubscription!: SubscriptionLike;

  constructor(private fb: FormBuilder, private eventSourceService: EventSourceService) {
    this.textForm = this.fb.group({
      inputText: ['', [ Validators.maxLength(100)]],
    });
  }


  processText() {
    if (this.textForm.invalid) {
      return;
    }

    const inputText = this.textForm.get('inputText')?.value;

    this.isProcessing = true;
    this.outputText = '';

    this.eventSourceSubscription = this.eventSourceService.processServerSentEvents(`/TextProcessing/${inputText}`)
      .subscribe({
          next: data => {
            console.log(data);
            this.outputText += data
          },
          error: err => {
            this.isProcessing = false;
          },
          complete: () => {
            this.isProcessing = false;
          }
        }
      );
  }

  closeTextProcess() {
    if (this.eventSourceSubscription) {
      this.eventSourceSubscription.unsubscribe();
    }
    this.eventSourceService.close();
    this.isProcessing = false;
    this.outputText = '';
  }

  ngOnDestroy(): void {
    this.closeTextProcess();
  }

}



