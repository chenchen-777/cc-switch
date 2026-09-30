import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ApiKeySection } from '@/components/providers/forms/shared/ApiKeySection';
import { sortPresetEntries, PresetSortMode } from '@/components/providers/forms/ProviderPresetSelector';
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }));
describe('777 distribution marketing policy', () => {
  it('does not render promotion text from historical imported provider metadata', () => {
    render(<ApiKeySection value='' onChange={() => {}} category='third_party' shouldShowLink websiteUrl='https://example.com/keys' isPartner partnerPromotionKey='legacy-ad' />);
    expect(screen.queryByText(/partnerPromotion|legacy-ad/)).toBeNull();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com/keys');
    expect(screen.getByLabelText('API Key')).toBeInTheDocument();
  });
  it('sorts nonofficial providers by name regardless of sponsorship flags', () => {
    const entries = [
      { id: 'z', preset: { name: 'Z sponsor', category: 'aggregator', primePartner: true, isPartner: true } },
      { id: 'a', preset: { name: 'A provider', category: 'aggregator' } },
      { id: 'official', preset: { name: 'Official', category: 'official' } },
    ] as Parameters<typeof sortPresetEntries>[0];
    expect(sortPresetEntries(entries, PresetSortMode.Original, k => k).map(e => e.id)).toEqual(['official', 'a', 'z']);
  });
});
