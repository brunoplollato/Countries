'use client'
import ArrowBackIcon from "@/components/Icons/arrowBack";
import { CountryType } from "@/types/country";
import { Button, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CountryParams = {
  params: {
    country: string;
  }
}

export default function Country({ params }: CountryParams) {
  const router = useRouter()
  const [country, setCountry] = useState<CountryType | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCountry = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`https://restcountries.com/v3.1/name/${params.country}`)
      const data = await res.json();
      setCountry(data[0] as CountryType);
    } catch (error) {
      console.log("🚀 ~ error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchCountry() }, []);
  return (
    <>
      {(!isLoading && country) && (
        <div className="container m-auto ">
          <Button
            className="my-20 rounded-md bg-white dark:bg-[#2B3743] shadow-sm"
            startContent={<ArrowBackIcon />}
            onClick={() => router.push('/')}
          >
            Back
          </Button>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-[120px] w-full">
            <div>
              <Image
                src={country.flags.png}
                alt={country.flags.alt || country.name.common}
                width={560}
                height={401}
                className="rounded-none"
              />
            </div>
            <div className="text-black dark:text-white">
              <h2 className="text-3xl font-bold mb-9 text-center lg:text-left">{country.name.common}</h2>
              <ul className="h-[160px] flex flex-col flex-wrap gap-y-3 gap-x-[200px]">
                <li className="font-semibold text-[14px]">Native Name: <span className="font-normal">{Object.values(country.name.nativeName)[0].common || country.name.common}</span></li>
                <li className="font-semibold text-[14px]">Population: <span className="font-normal">{country.population.toLocaleString('en-us')}</span></li>
                <li className="font-semibold text-[14px]">Region: <span className="font-normal">{country.region}</span></li>
                <li className="font-semibold text-[14px]">Sub Region: <span className="font-normal">{country.subregion}</span></li>
                <li className="font-semibold text-[14px]">Capital: <span className="font-normal">{Object.values(country.capital)}</span></li>
                <li className="font-semibold text-[14px]">Top Level Domain: <span className="font-normal">{Object.values(country.capital)}</span></li>
                <li className="font-semibold text-[14px]">Currencies: <span className="font-normal">{Object.values(country.currencies).flatMap(currency => currency.name).join(", ") || ''}</span></li>
                <li className="font-semibold text-[14px]">Languages: <span className="font-normal">{Object.values(country.languages).join(', ')}</span></li>
              </ul>
              <p className="font-semibold text-[14px] mt-20 text-center">
                Border Countries
                <ul className="flex flex-wrap justify-center max-w-[560px] gap-5 mt-5">
                  {country.borders.map(country => (
                    <li>
                      <Button
                        className="rounded-md bg-white dark:bg-[#2B3743] shadow-sm capitalize"
                      >
                        {country.toLowerCase()}
                      </Button>
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}