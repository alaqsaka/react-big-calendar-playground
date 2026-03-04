export interface User {
  id: string;
  email: string;
  token?: string;
}

export interface Event {
  _id: string;
  email: string;
  date: string;
  description: string;
  createdBy?: string;
  createdAt?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface CreateEventForm {
  email: string;
  date: string;
  description: string;
}
