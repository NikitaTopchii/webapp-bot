import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

interface BaseConditionRequest {
  subscription: boolean;
  participantAmount: number;
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

  public setDefaultGuessNumber(opts: Partial<GuessNumberConditionRequest>) {
    this.conditionRequest = {
      subscription: true,
      participantAmount: 1,
      type: 'guess',
      exact: false,
      value: 0,
      ...opts
    }
  }

  public setDefaultSelfCondition(opts: Partial<SelfConditionRequest>) {
    this.conditionRequest = {
      subscription: true,
      participantAmount: 1,
      type: 'condition',
      email: false,
      phoneNumber: false,
      ownCondition: false,
      otherConditions: [],
      ...opts
    }
  }

  setSubscribeCondition(opts: Partial<SubscriptionConditionRequest>) {
    this.conditionRequest = {
      subscription: true,
      participantAmount: 1,
      type: 'nothing',
      ...opts
    }
  }

  private initConditionRequest(): CombinedRequest {
    return {
      subscription: true,
      participantAmount: 1,
      type: 'nothing'
    }
  }
}
