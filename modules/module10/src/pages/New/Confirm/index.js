import React, { useMemo } from 'react';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import api from '../../../services/api';
import {
  Container,
  Avatar,
  Name,
  Time,
  SubmitButton,
  SubmitButtonText,
} from './styles';

import Background from '../../../components/Background';

export default function Confirm({ route, navigation }) {
  const { time, provider } = route.params;

  const formatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  async function handleAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigation('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `http://api.adorable.io/avatar/50/${provider.name}`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{formatted}</Time>
        <SubmitButton onPress={() => handleAppointment()}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}
