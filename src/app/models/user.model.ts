export interface User {
  uid: string;
  role?: number;
  name?: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

export interface Invitation {
  email?: string;
  name?: string;
  centerID?: string;
  centerName?: string;
  invitationType?: number;
}
