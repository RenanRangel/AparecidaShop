import type { MassSchedule } from '@/types/mass-schedule';

/**
 * Fonte: site oficial do Santuário Nacional (a12.com), checado em agosto de
 * 2026. Horários de missa podem mudar (feriados, festas litúrgicas, obras)
 * — sempre linkamos a fonte oficial na página para o visitante confirmar.
 */
export const massScheduleFixture: MassSchedule[] = [
  {
    id: 'santuario-nacional',
    churchName: 'Santuário Nacional',
    slots: [
      { days: 'Segunda a sexta-feira', times: ['6h45', '9h', '10h30', '12h', '16h', '18h'] },
      { days: 'Sábado', times: ['6h', '9h', '10h30', '12h', '16h', '18h', '20h'] },
      { days: 'Domingo', times: ['5h30', '8h', '10h', '12h', '14h', '16h', '18h'] },
    ],
  },
  {
    id: 'basilica-historica',
    churchName: 'Basílica Histórica (Basílica Velha)',
    slots: [
      { days: 'Segunda a sexta-feira', times: ['8h', '18h'] },
      { days: 'Sábado', times: ['15h', '19h'] },
      { days: 'Domingo', times: ['15h', '19h'] },
    ],
  },
];

export const MASS_SCHEDULE_SOURCE_URL =
  'https://www.a12.com/santuario/missa/pastoral-horarios-de-missa-santuario-nacional';
export const MASS_SCHEDULE_CHECKED_AT = 'agosto de 2026';