import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

interface BaseConditionRequest {
  subscription: boolean;
}

interface GuessNumberConditionRequest extends BaseConditionRequest {
  type: 'guess';
  exact: boolean;
  value: number;
}

interface SelfConditionRequest extends BaseConditionRequest {
  type: 'condition';
  email: boolean;
  phoneNumber: boolean;
  ownCondition: boolean;
  otherConditions: {
    label: string;
    type: 'text' | 'image' | 'link' | 'video' | 'number';
  }[];
}

interface SubscriptionConditionRequest extends BaseConditionRequest {
  type: 'nothing'
}

type CombinedRequest =
  | GuessNumberConditionRequest
  | SelfConditionRequest
  | SubscriptionConditionRequest;


@Injectable({
  providedIn: 'root'
})
export class CompetitionCreatorService {
  private conditionRequestState: BehaviorSubject<CombinedRequest> = new BehaviorSubject<CombinedRequest>(this.initConditionRequest());
  constructor() {
  }

  public set conditionRequest(request: CombinedRequest) {
    this.conditionRequestState.next(request)
  }

  public get conditionRequest(): CombinedRequest {
    return this.conditionRequestState.getValue();
  }

  public get conditionRequest$(): Observable<CombinedRequest> {
    return this.conditionRequestState.asObservable();
  }

  public setDefaultGuessNumber() {
    this.conditionRequest = {
      subscription: true,
      type: 'guess',
      exact: false,
      value: 0
    }
  }

  public setDefaultSelfCondition() {
    this.conditionRequest = {
      subscription: true,
      type: 'condition',
      email: false,
      phoneNumber: false,
      ownCondition: false,
      otherConditions: []
    }
  }

  public setSubscribeCondition() {
    this.conditionRequest = {
      subscription: true,
      type: 'nothing'
    }
  }

  private initConditionRequest(): CombinedRequest {
    return {
      subscription: true,
      type: 'nothing'
    }
  }
}
