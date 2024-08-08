'use client'
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CountryCard from "../CountryCard";
import CustomPagination from "../CustomPagination";
import SearchBar from "../SearchBar";

const regions = [
  {
    key: 'Africa',
    label: 'Africa',
  },
  {
    key: 'Americas',
    label: 'Americas',
  },
  {
    key: 'Asia',
    label: 'Asia',
  },
  {
    key: 'Europe',
    label: 'Europe',
  },
  {
    key: 'Oceania',
    label: 'Oceania',
  },
]

export default function Results() {
  const [currentPage, setCurrentPage] = useState(1)
  const [countries, setCountries] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [region, setRegion] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (value: number) => {
    setCurrentPage(value);
  }

  const fetchCountries = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/countries?page=${currentPage}&pageSize=20&region=${region}&name=${name}`)
      const data = await res.json();
      setCountries(data.content);
      setTotalPages(data.totalPages);
      setIsLoading(false)
    } catch (error) {
      console.error("🚀 ~ error:", error)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [currentPage, region, name])

  return (
    <>
      <div className="container m-auto flex justify-between my-12 h-full">
        <SearchBar handleChange={setName} />
        <Select
          label="Filter by Region"
          classNames={{
            base: "max-w-[200px]",
            trigger: ['bg-white', 'dark:bg-[#2B3743]', "rounded-md"],
            popoverContent: ["rounded-md", "shadow-none", 'dark:bg-[#2B3743]', 'dark:text-white']
          }}
          selectedKeys={[region]}
          onChange={(e) => {
            setRegion(e.target.value)
            setCurrentPage(1)
          }}
        >
          {regions.map((region) => (
            <SelectItem key={region.key}>
              {region.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      {(!isLoading && countries) ? (
        <>
          <div className='flex flex-wrap gap-[75px] justify-center mb-5 h-full'>
            {countries?.length > 0 ?
              countries?.map((country: any) => (
                <CountryCard
                  key={country.id}
                  flag={country.flags_png}
                  name={country.name}
                  population={country.population}
                  region={country.region}
                  capital={country.capital as string[]}
                  isLoaded={!isLoading}
                />
              )) : (
                <p className="text-sm">no results found</p>
              )}
          </div>
          <div className="flex justify-center mt-[75px]">
            <CustomPagination total={totalPages} page={currentPage} onChange={handleOnChange} />
          </div>
        </>
      ) : (
        <div className='h-full mx-auto'>
          <Spinner label="Loading..." color="secondary" size="lg" />
        </div>
      )}
    </>
  );
}
