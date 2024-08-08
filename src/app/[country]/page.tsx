'use client'
import ArrowBackIcon from "@/components/Icons/arrowBack";
import { CountryType } from "@/types/country";
import { Button, Image, Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

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

  useLayoutEffect(() => { fetchCountry() }, []);

  return (
    <>
      <div className="container mx-auto h-[calc(100vh-160px)]">
        <Button
          className="my-20 rounded-md bg-white dark:bg-[#2B3743] shadow-sm"
          startContent={<ArrowBackIcon />}
          onClick={() => router.push('/')}
        >
          Back
        </Button>
        <div className="flex flex-col xl:flex-row items-center justify-center lg:justify-between gap-[120px] w-full">
          <Skeleton isLoaded={!isLoading}>
            <div>
              <Image
                src={country?.flags.png}
                alt={country?.flags.alt || country?.name.common}
                width={560}
                height="auto"
                className="rounded-none"
              />
            </div>
          </Skeleton>
          <div className="text-black dark:text-white">
            <h2 className="text-3xl font-bold mb-9 text-center xl:text-left w-full">
              <Skeleton isLoaded={!isLoading} className="h-8 rounded-full mb-1 w-48 w-full">
                {country?.name.common}
              </Skeleton>
            </h2>
            <ul className="h-[160px] flex flex-col flex-wrap gap-y-3 gap-x-[200px] w-auto">
              <li className="font-semibold text-[14px]">
                <Skeleton isLoaded={!isLoading} className="h-[14px] rounded-full mb-1">
                  Native Name: <span className="font-normal">{country && Object.values(country?.name.nativeName)[0].common || country?.name.common}</span>
                </Skeleton>
              </li>
              <li className="font-semibold text-[14px]">
                <Skeleton isLoaded={!isLoading} className="h-[14px] rounded-full mb-1">
                  Population: <span className="font-normal">{country?.population.toLocaleString('en-us')}</span>
                </Skeleton>
              </li>
              <li className="font-semibold text-[14px]">
                <Skeleton isLoaded={!isLoading} className="h-[14px] rounded-full mb-1">
                  Region: <span className="font-normal">{country?.region}</span>
                </Skeleton>
              </li>
              <li className="font-semibold text-[14px]">
                <Skeleton isLoaded={!isLoading} className="h-[14px] rounded-full mb-1">
                  Sub Region: <span className="font-normal">{country?.subregion}</span>
                </Skeleton>
              </li>
              <li className="font-semibold text-[14px]">
                <Skeleton isLoaded={!isLoading} className="h-[14px] rounded-full mb-1">
                  Capital: <span className="font-normal">{country && Object.values(country?.capital)}</span>
                </Skeleton>
              </li>
              <li className="font-semibold text-[14px]">
                <Skeleton isLoaded={!isLoading} className="h-[14px] rounded-full mb-1">
                  Top Level Domain: <span className="font-normal">{country && Object.values(country?.capital)}</span>
                </Skeleton>
              </li>
              <li className="font-semibold text-[14px]">
                <Skeleton isLoaded={!isLoading} className="h-[14px] rounded-full mb-1">
                  Currencies: <span className="font-normal">{country && Object.values(country?.currencies).flatMap(currency => currency.name).join(", ") || ''}</span>
                </Skeleton>
              </li>
              <li className="font-semibold text-[14px] w-72">
                <Skeleton isLoaded={!isLoading} className="h-[14px] rounded-full mb-1">
                  Languages: <span className="font-normal">{country && Object.values(country?.languages).join(', ')}</span>
                </Skeleton>
              </li>
            </ul>
            <div className="font-semibold text-[14px] mt-20 text-center">
              Border Countries
              {country?.borders ? (
                <ul className="flex flex-wrap justify-center max-w-[560px] gap-5 mt-5 mx-auto">
                  {country?.borders?.map(item => (
                    <li key={item}>
                      <Skeleton isLoaded={!isLoading} className="rounded-md">
                        <Button
                          className="rounded-md bg-white dark:bg-[#2B3743] shadow-sm capitalize"
                        >
                          {item.toLowerCase()}
                        </Button>
                      </Skeleton>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-normal text-xs mt-5">no border countries</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}