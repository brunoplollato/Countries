'use client'
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";

type CountryCardProps = {
  flag: string | null;
  name: string | null;
  population: string;
  region: string | null;
  capital: string[] | null;
}

export default function CountryCard({ flag, name, population, region, capital }: CountryCardProps) {
  return (
    <Link href={`/${name || ''}`}>
      <Card className="rounded-md overflow-hidden shadow-md p-0 dark:bg-[#2B3743]">
        <CardHeader className="flex-col items-start p-0">
          <Image
            alt="Card background"
            className="object-fill rounded-none"
            src={flag || ''}
            width={264}
            height={132}
          />
        </CardHeader>
        <CardBody className="overflow-visible px-6 py-12">
          <p className="font-extrabold mt-2 text-ellipsis truncate w-[215px]">{name}</p>
          <ul>
            <li className="font-semibold text-[14px]">Population: <span className="font-normal">{parseInt(population).toLocaleString('en-us')}</span></li>
            <li className="font-semibold text-[14px]">Region: <span className="font-normal">{region}</span></li>
            <li className="font-semibold text-[14px] text-ellipsis truncate w-[215px]">Capital: <span className="font-normal">{capital}</span></li>
          </ul>
        </CardBody>
      </Card>
    </Link>
  );
}
