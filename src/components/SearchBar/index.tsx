import { Input } from '@nextui-org/input';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import SearchIcon from '../Icons/search';

type SearchBarProps = {
  handleChange: (value: string) => void;
}

export default function SearchBar({ handleChange }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const
    debouncedSearch = useCallback(debounce((value) => {
      if (value.length >= 3 || value.length === 0)
        handleChange(value);
    }, 1000), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <Input
      type="text"
      placeholder="Search for a country..."
      value={searchTerm}
      onChange={handleSearchChange}
      classNames={{
        base: ["max-w-[480px]", "w-full"],
        inputWrapper: ['bg-white', 'dark:bg-[#2B3743]', "py-[28px]", "rounded-md", 'dark:text-white'],
      }}
      startContent={
        <SearchIcon />
      }
    />
  );
};