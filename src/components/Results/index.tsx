'use client'
import { Select, SelectItem } from "@nextui-org/react";
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

  const handleOnChange = (value: number) => {
    setCurrentPage(value);
  }

  const fetchCountries = async () => {
    try {
      const res = await fetch(`/api/countries?page=${currentPage}&pageSize=20&region=${region}&name=${name}`)
      const data = await res.json();
      setCountries(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("🚀 ~ error:", error)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [currentPage, region, name])

  return (
    <div>
      <div className="container m-auto flex justify-between my-12">
        <SearchBar handleChange={setName} />
        <Select
          label="Filter by Region"
          classNames={{
            base: "max-w-[200]",
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
      <div className='flex flex-wrap gap-[75px] justify-center mb-5'>
        {countries.map((country: any) => (
          <CountryCard key={country.id} flag={country.flags_png} name={country.name} population={country.population} region={country.region} capital={country.capital as string[]} />
        ))}
      </div>
      <div className="flex justify-center mt-[75px]">
        <CustomPagination total={totalPages} page={currentPage} onChange={handleOnChange} />
      </div>
    </div>
  );
}