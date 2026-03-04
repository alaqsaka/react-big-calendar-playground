import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../api/eventApi';
import type { Event, CreateEventForm } from '../types';
import BigCalendar from '../components/BigCalendar';
import CreateEventModal from '../components/CreateEventModal';
import EditEventModal from '../components/EditEventModal';
import './Dashboard.css';

const DashboardPage = () => {
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchEvents();
  }, [isAuthenticated, authLoading, navigate]);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (data: CreateEventForm) => {
    await createEvent(data);
    await fetchEvents();
  };

  const handleUpdateEvent = async (id: string, data: CreateEventForm) => {
    await updateEvent(id, data);
    await fetchEvents();
  };

  const handleDeleteEvent = async (id: string) => {
    await deleteEvent(id);
    await fetchEvents();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSelectEvent = (event: Event) => {
    setEditingEvent(event);
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">MERN Calendar</h1>
        <div className="dashboard-header-right">
          <span className="dashboard-user-email">{user?.email}</span>
          <button onClick={handleLogout} className="dashboard-logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-toolbar">
          <h2 className="dashboard-calendar-title">Events Calendar</h2>
          <button onClick={() => setShowCreateModal(true)} className="dashboard-create-button">
            + Create Event
          </button>
        </div>

        <BigCalendar events={events} onSelectEvent={handleSelectEvent} />
      </main>

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateEvent}
      />

      <EditEventModal
        isOpen={!!editingEvent}
        event={editingEvent}
        onClose={() => setEditingEvent(null)}
        onSubmit={handleUpdateEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default DashboardPage;
