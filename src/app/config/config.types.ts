export interface userAuthResponse {
  userId: string;
  email: string;
  name: string;
  accessToken: string;
}

export interface userData {
  name: string;
  email: string;
  accessToken: string;
  isActive: boolean;
  _id: string;
  __v: number;
}

export interface taskCreationData {
  name: string;
  description: string;
  from: string;
  to: string;
  userId: string;
}

export interface task {
  _id: string;
  name: string;
  description: string;
  from: string;
  to: string;
  isComplete: boolean;
}
