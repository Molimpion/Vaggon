import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container } from '@mui/material';

import api from '../../services/api';
import styles from './Dashboard.module.css';

import Header from '../../components/Header/Header';
import ActivityModal from '../../components/ActivityModal/ActivityModal';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

function Dashboard() {
    const navigate = useNavigate();
    
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [currentActivity, setCurrentActivity] = useState({
        id: null,
        nome: '',
        descricao: '',
        data_inicio: '',
        data_termino: '',
        status: 'pendente'
    });

    useEffect(() => {
        fetchActivities();
    }, []);

    async function fetchActivities() {
        try {
            const response = await api.get('/activities');
            
            const formattedEvents = response.data.map(activity => ({
                ...activity,
                title: activity.nome,
                start: new Date(activity.data_inicio),
                end: new Date(activity.data_termino),
                resource: activity
            }));

            setEvents(formattedEvents);
        } catch (error) {
            console.error("Erro ao carregar agenda:", error);
            if(error.response?.status === 401) handleLogout();
        }
    }
    const handleNavigate = (newDate) => {
        setDate(newDate);
    };
    const handleViewChange = (newView) => {
        setView(newView);
    }
    function handleSelectSlot({ start, end }) {
        setCurrentActivity({
            id: null,
            nome: '',
            descricao: '',
            data_inicio: moment(start).format('YYYY-MM-DDTHH:mm'),
            data_termino: moment(end).format('YYYY-MM-DDTHH:mm'),
            status: 'pendente'
        });
        setOpen(true);
    }

    function handleSelectEvent(event) {
        const activity = event.resource;
        setCurrentActivity({
            id: activity.id,
            nome: activity.nome,
            descricao: activity.descricao || '',
            data_inicio: moment(activity.data_inicio).format('YYYY-MM-DDTHH:mm'),
            data_termino: moment(activity.data_termino).format('YYYY-MM-DDTHH:mm'),
            status: activity.status
        });
        setOpen(true);
    }

    async function handleSave() {
        setLoading(true);
        try {
            const payload = {
                nome: currentActivity.nome,
                descricao: currentActivity.descricao,
                data_inicio: new Date(currentActivity.data_inicio).toISOString(),
                data_termino: new Date(currentActivity.data_termino).toISOString(),
                status: currentActivity.status
            };

            if (currentActivity.id) {
                await api.put(`/activities/${currentActivity.id}`, payload);
            } else {
                await api.post('/activities', payload);
            }

            setOpen(false);
            fetchActivities(); 
        } catch (error) {
            alert(error.response?.data?.message || "Erro ao salvar atividade");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        if (!window.confirm("Tem certeza que deseja excluir esta atividade?")) return;

        try {
            await api.delete(`/activities/${currentActivity.id}`);
            setOpen(false);
            fetchActivities();
        } catch (error) {
            alert("Erro ao excluir atividade");
        }
    }

    function handleLogout() {
        localStorage.clear();
        navigate('/');
    }

    const eventStyleGetter = (event) => {
        let backgroundColor = '#0D47A1'; 
        if (event.resource.status === 'concluida') backgroundColor = '#2e7d32'; 
        if (event.resource.status === 'cancelada') backgroundColor = '#d32f2f'; 

        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity: 0.8,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    return (
        <Container maxWidth="lg" className={styles.container}>
            
            <Header onLogout={handleLogout} />

            <div className={styles.calendarContainer}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    date={date}           
                    onNavigate={handleNavigate}
                    view={view}            
                    onView={handleViewChange}
                    views={['month', 'week', 'day', 'agenda']}
                    
                    messages={{
                        next: "Próximo",
                        previous: "Anterior",
                        today: "Hoje",
                        month: "Mês",
                        week: "Semana",
                        day: "Dia",
                        agenda: "Agenda",
                        date: "Data",
                        time: "Hora",
                        event: "Evento",
                        noEventsInRange: "Não há eventos neste período."
                    }}

                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={eventStyleGetter}
                />
            </div>

            <ActivityModal 
                open={open}
                onClose={() => setOpen(false)}
                activity={currentActivity}
                setActivity={setCurrentActivity}
                onSave={handleSave}
                onDelete={handleDelete}
                loading={loading}
            />

        </Container>
    );
}

export default Dashboard;