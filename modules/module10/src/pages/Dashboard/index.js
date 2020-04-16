import React, { useEffect, useState, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import { Container, Title, List } from './styles';

import api from '../../services/api';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }

  async function loadAppointments() {
    const response = await api.get('appointments');
    setAppointments(response.data);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [])
  );

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}
