export enum Status { // status of the bootcamp participant. 
    InProgress, // participant passing a bootcamp.
    Withdraw, // praticipant allowed for withdraw.
    Passed, // bootcamp was passed successfully, and deposit will be returned.
    NotPassed, // bootcamp wasn't passed successfully, so that deposit won't be returned.
    Emergency
  }
  
  export interface Deposit{
    depositedAmount: bigint;
    depositDonation: boolean;
    status: Status;
  }