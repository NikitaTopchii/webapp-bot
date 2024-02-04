import { Injectable } from '@angular/core';

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

type CombinedRequest =
  | GuessNumberConditionRequest
  | SelfConditionRequest;


@Injectable({
  providedIn: 'root'
})
export class CompetitionCreatorService {
  private conditionRequestState: CombinedRequest = this.initConditionRequest()
  constructor() { }

  public set conditionRequest(request: CombinedRequest) {
    this.conditionRequestState = request
  }

  public get conditionRequest(): CombinedRequest {
    return this.conditionRequestState;
  }

  public setDefaultGuessNumber() {
    this.conditionRequestState = {
      subscription: true,
      type: 'guess',
      exact: false,
      value: 0
    }
  }

  public setDefaultSelfCondition() {
    this.conditionRequestState = {
      subscription: true,
      type: 'condition',
      email: false,
      phoneNumber: false,
      ownCondition: false,
      otherConditions: []
    }
  }

  private initConditionRequest(): CombinedRequest {
    return {
      subscription: true,
      type: 'guess',
      exact: false,
      value: 0
    }
  }
}
