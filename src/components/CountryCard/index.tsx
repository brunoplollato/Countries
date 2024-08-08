'use client'
import { Card, CardBody, CardHeader, Image, Skeleton } from "@nextui-org/react";
import Link from "next/link";

type CountryCardProps = {
  flag: string | null;
  name: string | null;
  population: string;
  region: string | null;
  capital: string[] | null;
  isLoaded: boolean;
}

export default function CountryCard({ flag, name, population, region, capital, isLoaded }: CountryCardProps) {
  return (
    <Link href={`/${name || ''}`}>
      <Card className="rounded-md overflow-hidden shadow-md p-0 dark:bg-[#2B3743]">
        <Skeleton isLoaded={isLoaded}>
          <CardHeader className="flex-col items-start p-0">
            <Image
              alt="Card background"
              className="object-fill rounded-none"
              src={flag || ''}
              width={264}
              height={132}
            />
          </CardHeader>
        </Skeleton>
        <CardBody className="overflow-visible px-6 py-12">
          <Skeleton isLoaded={isLoaded} className="rounded-full h-5 mb-8 w-20">
            <p className="font-extrabold mt-2 text-ellipsis truncate w-[215px]">{name}</p>
          </Skeleton>
          <ul>
            <Skeleton isLoaded={isLoaded} className="rounded-full h-3 mb-2 w-48">
              <li className="font-semibold text-[14px]">Population: <span className="font-normal">{parseInt(population).toLocaleString('en-us')}</span></li>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className="rounded-full h-3 mb-2 w-36">
              <li className="font-semibold text-[14px]">Region: <span className="font-normal">{region}</span></li>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className="rounded-full h-3 mb-2 w-32">
              <li className="font-semibold text-[14px] text-ellipsis truncate w-[215px]">Capital: <span className="font-normal">{capital}</span></li>
            </Skeleton>
          </ul>
        </CardBody>
      </Card>
    </Link>
  );
}
