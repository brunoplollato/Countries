import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get('page'));
  const pageSize = Number(request.nextUrl.searchParams.get('pageSize'));
  const region = request.nextUrl.searchParams.get('region');
  const name = request.nextUrl.searchParams.get('name');
  console.log("🚀 ~ GET ~ name:", name)
  const response = await prisma.countries.findMany({
    skip: page * pageSize,
    take: pageSize,
    where: {
      region: region === '' ? undefined : region,
      name: name === '' ? undefined : name,
    }
  });
  const data = {
    content: response,
    page: page,
    pageSize: pageSize,
    totalCount: await prisma.countries.count({
      where: {
        region: region === '' ? undefined : region,
        name: name === '' ? undefined : name,
      }
    }),
    totalPages: Math.floor(await prisma.countries.count({
      where: {
        region: region === '' ? undefined : region,
        name: name === '' ? undefined : name,
      }
    }) / pageSize)
  }
  return NextResponse.json(data);
}