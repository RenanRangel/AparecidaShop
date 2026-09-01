import { Container } from '@/components/shared/Container';
import { MassScheduleCard } from '@/components/missas/MassScheduleCard';
import {
  massScheduleFixture,
  MASS_SCHEDULE_SOURCE_URL,
  MASS_SCHEDULE_CHECKED_AT,
} from '@/data/fixtures/mass-schedule.fixtures';

export const metadata = {
  title: 'Horários de missa em Aparecida — AparecidaShop',
  description: 'Horários de missa no Santuário Nacional e na Basílica Histórica de Aparecida-SP.',
};

export default function MissasPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <span className="text-[12px] font-semibold uppercase tracking-wide text-pine">
          Aparecida-SP
        </span>
        <h1 className="mt-2 font-display text-[32px] font-semibold tracking-tight text-ink sm:text-[40px]">
          Horários de missa
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-ink-soft">
          Celebrações no Santuário Nacional e na Basílica Histórica.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {massScheduleFixture.map((schedule) => (
            <MassScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>

        <p className="mt-8 text-[12.5px] text-ink-soft">
          Horários conferidos em {MASS_SCHEDULE_CHECKED_AT} e sujeitos a alteração em feriados e
          datas especiais. Confirme sempre no{' '}
          <a
            href={MASS_SCHEDULE_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-pine hover:underline"
          >
            site oficial do Santuário
          </a>
          .
        </p>
      </Container>
    </section>
  );
}