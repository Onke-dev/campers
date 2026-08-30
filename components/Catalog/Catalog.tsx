'use client';

import { FormEvent, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { FaLocationDot, FaXmark } from 'react-icons/fa6';
import Image from 'next/image';
import type { CamperFilters } from '@/app/lib/api/api';
import { getAvailableFilters, getCampers } from '@/app/lib/api/clientApi';
import CamperList from '../CamperList/CamperList';
import css from './Catalog.module.css';

const emptyFilters: CamperFilters = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
};

const filterLabel = (value: string) =>
  value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const Catalog = () => {
  const [draftFilters, setDraftFilters] = useState<CamperFilters>(emptyFilters);
  const [filters, setFilters] = useState<CamperFilters>(emptyFilters);

  const filtersQuery = useQuery({
    queryKey: ['camper-filters'],
    queryFn: getAvailableFilters,
  });

  const campersQuery = useInfiniteQuery({
    queryKey: ['campers', filters],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getCampers({
        page: pageParam,
        perPage: 4,
        ...(filters.location && { location: filters.location }),
        ...(filters.form && { form: filters.form }),
        ...(filters.engine && { engine: filters.engine }),
        ...(filters.transmission && { transmission: filters.transmission }),
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const campers = campersQuery.data?.pages.flatMap((page) => page.campers) ?? [];
  const showEmptyState =
    !campersQuery.isPending && !campersQuery.isError && campers.length === 0;

  const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilters({ ...draftFilters, location: draftFilters.location.trim() });
  };

  const clearFilters = () => {
    setDraftFilters(emptyFilters);
    setFilters(emptyFilters);
  };

  const setFilter = (field: keyof CamperFilters, value: string) => {
    setDraftFilters((current) => ({ ...current, [field]: value }));
  };

  return (
    <section className={css.catalog} aria-label="Camper catalog">
      <form className={css.filters} onSubmit={applyFilters}>
        <label className={css.location_label} htmlFor="location">
          Location
        </label>
        <div className={css.location_field}>
          <FaLocationDot aria-hidden="true" />
          <input
            id="location"
            type="text"
            placeholder="City"
            value={draftFilters.location}
            onChange={(event) => setFilter('location', event.target.value)}
          />
        </div>

        <h2 className={css.filters_title}>Filters</h2>

        {filtersQuery.isPending && <p className={css.status}>Loading filters…</p>}
        {filtersQuery.isError && (
          <p className={css.error}>Unable to load filters. Please refresh the page.</p>
        )}

        {filtersQuery.data && (
          <div className={css.groups}>
            <FilterGroup
              title="Camper form"
              name="form"
              options={filtersQuery.data.forms}
              value={draftFilters.form}
              onChange={(value) => setFilter('form', value)}
            />
            <FilterGroup
              title="Engine"
              name="engine"
              options={filtersQuery.data.engines}
              value={draftFilters.engine}
              onChange={(value) => setFilter('engine', value)}
            />
            <FilterGroup
              title="Transmission"
              name="transmission"
              options={filtersQuery.data.transmissions}
              value={draftFilters.transmission}
              onChange={(value) => setFilter('transmission', value)}
            />
          </div>
        )}

        <button className={css.search_button} type="submit">
          Search
        </button>
        <button className={css.clear_button} type="button" onClick={clearFilters}>
          <FaXmark aria-hidden="true" />
          Clear filters
        </button>
      </form>

      <div className={css.results} aria-live="polite">
        {campersQuery.isError && (
          <p className={css.error}>Unable to load campers. Please try again.</p>
        )}
        {showEmptyState && (
          <EmptyState onClearFilters={clearFilters} />
        )}
        {campers.length > 0 && <CamperList campers={campers} />}
        {campersQuery.hasNextPage && (
          <button
            className={css.load_more}
            type="button"
            onClick={() => campersQuery.fetchNextPage()}
            disabled={campersQuery.isFetchingNextPage}
          >
            {campersQuery.isFetchingNextPage ? 'Loading…' : 'Load more'}
          </button>
        )}
      </div>

      {campersQuery.isFetching && !campersQuery.isFetchingNextPage && <SearchLoader />}
    </section>
  );
};

const EmptyState = ({ onClearFilters }: { onClearFilters: () => void }) => (
  <div className={css.empty_state}>
    <Image
      className={css.empty_image}
      src="/img-notFound/image 1.jpg"
      alt=""
      width={488}
      height={463}
      priority
    />
    <h2 className={css.empty_title}>No campers found</h2>
    <p className={css.empty_description}>
      We couldn&apos;t find any campers that match your filters. Try adjusting
      your search or clearing some filters.
    </p>
    <div className={css.empty_actions}>
      <button className={css.clear_button} type="button" onClick={onClearFilters}>
        <FaXmark aria-hidden="true" />
        Clear filters
      </button>
      <button className={css.view_all_button} type="button" onClick={onClearFilters}>
        View all campers
      </button>
    </div>
  </div>
);

const SearchLoader = () => (
  <div className={css.loader_overlay} role="status" aria-live="assertive">
    <div className={css.loader_dialog}>
      <span className={css.spinner} aria-hidden="true" />
      <h2>Loading trucks...</h2>
      <p>Please wait while we fetch the best travel trucks for you</p>
    </div>
  </div>
);

type FilterGroupProps = {
  title: string;
  name: keyof Pick<CamperFilters, 'form' | 'engine' | 'transmission'>;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

const FilterGroup = ({ title, name, options, value, onChange }: FilterGroupProps) => (
  <fieldset className={css.group}>
    <legend>{title}</legend>
    {options.map((option) => (
      <label className={css.option} key={option}>
        <input
          type="radio"
          name={name}
          value={option}
          checked={value === option}
          onChange={() => onChange(option)}
        />
        {filterLabel(option)}
      </label>
    ))}
  </fieldset>
);

export default Catalog;
