
import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { enUS } from 'date-fns/locale';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import axios from 'axios';

// const locales = {
//   'en-US': require('date-fns/locale/en-US'),
// };

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function App() {
  const [events, setEvents] = useState([]);
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/slots');
      const formattedEvents = response.data.map(event => ({
        ...event,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSlotSelect = (slotInfo) => {
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
    setOpenSlot(true);
  };

  const handleEventSelect = (event) => {
    setClickedEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setStart(event.start);
    setEnd(event.end);
    setOpenEvent(true);
  };

  const handleClose = () => {
    setOpenSlot(false);
    setOpenEvent(false);
    setTitle('');
    setDescription('');
    setStart(null);
    setEnd(null);
    setClickedEvent(null);
  };

  const handleSubmit = async () => {
    try {
      if (clickedEvent) {
        // Update existing event
        await axios.put(`http://localhost:5000/api/slots/${clickedEvent._id}`, {
          title,
          description,
          startTime: start,
          endTime: end,
        });
      } else {
        // Create new event
        await axios.post('http://localhost:5000/api/slots', {
          title,
          description,
          startTime: start,
          endTime: end,
        });
      }
      handleClose();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please check for conflicts.');
    }
  };

  const handleDelete = async () => {
    if (clickedEvent) {
      try {
        await axios.delete(`http://localhost:5000/api/slots/${clickedEvent._id}`);
        handleClose();
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <h1>Interview Scheduler</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventSelect}
        style={{ height: 'calc(100vh - 100px)' }}
      />

      {/* Dialog for creating/editing events */}
      <Dialog open={openSlot || openEvent} onClose={handleClose}>
        <DialogTitle>
          {openSlot ? 'Create Interview Slot' : 'Edit Interview Slot'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {openEvent && (
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          )}
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;