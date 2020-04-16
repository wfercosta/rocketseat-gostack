import React, { useState, useEffect } from 'react';

import { formatISO } from 'date-fns';

import Background from '../../../components/Background';
import DateInput from '../../../components/DateInput';
import { Container, HourList, Hour, Title } from './styles';

import api from '../../../services/api';

export default function SelectDateTime({ route, navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const { provider } = route.params;

  useEffect(() => {
    async function load() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setHours(response.data);
    }

    load();
  }, [date, provider.id]);

  function handleSelectedHour(time) {
    console.tron.log('Time: ', time);
    navigation.navigate('Confirm', { provider, time: formatISO(new Date()) });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
      </Container>

      <HourList
        data={hours}
        keyExtractor={(item) => item.time}
        renderItem={({ item }) => (
          <Hour
            enabled={item.available}
            onPress={() => handleSelectedHour(item.value)}
          >
            <Title>{item.time}</Title>
          </Hour>
        )}
      />
    </Background>
  );
}
