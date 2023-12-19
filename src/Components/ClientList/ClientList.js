import React from 'react'
import { MDBDataTable } from "mdbreact";
export default function ClientList({data}) {
  return (
    <div>
           <MDBDataTable striped bordered small data={data} />
    </div>
  )
}
