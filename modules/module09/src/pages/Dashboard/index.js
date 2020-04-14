import React, { useState, useMemo, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { utcToZonedTime } from 'date-fns-tz';
import api from '~/services/api';

import { Container, Time } from './styles';

const range = [8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

export default function Dashboard() {
  const [schedules, setSchedules] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM ", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function load() {
      const response = await api.get('schedules', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map((hour) => {
        const normalized = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compare = utcToZonedTime(normalized, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compare, new Date()),
          appointment: response.data.find((a) =>
            isEqual(parseISO(a.date), compare)
          ),
        };
      });

      setSchedules(data);
    }

    load();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#FFF" />
        </button>
      </header>

      <ul>
        {schedules.map((time) => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
