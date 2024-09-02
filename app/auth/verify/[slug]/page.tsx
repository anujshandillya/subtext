"use client"
import { useParams } from 'next/navigation';
import React from 'react'

export default function Page() {
  const params = useParams();
  const slug = params.slug;

  return (
    <div>{slug as string}</div>
  )
}