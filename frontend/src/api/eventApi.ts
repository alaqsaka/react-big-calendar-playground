import api from './authApi';
import type { Event, CreateEventForm } from '../types';

export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get('/events');
  return response.data;
};

export const createEvent = async (data: CreateEventForm): Promise<Event> => {
  const response = await api.post('/events', data);
  return response.data;
};

export const updateEvent = async (id: string, data: CreateEventForm): Promise<Event> => {
  const response = await api.put(`/events/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};
