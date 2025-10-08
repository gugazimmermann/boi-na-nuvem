export function formatAgeFromBirthDate(birthDate: string | Date): string {
  try {
    const birth = new Date(birthDate);
    const now = new Date();

    if (isNaN(birth.getTime())) return 'Data inválida';
    if (birth > now) return 'Data futura';

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0 && months === 0 && days === 0) {
      return 'Recém-nascido';
    }

    const parts: string[] = [];

    if (years > 0) {
      parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
    }

    if (months > 0) {
      parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`);
    }

    if (days > 0) {
      parts.push(`${days} ${days === 1 ? 'dia' : 'dias'}`);
    }

    return parts.join(', ') || '0 dias';
  } catch (error) {
    return 'Data inválida';
  }
}

export function formatAgeFromMonths(months: number): string {
  if (months < 0) return 'Idade inválida';
  if (months === 0) return 'Recém-nascido';

  const totalDays = Math.floor(months * 30.44);
  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const monthsFromRemainingDays = Math.floor(remainingDaysAfterYears / 30.44);
  const days = Math.floor(remainingDaysAfterYears % 30.44);

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
  }

  if (monthsFromRemainingDays > 0) {
    parts.push(`${monthsFromRemainingDays} ${monthsFromRemainingDays === 1 ? 'mês' : 'meses'}`);
  }

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'dia' : 'dias'}`);
  }

  return parts.join(', ') || '0 dias';
}

export function formatAgeFromMonthsSimple(months: number): string {
  if (months < 0) return 'Idade inválida';
  if (months === 0) return 'Recém-nascido';

  const years = Math.floor(months / 12);
  const remainingMonths = Math.floor(months % 12);

  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
  }

  if (remainingMonths > 0) {
    parts.push(`${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`);
  }

  return parts.join(', ') || '0 meses';
}
